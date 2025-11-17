#!/bin/bash
#
# Parallel Development - Quick Start Script
# Next Run: Guitar Platform Features
#
# Usage: ./next-run-quickstart.sh
# This script prepares everything for the next parallel run
#

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Parallel Development Quick Start${NC}"
echo -e "${BLUE}  Guitar Platform Features - 4 Tasks${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

PROJECT="projectlavos-monorepo"
BRANCHES=(
  "feature/search-functionality"
  "feature/favorites-system"
  "feature/progress-tracking"
  "feature/social-sharing"
)

# Step 1: Check prerequisites
echo -e "${BLUE}[1/6]${NC} Checking prerequisites..."

if [[ ! -d "$HOME/Projects/$PROJECT" ]]; then
  echo -e "${YELLOW}Error:${NC} Project not found at ~/Projects/$PROJECT"
  exit 1
fi

if [[ ! -f "$HOME/.claude/scripts/launch_parallel.sh" ]]; then
  echo -e "${YELLOW}Error:${NC} Launcher script not found"
  exit 1
fi

if [[ ! -f "$HOME/.claude/scripts/parallel_metrics.py" ]]; then
  echo -e "${YELLOW}Error:${NC} Metrics script not found"
  exit 1
fi

echo -e "${GREEN}✓${NC} Prerequisites OK"
echo ""

# Step 2: Navigate to project
echo -e "${BLUE}[2/6]${NC} Navigating to project..."
cd "$HOME/Projects/$PROJECT"
echo -e "${GREEN}✓${NC} In $(pwd)"
echo ""

# Step 3: Check git status
echo -e "${BLUE}[3/6]${NC} Checking git status..."
if ! git diff-index --quiet HEAD --; then
  echo -e "${YELLOW}Warning:${NC} Uncommitted changes in main project"
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi
echo -e "${GREEN}✓${NC} Git status OK"
echo ""

# Step 4: Create worktrees
echo -e "${BLUE}[4/6]${NC} Creating worktrees..."

for branch in "${BRANCHES[@]}"; do
  if git show-ref --verify --quiet "refs/heads/$branch"; then
    echo -e "${YELLOW}Warning:${NC} Branch $branch already exists, skipping"
  else
    echo "Creating $branch..."
    git worktree add "$HOME/Projects/.worktrees/$PROJECT/$branch" -b "$branch" 2>&1 | grep -v "Preparing worktree" || true
  fi
done

echo -e "${GREEN}✓${NC} Worktrees ready"
echo ""

# Step 5: Initialize metrics
echo -e "${BLUE}[5/6]${NC} Initializing metrics..."

python3 "$HOME/.claude/scripts/parallel_metrics.py" start \
  --project "guitar-platform-features" \
  --tasks 4 \
  --estimate 16

echo -e "${GREEN}✓${NC} Metrics initialized"
echo ""

# Step 6: Display next steps
echo -e "${BLUE}[6/6]${NC} Setup complete!"
echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Next Steps:${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo "1. Open 4 terminal windows/tabs"
echo ""
echo "2. In each terminal, run:"
echo ""
echo -e "${GREEN}   # Terminal 1 (Search)${NC}"
echo "   cd ~/Projects/.worktrees/$PROJECT/feature/search-functionality"
echo "   claude"
echo "   # Then paste prompt from next-parallel-run-prompts.md (Terminal 1)"
echo ""
echo -e "${GREEN}   # Terminal 2 (Favorites)${NC}"
echo "   cd ~/Projects/.worktrees/$PROJECT/feature/favorites-system"
echo "   claude"
echo "   # Then paste prompt from next-parallel-run-prompts.md (Terminal 2)"
echo ""
echo -e "${GREEN}   # Terminal 3 (Progress)${NC}"
echo "   cd ~/Projects/.worktrees/$PROJECT/feature/progress-tracking"
echo "   claude"
echo "   # Then paste prompt from next-parallel-run-prompts.md (Terminal 3)"
echo ""
echo -e "${GREEN}   # Terminal 4 (Social)${NC}"
echo "   cd ~/Projects/.worktrees/$PROJECT/feature/social-sharing"
echo "   claude"
echo "   # Then paste prompt from next-parallel-run-prompts.md (Terminal 4)"
echo ""
echo "3. Monitor every 15-20 minutes"
echo ""
echo "4. Log completions:"
echo "   python3 ~/.claude/scripts/parallel_metrics.py complete --task-id X --pr-created yes"
echo ""
echo "5. When all done:"
echo "   python3 ~/.claude/scripts/parallel_metrics.py end --time-spent X.X"
echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo "Prompts available at:"
echo "  ~/.claude/reference/next-parallel-run-prompts.md"
echo ""
echo "Pre-flight checklist:"
echo "  ~/.claude/reference/parallel-preflight-checklist.md"
echo ""
echo -e "${GREEN}Good luck!${NC}"
echo ""
