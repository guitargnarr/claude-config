---
description: Show current audit progress, identify gaps, and recommend next action
---

# Repository Audit Status Report

Generate a comprehensive status report by analyzing the coordination file and completed work.

## Tasks:

### 1. Read Coordination File
Read `~/Desktop/Github/COORDINATION_STATUS.json` to get current state.

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
