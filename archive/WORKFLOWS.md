# Claude Code Optimal Workflows (From Anthropic)

**Source**: Anthropic Engineering Blog + Official Documentation
**Last Updated**: 2025-11-13

---

## Core Workflow Pattern: Explore → Plan → Code → Commit

### **1. Explore** (Research First, Don't Code Yet)
```bash
claude --permission-mode plan
```
Ask Claude to research files/URLs without making changes:
- "Give me an overview of this codebase"
- "Find files that handle user authentication"
- "Trace the login process from frontend to database"
- "What's the architecture pattern used here?"

**When to use**: New codebase, unfamiliar code, complex bugs

---

### **2. Plan** (Extended Thinking Before Implementation)
Press Tab or use thinking prompts:
- "think" - Basic analysis
- "think hard" - Deeper reasoning
- "ultrathink" - Maximum depth

**Or enable permanently**: Set `MAX_THINKING_TOKENS` environment variable

**Use for**: Complex architecture decisions, multi-step features, intricate bugs

**Plan Mode**: Press Shift+Tab or `claude --permission-mode plan`
- Read-only operations
- Safe exploration
- Interactive iteration before committing to approach

---

### **3. Code** (Test-Driven Development)
**Anthropic pattern from Security Engineering team**:
1. "Write tests for [feature] based on these expected inputs/outputs"
2. Verify tests fail (no implementation yet)
3. "Now implement the feature to make tests pass"
4. Run tests, iterate until all pass
5. Review and commit

**Example**:
```
> Write tests for authentication with Google OAuth, test cases: success, invalid token, expired token

[Claude writes tests]

> Run tests
[Tests fail - good]

> Implement OAuth handler to pass these tests

[Claude implements]

> Run tests again
[Tests pass - ship it]
```

---

### **4. Commit** (Git Integration)
```bash
> create a commit
> create a pr
```

Claude handles:
- Commit messages (conventional format)
- PR descriptions
- Complex rebases
- Git history searches
- Code review comment fixes

---

## Anthropic Team Workflows (Real Use Cases)

### **Debugging Production Issues** (Security Engineering)
**Before Claude Code**: 10-15 minutes tracing control flow
**With Claude Code**: 3x faster (3-5 minutes)

**Workflow**:
```
> Here's the stack trace: [paste]
> Here's our documentation: @docs/api.md
> Trace the control flow and identify the issue
```

**Result**: Claude identifies root cause, suggests fix

---

### **Kubernetes Incident Response** (Data Infrastructure)
**Scenario**: Pod scheduling failure during outage

**Workflow**:
```
> [Drag screenshot of Google Cloud dashboard]
> We're getting pod scheduling errors. What's wrong?

Claude: "You've exhausted IP addresses in your pod CIDR range"

> What commands do I run to fix this?

Claude: [Provides exact gcloud commands to create new IP pool]
```

**Time saved**: 20 minutes during critical outage

---

### **Building Features in Unfamiliar Languages** (Data Scientists)
**Scenario**: Data scientist (no TypeScript) needs React visualization

**Workflow**:
```
> Build a React app that visualizes RL model performance
> Data structure: [provide JSON example]
> Design: Clean, minimal, responsive

[Claude builds entire app from scratch]

> Run it locally
```

**Result**: Full working app without knowing TypeScript

---

### **Automated PR Reviews** (Product Design Team)
**Setup**: GitHub Actions + Claude Code

**Workflow**:
1. PR opened → triggers GitHub Action
2. Claude Code reviews PR automatically
3. Handles formatting fixes
4. Suggests test improvements
5. Comments on PR

**Time saved**: Hours of manual review per week

---

### **Vim Keybindings** (Product Design - Autonomous Loop)
**Workflow**:
```
> Build Vim keybindings for Claude Code
> Write tests for all commands (hjkl, dd, yy, p, etc.)
> Run tests, fix failures
> Iterate until all tests pass
```

**Human involvement**: Minimal (kicked off task, checked in periodically)
**Result**: Complete Vim mode built autonomously

---

### **Ad Variation Generation** (Growth Marketing)
**Scenario**: Process 100s of ads, find underperformers, generate variations

**Setup**: Custom agentic workflow with 2 sub-agents

