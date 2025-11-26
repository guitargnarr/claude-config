# Session Start Checklist

**Purpose:** Prevent common mistakes by following this checklist at the start of EVERY session where user wants to improve/deploy/enhance something.

---

## 🚨 MANDATORY Pre-Work Steps

### When User Says Any Of (TRIGGERS):

**Definite triggers (100% run protocol):**
- "Make [URL] an app" - Converting existing deployment
- "Improve [URL]" or "Enhance [URL]" - Modifying existing deployment
- "Deploy this to production" - Mentions existing infrastructure
- "Get [URL] working" - Fixing deployed app
- "Add [feature] to [URL]" - Building on deployed app
- User provides specific deployment URL (https://app.vercel.app, etc.)

**Probable triggers (investigate first):**
- "Help me with my app" + project has .vercel, .netlify, or railway.json
- Multiple .env files exist (.env.production, .env.staging)
- Package.json name doesn't match current directory name
- User mentions "old deployment" or "previous version"

**NOT triggers (skip protocol):**
- "How do I deploy to..." - Tutorial request, not improving existing
- "What is Vercel?" - Educational question
- "Create new app from scratch" - No existing deployments
- "localhost" or "local development" - Dev environment only
- "Deploy new project" - First deployment, nothing to compare

### STOP and Run This Checklist (If Triggered):

#### ☑️ 1. Deployment Inventory (5 min)

**Check ALL platforms:**
```bash
# Vercel
vercel list
# Check dashboard: https://vercel.com/dashboard

# Railway
railway status
# Check dashboard: https://railway.app/dashboard

# Netlify
netlify sites:list
# Check dashboard: https://app.netlify.com

# GitHub
# Check: https://github.com/USERNAME?tab=repositories
# Look for Pages deployments
```

**Check git branch alignment:**
```bash
# List all branches
git branch -a

# Check which branch is currently active
git branch --show-current

# Check recent commits on remote branches
git log origin/main --oneline -5
git log origin/production --oneline -5 2>/dev/null || echo "No production branch"

# For Vercel: Check deployment source
vercel inspect [deployment-url] 2>/dev/null | grep -i "branch\|commit"

# For Railway: Check in dashboard which branch is deployed
```

**Document what exists:**
- [ ] List ALL found deployments with URLs
- [ ] Note which platforms are used
- [ ] Identify custom domains vs preview URLs
- [ ] **Verify which git branch each deployment uses**
- [ ] **Confirm local branch matches target deployment source**
- [ ] **Ask user if unsure: "Which branch is deployed to [URL]?"**

---

#### ☑️ 2. Test Every Live URL (10 min)

**Use Playwright - Not curl, not WebFetch:**

```bash
cd [project-dir]
npm install -D @playwright/test
npx playwright install chromium

# Create test file, run against ALL URLs
```

**For each URL, capture:**
- [ ] Does it load? (yes/no)
- [ ] Screenshot (full page)
- [ ] UI quality (1-5 stars)
- [ ] Features present (login? nav? CRUD?)
- [ ] Backend connected? (test actual functionality)
- [ ] Error states (404? 401? 500?)

---

#### ☑️ 3. Compare & Rank (5 min)

**Create comparison table:**

| URL | Status | UI Quality | Features | Backend | Notes |
|-----|--------|-----------|----------|---------|-------|
| app.vercel.app | ✅ | ⭐⭐⭐⭐⭐ | Onboarding, welcome | ❌ | Beautiful but static |
| app-v2.vercel.app | ✅ | ⭐⭐⭐ | Login, CRUD | ✅ | Functional but plain |
| app-old.vercel.app | ❌ | - | - | - | 404 error |

**Identify:**
- 🏆 Best UI/UX
- ⚙️ Most functional backend
- 🎯 Recommended base to build on

---

#### ☑️ 4. Check Environment Variables (5 min)

**Verify production configuration:**

```bash
# Vercel: List environment variables
vercel env ls 2>/dev/null

# Railway: Check variables in dashboard or CLI
railway variables 2>/dev/null

# Compare with local .env.example
cat .env.example

# Identify gaps
diff <(grep "^[A-Z_]*=" .env.example | cut -d= -f1 | sort) \
     <(vercel env ls 2>/dev/null | grep "Production" | awk '{print $1}' | sort)
```

**Document requirements:**
- [ ] List all env vars used by deployed version
- [ ] Compare with local .env.example
- [ ] Identify missing variables (DATABASE_URL, API_KEYS, etc.)
- [ ] Note which are secrets vs public URLs
- [ ] **Ask user for production values if missing**
- [ ] Verify Railway/Vercel has all required vars set

**Critical check:**
- [ ] Database connection strings match?
- [ ] API URLs point to production (not localhost)?
- [ ] Auth secrets configured?
- [ ] CORS origins include correct frontend URL?

---

#### ☑️ 5. Present Findings to User (2 min)

**Template:**

```
🔍 Deployment Discovery Results:

Found X deployments:

1. [URL 1] - [Status]
   UI: ⭐⭐⭐⭐⭐ [Description]
   Backend: [Connected/Missing]

2. [URL 2] - [Status]
   UI: ⭐⭐⭐ [Description]
   Backend: [Connected/Missing]

ANALYSIS:
- Deployment 1 has superior [UI/onboarding/polish]
- Deployment 2 has working [backend/features/auth]

RECOMMENDATION: [Specific approach]

Which should we use as the foundation?
```

**Wait for user decision before coding.**

---

#### ☑️ 6. Verify Local Code Matches Chosen Deployment

**Before starting work:**

- [ ] Confirm local code IS the source of chosen deployment
- [ ] **Verify git branch matches deployment** (main vs production vs deploy)
- [ ] Check package.json name matches deployment name
- [ ] Check .env files reference correct deployment URLs
- [ ] Confirm recent commits in local match deployed version

**Git branch verification:**
```bash
# Which branch am I on?
git branch --show-current

# Which branch is deployed to [URL]?
vercel inspect [url] | grep branch
# Or ask user: "Which branch powers [URL]?"

# Do commits match?
git log --oneline -3  # Local commits
# Compare with deployment commit hash from vercel/railway
```

**If mismatch found:**
- Switch to correct branch: `git checkout production`
- OR clone from correct branch
- OR build on local and redeploy to good URL
- **Document which approach chosen and get user confirmation**

---

## Common Mistakes This Prevents

### ❌ Mistake #1: Building on Wrong Codebase
**Example:** OurJourney - built on basic UI, ignored beautiful deployed version
**Prevention:** Step 2 (test all URLs) would've shown better UI existed

### ❌ Mistake #2: Assuming 401/404 Means Broken
**Reality:** Could be auth-protected, CORS issue, or server restart
**Prevention:** Use Playwright for real browser test, not just HTTP status

### ❌ Mistake #3: Ignoring Custom Domains
**Example:** User had `app-name.vercel.app` but we worked on `app-name-hash.vercel.app`
**Prevention:** Step 1 (inventory) finds ALL domains including custom ones

### ❌ Mistake #4: Not Comparing Quality
**Example:** Deployed version had better UI than local code
**Prevention:** Step 3 (compare & rank) forces objective quality assessment

---

## Time Investment vs ROI

**Time to run full protocol:** 20-25 minutes

**Time saved by catching issues:**
- Wrong codebase: 2-4 hours
- Duplicate work: 1-3 hours
- Rework after user correction: 1-2 hours

**ROI:** 4-9 hours saved per 25 minutes invested
**Efficiency gain:** 10-20x

---

## Red Flags That Trigger This Protocol

### Code/File Indicators:
1. **Multiple .env files** - .env.production, .env.staging = multiple deployments exist
2. **Package.json name mismatch** - "portfolio" but user says "ourjourney" = wrong codebase
3. **Multiple App versions** - App.jsx, AppV2.jsx, AppFinal.jsx = experimentation happened
4. **.vercel or .railway directories exist** - Previously deployed from this codebase
5. **Multiple similar directories** - personal-journey AND personal-journey-flow = variants exist

### User Language Indicators:
6. **User provides specific deployment URL** - https://app.vercel.app = something already deployed
7. **User mentions "old deployment" or "previous version"** - Multiple versions confirmed
8. **User says "my app at..."** - Possessive + URL = existing deployment
9. **Git references old account** - guitargnar vs guitargnarr = migration, old deployments

### Context Indicators:
10. **Vercel/Railway/Netlify CLI already configured** - Means prior deployments exist
11. **Custom domain mentioned** - app-name.com = production deployment exists
12. **User mentions "make this an app"** - "This" implies something already exists

**If ANY of these appear: Run the protocol.**
**If MULTIPLE appear: Protocol is MANDATORY.**

---

## Integration with Existing Workflows

### Add to Session Start

**Before:**
1. Read user request
2. Start coding

**After:**
1. Read user request
2. **IF deployment mentioned:** Run Deployment Discovery Protocol
3. Get user confirmation
4. Start coding

### Add to CLAUDE.md

Already added:
- Critical Pitfalls: "ALWAYS inventory ALL deployments FIRST"
- Critical Pitfalls: "Test live URLs before building"

### Add to COLLABORATION_CONTRACT.md

Already added:
- Principle 3a: "Inventory Before Building"

---

## Example: Perfect Execution

**User:** "Improve my app at https://myapp.vercel.app"

**Claude:**
```
Before starting, let me discover all your deployments to ensure
we build on the right foundation.

[Runs vercel list]
Found 3 Vercel deployments for this project.

[Tests each with Playwright]
Testing myapp.vercel.app... Beautiful UI, no backend
Testing myapp-staging.vercel.app... Basic UI, working backend
Testing myapp-v1.vercel.app... 404

[Creates comparison]
myapp.vercel.app has superior onboarding and polish.
myapp-staging has functional features and database.

Recommendation: Port backend from staging into myapp.vercel.app.
This preserves your beautiful UI and adds functionality.

Shall I proceed with this approach?
```

**User confirms, work begins on RIGHT foundation.**

---

## Automation Opportunity

**Future enhancement:** Create `claude-discover` command

```bash
claude-discover https://myapp.vercel.app

# Auto-runs:
# - Platform detection (Vercel/Railway/Netlify)
# - Lists all deployments
# - Tests each URL
# - Generates comparison report
# - Outputs recommendation
```

**Not built yet, but should be.**

---

## OurJourney Specific: Next Steps

**What we should do NOW:**

1. Find source of `ourjourney-app.vercel.app` beautiful UI
2. Identify which App*.jsx variant it uses (or if separate repo)
3. Integrate our backend + fixes into that UI
4. Redeploy to `ourjourney-app.vercel.app`
5. Delete inferior deployments

**Estimated time to correct:** 30-45 minutes
**User would've preferred this from the start.**

---

**This protocol is now mandatory for all deployment work.**

**Status:** Active, enforced via CLAUDE.md + COLLABORATION_CONTRACT.md

**Last Updated:** November 25, 2025
