# Plan: Make Meridian Useful - Decision-Support Features

## Goal
Transform Meridian from a passive data viewer into an actionable decision-support tool. Add features that let users **rank**, **compare**, **explore**, and **export** state-level economic data.

## Project
- **Repo:** ~/Projects/phishguard-ui (GitHub: guitargnarr/meridian)
- **Branch:** `feature/map-p9-p12` (from main)
- **Live:** https://meridian.projectlavos.com
- **Stack:** Next.js 16 App Router, D3.js v7, Tailwind CSS, TypeScript

## Current State
Meridian has live BLS + Census data (unemployment, income, population, poverty) on an interactive US map with overlay toggles and state detail panels. But it's **read-only** -- users can look at data but can't act on it. No ranking, no comparison, no export, no shareable deep links.

---

## Feature 1: "Best States For..." Ranker (`/rank`)

**What:** Users drag 5 weighted sliders to rank all 50 states + DC by their priorities. Real-time sorted list updates as sliders move.

**Sliders:**
- Low Unemployment (0-100, default 50)
- High Income (0-100, default 50)
- Low Poverty (0-100, default 50)
- Low Cost (0-100, default 50) -- inverse of income as proxy
- Gig Economy (0-100, default 50)

**Presets:** "Remote Worker" (income high, unemployment low), "Startup Founder" (gig high, poverty low), "Privacy Advocate" (legislation weight)

**Shareable:** Slider values encoded in URL query params (`?w=80,60,40,20,50&preset=remote`)

### Files

| File | Action | Description |
|------|--------|-------------|
| `app/rank/page.tsx` | NEW | Server component wrapper, metadata |
| `app/rank/components/StateRanker.tsx` | NEW | Client component: sliders + ranked list |
| `lib/ranking.ts` | NEW | `computeRankings(metrics, weights)` pure function |
| `lib/export.ts` | NEW | `toCSV()` and `toJSON()` utilities (shared) |
| `app/components/Nav.tsx` | NEW | Shared navigation bar (used across all new pages) |
| `app/layout.tsx` | MODIFY | Add Nav component |
| `app/page.tsx` | MODIFY | Add link to /rank from landing page |

### Ranking Algorithm (`lib/ranking.ts`)
```
For each state:
  score = w1 * normalize(unemployment, inverted)
        + w2 * normalize(medianIncome)
        + w3 * normalize(povertyRate, inverted)
        + w4 * normalize(costIndex, inverted)  // derived from income
        + w5 * normalize(gig_pct)
  where normalize maps value to 0-1 range using METRIC_MAXES
```

---

## Feature 2: State Comparison (`/compare`)

**What:** Pick 2-3 states from dropdowns, see side-by-side metrics table. Best value in each row highlighted in teal.

### Files

| File | Action | Description |
|------|--------|-------------|
| `app/compare/page.tsx` | NEW | Server component wrapper, metadata |
| `app/compare/components/StateComparison.tsx` | NEW | Client component: selectors + table |
| `app/compare/components/StateSelector.tsx` | NEW | Autocomplete dropdown for state selection |

### Behavior
- URL params: `?states=CA,TX,NY` (shareable)
- Table rows: Population, Median Income, Unemployment Rate, Poverty Rate, Gig %, Legislation
- Best value per row gets teal highlight
- "Add to Compare" button on explore page state detail panel

---

## Feature 3: State Profile Pages (`/state/[abbr]`)

**What:** 51 statically generated pages (one per state + DC). Each shows all metrics, national rank for each metric, and links to compare/explore.

### Files

| File | Action | Description |
|------|--------|-------------|
| `app/state/[abbr]/page.tsx` | NEW | SSG with `generateStaticParams()` + `generateMetadata()` |
| `lib/state-rankings.ts` | NEW | `getRankings(metrics)` returns per-state rank for each metric |

### SEO
- `generateMetadata()` produces unique title/description per state
- Example: "California Economic Profile | Meridian" / "Population 39.5M, Median Income $78,672..."
- Links from explore page dots and state detail panel

---

## Feature 4: Data Export

