# Understanding Your Claude Ecosystem
**A Practical Guide for Matt Scott**
**Last Updated:** October 24, 2025

---

## 🎯 TL;DR - Which Claude When?

| Task | Use This | Why |
|------|----------|-----|
| Execute code, modify files, build projects | **Claude Code (CLI)** | Direct file system access, runs commands |
| Research, planning, writing, conversations | **Claude.ai (Web)** | Best for brainstorming, no local access needed |
| Quick questions while working | **Claude Desktop (App)** | Fastest access, stays open, good for multitasking |
| Configure AI behavior across all tools | **CLAUDE.md files** | All three read these for context |

---

## 📦 The Three Claudes - What They Actually Are

### 1. Claude Code (CLI Tool)

**What it is:** Command-line interface that runs in your terminal
**Cost:** $250/month (your current subscription)
**Location:** Runs from terminal via `claude` command

**What it CAN do:**
- ✅ Read and write files in your project directories
- ✅ Execute bash commands (run scripts, install packages)
- ✅ Create, edit, and delete files
- ✅ Run Python scripts and see output
- ✅ Access your CLAUDE.md configuration files
- ✅ Use computer tools (bash, file operations)
- ✅ Multi-step workflows (analyze → plan → execute → verify)

**What it CANNOT do:**
- ❌ Web browsing (no web_search tool)
- ❌ Access files outside your allowed directories
- ❌ Remember conversations from claude.ai or Desktop app
- ❌ Show images or render visual content

**Best for:**
- Building and debugging code projects
- File system operations and organization
- Running scripts and automation
- The Python PATH fix you just completed
- Any task requiring "do this on my computer"

**Example uses:**
```bash
# In terminal:
claude "analyze all Python files in this project and suggest improvements"
claude "create a script that organizes my downloads folder"
claude "fix the import errors in main.py"
```

---

### 2. Claude.ai (Web Interface)

**What it is:** Browser-based chat at https://claude.ai
**Cost:** Included in your subscription
**Access:** Any web browser

**What it CAN do:**
- ✅ Web search (research, current information)
- ✅ Long, multi-turn conversations
- ✅ File uploads (analyze documents, images, code)
- ✅ Create artifacts (documents, code, React apps)
- ✅ Extended context conversations
- ✅ Access to conversation history
- ✅ Projects feature (organized workspaces)
- ✅ Share conversations via links

**What it CANNOT do:**
- ❌ Execute code on your machine
- ❌ Access your local files directly
- ❌ Modify files on your computer
- ❌ Run bash commands
- ❌ See conversations from Claude Code or Desktop

**Best for:**
- Research and web searches
- Planning and brainstorming
- Analyzing uploaded documents
- Job application materials (resumes, cover letters)
- This conversation we're having right now
- Learning new topics
- Complex problem-solving discussions

**Example uses:**
- "Research AI/ML job market trends in Louisville"
- "Analyze this job description and tailor my resume"
- "Help me understand this error message" (screenshot upload)
- "What are best practices for Python project structure?"

---

### 3. Claude Desktop (Native App)

**What it is:** Standalone application for Mac/Windows
**Cost:** Included in your subscription
**Location:** Installed app on your computer

**What it CAN do:**
- ✅ Quick access (always available, no browser needed)
- ✅ MCP (Model Context Protocol) integrations
- ✅ Connect to local tools and services
- ✅ Screenshot analysis
- ✅ Same conversation quality as web
- ✅ Faster than opening browser

**What it CANNOT do:**
- ❌ Direct file system operations (like Code)
- ❌ Execute bash commands (like Code)
- ❌ Share conversations via links (like Web)

**Best for:**
- Quick questions while working on other tasks
- Always-available assistant
- When you don't want to open a browser
- Using MCP integrations (if configured)

**Example uses:**
- Quick "how do I do X in Python?" while coding
- "Explain this concept" while reading documentation
- "Help me debug this error" (paste error message)

---

## 🔗 How They Relate to Each Other

### They DON'T Share:
- ❌ **Conversation history** - Each is independent
- ❌ **Context** - Starting fresh each time you switch
- ❌ **Memory** - What you tell one, others don't know

