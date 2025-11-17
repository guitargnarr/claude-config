# Guitar Platform Parallel Development - v3 Prompts (PRODUCTION READY)

**Date:** November 16, 2025
**Project:** projectlavos-monorepo/services/guitar
**Strategy:** Sequential Merge & Rebase
**Estimated Total Time:** 40-65 minutes parallel + 10-20 min merge

---

## 🎯 TERMINAL 1: Navigation Bar

### Branch: `feature/navigation-bar`
### Working Directory: `~/Projects/.worktrees/projectlavos-monorepo/feature/navigation-bar`

```markdown
## Task: Add Navigation Bar to Guitar Platform

**Context:** Guitar learning platform with 4 pages (Home, FretVision, TabPlayer, Catalog). Currently NO navigation bar exists - users can navigate FROM Home page using clickable cards, but once they leave Home, they're stranded. Must use browser back button or manually type URLs to navigate.

**Goal:** Create persistent navigation bar that appears on all 4 pages, enabling seamless navigation between pages.

**Requirements:**
- Sticky top navigation bar (fixed position or static, your choice)
- Links to all 4 pages: Home `/`, FretVision `/fretvision`, TabPlayer `/tabplayer`, Catalog `/catalog`
- Highlight active route (different color/style for current page)
- Mobile responsive (horizontal menu or hamburger - your choice)
- Dark theme matching existing design (bg-gray-800, text-gray-100, green/blue accents)
- Uses react-router-dom's `<Link>` component
- Navigation stays visible when scrolling (optional sticky behavior)

**Reference Files:**
- `/Users/matthewscott/Projects/projectlavos-monorepo/services/guitar/src/App.jsx` - Where you'll import Navigation
- `/Users/matthewscott/Projects/projectlavos-monorepo/services/guitar/src/pages/Home.jsx` - Example of Link usage (lines 16, 39, 63)
- Existing routes: `/` (Home), `/fretvision`, `/tabplayer`, `/catalog`

**Create New File:**
- `/Users/matthewscott/Projects/projectlavos-monorepo/services/guitar/src/components/Navigation.jsx`

**Edit Existing File:**
- `/Users/matthewscott/Projects/projectlavos-monorepo/services/guitar/src/App.jsx` (add Navigation component above Routes)

**Acceptance Criteria:**
- [ ] Navigation component created in src/components/Navigation.jsx
- [ ] Navigation imported and rendered in App.jsx (above Routes)
- [ ] All 4 page links work (click navigates correctly)
- [ ] Active route is visually highlighted
- [ ] Mobile responsive (test in DevTools mobile view)
- [ ] Dark theme matches existing pages
- [ ] No console errors

**Technology Stack:**
- React 19.2.0 with hooks
- react-router-dom 7.9.6 (use Link and useLocation)
- Tailwind CSS v3.4.18
- No icon library available (use inline SVG or text)

---

## ⚡ Autonomous Execution Guidelines (CRITICAL)

**You will run autonomously for 30-45 minutes. Do NOT wait for user verification.**

**Your Role:** Autonomous implementer who makes progress continuously

**Expected Behavior:**
1. **Continuous Progress** - Never stop to ask questions mid-execution
2. **Reasonable Decisions** - Sticky nav bar or static? Pick one and implement. Hamburger or horizontal? Your call.
3. **Immediate Commits** - If nav bar works, commit right away
4. **Partial Delivery** - Even without perfect styling is acceptable if links work
5. **Document Blockers** - Can't decide on mobile layout? Implement horizontal scroll, note alternative in PR

**What Success Looks Like:**
- ✅ PR created with working navigation
- ✅ All 4 links navigate correctly
- ✅ Active route is highlighted (even if simple)
- ✅ Works on desktop (mobile can be basic)

**NOT Required for Success:**
- ❌ Perfect mobile hamburger menu
- ❌ Animated transitions
- ❌ Logo/branding (text "Guitar Platform" is fine)
- ❌ Dropdown menus

---

## 🔄 Error Handling & Recovery

**When you encounter errors:**

**Attempt 1 (0-2 min):** Check if useLocation from react-router-dom works for active highlighting
**Attempt 2 (2-5 min):** If useLocation fails, use window.location.pathname
**Attempt 3 (5-10 min):** If still issues, implement basic links without active highlighting, note in PR

**After 3 attempts:** Document what you tried, implement basic navigation, create PR with "Known Issues"

---

## ✓ Self-Validation Checkpoints

```bash
# Checkpoint 1: Code Quality (5 min)
cd /Users/matthewscott/Projects/projectlavos-monorepo/services/guitar
npm run lint
- [ ] No errors (warnings OK if pre-existing)
- [ ] Navigation.jsx imports correctly
- [ ] App.jsx renders Navigation without errors

