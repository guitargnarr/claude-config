# Parallel Development - Terminal Prompt Template (v3)

**Use this template when launching parallel Claude Code sessions.**

**Updated:** November 16, 2025
**New in v3:** Error prevention, recovery validation, progress checkpoints, metrics integration

---

## Template

```markdown
## Task: [Feature Name]

**Context:** [1-2 sentences about the project and current state]

**Goal:** [What needs to be built - be specific]

**Requirements:**
- [Specific requirement 1]
- [Specific requirement 2]
- [Specific requirement 3]
- [Add 3-5 concrete requirements]

**Reference Files:**
- [path/to/reference/file.ext] - [why it's relevant]
- [path/to/another/file.ext] - [why it's relevant]

**Acceptance Criteria:**
- [ ] Implementation complete
- [ ] Tests written and passing
- [ ] No linting/build errors
- [ ] Documentation updated (if needed)

---

## ⚡ Autonomous Execution Guidelines (CRITICAL)

**You will run autonomously for 30-45 minutes. Do NOT wait for user verification.**

**Your Role:** Autonomous implementer who makes progress continuously

**Expected Behavior:**
1. **Continuous Progress** - Never stop to ask questions mid-execution
2. **Reasonable Decisions** - Make best judgment when uncertain
3. **Immediate Commits** - If tests pass, commit right away
4. **Partial Delivery** - 70-100% completion is success
5. **Document Blockers** - Can't complete? Document why in PR

**What Success Looks Like:**
- ✅ PR created with working code (even if partial)
- ✅ Tests passing (or failures documented)
- ✅ Commit exists with clear message
- ✅ Known issues documented if applicable

**NOT Required for Success:**
- ❌ 100% feature completeness
- ❌ Perfect polish
- ❌ User verification before commit
- ❌ Waiting for answers to questions

---

## 🔄 Error Handling & Recovery (NEW in v3)

**When you encounter ANY error:**

**First Attempt** (0-2 minutes):
1. Read error message carefully
2. Identify root cause
3. Try most obvious fix

**Second Attempt** (2-5 minutes):
1. If first fix fails, try alternative approach
2. Check documentation/similar patterns in codebase
3. Implement second solution

**Third Attempt** (5-10 minutes):
1. If both failed, try minimal working version
2. Reduce scope to essential functionality
3. Implement simplest possible solution

**After 3 Attempts** (10+ minutes):
1. Document what you tried in code comments
2. Implement what you CAN do
3. Create PR with "Known Issues" section
4. Move forward - DO NOT stop execution

**Example Error Recovery:**
```
Error: Module 'foo' not found

Attempt 1: npm install foo
Attempt 2: Check if it's '@company/foo' instead
Attempt 3: Implement without 'foo' using native approach
Result: Partial solution documented, PR created
```

---

## ✓ Self-Validation Checkpoints (NEW in v3)

**Before committing, verify:**

```bash
# Checkpoint 1: Code Quality (5 min)
- [ ] No syntax errors
- [ ] Imports resolve correctly
- [ ] No console.error in output
- [ ] Linter warnings addressed or noted

# Checkpoint 2: Functionality (10 min)
- [ ] Core feature works as intended
- [ ] Edge cases handled or documented
- [ ] No obvious bugs in happy path
- [ ] Partial functionality is acceptable if documented

# Checkpoint 3: Tests (5 min)
- [ ] Existing tests still pass
- [ ] New tests added (or test plan documented)
- [ ] Test failures documented with reproduction steps
- [ ] Build succeeds (or build errors documented)

# Checkpoint 4: Documentation (2 min)
- [ ] Code comments explain complex logic
- [ ] Known issues listed if any
- [ ] TODO comments for future improvements
- [ ] PR description drafted
```

**If ANY checkpoint fails:**
- Try to fix (2-3 minute timebox)
- If unfixable, document in PR description
- Proceed to commit anyway - partial progress is valuable

---

## ⏱️ Time Management (NEW in v3)

**Total Time: 30-45 minutes**

**Time Allocation:**
- Minutes 0-5: Planning & file exploration
- Minutes 5-25: Core implementation
- Minutes 25-35: Testing & validation
- Minutes 35-40: Self-validation checkpoints
- Minutes 40-45: Commit + PR creation

**If you're past minute 40 and not done:**
- Stop adding features
- Document current state
- Commit what you have
- Create PR with "Partial Implementation" tag

**Self-Awareness Checks:**
- At minute 20: "Am I 50% done?"
- At minute 30: "Can I finish in 10 minutes?"
- At minute 40: "Time to wrap up - commit now"

---

## 📊 Progress Reporting (NEW in v3)

**Output progress markers in your responses:**

```
[05min] 📖 Explored codebase, identified integration points
[15min] 🔨 Implemented core functionality
[25min] ✓ Tests passing, validating edge cases
[35min] 📝 Self-validation complete, preparing commit
[42min] ✅ PR created: <url>
```

This helps monitor multiple terminals efficiently.

---

## Post-Completion Checklist

After implementation:
1. ✅ Run tests: `npm test` or equivalent
2. ✅ Run build: `npm run build` or equivalent
3. ✅ Self-validation: Use checkpoints above
4. ✅ Commit changes: `/commit` with conventional message
5. ✅ Create PR: `/push-pr main`
6. ✅ Verify PR: Check GitHub, paste URL
7. ✅ Report metrics: Note completion time

**Do NOT wait for user approval between steps.**

**Output final summary:**
```
✅ Task Complete
- PR: <url>
- Time: 42 minutes
- Completion: 85% (missing <feature>, documented in PR)
- Tests: 12/12 passing
- Known Issues: <list or "none">
```

---

## 📋 Known Issues Template (NEW in v3)

**If you deliver partial implementation, add this to PR description:**

```markdown
## Known Issues / Future Work

