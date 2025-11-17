---
description: Show current audit progress, identify gaps, and recommend next action
---

# Repository Audit Status Report

Generate a comprehensive status report by analyzing the coordination file and completed work.

## Tasks:

### 0. Check if Audit System Exists

First, run:
```bash
python3 ~/.claude/scripts/coordination_sync.py status
```

**If the command fails**: Report that no audit system is active and suggest:
- Run `/audit-handoff` to initialize or restore the system
- Or run `python3 ~/.claude/scripts/init_audit_system.py` to create a new system

**If the command succeeds**: Continue with tasks below.

### 1. Read Coordination File

The coordination file is auto-detected from multiple locations.
Read it to get current state.

### 2. Calculate Statistics
Report:
- Total repositories: X
- Audited and complete: X (X%)
- Currently in progress: X
- Remaining in queue: X
- GitHub-ready count: X
- High-risk count: X

### 3. Show Current Work
If anything is locked:
- Which instance is working on it?
- What repository?
- How long has it been locked?
- Estimated completion?

### 4. List Completed Audits
For each completed audit, show:
- Repository name
- Status (CLEAN, HIGH RISK, etc.)
- GitHub ready? (yes/no)
- Automation risk level
- Audit report file

### 5. Show Work Queue
List next 5-10 repositories to audit:
- Priority order
- Estimated complexity
- Estimated time
- Notes

### 6. Identify Gaps
Check for:
- Any repos mentioned in handoff docs but not in coordination file?
- Any incomplete audits that need re-doing?
- Any repos that could be worked on in parallel?

### 7. Recommend Next Action
Based on current state:
- What should this instance work on next?
- Any quick wins available?
- Any blockers to resolve?

### 8. Token Efficiency Report
- Estimated tokens used so far
- Estimated tokens remaining
- Recommendations for token optimization

Present this as a clear, organized report with specific recommendations.
