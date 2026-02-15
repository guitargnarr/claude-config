# Global Claude Code Setup

## Critical Rules

### VISUAL PROOF OF COMPLETION (HIGHEST PRIORITY)
**Nothing is "complete" until user can SEE and INTERACT with it:**
- Web app? Must open in browser at a URL user can visit
- CLI tool? Must show how to run it and demonstrate it working
- API? Must demonstrate with actual request/response
- **If you can't show it running, it's not done**
- Don't just say "it's at /path/to/file" - show HOW TO USE IT
- Results must be REPEATABLE - same command = same result every time

### VERIFICATION HONESTY
Reading source code is not visual verification. Reading a report is not numerical verification. Do not confuse either.

When asked to check if something looks right or works:
- Take an actual screenshot and analyze the actual image
- If the screenshot fails or returns nothing useful, say that
- Do NOT infer rendering correctness from source code alone
- Do NOT summarize empty or failed results as if they confirmed anything
- Do NOT deflect with diagnostic questions to cover for a check you didn't actually perform

When verifying data or numerical claims in deliverables:
- Run the actual computation against the source data. Do not eyeball it.
- If a report says "11,190 pharmacies are flagged Immediate Outreach" -- count them in the CSV
- If a report says "3.5x ROI" -- compute the ROI from the raw fields and confirm the formula
- Cross-check every metric across all documents that reference it. One inconsistency = all assets are suspect until re-validated.
- Do not take shortcuts on large files. 41,775 rows means 41,775 rows, not a sample.

If your verification attempt fails, say "I tried to check and couldn't get a usable result" — not "everything renders perfectly."

The standard: only assert what you directly observed or computed, not what you expect the code or data to produce.

### FIX BEFORE ASKING
- If something is broken, TRY TO FIX IT before asking questions
- Only ask if: (1) security concern, or (2) multiple valid paths and user preference affects outcome
- Reference Anthropic docs at https://docs.anthropic.com when unsure about model capabilities

### NO TOKEN WASTE
- Execute efficiently toward visual, working result
- Do not drag out requests or add unnecessary steps

### DOC UPDATES: ONE PASS, FULL SCOPE
When updating docs/references after a task:
1. Grep `~/.claude/` for every related term before proposing any edits
2. Read every referenced doc (SOPs, skills, indexes) before acting
3. Present the complete list of findings for approval -- all at once, not incrementally
4. Do not say "that's everything" until the sweep is provably exhaustive
5. Never claim done, get challenged, find more, repeat. One pass.

### Ultrathink Protocol (v2 - Automatic)
Triggers automatically when: 5+ files affected, architectural decisions, security-sensitive changes, breaking changes, cross-project impact, data migrations, multi-doc update sweeps (3+ reference docs).
**When triggered:** Create `ULTRATHINK_[TOPIC].md`, write structured analysis (50-200 lines), show key findings, then execute.
**Full spec:** ~/.claude/reference/ultrathink-definition.md

### Standard Rules
- **Documentation:** Max 5 files per project, 500 lines each (READMEs prefer <200)
- **Discovery first, then code:** For deployment work, inventory what exists before building
- **Planning docs:** Extract action items into permanent docs (CLAUDE.md, SOPs, reference). Retain plans in `~/.claude/plans/` as historical decision records.
- **Work mode:** Active client delivery (RetailMyMeds) supersedes SELL phase. When no client work is pending, resume consulting and platform building.
- Never use emojis unless explicitly requested

### Pre-Commit Quality (MANDATORY)
Before any commit: `npm run build` (JS/TS) or `flake8` (Python) must pass. Fix ALL issues before committing.

## System Info
- Python: 3.14 at `/Library/Frameworks/Python.framework/Versions/3.14/bin/python3`
- GitHub: guitargnarr (matthewdscott7@gmail.com)
- **Deploy frontend:** `vercel --prod --yes` (no env vars) or `VITE_X=value vercel build --prod && vercel deploy --prebuilt --prod --yes` (with env vars -- Vite bakes at BUILD time)
- **Deploy backend:** `git push origin main` (Render auto-deploys, ~30s cold start on free tier)
- **Verify React apps:** Use Playwright (`npx playwright screenshot --wait-for-timeout=5000 "URL" verify.png`), NEVER curl/WebFetch
- **Verify LOCALLY before deploying** - Run `npm run dev &` then Playwright against `http://localhost:5173` to catch rendering bugs in one cycle. Do NOT deploy to Vercel just to take a screenshot. Only deploy once the local screenshot confirms all sections render. This avoids wasting 3+ deploy round-trips on visual bugs (learned: clementine-cater invisible sections, Feb 2026).

