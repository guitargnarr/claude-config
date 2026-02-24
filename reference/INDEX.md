# Reference Documents Index

**Total:** 58 documents (~16,300 lines)
**Location:** `~/.claude/reference/`
**Updated:** 2026-02-08
**Audit method:** Every file read, categorized, dated, line-counted

---

## Table of Contents

| # | Category | Files | Lines | Status |
|---|----------|-------|-------|--------|
| 1 | [Reusable Components](#reusable-components-5) | 5 | 1,639 | Current |
| 2 | [Client Site Development](#client-site-development-4) | 4 | 1,950 | Current |
| 3 | [Deployment & Infrastructure](#deployment--infrastructure-4) | 4 | 988 | Current |
| 4 | [Workflows & SOPs](#workflows--sops-4) | 4 | 666 | Current |
| 5 | [Parallel Development](#parallel-development-12) | 12 | 6,297 | Mixed (3 current, 9 archivable) |
| 6 | [Code Standards & Patterns](#code-standards--patterns-6) | 6 | 423 | Foundational |
| 7 | [Session Management](#session-management-4) | 4 | 1,052 | Mixed |
| 8 | [System Reference](#system-reference-5) | 5 | 234 | Foundational |
| 9 | [Project-Specific](#project-specific-3) | 3 | 1,691 | Current/Historical |
| 10 | [Config Files](#config-files-1) | 1 | 166 | Current |

---

## Reusable Components (4)

Drop-in 3D/visual components for client sites and portfolio.

| File | Lines | Updated | Purpose |
|------|-------|---------|---------|
| `entropy-viz-component.md` | 326 | Feb 7, 2026 | WebGPU/WebGL2 particle visualization (order/chaos, Shannon entropy) |
| `torus-knot-component.md` | 406 | Feb 7, 2026 | React Three Fiber crystalline glass knot (hero sections) |
| `formations-component.md` | 465 | Feb 7, 2026 | 9 standalone Three.js glass animations (Architectural Noir) |
| `oracle-query-pattern.md` | 92 | Feb 7, 2026 | Multi-model design query pipeline (design-oracle + atlas + elite-frontend) |
| `scroll-driven-3d-experience.md` | 350 | Feb 15, 2026 | Replicable scroll-driven 3D storytelling (Tailwind v4, R3F, Web Audio, mobile scroll) — proven at The Quiet Trade |

**Load with:** `@~/.claude/reference/[filename]`

---

## Client Site Development (4)

Templates, asset generation, and quality standards for client demo sites.

| File | Lines | Updated | Purpose |
|------|-------|---------|---------|
| `tier-templates-reference.md` | 1,293 | Feb 5, 2026 | UI/UX patterns for 4 tiers + specialty templates (Lighthouse scores, WCAG AA, 3D effects, booking, e-commerce, auth) |
| `device-mockup-workflow.md` | 249 | Jan 18, 2026 | Screenshot capture (3 viewports) + device frame generation + portfolio card requirements |
| `client-site-assets-sop.md` | 133 | Feb 5, 2026 | 10-min end-to-end asset pipeline (iPhone mockup, OG image, QR code, favicons) |
| `seo-checklist.md` | 262 | Jan 12, 2026 | Meta tags, sitemap, robots.txt, OG images, structured data |
| `accessibility-standards.md` | 162 | Jan 1, 2026 | WCAG AA compliance: teal-700 contrast fix, ARIA, keyboard nav |

**Site generation guide:** `~/Projects/client-sites/templates/SITE_GENERATION_GUIDE.md` (step-by-step, lives with the templates)

**Key reference chain:** tier-templates -> SITE_GENERATION_GUIDE -> client-site-assets-sop -> device-mockup-workflow -> seo-checklist

---

## Deployment & Infrastructure (4)

Live systems, env vars, and deployment verification.

| File | Lines | Updated | Purpose |
|------|-------|---------|---------|
| `deployment-inventory.md` | 242 | Feb 20, 2026 | 45 GitHub repos, 69 client sites (69 deployed), 12 Render APIs, 85 Ollama models |
| `deployment-discovery-protocol.md` | 409 | Jan 17, 2026 | OurJourney lesson: always inventory deployments before building |
| `environment-secrets-checklist.md` | 92 | Feb 5, 2026 | Vercel/Render/Railway env var gotchas, Vite build-time baking |
| `known-failure-patterns.md` | 69 | Feb 5, 2026 | Top 5 session-killing failures across 45 GitHub repos |

---

## Workflows & SOPs (4)

Standard operating procedures for daily work.

| File | Lines | Updated | Purpose |
|------|-------|---------|---------|
| `workflows.md` | 245 | Jan 17, 2026 | Git (PR required), Vercel deploy, Render deploy, mobile verification, brand system |
| `ultrathink-definition.md` | 91 | Jan 9, 2026 | Automatic complexity analysis (5+ files, arch decisions, security changes) |
| `unified-task-prompt.md` | 352 | Feb 4, 2026 | v3.5 parallel terminal template + full project inventory lookup |
| `alembic-migration-patterns.md` | 139 | Feb 5, 2026 | SQLite + PostgreSQL dual database migration patterns |

---

## Parallel Development (12)

Git worktree + tmux parallel workflow. **3 current, 9 historical.**

### Current (use these)

| File | Lines | Updated | Purpose |
|------|-------|---------|---------|
| `parallel-development-playbook.md` | 697 | Jan 17, 2026 | **v5.0 canonical** -- tmux integration, 88% success rate, full workflow |
| `unified-task-prompt.md` | 352 | Feb 4, 2026 | v3.5 task template (also in Workflows) |
| `parallel-preflight-checklist.md` | 399 | Nov 16, 2025 | Pre-flight validation (still referenced by v5) |

### Historical / Archive Candidates

These document the v2->v3->v4 evolution. Content is preserved in the v5 playbook and `~/.claude/archive/parallel-development-version-history.md`.

| File | Lines | Created | Superseded By |
|------|-------|---------|---------------|
| `parallel-terminal-prompt-template-v3.md` | 539 | Nov 16, 2025 | unified-task-prompt.md |
| `parallel-terminal-prompt-template.md` | 205 | Nov 15, 2025 | v3 template |
| `parallel-development-prompts-v4.md` | 1,066 | Nov 16, 2025 | unified-task-prompt.md |
| `parallel-v4-SUMMARY.md` | 192 | Nov 16, 2025 | playbook v5 |
| `next-parallel-run-QUICKSTART.md` | 344 | Nov 16, 2025 | playbook v5 |
| `next-parallel-run.md` | 319 | Nov 16, 2025 | Specific run plan (completed) |
| `next-parallel-run-prompts.md` | 679 | Nov 16, 2025 | Specific run prompts (completed) |
| `next-run-quickstart.sh` | 146 | Nov 16, 2025 | tmux-parallel.sh |
| `IMPLEMENTATION_SUMMARY.md` | 521 | Nov 16, 2025 | v3 implementation notes |
| `guitar-parallel-prompts-READY.md` | 1,332 | Nov 16, 2025 | Specific guitar run (completed) |

**Recommendation:** Move 9 historical files to `~/.claude/archive/parallel-v2-v4/` to reduce noise. The v5 playbook + version history archive already preserve all lessons.

---

## Code Standards & Patterns (6)

Coding conventions and framework patterns.

| File | Lines | Updated | Purpose |
|------|-------|---------|---------|
| `react-typescript-patterns.md` | 117 | Feb 5, 2026 | verbatimModuleSyntax, type-only imports, ErrorBoundary patterns |
| `code-standards.md` | 48 | Oct 2025 | Max 500 lines/file, naming conventions |
| `testing-standards.md` | 46 | Oct 2025 | TDD workflow, test-first pattern |
| `frontend-testing.md` | 43 | Oct 2025 | Playwright MCP server debugging |
| `response-structure.md` | 36 | Oct 2025 | Minimize cognitive load, structured responses |
| `pitfalls.md` | 16 | Oct 2025 | Quick gotchas (Tailwind v4, vercel.json, OG URLs) |

**Note:** `pitfalls.md` content is largely duplicated in CLAUDE.md "Critical Pitfalls" section. Consider archiving.

---

## Session Management (4)

Session startup optimization and context transfer.

| File | Lines | Updated | Purpose |
|------|-------|---------|---------|
| `session-startup-checklist.md` | 73 | Feb 5, 2026 | Top 5 session killers, pre-flight check |
| `session-start-checklist.md` | 374 | Nov 2025 | Deployment discovery triggers (overlaps with above) |
| `EFFICIENT_SESSION_STARTUP.md` | 469 | Nov 2025 | Minimize token usage at startup |
| `cross-session-context-protocol.md` | 136 | Dec 10, 2025 | Transfer context between Claude sessions |

**Note:** `session-start-checklist.md` and `session-startup-checklist.md` overlap significantly. Consider merging into the newer, shorter file.

---

## System Reference (5)

Machine specs, file paths, and tool creation guides.

| File | Lines | Updated | Purpose |
|------|-------|---------|---------|
| `SYSTEM_MAP.md` | 92 | Oct 30, 2025 | ~/career vs ~/Desktop directory organization |
| `QUICK_COMMANDS.md` | 58 | Oct 30, 2025 | Most common tasks and paths |
| `FILE_LOCATIONS.md` | 49 | Oct 2025 | Resume variants, job tracker, Gmail integration paths |
| `SYSTEM_SPECS.md` | 14 | Oct 2025 | M3 Max, 36GB RAM, macOS 26.0.1 |
| `slash-command-creation.md` | 57 | Oct 2025 | How to create custom slash commands |

**Note:** `FILE_LOCATIONS.md` references `~/Desktop/1_PRIORITY_JOB_SEARCH/` paths (archived per CLAUDE.md). Paths may be stale.

---

## Project-Specific (3)

Documentation tied to specific projects or workflows.

| File | Lines | Updated | Purpose |
|------|-------|---------|---------|
| `MIRADOR_PATTERN_LEARNING_INTEGRATION.md` | 601 | Nov 20, 2025 | Mirador June 2025 pattern learning integration |
| `guitar-ollama-workflow.md` | 253 | Feb 23, 2026 | guitar_expert_precise Ollama model workflow + Songsterr extraction cross-ref |
| `gp7-xml-editing.md` | 140 | Feb 16, 2026 | GP7 (.gp) file format: ZIP/XML structure, required note properties, editing utility |
| `music-cover-workflow.md` | 204 | Feb 23, 2026 | Two-pipeline cover workflow: audio stem separation (yt-dlp + audio-separator) + Songsterr tab extraction (CDN -> GP5) |
| `merry-go-round-pattern.md` | 853 | Nov 17, 2025 | Rapid deploy pattern (4 commits/60 min), merry-go-round debugging |

**Note:** `merry-go-round-pattern.md` at 853 lines is the 3rd largest file. Consider archiving if pattern is no longer used.

---

## Business Operations (1)

| File | Lines | Updated | Purpose |
|------|-------|---------|---------|
| `business-formation.md` | 69 | Feb 20, 2026 | Project Lavos LLC formation tracker: timeline, deadlines, docs, financial setup |

---

## Miscellaneous (2)

| File | Lines | Updated | Purpose |
|------|-------|---------|---------|
| `stop-github-email-spam.md` | 79 | Nov 2025 | Cancel E2E test GitHub notification spam |
| `mcp-usage.md` | 33 | Oct 2025 | MCP server integration basics |
| `planning-workflow.md` | 40 | Oct 2025 | plan.md workflow |

---

## Config Files (1)

| File | Lines | Purpose |
|------|-------|---------|
| `tmux.conf` | 166 | Parallel dev tmux config (Ctrl+a prefix, teal/orange theme, mouse support) |

---

## Health Summary

| Metric | Value |
|--------|-------|
| Total files | 58 |
| Total lines | ~16,300 |
| Current (Jan-Feb 2026) | 20 files |
| Recent (Nov-Dec 2025) | 15 files |
| Foundational (Oct 2025) | 9 files |
| Historical / archivable | ~10 files (~5,400 lines) |
| Largest file | `tier-templates-reference.md` (1,293 lines) |
| Smallest file | `SYSTEM_SPECS.md` (14 lines) |

## Currency Flags

| Status | Meaning | Files |
|--------|---------|-------|
| CURRENT | Updated Jan-Feb 2026, actively used | 20 |
| FOUNDATIONAL | Oct 2025, still valid, rarely changes | 9 |
| STALE | References may be outdated | FILE_LOCATIONS.md, SYSTEM_MAP.md, QUICK_COMMANDS.md |
| SUPERSEDED | Replaced by newer version | 9 parallel dev v2-v4 files |
| DUPLICATE | Overlaps with another doc | session-start-checklist.md (overlaps session-startup-checklist.md), pitfalls.md (overlaps CLAUDE.md) |

## Cleanup Recommendations

1. **Archive 9 parallel dev historical files** to `~/.claude/archive/parallel-v2-v4/` (~5,000 lines, all superseded by v5 playbook)
2. **Merge** `session-start-checklist.md` into `session-startup-checklist.md` (keep shorter, newer one)
3. **Verify** `FILE_LOCATIONS.md` paths (may reference archived `1_PRIORITY_JOB_SEARCH` directory)
4. **Consider archiving** `pitfalls.md` (16 lines, all content already in CLAUDE.md)
5. **Consider archiving** `merry-go-round-pattern.md` (853 lines, specific to Nov 2025 debugging)

**Post-cleanup estimate:** ~40 active files, ~10,000 lines (35% reduction)

---

## Loading Reference Docs

```
# Load specific doc
@~/.claude/reference/tier-templates-reference.md

# Most-referenced docs (from CLAUDE.md @mentions):
@~/.claude/reference/tier-templates-reference.md      # Client site patterns
@~/.claude/reference/deployment-inventory.md           # All URLs and paths
@~/.claude/reference/workflows.md                      # Git, deploy, verify
@~/.claude/reference/parallel-development-playbook.md  # Parallel dev v5
@~/.claude/reference/unified-task-prompt.md            # Task template
@~/.claude/reference/ultrathink-definition.md          # Auto-analysis
@~/.claude/reference/deployment-discovery-protocol.md  # Test before build
```