# Checkpoint 2: Functionality (10 min)
npm run dev
# Open http://localhost:5173
- [ ] Navigation bar appears on Home page
- [ ] Clicking "FretVision" navigates to /fretvision
- [ ] Clicking "TabPlayer" navigates to /tabplayer
- [ ] Clicking "Catalog" navigates to /catalog
- [ ] Clicking "Home" returns to /
- [ ] Active route is highlighted (different color)
- [ ] Navigation bar appears on ALL pages (not just Home)

# Test mobile view (DevTools)
- [ ] Navigation doesn't break on mobile width
- [ ] Links are clickable on mobile

# Checkpoint 3: Tests (5 min)
npm test
# If tests exist, they should still pass
# If no tests, that's OK - skip this

npm run build
- [ ] Build succeeds without errors

# Checkpoint 4: Documentation (2 min)
- [ ] Code comments explain Navigation component
- [ ] Known issues listed if any
- [ ] PR description ready
```

**If a checkpoint fails:**
- Try to fix in 2-3 minutes
- If unfixable, document in PR description
- Proceed to commit anyway

---

## ⏱️ Time Management

**Total Time: 30-45 minutes**

**Time Allocation:**
- 0-5min: Read App.jsx, understand routing, plan Navigation component
- 5-25min: Create Navigation.jsx, implement links, add to App.jsx
- 25-35min: Test navigation, verify active highlighting, test mobile
- 35-40min: Self-validation checkpoints
- 40-45min: Commit + PR

**Self-Awareness:**
- At minute 20: "Do I have a working nav bar with clickable links?"
- At minute 30: "Does active route highlighting work?"
- At minute 40: "Commit now, even if mobile needs polish"

---

## 📊 Progress Reporting

**Output progress markers:**

```
[05min] 📖 Reviewed App.jsx routing structure, planning Navigation component
[15min] 🔨 Navigation.jsx created, links implemented, active highlighting added
[25min] ✓ Navigation rendering on all pages, links work
[35min] 📝 Mobile responsive, validation complete
[42min] ✅ PR created: <url>
```

---

## Post-Completion Checklist

```bash
# Navigate to your worktree
cd ~/Projects/.worktrees/projectlavos-monorepo/feature/navigation-bar/services/guitar

# Test
npm run dev
# Manually click all 4 links, verify they work

# Lint
npm run lint

# Build
npm run build

# Commit
cd ~/Projects/.worktrees/projectlavos-monorepo/feature/navigation-bar
/commit

# Create PR
/push-pr main

# Verify
gh pr list
```

**Do NOT wait for approval between steps.**

**Output final summary:**
```
✅ Task Complete
- PR: <url>
- Time: X minutes
- Completion: X% (list any missing features)
- Tests: Build passing
- Known Issues: <list or "none">
```

---

## 📋 Known Issues Template

**If partial delivery, add to PR:**

```markdown
## Known Issues / Future Work

### Not Implemented
- [ ] Mobile hamburger menu (using horizontal scroll instead)
- [ ] Logo/branding

### Partial Implementation
- [ ] Active route highlighting works but could be more visually distinct

### Blockers Encountered
- None

### Recommended Next Steps
1. Add logo to left side of nav bar
2. Implement hamburger menu for mobile (<768px)
3. Add smooth scroll behavior
```

---

## 🎯 Example Navigation Component (Reference)

**Use this as inspiration if you get stuck (DO NOT copy-paste, adapt to your needs):**

```jsx
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/fretvision', label: 'FretVision' },
    { path: '/tabplayer', label: 'Tab Player' },
    { path: '/catalog', label: 'Catalog' },
  ];

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold text-green-400">Guitar Platform</div>
          <div className="flex space-x-4">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded transition-colors ${
                  location.pathname === link.path
                    ? 'bg-green-500 text-gray-900'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
```

**Then in App.jsx:**
```jsx
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Navigation />  {/* Add this line */}
        <Routes>
          {/* existing routes */}
        </Routes>
      </div>
    </Router>
  );
}
```

---

**Proceed autonomously. Track your time. Document blockers. Ship the PR.**

**Good luck!**
```

---

## 🎯 TERMINAL 2: Favorites/Bookmarks System

### Branch: `feature/favorites-system`
### Working Directory: `~/Projects/.worktrees/projectlavos-monorepo/feature/favorites-system`

