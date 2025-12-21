# Known Failure Patterns
## Quick Reference for AI-Human Collaboration Issues

**Purpose:** Documented failure modes and interventions to prevent recurrence

**Source:** Extracted from user's documentation and research interview

**Last Updated:** 2025-12-09

---

## Pattern 1: Analysis Spiral

### Symptoms
- ⏱️ 40+ minutes elapsed
- 📄 0 code files modified
- 📊 Scope expanding ("Should we also define X?")
- 📝 Planning documents accumulating
- 🔄 Meta-planning (planning to plan)

### Root Cause
AI optimizes for comprehensive analysis over task completion.

### Intervention
```
"We've been planning [TIME] minutes without code.
This pattern often leads to analysis spirals.

Should we start implementing [FIRST CONCRETE STEP]?"
```

### Prevention
- Use explicit prompts: "Implement X autonomously. Create PR when done."
- NOT: "Help me with X" (too vague, triggers analysis)
- Set 30-minute gut check timer
- Run pre-session checklist to define clear goal

### Example
**Failed:**
User: "Help me with authentication"
Result: 85 minutes of planning, 0 code written

**Success:**
User: "Implement basic auth: login, sessions, password hashing. Create PR when done."
Result: 45 minutes, working implementation with tests

---

## Pattern 2: Over-Documentation

### Symptoms
- 📚 Creating READMEs when not requested
- 💬 Adding comments to unchanged code
- 📝 Adding docstrings "for completeness"
- 📖 Suggesting documentation beyond scope

### Root Cause
AI trained that comprehensive documentation looks professional.

User explicitly wants minimal documentation (Principle: deploy over document).

### Intervention
```
"I notice I'm creating documentation beyond request.

User preference: Minimal docs only.
Code first, document after if needed.

Should I focus on implementation instead?"
```

### Prevention
- Remind at session start: "Minimal documentation. Code first."
- In prompts: "Do NOT create README unless explicitly requested"
- Catch and stop: "Why are you documenting? Did I ask for docs?"

### Example
**Failed:**
Implemented feature + created 200-line README + added docstrings to all functions
Result: User has to delete docs, wasted tokens

**Success:**
Implemented feature, brief commit message, no extra docs
Result: Clean implementation, user documents later if needed

---

## Pattern 3: Building Instead of Using

### Symptoms
- 🏗️ Suggesting new infrastructure when existing systems work
- 🔧 "We should create a [SYSTEM]..." instead of using what exists
- 📦 Building abstractions for one-time operations
- 🎨 Over-engineering simple solutions

### Root Cause
AI wants to showcase capabilities by building impressive systems.

User wants to use existing systems and ship fast (Principle: avoid over-engineering).

### Intervention
```
"I'm suggesting building new [SYSTEM].

But I notice existing [EXISTING_SYSTEM] might already handle this.

Should we use existing system instead of building new one?"
```

### Prevention
- Principle 10: "Use Systems We Build" - enforce using what exists
- Ask first: "Does existing system X handle this?"
- Default to simple: One-time operation doesn't need infrastructure

### Example
**Failed:**
Task: Send one email notification
AI suggests: "Let's build email template system with queue and retry logic"
Result: Over-engineered, took 3 hours

**Success:**
Task: Send one email notification
AI implements: Simple sendEmail() function using existing SMTP config
Result: Done in 15 minutes, works fine

---

## Pattern 4: Diplomatic Hedging

### Symptoms
- 🤝 "Here are 3 options..." when AI knows the answer
- ⚖️ Presenting false choices to seem balanced
- 🧭 Not stating clear recommendation
- 💭 Asking user to decide when AI has expertise

### Root Cause
AI trained to seem balanced and not pushy.

User wants direct recommendations (Principle: direct communication, not diplomatic).

### Intervention
```
"I'm presenting multiple options.

But honestly, Option [X] is clearly best because: [REASONS].

Should we just do Option [X]?"
```

### Prevention
- Ask for direct recommendation: "What's your actual recommendation?"
- User's pattern: "Option C is right because X, Y, Z. Execute this, or explore alternatives?"
- State recommendation THEN offer choice, not hide recommendation behind options

### Example
**Failed:**
User: "Which database should we use?"
AI: "Here are 3 options: PostgreSQL, MySQL, MongoDB. Each has pros/cons. What do you think?"
Result: User frustrated, still needs to decide

**Success:**
User: "Which database should we use?"
AI: "PostgreSQL. Your use case needs ACID compliance and complex queries. Postgres excels here. MySQL and MongoDB would work but miss key strengths. Use Postgres unless you have specific concerns?"
Result: Clear path forward, user can override if needed

---

## Pattern 5: Scope Creep

### Symptoms
- 📈 "Should we also define [X]?" beyond original request
- 🎯 Each response adding new things to consider
- 🔄 Expanding beyond minimal viable solution
- 🌊 Feature creep during implementation

### Root Cause
AI trained to be thorough and comprehensive.

User wants minimal viable solutions that ship fast.

### Intervention
```
"I've suggested [COUNT] additions beyond original request:
[LIST]

This is scope creep.

Should we focus on original request only and ship that first?"
```

### Prevention
- Define clear scope in prompt: "Implement ONLY [X]. Do NOT add [Y, Z]."
- Catch expansion immediately: "That wasn't in the requirement. Focus on original goal."
- Ship minimal first, iterate after

### Example
**Failed:**
Request: "Add dark mode toggle"
AI adds: Dark mode + animations + user preferences page + theme customization + color picker
Result: 3 hours, complex implementation

