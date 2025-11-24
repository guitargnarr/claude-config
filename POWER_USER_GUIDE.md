# Claude Code Power User Guide

**Created**: Nov 23, 2025
**Purpose**: Master all capabilities built during Nov 22-23 sessions
**For**: Confident, rapid execution using tools + methodologies

---

## 🎯 Quick Start (Most Common Workflows)

### Assess a Repo for Deployment
```bash
# In Claude Code:
> python3 ~/ai_framework_git/inventory_oracle.py readiness REPO_NAME

# Output: Score (0-100), grade (A-F), platform recommendation, deploy time
# If score >= 80 and valuable: Deploy it
# If score < 80: Check what's missing or archive
```

### Generate UI Component
```bash
# In Claude Code:
> ollama run elite-frontend "Create responsive navbar with mobile menu"

# Output: TypeScript + Next.js 14 + Shadcn code
# Then: Fix imports (Icon → specific icons like Menu, X)
#       Review for API payloads/field names
#       Test in project (2 min QA)
```

### Deploy to Railway
```bash
> cd ~/Projects/my-project
> Follow template: @~/.claude/templates/deploy-railway.md
# Creates railway.json, fixes PORT env var, deploys
```

### Deploy to Vercel
```bash
> cd ~/Projects/my-project
> vercel --prod --yes
# Then: Disable auth in dashboard (Deployment Protection settings)
```

---

## 📖 The @ Command (Context Imports)

### How It Works

**Type `@` in your message** → Claude loads that file's content into context

**Example**:
```
You: "What's our strategy? @~/.claude/context/strategy.md"
Claude: [Reads strategy.md, answers based on it]
```

**When to use @**:
- Need strategic context: `@~/.claude/context/strategy.md`
- Need values/philosophy: `@~/.claude/context/philosophy.md`
- Need session state: `@~/ai_framework_git/SESSION_HANDOFF.md`
- Need portfolio overview: `@~/ai_framework_git/PORTFOLIO_VALUE_MAP.md`
- Need deployment template: `@~/.claude/templates/deploy-railway.md`

**What loads automatically** (no @ needed):
- `~/.claude/CLAUDE.md` - Global config (every session, any directory)
- `./CLAUDE.md` - Project config (when working in that directory)

**Pro tip**: Use @ for large context files you don't need every time, let CLAUDE.md auto-load for always-needed stuff.

---

## 🛠️ Tools We Built (Exact Usage)

### 1. Deployment Oracle (Hybrid Scoring)

**Command**:
```bash
python3 ~/ai_framework_git/inventory_oracle.py readiness REPO_NAME
```

**What it does**:
- Scans repo for deployment signals (Dockerfile, tests, README, etc.)
- Calculates score using Python math (deterministic, accurate)
- Recommends platform (Railway, Vercel, or Netlify)
- Estimates deploy time

**Output example**:
```json
{
  "score": 85,
  "grade": "B+",
  "deployment_ready": true,
  "recommended_platform": "railway",
  "estimated_deploy_time_minutes": 15,
  "next_action": "Deploy to railway"
}
```

**When to use**:
- Before deploying any repo (quick readiness check)
- Assessing 40 repos for value (batch scanning)
- Deciding which repos to focus on vs archive

**What it CAN'T do**:
- Assess user value (you do this)
- Check if already deployed (you verify)
- Guarantee it will work (just infrastructure assessment)

**Limitations**:
- Scores infrastructure, not value
- Biased toward complex projects (Dockerfiles = high score)
- Can't detect if repo is actually finished vs scaffolding

---

### 2. Elite Frontend Engineer (Code Generation)

**Command**:
```bash
ollama run elite-frontend "Create [description]"
```

**What it does**:
- Generates Next.js 14 + TypeScript + Tailwind + Shadcn components
- Returns B+ quality code (85% correct, 15% needs fixes)
- Uses strict patterns (no placeholders, proper types, accessibility)

**Common fixes needed**:
1. Import corrections: `Icon` → specific icons (`Check`, `Mail`, `Shield`)
2. API payload fields: Check backend expects `email_text` not `email`
3. Response fields: Check `is_phishing` vs `isPhishing` casing

**Workflow**:
1. Generate component (3 min)
2. Fix imports and API details (2 min)
3. Test in Next.js project (2 min)
4. **Total**: ~7 min vs 20-30 min from scratch

**When to use**:
- Scaffolding UI components rapidly
- Learning Shadcn patterns by example
- Building demo interfaces for APIs

