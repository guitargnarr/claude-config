# Environment & Secrets Checklist

**Updated:** February 5, 2026

---

## Vercel (Vite Frontend)

| Gotcha | Fix |
|--------|-----|
| Vite bakes env vars at BUILD time | `VITE_X=value vercel build --prod && vercel deploy --prebuilt --prod --yes` |
| `vercel env add` alone does nothing for Vite | Must set vars in build command, not just dashboard |
| Only `VITE_` prefixed vars exposed to client | Name all public vars `VITE_*` |
| SSO blocks .vercel.app URLs by default | `curl -X PATCH .../v9/projects/{id} -d '{"ssoProtection":null}'` |
| OG meta tags need absolute URLs | `https://site.vercel.app/og-image.png` not `/og-image.png` |

```bash
# No env vars needed (static site)
vercel --prod --yes

# With Vite env vars
VITE_API_URL=https://api.example.com vercel build --prod
vercel deploy --prebuilt --prod --yes
```

---

## Render (Python APIs)

| Gotcha | Fix |
|--------|-----|
| PORT must be env var, not hardcoded | `uvicorn main:app --host 0.0.0.0 --port $PORT` |
| Blueprint sync never removes vars | Manually delete removed vars from Render dashboard |
| psycopg2-binary fails on Render | Use `pg8000` (pure Python) |
| DATABASE_URL dialect mismatch with Neon | `.replace("postgresql://", "postgresql+pg8000://", 1)` |
| sslmode param breaks pg8000 | Strip it: `re.sub(r'[\?&]sslmode=[^&]*', '', url)` |
| Free tier: 15min idle → 30sec cold start | Expected behavior, add retry logic in frontend |

**Proven pg8000 + Neon pattern:**
```python
import ssl, re
url = os.getenv("DATABASE_URL", "")
url = url.replace("postgresql://", "postgresql+pg8000://", 1)
url = re.sub(r'[\?&]sslmode=[^&]*', '', url)
ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE
engine = create_engine(url, connect_args={"ssl_context": ssl_ctx})
```

---

## Local Development

| Gotcha | Fix |
|--------|-----|
| Shell env vars override .env (pydantic-settings) | `unset DATABASE_URL` before starting server |
| Multiple uvicorn instances cause memory issues | `pkill -f uvicorn`, run only one |
| .env syntax errors break all loading | One `VAR=value` per line, no spaces around `=` |
| Gmail vars conflict with .env | `unset GMAIL_CREDENTIALS_FILE GMAIL_TOKEN_FILE GMAIL_SCOPES` |

---

## Protected Files (Never Read/Edit/Commit)

- `.env`, `**/.env` - credentials
- `**/credentials.json`, `client_secret_*.json` - OAuth
- `**/.ssh/id_*`, `**/.aws/credentials` - system keys
- `**/GMAIL_*.csv`, `**/APPLICATIONS*.csv`, `**/JOB_TRACKER*.csv` - personal data

---

## Decision Tree

```
Need a secret in Vite app?  → VITE_ prefix + build command
Need a secret in Python?    → .env file (unset conflicting shell vars first)
Deploying to Render?        → Dashboard env vars + pg8000 dialect
Deploying to Vercel?        → Build command for Vite, dashboard for serverless
Already deployed but stale? → Check Vercel/Render dashboard hasn't cached old value
```

---

## Pre-Deploy Checklist

- [ ] No hardcoded credentials in code
- [ ] `.env.example` has all vars (values removed)
- [ ] Shell conflicts checked: `env | grep -i DATABASE_URL`
- [ ] Build-time vs runtime vars correct
- [ ] `.env` in `.gitignore`
- [ ] Sensitive data not in log output
