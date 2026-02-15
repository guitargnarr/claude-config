# How to Operate This System

**Purpose:** Everything a new operator needs to run Matthew's Claude Code Dev OS
**Audience:** Someone taking over this system with no prior context
**System scale:** 88 projects, 67 client demo sites (63 deployed), 51 Ollama models, 42 tools (27 commands + 8 skills + 7 agents)

---

## Part 1: Day 1 -- What You Must Know Before Touching Anything

### The 7 Non-Negotiable Rules

1. **Nothing is done until the user can SEE it.** Web app? Open URL. CLI? Show output. API? Show response. "The code is written" is not done. "Here's the URL" is done.

2. **Feature branches only.** Never commit to main. Always: branch -> commit -> PR -> merge. Command: `/commit` then `/push-pr main`.

3. **Build must pass before commit.** TypeScript: `npm run build`. Python: `flake8 [file]`. Fix all errors. No exceptions.

4. **Test live URLs before building.** Run deployment discovery first. The deployed version might be better than local code. This rule exists because 2 hours were wasted building on the wrong codebase (OurJourney, Nov 2025).

5. **Use Playwright for React apps, not curl.** `curl` and `WebFetch` only see initial HTML. React apps look "blank" to these tools even when working perfectly. Always: `npx playwright screenshot --wait-for-timeout=5000 "URL" screenshot.png`

6. **Fix problems yourself first.** Only ask the user if: (a) security concern, or (b) two valid approaches where user preference affects the outcome.

7. **No emojis** unless the user explicitly asks for them.

### The Files That Control Everything

| File | What It Does | Read When |
|------|-------------|-----------|
| `~/.claude/CLAUDE.md` | Master config. Every session loads this. Global rules, pitfalls, system info, deployment patterns. | Day 1 (read all of it) |
| `~/.claude/COLLABORATION_CONTRACT.md` | 13 principles for how human + AI work together. Definition of "done." | Day 1 |
| `~/.claude/COMMAND_MANIFEST.md` | Every command, skill, and agent documented with inputs/outputs/deps. | Day 1 (skim), reference ongoing |
| `~/.claude/reference/INDEX.md` | Table of contents for all 51 reference docs, categorized and dated. | When you need to find a doc |
| `~/.claude/reference/workflows.md` | Git workflow, Vercel deploy, Render deploy, mobile verification. | Before any git or deploy work |
| `~/.claude/reference/deployment-inventory.md` | All 97 URLs, local paths, GitHub repos, Render APIs. | When you need to find where something lives |

### First Commands to Learn

```bash
# Check what's deployed
vercel list                        # All Vercel projects
gh pr list                         # Open PRs in current repo

# Commit and PR (the standard flow)
/commit                            # AI-generated commit message
/push-pr main                      # Push branch + create PR

# Deploy
vercel --prod --yes                # Frontend (Vercel, 8-13 sec)
git push origin main               # Backend (Render auto-deploys, 2-5 min)

# Verify deployment
npx playwright screenshot --wait-for-timeout=5000 "https://url" verify.png

# Check system
claude-inventory                   # Available tools
claude-status                      # What needs attention
```

### The Brand

