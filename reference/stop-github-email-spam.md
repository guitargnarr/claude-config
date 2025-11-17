# Stop GitHub Actions Email Spam

**Problem**: E2E tests trigger on every push/PR and send failure emails (15 min runs)

## Quick Fix (Stop Current Spam)

```bash
# List running workflows
gh run list --status in_progress

# Cancel specific run
gh run cancel <run-id>

# Cancel all in-progress E2E tests
gh run list --workflow="e2e-tests.yml" --status in_progress --json databaseId --jq '.[].databaseId' | xargs -I {} gh run cancel {}
```

## Permanent Solutions

### Option 1: Disable E2E Workflow Temporarily
```bash
# Disable the workflow
gh workflow disable e2e-tests.yml

# Re-enable when needed
gh workflow enable e2e-tests.yml
```

### Option 2: Change Notification Settings (Recommended)
1. Go to: https://github.com/settings/notifications
2. Scroll to "Actions"
3. Uncheck "Send notifications for failed workflows"
4. OR: Select "Only notify for workflows you subscribe to"

### Option 3: Modify Workflow Triggers
Edit `.github/workflows/e2e-tests.yml`:
```yaml
on:
  # Remove automatic push triggers
  # push:
  #   branches: [ main ]

  # Keep manual trigger only
  workflow_dispatch:

  # Keep scheduled tests
  schedule:
    - cron: '0 6 * * *'  # Daily at 6 AM
```

### Option 4: Add Concurrency Control
Add to e2e-tests.yml to auto-cancel old runs:
```yaml
concurrency:
  group: e2e-tests-${{ github.ref }}
  cancel-in-progress: true
```

## Best Practice for This Project

**Use Option 2 + Option 4**:
- Turn off failure email notifications (noisy during development)
- Add concurrency control to auto-cancel superseded runs
- Keep daily scheduled tests to catch regressions

## Quick Commands

```bash
# See what's running now
gh run list --status in_progress

# Stop all E2E tests
gh run list -w e2e-tests.yml --status in_progress --json databaseId -q '.[].databaseId' | xargs -n1 gh run cancel

# View workflow status
gh workflow view e2e-tests.yml
```

**Last Updated**: 2025-11-16
