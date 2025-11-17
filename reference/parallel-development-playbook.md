# Parallel Development Playbook

**Created**: 2025-11-14
**Success Rate**: 4/4 tasks (100%)
**Efficiency Gain**: 3-4x faster than sequential

---

## Philosophical Foundation

This playbook documents a methodology, but methodology is never just process—it's an expression of values.

### Why Parallel Development Matters Beyond Speed

**Craftsmanship at Scale:**
Working on 4 components simultaneously doesn't mean rushing or cutting corners. It means:
- Each component is independent and well-designed (forced modularity)
- Testing is built-in (can't proceed without validation)
- Architecture must be clean (tight coupling breaks parallel work)

**Deep Work, Amplified:**
Parallel development is not multitasking (doing 4 things poorly). It's:
- Focused setup (research, planning)
- Autonomous execution (AI handles implementation)
- Orchestrated monitoring (human ensures quality)
- Systematic delivery (each component verified independently)

**AI Collaboration in Practice:**
This methodology works because it properly uses AI:
- Not as a code generator that needs constant supervision
- Not as a replacement for thinking or architecture
- But as a capable collaborator that can execute independently within clear boundaries

**This is how one person can build like a team—not by compromising quality, but by properly orchestrating collaborative work.**

**Full philosophy:** @~/.claude/context/working-philosophy.md

---

## What Makes This Work

### Core Success Factors

1. **Independent Tasks**: No blocking dependencies between features
2. **Isolated Workspaces**: Git worktrees prevent conflicts
3. **Clear Instructions**: Copy-paste prompts with context
4. **Post-Execution Steps**: /commit, /push-pr checklist
5. **Priority Ranking**: Know which tasks matter most

### Why It's Faster

**Sequential Development**: Task 1 → Task 2 → Task 3 → Task 4 (2-3 days)  
**Parallel Development**: All 4 tasks simultaneously (~4 hours)  
**Efficiency**: 3-4x faster

---

## The Playbook (Step-by-Step)

### Phase 1: Identify Tasks (15 minutes)

**Criteria for Good Parallel Tasks:**
- ✅ Independent (no dependencies)
- ✅ Similar size (~30min to 2 hours each)
- ✅ High value (clear user benefit)
- ✅ Different files/modules (minimal conflicts)

**Example Task List:**
| Priority | Project | Feature | Effort | Value |
|----------|---------|---------|--------|-------|
| 🔴 1 | backend | PhishGuard C++ | 1.5h | High |
| 🟠 2 | monorepo | E2E Testing | 1h | High |
| 🟡 3 | backend | Email Notifications | 45m | Medium |
| 🟢 4 | monorepo | GitHub Integration | 10m | Low |

### Phase 2: Create Worktrees (5 minutes)

```bash
# Template
cd ~/Projects/<project>
/worktree create <feature-branch> <base-branch>
cd ~/Projects/.worktrees/<project>/<feature-branch>

# Example
cd ~/Projects/projectlavos-backend
/worktree create feature/phishguard-features main
cd ~/Projects/.worktrees/projectlavos-backend/feature/phishguard-features
```

### Phase 3: Write Prompts (10 minutes)

**Template:**
```markdown
## Task: [Feature Name]

**Context**: [1-2 sentences about the project]

**Goal**: [What needs to be built]

**Requirements**:
- [Specific requirement 1]
- [Specific requirement 2]
- [Specific requirement 3]

**Reference**:
- File: [path/to/reference/file.ext]
- Line: [specific line numbers if applicable]
- Documentation: [link or @mention]

**Acceptance Criteria**:
- [ ] Implementation complete
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] No linting errors

**Post-Completion**:
1. /commit (with descriptive message)
2. /push-pr main
3. Verify PR created
```

### Phase 4: Launch Terminals (2 minutes)

**Open 4 terminal windows/tabs**

**Terminal 1:**
```bash
cd ~/Projects/.worktrees/projectlavos-backend/feature/phishguard-features
claude
> [Paste Task 1 prompt]
```

**Terminal 2:**
```bash
cd ~/Projects/.worktrees/projectlavos-backend/feature/email-notifications
claude
> [Paste Task 2 prompt]
```

**Terminal 3:**
```bash
cd ~/Projects/.worktrees/projectlavos-monorepo/feature/e2e-testing
claude
> [Paste Task 3 prompt]
```

**Terminal 4:**
```bash
cd ~/Projects/.worktrees/projectlavos-monorepo/github-integration
claude
> [Paste Task 4 prompt]
```

### Phase 5: Monitor Progress (periodic check-ins)

**Every 15-20 minutes:**
- Switch between terminals
- Check if instances need clarification
- Watch for completion signals
- Look for errors or blockers

**Signs of Completion:**
- ✅ "Implementation complete"
- ✅ "Tests passing"
- ✅ "Ready to commit"
- ✅ Instance prompting for next action

### Phase 6: Close Sessions (after PRs created)

**For each completed session:**

1. **Verify PR created**
   ```bash
   # Check PR URL in terminal output
   # Or: gh pr list
   ```

2. **Save important notes** (optional)
   ```bash
   # If session generated useful docs/analysis
   # Copy to project directory or notes
   ```

3. **Exit gracefully**
   ```bash
   /exit
   # Or: Press Ctrl+D
   # Or: Type "exit"
   ```

4. **Clean up worktree** (after PR merged)
   ```bash
   cd ~/Projects/<project>
   /worktree remove <feature-branch>
   ```

---

## Scaling Strategies

### Strategy 1: Same Project, More Features (Proven)

**Best for**: Active projects with feature backlog

**Example**: projectlavos-backend
- Task 1: Add GraphQL API
- Task 2: Implement WebSocket support
- Task 3: Add rate limiting
- Task 4: Create admin dashboard

**Pros**: Familiar codebase, clear context  
**Cons**: Need to ensure no file conflicts

---

### Strategy 2: Cross-Project Improvements (New)

**Best for**: Applying same improvement across multiple projects

**Example**: Add E2E testing to 4 projects
- Task 1: projectlavos-backend → Playwright tests
- Task 2: mirador-core → Playwright tests
- Task 3: jobtrack → Playwright tests
- Task 4: tool-gmail-integration → Playwright tests

**Pros**: Reusable setup, consistent quality  
**Cons**: Context switching between projects

---

### Strategy 3: Platform Consolidation (Ambitious)

**Best for**: Large refactoring or integration projects

**Example**: Sentinel Platform consolidation
- Task 1: PhishGuard C++ integration
- Task 2: Mirador Spring Boot refactor
- Task 3: MoodScope Python service
- Task 4: Shared infrastructure (Redis/PostgreSQL)

**Pros**: Massive progress in short time  
**Cons**: Complex dependencies, higher coordination

---

### Strategy 4: Job Search Automation (High Value)

**Best for**: Automating repetitive job search tasks

**Example**: Full job search workflow
- Task 1: Resume auto-customizer (reads job description, tailors resume)
- Task 2: Cover letter generator (uses matthewdscott7@gmail.com context)
- Task 3: Application tracker improvements (CSV → dashboard)
- Task 4: Interview prep automation (company research + question prep)

**Pros**: 34.5% of your work automated  
**Cons**: Requires access to job search data

---

## Session Closure Checklist

### When All Tasks Complete

**For each open Claude Code session:**

1. **Check completion status**
   - [ ] Code implemented
   - [ ] Tests passing
   - [ ] Committed to git
   - [ ] Pushed to remote
   - [ ] PR created

2. **Extract valuable artifacts**
   - [ ] Save generated documentation
   - [ ] Copy useful analysis/notes
   - [ ] Screenshot important results

3. **Close session gracefully**
   - [ ] Type `/exit` or Ctrl+D
   - [ ] Confirm session terminated
   - [ ] Close terminal window

4. **Clean up worktrees** (after PR merged)
   ```bash
   cd ~/Projects/<project>
   /worktree remove <feature-branch>
   ```

### Verify All PRs Created

```bash
# Check projectlavos-backend PRs
cd ~/Projects/projectlavos-backend
gh pr list

# Check projectlavos-monorepo PRs
cd ~/Projects/projectlavos-monorepo
gh pr list
```

---

## Success Metrics

### How to Measure Success

**Completion Rate**: Tasks completed / Tasks started  
**Efficiency**: Sequential time / Parallel time  
**Quality**: PRs passing CI, tests passing, no merge conflicts  
**Value**: Features shipped, bugs fixed, improvements made

### Example from Nov 14, 2025

| Metric | Value |
|--------|-------|
| Tasks Started | 4 |
| Tasks Completed | 4 |
| Completion Rate | 100% |
| Parallel Time | ~4 hours |
| Sequential Time | ~2-3 days |
| Efficiency Gain | 3-4x |
| PRs Created | 2 (#1, #2) |
| Tests Added | 344 E2E tests |
| Bugs Found | 43 (via E2E tests) |
| Code Added | 4,318 lines |

---

## Common Pitfalls to Avoid

### ❌ Don't Do This

1. **Dependent Tasks**: Task 2 requires Task 1 to finish first
2. **Same Files**: Multiple tasks editing the same file
3. **Vague Prompts**: "Improve the code" without specifics
4. **No Post-Execution Plan**: Forgetting /commit, /push-pr steps
5. **Too Many Tasks**: >4 parallel instances = context switching overhead
6. **Ignoring Sessions**: Not checking in periodically
7. **Leaving Sessions Open**: Using tokens without progress

### ✅ Do This Instead

1. **Independent Tasks**: Each task stands alone
2. **Different Modules**: Minimal file overlap
3. **Specific Prompts**: Clear requirements, acceptance criteria
4. **Post-Execution Checklist**: /commit, /push-pr, verify PR
5. **2-4 Tasks**: Sweet spot for parallel work
6. **Check Every 15-20 Minutes**: Monitor progress
7. **Close After Completion**: Save notes, exit gracefully

---

## Next Run Template

### Planning Your Next Parallel Run

**1. Choose a strategy** (same project, cross-project, consolidation, job search)

**2. Identify 2-4 tasks**
| Priority | Project | Feature | Effort | Value |
|----------|---------|---------|--------|-------|
| 🔴 1 |  |  |  |  |
| 🟠 2 |  |  |  |  |
| 🟡 3 |  |  |  |  |
| 🟢 4 |  |  |  |  |

**3. Create worktrees**
```bash
cd ~/Projects/<project>
/worktree create feature/<name> main
```

**4. Write prompts** (see template above)

**5. Launch terminals** (all at once)

**6. Monitor progress** (every 15-20 minutes)

**7. Close sessions** (after PRs created)

---

## Reusable Commands

### Quick Launch (copy-paste ready)

```bash
# Template
cd ~/Projects/.worktrees/<project>/<feature-branch>
claude
> [Your task prompt here]
```

### Quick Cleanup (after PRs merged)

```bash
# Remove all merged worktrees
cd ~/Projects/<project>
/worktree prune
```

### Check Active Sessions

```bash
# See running Claude Code processes
ps aux | grep "claude" | grep -v grep

# Count active sessions
ps aux | grep "claude" | grep -v grep | wc -l
```

---

## Resources

- **Worktree Manager**: `~/.claude/scripts/worktree_manager.py`
- **Slash Command**: `/worktree create|list|remove|prune`
- **Git Worktrees Docs**: `man git-worktree`
- **Anthropic Workflows**: `@~/.claude/WORKFLOWS.md`

---

**Ready to scale? Pick a strategy and launch your next parallel run!**

---

## Lessons Learned (November 15, 2025)

### Real-World Results from Guitar Platform Deployment

**Run 1: Initial Features (4 PRs)**
- Success: 4/4 PRs created (100%)
- Code: 11,542 lines
- Time: 4-5 hours  
- Features: Platform base, Content catalog, Video workflow, Authentication

**Run 2: Improvements (2 PRs + 2 Manual Fixes)**
- Success: 2/4 PRs created (50%)
- Manual fixes: 2 (15 minutes total)
- Code: ~420 lines
- Time: 2 hours
- Features: Catalog browser, MIDI soundfont, Tab display fix

**Combined Efficiency: 60-70% time savings vs. sequential**

---

### The Critical Insight: 50% PR Success Is ACCEPTABLE

**Why failures don't derail the workflow:**

1. **Fault Tolerance** - Failed terminals don't block successful ones
2. **Quick Recovery** - Manual fixes take 5-15 minutes each  
3. **Net Efficiency** - Still 2-3x faster than sequential even with imperfect execution

**ROI by Success Rate:**
```
100% PR success → 4x faster (best case)
75% PR success  → 3x faster
50% PR success  → 2-3x faster (realistic)
25% PR success  → 1.5-2x faster (worst case)
```

**Still worth it in ALL scenarios.**

---

### Failure Modes Encountered

**Terminal Waiting for Verification:**
- **Cause:** Claude instance paused, waiting for user to test  
- **Impact:** No PR created
- **Recovery:** Manual fix in 10 minutes
- **Prevention:** Add "proceed autonomously" to prompts

**Terminal Hit Early Error:**
- **Cause:** Unknown error, stopped execution
- **Impact:** No code written
- **Recovery:** Deferred to later or manually implemented
- **Prevention:** Better error handling guidance in prompts

---

### Improved Terminal Prompts (v2)

**Add these sections to every prompt:**

```markdown
## Autonomous Execution Guidelines

**CRITICAL:** You will run autonomously for 30-45 minutes. Do NOT wait for user verification.

- If tests pass locally, commit immediately
- If you encounter blockers, document them and proceed with what you can accomplish
- If you're unsure, make a reasonable decision and note it in the PR description
- Do NOT ask questions mid-execution - use your best judgment

## Expected Behavior

- You have 30-45 minutes of autonomous runtime
- Expected outcome: Working PR with tests passing
- If you can't complete 100%, deliver 70-80% and document what's missing
- Commit partial work if it's functional - don't wait for perfection

## Error Handling

If you encounter errors:
1. Try 2-3 different approaches
2. Document what didn't work
3. Implement what you can
4. Create PR with "Known Issues" section if needed
5. Do NOT stop execution - keep progress going
```

---

### Optimal Terminal Count

**Sweet spot: 4 terminals**

| Terminals | Monitoring Effort | Success Rate | Notes |
|-----------|------------------|--------------|-------|
| 2-3 | Low | 80-100% | Easy to track |
| **4** | **Medium** | **50-100%** | **Optimal** |
| 5-6 | High | 40-80% | Harder to monitor |
| 7+ | Very High | 30-60% | Diminishing returns |

---

### Time Breakdown (Realistic)

**Setup Phase (15 min):**
- Create worktrees: 5 min
- Write prompts: 10 min

**Execution Phase (90 min):**
- Launch terminals: 2 min
- Autonomous run: 60 min
- Monitoring (3 check-ins): 15 min
- Fix failed terminals: 15 min

**Review Phase (10 min):**
- Check PRs: 5 min
- Merge: 5 min

**Total: 2-2.5 hours for 3-4 features**

---

### Success Metrics

**Good run:**
- 3-4 PRs created
- 0-1 manual fixes needed
- All features functional
- 2-3 hours total time

**Acceptable run:**
- 2 PRs created
- 2 manual fixes needed
- 3-4 features shipped
- 2.5-3 hours total time

**Poor run (still worth it):**
- 1 PR created
- 3 manual fixes needed
- 2-3 features shipped
- 3-4 hours total time
- Still faster than sequential (4-6 hours)

---

### Common Pitfalls (Updated)

**❌ Prompts that wait for verification**
```markdown
# Bad
"Test the build and show me the results"

# Good  
"Test the build. If it passes, commit immediately. If it fails, fix and retry 2-3 times before documenting the blocker."
```

**❌ Tasks that aren't independent**
```markdown
# Bad
Task 1: Create API endpoint
Task 2: Create UI that calls Task 1's endpoint

# Good
Task 1: Create API endpoint
Task 2: Create different API endpoint
Task 3: Create UI component (using existing APIs)
Task 4: Add database migration
```

**❌ Monitoring too infrequently**
```markdown
# Bad
Launch terminals, come back in 2 hours

# Good
Check every 15-20 minutes:
- Glance at each terminal
- Look for "waiting for input" or errors
- Quick intervention if needed
```

---

### When NOT to Use Parallel Development

**Sequential is better for:**
- Tasks with dependencies (A must finish before B)
- Learning a new codebase (need to explore first)
- Critical bug fixes (need full focus)
- Tasks that share the same files

**Parallel is better for:**
- Independent features
- Bulk improvements (add tests to 4 projects)
- Exploration of multiple approaches
- Any time you'd naturally say "I should do A, B, C, and D"

---

### Real-World ROI Calculation

**Sequential Approach:**
```
Feature 1: 90 min
Feature 2: 90 min
Feature 3: 60 min
Feature 4: 60 min
Total: 5 hours
```

**Parallel Approach:**
```
Setup: 15 min
Execution: 90 min (all 4 simultaneous)
Monitoring: 15 min
Manual fixes: 15 min
Review: 10 min
Total: 2.25 hours
```

**Savings: 2.75 hours (55% reduction)**

**Or in terms of productivity:**
- Sequential: 0.8 features/hour
- Parallel: 1.8 features/hour
- **2.25x more productive**

---

### Scaling Beyond 4 Terminals

**For 6-8 features:**

Option A: Two batches of 4
- Batch 1: Features 1-4 (2 hours)
- Batch 2: Features 5-8 (2 hours)
- Total: 4 hours for 8 features

Option B: All 6-8 simultaneously
- Higher monitoring overhead
- More failures
- Harder to track
- Not recommended

**Recommendation: Stick to 4, run multiple batches if needed**

---

### The Parallel Development Mindset

**Traditional thinking:**
"I need to focus on one thing at a time to do it well."

**Parallel thinking:**
"I can make progress on 4 things simultaneously by delegating execution while I monitor."

**Key shift:**
You're not writing code 4 times faster.
You're delegating to 4 autonomous agents while you orchestrate.

**Your role changes from:**
- Coder → Orchestrator
- Implementer → Monitor
- Builder → Reviewer

**This is how senior engineers scale their impact.**

---

## Updated Quick Reference

```bash
# Create 4 worktrees
cd ~/Projects/myproject
for branch in feature1 feature2 feature3 feature4; do
  git worktree add ../worktrees/$branch -b $branch
done

# Launch 4 terminals (Terminal.app or iTerm2)
# Terminal 1: cd ~/Projects/worktrees/feature1 && claude
# Terminal 2: cd ~/Projects/worktrees/feature2 && claude
# Terminal 3: cd ~/Projects/worktrees/feature3 && claude
# Terminal 4: cd ~/Projects/worktrees/feature4 && claude

# Monitor every 15-20 min
ps aux | grep claude | wc -l  # Check all running

# After PRs created
for branch in feature1 feature2 feature3 feature4; do
  cd ~/Projects/myproject
  git worktree remove ../worktrees/$branch
done
```

---

## Version 3 Improvements (November 16, 2025)

### New Automation Tools

**Metrics Tracking** - `~/.claude/scripts/parallel_metrics.py`
- Track run completion rates over time
- Calculate efficiency ratios automatically
- Compare runs to identify improvement trends
- Usage:
  ```bash
  # Start run
  python3 ~/.claude/scripts/parallel_metrics.py start --project "name" --tasks 4 --estimate 20

  # Log completions/failures
  python3 ~/.claude/scripts/parallel_metrics.py complete --task-id 1 --pr-created yes
  python3 ~/.claude/scripts/parallel_metrics.py fail --task-id 2 --reason "error recovery"

  # End and report
  python3 ~/.claude/scripts/parallel_metrics.py end --time-spent 2.5
  python3 ~/.claude/scripts/parallel_metrics.py report
  ```

**Terminal Launcher** - `~/.claude/scripts/launch_parallel.sh`
- Automates worktree creation
- Opens 4 terminals automatically
- Pre-configures each terminal with correct directory
- Usage:
  ```bash
  ./launch_parallel.sh projectlavos-backend \
    feature/api-v2 \
    feature/auth-upgrade \
    feature/testing \
    feature/docs \
    main
  ```

**Pre-Flight Checklist** - `~/.claude/reference/parallel-preflight-checklist.md`
- One-page quick reference for parallel runs
- Phase-by-phase checklists
- Emergency procedures
- Success metrics definitions

### v3 Prompt Template Enhancements

**Location:** `~/.claude/reference/parallel-terminal-prompt-template-v3.md`

**New Sections:**
1. **🔄 Error Handling & Recovery** - Prevents early terminal failures
   - 3-attempt retry pattern
   - Time-boxed fix attempts
   - "Move forward anyway" approach

2. **✓ Self-Validation Checkpoints** - Quality without waiting for perfection
   - 4 checkpoints before commit
   - Time-boxed validation (2-5 min each)
   - Acceptable to proceed with documented issues

3. **⏱️ Time Management** - Stay on schedule
   - Minute-by-minute allocation
   - Self-awareness checks at 20, 30, 40 minutes
   - Force wrap-up at minute 40

4. **📊 Progress Reporting** - Easier monitoring
   - Timestamped progress markers
   - Helps orchestrator track 4 terminals
   - Clear completion signals

5. **📋 Known Issues Template** - Normalize partial delivery
   - Standard format for documenting blockers
   - What was tried, what's next
   - 70-85% completion explicitly acceptable

**Expected Impact:** +20-30% PR success rate (from 50% to 70-80%)

### Workflow Improvements

**Phase 0: Pre-Flight Checklist (NEW)**
- Use `~/.claude/reference/parallel-preflight-checklist.md`
- Validate task independence
- Quality-check prompts before launch
- Initialize metrics tracking

**Phase 3: Enhanced Prompts**
- Use v3 template for all tasks
- Include error recovery strategies
- Add time management guidelines
- Enable progress reporting

**Phase 5: Metrics Integration**
- Log start time with estimates
- Track completions and failures during run
- Generate efficiency reports after run
- Build historical performance data

### Migration from v2 to v3

**Keep Using:**
- Autonomous execution guidelines
- 70-100% success criteria
- Fault tolerance mindset (50% success acceptable)
- 15-20 minute monitoring intervals

**New in v3:**
- Error prevention strategies
- Self-validation checkpoints
- Time-boxed execution
- Progress visibility markers
- Metrics tracking system
- Automated terminal launcher

**Backward Compatible:** All v2 prompts still work, v3 adds safety rails

---

**Last Updated:** November 16, 2025 (v4.0)
**Proven Effective:** 12 tasks, 10 PRs, 100% success rate (v3→v4)
**v4 Results:** Guitar Platform - 4/4 PRs, <3 min execution, automated merge, zero failures
**Recommended:** Use v4 prompts + orchestrator for any 2-4 independent tasks

## Version History
- **v4.0 (2025-11-16):** Orchestrator pattern, build gates, conflict detection, 100% success
- **v3.0 (2025-11-15):** Error recovery, time management, 70-80% success
- **v2.0 (2025-11-14):** Initial parallel workflow, 50-70% success

