# Pre-Session Checklist
## Use Before Starting Any Significant Work with Claude

**Purpose:** Force explicit goal-setting and mode selection to prevent analysis spirals

**Time required:** 2-3 minutes

**ROI:** Prevents 60-90 minute spirals, saves massive time

---

## The Checklist

### 1. GOAL CLARITY ✓

**Write one sentence defining success:**

```
Success = [CONCRETE DELIVERABLE]

Examples:
✅ "Homepage rebranded with teal/orange theme and deployed"
✅ "Authentication system implemented with tests passing"
✅ "Architecture document comparing 3 database options"
❌ "Work on the authentication stuff" (too vague)
❌ "Improve the app" (no concrete outcome)
```

**My goal for this session:**

_________________________________

---

### 2. MODE SELECTION ✓

**Choose primary mode for this session:**

- [ ] **EXPLORATION** (Analysis appropriate, time unconstrained)
  - Example: "Design system architecture"
  - Expectation: Planning docs, options analysis, trade-offs
  - No intervention needed for extensive planning

- [ ] **IMPLEMENTATION** (Ship code, time matters)
  - Example: "Add dark mode toggle"
  - Expectation: Code written, tests passing, PR created
  - Intervention at 40 min if no code

- [ ] **DISCOVERY** (Ask questions, clarify requirements)
  - Example: "Understand auth requirements"
  - Expectation: Questions answered, requirements documented
  - No intervention for question-asking

- [ ] **DEBUGGING** (Fix specific issue)
  - Example: "Fix login redirect bug"
  - Expectation: Bug identified, fix implemented, verified
  - Intervention if excessive investigation without fix

**My mode for this session:** _________________

---

### 3. TIME BOX ✓

**Set time expectations:**

**Expected duration:** _______ minutes

**Hard stop criterion:**
"If no concrete progress by _______ minutes, STOP and reassess."

**Progress checkpoints:**
- 30 min: Check if on track
- 60 min: Check if goal achieved or close

---

### 4. SUCCESS METRIC ✓

**How will I know this is DONE?**

Concrete evidence of completion:

- [ ] Specific file modified: __________________
- [ ] Tests passing: ________________________
- [ ] PR created: ___________________________
- [ ] Deployed to: __________________________
- [ ] Document created: _____________________
- [ ] Question answered: ____________________

**I'll know I'm done when:**

_________________________________

---

### 5. DELEGATION CLARITY ✓

**If IMPLEMENTATION mode, write explicit prompt:**

**Good (clear execution):**
```
"Implement dark mode toggle.

Requirements:
- Add toggle button to header
- Switch CSS classes on click
- Persist preference in localStorage

Create PR when done. Tests must pass."
```

**Bad (triggers analysis):**
```
"Help me with dark mode"
```

**My prompt:**

_________________________________

---

### 6. STOP CONDITIONS ✓

**Define when to STOP and reassess:**

**Automatic stop triggers:**

- [ ] 40 minutes elapsed with 0 code (if implementation mode)
- [ ] 60 minutes elapsed with <50% progress toward goal
- [ ] Scope has expanded 3+ times beyond original goal
- [ ] Started planning for planning (meta-level)
- [ ] Creating 3+ planning documents without code

**If any trigger hit: STOP, run gut check, decide continue or shift.**

---

### 7. INTERVENTION SETTINGS ✓

**How should Claude handle potential spirals?**

- [ ] **Aggressive** (Intervene at 30 minutes if concerns)
- [ ] **Balanced** (Intervene at 40 minutes if concerns) ← RECOMMENDED
- [ ] **Conservative** (Intervene at 50-60 minutes only)
- [ ] **Off** (I'll self-monitor, don't intervene)

**For this session:** _________________

---

## Pre-Session Review

**Before starting, verify:**

✓ Goal is concrete and specific
✓ Mode is selected (exploration vs implementation)
✓ Time box is set
✓ Success criteria are clear
✓ Prompt is explicit (if implementation)
✓ Stop conditions are defined
✓ Intervention threshold is set

**If all checked, BEGIN SESSION.**

---

## Post-Session Review

**After session, record:**

**Goal achieved?** Yes / Partial / No

**Time taken:** _______ minutes

**Outcome:**
- Files modified: _______
- PRs created: _______
- Value delivered: _______

**Did I need to intervene?** Yes / No

**If yes, when?** _______ minutes

**Was pre-session checklist helpful?** Yes / No

**What would I do differently next time?**

_________________________________

---

## Example: Good Pre-Session Checklist

**Goal:** "Rebrand homepage with teal/orange theme and deploy to production"

**Mode:** IMPLEMENTATION

**Time box:** 60 minutes expected, hard stop at 90 minutes

**Success metric:**
- homepage/App.jsx modified
- tailwind.config.js updated
- Deployed to projectlavos.com
- Can see teal/orange colors live

**Prompt:**
```
Rebrand homepage with teal/orange theme.

Colors:
- Primary: #14b8a6 (teal)
- Secondary: #f97316 (orange)

Files to modify:
- homepage/App.jsx (apply colors)
- tailwind.config.js (add colors)

Test locally, then deploy with: vercel --prod --yes

Create PR when done.
```

**Stop conditions:**
- 40 min with no colors applied → STOP
- Scope expands beyond homepage → STOP
- Started planning component library → STOP

**Intervention:** Balanced (40 min)

**Result:** Goal achieved in 35 minutes, no intervention needed. Checklist kept me focused.

---

## Template for Quick Copy-Paste

```
GOAL: [One sentence concrete deliverable]
MODE: [Exploration / Implementation / Discovery / Debugging]
TIME BOX: [Expected min] / Hard stop: [Max min]
SUCCESS: [How I'll know it's done]
PROMPT: [Explicit delegation if implementation]
STOP CONDITIONS: [When to reassess]
INTERVENTION: [Aggressive / Balanced / Conservative / Off]
```

---

**Use this checklist EVERY TIME before significant work.**

**2-3 minutes upfront saves 60-90 minutes of spiraling.**
