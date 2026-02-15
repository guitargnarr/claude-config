# Plan: Portfolio Cards UI/UX Overhaul

## File to modify
`~/Projects/projectlavos-monorepo/main-site/src/App.jsx` (primary)
`~/Projects/projectlavos-monorepo/main-site/src/App.css` (minor additions)

## Changes (7 issues, ordered by impact)

### 1. Fix broken/missing preview images (HIGH)
- **1 missing file**: `clater-jewelers.png` -- generate via Playwright screenshot of the live site
- **1 filename mismatch**: App.jsx references `/previews/passtime-fish-house.png` but file on disk is `passtimefishhouse.png` -- rename the file to match the reference
- **3 orphan SVGs**: `jwcafe.svg`, `fableflow.svg`, `passtimefishhouse.svg` -- delete (PNGs exist)

### 2. Add category filter tabs to Louisville section (HIGH)
- Extract unique categories from `localClients`, consolidate 25 categories into ~10 groups:
  - All | Medical/Healthcare | Beauty/Spa | Food/Drink | Retail | Entertainment | Services | Legal/Finance | Real Estate | Education
- Add filter state: `const [clientFilter, setClientFilter] = useState('All')`
- Render horizontal scrollable pill buttons above the grid
- Filter `localClients` before `.map()`: show only matching category
- Animate transitions with opacity/scale on filter change
- Style: teal pills matching existing badge style (`bg-teal-500/10 text-teal-400`)

### 3. Improve visual hierarchy between sections (MEDIUM)
- Add a subtle horizontal divider (`border-t border-slate-700/30`) + more vertical spacing (`mb-16`) between Louisville / Practical Apps / Conceptual Explorations
- Make Louisville section header more prominent (currently same size as sub-headers)

### 4. Fix description truncation UX (MEDIUM)
- Change from single-line `truncate` to 2-line clamp: `line-clamp-2` (Tailwind)
- Gives enough context without requiring expand

### 5. Make expand affordance more visible (LOW)
- Replace tiny `text-xs` triangle with a more visible chevron icon
- Add "Click to expand" tooltip on hover (via `title` attribute)

### 6. Improve mobile card density (MEDIUM)
- On mobile, reduce image aspect ratio from `aspect-[1200/630]` to `aspect-video` (16:9)
- This makes cards shorter, reducing scroll fatigue with 51+ items

### 7. Image quality consistency (LOW - separate PR)
- Skip for now -- the dark previews are real screenshots of dark-themed sites, not broken images. The filter tabs (#2) will make browsing manageable.

## Verification
1. `npm run build` passes
2. Visual check: desktop + mobile screenshots via Playwright
3. Filter tabs work: clicking a category shows only matching cards
4. All preview images load (no broken images)
5. Expand/collapse still works after changes
