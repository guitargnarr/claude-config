# Trust Protocol - Verification Methods for AI-Native Development

**Last Updated**: 2025-11-19
**Purpose**: How to verify tools actually work as intended (vs. assuming they work)
**Core Principle**: Never trust, always verify

---

## Why This Exists

**The Problem**: You've built 13 scripts, 23 slash commands, 6 agents, and 4 skills. Most are marked "⚠️ Untested" in MASTER_INDEX.md. You don't know if they work.

**The Pattern**: We both excel at building systems without using them. Documentation exists, but execution doesn't. This creates the illusion of capability without proof.

**The Solution**: Systematic verification that answers "Does this actually work?" not "Did I build this?"

---

## Core Verification Principles

### 1. Verification ≠ Existence

```bash
# This proves the file exists:
ls ~/.claude/scripts/parallel_metrics.py
# ✅ File exists

# This proves it works:
python3 ~/.claude/scripts/parallel_metrics.py --help
# ❓ Unknown - need to test

# This proves it does what you think:
python3 ~/.claude/scripts/parallel_metrics.py start --project test --tasks 1
# ❓ Unknown - need actual test run
```

**Rule**: If you haven't run it with real inputs and seen expected outputs, you don't know if it works.

### 2. Documentation Lies (Unintentionally)

**Documented**: "parallel_metrics.py tracks completion rates over time"
**Reality**: Unknown until you run: `parallel_metrics.py report` and see actual data

**Why documentation lies:**
- Written when building (aspirational)
- Not updated when reality diverges
- Describes intended behavior, not actual behavior
- No verification that claims are true

**Rule**: Documentation describes intent. Testing reveals reality.

### 3. Last Verified Date Matters

**Built 6 months ago**: Probably broken (dependencies changed, paths moved, requirements shifted)
**Built last week**: Probably works (if tested at all)
**Built today, never run**: Unknown state

**Rule**: Add "Last Verified: YYYY-MM-DD" to every tool. If >30 days, re-verify before trusting.

### 4. Expected Output Must Be Specific

**Vague**: "Should show metrics"
**Specific**: "Should output JSON with keys: tasks_completed, success_rate, avg_time_min"

**Rule**: Write expected output before verifying. If you can't describe what success looks like, you can't verify it.

---

## Verification Levels

### Level 0: File Exists
```bash
test -f ~/.claude/scripts/parallel_metrics.py && echo "EXISTS" || echo "MISSING"
```
**Proves**: File is present at expected path
**Doesn't prove**: Anything about functionality

### Level 1: Runs Without Error
```bash
python3 ~/.claude/scripts/parallel_metrics.py --help 2>&1
```
**Proves**: Python can execute it, dependencies loadable
**Doesn't prove**: Core functionality works

### Level 2: Accepts Valid Input
```bash
python3 ~/.claude/scripts/parallel_metrics.py start --project test --tasks 1 --estimate 20
```
**Proves**: Argument parsing works
**Doesn't prove**: Data is stored correctly

### Level 3: Produces Expected Output
```bash
python3 ~/.claude/scripts/parallel_metrics.py report | jq '.runs[0].success_rate'
```
**Proves**: Core functionality works as documented
**This is minimum trust threshold**

### Level 4: Handles Edge Cases
```bash
# What if metrics file doesn't exist yet?
# What if malformed data?
# What if called with invalid project name?
```
**Proves**: Production-ready, not just happy-path working

### Level 5: Integrated in Workflow
```bash
# Evidence: Git history shows it's actually used
git log --all --oneline -- ~/.claude/scripts/parallel_metrics.py
# Last commit: When was it actually modified/used?
```
**Proves**: Not just working, but actively useful

---

## Verification Scripts (To Be Built)

### verify-inventory.sh

**Purpose**: Check all tools in MASTER_INDEX.md actually exist

```bash
#!/bin/bash
# Reads MASTER_INDEX.md
# Extracts file paths
# Tests each: test -f $path
# Reports: ✅ EXISTS or ❌ MISSING
# Updates MASTER_INDEX.md status

# Run:
~/.claude/verification/verify-inventory.sh

# Expected output:
# Checking 13 scripts...
# ✅ parallel_metrics.py EXISTS
# ❌ some_old_script.py MISSING
# ...
# Summary: 11/13 exist (84%)
```

