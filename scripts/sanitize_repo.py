#!/usr/bin/env python3
"""
Repository Sanitization Script
Removes sensitive data, credentials, and employer references
Creates clean copy ready for GitHub publication
"""

import os
import re
import shutil
import sys
from pathlib import Path
from datetime import datetime

# Patterns to remove
SENSITIVE_PATTERNS = {
    'email': r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}',
    'humana': r'(?i)(humana|HUMANA)',
    'matthew_full': r'(?i)(Matthew\s+David\s+Scott|Matthew\s+Scott)',
    'phone': r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b',
    'api_key': r'(api[_-]?key|apikey)\s*[:=]\s*["\']?[a-zA-Z0-9_-]{20,}["\']?',
    'password': r'(password|pwd)\s*[:=]\s*["\']?[^\s"\']{8,}["\']?',
}

# Files/directories to exclude from copying
EXCLUDE_PATTERNS = [
    '__pycache__',
    '*.pyc',
    '.DS_Store',
    'node_modules',
    'venv',
    '.env',
    '*.log',
    '.git',  # We'll handle git separately
    '*backup*',
    '*archive*',
    '*.db',  # Exclude databases
    '*.sqlite',
    '*humana*',  # Any Humana-related files
    'credentials.json',
    'token.pickle',
]

def should_exclude(path, exclude_patterns):
    """Check if path should be excluded"""
    path_str = str(path)
    for pattern in exclude_patterns:
        if '*' in pattern:
            import fnmatch
            if fnmatch.fnmatch(path_str, pattern) or fnmatch.fnmatch(path.name, pattern):
                return True
        else:
            if pattern in path_str:
                return True
    return False

def sanitize_content(content, filepath):
    """Remove sensitive patterns from content"""
    original = content

    # Replace emails (except example/test)
    if 'example' not in content.lower() and 'test' not in content.lower():
        content = re.sub(SENSITIVE_PATTERNS['email'], 'user@example.com', content)

    # Replace Humana references
    content = re.sub(SENSITIVE_PATTERNS['humana'], '[COMPANY]', content)

    # Replace full name
    content = re.sub(SENSITIVE_PATTERNS['matthew_full'], 'Matthew Scott', content)

    # Replace phone numbers
    content = re.sub(SENSITIVE_PATTERNS['phone'], '555-123-4567', content)

    # Replace API keys
    content = re.sub(SENSITIVE_PATTERNS['api_key'], 'api_key=YOUR_API_KEY_HERE', content)

    # Replace passwords
    content = re.sub(SENSITIVE_PATTERNS['password'], 'password=YOUR_PASSWORD_HERE', content)

    return content, content != original

def sanitize_repo(source_dir, dest_dir, repo_name):
    """
    Sanitize a repository and copy to destination

    Returns:
        dict: Statistics about sanitization
    """
    source = Path(source_dir)
    dest = Path(dest_dir) / repo_name

    if not source.exists():
        return {'error': f'Source directory not found: {source}'}

    # Create destination
    dest.mkdir(parents=True, exist_ok=True)

    stats = {
        'files_copied': 0,
        'files_sanitized': 0,
        'files_excluded': 0,
        'total_files': 0,
        'directories_created': 0,
    }

    # Walk through source directory
    for root, dirs, files in os.walk(source):
        rel_root = Path(root).relative_to(source)

        # Filter out excluded directories
        dirs[:] = [d for d in dirs if not should_exclude(Path(root) / d, EXCLUDE_PATTERNS)]

        # Create directory structure in destination
        if rel_root != Path('.'):
            dest_subdir = dest / rel_root
            dest_subdir.mkdir(parents=True, exist_ok=True)
            stats['directories_created'] += 1

        # Process files
        for file in files:
            stats['total_files'] += 1
            source_file = Path(root) / file

            # Check if should exclude
            if should_exclude(source_file, EXCLUDE_PATTERNS):
                stats['files_excluded'] += 1
                continue

            dest_file = dest / rel_root / file

            # Try to read as text and sanitize
            try:
                with open(source_file, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()

                # Sanitize content
                sanitized_content, was_modified = sanitize_content(content, source_file)

                # Write sanitized version
                with open(dest_file, 'w', encoding='utf-8') as f:
                    f.write(sanitized_content)

                stats['files_copied'] += 1
                if was_modified:
                    stats['files_sanitized'] += 1

            except (UnicodeDecodeError, PermissionError):
                # Binary file or permission issue - copy as-is
                shutil.copy2(source_file, dest_file)
                stats['files_copied'] += 1

    return stats

def main():
    """CLI interface"""
    if len(sys.argv) < 4:
        print("Usage: sanitize_repo.py <source_dir> <dest_base_dir> <repo_name>")
        print("\nExample:")
        print("  sanitize_repo.py ~/Projects/mirador-test ~/Desktop/AI-Portfolio-Public mirador")
        sys.exit(1)

    source = sys.argv[1]
    dest_base = sys.argv[2]
    repo_name = sys.argv[3]

    print(f"🧹 Sanitizing {repo_name}...")
    print(f"   Source: {source}")
    print(f"   Destination: {dest_base}/{repo_name}")
    print()

    stats = sanitize_repo(source, dest_base, repo_name)

    if 'error' in stats:
        print(f"❌ Error: {stats['error']}", file=sys.stderr)
        sys.exit(1)

    print("✅ Sanitization complete!")
    print()
    print("Statistics:")
    print(f"  Total files found: {stats['total_files']}")
    print(f"  Files copied: {stats['files_copied']}")
    print(f"  Files sanitized: {stats['files_sanitized']}")
    print(f"  Files excluded: {stats['files_excluded']}")
    print(f"  Directories created: {stats['directories_created']}")
    print()
    print(f"📁 Clean repo ready at: {dest_base}/{repo_name}")

    sys.exit(0)

if __name__ == '__main__':
    main()
