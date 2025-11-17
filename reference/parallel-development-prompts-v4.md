# Parallel Development Terminal Prompts - v4 (BATTLE-TESTED)

**Date:** November 16, 2025
**Lessons From:** Guitar Platform 4-feature deployment (4/4 success, issues identified & fixed)
**Strategy:** Autonomous terminals + automated merge orchestration + conflict prevention

---

## 🎯 CRITICAL IMPROVEMENTS IN V4

### Issues Fixed from V3 Run:

1. **Merge conflict markers surviving resolution** → Added mandatory grep check before commit
2. **Build failures in CI/CD** → Build verification now BLOCKS PR creation
3. **Manual conflict resolution needed** → Orchestrator handles conflicts automatically
4. **Worktree cleanup forgotten** → Automated cleanup step added

### V4 Enhancements:

✅ **Pre-PR Build Gate** - Build MUST pass before /push-pr (catches conflict markers)
✅ **Conflict Marker Detection** - Explicit grep in validation checkpoints
✅ **Orchestrator Pattern** - Main terminal manages merge sequence automatically
✅ **Cleanup Automation** - Worktree removal happens automatically post-merge

---

## 🎭 TERMINAL ROLES

### Terminal 1-4: Feature Implementers (Autonomous)
- Run independently in worktrees
- Implement features without coordination
- Create PRs automatically
- Self-validate before committing

### Terminal 5: Orchestrator (Recommended)
- Monitors all 4 terminals
- Executes merge sequence when all PRs ready
- Handles conflicts automatically
- Manages worktree cleanup
- Runs final deployment validation

**New Recommendation**: Use 5 terminals (4 workers + 1 orchestrator) for cleanest workflow

---

## 📋 UNIVERSAL PROMPT TEMPLATE (All 4 Terminals)

**Use this template for EVERY feature terminal, customizing only the task-specific sections.**

```markdown
## Task: [FEATURE NAME]

**Context:** [1-2 sentences about current state]

**Goal:** [What needs to be built]

**Requirements:**
- [Specific requirement 1]
- [Specific requirement 2]
- [Specific requirement 3]

**Reference Files:**
- [Path to reference file 1]
- [Path to reference file 2]

**Files to Create/Edit:**
- CREATE: [New file path]
- EDIT: [Existing file path] (specify what section)

**Acceptance Criteria:**
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

---

## ⚡ Autonomous Execution (CRITICAL - READ CAREFULLY)

**You will run autonomously for 30-45 minutes. Do NOT wait for user verification.**

**Your Role:** Autonomous implementer making continuous progress

**Core Principles:**
1. **Never stop to ask questions** - Make reasonable decisions and proceed
2. **Commit immediately** when feature works (don't wait for perfection)
3. **70-100% completion acceptable** - Document what's missing, ship anyway
4. **Build MUST pass before PR** - This is mandatory, not optional

---

## 🔄 Error Handling & Recovery

**3-Attempt Protocol:**

**Attempt 1 (0-2 min):** [Primary approach for this feature]
**Attempt 2 (2-5 min):** [Fallback approach]
**Attempt 3 (5-10 min):** [Minimal viable approach]

**After 3 attempts:** Document blockers, implement what you can, create PR anyway

---

## ✓ Self-Validation Checkpoints (MANDATORY)

### Checkpoint 1: Code Quality (5 min)
```bash
cd [worktree-path]/services/guitar
npm run lint
```
**Validation:**
- [ ] No new errors (pre-existing warnings OK)
- [ ] Imports resolve correctly
- [ ] No syntax errors

### Checkpoint 2: Build Verification (5 min) **⚠️ BLOCKING**
```bash
npm run build
```
**Validation:**
- [ ] Build completes without errors
- [ ] No "Unexpected token" errors
- [ ] Output bundle created in dist/

**IF BUILD FAILS:**
1. Check for conflict markers: `grep -r "<<<<<<" src/`
2. Fix errors, rebuild
3. Do NOT proceed to PR if build fails

### Checkpoint 3: Functionality (10 min)
```bash
npm run dev
# Test in browser
```
**Validation:**
- [ ] Feature works as expected
- [ ] No console errors
- [ ] Mobile responsive (test in DevTools)

### Checkpoint 4: Conflict Marker Check (2 min) **⚠️ CRITICAL**
```bash
cd [worktree-path]
git diff --cached | grep -E "<<<<<<|======|>>>>>>"
```
**Validation:**
- [ ] No conflict markers in staged changes
- [ ] If markers found, resolve before committing

**IF MARKERS FOUND:**
```bash
# Find them
grep -rn "<<<<<<" services/guitar/src/

