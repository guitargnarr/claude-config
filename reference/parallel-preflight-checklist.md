# Parallel Development Pre-Flight Checklist

**Quick reference for preparing and launching parallel Claude Code sessions**

**Version:** 3.0 (Nov 16, 2025)
**Print this and keep it handy during parallel runs**

---

## ☑️ Phase 1: Task Selection (10 minutes)

**Task Independence Check:**
- [ ] Each task can complete without waiting for others
- [ ] Tasks edit different files (minimal overlap)
- [ ] No shared dependencies between tasks
- [ ] Similar size/complexity (30min - 2 hours each)

**Task Quality Check:**
- [ ] Requirements are clear and specific
- [ ] Success criteria are measurable
- [ ] Reference files identified
- [ ] Each task has clear value

**Red Flags (Don't Parallelize):**
- ❌ Task 2 needs Task 1's output
- ❌ Multiple tasks editing same file
- ❌ Vague requirements ("improve the code")
- ❌ Tasks requiring deep context/exploration first

**If tasks pass all checks: Proceed to Phase 2**

---

## ☑️ Phase 2: Environment Setup (5 minutes)

**Git Worktrees:**
```bash
# Method 1: Manual creation
cd ~/Projects/<project>
git worktree add ~/Projects/.worktrees/<project>/feature-1 -b feature-1
git worktree add ~/Projects/.worktrees/<project>/feature-2 -b feature-2
git worktree add ~/Projects/.worktrees/<project>/feature-3 -b feature-3
git worktree add ~/Projects/.worktrees/<project>/feature-4 -b feature-4

# Method 2: Automated launcher
~/.claude/scripts/launch_parallel.sh <project> feature-1 feature-2 feature-3 feature-4 main
```

**Verify Worktrees:**
```bash
cd ~/Projects/<project>
git worktree list
# Should show 4-5 worktrees (main + 4 features)
```

**Checklist:**
- [ ] 4 worktrees created successfully
- [ ] Each worktree is on correct branch
- [ ] No merge conflicts from previous runs
- [ ] Main project has clean working tree

---

## ☑️ Phase 3: Prompt Preparation (10 minutes)

**Template:**
- [ ] Using v3 template (~/. claude/reference/parallel-terminal-prompt-template-v3.md)
- [ ] All task-specific sections filled in
- [ ] Reference files verified to exist
- [ ] Acceptance criteria specific and testable

**Quality Checks for Each Prompt:**
- [ ] **Goal** is one clear sentence
- [ ] **Requirements** are 3-5 specific items
- [ ] **Reference Files** include actual paths
- [ ] **Acceptance Criteria** are checkboxes
- [ ] **Autonomous Guidelines** section intact (from template)
- [ ] **Error Handling** section intact (from template)
- [ ] **Time Management** section intact (from template)

**Prompt Anti-Patterns (Fix These):**
- ❌ "Test the build and show me results" → ✅ "Test the build. If passing, commit immediately"
- ❌ "Implement feature properly" → ✅ "Implement feature: <specific requirements>"
- ❌ "Let me know when done" → ✅ "Create PR at minute 40-45"

**Save Prompts:**
```bash
# Optional: Save for reuse/review
echo "Prompt 1" > /tmp/parallel-prompt-1.md
echo "Prompt 2" > /tmp/parallel-prompt-2.md
echo "Prompt 3" > /tmp/parallel-prompt-3.md
echo "Prompt 4" > /tmp/parallel-prompt-4.md
```

---

## ☑️ Phase 4: Metrics Initialization (2 minutes)

**Start metrics tracking:**
```bash
python3 ~/.claude/scripts/parallel_metrics.py start \
  --project "<project-name>" \
  --tasks 4 \
  --estimate <sequential-hours>
```

**Example:**
```bash
python3 ~/.claude/scripts/parallel_metrics.py start \
  --project "projectlavos-backend" \
  --tasks 4 \
  --estimate 18
```

**Verify:**
```bash
# Should show run started
cat ~/.claude/current_parallel_run.json
```

**Checklist:**
- [ ] Metrics tracking initialized
- [ ] Sequential estimate calculated
- [ ] current_parallel_run.json exists

---

## ☑️ Phase 5: Terminal Launch (5 minutes)

**Open 4 Terminal Windows/Tabs**

**For each terminal (1-4):**
```bash
# Terminal 1
cd ~/Projects/.worktrees/<project>/feature-1
claude
# Paste Prompt 1
# Press Enter

# Terminal 2
cd ~/Projects/.worktrees/<project>/feature-2
claude
# Paste Prompt 2
# Press Enter

# Terminal 3
cd ~/Projects/.worktrees/<project>/feature-3
claude
# Paste Prompt 3
# Press Enter

# Terminal 4
cd ~/Projects/.worktrees/<project>/feature-4
claude
# Paste Prompt 4
# Press Enter
```

**Verify All Running:**
```bash
# In separate terminal
ps aux | grep claude | grep -v grep | wc -l
# Should output: 4
```

**Note start time:** ___:___ (e.g., 2:30 PM)

---

## ☑️ Phase 6: Monitoring Schedule (60-90 minutes)

**Check-in Intervals:**

**First Check (15 minutes after start):**
- [ ] All 4 terminals showing activity
- [ ] No terminals stopped with errors
- [ ] Progress markers visible (if using v3 template)
- [ ] No terminals waiting for input

**Second Check (30 minutes after start):**
- [ ] At least 2 terminals past 50% mark
- [ ] No terminals stuck on same task
- [ ] Error messages being handled (retry attempts visible)
- [ ] Any completed? Note which ones

**Third Check (45 minutes after start):**
- [ ] At least 1 terminal approaching PR creation
- [ ] Failed terminals identified (manual fix plan ready)
- [ ] Successful terminals past self-validation
- [ ] Estimate completion time

**What to Look For:**
- ✅ Progress markers with timestamps
- ✅ "Attempting fix #2" or similar retry language
- ✅ "Tests passing" or validation language
- ✅ "/commit" or "Creating PR" messages

**Red Flags:**
- ⚠️ Terminal asking questions (shouldn't happen with v3)
- ⚠️ Terminal waiting for verification (prompt issue)
- ⚠️ Same error repeating >3 times
- ⚠️ No activity for >10 minutes

---

## ☑️ Phase 7: Completion & Cleanup (15 minutes)

**For Each Completed Terminal:**

**If PR Created:**
```bash
# Log success
python3 ~/.claude/scripts/parallel_metrics.py complete \
  --task-id <1-4> \
  --pr-created yes

# Copy PR URL for records
# Close terminal: /exit or Ctrl+D
```

**If Terminal Failed:**
```bash
# Log failure with reason
python3 ~/.claude/scripts/parallel_metrics.py fail \
  --task-id <1-4> \
  --reason "<why it failed>"

# Note manual fix needed
# Close terminal: /exit or Ctrl+D
```

**After All Terminals Done:**
```bash
# Calculate total time spent
# End time: ___:___ (e.g., 4:15 PM)
# Duration: ___.___ hours (e.g., 1.75)

python3 ~/.claude/scripts/parallel_metrics.py end \
  --time-spent <hours> \
  --notes "<brief summary>"
```

**Review Metrics:**
```bash
python3 ~/.claude/scripts/parallel_metrics.py report
```

---

## ☑️ Phase 8: Manual Fixes (5-15 minutes, if needed)

**For Failed Terminals:**

**Quick Fix Protocol:**
1. Open worktree directory
2. Review what Claude attempted
3. Complete manually (time-boxed: 15 min max)
4. Commit and create PR
5. Document as "manual completion"

**When to Skip Manual Fix:**
- Low priority task
- Blocker requires deep investigation
- Already 2+ other tasks succeeded

**Priority:** Fix highest-value failed tasks first

---

## ☑️ Phase 9: PR Review & Merge (10-20 minutes)

**For Each PR:**
- [ ] Review changes in GitHub
- [ ] Check CI/CD status
- [ ] Verify tests passing
- [ ] Read "Known Issues" section (if present)
- [ ] Approve and merge (or request changes)

**Cleanup Worktrees (After PRs Merged):**
```bash
cd ~/Projects/<project>
git worktree remove ~/Projects/.worktrees/<project>/feature-1
git worktree remove ~/Projects/.worktrees/<project>/feature-2
git worktree remove ~/Projects/.worktrees/<project>/feature-3
git worktree remove ~/Projects/.worktrees/<project>/feature-4

# Or bulk cleanup
git worktree prune
```

---

## Success Metrics

**Good Run:**
- 3-4 PRs created
- 0-1 manual fixes
- 2-3 hours total time
- 70-100% of features delivered

**Acceptable Run:**
- 2 PRs created
- 2 manual fixes
- 2.5-3 hours total time
- 60-80% of features delivered
- **Still 2-3x faster than sequential**

**Learning Run:**
- 1 PR created
- 3 manual fixes or defer
- 3-4 hours total time
- Identified process improvements
- **Still faster + gained insights**

---

## Emergency Procedures

**All Terminals Failing:**
- STOP: Review prompts for quality
- Check if tasks are actually independent
- Consider sequential approach instead

**Terminals Waiting for Input:**
- Add "proceed autonomously" to prompts
- Verify using v3 template
- May need to manually intervene this run

**Git Worktree Conflicts:**
```bash
# Check status
cd ~/Projects/<project>
git worktree list

# Remove stuck worktree
git worktree remove --force <path>

# Prune deleted worktrees
git worktree prune
```

**Lock File Errors:**
```bash
# Check for stuck Claude processes
ps aux | grep claude

# Kill specific process
kill <PID>

# Or kill all
pkill claude
```

---

## Quick Reference Commands

```bash
# Start metrics
python3 ~/.claude/scripts/parallel_metrics.py start --project "<name>" --tasks 4 --estimate <hrs>

# Complete task
python3 ~/.claude/scripts/parallel_metrics.py complete --task-id <1-4> --pr-created yes

# Fail task
python3 ~/.claude/scripts/parallel_metrics.py fail --task-id <1-4> --reason "<why>"

# End run
python3 ~/.claude/scripts/parallel_metrics.py end --time-spent <hrs> --notes "<summary>"

# View report
python3 ~/.claude/scripts/parallel_metrics.py report

# Launch terminals (automated)
~/.claude/scripts/launch_parallel.sh <project> <br1> <br2> <br3> <br4> <base>

# Check running sessions
ps aux | grep claude | grep -v grep | wc -l

# List worktrees
cd ~/Projects/<project> && git worktree list

# Clean worktrees
cd ~/Projects/<project> && git worktree prune
```

---

## Resources

- **Playbook:** `~/.claude/reference/parallel-development-playbook.md`
- **v3 Template:** `~/.claude/reference/parallel-terminal-prompt-template-v3.md`
- **Metrics Script:** `~/.claude/scripts/parallel_metrics.py`
- **Launcher Script:** `~/.claude/scripts/launch_parallel.sh`
- **Worktree Manager:** `~/.claude/scripts/worktree_manager.py`

---

**Print this checklist and check off items as you go. Good luck!**
