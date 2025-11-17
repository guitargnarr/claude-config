---
description: Intelligently commit changes with AI-generated message
allowed-tools: Bash(git:*), Read, Grep
---

# Intelligent Git Commit

Analyze code changes and create a commit with an AI-generated conventional commit message.

## Process:

1. **Analyze Changes**
   - Run `git status` to see what's changed
   - Run `git diff --staged` for staged changes
   - Run `git diff` for unstaged changes
   - Read modified files to understand the changes deeply

2. **Generate Commit Message**
   - **Type**: Determine from changes (feat/fix/docs/refactor/test/chore/perf)
   - **Scope**: Identify affected module/component
   - **Subject**: Imperative mood, <72 characters, lowercase
   - **Body**: Detailed explanation of WHY (not what - that's in the diff)
   - **Footer**: Reference issues if applicable (Closes #123)

3. **Stage Changes** (if not already staged)
   - Stage all relevant files
   - Exclude: `.env`, `*.log`, `*.tmp`, `.DS_Store`, secrets

4. **Create Commit**
   - Use generated message
   - Add co-author: `Co-Authored-By: Claude <noreply@anthropic.com>`

5. **Show Summary**
   - Display commit hash
   - Show files changed
   - Display the generated message

## Conventional Commit Format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Example**:
```
feat(auth): implement OAuth2 authentication

Adds OAuth2 flow with token refresh mechanism to support
third-party integrations. Includes token storage in encrypted
format and automatic refresh before expiration.

Closes #42
Co-Authored-By: Claude <noreply@anthropic.com>
```

## Safety Checks:

- Warn if large files (>1MB) are staged
- Warn if potential secrets detected (API keys, passwords)
- Confirm before committing if >100 files changed
- Never commit files matching gitignore patterns

Execute the intelligent commit workflow now.
