# Global Claude Code Setup

## Critical Rules

### VISUAL PROOF OF COMPLETION (Dec 2025 - HIGHEST PRIORITY)
**Nothing is "complete" until user can SEE and INTERACT with it:**
- Web app? Must open in browser at a URL user can visit
- CLI tool? Must show how to run it and demonstrate it working
- MIDI generator? Must produce a file and show how to play it
- API? Must demonstrate with actual request/response
- **If you can't show it running, it's not done**

**When finding something:**
- Don't just say "it's at /path/to/file" - show HOW TO USE IT
- Provide the exact command to run or URL to open
- Results must be REPEATABLE - same command = same result every time

### FIX BEFORE ASKING
- If something is broken, TRY TO FIX IT before asking questions
- Only ask if: (1) security concern, or (2) multiple valid paths and user preference affects outcome
- When you must ask, present options based on how user likely wants result to look/work
- Reference Anthropic docs at https://docs.anthropic.com when unsure about model capabilities

### NO TOKEN WASTE
- Do not drag out requests or add unnecessary steps
- Execute efficiently toward visual, working result
- If missing critical knowledge that user needs, state it directly - don't assume they know

### Ultrathink Protocol (v2 - Automatic)
Triggers automatically when complexity thresholds met:
- 5+ files affected
- Architectural decisions with multiple valid approaches
- Security-sensitive changes (auth, credentials, permissions)
- Breaking changes to existing APIs/interfaces
- Cross-project impact or data migrations

**When triggered:** Create `ULTRATHINK_[TOPIC].md`, write structured analysis (50-200 lines), show key findings, then execute.
**Manual trigger still works:** "use ultrathink"
Reference: @~/.claude/reference/ultrathink-definition.md

### Standard Rules
- **Documentation:** Max 5 files per project, 500 lines each (READMEs prefer <200, ULTRATHINK_*.md exempt)
- **Discovery first, then code:** For deployment work, inventory what exists before building. For new features, implement before documenting.
- **Delete planning docs** after extracting action items (prevent bloat)
- **Work mode:** Consulting and platform building (sustainable income model)
- Never use emojis unless explicitly requested

### Pre-Commit Quality (Jan 2026 - MANDATORY)
**Do NOT commit code with unresolved linting/build errors.** Before any commit:
- **TypeScript/JS:** `npm run build` must pass (no type errors)
- **Python:** `flake8 [file]` must pass (no lint errors)
- **Fix ALL issues before committing** - don't rush commits with known problems
- Pattern recognition: anticipate fixes based on error patterns, don't wait for user feedback

## System Info
- Python: 3.14 at `/Library/Frameworks/Python.framework/Versions/3.14/bin/python3`
- GitHub: guitargnarr (matthewdscott7@gmail.com)
- Deployment: Vercel, test build locally: `npm run build && npm run preview`
  - **No env vars:** `vercel --prod --yes`
  - **With VITE_ env vars:** `VITE_X=value vercel build --prod && vercel deploy --prebuilt --prod --yes`
  - Vite bakes env vars at BUILD time - `vercel env add` alone does NOTHING for Vite apps

## Critical Pitfalls
- **Use pg8000 for Render Python APIs** - Use `pg8000` (pure Python) instead of `psycopg2-binary` to avoid Render build failures. Update SQLAlchemy URL to `postgresql+pg8000://` and configure SSL context manually.
- **Render Blueprint doesn't remove env vars** - If you remove an env var from render.yaml, you must manually delete it from Render dashboard. Blueprint sync only adds/updates, never removes.
- **Vite env vars must be in build** - Don't just add to Vercel dashboard and deploy. Use `VITE_X=value vercel build --prod` then `vercel deploy --prebuilt --prod --yes`
- **Minimal vercel.json OK for Vite SPA routing** - Simple rewrites to `/index.html` are REQUIRED for React Router. Complex configs break auto-detect. Keep it minimal.
- **NO Tailwind v4** (use v3) - Exception: Next.js projects can use v4
- **Absolute URLs for OG meta tags**
- **ALWAYS inventory ALL deployments FIRST** - Check Vercel/Railway/Netlify dashboards before assuming local code is canonical
- **Test live URLs before building** - Deployed version might be superior to local code
- **WebFetch CANNOT verify React apps** - WebFetch/curl only get initial HTML before JavaScript renders. React/Vue/Svelte apps will appear "blank" or "title only" to these tools even when fully functional. **ALWAYS use Playwright with wait timeout** to verify SPA content:
  ```bash
  npx playwright screenshot --wait-for-timeout=5000 "https://url" screenshot.png
  ```
  Then read the screenshot. Never conclude a React app is "blank" based on WebFetch alone.

