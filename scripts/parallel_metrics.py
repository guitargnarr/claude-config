#!/usr/bin/env python3
"""
Parallel Development Metrics Tracker
Tracks and analyzes parallel Claude Code development sessions.

Usage:
    # Start a new run
    python3 parallel_metrics.py start --project "projectlavos-backend" --tasks 4

    # Log task completion
    python3 parallel_metrics.py complete --task-id 1 --pr-created yes

    # Log task failure
    python3 parallel_metrics.py fail --task-id 2 --reason "waited for verification"

    # End run and generate report
    python3 parallel_metrics.py end --time-spent 4.5

    # View historical metrics
    python3 parallel_metrics.py report
    python3 parallel_metrics.py report --run-id 3
"""

import json
import argparse
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional

METRICS_FILE = Path.home() / ".claude" / "parallel_runs.jsonl"
CURRENT_RUN_FILE = Path.home() / ".claude" / "current_parallel_run.json"


class ParallelMetrics:
    def __init__(self):
        self.metrics_file = METRICS_FILE
        self.current_run_file = CURRENT_RUN_FILE
        self._ensure_files_exist()

    def _ensure_files_exist(self):
        """Create metrics files if they don't exist."""
        self.metrics_file.parent.mkdir(parents=True, exist_ok=True)
        if not self.metrics_file.exists():
            self.metrics_file.touch()

    def start_run(self, project: str, tasks: int, sequential_estimate: Optional[float] = None):
        """Start a new parallel development run."""
        if self.current_run_file.exists():
            print("⚠️  Warning: A run is already in progress. Use 'end' to complete it first.")
            return

        run_data = {
            "run_id": self._get_next_run_id(),
            "project": project,
            "start_time": datetime.now().isoformat(),
            "tasks_total": tasks,
            "tasks_completed": 0,
            "tasks_failed": 0,
            "prs_created": 0,
            "sequential_estimate": sequential_estimate,
            "tasks": []
        }

        with open(self.current_run_file, 'w') as f:
            json.dump(run_data, f, indent=2)

        print(f"✅ Run #{run_data['run_id']} started for {project}")
        print(f"   Tasks: {tasks}")
        if sequential_estimate:
            print(f"   Sequential estimate: {sequential_estimate}h")

    def complete_task(self, task_id: int, pr_created: bool, time_spent: Optional[float] = None):
        """Mark a task as completed."""
        run_data = self._load_current_run()
        if not run_data:
            return

        task_entry = {
            "task_id": task_id,
            "status": "completed",
            "pr_created": pr_created,
            "timestamp": datetime.now().isoformat(),
            "time_spent": time_spent
        }

        run_data["tasks"].append(task_entry)
        run_data["tasks_completed"] += 1
        if pr_created:
            run_data["prs_created"] += 1

        self._save_current_run(run_data)
        print(f"✅ Task #{task_id} completed (PR: {'yes' if pr_created else 'no'})")

    def fail_task(self, task_id: int, reason: str):
        """Mark a task as failed."""
        run_data = self._load_current_run()
        if not run_data:
            return

        task_entry = {
            "task_id": task_id,
            "status": "failed",
            "reason": reason,
            "timestamp": datetime.now().isoformat()
        }

        run_data["tasks"].append(task_entry)
        run_data["tasks_failed"] += 1

        self._save_current_run(run_data)
        print(f"❌ Task #{task_id} failed: {reason}")

    def end_run(self, time_spent: float, notes: Optional[str] = None):
        """End the current run and save metrics."""
        run_data = self._load_current_run()
        if not run_data:
            return

        run_data["end_time"] = datetime.now().isoformat()
        run_data["time_spent"] = time_spent
        run_data["notes"] = notes

        # Calculate metrics
        completion_rate = (run_data["tasks_completed"] / run_data["tasks_total"]) * 100
        pr_success_rate = (run_data["prs_created"] / run_data["tasks_total"]) * 100

        run_data["completion_rate"] = round(completion_rate, 1)
        run_data["pr_success_rate"] = round(pr_success_rate, 1)

        if run_data.get("sequential_estimate"):
            efficiency = run_data["sequential_estimate"] / time_spent
            run_data["efficiency_ratio"] = round(efficiency, 2)

        # Save to historical log
        with open(self.metrics_file, 'a') as f:
            f.write(json.dumps(run_data) + '\n')

        # Remove current run file
        self.current_run_file.unlink()

        # Print summary
        self._print_run_summary(run_data)

    def generate_report(self, run_id: Optional[int] = None):
        """Generate metrics report."""
        if run_id:
            self._print_single_run_report(run_id)
        else:
            self._print_all_runs_report()

    def _load_current_run(self) -> Optional[Dict]:
        """Load current run data."""
        if not self.current_run_file.exists():
            print("❌ No run in progress. Use 'start' to begin a new run.")
            return None

        with open(self.current_run_file, 'r') as f:
            return json.load(f)

    def _save_current_run(self, data: Dict):
        """Save current run data."""
        with open(self.current_run_file, 'w') as f:
            json.dump(data, f, indent=2)

    def _get_next_run_id(self) -> int:
        """Get the next run ID."""
        if not self.metrics_file.exists() or self.metrics_file.stat().st_size == 0:
            return 1

        with open(self.metrics_file, 'r') as f:
            runs = [json.loads(line) for line in f]
            return max(run["run_id"] for run in runs) + 1 if runs else 1

    def _get_all_runs(self) -> List[Dict]:
        """Load all historical runs."""
        if not self.metrics_file.exists():
            return []

        with open(self.metrics_file, 'r') as f:
            return [json.loads(line) for line in f if line.strip()]

    def _get_run_by_id(self, run_id: int) -> Optional[Dict]:
        """Get a specific run by ID."""
        runs = self._get_all_runs()
        for run in runs:
            if run["run_id"] == run_id:
                return run
        return None

    def _print_run_summary(self, run: Dict):
        """Print summary of a completed run."""
        print("\n" + "="*60)
        print(f"📊 RUN #{run['run_id']} COMPLETE - {run['project']}")
        print("="*60)
        print(f"Tasks: {run['tasks_completed']}/{run['tasks_total']} completed ({run['completion_rate']}%)")
        print(f"PRs: {run['prs_created']}/{run['tasks_total']} created ({run['pr_success_rate']}%)")
        print(f"Failures: {run['tasks_failed']}")
        print(f"Time: {run['time_spent']}h")

        if run.get('efficiency_ratio'):
            print(f"Efficiency: {run['efficiency_ratio']}x faster than sequential")
            time_saved = run.get('sequential_estimate', 0) - run['time_spent']
            print(f"Time saved: {round(time_saved, 1)}h")

        if run.get('notes'):
            print(f"\nNotes: {run['notes']}")

        print("="*60 + "\n")

    def _print_single_run_report(self, run_id: int):
        """Print detailed report for a single run."""
        run = self._get_run_by_id(run_id)
        if not run:
            print(f"❌ Run #{run_id} not found")
            return

        self._print_run_summary(run)

        if run.get('tasks'):
            print("\nTask Breakdown:")
            for task in run['tasks']:
                status = "✅" if task['status'] == 'completed' else "❌"
                pr = " [PR ✓]" if task.get('pr_created') else ""
                reason = f" - {task.get('reason', '')}" if task['status'] == 'failed' else ""
                print(f"  {status} Task #{task['task_id']}{pr}{reason}")

    def _print_all_runs_report(self):
        """Print summary report of all runs."""
        runs = self._get_all_runs()
        if not runs:
            print("📊 No parallel runs recorded yet.")
            return

        print("\n" + "="*60)
        print("📊 PARALLEL DEVELOPMENT METRICS - ALL RUNS")
        print("="*60)

        total_tasks = sum(r['tasks_total'] for r in runs)
        total_completed = sum(r['tasks_completed'] for r in runs)
        total_prs = sum(r['prs_created'] for r in runs)
        total_time = sum(r['time_spent'] for r in runs)

        avg_completion = (total_completed / total_tasks * 100) if total_tasks else 0
        avg_pr_rate = (total_prs / total_tasks * 100) if total_tasks else 0

        print(f"\nTotal Runs: {len(runs)}")
        print(f"Total Tasks: {total_completed}/{total_tasks} ({round(avg_completion, 1)}%)")
        print(f"Total PRs: {total_prs}/{total_tasks} ({round(avg_pr_rate, 1)}%)")
        print(f"Total Time: {round(total_time, 1)}h")

        # Calculate average efficiency
        runs_with_efficiency = [r for r in runs if r.get('efficiency_ratio')]
        if runs_with_efficiency:
            avg_efficiency = sum(r['efficiency_ratio'] for r in runs_with_efficiency) / len(runs_with_efficiency)
            print(f"Avg Efficiency: {round(avg_efficiency, 2)}x faster")

        print("\n" + "-"*60)
        print("Recent Runs:")
        print("-"*60)

        for run in sorted(runs, key=lambda r: r['run_id'], reverse=True)[:5]:
            date = datetime.fromisoformat(run['start_time']).strftime('%Y-%m-%d')
            efficiency = f" ({run['efficiency_ratio']}x)" if run.get('efficiency_ratio') else ""
            print(f"#{run['run_id']:2} | {date} | {run['project']:25} | "
                  f"{run['prs_created']}/{run['tasks_total']} PRs | "
                  f"{run['time_spent']}h{efficiency}")

        print("="*60 + "\n")