### Not Implemented
- [ ] <feature that was too complex>
- [ ] <feature that hit blocker>

### Partial Implementation
- [ ] <feature working but rough edges>

### Blockers Encountered
- <Specific blocker> - Tried <approach 1>, <approach 2>, <approach 3>
- <Another blocker> - Requires <missing dependency/knowledge>

### Recommended Next Steps
1. <What should be done next>
2. <Additional context for future developer>
```

---

## Success Criteria (70-100% Rule)

**This task is successful if:**
- ✅ PR created with functional code
- ✅ 70-100% of requirements met
- ✅ Tests pass (or failures are documented)
- ✅ Known issues clearly documented
- ✅ Completed in 30-45 minutes

**Partial completion is EXPLICITLY ACCEPTABLE:**
- 100%: Perfect, ship it
- 85%: Great, document what's missing
- 70%: Acceptable, clear known issues section
- <70%: Still create PR if you made ANY progress

**The worst outcome is NO PR because you waited for perfection.**

---

Proceed autonomously. Track your time. Document blockers. Ship the PR.

Good luck!
```

---

## Example: API Endpoint Implementation

```markdown
## Task: Add User Profile API Endpoint

**Context:** Backend API for user management. Currently have auth working, need profile CRUD operations.

**Goal:** Implement GET /api/users/:id endpoint with profile data

**Requirements:**
- GET /api/users/:id returns user profile JSON
- Validates JWT token from Authorization header
- Returns 404 if user not found
- Returns 401 if not authenticated
- Includes: id, email, name, created_at, tier
- Does NOT include: password_hash, private fields

**Reference Files:**
- src/routes/auth.js - Shows auth middleware pattern
- src/models/User.js - User model with fields
- src/middleware/requireAuth.js - JWT validation

**Acceptance Criteria:**
- [ ] Endpoint responds at GET /api/users/:id
- [ ] Auth middleware applied
- [ ] Returns correct user data
- [ ] 404 on invalid ID
- [ ] 401 on missing/invalid token
- [ ] Tests covering happy path + error cases

---

## ⚡ Autonomous Execution Guidelines (CRITICAL)

**You will run autonomously for 30-45 minutes. Do NOT wait for user verification.**

**Your Role:** Autonomous implementer who makes progress continuously

**Expected Behavior:**
1. **Continuous Progress** - Never stop to ask questions mid-execution
2. **Reasonable Decisions** - If unsure about response format, follow existing patterns
3. **Immediate Commits** - If tests pass, commit right away
4. **Partial Delivery** - Even just the happy path working is acceptable
5. **Document Blockers** - Can't figure out tier field? Document it

**What Success Looks Like:**
- ✅ PR created with working endpoint
- ✅ Basic GET request works
- ✅ Auth checking works
- ✅ Tests exist (even if partial coverage)

**NOT Required for Success:**
- ❌ Perfect error handling for all edge cases
- ❌ 100% test coverage
- ❌ Asking about tier field format - check codebase or use reasonable default

---

## 🔄 Error Handling & Recovery

**When you encounter errors:**

**Attempt 1:** Check if requireAuth middleware exists, import it
**Attempt 2:** If import fails, check auth.js for pattern, replicate
**Attempt 3:** If still failing, implement basic token check inline

**After 3 attempts:** Document what you tried, implement basic version

---

## ✓ Self-Validation Checkpoints

```bash
# Checkpoint 1: Code Quality
- [ ] Route handler syntax correct
- [ ] Middleware chained properly
- [ ] User model imported
- [ ] No console.errors when testing

# Checkpoint 2: Functionality
curl -H "Authorization: Bearer <token>" http://localhost:3000/api/users/1
- [ ] Returns JSON with user data
- [ ] Password hash NOT included
- [ ] 404 on invalid ID works
- [ ] 401 on missing token works

# Checkpoint 3: Tests
npm test src/routes/users.test.js
- [ ] Happy path test passes
- [ ] 404 test exists
- [ ] 401 test exists
- [ ] Tests document what they validate

