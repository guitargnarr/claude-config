# Command & Skill Manifest

**Total:** 27 slash commands + 8 skills + 7 agents = 42 invocable tools
**Location:** `~/.claude/commands/` (slash) + `~/.claude/skills/` (auto-trigger)
**Updated:** 2026-02-08

---

## Slash Commands (27)

### Git & Deployment (7)

| Command | Args | Description |
|---------|------|-------------|
| `/commit` | -- | AI-generated commit message from staged changes |
| `/push-pr` | `[base-branch]` | Push branch + create PR with AI description |
| `/review-pr` | `<pr-number>` | First-pass AI code review on pull request |
| `/git` | `[commit\|push\|pr\|review] [options]` | Comprehensive git workflow with Ultrathink analysis |
| `/worktree` | `<create\|list\|remove\|cleanup> [branch] [base]` | Manage git worktrees for parallel development |
| `/cleanup-worktrees` | -- | Clean up merged worktrees and branches |
| `/discover` | -- | Run deployment discovery (Playwright + Vercel/Railway/Netlify) |

### Career & Job Search (4)

| Command | Args | Description | Ollama Model |
|---------|------|-------------|--------------|
| `/coach` | `[question]` | Career coaching and interview prep | matthew-career-coach |
| `/louisville` | `[question]` | Louisville KY job market intelligence | louisville-job-market |
| `/tactic` | `[question]` | Hiring tactics and barrier-breaking strategies | barrier-breaker |
| `/quick` | `[question]` | Quick brief answer | quick-advisor-phi |

### Audit (4)

| Command | Args | Description |
|---------|------|-------------|
| `/audit-repo` | `[repo-name]` | Full rigorous repository audit |
| `/audit-status` | -- | Show audit progress and recommend next action |
| `/audit-sync` | `[operation] [repo-name] [args...]` | Update coordination file (atomic locking) |
| `/audit-handoff` | -- | Sync with other Claude instance, pick next repo |

### Creative & Art (6)

| Command | Args | Description | Deps |
|---------|------|-------------|------|
| `/art` | `[type] --seed [n] --color [scheme]` | Algorithmic art (flow fields, geometric, trees) | algorithmic_art module |
| `/canvas-design` | `[art type and params]` | Advanced art (Voronoi, neural, terrain, data viz) | canvas_design_advanced.py, Pillow, Cairo |
| `/theme` | `[action] [name] --format [css\|json]` | Apply/export consistent themes | theme_factory module |
| `/slack-gif` | `[type] "text" --animation [type]` | Animated GIFs for Slack | imageio |
| `/generative-artist` | `[question]` | Query generative-artist model | generative-artist (Ollama) |
| `/riff` | `[scale] --random --play --bars N` | Generate guitar riff with auto-correction | generate_riff.py |

### Dev Tools (4)

| Command | Args | Description | Deps |
|---------|------|-------------|------|
| `/code` | `[what to generate]` | Generate Python code | code-executor (Ollama) |
| `/analyze` | `[what to analyze]` | Analyze data, return JSON | data-analyzer-qwen (Ollama) |
| `/test-models` | -- | Run Ollama model test suite | model_test_harness.py |
| `/tmux` | `[action] [args]` | Launch/manage tmux sessions for parallel work | tmux |

### Utility (2)

| Command | Args | Description | Deps |
|---------|------|-------------|------|
| `/humanize` | `[text]` | Convert AI text to natural human language | humanizer (Ollama) |
| `/consult` | `<question>` | Multi-model domain expert consultation | 19 Ollama models |

---

## Skills (8) -- Auto-Trigger

Skills activate automatically when trigger phrases are detected. Full docs in each `SKILL.md`.

### client-demo-generator
- **Purpose:** Scaffold branded Vite + React + Tailwind demo websites from business info
- **Triggers:** "Create a demo site for...", "Scaffold a tier [1-4] site", "Build a website for..."
- **Inputs:** Business name, tagline, phone, email, address, hours, services, colors
- **Outputs:** Complete project in `~/Projects/client-sites/[slug]/`, deployed to Vercel
- **Dependencies:** Tier templates (`~/Projects/client-sites/templates/tier[1-4]*/`), Vercel CLI
- **Workflow:** Gather info -> select tier -> copy template -> customize -> build -> deploy -> screenshot
- **Docs:** `~/.claude/skills/client-demo-generator/SKILL.md`