**Workflow**:
```bash
# Feed CSV with 300 ads
> Identify ads with CTR <2%
> Generate 5 variations for each underperformer
> Strict character limits: Headline 30 chars, body 90 chars

[Claude processes in minutes]
```

**Before**: Hours of manual work
**After**: Minutes with Claude

**Advanced**: Figma plugin generates 100 ad variations by swapping headlines/descriptions (0.5 seconds per batch)

---

### **Phone Tree for Legal Team** (Non-Technical Users)
**Built by**: Legal team (non-developers)

**Purpose**: Help team members find the right lawyer for their issue

**Result**: Custom internal tool built without traditional development resources

**Pattern**: Non-technical teams building custom automation

---

## Command Reference (Anthropic-Recommended)

### **Session Management**
```bash
claude                          # Start new session
claude --continue               # Resume most recent
claude --resume                 # Conversation picker
claude --print                  # Non-interactive mode
```

### **Permission Modes**
```bash
claude --permission-mode plan           # Read-only (safe exploration)
claude --dangerously-skip-permissions   # Auto-accept (use in sandboxes only)
claude --allowedTools read,bash,grep    # Session-specific permissions
```

### **Context Control**
```bash
/clear                          # Reset context window (use frequently)
#                              # Add instruction to CLAUDE.md
/permissions                    # Manage allowed tools mid-session
/memory                        # Open CLAUDE.md in editor
```

### **Output Formats**
```bash
claude -p "prompt" --output-format text         # Plain text
claude -p "prompt" --output-format json         # JSON output
claude -p "prompt" --output-format stream-json  # Streaming JSON (CI/CD)
```

### **Debugging**
```bash
claude --mcp-debug              # Diagnose MCP server issues
claude --verbose                # Detailed logging
```

---

## Efficiency Techniques (From Anthropic Research)

### **1. Be Hyper-Specific**
❌ Poor: "add tests for foo.py"
✅ Good: "write tests for foo.py covering edge case where user is logged out; avoid mocks, use real auth flow"

### **2. Use Visual Feedback**
- Paste screenshots (Ctrl+V)
- Drag-drop design files
- Reference file paths for images: `@path/to/screenshot.png`

### **3. Tab Completion**
- Type `@src/` then Tab → file picker
- Quickly reference files without typing full paths

### **4. Pass Documentation URLs**
```
> Implement OAuth following this spec: https://oauth.net/2/
> Use /permissions to allowlist oauth.net if needed
```

### **5. Interrupt & Redirect**
- Press Escape → Stop Claude mid-task
- Double-tap Escape → Edit prior prompt
- No need to let Claude finish if it's going wrong

### **6. Checklists for Bulk Work**
```markdown
Migration checklist:
- [ ] Update auth.js
- [ ] Update user.js
- [ ] Update session.js
- [ ] Run tests
- [ ] Update docs
```

Claude works through list, checking off items as completed

---

## Advanced Patterns

### **Multi-Claude Parallel Work**
Run multiple Claude Code instances:
```bash
# Terminal 1
cd ~/project
claude
> Work on authentication feature

# Terminal 2
cd ~/project
claude
> Review authentication code
```

**Use git worktrees** to prevent conflicts:
```bash
git worktree add ../project-feature-a -b feature-a
cd ../project-feature-a
claude
```

One Claude codes, another reviews. No waiting, no merge conflicts.

---

### **Headless CI/CD Integration**
```bash
# In GitHub Actions or CI pipeline
claude -p "Fix linting errors in src/" --output-format stream-json
```

**Use cases**:
- Automated linting fixes
- Issue triage (categorize, label)
- Bulk migrations across files
- Code review automation

---

### **Git & GitHub Mastery**
Claude Code handles:
- Commit messages (conventional format)
- Complex rebases (`git rebase -i` equivalent)
- Git history searches ("when was this function introduced?")
- PR creation with descriptions
- Fixing code review comments
- Issue categorization

**Just ask**: "create a commit with conventional message format"

---

## Performance Optimization

### **Use /clear Frequently**
**Problem**: Long conversations accumulate irrelevant context
**Solution**: `/clear` between unrelated tasks
**When**: Switching features, changing files, new problem domain