## Critical Pitfalls
- **pg8000 for Render** - NOT psycopg2-binary. Reference: `~/Projects/client-sites/client-cms/api/main.py`
- **Vite env vars must be in build command** - Dashboard alone does nothing
- **NO Tailwind v4** (use v3) - Exception: Next.js projects can use v4
- **Absolute URLs for OG meta tags**
- **Global gitignore blocks *.png** - `~/.gitignore_global` line 189. Every PNG (OG images, previews, QR codes, favicons, apple-touch-icons) requires `git add -f`. After staging, ALWAYS verify with `git ls-files --cached | grep '\.png'` to confirm the files are tracked. If the count doesn't match expectations, PNGs were silently dropped. This applies to every repo on this machine.
- **Inventory deployments FIRST** - Check Vercel/Railway/Netlify before assuming local code is canonical
- **WebFetch CANNOT verify React apps** - Always use Playwright with --wait-for-timeout=5000
- **Formations: useEffect + vanilla Three.js, NOT iframe** - Embedding formation HTML via `<iframe>` causes rendering failures (blank/gray hero). Use React component with `useEffect` + `useRef` + vanilla Three.js instead. Proven: VoronoiHero.tsx, LSystemHero.tsx, DNAHelixBg.tsx, NeuralMeshBg.tsx, OrbitalSystemBg.tsx. Reference: formations-component.md Pattern C.
- **Three.js Object.assign + position CRASHES at runtime** - `Object.assign(new THREE.PointLight(...), { position: new THREE.Vector3(...) })` fails silently at build but crashes at runtime ("Cannot assign to read only property 'position'"). Always use `light.position.set(x, y, z)` instead.
- **OrbitControls hijacks mobile scroll** - Even with `enableRotate/Zoom/Pan = false`, OrbitControls attaches touch/wheel listeners that block scrolling. For decorative formations, remove OrbitControls entirely and use manual camera orbit: `cameraAngle += dt * 0.1; camera.position.x = Math.sin(cameraAngle) * radius; camera.position.z = Math.cos(cameraAngle) * radius; camera.lookAt(0,0,0);`. Also set `pointer-events: none` on canvas. Proven fix: VoronoiHero.tsx.
- **framer-motion opacity:0 silently fails** - `motion.*` elements with `initial={{ opacity: 0 }}` / `animate={{ opacity: 1 }}` can stay invisible on mobile. Replace with plain HTML elements for critical visible content (headers, CTAs).
- **isLowEnd device detection unreliable** - `navigator.hardwareConcurrency <= 4` doesn't catch modern iPhones. Only use `canUseWebGL()` as the WebGL guard -- no mobile width bypass or CPU-core checks.

## Client Site Rules
- Research the business first. NO fabricated testimonials/ratings/reviews. Verify Unsplash images return HTTP 200. No image reuse across sites.
- **Workflow:** ~/.claude/reference/client-site-assets-sop.md | ~/Projects/client-sites/templates/SITE_GENERATION_GUIDE.md
- **Templates:** ~/Projects/client-sites/templates/ (4 tiers)
- **Elite Frontend:** ~/.claude/skills/frontend-design/ELITE_FRONTEND_PLAYBOOK.md
- **Reusable 3D Components:** ~/.claude/reference/entropy-viz-component.md, torus-knot-component.md, formations-component.md

### Differentiation Standard (Feb 2026 -- MANDATORY)
Every client site must be visually distinct. No two sites should share the same layout patterns below the hero. Requirements:
1. **Unique 3D hero formation** -- Each site gets a different formation (Voronoi, L-System, Torus Knot, etc.)
2. **Unique section background formation** -- A second formation used as a dark cinematic section background (e.g., DNA Helix behind stats, Neural Mesh behind features)
3. **Differentiated CSS** -- Card radius, button shape, hover behavior, shadows, section dividers, and accent patterns must vary per site personality
4. **Differentiated section layouts** -- Features, stats, and contact sections must use different structural layouts per site (zigzag vs anchor+grid vs icon-strip, timeline vs 2x2 vs large-centered, glass-card vs 3-office vs split-screen)
5. **Distinct cinematic OG image** -- Each site gets a brand-colored OG image with unique accent geometry. Generated via `~/.claude/scripts/create-cinematic-og.js --batch`. Accents must be visible at thumbnail scale (15%+ opacity, not 3%). Force-add with `git add -f` (global gitignore blocks *.png).
- **Reference:** formations-component.md "Proven Deployments" table for available formations and site-specific palettes
- **Proven at:** scout-aesthetics, morgan-pottinger-mcgarvey, pillar-financial-advisors (Feb 2026)

