#!/usr/bin/env python3
"""
Audit Report Verification Script
Ensures audit reports are complete and meet quality standards
"""

import sys
from pathlib import Path
from datetime import datetime

REQUIRED_SECTIONS = [
    'EXECUTIVE SUMMARY',
    'REPOSITORY METRICS VALIDATION',
    'FILE INVENTORY',
    'SENSITIVE DATA SCAN',
    'AUTOMATION DETECTION',
    'GIT ANALYSIS',
    'GITHUB PUBLICATION READINESS',
    'RECOMMENDATIONS'
]

MIN_REPORT_LENGTH = 5000  # characters


def verify_audit_report(repo_name, date=None):
    """Verify audit report is complete"""
    if date is None:
        date = datetime.now().strftime('%Y-%m-%d')

    github_dir = Path.home() / "Desktop/Github"
    report_file = github_dir / f"{repo_name}_COMPLETE_AUDIT_{date}.txt"

    errors = []
    warnings = []

    # Check file exists
    if not report_file.exists():
        return False, [f"Report file not found: {report_file}"], []

    # Read content
    try:
        content = report_file.read_text()
    except Exception as e:
        return False, [f"Error reading report file: {e}"], []

    # Check for all required sections
    missing_sections = []
    for section in REQUIRED_SECTIONS:
        if section not in content:
            missing_sections.append(section)

    if missing_sections:
        errors.append(f"Missing sections: {', '.join(missing_sections)}")

    # Check minimum length
    if len(content) < MIN_REPORT_LENGTH:
        warnings.append(f"Report is short ({len(content)} chars). Expected >{MIN_REPORT_LENGTH}. May be incomplete.")

    # Check for TODO/FIXME markers
    if 'TODO' in content:
        warnings.append("Report contains TODO markers")
    if 'FIXME' in content:
        warnings.append("Report contains FIXME markers")

    # Check for placeholder text
    if '[PLACEHOLDER]' in content or 'TBD' in content:
        warnings.append("Report contains placeholder text")

    # Check for key audit evidence
    evidence_checks = {
        'LOC count': any(phrase in content for phrase in ['LOC', 'lines of code', 'line count']),
        'File count': 'files' in content.lower(),
        'Git commits': 'commit' in content.lower(),
        'Automation check': 'automation' in content.lower()
    }

    missing_evidence = [check for check, present in evidence_checks.items() if not present]
    if missing_evidence:
        warnings.append(f"May be missing evidence for: {', '.join(missing_evidence)}")

    return len(errors) == 0, errors, warnings


def main():
    """CLI interface"""
    if len(sys.argv) < 2:
        print("Usage: verify_audit.py <repo-name> [date]")
        print("  date format: YYYY-MM-DD (default: today)")
        sys.exit(1)

    repo = sys.argv[1]
    date = sys.argv[2] if len(sys.argv) > 2 else None

    valid, errors, warnings = verify_audit_report(repo, date)

    if valid:
        if warnings:
            print(f"✅ Audit report for {repo} is valid (with warnings)\n")
            for warning in warnings:
                print(f"  ⚠️  {warning}")
            sys.exit(0)
        else:
            print(f"✅ Audit report for {repo} is complete and valid")
            sys.exit(0)
    else:
        print(f"❌ Audit report for {repo} is INVALID\n", file=sys.stderr)
        for error in errors:
            print(f"  • {error}", file=sys.stderr)
        if warnings:
            print("\nWarnings:", file=sys.stderr)
            for warning in warnings:
                print(f"  • {warning}", file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
