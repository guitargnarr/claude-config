#!/usr/bin/env bash
# CLAUDE.md Duplicate Content Scanner
# Location: ~/.claude/scripts/check_duplicates.sh
# Purpose: Find duplicate content blocks across all CLAUDE.md files
# Created: 2025-10-24

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  CLAUDE.md Duplicate Content Scanner${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Find all CLAUDE.md files (excluding backups/archives)
echo -e "${CYAN}📁 Scanning for CLAUDE.md files...${NC}"
FILES=$(find ~/Projects ~/.claude -name "CLAUDE.md" -type f 2>/dev/null | \
    grep -v "backup\|archive\|Legacy\|node_modules\|\.Trash" | sort)

FILE_COUNT=$(echo "$FILES" | wc -l | tr -d ' ')
echo -e "   Found ${FILE_COUNT} active CLAUDE.md files"
echo ""

# Use Python for sophisticated duplicate detection
echo -e "${CYAN}🔎 Analyzing for duplicates...${NC}"
echo ""

/Library/Frameworks/Python.framework/Versions/3.14/bin/python3 << 'PYTHON_SCRIPT'
import os
import hashlib
from pathlib import Path
from collections import defaultdict

# Configuration
MIN_BLOCK_SIZE = 5  # Minimum lines for a block
HOME = Path.home()

# Find all CLAUDE.md files
files = []
for pattern in ["Projects/**/CLAUDE.md", ".claude/CLAUDE.md", ".claude/**/CLAUDE.md"]:
    files.extend(HOME.glob(pattern))

# Exclude backups/archives
files = [f for f in files if not any(x in str(f) for x in ['backup', 'archive', 'Legacy', 'node_modules', '.Trash'])]

# Track duplicates
block_locations = defaultdict(list)  # hash -> [(file, line_start, content)]
file_stats = defaultdict(lambda: {'total_lines': 0, 'duplicate_lines': 0})

# Analyze each file
for filepath in sorted(files):
    try:
        with open(filepath, 'r') as f:
            lines = f.readlines()

        file_stats[filepath]['total_lines'] = len(lines)

        # Extract 5-line blocks with sliding window
        for i in range(len(lines) - MIN_BLOCK_SIZE + 1):
            block = ''.join(lines[i:i+MIN_BLOCK_SIZE])
            # Skip blocks that are mostly empty or markdown formatting
            if len(block.strip()) < 20:
                continue

            block_hash = hashlib.md5(block.encode()).hexdigest()
            block_locations[block_hash].append((filepath, i+1, block))
    except Exception as e:
        print(f"⚠️  Error reading {filepath}: {e}")

# Find duplicates (blocks appearing in 2+ files)
duplicates = {h: locs for h, locs in block_locations.items() if len(set(str(l[0]) for l in locs)) >= 2}

# Calculate duplication stats per file
for block_hash, locations in duplicates.items():
    for filepath, line_num, content in locations:
        file_stats[filepath]['duplicate_lines'] += MIN_BLOCK_SIZE

# Generate report
print(f"{'='*80}")
print(f"DUPLICATE CONTENT ANALYSIS")
print(f"{'='*80}\n")

print(f"📊 Summary Statistics:\n")
print(f"   Total files scanned: {len(files)}")
print(f"   Duplicate blocks found: {len(duplicates)}")
print(f"   Files with duplicates: {len([f for f, s in file_stats.items() if s['duplicate_lines'] > 0])}")
print()

# Files sorted by duplication percentage
print(f"📈 Duplication by File:\n")
print(f"{'File':<50} {'Total':<8} {'Dup':<8} {'%':<8} {'Status':<10}")
print(f"{'-'*80}")

for filepath in sorted(file_stats.keys(), key=lambda f: -file_stats[f]['duplicate_lines']/max(file_stats[f]['total_lines'],1)):
    stats = file_stats[filepath]
    total = stats['total_lines']
    dup = stats['duplicate_lines']
    pct = (dup / total * 100) if total > 0 else 0

    # Display name
    display = str(filepath).replace(str(HOME), "~")
    if len(display) > 48:
        display = "..." + display[-45:]

    # Status indicator
    if pct >= 50:
        status = "🔴 HIGH"
    elif pct >= 25:
        status = "🟡 MEDIUM"
    elif pct > 0:
        status = "🟢 LOW"
    else:
        status = "✅ CLEAN"

    print(f"{display:<50} {total:<8} {dup:<8} {pct:>6.1f}% {status:<10}")

print()

# Show top duplicate blocks
print(f"🔝 Top 10 Most Duplicated Blocks:\n")
sorted_dups = sorted(duplicates.items(), key=lambda x: len(x[1]), reverse=True)[:10]

for idx, (block_hash, locations) in enumerate(sorted_dups, 1):
    file_count = len(set(str(l[0]) for l in locations))
    total_occurrences = len(locations)
    sample_content = locations[0][2].strip()[:100]

    print(f"{idx}. Appears in {file_count} files ({total_occurrences} times)")
    print(f"   Preview: {sample_content[:80]}...")

    # List files containing this block
    unique_files = sorted(set(str(l[0]).replace(str(HOME), "~") for l in locations))
    for f in unique_files[:3]:
        short_f = "/".join(f.split('/')[-3:]) if f.count('/') >= 3 else f
        print(f"     • {short_f}")
    if len(unique_files) > 3:
        print(f"     ... and {len(unique_files) - 3} more files")
    print()

# Recommendations
print(f"💡 Recommendations:\n")

high_dup_files = [f for f, s in file_stats.items() if (s['duplicate_lines']/max(s['total_lines'],1)) >= 0.5]
if high_dup_files:
    print(f"   🔴 HIGH PRIORITY: {len(high_dup_files)} files have >50% duplication")
    print(f"      → Consider creating templates or referencing global config")
    print()

# Suggest templateization
if len(sorted_dups) > 0:
    most_common = sorted_dups[0]
    file_count = len(set(str(l[0]) for l in most_common[1]))
    if file_count >= 3:
        print(f"   📋 TEMPLATE CANDIDATE: Content appearing in {file_count} files")
        print(f"      → This content should be extracted to a template")
        print()

# Savings estimate
total_original = sum(s['total_lines'] for s in file_stats.values())
total_duplicates = sum(s['duplicate_lines'] for s in file_stats.values())
if total_duplicates > 0:
    savings_pct = (total_duplicates / total_original * 100) if total_original > 0 else 0
    print(f"   💾 ESTIMATED SAVINGS: Removing duplicates would reduce total content by ~{total_duplicates} lines ({savings_pct:.1f}%)")
    print()

print(f"{'='*80}")
PYTHON_SCRIPT

echo ""
echo -e "${GREEN}✅ Duplicate scan complete${NC}"
