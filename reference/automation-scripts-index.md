# Automation Scripts Index

**Location:** `~/.claude/scripts/`
**Total:** 25 scripts (10 Shell, 8 Python, 5 JavaScript, 2 CLI)
**Updated:** 2026-02-08

---

## Prerequisites

```bash
# Node.js (asset generation)
cd ~/.claude/scripts && npm install canvas qrcode

# Python (no extra installs - uses stdlib + project deps)
```

---

## Asset Generation (4)

| Script | Lang | Purpose | Usage |
|--------|------|---------|-------|
| `create-client-assets.js` | JS | All-in-one: iPhone mockup, OG image, QR code, favicons | `node create-client-assets.js <slug> ./mobile.png --colors "#hex1,#hex2"` |
| `create-cinematic-og.js` | JS | Brand-distinct dark cinematic OG images (1200x630) | `node create-cinematic-og.js --batch` or `--site <scout\|morgan\|pillar>` |
| `create-iphone-mockup.js` | JS | Standalone iPhone 14 Pro frame generator | `node create-iphone-mockup.js input.png output.png` |
| `create-jobway-assets.js` | JS | Jobway-specific asset generation | `node create-jobway-assets.js` |
| `mobile-verify.sh` | Shell | Single site mobile screenshot verification | `mobile-verify.sh https://site.vercel.app` |

## Deployment & Verification (5)

| Script | Lang | Purpose | Usage |
|--------|------|---------|-------|
| `claude-discover.sh` | Shell | Deployment discovery (Vercel/Railway/Netlify) | `claude-discover.sh [URL]` |
| `claude-discover-full.py` | Python | Extended discovery with Playwright screenshots | `python3 claude-discover-full.py [URL]` |
| `claude-verify-urls` | Shell | Batch URL verification (HTTP status checks) | `claude-verify-urls` |
| `mobile-verify-batch.sh` | Shell | Batch mobile screenshot verification | `mobile-verify-batch.sh ./output-dir` |
| `validate_environment.py` | Python | Verify development environment setup | `python3 validate_environment.py` |

## Parallel Development (7)

| Script | Lang | Purpose | Usage |
|--------|------|---------|-------|
| `tmux-parallel.sh` | Shell | Launch 4-pane tmux session | `tpar` (alias) or `tmux-parallel.sh [name] [dir1] [dir2] [dir3] [dir4]` |
| `tmux-worktrees.sh` | Shell | Launch tmux with git worktrees | `twt [project] [branch1] [branch2] [branch3] [branch4]` |
| `launch_parallel.sh` | Shell | Legacy: open 4 Terminal.app windows with worktrees | `launch_parallel.sh <project> <b1> <b2> <b3> <b4> <base>` |
| `worktree_manager.py` | Python | Full git worktree management (create/list/remove/prune) | `python3 worktree_manager.py create feature/name main` |
| `parallel_metrics.py` | Python | Track parallel run efficiency metrics | `python3 parallel_metrics.py start --project name --tasks 4` |
| `merge-parallel-prs.sh` | Shell | Batch merge PRs from parallel run | `merge-parallel-prs.sh` |
| `cleanup-worktrees.sh` | Shell | Remove merged worktrees and branches | `cleanup-worktrees.sh` |
| `store_parallel_result.py` | Python | Store parallel execution results | `python3 store_parallel_result.py` |

## Audit System (4)

| Script | Lang | Purpose | Usage |
|--------|------|---------|-------|
| `coordination_sync.py` | Python | Audit coordination file sync (atomic locking) | Used by `/audit-sync` command |
| `init_audit_system.py` | Python | Initialize audit system files | `python3 init_audit_system.py` |
| `verify_audit.py` | Python | Verify audit results and completeness | `python3 verify_audit.py` |
| `test_coordination.py` | Python | Test audit coordination system | `pytest test_coordination.py` |

## System Utilities (4)

| Script | Lang | Purpose | Usage |
|--------|------|---------|-------|
| `claude-inventory` | Shell | Show available Claude Code tools | `claude-inventory` |
| `claude-status` | Shell | Check what needs attention | `claude-status` |
| `claude-verify` | Shell | Verify toolkit installation | `claude-verify` |
| `claude-export` | Shell | Generate documentation exports | `claude-export [type]` |

## Maintenance (3)

| Script | Lang | Purpose | Usage |
|--------|------|---------|-------|
| `sanitize_repo.py` | Python | Clean sensitive data from repos before sharing | `python3 sanitize_repo.py` |
| `check_duplicates.sh` | Shell | Find duplicate files across projects | `check_duplicates.sh` |
| `pattern_dashboard.py` | Python | Pattern learning dashboard visualization | `python3 pattern_dashboard.py` |

---

## Quick Reference

| I want to... | Use this |
|--------------|----------|
| Generate client site assets | `node create-client-assets.js <slug> ./mobile.png` |
| Generate cinematic OG images | `node create-cinematic-og.js --batch` (extend SITE_CONFIGS for new sites) |
| Verify a deployment works | `mobile-verify.sh <URL>` |
| Launch parallel dev session | `tpar` (tmux alias) |
| Check all my URLs are live | `claude-verify-urls` |
| Find what's deployed where | `claude-discover.sh <URL>` |
| Clean up after parallel run | `cleanup-worktrees.sh` |
| Track parallel run metrics | `python3 parallel_metrics.py start/complete/end/report` |
| Audit a repository | Use `/audit-repo` command (calls coordination_sync.py internally) |

---

## Related

- **Parallel Dev Playbook:** `~/.claude/reference/parallel-development-playbook.md`
- **Client Site Assets SOP:** `~/.claude/reference/client-site-assets-sop.md`
- **Device Mockup Workflow:** `~/.claude/reference/device-mockup-workflow.md`
- **Deployment Discovery:** `~/.claude/reference/deployment-discovery-protocol.md`
