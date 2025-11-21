#!/usr/bin/env python3
"""
Store Parallel Development Results
Records parallel dev runs with pattern learning integration
Based on Mirador's timestamped storage approach
"""

import json
import argparse
from datetime import datetime
from pathlib import Path
import sys
import os

# Add lib directory to path
sys.path.insert(0, str(Path(__file__).parent / "lib"))

from parallel_memory import ParallelDevMemory, calculate_parallel_quality_score


class ParallelResultStorage:
    """Manage timestamped storage for parallel dev runs"""

    def __init__(self, base_dir: str = None):
        if base_dir is None:
            base_dir = str(Path.home() / ".claude" / "parallel-results")

        self.base_dir = Path(base_dir)
        self.base_dir.mkdir(parents=True, exist_ok=True)

        # Category directories
        self.categories = {
            'ui': self.base_dir / 'ui_features',
            'api': self.base_dir / 'api_features',
            'testing': self.base_dir / 'testing',
            'docs': self.base_dir / 'documentation',
            'refactor': self.base_dir / 'refactoring',
            'all': self.base_dir / 'all_runs'
        }

        for category_dir in self.categories.values():
            category_dir.mkdir(parents=True, exist_ok=True)

        self.memory = ParallelDevMemory()

    def create_run_directory(self, timestamp: str = None) -> Path:
        """Create timestamped directory for this run"""
        if timestamp is None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

        run_dir = self.categories['all'] / f"run_{timestamp}"
        run_dir.mkdir(exist_ok=True)
        return run_dir

    def store_run(self, run_data: dict) -> Path:
        """Store complete run with pattern learning"""

        # Calculate quality score
        quality_score = calculate_parallel_quality_score(run_data)
        run_data['quality_score'] = quality_score

        # Calculate success rate
        prs_created = run_data.get('prs_created', 0)
        prs_merged = run_data.get('prs_merged', 0)
        success_rate = prs_merged / prs_created if prs_created > 0 else 0.0
        run_data['success_rate'] = success_rate

        # Create timestamped directory
        run_dir = self.create_run_directory()

        # Save summary
        summary_file = run_dir / "summary.json"
        with open(summary_file, 'w') as f:
            json.dump({
                **run_data,
                'timestamp': datetime.now().isoformat(),
                'stored_at': str(run_dir)
            }, f, indent=2)

        # Save to database for pattern learning
        self.memory.record_parallel_run({
            'description': run_data.get('description', 'Parallel dev run'),
            'features': run_data.get('features', []),
            'specification_pattern': run_data.get('specification_pattern', {}),
            'execution_time_min': run_data.get('execution_time_min'),
            'quality_score': quality_score,
            'success_rate': success_rate,
            'prs_created': prs_created,
            'prs_merged': prs_merged,
            'conflicts_encountered': run_data.get('conflicts_encountered', 0),
            'manual_fixes_needed': run_data.get('manual_fixes_needed', 0)
        })

        # Categorize by primary feature type
        category = run_data.get('category', 'ui')
        if category in self.categories:
            category_link = self.categories[category] / f"run_{run_dir.name}"
            if not category_link.exists():
                # Create symlink to run directory
                try:
                    category_link.symlink_to(run_dir)
                except OSError:
                    # If symlink fails (Windows), copy summary file instead
                    import shutil
                    shutil.copy(summary_file, self.categories[category] / f"run_{run_dir.name}.json")

        print(f"✅ Run stored: {run_dir}")
        print(f"   Quality score: {quality_score:.1f}/100")
        print(f"   Success rate: {success_rate*100:.1f}%")
        print(f"   Category: {category}")

        return run_dir


def main():
    parser = argparse.ArgumentParser(description="Store parallel development run results")

    parser.add_argument('--description', required=True, help='Run description')
    parser.add_argument('--features', required=True, help='Comma-separated feature names')
    parser.add_argument('--category', default='ui', choices=['ui', 'api', 'testing', 'docs', 'refactor'],
                        help='Feature category')

    parser.add_argument('--prs-created', type=int, default=0, help='Number of PRs created')
    parser.add_argument('--prs-merged', type=int, default=0, help='Number of PRs merged')
    parser.add_argument('--conflicts', type=int, default=0, help='Conflicts encountered')
    parser.add_argument('--manual-fixes', type=int, default=0, help='Manual fixes needed')
    parser.add_argument('--time-minutes', type=float, help='Execution time in minutes')

    parser.add_argument('--tests-passing', action='store_true', help='Tests passed')
    parser.add_argument('--spec-type', default='v4_autonomous', help='Specification type used')
    parser.add_argument('--build-gates', action='store_true', default=True, help='Build gates used')

    args = parser.parse_args()

    # Parse features
    features = [f.strip() for f in args.features.split(',')]

    # Build run data
    run_data = {
        'description': args.description,
        'features': features,
        'category': args.category,
        'prs_created': args.prs_created,
        'prs_merged': args.prs_merged,
        'conflicts_encountered': args.conflicts,
        'manual_fixes_needed': args.manual_fixes,
        'execution_time_min': args.time_minutes,
        'tests_passing': args.tests_passing,
        'specification_pattern': {
            'specification_type': args.spec_type,
            'build_gates_used': args.build_gates,
            'conflict_detection': 'automatic',
            'feature_types': [args.category] * len(features)
        }
    }

    # Store the run
    storage = ParallelResultStorage()
    run_dir = storage.store_run(run_data)

    # Show pattern suggestions
    print("\n📊 Pattern Learning:")
    suggestion = storage.memory.suggest_optimization(args.category)
    print(suggestion['suggestion'])

    storage.memory.close()


if __name__ == '__main__':
    main()