### tier4-luxury-generator
- **Purpose:** Generate ultra-luxury demo sites with AI Oracle concierge and auth system
- **Triggers:** "Tier 4 site", "ultra-luxury demo", "UHNW client site", "premium site with Oracle"
- **Inputs:** Business name, industry (jewelry/spa/dining/real estate), products/services
- **Outputs:** Full Vite + React + TS project with Oracle AI, auth, toasts, OG image
- **Dependencies:** Tier 4 template, Vercel CLI. Reference: genesis-diamonds
- **Workflow:** 9 phases (business intel -> scaffold -> theme -> architecture -> Oracle -> catalog -> deploy -> OG image -> portfolio)
- **Docs:** `~/.claude/skills/tier4-luxury-generator/SKILL.md`, `content.md`

### frontend-design
- **Purpose:** Create distinctive, production-grade frontend interfaces avoiding generic AI aesthetics
- **Triggers:** "build a web component/page/dashboard", "style this UI", "make this beautiful"
- **Inputs:** Frontend requirements, purpose, audience, technical constraints
- **Outputs:** Production-grade HTML/CSS/JS or React code with bold aesthetic direction
- **Dependencies:** None (pure code generation). References Elite Frontend Playbook
- **Docs:** `~/.claude/skills/frontend-design/SKILL.md`, `ELITE_FRONTEND_PLAYBOOK.md`

### cover-letter-generator
- **Purpose:** Generate personalized cover letters matching Matthew's background to job requirements
- **Triggers:** "cover letter", after resume customization, "what should I write in my cover letter?"
- **Inputs:** Company name, position, job requirements, hiring manager name (optional)
- **Outputs:** Cover letter file at `~/Desktop/Resumes_Master_2025/resumes/custom/COVER_LETTER_*.txt`
- **Dependencies:** matthew-career-coach (Ollama), louisville-job-market (Ollama)
- **Workflow:** Gather info -> research company -> match achievements -> structure letter -> save
- **Chain:** Often follows resume-customizer, triggers job-application-tracker
- **Docs:** `~/.claude/skills/cover-letter-generator/SKILL.md`

### resume-customizer
- **Purpose:** Customize resume variants (A/B/C) for specific job postings
- **Triggers:** Mentions job posting, "customize resume", "applying for [position]", shares job URL
- **Inputs:** Job description/URL, company name, position title
- **Outputs:** Custom resume at `~/Desktop/Resumes_Master_2025/resumes/custom/CUSTOM_*.txt`, match score
- **Dependencies:** matthew-career-coach (Ollama), louisville-job-market (Ollama), resume variants in `~/Desktop/Resumes_Master_2025/resumes/active/`
- **Workflow:** Extract job info -> select variant (A=QA/BA, B=QA+Python, C=AI Safety) -> query models -> customize -> save -> offer next steps
- **Chain:** Triggers cover-letter-generator, interview-prep-auto, job-application-tracker
- **Docs:** `~/.claude/skills/resume-customizer/SKILL.md`

### interview-prep-auto
- **Purpose:** Generate comprehensive interview preparation materials with STAR stories
- **Triggers:** "I have an interview", "Interview scheduled with...", "How should I prepare?"
- **Inputs:** Company, position, interview date/type/format, interviewer names (optional)
- **Outputs:** Prep doc at `~/Desktop/Resumes_Master_2025/job_search/interview_prep/INTERVIEW_PREP_*.md`
- **Dependencies:** matthew-career-coach (Ollama), louisville-job-market (Ollama), barrier-breaker (Ollama)
- **Workflow:** Gather details -> analyze match -> research company -> get tactics -> prepare Q&A -> create STAR stories -> generate doc
- **Features:** Mock interview practice, salary negotiation prep, thank-you email drafting
- **Docs:** `~/.claude/skills/interview-prep-auto/SKILL.md`

### job-application-tracker
- **Purpose:** Track job applications in CSV, provide analytics and follow-up reminders
- **Triggers:** "I applied to...", "Got an interview at...", "what jobs have I applied to?"
- **Inputs:** Company, position, date, resume variant, status updates
- **Outputs:** Updated `~/Desktop/Resumes_Master_2025/job_search/tracking/JOB_TRACKER_2025.csv`, stats summary
- **Dependencies:** None (CSV-based, no Ollama)
- **Workflow:** Detect trigger -> extract info -> check duplicates -> update CSV -> show stats -> recommend follow-ups
- **Statuses:** submitted, phone_screen, interview_scheduled, interview_completed, offer, rejected, withdrawn, no_response
- **Docs:** `~/.claude/skills/job-application-tracker/SKILL.md`

