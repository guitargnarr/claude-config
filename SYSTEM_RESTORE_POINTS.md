# Claude Code System Restore Points
**Purpose**: Document known-good system states for easy restoration

---

## 🟢 RESTORE POINT: October 18, 2025 (Optimized State)

**Status**: ✅ Optimal Configuration
**Created**: October 18, 2025, 9:30 AM
**Reason**: System restoration after over-engineering, returned to high-value baseline

### System Specifications
- **Claude Code Version**: 2.0.22
- **Model**: Sonnet 4.5
- **Platform**: macOS 26.0.1 Beta (M3 Max)
- **Installation Type**: Native
- **Auto-Updates**: Disabled

### Authentication Configuration
- **Method**: claude.ai (Claude Max subscription) ✅ ACTIVE
- **API Key**: Available at `~/.config/environment/credentials/anthropic.env` (for Python projects only)
- **Billing**: Included in Claude Max subscription
- **Environment Variable**: `ANTHROPIC_API_KEY` is **NOT** set in shell environment

**To verify auth status**:
```bash
echo $ANTHROPIC_API_KEY  # Should be empty
claude test              # Should show "Sonnet 4.5 · Claude Max"
```

### MCP Servers
- **github** (v0.6.2): ✅ Connected
- **filesystem** (v0.2.0): ✅ Connected to `/Users/matthewscott/Scripts`

**Verification**:
```bash
claude mcp list
```

### Custom Configuration
**Commands**: 12 slash commands active
- `/coach`, `/louisville`, `/tactic` (Ollama career models)
- `/code`, `/analyze` (Ollama code/data models)
- `/humanize`, `/quick` (Ollama text models)
- `/audit-repo`, `/audit-status`, `/audit-sync`, `/audit-handoff`, `/test-models` (repository audit workflow)

**Skills**: 4 auto-discovery skills
- job-application-tracker
- interview-prep-auto
- resume-customizer
- cover-letter-generator

**Agents**: 6 specialized agents
- code-analyzer
- documentation-reader
- security-auditor
- repo-scanner
- code-automation
- interview-prep

**Hooks**: 8 active hooks (resume file protection + audit logging)

### Disk Usage (Optimized)
| Component | Size | Notes |
|-----------|------|-------|
| `.claude/` | ~324 MB | Primary config directory |
| `.claude/projects/` | 291 MB | Active session history (all recent) |
| `.claude/debug/` | 21 MB | Debug logs (60 files, all <30 days) |
| `.claude/file-history/` | 11 MB | File revision snapshots |
| `.claude.json` + backup | 112 MB | Session state |
| `.local/share/claude/` | 215 MB | Version binaries |
| **TOTAL** | ~651 MB | ✅ Optimized |

**Cleanup completed**:
- ✅ Removed 9 duplicate `.claude` directories from backups (~80KB)
- ✅ All debug logs current (<30 days)
- ✅ All project sessions active (no archival needed)

### Ollama Integration
- **Models**: 7 active models (16.9 GB)
- **Location**: Local system (M3 Max, Metal GPU)
- **Integration**: Via slash commands + skills
- **Virtual Env**: `google-env` (2.1 GB, Python 3.13.7)

### Documentation
Created reference documents:
- `~/.claude/API_KEYS_REFERENCE.md` - API key management guide
- `~/.claude/MCP_SERVERS.md` - MCP server configuration
- `~/.claude/SYSTEM_RESTORE_POINTS.md` - This file

---

## 🔄 How to Restore This State

If you encounter issues, restore to this configuration:

### 1. Fix Authentication
```bash
# Unset API key (if accidentally sourced)
unset ANTHROPIC_API_KEY

# Verify claude.ai authentication
claude test
# Should show: "Sonnet 4.5 · Claude Max"

# If not logged in:
claude /login
```

### 2. Verify MCP Servers
```bash
claude mcp list
# Should show both github and filesystem as Connected
```

### 3. Check Custom Configuration
```bash
# Verify commands
ls ~/.claude/commands/*.md | wc -l  # Should be 12

# Verify skills
ls ~/.claude/skills/ | wc -l       # Should be 4

# Verify agents
ls ~/.claude/agents/*.md | wc -l   # Should be 6
```

### 4. Confirm Settings
```bash
# Check settings file
cat ~/.claude/settings.json | grep -E "model|outputStyle|hooks"
# Model should be: "sonnet[1m]"
# Should have hooks for resume protection
```

---

## 📋 System Health Checklist

Use this checklist to verify system health:

- [ ] Authentication: claude.ai active, no API key in environment
- [ ] MCP servers: Both github and filesystem connected
- [ ] Commands: 12 slash commands available
- [ ] Skills: 4 auto-discovery skills present
- [ ] Agents: 6 specialized agents configured
- [ ] Hooks: 8 hooks active for resume protection
- [ ] Ollama: 7 models accessible via slash commands
- [ ] No authentication conflict warnings
- [ ] Debug logs < 30 days old
- [ ] Project sessions all active

**Quick health check**:
```bash
claude test && claude mcp list && ls ~/.claude/commands/*.md | wc -l
```

---

## 🚨 Common Issues & Solutions

### Issue: "Auth conflict" warning
**Cause**: Both claude.ai token and API key are set
**Solution**:
```bash
unset ANTHROPIC_API_KEY
claude test
```

### Issue: "Invalid API key" error
**Cause**: Using rejected API key or wrong auth method
**Solution**: Use claude.ai authentication (see "Fix Authentication" above)

### Issue: MCP server not connecting
**Cause**: Network issue or outdated package
**Solution**:
```bash
# Clear cache and restart
rm -rf ~/.cache/claude/mcp-*
# Restart Claude Code session
```

### Issue: Slash command not found
**Cause**: Command file missing or permissions issue
**Solution**:
```bash
# Check if command file exists
ls ~/.claude/commands/
# Verify permissions
chmod 644 ~/.claude/commands/*.md
```

---

## 📊 What Makes This Configuration "Optimal"

### High-Value Features Preserved
✅ 12 custom Ollama-integrated slash commands
✅ 4 auto-discovery career automation skills
✅ 6 specialized agents for complex tasks
✅ 8 production-grade hooks for file protection
✅ MCP integration (GitHub + filesystem)
✅ Comprehensive session history (active work)

### Low-Value Overhead Removed
✅ No duplicate `.claude` directories in backups
✅ No conflicting authentication methods
✅ No stale debug logs (>30 days)
✅ No inactive project sessions
✅ Clean documentation structure

### Authentication Clarity
✅ Single auth method (claude.ai)
✅ API key preserved for Python projects only
✅ Clear separation of use cases
✅ Documented troubleshooting

---

## 🎯 Success Criteria

This configuration is considered "working optimally" when:

1. **No warnings** on `claude test`
2. **Both MCP servers connected** on `claude mcp list`
3. **Prompt execution < 2 seconds** for simple queries
4. **All custom commands/skills/agents functional**
5. **No authentication conflicts**
6. **Disk usage stable** (~650MB total)

**Current Status**: ✅ All criteria met

---

## 📅 Maintenance Schedule

**Weekly** (5 minutes):
- Check for Claude Code updates: `claude --version`
- Verify MCP server health: `claude mcp list`

**Monthly** (15 minutes):
- Review disk usage: `du -sh ~/.claude/`
- Archive very old sessions (>90 days) if any
- Check for unused custom commands/skills

**Quarterly** (30 minutes):
- Review and update API key if needed
- Update Ollama models: `ollama pull <model>`
- Review hooks and permissions configuration

---

**Last verified working**: October 18, 2025, 9:30 AM
**Next review due**: November 18, 2025

