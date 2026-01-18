# Claude Code Permissions Configuration Guide

> **ARCHIVED (Jan 2026):** This guide served its purpose during initial Claude Code setup.
> The recommended settings have been adopted and are now the default configuration.
> Kept for historical reference and troubleshooting edge cases.
> For current workflows, see: @~/.claude/reference/workflows.md

**Created:** November 14, 2025
**Archived:** January 17, 2026
**Purpose:** Maximize Claude Code usefulness while maintaining security

---

## Quick Start

### Option 1: Apply Recommended Settings (Balanced)
```bash
# Backup current config
cp ~/.claude/settings.json ~/.claude/settings.json.backup-$(date +%Y%m%d)

# Apply recommended config
cp ~/.claude/settings.json.recommended ~/.claude/settings.json

# Restart Claude Code sessions
```

### Option 2: Keep Current Settings (Maximum Speed, Less Safe)
```bash
# Your current settings are already very permissive
# No action needed - you have maximum freedom
```

### Option 3: Use Permission Modes per Session
```bash
# Start in read-only mode (exploration)
claude --permission-mode plan

# Start with auto-accept edits
claude --permission-mode acceptEdits

# Start with specific tool restrictions
claude --allowedTools "Read,Bash(git:*),Edit"
```

---

## Configuration Comparison

### Your Current Setup
```json
{
  "allow": [
    "Read(**)",     // Everything readable
    "Write(**)",    // Everything writable
    "WebFetch",     // Web access
    "Bash(**)"      // All bash commands
  ],
  "ask": ["Bash(rm:*)"]  // Only ask for deletions
}
```

**Pros:**
- ✅ Zero friction - Claude can do anything
- ✅ Fast workflows
- ✅ No interruptions

**Cons:**
- ⚠️ Can accidentally delete files
- ⚠️ Can read sensitive credentials
- ⚠️ Can execute dangerous commands
- ⚠️ No audit trail for destructive operations

---

### Recommended Setup
**Located at:** `~/.claude/settings.json.recommended`

**Pros:**
- ✅ Still very permissive for development
- ✅ Protects .env files and credentials
- ✅ Asks before destructive operations (rm, kill, sudo)
- ✅ Asks before force-push operations
- ✅ Explicit allowlist for common tools
- ✅ Additional directory access configured

**Cons:**
- ⏸️ Slightly more prompts for destructive operations
- ⏸️ Need to update allowlist for new tools

---

## Permission Modes Explained

### 1. **Default Mode** (Recommended for Most Work)
```bash
claude  # or claude --permission-mode default
```
- Asks for permission on first use of each tool
- "Always allow" option saves preference
- Good balance of safety and productivity

### 2. **Plan Mode** (Exploration & Analysis)
```bash
claude --permission-mode plan
# or press Shift+Tab in session
```
- **Read-only**: Cannot execute commands or edit files
- Perfect for:
  - Exploring unfamiliar codebases
  - Analyzing files before making changes
  - Research and documentation tasks
  - Reviewing code without risk

### 3. **Accept Edits Mode** (Rapid Development)
```bash
claude --permission-mode acceptEdits
```
- Automatically accepts file edit permissions
- Still asks for dangerous bash commands
- Use when actively coding and trust the workflow

### 4. **Bypass Permissions Mode** (Sandboxes Only)
```bash
claude --dangerously-skip-permissions
```
- **⚠️ DANGEROUS**: No safeguards at all
- Only use in isolated test environments
- Not recommended for general use

---

## Per-Session Tool Restrictions

### Allow Specific Tools Only
```bash
# Only git and read operations
claude --allowedTools "Read,Bash(git:*)"

# Only reading and editing (no bash)
claude --allowedTools "Read,Edit,Grep,Glob"

# Testing workflow only
claude --allowedTools "Read,Bash(pytest:*),Bash(npm run test:*)"
```

### Deny Specific Tools
```bash
# Prevent network access this session
claude --disallowedTools "WebFetch,WebSearch"

# Prevent writes this session
claude --disallowedTools "Edit,Write"
```

---

## Project-Specific Settings

### Create Project Override
For repository-specific rules:

```bash
# In your project root
mkdir -p .claude
cat > .claude/settings.json << 'EOF'
{
  "permissions": {
    "allow": [
      "Bash(npm run test:*)",
      "Bash(npm run lint:*)",
      "Bash(npm run build:*)"
    ],
    "deny": [
      "Edit(package-lock.json)",
      "Edit(yarn.lock)"
    ]
  }
}
EOF
```

**Benefits:**
- Team-shared permissions (committed to git)
- Project-specific tool allowances
- Protect critical files

### Create Local Override
For personal preferences in a project:

