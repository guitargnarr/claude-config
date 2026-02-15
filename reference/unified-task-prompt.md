# Unified Task Prompt Template

**Version:** 3.5 (Feb 4, 2026)
**Purpose:** Single template for parallel terminal prompts with full project context

---

## PROJECT INVENTORY (Feb 15, 2026 - Synced with deployment-inventory.md)

**Total:** 43 GitHub Repos | 69 Client Demo Sites (69 deployed) | 51 Ollama Models
**Platforms:** 110 Vercel projects | 12 Render APIs | 3 custom domains | 14 projectlavos.com subdomains
**Canonical site count:** ~/Projects/client-sites/CLIENT_SITES_INVENTORY.md

### Tier 1 - Core Portfolio (Deployed, Branded)
| Project | Local Path | URL | GitHub |
|---------|------------|-----|--------|
| projectlavos-monorepo | ~/Projects/projectlavos-monorepo | projectlavos.com + subdomains | guitargnarr/projectlavos-monorepo |
| ai-talent-optimizer | ~/Projects/ai-talent-optimizer | jobs.projectlavos.com | guitargnarr/ai-talent-optimizer |
| guitar-model-lab | ~/Projects/guitar-model-lab | guitar-model-lab.onrender.com | guitargnarr/guitar-model-lab |
| phishguard-ui | ~/Projects/phishguard-ui | phishguard-ui.vercel.app | guitargnarr/phishguard-ui |
| interactive-resume | ~/Projects/interactive-resume | interactive-resume-ten-pi.vercel.app | guitargnarr/interactive-resume |
| job-search-automation | ~/Projects/job-search-automation/frontend | jobtrack.projectlavos.com + jobway-eosin.vercel.app | guitargnarr/job-search-automation |
| OurJourney | ~/Projects/Personal/personal-journey | ourjourney-app.vercel.app | guitargnarr/OurJourney |
| ba-pathfinder | ~/Desktop/2_AI_PROJECTS_PORTFOLIO/ba-pathfinder | ba-pathfinder.vercel.app | guitargnarr/ba-pathfinder |

### Tier 2 - Active Development (8 Projects)
| Project | Local Path | GitHub | Notes |
|---------|------------|--------|-------|
| texume | ~/Projects/texume | guitargnarr/texume | Resume LaTeX (9 scripts) |
| reflexia | ~/Projects/reflexia-model-manager | guitargnarr/reflexia | Ollama manager CLI |
| mirador-test | ~/Projects/Security-Tools/mirador-test | guitargnarr/mirador | AI orchestrator (65+ models) |
| fretforge-v1 | ~/Projects/fretforge-v1 | LOCAL-ONLY | Guitar platform (116 assets) |
| jaspermatters | ~/Projects/Career-Business/jaspermatters-job-intelligence | guitargnarr/jaspermatters-job-intelligence | Job intelligence |

### Tier 3 - Manus Projects (Deploy Candidates)
| Project | Local Path | Description |
|---------|------------|-------------|
| fret-vision | ~/Desktop/Manus/fret-vision | Fretboard visualizer |
| prompt-fact | ~/Desktop/Manus/prompt-fact | Streamlit prompt gen |
| mirador-variant | ~/Desktop/Manus/mirador-one-of-many | 65+ model variant |

### Subdomains (14 on projectlavos.com) - ALL VERIFIED HTTP 200
| Subdomain | Local Path | Description |
|-----------|------------|-------------|
| projectlavos.com | ~/Projects/projectlavos-monorepo/main-site | Portfolio hub |
| guitar. | ~/Projects/projectlavos-monorepo/services/guitar | Guitar platform |
| jobs. | ~/Projects/ai-talent-optimizer | AI job discovery |
| demos. | ~/Projects/projectlavos-monorepo/demos | AI demos |
| about. | ~/Projects/projectlavos-monorepo/about | About page |
| mirador. | ~/Projects/projectlavos-monorepo/services/mirador | Mirador AI |
| ourjourney. | ~/Projects/Personal/personal-journey | Coparenting app |
| jobtrack. | ~/Projects/job-search-automation/frontend | Jobway - Job search automation |
| phishguard. | ~/Projects/phishguard-ui | PhishGuard |
| ba-pathfinder. | ~/Desktop/2_AI_PROJECTS_PORTFOLIO/ba-pathfinder | BA career guide |
| resume. | ~/Projects/interactive-resume | Interactive resume |
| prompts. | ~/Desktop/Manus/prompt-fact | Prompt factory |
| orchestrator. | ~/Projects/projectlavos-monorepo/services/orchestrator | AI workflow builder |
| crm. | ~/Projects/projectlavos-monorepo/main-site (CRM dashboard) | CRM Dashboard |