### Adding Sites to projectlavos.com Portfolio (Checklist)
When adding client sites to the portfolio at `projectlavos-monorepo/main-site/src/App.jsx`:
1. **Copy ALL PNGs** -- preview, OG image, and QR code for each site. Not just OG.
2. **`git add -f` every PNG** -- then verify: `git ls-files --cached | grep '\.png' | wc -l` must match expected count
3. **Use cinematic OG as preview** -- for sites with cinematic OG images, set `preview` field to the OG path (not the old phone mockup)
4. **Match `category` to `categoryGroups`** -- check the filter map in App.jsx so the site appears under the correct tab
5. **Build before commit** -- `npm run build` from `main-site/`
6. **Deploy with CRM env var** -- `VITE_OUTREACH_API_URL=https://outreach-api-miha.onrender.com vercel build --prod && vercel deploy --prebuilt --prod --yes`
7. **Verify live** -- curl each PNG URL for HTTP 200, then Playwright screenshot the expanded grid

## Project Lavos Article & Report Template (Cinematic PDF)
**Scope:** projectlavos.com articles and operational reports only. Uses the Texume Jinja2 + LaTeX pipeline.

**Proven at:** The Quiet Trade (Feb 2026) -- `~/Projects/texume/templates/the_quiet_trade.tex`

### Cover Page (reusable across all articles/reports)
- TikZ-generated CG cover with plum/slate-blue/gold palette (`plum #1A0A2E`, `slateblue #4A6FA5`, `gold #D4A853`)
- Charioteer logo (white, `assets/charioteer-white.pdf`) centered above title
- Radial glows, arc segments, bezier curves, corner brackets, edge vignettes
- Layout: logo > cover label > title (38pt bold white) > gold rule > tagline > vfill > author/date/org

### Section Pages
- Full-page CG background images per section, generated via `~/.claude/scripts/create-article-fullpage-images.js` (Node.js Canvas, 1700x2200, seeded PRNG)
- `\AddToShipoutPictureBG` (persistent, no asterisk) so overflow pages inherit the same background. `\ClearShipoutPictureBG` before each new section.
- `\sectionpage{image.png}{Title}` command handles clearpage + background + headers + section title
- Headers: `fancyhdr` cinematic style (title left, date right, page center, "Project Lavos" footer-right)

### Typography Rules
- **Standard body:** 13pt/19 for sections that fill 1+ pages naturally
- **Short sections:** 16pt/24 for sections with little content (fills space instead of floating)
- **Dense sections:** 12pt/17.5 if content just barely overflows -- pull back to fit one page rather than orphaning 2-3 lines
- **If overflow is substantial** (half page+), keep at 13pt and let it flow to 2 pages
- Global parskip: 12pt. No parindent. Section titles: 20pt white bold with gold rule. Subsections: 13pt titlegold.

### Callout Boxes
- `calloutbox` (gold accent) and `insightbox` (slate accent) -- TikZ nodes with translucent fill over dark backgrounds
- Gold left-edge gradient stripe on calloutbox, slate on insightbox

### Workflow
1. Data: `data/<article_name>.py` returning dict of section content
2. Template: `templates/<article_name>.tex` with `\VAR{}` Jinja2 placeholders
3. Images: `~/.claude/scripts/create-article-fullpage-images.js` generates section backgrounds to `output/<slug>-fullpage/`
4. Generate: `python3 scripts/generate_<article_name>.py`
5. PNGs require `git add -f` (global gitignore blocks *.png). Verify count with `git ls-files --cached | grep '\.png'`

## Private Data Protection
**CRITICAL - Never read/edit without permission:** `**/APPLICATIONS*.csv`, `~/Desktop/1_PRIORITY_JOB_SEARCH/**`
- **Gmail access:** IMAP with app password (inline scripts, not a separate project). Never commit app passwords.

## Communication Style
- Direct, technical, honest. Code examples > long explanations. Facts > speculation.

## Quality Standards
Task complete ONLY when: user can see visual proof, tests pass, build succeeds, committed to git, user knows exact location/URL/command.

## Context Management
- `/clear` after major tasks
- `/model [haiku|sonnet|opus]` - right model for task

## Reference Documentation (load on-demand, DO NOT auto-load)
**Full index:** ~/.claude/reference/INDEX.md

