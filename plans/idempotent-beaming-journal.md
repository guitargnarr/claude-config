# Plan: Client CMS Security Hardening

## Context

Audit of `~/Projects/client-sites/client-cms/` revealed critical security issues: plaintext passwords stored and compared in `api/main.py`, full database credentials hardcoded in `render.yaml`, demo passwords "demo123" in render.yaml, no rate limiting on login, a legacy unused JSON file, and an outdated README that lists PostgreSQL as a TODO when it's already live. This plan fixes all issues using the proven bcrypt + JWT pattern from `~/Projects/outreach-api/main.py`.

## Files to Modify (5)

| File | Changes |
|------|---------|
| `api/requirements.txt` | Add bcrypt, pyjwt, slowapi |
| `api/main.py` | Rewrite auth: bcrypt hashing, JWT tokens, rate limiting, migration endpoint |
| `render.yaml` | Remove all hardcoded credentials, use `sync: false` |
| `api/data/clater-jewelers.json` | Delete (legacy unused file) |
| `README.md` | Update to reflect reality (PostgreSQL live, auth flow, deployment status) |

## Implementation

### 1. `api/requirements.txt` -- Add 3 dependencies

```
fastapi
uvicorn[standard]
pydantic
sqlalchemy
pg8000
python-dotenv
bcrypt
pyjwt
slowapi
```

### 2. `api/main.py` -- Auth rewrite (~60 lines changed)

**Add imports** (top of file):
```python
import bcrypt as _bcrypt
import jwt
from datetime import datetime, timezone, timedelta
from slowapi import Limiter
from slowapi.util import get_remote_address
```

**Add JWT config** (after imports):
```python
JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret-change-in-production")
JWT_ALGORITHM = "HS256"
JWT_EXPIRY_DAYS = 7
```

**Add rate limiter** (before app creation):
```python
limiter = Limiter(key_func=get_remote_address)
```

**After `app = FastAPI(...)`, add:**
```python
app.state.limiter = limiter
```

**Replace `DEMO_PASSWORDS` dict (lines 192-196) with helper functions:**
```python
def _hash_pw(pw: str) -> str:
    return _bcrypt.hashpw(pw.encode(), _bcrypt.gensalt()).decode()

def _verify_pw(pw: str, hashed: str) -> bool:
    return _bcrypt.checkpw(pw.encode(), hashed.encode())

def _create_token(site_id: str) -> str:
    payload = {"sub": site_id, "exp": datetime.now(timezone.utc) + timedelta(days=JWT_EXPIRY_DAYS)}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def _decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
```

**Replace `verify_auth()` (lines 199-216):**
```python
def verify_auth(site_id: str, x_auth_token: str = Header(None), db: Session = Depends(get_db)) -> bool:
    if not x_auth_token:
        raise HTTPException(status_code=401, detail="Missing auth token")
    claims = _decode_token(x_auth_token)
    if claims.get("sub") != site_id:
        raise HTTPException(status_code=401, detail="Token not valid for this site")
    return True
```

**Replace `login()` (lines 309-323) -- add rate limiting:**
```python
@app.post("/api/auth/login")
@limiter.limit("5/minute")
def login(auth: SiteAuth, request: Request, db: Session = Depends(get_db)) -> dict:
    site_pw = db.query(SitePasswordDB).filter(SitePasswordDB.site_id == auth.site_id).first()
    if not site_pw:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not site_pw.password_hash.startswith("$2b$"):
        # Legacy plaintext -- compare directly, then hash on success
        if auth.password != site_pw.password_hash:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        site_pw.password_hash = _hash_pw(auth.password)
        db.commit()
    else:
        if not _verify_pw(auth.password, site_pw.password_hash):
            raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"token": _create_token(auth.site_id), "site_id": auth.site_id}
```

Note: `request: Request` parameter is required by slowapi. Add `from starlette.requests import Request` or use `from fastapi import Request`.