### Backend Services (12 on Render, 8 Active)
| Service | URL | Key Endpoints |
|---------|-----|---------------|
| guitar-model-lab | guitar-model-lab.onrender.com | /generate-gp5, /scales, /patterns |
| projectlavos-backend | projectlavos-backend.onrender.com | /api/sentiment, /api/leads |
| ai-talent-optimizer | ai-talent-optimizer.onrender.com | /stats, /jobs |
| mirador-xva2 | mirador-xva2.onrender.com | /api/personas, /api/chains |
| ourjourney-api | ourjourney-api.onrender.com | /api/health, /api/ideas |
| client-cms-api | client-cms-api.onrender.com | /health, /api/sites, /api/auth/login |
| job-search-automation | job-search-automation-18u9.onrender.com | /api/v1/jobs, /api/v1/applications, /api/v1/ats |
| outreach-api | outreach-api-miha.onrender.com | /health, /businesses, /metrics, /auth/login |
| texume-api | texume-api.onrender.com | API |
| systems-architect-console | systems-architect-console.onrender.com | Console |
| jaspermatters-api | jaspermatters-api.onrender.com | API (Suspended) |
| jobtracker-backend | jobtracker-backend.onrender.com | API (Suspended) |

**Note:** Free tier spins down after 15min (~30sec cold start)

### Client Demo Sites (69 deployed)
**Location:** ~/Projects/client-sites/ + ~/Projects/jobtrack/client-sites/
**Full inventory:** ~/Projects/client-sites/CLIENT_SITES_INVENTORY.md

| Category | Count | Examples |
|----------|-------|----------|
| Healthcare/Medical | 14 | affinity-dental, kuhn-allergy, springhurst-endo |
| Personal Services | 10 | fritz-salon, louisville-aesthetics, pilates-plus |
| Food & Beverage | 7 | nachbar, north-lime-coffee, shawarma-shack |
| Retail | 8 | genesis-diamonds, playthings-toy-shoppe, tasteful-travels |
| Entertainment | 4 | headliners-louisville, hideaway-saloon (LARGEST - 5569 lines) |
| Real Estate | 3 | halsey-flats, mallard-crossing, springs-stony-brook |
| Professional Services | 5 | ky-family-lawyer, schwartz-bankruptcy, dgv-services, morgan-pottinger-mcgarvey, pillar-financial-advisors |
| Conceptual/Demo | 6 | auriga, forma, psyche-hub, threshold |

### Tier Templates (5 UI/UX References)
| Tier | URL | Use Case |
|------|-----|----------|
| 1 | tier1-essential.vercel.app | Single-page landing |
| 2 | tier2-professional.vercel.app | Multi-page + booking |
| 3 | tier3-advanced.vercel.app | E-commerce + cart |
| 4 | tier4-enterprise.vercel.app | Auth + dashboard |
| - | tier-comparison.vercel.app | Side-by-side comparison |
| - | entropy-viz.vercel.app | WebGPU/WebGL2 Entropy Particle Viz (reusable) |

**Reference:** @~/.claude/reference/tier-templates-reference.md

### Orphaned (Deleted Dec 18, 2025)
~~mirador-consciousness-platform, matthewscott, projectlavos-frontend, jobtracker-frontend, ourjourney-flow~~ (removed from Vercel)

### Key Slash Commands
| Command | Model | Use |
|---------|-------|-----|
| /coach | matthew-career-coach | Career Q&A |
| /louisville | louisville-job-market | Market intel |
| /tactic | barrier-breaker | Hiring tactics |
| /code | code-executor | Python gen |
| /commit | - | AI commit msg |

---

## TEMPLATE (Copy below this line)

**CRITICAL:** First line of prompt MUST be `cd ~/Projects/[path]` or `cd ~/Desktop/[path]` - absolute path required.

```markdown
cd ~/Projects/[PROJECT_FOLDER]

## Task: [FEATURE NAME]

**Project**: [NAME from inventory above]
**Path**: ~/Projects/[PROJECT_FOLDER] (already navigated above)
**Deployment**: [URL from inventory]

**Context**: [1-2 sentences about current state]

**Goal**: [What needs to be built]

**Requirements**:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

---

## Phase 0: Pre-Execution (MANDATORY)

```bash
# 1. Confirm location (should already be in project from cd above)
pwd

