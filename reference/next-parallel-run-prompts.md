# Next Parallel Run - v3 Prompts (Ready to Paste)

**Project:** projectlavos-monorepo/services/guitar
**Use:** Copy-paste each prompt into corresponding terminal
**Template Version:** v3

---

## Terminal 1: Search Functionality

### Branch: `feature/search-functionality`

```markdown
## Task: Add Catalog Search Functionality

**Context:** Guitar learning platform at guitar.projectlavos.com. Catalog browser displays 70 lessons across 11 categories. Users need ability to quickly find specific lessons.

**Goal:** Add real-time search bar that filters lessons by title, technique, difficulty, and tier.

**Requirements:**
- Add search input component above catalog grid in CatalogBrowser
- Filter lessons as user types (debounced 300ms)
- Match against: lesson title, techniques array, difficulty, tier
- Case-insensitive search
- Clear button to reset search
- Show "No results found" message when filter returns empty
- Responsive design (works on mobile)
- No performance issues with 70 lessons

**Reference Files:**
- services/guitar/src/components/CatalogBrowser.jsx - Current catalog display, useMemo for filtering
- services/guitar/src/data/catalog.json - Lesson data structure with title, techniques, difficulty, tier
- services/guitar/src/App.jsx - Parent component (if state needs to be lifted)

**Acceptance Criteria:**
- [ ] Search input appears above catalog grid
- [ ] Typing filters lessons instantly (debounced)
- [ ] Clear button resets to show all 70 lessons
- [ ] Works on mobile (touch-friendly, proper sizing)
- [ ] No lag when typing
- [ ] Tests passing
- [ ] No linting errors

---

## ⚡ Autonomous Execution Guidelines (CRITICAL)

**You will run autonomously for 30-45 minutes. Do NOT wait for user verification.**

**Your Role:** Autonomous implementer who makes progress continuously

**Expected Behavior:**
1. **Continuous Progress** - Never stop to ask questions mid-execution
2. **Reasonable Decisions** - Use lodash debounce or custom implementation (your choice)
3. **Immediate Commits** - If tests pass, commit right away
4. **Partial Delivery** - Even without "No results" message is acceptable if core search works
5. **Document Blockers** - Can't figure out optimal debounce approach? Pick one and document

**What Success Looks Like:**
- ✅ PR created with working search
- ✅ Filtering works on some fields (even if not all)
- ✅ User can type and see results update
- ✅ Commit exists with clear message

**NOT Required for Success:**
- ❌ Perfect debounce implementation
- ❌ Search highlighting
- ❌ Advanced search operators
- ❌ Waiting for design approval

---

## 🔄 Error Handling & Recovery

**When you encounter errors:**

**Attempt 1:** Check if useMemo in CatalogBrowser can be extended for search filtering
**Attempt 2:** If complex, add separate useState for searchTerm and filter in component
**Attempt 3:** If still issues, implement basic .filter() without debounce, note in PR

**After 3 attempts:** Document what you tried, implement simplest working version

---

## ✓ Self-Validation Checkpoints

```bash
# Checkpoint 1: Code Quality (5 min)
cd services/guitar
npm run lint
- [ ] No errors or only warnings
- [ ] Imports resolve correctly
- [ ] Search input component renders

# Checkpoint 2: Functionality (10 min)
npm run dev
# Open browser, test search bar
- [ ] Search input appears
- [ ] Typing filters lessons
- [ ] Clear button works
- [ ] Mobile responsive (DevTools mobile view)

# Checkpoint 3: Tests (5 min)
npm test
- [ ] Existing tests still pass
- [ ] Build succeeds: npm run build
- [ ] No console errors in browser

