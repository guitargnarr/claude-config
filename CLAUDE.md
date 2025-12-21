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

### Ultrathink Protocol
When user says "use ultrathink", you MUST:
1. Create `ULTRATHINK_[TOPIC].md` file in project directory
2. Write structured analysis with phases (50-200+ lines)
3. Include: risk matrices, edge cases, decision trees, alternatives
4. Save file BEFORE executing
5. NOT just "think carefully" - that's normal execution
Reference: @~/.claude/reference/ultrathink-definition.md

### Standard Rules
- **Documentation:** Max 5 files per project, 500 lines each (READMEs prefer <200, ULTRATHINK_*.md exempt)
- **Discovery first, then code:** For deployment work, inventory what exists before building. For new features, implement before documenting.
- **Delete planning docs** after extracting action items (prevent bloat)
- **Work mode:** Consulting and platform building (sustainable income model)
- Never use emojis unless explicitly requested

## System Info
- Python: 3.14 at `/Library/Frameworks/Python.framework/Versions/3.14/bin/python3`
- GitHub: guitargnarr (matthewdscott7@gmail.com)
- Deployment: Vercel, test build locally: `npm run build && npm run preview`
  - **No env vars:** `vercel --prod --yes`
  - **With VITE_ env vars:** `VITE_X=value vercel build --prod && vercel deploy --prebuilt --prod --yes`
  - Vite bakes env vars at BUILD time - `vercel env add` alone does NOTHING for Vite apps

## Critical Pitfalls
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

## Private Data Protection
**CRITICAL - Never read/edit without permission:**
- `**/JOB_TRACKER*.csv`, `**/GMAIL_*.csv`, `**/APPLICATIONS*.csv`
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

**Core Documentation:**
- **Collaboration:** @~/.claude/COLLABORATION_CONTRACT.md (how human + AI work together)
- **Parallel Dev:** @~/.claude/reference/parallel-development-playbook.md (v4, 100% success rate)
- **Deployment Discovery:** @~/.claude/reference/deployment-discovery-protocol.md (prevent wrong codebase)

## Reference Documentation (Load on-demand via @)
- **Task Prompts:** @~/.claude/reference/unified-task-prompt.md (single template + project inventory)
- **Full Inventory:** @~/.claude/reference/deployment-inventory.md (all deployments, backends, domains)
- **Workflows:** @~/.claude/reference/workflows.md (git, brand, deployment)
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

## Guitar Model Lab (Dec 10, 2025)
**Project:** `~/Projects/guitar-model-lab/`
**Goal:** Generate accurate tabs → auto-play in web dashboard

**LIVE STATUS (Dec 11, 2025):**
- **API:** https://guitar-model-lab.onrender.com (FastAPI, free tier - spins down after 15min)
- **Frontend:** https://guitar.projectlavos.com/riff-generator (GP5 button calls API)
- **Flow:** Generate riff → Click GP5 → Downloads .gp5 file → Open in Guitar Pro

**Key Files:**
- `main.py` - FastAPI with `/generate-gp5`, `/generate-tab`, `/scales`, `/patterns`, `/tunings`
- `guitar_theory.py` - Deterministic tab generation (12 scales, 4 tunings, 8 patterns)
- `export_gp.py` - PyGuitarPro GP5 file generation

