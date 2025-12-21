# Security Audit: Critical PII & Sensitive Information Cleanup

**Created:** 2025-12-18
**Status:** CRITICAL FINDINGS - ACTION REQUIRED
**Scope:** All GitHub repositories and local directories

---

## Executive Summary

Comprehensive security scan across all repositories identified **CRITICAL** issues requiring immediate attention:

| Category | Count | Severity |
|----------|-------|----------|
| Live API Tokens Exposed | 6 | CRITICAL |
| Ex-Employer (Humana) Content | 5 files | HIGH |
| Chrome Passwords CSV | 157 credentials | CRITICAL |
| 1Password Emergency Kits | 2 PDFs | HIGH |

---

## CRITICAL FINDINGS - IMMEDIATE ACTION REQUIRED

### 1. Live API Tokens in .env Files (REVOKE NOW)

| File | Credential | Action |
|------|------------|--------|
| `~/Projects/mcp-vercel/.env` | `VERCEL_API_TOKEN=[REDACTED]` | Revoke at vercel.com/account/tokens |
| `~/Projects/merry-go-round-monitor/.env` | `GITHUB_TOKEN=[REDACTED]` | Revoke at github.com/settings/tokens |
| `~/Projects/gmail-automation-system/.env` | Gmail app password + Adzuna keys | Revoke at myaccount.google.com/apppasswords |
| `~/Projects/projectlavos-monorepo/services/.env` | Supabase anon key (JWT) | Rotate at supabase.io dashboard |
| `~/.qwen/oauth_creds.json` | Qwen/Alibaba API tokens | Rotate in Alibaba console |
| `~/.railway/config.json` | Railway auth token | Regenerate in Railway dashboard |

### 2. Chrome Passwords CSV (DELETE IMMEDIATELY)

**File:** `/Users/matthewscott/Desktop/5_MEDIA_DESIGNS_CREATIVE/LIFE/FINANCES/Passwords/Chrome Passwords.csv`

**Contains:** 157 plaintext passwords including:
- Apple ID, GitHub, Vercel, Google
- Banking integrations (Yodlee)
- Work systems (Humana, ADP, DocuSign)
- Email accounts

**Action:** Delete file, rotate ALL listed credentials

### 3. 1Password Emergency Kits (SECURE)

**Files:**
- `~/Desktop/5_MEDIA_DESIGNS_CREATIVE/LIFE/FINANCES/Passwords/1Password Emergency Kit A3-XBWA9V-my.pdf`
- `~/Desktop/5_MEDIA_DESIGNS_CREATIVE/LIFE/FINANCES/Passwords/1Password Emergency Kit.pdf`

**Action:** Move to encrypted storage or secure vault

### 4. Ex-Employer (Humana) Content (DELETE)

| File/Directory | Content | Action |
|----------------|---------|--------|
| `~/Desktop/Manus/core-hum-resp/` | 4 files: Medicare compliance automation, HIPAA solutions | DELETE entire directory |
| `~/Projects/DevelopmentTools/Python/Scripts/Visualization/humana_dashboard.py` | Vulnerability dashboard with Humana branding | DELETE file |
| Mirador git tag v3.0.0 | "Humana-optimized models" reference | Remove tag if repo is public |

**Risk:** Potential NDA violation, proprietary process documentation

---

## REMEDIATION PLAN

### Phase 1: Immediate (Execute Now - 30 min)

1. **Delete Chrome Passwords CSV**
   ```bash
   rm "/Users/matthewscott/Desktop/5_MEDIA_DESIGNS_CREATIVE/LIFE/FINANCES/Passwords/Chrome Passwords.csv"
   ```

2. **Revoke Live API Tokens** (manual - web dashboards)
   - [ ] Vercel token
   - [ ] GitHub token
   - [ ] Gmail app password
   - [ ] Adzuna API keys

3. **Delete Humana Content**
   ```bash
   rm -rf ~/Desktop/Manus/core-hum-resp/
   rm ~/Projects/DevelopmentTools/Python/Scripts/Visualization/humana_dashboard.py
   ```

4. **Secure 1Password PDFs**
   - Move to encrypted disk image or delete after verifying backup

### Phase 2: Short-term (This Week)

5. **Remove .env files from repos**
   ```bash
   # For each repo with .env:
   rm .env
   echo ".env" >> .gitignore
   git add .gitignore && git commit -m "security: add .env to gitignore"
   ```

6. **Rotate Supabase anon key**
   - Dashboard → Settings → API → Regenerate

7. **Rotate Railway token**
   - Delete `~/.railway/config.json`, re-authenticate

8. **Rotate Qwen token**
   - Delete `~/.qwen/oauth_creds.json`, re-authenticate

### Phase 3: Git History Cleanup (If Needed)

9. **Check if .env files were ever committed:**
   ```bash
   git log --all --full-history -- "*.env"
   ```

10. **If found in history, use BFG or git-filter-repo:**
    ```bash
    bfg --delete-files .env
    git reflog expire --expire=now --all && git gc --prune=now --aggressive
    git push --force
    ```

---

## Files to Delete (Summary)

```bash
# CRITICAL - Execute these commands:

# 1. Chrome passwords
rm "/Users/matthewscott/Desktop/5_MEDIA_DESIGNS_CREATIVE/LIFE/FINANCES/Passwords/Chrome Passwords.csv"

# 2. Humana content
rm -rf ~/Desktop/Manus/core-hum-resp/
rm ~/Projects/DevelopmentTools/Python/Scripts/Visualization/humana_dashboard.py

# 3. Live .env files (after rotating tokens)
rm ~/Projects/mcp-vercel/.env
rm ~/Projects/merry-go-round-monitor/.env
rm ~/Projects/gmail-automation-system/.env
rm ~/Projects/projectlavos-monorepo/services/.env
```

---

## Tokens to Revoke (Manual Web Actions)

| Service | URL | Token to Revoke |
|---------|-----|-----------------|
| Vercel | https://vercel.com/account/tokens | [REDACTED - check local .env files] |
| GitHub | https://github.com/settings/tokens | [REDACTED - check local .env files] |
| Gmail | https://myaccount.google.com/apppasswords | [REDACTED - check local .env files] |
| Supabase | https://supabase.io/dashboard | [REDACTED - check local .env files] |

---

## Verification Checklist

After cleanup:
- [ ] Chrome Passwords.csv deleted
- [ ] Humana directory deleted
- [ ] humana_dashboard.py deleted
- [ ] All 4 API tokens revoked
- [ ] .env files removed from repos
- [ ] 1Password PDFs secured/encrypted
- [ ] Git history clean (no .env files in history)

---

## NOT Found (Good News)

- No SSN patterns in any repository
- No AWS credentials exposed
- No database passwords in code
- No Stripe live keys
- ai-talent-optimizer phone number already addressed (previous session)
- Most .env files properly in .gitignore

---

## Risk Summary

| Risk | Before | After Cleanup |
|------|--------|---------------|
| Account Takeover | CRITICAL | LOW |
| NDA Violation | HIGH | ELIMINATED |
| Credential Theft | CRITICAL | LOW |
| Identity Theft | HIGH | MEDIUM |

**Timeline:** Execute Phase 1 immediately. Phase 2 within 48 hours.
