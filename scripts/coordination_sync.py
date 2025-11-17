#!/usr/bin/env python3
"""
Safe Coordination File Manager with Atomic File Locking
Prevents race conditions and JSON corruption in multi-instance scenarios
"""

import json
import fcntl
import sys
import os
from pathlib import Path
from datetime import datetime
import shutil

# Adaptive path detection - checks multiple locations
def get_audit_paths():
    """Find audit directory, checking multiple locations"""
    # Priority order for audit directory
    possible_locations = [
        Path.home() / "Desktop/Github",
        Path.home() / "Desktop/AUDIT_SYSTEM",
        Path.home() / ".claude/audit_data",
        Path(os.environ.get('AUDIT_DIR', '')),  # Environment variable override
    ]

    for location in possible_locations:
        if location.exists() and (location / "COORDINATION_STATUS.json").exists():
            return location / "COORDINATION_STATUS.json", location / ".coordination_backups"

    # Default to Desktop/Github if nothing found (for initialization)
    default_dir = Path.home() / "Desktop/Github"
    return default_dir / "COORDINATION_STATUS.json", default_dir / ".coordination_backups"

COORD_FILE, BACKUP_DIR = get_audit_paths()


def create_backup():
    """Create timestamped backup before modifying"""
    BACKUP_DIR.mkdir(exist_ok=True)
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_path = BACKUP_DIR / f"COORDINATION_STATUS_{timestamp}.backup.json"
    if COORD_FILE.exists():
        shutil.copy(COORD_FILE, backup_path)
    return backup_path


def safe_read():
    """Safely read coordination file with shared lock"""
    if not COORD_FILE.exists():
        return None, "Coordination file does not exist"

    try:
        with open(COORD_FILE, 'r') as f:
            fcntl.flock(f, fcntl.LOCK_SH)  # Shared lock for reading
            try:
                data = json.load(f)
                return data, None
            finally:
                fcntl.flock(f, fcntl.LOCK_UN)
    except json.JSONDecodeError as e:
        return None, f"Invalid JSON: {e}"
    except Exception as e:
        return None, f"Error reading file: {e}"


def safe_update(operation, repo_name=None, instance_id=None, **kwargs):
    """
    Safely update coordination file with exclusive file locking

    Operations:
    - lock: Lock a repository for audit
    - unlock: Unlock current repository
    - complete: Mark audit as complete
    - status: Get current status (read-only)
    """

    # Ensure parent directory exists
    COORD_FILE.parent.mkdir(parents=True, exist_ok=True)

    # Create backup before modifying
    if operation != 'status':
        backup_path = create_backup()

    try:
        with open(COORD_FILE, 'r+') as f:
            # Acquire exclusive lock
            fcntl.flock(f, fcntl.LOCK_EX)

            try:
                data = json.load(f)

                if operation == 'status':
                    # Read-only operation
                    return True, data

                elif operation == 'lock':
                    # Check if already locked
                    if data['current_work']['locked']:
                        locked_repo = data['current_work']['repo']
                        locked_instance = data['current_work']['instance_id']
                        return False, {
                            'error': 'already_locked',
                            'message': f"Repository '{locked_repo}' already locked by {locked_instance}",
                            'locked_repo': locked_repo,
                            'locked_by': locked_instance
                        }

                    # Lock the repository
                    data['current_work'] = {
                        'instance_id': instance_id or 'unknown',
                        'instance_terminal': kwargs.get('terminal', 'unknown'),
                        'repo': repo_name,
                        'started': datetime.utcnow().isoformat() + 'Z',
                        'status': 'in_progress',
                        'locked': True,
                        'task': kwargs.get('task', f'Auditing {repo_name}')
                    }
                    data['statistics']['in_progress'] = 1

                elif operation == 'unlock':
                    # Unlock without completing
                    data['current_work']['locked'] = False
                    data['current_work']['status'] = 'unlocked'
                    data['statistics']['in_progress'] = 0

                elif operation == 'complete':
                    # Mark audit as complete
                    audit_entry = kwargs.get('audit_entry', {})
                    if not audit_entry:
                        return False, {'error': 'missing_data', 'message': 'audit_entry required'}

                    # Add to completed audits
                    data['completed_audits'].append(audit_entry)

                    # Remove from work queue
                    data['work_queue'] = [r for r in data['work_queue']
                                         if r.get('repo') != repo_name]

                    # Update statistics
                    data['statistics']['audited'] += 1
                    data['statistics']['in_progress'] = 0
                    data['statistics']['remaining'] -= 1
                    data['statistics']['percent_complete'] = round(
                        (data['statistics']['audited'] / data['statistics']['total_repositories']) * 100
                    )

                    # Update github_ready_count if applicable
                    if audit_entry.get('github_ready'):
                        data['statistics']['github_ready_count'] += 1

                    # Update high_risk_count if applicable
                    if audit_entry.get('automation_risk') in ['critical', 'high']:
                        data['statistics']['high_risk_count'] += 1

                    # Unlock
                    data['current_work']['locked'] = False
                    data['current_work']['status'] = 'completed'

                else:
                    return False, {'error': 'invalid_operation', 'message': f'Unknown operation: {operation}'}

                # Update timestamp
                data['last_updated'] = datetime.utcnow().isoformat() + 'Z'

                # Write back to file
                f.seek(0)
                json.dump(data, f, indent=2)
                f.truncate()

                return True, {'message': f'Operation {operation} successful', 'data': data}

            finally:
                fcntl.flock(f, fcntl.LOCK_UN)

    except FileNotFoundError:
        return False, {'error': 'file_not_found', 'message': f'Coordination file not found: {COORD_FILE}'}
    except json.JSONDecodeError as e:
        return False, {'error': 'invalid_json', 'message': f'Invalid JSON in coordination file: {e}'}
    except Exception as e:
        return False, {'error': 'unknown', 'message': f'Unexpected error: {e}'}


def main():
    """CLI interface"""
    if len(sys.argv) < 2:
        print("Usage: coordination_sync.py <operation> [args...]")
        print("Operations:")
        print("  status                           - Get current status")
        print("  lock <repo> <instance_id>        - Lock a repository")
        print("  unlock                           - Unlock current repository")
        print("  complete <repo> <status> <...>   - Mark audit complete")
        sys.exit(1)

    operation = sys.argv[1]

    if operation == 'status':
        success, result = safe_update('status')
    elif operation == 'lock':
        if len(sys.argv) < 4:
            print("Error: lock requires <repo> <instance_id>")
            sys.exit(1)
        repo = sys.argv[2]
        instance = sys.argv[3]
        success, result = safe_update('lock', repo, instance)
    elif operation == 'unlock':
        success, result = safe_update('unlock')
    elif operation == 'complete':
        if len(sys.argv) < 4:
            print("Error: complete requires <repo> <status>")
            sys.exit(1)
        repo = sys.argv[2]
        status = sys.argv[3]
        # Build audit entry from remaining args
        audit_entry = {
            'repo': repo,
            'status': status,
            'auditor': sys.argv[4] if len(sys.argv) > 4 else 'unknown',
            'completed': datetime.utcnow().isoformat() + 'Z',
            'github_ready': sys.argv[5].lower() == 'true' if len(sys.argv) > 5 else False
        }
        success, result = safe_update('complete', repo, audit_entry=audit_entry)
    else:
        print(f"Error: Unknown operation '{operation}'")
        sys.exit(1)

    # Output result
    if success:
        print(json.dumps(result, indent=2))
        sys.exit(0)
    else:
        print(f"Error: {json.dumps(result, indent=2)}", file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
