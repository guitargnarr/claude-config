# Workflow Patterns (Evidence-Based)

**Based on 3,327 command history analysis**
**Last updated: November 14, 2025**

---

## What Works (Replicate These)

### ✅ Direct Implementation Pattern
**Example:** Pthread worker pool implementation
- **Time:** 24 minutes
- **Result:** 362 lines working C++ code, 6/8 → 7/8 tests passing
- **Pattern:** Clear goal → Direct implementation → Test → Success
- **Commands:** Simple, focused, actionable

**Characteristics:**
- Single clear objective
- No "ultrathink" prefix
- Immediate execution
- Test verification
- Concrete deliverable

### ✅ Deployment Workflow
**Example:** Vercel production deploys
- **Time:** 8-13 seconds per deploy
- **Pattern:** `vercel --prod --yes`
- **Success rate:** High (frequent usage, no errors observed)

**Commands:**
```bash
npm run build && npm run preview  # Test first
vercel --prod --yes                # Deploy
git add public/                    # Always add assets
```

### ✅ Context Management
**Pattern:** Proactive clearing between tasks
- `/clear` used 216 times (6.5% of all commands)
- `/context` monitored 111 times
- `/cost` tracked 42 times
- Result: Lean conversations, cost awareness

**When to clear:**
- After completing a major task
- Before switching to unrelated work
- When context approaches 80%
- Between different projects

### ✅ Model Switching
**Pattern:** Right model for the task
- `/model` used 219 times (6.6% of commands)
- Sonnet for most work (cost-effective)
- Haiku for quick tasks (fast, cheap)
- Opus for complex reasoning (when needed)
- Ollama for routine local tasks (free)

---

## What Doesn't Work (Avoid These)

### ❌ Analysis Paralysis Pattern
**Example:** Sentinel Platform session (recent)
- **Time:** 90 minutes
- **Result:** 10,985 lines of documentation, 0 code progress
- **Pattern:** Ultrathink request → Analysis → More ultrathink → Spiral
- **Output:** 28 markdown files, 80% redundant

**Characteristics:**
- Multiple "ultrathink" requests per session
- Generates planning documents
- Creates decision trees
- No concrete implementation
- Context exhaustion

**Trigger words:**
- "Ultrathink and determine..."
- "Research more and unify..."
- "Analyze opportunities for..."
- "Create strategic plan for..."

### ❌ Documentation-First Approach
**Anti-pattern:** Write extensive docs before coding
- Result: Docs describe hypothetical systems
- Reality: Code often differs from plan
- Waste: Docs need rewrite after implementation

**Better:** Code → Test → Document what exists

### ❌ Lock File Conflicts
**Pattern:** Concurrent coordination file access
- Symptoms: "Lock file is already being held" errors
- Cause: Multiple sessions accessing `COORDINATION_STATUS.json`
- Result: Session blocked, cannot execute Bash commands

**Avoidance:**
- Use audit commands sparingly
- Don't run parallel audit sessions
- Clear locks manually if stuck

---

## High-Value Activities (by time investment)

### Job Search Work (34.5% of all commands)
**Directories:**
- `Desktop/Job_Search`: 603 commands (18.1%)
- `Desktop/1_PRIORITY_JOB_SEARCH`: 185 commands (5.6%)
- `career`: 255 commands (7.7%)
- `Desktop/Resumes_Master_2025`: 89 commands (2.7%)

**Pattern:** Heavy automation focus
- Resume generation workflows
- Gmail integration
- Application tracking (10+ CSV files)
- Interview preparation

**Implication:** Job search is the primary use case, not side project

### Development Work (20% of commands)
**Tools most used:**
- `git` (17 observed commands in recent history)
- `npm` (install, build, preview, test, lint)
- `python3` (4 commands)
- `vercel` (frequent deployments)
- `gh` (GitHub CLI)

**Projects:** 40+ in ~/Projects, but only 2-3 actively developed

---

## Communication Patterns

### Long-Form Prompts Dominant
- **18,941 prompts over 200 characters (56.9% of total)**
- Detailed, context-rich requests
- Preference for comprehensive responses
- Cost: Higher token usage