# 2. Load context
Read ~/.claude/reference/workflows.md

# 3. Check git state
git status                    # Flag if ahead of origin
git log --oneline -5
gh pr list                    # Report any open PRs

# 4. For deployment work - verify correct codebase:
# Test live URL before assuming local is correct
# Check: Does local match what's deployed?
```

**Document findings before proceeding.**

**If "ultrathink" requested:** Create ULTRATHINK_[TASK].md file first

---

## Constraints (ENFORCE)

| Constraint | Rule | If Violated |
|------------|------|-------------|
| Direct to main | Forbidden | Use feature branch |
| Emojis | None unless requested | Remove |
| README length | <200 lines | Move details to /docs |
| Unpushed commits | Flag | Note in findings |
| Existing PRs | Report | List before starting |
| Wrong codebase | STOP | Run deployment discovery |

---

## Git Workflow (STRICT)

1. `git checkout -b feature/[name]`
2. Implement changes
3. `git add . && git commit -m "feat: [description]"`
4. Push and create PR:
   ```bash
   git push -u origin feature/[name]
   gh pr create --title "feat: [title]" --body "## Summary
   - [bullets]

   ## Test Plan
   - [ ] Build passes
   - [ ] Tests pass"
   ```
5. Verify: `gh pr list` must show your PR

---

## Autonomous Execution

- Do NOT wait for user verification
- Do NOT ask questions mid-execution - FIX IT YOURSELF
- Only ask if: security concern OR user preference affects final outcome
- Make reasonable decisions, document in PR
- 70-100% completion is success
- Partial delivery with docs > waiting for perfection

**Time allocation (30-45 min):**
- 0-5 min: Discovery, planning
- 5-25 min: Implementation
- 25-35 min: Testing, validation
- 35-40 min: Commit, PR creation
- 40-45 min: **SHOW VISUAL PROOF** (URL, command, screenshot)

---

## Output Format

End with this summary:

## Execution Summary

**Project:** [name]
**Path:** [local path]
**PR:** [URL or "not created - reason"]

**VISUAL PROOF (REQUIRED):**
- **URL to access:** [exact URL user can open]
- **Command to run:** [exact command if CLI]
- **How to verify:** [steps to see it working]
- **Repeatable:** Yes/No (same command = same result?)

**Delivered:**
- [bullets]

**Constraints Verified:**
| Constraint | Status |
|------------|--------|
| Feature branch | Y/N |
| No emojis | Y/N |
| PR created | Y/N |
| Correct codebase | Y/N |
| Visual proof shown | Y/N |

**Findings (unexpected):**
- [anything discovered not in requirements]

**Open Items:**
- [anything unaddressed, with reason]
```

---

## QUICK PROJECT LOOKUP

### By Local Path → URL
```
~/Projects/projectlavos-monorepo     → projectlavos.com + 13 subdomains
~/Projects/ai-talent-optimizer       → jobs.projectlavos.com + ai-talent-optimizer.onrender.com
~/Projects/guitar-model-lab          → guitar-model-lab.onrender.com
~/Projects/phishguard-ui             → phishguard.projectlavos.com + phishguard-ui.vercel.app
~/Projects/interactive-resume        → resume.projectlavos.com + interactive-resume-ten-pi.vercel.app
~/Projects/job-search-automation/frontend → jobtrack.projectlavos.com + jobway-eosin.vercel.app
~/Projects/Personal/personal-journey → ourjourney.projectlavos.com + ourjourney-api.onrender.com
~/Projects/Security-Tools/mirador-test → mirador.projectlavos.com + mirador-xva2.onrender.com
~/Projects/client-sites/client-cms/api → client-cms-api.onrender.com
~/Projects/outreach-api              → outreach-api-miha.onrender.com
~/Projects/texume                    → GitHub only (guitargnarr/texume)
~/Projects/reflexia-model-manager    → GitHub only (guitargnarr/reflexia)
~/Projects/fretforge-v1              → LOCAL-ONLY (116 assets)
~/Desktop/2_AI_PROJECTS_PORTFOLIO/ba-pathfinder → ba-pathfinder.projectlavos.com
~/Desktop/Manus/fret-vision          → fret-vision.vercel.app
~/Desktop/Manus/prompt-fact          → prompts.projectlavos.com
```