- **Primary:** Teal `#14b8a6`
- **Secondary:** Orange `#f97316`
- **Dark background:** Slate-900 `#0f172a`
- **WCAG AA:** Use `primary-700` (#0f766e) or darker for text on white (primary-500 fails contrast)

---

## Part 2: How the System Is Organized

### Directory Map

```
~/.claude/
  CLAUDE.md                    # Master config (loaded every session)
  COLLABORATION_CONTRACT.md    # Working principles
  COMMAND_MANIFEST.md          # All tools index
  TRANSFER_GUIDE.md            # This file
  settings.json                # Permissions config
  commands/                    # 27 slash command .md files
  skills/                      # 8 auto-trigger skill directories
  agents/                      # 7 agent definition .md files
  reference/                   # 51 reference docs (see INDEX.md)
  scripts/                     # 20+ utility scripts (asset gen, mockups, tmux)
  archive/                     # Historical docs (permissions guide, parallel dev v2-v4)
  context/                     # Working philosophy, patterns
  templates/                   # Reusable templates
```

### Where Projects Live

| Location | What's There |
|----------|-------------|
| `~/Projects/` | Main development (monorepo, APIs, tools) |
| `~/Projects/client-sites/` | 51 client demo websites |
| `~/Projects/client-sites/templates/` | Tier 1-4 templates |
| `~/Projects/Personal/` | Personal projects (OurJourney, JCPS) |
| `~/Projects/Security-Tools/` | Mirador, PhishGuard |
| `~/Desktop/2_AI_PROJECTS_PORTFOLIO/` | BA Pathfinder |
| `~/Desktop/Manus/` | Manus-generated projects (fret-vision, prompt-fact) |

### Where Things Deploy To

| Platform | Count | Used For | Deploy Command |
|----------|-------|----------|----------------|
| Vercel | 52 | Frontends (Vite/React/Next.js) | `vercel --prod --yes` |
| Render | 8 | Python APIs (FastAPI) | `git push origin main` |
| Netlify | 1 | jaspermatters.com | `netlify deploy --prod` |
| Custom domains | 3 | projectlavos.com, jaspermatters.com, matthewscott.link | Managed via platform dashboards |

**Full URL -> local path mapping:** `~/.claude/reference/deployment-inventory.md`

---

## Part 3: Daily Operating Procedures

### Starting a New Task

1. **Understand what exists.** Check deployment inventory. Test live URLs if relevant.
2. **Create a feature branch.** `git checkout -b feature/[name]`
3. **Implement.** Read existing code first. Prefer editing over creating new files.
4. **Test.** `npm run build` (JS/TS) or `flake8` (Python). Run project tests if they exist.
5. **Commit.** `/commit` (generates AI commit message from staged changes)
6. **Create PR.** `/push-pr main` (pushes branch, creates PR with description)
7. **Verify PR exists.** `gh pr list` -- if your PR isn't listed, it's not done.
8. **Show visual proof.** URL, command, screenshot. User must see the result.

### Deploying a Frontend (Vercel)

```bash
# Step 1: Test locally
npm run build && npm run preview

# Step 2: Deploy
vercel --prod --yes                              # No env vars needed
# OR with Vite env vars (MUST be in build):
VITE_API_URL=https://api.example.com vercel build --prod
vercel deploy --prebuilt --prod --yes

# Step 3: Verify (MUST use Playwright for React apps)
npx playwright screenshot --wait-for-timeout=5000 "https://site.vercel.app" verify.png
```

**Critical pitfall:** Vite bakes env vars at BUILD time. Adding them in Vercel dashboard then running `vercel --prod` does nothing. They must be in the build command.

### Deploying a Backend (Render)

```bash
# Render auto-deploys from main branch
git push origin main

# Verify after ~2-5 minutes
curl -s https://your-api.onrender.com/health | jq .
```

**Notes:**
- Free tier spins down after 15 min (~30 sec cold start on next request)
- Use `pg8000` driver for PostgreSQL, NOT `psycopg2-binary` (build fails on Render)
- PORT must come from environment variable, never hardcode

### Building a Client Demo Site

```bash
# Option A: Use the skill (auto-triggered)
# Just say "Create a demo site for [business name]"
# The client-demo-generator skill handles everything

# Option B: Manual from template
cp -r ~/Projects/client-sites/templates/tier2-professional ~/Projects/client-sites/new-site
cd ~/Projects/client-sites/new-site
# Customize App.tsx with business info
npm run build && vercel --prod --yes
```

**Content rules:**
- Research the actual business first
- NO fabricated testimonials, ratings, or reviews (ever)
- Verify Unsplash images return HTTP 200 before using
- No image reuse across different client sites

**Post-deploy:** Generate assets with `~/.claude/scripts/create-client-assets.js`, add to portfolio at `~/Projects/projectlavos-monorepo/main-site/`.

### Running a Parallel Development Session

```bash
# 1. Launch 4-pane tmux
tpar

# 2. Start Claude in each pane
for pane in 1 2 3 4; do
  tmux send-keys -t parallel:1.$pane "claude" Enter
done

# 3. Send task prompts (use unified-task-prompt.md template)
tmux send-keys -t parallel:1.1 "cd ~/Projects/project1 && [task]" Enter

# 4. Monitor every 15-20 min
for pane in 1 2 3 4; do
  echo "=== PANE $pane ==="
  tmux capture-pane -t parallel:1.$pane -p | tail -20
done

# 5. Approve permissions remotely
tmux send-keys -t parallel:1.1 Enter

# 6. Collect PRs, kill session
gh pr list
tmux kill-session -t parallel
```

**Rules:** Max 4 tasks. Tasks must be independent (no shared files). Each task gets its own worktree. Expected: 88% PR success, 60-70% time savings.

---

## Part 4: The Tool Ecosystem

### Slash Commands (27) -- Invoked with `/command`

| Category | Commands | When to Use |
|----------|----------|-------------|
| Git | `/commit`, `/push-pr`, `/review-pr`, `/git` | Every task (commit + PR) |
| Parallel | `/worktree`, `/cleanup-worktrees`, `/tmux` | Multi-task sessions |
| Discovery | `/discover` | Before any deployment work |
| Career | `/coach`, `/louisville`, `/tactic`, `/quick` | Job search assistance |
| Audit | `/audit-repo`, `/audit-status`, `/audit-sync`, `/audit-handoff` | Repository audits |
| Creative | `/art`, `/canvas-design`, `/theme`, `/slack-gif`, `/generative-artist`, `/riff` | Visual/creative work |
| Dev | `/code`, `/analyze`, `/test-models` | Code generation, analysis |
| Utility | `/humanize`, `/consult` | Text refinement, expert consultation |

### Skills (8) -- Auto-trigger on phrases

Skills fire automatically when certain phrases are detected. You don't invoke them -- they invoke themselves.

| Skill | Triggers On | What It Does |
|-------|-------------|-------------|
| client-demo-generator | "Create a demo site for..." | Scaffolds complete Vite+React site from business info |
| tier4-luxury-generator | "Tier 4 site", "ultra-luxury" | Premium sites with AI Oracle concierge |
| frontend-design | "Make this beautiful", "style this UI" | Production-grade interfaces (Elite Frontend Playbook) |
| resume-customizer | Job URL mentioned, "customize resume" | Tailors resume variants A/B/C for specific posting |
| cover-letter-generator | "Cover letter" | Generates personalized cover letter (chains after resume) |
| interview-prep-auto | "I have an interview" | Full prep doc with STAR stories, salary negotiation |
| job-application-tracker | "I applied to..." | Updates CSV tracker, shows stats |
| prospect | Business description provided | Scores client lead (1-10), recommends tier |

**Chain:** resume-customizer -> cover-letter-generator -> job-application-tracker (auto-flows)

### Agents (7) -- Launched via Task tool

| Agent | What It Does | Invoke With |
|-------|-------------|-------------|
| audit-orchestrator | Coordinates 4 sub-agents for full repo audit | `/audit-repo [name]` |
| repo-scanner | File counts, git stats, size measurement | "How big is this repo?" |
| documentation-reader | Verifies README claims against code | "Does README match reality?" |
| code-analyzer | LOC counting, quality assessment, automation detection | "What does this code do?" |
| security-auditor | Credential scanning, git history secrets, risk levels | "Check for security issues" |
| Interview Prep | Chains 3 Ollama models for interview preparation | "Prepare for interview at [company]" |
| Code Automation | Python code gen via Ollama code-executor model | "Automate [task] with Python" |

**Audit pipeline:** repo-scanner -> documentation-reader -> code-analyzer -> security-auditor (orchestrated sequentially)

### Ollama Models (14 unique, 51 total)

These are local AI models running on the machine via Ollama. Commands and skills query them.

| Model | Used By | Purpose |
|-------|---------|---------|
| matthew-career-coach | /coach, resume, cover letter, interview prep | Matthew's professional background + coaching |
| louisville-job-market | /louisville, resume, cover letter, interview prep | Louisville KY market intelligence |
| barrier-breaker | /tactic, interview prep | Age bias tactics, hiring strategies |
| code-executor | /code agent | Python code generation |
| client-prospector | prospect skill | Business lead scoring |
| design-oracle | oracle-query-pattern | Creative frontend direction |
| design-system-atlas | oracle-query-pattern | System grounding (tier/palette/components) |
| elite-frontend | oracle-query-pattern | Production TypeScript implementation |
| +6 domain experts | /consult | Architecture, prompt engineering, business/tax |

**Check status:** `ollama list` (shows all available models)
**Run model:** `ollama run model-name "query"`

---

## Part 5: What Can Go Wrong (and How to Prevent It)

### Severity: CRITICAL

| Failure | What Happens | Prevention |
|---------|-------------|------------|
| Commit to main | Bypasses review, breaks CI/CD | Always use feature branches + `/push-pr` |
| Build on wrong codebase | Hours wasted (OurJourney lesson) | Run `/discover` first, test ALL live URLs |
| Commit broken code | Breaks production | `npm run build` / `flake8` before every commit |
| Hardcode credentials | Security breach, professional harm | security-auditor agent, never commit .env files |

### Severity: HIGH

| Failure | What Happens | Prevention |
|---------|-------------|------------|
| Vite env vars not in build | Frontend deploys with blank API URLs | `VITE_X=value vercel build --prod` (not just dashboard) |
| curl to verify React app | False "blank page" diagnosis | Always use Playwright with `--wait-for-timeout=5000` |
| Skip visual proof | User can't find or access result | Must show URL/command, verify it's repeatable |
| Use Tailwind v4 | Config incompatibility breaks styles | Use Tailwind v3 (exception: Next.js projects) |

### Severity: MEDIUM

| Failure | What Happens | Prevention |
|---------|-------------|------------|
| >4 parallel tasks | Monitoring overhead, lower success rate | Stick to 2-4 max, run batches if needed |
| Follow outdated parallel docs | Use v2/v3 patterns instead of v5 tmux | Load `parallel-development-playbook.md` (canonical) |
| Fabricate testimonials | Ethical violation, client trust | NEVER create fake reviews/ratings/quotes |
| Ship unverified numbers | Destroys income client trust | For paid engagements: programmatically validate EVERY metric against source data before delivery. One inconsistency = full re-audit. |
| Render env var removal | Blueprint sync only adds, never removes | Delete manually from Render dashboard |

### Recovery Patterns

```bash
# Vercel rollback (instant)
vercel rollback

# Git revert (creates new commit)
git revert HEAD && git push origin main

# Fix failed pre-commit hook
# DO NOT use --amend (modifies wrong commit)
# Fix the issue, re-stage, create NEW commit
```

---

## Part 6: Reference Loading System

The system has 51 reference documents totaling 15,100+ lines. They're loaded on-demand to avoid wasting context.

### How to Load

```bash
# In a Claude Code session, use @ to load any reference doc:
@~/.claude/reference/tier-templates-reference.md
@~/.claude/reference/deployment-inventory.md
```

### When to Load What

| Situation | Load This |
|-----------|-----------|
| Building a client site | `tier-templates-reference.md` |
| Deploying anything | `deployment-inventory.md` + `workflows.md` |
| First time touching a project | `deployment-discovery-protocol.md` |
| Parallel development session | `parallel-development-playbook.md` |
| Writing a task prompt | `unified-task-prompt.md` |
| Complex change (5+ files) | Ultrathink triggers automatically |
| Need to find a doc | `INDEX.md` |

### Most-Referenced Docs (Top 7)

1. `tier-templates-reference.md` -- UI/UX patterns for client sites (1,293 lines)
2. `deployment-inventory.md` -- All URLs, paths, platforms (242 lines)
3. `workflows.md` -- Git, deploy, verify patterns (245 lines)
4. `parallel-development-playbook.md` -- tmux v5 workflow (697 lines)
5. `unified-task-prompt.md` -- Task template + project inventory (352 lines)
6. `ultrathink-definition.md` -- Auto-analysis protocol (91 lines)
7. `deployment-discovery-protocol.md` -- Test before build (409 lines)

---

## Part 7: The Automation Chain (How Skills Connect)

### Job Application Flow (Fully Automated)

```
User mentions job posting
    |
    v
resume-customizer (auto-triggers)
    |-- Selects variant: A (QA/BA), B (QA+Python), C (AI Safety)
    |-- Queries matthew-career-coach + louisville-job-market (Ollama)
    |-- Outputs: Custom resume + match score
    |
    v
cover-letter-generator (auto-chains)
    |-- Queries same Ollama models
    |-- Outputs: Personalized cover letter file
    |
    v
job-application-tracker (auto-chains)
    |-- Updates JOB_TRACKER_2025.csv
    |-- Shows stats, recommends follow-ups
    |
    v
(If user mentions "interview")
interview-prep-auto (auto-triggers)
    |-- Chains 3 models: career-coach + louisville + barrier-breaker
    |-- Outputs: Full prep doc with STAR stories, salary negotiation, Q&A
```

### Client Site Flow (Semi-Automated)

```
User says "Create a demo site for [business]"
    |
    v
client-demo-generator skill (auto-triggers)
    |-- Gathers business info
    |-- Selects tier template (1-4)
    |-- Copies template, customizes
    |-- Builds and deploys to Vercel
    |
    v
Post-deploy (manual steps):
    |-- Capture mobile screenshot (390x844)
    |-- Run create-client-assets.js (mockup, OG, QR, favicons)
    |-- Copy assets to client site + portfolio
    |-- Deploy both sites
    |-- Verify with Playwright
```

### Audit Flow (Fully Automated)

```
/audit-repo [name]
    |
    v
audit-orchestrator (launches 4 agents in sequence)
    |
    +-- Phase 1: repo-scanner
    |   Returns: file counts, git stats, size, archive detection
    |
    +-- Phase 2: documentation-reader
    |   Returns: README accuracy, feature claims vs reality
    |
    +-- Phase 3: code-analyzer
    |   Returns: LOC, quality, dependencies, automation detection
    |
    +-- Phase 4: security-auditor
    |   Returns: credentials, git history secrets, risk assessment
    |
    v
Consolidated Report (7 sections)
```

---

## Part 8: System Accounts and Access

| Service | Account | How to Verify |
|---------|---------|---------------|
| GitHub | guitargnarr | `gh auth status` |
| Vercel | guitargnar | `vercel whoami` |
| Netlify | Logged in | `netlify status` |
| Render | Logged in | Dashboard access |
| Railway | Needs login (interactive) | `railway login` |
| Supabase | Needs token | Set `SUPABASE_ACCESS_TOKEN` |
| Python | 3.14 | `/Library/Frameworks/Python.framework/Versions/3.14/bin/python3` |
| Ollama | Local (no account) | `ollama list` |

---

## Part 9: Glossary

| Term | Meaning |
|------|---------|
| Dev OS | This entire system -- CLAUDE.md + commands + skills + agents + reference docs + scripts |
| Ultrathink | Auto-triggered analysis mode for complex changes (5+ files, arch decisions, security) |
| Tier 1-4 | Client site complexity levels (Essential -> Enterprise) |
| Architectural Noir | Design aesthetic: void black, single warm accent, editorial serif, glass 3D |
| Visual proof | URL, command, or screenshot showing the result works |
| Discovery | Testing all live deployments before building (mandatory for deployment work) |
| Worktree | Git feature allowing multiple branches checked out simultaneously |
| STAR stories | Situation, Task, Action, Result -- interview answer framework |

---

## Part 10: Quick Diagnostic

### Something Broke

```bash
# Check recent changes
git log --oneline -10

# Check deployment status
vercel list | head -20

# Check if Render API is up (30s cold start is normal)
curl -s https://your-api.onrender.com/health

# Rollback Vercel instantly
vercel rollback

# Revert last git commit
git revert HEAD
```

### Can't Find Something

```bash
# Search all reference docs
@~/.claude/reference/INDEX.md

# Search deployment inventory
@~/.claude/reference/deployment-inventory.md

# Search command manifest
@~/.claude/COMMAND_MANIFEST.md

# Find a file by name
# Use Glob tool with pattern
```

### New Session Checklist

1. What project am I working on?
2. Is there a live deployment? (Check inventory)
3. What branch am I on? (`git branch --show-current`)
4. Are there open PRs? (`gh pr list`)
5. Does the build pass? (`npm run build`)

---

**This system was built over 4 months of daily use (Oct 2025 - Feb 2026). It operates 88 projects with 67 client demo sites, documented workflows, automated pipelines, and proven patterns. The rules exist because mistakes were made and lessons were learned. Follow them.**
