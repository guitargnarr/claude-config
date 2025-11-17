# Efficient Claude Code Session Startup

**Purpose:** Minimize token usage while maintaining quality
**Context:** Quality degrades around 250k tokens - preserve tokens for actual work

---

## The Problem

**Inefficient startup:**
```
> Read all philosophy docs
> Read all playbooks
> Read all context files
> Read working-philosophy.md
> Read VALUES.md
> Read parallel-development-playbook.md
> Read current-status.md
> Read personal.md
...
(50k-80k tokens consumed before any real work)
```

**Result:** 250k token budget → 170k-200k usable tokens, quality degradation risk

---

## The Solution: Targeted Context Loading

### Minimal Startup (5k-10k tokens)

```bash
cd ~/Projects/projectlavos-monorepo/services/guitar
claude

# First message (HANDOFF ONLY):
> Read HANDOFF_TABPLAYER_GP_INTEGRATION.md
> Begin implementation
```

**Loads:**
- Task objective (what to build)
- Current state (what exists)
- Success criteria (what "done" means)
- Research findings (alphaTab already investigated)

**Skips:**
- Philosophy docs (already internalized in your instructions to Claude)
- Playbooks (only needed if doing parallel dev)
- Full context history (handoff contains relevant summary)

**Token savings:** ~40k-50k tokens

---

## Progressive Context Loading

### Load Context ONLY When Needed

**Starting work (minimal load):**
```
> Read HANDOFF_TABPLAYER_GP_INTEGRATION.md
> Start Phase 1: alphaTab MVP
```

**When making architectural decisions:**
```
> Reference @~/.claude/context/working-philosophy.md for methodology guidance
> Continue with modular component approach
```

**When stuck or unclear:**
```
> Read services/guitar/CLAUDE.md for component architecture patterns
> Apply same pattern to GuitarProPlayer component
```

**When considering parallel dev:**
```
> Reference @~/.claude/reference/parallel-development-playbook.md
> Evaluate if features are parallelizable
```

**Key:** Use `@file` references (Claude sees path) instead of full reads until actually needed.

---

## File Priority Levels

### Level 1: Always Read (Mission-Critical)
- `HANDOFF_*.md` - Current task objective
- `services/guitar/CLAUDE.md` - Platform-specific context (auto-loads)

### Level 2: Reference Only (Load if Needed)
- `@~/.claude/context/working-philosophy.md` - Methodology guidance
- `@~/.claude/context/VALUES.md` - Philosophy clarity
- Project root `CLAUDE.md` - Auto-loads, has platform overview

### Level 3: Skip Unless Explicitly Relevant
- `parallel-development-playbook.md` - Only for parallel dev work
- `parallel-development-prompts-v4.md` - Only when launching parallel run
- `personal.md` - Only for career/job-search work
- `current-status.md` - Only if unclear about priorities

### Level 4: Never Load in Session
- Archive files (WORKFLOWS.md, SYSTEM_DOCUMENTATION.md)
- Prompt templates (unless actively doing parallel dev)
- Backup files

---

## Startup Commands by Task Type

### For Feature Implementation (TabPlayer GP Integration)

**Minimal (recommended):**
```bash
cd ~/Projects/projectlavos-monorepo/services/guitar
claude

> Read HANDOFF_TABPLAYER_GP_INTEGRATION.md
> Install alphaTab and begin Phase 1 MVP
```

**Tokens used:** ~8k-12k (just handoff)

---

### For Parallel Development Run

**Efficient:**
```bash
cd ~/Projects/projectlavos-monorepo
claude

> Read services/guitar/CLAUDE.md
> Reference @~/.claude/reference/parallel-development-prompts-v4.md
> I want to parallelize 4 features: [list them]
> Use v4 prompts template
```

**Tokens used:** ~15k-20k (platform context + template reference)

**Skip:** Full playbook read (Claude has it in system context from global CLAUDE.md references)