# Checkpoint 4: Documentation (2 min)
- [ ] Code comments explain search logic
- [ ] Known issues listed if any
- [ ] PR description drafted
```

---

## ⏱️ Time Management

**Total Time: 30-45 minutes**

**Time Allocation:**
- 0-5min: Read CatalogBrowser.jsx, understand current filtering
- 5-20min: Implement search input + debounce + filter logic
- 20-30min: Test in browser, fix issues
- 30-38min: Validate checkpoints, test on mobile view
- 38-45min: Commit + PR

**Self-Awareness:**
- At minute 20: "Am I 50% done? Do I have a working search input?"
- At minute 30: "Can I finish validation in 10 minutes?"
- At minute 40: "Time to commit now, even if not perfect"

---

## 📊 Progress Reporting

**Output progress markers:**

```
[05min] 📖 Reviewed CatalogBrowser, identified useMemo pattern
[15min] 🔨 Search input implemented, debounce working
[25min] ✓ Browser test successful, filters working
[35min] 📝 Self-validation complete, preparing commit
[42min] ✅ PR created: <url>
```

---

## Post-Completion Checklist

1. ✅ Test in browser: `cd services/guitar && npm run dev`
2. ✅ Run tests: `npm test`
3. ✅ Run build: `npm run build`
4. ✅ Self-validation checkpoints above
5. ✅ Commit: `/commit` with conventional message
6. ✅ Create PR: `/push-pr main`
7. ✅ Verify PR created: `gh pr list`

**Do NOT wait for approval between steps.**

**Output final summary:**
```
✅ Task Complete
- PR: <url>
- Time: X minutes
- Completion: X% (list any missing features)
- Tests: X/X passing
- Known Issues: <list or "none">
```

---

## 📋 Known Issues Template

**If partial delivery, add to PR:**

```markdown
## Known Issues / Future Work

### Not Implemented
- [ ] <feature if any>

### Partial Implementation
- [ ] <feature if rough edges>

### Blockers Encountered
- <if any>

### Recommended Next Steps
1. <what's next>
```

---

Proceed autonomously. Track your time. Document blockers. Ship the PR.
```

---

## Terminal 2: Favorites/Bookmarks System

### Branch: `feature/favorites-system`

```markdown
## Task: Add Favorites/Bookmarks System

**Context:** Guitar platform with 70 lessons. Users want to bookmark lessons for quick access later. No backend authentication yet, so use localStorage for MVP.

**Goal:** Add heart icon to lesson cards that toggles favorite status with persistent storage.

**Requirements:**
- Heart icon on each lesson card (outline when not favorited, filled when favorited)
- Click toggles favorite status (visual feedback)
- localStorage persistence (key: "guitar-favorites", value: array of lesson IDs)
- "Favorites" filter tab in catalog (like existing categories)
- Show favorites count badge
- Works without login (local browser storage only)
- Visual indication on favorited lessons (filled heart persists)

**Reference Files:**
- services/guitar/src/components/CatalogBrowser.jsx - Lesson cards, filter tabs
- services/guitar/src/App.jsx - State management if needed
- services/guitar/src/data/catalog.json - Lesson structure (has id field)

**Acceptance Criteria:**
- [ ] Heart icon on each lesson card
- [ ] Clicking toggles favorite (heart fills/unfills)
- [ ] Favorites persist across page reload
- [ ] "Favorites" tab shows only favorited lessons
- [ ] Badge shows count (e.g., "Favorites (3)")
- [ ] Mobile responsive
- [ ] No console errors

---

## ⚡ Autonomous Execution Guidelines (CRITICAL)

**You will run autonomously for 30-45 minutes. Do NOT wait for user verification.**

**Your Role:** Autonomous implementer who makes progress continuously

**Expected Behavior:**
1. **Continuous Progress** - Never stop to ask questions
2. **Reasonable Decisions** - Use React heart icon from react-icons/fa or lucide-react (your choice)
3. **Immediate Commits** - If favorites toggle works, commit right away
4. **Partial Delivery** - Even without count badge is acceptable if heart toggle works
5. **Document Blockers** - Can't figure out filter tab integration? Implement heart first, note in PR

**What Success Looks Like:**
- ✅ PR created with working favorites
- ✅ Heart icon toggles correctly
- ✅ localStorage persists favorites
- ✅ Basic filtering works (even if tab UI needs polish)

**NOT Required for Success:**
- ❌ Perfect heart icon design
- ❌ Animated transitions
- ❌ Backend sync (localStorage only for MVP)

---

## 🔄 Error Handling & Recovery

**When you encounter errors:**

**Attempt 1:** Create custom hook `useFavorites()` that handles localStorage get/set
**Attempt 2:** If hook is complex, use simple useState + useEffect in CatalogBrowser
**Attempt 3:** If still issues, hardcode favorites in state temporarily, note localStorage needed

**After 3 attempts:** Implement what you can, document what's missing in PR

---

## ✓ Self-Validation Checkpoints

```bash
# Checkpoint 1: Code Quality (5 min)
cd services/guitar
npm run lint
- [ ] No errors
- [ ] Heart icon imports correctly
- [ ] localStorage code has no typos