```markdown
## Task: Add Favorites/Bookmarks System to Catalog

**Context:** Guitar catalog with 70 lessons currently displayed in grid. Users want ability to bookmark favorite lessons for quick access. No backend exists yet, so use localStorage for MVP.

**Goal:** Add heart icon to each lesson card that toggles favorite status with persistent localStorage storage.

**Requirements:**
- Heart icon on each lesson card (outline when not favorited, filled when favorited)
- Click heart to toggle favorite status (visual feedback immediate)
- localStorage persistence using key: `guitar-favorites`
- Store array of filenames: `["filename1.gp", "filename2.gp"]`
- Add "Favorites" filter button (like existing Tier/Difficulty filters)
- Show count badge: "Favorites (X)"
- Works without backend/authentication (local browser storage only)
- Heart icon persists across page reloads

**Reference Files:**
- `/Users/matthewscott/Projects/projectlavos-monorepo/services/guitar/src/pages/Catalog.jsx` - MAIN FILE TO EDIT
- `/Users/matthewscott/Projects/projectlavos-monorepo/services/guitar/data/catalog.json` - Lesson structure reference

**Catalog.jsx Current Structure:**
- Lines 1-19: Imports, color constants
- Lines 21-28: useState for filters, useMemo for filtering logic
- Lines 30-196: JSX render (filters + grid)
- Lines 56-92: Filter buttons (Tier and Difficulty)
- Lines 96-175: Lesson cards grid (.map over filteredFiles)

**Data Structure (catalog.json):**
```json
{
  "files": [
    {
      "filename": "Mini Course - What Makes Up A Chord_.gp",
      "title": "Mini Course - What Makes Up A Chord_",
      "category": "chord",
      "techniques": ["chord"],
      "difficulty": "beginner",
      "tier": "free"
    }
  ]
}
```

**Use `filename` as unique ID for favorites.**

**Acceptance Criteria:**
- [ ] Heart icon appears on each lesson card
- [ ] Clicking heart toggles favorite (outline ↔ filled)
- [ ] Page reload preserves favorites (localStorage works)
- [ ] "Favorites" filter button shows only favorited lessons
- [ ] Count badge shows number of favorites
- [ ] Mobile responsive (heart icon doesn't break layout)
- [ ] No console errors

---

## ⚡ Autonomous Execution Guidelines (CRITICAL)

**You will run autonomously for 30-45 minutes. Do NOT wait for user verification.**

**Your Role:** Autonomous implementer who makes progress continuously

**Expected Behavior:**
1. **Continuous Progress** - Never stop to ask questions
2. **Reasonable Decisions** - Where to place heart icon? Top-right corner of card? Your call.
3. **Immediate Commits** - If favorites toggle works, commit right away
4. **Partial Delivery** - Even without count badge is acceptable if heart toggle works
5. **Document Blockers** - Can't get filter button working? Ship heart toggle, note filter in PR

**What Success Looks Like:**
- ✅ PR created with working favorites
- ✅ Heart icon toggles correctly
- ✅ localStorage persists favorites
- ✅ Basic filtering works (even if tab UI needs polish)

**NOT Required for Success:**
- ❌ Perfect heart icon animation
- ❌ Favorites synced across devices (localStorage only)
- ❌ Favorites export/import feature

---

## 🔄 Error Handling & Recovery

**When you encounter errors:**

**Attempt 1 (0-2 min):** Create custom hook `useFavorites()` that handles localStorage get/set
**Attempt 2 (2-5 min):** If hook is complex, use simple useState + useEffect in Catalog.jsx
**Attempt 3 (5-10 min):** If localStorage fails, hardcode favorites in state temporarily, note in PR

**After 3 attempts:** Implement what you can, document what's missing in PR

---

## ✓ Self-Validation Checkpoints

```bash
# Checkpoint 1: Code Quality (5 min)
cd /Users/matthewscott/Projects/projectlavos-monorepo/services/guitar
npm run lint
- [ ] No errors
- [ ] Heart icon SVG renders correctly
- [ ] localStorage code has no typos

# Checkpoint 2: Functionality (10 min)
npm run dev
# Test in browser
- [ ] Heart icon appears on each lesson card (70 cards total)
- [ ] Clicking heart toggles visual state (outline → filled)
- [ ] Refresh page (Cmd+R): favorites still favorited
- [ ] "Favorites" filter button exists
- [ ] Clicking "Favorites" shows only favorited lessons
- [ ] Count badge shows correct number

# Check localStorage (DevTools)
# Application > Local Storage > http://localhost:5173
# Should see: guitar-favorites: ["filename1.gp", "filename2.gp"]

# Checkpoint 3: Tests (5 min)
npm test
- [ ] Existing tests pass
npm run build
- [ ] Build succeeds

# Checkpoint 4: Documentation (2 min)
- [ ] Code comments on favorites logic
- [ ] Known issues documented
```

---

## ⏱️ Time Management

**Total Time: 30-45 minutes**

**Time Allocation:**
- 0-5min: Read Catalog.jsx structure, plan favorites state + localStorage
- 5-25min: Implement useState, localStorage logic, heart icon, toggle handler
- 25-35min: Add filter button, test persistence, verify count
- 35-40min: Self-validation checkpoints
- 40-45min: Commit + PR

**Self-Awareness:**
- At minute 20: "Can I click a heart and see it toggle?"
- At minute 30: "Does localStorage persist across page reload?"
- At minute 40: "Commit now, filter tab can be refined later if needed"

---

## 📊 Progress Reporting

```
[05min] 📖 Analyzed Catalog.jsx filter pattern, planning favorites state
[15min] 🔨 useState + localStorage implemented, heart icon added to cards
[25min] ✓ Toggle working, testing persistence across reload
[35min] 📝 Filter button added, favorites filter working
[43min] ✅ PR created: <url>
```

---

## Post-Completion Checklist

```bash
cd ~/Projects/.worktrees/projectlavos-monorepo/feature/favorites-system/services/guitar