**Verification level**: Level 0 (existence only)

### verify-tools.sh

**Purpose**: Actually run tools with test inputs

```bash
#!/bin/bash
# For each script:
# 1. Check help works: $script --help
# 2. Run with test input: $script [test args]
# 3. Verify expected output
# 4. Report: ✅ WORKS or ❌ BROKEN

# Run:
~/.claude/verification/verify-tools.sh

# Expected output:
# Testing parallel_metrics.py...
#   Level 1 (--help): ✅ PASS
#   Level 2 (test input): ✅ PASS
#   Level 3 (expected output): ❌ FAIL - Missing 'success_rate' key
# ...
# Summary: 7/13 verified working (54%)
```

**Verification level**: Level 3 (expected output)

### verify-docs.sh

**Purpose**: Check documentation accuracy

```bash
#!/bin/bash
# Checks for:
# - Broken @ import paths (try to resolve each @mention)
# - Stale dates (>3 days in temporal files)
# - Line count claims vs. actual
# - TODO items marked but never implemented

# Run:
~/.claude/verification/verify-docs.sh

# Expected output:
# Checking CLAUDE.md files...
# ⚠️ job-search/CLAUDE.md: @ import broken (~/.claude/WORKFLOWS.md)
# ⚠️ current-status.md: Date is 3 days stale (2025-11-16)
# ✅ projectlavos/CLAUDE.md: All @ imports resolve
# ...
# Summary: 3 issues found
```

**Verification level**: Metadata accuracy

### verify-standards.sh

**Purpose**: Check compliance with Anthropic guidelines

```bash
#!/bin/bash
# Checks for:
# - CLAUDE.md files >100 lines
# - Philosophy content in project files (should be in context/)
# - Duplicate content across files
# - Missing critical sections

# Run:
~/.claude/verification/verify-standards.sh

# Expected output:
# Checking Anthropic compliance...
# ❌ reflexia/CLAUDE.md: 443 lines (10x guideline)
# ⚠️ guitar/CLAUDE.md: Contains philosophy (35 lines)
# ✅ projectlavos/CLAUDE.md: 67 lines (within 2x guideline)
# ...
# Summary: 2 violations, 5 warnings
```

**Verification level**: Quality standards

---

## Tool-Specific Verification

### Scripts (~/.claude/scripts/)

#### parallel_metrics.py

**Expected functionality**: Track parallel development runs, calculate success rates, generate reports

**Verification test**:
```bash
# Level 1: Help text
python3 ~/.claude/scripts/parallel_metrics.py --help

# Level 2: Start run
python3 ~/.claude/scripts/parallel_metrics.py start \
  --project "test-project" \
  --tasks 4 \
  --estimate 20

# Level 3: Log completion
python3 ~/.claude/scripts/parallel_metrics.py complete \
  --task-id 1 \
  --pr-created yes

# Level 4: Generate report
python3 ~/.claude/scripts/parallel_metrics.py report

# Expected output:
{
  "total_runs": 1,
  "avg_success_rate": 0.25,
  "avg_time_minutes": null,
  "runs": [
    {
      "project": "test-project",
      "tasks_total": 4,
      "tasks_completed": 1,
      "success_rate": 0.25
    }
  ]
}
```

**Status after verification**: ✅ WORKS or ❌ BROKEN with specific error

**Last verified**: [To be filled after running test]

#### worktree_manager.py

**Expected functionality**: Create, list, remove git worktrees

**Verification test**:
```bash
# Level 1: Help
python3 ~/.claude/scripts/worktree_manager.py --help

# Level 2: List (should work even if none exist)
python3 ~/.claude/scripts/worktree_manager.py list

# Level 3: Create test worktree
cd ~/Projects/projectlavos-monorepo
python3 ~/.claude/scripts/worktree_manager.py create test-branch main

# Level 4: Verify it exists
ls ~/Projects/.worktrees/projectlavos-monorepo/test-branch

# Level 5: Remove test worktree
python3 ~/.claude/scripts/worktree_manager.py remove test-branch

# Expected: No errors, worktree created and removed successfully
```

