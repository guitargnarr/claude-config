# Session Startup Checklist

**Updated:** February 5, 2026
**Purpose:** Pre-flight check before doing real work. Prevents the top 5 recurring session killers.

---

## 1. Environment (30 sec)

```bash
# Check for shell vars that override .env
env | grep -i "DATABASE_URL\|GMAIL_\|SUPABASE_"
# If any are set and shouldn't be:
unset DATABASE_URL GMAIL_CREDENTIALS_FILE GMAIL_TOKEN_FILE GMAIL_SCOPES
```

**Why:** pydantic-settings gives shell vars priority over .env. This causes cryptic PostgreSQL errors when you want SQLite, and Gmail service init failures. Documented 5+ times across files because it keeps happening.

---

## 2. Git State (15 sec)

```bash
git status          # Clean? Uncommitted work?
git branch          # On correct branch?
git log --oneline -3  # Recent commits match expectations?
```

**Why:** Building on stale branch or uncommitted state causes merge conflicts and lost work later.

---

## 3. Deployment Check (if modifying deployed app) (2 min)

```bash
# What's already deployed?
vercel list 2>/dev/null | head -10
# Test the live URL (SPAs need Playwright, not curl)
npx playwright screenshot --wait-for-timeout=5000 "https://site.vercel.app" verify.png
```

**Why:** OurJourney lesson (Nov 25) - 2 hours wasted building on wrong codebase. Always verify deployed version before assuming local is canonical. Full protocol: @~/.claude/reference/deployment-discovery-protocol.md

---

## 4. Define Goal (15 sec)

Before writing code, state in one sentence:
- **What** you're building/fixing
- **Where** the result will be visible (URL, command, file)
- **When** it's done (specific success criteria)

**Why:** Prevents analysis spiral (Pattern 1). Sessions without a clear goal waste 40+ minutes planning with 0 code. @~/.claude/reference/known-failure-patterns.md

---

## 5. Token Efficiency (5 sec)

- Don't pre-load philosophy docs, playbooks, or archives
- Use `@file` references instead of full reads until needed
- `/clear` between unrelated tasks

**Why:** Quality degrades around 250k tokens. Save budget for implementation, not startup context.

---

## Quick Copy-Paste

```bash
# Run before starting work on any Python project
env | grep -i "DATABASE_URL\|GMAIL_\|SUPABASE_" && echo "^^^ UNSET THESE" || echo "Clean"
git status && git branch --show-current && git log --oneline -3
```