---

### For Bug Fixes / Small Changes

**Ultra-minimal:**
```bash
cd ~/Projects/projectlavos-monorepo/services/guitar
claude

> Fix the [specific issue] in [specific file]
```

**Tokens used:** <5k (no context loading needed)

---

### For Architectural Decisions

**Targeted:**
```bash
cd ~/Projects/projectlavos-monorepo/services/guitar
claude

> Read HANDOFF_TABPLAYER_GP_INTEGRATION.md
> Read @~/.claude/context/working-philosophy.md
> I need to decide: [architectural question]
> Apply modular craftsmanship principles
```

**Tokens used:** ~20k-25k (handoff + philosophy)

---

## Reference vs Read: Token Efficiency

### Use @ References Instead of Full Reads

**Inefficient:**
```
> Read ~/.claude/reference/parallel-development-playbook.md
> Read ~/.claude/reference/parallel-development-prompts-v4.md
> Read ~/.claude/context/working-philosophy.md
> Now help me plan parallel dev
```
**Tokens:** ~60k-80k (loads 3 full documents)

**Efficient:**
```
> Reference @~/.claude/reference/parallel-development-prompts-v4.md
> I want to parallelize these 4 features: [list]
> Use the v4 template approach
```
**Tokens:** ~10k-15k (Claude knows where to look, reads if needed)

**How @ works:**
- Shows Claude the file path
- Claude can read if actually needed
- Avoids preemptive full reads

---

## Session Mode Selection

### Plan Mode (Read-Only Exploration)

**When to use:**
- Exploring unfamiliar code
- Researching before implementing
- Reviewing architecture options
- **NOT for active implementation**

**Start with:**
```bash
claude --permission-mode plan
```

**Token benefit:** Can explore extensively, `/clear` before switching to implementation

---

### Default Mode (Implementation)

**When to use:**
- Ready to build (research complete)
- Have clear objective (from handoff)
- Need to edit files

**Start with:**
```bash
claude  # default mode
```

**Token benefit:** Focused on implementation, skip research token overhead

---

## /clear Strategy for Long Sessions

### When to Clear Context

**Scenario 1: Research → Implementation**
```
[Research Phase]
> Research alphaTab integration patterns
> Explore Canvas rendering options
> Review React hooks for API initialization

> /clear

[Implementation Phase]
> Read HANDOFF_TABPLAYER_GP_INTEGRATION.md (just alphaTab section)
> Implement Phase 1 MVP
```

**Benefit:** Research tokens flushed, fresh start for implementation

---

**Scenario 2: Feature 1 → Feature 2 (Unrelated)**
```
[Feature 1: TabPlayer]
> Implement GP file loading
> Test with 5 files
> Commit changes

> /clear

[Feature 2: Catalog Enhancement]
> Add search autocomplete to Catalog
> Commit changes
```

**Benefit:** Each feature starts with clean context

---

**DON'T Clear:**
- Mid-implementation (loses architectural context)
- During debugging (loses error history)
- During refactoring (loses original code context)

---

## Example: Optimal TabPlayer GP Integration Startup

### Session 1: Research & MVP (4 hours)

**Startup:**
```bash
cd ~/Projects/projectlavos-monorepo/services/guitar
claude

> Read HANDOFF_TABPLAYER_GP_INTEGRATION.md
> Install @coderline/alphatab
> Configure Vite plugin
> Implement basic Canvas rendering with 1 GP file
> Test, commit when working
```

**Token usage:** ~8k initial + ~80k-120k implementation = **~130k total**
**Quality:** High (well under 250k threshold)

---

### Session 2: Catalog Integration (2 hours)

**Startup:**
```bash
cd ~/Projects/projectlavos-monorepo/services/guitar
claude --continue  # Resume previous session

OR (if starting fresh):

claude
> Read HANDOFF_TABPLAYER_GP_INTEGRATION.md (just "Phase 2" section)
> Previous session completed Phase 1 (basic alphaTab working)
> Now: Enable catalog preview button, wire to TabPlayer
```

