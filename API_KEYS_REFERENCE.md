# Anthropic API Keys Reference
**Last Updated**: October 18, 2025

## Authentication Methods

### Method 1: claude.ai (ACTIVE - Recommended)
- **Type**: Web-based authentication via Claude Max subscription
- **Billing**: Included in Claude Max subscription (no per-call charges)
- **Usage**: Primary method for Claude Code CLI
- **Status**: ✅ Active
- **Setup**: `claude /login` (already configured)

### Method 2: API Key (For Python Projects Only)
- **Type**: Direct API key authentication
- **Billing**: Pay-per-use API billing
- **Usage**: Python automation scripts, standalone projects
- **Status**: 📦 Available but not used in Claude Code
- **Location**: `~/.config/environment/credentials/anthropic.env`

---

## API Key History

### Current Production Key (Approved)
- **Key Suffix**: `...6vWqTD3gZ_KyvSn5TAAA`
- **Created**: October 18, 2025 (estimated)
- **Status**: ✅ Approved for use
- **Purpose**: Python projects (Sentinel-1, sentiment-analysis-api, etc.)
- **Location**: `~/.config/environment/credentials/anthropic.env`
- **Full Key Name**: `claude_code_key_matthewdscott7_pqyp`

### Deprecated Key (Rejected)
- **Key Suffix**: `...KO6t2lh_cuA-Dz3VbQAA`
- **Created**: October 18, 2025 (8:10 AM)
- **Status**: ❌ Rejected - Do not use
- **Reason**: Authentication errors, marked as rejected in `.claude.json`
- **Action**: Removed from credentials file on Oct 18, 2025

---

## Usage Guidelines

### For Claude Code CLI
**DO**: Use claude.ai authentication (Method 1)
```bash
# Login to claude.ai (if not already logged in)
claude /login

# Verify authentication
claude test
```

**DON'T**: Source the API key environment file for Claude Code
```bash
# ❌ DON'T DO THIS for Claude Code:
source ~/.config/environment/credentials/anthropic.env
```

### For Python Projects
**DO**: Source the API key file when needed for scripts
```bash
# ✅ DO THIS for Python automation:
source ~/.config/environment/credentials/anthropic.env
python3 ~/Projects/your-project/script.py
```

---

## Troubleshooting

### "Invalid API key" Error
1. Check if you have both auth methods active: `echo $ANTHROPIC_API_KEY`
2. If set, unset it: `unset ANTHROPIC_API_KEY`
3. Verify claude.ai login: `claude test`

### "Auth conflict" Warning
- You have both claude.ai token and API key set
- Solution: Use only one method at a time
- For Claude Code: Prefer claude.ai authentication

### Need to Switch Methods
**Switch TO claude.ai**:
```bash
unset ANTHROPIC_API_KEY
claude test
```

**Switch TO API key**:
```bash
claude /logout
source ~/.config/environment/credentials/anthropic.env
# Approve the API key when prompted
```

---

## File Locations

| File | Purpose | Path |
|------|---------|------|
| API Credentials | Stores approved API key | `~/.config/environment/credentials/anthropic.env` |
| Claude Session | Session state, approved/rejected keys | `~/.claude.json` |
| This Document | API key reference | `~/.claude/API_KEYS_REFERENCE.md` |

---

## Restore Point (October 18, 2025)

**Working Configuration**:
- Authentication: claude.ai (Claude Max subscription)
- API Key: Available in credentials file for Python projects only
- MCP Servers: github (v0.6.2), filesystem (v0.2.0)
- Claude Code Version: 2.0.22
- No environment variable conflicts

**To restore this state**:
```bash
unset ANTHROPIC_API_KEY
claude test
# Should show: "Sonnet 4.5 · Claude Max"
```
