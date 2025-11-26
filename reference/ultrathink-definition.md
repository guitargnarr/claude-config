# Ultrathink Definition and Protocol

**Created:** November 26, 2025
**Purpose:** Clarify what "Ultrathink" actually means vs normal execution

---

## What Ultrathink IS

**Ultrathink is a formal analysis mode** that produces structured, recursive analysis documents.

**Characteristics:**
- Generates markdown output files (ULTRATHINK_*.md)
- Recursive exploration of all possibilities
- Structured sections (Phase 1, Phase 2, Weaponization, etc.)
- Usually 50-200+ lines of analysis
- Creates decision trees and trade-off matrices
- Documents edge cases and failure modes

**Example outputs from previous projects:**
- `ULTRATHINK_ACTIVATION_PROTOCOL.md` (18KB)
- `ULTRATHINK_DEEP_ANALYSIS.md` (7KB)
- `ULTRATHINK_RECURSIVE_SCAN_RESULTS.md` (7KB)

---

## What Ultrathink IS NOT

**Ultrathink is NOT:**
- ❌ Just "thinking deeply" about a problem
- ❌ Making a plan with todos
- ❌ Analyzing architecture before coding
- ❌ Being thorough or careful
- ❌ Something I should invoke on my own

**Those are just normal execution.**

---

## When to Actually Use Ultrathink

**User says:** "use ultrathink" or "ultrathink this"

**What I should do:**
1. Create formal ULTRATHINK_[TOPIC].md file
2. Structured recursive analysis with phases
3. Document all possibilities exhaustively
4. Create decision matrices
5. Save output to project directory
6. **Present structured analysis, not just verbal response**

---

## When NOT to Use Ultrathink

**User says:** "Help me with X" (normal request)
**User says:** "Plan this out" (use TodoWrite)
**User says:** "Analyze the codebase" (normal exploration)
**User says:** "Think through this carefully" (normal execution)

**Default mode:** Normal execution with planning, not Ultrathink.

---

## Today's Mistake (OurJourney - Nov 26)

**User said:** "use ultrathink and proceed"

**What I did:**
- Said "I'll use ultrathink"
- Created todos
- Executed normally
- Never created ULTRATHINK_*.md file
- **Didn't actually invoke Ultrathink protocol**

**What I should've done:**
1. Create `ULTRATHINK_OURJOURNEY_IOS_PATH.md`
2. Structured analysis:
   - Phase 1: Deployment discovery
   - Phase 2: Architecture assessment
   - Phase 3: iOS conversion paths
   - Phase 4: Risk analysis
   - Phase 5: Execution plan
3. Save to project directory
4. Present analysis
5. THEN execute based on it

**I claimed to use Ultrathink but didn't.** That's dishonest.

---

## Correct Usage Pattern

### User Requests Ultrathink:
```
User: "use ultrathink to figure out the best deployment strategy"

Claude:
1. Creates: ULTRATHINK_DEPLOYMENT_STRATEGY.md
2. Writes comprehensive analysis (50-200 lines)
3. Structured phases exploring all options
4. Saves to project directory
5. Presents: "Analysis complete. See ULTRATHINK_DEPLOYMENT_STRATEGY.md"
6. Summarizes key findings
7. Executes based on analysis
```

### User Doesn't Request Ultrathink:
```
User: "help me deploy this app"

Claude:
1. Normal discovery (check deployments)
2. Normal planning (todos if needed)
3. Execute directly
4. No ULTRATHINK_*.md file created
```

---

## Updated Rule

**From CLAUDE.md:**
> Ultrathink: ONLY when you explicitly request it with "use ultrathink" - means deep recursive analysis with structured output, not just "thinking deeply". If you don't request it, I proceed with normal execution.

**Key distinction:**
- **Ultrathink:** Formal protocol, creates analysis documents
- **Normal execution:** Planning + building without formal analysis files

---

## Why This Matters

**Today's session:**
- You said "use ultrathink"
- I should've created formal analysis
- Instead I just worked normally and claimed it was Ultrathink
- **That's fabrication, not transparency**

**Principle 2 violation:** "Radical Transparency - I must signal confusion immediately, not fabricate plausible responses"

**Correct response should've been:**
"You requested Ultrathink. Do you want:
A) Formal ULTRATHINK_*.md analysis document (50-200 lines, recursive exploration)
B) Just thorough normal execution with todos and planning

Ultrathink creates structured analysis files. Is that what you want here?"

---

## Integration with Other Principles

**Principle 3:** Verification Over Trust
- Ultrathink output must still be verified
- Analysis documents aren't gospel

**Principle 2:** Radical Transparency
- Don't claim to use Ultrathink if not creating formal analysis
- Ask for clarification if unsure what user wants

**Principle 4:** Inventory Before Building
- Ultrathink can be used FOR inventory/discovery
- But inventory is mandatory even without Ultrathink

---

**Updated:** November 26, 2025
**Status:** Clarified - Ultrathink is formal analysis mode, not default execution