# Checkpoint 2: Functionality (10 min)
npm run dev
# Test in browser
- [ ] Heart icon appears on lesson cards
- [ ] Clicking toggles heart (visual change)
- [ ] Refresh page: favorites still favorited
- [ ] "Favorites" filter shows favorited lessons

# Checkpoint 3: Tests (5 min)
npm test
- [ ] Existing tests pass
- [ ] Build succeeds: npm run build
- [ ] localStorage operations don't throw errors

# Checkpoint 4: Documentation (2 min)
- [ ] Code comments on useFavorites hook or useState logic
- [ ] Known issues documented
- [ ] PR description ready
```

---

## ⏱️ Time Management

**Total Time: 30-45 minutes**

**Time Allocation:**
- 0-5min: Review CatalogBrowser structure, identify where to add heart icon
- 5-25min: Implement heart icon + localStorage logic + toggle functionality
- 25-35min: Test in browser, verify persistence across reload
- 35-40min: Self-validation checkpoints
- 40-45min: Commit + PR

**Self-Awareness:**
- At minute 20: "Do I have a clickable heart that toggles?"
- At minute 30: "Does localStorage work on page reload?"
- At minute 40: "Commit now, filter tab can be refined later if needed"

---

## 📊 Progress Reporting

```
[05min] 📖 Identified lesson card structure in CatalogBrowser
[15min] 🔨 Heart icon implemented, localStorage logic added
[25min] ✓ Toggle working, testing persistence
[35min] 📝 Favorites persist across reload, validating
[43min] ✅ PR created: <url>
```

---

## Post-Completion Checklist

1. ✅ Test favorites toggle: Click hearts, reload page
2. ✅ Check localStorage: DevTools > Application > Local Storage
3. ✅ Test filter: "Favorites" tab shows only favorited
4. ✅ Run tests: `npm test`
5. ✅ Commit: `/commit`
6. ✅ Create PR: `/push-pr main`
7. ✅ Output summary with PR URL

**Do NOT wait for approval.**

---

Proceed autonomously. Ship the PR.
```

---

## Terminal 3: Progress Tracking

### Branch: `feature/progress-tracking`

```markdown
## Task: Add Lesson Progress Tracking

**Context:** Guitar platform with 70 lessons. Users want to track which lessons they've completed. Use localStorage for MVP (no backend).

**Goal:** Add completion checkmarks and progress indicators to lessons.

**Requirements:**
- "Mark as Complete" checkbox on lesson cards or detail view
- localStorage persistence (key: "guitar-progress", value: array of completed lesson IDs)
- Checkmark icon on completed lessons in catalog grid
- Progress bar showing "X/70 lessons completed"
- Filter by "Completed" and "In Progress"
- Optional: Reset progress button
- Optional: Tier-specific progress (X/Y free lessons)

**Reference Files:**
- services/guitar/src/components/CatalogBrowser.jsx - Lesson display
- services/guitar/src/data/catalog.json - Lesson structure (70 lessons total)
- services/guitar/src/App.jsx - If progress bar needs to be at app level

**Acceptance Criteria:**
- [ ] Checkbox or button to mark lesson complete
- [ ] Checkmark appears on completed lessons in grid
- [ ] Progress bar shows "X/70 complete"
- [ ] "Completed" filter works
- [ ] Progress persists across sessions
- [ ] Mobile responsive

---

## ⚡ Autonomous Execution Guidelines (CRITICAL)

**You will run autonomously for 30-45 minutes. Do NOT wait for user verification.**

**Your Role:** Autonomous implementer who makes progress continuously

**Expected Behavior:**
1. **Continuous Progress** - Never stop to ask questions
2. **Reasonable Decisions** - Checkbox on card vs separate modal - pick what seems best
3. **Immediate Commits** - If basic completion tracking works, commit
4. **Partial Delivery** - Even without progress bar is acceptable if checkmarks work
5. **Document Blockers** - Can't decide on UI? Implement simplest version

**What Success Looks Like:**
- ✅ PR created with working completion tracking
- ✅ Users can mark lessons complete
- ✅ Completed state persists
- ✅ Visual indication of completion (checkmark or similar)

**NOT Required for Success:**
- ❌ Perfect progress bar design
- ❌ Tier-specific progress (nice to have)
- ❌ Reset button (can be added later)

---

## 🔄 Error Handling & Recovery

**When you encounter errors:**

**Attempt 1:** Create useProgress() hook similar to useFavorites pattern
**Attempt 2:** If hook is complex, use simple useState + useEffect in component
**Attempt 3:** If localStorage fails, hardcode completed state, document in PR

**After 3 attempts:** Implement basic version, note what needs improvement

---

## ✓ Self-Validation Checkpoints

```bash
# Checkpoint 1: Code Quality (5 min)
cd services/guitar
npm run lint
- [ ] No errors
- [ ] localStorage code correct
- [ ] Checkbox/button renders

