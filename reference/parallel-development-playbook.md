# Parallel Development Playbook

**Version:** 5.0 (Jan 17, 2026)
**Success Rate:** 88% PR success (16 tasks, 14 PRs)
**Efficiency:** 60-70% time savings vs sequential

---

## Quick Start (v5 - tmux)

```bash
# 1. Launch 4-pane tmux session
tpar

# 2. Start Claude in all panes
for pane in 1 2 3 4; do
  tmux send-keys -t parallel:1.$pane "claude" Enter
done

# 3. Send task prompts (use @~/.claude/reference/unified-task-prompt.md template)
tmux send-keys -t parallel:1.1 "cd ~/Projects/project1 && [Task 1 prompt]" Enter
# ... repeat for panes 2-4

# 4. Monitor every 15-20 min, approve permissions as needed
tmux send-keys -t parallel:1.1 Enter

# 5. Collect PRs when done
gh pr list
```

**Full workflow details below. Historical v2/v3 patterns: @~/.claude/archive/parallel-development-version-history.md**

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
6. **Deployment Discovery FIRST**: Always inventory existing deployments before starting (Nov 25 lesson)
7. **HITL Checkpoints**: Human tests at critical milestones, catches issues early

### Why It's Faster

**Sequential Development**: Task 1 → Task 2 → Task 3 → Task 4 (2-3 days)  
**Parallel Development**: All 4 tasks simultaneously (~4 hours)  
**Efficiency**: 3-4x faster

---

## The Playbook (Step-by-Step)

### Phase 0: Deployment Discovery (15 minutes) - MANDATORY

**Full protocol:** @~/.claude/reference/deployment-discovery-protocol.md

**Quick checklist:**
```bash
# 1. Inventory all deployments
vercel list && railway status

# 2. Test ALL URLs with Playwright (not curl/WebFetch for SPAs)
npx playwright screenshot --wait-for-timeout=5000 "https://url" screenshot.png

# 3. Compare quality, choose best foundation
# 4. Verify git branch alignment
git branch --show-current
```

**Critical questions:**
- What's already deployed and working?
- Which deployment has the best UI/backend?
- Are we building on the right foundation?
- Does local branch match deployed branch?

**Why this matters:** OurJourney lesson (Nov 25) - 2 hours wasted building on wrong codebase.

---

### Phase 1: Identify Tasks (15 minutes)

**Criteria for Good Parallel Tasks:**
- ✅ Independent (no dependencies)
- ✅ Similar size (~30min to 2 hours each)
- ✅ High value (clear user benefit)
- ✅ Different files/modules (minimal conflicts)
- ✅ Building on VERIFIED correct codebase (Phase 0 complete)

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

**Use the canonical template:** @~/.claude/reference/unified-task-prompt.md

