#!/bin/bash
# Test 1: Verify CLAUDE.md memory loads

echo "========================================="
echo "TEST 1: Memory Feature (CLAUDE.md)"
echo "========================================="

# Test that Claude knows Matthew's background from memory
# This would need to be run in an actual Claude session
# For now, we verify the file exists and is readable

if [ -f ~/.claude/CLAUDE.md ]; then
    echo "✓ CLAUDE.md exists"
    
    if grep -q "Matthew David Scott" ~/.claude/CLAUDE.md; then
        echo "✓ Contains Matthew's name"
    fi
    
    if grep -q "Business Analyst" ~/.claude/CLAUDE.md; then
        echo "✓ Contains professional title"
    fi
    
    if grep -q "Humana" ~/.claude/CLAUDE.md; then
        echo "✓ Contains employer information"
    fi
    
    if grep -q "ollama run" ~/.claude/CLAUDE.md; then
        echo "✓ Contains Ollama model references"
    fi
    
    lines=$(wc -l < ~/.claude/CLAUDE.md)
    echo "✓ File has $lines lines of context"
    
    echo ""
    echo "MEMORY TEST: PASS"
    echo "Note: Full verification requires starting new Claude session"
else
    echo "✗ FAIL: CLAUDE.md not found"
    exit 1
fi