# Checkpoint 2: Functionality (10 min)
npm run dev
# Test in browser
- [ ] Can mark lesson complete
- [ ] Checkmark appears on completed lesson
- [ ] Reload page: completion persists
- [ ] Progress bar (if implemented) shows correct count

# Checkpoint 3: Tests (5 min)
npm test
- [ ] Tests pass
- [ ] Build succeeds: npm run build

# Checkpoint 4: Documentation (2 min)
- [ ] Code comments on useProgress logic
- [ ] Known issues documented
```

---

## ⏱️ Time Management

**Total Time: 30-45 minutes**

**Time Allocation:**
- 0-5min: Review lesson card structure, plan completion UI
- 5-25min: Implement checkbox + localStorage + checkmark display
- 25-35min: Test completion flow, verify persistence
- 35-40min: Add progress bar if time allows
- 40-45min: Commit + PR

**Self-Awareness:**
- At minute 20: "Can I mark a lesson complete and see it persist?"
- At minute 30: "Do I have time for progress bar or ship without it?"
- At minute 40: "Commit now, progress bar can be added in follow-up if needed"

---

## 📊 Progress Reporting

```
[05min] 📖 Reviewed lesson card structure
[15min] 🔨 Checkbox implemented, localStorage working
[25min] ✓ Completion tracking working, testing persistence
[35min] 📝 Progress bar added, validating
[42min] ✅ PR created: <url>
```

---

## Post-Completion Checklist

1. ✅ Test: Mark lesson complete, reload, verify persists
2. ✅ Check localStorage: DevTools > Application
3. ✅ Run tests: `npm test`
4. ✅ Commit: `/commit`
5. ✅ Create PR: `/push-pr main`

**Do NOT wait for approval.**

---

Proceed autonomously. Ship the PR.
```

---

## Terminal 4: Social Sharing

### Branch: `feature/social-sharing`