def main():
    parser = argparse.ArgumentParser(description="Parallel Development Metrics Tracker")
    subparsers = parser.add_subparsers(dest='command', help='Commands')

    # Start command
    start_parser = subparsers.add_parser('start', help='Start a new parallel run')
    start_parser.add_argument('--project', required=True, help='Project name')
    start_parser.add_argument('--tasks', type=int, required=True, help='Number of tasks')
    start_parser.add_argument('--estimate', type=float, help='Sequential time estimate (hours)')

    # Complete command
    complete_parser = subparsers.add_parser('complete', help='Mark task as completed')
    complete_parser.add_argument('--task-id', type=int, required=True, help='Task ID')
    complete_parser.add_argument('--pr-created', choices=['yes', 'no'], required=True, help='Was PR created?')
    complete_parser.add_argument('--time', type=float, help='Time spent on task (hours)')

    # Fail command
    fail_parser = subparsers.add_parser('fail', help='Mark task as failed')
    fail_parser.add_argument('--task-id', type=int, required=True, help='Task ID')
    fail_parser.add_argument('--reason', required=True, help='Failure reason')

    # End command
    end_parser = subparsers.add_parser('end', help='End current run')
    end_parser.add_argument('--time-spent', type=float, required=True, help='Total time spent (hours)')
    end_parser.add_argument('--notes', help='Additional notes')

    # Report command
    report_parser = subparsers.add_parser('report', help='Generate metrics report')
    report_parser.add_argument('--run-id', type=int, help='Specific run ID to report on')

    args = parser.parse_args()
    metrics = ParallelMetrics()

    if args.command == 'start':
        metrics.start_run(args.project, args.tasks, args.estimate)
    elif args.command == 'complete':
        pr_created = args.pr_created == 'yes'
        metrics.complete_task(args.task_id, pr_created, args.time)
    elif args.command == 'fail':
        metrics.fail_task(args.task_id, args.reason)
    elif args.command == 'end':
        metrics.end_run(args.time_spent, args.notes)
    elif args.command == 'report':
        metrics.generate_report(args.run_id)
    else:
        parser.print_help()


if __name__ == '__main__':
    main()