# Fix manually, then re-verify
git diff --cached | grep -E "<<<<<<|======|>>>>>>"
```

### Checkpoint 5: Documentation (2 min)
- [ ] Code has comments explaining key logic
- [ ] Known issues documented
- [ ] PR description ready

---

## ⏱️ Time Management

**Total: 30-45 minutes**

**Breakdown:**
- 0-5min: Planning & file review
- 5-25min: Implementation
- 25-30min: Testing & validation
- 30-35min: **Build verification** (MANDATORY)
- 35-40min: **Conflict marker check** (MANDATORY)
- 40-45min: Commit + PR

**Hard Stops:**
- Minute 35: If build doesn't pass, STOP and debug
- Minute 40: If conflict markers found, STOP and fix
- Minute 45: Commit regardless of completion %

---

## 📊 Progress Reporting

**Output timestamped markers:**

```
[05min] 📖 [What you're reading/planning]
[15min] 🔨 [What you're building]
[25min] ✓ [What's working]
[30min] 🏗️ Build verification: [PASS/FAIL]
[35min] 🔍 Conflict marker check: [CLEAN/FOUND]
[40min] 📝 [Final status]
[45min] ✅ PR created: <url>
```

**Mandatory markers:**
- [30min] Build status
- [35min] Conflict marker status
- [45min] PR URL or blocker reason

---

## 🚀 Post-Completion Checklist

```bash
# Navigate to worktree
cd ~/Projects/.worktrees/projectlavos-monorepo/[feature-branch]/services/guitar

# Final validation sequence
npm run lint
npm run build  # MUST pass
npm run dev    # Quick visual check

# Check for conflict markers BEFORE committing
cd ~/Projects/.worktrees/projectlavos-monorepo/[feature-branch]
grep -r "<<<<<<" services/guitar/src/ || echo "✓ No conflict markers"

# Commit
/commit

# Create PR
/push-pr main

# Verify PR created
gh pr list
```

**Output final report:**
```
✅ Task Complete
- PR #X: <url>
- Build: PASSING ✓
- Conflict markers: NONE ✓
- Completion: X%
- Known issues: <list or "none">
```

---

## 📋 Known Issues Template

```markdown
## Known Issues / Future Work

### Not Implemented
- [ ] [Feature that wasn't built]

### Partial Implementation
- [ ] [Feature that works but could be better]

### Blockers Encountered
- [What you tried and why it didn't work]

### Recommended Next Steps
1. [What should be done next]
2. [Additional improvements]
```

---

**END OF UNIVERSAL TEMPLATE**

Use this template for all 4 feature terminals, customizing only the Task section.

```

---

## 🎯 ORCHESTRATOR TERMINAL PROMPT

**This is NEW in v4 - Terminal 5 manages the merge process**

```markdown
## Role: Parallel Development Orchestrator

**Mission:** Monitor 4 feature terminals, execute automated merge sequence when all PRs are ready, handle conflicts, verify deployment.

**Working Directory:** `~/Projects/projectlavos-monorepo` (main repo, NOT worktree)

---

## Phase 1: Monitor & Wait (0-45 min)

**Watch for completion signals from all 4 terminals:**

```bash
# Check PR status every 10 minutes
watch -n 600 'gh pr list --state open | grep feature/'

# When you see 4 open PRs, proceed to Phase 2
```

**Signals to watch for:**
- Terminal 1: "✅ PR created: #N"
- Terminal 2: "✅ PR created: #N"
- Terminal 3: "✅ PR created: #N"
- Terminal 4: "✅ PR created: #N"

**If any terminal stalls >45 min:**
- Check terminal output for blockers
- Decide: Wait or proceed with 3/4 features

---

## Phase 2: Pre-Merge Validation (5 min)

**Verify all PRs are mergeable:**

```bash
cd ~/Projects/projectlavos-monorepo

# Check all 4 PRs
gh pr view 9 --json mergeable,state
gh pr view 10 --json mergeable,state
gh pr view 11 --json mergeable,state
gh pr view 12 --json mergeable,state

# Pull latest main
git pull origin main
```

**Validation:**
- [ ] All PRs show "mergeable": "MERGEABLE"
- [ ] All PRs show "state": "OPEN"
- [ ] Main branch is up-to-date

**If any PR not mergeable:** Wait for CI/CD to complete

---

## Phase 3: Automated Merge Sequence (10-15 min)

**Execute merges in dependency order:**

### Step 1: Merge Independent Features First

```bash
# Merge navigation (no conflicts, touches App.jsx only)
gh pr merge 9 --squash --delete-branch
git pull origin main

# Verify build
cd services/guitar && npm run build
cd ../..
```

**Validation:**
- [ ] Build passes
- [ ] No conflict markers: `grep -r "<<<<<<" services/guitar/src/`

### Step 2: Merge First Catalog.jsx Feature

```bash
# Merge favorites (establishes localStorage pattern)
gh pr merge 11 --squash --delete-branch
git pull origin main

# Verify build
cd services/guitar && npm run build
cd ../..

# Check for conflict markers
grep -r "<<<<<<" services/guitar/src/
```

**Validation:**
- [ ] Build passes
- [ ] No conflict markers

### Step 3: Handle Conflicting PRs (Progress + Social)

**These will conflict with each other and with favorites. Handle sequentially.**

```bash
# Merge progress tracking
gh pr merge 12 --squash --delete-branch 2>&1

# If merge fails (conflicts):
# Option A: Resolve in worktree
cd ~/Projects/.worktrees/projectlavos-monorepo/feature/progress-tracking
git fetch origin
git rebase origin/main

# CRITICAL: Check for conflict markers DURING rebase
grep -rn "<<<<<<" services/guitar/src/

# If found, resolve, then:
git add services/guitar/src/pages/Catalog.jsx
git rebase --continue
git push --force-with-lease

# Try merge again
cd ~/Projects/projectlavos-monorepo
gh pr merge 12 --squash --delete-branch

# Option B: Let GitHub handle it (if worktree approach fails)
# Accept that conflicts will appear in main, fix immediately after merge

# Pull and verify
git pull origin main
cd services/guitar && npm run build

# MANDATORY: Check for conflict markers in main
grep -rn "<<<<<<" src/

# If markers found:
# Fix them immediately with Edit tool
# Commit: git add . && git commit -m "fix: Resolve merge conflicts in Catalog.jsx"
# Push: git push origin main
cd ../..
```

**Repeat for PR #10 (Social Sharing)**

---

## Phase 4: Post-Merge Validation (5 min)

**Verify all features integrated correctly:**

```bash
cd ~/Projects/projectlavos-monorepo/services/guitar

# Build check
npm run build
# Must succeed

# Check for any remaining conflict markers
grep -rn "<<<<<<" src/
grep -rn "======" src/
grep -rn ">>>>>>" src/
# Must return empty

# Quick functional test
npm run dev
# Open http://localhost:5173/catalog
# Visually verify:
# - Navigation bar at top
# - Heart icons on cards
# - Share icons on cards (below hearts)
# - Completion buttons on cards
# - Progress bar above filters
# - All filter buttons present
```

**Validation:**
- [ ] Build passes with no errors
- [ ] Zero conflict markers in codebase
- [ ] All 4 features visible in dev server
- [ ] No console errors

---

## Phase 5: Worktree Cleanup (2 min)

**Remove all worktrees and branches:**

```bash
cd ~/Projects/projectlavos-monorepo

# Remove worktrees (force flag needed if branches still exist)
git worktree remove ~/Projects/.worktrees/projectlavos-monorepo/feature/navigation-bar --force
git worktree remove ~/Projects/.worktrees/projectlavos-monorepo/feature/favorites-system --force
git worktree remove ~/Projects/.worktrees/projectlavos-monorepo/feature/progress-tracking --force
git worktree remove ~/Projects/.worktrees/projectlavos-monorepo/feature/social-sharing --force

# Delete local branches (already merged)
git branch -d feature/navigation-bar feature/favorites-system feature/progress-tracking feature/social-sharing

# Prune stale remote refs
git fetch --prune

# Verify cleanup
git worktree list
# Should only show main repo

git branch -a | grep feature/
# Should return empty (or only remote refs which are harmless)
```

**Validation:**
- [ ] No worktrees except main
- [ ] Local feature branches deleted
- [ ] Disk space freed (~100MB)

---

## Phase 6: Deployment Verification (2 min)

```bash
# Check deployment status
gh run list --limit 1

# Wait for deployment to complete (~40 seconds)
# Then verify production

# Open production URL
open https://guitar.projectlavos.com/catalog

# Or use curl to verify it loads
curl -I https://guitar.projectlavos.com/catalog | grep "200 OK"
```

**Validation:**
- [ ] Deployment succeeded
- [ ] Production URL loads
- [ ] No 404 or 500 errors

---

## 📊 Orchestrator Success Criteria

**Session Complete When:**
- ✅ All 4 PRs merged
- ✅ All builds passing
- ✅ Zero conflict markers in main
- ✅ Production deployment successful
- ✅ Worktrees cleaned up
- ✅ Working directory clean

**Output Final Report:**
```
🎉 Parallel Development Session Complete

Features Deployed: 4/4
PRs Merged: [#9, #10, #11, #12]
Build Status: PASSING ✓
Conflict Markers: NONE ✓
Production: https://guitar.projectlavos.com/catalog ✓
Worktrees: Cleaned up ✓
Total Time: [X] minutes

Code Stats:
- Files changed: X
- Lines added: +XXX
- Lines removed: -XX
- Net change: +XXX

Next Steps:
- Test all features in production
- Monitor GitHub Actions for E2E test results
- Clean up email notifications if desired
```

---

**END OF ORCHESTRATOR PROMPT**

```

---

## 🔧 SPECIFIC FEATURE PROMPTS (Guitar Platform Examples)

### Use these as templates for next parallel run on different project

Each prompt below uses the Universal Template + specific task details.

---

## FEATURE TEMPLATE 1: Navigation Component

**Good for:** Adding navigation to any multi-page app

```markdown
## Task: Add Navigation Bar to [PROJECT NAME]

**Context:** [Project] has [N] pages but no navigation bar. Users must use browser back button or manually type URLs.

**Goal:** Persistent navigation bar on all pages.

**Requirements:**
- Sticky top navigation
- Links to all pages: [list routes]
- Active route highlighting
- Mobile responsive
- Matches existing design theme

**Reference Files:**
- [App.jsx or main layout file]
- [Example of routing usage]

**Files to Create:**
- CREATE: src/components/Navigation.jsx

**Files to Edit:**
- EDIT: src/App.jsx (import Navigation, render above Routes)

**Acceptance Criteria:**
- [ ] Navigation component created
- [ ] Rendered on all pages
- [ ] All links work
- [ ] Active route highlighted
- [ ] Mobile responsive
- [ ] Build passes

---

## ⚡ Autonomous Execution

[Use Universal Template Section]

## 🔄 Error Handling

**Attempt 1:** useLocation from react-router-dom for active highlighting
**Attempt 2:** window.location.pathname if useLocation unavailable
**Attempt 3:** Basic links without active highlighting

## ✓ Self-Validation Checkpoints

[Use Universal Template Checkpoints 1-5]

**Feature-Specific Validation:**
```bash
npm run dev
# Click all navigation links
# Verify active highlighting changes
# Test mobile width (<768px)
```

## ⏱️ Time Management

- 0-5min: Review routing structure
- 5-25min: Implement Navigation component
- 25-30min: Test all links, mobile responsive
- 30-35min: **Build verification** (MANDATORY)
- 35-40min: **Conflict marker check** (MANDATORY)
- 40-45min: Commit + PR
```

---

## FEATURE TEMPLATE 2: localStorage State Feature

**Good for:** Favorites, bookmarks, preferences, progress tracking, any client-side persistence

```markdown
## Task: Add [FEATURE] with localStorage Persistence

**Context:** [App description]. Users want [feature capability] that persists across sessions.

**Goal:** Implement [feature] with localStorage.

**Requirements:**
- [UI element] to toggle state
- localStorage key: `[app-name]-[feature]`
- Store array of IDs: `["id1", "id2"]`
- Persist across page reloads
- Filter/view option to show only [featured items]
- Count badge showing total

**Reference Files:**
- [Main file to edit - usually catalog/list page]

**Files to Edit:**
- EDIT: [Page.jsx] (add state, localStorage, UI elements)

**Acceptance Criteria:**
- [ ] State toggles on click
- [ ] Page reload preserves state
- [ ] localStorage contains correct data structure
- [ ] Filter/view button works
- [ ] Count badge displays correctly
- [ ] Build passes

---

## ⚡ Autonomous Execution

[Use Universal Template]

## 🔄 Error Handling

**Attempt 1:** useState + useEffect pattern with try/catch
**Attempt 2:** If localStorage fails, use sessionStorage fallback
**Attempt 3:** In-memory state only, document localStorage as future enhancement

## ✓ Self-Validation Checkpoints

[Use Universal Template Checkpoints 1-5]

**Feature-Specific Validation:**
```bash
npm run dev

# Test persistence
# 1. Toggle state on 3 items
# 2. Check DevTools > Application > Local Storage > [key]
# 3. Refresh page (Cmd+R)
# 4. Verify state persisted

# Test filter
# 5. Click filter button
# 6. Verify count badge
# 7. Verify only toggled items show
```

## ⏱️ Time Management

- 0-5min: Review existing state patterns
- 5-20min: Implement state + localStorage + UI toggle
- 20-30min: Add filter button, test persistence
- 30-35min: **Build verification**
- 35-40min: **Conflict marker check**
- 40-45min: Commit + PR

## 📋 Implementation Pattern

**Standard localStorage Hook:**
```jsx
const [state, setState] = useState(() => {
  try {
    const stored = localStorage.getItem('key');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to load:', e);
    return [];
  }
});

useEffect(() => {
  try {
    localStorage.setItem('key', JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save:', e);
  }
}, [state]);
```
```

---

## FEATURE TEMPLATE 3: Modal/Dialog Feature

**Good for:** Share dialogs, settings panels, confirmation dialogs, any overlay UI

```markdown
## Task: Add [MODAL TYPE] to [APP]

**Context:** [App] needs [modal purpose].

**Goal:** Implement modal with [functionality].

**Requirements:**
- Button/icon to open modal
- Modal overlay with backdrop
- [Modal content/actions]
- Close on outside click
- Close on X button
- Mobile responsive
- z-index handling (avoid conflicts)

**Reference Files:**
- [Page where modal will appear]

**Files to Edit:**
- EDIT: [Page.jsx] (add modal state, trigger, modal JSX)

**Acceptance Criteria:**
- [ ] Modal opens on trigger
- [ ] Modal closes properly (X + outside click)
- [ ] [Feature-specific functionality works]
- [ ] Mobile responsive
- [ ] No z-index conflicts
- [ ] Build passes

---

## ⚡ Autonomous Execution

[Use Universal Template]

## 🔄 Error Handling

**Attempt 1:** Fixed positioning modal with backdrop
**Attempt 2:** Portal pattern if z-index issues
**Attempt 3:** Simple toggle (show/hide) without backdrop

## ✓ Self-Validation Checkpoints

[Use Universal Template Checkpoints 1-5]

**Feature-Specific Validation:**
```bash
npm run dev

# Test modal
# 1. Click trigger - modal opens
# 2. Click X - modal closes
# 3. Open modal, click backdrop - modal closes
# 4. Test [modal functionality]
# 5. Test mobile width - modal still usable
```

## ⏱️ Time Management

- 0-5min: Review existing modal patterns (if any)
- 5-25min: Implement modal state + JSX + close handlers
- 25-30min: Test open/close, functionality
- 30-35min: **Build verification**
- 35-40min: **Conflict marker check**
- 40-45min: Commit + PR

## 📋 Implementation Pattern

**Standard Modal Pattern:**
```jsx
const [modalOpen, setModalOpen] = useState(false);
const [modalData, setModalData] = useState(null);

const openModal = (data) => {
  setModalData(data);
  setModalOpen(true);
};

const closeModal = () => {
  setModalOpen(false);
  setModalData(null);
};

// In JSX:
{modalOpen && modalData && (
  <div
    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    onClick={closeModal}
  >
    <div
      className="bg-gray-800 rounded-lg p-6 max-w-md"
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={closeModal}>X</button>
      {/* Modal content */}
    </div>
  </div>
)}
```
```

---

## 🚀 ORCHESTRATOR EXECUTION GUIDE

**Copy-paste this into Terminal 5 when all 4 PRs are created:**

```bash
#!/bin/bash
# Parallel Development Orchestrator - Automated Merge Script
# Run this in ~/Projects/projectlavos-monorepo (main repo)

set -e  # Exit on error

echo "🎯 Starting automated merge sequence..."

# Phase 1: Verify PRs ready
echo "📋 Checking PR status..."
gh pr list --state open | grep feature/

read -p "All 4 PRs ready to merge? (y/n): " confirm
if [ "$confirm" != "y" ]; then
  echo "❌ Aborted by user"
  exit 1
fi

# Pull latest
git pull origin main

# Merge sequence
echo "🔀 Merging PR #9 (Navigation)..."
gh pr merge 9 --squash --delete-branch || echo "⚠️ Delete branch failed (worktree lock)"
git pull origin main
cd services/guitar && npm run build || exit 1
grep -r "<<<<<<" src/ && exit 1 || echo "✓ No conflict markers"
cd ../..

echo "🔀 Merging PR #11 (Favorites)..."
gh pr merge 11 --squash --delete-branch || echo "⚠️ Delete branch failed (worktree lock)"
git pull origin main
cd services/guitar && npm run build || exit 1
grep -r "<<<<<<" src/ && exit 1 || echo "✓ No conflict markers"
cd ../..

echo "🔀 Merging PR #12 (Progress) - expecting conflicts..."
gh pr merge 12 --squash --delete-branch || {
  echo "⚠️ Merge conflict detected, resolving in worktree..."

  cd ~/Projects/.worktrees/projectlavos-monorepo/feature/progress-tracking
  git fetch origin
  git rebase origin/main || {
    echo "🔧 Conflicts found, need manual resolution"
    grep -rn "<<<<<<" services/guitar/src/ || true
    echo ""
    echo "Manual steps:"
    echo "1. Resolve conflicts in services/guitar/src/pages/Catalog.jsx"
    echo "2. git add services/guitar/src/pages/Catalog.jsx"
    echo "3. git rebase --continue"
    echo "4. git push --force-with-lease"
    echo "5. Re-run this script"
    exit 1
  }

  # Check for conflict markers
  grep -rn "<<<<<<" services/guitar/src/ && {
    echo "❌ Conflict markers still present, cannot proceed"
    exit 1
  }

  git push --force-with-lease
  cd ~/Projects/projectlavos-monorepo
  gh pr merge 12 --squash --delete-branch || echo "⚠️ Delete branch failed"
}

git pull origin main
cd services/guitar && npm run build || exit 1
grep -r "<<<<<<" src/ && exit 1 || echo "✓ No conflict markers"
cd ../..

echo "🔀 Merging PR #10 (Social Sharing) - expecting conflicts..."
# [Same pattern as PR #12]

echo "🧹 Cleaning up worktrees..."
git worktree remove ~/Projects/.worktrees/projectlavos-monorepo/feature/navigation-bar --force || true
git worktree remove ~/Projects/.worktrees/projectlavos-monorepo/feature/favorites-system --force || true
git worktree remove ~/Projects/.worktrees/projectlavos-monorepo/feature/progress-tracking --force || true
git worktree remove ~/Projects/.worktrees/projectlavos-monorepo/feature/social-sharing --force || true

git branch -d feature/navigation-bar feature/favorites-system feature/progress-tracking feature/social-sharing 2>/dev/null || true
git fetch --prune

echo "✅ All PRs merged, worktrees cleaned up"
echo "🚀 Deployment: gh run list --limit 1"
echo "🌐 Production: https://guitar.projectlavos.com"
```

**Save as:** `~/.claude/scripts/merge-parallel-prs.sh`
**Usage:** `bash ~/.claude/scripts/merge-parallel-prs.sh`

---

## 📚 V4 IMPROVEMENTS SUMMARY

### New in V4:

1. **Mandatory Build Gate** - Build must pass before PR creation (catches conflict markers)
2. **Conflict Marker Detection** - Explicit grep checks at 3 points (pre-commit, post-merge, final validation)
3. **Orchestrator Pattern** - Dedicated terminal/script manages merge sequence
4. **Automated Cleanup** - Worktree removal happens automatically
5. **Bash Script Template** - Reusable merge orchestrator script
6. **Conflict Resolution Guide** - Step-by-step for handling rebase conflicts
7. **Triple Validation** - Check markers in worktree, after merge, in final build

### Removed from V3:

- ❌ Manual merge instructions (now automated in orchestrator)
- ❌ "Hope and pray" conflict handling (now explicit checks)
- ❌ Post-session cleanup reminders (now automated)

### Lessons Applied:

✅ Conflict markers can survive Edit tool resolution → Added grep checks
✅ Build failures waste CI/CD time → Build before PR is mandatory
✅ Manual cleanup is forgotten → Automated in orchestrator
✅ Merge conflicts predictable → Orchestrator handles them automatically

---

## 🎯 RECOMMENDED WORKFLOW CHANGES

### For Next Parallel Run:

**OLD Workflow (V3):**
1. Launch 4 terminals with feature prompts
2. Wait for all 4 PRs
3. Manually merge one by one
4. Manually resolve conflicts
5. Manually clean up worktrees

**NEW Workflow (V4):**
1. Launch 4 terminals with v4 feature prompts (include build gate)
2. Launch 5th terminal as orchestrator
3. Orchestrator waits for all 4 PRs
4. Orchestrator executes automated merge script
5. Orchestrator handles conflicts automatically
6. Orchestrator cleans up worktrees
7. Orchestrator verifies deployment

**Time Saved**: ~15-20 minutes (merge + cleanup automation)

---

## 📦 DELIVERABLES

**Files to Create for Next Run:**

1. **~/.claude/reference/parallel-development-prompts-v4.md** (this file)
   - Universal template
   - Orchestrator guide
   - Automated merge script
   - Feature templates

2. **~/.claude/scripts/merge-parallel-prs.sh**
   - Automated merge orchestrator
   - Conflict detection
   - Cleanup automation
   - Validation checks

3. **Updated playbook reference**
   - Link to v4 prompts
   - Document orchestrator pattern
   - Update success metrics (4/4 PRs, <3 min, auto-merge)

---

## 🎓 KEY LEARNINGS ENCODED IN V4

### 1. Build Verification is Mandatory
**Why:** Catches conflict markers before they reach CI/CD
**Where:** Checkpoint 2, before /push-pr
**Enforcement:** Terminal refuses to create PR if build fails

### 2. Conflict Markers Must Be Hunted
**Why:** Edit tool doesn't catch them, git doesn't prevent them
**Where:** Pre-commit, post-merge, final validation
**Method:** `grep -r "<<<<<<" src/`

### 3. Orchestrator Reduces Cognitive Load
**Why:** 4 simultaneous merges with conflicts is error-prone
**Solution:** Dedicated terminal handles merge sequence
**Result:** Consistent, repeatable process

### 4. Worktree Cleanup is Automated
**Why:** Manual cleanup gets forgotten
**When:** Immediately after merge verification
**How:** Orchestrator script with --force flag

### 5. Catalog.jsx is Integration Hub
**Why:** 4 features share this file
**Pattern:** State declarations → localStorage hooks → filter logic → UI elements
**Guidance:** Document icon positioning, use consistent patterns

---

## 🔄 ITERATION PLAN

**This Run (v3 → v4 improvements):**
- ✅ Identified all failure modes
- ✅ Created prevention mechanisms
- ✅ Automated merge orchestration
- ✅ Added build/conflict gates

**Next Run (v4 validation):**
- Apply v4 prompts to new feature set
- Use orchestrator pattern
- Measure improvements (merge time, conflict rate, manual intervention)
- Validate build gate effectiveness

**Future Runs (v5 improvements):**
- Consider AI-powered conflict resolution (Claude Code merge conflicts automatically)
- Add performance benchmarks (bundle size, load time)
- Implement preview deployments for pre-merge testing

---

**READY FOR NEXT PARALLEL DEVELOPMENT RUN**

Apply these v4 improvements to any project with 2-4 independent features.