**Lesson Learned:** Ollama/LLMs generate musically INCORRECT tabs (F# in E Phrygian). Use Python for deterministic note generation, AI only for style interpretation (`ai_style_interpreter.py`).

**Quick Reference:**
- Protocol: `~/Projects/guitar-model-lab/protocol.md`
- Directive: `~/Projects/guitar-model-lab/SESSION_DIRECTIVE.md`
- Cross-session: `~/.claude/reference/cross-session-context-protocol.md`

**Cross-Session Communication:**
1. Check other session: `tail -15 ~/.claude/projects/-Users-matthewscott/b1079d33*.jsonl | jq -r '.toolUseResult.command // .message.content[0:300]'`
2. Issue directives via `SESSION_DIRECTIVE.md`
3. Update `protocol.md` LIVE STATUS on each check
4. **20 min limit** - if no 5 passes, propose solution
5. Don't ask questions unless loop risk detected

**End Goal:** `"give me a random riff"` → generates tab → opens dashboard → plays audio

**Full ecosystem plan:** @~/.claude/plans/splendid-jumping-kahan.md

---
## Complete Asset Inventory (Dec 18, 2025 - Full Audit Complete)
**GRAND TOTAL: 222+ Assets - All Verified**
**Audit Status: ALL 13 FRONTEND SITES + 3 BACKEND APIs PASS**

| Category | Count | Coverage |
|----------|-------|----------|
| Code Projects | 56 | - |
| - With GitHub Repo | 29 | 52% |
| - With Visual Assets | 28 | 50% (654 files) |
| Deployed URLs | 14 | 25% |
| Vercel Projects | 20 | (was 26, deleted 6 orphans) |
| Slash Commands | 25 | - |
| Agents | 7 | - |
| Scripts | 22 | - |
| Reference Docs | 35 | - |
| Ollama Models | 51 (38 custom) | - |
| Active Plans | 12 | - |

**Brand:** Teal (#14b8a6) / Orange (#f97316)
**Platforms:** Vercel (20 projects) | Render (3 APIs) | Railway (1 Postgres)

### Deployed Projects (14 URLs - All HTTP 200)
| Project | URL | Platform |
|---------|-----|----------|
| projectlavos-monorepo | projectlavos.com + subdomains | Vercel |
| ai-talent-optimizer | jobs.projectlavos.com | Vercel + Render |
| guitar-model-lab | guitar-model-lab.onrender.com | Render |
| projectlavos-backend | projectlavos-backend.onrender.com | Render |
| phishguard-ui | phishguard-ui.vercel.app | Vercel |
| interactive-resume | interactive-resume-ten-pi.vercel.app | Vercel |
| jobtrack | jobtrack-two.vercel.app | Vercel |
| OurJourney | ourjourney-app.vercel.app | Vercel |
| jaspermatters | jaspermatters-job-intelligence.vercel.app | Vercel |
| mirador | vercel-demo-flame.vercel.app | Vercel |
| ba-pathfinder | ba-pathfinder.vercel.app | Vercel |
| 2025-skills | 2025-skills-to-know.vercel.app | Vercel |
| apartment-demo | frontend-mu-dusky-38.vercel.app | Vercel |
| phishguard-ml | (API deployable) | - |

### Key Slash Commands
| Command | Ollama Model | Use |
|---------|--------------|-----|
| `/coach` | matthew-career-coach | Career Q&A |
| `/louisville` | louisville-job-market | Local market intel |
| `/tactic` | barrier-breaker | Hiring strategies |
| `/code` | code-executor | Python generation |
| `/analyze` | data-analyzer-qwen | Data analysis |

### Custom Ollama Models (38 of 51)
**Guitar:** guitar_expert_precise, guitar_tone_architect, master_guitar_instructor
**Career:** louisville-job-market, local_market_expert, barrier-breaker
**Financial:** financial_planning_expert_v6, financial_calculator
**Code:** code-executor, elite-frontend, data-analyzer-qwen, quick-advisor-phi
**Mirador:** mirador_self_reflection_guardian, cross_model_synthesizer

### Problems Solved by Theme
1. **Portfolio/Career**: Job search (ai-talent-optimizer), resume gen (texume), market intel (jaspermatters)
2. **Guitar/Music**: Learning (fretforge), GP5 export (guitar-model-lab), fretboard viz (fret-vision)
3. **AI/Automation**: Model orchestration (mirador), meta-cognition (cross_model_synthesizer)
4. **Security**: Phishing detection (phishguard-ml/ui), credential scanning (security-auditor)
5. **Dev Productivity**: Parallel dev (playbook), deployment discovery, git automation
6. **Personal**: Coparenting (OurJourney), financial planning

**Monetization:** guitar.projectlavos.com/pricing (Stripe ready)

**Next Deployments (25%→40%):** fret-vision, prompt-fact, texume, phishguard-ml

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
