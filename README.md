# Claude Code Configuration

Personal Claude Code setup for parallel development, custom skills, and AI-native workflows.

## Quick Start

```bash
# Clone to ~/.claude
git clone https://github.com/guitargnarr/claude-config.git ~/.claude

# Install tmux (macOS)
brew install tmux

# Copy tmux config
cp ~/.claude/reference/tmux.conf ~/.tmux.conf

# Add aliases to ~/.zshrc
cat >> ~/.zshrc << 'EOF'
alias tpar='~/.claude/scripts/tmux-parallel.sh'
alias twt='~/.claude/scripts/tmux-worktrees.sh'
alias t='tmux attach 2>/dev/null || tmux new -s main'
EOF

source ~/.zshrc
```

## Structure

```
~/.claude/
├── CLAUDE.md                 # Global instructions for all projects
├── COLLABORATION_CONTRACT.md # Human + AI collaboration principles
├── commands/                 # Custom slash commands/skills
│   └── tmux.md              # /tmux skill for parallel dev
├── scripts/                  # Shell scripts
│   ├── tmux-parallel.sh     # 4-pane parallel launcher
│   └── tmux-worktrees.sh    # Worktree-based launcher
├── reference/                # Documentation & configs
│   ├── parallel-development-playbook.md  # v5.0 with tmux
│   ├── tmux.conf            # Teal/orange branded config
│   ├── deployment-inventory.md
│   └── workflows.md
├── agents/                   # Custom subagents
└── plans/                    # Active project plans
```

## Parallel Development (v5.0)

Run 4 Claude instances simultaneously with tmux:

```bash
# Launch 4-pane session
tpar

# Or with custom projects
~/.claude/scripts/tmux-parallel.sh myrun \
  ~/Projects/project1 \
  ~/Projects/project2 \
  ~/Projects/project3 \
  ~/Projects/project4
```

### tmux Quick Reference

| Key | Action |
|-----|--------|
| `Ctrl+a p` | Create 4-pane layout |
| `Alt+Arrow` | Navigate panes |
| `Ctrl+a z` | Zoom pane (toggle) |
| `Ctrl+a d` | Detach (keeps running) |

### Remote Monitoring

```bash
# Check all pane status
for pane in 1 2 3 4; do
  echo "=== PANE $pane ==="
  tmux capture-pane -t myrun:1.$pane -p | tail -15
done

# Approve permissions in all panes
for pane in 1 2 3 4; do
  tmux send-keys -t myrun:1.$pane Enter
done
```

## Key Principles

1. **Visual Proof Required** - Nothing complete until user can SEE it working
2. **Fix Before Asking** - Try to fix problems before asking questions
3. **Inventory Before Building** - Check deployments before assuming local is canonical
4. **No Token Waste** - Execute efficiently toward results

## Brand

```css
--teal-500: #14b8a6;   /* Primary */
--orange-500: #f97316; /* Accent */
--slate-900: #0f172a;  /* Dark background */
```

## Version History

- **v5.0 (Dec 2025)**: tmux integration, remote monitoring
- **v4.0 (Nov 2025)**: Orchestrator pattern, 100% PR success
- **v3.0 (Nov 2025)**: Error recovery, time management
- **v1.0 (Oct 2025)**: Initial modular configuration

## Stats (Dec 2025)

- 222+ assets tracked
- 56 code projects
- 14 deployed URLs
- 51 Ollama models
- 25 slash commands
- 7 custom agents
