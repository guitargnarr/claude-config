# tmux Parallel Development Session

Launch and manage tmux sessions for parallel Claude Code execution.

---

## Usage

```
/tmux [action] [args]
```

**Actions:**
- `start [name]` - Launch 4-pane session (default: "parallel")
- `status` - Check all pane status
- `approve` - Send Enter to all panes (approve permissions)
- `kill [name]` - Kill session
- `send <pane> <message>` - Send message to specific pane (1-4)

---

## Execute

```bash
ACTION="${ARGUMENTS%% *}"
REST="${ARGUMENTS#* }"

case "$ACTION" in
  start|"")
    SESSION_NAME="${REST:-parallel}"
    # Kill existing if present
    tmux kill-session -t "$SESSION_NAME" 2>/dev/null

    # Create session with 4 panes
    tmux new-session -d -s "$SESSION_NAME" -c ~/Projects/projectlavos-monorepo
    tmux split-window -h -t "$SESSION_NAME" -c ~/Projects/guitar-model-lab
    tmux split-window -v -t "$SESSION_NAME:1.2" -c ~/Projects/ai-talent-optimizer
    tmux select-pane -t "$SESSION_NAME:1.1"
    tmux split-window -v -t "$SESSION_NAME:1.1" -c ~/Projects/phishguard-ui

    # Label panes
    tmux send-keys -t "$SESSION_NAME:1.1" "echo '=== projectlavos-monorepo ===' && pwd" Enter
    tmux send-keys -t "$SESSION_NAME:1.2" "echo '=== phishguard-ui ===' && pwd" Enter
    tmux send-keys -t "$SESSION_NAME:1.3" "echo '=== guitar-model-lab ===' && pwd" Enter
    tmux send-keys -t "$SESSION_NAME:1.4" "echo '=== ai-talent-optimizer ===' && pwd" Enter

    echo "Session '$SESSION_NAME' created with 4 panes"
    echo ""
    echo "Next steps:"
    echo "  1. Attach: tmux attach -t $SESSION_NAME"
    echo "  2. Or launch Claude: /tmux claude"
    echo "  3. Or send prompts: /tmux send 1 'your prompt'"
    ;;

  claude)
    SESSION_NAME="${REST:-parallel}"
    for pane in 1 2 3 4; do
      tmux send-keys -t "$SESSION_NAME:1.$pane" "claude" Enter
    done
    echo "Claude launched in all 4 panes of '$SESSION_NAME'"
    echo ""
    echo "Wait 5 seconds for startup, then send prompts:"
    echo "  /tmux send 1 'Check all subdomains...'"
    ;;

  status)
    SESSION_NAME="${REST:-parallel}"
    for pane in 1 2 3 4; do
      echo "=== PANE $pane ==="
      tmux capture-pane -t "$SESSION_NAME:1.$pane" -p 2>/dev/null | tail -15 || echo "(pane not found)"
      echo ""
    done
    ;;

  approve)
    SESSION_NAME="${REST:-parallel}"
    for pane in 1 2 3 4; do
      tmux send-keys -t "$SESSION_NAME:1.$pane" Enter
    done
    echo "Sent Enter to all panes in '$SESSION_NAME'"
    ;;

  approve-always)
    SESSION_NAME="${REST:-parallel}"
    for pane in 1 2 3 4; do
      tmux send-keys -t "$SESSION_NAME:1.$pane" "2" Enter
    done
    echo "Sent '2' (always allow) + Enter to all panes in '$SESSION_NAME'"
    ;;

  send)
    # Parse: /tmux send 1 message here
    PANE="${REST%% *}"
    MESSAGE="${REST#* }"
    SESSION_NAME="parallel"

    if [[ "$PANE" =~ ^[1-4]$ ]]; then
      tmux send-keys -t "$SESSION_NAME:1.$PANE" "$MESSAGE" Enter
      echo "Sent to pane $PANE: $MESSAGE"
    else
      echo "Error: Pane must be 1-4"
      echo "Usage: /tmux send <pane> <message>"
    fi
    ;;

  kill)
    SESSION_NAME="${REST:-parallel}"
    tmux kill-session -t "$SESSION_NAME" 2>/dev/null && \
      echo "Session '$SESSION_NAME' killed" || \
      echo "Session '$SESSION_NAME' not found"
    ;;

  list)
    tmux list-sessions 2>/dev/null || echo "No tmux sessions running"
    ;;

  *)
    echo "tmux Parallel Development"
    echo ""
    echo "Usage: /tmux [action] [args]"
    echo ""
    echo "Actions:"
    echo "  start [name]     Launch 4-pane session (default: parallel)"
    echo "  claude [name]    Start Claude in all panes"
    echo "  status [name]    Check all pane status"
    echo "  approve [name]   Send Enter to all panes"
    echo "  approve-always   Send '2' + Enter (always allow)"
    echo "  send <pane> <msg> Send message to pane 1-4"
    echo "  kill [name]      Kill session"
    echo "  list             List all sessions"
    echo ""
    echo "Quick workflow:"
    echo "  /tmux start"
    echo "  /tmux claude"
    echo "  /tmux send 1 'Check all subdomains...'"
    echo "  /tmux status"
    echo "  /tmux approve"
    echo "  /tmux kill"
    ;;
esac
```
