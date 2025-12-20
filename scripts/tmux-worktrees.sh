#!/bin/bash
# tmux-worktrees.sh - Launch session with git worktrees
# Usage: tmux-worktrees.sh <project> <branch1> <branch2> <branch3> <branch4>
#
# Example:
#   tmux-worktrees.sh projectlavos-monorepo feature/api feature/auth feature/ui feature/tests

PROJECT="$1"
shift
BRANCHES=("$@")

if [ -z "$PROJECT" ] || [ ${#BRANCHES[@]} -eq 0 ]; then
    echo "Usage: tmux-worktrees.sh <project> <branch1> [branch2] [branch3] [branch4]"
    echo ""
    echo "Example:"
    echo "  tmux-worktrees.sh projectlavos-monorepo feature/api feature/auth"
    exit 1
fi

PROJECT_PATH="$HOME/Projects/$PROJECT"
WORKTREE_BASE="$HOME/Projects/.worktrees/$PROJECT"
SESSION_NAME="wt-$PROJECT"

# Verify project exists
if [ ! -d "$PROJECT_PATH" ]; then
    echo "Error: Project not found at $PROJECT_PATH"
    exit 1
fi

# Create worktrees if they don't exist
echo "Setting up worktrees..."
mkdir -p "$WORKTREE_BASE"

for BRANCH in "${BRANCHES[@]}"; do
    BRANCH_DIR=$(echo "$BRANCH" | tr '/' '-')
    WORKTREE_PATH="$WORKTREE_BASE/$BRANCH_DIR"

    if [ ! -d "$WORKTREE_PATH" ]; then
        echo "Creating worktree for $BRANCH..."
        cd "$PROJECT_PATH"
        git worktree add "$WORKTREE_PATH" -b "$BRANCH" 2>/dev/null || \
        git worktree add "$WORKTREE_PATH" "$BRANCH" 2>/dev/null || \
        echo "Warning: Could not create worktree for $BRANCH"
    fi
done

# Kill existing session
tmux kill-session -t "$SESSION_NAME" 2>/dev/null

# Build paths array
PATHS=()
for BRANCH in "${BRANCHES[@]}"; do
    BRANCH_DIR=$(echo "$BRANCH" | tr '/' '-')
    PATHS+=("$WORKTREE_BASE/$BRANCH_DIR")
done

# Create session with first worktree
tmux new-session -d -s "$SESSION_NAME" -c "${PATHS[0]}"

# Add panes based on number of branches
PANE_COUNT=${#PATHS[@]}

if [ $PANE_COUNT -ge 2 ]; then
    tmux split-window -h -t "$SESSION_NAME" -c "${PATHS[1]}"
fi

if [ $PANE_COUNT -ge 3 ]; then
    tmux split-window -v -t "$SESSION_NAME:1.2" -c "${PATHS[2]}"
fi

if [ $PANE_COUNT -ge 4 ]; then
    tmux select-pane -t "$SESSION_NAME:1.1"
    tmux split-window -v -t "$SESSION_NAME:1.1" -c "${PATHS[3]}"
fi

# Show branch info in each pane
for i in $(seq 1 $PANE_COUNT); do
    BRANCH="${BRANCHES[$((i-1))]}"
    tmux send-keys -t "$SESSION_NAME:1.$i" "clear && echo '=== $BRANCH ===' && git status -sb" Enter
done

# Select first pane
tmux select-pane -t "$SESSION_NAME:1.1"

echo ""
echo "Worktree session ready!"
echo "Attach with: tmux attach -t $SESSION_NAME"
echo ""

# Attach
tmux attach-session -t "$SESSION_NAME"
