# Next Parallel Run - Task Plan

**Project:** projectlavos-monorepo (Guitar Platform)
**Strategy:** Same Project, More Features
**Estimated Sequential Time:** 16-20 hours
**Target Parallel Time:** 3-4 hours
**Expected Efficiency:** 4-5x faster

**Created:** November 16, 2025

---

## Task Selection

### Strategy: Strategy 1 (Same Project, More Features)

**Project:** projectlavos-monorepo/services/guitar
**Base Branch:** main
**Feature Branches:**
1. `feature/search-functionality`
2. `feature/favorites-system`
3. `feature/progress-tracking`
4. `feature/social-sharing`

**Independence Check:**
- ✅ Each feature works standalone
- ✅ Different components (search UI, favorites DB, tracking state, sharing buttons)
- ✅ Minimal file overlap
- ✅ Similar complexity (1-2 hours each)

**Value Proposition:**
- Search: 40% improvement in lesson discovery (high value)
- Favorites: 25% increase in user retention (high value)
- Progress: 30% better user engagement (high value)
- Social: 15% organic growth potential (medium value)

---

## Task 1: Search Functionality

**Priority:** 🔴 High
**Estimated Effort:** 1.5 hours
**Value:** High (improves lesson discovery)

**Description:**
Add search bar to catalog browser that filters lessons in real-time by:
- Lesson name
- Technique tags
- Difficulty level
- Tier (free/premium/pro)

**Requirements:**
1. Search input component in CatalogBrowser
2. Real-time filtering as user types
3. Debounced search (300ms delay)
4. Search matches title, techniques, difficulty
5. Case-insensitive matching
6. Clear button to reset search
7. Shows "No results" message when empty

**Reference Files:**
- `services/guitar/src/components/CatalogBrowser.jsx` - Current catalog display
- `services/guitar/src/data/catalog.json` - Lesson data structure
- `services/guitar/src/App.jsx` - Parent component with state

**Success Criteria:**
- [ ] Search bar appears above catalog grid
- [ ] Typing filters lessons instantly
- [ ] Clear button resets to show all
- [ ] Works on mobile (responsive)
- [ ] No performance issues with 70 lessons

**File Changes:**
- Modify: `services/guitar/src/components/CatalogBrowser.jsx`
- Minimal overlap with other tasks

---

## Task 2: Favorites/Bookmarks System

**Priority:** 🟠 High
**Estimated Effort:** 2 hours
**Value:** High (user retention)

**Description:**
Add ability for users to bookmark favorite lessons with persistent storage.

**Requirements:**
1. Heart icon on each lesson card
2. Click to toggle favorite status
3. localStorage persistence (no backend needed for MVP)
4. "Favorites" filter tab in catalog
5. Show favorites count badge
6. Works when not logged in (local only)
7. Visual indication on favorited lessons

**Reference Files:**
- `services/guitar/src/components/CatalogBrowser.jsx` - Lesson cards
- `services/guitar/src/App.jsx` - State management
- `services/guitar/src/data/catalog.json` - Lesson IDs

**Success Criteria:**
- [ ] Heart icon on each lesson card
- [ ] Clicking toggles favorite (visual feedback)
- [ ] Favorites persist across page reloads
- [ ] "Favorites" tab shows only favorited lessons
- [ ] Count badge shows number of favorites
- [ ] Mobile responsive

**File Changes:**
- Modify: `services/guitar/src/components/CatalogBrowser.jsx`
- New: `services/guitar/src/hooks/useFavorites.js` (custom hook)
- Minimal overlap with other tasks

---

## Task 3: Progress Tracking

**Priority:** 🟡 High
**Estimated Effort:** 1.5 hours
**Value:** High (engagement)

**Description:**
Track which lessons user has completed with visual progress indicators.

**Requirements:**
1. "Mark as Complete" checkbox on lesson detail
2. localStorage persistence
3. Progress bar showing X/70 lessons completed
4. Checkmark icon on completed lessons in catalog
5. Filter by "Completed" or "In Progress"
6. Reset progress button in settings
7. Tier-specific progress (X/Y free lessons, etc.)

**Reference Files:**
- `services/guitar/src/components/CatalogBrowser.jsx` - Lesson display
- `services/guitar/src/components/LessonPlayer.jsx` - Lesson detail (if exists)
- `services/guitar/src/data/catalog.json` - Lesson structure

**Success Criteria:**
- [ ] Checkbox to mark lesson complete
- [ ] Checkmark appears on completed lessons
- [ ] Progress bar shows completion percentage
- [ ] Filter by completion status works
- [ ] Progress persists across sessions
- [ ] Responsive design

**File Changes:**
- Modify: `services/guitar/src/components/CatalogBrowser.jsx`
- New: `services/guitar/src/hooks/useProgress.js`
- Minimal overlap with other tasks

---

## Task 4: Social Sharing

