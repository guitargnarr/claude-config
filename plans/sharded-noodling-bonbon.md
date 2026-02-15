# Vercel Pro Optimization Plan

## Context

You're paying $20/mo for Vercel Pro but using <1% of included resources (1TB bandwidth, 10M edge requests, 100K analytics events, 10K speed insights, 10K image optimizations, 5GB blob storage). This plan activates those unused features across your 130 projects to get full value from what you're already paying for, and evaluates moving Render services to Vercel Functions to reduce the $42/mo Render bill.

---

## Phase 1: Analytics + Speed Insights (Single Session, ~2 hours)

### 1A. Fix main-site SpeedInsights (5 min)

Package already installed but component never rendered.

**File:** `~/Projects/projectlavos-monorepo/main-site/src/App.jsx`
- Line 2: Add `import { SpeedInsights } from '@vercel/speed-insights/react';`
- Line 1795: Add `<SpeedInsights />` after existing `<Analytics />`

Build, deploy: `cd ~/Projects/projectlavos-monorepo/main-site && npm run build && vercel --prod --yes`

### 1B. Batch-add Analytics to All Client Sites (~90 min)

0/67 client sites have analytics. Create a Python batch script following the proven pattern of existing `add-jsonld.py` and `fix-all-meta.py` batch scripts.

**New script:** `~/Projects/client-sites/add-analytics.py`

**Logic:**
1. Walk all site directories (skip: templates, client-cms, evals, demo-sites, tier-comparison)
2. For each site with `src/main.tsx` + `package.json`:
   - Add `@vercel/analytics: ^1.6.1` to package.json dependencies
   - Add `@vercel/speed-insights: ^1.3.1` to top 10 priority sites only
   - Insert import lines after existing imports in main.tsx
   - Insert `<Analytics />` (and `<SpeedInsights />` where applicable) after `<App />`
3. Handle both main.tsx patterns:
   - Pattern A (61 sites): `StrictMode > App` (no ErrorBoundary)
   - Pattern B (6 sites): `StrictMode > ErrorBoundary > App`

**Speed Insights priority sites (10):** scout-aesthetics, morgan-pottinger-mcgarvey, pillar-financial-advisors, hideaway-saloon, headliners-louisville, genesis-diamonds, highland-cleaners-tier4, copper-barrel-brewing, north-lime-coffee, fritz-salon

**Post-script steps:**
```bash
# Install deps in all modified sites
for dir in ~/Projects/client-sites/*/; do
  [ -f "$dir/package.json" ] && grep -q "vercel/analytics" "$dir/package.json" && \
    (cd "$dir" && npm install --silent)
done

# Test one build first
cd ~/Projects/client-sites/highland-cleaners-tier4 && npm run build

# Batch deploy (all 67 sites, ~20 min build time total)
for dir in ~/Projects/client-sites/*/; do
  [ -f "$dir/package.json" ] && grep -q "vercel/analytics" "$dir/package.json" && \
    (cd "$dir" && vercel --prod --yes 2>&1 | tail -1)
done
```

### 1C. Update 4 Tier Templates (15 min)

Prevent future sites from missing analytics.

**Files (4 package.json + 4 main.tsx):**
- `~/Projects/client-sites/templates/tier[1-4]-*/package.json` -- add both deps
- `~/Projects/client-sites/templates/tier[1-4]-*/src/main.tsx` -- add imports + components

Updated main.tsx pattern for all 4 templates:
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
      <Analytics />
      <SpeedInsights />
    </ErrorBoundary>
  </StrictMode>,
)
```

Also update `~/.claude/reference/tier-templates-reference.md` to note analytics are now included by default.

### 1D. Add Analytics to Monorepo Subdomains (10 min)

3 subdomains missing analytics: demos/, about/, services/

For each: `npm install @vercel/analytics @vercel/speed-insights`, add imports + components to their entry points.

**Verification (all of Phase 1):**
- Check Vercel dashboard > any project > Analytics tab shows incoming events within 24 hours
- Check Speed Insights tab on priority sites shows Core Web Vitals data

---

## Phase 2: Edge Proxy for Render APIs (30 min)

Proxy Render API calls through Vercel's edge network. Eliminates cold start latency for users and uses your free 10M edge requests + 1TB bandwidth.

### 2A. Add API Rewrites to main-site vercel.json

**File:** Create `~/Projects/projectlavos-monorepo/main-site/vercel.json`

```json
{
  "rewrites": [
    { "source": "/api/outreach/:path*", "destination": "https://outreach-api-miha.onrender.com/:path*" },
    { "source": "/api/backend/:path*", "destination": "https://projectlavos-backend.onrender.com/:path*" },
    { "source": "/api/cms/:path*", "destination": "https://client-cms-api.onrender.com/:path*" },
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "s-maxage=60, stale-while-revalidate=300" }
      ]
    }
  ]
}
```

### 2B. Update CRM Dashboard to Use Relative URLs

**File:** `~/Projects/projectlavos-monorepo/main-site/src/crm/Dashboard.jsx`

Replace all `${VITE_OUTREACH_API_URL}/endpoint` with `/api/outreach/endpoint`. This eliminates the need for the `VITE_OUTREACH_API_URL` env var in the build command.

Deploy: `cd ~/Projects/projectlavos-monorepo/main-site && npm run build && vercel --prod --yes`

**Verification:**
```bash
curl -s https://projectlavos.com/api/outreach/health
# Should return 200 with health response (proxied through Vercel edge)
```

---

## Phase 3: Image Optimization Setup (30 min for template, incremental rollout)

44 client sites have 377 Unsplash hotlinks. Batch-replacing all URLs is not worth the deploy cost right now. Instead: set up the infrastructure so future sites use optimization automatically, and convert existing sites incrementally when touched.

### 3A. Add OptImage Component to Templates

**New file in each template:** `src/components/OptImage.tsx`

```tsx
interface OptImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  width?: number;
  quality?: number;
}