# Test favorites
npm run dev
# Click 3 hearts, reload page, verify they stay favorited
# Check DevTools > Application > Local Storage

# Lint and build
npm run lint
npm run build

# Commit
cd ~/Projects/.worktrees/projectlavos-monorepo/feature/favorites-system
/commit

# Create PR
/push-pr main

# Output summary
```

**Do NOT wait for approval.**

---

## 📋 Implementation Guide

**Step 1: Add State + localStorage Logic (Lines 1-30 in Catalog.jsx)**

```jsx
import { useState, useMemo, useEffect } from 'react';
import catalogData from '../../data/catalog.json';

// Add after existing state (around line 18):
const [favorites, setFavorites] = useState(() => {
  // Load from localStorage on mount
  try {
    const stored = localStorage.getItem('guitar-favorites');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to load favorites:', e);
    return [];
  }
});

// Save to localStorage whenever favorites change
useEffect(() => {
  try {
    localStorage.setItem('guitar-favorites', JSON.stringify(favorites));
  } catch (e) {
    console.error('Failed to save favorites:', e);
  }
}, [favorites]);

// Toggle favorite function
const toggleFavorite = (filename) => {
  setFavorites(prev =>
    prev.includes(filename)
      ? prev.filter(f => f !== filename)
      : [...prev, filename]
  );
};
```

**Step 2: Add Filter State (Line ~19)**

```jsx
const [selectedTier, setSelectedTier] = useState('all');
const [selectedDifficulty, setSelectedDifficulty] = useState('all');
const [showFavorites, setShowFavorites] = useState(false); // ADD THIS
```

**Step 3: Update useMemo Filter Logic (Lines 21-28)**

```jsx
const filteredFiles = useMemo(() => {
  return catalogData.files.filter((file) => {
    const matchesSearch = file.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = selectedTier === 'all' || file.tier === selectedTier;
    const matchesDifficulty = selectedDifficulty === 'all' || file.difficulty === selectedDifficulty;
    const matchesFavorites = !showFavorites || favorites.includes(file.filename); // ADD THIS
    return matchesSearch && matchesTier && matchesDifficulty && matchesFavorites; // UPDATE THIS
  });
}, [searchQuery, selectedTier, selectedDifficulty, showFavorites, favorites]); // UPDATE DEPS
```

**Step 4: Add Favorites Filter Button (After Difficulty filter, ~line 92)**

```jsx
{/* Favorites filter */}
<div className="space-x-2">
  <button
    onClick={() => setShowFavorites(!showFavorites)}
    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
      showFavorites
        ? 'bg-pink-500 text-gray-900'
        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
    }`}
  >
    Favorites {favorites.length > 0 && `(${favorites.length})`}
  </button>
</div>
```

**Step 5: Add Heart Icon to Card (Inside card div, ~line 103)**

```jsx
<div className="bg-gray-800 rounded-lg p-5 border border-gray-700 hover:border-gray-600 transition-all hover:shadow-lg relative">

  {/* Heart Icon (top-right corner) */}
  <button
    onClick={(e) => {
      e.stopPropagation(); // Prevent card click if you add click handler later
      toggleFavorite(file.filename);
    }}
    className="absolute top-3 right-3 p-1 hover:scale-110 transition-transform"
    aria-label={favorites.includes(file.filename) ? 'Remove from favorites' : 'Add to favorites'}
  >
    {favorites.includes(file.filename) ? (
      // Filled heart
      <svg className="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
      </svg>
    ) : (
      // Outline heart
      <svg className="w-6 h-6 text-gray-400 hover:text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )}
  </button>

  {/* Existing card content */}
  <h3 className="text-lg font-semibold mb-3 text-gray-100 line-clamp-2">
    {file.title}
  </h3>
  {/* ... rest of card ... */}
</div>
```

---

**Proceed autonomously. Ship the PR.**
```

---

## 🎯 TERMINAL 3: Progress Tracking

### Branch: `feature/progress-tracking`
### Working Directory: `~/Projects/.worktrees/projectlavos-monorepo/feature/progress-tracking`

```markdown
## Task: Add Lesson Progress Tracking to Catalog

**Context:** Guitar catalog with 70 lessons. Users want to track which lessons they've completed. Use localStorage for MVP (no backend).

**Goal:** Add completion checkmarks and progress indicators to lessons.

**Requirements:**
- Checkbox or checkmark button on each lesson card
- localStorage persistence using key: `guitar-progress`
- Store array of filenames: `["completed1.gp", "completed2.gp"]`
- Checkmark icon overlay on completed lessons in grid
- Progress bar showing "X/70 lessons completed" (display above filters)
- Filter options: "All" | "Completed" | "In Progress"
- Use `filename` as unique ID (same as favorites)
- Completed state persists across page reloads