```markdown
## Task: Add Social Sharing Buttons

**Context:** Guitar platform with 70 shareable lessons. Users want to share lessons on social media to help platform grow organically.

**Goal:** Add share button to lesson cards with Twitter, Facebook, and Copy Link options.

**Requirements:**
- Share button/icon on each lesson card
- Share modal with 3 options:
  1. Twitter/X (opens new window with pre-filled tweet)
  2. Facebook (opens Facebook share dialog with URL)
  3. Copy Link (copies lesson URL to clipboard)
- Pre-filled Twitter text: "Check out this guitar lesson: [lesson title] on ProjectLavos Guitar 🎸"
- URL includes UTM parameters: `?utm_source=twitter&utm_medium=social&utm_campaign=lesson_share`
- "Copied!" confirmation message for copy link
- Mobile-friendly modal

**Reference Files:**
- services/guitar/src/components/CatalogBrowser.jsx - Lesson cards
- services/guitar/src/App.jsx - Routing (if lesson URLs needed)
- Current URL: guitar.projectlavos.com

**Acceptance Criteria:**
- [ ] Share icon/button on each lesson card
- [ ] Clicking opens modal with 3 sharing options
- [ ] Twitter button opens Twitter with pre-filled text + URL
- [ ] Facebook button opens Facebook share dialog
- [ ] Copy link copies to clipboard, shows "Copied!" message
- [ ] URLs include UTM parameters
- [ ] Modal closes on click outside or X button
- [ ] Mobile responsive

---

## ⚡ Autonomous Execution Guidelines (CRITICAL)

**You will run autonomously for 30-45 minutes. Do NOT wait for user verification.**

**Your Role:** Autonomous implementer who makes progress continuously

**Expected Behavior:**
1. **Continuous Progress** - Never stop to ask questions
2. **Reasonable Decisions** - Use react-share library or custom implementation (your choice)
3. **Immediate Commits** - If copy link works, commit even if social buttons need polish
4. **Partial Delivery** - Even just copy link working is acceptable, social buttons can be added
5. **Document Blockers** - Can't figure out Twitter API? Use direct URL approach

**What Success Looks Like:**
- ✅ PR created with working share functionality
- ✅ Users can share lessons (at least copy link)
- ✅ Modal UI exists and is usable
- ✅ At least 1 sharing method works

**NOT Required for Success:**
- ❌ Perfect modal design
- ❌ Share analytics tracking (UTM is nice-to-have)
- ❌ All 3 sharing methods (prioritize copy link + Twitter)

---

## 🔄 Error Handling & Recovery

**When you encounter errors:**

**Attempt 1:** Use react-share library (npm install react-share)
**Attempt 2:** If library issues, use direct window.open() with Twitter/FB share URLs
**Attempt 3:** If social buttons fail, implement copy link only, note others in PR

**After 3 attempts:** Deliver what works, document what's missing

---

## ✓ Self-Validation Checkpoints

```bash
# Checkpoint 1: Code Quality (5 min)
cd services/guitar
npm run lint
- [ ] No errors
- [ ] Modal component renders
- [ ] Share icon imports correctly

# Checkpoint 2: Functionality (10 min)
npm run dev
# Test in browser
- [ ] Share button appears on cards
- [ ] Clicking opens modal
- [ ] Copy link copies to clipboard (test with Ctrl+V)
- [ ] Twitter/FB buttons open correct URLs (check URL format)

# Checkpoint 3: Tests (5 min)
npm test
- [ ] Tests pass
- [ ] Build succeeds: npm run build

# Checkpoint 4: Documentation (2 min)
- [ ] Code comments on share URL generation
- [ ] Known issues if any
```

---

## ⏱️ Time Management

**Total Time: 30-45 minutes**

**Time Allocation:**
- 0-5min: Research react-share or plan custom implementation
- 5-20min: Implement share button + modal
- 20-30min: Implement copy link + Twitter/FB buttons
- 30-38min: Test all sharing methods
- 38-45min: Commit + PR

**Self-Awareness:**
- At minute 20: "Do I have a working share modal?"
- At minute 30: "Does at least copy link work?"
- At minute 40: "Ship what works, note what's missing"

---

## 📊 Progress Reporting

```
[05min] 📖 Reviewed react-share library, planning implementation
[15min] 🔨 Share modal implemented, copy link working
[25min] ✓ Twitter sharing working, testing FB
[35min] 📝 All share methods working, validating
[41min] ✅ PR created: <url>
```

---

## Post-Completion Checklist

1. ✅ Test copy link: Click, paste in browser
2. ✅ Test Twitter: Verify pre-filled text appears
3. ✅ Test Facebook: Verify lesson URL included
4. ✅ Run tests: `npm test`
5. ✅ Commit: `/commit`
6. ✅ Create PR: `/push-pr main`

**Do NOT wait for approval.**

---

Proceed autonomously. Ship the PR.
```

---

## Summary

**4 prompts ready for parallel execution**

**To launch:**
1. Create worktrees (use commands from next-parallel-run.md)
2. Open 4 terminals
3. Copy-paste each prompt above into corresponding terminal
4. Start metrics tracking
5. Monitor every 15-20 minutes
6. Log completions/failures
7. Analyze results

**Expected outcome:**
- 3-4 PRs created
- 3-4 hours total time
- 4-5x efficiency gain
- Valuable features shipped

**Good luck!**