### prospect
- **Purpose:** Analyze potential web development client leads and score fit
- **Triggers:** Business description or prospect details provided
- **Inputs:** Business description (e.g., "Louisville coffee shop, no website")
- **Outputs:** Prospect score (1-10), tier recommendation (Essential $500-1K to Enterprise $5-10K+)
- **Dependencies:** client-prospector (Ollama, base: llama3.2)
- **Docs:** `~/.claude/skills/prospect.md`

---

## Agents (7) -- Subagent Specialists

Agents are launched via the `Task` tool with `subagent_type` parameter. They run as autonomous subprocesses with specific tool access and return results to the calling context.

### Orchestration Overview

```
audit-orchestrator (meta-agent)
  |
  +--> repo-scanner          (Phase 1: inventory + metrics)
  +--> documentation-reader   (Phase 2: doc verification)
  +--> code-analyzer          (Phase 3: code quality + LOC)
  +--> security-auditor       (Phase 4: credentials + risks)
  |
  +--> Consolidated Report    (7-section audit output)

interview-prep (standalone, chains 3 Ollama models)
code-automation (standalone, uses code-executor Ollama model)
```

### audit-orchestrator
- **Role:** Meta-agent that coordinates full repository audits by delegating to 4 specialist agents in sequence
- **Model:** sonnet
- **Tools:** Task, Read, Glob, Bash, Grep
- **Inputs:** Repository name or path, optional flags (`--quick`, `--security`, `--full`, `--skip-deploy`)
- **Outputs:** Consolidated audit report with 7 sections: Deployment Status, Repository Metrics, Documentation Audit, Code Analysis, Security Scan, Overall Assessment, Recommendations
- **Orchestration:** Spawns agents sequentially: repo-scanner -> documentation-reader -> code-analyzer -> security-auditor. Each agent returns findings that feed the consolidated report.
- **Modes:** `--quick` (metrics + security only), `--security` (security-auditor only), `--full` (all 4 agents + deploy verification), `--skip-deploy` (skip live URL checks)
- **Docs:** `~/.claude/agents/audit-orchestrator.md`

### repo-scanner
- **Role:** Fast repository inventory -- file counting by type, size measurement, git analysis, metrics validation
- **Model:** sonnet
- **Tools:** Read, Glob, Bash, Grep
- **Inputs:** Repository path
- **Outputs:** File counts by extension, repo size (du), git stats (total commits, branches, remotes, last commit date), documentation file list, archive/disabled file detection (.DISABLED, .bak, .old)
- **Handoff:** Returns structured metrics to audit-orchestrator for Phase 1
- **Docs:** `~/.claude/agents/repo-scanner.md`

### documentation-reader
- **Role:** Thorough documentation analysis -- reads all docs, verifies claims against reality, extracts metadata
- **Model:** sonnet
- **Tools:** Read, Glob, Grep
- **Inputs:** Repository path, repo-scanner findings (for context)
- **Outputs:** README accuracy assessment, feature claims vs actual implementation, metadata extraction (version, license, author, URLs), documentation gaps, discrepancies between docs and code
- **Handoff:** Returns doc analysis to audit-orchestrator for Phase 2
- **Docs:** `~/.claude/agents/documentation-reader.md`

### code-analyzer
- **Role:** Deep code analysis -- reads all source files, counts LOC accurately, maps functionality, assesses quality
- **Model:** sonnet
- **Tools:** Read, Grep, Bash
- **Inputs:** Repository path, documentation-reader findings (for claim verification)
- **Outputs:** Accurate LOC by language, dependency analysis (package.json/requirements.txt/Cargo.toml), functionality map (what each module does), code quality assessment, technical debt indicators, **automation detection** (Gmail API, SMTP, Selenium, bulk operations -- flagged as risk)
- **Handoff:** Returns code analysis to audit-orchestrator for Phase 3
- **Critical:** Detects automation patterns that could cause professional harm (mass emails, web scraping, credential harvesting)
- **Docs:** `~/.claude/agents/code-analyzer.md`

