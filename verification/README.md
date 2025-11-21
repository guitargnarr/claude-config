# Verification System

**Purpose**: Verify AI-native development toolkit actually works (vs. assuming it works)

**Core Principle**: Never trust, always verify (from COLLABORATION_CONTRACT.md)

---

## Quick Start

```bash
# Weekly verification
~/.claude/verification/verify-inventory.sh  # Check files exist
~/.claude/verification/verify-docs.sh       # Check documentation accuracy

# Or use quick command:
claude-verify
```

---

## Verification Scripts

### verify-inventory.sh

**What it checks**: All tools in MASTER_INDEX.md exist at claimed paths

**Verification level**: Level 0 (existence only)

**Run frequency**: Weekly

**Expected output**:
```
✅ Existing: 45/48 (93%)
❌ Missing: 3/48 (7%)
```

**Action if fails**: Remove missing items from MASTER_INDEX.md or create them

### verify-docs.sh

**What it checks**:
- Broken @ import paths (e.g., `@~/.claude/WORKFLOWS.md` when file is at `archive/`)
- Stale dates in temporal files (>3 days old)
- CLAUDE.md line counts vs. documented targets

**Verification level**: Metadata accuracy

**Run frequency**: Weekly

**Expected output**:
```
✅ No documentation issues found!
```

**Action if fails**:
- Fix broken @ imports
- Update current-status.md date
- Reduce oversized CLAUDE.md files

### verify-tools.sh (To Be Built)

**What it checks**: Actually runs tools with test inputs, verifies expected outputs

**Verification level**: Level 3 (expected output)

**Run frequency**: Monthly or before using untested tool

**Template**:
```bash
#!/bin/bash
# Test parallel_metrics.py
python3 ~/.claude/scripts/parallel_metrics.py --help
# Expected: Help text appears, no errors

# Test with actual input
python3 ~/.claude/scripts/parallel_metrics.py start --project test --tasks 1
# Expected: Run created, no errors
```

### verify-standards.sh (To Be Built)

**What it checks**:
- CLAUDE.md files >100 lines (violates Anthropic guideline)
- Philosophy content in project files (should be in context/)
- Duplicate content across files

**Verification level**: Quality standards

**Run frequency**: Monthly

---

## Verification Levels

**Level 0**: File exists at path
**Level 1**: Runs without error (`--help` works)
**Level 2**: Accepts valid input (argument parsing)
**Level 3**: Produces expected output (core functionality)
**Level 4**: Handles edge cases (production-ready)
**Level 5**: Integrated in workflow (actively used)

**Minimum for trust**: Level 3

---

## Quick Commands

### claude-inventory
Shows all working tools from MASTER_INDEX.md

### claude-verify
Runs all verification scripts, reports issues

### claude-status
Shows what needs attention (stale files, untested tools, broken imports)

---

## Manual Testing Guide

For tools that can't be verified automatically:

### Test a Script

```bash
# Level 1: Help works
python3 ~/.claude/scripts/parallel_metrics.py --help

# Level 2: Accepts input
python3 ~/.claude/scripts/parallel_metrics.py start --project test --tasks 1

# Level 3: Expected output
python3 ~/.claude/scripts/parallel_metrics.py report
# Should output JSON with expected keys
```

### Test a Slash Command

```bash
# In Claude Code session
/worktree list
# Should list worktrees or "No worktrees found"
```

### Test an Agent

```bash
# In Claude Code session
@code-analyzer "analyze this simple script"
# Should load agent and respond appropriately
```

---

## Status Tracking

After verification, update MASTER_INDEX.md:

```markdown
| Tool | Status | Last Verified |
|------|--------|---------------|
| parallel_metrics.py | ✅ Working | 2025-11-19 |
| worktree_manager.py | ❌ Broken | 2025-11-19 |
| some_script.py | ⚠️ Untested | Never |
```

**Status codes**:
- ✅ Working: Verified at Level 3+
- ⚠️ Untested: Exists but never tested
- ❌ Broken: Tested and failed
- 📋 Aspirational: Documented but not built

---

## When to Verify

### Weekly (Every Monday)
- Run verify-inventory.sh
- Run verify-docs.sh
- Update MASTER_INDEX.md with results

### Monthly (First Sunday)
- Deep verification (all scripts)
- Test untested tools (move from ⚠️ to ✅ or ❌)
- Archive broken tools that won't be fixed

### Before Using Tool
- If status is ⚠️ Untested
- If last verified >30 days ago
- If tool hasn't been used in real work before

### After Building Tool
- Immediately test (Levels 1-3 minimum)
- Update MASTER_INDEX.md with status
- Add to verification scripts if critical

---

## Verification Log

Location: `~/.claude/verification/logs/`

Format: `verification-YYYY-MM-DD.log`

Contents:
- Date run
- Scripts tested
- Pass/fail results
- Issues found
- Actions taken

Example:
```
2025-11-19 Verification Run
- verify-inventory.sh: PASS (45/48 exist)
- verify-docs.sh: FAIL (2 issues)
  - Issue 1: Broken import in job-search/CLAUDE.md
  - Issue 2: current-status.md 2 days stale
  - Action: Fixed both issues
```

---

## Trust Levels by Verification

**Trusted** (Use without hesitation):
- Verified at Level 5 (integrated in workflow)
- Last verified <7 days ago
- Evidence of regular use

**Probably Works** (Re-verify before use):
- Verified at Level 3-4
- Last verified 7-30 days ago
- Not used recently

**Unknown** (Assume broken until verified):
- Never verified
- Last verified >30 days ago
- Status ⚠️ Untested

**Known Broken** (Don't use, fix first):
- Verified and failed
- Status ❌ Broken
- Error documented

---

## Integration with Workflow

### Daily (Optional)
```bash
# Check if anything needs attention
claude-status
```

### Weekly (Required)
```bash
# Monday morning routine
claude-verify
```

### Monthly (Required)
```bash
# First Sunday deep check
~/.claude/verification/verify-all-tools.sh --deep
```

---

## Success Criteria

**Verification system is working when**:
- You know which tools you can trust
- Broken tools are caught before use
- Documentation reflects reality
- No surprises when tools break
- Weekly routine is <10 minutes

**Verification system needs work when**:
- Surprised by broken tools
- Don't know what exists
- Documentation lies
- Can't trust anything without testing first

---

**Remember**: Tools you've built but haven't verified are Schrödinger's automation - simultaneously working and broken until you test them.

**This system collapses that uncertainty into knowledge.**

---

**Next Steps**:
1. Run verify-inventory.sh (get baseline)
2. Run verify-docs.sh (find documentation issues)
3. Build verify-tools.sh (test critical tools)
4. Establish weekly verification routine
5. Update MASTER_INDEX.md with results

---

**Last Updated**: 2025-11-19
**Status**: Core scripts built, ready for first run
**Next Review**: After first verification run
