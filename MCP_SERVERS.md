# MCP (Model Context Protocol) Servers
**Last Updated**: October 18, 2025

## Active Servers

### Claude Code CLI Servers
Located in: Claude Code's internal MCP configuration

#### 1. GitHub Server
- **Package**: `@modelcontextprotocol/server-github`
- **Version**: 0.6.2
- **Command**: `npx @modelcontextprotocol/server-github`
- **Status**: ✅ Connected
- **Capabilities**:
  - GitHub API integration
  - Repository management
  - Issue/PR operations
  - Code search

#### 2. Filesystem Server
- **Package**: `@modelcontextprotocol/server-filesystem`
- **Version**: 0.2.0
- **Command**: `npx @modelcontextprotocol/server-filesystem`
- **Args**: `/Users/matthewscott/Scripts`
- **Status**: ✅ Connected
- **Access**: Restricted to Scripts directory (security best practice)
- **Capabilities**:
  - Read/write files in Scripts/
  - Directory listing
  - File operations

### Claude Desktop App Servers
Located in: `~/Library/Application Support/Claude/claude_desktop_config.json`

#### 1. Filesystem Server (Desktop)
- **Command**: `npx`
- **Args**: `["-y", "@modelcontextprotocol/server-filesystem", "/Users/matthewscott"]`
- **Access**: Full home directory access
- **Purpose**: General file operations in Desktop app

---

## Configuration Files

### CLI Configuration
Managed internally by Claude Code
- Check status: `claude mcp list`

### Desktop App Configuration
```json
{
  "isUsingBuiltInNodeForMcp": false,
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/matthewscott"]
    }
  }
}
```

Location: `~/Library/Application Support/Claude/claude_desktop_config.json`

---

## Usage Notes

### Security Boundaries
- **CLI filesystem**: Restricted to `/Scripts` (safer for automation)
- **Desktop filesystem**: Full home directory (for manual work)

This separation prevents automated scripts from accidentally accessing/modifying files outside the Scripts directory.

### Adding New MCP Servers
**For CLI**:
```bash
claude mcp add <server-name> <command>
```

**For Desktop App**:
1. Edit `~/Library/Application Support/Claude/claude_desktop_config.json`
2. Add server configuration to `mcpServers` object
3. Restart Claude Desktop app

---

## Verification

Check MCP server health:
```bash
claude mcp list
```

Expected output:
```
Checking MCP server health...

github: npx @modelcontextprotocol/server-github - ✓ Connected
filesystem: npx @modelcontextprotocol/server-filesystem /Users/matthewscott/Scripts - ✓ Connected
```

---

## Troubleshooting

### Server Not Connecting
1. Check if npx is available: `which npx`
2. Clear MCP cache: `rm -rf ~/.cache/claude/mcp-*`
3. Restart Claude Code session

### Permission Errors
- Filesystem server respects file permissions
- CLI server only accesses `/Scripts` by design
- Desktop server has full home directory access

---

## Available MCP Servers (npm)

Popular servers you can add:
- `@modelcontextprotocol/server-sqlite` - SQLite database access
- `@modelcontextprotocol/server-postgres` - PostgreSQL integration
- `@modelcontextprotocol/server-brave-search` - Web search
- `@modelcontextprotocol/server-slack` - Slack integration

Install example:
```bash
claude mcp add sqlite "npx @modelcontextprotocol/server-sqlite"
```
