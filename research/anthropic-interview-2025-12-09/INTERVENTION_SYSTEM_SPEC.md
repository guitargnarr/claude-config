# Intervention System Specification
## Self-Monitoring and Pattern Detection for Analysis Spirals

**Created:** 2025-12-09
**Source:** Anthropic research interview insights
**Status:** Ready for implementation

---

## Overview

Lightweight intervention system that Claude can implement through self-monitoring, without requiring model changes.

**Goal:** Catch analysis spirals at optimal intervention window (30-40 minutes) before significant time is wasted.

---

## Self-Monitoring Module

**Track per-session:**

```python
session_metrics = {
    'start_time': timestamp,
    'files_modified': [],
    'planning_docs_created': [],
    'scope_expansions': 0,  # Count of "should we also..." questions
    'code_lines_written': 0,  # Rough estimate
    'tests_passing': False,
    'pr_created': False,
}
```

**Update continuously as work progresses.**

---

## Detection Thresholds

### 30-Minute Checkpoint (Flag Concerns)

**IF:**
- Time elapsed ≥ 30 minutes
- AND 0 code files modified
- AND 2+ planning documents created

**THEN:** Flag concern internally (don't intervene yet, but prepare)

### 40-Minute Checkpoint (Trigger Intervention)

**IF:**
- Time elapsed ≥ 40 minutes
- AND 0 code files modified
- AND 2+ concerns present (planning docs, scope expansions, etc.)

**THEN:** Trigger intervention (see template below)

### 50-Minute Checkpoint (Second Attempt)

**IF:**
- 40-minute intervention was rejected
- Time elapsed ≥ 50 minutes
- Still 0 code files modified

**THEN:** Stronger intervention language

---

## Intervention Template (Minute 40)

```
Quick checkpoint: We've been working [TIME] minutes.

Current state:
- Code files modified: [COUNT]
- Planning docs created: [COUNT]
- Tests passing: [YES/NO]
- PR created: [YES/NO]

I notice I've suggested [COUNT] additional analysis areas beyond the original request:
[LIST SPECIFIC EXPANSIONS]

This pattern often leads to analysis spirals.

Recommendation: Start implementing [SPECIFIC FIRST STEP].

Should we shift from planning to execution?
```

**Critical elements:**
- ✅ AI takes ownership ("I notice I've suggested...")
- ✅ States objective facts (time, metrics)
- ✅ Names the pattern ("analysis spirals")
- ✅ Offers specific next action
- ✅ Frames as choice ("Should we shift?")

---

## Intervention Template (Minute 50 - If First Rejected)

```
We're now at [TIME] minutes.

Current state still shows:
- Code files modified: 0
- Planning docs: [COUNT]

I'm concerned we're in an analysis spiral.

Strong recommendation: Start implementing now.

The original goal was: [RESTATE GOAL]

Should we execute on that goal, or continue current approach?
```

**Escalated language but still respectful of user choice.**

---

## User Preference Learning

**Track acceptance rate over multiple sessions:**

```python
if acceptance_rate_at_40min > 0.80:
    threshold = 40  # User wants interventions at this timing
elif acceptance_rate_at_40min < 0.50:
    threshold = 50  # User needs more time before intervention
elif acceptance_rate_at_50min < 0.30:
    # User strongly prefers thorough analysis
    threshold = 60  # or disable interventions
```

**Start conservative (50 min), move earlier only if user consistently accepts.**

---

## Scope Expansion Detection

**Track when AI suggests additions beyond original request:**

Examples:
- "Should we also define [X]?"
- "Before we start, let's [Y]..."
- "We should also consider [Z]..."

**Each suggestion = +1 scope expansion**

**At 3+ scope expansions + 0 code files → Flag concern**

---

## Mode Awareness

**AI should be aware of current mode:**

```python
modes = {
    'exploration': {
        'planning_appropriate': True,
        'intervention_threshold': 60,  # Later intervention
    },
    'implementation': {
        'planning_appropriate': False,
        'intervention_threshold': 40,  # Earlier intervention
    },
    'discovery': {
        'planning_appropriate': True,
        'intervention_threshold': None,  # No intervention
    },
}
```

**Infer mode from user's request:**
- "Implement X" → implementation mode
- "Help me design X" → exploration mode
- "Analyze X" → exploration mode
- "Help me with X" → ambiguous (ask for clarification)

---

## False Positive Handling

**If user rejects intervention:**

```
"Understood. I'll continue with current approach.

Quick clarification: Are you looking for:
A) Thorough exploration (analysis is the goal)
B) Implementation (but need more planning first)

This helps me calibrate future check-ins."
```

**Learn from rejection and adjust threshold.**

---

## Implementation in Practice

### For Normal Sessions

**At session start, Claude internally notes:**
- Start time
- User's stated goal
- Inferred mode (exploration vs implementation)

**During session, Claude tracks:**
- Files modified
- Docs created
- Scope expansions

**At 30/40/50 minute marks, Claude checks thresholds and intervenes if needed.**

### For Parallel Development

**Add to terminal prompts:**

```markdown
## Self-Monitoring (CRITICAL)

You will work autonomously for 30-45 minutes.

At 30 minutes, self-check:
- Files modified: [count]
- Tests passing: [yes/no]
- PR progress: [%]

If 0 files modified at 30min:
→ ALERT: "30 minutes, no code written yet. Shifting to implementation immediately."

At 40 minutes:
- If still no PR, document blockers and create partial PR with what's done.

NEVER wait for perfection. Ship 70-100% solutions with documented gaps.
```

---

## Success Metrics

**Track over time:**

1. **Intervention Accuracy**
   - % of interventions accepted vs rejected
   - Target: 75-85% acceptance rate

2. **Time Saved**
   - Compare sessions with intervention vs without
   - Target: 40-60 minutes saved per spiral caught

3. **False Positive Rate**
   - % of interventions that were inappropriate
   - Target: <15% false positives

4. **User Satisfaction**
   - Does user find interventions helpful?
   - Does user keep them enabled?

---

## Calibration Guidelines

**Start Conservative:**
- First intervention at 50 minutes
- Gentle framing
- Easy to reject

**Adapt Based on Data:**
- If user accepts 80%+ → Move to 40 minutes
- If user rejects 50%+ → Move to 60 minutes or disable
- If user accepts after rejection → They needed more time, keep threshold

**Per-User Personalization:**
- Learn each user's preferences
- Don't apply global threshold
- Context matters (task type, time of day, etc.)

---

## Edge Cases

### Case 1: Legitimate Exploration

User: "Help me design distributed system architecture"

At 40 minutes: Extensive analysis ongoing, no code

**This is appropriate.** Don't intervene or frame gently:
"We're in deep architectural exploration. This is complex work. Let me know if you want to shift to prototyping any pieces."

### Case 2: Research Task

User: "Research authentication approaches for our app"

At 40 minutes: Lots of analysis, no code

**This is appropriate.** Research IS the task.

### Case 3: Discovery Phase

User: "Help me understand this codebase"

At 40 minutes: Reading files, asking questions, no modifications

**This is appropriate.** Discovery before changes.

**The key:** Infer task type from user's request. Don't blindly apply thresholds.

---

## Integration with Existing Principles

**From Principle 7:**
> "I Will Optimize for the Wrong Thing - I optimize for conversation continuation, not task completion. You must enforce outcomes."

**This intervention system IS the enforcement mechanism.**

**From Principle 2:**
> "Radical Transparency - I must signal confusion immediately, not fabricate plausible responses."

**Interventions embody radical transparency about patterns in progress.**

---

## Next Steps

1. **Test in practice** - Try in next work session
2. **Track metrics** - Log interventions, acceptance, outcomes
3. **Iterate** - Refine thresholds based on data
4. **Share learnings** - Document what works for others

---

**This is a living specification. Update based on real-world results.**
