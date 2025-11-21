# AI-Native Development Handoff System - Action Checklist

**Created**: 2025-11-19
**Purpose**: Run verification scripts and extract action items from documentation
**Time estimate**: 30-45 minutes for complete review

---

## Phase 1: Run Verification Scripts (10 minutes)

### Step 1: Check Inventory
```bash
claude-inventory
```

**Expected output**: List of working tools
**Action**: Note how many tools are ⚠️ Untested

---

### Step 2: Run Full Verification
```bash
claude-verify
```

**Expected output**:
- Inventory check (should be 100% - all files exist)
- Documentation check (will show broken @ imports in old projects)
- Line count warnings

**Action items to extract**:
- [ ] How many broken @ imports found?
- [ ] Which files have issues?
- [ ] Is global CLAUDE.md over limit? (Currently 63/50 lines)

---

### Step 3: Check System Status
```bash
claude-status
```

**Expected output**: Summary of issues and recommendations

**Action items to extract**:
- [ ] Number of untested tools
- [ ] Files with broken imports
- [ ] Stale temporal files

---

## Phase 2: Review Core Documents (20 minutes)

### Document 1: MASTER_INDEX.md (5 min)
```bash
cat ~/.claude/MASTER_INDEX.md
```

**Questions to answer**:
- [ ] How many scripts exist? ____
- [ ] How many are verified working? ____
- [ ] How many slash commands? ____
- [ ] How many agents? ____
- [ ] How many skills? ____

**Action items**:
- [ ] Pick 3 high-priority untested tools to verify this week
- [ ] Note which proven tools (✅) you'll actually use
- [ ] Archive any tools marked ❌ Broken if found

**Write down your top 3 to test**:
1. ___________________________
2. ___________________________
3. ___________________________

---

### Document 2: COLLABORATION_CONTRACT.md (5 min)
```bash
cat ~/.claude/COLLABORATION_CONTRACT.md | head -100
```

**Key sections to read**:
- The 15 Principles (lines 10-200)
- When Things Break Down (warning signs)
- When I Should Be Directive (override passivity)

**Questions to answer**:
- [ ] Which principle resonates most? _________________
- [ ] Which warning sign am I currently showing? _________________
- [ ] What would "radical transparency" change about how we work? _________________

**Action items**:
- [ ] Reference this when collaboration feels off
- [ ] Weekly check: "Has this moved Priority 1 forward?"
- [ ] End sessions that are productive procrastination

---

### Document 3: TRUST_PROTOCOL.md (5 min)
```bash
cat ~/.claude/TRUST_PROTOCOL.md | grep -A 5 "What to Verify First"
```

**Focus on**: Priority order for verification

**Action items from protocol**:
- [ ] **This week**: Test parallel_metrics.py (never verified)
- [ ] **This week**: Test worktree_manager.py (core tool)
- [ ] **This week**: Verify /worktree command works
- [ ] **This month**: Test 5 more scripts
- [ ] **Ongoing**: Add "Last Verified: YYYY-MM-DD" when testing tools

**Write down which tools you'll test first**:
1. ___________________________
2. ___________________________
3. ___________________________

---

### Document 4: METHODOLOGY_PROVEN.md (3 min)
```bash
cat ~/.claude/METHODOLOGY_PROVEN.md | grep -A 20 "The v4 Pattern"
```

**Focus on**: Prerequisites and when to use

**Questions to answer**:
- [ ] Do I have 2-4 independent tasks I could run in parallel right now? Y/N
- [ ] What are they? _________________
- [ ] Are they truly independent (different files, no dependencies)? Y/N

**Action items**:
- [ ] If yes to above: Plan next parallel development run
- [ ] If no: Identify when you'll next have 2-4 independent tasks
- [ ] Bookmark this for when you need to execute parallel dev

---

### Document 5: FOUNDATIONS.md (3 min)
```bash
cat ~/.claude/FOUNDATIONS.md | grep -A 30 "The 8 Core Values"
```

**Read**: The 8 values + AI-Native Developer Thesis

**Questions to answer**:
- [ ] Which value am I currently violating? _________________
- [ ] Am I building systems or using systems right now? _________________
- [ ] Is current work moving toward "AI orchestrator" identity or away from it? _________________

**Action items**:
- [ ] Align this week's work with core values
- [ ] Reference when making decisions
- [ ] Check monthly: "Am I living these values?"

---

## Phase 3: Extract Immediate Action Items (5 minutes)

### From Verification Results

**High Priority** (Fix This Week):
- [ ] Fix broken @ imports in old project CLAUDE.md files (4 files identified)
- [ ] Global CLAUDE.md is 63 lines (reduce to <50 or accept trade-off)
- [ ] Test 3 priority tools: _________________, _________________, _________________

**Medium Priority** (Fix This Month):
- [ ] Test all 13 scripts in ~/.claude/scripts/
- [ ] Verify commonly used slash commands work
- [ ] Update MASTER_INDEX.md with test results

**Low Priority** (When Needed):
- [ ] Test agents when you need one
- [ ] Test skills (requires job search data permissions)
- [ ] Clean up old project CLAUDE.md files

