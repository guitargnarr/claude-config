#!/usr/bin/env python3
"""
Initialize Audit System
Creates fresh coordination file and directory structure
"""

import json
import sys
import os
from pathlib import Path
from datetime import datetime

def get_repos_from_projects():
    """Scan ~/Projects for repositories"""
    projects_dir = Path.home() / "Projects"
    if not projects_dir.exists():
        return []

    repos = []
    for item in projects_dir.iterdir():
        if item.is_dir() and (item / ".git").exists():
            repos.append({
                "repo": item.name,
                "path": str(item),
                "priority": "medium",
                "estimated_time": "30-60min",
                "notes": "Auto-discovered from ~/Projects"
            })

    return repos


def create_initial_coordination(audit_dir):
    """Create initial COORDINATION_STATUS.json"""

    repos = get_repos_from_projects()

    coordination = {
        "version": "2.0",
        "created": datetime.utcnow().isoformat() + 'Z',
        "last_updated": datetime.utcnow().isoformat() + 'Z',
        "audit_directory": str(audit_dir),

        "current_work": {
            "instance_id": None,
            "instance_terminal": None,
            "repo": None,
            "started": None,
            "status": "idle",
            "locked": False,
            "task": None
        },

        "completed_audits": [],

        "work_queue": repos,

        "audit_methodology": {
            "principles": [
                "ZERO shortcuts - read every file completely",
                "Never simplify for convenience",
                "Rigorous and honest reporting",
                "No stone unturned",
                "Quality over speed - NOT in a rush",
                "ALL automation gets INTENSE scrutiny"
            ],
            "required_checks": [
                "Repository Discovery",
                "Python File Analysis",
                "Documentation Review",
                "Sensitive Data Scan",
                "Automation Detection",
                "Archive/Disabled Files",
                "GitHub Readiness Assessment",
                "Create Audit Report",
                "Update Coordination"
            ],
            "automation_risk_levels": {
                "CRITICAL": "Active automation that could cause professional harm",
                "HIGH": "Automation present but not active, contains sensitive data",
                "MEDIUM": "Automation framework/demos, needs review",
                "LOW": "Minimal automation concerns",
                "NONE": "No automation detected"
            }
        },

        "statistics": {
            "total_repositories": len(repos),
            "audited": 0,
            "in_progress": 0,
            "remaining": len(repos),
            "percent_complete": 0,
            "github_ready_count": 0,
            "high_risk_count": 0
        },

        "notes": [
            "Repository audit system initialized",
            "Review work_queue and adjust priorities as needed",
            "Use /audit-status to check progress",
            "Use /audit-sync to manage coordination",
            "Use /audit-repo <name> to execute audits"
        ]
    }

    return coordination


def initialize(location=None):
    """Initialize the audit system"""

    # Determine location
    if location:
        audit_dir = Path(location)
    else:
        audit_dir = Path.home() / "Desktop/Github"

    # Create directory
    audit_dir.mkdir(parents=True, exist_ok=True)
    backup_dir = audit_dir / ".coordination_backups"
    backup_dir.mkdir(exist_ok=True)

    coord_file = audit_dir / "COORDINATION_STATUS.json"

    # Check if already exists
    if coord_file.exists():
        print(f"⚠️  Coordination file already exists at {coord_file}")
        response = input("Overwrite? (yes/no): ").strip().lower()
        if response != 'yes':
            print("Initialization cancelled")
            return False

    # Create coordination file
    coordination = create_initial_coordination(audit_dir)

    with open(coord_file, 'w') as f:
        json.dump(coordination, f, indent=2)

    # Create README
    readme = audit_dir / "README.md"
    readme.write_text(f"""# Repository Audit System

Initialized: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

## Files

- `COORDINATION_STATUS.json` - Central coordination file
- `.coordination_backups/` - Automatic backups
- `*_COMPLETE_AUDIT_*.txt` - Audit reports

## Commands

- `/audit-status` - Check progress
- `/audit-handoff` - Continue multi-session audit
- `/audit-repo <name>` - Audit a repository
- `/audit-sync <op>` - Manage coordination

## Repositories Found

Total: {len(coordination['work_queue'])} repositories in ~/Projects

## Next Steps

1. Review the work queue in COORDINATION_STATUS.json
2. Adjust priorities as needed
3. Run `/audit-status` to see current state
4. Run `/audit-repo <name>` to start auditing
""")

    print(f"✅ Audit system initialized at {audit_dir}")
    print(f"   Total repositories: {len(coordination['work_queue'])}")
    print(f"   Coordination file: {coord_file}")
    print(f"   README: {readme}")
    print(f"\nNext: Run /audit-status to check current state")

    return True


def main():
    """CLI interface"""
    if len(sys.argv) > 1:
        location = sys.argv[1]
        if location in ['--help', '-h']:
            print("Usage: init_audit_system.py [directory]")
            print("  directory: Where to create audit system (default: ~/Desktop/Github)")
            sys.exit(0)
        initialize(location)
    else:
        initialize()


if __name__ == '__main__':
    main()