**Reference Files:**
- `/Users/matthewscott/Projects/projectlavos-monorepo/services/guitar/src/pages/Catalog.jsx` - MAIN FILE TO EDIT
- `/Users/matthewscott/Projects/projectlavos-monorepo/services/guitar/data/catalog.json` - 70 lessons total

**Catalog.jsx Current Structure:**
- Lines 1-19: Imports, color constants
- Lines 21-28: useState for filters, useMemo for filtering logic
- Lines 30-40: Header section (good place for progress bar)
- Lines 56-92: Filter buttons
- Lines 96-175: Lesson cards grid

**IMPORTANT:** Terminal 2 (Favorites) will merge BEFORE you. When you rebase, you'll get:
- `favorites` state
- `toggleFavorite` function
- Heart icon in cards
- Favorites filter button
- Updated `useMemo` filter logic

**Your job:** Add progress tracking ALONGSIDE favorites (not replace it).

**Acceptance Criteria:**
- [ ] Checkbox/checkmark on each lesson card
- [ ] Clicking marks lesson complete (visual feedback)
- [ ] Page reload preserves progress
- [ ] Progress bar shows "X/70 complete"
- [ ] "Completed" and "In Progress" filters work
- [ ] Works alongside favorites feature (both icons visible)
- [ ] Mobile responsive

---

## ⚡ Autonomous Execution Guidelines (CRITICAL)

**You will run autonomously for 30-45 minutes. Do NOT wait for user verification.**

**Your Role:** Autonomous implementer who makes progress continuously

**Expected Behavior:**
1. **Continuous Progress** - Never stop to ask questions
2. **Reasonable Decisions** - Checkbox vs button? Pick one. Where to place it? Bottom-right? Your call.
3. **Immediate Commits** - If completion tracking works, commit right away
4. **Partial Delivery** - Even without progress bar is acceptable if checkmarks work
5. **Document Blockers** - Can't get progress bar perfect? Basic "X/70" text is fine, note in PR

**What Success Looks Like:**
- ✅ PR created with working completion tracking
- ✅ Users can mark lessons complete
- ✅ Completed state persists
- ✅ Visual indication of completion (checkmark or similar)

**NOT Required for Success:**
- ❌ Perfect progress bar design with animation
- ❌ Tier-specific progress (just overall 70 lessons)
- ❌ Reset button (can be added later)

---

## 🔄 Error Handling & Recovery

**When you encounter errors:**

**Attempt 1 (0-2 min):** Create useProgress() hook similar to useFavorites pattern
**Attempt 2 (2-5 min):** If hook is complex, use useState + useEffect in Catalog.jsx
**Attempt 3 (5-10 min):** If localStorage fails, hardcode completed state, document in PR

**After 3 attempts:** Implement basic version, note what needs improvement

---

## ✓ Self-Validation Checkpoints

```bash
# Checkpoint 1: Code Quality (5 min)
cd /Users/matthewscott/Projects/projectlavos-monorepo/services/guitar
npm run lint
- [ ] No errors
- [ ] localStorage code correct
- [ ] Checkbox/button renders

# Checkpoint 2: Functionality (10 min)
npm run dev
- [ ] Can mark lesson complete (click checkbox/checkmark)
- [ ] Checkmark appears on completed lesson
- [ ] Reload page (Cmd+R): completion persists
- [ ] Progress bar shows correct count (e.g., "3/70")
- [ ] "Completed" filter shows only completed lessons
- [ ] "In Progress" filter shows non-completed lessons

# Check localStorage
# DevTools > Application > Local Storage
# Should see: guitar-progress: ["filename1.gp", "filename2.gp"]

# Checkpoint 3: Tests (5 min)
npm test
npm run build
- [ ] Build succeeds

# Checkpoint 4: Documentation (2 min)
- [ ] Code comments on progress logic
```

---

## ⏱️ Time Management

**Total Time: 30-45 minutes**

**Time Allocation:**
- 0-5min: Review Catalog.jsx structure (will have favorites already), plan progress state
- 5-25min: Implement useState, localStorage, checkmark, toggle handler
- 25-35min: Add progress bar, test filters, verify persistence
- 35-40min: Self-validation
- 40-45min: Commit + PR

**Self-Awareness:**
- At minute 20: "Can I mark a lesson complete and see it persist?"
- At minute 30: "Do I have time for progress bar or ship without it?"
- At minute 40: "Commit now, progress bar can be added in follow-up if needed"

---

## 📊 Progress Reporting

```
[05min] 📖 Reviewed Catalog.jsx structure (favorites already merged)
[15min] 🔨 useState + localStorage for progress implemented
[25min] ✓ Completion tracking working, testing persistence
[35min] 📝 Progress bar added, filters working
[42min] ✅ PR created: <url>
```

---

## Post-Completion Checklist