### They DO Share:
- ✅ **Your subscription** - One payment covers all three
- ✅ **CLAUDE.md files** - All three read these for context
- ✅ **Same AI model** - Claude Sonnet 4.5 in all three
- ✅ **Same capabilities** - (except for tool-specific features)

### Critical Understanding:
These are three different interfaces to the same AI, NOT three connected assistants.

Think of it like:
- Email on phone vs. laptop vs. web browser
- Same email account, but each device doesn't know what you did on the others

---

## 🗂️ CLAUDE.md Files - The Connector

**What they are:** Markdown files that provide context to Claude

**Where they live:**
```
~/.claude/CLAUDE.md              # Global config (all projects)
~/projects/my-app/CLAUDE.md      # Project-specific config
```

**Who reads them:**
- ✅ Claude Code (always)
- ✅ Claude.ai (when you mention them or they're relevant)
- ✅ Claude Desktop (potentially, with MCP)

**What they do:**
- Provide background context about you
- Document project structure
- Store lessons learned
- Define preferences and workflows
- Guide Claude's behavior

**Example structure:**
```markdown
# Project: Job Search Automation

## Context
- Owner: Matt Scott
- Purpose: Automate LinkedIn job applications
- Tech stack: Python 3.14, Selenium, pandas

## Preferences
- Code style: Black formatter, type hints
- Testing: pytest for all functions
- Documentation: Google-style docstrings

## Known Issues
- Rate limiting on LinkedIn (max 100 requests/hour)
- Session expires after 2 hours

## Commands
- Run: `python main.py`
- Test: `pytest tests/`
```

**Key insight:** CLAUDE.md is how you "teach" all three Claudes about your context without repeating yourself each conversation.

---

## 🎯 Practical Workflow Examples

### Scenario 1: Building a New Python Project

**Step 1: Planning (claude.ai)**
```
"I want to build a script that scrapes Indeed jobs and
saves them to a spreadsheet. Help me plan the architecture."
```
*Why web:* No code execution needed, just planning

**Step 2: Implementation (Claude Code)**
```bash
cd ~/projects/job-scraper
claude "Create the project structure we discussed,
with main.py, scraper.py, and requirements.txt"
```
*Why Code:* Actually creating files and structure

**Step 3: Debugging (Claude Desktop)**
```
"I'm getting ImportError: No module named 'selenium'.
What's wrong?"
```
*Why Desktop:* Quick question while terminal is busy

**Step 4: Documentation (claude.ai)**
```
"Here's my finished code [upload files].
Write a comprehensive README.md"
```
*Why web:* Document generation, file uploads

---

### Scenario 2: Job Application Workflow

**Research (claude.ai)**
```
"Search for remote Business Analyst positions at Series B+ startups.
What companies are hiring?"
```

**Resume tailoring (claude.ai)**
```
[Upload resume + job description]
"Tailor my resume for this position"
```

**Application tracking (Claude Code)**
```bash
claude "Add this job to my applications spreadsheet:
Company: Acme Corp
Position: Senior Business Analyst
Applied: 2025-10-24"
```

---

### Scenario 3: Learning New Technology

**Understanding (claude.ai or Desktop)**
```
"Explain FastAPI vs. Flask for building APIs.
Which should I learn for job interviews?"
```

**Practice (Claude Code)**
```bash
claude "Create a simple FastAPI app with 3 endpoints:
- GET /jobs (list all jobs)
- POST /jobs (add new job)
- GET /jobs/{id} (get specific job)"
```

**Portfolio (claude.ai)**
```
"I built this API [paste code]. Help me write a blog
post explaining what I learned and how it works."
```

---

## 🚦 Decision Tree: Which Claude Should I Use?

```
START: What do you need to do?

├─ Does it require creating/modifying files on your computer?
│  YES → Use Claude Code
│  NO → Continue
│
├─ Does it require web search or current information?
│  YES → Use claude.ai
│  NO → Continue
│
├─ Is it a quick question while you're working?
│  YES → Use Claude Desktop
│  NO → Continue
│
├─ Is it complex planning or long conversation?
│  YES → Use claude.ai
│  NO → Continue
│
└─ Default: Use whatever is already open
```

---

## 💡 Pro Tips for Your Workflow

### 1. Use Claude Code for "DO" Tasks
```bash
# Good uses of Claude Code:
claude "organize my downloads folder by file type"
claude "find all TODO comments in my Python files"
claude "create a backup script that runs daily"
claude "refactor this function to be more readable"
```

### 2. Use claude.ai for "THINK" Tasks
```
# Good uses of claude.ai:
- "Help me decide between these two job offers"
- "Review my cover letter and suggest improvements"
- "What are the pros and cons of moving to remote work?"
- "Research companies in the AI/ML space in Louisville"
```

### 3. Use Desktop for "QUICK" Tasks
```
# Good uses of Desktop:
- "What does this error mean?"
- "How do I use pandas merge?"
- "Explain what a REST API is"
- Quick fact-checking while working
```

### 4. Coordinate with CLAUDE.md

In your `~/.claude/CLAUDE.md`:
```markdown
## Workflow Preferences

### Code Review
- Always suggest type hints
- Prefer list comprehensions over loops
- Flag any print() statements (should use logging)

### Job Search
- Target roles: Business Analyst, Data Analyst, AI/ML Engineer
- Salary range: $120K-$200K
- Location: Remote or Louisville, KY
- Avoid: Healthcare insurance companies

### Communication Style
- Be direct and concise
- No unnecessary pleasantries
- Assume I understand technical concepts
```

Now ALL three Claudes will follow these preferences when they read this file.

---

## 🔧 Common Confusions - Clarified

### "Why does Claude.ai give different advice than Claude Code?"

**Answer:** They're reading different context:
- Claude Code sees your actual files, directory structure, CLAUDE.md
- Claude.ai only sees what you paste/upload in that conversation

**Solution:** Share relevant context when asking questions:
```
# In claude.ai:
"I have a Python project with this structure [paste tree output].
The CLAUDE.md says [paste relevant section].
How should I..."
```

---

### "Why can't Claude Code search the web?"

**Answer:** Security and focus.
- Claude Code has LOCAL file access (powerful, potentially dangerous)
- Web search requires EXTERNAL access
- Anthropic separated these for security

**Solution:** Use claude.ai for research, then bring findings to Code:
1. Research in claude.ai: "Best Python logging practices"
2. Implement in Code: `claude "add logging to all my Python files following best practices"`

---

### "Do I need to tell Claude Code what we discussed in claude.ai?"

**Yes.** They don't share context.

**Solution:**
- Save important conversations from claude.ai
- Add key decisions to CLAUDE.md
- Or paste relevant context when starting Code session

---

### "Which one is 'real' Claude?"

**All of them.** They're three interfaces to the same AI model.

Like:
- Gmail on phone ≠ Gmail on computer ≠ Gmail on web
- Same email, different ways to access it

---

## 📋 Quick Reference Card

```
┌─────────────────────────────────────────────────────────┐
│                WHICH CLAUDE WHEN?                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  CREATE/MODIFY FILES           → Claude Code (CLI)      │
│  RUN COMMANDS/SCRIPTS          → Claude Code (CLI)      │
│  ORGANIZE FILE SYSTEM          → Claude Code (CLI)      │
│                                                          │
│  WEB SEARCH/RESEARCH           → claude.ai (Web)        │
│  LONG CONVERSATIONS            → claude.ai (Web)        │
│  UPLOAD DOCUMENTS              → claude.ai (Web)        │
│  SHARE CONVERSATIONS           → claude.ai (Web)        │
│                                                          │
│  QUICK QUESTIONS               → Claude Desktop (App)   │
│  ALWAYS-AVAILABLE HELP         → Claude Desktop (App)   │
│                                                          │
│  CONFIGURE ALL THREE           → CLAUDE.md files        │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🎓 Your Specific Questions Answered

### "Am I using Claude Code the right way?"

**Based on your Python PATH fix: Yes, absolutely.**

That's exactly what Claude Code is for:
- Analyzing your system configuration
- Modifying shell config files (.zprofile)
- Running verification commands
- Creating organizational structure
- Multi-step technical workflows

---

### "What's the integration between the three?"

**There isn't one - and that's intentional.**

They're three tools for three different jobs:
- **Code** = Your mechanic (fixes your car)
- **Web** = Your researcher (finds information)
- **Desktop** = Your quick reference (answers questions)

**Integration happens through YOU:**
- Research in Web → Implement in Code
- Quick question in Desktop → Apply in your work
- Document learnings in CLAUDE.md → All three benefit

---

### "How do I know which to use?"

**Ask yourself:**
- "Do I need files changed on my computer?" → Code
- "Do I need to search the internet?" → Web
- "Is this a 30-second question?" → Desktop
- "Am I already in one?" → Stay there

---

## 🚀 Recommended Workflow for Your Job Search

Based on your goals (complete projects, job search):

### Morning Routine (30 min)
1. **Desktop:** "What should I focus on today?"
2. **Web:** Search for new job postings
3. **Code:** `claude "update my job tracker spreadsheet with today's applications"`

### Deep Work (2-4 hours)
1. **Code:** Work on your project (the one blocked for months)
2. **Desktop:** Quick questions as they come up
3. **Code:** Save progress and document learnings

### Application Time (1-2 hours)
1. **Web:** Research company + role
2. **Web:** Tailor resume/cover letter
3. **Code:** `claude "save this application to tracking spreadsheet"`

### Evening Review (15 min)
1. **Desktop:** "Reflect on today's progress"
2. **Code:** `claude "commit today's work with descriptive message"`
3. **Web:** Plan tomorrow's priorities

---

## 💰 Getting Value from Your $250/month

You're paying for Claude Code. Make sure you use it for things that REQUIRE it:

### High-value Code uses:
- Automate repetitive tasks (file organization, data processing)
- Build and maintain projects
- System configuration (like the Python PATH fix)
- Code refactoring and optimization
- Creating scripts for job search automation

### Low-value Code uses:
- Questions you could ask in free claude.ai
- Research tasks
- Brainstorming
- Anything that doesn't need file access

**Rule of thumb:** If you could do it in claude.ai for free, don't use Code for it.

---

## 🎯 Action Items for You

### This Weekend
1. **Use Claude Code to finish that project**
   - Your Python environment is fixed
   - This is what you've been waiting for
   - Code is the right tool for this

2. **Create a CLAUDE.md in your project directory**
   - Document your project structure
   - Note your preferences
   - This helps Code help you better

3. **Bookmark this guide**
   - Reference when unsure which to use
   - Share with future-you in 6 months

### Going Forward

**When starting any task, ask:**
- "Does this need to modify files?" → Code
- "Does this need web research?" → Web
- "Is this a quick question?" → Desktop
- "Not sure?" → Use whatever's open

**Update your CLAUDE.md monthly:**
- New lessons learned
- Changed preferences
- Completed projects
- Current focus

---

## 📞 Still Confused?

If you're ever unsure which Claude to use:
1. Open claude.ai (free to use)
2. Ask: "Should I use Code, Web, or Desktop for [task]?"
3. Get recommendation
4. Use that tool

**Remember:** There's no wrong choice. They're all the same AI. Worst case, you use a slightly less optimal tool. No big deal.

---

## ✅ Summary

### Three tools, one AI:
- **Claude Code** = Does things on your computer
- **Claude.ai** = Thinks and researches
- **Claude Desktop** = Quick access

### They don't talk to each other:
- No shared memory
- No shared conversations
- You are the integration layer

### CLAUDE.md connects them:
- All three read these files
- Your preferences persist across tools
- One place to document context

### Use the right tool for the job:
- Code for building
- Web for planning
- Desktop for questions

### You're using Code correctly:
- That Python PATH fix was perfect use case
- Now use it to finish your project
- $250/month = worth it when used for file operations

---

**This guide saved to:** `~/.claude/GUIDE.md`
**Reference anytime:** `cat ~/.claude/GUIDE.md`