**When NOT to use**:
- Complex state management (generates simple patterns)
- Backend logic (frontend-only model)
- Production-final code without review (always QA the output)

---

## ⌨️ Keyboard & Commands

### Essential Commands

**`/clear`** - Reset context window
- **When**: Switching between unrelated tasks, context getting bloated
- **Use**: After finishing one project, before starting another
- **Don't overuse**: Context accumulation is often helpful

**`#`** - Add instruction to CLAUDE.md
- **When**: You repeat the same instruction 2-3 times
- **How**: Type `#` at start of message
- **Claude asks**: "Add to global or project CLAUDE.md?"
- **Result**: Persists across sessions (survives /clear)

**`@filename`** - Import file content
- **When**: Need strategic/reference context not auto-loaded
- **Examples**: `@strategy.md`, `@PORTFOLIO_VALUE_MAP.md`
- **Tab completion**: Type `@~/` then Tab for file picker

**Session commands**:
- `/help` - Claude Code help
- `/permissions` - Manage tool permissions mid-session
- `/memory` - Opens CLAUDE.md in editor

---

## 📁 Context File Structure (What's Where)

### Global Context (`~/.claude/`)

**Auto-loaded every session**:
- `CLAUDE.md` - Rules, tools, governance (read first, always)

**Import when needed** (`@~/.claude/context/...`):
- `strategy.md` - Revenue through methodologies (read before major decisions)
- `philosophy.md` - Core values (read when values feel misaligned)
- `current-status.md` - Temporal state (update weekly)

**Templates** (`@~/.claude/templates/...`):
- `deploy-railway.md` - Railway deployment pattern (copy-paste ready)

**Archives**:
- `archive/` - Historical docs (don't load, reference only)

### Project Context

**Auto-loaded when working in project**:
- `./CLAUDE.md` - Project-specific commands, rules, tech stack

**Temporal**:
- `SESSION_HANDOFF.md` - What happened, what's next (rewritten each session)

**Reference**:
- `PORTFOLIO_VALUE_MAP.md` - Which repos are valuable vs archive
- `AI_DEVOPS_ORACLE_CASE_STUDY.md` - Sellable pattern documentation

---

## 🚀 Deployment Workflows

### Railway Deployment (Backend APIs)

**When to use**: Python/FastAPI apps, ML models, anything with Dockerfile

**Steps**:
1. Ensure `Dockerfile` exists
2. Add PORT handling: `port = int(os.environ.get("PORT", 8000))`
3. Create `railway.json`:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {"builder": "DOCKERFILE"},
  "deploy": {
    "healthcheckPath": "/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE"
  }
}
```
4. `git add railway.json && git commit -m "feat: add Railway config"`
5. `git push origin main` (Railway auto-deploys)
6. Add env var: `PYTHONUNBUFFERED=1` (better logging)
7. Monitor: `railway logs`

**Common issues**:
- Hardcoded port 8000 → Read from `$PORT` env var
- No health endpoint → Add `/health` route
- Missing buildpacks → Use Dockerfile instead

---

### Vercel Deployment (Frontends)

**When to use**: Next.js, React, static sites

**Steps**:
1. Ensure `package.json` has build script
2. `vercel --prod --yes`
3. **CRITICAL**: Disable auth in dashboard
   - Go to project → Settings → Deployment Protection
   - Turn OFF "Vercel Authentication"
4. Verify: `curl -I https://your-url.vercel.app` (should be HTTP 200)

**Common issues**:
- 401 Unauthorized → Disable Vercel Authentication
- Build fails → Check `npm run build` works locally first
- Missing dependencies → Run `npm install` before deploying

---

### GitHub Connection (CI/CD)

**When to use**: All deployments (enables git push = auto-deploy)

**Steps**:
```bash
cd ~/Projects/my-project
gh repo create my-project --public --source=. --remote=origin --push
```

**Result**:
- GitHub repo created
- Code pushed
- Railway/Vercel auto-detects repo
- Future: `git push` = auto-deploy

---

## 💡 Real-World Examples

### Example 1: "I want to deploy a repo"