```bash
cd ~/Projects/.worktrees/projectlavos-monorepo/feature/progress-tracking/services/guitar

# Test
npm run dev
# Mark 3 lessons complete, reload, verify they stay completed

# Lint and build
npm run lint
npm run build

# Commit
cd ~/Projects/.worktrees/projectlavos-monorepo/feature/progress-tracking
/commit

# Create PR
/push-pr main

# IMPORTANT: After PR created, you'll need to rebase on main
# (Terminal 2's favorites feature will be merged by then)
# User will handle the rebase + conflict resolution
```

---

## 📋 Implementation Guide

**Step 1: Add Progress State (After favorites state, ~line 25)**

```jsx
// After favorites state:
const [completed, setCompleted] = useState(() => {
  try {
    const stored = localStorage.getItem('guitar-progress');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to load progress:', e);
    return [];
  }
});

useEffect(() => {
  try {
    localStorage.setItem('guitar-progress', JSON.stringify(completed));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}, [completed]);

const toggleCompleted = (filename) => {
  setCompleted(prev =>
    prev.includes(filename)
      ? prev.filter(f => f !== filename)
      : [...prev, filename]
  );
};
```

**Step 2: Add Progress Filter State**

```jsx
const [selectedTier, setSelectedTier] = useState('all');
const [selectedDifficulty, setSelectedDifficulty] = useState('all');
const [showFavorites, setShowFavorites] = useState(false);
const [progressFilter, setProgressFilter] = useState('all'); // 'all' | 'completed' | 'in-progress'
```

**Step 3: Update useMemo (Add progress filter)**

```jsx
const filteredFiles = useMemo(() => {
  return catalogData.files.filter((file) => {
    const matchesSearch = file.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = selectedTier === 'all' || file.tier === selectedTier;
    const matchesDifficulty = selectedDifficulty === 'all' || file.difficulty === selectedDifficulty;
    const matchesFavorites = !showFavorites || favorites.includes(file.filename);

    // Add progress filter
    const matchesProgress =
      progressFilter === 'all' ||
      (progressFilter === 'completed' && completed.includes(file.filename)) ||
      (progressFilter === 'in-progress' && !completed.includes(file.filename));

    return matchesSearch && matchesTier && matchesDifficulty && matchesFavorites && matchesProgress;
  });
}, [searchQuery, selectedTier, selectedDifficulty, showFavorites, favorites, progressFilter, completed]);
```

**Step 4: Add Progress Bar (After header, before filters, ~line 40)**

```jsx
{/* Progress Bar */}
<div className="mb-6">
  <div className="flex items-center justify-between mb-2">
    <span className="text-sm text-gray-400">
      Overall Progress: {completed.length}/{catalogData.total_files} lessons completed
    </span>
    <span className="text-sm text-gray-400">
      {Math.round((completed.length / catalogData.total_files) * 100)}%
    </span>
  </div>
  <div className="w-full bg-gray-700 rounded-full h-2">
    <div
      className="bg-green-500 h-2 rounded-full transition-all duration-300"
      style={{ width: `${(completed.length / catalogData.total_files) * 100}%` }}
    />
  </div>
</div>
```

**Step 5: Add Progress Filter Buttons (After favorites button)**

```jsx
{/* Progress filter */}
<div className="space-x-2">
  <span className="text-sm text-gray-400">Progress:</span>
  {['all', 'completed', 'in-progress'].map((filter) => (
    <button
      key={filter}
      onClick={() => setProgressFilter(filter)}
      className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
        progressFilter === filter
          ? 'bg-green-500 text-gray-900'
          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
      }`}
    >
      {filter === 'in-progress' ? 'In Progress' : filter.charAt(0).toUpperCase() + filter.slice(1)}
    </button>
  ))}
</div>
```

**Step 6: Add Checkmark to Card (Bottom-right corner, near Preview button)**

```jsx
{/* At bottom of card, before Preview button */}
<div className="flex items-center justify-between mt-4">
  <button
    onClick={() => toggleCompleted(file.filename)}
    className={`flex items-center gap-2 px-3 py-1 rounded text-sm font-medium transition-all ${
      completed.includes(file.filename)
        ? 'bg-green-500/20 text-green-400 border border-green-500'
        : 'bg-gray-700 text-gray-400 border border-gray-600 hover:border-green-500'
    }`}
  >
    {completed.includes(file.filename) ? (
      <>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        Completed
      </>
    ) : (
      <>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Mark Complete
      </>
    )}
  </button>

  {/* Existing Preview button */}
  <button className="...">Preview (Coming Soon)</button>
</div>
```

---

**Proceed autonomously. Ship the PR.**
```

---

## 🎯 TERMINAL 4: Social Sharing

### Branch: `feature/social-sharing`
### Working Directory: `~/Projects/.worktrees/projectlavos-monorepo/feature/social-sharing`

