---
description: Update coordination file with current progress and sync state (SAFE VERSION with atomic locking)
argument-hint: [operation] [repo-name] [additional-args...]
---

# Sync Coordination Status (Production Safe)

**IMPORTANT**: This command uses Python scripts with atomic file locking to prevent corruption.

**NOTE**: The coordination file location is auto-detected from:
- `~/Desktop/Github/COORDINATION_STATUS.json`
- `~/Desktop/AUDIT_SYSTEM/COORDINATION_STATUS.json`
- `~/.claude/audit_data/COORDINATION_STATUS.json`
- `$AUDIT_DIR/COORDINATION_STATUS.json` (environment variable)

If no coordination file exists, run `/audit-handoff` to initialize the system.

## Usage

`/audit-sync <operation> <repo-name> [additional-args]`

Operations:
- `lock <repo-name> <instance-id>` - Lock a repository before starting audit
- `unlock` - Unlock current repository (without completing)
- `complete <repo-name> <status> <instance-id> <github_ready>` - Mark audit complete
- `status` - Get current coordination status (read-only)

## Pre-Execution Validation

Before executing, the system will:
1. ✅ Validate coordination file exists
2. ✅ Check JSON is valid
3. ✅ Verify write permissions
4. ✅ Create backup before modification
5. ✅ Use atomic file locking (prevents race conditions)

## Operations

### 1. Lock a Repository

**Command**: `/audit-sync lock <repo-name> <instance-id>`

**Example**: `/audit-sync lock portfolio-website s000_pid46135`

**What it does**:
- Validates environment
- Checks if repo is already locked
- If not locked:
  - Acquires exclusive file lock
  - Updates current_work section
  - Sets locked = true
  - Adds timestamp
  - Releases lock
- If already locked:
  - Reports which instance has the lock
  - Suggests alternative repos from queue

**Implementation**:
```bash
python3 ~/.claude/scripts/coordination_sync.py lock $1 $2
```

### 2. Unlock Repository

**Command**: `/audit-sync unlock`

**What it does**:
- Validates environment
- Acquires exclusive file lock
- Sets locked = false in current_work
- Releases lock

**Implementation**:
```bash
python3 ~/.claude/scripts/coordination_sync.py unlock
```

### 3. Complete Audit

**Command**: `/audit-sync complete <repo-name> <status> <instance-id> <github_ready>`

**Example**: `/audit-sync complete portfolio-website CLEAN s000_pid46135 true`

**What it does**:
- Validates environment
- Validates audit report exists
- Acquires exclusive file lock
- Adds entry to completed_audits
- Removes repo from work_queue
- Updates statistics
- Sets locked = false
- Releases lock

**Implementation**:
```bash
# First verify audit report
python3 ~/.claude/scripts/verify_audit.py $1

# If valid, complete the audit
python3 ~/.claude/scripts/coordination_sync.py complete $1 $2 $3 $4
```

### 4. Get Status

**Command**: `/audit-sync status`

**What it does**:
- Reads coordination file with shared lock (allows concurrent reads)
- Returns current state
- No modifications made

**Implementation**:
```bash
python3 ~/.claude/scripts/coordination_sync.py status
```

## Error Handling

The system handles these error cases:

**File Not Found**:
```json
{
  "error": "file_not_found",
  "message": "Coordination file not found"
}
```
→ Action: Run /audit-handoff to initialize

**Invalid JSON**:
```json
{
  "error": "invalid_json",
  "message": "Coordination file is corrupted"
}
```
→ Action: Restore from backup in ~/.claude/scripts/.coordination_backups/

**Already Locked**:
```json
{
  "error": "already_locked",
  "message": "Repository 'X' already locked by instance Y",
  "locked_repo": "X",
  "locked_by": "instance_Y"
}
```
→ Action: Choose different repo from queue

**Permission Denied**:
```json
{
  "error": "permission_denied",
  "message": "No write access to coordination file"
}
```
→ Action: Check file permissions

## Safety Features

✅ **Atomic File Locking**: Uses fcntl.flock() - prevents race conditions
✅ **Automatic Backups**: Creates timestamped backup before each modification
✅ **JSON Validation**: Validates before and after modification
✅ **Error Recovery**: Detailed error messages with remediation steps
✅ **Audit Verification**: Checks report completeness before marking complete

## Backup Location

Backups are stored in `.coordination_backups/` subdirectory of the audit directory.

Format: `COORDINATION_STATUS_YYYYMMDD_HHMMSS.backup.json`

To restore from backup, copy the backup file to the main coordination file location.
The backup directory is in the same location as the COORDINATION_STATUS.json file.

## Testing

To test the system works:
```bash
# Get current status
python3 ~/.claude/scripts/coordination_sync.py status

# Try locking a test repo
python3 ~/.claude/scripts/coordination_sync.py lock test-repo test-instance

# Try locking again (should fail - already locked)
python3 ~/.claude/scripts/coordination_sync.py lock test-repo other-instance

# Unlock
python3 ~/.claude/scripts/coordination_sync.py unlock
```

## After Syncing

Always verify the operation succeeded:
1. Check the command output for success/error messages
2. Run `/audit-status` to confirm state updated correctly
3. If error occurred, check backup files and error message

---

**Note**: This production-safe version replaces manual JSON editing with atomic Python scripts to prevent corruption and race conditions.