```bash
# Auto-gitignored
cat > .claude/settings.local.json << 'EOF'
{
  "permissions": {
    "allow": [
      "Bash(docker-compose up:*)"
    ]
  },
  "model": "opus"
}
EOF
```

---

## Security Best Practices

### ✅ DO

1. **Protect credentials:**
   ```json
   "deny": [
     "Read(.env)",
     "Read(**/.env)",
     "Read(**/credentials.json)",
     "Read(**/.ssh/id_*)",
     "Read(**/.aws/credentials)"
   ]
   ```

2. **Ask before destructive operations:**
   ```json
   "ask": [
     "Bash(rm:*)",
     "Bash(git push --force:*)",
     "Bash(sudo:*)"
   ]
   ```

3. **Use Plan Mode for unfamiliar code:**
   ```bash
   claude --permission-mode plan
   ```

4. **Audit sensitive operations:**
   - Check `~/.claude/history.jsonl` for command log
   - Review `~/.claude/debug/*.txt` for errors

### ❌ DON'T

1. **Never use `--dangerously-skip-permissions` in production**
2. **Don't allow `Bash(**)`** without understanding the risk
3. **Don't commit `.claude/settings.local.json`** (personal settings)
4. **Don't disable sandbox** without good reason

---

## Useful Shortcuts

### During a Session

```bash
# Press Shift+Tab to cycle permission modes:
Default → Plan → Accept Edits → (repeat)

# Use /permissions command:
/permissions add Bash(docker-compose:*)
/permissions remove Edit(package-lock.json)
/permissions list
```

### CLI Flags Reference

```bash
# Quick sandbox mode
claude --permission-mode plan

# Auto-approve edits
claude --permission-mode acceptEdits

# Specific tools only
claude --allowedTools "Read,Edit,Bash(git:*)"

# Block specific tools
claude --disallowedTools "WebFetch"

# Combine with model selection
claude --model opus --permission-mode plan
```

---

## Troubleshooting

### "Lock file is already being held" Error

**Cause:** Multiple sessions trying to access same coordination file

**Fix:**
```bash
# Check for stuck Claude processes
ps aux | grep claude

# Kill specific process
kill <PID>

# Or restart all Claude sessions
pkill claude
```

### "Permission denied" for Custom Commands

**Fix:** Add to allowlist:
```json
{
  "permissions": {
    "allow": [
      "Bash(your-command:*)"
    ]
  }
}
```

### "MaxFileReadTokenExceededError"

**Cause:** Trying to read file >25,000 tokens at once

**Fix:** Claude should auto-handle with offset/limit, but you can help:
- Break large files into smaller chunks
- Use Grep instead of Read for specific content
- Provide line ranges when requesting file reads

---

## Recommended Configuration by Use Case

### 1. General Development (Recommended)
```bash
cp ~/.claude/settings.json.recommended ~/.claude/settings.json
```
- Balanced security and productivity
- Protects credentials
- Asks before destructive ops

### 2. Exploratory Work
```bash
claude --permission-mode plan
```
- Read-only access
- Safe for unfamiliar code
- Perfect for research

### 3. Rapid Prototyping
```bash
claude --permission-mode acceptEdits --allowedTools "Read,Write,Edit,Bash(npm:*),Bash(git:*)"
```
- Fewer prompts
- Focused tool access
- Good for sprint work

### 4. Code Review
```bash
claude --permission-mode plan --allowedTools "Read,Grep,Glob"
```
- Cannot modify code
- Can analyze thoroughly
- Perfect for reviews

### 5. Production Deployments
```bash
claude --allowedTools "Read,Bash(git:*),Bash(vercel:*),Bash(netlify:*)"
```
- Explicit deployment tools only
- No accidental file modifications
- Controlled operations

---

## Apply Recommended Settings Now

```bash
# Backup current
cp ~/.claude/settings.json ~/.claude/settings.json.backup-$(date +%Y%m%d-%H%M%S)

# Apply recommended
cp ~/.claude/settings.json.recommended ~/.claude/settings.json

# Verify
cat ~/.claude/settings.json | jq .

# Test in new session
claude
```

---

## Additional Resources

- **Official Docs:** https://code.claude.com/docs/en/settings
- **Permission Patterns:** https://code.claude.com/docs/en/sdk/sdk-permissions
- **Your Settings:** `~/.claude/settings.json`
- **Project Settings:** `.claude/settings.json`
- **Debug Logs:** `~/.claude/debug/`
- **Command History:** `~/.claude/history.jsonl`

---

**Last Updated:** November 14, 2025
**Recommended Action:** Apply `settings.json.recommended` for balanced security + productivity