**Key sections to customize for each task:**
1. `cd ~/Projects/[path]` - Absolute path required as first line
2. Project, Path, Deployment - From inventory lookup
3. Goal and Requirements - Specific to this task
4. Autonomous execution enabled (don't wait for verification)

**Critical reminders in every prompt:**
- Feature branch required (never commit to main)
- PR must be created (`gh pr list` shows your PR)
- 70-100% completion is success
- Document blockers in PR description

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

### Strategy 4: GitHub Repo Quality Improvement (Value Creation)

**Best for**: Vetting and improving GitHub repos for deployment/sale readiness

**Example**: 4 repos reviewed in parallel
- Task 1: Fix python linting, create GitHub Issues for problems
- Task 2: Complete TODOs, improve documentation, add examples
- Task 3: Code review with quality scoring, create PRs for fixes
- Task 4: Deployment verification, GitHub Actions setup, test coverage

**Pros**: Portfolio quality, deployment readiness, pattern learning on common issues
**Cons**: None - directly creates value

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

1. **Skipping Deployment Discovery**: Building without checking what's already deployed (Nov 25 lesson)
2. **Dependent Tasks**: Task 2 requires Task 1 to finish first
3. **Same Files**: Multiple tasks editing the same file
4. **Vague Prompts**: "Improve the code" without specifics
5. **No Post-Execution Plan**: Forgetting /commit, /push-pr steps
6. **Too Many Tasks**: >4 parallel instances = context switching overhead
7. **Ignoring Sessions**: Not checking in periodically
8. **Leaving Sessions Open**: Using tokens without progress
9. **Assuming Local = Canonical**: Deployed version might be superior to local code
10. **No HITL Checkpoints**: Building for hours without user testing

### ✅ Do This Instead

1. **Run Deployment Discovery First**: Use `claude-discover` before any work
2. **Independent Tasks**: Each task stands alone
3. **Different Modules**: Minimal file overlap
4. **Specific Prompts**: Clear requirements, acceptance criteria
5. **Post-Execution Checklist**: /commit, /push-pr, verify PR
6. **2-4 Tasks**: Sweet spot for parallel work
7. **Check Every 15-20 Minutes**: Monitor progress
8. **HITL Checkpoints**: User tests at critical milestones
9. **Verify Foundation**: Confirm you're building on best codebase
10. **Close After Completion**: Save notes, exit gracefully

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

## Version History

| Version | Date | Key Feature | Success Rate |
|---------|------|-------------|--------------|
| v5.0 | Dec 20, 2025 | tmux integration, remote monitoring | 88% |
| v4.0 | Nov 16, 2025 | Orchestrator pattern, build gates | 100% |
| v3.0 | Nov 15, 2025 | Error recovery, time management | 70-80% |
| v2.0 | Nov 14, 2025 | Initial parallel workflow | 50-70% |

**Historical patterns and lessons learned:** @~/.claude/archive/parallel-development-version-history.md

---

**Last Updated:** January 17, 2026 (v5.0)
**Proven Effective:** 16 tasks, 14 PRs, 100% success rate (v4→v5)
**v5 Results:** Portfolio Health Check - 4/4 tasks, 3 PRs merged, ~15 min total
**Recommended:** Use tmux + v5 workflow for any 2-4 independent tasks

## Version History
- **v5.0 (2025-12-20):** tmux integration, remote monitoring, automated approval
- **v4.0 (2025-11-16):** Orchestrator pattern, build gates, conflict detection, 100% success
- **v3.0 (2025-11-15):** Error recovery, time management, 70-80% success
- **v2.0 (2025-11-14):** Initial parallel workflow, 50-70% success

---

## Version 5: tmux Integration (December 20, 2025)

### Why tmux?

Previous versions required manually opening 4 Terminal.app windows. tmux provides:
- **Single window, 4 panes** - Everything visible at once
- **Detachable sessions** - Walk away, come back later
- **Remote monitoring** - Check pane status from another Claude session
- **Scriptable** - Send prompts and approvals programmatically

### New Tools

**Config:** `~/.tmux.conf`
- Prefix: `Ctrl+a` (easier than default `Ctrl+b`)
- Mouse support enabled
- Teal/orange status bar (matches brand)
- Quick layouts: `Ctrl+a p` for 4-pane parallel layout

**Scripts:**
- `~/.claude/scripts/tmux-parallel.sh` - Launch 4-pane session with default projects
- `~/.claude/scripts/tmux-worktrees.sh` - Launch session with git worktrees

**Aliases (in ~/.zshrc):**
```bash
t         # Attach to last session or create new
tpar      # Launch 4-pane parallel session
twt       # Launch worktree-based session
tguitar   # Guitar project session
tjobs     # ai-talent-optimizer session
tlavos    # Monorepo session
ta <name> # Attach to named session
tl        # List sessions
tk <name> # Kill session
```

### Updated Workflow

#### Phase 4: Launch with tmux (Replaces "Open 4 terminal windows")

**Option A: Quick launch with defaults**
```bash
tpar
# Creates 4 panes with:
# - projectlavos-monorepo
# - guitar-model-lab
# - ai-talent-optimizer
# - phishguard-ui
```

**Option B: Custom projects**
```bash
~/.claude/scripts/tmux-parallel.sh myrun \
  ~/Projects/project1 \
  ~/Projects/project2 \
  ~/Projects/project3 \
  ~/Projects/project4
```

**Option C: Worktree-based**
```bash
twt projectlavos-monorepo feature/api feature/auth feature/ui feature/tests
```

#### Phase 4b: Launch Claude in all panes

```bash
# From another terminal or Claude session:
tmux send-keys -t myrun:1.1 "claude" Enter
tmux send-keys -t myrun:1.2 "claude" Enter
tmux send-keys -t myrun:1.3 "claude" Enter
tmux send-keys -t myrun:1.4 "claude" Enter
```

#### Phase 4c: Send prompts to all panes

```bash
# Send prompt to pane 1
tmux send-keys -t myrun:1.1 "Your task prompt here" Enter

# Send to all panes at once
for pane in 1 2 3 4; do
  tmux send-keys -t myrun:1.$pane "Task $pane prompt" Enter
done
```

#### Phase 5: Remote Monitoring (NEW)

**Check status without attaching:**
```bash
# View last 20 lines of each pane
for pane in 1 2 3 4; do
  echo "=== PANE $pane ==="
  tmux capture-pane -t myrun:1.$pane -p | tail -20
done
```

**Approve permissions remotely:**
```bash
# Send Enter to approve pending dialogs
tmux send-keys -t myrun:1.1 Enter
tmux send-keys -t myrun:1.2 Enter
tmux send-keys -t myrun:1.3 Enter
tmux send-keys -t myrun:1.4 Enter
```

**Use "always allow" to reduce prompts:**
```bash
# Send "2" then Enter to select "Yes, and don't ask again"
tmux send-keys -t myrun:1.1 "2" Enter
```

#### Phase 6: Cleanup

```bash
# Kill the session when done
tmux kill-session -t myrun

# Or detach to keep running (Ctrl+a d from inside tmux)
```

### tmux Quick Reference

**Inside tmux (after Ctrl+a):**
| Key | Action |
|-----|--------|
| `p` | 4-pane parallel layout |
| `\|` | Split vertical |
| `-` | Split horizontal |
| `z` | Zoom current pane (toggle) |
| `d` | Detach (keeps running) |
| `s` | Session picker |
| `o` | Cycle through panes |
| `x` | Kill current pane |
| `r` | Reload config |

**Navigate panes (no prefix needed):**
| Key | Action |
|-----|--------|
| `Alt+Arrow` | Move between panes |
| `Ctrl+Alt+Arrow` | Resize panes |
| `Alt+1/2/3/4` | Jump to window 1/2/3/4 |

### Real-World Example (Dec 20, 2025)

**Portfolio Health Check Run:**

```bash
# 1. Launch session
tpar

# 2. Start Claude in all panes (from this Claude session)
tmux send-keys -t demo:1.1 "claude" Enter
tmux send-keys -t demo:1.2 "claude" Enter
tmux send-keys -t demo:1.3 "claude" Enter
tmux send-keys -t demo:1.4 "claude" Enter

# 3. Send task prompts
tmux send-keys -t demo:1.1 "Check all subdomains and OG images..." Enter
tmux send-keys -t demo:1.2 "Run build, check for vulnerabilities..." Enter
tmux send-keys -t demo:1.3 "Test all API endpoints..." Enter
tmux send-keys -t demo:1.4 "Verify frontend connects to API..." Enter

# 4. Monitor remotely every few minutes
tmux capture-pane -t demo:1.1 -p | tail -15

# 5. Approve permissions as needed
tmux send-keys -t demo:1.1 Enter

# 6. Merge PRs when complete
gh pr merge 38 --squash --delete-branch -R guitargnarr/projectlavos-monorepo
gh pr merge 3 --squash --delete-branch -R guitargnarr/phishguard-ui

# 7. Kill session
tmux kill-session -t demo
```

**Results:**
- 4 tasks completed in ~15 minutes
- 3 PRs created and merged
- 1 project verified healthy (no changes needed)
- All done without leaving the orchestrating Claude session

### Migration from v4 to v5

**Keep Using:**
- All v4 prompt templates
- Autonomous execution guidelines
- 15-20 minute monitoring intervals
- PR-based workflow

**New in v5:**
- Replace 4 Terminal windows with `tpar` (tmux)
- Monitor remotely with `tmux capture-pane`
- Approve permissions with `tmux send-keys`
- Detach/reattach for long-running tasks

**Backward Compatible:** v4 workflow still works, v5 adds tmux convenience

