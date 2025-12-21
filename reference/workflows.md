# Proven Workflows

## CRITICAL: Visual Proof Required (Dec 2025)

**EVERY task must end with user SEEING working result:**
- Web app? Open it in browser, show URL
- CLI tool? Run it, show output
- File generator? Create file, show how to use it
- API? Make request, show response

**Not done until:**
1. User can see it working
2. User knows how to access it again (exact URL/command)
3. Result is repeatable

---

## CRITICAL: Git Workflow (PR Required)

**DO NOT commit directly to main.** Always use feature branches + PRs:

```bash
# 1. Create feature branch
git checkout -b feature/[name]

# 2. Implement changes...

# 3. Commit to feature branch
git add . && git commit -m "feat: [description]"

# 4. Push and create PR
git push -u origin feature/[name]
gh pr create --title "feat: [title]" --body "## Summary
- [bullets]

## Test Plan
- [ ] Build passes
- [ ] Tests pass"

# 5. Verify PR exists
gh pr list
```

**SUCCESS CRITERIA: Task is NOT complete until `gh pr list` shows your PR.**

---

## Deployment (8-13 seconds)

```bash
# Test Before Deploy (ALWAYS)
npm run build && npm run preview

# Vercel (Frontend) - NO env vars needed
vercel --prod --yes

# Vercel (Frontend) - WITH env vars (Vite bakes at build time)
# CRITICAL: Don't waste time with vercel env add then regular deploy
# Env vars MUST be in the build, not just in Vercel dashboard
VITE_MY_VAR=https://api.example.com vercel build --prod
vercel deploy --prebuilt --prod --yes

# Git workflow (ALWAYS add assets)
git add public/
```

---

## Brand System (Canonical)

```css
--teal-500: #14b8a6;    /* Primary actions, headers */
--teal-400: #2dd4bf;    /* Hover states */
--orange-500: #f97316;  /* CTAs, highlights */
--orange-400: #fb923c;  /* Hover states */
--slate-900: #0f172a;   /* Dark backgrounds */
```

---

## Development Pattern That Works

```bash
# Pattern: Direct implementation (24 mins → 87% complete)
1. Implement feature
2. Test immediately
3. Fix issues (don't ask - just fix)
4. Commit to feature branch
5. Create PR
6. SHOW USER: URL or command to see result
7. Move to next

# Anti-pattern: Analysis spiral (90 mins → 0% progress)
1. Request analysis
2. Generate planning docs
3. More analysis
4. More planning
5. Context exhausted, no code written, nothing to SHOW

# Anti-pattern: Question spiral
1. Ask user if they want X
2. Wait for response
3. Ask follow-up about Y
4. Wait for response
5. User frustrated, no progress

# Correct pattern: Fix-first
1. See problem
2. Fix it
3. Show user the fix working
4. Only ask if security concern or outcome preference needed
```

---

## Usage

Load when you need deployment or development workflow reminders:
```
@~/.claude/reference/workflows.md
```
