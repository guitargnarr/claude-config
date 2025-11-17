---
description: First-pass AI code review on pull request
argument-hint: <pr-number>
allowed-tools: Bash(gh:*), Read, Grep
---

# First-Pass Code Review

PR Number: $1

## Comprehensive Review Process:

1. **Fetch PR Details**
   ```bash
   gh pr view $1 --json title,body,files,additions,deletions,commits,baseRefName
   ```

2. **Analyze All Changed Files**
   - Read every file that was modified
   - Understand the context and purpose of changes
   - Check related files (tests, documentation)

3. **Code Quality Analysis**

   **Check for**:
   - **Code Smells**
     - Duplicated code (DRY violations)
     - Long functions (>50 lines)
     - Complex conditionals (>3 levels deep)
     - Magic numbers (hardcoded values)
     - Poor naming (unclear variable/function names)

   - **Missing Tests**
     - New functions without corresponding tests
     - Modified logic without updated tests
     - Edge cases not covered
     - Integration tests missing

   - **Security Issues**
     - SQL injection vulnerabilities
     - XSS attack vectors
     - Secrets/API keys in code
     - Unsafe user input handling
     - Missing authentication/authorization checks

   - **Performance Concerns**
     - N+1 query problems
     - Inefficient algorithms (O(n²) when O(n) possible)
     - Memory leaks
     - Missing indexes on database queries
     - Unnecessary API calls in loops

   - **Documentation Gaps**
     - Missing docstrings on public functions
     - Outdated comments
     - README not updated
     - API changes not documented

   - **Breaking Changes**
     - API signature changes
     - Removed public functions
     - Changed data formats
     - Database schema migrations without backwards compatibility

4. **Generate Review Comment**

   **Format**:
   ```markdown
   ## First-Pass AI Review

   ### Overall Assessment
   [APPROVE / REQUEST_CHANGES / COMMENT]

   ### Code Quality: [Score/10]

   ### Issues Found

   #### 🔴 Critical (Must Fix)
   - **File:Line** - Description of critical issue
   - Example: `auth.py:42` - SQL injection vulnerability in user input

   #### 🟡 Important (Should Fix)
   - **File:Line** - Description of important issue
   - Example: `api.py:156` - Missing error handling on API call

   #### 🟢 Minor (Consider Fixing)
   - **File:Line** - Description of minor issue
   - Example: `utils.py:89` - Function could be split for better readability

   ### Missing Tests
   - [ ] Test for `new_function()` in module.py
   - [ ] Integration test for API endpoint
   - [ ] Edge case: empty input handling

   ### Suggestions
   1. [Specific improvement recommendation]
   2. [Architectural suggestion if applicable]
   3. [Performance optimization opportunity]

   ### Positive Highlights
   - Well-structured code organization
   - Good test coverage for [specific module]
   - Clear documentation

   ---
   🤖 First-pass review by Claude Code
   👤 Human review still required before merge
   ```

5. **Post Review**
   ```bash
   gh pr review $1 --comment -b "[generated review]"
   ```

6. **Summary**
   - Show review posted confirmation
   - Display critical issues count
   - Suggest next action (fix issues, request human review, etc.)

## Safety Notes:

- This is a **FIRST-PASS** review only
- **Human review always required** for merge approval
- Focus on objective issues (linting, security, tests)
- Don't block on subjective style preferences
- Provide constructive suggestions, not just criticism

## Example Usage:

```bash
# Review PR #42
/review-pr 42

# After fixing issues, re-review
/review-pr 42
```

Execute the comprehensive first-pass code review now.
