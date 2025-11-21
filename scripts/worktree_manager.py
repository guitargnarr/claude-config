#!/usr/bin/env python3
"""
Git Worktree Manager for Parallel Agent Orchestration
Enables 4-5 Claude agents to work concurrently on different branches
"""

import subprocess
import json
from pathlib import Path
from datetime import datetime
from filelock import FileLock, Timeout
import sys

class WorktreeManager:
    """Manages git worktrees for parallel development"""

    def __init__(self):
        self.worktree_root = Path.home() / "Projects" / ".worktrees"
        self.locks_dir = self.worktree_root / ".locks"
        self.queue_dir = self.worktree_root / ".queue"

        # Ensure directories exist
        self.worktree_root.mkdir(exist_ok=True)
        self.locks_dir.mkdir(exist_ok=True)
        self.queue_dir.mkdir(exist_ok=True)

    def get_repo_root(self):
        """Get current repository root"""
        result = subprocess.run(
            ['git', 'rev-parse', '--show-toplevel'],
            capture_output=True,
            text=True
        )
        if result.returncode != 0:
            raise ValueError("Not in a git repository")
        return Path(result.stdout.strip())

    def get_repo_name(self):
        """Get repository name from path"""
        repo_root = self.get_repo_root()
        return repo_root.name

    def create_worktree(self, branch_name, base_branch="main"):
        """Create isolated worktree for branch"""
        repo_name = self.get_repo_name()
        worktree_path = self.worktree_root / repo_name / branch_name

        # Lock this operation
        lock_file = self.locks_dir / f"{repo_name}_{branch_name}.lock"

        try:
            with FileLock(lock_file, timeout=10):
                # Check if worktree already exists
                if worktree_path.exists():
                    print(f"⚠️  Worktree already exists: {worktree_path}")
                    return worktree_path

                # Create worktree directory
                worktree_path.parent.mkdir(parents=True, exist_ok=True)

                # Create worktree
                result = subprocess.run(
                    ['git', 'worktree', 'add', str(worktree_path), '-b', branch_name, base_branch],
                    capture_output=True,
                    text=True
                )

                if result.returncode != 0:
                    print(f"❌ Error creating worktree: {result.stderr}")
                    return None

                print(f"✓ Created worktree: {worktree_path}")
                print(f"  Branch: {branch_name}")
                print(f"  Based on: {base_branch}")

                return worktree_path

        except Timeout:
            print(f"❌ Timeout: Another operation is using {branch_name}")
            return None

    def list_worktrees(self):
        """List all worktrees for current repository"""
        result = subprocess.run(
            ['git', 'worktree', 'list', '--porcelain'],
            capture_output=True,
            text=True
        )

        if result.returncode != 0:
            print(f"❌ Error listing worktrees: {result.stderr}")
            return []

        # Parse porcelain output
        worktrees = []
        current_worktree = {}

        for line in result.stdout.splitlines():
            if line.startswith('worktree '):
                if current_worktree:
                    worktrees.append(current_worktree)
                current_worktree = {'path': line.split(' ', 1)[1]}
            elif line.startswith('branch '):
                current_worktree['branch'] = line.split('/', 2)[-1]
            elif line.startswith('HEAD '):
                current_worktree['head'] = line.split(' ', 1)[1]

        if current_worktree:
            worktrees.append(current_worktree)

        return worktrees

    def remove_worktree(self, branch_name):
        """Remove worktree and clean up"""
        repo_name = self.get_repo_name()
        worktree_path = self.worktree_root / repo_name / branch_name

        lock_file = self.locks_dir / f"{repo_name}_{branch_name}.lock"

        try:
            with FileLock(lock_file, timeout=10):
                if not worktree_path.exists():
                    print(f"⚠️  Worktree doesn't exist: {branch_name}")
                    return False

                # Remove worktree
                result = subprocess.run(
                    ['git', 'worktree', 'remove', str(worktree_path), '--force'],
                    capture_output=True,
                    text=True
                )

                if result.returncode != 0:
                    print(f"❌ Error removing worktree: {result.stderr}")
                    return False

                # Clean up lock file
                if lock_file.exists():
                    lock_file.unlink()

                print(f"✓ Removed worktree: {branch_name}")
                return True

        except Timeout:
            print(f"❌ Timeout: Worktree {branch_name} is in use")
            return False

    def prune_worktrees(self):
        """Remove deleted worktrees from git's records"""
        result = subprocess.run(
            ['git', 'worktree', 'prune'],
            capture_output=True,
            text=True
        )

        if result.returncode == 0:
            print("✓ Pruned stale worktree records")
            return True
        else:
            print(f"⚠️  Prune had issues: {result.stderr}")
            return False


def main():
    """CLI interface for worktree manager"""
    if len(sys.argv) < 2:
        print("Usage: worktree_manager.py <command> [args]")
        print("\nCommands:")
        print("  create <branch> [base-branch] - Create new worktree")
        print("  list - List all worktrees")
        print("  remove <branch> - Remove worktree")
        print("  prune - Clean up stale worktree records")
        print("  cleanup - Auto-cleanup all merged worktrees and branches")
        sys.exit(1)

    manager = WorktreeManager()
    command = sys.argv[1]

    try:
        if command == "create":
            branch = sys.argv[2] if len(sys.argv) > 2 else None
            base = sys.argv[3] if len(sys.argv) > 3 else "main"
            if not branch:
                print("❌ Error: Branch name required")
                sys.exit(1)
            manager.create_worktree(branch, base)

        elif command == "list":
            worktrees = manager.list_worktrees()
            print(f"\n📂 Worktrees ({len(worktrees)}):\n")
            for wt in worktrees:
                branch = wt.get('branch', 'N/A')
                path = wt['path']
                print(f"  Branch: {branch}")
                print(f"  Path: {path}")
                print()

        elif command == "remove":
            branch = sys.argv[2] if len(sys.argv) > 2 else None
            if not branch:
                print("❌ Error: Branch name required")
                sys.exit(1)
            manager.remove_worktree(branch)

        elif command == "prune":
            manager.prune_worktrees()

        elif command == "cleanup":
            # Run the bash cleanup script
            cleanup_script = Path.home() / ".claude" / "scripts" / "cleanup-worktrees.sh"
            repo_root = manager.get_repo_root()

            if not cleanup_script.exists():
                print(f"❌ Cleanup script not found: {cleanup_script}")
                sys.exit(1)

            # Make script executable
            subprocess.run(['chmod', '+x', str(cleanup_script)])

            # Run cleanup script
            result = subprocess.run(
                [str(cleanup_script), str(repo_root)],
                text=True
            )
            sys.exit(result.returncode)

        else:
            print(f"❌ Unknown command: {command}")
            sys.exit(1)

    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