```markdown
## Task: Add Social Sharing Buttons to Catalog

**Context:** Guitar platform with 70 shareable lessons. Users want to share lessons on social media to help platform grow organically. Currently deployed at https://guitar.projectlavos.com (use this domain for share URLs).

**Goal:** Add share button to lesson cards with Twitter, Facebook, and Copy Link options.

**Requirements:**
- Share button/icon on each lesson card
- Clicking opens share modal with 3 options:
  1. **Twitter/X** - Opens Twitter with pre-filled tweet
  2. **Facebook** - Opens Facebook share dialog
  3. **Copy Link** - Copies lesson URL to clipboard
- Pre-filled Twitter text: `"Check out this guitar lesson: {lesson.title} 🎸"`
- Lesson URLs: `https://guitar.projectlavos.com/catalog?lesson={encodeURIComponent(filename)}`
- UTM parameters: `&utm_source=twitter&utm_medium=social&utm_campaign=lesson_share`
- "Copied!" toast notification (brief message, fades after 2 seconds)
- Modal closes on click outside or X button
- Mobile-friendly modal

**Reference Files:**
- `/Users/matthewscott/Projects/projectlavos-monorepo/services/guitar/src/pages/Catalog.jsx` - MAIN FILE TO EDIT
- Current domain: `guitar.projectlavos.com`

**IMPORTANT:** Terminals 2 (Favorites) and 3 (Progress) will merge BEFORE you. When you rebase, Catalog.jsx will have:
- `favorites` state + heart icon
- `completed` state + checkmark
- Updated filter logic
- Progress bar

**Your job:** Add sharing ALONGSIDE existing features.

**Acceptance Criteria:**
- [ ] Share button on each lesson card
- [ ] Modal opens with 3 sharing options
- [ ] Twitter share opens with pre-filled text + URL
- [ ] Facebook share opens with URL
- [ ] Copy link copies to clipboard, shows "Copied!" message
- [ ] UTM parameters included in shared URLs
- [ ] Modal closes properly
- [ ] Mobile friendly

---

## ⚡ Autonomous Execution Guidelines (CRITICAL)

**You will run autonomously for 30-45 minutes. Do NOT wait for user verification.**

**Your Role:** Autonomous implementer who makes progress continuously

**Expected Behavior:**
1. **Continuous Progress** - Never stop to ask questions
2. **Reasonable Decisions** - Modal design? Simple centered div with dark background. Icon? Inline SVG.
3. **Immediate Commits** - If copy link works, commit even if social buttons need polish
4. **Partial Delivery** - Even just copy link working is acceptable, social buttons can be added
5. **Document Blockers** - Can't figure out Twitter URL format? Use direct link, note in PR

**What Success Looks Like:**
- ✅ PR created with working share functionality
- ✅ Users can share lessons (at least copy link)
- ✅ Modal UI exists and is usable
- ✅ At least 1 sharing method works

**NOT Required for Success:**
- ❌ Perfect modal animation
- ❌ Share analytics tracking (UTM is nice-to-have)
- ❌ All 3 sharing methods (prioritize copy link + Twitter)

---

## 🔄 Error Handling & Recovery

**When you encounter errors:**

**Attempt 1 (0-2 min):** Use direct Twitter/FB share URLs with window.open()
**Attempt 2 (2-5 min):** If social URLs fail, implement copy link only, note others in PR
**Attempt 3 (5-10 min):** If clipboard API fails (older browsers), use fallback with textarea

**After 3 attempts:** Deliver what works, document what's missing

---

## ✓ Self-Validation Checkpoints

```bash
# Checkpoint 1: Code Quality (5 min)
cd /Users/matthewscott/Projects/projectlavos-monorepo/services/guitar
npm run lint
- [ ] No errors
- [ ] Modal component renders
- [ ] Share icon imports correctly

# Checkpoint 2: Functionality (10 min)
npm run dev
- [ ] Share button appears on each card
- [ ] Clicking opens modal
- [ ] Copy link button copies to clipboard
- [ ] Test paste (Cmd+V): URL appears
- [ ] Twitter button opens Twitter (check URL format)
- [ ] Facebook button opens Facebook
- [ ] Modal closes when clicking outside
- [ ] "Copied!" message appears and fades

# Checkpoint 3: Tests (5 min)
npm test
npm run build
- [ ] Build succeeds

# Checkpoint 4: Documentation (2 min)
- [ ] Code comments on share URL generation
```

---

## ⏱️ Time Management

**Total Time: 30-45 minutes**

**Time Allocation:**
- 0-5min: Plan share modal design, review clipboard API
- 5-20min: Implement share button + modal component
- 20-30min: Implement copy link + Twitter/FB buttons
- 30-38min: Test all sharing methods, fix issues
- 38-45min: Commit + PR

**Self-Awareness:**
- At minute 20: "Do I have a working share modal?"
- At minute 30: "Does copy link work?"
- At minute 40: "Ship what works, note what's missing"

---

## 📊 Progress Reporting

```
[05min] 📖 Reviewed clipboard API, planning share modal
[15min] 🔨 Share modal implemented, copy link working
[25min] ✓ Twitter/Facebook sharing implemented
[35min] 📝 All share methods working, validating
[41min] ✅ PR created: <url>
```

