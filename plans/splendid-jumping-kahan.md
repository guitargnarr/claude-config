# Portfolio Consolidation & Brand Unification Plan

**Created:** 2025-12-01
**Status:** READY FOR EXECUTION
**Scope:** Professional consolidation of all deployments under unified teal/orange brand

---

## Executive Summary

Consolidate 20+ Vercel deployments into a coherent professional portfolio. Rebrand projectlavos.com from "AI Consulting for Louisville SMBs" to a developer portfolio hub. Apply consistent teal/orange brand system across all projects.

**Key Decisions (User-Confirmed):**
- Brand System: Teal (#14b8a6) + Orange (#f97316) - consistent across all projects
- Homepage: Rebrand as Portfolio Hub (not AI Consulting)
- Orphaned Projects: Investigate before deleting

---

## Part 1: Current State Inventory

### Working Deployments (Keep & Brand)
| URL | Project | Status | Action |
|-----|---------|--------|--------|
| projectlavos.com | main-site | 200 | Rebrand to portfolio hub |
| guitar.projectlavos.com | guitar | 200 | Apply teal/orange |
| interactive-resume-ten-pi.vercel.app | resume | 200 | Already branded |
| ba-pathfinder.vercel.app | pathfinder | 200 | Apply teal/orange |
| ourjourney-app.vercel.app | ourjourney | 200 | Apply teal/orange |
| vercel-demo-flame.vercel.app | mirador | 200 | Already branded (low priority) |

### 404 Projects (Investigate)
| URL Returning 404 | Likely Working Alternative | Action |
|-------------------|---------------------------|--------|
| guitar-platform.vercel.app | guitar.projectlavos.com | Delete orphan |
| jaspermatters.vercel.app | jaspermatters-job-intelligence.vercel.app | Check & decide |
| phishguard-demo.vercel.app | phishguard-ui.vercel.app | Check & decide |
| jobtrack-gamma.vercel.app | jobtrack-two.vercel.app | Check & decide |

### Excluded (Separate Workflows)
- 2025-skills-to-know.vercel.app (Claude Desktop)
- vercel-demo-flame.vercel.app (Mirador - already updated, low priority)

---

## Part 2: Brand System (Canonical)

### Colors
```css
/* Primary */
--teal-500: #14b8a6;    /* Primary actions, headers */
--teal-400: #2dd4bf;    /* Hover states, accents */

/* Secondary */
--orange-500: #f97316;  /* CTAs, highlights */
--orange-400: #fb923c;  /* Hover states */

/* Neutrals */
--slate-900: #0f172a;   /* Dark backgrounds */
--slate-800: #1e293b;   /* Cards on dark */
--slate-700: #334155;   /* Borders */
--slate-300: #cbd5e1;   /* Muted text */
--white: #ffffff;       /* Text on dark */
```

### Tailwind Config Pattern
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        teal: {
          400: '#2dd4bf',
          500: '#14b8a6',
        },
        orange: {
          400: '#fb923c',
          500: '#f97316',
        }
      }
    }
  }
}
```

### Visual Style
- Dark mode primary: slate-900 backgrounds
- Gradient headers: from-teal-400 to-orange-400
- CTAs: bg-teal-500 hover:bg-teal-400
- Accent highlights: text-orange-400
- Professional, clean - no neobrutalism

---

## Part 3: Execution Plan

### Phase 1: Investigation (15 min)
1. Test each 404 URL to confirm status
2. Find working alternative URLs
3. Decide: delete orphan or redirect

### Phase 2: Homepage Rebrand (45 min)
Rebrand projectlavos.com as Portfolio Hub:

**Current:** AI Consulting for Louisville SMBs with demos
**New:** Developer Portfolio showcasing projects

**New Homepage Structure:**
1. Hero: Matthew Scott - Full Stack Developer
2. Featured Projects grid (guitar, resume, pathfinder, etc.)
3. Skills/Tech stack section
4. Contact/Links

**Files to Modify:**
- `/main-site/src/App.jsx` - Complete rewrite
- `/main-site/tailwind.config.js` - Update to teal/orange
- `/main-site/public/og-image.png` - New social preview

### Phase 3: Apply Brand to Other Projects (60 min)

**Priority Order:**
1. guitar.projectlavos.com - High visibility
2. ba-pathfinder.vercel.app - Working project
3. ourjourney-app.vercel.app - Working project

**Per Project:**
- Update tailwind.config.js colors
- Update globals.css base colors
- Update header/nav styling
- Update CTA buttons
- Generate matching OG image

### Phase 4: Cleanup (15 min)
- Delete confirmed orphan Vercel projects
- Update any redirects needed
- Verify all OG images working

---

## Part 4: Files to Modify

### main-site (Homepage Rebrand)
```
/Users/matthewscott/Projects/projectlavos-monorepo/main-site/
├── src/App.jsx              # Complete rewrite as portfolio
├── tailwind.config.js       # Update colors
├── public/og-image.png      # New social preview
└── index.html               # Update meta tags
```

### guitar platform
```
/Users/matthewscott/Projects/projectlavos-monorepo/services/guitar/
├── src/App.jsx              # Update header colors
├── tailwind.config.js       # Teal/orange palette
└── public/og-image.png      # Generate if missing
```

### Other projects (similar pattern)
- ba-pathfinder: ~/Projects/ba-pathfinder/
- ourjourney: ~/Projects/ourjourney/

---

## Part 5: Homepage Content Draft

```
MATTHEW SCOTT
Full Stack Developer | Louisville, KY

