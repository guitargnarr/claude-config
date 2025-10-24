#!/bin/bash
# Test 2: Verify slash commands are properly configured

echo "========================================="
echo "TEST 2: Slash Commands"
echo "========================================="

commands=(coach code analyze tactic louisville quick humanize test-models)
pass=0
total=${#commands[@]}

for cmd in "${commands[@]}"; do
    if [ -f ~/.claude/commands/$cmd.md ]; then
        echo "✓ /$cmd command file exists"
        ((pass++))
    else
        echo "✗ /$cmd command file missing"
    fi
done

echo ""
echo "SLASH COMMANDS TEST: $pass/$total passed"
[ $pass -eq $total ] && echo "STATUS: PASS" || echo "STATUS: FAIL"