**Status after verification**: [To be filled]

**Last verified**: [To be filled]

### Slash Commands (~/.claude/commands/)

#### /commit

**Expected functionality**: Generate AI commit message and create commit

**Verification test**:
```bash
# Create test repo
mkdir /tmp/test-commit
cd /tmp/test-commit
git init
echo "test" > file.txt
git add file.txt

# Run in Claude Code session
/commit

# Expected: Commit created with AI-generated message
git log --oneline | head -1
```

**Status after verification**: ✅ WORKS (used regularly)

**Last verified**: 2025-11-19 (daily use)

#### /worktree

**Expected functionality**: Manage git worktrees via slash command

**Verification test**:
```bash
# In any git repo
/worktree list

# Expected: Lists current worktrees or "No worktrees found"
```

**Status after verification**: [To be filled]

**Last verified**: [To be filled]

### Agents (~/.claude/agents/)

**Verification test template**:
```bash
# In Claude Code session
@agent-name "test prompt"

# Expected: Agent loads and responds appropriately
```

**Note**: Agents are harder to verify automatically. Manual testing required for each.

### Skills (~/.claude/skills/)

**Verification test template**:
```bash
# Trigger auto-invoke condition
# Example for job-application-tracker:
"I just applied to Company X for Role Y"

# Expected: Skill auto-invokes and updates tracker
```

**Note**: Skills protected by job search data permissions. Verification requires explicit permission grant.

---

## Parallel Development Verification

**The proven methodology needs ongoing verification:**

### Test 1: Worktree Creation
```bash
cd ~/Projects/projectlavos-monorepo
git worktree add ~/Projects/.worktrees/projectlavos-monorepo/test-feature -b test-feature
ls ~/Projects/.worktrees/projectlavos-monorepo/test-feature
git worktree remove ~/Projects/.worktrees/projectlavos-monorepo/test-feature
```

**Expected**: Worktree created and removed without errors

### Test 2: Parallel PR Creation (Real Test)
```bash
# Create 2 independent features in parallel
# Terminal 1: Feature A (different file than B)
# Terminal 2: Feature B (different file than A)
# Both should complete without conflicts
```

**Expected**:
- Both PRs created
- No merge conflicts
- Both deployable independently

### Test 3: Conflict Detection
```bash
# Create 2 features that modify same file
# Terminal 1: Modify Catalog.jsx
# Terminal 2: Also modify Catalog.jsx
```

**Expected**:
- Second PR detects conflict
- Build gate prevents merge
- Clear error message about conflict

---

## Verification Automation

### Quick Checks (Run Weekly)

```bash
# Monday morning routine:
claude-verify

# Expected output:
# Verifying AI-native development toolkit...
#
# ✅ Core documentation: 5/5 files exist
# ⚠️ Scripts: 7/13 verified working (6 untested)
# ⚠️ Slash commands: 5/23 verified working (18 untested)
# ❌ Agents: 0/6 verified working
# ❌ Skills: 0/4 verified working
#
# Priority actions:
# 1. Test parallel_metrics.py (never verified)
# 2. Fix broken @ import in job-search/CLAUDE.md
# 3. Update current-status.md date (2 days stale)
#
# Run 'claude-status' for details
```

### Deep Verification (Run Monthly)

```bash
# First Sunday of month:
~/.claude/verification/verify-all-tools.sh --deep

# Runs:
# - verify-inventory.sh
# - verify-tools.sh --level 3
# - verify-docs.sh
# - verify-standards.sh
#
# Generates report:
# ~/.claude/verification/reports/2025-11-19-verification-report.md
```

### Continuous Verification (Automated)

**Git pre-commit hook**:
```bash
# Before each commit:
# - Check for merge conflict markers
# - Verify changed CLAUDE.md files <100 lines
# - Check @ imports in changed files resolve
# - Run tests if test files changed
```

---

## Trust Levels by Tool Category

### Trusted (✅ Verified, Daily Use)

| Tool | Last Verified | Verification Level |
|------|---------------|-------------------|
| /commit | 2025-11-19 | Level 5 (Integrated) |
| /push-pr | 2025-11-16 | Level 4 (Edge cases) |
| Parallel dev v4 | 2025-11-16 | Level 5 (Production proven) |