### Frequent Session Management
- `/exit` used 69 times
- `/clear` used 216 times
- Pattern: Many short-to-medium sessions
- Typical flow: Start → Work → Clear → Work → Exit

### Cost Awareness High
- `/cost` checked 42 times
- `/context` monitored 111 times
- Model switching for optimization (219 times)
- Pattern: Conscious of API spending

---

## Project Ecosystem Reality

### Active Projects (3-5)
- projectlavos-backend (Sentinel Platform)
- tool-gmail-integration (Job automation)
- job-hunter-pro (Application tracking)
- mirador (AI orchestration platform)
- weekly-reviews (Metrics automation)

### Dormant Projects (35+)
- In ~/Projects but rarely accessed
- No recent modifications
- Consider archiving

### Missing Project Configs
- Only 2 projects have `.claude/` directories
- Most rely on global settings
- Opportunity: Add project-specific configs for active projects

---

## Custom Automation Investment

### 22 Custom Slash Commands
**Heavy investment in automation:**
- Career: `/coach` `/louisville` `/tactic`
- Development: `/git` `/commit` `/code` `/analyze`
- Audit: `/audit-repo` `/audit-status` `/audit-sync`
- Utilities: `/humanize` `/quick` `/art`

**Pattern:** Build tools for recurring tasks
**Success:** Commands are used regularly
**Opportunity:** More job search automation commands

---

## Behavioral Insights

### Problem-Solving Style
- **Systematic:** Uses ultrathink for initial analysis
- **Iterative:** Frequent `/clear` between tasks
- **Automation-focused:** 22 custom commands
- **Quality-conscious:** Comprehensive testing
- **Cost-aware:** Monitors usage and switches models

### Risk Profile
- **Current config:** Very permissive (`Bash(**)`, `Read(**)`, `Write(**)`)
- **Safety-conscious:** Asks for `rm` operations
- **Trade-off preference:** Speed over safety (for now)
- **Data sensitivity:** Job search CSVs contain sensitive info

### Workflow Preference
- Direct technical answers
- Code examples over theory
- Truth over validation
- Options presented, user decides
- No energy management suggestions

---

## Recommendations Based on Patterns

### 1. Reduce "Ultrathink" Usage by 80%
**Current:** 256+ sessions with ultrathink
**Target:** Use only for initial complex analysis
**Benefit:** Faster execution, less context burn, more actual work

### 2. Implement Code-First Rule
**Current:** Sometimes analysis-first
**Target:** Always code, then document
**Benefit:** Working software faster, accurate documentation

### 3. Add Job Search Slash Commands
**Missing:** `/job-apply`, `/resume-tailor`, `/response-track`
**Benefit:** Automate 34.5% of workload more effectively

### 4. Consolidate Projects
**Current:** 40+ projects
**Target:** Archive inactive, focus on 5-10
**Benefit:** Clearer organization, easier navigation

### 5. Project-Specific Configs
**Current:** 2 projects with `.claude/`
**Target:** All active projects configured
**Benefit:** Better context, faster sessions

### 6. Documentation Hygiene
**Current:** Accumulation without pruning
**Target:** Max 5 files per project, archive old
**Benefit:** Navigable, usable documentation

---

## Success Metrics

### Indicators of Good Session
- ✅ Code committed to git
- ✅ Tests passing
- ✅ Deployment successful
- ✅ Context <70% at completion
- ✅ Single focus maintained
- ✅ <5 markdown files created

### Indicators of Problem Session
- ⚠️ Multiple "ultrathink" requests
- ⚠️ >5 markdown files generated
- ⚠️ Context >90% with no deliverable
- ⚠️ Analysis without implementation
- ⚠️ Lock file errors
- ⚠️ Session duration >2 hours without code

---

**Key Takeaway:** Your most productive sessions are short, focused, direct implementation with immediate testing. Analysis paralysis sessions consume resources without producing working code.

**Action:** Update CLAUDE.md to enforce code-first, limit ultrathink, cap documentation, and protect job search data.
