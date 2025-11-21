# AI-Native Development Toolkit - Master Index

**Last Updated**: 2025-11-21
**Purpose**: Complete inventory of tools, automation, and documentation for AI-native development

**Quick Access**:
- `claude-inventory` - Show available tools
- `claude-verify` - Test all tools work
- `claude-status` - Check what needs maintenance

---

## Core Documentation System

### Configuration Files (✅ VERIFIED 2025-11-19)

| File | Lines | Purpose | Status |
|------|-------|---------|--------|
| `~/.claude/CLAUDE.md` | 49 | Global technical preferences | ✅ Working |
| `~/.claude/context/personal.md` | 34 | Personal identity/background | ✅ Working |
| `~/.claude/context/current-status.md` | 62 | Temporal info (updated 2025-11-19) | ✅ Working |
| `~/.claude/context/working-philosophy.md` | ~300 | Core values and principles | ✅ Working |

### Reference Documentation (✅ VERIFIED 2025-11-21)

| File | Size | Purpose | Status |
|------|------|---------|--------|
| `~/.claude/reference/parallel-development-playbook.md` | 21KB | v4 parallel development methodology | ✅ Working |
| `~/.claude/reference/MIRADOR_PATTERN_LEARNING_INTEGRATION.md` | 14KB | Pattern learning integration guide | ✅ Working |
| `~/.claude/archive/WORKFLOWS.md` | 13KB | Anthropic optimal workflows | ✅ Working |
| `~/.claude/archive/SYSTEM_DOCUMENTATION.md` | 8KB | Memory system meta-documentation | ✅ Working |
| `~/.claude/archive/PERMISSIONS_GUIDE.md` | 8KB | Permissions configuration guide | ✅ Working |

### Project-Level Configuration

| Project | File | Lines | Status |
|---------|------|-------|--------|
| projectlavos-monorepo | `CLAUDE.md` | 67 | ✅ Working |
| projectlavos-monorepo/services/guitar | `CLAUDE.md` | 60 | ✅ Working (reduced from 77) |
| 1_PRIORITY_JOB_SEARCH | `CLAUDE.md` | 37 | ✅ Working (@ imports fixed) |

---

## Automation Tools

### Scripts (~/.claude/scripts/) - 13 total

#### Parallel Development (✅ PROVEN)
| Script | Purpose | Status | Last Verified |
|--------|---------|--------|---------------|
| `lib/parallel_memory.py` | Pattern learning memory backend (SQLite) | ✅ Working | 2025-11-21 |
| `store_parallel_result.py` | Store parallel run results with quality scoring | ✅ Working | 2025-11-21 |
| `pattern_dashboard.py` | Pattern learning dashboard and trend visualization | ✅ Working | 2025-11-21 |
| `launch_parallel.sh` | Launch 4 terminals for parallel development | ⚠️ Untested | Never |
| `worktree_manager.py` | Git worktree management | ⚠️ Untested | Never |
| `cleanup-worktrees.sh` | Remove merged worktrees | ⚠️ Untested | Never |
| `parallel_metrics.py` | Track parallel dev metrics (deprecated - use pattern_dashboard.py) | ⚠️ Untested | Never |
| `merge-parallel-prs.sh` | Automated PR merging | ⚠️ Untested | Never |

#### Verification & Validation
| Script | Purpose | Status | Last Verified |
|--------|---------|--------|---------------|
| `test_coordination.py` | Test coordination file operations | ⚠️ Untested | Never |
| `validate_environment.py` | Verify environment setup | ⚠️ Untested | Never |
| `verify_audit.py` | Audit verification system | ⚠️ Untested | Never |
| `check_duplicates.sh` | Find duplicate code | ⚠️ Untested | Never |

#### Repository Management
| Script | Purpose | Status | Last Verified |
|--------|---------|--------|---------------|
| `init_audit_system.py` | Initialize audit system | ⚠️ Untested | Never |
| `coordination_sync.py` | Sync coordination files | ⚠️ Untested | Never |
| `sanitize_repo.py` | Clean repository for sharing | ⚠️ Untested | Never |
| `get_date.sh` | Get current date | ⚠️ Untested | Never |

---

## Slash Commands (~/.claude/commands/) - 23 total

### Development Workflow (✅ PROVEN)
| Command | Purpose | Status |
|---------|---------|--------|
| `/commit` | AI-generated commit messages | ✅ Working |
| `/push-pr` | Push branch and create PR | ✅ Working |
| `/review-pr <number>` | AI code review | ⚠️ Untested |
| `/git` | Comprehensive git workflow | ⚠️ Untested |

### Parallel Development (✅ PROVEN)
| Command | Purpose | Status |
|---------|---------|--------|
| `/worktree create\|list\|remove\|prune` | Worktree management | ✅ Working |
| `/cleanup-worktrees` | Clean merged worktrees | ⚠️ Untested |

### AI Model Interaction
| Command | Purpose | Status |
|---------|---------|--------|
| `/code [what to generate]` | Generate code via code-executor | ⚠️ Untested |
| `/analyze [what to analyze]` | Data analysis via data-analyzer-qwen | ⚠️ Untested |
| `/coach [question]` | Career coaching via matthew-career-coach | ⚠️ Untested |
| `/test-models` | Test Ollama models | ⚠️ Untested |
| `/louisville [question]` | Louisville market data | ⚠️ Untested |
| `/tactic [hiring situation]` | Hiring tactics via barrier-breaker | ⚠️ Untested |