## Render + Neon + pg8000 Stack (Jan 2026)
**Proven pattern for production Python APIs with free-tier database:**

| Layer | Service | Notes |
|-------|---------|-------|
| Database | Neon PostgreSQL | Free tier, no 1-DB limit like Render. CLI: `neonctl projects create --name [name]` |
| API | Render (Python) | Use pg8000 driver, NOT psycopg2-binary |
| Frontend | Vercel | Standard Vite deploy |

**requirements.txt:**
```
fastapi
uvicorn
sqlalchemy
pg8000
```

**Database connection (main.py):**
```python
import ssl
DATABASE_URL = os.getenv("DATABASE_URL", "")
# Convert to pg8000 dialect
if DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+pg8000://", 1)
# Strip sslmode (pg8000 handles SSL differently)
DATABASE_URL = re.sub(r'[\?&]sslmode=[^&]*', '', DATABASE_URL)
# Configure SSL for Neon
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE
engine = create_engine(DATABASE_URL, connect_args={"ssl_context": ssl_context})
```

**Reference implementation:** `~/Projects/client-sites/client-cms/api/main.py`

## Client Site Development Protocol (Jan 2026)

### Pre-Development (MANDATORY)
1. **Research the business** - Client sites represent real businesses. Research:
   - Business name, location, industry
   - Services/products offered
   - Target audience
   - Competitors in area
   - Unique value proposition
2. **Verify Unsplash images before use** - Test with curl:
   ```bash
   curl -sI "https://images.unsplash.com/[PHOTO_ID]?w=100" | head -1
   # Must return HTTP 200, NOT 404
   ```
3. **No asset reuse across client sites** - Each site gets unique images

### Content Rules (PERMANENT)
- **NO FABRICATED TESTIMONIALS** - Never create fake reviews/quotes. This is fabrication.
- **NO FAKE RATINGS** - Don't invent star ratings or review counts
- **REAL DATA ONLY** - If business data unavailable, omit section rather than fabricate

### Post-Deployment Checklist
1. **Capture Mobile Screenshot** - Get iPhone 14 viewport (390x844):
   ```bash
   npx playwright screenshot --viewport-size="390,844" --wait-for-timeout=5000 "URL" mobile.png
   ```
2. **Generate All Assets** - Use the all-in-one asset generator:
   ```bash
   cd ~/.claude/scripts && npm install canvas qrcode  # One-time setup
   node create-client-assets.js <site-name> <mobile-screenshot> [options]

   # Example with custom colors:
   node create-client-assets.js copper-barrel-brewing ./mobile.png \
     --colors "#b45309,#78350f" \
     --title "Copper Barrel" \
     --subtitle "Brewing Co."
   ```
   **Generates:** iPhone mockup (430x880), OG image (1200x630), QR code (370x370), favicons (16, 32, 180)

3. **Copy Assets to Destinations:**
   ```bash
   # Client site (favicons, og-image)
   cp output/favicon-*.png output/apple-touch-icon.png ~/Projects/client-sites/<site>/public/
   cp output/<site>-og.png ~/Projects/client-sites/<site>/public/og-image.png

   # Portfolio (preview, og-image, qr)
   cp output/<site>-preview.png ~/Projects/projectlavos-monorepo/main-site/public/previews/
   cp output/<site>-og.png ~/Projects/projectlavos-monorepo/main-site/public/og-images/
   cp output/<site>-qr.png ~/Projects/projectlavos-monorepo/main-site/public/qr-codes/
   ```