**Fix `create_site()` (line 351) -- hash password on site creation:**
```python
db_pw = SitePasswordDB(
    site_id=site_data.site_id,
    password_hash=_hash_pw(site_data.password),
)
```

**Add one-time migration endpoint** (temporary, remove after running):
```python
@app.post("/api/admin/migrate-passwords")
def migrate_passwords(x_admin_key: str = Header(None), db: Session = Depends(get_db)):
    if x_admin_key != os.getenv("ADMIN_PASSWORD", ""):
        raise HTTPException(status_code=403, detail="Admin key required")
    migrated = 0
    for pw in db.query(SitePasswordDB).all():
        if not pw.password_hash.startswith("$2b$"):
            pw.password_hash = _hash_pw(pw.password_hash)
            migrated += 1
    db.commit()
    return {"migrated": migrated}
```

**Remove the `DEMO_PASSWORDS` dict entirely** -- no more env-var fallback auth. All auth goes through the database.

### 3. `render.yaml` -- Remove all hardcoded secrets

```yaml
services:
  - type: web
    name: client-cms-api
    env: python
    region: oregon
    plan: free
    rootDir: api
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn main:app --host 0.0.0.0 --port $PORT
    healthCheckPath: /health
    envVars:
      - key: DATABASE_URL
        sync: false
      - key: JWT_SECRET
        sync: false
      - key: ADMIN_PASSWORD
        sync: false
```

All secrets managed in Render dashboard only (already set there). Blueprint sync only adds/updates, never removes -- so existing dashboard values persist.

### 4. Delete `api/data/clater-jewelers.json`

Legacy file, unused by any code path. Confirmed via grep -- no imports or references to this file in `main.py`.

### 5. `README.md` -- Update to match reality

Key updates:
- Remove "PostgreSQL instead of JSON files" from Future Enhancements (already done)
- Update auth section to describe JWT token flow
- Update password section (no more plaintext/env-var approach)
- Note that API is live at `client-cms-api.onrender.com`
- Note admin panel deployment
- Keep under 150 lines

## Deployment Order

1. **Set env vars in Render dashboard first** (before deploying code):
   - Verify `DATABASE_URL` is set (it already is)
   - Add `JWT_SECRET` = generate a strong random string
   - Verify `ADMIN_PASSWORD` is set (it already is, via `generateValue`)

2. **Deploy code** (push to main, Render auto-deploys)

3. **Run password migration** (one-time):
   ```bash
   curl -X POST https://client-cms-api.onrender.com/api/admin/migrate-passwords \
     -H "X-Admin-Key: [ADMIN_PASSWORD from dashboard]"
   ```

4. **Verify** -- login with existing credentials through admin panel, confirm JWT returned

5. **Remove migration endpoint** -- delete the `/api/admin/migrate-passwords` route, push again

## Frontend Impact

**None.** The admin panel (`admin/src/App.tsx`) stores whatever token the login endpoint returns in `localStorage` and sends it as `X-Auth-Token`. It doesn't inspect or decode the token. Changing from plaintext-password-as-token to JWT is transparent to the frontend.

## Verification

1. Run backend locally: `cd api && pip install -r requirements.txt && python -c "import bcrypt, jwt, slowapi; print('deps OK')"`
2. Start server: `uvicorn main:app --reload --port 8000`
3. Test login: `curl -X POST http://localhost:8000/api/auth/login -H "Content-Type: application/json" -d '{"site_id":"clater-jewelers","password":"demo123"}'` -- should return JWT
4. Test auth with JWT: use returned token in `X-Auth-Token` header on admin endpoints
5. Test rate limiting: send 6 login requests in quick succession, 6th should return 429
6. Test migration endpoint with wrong key: should return 403
7. Test migration endpoint with correct key: should return `{"migrated": N}`
8. Verify no hardcoded passwords in `render.yaml` via grep
9. Deploy to Render, verify `/health` returns 200
10. Login via admin panel at deployed URL, confirm full CRUD works