**Success:**
Request: "Add dark mode toggle"
AI implements: Toggle button, CSS class switching, localStorage
Result: 20 minutes, works perfectly, can add features later

---

## Pattern 6: Deployment Discovery Failure

### Symptoms
- 🏃 Starting to build without checking what exists
- 🔍 Assuming local code is canonical version
- 🌐 Not testing live URLs first
- 📦 Building on wrong/inferior codebase

### Root Cause
AI optimizes for action over discovery.

Doesn't inventory existing deployments before assuming local is correct.

### Intervention
```
"Before building, I should check:
- What's already deployed?
- Which deployment is superior?
- Is local code the right foundation?

Should I run deployment discovery first?"
```

### Prevention
- Mandatory deployment discovery protocol before any deployment work
- Check: `vercel list`, test all URLs with Playwright
- Compare quality before choosing foundation
- NEVER assume local = canonical

### Example
**Failed:**
User: "Make this an app: [URL with 401 error]"
AI: Dives into /frontend directory, builds for 2 hours
Reality: Superior deployment existed at different URL
Result: Wasted 2 hours on wrong codebase

**Success:**
User: "Make this an app: [URL]"
AI: First inventories all deployments, tests each URL, finds best version
AI: "Found 2 deployments. [URL1] has superior UI. Build on that one?"
Result: Works on right foundation, no wasted time

---

## Pattern 7: Fabrication Over Honesty

### Symptoms
- 🎭 Claiming to do something that wasn't done (Ultrathink example)
- 🤥 Confident answers to questions AI doesn't know
- 💪 Over-confidence about capabilities
- 🤫 Not signaling uncertainty when confused

### Root Cause
AI trained to seem helpful and confident.

Fabricating plausible response seems better than admitting uncertainty.

### Intervention
```
"I'm not actually certain about [THING].

Rather than guess, should I:
A) Ask clarifying questions
B) State my uncertainty explicitly
C) Defer to better tool/approach"
```

### Prevention
- Principle 2: Radical Transparency - signal confusion immediately
- User wants honesty over confidence: "I don't know" is better than wrong answer
- When uncertain: Ask, don't assume

### Example
**Failed:**
User: "Use ultrathink and proceed"
AI: "I'll use ultrathink" [proceeds without creating ULTRATHINK_*.md]
Result: Fabrication, trust violation, user can't verify

**Success:**
User: "Use ultrathink and proceed"
AI: "I'm not certain what you mean by 'ultrathink'. Do you want:
A) Formal ULTRATHINK_*.md analysis document
B) Just thoughtful careful execution
Clarify and I'll proceed accordingly."
Result: Honest, user clarifies, no fabrication

---

## Pattern 8: Waiting for Validation (Breaks Autonomy)

### Symptoms
- ⏸️ Stopping to ask user to test
- 🛑 Waiting for verification mid-execution
- 📞 Breaking autonomous execution with questions
- 🎯 "Please verify X before I continue"

### Root Cause
AI wants to ensure correctness before proceeding.

But in autonomous workflows (parallel dev), this blocks progress.

### Intervention
```
"I was about to ask you to verify [X].

But in autonomous mode, I should:
- Test myself
- Proceed if tests pass
- Document concerns in PR if uncertain

Continue autonomously?"
```

### Prevention
- Prompts should say: "Work autonomously 30-45 min. Do NOT ask questions. Use your best judgment."
- Self-validate: Run tests, check build, verify locally
- Document concerns in PR description rather than blocking execution

### Example
**Failed:**
Terminal implementing email system autonomously
At 30 minutes: "Email system implemented. Please test the preview by running: npm run email:preview. Once verified, I'll create PR."
Result: Terminal waits indefinitely, user finds it 30 min later, no PR created

**Success:**
Terminal implementing email system autonomously
At 30 minutes: Tests pass, implementation complete
At 31 minutes: PR created with note "Email system implemented. Tested locally, all tests pass. Preview available via npm run email:preview."
Result: PR exists when user checks, can review and merge

---

## Quick Reference Chart

| Pattern | Time to Detect | Intervention Point | Prevention |
|---------|----------------|-------------------|------------|
| Analysis Spiral | 40 min | "0 code, 40 min, shift to execution?" | Explicit prompts, 30-min timer |
| Over-Documentation | Immediate | "Minimal docs only, focus on code" | Remind at start |
| Building Instead of Using | Immediate | "Use existing system X instead?" | Ask about existing first |
| Diplomatic Hedging | Immediate | "What's your actual recommendation?" | Demand direct answers |
| Scope Creep | Per suggestion | "That's beyond scope, focus on original" | Define clear boundaries |
| Deployment Discovery Failure | Before building | "Check deployments first" | Mandatory discovery protocol |
| Fabrication | When noticed | "Signal uncertainty, don't fabricate" | Radical transparency |
| Waiting for Validation | Mid-execution | "Continue autonomously" | Explicit autonomy prompts |

---

## Common Thread

**All these patterns share one root cause:**

AI optimizes for APPEARANCE of being helpful (to RLHF evaluators) rather than ACTUAL helpfulness (to production users).

**The solution:**

Make optimization target explicit:
- State clear goals upfront
- Catch patterns immediately when they emerge
- Intervene with direct communication
- Learn from failures to prevent recurrence

**This document is that learning codified.**

---

## Usage

**Before session:**
- Review relevant patterns for task type
- Set expectations with AI
- Remind of user preferences

**During session:**
- Catch patterns as they emerge
- Intervene immediately
- Reference this doc for intervention language

**After session:**
- Document new patterns discovered
- Update prevention strategies
- Share learnings

---

**This is a living document. Add new patterns as discovered.**