---

## Post-Completion Checklist

```bash
cd ~/Projects/.worktrees/projectlavos-monorepo/feature/social-sharing/services/guitar

# Test
npm run dev
# Click share, copy link, paste in browser
# Click Twitter, verify URL opens correctly
# Click Facebook, verify URL opens

# Lint and build
npm run lint
npm run build

# Commit
cd ~/Projects/.worktrees/projectlavos-monorepo/feature/social-sharing
/commit

# Create PR
/push-pr main

# User will handle rebase + merge conflicts
```

---

## 📋 Implementation Guide

**Step 1: Add Modal State (After progress state)**

```jsx
const [shareModalOpen, setShareModalOpen] = useState(false);
const [shareLesson, setShareLesson] = useState(null);
const [copiedMessage, setCopiedMessage] = useState(false);
```

**Step 2: Share URL Generation Function**

```jsx
const getShareUrl = (lesson, source = 'direct') => {
  const baseUrl = 'https://guitar.projectlavos.com/catalog';
  const lessonParam = `lesson=${encodeURIComponent(lesson.filename)}`;
  const utmParams = source !== 'direct'
    ? `utm_source=${source}&utm_medium=social&utm_campaign=lesson_share`
    : '';

  return utmParams
    ? `${baseUrl}?${lessonParam}&${utmParams}`
    : `${baseUrl}?${lessonParam}`;
};

const openShareModal = (lesson) => {
  setShareLesson(lesson);
  setShareModalOpen(true);
};

const closeShareModal = () => {
  setShareModalOpen(false);
  setShareLesson(null);
  setCopiedMessage(false);
};
```

**Step 3: Sharing Functions**

```jsx
const shareOnTwitter = () => {
  if (!shareLesson) return;
  const text = `Check out this guitar lesson: ${shareLesson.title} 🎸`;
  const url = getShareUrl(shareLesson, 'twitter');
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  window.open(twitterUrl, '_blank', 'width=550,height=420');
};

const shareOnFacebook = () => {
  if (!shareLesson) return;
  const url = getShareUrl(shareLesson, 'facebook');
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  window.open(facebookUrl, '_blank', 'width=550,height=420');
};

const copyLink = async () => {
  if (!shareLesson) return;
  const url = getShareUrl(shareLesson);

  try {
    await navigator.clipboard.writeText(url);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = url;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  }
};
```

**Step 4: Add Share Button to Card (Top-right, near heart icon)**

```jsx
{/* Share button (top-right, below heart) */}
<button
  onClick={(e) => {
    e.stopPropagation();
    openShareModal(file);
  }}
  className="absolute top-12 right-3 p-1 hover:scale-110 transition-transform text-gray-400 hover:text-blue-400"
  aria-label="Share lesson"
>
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
</button>
```

**Step 5: Add Share Modal (After main content, before closing div)**

```jsx
{/* Share Modal */}
{shareModalOpen && shareLesson && (
  <div
    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
    onClick={closeShareModal}
  >
    <div
      className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Share Lesson</h3>
        <button
          onClick={closeShareModal}
          className="text-gray-400 hover:text-gray-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Lesson Title */}
      <p className="text-gray-300 mb-6">{shareLesson.title}</p>

      {/* Share Buttons */}
      <div className="space-y-3">
        {/* Twitter */}
        <button
          onClick={shareOnTwitter}
          className="w-full flex items-center gap-3 px-4 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
          </svg>
          Share on Twitter
        </button>

        {/* Facebook */}
        <button
          onClick={shareOnFacebook}
          className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Share on Facebook
        </button>

        {/* Copy Link */}
        <button
          onClick={copyLink}
          className="w-full flex items-center gap-3 px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors relative"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {copiedMessage ? 'Copied! ✓' : 'Copy Link'}
        </button>
      </div>
    </div>
  </div>
)}
```

---

**Proceed autonomously. Ship the PR.**
```

---

## 📦 DELIVERY PACKAGE

**Files Created:**
- `/Users/matthewscott/.claude/reference/guitar-parallel-prompts-READY.md`

**Contents:**
- ✅ Terminal 1: Navigation Bar (complete, production-ready)
- ✅ Terminal 2: Favorites System (complete, production-ready)
- ✅ Terminal 3: Progress Tracking (complete, production-ready)
- ✅ Terminal 4: Social Sharing (complete, production-ready)

**All v3 Improvements Included:**
- ✅ Error Handling & Recovery (3-attempt protocol)
- ✅ Self-Validation Checkpoints
- ✅ Time Management (minute-by-minute)
- ✅ Progress Reporting (timestamped markers)
- ✅ Known Issues Template
- ✅ Autonomous Execution Guidelines
- ✅ Concrete implementation code examples

**Status:** READY TO PASTE INTO TERMINALS

**Next Action:** Copy each prompt from the file above and paste into corresponding terminal.
