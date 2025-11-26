# claude-discover Command

**Created:** November 25, 2025
**Purpose:** Automated deployment discovery to prevent building on wrong codebase

---

## Installation

Already installed at: `~/.claude/scripts/claude-discover.sh`

**To use globally:**
```bash
# Add to PATH (add to ~/.zshrc)
export PATH="$HOME/.claude/scripts:$PATH"

# OR create alias
alias claude-discover='~/.claude/scripts/claude-discover.sh'
```

---

## Usage

```bash
# Basic usage
claude-discover https://myapp.vercel.app

# Works with any deployment URL
claude-discover https://myapp.railway.app
claude-discover https://myapp.netlify.app

# Can also use project name (if CLI configured)
claude-discover myproject
```

---

## What It Does

1. **Detects platform** (Vercel, Railway, Netlify)
2. **Lists all deployments** using platform CLI
3. **Tests URL with Playwright:**
   - HTTP status
   - Page title
   - Main heading
   - Login form presence
   - Navigation presence
   - Full page screenshot
4. **Saves screenshot** to `/tmp/discovery-[timestamp].png`
5. **Outputs recommendation** for next steps

---

## Example Output

```
🔍 Starting deployment discovery for: https://myapp.vercel.app

📦 Detected platform: vercel

📋 Listing all deployments...
myapp (Production) - https://myapp.vercel.app
myapp-staging - https://myapp-staging.vercel.app
frontend - https://frontend-xyz.vercel.app

🧪 Testing URL with browser...

🌐 Testing: https://myapp.vercel.app

✅ Loads successfully
📄 Title: MyApp - Welcome
📰 Main heading: Welcome to MyApp
❌ Login form: Missing
✅ Navigation: Present
📸 Screenshot: /tmp/discovery-1732550123.png
   View with: open /tmp/discovery-1732550123.png

═══════════════════════════════════════════════════════════
📊 NEXT STEPS:
1. Review screenshots in /tmp/
2. Compare UI quality of all found deployments
3. Decide which to use as foundation
4. Ask Claude to build on the chosen deployment
═══════════════════════════════════════════════════════════
```

---

## Integration with Claude Code

When starting work on deployment projects, run this FIRST:

```bash
# User gives you URL
User: "Improve my app at https://myapp.vercel.app"

# You respond:
claude-discover https://myapp.vercel.app

# Then report findings and get user decision
```

---

## Slash Command Integration

Added: `/discover` slash command

Usage in Claude Code:
```
/discover https://myapp.vercel.app
```

This triggers the deployment discovery protocol automatically.

---

## Why This Matters

**OurJourney Case Study:**
- Spent 2+ hours building on inferior codebase
- Superior UI existed at `ourjourney-app.vercel.app`
- Discovery would've taken 15 minutes
- **10x time saved on future projects**

---

## Future Enhancements

**v2 Features to add:**
- Multi-URL comparison (test 3-5 URLs in parallel)
- UI quality scoring (automated analysis)
- Feature detection (detect React, Vue, frameworks)
- Backend connectivity testing (API health checks)
- Git branch detection (which branch is deployed where)
- HTML diff comparison
- Automatic merge recommendations

**v3 Features:**
- AI-powered UI comparison ("This one has better onboarding")
- Performance metrics (Lighthouse scores)
- Bundle size analysis
- Dependency comparison

---

## Related Documentation

- **Protocol:** `~/.claude/reference/deployment-discovery-protocol.md`
- **Checklist:** `~/.claude/reference/session-start-checklist.md`
- **Global config:** `~/.claude/CLAUDE.md` (pitfalls section)
- **Principles:** `~/.claude/COLLABORATION_CONTRACT.md` (principle 3a)

---

**Status:** Active, ready to use
**Next use:** ANY deployment improvement project