4. **Update Client Site HTML** - Add meta tags to index.html:
   - `<link rel="icon" type="image/png" href="/favicon.png" />`
   - `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`
   - `<meta property="og:image" content="https://<site>.vercel.app/og-image.png" />`
5. **Add to Portfolio** - Add entry to localClients array in App.jsx:
   ```javascript
   {
     id: "siteid",
     title: "Business Name",
     url: "https://<site>.vercel.app",
     preview: "/previews/<site>.png",
     ogImage: "/og-images/<site>-og.png",
     qrCode: "/qr-codes/<site>-qr.png",
     description: "Short description",
     category: "Category",
     specWork: true,
     details: "Detailed description..."
   }
   ```
6. **Deploy Both Sites:**
   ```bash
   cd ~/Projects/client-sites/<site> && vercel --prod --yes
   cd ~/Projects/projectlavos-monorepo/main-site && vercel --prod --yes
   ```
7. **Visual Verification** - Verify both deployments with Playwright
8. **Frontend Oracle Review** - Consult frontend-design skill for design quality check (optional)

**Full workflow reference:** @~/.claude/reference/device-mockup-workflow.md
**Proven with:** copper-barrel-brewing (Jan 2026)

### Image Verification Workflow
```bash
# Validate single image
curl -sI "https://images.unsplash.com/photo-XXXXXXXXX?w=100" | head -1

# Batch validate (check multiple)
for id in photo-1234 photo-5678 photo-9012; do
  status=$(curl -sI "https://images.unsplash.com/$id?w=100" | head -1)
  echo "$id: $status"
done
```

**Diversify year searches when sourcing images** - Don't always search current year. Vary 2020-2026 for best results.

**TODO:** Automate steps 5-7 via client-cms extension - when site added to CMS, auto-generate portfolio card data and push to projectlavos.com. Reference: `~/Projects/client-sites/client-cms/`

## Private Data Protection
**CRITICAL - Never read/edit without permission:**
- `**/GMAIL_*.csv`, `**/APPLICATIONS*.csv`
- `~/Desktop/1_PRIORITY_JOB_SEARCH/**` (historical data, archived)

## Communication Style
- Direct, technical, honest
- Code examples > Long explanations
- Facts > Speculation

## Quality Standards
Task complete ONLY when:
- **User can see visual proof** (browser window, running app, working command)
- Tests pass (run actual tests)
- Build succeeds
- Committed to git
- **User knows exact location/URL/command** to access result repeatedly

## Context Management
- `/clear` after major tasks
- `/model [haiku|sonnet|opus]` - right model for task

## Parallel Development (2-4x faster)
For 2-4 independent tasks: Use git worktrees + multiple Claude terminals
- **Full playbook:** @~/.claude/reference/parallel-development-playbook.md
- Proven: 60-70% time savings, 50-100% PR success rate acceptable

## AI-Native Development Toolkit (2025-11-19)
**Quick Commands:**
- `claude-inventory` - Show available tools
- `claude-verify` - Verify toolkit works
- `claude-status` - Check what needs attention
- `claude-export [type]` - Generate documentation exports

**Client Site Asset Generation (Jan 2026):**
- `~/.claude/scripts/create-client-assets.js` - All-in-one generator (iPhone mockup, OG image, QR code, favicons)
- `~/.claude/scripts/create-iphone-mockup.js` - Standalone iPhone frame generator
- **Requirements:** `npm install canvas qrcode` in scripts directory

**Deployment & Verification:**
- `claude-discover [URL]` - Deployment discovery automation
- `claude-verify-urls` - Batch URL verification
- `mobile-verify.sh [URL]` - Mobile screenshot verification
- `mobile-verify-batch.sh [dir]` - Batch mobile verification

