#!/usr/bin/env python3
"""
Pattern Learning Dashboard
Quick view of pattern learning statistics and recommendations
"""

import sys
from pathlib import Path

# Add lib directory to path
sys.path.insert(0, str(Path(__file__).parent / "lib"))

from parallel_memory import ParallelDevMemory


def generate_dashboard():
    """Generate and display pattern learning dashboard"""
    m = ParallelDevMemory()

    print("=" * 70)
    print("PATTERN LEARNING DASHBOARD".center(70))
    print("=" * 70)

    # Overall stats
    stats = m.get_statistics()
    print(f"\n📊 Overall Statistics")
    print(f"{'─' * 70}")
    print(f"  Total runs:        {stats['total_runs']}")
    print(f"  Average quality:   {stats['avg_quality_score']}/100")
    print(f"  Success rate:      {stats['avg_success_rate']}%")
    print(f"  Average time:      {stats['avg_execution_time_min']:.1f} minutes")
    print(f"  PRs created:       {stats['total_prs_created']}")
    print(f"  PRs merged:        {stats['total_prs_merged']}")

    # Success patterns
    print(f"\n✅ Top Success Patterns")
    print(f"{'─' * 70}")
    patterns = m.get_successful_patterns(limit=5)
    if patterns:
        for i, p in enumerate(patterns, 1):
            spec_type = p['pattern'].get('specification_type', 'unknown')
            print(f"  {i}. {spec_type}")
            print(f"     Quality: {p['avg_quality_score']:.1f}/100, "
                  f"Success: {p['avg_success_rate']*100:.0f}%, "
                  f"Used: {p['usage_count']}x")
            if 'avg_time_minutes' in p and p['avg_time_minutes']:
                print(f"     Avg time: {p['avg_time_minutes']:.1f} min")
    else:
        print("  No patterns found yet. Record more runs to build patterns.")

    # Recent runs
    print(f"\n📅 Recent Runs")
    print(f"{'─' * 70}")
    runs = m.get_recent_runs(limit=5)
    if runs:
        for run in runs:
            desc = run['description'][:55]
            if len(run['description']) > 55:
                desc += "..."
            print(f"  • {desc}")
            time_str = f"{run['execution_time_min']:.0f}" if run['execution_time_min'] else "0"
            print(f"    Quality: {run['quality_score']:.1f}/100, "
                  f"Success: {run['success_rate']*100:.0f}%, "
                  f"Time: {time_str} min")
    else:
        print("  No runs recorded yet.")

    # Recommendations by category
    print(f"\n💡 Recommendations by Category")
    print(f"{'─' * 70}")
    categories = ['ui', 'api', 'testing', 'refactor', 'docs']
    recommendations_found = False

    for category in categories:
        suggestion = m.suggest_optimization(category)
        if 'No historical data' not in suggestion['suggestion']:
            recommendations_found = True
            # Extract first line of suggestion
            first_line = suggestion['suggestion'].split('\n')[0]
            if len(first_line) > 55:
                first_line = first_line[:52] + "..."
            print(f"  {category.upper():10} → {first_line}")

    if not recommendations_found:
        print("  No category-specific patterns yet.")
        print("  General recommendation: Continue with v4_autonomous pattern.")

    # Trend analysis
    if stats['total_runs'] >= 5:
        print(f"\n📈 Trend Analysis")
        print(f"{'─' * 70}")
        recent_5 = m.get_recent_runs(limit=5)
        avg_recent = sum(r['quality_score'] for r in recent_5) / len(recent_5)
        trend = "Improving" if avg_recent > stats['avg_quality_score'] else "Stable"
        print(f"  Recent 5 runs avg: {avg_recent:.1f}/100")
        print(f"  Overall average:   {stats['avg_quality_score']:.1f}/100")
        print(f"  Trend: {trend}")

    print("=" * 70)
    print()

    m.close()


if __name__ == "__main__":
    try:
        generate_dashboard()
    except Exception as e:
        print(f"Error generating dashboard: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