export default function OptImage({ src, width = 1200, quality = 75, ...props }: OptImageProps) {
  const optimizedSrc = src.startsWith('http')
    ? `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`
    : src;
  return <img src={optimizedSrc} {...props} />;
}
```

### 3B. Add Image Config to Template vercel.json

Update all 4 template vercel.json files:
```json
{
  "images": {
    "domains": ["images.unsplash.com"],
    "sizes": [640, 828, 1200, 1920]
  },
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### 3C. Incremental Conversion Rule

When any client site is touched for ANY reason (bug fix, update, new feature), also:
1. Add `images.domains` to its vercel.json
2. Replace `<img src="https://images.unsplash.com/...">` with `<OptImage src="...">` in hero and above-fold images
3. This costs zero extra deploys since the site is being deployed anyway

Do NOT batch-convert all 44 sites now -- the 377 URL changes + 44 deploys are not worth the build minutes.

---

## Phase 4: Render-to-Vercel Migration (Future Sessions)

### 4A. Migrate outreach-api -- $7/mo savings (3-4 hours)

The only migration that saves real money. 14 endpoints, 89 passing tests, uses pg8000 + PostgreSQL.

**Steps:**
1. Provision Vercel Postgres (free: 256MB, 60 compute hrs/mo)
2. Create `api/` directory with Python serverless functions (Vercel's `@vercel/python` runtime)
3. Migrate data: `pg_dump render_url | psql vercel_postgres_url`
4. Run all 89 tests against the new deployment
5. Update Phase 2A proxy to point to the local Vercel function instead of Render
6. Once verified, delete the Render service

**Defer until:** No active client work pending, time to test thoroughly.

### 4B. client-cms-api -- No savings but better reliability (2 hours)

Already has a `vercel.json` configured for `@vercel/python` at `~/Projects/client-sites/client-cms/api/vercel.json`. On Render free tier ($0), so migration saves nothing but eliminates cold starts.

**Defer until:** After 4A is proven.

### 4C. DO NOT migrate (keep on Render)

| Service | Reason | Cost |
|---------|--------|------|
| ai-talent-optimizer | SQLite DB, stateful sessions | $7/mo |
| job-search-automation | APScheduler, spaCy, 38 endpoints | $7/mo |
| texume-api | 45K-line file, LaTeX processing | $7/mo |
| mirador | AI orchestrator, 65+ models | $7/mo |
| projectlavos-backend | Anthropic SDK + Redis | $7/mo |
| guitar-model-lab | numpy/scipy audio generation | $0 (free) |

---

## Phase 5: Documentation + Cleanup (15 min)

After Phases 1-2 are complete:

1. Update `~/.claude/reference/deployment-inventory.md` -- note analytics enabled, edge proxy configured
2. Update `~/.claude/reference/tier-templates-reference.md` -- add analytics to tech stack section
3. Update `~/.claude/CLAUDE.md` -- add to deploy commands: "Analytics included by default in all templates"
4. Update `/tmp/infrastructure-billing-report.md` -- reflect Render reduction from 12 to 8 services (already done earlier)

---

## Summary

| Phase | Effort | Pro Feature Activated | Monthly Savings |
|-------|--------|----------------------|-----------------|
| 1: Analytics | ~2 hrs | Web Analytics (100K events), Speed Insights (10K pts) | $0 (free value) |
| 2: Edge Proxy | ~30 min | Edge Requests (10M), Fast Data Transfer (1TB) | $0 (free value) |
| 3: Image Opt | ~30 min + incremental | Image Optimization (10K transforms) | $0 (free value) |
| 4: Render Migration | ~4 hrs (future) | Serverless Functions (1M invocations) | $7/mo |
| 5: Docs | ~15 min | -- | -- |

**Session 1 scope:** Phases 1 + 2 (~2.5 hours). Activates 4 of 6 unused Pro features.
**Future session:** Phase 4A ($7/mo savings). Phase 3 rolls out incrementally with zero extra deploys.
