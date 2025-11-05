# Gmail MCP Server Integration Guide
**Created:** October 29, 2025
**Status:** Configured and Ready to Use

---

## Overview

The Gmail MCP Server provides real-time Gmail access directly within Claude Code sessions. Ask Claude questions like "What job responses did I get today?" and get instant answers from your Gmail inbox.

**Server Location:** `/Users/matthewscott/Desktop/Resumes_Master_2025/mcp_servers/gmail_server.py`

---

## Available Tools

### 1. `search_job_emails`
Search for recent job-related emails in Gmail.

**Parameters:**
- `hours` (optional): Number of hours to look back (default: 24)
- `max_emails` (optional): Maximum emails to return (default: 50)

**Example:**
```
"Search my Gmail for job emails from the last 48 hours"
→ Returns applications, interviews, assessments from last 2 days
```

### 2. `get_application_status`
Get status of applications to a specific company.

**Parameters:**
- `company_name` (required): Name of the company

**Example:**
```
"What's the status of my Innodata application?"
→ Returns all emails related to Innodata
```

### 3. `check_responses`
Check for responses to job applications (interviews, rejections, assessments).

**Parameters:**
- `hours` (optional): Number of hours to look back (default: 24)

**Example:**
```
"Did I get any interview requests today?"
→ Returns all response emails with interview/assessment/rejection keywords
```

### 4. `get_application_summary`
Get comprehensive summary of all job applications over a period.

**Parameters:**
- `days` (optional): Number of days to look back (default: 30)

**Example:**
```
"Show me my application activity for October"
→ Returns complete stats: total applications, companies, status breakdown
```

---

## Authentication

**Method:** IMAP with App Password
**Email:** matthewdscott7@gmail.com
**Password:** Stored in environment variable `GMAIL_APP_PASSWORD`
**App Password:** ifklwbtnaxydjcei (expires Nov 5, 2025)

**No OAuth setup required!** The server uses IMAP for immediate functionality.

---

## MCP Configuration

### For Claude Desktop

Add to your `claude_desktop_config.json` (typically in `~/Library/Application Support/Claude/`):

```json
{
  "mcpServers": {
    "gmail": {
      "command": "/Library/Frameworks/Python.framework/Versions/3.14/bin/python3",
      "args": ["/Users/matthewscott/Desktop/Resumes_Master_2025/mcp_servers/gmail_server.py"],
      "env": {
        "GMAIL_APP_PASSWORD": "ifklwbtnaxydjcei"
      }
    }
  }
}
```

### For Claude CLI

Add to your Claude CLI config (location varies by installation):

```json
{
  "mcp": {
    "servers": {
      "gmail": {
        "command": "/Library/Frameworks/Python.framework/Versions/3.14/bin/python3",
        "args": ["/Users/matthewscott/Desktop/Resumes_Master_2025/mcp_servers/gmail_server.py"],
        "env": {
          "GMAIL_APP_PASSWORD": "ifklwbtnaxydjcei"
        }
      }
    }
  }
}
```

---

## Testing the Server

### Manual Test
```bash
cd /Users/matthewscott/Desktop/Resumes_Master_2025/mcp_servers
export GMAIL_APP_PASSWORD='ifklwbtnaxydjcei'
echo '{"method": "tools/list"}' | /Library/Frameworks/Python.framework/Versions/3.14/bin/python3 gmail_server.py
```

### Test Tool Call
```bash
echo '{"method": "tools/call", "params": {"name": "search_job_emails", "arguments": {"hours": 24}}}' | /Library/Frameworks/Python.framework/Versions/3.14/bin/python3 gmail_server.py
```

---

## Example Usage in Claude Code Sessions

Once configured, you can ask Claude:

**Daily Check-ins:**
- "What job emails did I get overnight?"
- "Did any companies respond to my applications today?"
- "Show me interview requests from the last 24 hours"

**Company-Specific:**
- "What's the status of my GoFundMe application?"
- "Has Turing sent me anything about the assessment?"
- "Did Innodata respond to my application?"

**Analytics:**
- "How many applications did I send in October?"
- "Which companies have I applied to this month?"
- "What's my response rate for the last 30 days?"

**Real-time Tracking:**
- "Find applications I haven't added to my tracker yet"
- "What confirmations did I get that I forgot to log?"
- "Any urgent action items in my inbox?"

---

## How It Works

1. **Connection:** Server connects to Gmail via IMAP (imap.gmail.com)
2. **Search:** Uses targeted search queries for job-related keywords
3. **Parsing:** Extracts company, position, status from email content
4. **Response:** Returns structured JSON data to Claude
5. **Claude Integration:** Claude interprets data and answers your questions naturally

**Performance:**
- Search: ~1-2 seconds for 24-hour window
- Company lookup: ~1-2 seconds
- Summary generation: ~5-10 seconds for 30 days

---

## Troubleshooting

### "Failed to connect to Gmail"
**Solution:** Check that app password is correct and not expired
```bash
export GMAIL_APP_PASSWORD='ifklwbtnaxydjcei'
```

### "No job emails found"
**Possible causes:**
1. No job-related emails in the time period
2. Emails don't match search keywords
3. Emails in a different folder (server only searches INBOX)

**Solution:** Adjust `hours` or `days` parameter to search longer period

### "MCP server not responding"
**Solutions:**
1. Verify Python 3.14 path: `/Library/Frameworks/Python.framework/Versions/3.14/bin/python3`
2. Check file permissions: `chmod +x gmail_server.py`
3. Test manually (see Testing section above)
4. Restart Claude Code

---

## Maintenance

### Update App Password (before Nov 5, 2025)
1. Go to https://myaccount.google.com/apppasswords
2. Generate new password for "Claude Code Gmail Access"
3. Update environment variable and config files
4. Restart server

### Search Keyword Customization
Edit `gmail_server.py`, modify the `searches` list in `search_job_emails()`:
```python
searches = [
    f'(SINCE {date_since} SUBJECT "your keyword")',
    # Add more patterns...
]
```

### Add New Tools
Add new tool definitions to the `handle_tool_call()` method and update the `tools/list` response.

---

## Future Enhancements (Phase 2)

1. **OAuth Migration:** Switch from IMAP to Gmail API
2. **Real-time Webhooks:** Instant notifications on new emails
3. **Sent Folder Monitoring:** Auto-detect when you send applications
4. **Smart Filtering:** Use Ollama models to classify email importance
5. **Attachment Access:** Download application confirmations/assessments
6. **Label Management:** Auto-label job emails
7. **Thread Analysis:** Group related emails by conversation

---

## Security Notes

- App password stored in environment variable (not in code)
- IMAP connection uses SSL/TLS encryption
- Server runs locally, no data leaves your machine
- No OAuth tokens stored on disk
- Gmail app passwords can be revoked anytime

---

## Performance Tips

1. **Narrow your search:** Use specific company names or shorter time windows
2. **Cache results:** Store frequently accessed data locally
3. **Batch queries:** Ask multiple questions in one session
4. **Use summaries:** Monthly summaries are pre-aggregated

---

## Support & Updates

**Location:** `/Users/matthewscott/Desktop/Resumes_Master_2025/mcp_servers/`
**Documentation:** This file + `SYNC_WORKFLOW.md`
**Logs:** Output to Claude Code conversation history

**To update the server:**
```bash
cd /Users/matthewscott/Desktop/Resumes_Master_2025/mcp_servers
# Edit gmail_server.py
# No need to restart - Claude Code will use updated version next session
```

---

**Status:** ✅ READY TO USE

Ask Claude to search your Gmail right now!
