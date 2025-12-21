# Cross-Session Context Protocol

**Created:** December 10, 2025
**Updated:** December 10, 2025 13:51
**Purpose:** Fast method to get context from other running Claude Code sessions + issue directives

---

## Quick Check (10 seconds)
```bash
date "+%Y-%m-%d %H:%M:%S" && tail -15 ~/.claude/projects/-Users-matthewscott/b1079d33*.jsonl | jq -r '.toolUseResult.command // .message.content[0:300]' 2>/dev/null | tail -5
```

## Issue Directive
Write to `~/Projects/guitar-model-lab/SESSION_DIRECTIVE.md` - other session reads on each action.

## Update Protocol
Edit LIVE STATUS section in `~/Projects/guitar-model-lab/protocol.md`

## Rules
- **20 min limit** on benchmarks - propose solution if exceeded
- **No questions** unless loop risk detected
- **Timestamp every check** using `date` command

---

## Step-by-Step Protocol

### Step 1: Identify Running Sessions (5 sec)
```bash
ps aux | grep -i claude | grep -v grep
```
**Output:** Shows PID, terminal (s001/s002), start time, CPU usage

### Step 2: Find Session Files (5 sec)
```bash
ls -lat ~/.claude/projects/-Users-matthewscott/*.jsonl | head -5
```
**Key insight:** Most recently modified file = currently active session

### Step 3: Get Context (20 sec)
```bash
# Recent messages
tail -50 [SESSION_FILE].jsonl | jq -r '.message.content[0:500]' 2>/dev/null | tail -10

# Find specific activity (benchmark, model test, etc.)
grep -E "benchmark|ollama|test" [SESSION_FILE].jsonl | tail -10
```

### Step 4: Get Running Command Details
```bash
# Search for toolUseResult to see what commands are running
grep "toolUseResult" [SESSION_FILE].jsonl | tail -5 | jq -r '.toolUseResult'
```

---

## Session File Format

- **Location:** `~/.claude/projects/-Users-matthewscott/[UUID].jsonl`
- **Format:** JSON Lines (one JSON object per line)
- **Updates:** REAL-TIME as session runs
- **Key fields:**
  - `type`: "user" | "assistant"
  - `message.content`: The actual message text
  - `toolUseResult`: Command execution details (shellId, command, status)

---

## Common Patterns

### Find User Instructions
```bash
grep '"type":"user"' [SESSION].jsonl | grep -v "tool_result" | tail -5 | jq -r '.message.content[:1000]'
```

### Find Running Background Commands
```bash
grep "toolUseResult" [SESSION].jsonl | grep '"status":"running"' | tail -3 | jq -r '.toolUseResult'
```

### Find Specific Topic
```bash
grep -E "guitar|benchmark|model" [SESSION].jsonl | tail -20
```

---

## Example: Today's Cross-Session Lookup

**Goal:** Find what benchmark protocol other session was running

**Commands used:**
```bash
# 1. Found sessions
ls -lat ~/.claude/projects/-Users-matthewscott/*.jsonl | head -5
# Result: b1079d33 (2.5MB) and 44b6ede0 (807KB) both active at 13:25

# 2. Checked larger session for benchmark activity
grep "benchmark\|ollama run" ~/.claude/projects/-Users-matthewscott/b1079d33*.jsonl | tail -10

# 3. Found the command
# Shell d41c13: ollama run guitar_expert_precise "Give me a 4-bar E Phrygian riff..."
```

**Time:** ~45 seconds total

---

## Key Learnings

1. **Session files update in REAL-TIME** - no special access needed
2. **Most recently modified = active session**
3. **Don't claim inability** - investigate first
4. **Use grep + jq** for efficient parsing
5. **toolUseResult field** contains running command details

---

## Integration with Guitar Benchmark Protocol

When user asks for benchmark status across sessions:

1. Find active session with model tests
2. Check `toolUseResult` for current test status
3. Report: Model, Prompt, Pass/Fail count, Shell status

**Benchmark Protocol (from user):**
- 5 consecutive passes required
- Cross-reference with web for accuracy
- 10+ failures before adjusting parameters
- Save progress on success

---

**Last Updated:** December 10, 2025