**Example**:
```
> Fix auth bug
[work for 20 minutes]
> /clear
> Now work on payment processing
```

### **Scope Sessions to Single Features**
**Poor**: "Fix 10 bugs across different modules in one session"
**Good**: "Fix auth timeout bug" → `/clear` → "Fix payment retry logic"

**Why**: Keeps context relevant, improves output quality

---

### **Document Decisions Outside Claude**
**Poor**: Keep all context in Claude conversation
**Good**: Document decisions in:
- GitHub issues
- Project markdown files
- Commit messages
- Code comments

**Why**: Preserves knowledge without bloating active context

---

## Workflow Templates (Ready to Use)

### **Template 1: Bug Fix**
```bash
claude --permission-mode plan
> Analyze error: [paste stack trace]
> Find related files
> Explain what's happening

[Review Claude's analysis]

> /clear
claude
> Fix the issue in [file]
> Run tests
> Create commit
```

---

### **Template 2: New Feature (TDD)**
```bash
claude
> Write tests for [feature] with these cases: [list]
> Run tests (expect failures)
> Implement feature to pass tests
> Run tests again
> Refactor if needed
> Create PR
```

---

### **Template 3: Codebase Exploration**
```bash
claude --permission-mode plan
> Give overview of this codebase
> Show me architecture patterns
> Find authentication implementation
> Explain data flow for [feature]

[Take notes, no code changes]
```

---

### **Template 4: Refactoring**
```bash
claude
> Find deprecated API usage in @src/
> Suggest modern alternatives
> Update files (one at a time for review)
> Run tests after each change
> Create commit when tests pass
```

---

### **Template 5: Visual Implementation**
```bash
claude
> [Paste/drag design mockup]
> Implement this design for the login page
> Run dev server, screenshot result
> Iterate 2-3 times for refinement
> Create commit
```

---

## Key Insights from Anthropic Teams

### **1. Claude Code as "First Stop"**
**Pattern**: Before diving into code, ask Claude to identify relevant files
**Why**: Saves time exploring, gets you to the right place faster

### **2. Thought Partner, Not Code Generator**
**Pattern**: Use Claude to explore possibilities, discuss approaches
**Example**: "What are 3 ways to implement caching here? Pros/cons of each?"
**Why**: Better decisions before committing to implementation

### **3. Non-Technical Teams Build Tools**
**Example**: Legal team built custom phone tree without developers
**Pattern**: Natural language → working prototype
**Why**: Democratizes automation beyond engineering

### **4. Visual Feedback Loops**
**Pattern**: Design mockup → Claude implements → Screenshot → Iterate
**Why**: Faster than describing changes in text

### **5. Autonomous Loops for Well-Defined Tasks**
**Pattern**: Write tests → Claude implements → Runs tests → Iterates autonomously
**Best for**: Well-scoped features with clear success criteria
**Human role**: Kick off, check in periodically, review final result

---

## Anti-Patterns (What NOT to Do)

❌ **Long sessions without /clear**
Result: Context bloat, worse performance

❌ **Vague prompts**
"Make it better" vs "Add error handling for null user IDs"

❌ **No testing verification**
Let Claude code without running tests = bugs slip through

❌ **Treating Claude like Stack Overflow**
Ask once, copy-paste, done. Instead: Iterate, verify, refine.

❌ **Not using Plan Mode for exploration**
Making changes while researching = risky

---

## Productivity Metrics from Anthropic

**Debugging**: 3x faster (10-15 min → 3-5 min)
**Research**: 80% reduction (60 min → 10-20 min)
**Ad generation**: Hours → minutes
**Learning unfamiliar code**: "Hours of Googling" → minutes with Claude
**Git workflows**: 26x faster (45 min → 1.7 min) - from your own automation

---

## Quick Reference

```bash
# Start optimally
claude --permission-mode plan           # Explore first
/clear                                  # Then clear
claude                                  # Then code

# Think deeply
[Press Tab] or use "think hard"

# Reset context
/clear                                  # Use frequently

# Add to memory
#                                       # Auto-add to CLAUDE.md

# Resume work
claude --continue                       # Pick up where you left off

# Parallel work
git worktree + multiple Claude instances
```

---

**Apply these workflows in your daily work. They're proven by Anthropic's internal teams.**
