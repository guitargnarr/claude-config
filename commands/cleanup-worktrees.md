---
description: Clean up merged worktrees and branches after parallel development
tags: [git, worktree, cleanup]
---

Execute the worktree cleanup script:

```bash
chmod +x ~/.claude/scripts/cleanup-worktrees.sh
~/.claude/scripts/cleanup-worktrees.sh ~/Projects/projectlavos-monorepo
```

This will:
1. Fetch latest from remote
2. Update main branch
3. Identify merged branches
4. Remove worktrees for merged branches
5. Delete local merged branches
6. Prune stale worktree references
7. Show any running Claude instances in deleted directories
