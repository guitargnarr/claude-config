# Claude Tools Master Index

**Last Updated:** 2026-01-01
**Purpose:** Single source of truth for claude-inventory script

## Quick Commands

| Command | Purpose |
|---------|---------|
| `claude-status` | Check what needs attention |
| `claude-inventory` | List all available tools |
| `claude-verify` | Verify toolkit works |
| `claude-export` | Generate documentation exports |
| `claude-discover` | Deployment discovery |

## Slash Commands (25)

### Career/Job
- `/coach` - Career coaching (matthew-career-coach model)
- `/louisville` - Louisville market intel
- `/tactic` - Hiring tactics (barrier-breaker model)

### Code/Development
- `/code` - Python generation (code-executor model)
- `/analyze` - Data analysis (data-analyzer-qwen model)
- `/quick` - Quick answers (quick-advisor-phi model)
- `/humanize` - Convert AI text to natural language

### Git/GitHub
- `/commit` - AI-generated commit message
- `/git` - Comprehensive git workflow
- `/push-pr` - Push branch and create PR
- `/review-pr` - First-pass AI code review
- `/worktree` - Git worktree management
- `/cleanup-worktrees` - Clean merged worktrees

### Audit
- `/audit-repo` - Full repository audit
- `/audit-status` - Show audit progress
- `/audit-sync` - Update coordination file
- `/audit-handoff` - Sync with other Claude instance

### Creative
- `/art` - Algorithmic art generation
- `/canvas-design` - Professional graphics (posters, logos, QR codes)
- `/slack-gif` - Animated Slack emoji
- `/generative-artist` - Query generative-artist model (DELETED - too slow)
- `/theme` - Apply consistent themes
- `/riff` - Generate guitar riffs

### Infrastructure
- `/tmux` - Parallel development sessions
- `/discover` - Deployment discovery
- `/test-models` - Run Ollama model tests

## Agents (7)

| Agent | Purpose |
|-------|---------|
| audit-orchestrator | Full audit coordination |
| repo-scanner | Metrics, file counts, git stats |
| documentation-reader | Verify README claims |
| code-analyzer | Deep code analysis |
| security-auditor | Find credentials, automation risks |
| code-automation | Generate Python scripts |
| interview-prep | Career prep with Ollama models |

## Ollama Models (49 after cleanup)

### Frequently Used
- `matthew-career-coach` - Career Q&A
- `barrier-breaker` - Hiring tactics
- `louisville-job-market` - Local market intel
- `code-executor` - Python generation
- `humanizer` - Text naturalization
- `master_guitar_instructor` - Guitar technique
- `guitar_tone_architect` - Tone/gear advice

### Deleted This Session
- `guitar_expert_qwen` (4.7GB) - Wrong music theory
- `guitar_expert_precise` (2.0GB) - Wrong music theory
- `generative-artist` (19GB) - Too slow (180s+ per query)

## Scripts (26)

Location: `~/.claude/scripts/`

### Core
- `claude-inventory` - This index
- `claude-status` - Status check
- `claude-verify` - Verification
- `claude-export` - Documentation export
- `claude-discover.sh` - Deployment discovery

### Parallel Development
- `tmux-parallel.sh` - Launch tmux sessions
- `tmux-worktrees.sh` - Worktree tmux sessions
- `parallel_metrics.py` - Track run success rates
- `launch_parallel.sh` - Terminal launcher
- `worktree_manager.py` - Git worktree management

### Audit
- `init_audit_system.py` - Initialize audit
- `verify_audit.py` - Verify audit
- `coordination_sync.py` - Sync coordination

## Skills (4 Auto-Invoke)

| Skill | Trigger |
|-------|---------|
| resume-customizer | Mention job posting |
| cover-letter-generator | Mention cover letter |
| job-application-tracker | Apply to job |
| interview-prep-auto | Mention interview |

---

**Disk Space Freed This Session:** 25.7GB
- guitar_expert_qwen: 4.7GB
- guitar_expert_precise: 2.0GB
- generative-artist: 19GB
