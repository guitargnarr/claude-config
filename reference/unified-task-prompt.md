# Unified Task Prompt Template

**Version:** 3.1 (Dec 18, 2025)
**Purpose:** Single template for parallel terminal prompts with full project context

---

## PROJECT INVENTORY (Dec 18, 2025 - Full Audit Complete)

**Total: 222+ Assets | 56 Code Projects | 14 Deployed URLs | 51 Ollama Models**
**Audit Status: ALL 13 FRONTEND SITES + 3 BACKEND APIs PASS**
**Vercel: 20 projects (deleted 6 orphans Dec 18)**

### Tier 1 - Core Portfolio (Deployed, Branded)
| Project | Local Path | URL | GitHub |
|---------|------------|-----|--------|
| projectlavos-monorepo | ~/Projects/projectlavos-monorepo | projectlavos.com + subdomains | guitargnarr/projectlavos-monorepo |
| ai-talent-optimizer | ~/Projects/ai-talent-optimizer | jobs.projectlavos.com | guitargnarr/ai-talent-optimizer |
| guitar-model-lab | ~/Projects/guitar-model-lab | guitar-model-lab.onrender.com | guitargnarr/guitar-model-lab |
| phishguard-ui | ~/Projects/phishguard-ui | phishguard-ui.vercel.app | guitargnarr/phishguard-ui |
| interactive-resume | ~/Projects/interactive-resume | interactive-resume-ten-pi.vercel.app | guitargnarr/interactive-resume |
| jobtrack | ~/Projects/jobtrack | jobtrack-two.vercel.app | guitargnarr/jobtrack |
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

### Domains (6 Active)
| Domain | Points To | Purpose |
|--------|-----------|---------|
| projectlavos.com | main-site | Portfolio hub |
| guitar.projectlavos.com | guitar service | Guitar learning |
| jobs.projectlavos.com | ai-talent-optimizer | Job discovery |
| demos.projectlavos.com | demos service | AI demos |
| about.projectlavos.com | about service | About page |

### Backend Services (3 Active on Render)
| Service | URL | Status |
|---------|-----|--------|
| guitar-model-lab | guitar-model-lab.onrender.com | LIVE |
| projectlavos-backend | projectlavos-backend.onrender.com | LIVE |
| ai-talent-optimizer | ai-talent-optimizer.onrender.com | LIVE (v3.1.0) |

### Orphaned (DELETE from Vercel dashboard)
- mirador-consciousness-platform, matthewscott, projectlavos-frontend, jobtracker-frontend, ourjourney-flow

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
~/Projects/projectlavos-monorepo     → projectlavos.com + guitar/demos/about/jobs subdomains
~/Projects/ai-talent-optimizer       → jobs.projectlavos.com
~/Projects/guitar-model-lab          → guitar-model-lab.onrender.com
~/Projects/phishguard-ui             → phishguard-ui.vercel.app
~/Projects/interactive-resume        → interactive-resume-ten-pi.vercel.app
~/Projects/jobtrack                  → jobtrack-two.vercel.app
~/Projects/Personal/personal-journey → ourjourney-app.vercel.app
~/Projects/texume                    → GitHub only (guitargnarr/texume)
~/Projects/reflexia-model-manager    → GitHub only (guitargnarr/reflexia)
~/Projects/Security-Tools/mirador-test → GitHub only (guitargnarr/mirador)
~/Projects/fretforge-v1              → LOCAL-ONLY (116 assets)
~/Desktop/2_AI_PROJECTS_PORTFOLIO/ba-pathfinder → ba-pathfinder.vercel.app
~/Desktop/Manus/fret-vision          → NO-GIT (deploy candidate)
~/Desktop/Manus/prompt-fact          → NO-GIT (deploy candidate)
```

### By URL → Local Path
```
projectlavos.com                     → ~/Projects/projectlavos-monorepo/main-site
guitar.projectlavos.com              → ~/Projects/projectlavos-monorepo/services/guitar
jobs.projectlavos.com                → ~/Projects/ai-talent-optimizer
guitar-model-lab.onrender.com        → ~/Projects/guitar-model-lab
phishguard-ui.vercel.app             → ~/Projects/phishguard-ui
interactive-resume-ten-pi.vercel.app → ~/Projects/interactive-resume
jobtrack-two.vercel.app              → ~/Projects/jobtrack
ourjourney-app.vercel.app            → ~/Projects/Personal/personal-journey
ba-pathfinder.vercel.app             → ~/Desktop/2_AI_PROJECTS_PORTFOLIO/ba-pathfinder
jaspermatters-job-intelligence.vercel.app → ~/Projects/Career-Business/jaspermatters-job-intelligence
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

- v3.1 (Dec 18, 2025): Full audit complete - 13 frontend + 3 backend APIs pass, deleted 6 Vercel orphans, fixed jaspermatters broken links
- v3.0 (Dec 16, 2025): Updated with 222+ asset inventory, added ai-talent-optimizer, jobs.projectlavos.com, 3 Render APIs
- v2.0 (Dec 2025): Added full project inventory with paths + URLs
- v1.0 (Dec 2025): Initial unified template
