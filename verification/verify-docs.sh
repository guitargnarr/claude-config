#!/bin/bash
# verify-docs.sh
# Purpose: Check documentation accuracy - broken @ imports, stale dates, line counts
# Verification Level: Metadata accuracy
# Last Updated: 2025-11-19

echo "📚 Verifying Documentation Accuracy..."
echo ""

issues_found=0

echo "🔗 Checking @ Import Paths..."
echo "───────────────────────────────"

# Find all CLAUDE.md files
claude_files=$(find ~/.claude ~/Projects ~/Desktop -name "CLAUDE.md" 2>/dev/null)

for file in $claude_files; do
    # Extract @ imports from file
    imports=$(grep -o '@[~A-Za-z0-9_/./-]*' "$file" 2>/dev/null)

    if [ -n "$imports" ]; then
        # Check each import
        while IFS= read -r import; do
            # Remove @ and expand ~ if present
            path="${import#@}"
            expanded_path="${path/#\~/$HOME}"

            if [ ! -f "$expanded_path" ] && [ ! -d "$expanded_path" ]; then
                echo "❌ Broken import in $(basename "$(dirname "$file")")/$(basename "$file")"
                echo "   Import: $import"
                echo "   Path: $expanded_path (NOT FOUND)"
                issues_found=$((issues_found + 1))
            fi
        done <<< "$imports"
    fi
done

echo ""
echo "📅 Checking Temporal File Dates..."
echo "──────────────────────────────────"

# Check current-status.md for stale date
current_status="${HOME}/.claude/context/current-status.md"
if [ -f "$current_status" ]; then
    # Extract date from file (assumes format: **TODAY: Day, Month DD, YYYY**)
    file_date=$(grep "^\*\*TODAY:" "$current_status" | sed 's/.*: //; s/\*\*.*//' | tr -d '[:space:]')
    today=$(date +"%A,%B%d,%Y" | tr -d '[:space:]')

    # Simple comparison (not perfect but catches obvious staleness)
    modified_date=$(stat -f "%Sm" -t "%Y-%m-%d" "$current_status" 2>/dev/null || stat -c "%y" "$current_status" 2>/dev/null | cut -d' ' -f1)
    today_date=$(date +"%Y-%m-%d")

    # Calculate days difference
    if command -v gdate > /dev/null; then
        # macOS with GNU coreutils
        days_diff=$(( ( $(gdate -d "$today_date" +%s) - $(gdate -d "$modified_date" +%s) ) / 86400 ))
    elif [ "$(uname)" = "Darwin" ]; then
        # macOS without GNU coreutils (less accurate)
        days_diff=$(( ( $(date -j -f "%Y-%m-%d" "$today_date" +%s) - $(date -j -f "%Y-%m-%d" "$modified_date" +%s) ) / 86400 ))
    else
        # Linux
        days_diff=$(( ( $(date -d "$today_date" +%s) - $(date -d "$modified_date" +%s) ) / 86400 ))
    fi

    if [ $days_diff -gt 3 ]; then
        echo "⚠️  current-status.md is $days_diff days old"
        echo "   Last modified: $modified_date"
        echo "   Today: $today_date"
        echo "   Recommendation: Update date to current"
        issues_found=$((issues_found + 1))
    else
        echo "✅ current-status.md is current ($days_diff days old)"
    fi
else
    echo "❌ current-status.md not found"
    issues_found=$((issues_found + 1))
fi

echo ""
echo "📏 Checking CLAUDE.md Line Counts..."
echo "────────────────────────────────────"

# Check against documented targets
check_line_count() {
    local file=$1
    local target=$2
    local max_acceptable=$3

    if [ -f "$file" ]; then
        lines=$(wc -l < "$file" | tr -d ' ')
        if [ "$lines" -gt "$max_acceptable" ]; then
            echo "⚠️  $(basename "$file"): $lines lines (target: $target, max acceptable: $max_acceptable)"
            issues_found=$((issues_found + 1))
        else
            echo "✅ $(basename "$file"): $lines lines (within limits)"
        fi
    else
        echo "❌ $(basename "$file"): NOT FOUND"
        issues_found=$((issues_found + 1))
    fi
}

check_line_count "${HOME}/.claude/CLAUDE.md" 40 50
check_line_count "${HOME}/Projects/projectlavos-monorepo/CLAUDE.md" 28 80
check_line_count "${HOME}/Projects/projectlavos-monorepo/services/guitar/CLAUDE.md" 60 80

echo ""
echo "📊 Summary"
echo "═════════════════════════════════"

if [ $issues_found -eq 0 ]; then
    echo "✅ No documentation issues found!"
    exit 0
else
    echo "⚠️  Found $issues_found issue(s)"
    echo ""
    echo "Recommendations:"
    echo "  - Fix broken @ import paths"
    echo "  - Update stale temporal files"
    echo "  - Reduce oversized CLAUDE.md files"
    exit 1
fi
