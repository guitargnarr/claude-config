# Plan: Cinematic OG Image Upgrades for Problem Cards

**Date:** February 10, 2026
**Scope:** Replace broken/ugly phone mockup previews with unique cinematic OG images for portfolio cards that have text running off or ErrorBoundary-style display issues

---

## Context

The projectlavos.com portfolio grid shows 68 client sites. Three already have cinematic OG images (Scout, Morgan, Pillar) which look clean at card thumbnail size. The remaining 65 use old phone mockup screenshots that were designed for portrait phone frames but render poorly when squeezed into the landscape card grid -- text gets cut off, runs off edges, or becomes illegible.

The user wants to fix only the worst offenders, not all 65, and each should get a unique hand-crafted cinematic OG renderer (not templated).

---

## Problem Cards Identified (from screenshot)

These cards have visibly broken/ugly previews in the portfolio grid:

| # | Site | Problem | Category |
|---|------|---------|----------|
| 1 | **Full Tilt Gym** | Description text block displayed instead of image | Fitness |
| 2 | **Caviar Creative Co.** | Description text + orange CTA button showing | Services |
| 3 | **Tom Drexler** | Text/logo runs off card edges | Services |
| 4 | **Halsey Flats** | "vated Living in Matthews" -- left side cut off | Real Estate |
| 5 | **Springhurst Endodontics** | "ert Root Canal Care" -- text cut off left | Healthcare |
| 6 | **dGv Services** | "pert Medical, ing & Revenue" -- text cropped | Healthcare |
| 7 | **UofL Demo** | "Explore Louisville" -- busy preview with elements cut off | Education |

---

## Approach

### For each site:
1. Add a new entry to `SITE_CONFIGS` in `~/.claude/scripts/create-cinematic-og.js`
2. Create a unique render function with brand-appropriate accent geometry
3. Add seed to `seedMap` for reproducible rendering
4. Generate the OG image
5. Copy to `projectlavos-monorepo/main-site/public/og-images/<site>-og.png`
6. Update `preview` field in App.jsx to point to the OG image (not the old phone mockup)

### Brand palette and accent style per site:

| Site | Colors | Font | Accent Style |
|------|--------|------|-------------|
| Full Tilt Gym | Orange #f97316 / Dark gray #1a1a1a | Georgia | Energy -- radiating lines, pulse circles, dynamic arcs |
| Caviar Creative Co. | Orange #f97316 / Cream #f5efe6 | Bodoni 72 | Noir -- angular slashes, scattered dots, film-grain texture |
| Tom Drexler | Red #c0392b / Blue #1a3a5c | Georgia | Industrial -- horizontal pipe lines, bolt dots, circuit grid |
| Halsey Flats | Sage #6b8e6b / Warm beige #d4c5a9 | Didot | Architectural -- building outline silhouettes, floor lines, window grid |
| Springhurst Endodontics | Teal #0d9488 / Light blue #93c5fd | PT Serif | Clinical -- clean horizontal bars, dot matrix, subtle cross pattern |
| dGv Services | Navy #1e3a5f / Gold #d4a84b | Georgia | Corporate -- diagonal stripes, chart-line ascending, data points |
| UofL Demo | Cardinal red #ad0000 / Black #1a1a1a | Georgia | Academic -- heraldic shield outline, horizontal rules, serif flourishes |

### Files to modify:
- `~/.claude/scripts/create-cinematic-og.js` -- add 7 SITE_CONFIGS + 7 render functions + 7 seeds
- `~/Projects/projectlavos-monorepo/main-site/src/App.jsx` -- update 7 `preview` fields to point to `/og-images/`
- `~/Projects/projectlavos-monorepo/main-site/public/og-images/` -- 7 new PNG files (git add -f)

### Execution sequence:
1. Add all 7 site configs and renderers to `create-cinematic-og.js`
2. Run `node create-cinematic-og.js --batch` to generate all images (outputs to client-sites dirs)
3. Copy all 7 to monorepo `public/og-images/`
4. Update App.jsx preview fields for all 7 sites
5. `git add -f` all 7 PNGs, verify with `git ls-files --cached | grep '\.png' | wc -l`
6. `npm run build` from main-site
7. Commit, deploy with CRM env var, push
8. Visual verification -- Playwright screenshot of expanded grid

---

## Verification

- [ ] 7 new cinematic OG images generated (each visually distinct)
- [ ] All 7 copied to monorepo og-images directory
- [ ] App.jsx preview fields updated for all 7
- [ ] `git ls-files --cached | grep '\.png'` count matches expectations
- [ ] `npm run build` passes
- [ ] Deployed to projectlavos.com
- [ ] Playwright screenshot confirms clean card thumbnails (no text cutoff)
- [ ] Each OG image visually inspected for brand accuracy
