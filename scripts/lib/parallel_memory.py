#!/usr/bin/env python3
"""
Parallel Development Memory Backend
Adapted from Mirador's MiradorMemory class for pattern learning in parallel dev
"""

import sqlite3
import json
import hashlib
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Optional

class ParallelDevMemory:
    """SQLite-backed memory for parallel development pattern learning"""

    def __init__(self, db_path: Optional[str] = None):
        if db_path is None:
            db_path = str(Path.home() / ".claude" / "parallel_dev_memory.db")

        self.db_path = db_path
        self.conn = sqlite3.connect(db_path)
        self.ensure_tables()

    def ensure_tables(self):
        """Create required tables if they don't exist"""
        cursor = self.conn.cursor()

        # Parallel development history table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS parallel_history (
                id INTEGER PRIMARY KEY,
                run_description TEXT NOT NULL,
                run_hash TEXT NOT NULL,
                features TEXT NOT NULL,
                specification_pattern TEXT NOT NULL,
                execution_time_min REAL,
                quality_score REAL,
                success_rate REAL,
                prs_created INTEGER,
                prs_merged INTEGER,
                conflicts_encountered INTEGER,
                manual_fixes_needed INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')

        # Success patterns table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS success_patterns (
                id INTEGER PRIMARY KEY,
                pattern_type TEXT NOT NULL,
                pattern_data TEXT NOT NULL,
                success_count INTEGER DEFAULT 1,
                avg_quality_score REAL,
                last_used TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')

        self.conn.commit()

    def record_parallel_run(self, run_data: Dict) -> int:
        """Record parallel dev run in history"""
        run_hash = hashlib.md5(run_data['description'].encode()).hexdigest()

        cursor = self.conn.cursor()
        cursor.execute('''
            INSERT INTO parallel_history
            (run_description, run_hash, features, specification_pattern,
             execution_time_min, quality_score, success_rate,
             prs_created, prs_merged, conflicts_encountered, manual_fixes_needed)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            run_data['description'],
            run_hash,
            json.dumps(run_data['features']),
            json.dumps(run_data['specification_pattern']),
            run_data.get('execution_time_min'),
            run_data.get('quality_score'),
            run_data.get('success_rate'),
            run_data.get('prs_created', 0),
            run_data.get('prs_merged', 0),
            run_data.get('conflicts_encountered', 0),
            run_data.get('manual_fixes_needed', 0)
        ))

        self.conn.commit()
        return cursor.lastrowid

    def get_successful_patterns(self, min_quality: float = 70.0, limit: int = 10) -> List[Dict]:
        """Retrieve successful specification patterns"""
        cursor = self.conn.cursor()
        cursor.execute('''
            SELECT specification_pattern,
                   AVG(quality_score) as avg_score,
                   AVG(success_rate) as avg_success_rate,
                   COUNT(*) as usage_count,
                   MIN(conflicts_encountered) as min_conflicts,
                   AVG(execution_time_min) as avg_time
            FROM parallel_history
            WHERE quality_score > ?
            GROUP BY specification_pattern
            ORDER BY avg_score DESC, usage_count DESC
            LIMIT ?
        ''', (min_quality, limit))

        patterns = []
        for row in cursor.fetchall():
            patterns.append({
                'pattern': json.loads(row[0]),
                'avg_quality_score': row[1],
                'avg_success_rate': row[2],
                'usage_count': row[3],
                'min_conflicts': row[4],
                'avg_time_minutes': row[5]
            })

        return patterns

    def get_patterns_by_feature_type(self, feature_type: str, limit: int = 5) -> List[Dict]:
        """Get successful patterns for specific feature type"""
        cursor = self.conn.cursor()

        # Query runs where features contain the specified type
        cursor.execute('''
            SELECT specification_pattern,
                   AVG(quality_score) as avg_score,
                   AVG(success_rate) as avg_success_rate,
                   COUNT(*) as usage_count
            FROM parallel_history
            WHERE features LIKE ? AND quality_score > 70
            GROUP BY specification_pattern
            ORDER BY avg_score DESC
            LIMIT ?
        ''', (f'%{feature_type}%', limit))

        patterns = []
        for row in cursor.fetchall():
            patterns.append({
                'pattern': json.loads(row[0]),
                'avg_quality_score': row[1],
                'avg_success_rate': row[2],
                'usage_count': row[3]
            })

        return patterns

    def get_recent_runs(self, limit: int = 10) -> List[Dict]:
        """Get recent parallel dev runs"""
        cursor = self.conn.cursor()
        cursor.execute('''
            SELECT run_description, features, quality_score, success_rate,
                   prs_created, prs_merged, execution_time_min, created_at
            FROM parallel_history
            ORDER BY created_at DESC
            LIMIT ?
        ''', (limit,))

        runs = []
        for row in cursor.fetchall():
            runs.append({
                'description': row[0],
                'features': json.loads(row[1]),
                'quality_score': row[2],
                'success_rate': row[3],
                'prs_created': row[4],
                'prs_merged': row[5],
                'execution_time_min': row[6],
                'created_at': row[7]
            })

        return runs

    def get_statistics(self) -> Dict:
        """Get overall statistics"""
        cursor = self.conn.cursor()

        # Total runs
        cursor.execute("SELECT COUNT(*) FROM parallel_history")
        total_runs = cursor.fetchone()[0]

        # Average metrics
        cursor.execute("""
            SELECT AVG(quality_score), AVG(success_rate),
                   AVG(execution_time_min), SUM(prs_created), SUM(prs_merged)
            FROM parallel_history
        """)
        row = cursor.fetchone()

        return {
            'total_runs': total_runs,
            'avg_quality_score': round(row[0] or 0, 1),
            'avg_success_rate': round((row[1] or 0) * 100, 1),
            'avg_execution_time_min': round(row[2] or 0, 1),
            'total_prs_created': row[3] or 0,
            'total_prs_merged': row[4] or 0
        }

    def suggest_optimization(self, feature_type: Optional[str] = None) -> Dict:
        """Suggest optimizations based on historical patterns"""
        if feature_type:
            patterns = self.get_patterns_by_feature_type(feature_type, limit=3)
        else:
            patterns = self.get_successful_patterns(limit=3)

        if not patterns:
            return {
                'suggestion': 'No historical data available yet. Run more parallel dev sessions to build patterns.',
                'patterns': []
            }

        top_pattern = patterns[0]

        suggestion = f"Based on {top_pattern['usage_count']} successful runs"
        if feature_type:
            suggestion += f" for {feature_type} features"
        suggestion += f":\n"
        suggestion += f"  - Average quality score: {top_pattern['avg_quality_score']:.1f}/100\n"
        suggestion += f"  - Success rate: {top_pattern['avg_success_rate']*100:.1f}%\n"

        if 'min_conflicts' in top_pattern and top_pattern['min_conflicts'] is not None:
            suggestion += f"  - Conflicts: {top_pattern['min_conflicts']} minimum\n"

        pattern_details = top_pattern['pattern']
        if 'specification_type' in pattern_details:
            suggestion += f"  - Recommended specification: {pattern_details['specification_type']}\n"
        if 'build_gates_used' in pattern_details:
            suggestion += f"  - Build gates: {'enabled' if pattern_details['build_gates_used'] else 'disabled'}\n"

        return {
            'suggestion': suggestion,
            'patterns': patterns
        }

    def close(self):
        """Close database connection"""
        self.conn.close()


def calculate_parallel_quality_score(run_result: Dict) -> float:
    """
    Calculate 50-100 quality score for parallel dev run
    Adapted from Mirador's quality scoring
    """
    score = 50.0  # Base score for attempting run

    # Success rate bonus (max +20)
    success_rate = run_result.get('success_rate', 0.0)
    score += success_rate * 20  # 100% = +20, 50% = +10

    # No conflicts bonus (+10)
    if run_result.get('conflicts_encountered', 0) == 0:
        score += 10

    # Tests passing bonus (+10)
    if run_result.get('tests_passing', False):
        score += 10

    # No manual fixes bonus (+10)
    if run_result.get('manual_fixes_needed', 0) == 0:
        score += 10

    return min(score, 100.0)


if __name__ == "__main__":
    # Test the memory backend
    print("Testing ParallelDevMemory...")

    memory = ParallelDevMemory()

    # Test recording a run
    test_run = {
        'description': 'Test parallel run - 4 UI features',
        'features': ['navigation', 'favorites', 'progress', 'sharing'],
        'specification_pattern': {
            'specification_type': 'v4_autonomous',
            'build_gates_used': True,
            'conflict_detection': 'automatic'
        },
        'execution_time_min': 80.0,
        'quality_score': 90.0,
        'success_rate': 1.0,
        'prs_created': 4,
        'prs_merged': 4,
        'conflicts_encountered': 0,
        'manual_fixes_needed': 0
    }

    run_id = memory.record_parallel_run(test_run)
    print(f"✓ Recorded run #{run_id}")

    # Test getting statistics
    stats = memory.get_statistics()
    print(f"✓ Statistics: {stats}")

    # Test pattern retrieval
    patterns = memory.get_successful_patterns()
    print(f"✓ Found {len(patterns)} successful patterns")

    # Test suggestion
    suggestion = memory.suggest_optimization()
    print(f"✓ Suggestion:\n{suggestion['suggestion']}")

    memory.close()
    print("\n✓ All tests passed!")