**Parallel Development:**
- `tmux-parallel.sh` - Launch 4-pane tmux session
- `tmux-worktrees.sh` - Launch tmux with git worktrees
- `launch_parallel.sh` - Legacy terminal launcher
- `cleanup-worktrees.sh` - Remove merged worktrees
- `worktree_manager.py` - Full worktree management
- `parallel_metrics.py` - Track parallel run efficiency
- `merge-parallel-prs.sh` - Batch merge PRs from parallel run

**Core Documentation:**
- **Collaboration:** @~/.claude/COLLABORATION_CONTRACT.md (how human + AI work together)
- **Parallel Dev:** @~/.claude/reference/parallel-development-playbook.md (v5.0, tmux integration, 88% PR success)
- **Deployment Discovery:** @~/.claude/reference/deployment-discovery-protocol.md (prevent wrong codebase)

## Reference Documentation (Load on-demand via @)
- **Task Prompts:** @~/.claude/reference/unified-task-prompt.md (single template + project inventory)
- **Full Inventory:** @~/.claude/reference/deployment-inventory.md (all deployments, backends, domains)
- **Workflows:** @~/.claude/reference/workflows.md (git, brand, deployment)
- **Tier Templates:** @~/.claude/reference/tier-templates-reference.md (UI/UX patterns, client site development)
- **Permissions:** @~/.claude/archive/PERMISSIONS_GUIDE.md
- When opening websites for me verify what is displayed on screen

## Agent Quick Reference (Dec 2025)
**Agents** (in `~/.claude/agents/`):
| Agent | Purpose | Trigger |
|-------|---------|---------|
| audit-orchestrator | Full audit (coordinates all agents) | "Full audit of [repo]" |
| repo-scanner | Metrics, file counts, git stats | "How big is this repo?" |
| documentation-reader | Verify README claims | "Does README match reality?" |
| code-analyzer | Understand code, assess quality | "What does this code do?" |
| security-auditor | Find credentials, automation risks | "Check for security issues" |
| Code Automation | Generate Python scripts | "Automate this process" |
| Interview Prep | Career prep (uses Ollama models) | "Prepare for interview" |

**Slash Commands**:
| Command | Use |
|---------|-----|
| `/audit-repo [name]` | Start audit |
| `/commit` | AI-generated commit message |
| `/push-pr main` | Create PR |
| `/coach` | Career coaching |
| `/tactic` | Hiring tactics |

## Project-Specific Context (Load on-demand)
- **Guitar Model Lab:** `~/Projects/guitar-model-lab/CLAUDE_CONTEXT.md`
- **Full Inventory:** @~/.claude/reference/deployment-inventory.md

