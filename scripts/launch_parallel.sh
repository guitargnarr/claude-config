#!/bin/bash
#
# Parallel Development Terminal Launcher
# Automates creation of worktrees and launching of parallel Claude Code sessions
#
# Usage:
#   ./launch_parallel.sh <project> <branch1> <branch2> <branch3> <branch4> [base-branch]
#
# Example:
#   ./launch_parallel.sh projectlavos-backend \
#       feature/auth-ui \
#       feature/api-endpoints \
#       feature/testing \
#       feature/docs \
#       main
#
# Requirements:
#   - Terminal.app or iTerm2
#   - Git worktree support
#   - ~/.claude/scripts/worktree_manager.py
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
WORKTREE_SCRIPT="$HOME/.claude/scripts/worktree_manager.py"
PROJECTS_DIR="$HOME/Projects"
WORKTREES_DIR="$HOME/Projects/.worktrees"

# Function to print colored output
print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Function to check prerequisites
check_prerequisites() {
    print_info "Checking prerequisites..."

    # Check if worktree manager exists
    if [[ ! -f "$WORKTREE_SCRIPT" ]]; then
        print_error "Worktree manager not found at $WORKTREE_SCRIPT"
        exit 1
    fi

    # Check if project directory exists
    if [[ ! -d "$PROJECTS_DIR/$PROJECT" ]]; then
        print_error "Project directory not found: $PROJECTS_DIR/$PROJECT"
        exit 1
    fi

    # Check if it's a git repository
    if [[ ! -d "$PROJECTS_DIR/$PROJECT/.git" ]]; then
        print_error "$PROJECT is not a git repository"
        exit 1
    fi

    print_success "Prerequisites check passed"
}

# Function to create worktrees
create_worktrees() {
    print_info "Creating worktrees..."

    cd "$PROJECTS_DIR/$PROJECT"

    for branch in "${BRANCHES[@]}"; do
        print_info "Creating worktree for $branch..."

        # Use the worktree manager to create worktree
        if python3 "$WORKTREE_SCRIPT" create "$branch" "$BASE_BRANCH" 2>&1; then
            print_success "Worktree created: $branch"
        else
            print_warning "Worktree may already exist: $branch"
        fi
    done

    print_success "All worktrees ready"
}

# Function to detect terminal application
detect_terminal() {
    if [[ -d "/Applications/iTerm.app" ]]; then
        echo "iterm"
    else
        echo "terminal"
    fi
}

# Function to launch iTerm2 windows
launch_iterm() {
    print_info "Launching iTerm2 windows..."

    local project=$1
    shift
    local branches=("$@")

    for i in "${!branches[@]}"; do
        local branch="${branches[$i]}"
        local worktree_path="$WORKTREES_DIR/$project/$branch"

        # Create new iTerm2 window with Claude Code
        osascript <<EOF
tell application "iTerm"
    create window with default profile
    tell current session of current window
        write text "cd '$worktree_path'"
        write text "echo ''"
        write text "echo '═══════════════════════════════════════════════════════════'"
        write text "echo '  Terminal $((i+1))/4: $branch'"
        write text "echo '  Project: $project'"
        write text "echo '  Worktree: $worktree_path'"
        write text "echo '═══════════════════════════════════════════════════════════'"
        write text "echo ''"
        write text "echo 'Ready to start Claude Code session.'"
        write text "echo 'Type: claude'"
        write text "echo ''"
    end tell
end tell
EOF
    done

    print_success "Launched $i iTerm2 windows"
}

# Function to launch Terminal.app windows
launch_terminal() {
    print_info "Launching Terminal.app windows..."

    local project=$1
    shift
    local branches=("$@")

    for i in "${!branches[@]}"; do
        local branch="${branches[$i]}"
        local worktree_path="$WORKTREES_DIR/$project/$branch"

        # Create new Terminal.app window with Claude Code
        osascript <<EOF
tell application "Terminal"
    do script "cd '$worktree_path' && clear && echo '' && echo '═══════════════════════════════════════════════════════════' && echo '  Terminal $((i+1))/4: $branch' && echo '  Project: $project' && echo '  Worktree: $worktree_path' && echo '═══════════════════════════════════════════════════════════' && echo '' && echo 'Ready to start Claude Code session.' && echo 'Type: claude' && echo ''"
    activate
end tell
EOF

        # Small delay to ensure windows open in order
        sleep 0.5
    done

    print_success "Launched ${#branches[@]} Terminal.app windows"
}

# Function to print post-launch instructions
print_instructions() {
    echo ""
    echo "═══════════════════════════════════════════════════════════"
    echo "  🚀 PARALLEL DEVELOPMENT SESSION READY"
    echo "═══════════════════════════════════════════════════════════"
    echo ""
    echo "Next steps:"
    echo "  1. Switch to each terminal window"
    echo "  2. Type 'claude' to start Claude Code session"
    echo "  3. Paste your prepared prompts (use v3 template)"
    echo "  4. Monitor progress every 15-20 minutes"
    echo ""
    echo "Worktrees created:"
    for branch in "${BRANCHES[@]}"; do
        echo "  • $WORKTREES_DIR/$PROJECT/$branch"
    done
    echo ""
    echo "When complete:"
    echo "  • Check PRs: gh pr list"
    echo "  • Clean up: /worktree remove <branch>"
    echo ""
    echo "Track metrics:"
    echo "  python3 ~/.claude/scripts/parallel_metrics.py start \\"
    echo "    --project '$PROJECT' \\"
    echo "    --tasks ${#BRANCHES[@]} \\"
    echo "    --estimate <hours>"
    echo ""
    echo "═══════════════════════════════════════════════════════════"
    echo ""
}

# Main execution
main() {
    # Parse arguments
    if [[ $# -lt 5 ]]; then
        echo "Usage: $0 <project> <branch1> <branch2> <branch3> <branch4> [base-branch]"
        echo ""
        echo "Example:"
        echo "  $0 projectlavos-backend \\"
        echo "    feature/auth-ui \\"
        echo "    feature/api-endpoints \\"
        echo "    feature/testing \\"
        echo "    feature/docs \\"
        echo "    main"
        exit 1
    fi

    PROJECT=$1
    BRANCHES=("$2" "$3" "$4" "$5")
    BASE_BRANCH=${6:-main}

    echo ""
    echo "═══════════════════════════════════════════════════════════"
    echo "  Parallel Development Launcher"
    echo "═══════════════════════════════════════════════════════════"
    echo "  Project: $PROJECT"
    echo "  Base branch: $BASE_BRANCH"
    echo "  Branches:"
    for branch in "${BRANCHES[@]}"; do
        echo "    • $branch"
    done
    echo "═══════════════════════════════════════════════════════════"
    echo ""

    # Execute steps
    check_prerequisites
    create_worktrees

    # Detect and launch appropriate terminal
    TERMINAL_APP=$(detect_terminal)

    if [[ "$TERMINAL_APP" == "iterm" ]]; then
        launch_iterm "$PROJECT" "${BRANCHES[@]}"
    else
        launch_terminal "$PROJECT" "${BRANCHES[@]}"
    fi

    print_instructions
}

# Run main function
main "$@"
