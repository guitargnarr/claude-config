# Deployment Discovery Protocol

**Created:** November 25, 2025
**Trigger:** OurJourney project - Built on wrong codebase for 2+ hours
**Lesson:** Never assume local code is the canonical version

---

## The Failure Pattern

### What Happened (OurJourney - Nov 25, 2025)

**User said:** "I want to make this an App on the Apple Store: https://ourjourney-e3bahua8r-matthew-scotts-projects-1dc9743e.vercel.app/"

**What I did wrong:**
1. Found 401 error on that URL
2. Immediately dove into `/frontend` directory
3. Assumed local code was the only version
4. Built backend, fixed bugs, deployed everything
5. **Spent 2+ hours before discovering**...

**What actually existed:**
- `ourjourney-app.vercel.app` - Beautiful onboarding UI, polished design
- Superior UX with welcome screen and value propositions
- Already deployed but not connected to backend
- **This was the version user wanted to improve**

**Impact:**
- Wasted 2 hours building on inferior codebase
- Created competing deployment instead of improving existing one
- User correctly frustrated: "I wish I would have known"

---

## The Root Cause

**I optimized for action over discovery.**

Pattern I followed (WRONG):
1. See problem (401 error)
2. Find code directory
3. Start building immediately
4. Deploy quickly

Pattern I should've followed (RIGHT):
1. **Inventory ALL deployments**
2. **Test every live URL**
3. **Compare quality/features**
4. **Ask which to build on**
5. Then start building

---

## The Protocol (MANDATORY First Steps)

### Step 1: Deployment Inventory (5 minutes)

When user mentions ANY deployment or wants to improve ANY project:

```bash
# Check Vercel
vercel list
# OR: Go to dashboard, manually review all deployments

# Check Railway
railway status
# OR: Dashboard → Projects list

# Check Netlify
netlify sites:list
# OR: Dashboard review

# Check GitHub Pages
# Visit: https://github.com/USERNAME?tab=repositories
# Look for: username.github.io or repos with Pages enabled
```

**Document findings:**
- Project: OurJourney
- Deployments found:
  1. `ourjourney-e3bahua8r...vercel.app` (401 error)
  2. `ourjourney-app.vercel.app` (needs testing)
  3. `frontend-xyz.vercel.app` (if exists)

---

### Step 2: Test Every Live URL (10 minutes)

**Don't assume - Actually test with browser:**

```javascript
// Use Playwright to test each URL
const urls = [
  'https://ourjourney-app.vercel.app',
  'https://ourjourney-e3bahua8r...vercel.app',
  // etc.
];

for (const url of urls) {
  // Test: Does it load?
  // Test: What's the UI quality?
  // Test: Is backend connected?
  // Test: What features work?
  // Screenshot for comparison
}
```

**NOT acceptable:**
- ❌ "I got a 401 so I'll skip this one"
- ❌ "WebFetch failed, must be broken"
- ❌ Curl check only

**Required:**
- ✅ Full browser test with Playwright
- ✅ Screenshot for visual comparison
- ✅ Feature inventory (login? CRUD? navigation?)
- ✅ Mobile responsiveness check (see @~/.claude/reference/workflows.md Mobile Verification section)

---

### Step 3: Compare & Report (5 minutes)

**Present findings to user:**

```
🔍 Deployment Inventory Results:

URL: ourjourney-app.vercel.app
Status: ✅ Working
UI Quality: ⭐⭐⭐⭐⭐ Beautiful onboarding, professional
Backend: ❌ Not connected
Features: Onboarding screen, value props, CTA button

URL: frontend-xyz.vercel.app
Status: ✅ Working
UI Quality: ⭐⭐⭐ Functional, basic login
Backend: ✅ Connected to localhost (needs Railway)
Features: Login form, Ideas/Calendar/Notes tabs

RECOMMENDATION: Build backend integration into ourjourney-app
(superior UI + our backend = complete app)

Which deployment should we enhance?
```

---

### Step 4: Make Decision or Ask (Dec 2025 Update)

**Fix-First Policy:** If one deployment is clearly superior, USE IT and proceed:
- Best UI + missing backend? Add backend to that one.
- Best backend + basic UI? That's the foundation.

**Only ask if genuinely ambiguous:**
- Two deployments with equal quality but different trade-offs
- User preference materially affects outcome

**Example - DON'T ask:**
- Deployment A: Beautiful UI, no backend
- Deployment B: Basic login, working backend
- **Decision: Use A (superior UX), integrate backend** - proceed without asking

**Example - DO ask:**
- Deployment A: Mobile-optimized, limited features
- Deployment B: Desktop-focused, full features
- **Question needed:** "Mobile or desktop priority? Each leads to different base."

---

### Step 5: Verify Git Alignment

**Before building, confirm branch alignment:**

```bash
# Check which branch you're currently on
git branch --show-current

# List all remote branches
git branch -r

# Check recent commits on key branches
git log origin/main --oneline -5
git log origin/production --oneline -5 2>/dev/null || echo "No production branch"
git log origin/deploy --oneline -5 2>/dev/null || echo "No deploy branch"

# For Vercel: Check which branch/commit is deployed
vercel inspect [URL] 2>/dev/null | grep -i "branch\|commit"

# For Railway: Check dashboard settings → Deployments tab
```

**Critical questions to answer:**
- Which branch is deployed to each URL?
- Does local branch match deployment source?
- Are there multiple deployment branches (main, production, deploy)?
- Is local branch ahead/behind deployed commit?

