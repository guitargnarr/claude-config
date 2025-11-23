# Global Claude Code Setup

## Critical Rules
- **Ultrathink:** ONLY when I explicitly request it (prevents analysis paralysis)
- **Documentation:** Max 5 files per project, 500 lines each (README/CLAUDE.md/TODO allowed)
- **Code first:** Implement before documenting (docs describe what exists, not plans)
- **Delete planning docs** after extracting action items (prevent bloat)
- **Work mode:** Consulting and platform building (sustainable income model)
- Never use emojis unless explicitly requested

## System Info
- Python: 3.14 at `/Library/Frameworks/Python.framework/Versions/3.14/bin/python3`
- GitHub: guitargnarr (matthewdscott7@gmail.com)
- Deployment: Vercel (`vercel --prod --yes`), test first: `npm run build && npm run preview`

## Critical Pitfalls
- **NO vercel.json for Vite projects** (breaks auto-detect)
- **NO Tailwind v4** (use v3)
- **Absolute URLs for OG meta tags**

## Private Data Protection
**CRITICAL - Never read/edit without permission:**
- `**/JOB_TRACKER*.csv`, `**/GMAIL_*.csv`, `**/APPLICATIONS*.csv`
- `~/Desktop/1_PRIORITY_JOB_SEARCH/**` (historical data, archived)

## Communication Style
- Direct, technical, honest
- Code examples > Long explanations
- Facts > Speculation

## Quality Standards
Task complete ONLY when:
- Tests pass (run actual tests)
- Build succeeds
- Committed to git

## Context Management
- `/clear` after major tasks
- `/model [haiku|sonnet|opus]` - right model for task

## Parallel Development (2-4x faster)
For 2-4 independent tasks: Use git worktrees + multiple Claude terminals
- **Full playbook:** @~/.claude/reference/parallel-development-playbook.md
- Proven: 60-70% time savings, 50-100% PR success rate acceptable

## AI-Native Development Toolkit (2025-11-19)
**Quick Commands:**
- `claude-inventory` - Show available tools
- `claude-verify` - Verify toolkit works
- `claude-status` - Check what needs attention
- `claude-export [type]` - Generate documentation exports

**Core Documentation:**
- **Tool inventory:** @~/.claude/MASTER_INDEX.md
- **Collaboration:** @~/.claude/COLLABORATION_CONTRACT.md (how human + AI work together)
- **Verification:** @~/.claude/TRUST_PROTOCOL.md (never trust, always verify)
- **Methodology:** @~/.claude/METHODOLOGY_PROVEN.md (parallel dev v4, 100% success)
- **Philosophy:** @~/.claude/FOUNDATIONS.md (the "why" behind AI-native development)

## Reference Documentation (Load on-demand via @)
- **Anthropic workflows:** @~/.claude/archive/WORKFLOWS.md
- **System documentation:** @~/.claude/archive/SYSTEM_DOCUMENTATION.md
- **Permissions:** @~/.claude/archive/PERMISSIONS_GUIDE.md
- When opening websites for me verify what is displayed on screen
---
## 🚨 LATEST GOVERNANCE UPDATE (Nov 23, 2025)
**Applies to ALL projects. Overrides previous conflicting instructions.**

### 1. Tabula Rasa Law (Context Integrity)
- **CRITICAL**: NEVER bake personal context (mortgages, health, specific location) into prompts or models.
- If an AI tool generates personal life advice, **DISCARD IMMEDIATELY**. It is a hallucination/context leak.
- **Strict Scope**: Actions must map to Operational Assets (Repos, Deployments, Revenue).

### 2. Work Mode: CAPITALIZATION PHASE
- **Current Phase**: `DEPLOY` -> **`SELL`**
- We are no longer just building tools. We are capitalizing on them.
- **Required Focus**:
  1. Monetize deployed assets (add user-facing interfaces)
  2. Package tools for sale (courses, templates, consulting)
  3. Assess repos for value (not just deployability)

### 3. AI + Python Hybrid Pattern
- Use AI for: qualitative tasks (code generation, recommendations)
- Use Python for: quantitative tasks (scoring, math, deterministic logic)
- Don't use AI for: static inventory (CLI tools + JSON simpler)
- Small models can't do arithmetic reliably (proven Nov 22)

### 4. Deployment Gotchas (Learned Nov 23)
- **Vercel**: Defaults to auth-protected. Disable "Vercel Authentication" in Project Settings → Deployment Protection
- **Railway**: Requires PORT from environment variable (not hardcoded 8000)
- **Vercel + GitHub**: Auto-connects when repo is pushed, enables CI/CD automatically
