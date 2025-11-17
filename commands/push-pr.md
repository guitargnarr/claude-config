---
description: Push branch and create PR with AI-generated description
argument-hint: [base-branch]
allowed-tools: Bash(git:*), Bash(gh:*), Read, Grep
---

# Push Branch and Create Pull Request

Base branch: ${1:-main}

## Workflow:

1. **Verify Ready to Push**
   - Check git status (ensure we're on a branch, not detached HEAD)
   - Get current branch name
   - Verify commits exist (not already pushed)
   - Check if remote branch exists

2. **Analyze All Changes**
   - Run `git log ${1:-main}..HEAD` to see all commits since divergence
   - Run `git diff ${1:-main}...HEAD` to see complete diff
   - Read all modified files to understand scope of changes
   - Identify:
     - New features added
     - Bugs fixed
     - Breaking changes
     - API changes
     - Database migrations
     - Test coverage

3. **Generate Comprehensive PR Description**

   **Format**:
   ```markdown
   ## Summary
   - [Bullet point of key change 1]
   - [Bullet point of key change 2]
   - [Bullet point of key change 3]

   ## Technical Details
   ### Architecture Changes
   - [Describe any architectural decisions]

   ### API Changes
   - [List new/modified endpoints or interfaces]
   - [Note any breaking changes]

   ### Database Changes
   - [List migrations, schema changes]

   ## Test Plan
   - [ ] Unit tests pass locally
   - [ ] Integration tests pass
   - [ ] Manual testing completed:
     - [ ] [Specific test case 1]
     - [ ] [Specific test case 2]

   ## Related Issues
   Closes #[issue-number] (if applicable)

   ---
   🤖 Generated with [Claude Code](https://claude.com/claude-code)
   ```

4. **Push Branch**
   ```bash
   git push -u origin HEAD
   ```

5. **Create Pull Request**
   ```bash
   gh pr create \
     --base ${1:-main} \
     --title "[Auto-generated from first commit subject]" \
     --body "[AI-generated description from step 3]"
   ```

6. **Return PR URL**
   - Display created PR URL
   - Show next steps (request reviewers, check CI status)

## Safety Checks:

- Don't push if tests are failing locally
- Warn if pushing to main/master directly
- Confirm if >1000 lines changed
- Check if PR already exists for this branch

## Example Usage:

```bash
# Push and create PR against main
/push-pr

# Push and create PR against develop
/push-pr develop

# Push and create PR against feature/parent-branch
/push-pr feature/parent-branch
```

Execute the push and PR creation workflow now.
