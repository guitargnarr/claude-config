# Proven Workflows

## Deployment (8-13 seconds)

```bash
# Vercel (Frontend)
vercel --prod --yes

# Test Before Deploy (ALWAYS)
npm run build && npm run preview

# Git workflow (ALWAYS add assets)
git add public/
```

## Development Pattern That Works

```bash
# Pattern: Direct implementation (24 mins → 87% complete)
1. Implement feature
2. Test immediately
3. Fix issues
4. Commit
5. Move to next

# Anti-pattern: Analysis spiral (90 mins → 0% progress)
1. Request analysis
2. Generate planning docs
3. More analysis
4. More planning
5. Context exhausted, no code written
```

## Usage

Load when you need deployment or development workflow reminders:
```
@~/.claude/reference/workflows.md
```