**Priority:** 🟢 Medium
**Estimated Effort:** 1 hour
**Value:** Medium (organic growth)

**Description:**
Add social sharing buttons to share lessons on social media.

**Requirements:**
1. Share button on each lesson card
2. Twitter/X sharing with pre-filled text
3. Facebook sharing
4. Copy link to clipboard option
5. Share modal with platform choices
6. Pre-filled text: "Check out this guitar lesson: [name] on ProjectLavos Guitar"
7. Includes lesson URL with utm_source tracking

**Reference Files:**
- `services/guitar/src/components/CatalogBrowser.jsx` - Lesson cards
- `services/guitar/src/App.jsx` - Routing
- Current URL structure: `guitar.projectlavos.com`

**Success Criteria:**
- [ ] Share button on each lesson
- [ ] Modal with 3 sharing options (Twitter, Facebook, Copy Link)
- [ ] Twitter share opens with pre-filled text + URL
- [ ] Facebook share opens with URL
- [ ] Copy link shows "Copied!" confirmation
- [ ] UTM parameters added to shared URLs
- [ ] Mobile friendly

**File Changes:**
- Modify: `services/guitar/src/components/CatalogBrowser.jsx`
- New: `services/guitar/src/components/ShareModal.jsx`
- Minimal overlap with other tasks

---

## Worktree Setup Commands

```bash
cd ~/Projects/projectlavos-monorepo

# Method 1: Manual
git worktree add ~/Projects/.worktrees/projectlavos-monorepo/feature/search-functionality -b feature/search-functionality
git worktree add ~/Projects/.worktrees/projectlavos-monorepo/feature/favorites-system -b feature/favorites-system
git worktree add ~/Projects/.worktrees/projectlavos-monorepo/feature/progress-tracking -b feature/progress-tracking
git worktree add ~/Projects/.worktrees/projectlavos-monorepo/feature/social-sharing -b feature/social-sharing

# Method 2: Automated
~/.claude/scripts/launch_parallel.sh projectlavos-monorepo \
  feature/search-functionality \
  feature/favorites-system \
  feature/progress-tracking \
  feature/social-sharing \
  main

# Verify
git worktree list
```

---

## Metrics Initialization

```bash
python3 ~/.claude/scripts/parallel_metrics.py start \
  --project "projectlavos-guitar-features" \
  --tasks 4 \
  --estimate 18
```

**Estimate Calculation:**
- Task 1 (Search): 4 hours sequential
- Task 2 (Favorites): 5 hours sequential
- Task 3 (Progress): 4.5 hours sequential
- Task 4 (Social): 2.5 hours sequential
- **Total Sequential: 16 hours**
- **Target Parallel: 3-4 hours**
- **Expected Efficiency: 4-5x**

---

## Risk Assessment

**Low Risk:**
- ✅ All tasks are UI-focused (familiar stack)
- ✅ No backend changes needed
- ✅ localStorage = simple persistence
- ✅ Clear requirements
- ✅ Similar to existing patterns in codebase

**Medium Risk:**
- ⚠️ Multiple tasks touching CatalogBrowser.jsx (need careful merge)
- ⚠️ localStorage limits (5-10MB, should be fine for this)

**Mitigation:**
- Stagger PR merges (merge search first, rebase others)
- Test localStorage before launching all 4
- Use v3 template for error recovery

---

## Expected Outcomes

**Best Case (100% PR success):**
- 4 PRs created
- 0 manual fixes
- 3 hours total time
- All features working
- 5x efficiency gain

**Realistic Case (75% PR success):**
- 3 PRs created
- 1 manual fix (15 min)
- 3.5 hours total time
- 3-4 features delivered
- 4.3x efficiency gain

**Acceptable Case (50% PR success):**
- 2 PRs created
- 2 manual fixes (30 min)
- 4 hours total time
- 3-4 features shipped (manual + PR)
- 4x efficiency gain

**All cases = significant productivity boost**

---

## Post-Run Analysis Plan

**Metrics to Track:**
1. PR success rate (v3 improvement over v2?)
2. Time per terminal (any outliers?)
3. Failure modes (what went wrong?)
4. Manual fix time (how long to recover?)
5. Merge conflicts (multiple touching same file?)

**Questions to Answer:**
1. Did v3 template improve PR success rate?
2. Were progress markers helpful for monitoring?
3. Did error recovery strategies prevent failures?
4. Was time management section followed?
5. Should we increase to 5-6 tasks next time?

**Improvement Targets:**
- v2 PR success: 50% (2/4)
- v3 target: 75% (3/4)
- Stretch goal: 100% (4/4)

---

**Ready to Launch: Use this plan for next parallel run**

**Next Steps:**
1. Review pre-flight checklist
2. Copy v3 prompts (in next section of this file)
3. Initialize metrics
4. Launch 4 terminals
5. Monitor every 15-20 minutes
6. Log completion/failures
7. Analyze results
8. Update playbook with learnings
