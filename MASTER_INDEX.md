# Master Documentation Index

**Created**: Nov 23, 2025
**Purpose**: Navigate the complete documentation system
**Total docs**: 6 core files (modular by design)

---

## 📚 The 6 Core Documents

| File | Purpose | When To Use | Lines |
|------|---------|-------------|-------|
| **POWER_USER_GUIDE.md** | Usage reference (tools, @, workflows) | Learning system, forgot command | 636 |
| **VISUAL_WORKFLOWS.md** | Diagrams (strategy, Oracle, deployment) | Quick visual reference, onboarding | 455 |
| **PORTFOLIO_VALUE_MAP.md** | Repo status (deployed, ready, archive) | Deciding what to focus on | 180 |
| **strategy.md** | Revenue goals & process | Before assessing 40 repos, major decisions | 144 |
| **philosophy.md** | Core values (8 principles) | When values/decisions feel misaligned | 150 |
| **COLLABORATION_CONTRACT.md** | Human + AI principles | When collaboration feels off | 55 |

**Total**: 1,620 lines (distributed across 6 files, not one bloated doc)

---

## 🎯 Quick Access (@ Commands)

```bash
# Usage and tools
@~/.claude/POWER_USER_GUIDE.md

# Visual diagrams
@~/ai_framework_git/docs/VISUAL_WORKFLOWS.md

# Portfolio status
@~/ai_framework_git/PORTFOLIO_VALUE_MAP.md

# Strategic context
@~/.claude/context/strategy.md

# Core values
@~/.claude/context/philosophy.md

# Collaboration principles
@~/.claude/COLLABORATION_CONTRACT.md
```

---

## 🗺️ Navigation Map

### When Starting Work

**Read first** (2 minutes):
1. `SESSION_HANDOFF.md` - What's current, what's next
2. If major decisions: `@strategy.md` - Revenue goals

### When Learning The System

**Reference** (as needed):
1. `POWER_USER_GUIDE.md` - How to use tools (@, Oracle, elite-frontend)
2. `VISUAL_WORKFLOWS.md` - See diagrams (strategy flow, decision trees)

### When Making Decisions

**Load context** (5 minutes):
1. `@strategy.md` - Revenue framework (3 questions)
2. `PORTFOLIO_VALUE_MAP.md` - What's deployed, what's valuable
3. If values unclear: `@philosophy.md` - 8 core principles

### When Collaboration Feels Off

**Reference** (when needed):
1. `COLLABORATION_CONTRACT.md` - 10 principles for Human + AI
2. Check: Am I presenting options when I know the answer?
3. Check: Am I suggesting closing based on time?

---

## 🔄 How They Relate

```
Philosophy (values)
    ↓ guides
Strategy (revenue goals)
    ↓ informs
POWER_USER_GUIDE (tactical execution)
    ↓ uses
PORTFOLIO_VALUE_MAP (current state)
    ↓ updated by
SESSION_HANDOFF (temporal)

VISUAL_WORKFLOWS → provides diagrams for all of the above
COLLABORATION_CONTRACT → governs how we work together
```

---

## 🚀 Common Scenarios

### Scenario 1: "Should I deploy this repo?"

```bash
# 1. Check portfolio first
@~/ai_framework_git/PORTFOLIO_VALUE_MAP.md
# See if already deployed or assessed

# 2. If not assessed, load strategy
@~/.claude/context/strategy.md
# Apply decision framework (3 questions)

# 3. Use Oracle to assess
python3 ~/ai_framework_git/inventory_oracle.py readiness REPO

# 4. Investigate value, then decide
```

### Scenario 2: "How do I use the tools?"

```bash
# Load usage guide
@~/.claude/POWER_USER_GUIDE.md

# Or see visual workflow
@~/ai_framework_git/docs/VISUAL_WORKFLOWS.md
# Look at "Oracle + Human Collaboration" diagram
```

### Scenario 3: "What's our goal again?"

```bash
# Load strategy
@~/.claude/context/strategy.md
# Revenue through methodologies: discover → apply → monetize
```

### Scenario 4: "Is this aligned with our values?"

```bash
# Load philosophy
@~/.claude/context/philosophy.md
# Check against 8 core principles
```

---

## 📊 What's Permanent vs Temporal

**Permanent** (rarely changes):
- philosophy.md (values)
- strategy.md (goals)
- POWER_USER_GUIDE.md (usage patterns)
- VISUAL_WORKFLOWS.md (diagrams)
- COLLABORATION_CONTRACT.md (principles)

**Temporal** (updated frequently):
- PORTFOLIO_VALUE_MAP.md (as repos assessed/deployed)
- SESSION_HANDOFF.md (every session)
- current-status.md (weekly)

**Don't mix them**: Permanent docs stay clean, temporal docs update without touching permanent.

---

## ⚡ Power User Pattern

**Don't load all 6 at once.** Let auto-loading work, then:

**Always loaded** (automatic):
- `CLAUDE.md` (global + project rules)

**Import for major decisions**:
- `@strategy.md` - Before assessing repos
- `@PORTFOLIO_VALUE_MAP.md` - Before choosing what to work on

**Import for learning/reference**:
- `@POWER_USER_GUIDE.md` - When using tools
- `@VISUAL_WORKFLOWS.md` - When need visual reference

**Import when things feel off**:
- `@philosophy.md` - Values misalignment
- `@COLLABORATION_CONTRACT.md` - Collaboration issues

**Layered loading = faster, more relevant context.**

---

## 🎓 Meta: Why 6 Files, Not 1?

**We tried the 1-file approach** (4,500 lines).
**Result**: Bloat, hard to update, mixed concerns.

**The 6-file structure**:
- Each doc has single purpose
- Update one without touching others
- Import only what's needed
- Temporal separated from permanent

**This index**: Navigation without unification (best of both worlds).

---

**Quick Start**: Read this index, then @ import the doc you need.

**Total system**: 1,620 lines across 6 focused docs (vs 4,500 in one bloated file).