**What:** Download button on `/rank` and `/explore` pages. CSV or JSON format.

### Files

| File | Action | Description |
|------|--------|-------------|
| `lib/export.ts` | NEW (shared with Feature 1) | `generateCSV(data)`, `generateJSON(data)`, `downloadFile(content, filename, type)` |
| `app/api/data/export/route.ts` | NEW | GET endpoint returns CSV/JSON via query param `?format=csv` |

---

## Shared Infrastructure

### Nav Component (`app/components/Nav.tsx`)
Minimal top navigation bar for all pages:
- Logo/brand link to `/`
- Links: Explore, Rank, Compare
- Active state indicator
- Mobile hamburger menu
- Glass-morphism style matching existing design system

### Design System (existing, reuse)
- CSS variables from `globals.css`: `--color-void`, `--color-accent` (#14b8a6 teal), `--text-primary`
- Font pairing: Instrument Serif (headings) + DM Sans (body)
- Glass card pattern: `bg-white/5 border border-white/10 backdrop-blur`
- Existing utilities: `formatPopulation()`, `formatIncome()` from `lib/overlay-data.ts`
- State data: `STATE_NAMES` from `lib/fips-utils.ts`, `FALLBACK_STATE_METRICS` from `lib/overlay-data.ts`
- Live data: `fetchLiveMetrics()` from `lib/data-fetcher.ts`

---

## Implementation Order

1. **Commit 1: Shared infra** -- Nav component, `lib/ranking.ts`, `lib/export.ts`, `lib/state-rankings.ts`, update layout.tsx
2. **Commit 2: State Ranker** -- `/rank` page with sliders, presets, shareable URLs, export button
3. **Commit 3: State Comparison** -- `/compare` page with selectors, table, highlights
4. **Commit 4: State Profiles** -- `/state/[abbr]` SSG pages with rankings and metadata
5. **Commit 5: Export API + integration** -- `/api/data/export` endpoint, download buttons on explore/rank
6. **Commit 6: Cross-linking** -- Add "Compare" button to state detail panel, dot click -> state profile, landing page updates
7. **Build + test after each commit**
8. **Single PR** -> merge -> deploy

---

## Files Summary

| Action | Count | Files |
|--------|-------|-------|
| NEW | 11 | Nav.tsx, ranking.ts, export.ts, state-rankings.ts, rank/page.tsx, StateRanker.tsx, compare/page.tsx, StateComparison.tsx, StateSelector.tsx, state/[abbr]/page.tsx, api/data/export/route.ts |
| MODIFY | 4 | layout.tsx, page.tsx, InteractiveMap.tsx (dot links), StateDetailPanel.tsx (compare button) |

**Estimated: ~15 files touched, ~1,500 lines added**

---

## Verification

```bash
# After each commit:
cd ~/Projects/phishguard-ui && npm run build

# After all commits:
# 1. Visit /rank -> sliders work, list updates in real-time
# 2. Change sliders -> URL updates with weights
# 3. Share URL -> opens with same slider positions
# 4. Visit /compare?states=CA,TX -> side-by-side table loads
# 5. Best values highlighted in teal
# 6. Visit /state/CA -> profile page with all metrics + ranks
# 7. Click export -> CSV downloads with correct data
# 8. Nav bar visible on all pages, active state works
# 9. Mobile: all pages responsive, sliders touch-friendly

# Deploy:
vercel --prod --yes

# Verify:
npx playwright screenshot --wait-for-timeout=8000 "https://meridian.projectlavos.com/rank" /tmp/meridian-rank.png
npx playwright screenshot --wait-for-timeout=8000 "https://meridian.projectlavos.com/compare?states=CA,TX,NY" /tmp/meridian-compare.png
```

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Live data fetch slow on rank/compare | Use `fetchLiveMetrics()` with fallback -- pages render instantly with fallback data, update when live data arrives |
| 51 SSG pages slow build | `generateStaticParams()` uses fallback data at build time, no API calls during build |
| Slider performance with 51 states | Debounce slider onChange (100ms), memoize ranking computation |
| URL param length for compare | Max 3 states = `?states=CA,TX,NY` (short) |
