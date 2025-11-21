#!/bin/bash
# verify-inventory.sh
# Purpose: Check all tools in MASTER_INDEX.md actually exist at claimed paths
# Verification Level: Level 0 (existence only)
# Last Updated: 2025-11-19

echo "🔍 Verifying AI-Native Development Toolkit Inventory..."
echo ""

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
INDEX_FILE="${HOME}/.claude/MASTER_INDEX.md"

if [ ! -f "$INDEX_FILE" ]; then
    echo "❌ MASTER_INDEX.md not found at $INDEX_FILE"
    exit 1
fi

# Counters
total=0
exists=0
missing=0

# Arrays to track results
existing_files=()
missing_files=()

echo "📋 Checking Core Documentation..."
echo "─────────────────────────────────"

# Core documentation files
core_docs=(
    "${HOME}/.claude/CLAUDE.md"
    "${HOME}/.claude/context/personal.md"
    "${HOME}/.claude/context/current-status.md"
    "${HOME}/.claude/context/working-philosophy.md"
    "${HOME}/.claude/reference/parallel-development-playbook.md"
    "${HOME}/.claude/archive/WORKFLOWS.md"
    "${HOME}/.claude/archive/SYSTEM_DOCUMENTATION.md"
    "${HOME}/.claude/archive/PERMISSIONS_GUIDE.md"
)

for file in "${core_docs[@]}"; do
    total=$((total + 1))
    if [ -f "$file" ]; then
        echo "✅ $(basename "$file")"
        exists=$((exists + 1))
        existing_files+=("$file")
    else
        echo "❌ $(basename "$file") MISSING"
        missing=$((missing + 1))
        missing_files+=("$file")
    fi
done

echo ""
echo "🔧 Checking Scripts (~/.claude/scripts/)..."
echo "──────────────────────────────────────────"

# Scripts
scripts=(
    "launch_parallel.sh"
    "worktree_manager.py"
    "cleanup-worktrees.sh"
    "parallel_metrics.py"
    "merge-parallel-prs.sh"
    "test_coordination.py"
    "validate_environment.py"
    "verify_audit.py"
    "check_duplicates.sh"
    "init_audit_system.py"
    "coordination_sync.py"
    "sanitize_repo.py"
    "get_date.sh"
)

for script in "${scripts[@]}"; do
    total=$((total + 1))
    file="${HOME}/.claude/scripts/${script}"
    if [ -f "$file" ]; then
        echo "✅ $script"
        exists=$((exists + 1))
        existing_files+=("$file")
    else
        echo "❌ $script MISSING"
        missing=$((missing + 1))
        missing_files+=("$file")
    fi
done

echo ""
echo "⚡ Checking Slash Commands (~/.claude/commands/)..."
echo "──────────────────────────────────────────────────"

# Count slash commands
if [ -d "${HOME}/.claude/commands" ]; then
    command_count=$(find "${HOME}/.claude/commands" -name "*.md" | wc -l | tr -d ' ')
    echo "Found $command_count slash command files"
    total=$((total + 1))
    exists=$((exists + 1))
else
    echo "❌ Commands directory not found"
    total=$((total + 1))
    missing=$((missing + 1))
fi

echo ""
echo "🤖 Checking Custom Agents (~/.claude/agents/)..."
echo "─────────────────────────────────────────────────"

# Agents
agents=(
    "code-analyzer.md"
    "code-automation.md"
    "documentation-reader.md"
    "interview-prep.md"
    "repo-scanner.md"
    "security-auditor.md"
)

for agent in "${agents[@]}"; do
    total=$((total + 1))
    file="${HOME}/.claude/agents/${agent}"
    if [ -f "$file" ]; then
        echo "✅ $agent"
        exists=$((exists + 1))
        existing_files+=("$file")
    else
        echo "❌ $agent MISSING"
        missing=$((missing + 1))
        missing_files+=("$file")
    fi
done

echo ""
echo "🎯 Checking Skills (~/.claude/skills/)..."
echo "──────────────────────────────────────────"

# Skills (directories)
skills=(
    "job-application-tracker"
    "interview-prep-auto"
    "resume-customizer"
    "cover-letter-generator"
)

for skill in "${skills[@]}"; do
    total=$((total + 1))
    dir="${HOME}/.claude/skills/${skill}"
    if [ -d "$dir" ]; then
        echo "✅ $skill/"
        exists=$((exists + 1))
    else
        echo "❌ $skill/ MISSING"
        missing=$((missing + 1))
        missing_files+=("$dir")
    fi
done

echo ""
echo "📊 Summary"
echo "═══════════════════════════════════════════"
echo "Total items checked: $total"
echo "✅ Existing: $exists ($(( exists * 100 / total ))%)"
echo "❌ Missing: $missing ($(( missing * 100 / total ))%)"

if [ $missing -gt 0 ]; then
    echo ""
    echo "⚠️  Missing files:"
    for file in "${missing_files[@]}"; do
        echo "   - $file"
    done
    echo ""
    echo "Recommendation: Remove missing items from MASTER_INDEX.md or create them"
fi

echo ""
if [ $missing -eq 0 ]; then
    echo "✨ All inventory items exist!"
    exit 0
else
    echo "⚠️  Some items are missing"
    exit 1
fi
