# Proven Workflows

## CRITICAL: Visual Proof Required (Dec 2025)

**EVERY task must end with user SEEING working result:**
- Web app? Open it in browser, show URL
- CLI tool? Run it, show output
- File generator? Create file, show how to use it
- API? Make request, show response

**Not done until:**
1. User can see it working
2. User knows how to access it again (exact URL/command)
3. Result is repeatable

---

## CRITICAL: Git Workflow (PR Required)

**DO NOT commit directly to main.** Always use feature branches + PRs.

**Pre-Commit Quality Check (MANDATORY):**
```bash
# TypeScript/JavaScript - must pass
npm run build

# Python - must pass
flake8 [file.py] --max-line-length=127

# Fix ALL errors before committing - no exceptions
```

```bash
# 1. Create feature branch
git checkout -b feature/[name]

# 2. Implement changes...

# 3. Commit to feature branch
git add . && git commit -m "feat: [description]"

# 4. Push and create PR
git push -u origin feature/[name]
gh pr create --title "feat: [title]" --body "## Summary
- [bullets]

## Test Plan
- [ ] Build passes
- [ ] Tests pass"

# 5. Verify PR exists
gh pr list
```

**SUCCESS CRITERIA: Task is NOT complete until `gh pr list` shows your PR.**

### Merge and Cleanup

```bash
# Merge PR (after review/approval)
gh pr merge [PR_NUMBER] --squash --delete-branch

# Or merge with specific method
gh pr merge [PR_NUMBER] --merge      # Merge commit
gh pr merge [PR_NUMBER] --rebase     # Rebase

# Update local after merge
git checkout main && git pull
```

### Rollback (Emergency)

```bash
# Vercel - instant rollback to previous deployment
vercel rollback

# Or rollback to specific deployment
vercel ls  # Find deployment URL
vercel rollback [DEPLOYMENT_URL]

# Render - redeploy previous commit
# Dashboard → Service → Deploys → Find working deploy → Redeploy

# Git - revert last commit (creates new commit)
git revert HEAD
git push origin main
```

---

## Deployment

### Vercel (Frontend) - Deploy ONCE, Not Per Iteration

```bash
# 1. Iterate locally (repeat until correct)
npm run dev -- --port 5199 &
sleep 3
playwright screenshot --wait-for-timeout=5000 "http://localhost:5199" local-verify.png
# Fix issues, re-screenshot, repeat

# 2. Build check (must pass before deploy)
npm run build

# 3. Deploy ONCE
vercel --prod --yes

# WITH env vars (Vite bakes at build time)
VITE_MY_VAR=https://api.example.com vercel build --prod
vercel deploy --prebuilt --prod --yes

# 4. Open for user to verify (don't screenshot and narrate)
open "https://site.vercel.app"

# Git workflow (ALWAYS add assets)
git add public/
```

**Port:** Always `--port 5199` (avoids conflicts with default 5173).
**Rule:** Deploying to Vercel to take a screenshot is BANNED. Test locally first.

### Render (Python APIs) - 2-5 minutes

```bash
# 1. Push to GitHub (Render auto-deploys from main)
git push origin main

# 2. Or manual deploy via dashboard
# Dashboard → Service → Manual Deploy → Deploy latest commit

# 3. Verify deployment
curl https://your-api.onrender.com/health
```

**Render Configuration (render.yaml):**
```yaml
services:
  - type: web
    name: my-api
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: DATABASE_URL
        sync: false  # Set manually in dashboard
```

**Critical Notes:**
- Free tier spins down after 15min (~30sec cold start)
- Use `pg8000` driver, NOT `psycopg2-binary` (build fails)
- PORT must come from env var, not hardcoded
- Blueprint sync adds/updates env vars but NEVER removes them

### Post-Deploy Verification (MANDATORY)

```bash
# Frontend (SPA) - open for user to verify visually
open "https://site.vercel.app"
# Do NOT screenshot and narrate -- user's eyes are the source of truth

# Backend API - curl is fine
curl -s https://api.onrender.com/health | jq .

# Both - check response time
time curl -s https://api.onrender.com/health > /dev/null
```

---

## Brand System (Canonical)

```css
--teal-500: #14b8a6;    /* Primary actions, headers */
--teal-400: #2dd4bf;    /* Hover states */
--orange-500: #f97316;  /* CTAs, highlights */
--orange-400: #fb923c;  /* Hover states */
--slate-900: #0f172a;   /* Dark backgrounds */
```

---

## Development Pattern That Works

```bash
# Pattern: Direct implementation (24 mins → 87% complete)
1. Implement feature
2. Test immediately
3. Fix issues (don't ask - just fix)
4. Commit to feature branch
5. Create PR
6. SHOW USER: URL or command to see result
7. Move to next

# Anti-pattern: Analysis spiral (90 mins → 0% progress)
1. Request analysis
2. Generate planning docs
3. More analysis
4. More planning
5. Context exhausted, no code written, nothing to SHOW

# Anti-pattern: Question spiral
1. Ask user if they want X
2. Wait for response
3. Ask follow-up about Y
4. Wait for response
5. User frustrated, no progress

# Correct pattern: Fix-first
1. See problem
2. Fix it
3. Show user the fix working
4. Only ask if security concern or outcome preference needed
```

---

## Mobile Verification (Jan 2026)

**ALWAYS verify mobile responsiveness after deployment:**

```bash
# Single site verification (desktop + mobile screenshots)
~/.claude/scripts/mobile-verify.sh https://site.vercel.app

# Batch verify top 10 client sites
~/.claude/scripts/mobile-verify-batch.sh ./audit-output

# Quick mobile-only check (local first, then live)
playwright screenshot --viewport-size="375,667" --wait-for-timeout=5000 "http://localhost:5199" mobile.png
```

**Mobile Viewport:** 375x667 (iPhone SE)

**Visual Checklist:**
- Hero text readable on mobile?
- Navigation accessible (hamburger menu)?
- CTAs tappable (min 44x44px)?
- No horizontal scroll?
- Images not cut off?

**Output:**
- Screenshots saved to output directory
- HTML report generated (batch mode)

---

## Usage

Load when you need deployment or development workflow reminders:
```
@~/.claude/reference/workflows.md
```

---

**Last Updated:** January 17, 2026 (Added Render deployment, PR merge, rollback workflows)
