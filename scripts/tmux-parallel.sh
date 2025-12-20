#!/bin/bash
# tmux-parallel.sh - Launch parallel development sessions
# Usage: tmux-parallel.sh [session-name] [project1] [project2] [project3] [project4]

SESSION_NAME="${1:-parallel}"
shift

# Default projects if none specified
PROJECTS=("$@")
if [ ${#PROJECTS[@]} -eq 0 ]; then
    PROJECTS=(
        "$HOME/Projects/projectlavos-monorepo"
        "$HOME/Projects/guitar-model-lab"
        "$HOME/Projects/ai-talent-optimizer"
        "$HOME/Projects/phishguard-ui"
    )
fi

# Kill existing session if it exists
tmux kill-session -t "$SESSION_NAME" 2>/dev/null

# Create new session with first project
tmux new-session -d -s "$SESSION_NAME" -c "${PROJECTS[0]}"

# Split into 4 panes
tmux split-window -h -t "$SESSION_NAME" -c "${PROJECTS[1]:-$HOME}"
tmux split-window -v -t "$SESSION_NAME:1.2" -c "${PROJECTS[2]:-$HOME}"
tmux select-pane -t "$SESSION_NAME:1.1"
tmux split-window -v -t "$SESSION_NAME:1.1" -c "${PROJECTS[3]:-$HOME}"

# Label each pane with project name
for i in {1..4}; do
    if [ -n "${PROJECTS[$((i-1))]}" ]; then
        DIR="${PROJECTS[$((i-1))]}"
        NAME=$(basename "$DIR")
        tmux send-keys -t "$SESSION_NAME:1.$i" "cd '$DIR' && clear && echo '=== $NAME ===' && pwd" Enter
    fi
done

# Select first pane
tmux select-pane -t "$SESSION_NAME:1.1"

# Attach to session
tmux attach-session -t "$SESSION_NAME"
