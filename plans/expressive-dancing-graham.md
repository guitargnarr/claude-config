# DataSource Monitor Prototype

## What We're Building

A working web dashboard that monitors HVAC manufacturer product pages for content changes -- demonstrating what automated DataSource maintenance could look like for Pricebook Digital. This is Kevin McCarron's #1 maintenance pain point, and this prototype makes the solution tangible.

## Strategic Context

- The report has been sent. Kevin hasn't responded yet. We do NOT send this proactively.
- This prototype gets built NOW so it's ready when Kevin engages.
- During the follow-up conversation, when DataSource maintenance comes up, Matthew shows this working prototype.
- The moment shifts from "consultant who writes reports" to "person who builds things."

## Project Location

**New standalone project:** `~/Projects/datasource-monitor/`

Separate from texume. Its own deliverable, its own deployment.

## Architecture

```
datasource-monitor/
  backend/
    api.py                        # FastAPI (6 endpoints)
    manufacturers.py              # 6 manufacturer URL registry
    models.py                     # Pydantic schemas
    services/
      scraper.py                  # httpx + BeautifulSoup fetching
      change_detector.py          # SHA-256 hashing + difflib
      storage.py                  # JSON file-based baselines
    data/
      baselines/                  # Stored page snapshots (auto-populated)
      activity_log.json           # Check history
    requirements.txt
  frontend/
    src/
      App.tsx                     # Single-file dashboard
      main.tsx                    # Entry
      index.css                   # Tailwind + components
    index.html
    package.json                  # Vite + React 19 + Tailwind 3 + Framer Motion + Lucide
    vite.config.ts
    tailwind.config.js            # Teal/orange palette from tier4
    tsconfig.json / tsconfig.app.json / tsconfig.node.json
    postcss.config.js
```

## Backend (Python FastAPI)

**Endpoints:**
| Method | Path | Purpose |
|--------|------|---------|
| GET | /health | Health check |
| GET | /api/manufacturers | List all 6 with status |
| GET | /api/manufacturers/{id} | Detail + latest diff |
| POST | /api/manufacturers/{id}/check | Check one manufacturer |
| POST | /api/check-all | Check all 6 |
| GET | /api/activity-log | Check history |

**Scraping logic:**
- httpx async client with realistic User-Agent headers
- BeautifulSoup to strip nav/footer/scripts, extract meaningful text
- SHA-256 hash of normalized text content for fast comparison
- difflib unified_diff for detailed change view when hash differs
- JSON file storage for baselines (no database)

**Dependencies:** fastapi, uvicorn, pydantic, httpx, beautifulsoup4

**Manufacturers tracked (all 6 from DataSource):**
Trane, American Standard, Daikin, Amana, York, Champion -- with real product page URLs

**Anti-blocking:** Realistic headers, 1-3s delays between requests, graceful error handling. Sites that block us get an "Access Restricted" badge -- which is actually a selling point ("this is why manual monitoring is the only option today").

## Frontend (Vite + React + TypeScript + Tailwind)

**Single-page dashboard, no routing.** Sections top-to-bottom:

1. **Header** -- Dark navy hero bar. "DataSource Monitor" title, "Pricebook Digital" subtitle, "Check All" CTA button
2. **Stats Row** -- 4 stat cards: Manufacturers Monitored (6), URLs Tracked, Changes Detected, Last Full Scan
3. **Manufacturer Grid** -- 6 cards (3x2 grid). Each shows: name, category badge, status pulse (green/amber/red/gray), last checked, URL count, "Check Now" button
4. **Change Detail Panel** -- Expandable per manufacturer. Shows diff view (green added / red removed lines), summary, "Set as New Baseline" button
5. **Activity Log** -- Table with timestamp, manufacturer, URL, result, details
6. **Toast Notifications** -- Info/success/warning for check progress

**Reused patterns from tier4-enterprise:**
- Stat card grid layout
- Toast notification system
- Status badge styling
- Framer Motion entrance animations (fadeInUp, stagger)
- Tailwind component classes (btn-primary, card, input-field)
- Color palette (teal primary, orange secondary)

**Key visual elements:**
- Pulsing status indicators (CSS animation) -- green = no change, amber = change detected, red = error, gray = unchecked
- Live loading spinners during checks
- Diff view with syntax-style green/red highlighting
- Sparkline showing check frequency trend

## Build Order

1. **Backend scaffolding** -- Project structure, requirements, manufacturer registry, Pydantic models, storage service
2. **Backend scraping** -- Scraper service, change detector, wire up API endpoints
3. **Backend validation** -- Start server, test endpoints, capture initial baselines for all 6 manufacturers
4. **Frontend scaffolding** -- Init Vite project, configure Tailwind/TS, copy base styles from tier4
5. **Frontend dashboard** -- Build all 6 sections, wire to backend API
6. **Polish** -- Animations, loading states, responsive design, pre-populated activity log
7. **Deploy frontend** -- Vercel (`datasource-monitor.vercel.app`)

## Deployment

- **Frontend:** Vercel (static deploy, ~10 seconds)
- **Backend:** Runs locally for demo (port 8000). Deploy to Render later if Kevin wants async access.
- **VITE_API_URL:** `http://localhost:8000` for local dev

## Verification

1. `cd backend && uvicorn api:app --reload --port 8000` -- server starts clean
2. `curl http://localhost:8000/api/manufacturers` -- returns all 6
3. `curl -X POST http://localhost:8000/api/check-all` -- fetches live pages
4. `cd frontend && npm run dev` -- dashboard loads at localhost:5173
5. Click "Check All" in dashboard -- see live status updates
6. `npm run build` -- builds clean (no TS errors)
7. Visual: manufacturer cards show real page titles and content lengths from actual manufacturer sites

## Files to Reference During Build

- `~/Projects/client-sites/templates/tier4-enterprise/src/App.tsx` -- UI patterns
- `~/Projects/client-sites/templates/tier4-enterprise/src/index.css` -- Tailwind classes
- `~/Projects/client-sites/templates/tier4-enterprise/tailwind.config.js` -- Color config
- `~/Projects/client-sites/templates/tier4-enterprise/package.json` -- Dependency versions
- `~/Projects/texume/api.py` -- FastAPI patterns (CORS, endpoints, httpx)
- `~/Projects/texume/requirements.txt` -- Base Python deps
