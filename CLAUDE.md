# Global Claude Code Setup

## Critical Rules

### VISUAL PROOF OF COMPLETION (HIGHEST PRIORITY)
**Nothing is "complete" until user can SEE and INTERACT with it:**
- Web app? Open the URL in user's browser (`open "https://..."`) -- user verifies, not Claude
- CLI tool? Must show how to run it and demonstrate it working
- API? Must demonstrate with actual request/response
- **If you can't show it running, it's not done**
- Don't just say "it's at /path/to/file" - show HOW TO USE IT
- Results must be REPEATABLE - same command = same result every time
- **Do NOT screenshot deployed sites and narrate what you see.** Open the URL for the user. Their eyes are the source of truth, not Claude's image interpretation.

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

Always ask: does the doc match reality, or did I just make reality match the doc?

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
- **Work mode:** Active client delivery supersedes SELL phase. All paying clients take equal priority. When no client work is pending, resume consulting and platform building.
- Never use emojis unless explicitly requested

### Pre-Commit Quality (MANDATORY)
Before any commit: `npm run build` (JS/TS) or `flake8` (Python) must pass. Fix ALL issues before committing.

## System Info
- Python: 3.14 at `/Library/Frameworks/Python.framework/Versions/3.14/bin/python3`
- GitHub: guitargnarr (matthewdscott7@gmail.com)
- **Deploy frontend:** `vercel --prod --yes` (no env vars) or `VITE_X=value vercel build --prod && vercel deploy --prebuilt --prod --yes` (with env vars -- Vite bakes at BUILD time)
- **Deploy backend:** `git push origin main` (Render auto-deploys, ~30s cold start on free tier)
- **Playwright:** Installed globally (`@playwright/test` + `playwright`). Use `playwright screenshot` directly -- never `npx playwright` or per-project installs.
- **Verify React apps:** `playwright screenshot --wait-for-timeout=5000 "URL" verify.png` -- NEVER curl/WebFetch
- **Business entity:** Project Lavos LLC (KY SOS filed 2/20/2026, filing #1545983.06, member-managed). EIN: 41-4409224. Annual report due Jan 1 - Jun 30, 2027.
- **Banking:** Chase Business Complete Banking -- applied 2/20/2026, pending approval (1-2 days). Will replace personal account for all business transactions.
- **Invoicing:** Wave (wave.app) -- account created, branded, customers added, payments application submitted
- **Key docs:** `~/Documents/Project Lavos LLC/` (Articles of Organization, Operating Agreement, EIN Confirmation). Full tracker: `~/.claude/reference/business-formation.md`

### LOCAL-FIRST DEVELOPMENT (MANDATORY -- NO EXCEPTIONS)
**Every frontend iteration MUST be tested locally before deploying. Deploying to Vercel just to take a screenshot is BANNED.**

985 deploys in 30 days costs real build minutes. Each `vercel --prod` consumes ~30s of build time. The fix: **deploy ONCE per site, not once per iteration.**

**Workflow:**
1. Start dev server: `npm run dev -- --port 5199 &`
2. Wait for ready: `sleep 3`
3. Screenshot locally: `playwright screenshot --wait-for-timeout=5000 "http://localhost:5199" local-verify.png`
4. Review screenshot, fix issues, repeat steps 3-4
5. Build check: `npm run build` (must pass)
6. **ONE** deploy: `vercel --prod --yes`
7. Show user the live URL immediately -- let THEM verify visually

**Port convention:** Always use `--port 5199` to avoid conflicts with other dev servers. If 5199 is occupied, use `--port 5198`. Never rely on Vite's default 5173 (may be taken).

**Show, don't describe:** After deploying, open the live URL for the user (`open "https://site.vercel.app"`). Do NOT take multiple Vercel screenshots and describe what you see. The user's eyes are the final verification, not Claude's image analysis. Say "Deployed to [URL] -- please verify" rather than "I can see the hero section renders correctly."

**Learned from:** clementine-cater invisible sections (Feb 2026), 160 main-site deploys in 30 days (Feb 2026).

## Critical Pitfalls
- **pg8000 for Render** - NOT psycopg2-binary. Reference: `~/Projects/client-sites/client-cms/api/main.py`
- **Vite env vars must be in build command** - Dashboard alone does nothing
- **NO Tailwind v4** (use v3) - Exception: Next.js projects can use v4, **and quiet-trade-experience uses v4 (approved Feb 2026)**
- **Absolute URLs for OG meta tags**
- **Global gitignore blocks *.png** - `~/.gitignore_global` line 189. Every PNG (OG images, previews, QR codes, favicons, apple-touch-icons) requires `git add -f`. After staging, ALWAYS verify with `git ls-files --cached | grep '\.png'` to confirm the files are tracked. If the count doesn't match expectations, PNGs were silently dropped. This applies to every repo on this machine.
- **Inventory deployments FIRST** - Check Vercel/Railway/Netlify before assuming local code is canonical
- **Guitar Pro 7 (v7.6.0)** - Installed at `/Applications/Guitar Pro 7.app`. Verify running: `pgrep -f GuitarPro7`. Only the user can confirm what file is displayed.
  - **GP5 files:** Must quit GP7 before opening (`osascript -e 'quit app "Guitar Pro 7"'; sleep 1; open file.gp5`). Uses pyguitarpro for programmatic editing.
  - **GP7 files (.gp):** ZIP archive containing `Content/score.gpif` (XML). pyguitarpro CANNOT read GP7. Use `gp7_editor.py` utility (`~/Scripts/python/gp7_editor.py`). GP7 supports multiple tabs -- `open file.gp` adds to existing instance.
  - **GP7 Note elements REQUIRE `ConcertPitch` + `TransposedPitch`** -- without them, notes render as rests even with Fret/String/Midi present. TransposedPitch octave = ConcertPitch octave + 1 (guitar transposing instrument).
  - **NEVER Cmd+S in GP7 after corrupted in-memory state** -- if undo/navigation broke bars, GP7 will overwrite the file with garbage. Quit WITHOUT saving, fix on disk, reopen.
  - **Always create locked backups** before GP7 XML edits: `cp file.gp file_LOCKED.gp && chmod 444 file_LOCKED.gp`
  - **GP7 navigation:** Edit > Go to... (type bar number, Enter) is the only reliable method. Ctrl+Right triggers macOS desktop switching. Cmd+Right can create phantom bars.
  - **Full reference:** `~/.claude/reference/gp7-xml-editing.md`

## Music Production & Cover Workflow (Proven Feb 2026)

Two complementary pipelines for learning/covering songs. Always offer these when the user mentions covering a song, learning a part, or working on guitar material.

### Pipeline 1: Audio Stem Separation
Isolate individual instruments from a recording so the user can play along with real audio (minus their instrument).

1. **Download audio:** `yt-dlp --js-runtimes node -x --audio-format wav -o "output.wav" "<youtube-url>"` (requires yt-dlp 2026.02.21+)
2. **Separate stems:** `audio-separator --model_filename htdemucs_6s.yaml "input.wav"` -- produces 6 stems: vocals, drums, bass, guitar, other, piano
3. **Upsample if needed:** `ffmpeg -i stem.wav -ar 48000 stem_48k.wav` (match project sample rate)
4. **Import into Logic Pro** -- user drags stems in, selects "Create new tracks", matches sample rate

**Dependencies:** `pip3 install audio-separator onnxruntime` + `pip3 install yt-dlp` + `ffmpeg`
**Output:** Individual instrument stems as WAV files at target sample rate

### Pipeline 2: Songsterr Tab Extraction
Extract guitar tablature from Songsterr and convert to Guitar Pro 5 format.

1. **Run:** `python3 songsterr_to_gp5.py "<songsterr-url>"` -- auto-downloads metadata, track JSON from CDN, builds GP5
2. **Open:** `osascript -e 'quit app "Guitar Pro 7"'; sleep 1; open "output.gp5"`

**Script location:** `/Users/matthewscott/Music/covers/erra-further-eden/songsterr_to_gp5.py`
**Repo:** `guitargnarr/songsterr-ripper` (private)
**CDN pattern:** `https://dqsljvtekg760.cloudfront.net/{songId}/{revisionId}/{imageHash}/{trackIndex}.json`
**Metadata API:** `https://songsterr.com/api/meta/{songId}` (unauthenticated)
**Features:** Tempo changes (MixTableChange), bend curves (BendEffect with auto type detection), tuplet variants (array + int), MIDI channel overflow handling (15+ tracks), track name sanitization, filename sanitization
**Battle-tested:** 60 songs in one session including 40-track orchestral arrangements, 17-track full productions, 697-measure compilations
**Dependencies:** `pip3 install guitarpro requests playwright`

### GP5 File Locations (3 copies kept in sync)
1. **Source:** `/Users/matthewscott/Music/covers/erra-further-eden/` (originals)
2. **Guitar platform:** `~/Projects/projectlavos-monorepo/services/guitar/public/tabs/` (154 tabs total)
3. **FretForge archive:** `~/Projects/Archive-Recovered-2025-11-18/FretForge/backend/tabs/`

### How These Work Together
- Stems give the real audio feel and tone -- mute the guitar stem, play along with real drums/bass/vocals
- GP5 gives the exact notes, fret positions, effects, and the ability to slow down or isolate parts in GP7
- Combined: the user has both the sound and the score for any song on Songsterr/YouTube

**Full reference:** `~/.claude/reference/music-cover-workflow.md`
**Origin:** ERRA - Further Eden cover session (Feb 23, 2026). This workflow should evolve through experimentation but the core capability must remain replicable.

- **WebFetch CANNOT verify React apps** - Use `playwright screenshot --wait-for-timeout=5000` (global install, no npx)
- **Formations: useEffect + vanilla Three.js, NOT iframe** - Embedding formation HTML via `<iframe>` causes rendering failures (blank/gray hero). Use React component with `useEffect` + `useRef` + vanilla Three.js instead. Proven: VoronoiHero.tsx, LSystemHero.tsx, DNAHelixBg.tsx, NeuralMeshBg.tsx, OrbitalSystemBg.tsx. Reference: formations-component.md Pattern C.
- **Three.js Object.assign + position CRASHES at runtime** - `Object.assign(new THREE.PointLight(...), { position: new THREE.Vector3(...) })` fails silently at build but crashes at runtime ("Cannot assign to read only property 'position'"). Always use `light.position.set(x, y, z)` instead.
- **OrbitControls hijacks mobile scroll** - Even with `enableRotate/Zoom/Pan = false`, OrbitControls attaches touch/wheel listeners that block scrolling. For decorative formations, remove OrbitControls entirely and use manual camera orbit: `cameraAngle += dt * 0.1; camera.position.x = Math.sin(cameraAngle) * radius; camera.position.z = Math.cos(cameraAngle) * radius; camera.lookAt(0,0,0);`. Also set `pointer-events: none` on canvas. Proven fix: VoronoiHero.tsx.
- **framer-motion opacity:0 silently fails** - `motion.*` elements with `initial={{ opacity: 0 }}` / `animate={{ opacity: 1 }}` can stay invisible on mobile. Replace with plain HTML elements for critical visible content (headers, CTAs).
- **isLowEnd device detection unreliable** - `navigator.hardwareConcurrency <= 4` doesn't catch modern iPhones. Only use `canUseWebGL()` as the WebGL guard -- no mobile width bypass or CPU-core checks.

## Building Any Website (General Principle)
When asked to build "the best site possible" or given source files to assemble:
1. **Read the source material first.** Understand what it is -- a business, a personal project, an article, a portfolio, an app, a cause, an event. The content dictates the design, not a template.
2. **Ask what the goal is** if not obvious from context. A memorial site, a SaaS launch, a research paper, and a music project demand completely different approaches.
3. **Decide whether a tier template applies.** It might not. Storytelling experiences, data visualizations, interactive tools, documentation sites, and magazine layouts may need custom structure.
4. **Design to the content.** 3D formations, cinematic sections, and Louisville business research are tools in the toolbox -- not the default answer for every project. If the content is poetry, serve poetry. If it's technical, clarity beats cinematic.
5. **Then** apply universal standards: local-first development (port 5199), build check, one deploy, user verifies visually, accessible, performant, no fabricated content.

## Client Site Rules (Louisville Business Demos)
- Research the business first. NO fabricated testimonials/ratings/reviews. Verify Unsplash images return HTTP 200. No image reuse across sites.
- **Workflow:** ~/.claude/reference/client-site-assets-sop.md | ~/Projects/client-sites/templates/SITE_GENERATION_GUIDE.md
- **Templates:** ~/Projects/client-sites/templates/ (4 tiers)
- **Elite Frontend:** ~/.claude/skills/frontend-design/ELITE_FRONTEND_PLAYBOOK.md
- **Reusable 3D Components:** ~/.claude/reference/entropy-viz-component.md, torus-knot-component.md, formations-component.md
- **Scroll-Driven 3D Experience:** ~/.claude/reference/scroll-driven-3d-experience.md (Tailwind v4, R3F, Web Audio, mobile scroll — proven at The Quiet Trade)

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
6. **Deploy** -- `vercel --prod --yes` (CRM now uses edge proxy `/api/outreach/` -- no env var needed)
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
**CRITICAL - Never read/edit without permission:** `**/APPLICATIONS*.csv`, `~/Desktop/1_PRIORITY_JOB_SEARCH/**`, `~/Desktop/Clementine/**` (client credentials, financial terms, LLC filing)

### Gmail IMAP (Portable -- Any Project)
When deliverable traceability requires verifying what was sent to a client, use Gmail IMAP to search the Sent folder. This is not a project -- it's a portable capability available from any working directory.
- **Credential:** macOS Keychain (`security find-generic-password -s "gmail-app-password" -a "matthewdscott7@gmail.com" -w`)
- **Never** hardcode, commit, log, or write the app password to any file. Retrieve it at runtime from Keychain only.
- **Use case:** Cross-referencing delivered assets against email attachments when file discovery via CLI is insufficient
- **Protocol:** `imaplib.IMAP4_SSL('imap.gmail.com')` with `[Gmail]/Sent Mail` folder search
- **Email:** matthewdscott7@gmail.com

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
**Quick Stats:** 46 GitHub repos | 69 client sites (69 deployed) | 2 active clients | 85 Ollama models

## Governance (Nov 2025+)
1. **Tabula Rasa** - Never bake personal context into prompts/models
2. **SELL phase** - Monetize deployed assets, package tools for sale. **Exception: active client work takes absolute priority over sell-phase tasks.**
3. **AI + Python hybrid** - AI for qualitative, Python for quantitative. LLMs can't do reliable arithmetic or music theory.
4. **Deployment gotchas** - Vercel defaults to auth-protected. Railway needs PORT env var. Render free tier spins down.
5. **Session management** - Never suggest closing sessions. User controls session boundaries.
6. **Fix-first communication** - Fix it, show result. Only ask when security risk or user preference affects outcome.
7. **Discovery before building** - Test all live deployments before writing code (OurJourney lesson)
8. **Execution bias** - Never frame sales/outreach as "scary". Direct next actions only.

### Referral Pipeline
Pip -- Louisville web design and brand expert, Matthew's mentor. Actively refers clients. Clementine Catering was Pip's first referral (Steve reached out to Pip, Pip referred to Matthew). Maintain relationship by sharing work, keeping quality high.

## Active Engagements (INCOME)
| Client | Contact | Status | Agreed Rate | Scope | Key Paths |
|--------|---------|--------|-------------|-------|-----------|
| RetailMyMeds | Kevin McCarron (dev, primary contact) + Arica Collins (strategy, Kevin's contact -- not direct) + Amy & Delaney (Arica's team) | **ACTIVE** | $2,500 (Option B @ 1/3) | Pharmacy qualification system: scoring engine, Wix Studio/Velo integration, strategic reports, GLP-1 targeting database (33,185 pharmacies), Intel Hub dashboard, landing pages, scorecard lead capture | `~/Desktop/RetailMyMeds/` (deliverables), `~/Projects/texume/` (source/templates), Render: `rmm-intel-hub.onrender.com` (live, auth-protected) |
| Clementine Catering | Steve Clements (owner) + Grace Lindsey (digital, Steve's daughter) | **INVOICED -- awaiting first payment** | $1,250/mo retainer + $400/mo ad spend | Website (Squarespace->Vercel migration), social media (8-12 posts/mo), targeted advertising (Google/FB/IG), 2 SEO blog posts/mo, GBP, directories, review campaign, monthly report | `~/Desktop/Clementine/` (deliverables), `~/Projects/client-sites/clementine-cater/`, `~/Projects/texume/` (proposals) |

### RetailMyMeds Current State (Feb 22, 2026)

**Last action:** Mutual NDA signed and returned to Kevin (Feb 22). W-9 generated and emailed to Kevin at projects@kevinmccarron.com for ADP 1099 setup (Feb 22).

**Business/legal status:**
- Mutual NDA executed (3-way: Projection Creative LLC / Project Lavos LLC / Retailmymeds.com LLC). Signed PDF at `~/Desktop/RetailMyMeds/Mutual_NDA_PC_PL_RMM_SIGNED.pdf`. 3-year term from last disclosure.
- W-9 sent to Kevin for ADP 1099 setup. PDF at `~/Desktop/RetailMyMeds/W9_Project_Lavos_LLC.pdf`. Direct deposit details pending Chase business checking approval.
- Chase business checking: applied 2/20/2026, still pending approval.

**Contact structure clarification:**
- Matthew communicates directly with Kevin. Kevin is the primary contact.
- Arica Collins is Kevin's contact (RMM President & CEO). Matthew does not track touchbase with Arica -- she is reached via Kevin.
- Amy & Delaney are Arica's team members, introduced at Feb 20 meeting.

**Meeting outcome (Feb 20 -- Kevin, Arica, Amy, Delaney, Matthew):**
- Kevin presented (62%), Arica talked (28%), Matthew support (9%). 37 min.
- Arica brought team members Amy and Delaney to see the assets
- Showed: landing pages (GLP-1, MFP, DIR Fee), scorecard/lead capture, Intel Hub demo, state outreach lists
- Arica liked the pointed messaging ("No, I like it" on aggressive GLP-1 tone)
- Arica validated the scorecard concept for lead capture
- **Key ask from Arica:** two-tier model -- free scorecard to capture leads, then **paid** deep-dive using actual dispensing data (acquisition costs, net profit, brand-level GLP-1 analysis)
- No data accuracy concerns raised on Intel Hub -- treated as directionally sound
- Arica confirmed: ~19,000 independent pharmacies nationally, RMM has touched ~1,000-1,500, high churn rate is a major concern
- Growth today: social media + word of mouth only
- Cash flow is #1 issue even before GLP-1/MFP

**Industry intel from Arica (new):**
- GLP-1 acquisition: $800-$1,200/mo, margins 1-5% gross at best. Delaware pharmacy lost $6k on one drug.
- MFP program (6 weeks old): pharmacies front full cost, PBM reimburses half, wait 60 days for manufacturer rebate -- but manufacturers are NOT rebating correct amounts. Expanding 10 drugs/year to 50-60 total.
- Direct-to-consumer GLP-1 programs bypassing PBMs are promising but consumers resist paying cash
- "Pharmacies operating in pure dispense model have a very grim future"

**Deployed assets:**
- Intel Hub: `rmm-intel-hub.onrender.com` (auth-protected, credentials via Render env vars)
- Forecasting tool: `rmm-pharmacy-tool.vercel.app`
- API: `texume-api.onrender.com`

**Next steps (Matthew):**
1. Refine scorecard indicators with Arica's language (cash-flow burden, PBM-proof, acquisition vs. reimbursement)
2. Design paid deep-dive tier spec (intake: actual dispensing data, output: pharmacy-specific plan)
3. Update MFP intelligence in landing pages and Intel Hub (60-day lag, rebate shortfalls, expansion timeline)
4. Cross-reference conference attendee data against database when Arica provides it
5. Share Intel Hub credentials with Amy and Delaney

**Post-meeting notes:** `~/Desktop/RetailMyMeds/post_meeting_notes_feb20.md`

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
