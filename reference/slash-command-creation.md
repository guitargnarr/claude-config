# Custom Slash Commands

## Create Commands for Repetitive Workflows

**Location:** `.claude/commands/` in project root

## Example: Fix GitHub Issue

**File:** `.claude/commands/fix-github-issue.md`

```markdown
Please analyze and fix GitHub issue: $ARGUMENTS

Steps:
1. Use `gh issue view` to get details
2. Understand the problem
3. Search codebase for relevant files
4. Implement necessary changes
5. Write and run tests
6. Ensure linting and type checking pass
7. Create descriptive commit message
8. Push and create PR
```

**Usage:** `/fix-github-issue 1234`

## Example: Verification Command

**File:** `.claude/commands/verify-status.md`

```markdown
# Verify Task Status

Perform comprehensive verification of completion.

## Instructions

1. **Status Assessment**: Run git status, git log
2. **Build Verification**: Run build command, execute tests
3. **Functional Verification**: Test main features, verify APIs
4. **Security Check**: Run security audit, check vulnerabilities
5. **Deployment Readiness**: Verify production build, check configs
6. **Cross-Reference Claims**: Verify claimed features exist and work

## Output Format
- ✅ VERIFIED: Items confirmed working
- ❌ FAILED: Items that don't work
- ⚠️ WARNING: Items needing attention
- 📋 SUMMARY: Overall status and next steps
```

## Usage

Load when creating new slash commands:
```
@~/.claude/reference/slash-command-creation.md
```
