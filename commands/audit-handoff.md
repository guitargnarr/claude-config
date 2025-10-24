---
description: Sync with other Claude instance, read handoff docs, and pick next repository to audit
---

# Repository Audit Handoff Protocol

You are continuing a multi-session repository audit project for Matthew Scott. Follow these steps EXACTLY:

## Step 1: Read Coordination File
Read `~/Desktop/Github/COORDINATION_STATUS.json` completely to understand:
- What repositories have been audited
- What is currently being worked on (check if locked)
- What's in the work queue
- The audit methodology and required checks

## Step 2: Read Handoff Documents
Read these files IN ORDER:
1. `~/Desktop/Github/SESSION_HANDOFF_FOR_NEXT_CLAUDE_2025-10-13.txt` - Critical context (LATEST)
2. `~/Desktop/Github/SESSION_METHODOLOGY_AND_PROMPTS_2025-10-12.txt` - How to audit
3. (Optional) Previous handoff docs for historical context

## Step 3: Review Completed Audits
Quickly scan the completed audit reports to understand the standard and depth required.
Recent examples (Session #01 - Oct 13, 2025):
- PORTFOLIO_WEBSITE_COMPLETE_AUDIT_2025-10-13.txt
- LLM_ENGINEER_DEMO_COMPLETE_AUDIT_2025-10-13.txt
- JCPS_BOOTS_COMPLETE_AUDIT_2025-10-13.txt
- FRETVISION_APP_COMPLETE_AUDIT_2025-10-13.txt

Historical examples (Previous sessions):
- FRETFORGE_COMPLETE_AUDIT_2025-10-12.txt
- CAREER_AUTOMATION_COMPLETE_AUDIT_2025-10-12.txt
- SECURITY_COPILOT_COMPLETE_AUDIT_2025-10-12.txt

## Step 4: Understand Critical Context
**CRITICAL**:
- User suspects job automation caused their layoff (unconfirmed)
- Previous GitHub deleted for security/data leakage
- ALL automation requires INTENSE scrutiny
- ZERO shortcuts allowed - read every file
- Quality over speed - we are NOT in a rush

## Step 5: Select Next Repository
Check COORDINATION_STATUS.json:
- If `current_work.locked == true`, DO NOT work on that repo
- Pick next highest priority repo from `work_queue`
- Update coordination file with your selection
- Lock the repo so other instance doesn't duplicate work

## Step 6: Confirm Understanding
Report back:
- Which repo you selected
- Why you selected it
- Estimated time to complete
- Confirm you understand the methodology (zero shortcuts, read everything)

Do NOT start the audit yet - wait for user confirmation after reporting your selection.
