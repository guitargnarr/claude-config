#!/usr/bin/env python3
"""
Environment Validation Script
Checks that all dependencies exist before running commands
"""

import json
import sys
import os
from pathlib import Path

def get_audit_paths():
    """Find audit directory, checking multiple locations"""
    possible_locations = [
        Path.home() / "Desktop/Github",
        Path.home() / "Desktop/AUDIT_SYSTEM",
        Path.home() / ".claude/audit_data",
        Path(os.environ.get('AUDIT_DIR', '')),
    ]

    for location in possible_locations:
        if location.exists() and (location / "COORDINATION_STATUS.json").exists():
            return location / "COORDINATION_STATUS.json", location

    # Default to Desktop/Github if nothing found
    default_dir = Path.home() / "Desktop/Github"
    return default_dir / "COORDINATION_STATUS.json", default_dir

COORD_FILE, GITHUB_DIR = get_audit_paths()
HANDOFF_FILES = [
    "SESSION_HANDOFF_FOR_NEXT_CLAUDE_2025-10-12.txt",
    "SESSION_METHODOLOGY_AND_PROMPTS_2025-10-12.txt",
    "REPOSITORY_AUDIT_CONTINUATION_PLAN_2025-10-12.txt"
]


def validate():
    """Run all validation checks"""
    errors = []
    warnings = []

    # Check coordination file exists
    if not COORD_FILE.exists():
        errors.append(f"Coordination file missing: {COORD_FILE}")
    else:
        # Check if valid JSON
        try:
            with open(COORD_FILE) as f:
                data = json.load(f)

            # Check required sections
            required_sections = [
                'current_work', 'completed_audits', 'work_queue',
                'audit_methodology', 'statistics'
            ]
            for section in required_sections:
                if section not in data:
                    errors.append(f"Missing section in coordination file: {section}")

        except json.JSONDecodeError as e:
            errors.append(f"Invalid JSON in coordination file: {e}")

    # Check Github directory exists
    if not GITHUB_DIR.exists():
        errors.append(f"Github directory missing: {GITHUB_DIR}")
    elif not os.access(GITHUB_DIR, os.W_OK):
        errors.append(f"No write permission to Github directory: {GITHUB_DIR}")

    # Check handoff files (warn if missing, not error)
    for filename in HANDOFF_FILES:
        filepath = GITHUB_DIR / filename
        if not filepath.exists():
            warnings.append(f"Handoff file missing: {filename}")

    # Check command files
    command_dir = Path.home() / ".claude/commands"
    expected_commands = ['audit-status.md', 'audit-sync.md', 'audit-handoff.md', 'audit-repo.md']
    for cmd in expected_commands:
        if not (command_dir / cmd).exists():
            warnings.append(f"Command file missing: {cmd}")

    # Check agent files
    agent_dir = Path.home() / ".claude/agents"
    expected_agents = ['repo-scanner.md', 'security-auditor.md', 'documentation-reader.md', 'code-analyzer.md']
    for agent in expected_agents:
        if not (agent_dir / agent).exists():
            warnings.append(f"Agent file missing: {agent}")

    return errors, warnings


def main():
    """CLI interface"""
    errors, warnings = validate()

    if errors:
        print("❌ VALIDATION FAILED\n", file=sys.stderr)
        print("Errors:", file=sys.stderr)
        for error in errors:
            print(f"  • {error}", file=sys.stderr)
        if warnings:
            print("\nWarnings:", file=sys.stderr)
            for warning in warnings:
                print(f"  • {warning}", file=sys.stderr)
        sys.exit(1)
    elif warnings:
        print("⚠️  VALIDATION PASSED WITH WARNINGS\n")
        for warning in warnings:
            print(f"  • {warning}")
        sys.exit(0)
    else:
        print("✅ VALIDATION PASSED")
        print("All required files and directories present")
        sys.exit(0)


if __name__ == '__main__':
    import os
    main()