Building practical tools with modern technology.

[Featured Projects]

GUITAR LEARNING PLATFORM
Interactive fretboard, 100+ lessons, MIDI playback
→ guitar.projectlavos.com

INTERACTIVE RESUME
React-based portfolio with timeline view
→ interactive-resume-ten-pi.vercel.app

BA PATHFINDER
Business analyst career guidance tool
→ ba-pathfinder.vercel.app

TRACTION
Job application tracking system
→ jobtrack-two.vercel.app

[Skills]
React | TypeScript | Python | Node.js | PostgreSQL | AWS

[Connect]
GitHub: guitargnarr
LinkedIn: [link]
Email: [email]
```

---

## Part 6: Success Criteria

- [x] All 404 projects investigated and resolved (DONE)
- [x] projectlavos.com displays as portfolio hub (DONE)
- [x] guitar.projectlavos.com branded teal/orange (DONE)
- [x] All projects have OG images (DONE - Dec 1)
- [x] Remaining projects branded (ba-pathfinder, ourjourney, phishguard-ui) (DONE - Dec 1)
- [x] Guitar pricing page added (DONE - Dec 2)
- [x] Orphaned Vercel projects cleaned up (DONE - Dec 18, deleted 6)
- [x] Full audit of all frontend + backend (DONE - Dec 18, 13 sites + 3 APIs PASS)
- [ ] Stripe integration for guitar monetization (FUTURE)

---

**Status:** 98% COMPLETE (Only Stripe remaining)
**Last Updated:** 2025-12-18
**Completed Dec 18:**
- Deleted 6 Vercel orphans (mirador-consciousness-platform, matthewscott, projectlavos-frontend, projectlavos, jobtracker-frontend, ourjourney-flow)
- Fixed jaspermatters broken GitHub links + added OG image
- Removed fretforge-showcase 404 from Projects.jsx
- Full audit: 13 frontend sites PASS, 3 backend APIs PASS

**Remaining:**
- ~~DELETE Railway orphans~~ (DONE Dec 18 - deleted 3 empty projects)
- ~~DELETE GitHub legacy repos~~ (DONE Dec 18 - deleted 5 repos)
- Stripe integration for guitar monetization (FUTURE)