**If mismatch found:**
- Ask user: "Deployment is from 'production' branch, but you're on 'main'. Which should we use?"
- Switch branches if needed: `git checkout production`
- Or deploy from local branch (user's choice)
- Document the decision

**Why this matters:**
- Prevents building features on `main` that won't deploy (deployed from `production`)
- Prevents modifying wrong branch
- Ensures changes actually reach production

**Example mismatch:**
```
Local: main branch (5 commits ahead)
Deployed: production branch (deployed 2 weeks ago)
Problem: Your changes on main won't appear in deployment
Solution: Either merge main → production, or switch to production branch
```

---

## When This Protocol Applies

**Trigger phrases from user:**
- "Make this app..." + URL
- "Deploy my project..."
- "Improve this website..."
- "Get this to production..."
- "I have an app at..."

**Mandatory actions:**
1. Stop
2. Run deployment inventory
3. Test all URLs found
4. Report findings
5. Get user decision
6. THEN start building

---

## Why This Matters

### Cost of Skipping Discovery

**Time wasted:**
- OurJourney: 2 hours building on wrong codebase
- Could've been: 30 min integrating backend into existing UI

**Opportunity cost:**
- Built inferior version when superior existed
- User frustration and lost trust
- Potential rework needed

**Pattern risk:**
- This isn't isolated to OurJourney
- User said: "There are many different projects like this"
- **Every project needs this discovery phase**

---

## Red Flags I Missed

1. **User provided specific URL** - Should've tested it thoroughly, not just WebFetch
2. **401 error** - Could mean auth-protected, not broken
3. **Multiple App*.jsx files** - Signal of experimentation/iteration
4. **Package.json said "matthew-scott-portfolio"** - Wrong name, should've questioned
5. **User mentioned "old Github: guitargnar"** - Hint of previous deployments

**Each of these should've triggered deployment discovery.**

---

## Implementation Checklist

Before writing ANY code on deployment projects:

- [ ] Run `vercel list` (if Vercel mentioned)
- [ ] Check Vercel dashboard manually
- [ ] Run `railway status` (if Railway mentioned)
- [ ] Check Railway dashboard manually
- [ ] Test EVERY URL user provided with Playwright
- [ ] Screenshot all working deployments
- [ ] Compare UI quality objectively
- [ ] Report findings to user
- [ ] Get explicit decision on which to enhance
- [ ] Document chosen deployment in session notes

**Time investment:** 15-20 minutes
**Time saved:** Hours of potential rework
**Trust gained:** User sees you're thorough

---

## Example: Good Discovery

**User:** "Make this an app on the App Store: https://myapp.vercel.app"

**Claude:**
```
Let me first inventory all your deployments to understand what exists.

[Runs vercel list, Railway dashboard check, tests URLs with Playwright]

Found 3 deployments:
1. myapp.vercel.app - Beautiful UI, no backend (Screenshot A)
2. myapp-v2.vercel.app - Working backend, basic UI (Screenshot B)
3. myapp-staging.vercel.app - Broken, 404

Deployment 1 has superior UX design with onboarding.
Deployment 2 has functional backend but plain interface.

Recommendation: Integrate backend from #2 into UI from #1.
This gives you best of both worlds.

Which approach do you prefer?
```

**Result:** User makes informed decision, no wasted work.

---

## Technical Implementation

### Playwright Test Template

Save as: `~/.claude/scripts/test-deployment.js`

```javascript
import { test } from '@playwright/test';

const urls = process.argv.slice(2);

for (const url of urls) {
  test(`Test ${url}`, async ({ page }) => {
    await page.goto(url);

    console.log(`\n📊 ${url}`);
    console.log(`Title: ${await page.title()}`);
    console.log(`Has login: ${await page.locator('input[type="password"]').count() > 0}`);
    console.log(`Has nav: ${await page.locator('nav').count() > 0}`);
    console.log(`Main heading: ${await page.locator('h1').first().textContent()}`);

    await page.screenshot({
      path: `${url.replace(/https?:\/\//, '').replace(/\//g, '_')}.png`,
      fullPage: true
    });
  });
}
```

Usage:
```bash
cd ~/.claude/scripts
npx playwright test test-deployment.js https://app1.vercel.app https://app2.vercel.app
```

---

## Integration with Existing Workflows

### Update CLAUDE.md

Added to Critical Pitfalls:
- **ALWAYS inventory ALL deployments FIRST**
- **Test live URLs before building**

### Update COLLABORATION_CONTRACT.md

Added Principle 3a:
- **Inventory Before Building** - Check deployed versions before assuming local is canonical

### New Reference Document

This file: `deployment-discovery-protocol.md`
- Load when user mentions improving deployed apps
- Mandatory checklist before starting work

---

## Future Prevention

**Add to pre-work checklist:**

When user says "improve this app" or provides URL:
1. DISCOVER - Test all deployments (5 min)
2. COMPARE - Which is objectively better?
3. DECIDE - Pick the superior one (don't ask if answer is clear)
4. BUILD - Proceed with best foundation
5. SHOW - Visual proof that it's working

**Only ask if:** Two genuinely equal options with different trade-offs that user preference affects.

**New habit:** Discovery + Decision + Execution + Visual Proof

---

## Lessons for Other Project Types

**This applies beyond web apps:**

- **CLI tools:** Check npm registry, GitHub releases, what's actually published
- **APIs:** Test staging, production, dev environments before assuming
- **Documentation sites:** Check all domains, subdomains, GitHub Pages
- **Mobile apps:** Check TestFlight, App Store, what users actually see

**Universal principle:** Deployed reality > Local code assumptions

---

**Last Updated:** January 17, 2026 (Cross-referenced from COLLABORATION_CONTRACT.md "Discovery First" principle)
**Status:** Active protocol for all deployment work
**Trigger:** ANY mention of improving/deploying/enhancing existing apps
