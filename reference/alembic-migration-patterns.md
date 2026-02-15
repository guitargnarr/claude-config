# Alembic Migration Patterns

**Updated:** February 5, 2026
**Context:** 10+ migration-related fixes in job-search-automation. Dual SQLite (local) + PostgreSQL (prod).

---

## Golden Rules

1. **Migrations run at START time, not BUILD time** (Render `render-build.sh` calls alembic after install)
2. **Every migration must be idempotent** - check if column/table/index exists before creating
3. **Use `information_schema` for existence checks** (works on PostgreSQL; SQLite needs different approach)
4. **Test locally on SQLite AND against prod PostgreSQL** before deploying

---

## Idempotent Migration Template

```python
from alembic import op
import sqlalchemy as sa

def _column_exists(conn, table, column):
    """PostgreSQL-compatible existence check."""
    result = conn.execute(sa.text(
        "SELECT 1 FROM information_schema.columns "
        f"WHERE table_name = '{table}' AND column_name = '{column}'"
    ))
    return result.fetchone() is not None

def _table_exists(conn, table):
    result = conn.execute(sa.text(
        "SELECT 1 FROM information_schema.tables "
        f"WHERE table_name = '{table}'"
    ))
    return result.fetchone() is not None

def _index_exists(conn, index_name):
    result = conn.execute(sa.text(
        "SELECT 1 FROM pg_indexes "
        f"WHERE indexname = '{index_name}'"
    ))
    return result.fetchone() is not None

def upgrade():
    conn = op.get_bind()
    if not _column_exists(conn, 'my_table', 'new_column'):
        op.add_column('my_table', sa.Column('new_column', sa.String(255), nullable=True))
```

---

## Multi-Table Column Addition (Proven Pattern)

From `002_add_user_id.py` - adds column to 8 tables safely:

```python
TABLES = ['companies', 'jobs', 'applications', ...]

def upgrade():
    conn = op.get_bind()
    for table in TABLES:
        if not _table_exists(conn, table):
            continue  # Skip missing tables
        if _column_exists(conn, table, 'user_id'):
            continue  # Skip if already added
        # 1. Add nullable
        op.add_column(table, sa.Column('user_id', sa.String(255), nullable=True))
        # 2. Backfill existing rows
        op.execute(sa.text(f"UPDATE {table} SET user_id = 'legacy_user' WHERE user_id IS NULL"))
        # 3. Make NOT NULL
        op.alter_column(table, 'user_id', nullable=False)
        # 4. Add index (check first)
        idx = f'ix_{table}_user_id'
        if not _index_exists(conn, idx):
            op.create_index(idx, table, ['user_id'])
```

---

## SQLite vs PostgreSQL Gotchas

| Feature | SQLite | PostgreSQL | Fix |
|---------|--------|------------|-----|
| `information_schema` | Not supported | Works | Use `pragma_table_info` for SQLite |
| `ALTER COLUMN` | Very limited | Full support | May need table recreation on SQLite |
| `strftime` | SQLite function | Use `to_char` | Abstract in service layer |
| `GROUP BY` strictness | Loose | Strict (all non-agg columns) | Always list all columns |
| Auto-increment | `AUTOINCREMENT` | `SERIAL` / `IDENTITY` | Let SQLAlchemy handle |
| Boolean | Stored as 0/1 | Native `BOOLEAN` | SQLAlchemy abstracts |

---

## env.py Dialect Handling

```python
# alembic/env.py - Convert DATABASE_URL to correct dialect
database_url = os.environ.get("DATABASE_URL")
if database_url:
    if database_url.startswith("postgresql://"):
        database_url = database_url.replace("postgresql://", "postgresql+psycopg://", 1)
    elif database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql+psycopg://", 1)
    config.set_main_option("sqlalchemy.url", database_url)
```

**Note:** Backend uses `pg8000` driver, but Alembic uses `psycopg` (v3). These are separate connections.

---

## Common Commands

```bash
# Create new migration
alembic revision -m "add_column_to_table"

# Run pending migrations
alembic upgrade head

# Check current version
alembic current

# Rollback one step
alembic downgrade -1

# Show migration history
alembic history
```

---

## Pre-Migration Checklist

- [ ] Idempotent (safe to run twice)
- [ ] Handles missing tables gracefully
- [ ] Tested on local SQLite
- [ ] `downgrade()` implemented and tested
- [ ] No raw SQL that differs between SQLite/PostgreSQL
- [ ] Index names are unique and descriptive
