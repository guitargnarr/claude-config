# Portfolio Projects Polish Plan

**Created:** 2025-12-05
**Objective:** Make all portfolio project links from interactive-resume professionally polished
**Estimated Time:** 2-3 hours total (can parallelize)

---

## Executive Summary

| Project | Current State | Effort | Priority |
|---------|---------------|--------|----------|
| BA Pathfinder | "Under Construction" banner | 45 min | HIGH |
| Traction (JobTrack) | Emoji icons, no Tailwind config | 45 min | MEDIUM |
| PhishGuard | 1 button color wrong | 10 min | LOW |
| Guitar Platform | Already polished | 0 min | DONE |

---

## Project 1: BA Pathfinder (HIGH PRIORITY)

**Problem:** Displays "Under Construction" with 4 "coming soon" features - looks unfinished

**Key Finding:** Junior BA roadmap data EXISTS (`/src/data/roadmaps/junior-ba/roadmap.json`) but has no UI. D3 is already installed as a dependency.

### Recommended Approach: Build Interactive D3 Visualization

**Files to create/modify:**
- `/Users/matthewscott/Desktop/2_AI_PROJECTS_PORTFOLIO/ba-pathfinder/src/components/RoadmapVisualization.tsx` (NEW)
- `/Users/matthewscott/Desktop/2_AI_PROJECTS_PORTFOLIO/ba-pathfinder/src/pages/index.tsx` (modify)
- `/Users/matthewscott/Desktop/2_AI_PROJECTS_PORTFOLIO/ba-pathfinder/src/pages/roadmap/junior.tsx` (NEW)

**Implementation:**
1. Create D3-based tree/node visualization component
2. Parse existing JSON roadmap data into D3 hierarchy
3. Render interactive nodes with:
   - Click to expand/collapse sections
   - Hover for topic details
   - Progress tracking (optional)
4. Remove "Under Construction" messaging
5. Add navigation from landing page to roadmap view
6. Apply teal/orange brand colors to visualization nodes

**JSON Data Structure (already exists):**
```
6 categories: Foundations, Elicitation, Documentation, Tools, Soft Skills, Career
25+ topics with dependencies, resources, time estimates
5 milestones with progress tracking
2 practice projects
```

**D3 Visualization Design:**
- Layout: Horizontal tree (left to right) or radial layout
- Root: "Junior BA Roadmap" (center)
- Level 1: 6 category nodes (color-coded per JSON)
- Level 2: Individual topics (expandable)
- Interactivity:
  - Click node to expand/collapse children
  - Hover shows description, time estimate, priority
  - Visual dependency lines between related nodes
- Colors: Map JSON colors to teal/orange brand (Foundations=teal, Career=orange, etc.)

**Components to create:**
1. `RoadmapVisualization.tsx` - D3 tree renderer
2. `RoadmapNode.tsx` - Individual node component
3. `NodeTooltip.tsx` - Hover details panel
4. `/pages/roadmap/junior.tsx` - Page wrapper

**Time estimate:** 2-2.5 hours

---

## Project 2: Traction/JobTrack (MEDIUM PRIORITY)

**Problem:** 18+ emoji icons look casual; colors not centralized in Tailwind

### Changes Required

**1. Add Tailwind color config** (10 min)
- File: `/Users/matthewscott/Projects/jobtrack/tailwind.config.ts`
- Add teal/orange extends to theme

**2. Replace emoji with Lucide icons** (30 min)
- Install: `npm install lucide-react`
- Files with emoji:
  - `/app/page.tsx` (11 emoji: 📈, 📋, 📊, 🎯, etc.)
  - `/app/dashboard/page.tsx` (7 emoji)
  - `/components/IndustryResponseRates.tsx` (4 emoji: 🔥, ❄️, ⚠️, ✓)

**Icon mapping:**
| Emoji | Lucide Icon |
|-------|-------------|
| 📈 | TrendingUp |
| 📊 | BarChart3 |
| 📋 | ClipboardList |
| 🎯 | Target |
| 💼 | Briefcase |
| 📧 | Mail |
| 🔥 | Flame |
| ❄️ | Snowflake |
| ⚠️ | AlertTriangle |
| ✓/✅ | CheckCircle |
| ⏳ | Clock |
| 🚀 | Rocket |

**3. Update dashboard stat card colors** (5 min)
- File: `/app/dashboard/page.tsx` lines 70-89
- Change from blue/purple/green to teal gradient variations

---

## Project 3: PhishGuard (LOW PRIORITY)

**Problem:** Contact form button is red-600, breaks teal/orange brand

**Single fix:**
- File: `/Users/matthewscott/Projects/phishguard-ui/app/components/ContactForm.tsx`
- Line 145: Change `bg-red-600 hover:bg-red-700` to `bg-teal-500 hover:bg-teal-400`

---

## Execution Strategy

### Recommended: Parallel (3 Terminals)

**Terminal 1: BA Pathfinder** (2-2.5 hrs)
- Build D3 visualization
- Largest effort, start first

**Terminal 2: Traction** (45 min)
- Replace emoji with Lucide icons
- Add Tailwind color config

**Terminal 3: PhishGuard** (10 min)
- Fix button color
- Quick win

All deploy simultaneously after PRs merged.

**Total wall-clock time:** ~2.5 hours (parallel) vs ~3.5 hours (sequential)

---

## Verification Checklist

After all changes:
- [ ] BA Pathfinder: No "Under Construction" visible
- [ ] BA Pathfinder: At least one roadmap accessible
- [ ] Traction: No emoji icons visible
- [ ] Traction: Teal/orange colors in Tailwind config
- [ ] PhishGuard: Contact button is teal, not red
- [ ] All three: Build succeeds
- [ ] All three: Deployed to Vercel

---

## Post-Deploy Verification

Test each live URL:
1. https://ba-pathfinder.vercel.app - should look complete
2. https://jobtrack-two.vercel.app - should have icon-based UI
3. https://phishguard-ui.vercel.app - contact form button should be teal

---

## User Decision

**BA Pathfinder:** Build full D3 interactive visualization (Option C selected)