**Trust level**: Use without hesitation

### Probably Works (⚠️ Verified Once, Not Used Recently)

| Tool | Last Verified | Verification Level |
|------|---------------|-------------------|
| [To be filled after verification] | | |

**Trust level**: Re-verify before use

### Unknown (❓ Never Verified)

| Tool | Status |
|------|--------|
| parallel_metrics.py | Exists, never run |
| Most slash commands | Exist, never tested |
| All agents | Exist, never invoked |
| All skills | Exist, permissions blocked |

**Trust level**: Assume broken until verified

### Known Broken (❌ Verified, Doesn't Work)

| Tool | Issue | Fix Required |
|------|-------|--------------|
| [To be filled as issues discovered] | | |

**Trust level**: Don't use, fix first

---

## Verification Workflow

### When Building New Tool

1. **Build**: Create script/command/agent
2. **Document**: Add to MASTER_INDEX.md with status ⚠️ Untested
3. **Test**: Run verification tests (Level 1-3 minimum)
4. **Update**: Change status to ✅ Working or ❌ Broken
5. **Use**: Actually use it in real work
6. **Verify integration**: Check it's actually useful (Level 5)

### When Using Existing Tool

1. **Check**: Look up in MASTER_INDEX.md
2. **Status**: What's current status and last verified date?
3. **If >30 days**: Re-verify before trusting
4. **If ⚠️ Untested**: Run verification tests first
5. **If ❌ Broken**: Fix or find alternative
6. **After use**: Update "Last verified" date

### When Tool Fails

1. **Document**: Change status to ❌ Broken in MASTER_INDEX.md
2. **Error**: Record specific error message
3. **Decide**: Fix now or archive?
4. **If fixing**: Create todo, assign priority
5. **If archiving**: Move to archive/, remove from index

---

## What to Verify First (Priority Order)

### High Priority (Do This Week)

1. **parallel_metrics.py** - Part of proven v4 methodology but never tested
2. **worktree_manager.py** - Core to parallel development
3. **/worktree command** - Daily use tool, should be verified
4. **verify-inventory.sh** - Need this to verify everything else

### Medium Priority (Do This Month)

5. All other scripts in ~/.claude/scripts/
6. Frequently mentioned slash commands (/code, /analyze, /coach)
7. Documentation accuracy (verify-docs.sh results)

### Low Priority (When Needed)

8. Agents (when you actually need one)
9. Skills (after resolving permissions)
10. Old project CLAUDE.md files (if reviving projects)

---

## Success Criteria

**After full verification:**
- [ ] All tools in MASTER_INDEX.md have status (not ⚠️ Untested)
- [ ] Core tools (parallel dev, commit, push-pr) at Level 5
- [ ] Verification scripts exist and run successfully
- [ ] Weekly verification routine established
- [ ] Broken tools either fixed or archived
- [ ] Last verified dates <7 days for active tools

**When verification protocol is working:**
- You know which tools you can trust
- You can confidently use automation
- Failed tools are caught early
- Documentation reflects reality
- No surprises when tools break

---

## The Verification Commitment

**From COLLABORATION_CONTRACT.md Principle #3: Verification Over Trust**

Never assume AI output (or built tools) are correct. This protocol makes that principle actionable.

**Weekly verification = trust in your toolkit**
**Monthly deep checks = maintained quality over time**
**Continuous testing = catch breaks early**

**Remember**: Tools you've built but haven't verified are Schrödinger's automation - simultaneously working and broken until you test them.

**This protocol collapses that uncertainty into knowledge.**

---

**Next Actions**:
1. Create ~/.claude/verification/ directory
2. Build verify-inventory.sh (Level 0 check)
3. Run it, get baseline of what exists
4. Build verify-tools.sh (Level 1-3 checks)
5. Start verification log: which tools work, which don't

**Start with**: `mkdir -p ~/.claude/verification && cd ~/.claude/verification`

Then build verification scripts according to templates above.

---

**Last Updated**: 2025-11-19
**Status**: Protocol defined, scripts to be built
**Next Review**: After first verification run