### By URL → Local Path
```
projectlavos.com                     → ~/Projects/projectlavos-monorepo/main-site
guitar.projectlavos.com              → ~/Projects/projectlavos-monorepo/services/guitar
jobs.projectlavos.com                → ~/Projects/ai-talent-optimizer
demos.projectlavos.com               → ~/Projects/projectlavos-monorepo/demos
about.projectlavos.com               → ~/Projects/projectlavos-monorepo/about
mirador.projectlavos.com             → ~/Projects/projectlavos-monorepo/services/mirador
ourjourney.projectlavos.com          → ~/Projects/Personal/personal-journey
jobtrack.projectlavos.com            → ~/Projects/job-search-automation/frontend
phishguard.projectlavos.com          → ~/Projects/phishguard-ui
ba-pathfinder.projectlavos.com       → ~/Desktop/2_AI_PROJECTS_PORTFOLIO/ba-pathfinder
resume.projectlavos.com              → ~/Projects/interactive-resume
prompts.projectlavos.com             → ~/Desktop/Manus/prompt-fact
orchestrator.projectlavos.com        → ~/Projects/projectlavos-monorepo/services/orchestrator
guitar-model-lab.onrender.com        → ~/Projects/guitar-model-lab
mirador-xva2.onrender.com            → ~/Projects/Security-Tools/mirador-test
ourjourney-api.onrender.com          → ~/Projects/Personal/personal-journey
client-cms-api.onrender.com          → ~/Projects/client-sites/client-cms/api
outreach-api-miha.onrender.com       → ~/Projects/outreach-api
jaspermatters.com                    → ~/Projects/Career-Business/jaspermatters-job-intelligence
```

---

## USAGE

### For Single Tasks:
1. Look up project in inventory above
2. Copy template section
3. Fill in: Project, Path, Deployment, Context, Goal, Requirements
4. Paste into Claude Code terminal
5. Let it run autonomously

### For Parallel Development:
1. Create worktrees: `/worktree create feature/[name] main`
2. Open 2-4 terminals
3. Paste customized template into each (with correct cd path)
4. Monitor every 15-20 min
5. Collect PRs when done

---

## Task-Specific Additions

**For README/docs tasks:**
- Add: "Keep under 200 lines, no emojis"

**For deployment tasks:**
- Add: "Test live URL first: [URL]"
- Add: "Compare local vs deployed before building"

**For branding tasks:**
- Add: "Use teal (#14b8a6) / orange (#f97316)"
- Add: "Create OG image if missing"

**For refactoring:**
- Add: "Run tests before and after"
- Add: "No behavior changes unless specified"

---

## Quick Reference Links

- Git workflow: @~/.claude/reference/workflows.md
- Deployment discovery: @~/.claude/reference/deployment-discovery-protocol.md
- Ultrathink protocol: @~/.claude/reference/ultrathink-definition.md
- Full parallel playbook: @~/.claude/reference/parallel-development-playbook.md
- Full deployment inventory: @~/.claude/reference/deployment-inventory.md

---

## Changelog

- v3.5 (Feb 15, 2026): **Audit reconciliation** - Synced with Vercel CLI (110 projects), Render CLI (12 services), removed ln-credit-union (404), updated client sites 69 deployed, added crm subdomain, added 4 missing Render services
- v3.4 (Feb 2, 2026): **Outreach CRM** - Added outreach-api (Render), updated totals (96 URLs, 87 projects, 8 Render APIs)
- v3.3 (Feb 1, 2026): **Jobway update** - jobtrack subdomain now points to job-search-automation (Jobway), added Render backend, updated all lookup tables
- v3.2 (Jan 17, 2026): **Inventory sync** - Updated totals (96 URLs, 86 projects), added 8 missing subdomains, 3 missing Render APIs, 51 client demo sites, tier templates section, expanded Quick Lookup tables
- v3.1 (Dec 18, 2025): Full audit complete - 13 frontend + 3 backend APIs pass, deleted 6 Vercel orphans, fixed jaspermatters broken links
- v3.0 (Dec 16, 2025): Updated with 222+ asset inventory, added ai-talent-optimizer, jobs.projectlavos.com, 3 Render APIs
- v2.0 (Dec 2025): Added full project inventory with paths + URLs
- v1.0 (Dec 2025): Initial unified template