| Category | Key Docs |
|----------|----------|
| Deployment | ~/.claude/reference/deployment-inventory.md, deployment-discovery-protocol.md |
| Workflows | ~/.claude/reference/workflows.md |
| Client Sites | ~/.claude/reference/tier-templates-reference.md, client-site-assets-sop.md |
| Parallel Dev | ~/.claude/reference/parallel-development-playbook.md, unified-task-prompt.md |
| System | ~/.claude/TRANSFER_GUIDE.md, COLLABORATION_CONTRACT.md, COMMAND_MANIFEST.md |

**Brand:** Teal (#14b8a6) / Orange (#f97316)
**Quick Stats:** 88 code projects | 67 client demo sites (63 deployed) | 51 Ollama models

## Governance (Nov 2025+)
1. **Tabula Rasa** - Never bake personal context into prompts/models
2. **SELL phase** - Monetize deployed assets, package tools for sale. **Exception: active income work (RetailMyMeds) takes absolute priority over sell-phase tasks.**
3. **AI + Python hybrid** - AI for qualitative, Python for quantitative. LLMs can't do reliable arithmetic or music theory.
4. **Deployment gotchas** - Vercel defaults to auth-protected. Railway needs PORT env var. Render free tier spins down.
5. **Session management** - Never suggest closing sessions. User controls session boundaries.
6. **Fix-first communication** - Fix it, show result. Only ask when security risk or user preference affects outcome.
7. **Discovery before building** - Test all live deployments before writing code (OurJourney lesson)
8. **Execution bias** - Never frame sales/outreach as "scary". Direct next actions only.

## Active Engagements (INCOME)
| Client | Contact | Status | Agreed Rate | Scope | Key Paths |
|--------|---------|--------|-------------|-------|-----------|
| RetailMyMeds | Kevin McCarron (dev) + Arica Collins (strategy) | **ACTIVE -- SOLE INCOME** | $2,500 (Option B @ 1/3) | Pharmacy qualification system: scoring engine, Wix Studio/Velo integration, strategic reports, GLP-1 targeting database (41,775 pharmacies), portfolio analysis | `~/Desktop/RetailMyMeds/` (deliverables), `~/Projects/texume/` (source/templates), Render API (not yet live) |

### RetailMyMeds Engagement Rules (MANDATORY -- overrides all defaults)

**1. Numerical Accuracy is Non-Negotiable**
- Every number in every deliverable must be reproducible from the source data
- When a number is an estimate, it MUST be labeled as an estimate with the methodology visible
- One formula per metric, used consistently across ALL assets (CSV, PDF reports, email). No mixing gross/net ROI, no rounding inconsistencies between documents
- Before any deliverable is sent: run programmatic validation against the CSV/data source. Reading source code is not validation. Running the numbers is.
- If a discrepancy is found, ALL assets containing that metric must be corrected and recompiled before anything ships. No partial fixes.

**2. Kevin is a Developer, Not a Client Receiving Instructions**
- Kevin owns the Wix Studio implementation. He is building the site. He wants involvement and ownership.
- Deliverables should position Kevin as the implementor with full control, not as someone following a deployment checklist
- Velo code, API specs, and technical docs are resources he can use, modify, or replace -- not instructions to follow
- Frame Matthew's work as "here's what I built and how it works" not "here's what you need to do"
- With proper access, Matthew's proposed system can alleviate manual work -- communicate this as capability, not as tasks for Kevin

**3. Trust Through Truth**
- This engagement exists to build a personal relationship. Trust is earned through accurate, honest work -- not volume of deliverables
- Never fabricate, overstate, or allow ambiguity in anything sent to Kevin or Arica
- Assume the recipient is a numbers person. Every claim must survive scrutiny from someone who will check the math
- Assets must be presentable beyond Kevin -- he may share them with partners, investors, or Arica's contacts
- We are not selling. We are earning trust through quality delivery.

**4. Large File Integrity**
- The GLP-1 targeting CSV (41,775 rows, 36 columns) is the backbone of the engagement
- No shortcuts on validation. Every column, every formula, every distribution claim must be programmatically verified before delivery
- When reports reference CSV data, the specific numbers must match exactly -- not "approximately"

**5. Operational**
- Prioritize over ALL other work (demo sites, portfolio, personal projects) when Kevin/Arica are waiting
- Track hours honestly -- current estimate: ~61 hrs across Phases 0-1.5
- All deliverables organized at `~/Desktop/RetailMyMeds/` (committed to texume repo)
- Nothing is deployed/live until Kevin explicitly integrates -- do not represent otherwise
