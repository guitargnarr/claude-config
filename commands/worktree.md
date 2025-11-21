---
description: Manage git worktrees for parallel development
argument-hint: <create|list|remove|cleanup> [branch] [base]
allowed-tools: Bash
---

# Git Worktree Manager

Manage isolated git worktrees for parallel agent development.

**Command**: $1
**Branch**: ${2:-N/A}
**Base**: ${3:-main}

## Commands:

### `create <branch> [base]`
Create a new isolated worktree for the given branch.

**Example**:
```bash
/worktree create feature-oauth2
/worktree create fix-logging develop
```

**What happens**:
- Creates worktree in `~/Projects/.worktrees/[repo]/[branch]/`
- Creates new branch based on specified base (default: main)
- File lock prevents conflicts with other agents
- Ready for isolated development

### `list`
List all worktrees for current repository.

**Example**:
```bash
/worktree list
```

**Shows**:
- All active worktrees
- Branch names
- Paths

### `remove <branch>`
Remove a worktree and clean up.

**Example**:
```bash
/worktree remove feature-oauth2
```

**What happens**:
- Removes worktree directory
- Cleans up git records
- Removes lock file

### `prune`
Clean up stale worktree records from git.

**Example**:
```bash
/worktree prune
```

### `cleanup`
Automatically clean up all merged worktrees and branches (SAFE).

**Example**:
```bash
/worktree cleanup
```

**What happens**:
- Fetches latest from remote
- Updates main branch
- Identifies all merged branches
- Removes worktrees for merged branches
- Deletes local merged branches
- Prunes stale references
- Shows any running Claude instances in deleted directories

**Use this after parallel development sessions to clean up everything at once!**

## Implementation:

Run the Python worktree manager script:
```bash
python3 ~/.claude/scripts/worktree_manager.py $@
```

## Use Cases:

### Parallel Feature Development
```bash
# Agent 1: OAuth implementation
/worktree create feature-oauth2

# Agent 2: Logging fix
/worktree create fix-logging

# Agent 3: Performance optimization
/worktree create perf-caching

# Agent 4: Documentation update
/worktree create docs-api

# Now 4 agents can work concurrently in isolated environments!
```

### After Feature Complete
```bash
# Commit and push from worktree
cd ~/Projects/.worktrees/mirador-core/feature-oauth2
/commit
/push-pr

# Clean up after PR merged
/worktree remove feature-oauth2
```

## Safety:

- File locks prevent race conditions
- Each worktree is completely isolated
- Changes in one worktree don't affect others
- Max 4-5 concurrent worktrees recommended

Execute the worktree management command now.
