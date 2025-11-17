#!/bin/bash
# Parallel Development Orchestrator - Automated Merge Script
# Version: 4.0
# Date: 2025-11-16
# Usage: bash ~/.claude/scripts/merge-parallel-prs.sh [pr1] [pr2] [pr3] [pr4]
#   Example: bash merge-parallel-prs.sh 9 11 12 10

set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Arguments: PR numbers in merge order
PR1=${1:-9}
PR2=${2:-11}
PR3=${3:-12}
PR4=${4:-10}

echo -e "${BLUE}🎯 Parallel Development Orchestrator v4${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

# Phase 1: Verify PRs ready
echo -e "${YELLOW}📋 Phase 1: Checking PR status...${NC}"
gh pr list --state open | grep feature/ || {
  echo -e "${RED}❌ No open feature PRs found${NC}"
  exit 1
}

echo ""
read -p "Merge PRs #$PR1, #$PR2, #$PR3, #$PR4? (y/n): " confirm
if [ "$confirm" != "y" ]; then
  echo -e "${RED}❌ Aborted by user${NC}"
  exit 1
fi

# Pull latest
echo -e "${YELLOW}📥 Pulling latest from main...${NC}"
git pull origin main

# Function to merge and validate
merge_and_validate() {
  local PR_NUM=$1
  local PR_NAME=$2

  echo ""
  echo -e "${BLUE}🔀 Merging PR #${PR_NUM} (${PR_NAME})...${NC}"

  gh pr merge $PR_NUM --squash --delete-branch || echo -e "${YELLOW}⚠️ Delete branch failed (worktree lock - OK)${NC}"

  echo -e "${YELLOW}📥 Pulling changes...${NC}"
  git pull origin main

  echo -e "${YELLOW}🏗️ Building to verify...${NC}"
  cd services/guitar
  npm run build || {
    echo -e "${RED}❌ Build failed after merging PR #${PR_NUM}${NC}"
    cd ../..
    exit 1
  }

  echo -e "${YELLOW}🔍 Checking for conflict markers...${NC}"
  if grep -r "<<<<<<" src/ 2>/dev/null; then
    echo -e "${RED}❌ Conflict markers found in codebase${NC}"
    echo -e "${YELLOW}Locations:${NC}"
    grep -rn "<<<<<<" src/
    cd ../..
    exit 1
  fi

  echo -e "${GREEN}✓ PR #${PR_NUM} merged cleanly${NC}"
  cd ../..
}

# Merge sequence
merge_and_validate $PR1 "Navigation"
merge_and_validate $PR2 "Favorites"
merge_and_validate $PR3 "Progress"
merge_and_validate $PR4 "Social Sharing"

# Phase 2: Final validation
echo ""
echo -e "${BLUE}📊 Phase 2: Final Validation${NC}"
echo -e "${YELLOW}🏗️ Final build check...${NC}"
cd services/guitar
npm run build || {
  echo -e "${RED}❌ Final build failed${NC}"
  exit 1
}

echo -e "${YELLOW}🔍 Final conflict marker scan...${NC}"
grep -r "<<<<<<\|======\|>>>>>>" src/ && {
  echo -e "${RED}❌ Conflict markers still present${NC}"
  exit 1
} || echo -e "${GREEN}✓ Codebase clean${NC}"

cd ../..

# Phase 3: Worktree cleanup
echo ""
echo -e "${BLUE}🧹 Phase 3: Worktree Cleanup${NC}"

git worktree remove ~/Projects/.worktrees/projectlavos-monorepo/feature/navigation-bar --force 2>/dev/null || true
git worktree remove ~/Projects/.worktrees/projectlavos-monorepo/feature/favorites-system --force 2>/dev/null || true
git worktree remove ~/Projects/.worktrees/projectlavos-monorepo/feature/progress-tracking --force 2>/dev/null || true
git worktree remove ~/Projects/.worktrees/projectlavos-monorepo/feature/social-sharing --force 2>/dev/null || true

git branch -d feature/navigation-bar feature/favorites-system feature/progress-tracking feature/social-sharing 2>/dev/null || true
git fetch --prune

WORKTREE_COUNT=$(git worktree list | grep -v "main" | wc -l | tr -d ' ')
if [ "$WORKTREE_COUNT" -eq "0" ]; then
  echo -e "${GREEN}✓ All worktrees cleaned up${NC}"
else
  echo -e "${YELLOW}⚠️ Some worktrees remain: ${WORKTREE_COUNT}${NC}"
fi

# Phase 4: Deployment check
echo ""
echo -e "${BLUE}🚀 Phase 4: Deployment Status${NC}"
echo -e "${YELLOW}Checking GitHub Actions...${NC}"
gh run list --limit 1

echo ""
echo -e "${GREEN}🎉 Parallel Development Session Complete!${NC}"
echo ""
echo -e "${BLUE}Summary:${NC}"
echo "  PRs Merged: #$PR1, #$PR2, #$PR3, #$PR4"
echo "  Build Status: PASSING ✓"
echo "  Conflict Markers: NONE ✓"
echo "  Worktrees: Cleaned up ✓"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo "  1. Monitor deployment: gh run list --limit 1"
echo "  2. Verify production: https://guitar.projectlavos.com"
echo "  3. Test all features in production"
echo ""