**Token usage:** ~10k (handoff section) + ~60k-80k implementation = **~90k total**

---

## Anti-Patterns (What NOT to Do)

### ❌ Loading Everything Up Front
```
> Read working-philosophy.md
> Read VALUES.md
> Read parallel-development-playbook.md
> Read current-status.md
> Read personal.md
> Read all CLAUDE.md files
> Read all templates
> Now let's start
```

**Tokens wasted:** 60k-80k (most of it irrelevant to current task)

---

### ❌ Re-Reading Same Files
```
> Read HANDOFF.md
[...work for 30 min...]
> Read HANDOFF.md again to remember
[...work for 30 min...]
> Read HANDOFF.md one more time
```

**Better:** Reference sections: "As stated in HANDOFF Phase 2..." (Claude remembers)

---

### ❌ Reading Archives During Active Work
```
> Read ~/.claude/archive/WORKFLOWS.md (85k tokens)
> Read ~/.claude/archive/SYSTEM_DOCUMENTATION.md (45k tokens)
```

**These are reference materials.** Claude already knows Anthropic workflows from global CLAUDE.md.

---

## Token Budget Allocation

### Optimal Distribution (1M token session)

| Phase | Tokens | Percentage |
|-------|--------|------------|
| **Startup** | 10k-20k | 1-2% |
| **Implementation** | 150k-200k | 15-20% |
| **Iteration/Refinement** | 100k-150k | 10-15% |
| **Testing/Debugging** | 80k-120k | 8-12% |
| **Documentation** | 40k-60k | 4-6% |
| **Reserve** | 400k-600k | 40-60% |

**Total used:** 380k-550k (optimal range)
**Quality maintained:** Never exceed 250k in concentrated work session

**If hitting 250k:**
- Create handoff document
- Start fresh session
- Reference previous work via handoff

---

## Quick Reference: Startup Commands

### Minimal Context (Feature Work)
```
> Read HANDOFF_[TASK].md
> Begin implementation
```

### With Philosophy (Architectural Decisions)
```
> Read HANDOFF_[TASK].md
> Reference @~/.claude/context/working-philosophy.md
> Decide on architecture
```

### With Parallel Dev (4+ Features)
```
> Read services/guitar/CLAUDE.md
> Reference @~/.claude/reference/parallel-development-prompts-v4.md
> Create 4 feature prompts for: [features]
```

### Ultra-Minimal (Quick Fix)
```
> Fix [issue] in [file]
```

---

## Handoff Document Strategy

### When to Create Handoff

**Create handoff when:**
- Token count approaching 200k
- Quality starting to degrade (repetitive responses, missing details)
- Switching to complex new task
- Ending session for the day

**DON'T create handoff:**
- Every 50k tokens (overhead of creating doc)
- Mid-implementation (lose flow state)
- For trivial tasks

### What Makes a Good Handoff

**Include:**
- Current state (what's working)
- Next task (clear objective)
- Research complete (findings, decisions made)
- Success criteria (what "done" means)
- Code patterns (if established)

**Exclude:**
- Full conversation history
- Philosophy discussions (reference docs instead)
- Token meta-commentary
- Speculative future work

**Size:** 300-500 lines ideal (comprehensive but not overwhelming)

---

## Summary: Token Efficiency Principles

1. **Load only what you need** (handoff > everything)
2. **Reference > Read** (use @ when possible)
3. **Clear between phases** (research → /clear → implementation)
4. **Never load archives** (reference material, not session context)
5. **Handoff at 200k** (preserve quality for next session)
6. **Trust the system** (Claude has global CLAUDE.md, knows core workflows)

**Result:** More tokens for actual work, maintained quality throughout session.

---

**Your observation about 250k quality degradation is accurate. Use this guide to stay well below that threshold.**
