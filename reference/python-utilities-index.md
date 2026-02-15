# Python Utilities Index

**Updated:** 2026-02-08
**Total:** 26 standalone Python utilities across 4 projects
**Note:** Claude scripts (.py) are also indexed in `automation-scripts-index.md`

---

## Quick Reference

| I want to... | Use this |
|--------------|----------|
| Generate a resume for a job posting | `texume/scripts/generate_for_job.py` |
| Interactive resume builder | `texume/scripts/texume_guided.py` |
| Manage Ollama models | `reflexia-model-manager/main.py` |
| Track parallel dev metrics | `~/.claude/scripts/parallel_metrics.py` |
| Manage git worktrees | `~/.claude/scripts/worktree_manager.py` |
| Generate guitar riffs | `guitar-model-lab/generate_riff.py` |
| Clean sensitive data from repo | `~/.claude/scripts/sanitize_repo.py` |
| Verify dev environment | `~/.claude/scripts/validate_environment.py` |

---

## Texume - Resume/Document Generation (10)

**Location:** `~/Projects/texume/scripts/`
**Deps:** `jinja2`, `pyyaml`, LaTeX (`pdflatex`)

| Script | Purpose |
|--------|---------|
| `resume_generator.py` | Core `ResumeGenerator` class (Jinja2 -> LaTeX -> PDF) |
| `texume_guided.py` | Interactive CLI for resume generation |
| `generate_for_job.py` | Generate resume tailored to a specific job posting |
| `generate_from_api.py` | Generate resume from API data source |
| `generate_ai_portfolio.py` | AI portfolio-focused resume variant |
| `generate_pwc.py` | PwC-targeted resume |
| `generate_pwc_technical.py` | PwC technical variant |
| `generate_pwc_ai_first.py` | PwC AI-first variant |
| `generate_eltoro.py` | El Toro-targeted resume |
| `generate_portfolio_inventory.py` | Generate portfolio inventory document |

**Additional company-specific generators:** `generate_airtable.py`, `generate_nutrient.py`, `generate_ramp.py`, `generate_sei_*.py`, `generate_temporal.py`, `generate_yum_sre.py`, `generate_caviar_report.py`, `generate_mccarron_report.py`

**Usage:**
```bash
cd ~/Projects/texume
python3 scripts/texume_guided.py           # Interactive
python3 scripts/generate_for_job.py        # Job-specific
python3 scripts/resume_generator.py        # Direct generation
```

---

## Reflexia - Ollama Model Manager (5 standalone)

**Location:** `~/Projects/reflexia-model-manager/`
**Deps:** `ollama`, `flask`, `chromadb`

| Script | Purpose |
|--------|---------|
| `main.py` | CLI entry point for model management |
| `run_reflexia.py` | Launch Reflexia with web UI |
| `demo.py` | Demo/test model interactions |
| `initialize_reflexia.py` | First-time setup and initialization |
| `web_ui.py` | Flask web dashboard for model monitoring |

**Supporting modules (not standalone):** `model_manager.py`, `prompt_manager.py`, `memory_manager.py`, `rag_manager.py`, `monitoring.py`, `fine_tuning.py`, `recovery.py`

**Usage:**
```bash
cd ~/Projects/reflexia-model-manager
python3 main.py                    # CLI
python3 run_reflexia.py            # Full system with web UI
python3 demo.py                    # Demo mode
```

---

## Claude Scripts - Development Tools (11)

**Location:** `~/.claude/scripts/`
**Deps:** Python stdlib (no external deps)

| Script | Purpose |
|--------|---------|
| `parallel_metrics.py` | Track parallel run completion rates and efficiency |
| `worktree_manager.py` | Git worktree create/list/remove/prune operations |
| `coordination_sync.py` | Audit coordination file sync with atomic locking |
| `init_audit_system.py` | Initialize audit system files and directories |
| `verify_audit.py` | Verify audit results completeness |
| `test_coordination.py` | Test suite for audit coordination |
| `validate_environment.py` | Verify development environment setup |
| `sanitize_repo.py` | Clean sensitive data from repos before sharing |
| `claude-discover-full.py` | Extended deployment discovery with Playwright |
| `store_parallel_result.py` | Store parallel execution results to JSON |
| `pattern_dashboard.py` | Pattern learning dashboard visualization |

**Full details:** See `~/.claude/reference/automation-scripts-index.md`

---

## Guitar Model Lab (1)

**Location:** `~/Projects/guitar-model-lab/`
**Deps:** `music21` or custom music theory module

| Script | Purpose |
|--------|---------|
| `generate_riff.py` | Generate guitar riff with scale validation and auto-correction |

**Usage:**
```bash
cd ~/Projects/guitar-model-lab
python3 generate_riff.py --scale pentatonic --random --bars 4
```

---

## Related

- **Automation Scripts Index:** `~/.claude/reference/automation-scripts-index.md` (Shell + JS scripts)
- **Ollama Model Manifest:** `~/.claude/reference/ollama-model-manifest.md`
- **Command Manifest:** `~/.claude/COMMAND_MANIFEST.md` (which commands use which scripts)
