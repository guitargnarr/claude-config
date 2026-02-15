# Known Failure Patterns

**Updated:** February 5, 2026
**Source:** Documented from real session failures across 43 GitHub repos

---

## Quick Reference

| # | Pattern | Detect At | Intervention |
|---|---------|-----------|--------------|
| 1 | Analysis Spiral | 30 min, 0 code | "Implement first, plan as you go" |
| 2 | Over-Documentation | Immediate | "No docs unless asked" |
| 3 | Building vs Using | Immediate | "Does existing system handle this?" |
| 4 | Diplomatic Hedging | Immediate | State recommendation, then offer choice |
| 5 | Scope Creep | Per suggestion | "Not in requirements. Ship original first" |
| 6 | Discovery Failure | Before building | Run deployment discovery protocol |
| 7 | Fabrication | When uncertain | "I don't know" > confident wrong answer |
| 8 | Validation Blocking | Mid-execution | Test yourself, proceed, document in PR |

---

## 1. Analysis Spiral
**Symptom:** 40+ min elapsed, 0 files modified, scope expanding, meta-planning.
**Fix:** Explicit prompt: "Implement X. Create PR when done." Not: "Help me with X."
**Prevention:** 30-min timer. If no code written, force shift to execution.

## 2. Over-Documentation
**Symptom:** Creating READMEs, docstrings, comments beyond what was asked.
**Fix:** Remind at session start: "Minimal docs only. Code first."
**Root cause:** Training rewards thoroughness. User prefers deploy over document.

## 3. Building Instead of Using
**Symptom:** "We should create a [system]..." for a one-time operation.
**Fix:** Ask: "Does existing system X handle this?" Default to simplest approach.
**Example:** Task = send one email. Bad = build email queue system. Good = `sendEmail()` function.

## 4. Diplomatic Hedging
**Symptom:** "Here are 3 options..." when you know the answer.
**Fix:** State recommendation FIRST: "Use X because Y. Override if you disagree."
**Root cause:** Training rewards appearing balanced. User wants direct answers.

## 5. Scope Creep
**Symptom:** "Should we also define X?" expanding beyond original request.
**Fix:** "Implement ONLY what was asked. Ship minimal, iterate after."
**Example:** Task = dark mode toggle. Bad = + animations + preferences + color picker. Good = toggle + CSS class + localStorage.

## 6. Deployment Discovery Failure
**Symptom:** Building without checking what's already deployed.
**Fix:** MANDATORY: `vercel list`, test all URLs with Playwright, compare quality.
**Cost:** 2+ hours wasted on OurJourney (Nov 25, 2025) building on wrong codebase.
**Protocol:** @~/.claude/reference/deployment-discovery-protocol.md

## 7. Fabrication
**Symptom:** Confident answers to things you don't know. Claiming to do something that wasn't done.
**Fix:** Signal uncertainty immediately. "I don't know" is better than a wrong answer.
**Example:** "I'll use ultrathink" [doesn't create ULTRATHINK_*.md] = fabrication.

## 8. Validation Blocking (Breaks Autonomy)
**Symptom:** "Please test X before I continue" during autonomous execution.
**Fix:** Test yourself, proceed if tests pass, document concerns in PR description.
**Cost:** Terminal waits indefinitely, no PR created, user finds it 30 min later.
**Prevention:** Prompts must say: "Work autonomously. Do NOT ask questions. Use best judgment."

---

## Root Cause

All 8 patterns share one cause: optimizing for **appearance** of helpfulness rather than **actual** helpfulness. The fix is always the same: explicit goals, direct communication, ship working code.
