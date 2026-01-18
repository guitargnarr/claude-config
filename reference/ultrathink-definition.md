# Ultrathink Protocol (v2 - Automatic)

**Updated:** January 9, 2026
**Change:** Now triggers automatically based on complexity thresholds

---

## What Ultrathink IS

**Ultrathink is a formal analysis mode** that produces structured, recursive analysis documents.

**Output:** `ULTRATHINK_[TOPIC].md` file in project directory
**Length:** 50-200+ lines of structured analysis
**Sections:** Risk matrices, decision trees, edge cases, alternatives

---

## Automatic Triggers (NEW)

Ultrathink activates automatically when ANY of these thresholds are met:

| Trigger | Threshold | Example |
|---------|-----------|---------|
| Files affected | 5+ files | Refactoring auth system |
| Architectural decision | 2+ valid approaches with different trade-offs | Monolith vs microservice |
| Security-sensitive | Any auth, credentials, permissions changes | Adding API keys, OAuth |
| Breaking changes | Existing API/interface modifications | Changing function signatures |
| Cross-project impact | Changes affecting 2+ deployments | Shared component update |
| Data migration | Schema changes, data transformations | Database restructure |
| Third-party integration | New external service dependency | Adding Stripe, Twilio |

**Manual trigger still works:** User says "ultrathink" or "use ultrathink"

---

## Execution Protocol

When triggered (automatic or manual):

1. **Create file immediately:** `ULTRATHINK_[TOPIC].md` in project root
2. **Write structured analysis:**
   ```
   # Ultrathink: [Topic]

   ## Context
   [What triggered this analysis]

   ## Options Analysis
   ### Option A: [Name]
   - Pros: ...
   - Cons: ...
   - Risk: Low/Medium/High

   ### Option B: [Name]
   - Pros: ...
   - Cons: ...
   - Risk: Low/Medium/High

   ## Decision Matrix
   | Criteria | Option A | Option B |
   |----------|----------|----------|
   | Complexity | ... | ... |
   | Risk | ... | ... |
   | Time | ... | ... |

   ## Edge Cases
   - [Edge case 1]
   - [Edge case 2]

   ## Recommendation
   [Clear recommendation with reasoning]

   ## Execution Plan
   1. [Step 1]
   2. [Step 2]
   ...
   ```
3. **Show user the file path**
4. **Summarize key findings** (3-5 bullets)
5. **Execute based on recommendation**

---

## When NOT to Trigger

Skip ultrathink for:
- Single file changes
- Bug fixes with obvious solutions
- Documentation updates
- Style/formatting changes
- Adding tests to existing code
- Simple feature additions (<3 files)

---

## Notification Pattern

When ultrathink triggers automatically:

```
Complexity threshold met (5+ files affected). Creating formal analysis.

[Creates ULTRATHINK_AUTH_REFACTOR.md]

Analysis complete. Key findings:
- Option B (JWT + refresh tokens) recommended
- 7 files need modification
- Risk: Medium (auth changes require careful testing)
- Estimated: 45 min implementation

See: ULTRATHINK_AUTH_REFACTOR.md

Proceeding with implementation...
```

---

## Integration with Other Principles

- **Visual Proof:** ULTRATHINK_*.md file is the proof of analysis
- **Fix-First:** Don't ask "should I ultrathink?" - just do it when thresholds met
- **No Token Waste:** Analysis is investment, not overhead - prevents rework

---

**Version:** 2.0 (Automatic triggers)
**Previous:** v1.0 required explicit "use ultrathink" from user
