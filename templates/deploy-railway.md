# Railway Deployment - Quick Reference

**Proven Pattern** (Nov 22, 2025 - PhishGuard deployment)

## Prerequisites
- Dockerfile in project root
- Code handles dynamic PORT: `port = int(os.environ.get("PORT", 8000))`
- Health endpoint exists

## Deploy Sequence (15 minutes)

```bash
# 1. Install CLI (one-time)
brew install railway

# 2. Login and link (one-time per project)
cd ~/Projects/your-project
railway login
railway link  # Select project/environment/service

# 3. Create minimal railway.json
cat > railway.json <<'EOF'
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {"builder": "DOCKERFILE"},
  "deploy": {
    "healthcheckPath": "/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE"
  }
}
EOF

# 4. Set environment variable (Railway dashboard or CLI)
railway variables set PYTHONUNBUFFERED=1

# 5. Deploy
git add railway.json
git commit -m "feat: add Railway deployment config"
git push origin main  # Auto-deploys

# 6. Monitor
railway logs  # Watch deployment
railway status  # Check status

# 7. Test
curl https://your-app.up.railway.app/health
```

## Common Issues

**Healthcheck fails**: Check PORT variable handling in code
**No logs**: Add PYTHONUNBUFFERED=1 environment variable
**Build succeeds, deploy fails**: Check Dockerfile CMD vs railway.json startCommand (use Dockerfile, not startCommand override)

## Cost: $5/month credit (free tier available)