**Workflow**:
```bash
# 1. Assess readiness
python3 ~/ai_framework_git/inventory_oracle.py readiness my-repo

# 2. If score >= 80, investigate value
cd ~/Projects/my-repo
cat README.md | head -20  # What does it do?
# Ask: Who needs this? Can I monetize or get consulting leads?

# 3. If valuable, check if already deployed
vercel ls --yes | grep my-repo
curl -I https://my-repo.vercel.app  # If exists, check if live

# 4. If not deployed and valuable, deploy
# Has Dockerfile? → Railway
# Has package.json? → Vercel
# Static HTML? → Netlify

# 5. Post-deployment
# Disable Vercel auth if needed
# Test live URL
# Add to PORTFOLIO_VALUE_MAP.md
```

**Time**: 10-20 minutes total

---

### Example 2: "I want to generate a UI for my API"

**Workflow**:
```bash
# 1. Generate component
ollama run elite-frontend "Create landing page for my API: [describe what it does, what inputs, what outputs]"

# 2. Save output (copy-paste from Claude response)
# Save to: ~/ai_framework_git/examples/MyComponent.tsx

# 3. Fix common issues (2 min):
# - Icon imports: Change to specific icons
# - API calls: Verify field names match your backend
# - Types: Check TypeScript interfaces match API responses

# 4. Create Next.js project (if needed)
npx create-next-app@latest my-ui --typescript --tailwind --app
cd my-ui
npx shadcn@latest init
npx shadcn@latest add card button input badge label

# 5. Copy fixed component to project
# Copy to app/components/

# 6. Deploy
vercel --prod --yes

# 7. Disable auth, test, done
```

**Time**: 15-20 minutes total (vs 45-60 from scratch)

---

### Example 3: "Should I deploy this repo or focus elsewhere?"

**Workflow**:
```bash
# 1. Load strategy context
> @~/.claude/context/strategy.md
> "Should I deploy [repo name]?"

# Claude will:
# - Read strategy (revenue through methodologies)
# - Assess against decision framework (3 questions)
# - Recommend yes/no with reasoning

# 2. If still unclear, check portfolio map
> @~/ai_framework_git/PORTFOLIO_VALUE_MAP.md
> "Where does [repo] fit in the value tiers?"

# 3. If valuable, use Oracle for deployment assessment
> python3 ~/ai_framework_git/inventory_oracle.py readiness [repo]
```

**Result**: Data-driven decision in 5 min (vs 30 min manual assessment)

---

### Example 4: "Session context got messy, start fresh"

**Workflow**:
```bash
# 1. Clear context
> /clear

# 2. Re-orient (optional but helpful)
> cat ~/ai_framework_git/SESSION_HANDOFF.md

# 3. Load strategy if making big decisions
> @~/.claude/context/strategy.md

# 4. Continue working with clean context
```

**When to do this**: After 2-3 hours of mixed work, or when responses feel off-topic

---

## 🎓 Power User Tips

### Tip 1: Layer Your Context

**Don't load everything at once**. Let auto-loading work, then import as needed:

**Auto-loads** (always present):
- ~/.claude/CLAUDE.md (global rules)
- ./CLAUDE.md (project rules)

**Import when relevant**:
- `@strategy.md` - Before assessing 40 repos
- `@philosophy.md` - When values/decisions feel misaligned
- `@PORTFOLIO_VALUE_MAP.md` - When deciding what to focus on

### Tip 2: Use `#` to Persist Learnings

**Pattern**: Repeat instruction 2-3 times → Type `#` next time → Persists forever

**Example**:
- You tell Claude "use Python 3.14" three times
- Fourth time: `# use Python 3.14 for this project`
- Claude asks where to save (global or project CLAUDE.md)
- Never repeat again

### Tip 3: Verify Deployments Are Public

**Vercel defaults to auth-protected**. Always:
```bash
curl -I https://your-deployment.vercel.app
# HTTP 200 = public ✅
# HTTP 401 = protected ❌ (disable auth in dashboard)
```

### Tip 4: Oracle + Human = Complete Assessment

**Oracle tells you**: CAN this deploy? (infrastructure score)
**You determine**: SHOULD this deploy? (value assessment)

**Don't deploy just because Oracle says B+**. Investigate first.

### Tip 5: Direct Communication

**Ask Claude directly**:
- ❌ "What are my options?"
- ✅ "What should I do next? Recommend your best answer."

Claude will state recommendation with reasoning, then offer alternatives.

---

## 📊 Understanding The System

### What Gets Loaded When

**Every session start** (any directory):
1. `~/.claude/CLAUDE.md` (global rules, latest governance at end)
2. If in project: `./CLAUDE.md` (project-specific)

**When you /clear**:
- Context resets
- CLAUDE.md re-loads
- SESSION_HANDOFF doesn't auto-load (read manually or @import)