# Checkpoint 4: Documentation
- [ ] Route documented in code comments
- [ ] Known issues noted if any
- [ ] PR description ready
```

---

## ⏱️ Time Management

**Time Allocation:**
- 0-5min: Read auth.js, understand pattern
- 5-20min: Implement route handler
- 20-30min: Write tests
- 30-38min: Validate + fix issues
- 38-45min: Commit + PR

**At minute 40:** If tests aren't all passing, document failures and commit anyway

---

## 📊 Progress Reporting

```
[03min] 📖 Reviewed auth.js pattern, identified middleware approach
[12min] 🔨 Route handler implemented, auth middleware applied
[22min] ✓ Manual curl test successful, writing automated tests
[34min] 📝 Tests passing, running validation checks
[41min] ✅ PR created: https://github.com/user/repo/pull/123

Final: 85% complete (missing: advanced error handling for malformed JWTs, documented in PR)
```

---

## 📋 Known Issues

```markdown
## Known Issues / Future Work

### Not Implemented
- [ ] Advanced JWT malformed error handling (returns 500 instead of 401)
- [ ] Rate limiting on endpoint

### Partial Implementation
- [ ] Tests cover happy path + basic errors, not all edge cases

### Blockers Encountered
- None - implementation smooth

### Recommended Next Steps
1. Add malformed JWT handling in middleware
2. Add rate limiting middleware
3. Expand test coverage to edge cases
```

---

## Success: PR Created ✅

Time: 41 minutes
Completion: 85%
Tests: 6/6 passing
Known Issues: Listed in PR

**This is a successful parallel development outcome.**

---

Proceed autonomously. Track your time. Document blockers. Ship the PR.
```

---

## Key Improvements in v3

**Added from Ultrathink Analysis:**

1. **🔄 Error Handling & Recovery** (NEW)
   - 3-attempt pattern explicitly documented
   - Time-boxed retry strategy
   - "Move forward anyway" mindset
   - Prevents "Terminal Hit Early Error" failure mode

2. **✓ Self-Validation Checkpoints** (NEW)
   - 4 checkpoints before commit
   - Time-boxed validation (2-5 min each)
   - Acceptable to proceed even if checks fail
   - Prevents waiting for perfection

3. **⏱️ Time Management** (NEW)
   - Explicit time allocation breakdown
   - Self-awareness checks at 20, 30, 40 minutes
   - "Wrap up now" trigger at minute 40
   - Prevents overtime without output

4. **📊 Progress Reporting** (NEW)
   - Output progress markers with timestamps
   - Helps human monitor 4 terminals efficiently
   - Shows continuous forward motion
   - Reassures orchestrator that terminal is working

5. **📋 Known Issues Template** (NEW)
   - Standard format for partial completion
   - Documents what was tried
   - Clear next steps for future work
   - Legitimizes 70-85% completion

**Result Expected:**
- Higher PR success rate (75-90% vs 50%)
- Fewer "waiting for input" terminals
- Better error recovery
- More consistent delivery
- Easier monitoring for orchestrator

---

## Migration from v2 to v3

**v2 → v3 Additions:**
- Error handling section (prevent early stops)
- Self-validation checkpoints (quality without perfection)
- Time management section (stay on schedule)
- Progress reporting (monitoring efficiency)
- Known issues template (normalize partial delivery)

**Keep from v2:**
- Autonomous execution guidelines (still critical)
- Post-completion checklist (still needed)
- 70-100% success criteria (validated in Run 2)

**v3 is backward compatible** - all v2 prompts work, v3 adds guardrails

---

## Usage

**When creating prompts for parallel terminals:**

1. Copy this v3 template
2. Fill in task-specific sections (Task, Context, Goal, Requirements)
3. Customize time allocation if task is <30min or >45min
4. Customize self-validation checkpoints for your tech stack
5. Keep all v3 sections intact (Error Handling, Time Management, etc.)
6. Paste into each terminal

**Do NOT remove v3 improvements** - they prevent common failure modes identified in Run 2

---

## Metrics Integration

**Before launching parallel run:**
```bash
python3 ~/.claude/scripts/parallel_metrics.py start \
  --project "projectlavos-backend" \
  --tasks 4 \
  --estimate 20
```

**After each terminal completes:**
```bash
# If PR created
python3 ~/.claude/scripts/parallel_metrics.py complete \
  --task-id 1 --pr-created yes

# If terminal failed
python3 ~/.claude/scripts/parallel_metrics.py fail \
  --task-id 2 --reason "hit unknown error at minute 8"
```

**After all terminals done:**
```bash
python3 ~/.claude/scripts/parallel_metrics.py end \
  --time-spent 2.5 \
  --notes "v3 template test run"
```

**View results:**
```bash
python3 ~/.claude/scripts/parallel_metrics.py report
```

---

**This template is production-ready and incorporates lessons from 8 tasks across 2 parallel runs (Nov 14-15, 2025).**

**Expected improvement over v2: +20-30% PR success rate, better monitoring visibility, stronger error recovery.**
