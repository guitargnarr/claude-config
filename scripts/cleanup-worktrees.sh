#!/bin/bash
# Worktree Cleanup Script for Parallel Development
# Safely removes merged worktrees and cleans up stale references

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Worktree Cleanup Script ===${NC}\n"

# Get the main repo path
if [ -z "$1" ]; then
    REPO_PATH="$HOME/Projects/projectlavos-monorepo"
else
    REPO_PATH="$1"
fi

# Verify repo exists
if [ ! -d "$REPO_PATH/.git" ]; then
    echo -e "${RED}Error: $REPO_PATH is not a git repository${NC}"
    exit 1
fi

echo -e "${BLUE}Repository:${NC} $REPO_PATH\n"

# Change to repo directory
cd "$REPO_PATH"

# Fetch latest from remote
echo -e "${BLUE}Fetching latest from remote...${NC}"
git fetch origin --prune

# Get current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo -e "${BLUE}Current branch:${NC} $CURRENT_BRANCH\n"

# Update main/master
MAIN_BRANCH="main"
if ! git show-ref --verify --quiet refs/heads/main; then
    MAIN_BRANCH="master"
fi

echo -e "${BLUE}Updating $MAIN_BRANCH...${NC}"
git checkout $MAIN_BRANCH 2>/dev/null || echo "Already on $MAIN_BRANCH"
git pull origin $MAIN_BRANCH

echo -e "\n${BLUE}=== Active Worktrees ===${NC}"
git worktree list

echo -e "\n${BLUE}=== Checking for merged branches ===${NC}\n"

# Get list of merged branches (excluding main/master/HEAD)
MERGED_BRANCHES=$(git branch --merged $MAIN_BRANCH | grep -v "^\*" | grep -v "$MAIN_BRANCH" | grep -v "master" | sed 's/^[ \t]*//')

if [ -z "$MERGED_BRANCHES" ]; then
    echo -e "${GREEN}No merged branches to clean up${NC}"
else
    echo "Merged branches:"
    echo "$MERGED_BRANCHES" | while read branch; do
        echo -e "  ${YELLOW}$branch${NC}"
    done
fi

echo -e "\n${BLUE}=== Removing worktrees for merged branches ===${NC}\n"

# Process each worktree
git worktree list --porcelain | grep "worktree" | cut -d' ' -f2 | while read worktree_path; do
    # Skip main repo
    if [ "$worktree_path" = "$REPO_PATH" ]; then
        continue
    fi

    # Get branch for this worktree
    worktree_branch=$(git worktree list --porcelain | grep -A2 "worktree $worktree_path" | grep "branch" | cut -d'/' -f3-)

    if [ -z "$worktree_branch" ]; then
        echo -e "${YELLOW}⚠ Worktree at $worktree_path has no branch (detached HEAD?)${NC}"
        continue
    fi

    # Check if branch is merged
    if echo "$MERGED_BRANCHES" | grep -q "^$worktree_branch$"; then
        echo -e "${GREEN}✓ Removing worktree for merged branch: $worktree_branch${NC}"

        # Check if directory exists
        if [ -d "$worktree_path" ]; then
            git worktree remove "$worktree_path" 2>/dev/null || {
                echo -e "${YELLOW}  ⚠ Worktree has uncommitted changes, use --force to remove${NC}"
                read -p "  Force remove? (y/N): " confirm
                if [[ $confirm == [yY] ]]; then
                    git worktree remove --force "$worktree_path"
                    echo -e "${GREEN}  ✓ Force removed${NC}"
                else
                    echo -e "${YELLOW}  Skipped${NC}"
                    continue
                fi
            }
        else
            echo -e "${YELLOW}  Directory doesn't exist, will prune reference${NC}"
        fi

        # Delete local branch
        echo -e "  Deleting local branch: $worktree_branch"
        git branch -d "$worktree_branch" 2>/dev/null || {
            echo -e "${YELLOW}  ⚠ Branch not fully merged or already deleted${NC}"
        }
    else
        echo -e "${BLUE}○ Keeping active worktree: $worktree_branch${NC}"
    fi
done

# Prune stale worktree references
echo -e "\n${BLUE}=== Pruning stale worktree references ===${NC}"
git worktree prune -v

# Clean up any remaining merged branches
echo -e "\n${BLUE}=== Cleaning up remaining merged branches ===${NC}\n"
if [ -n "$MERGED_BRANCHES" ]; then
    echo "$MERGED_BRANCHES" | while read branch; do
        if git show-ref --verify --quiet refs/heads/$branch; then
            echo -e "${GREEN}✓ Deleting branch: $branch${NC}"
            git branch -d "$branch" 2>/dev/null || echo -e "${YELLOW}  Already deleted or not found${NC}"
        fi
    done
else
    echo -e "${GREEN}No branches to clean up${NC}"
fi

# Show final state
echo -e "\n${BLUE}=== Final Worktree State ===${NC}"
git worktree list

# Check for running Claude instances in deleted worktrees
echo -e "\n${BLUE}=== Checking for Claude instances in worktrees ===${NC}\n"
CLAUDE_PIDS=$(ps aux | grep "claude$" | grep -v grep | awk '{print $2}')
if [ -n "$CLAUDE_PIDS" ]; then
    echo -e "${YELLOW}Found running Claude instances:${NC}"
    echo "$CLAUDE_PIDS" | while read pid; do
        echo -e "  PID: ${YELLOW}$pid${NC}"
    done
    echo -e "\n${YELLOW}Tip: Use 'kill <PID>' to stop instances in deleted worktrees${NC}"
else
    echo -e "${GREEN}No running Claude instances found${NC}"
fi

echo -e "\n${GREEN}=== Cleanup Complete ===${NC}"