### security-auditor
- **Role:** Deep security scan -- sensitive data, credentials, automation risks, privacy concerns
- **Model:** sonnet
- **Tools:** Read, Grep, Bash
- **Inputs:** Repository path, code-analyzer findings (for targeted scanning)
- **Outputs:** Hardcoded credentials (API keys, OAuth tokens, passwords), .env files with secrets, git history secrets (`git log -p` search), automation risk assessment, previous GitHub account references, data privacy concerns
- **Risk Levels:** CRITICAL (exposed prod credentials), HIGH (automation without safeguards), MEDIUM (dev credentials in code), LOW (minor config exposure), NONE (clean)
- **Handoff:** Returns security findings to audit-orchestrator for Phase 4
- **Docs:** `~/.claude/agents/security-auditor.md`

### Interview Prep Specialist
- **Role:** Comprehensive interview preparation using chained Ollama models
- **Model:** default (inherits from parent)
- **Tools:** All tools (uses Bash for Ollama queries)
- **Inputs:** Company name, position, interview type/format
- **Outputs:** Structured interview prep combining career coaching, local market intel, and hiring tactics
- **Ollama Chain:** matthew-career-coach (background + STAR stories) -> louisville-job-market (local salary/company intel) -> barrier-breaker (age bias tactics, negotiation strategies)
- **Standalone:** Not part of audit orchestration. Triggered independently.
- **Docs:** `~/.claude/agents/interview-prep.md`

### Code Automation Specialist
- **Role:** Generate and execute Python code using Ollama code-executor model
- **Model:** default (inherits from parent)
- **Tools:** All tools (Bash for Ollama, Write for scripts, Read for results)
- **Inputs:** Natural language description of automation task
- **Outputs:** Generated Python script, execution results, captured output
- **Workflow:** Generate code via Ollama -> extract code block -> write to temp file -> user approval -> execute -> capture results
- **Ollama Model:** code-executor
- **Standalone:** Not part of audit orchestration. Triggered independently.
- **Docs:** `~/.claude/agents/code-automation.md`

### Agent Invocation Quick Reference

| Agent | subagent_type | When to Use |
|-------|---------------|-------------|
| audit-orchestrator | `audit-orchestrator` | "Full audit of [repo]", `/audit-repo` |
| repo-scanner | `repo-scanner` | "How big is this repo?", quick metrics |
| documentation-reader | `documentation-reader` | "Does README match reality?" |
| code-analyzer | `code-analyzer` | "What does this code do?", LOC counts |
| security-auditor | `security-auditor` | "Check for security issues", credential scan |
| Interview Prep | `Interview Prep Specialist` | "Prepare for interview at [company]" |
| Code Automation | `Code Automation Specialist` | "Automate [task] with Python" |

---

## Ollama Model Dependencies (14 unique models)

| Model | Used By |
|-------|---------|
| matthew-career-coach | /coach, cover-letter-generator, interview-prep-auto, resume-customizer |
| louisville-job-market | /louisville, cover-letter-generator, interview-prep-auto, resume-customizer |
| barrier-breaker | /tactic, interview-prep-auto |
| code-executor | /code |
| data-analyzer-qwen | /analyze |
| quick-advisor-phi | /quick |
| humanizer | /humanize |
| generative-artist | /generative-artist |
| client-prospector | prospect skill |
| unified-systems-architect | /consult |
| app-architecture-expert | /consult |
| prompt-engineering-expert | /consult |
| business-tax-2026 | /consult |
| *(+15 more)* | /consult (19 models total) |

---

## External Dependencies

| Dependency | Commands |
|------------|----------|
| Ollama (local) | /coach, /louisville, /tactic, /code, /analyze, /quick, /humanize, /generative-artist, /consult, /test-models, /riff, + 4 skills |
| gh CLI | /commit, /push-pr, /review-pr, /git |
| tmux | /tmux |
| Playwright | /discover |
| Vercel/Railway/Netlify CLIs | /discover |
| Python (Pillow, Cairo) | /art, /canvas-design |
| imageio | /slack-gif |

---

## Quick Reference by Use Case

**Applying for a job:** `/coach` -> resume-customizer skill -> cover-letter-generator skill -> job-application-tracker skill
**Interview prep:** interview-prep-auto skill (auto-triggers on "I have an interview")
**Building client site:** client-demo-generator skill or tier4-luxury-generator skill
**Git workflow:** `/commit` -> `/push-pr` or `/git pr`
**Parallel development:** `/worktree create` -> `/tmux` -> `/cleanup-worktrees`
**Repository audit:** `/audit-repo [name]` -> `/audit-status` -> `/audit-sync`
**Creative work:** `/art`, `/canvas-design`, `/riff`, `/slack-gif`
**Quick answers:** `/quick`, `/consult`, `/humanize`
