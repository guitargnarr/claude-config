# Trust Calibration Log
## Tracking Intervention Accuracy to Build Empirical Trust

**Purpose:** Record when Claude's self-assessment/interventions are accurate vs when to override

**Started:** 2025-12-09

**Current Trust Score:** Not yet established (need 10+ data points)

---

## Log Format

```markdown
Date: YYYY-MM-DD
Session: [Brief description]
Intervention: [What Claude flagged]
My Assessment: [Correct / Incorrect / Partially correct]
Action: [Accepted / Rejected / Modified]
Outcome: [What happened]
Trust Impact: [+1 / 0 / -1]
Notes: [Additional context]
```

---

## Entries

### Entry 1

**Date:** 2025-12-09
**Session:** Anthropic research interview
**Intervention:** N/A (This conversation established the framework)
**My Assessment:** Framework design is sound
**Action:** Adopted intervention system spec
**Outcome:** Ready to implement in practice
**Trust Impact:** Baseline established
**Notes:** This conversation itself was meta-analysis of intervention needs

---

### Entry 2

**Date:** _________
**Session:** _________
**Intervention:** _________
**My Assessment:** _________
**Action:** _________
**Outcome:** _________
**Trust Impact:** _________
**Notes:** _________

---

## Running Metrics

**Total Interventions:** 0
**Accepted:** 0
**Rejected:** 0
**Correct Interventions:** 0
**False Positives:** 0
**False Negatives:** 0 (spirals missed)

**Accuracy Rate:** N/A (need data)
**Acceptance Rate:** N/A (need data)

**Trust Score:** N/A
- Formula: (Correct Interventions - False Positives) / Total Interventions
- Target: >0.75 (75%+ accuracy)

---

## Calibration Status

**Current Threshold:** Not yet set (use Balanced = 40 min to start)

**Based on data:**
- If accuracy >85%: Trust is HIGH, accept most interventions
- If accuracy 70-85%: Trust is MEDIUM, evaluate each intervention
- If accuracy 50-70%: Trust is LOW, often override
- If accuracy <50%: Trust is BROKEN, disable interventions

**Threshold Adjustment:**
- If acceptance rate >80%: Consider more aggressive (30 min)
- If acceptance rate <50%: Move to conservative (50 min)
- If acceptance rate <30%: Disable interventions for this user/mode

---

## Pattern Analysis

### When Claude Is Right (Correct Interventions)

**Common characteristics of accurate interventions:**

- [ ] Time >40 minutes
- [ ] 0 code files modified
- [ ] 3+ scope expansions
- [ ] Planning docs accumulating
- [ ] I was already feeling uncomfortable
- [ ] Implementation mode (not exploration)

**Pattern:** _______________________________

### When Claude Is Wrong (False Positives)

**Common characteristics of false positives:**

- [ ] Legitimate exploration task
- [ ] Complex architectural decision
- [ ] Research/discovery mode
- [ ] Intervened too early (<30 min)
- [ ] I explicitly wanted thorough analysis

**Pattern:** _______________________________

### When Claude Misses (False Negatives)

**Common characteristics of missed spirals:**

- [ ] Spiral went past 60 minutes
- [ ] Scope expansion was subtle
- [ ] Planning seemed productive
- [ ] No clear threshold trigger

**Pattern:** _______________________________

---

## Trust Scenarios

### Scenario: High Trust (>85% accuracy)

**My response to intervention:**
- Default: Accept immediately
- Check: Quick 30-second gut check
- Override: Only if I have strong reason

**Example:**
"Claude has been right 17/20 times. When it flags spiral, I should listen."

### Scenario: Medium Trust (70-85% accuracy)

**My response to intervention:**
- Default: Evaluate carefully
- Check: 2-minute assessment of current state
- Override: If I disagree after assessment

**Example:**
"Claude is usually right but has false positives. Need to check each time."

### Scenario: Low Trust (50-70% accuracy)

**My response to intervention:**
- Default: Skeptical
- Check: 5-minute deep assessment
- Override: Often, use my judgment

**Example:**
"Claude catches some spirals but has too many false positives. Trust but verify heavily."

### Scenario: Broken Trust (<50% accuracy)

**My response:**
- Disable interventions
- Use manual 30-minute timer instead
- Re-enable after understanding why accuracy was low

**Example:**
"Interventions are more noise than signal. I'll self-monitor."

---

## Calibration Actions

### After 10 Interventions

**Review:**
- Accuracy rate: _______
- Acceptance rate: _______
- Trust level: _______

**Adjust threshold if needed:**
- Move earlier/later based on data
- Modify intervention framing
- Enable/disable for certain modes

### After 25 Interventions

**Comprehensive review:**
- What patterns predict correct interventions?
- What patterns predict false positives?
- What context matters (mode, task type, time of day)?

**Personalization:**
- Set user-specific thresholds
- Identify task types where interventions help vs hurt
- Calibrate per-context

### After 50 Interventions

**Stable calibration achieved:**
- Trust level established
- Thresholds optimized
- Patterns identified

**Maintenance mode:**
- Log anomalies only
- Adjust if drift detected
- Share learnings

---

## Quick Reference Decision Tree

```
Claude intervenes →

Is my current state uncomfortable?
  ├─ YES → High chance Claude is right
  │         → Accept intervention
  │
  └─ NO → Check: What mode am I in?
            ├─ Implementation → Claude might be right
            │                  → 2-min assessment
            │
            └─ Exploration → Probably false positive
                            → Reject intervention
```

---

## Notes on Trust Building

**Trust is built through:**
1. Accurate interventions (catching real spirals)
2. Transparent reasoning (showing metrics, not just assertions)
3. Appropriate timing (not too early, not too late)
4. Graceful handling of rejection (learning from it)

**Trust is eroded through:**
1. False positives (interrupting productive work)
2. Opaque reasoning ("this feels wrong" without evidence)
3. Premature intervention (before user is uncomfortable)
4. Defensive responses to rejection

**Key insight from research:**
> "One false positive does more damage than five correct interventions do good."
> — Negativity bias means trust erodes faster than it builds

**Therefore:** Start conservative, build trust gradually, never get cocky.

---

## Template for Quick Logging

```
Date: YYYY-MM-DD | Session: [BRIEF] | Intervention: [SUMMARY]
Assessment: [CORRECT/INCORRECT] | Action: [ACCEPT/REJECT] | Impact: [+1/0/-1]
Outcome: [WHAT HAPPENED]
```

**Example:**
```
Date: 2025-12-10 | Session: Homepage rebrand | Intervention: Flagged at 35min, 0 code
Assessment: CORRECT | Action: ACCEPT | Impact: +1
Outcome: Shifted to implementation, shipped in 30min. Would have spiraled.
```

---

**Start logging interventions immediately to build empirical trust calibration.**