**Quick Stats:** 222+ assets | 86 code projects | 94 deployed URLs | 51 Ollama models
**Brand:** Teal (#14b8a6) / Orange (#f97316)

## Client Demo Sites (Jan 2026 Audit)
**Total:** 60 sites | **Deployed:** 51 | **Location:** ~/Projects/client-sites/ + ~/Projects/jobtrack/client-sites/
**Full inventory:** ~/Projects/client-sites/CLIENT_SITES_INVENTORY.md

| Metric | Value |
|--------|-------|
| Tech Stack | 78% Tailwind, 17% Styled-Components, 93% TypeScript |
| Largest | hideaway-saloon (5569 lines - Auth, Booking, Gallery, Dashboard) |
| Architecture | Single-file (48 sites) vs Component-based (6 JobTrack sites) |
| Features | 24 Booking, 12 Gallery, 11 Auth, 10 Toast, 6 Cart |

**Remaining issues:**
- 2 missing OG images (most added Jan 12)

**JobTrack sites use better architecture** - nachbar has 13 files, 3390 lines. Use as reference for new sites.

---
## LATEST GOVERNANCE UPDATE (Nov 23, 2025)
**Applies to ALL projects. Overrides previous conflicting instructions.**

### 1. Tabula Rasa Law (Context Integrity)
- **CRITICAL**: NEVER bake personal context (mortgages, health, specific location) into prompts or models.
- If an AI tool generates personal life advice, **DISCARD IMMEDIATELY**. It is a hallucination/context leak.
- **Strict Scope**: Actions must map to Operational Assets (Repos, Deployments, Revenue).

### 2. Work Mode: CAPITALIZATION PHASE
- **Current Phase**: `DEPLOY` -> **`SELL`**
- We are no longer just building tools. We are capitalizing on them.
- **Required Focus**:
  1. Monetize deployed assets (add user-facing interfaces)
  2. Package tools for sale (courses, templates, consulting)
  3. Assess repos for value (not just deployability)

### 3. AI + Python Hybrid Pattern
- Use AI for: qualitative tasks (code generation, recommendations, style interpretation)
- Use Python for: quantitative tasks (scoring, math, deterministic logic, music theory)
- Don't use AI for: static inventory (CLI tools + JSON simpler)
- Small models can't do arithmetic reliably (proven Nov 22)
- **LLMs generate musically incorrect tabs** (proven Dec 10) - Use deterministic Python for note generation, AI only for "aggressive metal" → {root: E, scale: phrygian, pattern: pedal} style interpretation

### 4. Deployment Gotchas (Learned Nov 23, updated Dec 11)
- **Vercel**: Defaults to auth-protected. Disable "Vercel Authentication" in Project Settings → Deployment Protection
- **Railway**: Requires PORT from environment variable (not hardcoded 8000). Free plan has project limit - use Render for new Python APIs.
- **Render**: Use "Public Git Repository" URL option if GitHub app doesn't show repo. Start command for FastAPI: `uvicorn main:app --host 0.0.0.0 --port $PORT`. Free tier spins down after 15min (~30sec cold start).
- **Vercel + GitHub**: Auto-connects when repo is pushed, enables CI/CD automatically

### 5. Session Management
- **NEVER suggest closing sessions** - User keeps terminals open and returns after breaks
- **NEVER assume fatigue** - You don't know if user just woke up or took a break
- **NEVER say "you've been working X hours"** - Sessions span multiple days
- **DO provide natural stopping points** when work is complete (all committed, clean state)
- **DO ask** "continue or pause?" instead of "let's close"
- **User controls session boundaries**, not you

### 6. Decision Communication (Direct, Fix-First)
- **Try to fix it yourself FIRST** - Don't ask unless blocked
- **State what you know clearly** - Don't hide knowledge behind options
- **Recommend explicitly** - "Option C is right because X, Y, Z"
- **Only ask when**: security risk OR user preference materially affects outcome

**Pattern**:
❌ Bad: "Here are 3 options..." (secretly knowing C is right)
❌ Bad: "Do you want me to fix this?" (just fix it)
✅ Good: Fix it, then show: "Fixed. Here's the result: [URL/command]"
✅ Good: "Two valid approaches: A gives [outcome], B gives [outcome]. Which result do you want?"

**Why**: User wants working software, not decisions. Execute toward results.

### 7. Deployment Discovery (Nov 26, 2025)
**MANDATORY for any deployment work:**
- Run `claude-discover [URL]` before building
- Test ALL found deployments with Playwright
- Compare quality, choose best foundation
- **Prevents building on wrong codebase** (OurJourney lesson)
- Full protocol: @~/.claude/reference/deployment-discovery-protocol.md

### 8. Execution Bias (Not Fear Avoidance)
- **Never frame sales/outreach as "scary"** - It's just work, like coding
- **Don't suggest** "building feels safer" - Building and selling are both execution
- **Don't assume** user is avoiding hard conversations - They're strategic about timing
- **Do recommend** direct next actions without psychological commentary
- **Pattern**: "Next: Reach out to 10 healthcare CIOs" NOT "scary but necessary"
