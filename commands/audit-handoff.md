---
description: Sync with other Claude instance, read handoff docs, and pick next repository to audit
---

# Repository Audit Handoff Protocol

You are continuing or starting a multi-session repository audit project for Matthew Scott.

## Phase 0: Check if Audit System Exists

Run the coordination sync status command to check if the system exists:
```bash
python3 ~/.claude/scripts/coordination_sync.py status
```

**If the command fails with "file_not_found"**:
1. Search for archived audit system in ~/Desktop/6_ARCHIVES_OLD_DESKTOP/
2. Check if there's an October 2025 audit in the archives
3. Ask the user:
   - "I found an archived audit system from October 2025. Do you want to:"
   - "A) Restore and continue the October audit"
   - "B) Start a fresh audit system for November 2025"
   - "C) Cancel and do something else"
4. If user chooses A, help them restore the files
5. If user chooses B, run: `python3 ~/.claude/scripts/init_audit_system.py`
6. If user chooses C, exit gracefully

**If the command succeeds**:
Continue with Step 1 below.

## Step 1: Read Coordination File

The coordination file is auto-detected from these locations (in priority order):
- `~/Desktop/Github/COORDINATION_STATUS.json`
- `~/Desktop/AUDIT_SYSTEM/COORDINATION_STATUS.json`
- `~/.claude/audit_data/COORDINATION_STATUS.json`
- `$AUDIT_DIR/COORDINATION_STATUS.json` (if environment variable set)

Read it completely to understand:
- What repositories have been audited
- What is currently being worked on (check if locked)
- What's in the work queue
- The audit methodology and required checks

## Step 2: Review Previous Audit Reports (if they exist)

If there are completed audits in the audit directory, scan 2-3 of them to understand the standard and depth required.

## Step 3: Understand Critical Context

**CRITICAL**:
- User suspects job automation caused their layoff (unconfirmed)
- Previous GitHub deleted for security/data leakage
- ALL automation requires INTENSE scrutiny
- ZERO shortcuts allowed - read every file
- Quality over speed - we are NOT in a rush

## Step 4: Select Next Repository

Check COORDINATION_STATUS.json:
- If `current_work.locked == true`, DO NOT work on that repo
- Pick next highest priority repo from `work_queue`
- Use `/audit-sync lock <repo> <instance-id>` to lock it
- Report your selection

## Step 5: Confirm Understanding

Report back:
- Which repo you selected
- Why you selected it
- Estimated time to complete
- Confirm you understand the methodology (zero shortcuts, read everything)

Do NOT start the audit yet - wait for user confirmation after reporting your selection.
