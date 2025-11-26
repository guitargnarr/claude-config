# Session Start Checklist

**Purpose:** Prevent common mistakes by following this checklist at the start of EVERY session where user wants to improve/deploy/enhance something.

---

## 🚨 MANDATORY Pre-Work Steps

### When User Says Any Of:
- "Make this an app..."
- "Deploy this to..."
- "Improve this website..."
- "I want to enhance..."
- "Help me with [URL]..."
- "Get this working..."

### STOP and Run This Checklist:

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

**Document what exists:**
- [ ] List ALL found deployments with URLs
- [ ] Note which platforms are used
- [ ] Identify custom domains vs preview URLs

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

#### ☑️ 4. Present Findings to User (2 min)

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

#### ☑️ 5. Verify Local Code Matches Chosen Deployment

**Before starting work:**

- [ ] Confirm local code IS the source of chosen deployment
- [ ] Check git branches (might be deployed from different branch)
- [ ] Verify package.json matches deployment name
- [ ] Check .env files for deployment URLs

**If mismatch found:**
- Download/clone correct source
- OR build on local and redeploy to good URL
- Document which approach chosen

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

1. **User provides URL** - Any mention of deployed app
2. **Multiple .env files** - Suggests multiple deployments
3. **Package.json name mismatch** - "portfolio" but user says "ourjourney"
4. **Multiple App versions** - App.jsx, AppV2.jsx, AppFinal.jsx
5. **Git mentions old account** - Different deployment source
6. **User says "old deployment"** - Obviously multiple versions exist
7. **Vercel/Railway already configured** - Means prior deployments

**If ANY of these appear: Run the protocol.**

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