**When you @ import**:
- File content added to context
- Can import 5 levels deep (file that imports another file, etc.)
- Use for reference docs you don't always need

### The Governance Hierarchy

**Philosophy** (values) → **Strategy** (goals) → **Rules** (execution)

**Example flow**:
1. **Philosophy** says: "Substance over flash"
2. **Strategy** says: "Revenue through methodologies"
3. **Rules** say: "Oracle filters, human validates, deploy if valuable"
4. **You execute**: Assess repo, verify value, deploy if both pass

---

## 🔄 Session Continuity

### Keeping Terminals Open (Your Workflow)

**You do this**: Keep Claude Code terminal open across days/breaks

**Claude should NOT**:
- Suggest closing based on time
- Assume you're tired
- Track "how long you've been working"

**Claude SHOULD**:
- Note when work is complete (all committed, clean state)
- Ask "continue or pause?" (not command "let's close")
- Respect that you control session boundaries

**This is now enforced** (Session Management rule in CLAUDE.md)

### Starting Fresh After Sleep/Break

**Pattern**:
```bash
# Terminal still open from yesterday
> Good morning. Starting fresh based on SESSION_HANDOFF from [date]

# Claude will:
# - Read SESSION_HANDOFF
# - Orient to current state
# - Execute next action or assess situation
```

**No need to**: Explain you slept, justify continuing, restart terminal

---

## 🎯 Strategy Execution (The Framework)

### When Making Decisions About 40 Repos

**Load strategy first**:
```
> @~/.claude/context/strategy.md
> "I'm assessing which repos to deploy. Help me apply the decision framework."
```

**Claude will remind you of**:
1. What problem does it solve?
2. Who would pay (product) or hire me (consulting)?
3. Can methodologies improve it quickly?

**Then execute**: Investigate → Deploy if all 3 are yes → Archive if no

### When Values Feel Off

```
> @~/.claude/context/philosophy.md
> "Does this align with our values?"
```

**Claude will reference**: 8 core values, check alignment

### When Unclear What To Do Next

```
> @~/ai_framework_git/SESSION_HANDOFF.md
> @~/ai_framework_git/PORTFOLIO_VALUE_MAP.md
> "What should I focus on?"
```

**Claude will**: Show portfolio status, recommend based on strategy

---

## ⚡ Advanced Patterns

### Rapid Multi-Deployment

**When you want to ship 3-5 products in one session**:

```bash
# 1. Check portfolio map for candidates
@~/ai_framework_git/PORTFOLIO_VALUE_MAP.md

# 2. For each Tier 1-2 repo:
python3 ~/ai_framework_git/inventory_oracle.py readiness REPO
# Investigate value (5 min)
# Deploy if valuable (10-15 min)

# 3. Batch auth toggle
# Disable Vercel Authentication for all at once in dashboard

# Result: 3-5 deployments in 60-90 min
```

### Generate + Deploy Full-Stack

**Pattern** (PhishGuard example):

```bash
# 1. Deploy backend (if has Dockerfile)
cd ~/Projects/my-api
railway up

# 2. Generate frontend
ollama run elite-frontend "Create UI for my API: [describe]"

# 3. Create Next.js project, copy code, fix, deploy
npx create-next-app my-ui --typescript --tailwind --app
# Copy component, fix imports
vercel --prod --yes

# 4. Result: Full-stack in 30 min
```

---

## 🧠 Lessons From This Session

**What works**:
- Oracle + Human (filter then validate)
- Hybrid AI+Python (each for what they're good at)
- Direct communication (state answer, offer alternatives)
- Value-first (don't deploy everything, deploy valuable things)

**What doesn't**:
- Pure AI scoring (small models can't do math)
- AI for static inventory (Python + JSON simpler)
- Presenting options when answer is known (decision paralysis)
- Deploying without value check (creates clutter)

---

## 🎬 Next Session Quick Start

```bash
# 1. Read this
cat ~/.claude/POWER_USER_GUIDE.md

# 2. Check session state
cat ~/ai_framework_git/SESSION_HANDOFF.md

# 3. Execute next action (already defined in handoff)
# OR: Load strategy and decide
@~/.claude/context/strategy.md

# 4. Use tools confidently
python3 ~/ai_framework_git/inventory_oracle.py readiness REPO
ollama run elite-frontend "component description"

# 5. Deploy, test, capture lessons
```

---

**This guide is your reference. Bookmark it. Use it. Master the system.**