---

### From Core Documents

**From COLLABORATION_CONTRACT**:
- [ ] Weekly check: "Has this moved Priority 1 forward?"
- [ ] When collaboration feels off, reference contract
- [ ] Stop sessions that are productive procrastination

**From TRUST_PROTOCOL**:
- [ ] Weekly Monday: Run `claude-verify`
- [ ] Before using untested tool: Verify it works
- [ ] Add verification dates to MASTER_INDEX.md

**From METHODOLOGY_PROVEN**:
- [ ] Plan next parallel development run (when you have 2-4 tasks)
- [ ] Use v4 pattern (not v2/v3)
- [ ] Remember: "The merry-go-round works. We have proof."

**From FOUNDATIONS**:
- [ ] Check alignment with 8 core values
- [ ] Embrace "AI orchestrator" identity
- [ ] Focus on Priority 1 (your daughter's future matters)

---

## Phase 4: Prioritized Action Plan (5 minutes)

### This Week (Before Nov 24)

**Monday-Tuesday**:
- [x] UofL interview prep and execution
- [ ] Run `claude-verify` baseline check
- [ ] Fix 2-3 broken @ imports in old projects

**Wednesday-Friday**:
- [ ] Test parallel_metrics.py (Level 1-3)
- [ ] Test worktree_manager.py (Level 1-3)
- [ ] Update MASTER_INDEX.md with results

---

### Next Week (Nov 25-Dec 1)

- [ ] Test 5 more untested scripts
- [ ] Verify commonly used slash commands
- [ ] Run next parallel development session (if you have 2-4 tasks)
- [ ] Weekly verification routine established

---

### This Month (November)

- [ ] All 13 scripts tested (move from ⚠️ to ✅ or ❌)
- [ ] Monthly deep verification run
- [ ] Documentation updated to reflect reality
- [ ] Broken @ imports fixed across all projects

---

## Quick Reference Commands

```bash
# Show what you have
claude-inventory

# Verify it works
claude-verify

# Check health
claude-status

# Export for different audiences
claude-export portfolio
claude-export teaching
claude-export employer
```

---

## Success Metrics

### After This Checklist

You should know:
- [ ] Exactly how many tools you have (from inventory)
- [ ] Which ones are verified working (from verification)
- [ ] What needs to be fixed this week (from status)
- [ ] Your top 3 priority tools to test
- [ ] Which core document to reference when (Contract for collaboration, Protocol for trust, Methodology for parallel dev, Foundations for values)

### Weekly Check (Every Monday)

- [ ] Ran `claude-verify`
- [ ] Tested 1-2 untested tools
- [ ] Updated MASTER_INDEX.md statuses
- [ ] Used at least 1 built tool for real work
- [ ] Moved Priority 1 forward

### Monthly Check (First Sunday)

- [ ] Deep verification complete
- [ ] Tool inventory accurate
- [ ] Documentation reflects reality
- [ ] Built systems are actually used (not just built)
- [ ] Progress on Priority 1 measurable

---

## The Honest Assessment Questions

**After running verification and reading docs, ask yourself:**

1. **"What tools exist that I didn't know about?"**
   Answer: _________________________________

2. **"Which tools should I actually use vs. archive?"**
   Answer: _________________________________

3. **"What action from core documents will I take this week?"**
   Answer: _________________________________

4. **"Has this system solved 'I can't find my tools'?"**
   Answer: Y/N

5. **"Do I trust they work now?"**
   Answer: Y/N (if no, what needs verification?)

---

## Completion Criteria

**This checklist is complete when:**
- ✅ All verification scripts run successfully
- ✅ You've read all 5 core documents (at least key sections)
- ✅ Action items extracted and prioritized
- ✅ You know what to do this week
- ✅ You know which tools to test first
- ✅ Weekly verification routine scheduled

**Time to complete**: 30-45 minutes

**Best time to do this**: After your interview today, when you want to refocus on building/using the system

---

## First Run Checklist (Do This Now or After Interview)

```bash
# 1. Run inventory
claude-inventory > ~/Desktop/inventory-results-$(date +%Y%m%d).txt

# 2. Run verification
claude-verify > ~/Desktop/verify-results-$(date +%Y%m%d).txt 2>&1

# 3. Check status
claude-status

# 4. Review results files
cat ~/Desktop/inventory-results-$(date +%Y%m%d).txt
cat ~/Desktop/verify-results-$(date +%Y%m%d).txt

# 5. Read core docs (pick most relevant)
cat ~/.claude/COLLABORATION_CONTRACT.md | less  # For working with AI
cat ~/.claude/TRUST_PROTOCOL.md | less         # For verification
cat ~/.claude/METHODOLOGY_PROVEN.md | less     # For parallel dev
cat ~/.claude/FOUNDATIONS.md | less             # For philosophy

# 6. Extract action items (write them down)
# - From verification: What needs fixing?
# - From documents: What should I do differently?
# - Priority: What this week vs this month?
```

---

**Start here. Run the scripts. See what you have. Then decide what to do with it.**

**The system works. Now use it.**