### Creative Tools
| Command | Purpose | Status |
|---------|---------|--------|
| `/art [type]` | Generate algorithmic art | ⚠️ Untested |
| `/canvas-design [type]` | Advanced algorithmic art | ⚠️ Untested |
| `/slack-gif [type]` | Create Slack-optimized GIFs | ⚠️ Untested |
| `/theme [action]` | Apply consistent themes | ⚠️ Untested |

### Repository Auditing
| Command | Purpose | Status |
|---------|---------|--------|
| `/audit-repo [name]` | Complete repository audit | ⚠️ Untested |
| `/audit-status` | Show audit progress | ⚠️ Untested |
| `/audit-handoff` | Sync with other Claude instance | ⚠️ Untested |
| `/audit-sync [operation]` | Update coordination file | ⚠️ Untested |

---

## Custom Agents (~/.claude/agents/) - 6 total

| Agent | Purpose | Status |
|-------|---------|--------|
| `code-analyzer.md` | Deep code analysis | ⚠️ Untested |
| `code-automation.md` | Code generation specialist | ⚠️ Untested |
| `documentation-reader.md` | Thorough documentation analysis | ⚠️ Untested |
| `interview-prep.md` | Interview preparation | ⚠️ Untested |
| `repo-scanner.md` | Repository inventory | ⚠️ Untested |
| `security-auditor.md` | Security scan | ⚠️ Untested |

---

## Skills (~/.claude/skills/) - 4 total

| Skill | Purpose | Auto-Invoke | Status |
|-------|---------|-------------|--------|
| `job-application-tracker` | Track job applications | When discussing applications | ⚠️ Untested |
| `interview-prep-auto` | Generate interview prep | When interview mentioned | ⚠️ Untested |
| `resume-customizer` | Customize resume for jobs | When applying to jobs | ⚠️ Untested |
| `cover-letter-generator` | Generate cover letters | After resume customization | ⚠️ Untested |

**Note**: Skills protected by job search data permissions (requires explicit permission to access CSV files)

---

## Proven Methodologies

### Parallel Development v4.0 (✅ PROVEN 2025-11-16)

**Evidence**:
- 4/4 PRs created successfully
- 100% success rate
- <3 minutes execution time per PR
- Zero manual intervention
- Automated conflict detection and merge

**Playbook**: `~/.claude/reference/parallel-development-playbook.md`

**Success Pattern**:
1. 2-4 independent tasks (no blocking dependencies)
2. Git worktrees (isolated workspaces)
3. Clear specifications (v4 prompts with build gates)
4. Autonomous execution (AI implements, human orchestrates)
5. Quality gates (tests, builds, conflict detection)

**When to Use**:
- Independent features across different files
- Bulk improvements (add tests to multiple projects)
- Exploration of multiple approaches
- Any time you'd say "I should do A, B, C, and D"

**When NOT to Use**:
- Tasks with dependencies (A must finish before B)
- Learning a new codebase (explore first)
- Critical bug fixes (need full focus)
- Tasks that share the same files

---

## Key Directories

| Directory | Purpose | Status |
|-----------|---------|--------|
| `~/Projects/` | All development projects | ✅ Active |
| `~/Projects/.worktrees/` | Git worktrees for parallel dev | ✅ Active |
| `~/Desktop/1_PRIORITY_JOB_SEARCH/` | Job search materials | ✅ Active |
| `~/.claude/` | Claude Code configuration | ✅ Active |
| `~/.claude/scripts/` | Automation scripts | ⚠️ Mostly untested |
| `~/.claude/commands/` | Custom slash commands | ⚠️ Partially tested |
| `~/.claude/agents/` | Custom subagents | ⚠️ Untested |
| `~/.claude/skills/` | Auto-invoke skills | ⚠️ Untested |
| `~/.claude/context/` | Personal/temporal context | ✅ Active |
| `~/.claude/reference/` | Reference documentation | ✅ Active |
| `~/.claude/archive/` | Archived documentation | ✅ Active |

---

## Status Legend

- ✅ **Working** - Verified and actively used
- ⚠️ **Untested** - Exists but not verified to work
- 📋 **Aspirational** - Documented but not implemented
- ❌ **Broken** - Known to be non-functional
- 🔄 **In Development** - Currently being built

---

## Maintenance Protocol

### Weekly (15 minutes)
- [ ] Run `claude-verify` to test all tools
- [ ] Update `current-status.md` with today's date
- [ ] Check for new tools to add to this index
- [ ] Archive deprecated documentation

### After Building New Tools
- [ ] Add to appropriate section above
- [ ] Set status to ⚠️ Untested
- [ ] Create verification test in `~/.claude/verification/`
- [ ] Update status to ✅ Working after verification

### Before Sharing Externally
- [ ] Run `claude-export portfolio` for achievements version
- [ ] Run `claude-export teaching` for methodology version
- [ ] Run `claude-export employer` for professional version

---

## Quick Navigation

**Find something fast**:
```bash
# Show only working tools
grep "✅ Working" ~/.claude/MASTER_INDEX.md

# Show untested tools
grep "⚠️ Untested" ~/.claude/MASTER_INDEX.md

# Count tools by status
grep -c "✅ Working" ~/.claude/MASTER_INDEX.md
```

**Documentation References**:
- Collaboration patterns: `~/.claude/COLLABORATION_CONTRACT.md` (coming soon)
- Verification methods: `~/.claude/TRUST_PROTOCOL.md` (coming soon)
- Proven methodology: `~/.claude/METHODOLOGY_PROVEN.md` (coming soon)
- Core philosophy: `~/.claude/FOUNDATIONS.md` (coming soon)

---

**This index is the single source of truth for what exists in the AI-native development toolkit.**

**Principle**: If it's not in this index, it doesn't exist. If it's in this index, it should work or be marked as untested.
