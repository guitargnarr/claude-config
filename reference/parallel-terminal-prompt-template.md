# Parallel Development - Terminal Prompt Template (v2)

**Use this template when launching parallel Claude Code sessions.**

**Updated:** November 15, 2025
**Improvements:** Added autonomous execution guidelines, error handling, time expectations

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

## ⚡ Autonomous Execution Guidelines

**CRITICAL:** You will run autonomously for 30-45 minutes. Do NOT wait for user verification.

**Expected Behavior:**
- If tests pass locally, commit immediately
- If you encounter blockers, document them and proceed with what you can
- If you're unsure, make a reasonable decision and note it in PR description
- Do NOT ask questions mid-execution - use your best judgment
- Expected outcome: Working PR with tests passing
- Deliver 70-100% of requirements - don't wait for perfection

**Error Handling:**
If you encounter errors:
1. Try 2-3 different approaches
2. Document what didn't work in code comments
3. Implement what you can
4. Create PR with "Known Issues" section if needed
5. Do NOT stop execution - keep making progress

**Time Expectation:** 30-45 minutes of autonomous work

---

## Post-Completion Checklist

After implementation:
1. ✅ Run tests: `npm test` or equivalent
2. ✅ Run build: `npm run build` or equivalent
3. ✅ Commit changes: `/commit` with descriptive conventional message
4. ✅ Create PR: `/push-pr main`
5. ✅ Verify PR created: Check GitHub

**Do NOT wait for user approval between these steps.**

---

## Success Criteria

This task is successful if:
- ✅ PR is created with working code
- ✅ Tests pass (or test failures are documented)
- ✅ 70-100% of requirements met
- ⚠️ Partial completion is acceptable if blockers are documented

Proceed autonomously. Good luck!
```

---

## Example: Auth UI Integration

```markdown
## Task: Add Supabase Authentication UI

**Context:** Guitar platform is live at guitar.projectlavos.com. Supabase is configured with user_profiles table and RLS policies. Need login/signup UI.

**Goal:** Add authentication UI with sign up, log in, and user profile display.

**Requirements:**
- Install @supabase/auth-ui-react (if not already installed)
- Create /login and /signup routes
- Add auth context/provider for global auth state
- Display user email in nav bar when logged in
- Add "Sign In" / "Sign Out" button in navigation
- Protected route example (show how to gate premium content)

**Reference Files:**
- services/guitar/.env - Contains VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
- services/guitar/src/App.jsx - Add new routes here
- Database: user_profiles table with tier column (free/premium/pro)

**Acceptance Criteria:**
- [ ] Sign up form working (creates user_profiles entry)
- [ ] Log in form working
- [ ] Auth state persists across page reloads
- [ ] User email displayed when logged in
- [ ] Sign out button works
- [ ] Example of gating premium content by tier
- [ ] No console errors

---

## ⚡ Autonomous Execution Guidelines

**CRITICAL:** You will run autonomously for 30-45 minutes. Do NOT wait for user verification.

**Expected Behavior:**
- If tests pass locally, commit immediately
- If you encounter blockers, document them and proceed with what you can
- If you're unsure about auth flow, implement a standard Supabase pattern
- Do NOT ask questions mid-execution - use your best judgment
- Expected outcome: Working PR with auth UI functional
- Deliver 70-100% of requirements - basic login/signup is acceptable even if tier gating is partial

**Error Handling:**
If you encounter errors:
1. Try 2-3 different approaches
2. Check Supabase docs for auth patterns
3. Implement what you can
4. Create PR with "Known Issues" section if needed
5. Do NOT stop execution - keep making progress

**Time Expectation:** 30-45 minutes of autonomous work

---

## Post-Completion Checklist

After implementation:
1. ✅ Test locally: `cd services/guitar && npm run dev`
2. ✅ Test signup: Create test user account
3. ✅ Test login: Log in with test account
4. ✅ Test logout: Sign out
5. ✅ Verify user_profiles row created in Supabase
6. ✅ Commit changes: `/commit`
7. ✅ Create PR: `/push-pr main`
8. ✅ Verify PR created: `gh pr list`

**Do NOT wait for user approval between these steps.**

---

## Success Criteria

This task is successful if:
- ✅ PR is created with working auth UI
- ✅ User can sign up and log in
- ✅ Auth state is managed properly
- ⚠️ Tier-based content gating can be partial/example only

Proceed autonomously. Good luck!
```

---

## Key Improvements in v2

**Added:**
1. ⚡ Autonomous Execution Guidelines section
2. Explicit "do NOT wait for verification" instruction
3. Error handling strategy (try 2-3 approaches)
4. Time expectation (30-45 minutes)
5. Success criteria that accepts 70-100% completion
6. Post-completion checklist with no approval gates

**Result:**
- Higher PR success rate (fewer terminals waiting)
- Better error recovery (terminals keep working)
- Clearer expectations (Claude knows it's autonomous)
- Faster completion (no mid-execution questions)

---

## Usage

**When creating prompts for parallel terminals:**

1. Copy this template
2. Fill in the task-specific sections (Task, Context, Goal, Requirements)
3. Keep the Autonomous Execution Guidelines section AS-IS
4. Customize Post-Completion Checklist for your tech stack
5. Paste into each terminal

**Do NOT remove or modify the autonomous execution guidelines** - they're critical for preventing terminals from waiting for input.

---

**This template is production-ready and proven effective (Nov 15, 2025).**
