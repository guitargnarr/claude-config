---
description: Comprehensive git workflow - commit, push, PR creation with Ultrathink analysis
argument-hint: [commit|push|pr|review] [options]
allowed-tools: Bash(git:*), Bash(gh:*), Read, Grep
---

# Comprehensive Git Workflow with Ultrathink

**Command**: ${1:-commit-push}
**Options**: $2 $3 $4

## 🔍 ULTRATHINK MODE: ACTIVATED

Deep analysis of code changes with multi-layered reasoning to generate perfect conventional commits, comprehensive PR descriptions, and thorough code reviews.

---

## Workflow Modes

### Mode 1: `commit-push` (Default)
**Usage**: `/git` or `/git commit-push`

**What happens**:
1. **ULTRATHINK ANALYSIS** - Deep code understanding
   - Scan all changes (`git status`, `git diff`)
   - Read modified files completely
   - Understand architectural impact
   - Detect patterns and intent
   - Identify commit type automatically

2. **Auto-detect Commit Type**:
   - `feat`: New features, capabilities, user-facing additions
   - `fix`: Bug fixes, error corrections
   - `docs`: Documentation changes only
   - `style`: Formatting, whitespace, no logic change
   - `refactor`: Code restructuring, no behavior change
   - `test`: Adding/updating tests
   - `chore`: Build, dependencies, tooling
   - `perf`: Performance improvements

3. **Generate Conventional Commit**:
   ```
   <type>(<scope>): <subject>

   <body explaining WHY, not WHAT>

   <footer with issue references>
   Co-Authored-By: Claude <noreply@anthropic.com>
   ```

4. **Stage All Relevant Changes**
   - Exclude: `.env`, `*.log`, `.DS_Store`, secrets
   - Include: All code, tests, docs
   - Warn if large files (>1MB)

5. **Commit and Push**
   - Create commit with AI message
   - Push to remote (or create remote branch if needed)
   - Show commit hash and summary

**Example**:
```bash
# You made changes to authentication code
/git

# ULTRATHINK analyzes:
# - Modified: src/auth/oauth.py (new OAuth2 flow)
# - Modified: tests/auth/test_oauth.py (new tests)
# - Modified: docs/API.md (new endpoints documented)
#
# Detects: NEW FEATURE (feat)
# Scope: auth (authentication module)
# Impact: OAuth2 support for third-party integrations
#
# Generates commit:
# feat(auth): implement OAuth2 authentication flow
#
# Adds OAuth2 support with automatic token refresh and encrypted
# storage. Enables third-party integrations while maintaining
# security through token expiration and revocation mechanisms.
#
# Includes comprehensive tests and API documentation.
#
# Closes #42
# Co-Authored-By: Claude <noreply@anthropic.com>
#
# Commits and pushes automatically!
```

---

### Mode 2: `pr` - Create Pull Request
**Usage**: `/git pr [base-branch]`

**What happens**:
1. **ULTRATHINK PR ANALYSIS**
   - Analyze ALL commits since branch diverged from base
   - Read ALL changed files completely
   - Understand full scope of changes
   - Identify breaking changes, migrations, API changes
   - Detect related issues from commit messages

2. **Generate Comprehensive PR Description**:
   ```markdown
   ## Summary
   [3-5 bullet points of key changes]

   ## Technical Details

   ### Architecture Changes
   [Describe architectural decisions and patterns]

   ### API Changes
   - **New endpoints**: [List new APIs]
   - **Modified endpoints**: [List changed APIs]
   - **Breaking changes**: [List breaking changes]
   - **Deprecations**: [List deprecated features]

   ### Database Changes
   - **Migrations**: [List schema changes]
   - **Indexes**: [New indexes added]
   - **Data changes**: [Any data transformations]

   ### Performance Impact
   [Expected performance implications]

   ### Security Considerations
   [Security review of changes]

   ## Test Plan
   - [x] Unit tests pass (`pytest tests/`)
   - [x] Integration tests pass
   - [x] Linting clean (`ruff check`)
   - [ ] Manual testing completed:
     - [ ] [Specific test scenario 1]
     - [ ] [Specific test scenario 2]
     - [ ] [Specific test scenario 3]

   ## Related Issues
   Closes #[number]
   Relates to #[number]

   ## Deployment Notes
   [Special deployment considerations, if any]

   ## Rollback Plan
   [How to rollback if issues found in production]

   ---
   🤖 Generated with [Claude Code](https://claude.com/claude-code) using Ultrathink analysis
   ```

3. **Push and Create PR**
   ```bash
   git push -u origin HEAD
   gh pr create --base ${2:-main} --title "[title]" --body "[description]"
   ```

4. **Return PR URL** for review

**Example**:
```bash
# After implementing OAuth feature across multiple commits
/git pr

# ULTRATHINK analyzes:
# - 8 commits on this branch
# - 15 files changed (code, tests, docs)
# - New API endpoints added
# - Database migration for token storage
# - Breaking change: deprecated old auth endpoint
#
# Generates comprehensive PR with all sections filled
# Creates PR automatically
# Returns: https://github.com/guitargnarr/mirador-core/pull/123
```

---

### Mode 3: `review` - AI Code Review
**Usage**: `/git review <pr-number>`

**What happens**:
1. **ULTRATHINK CODE REVIEW**
   - Fetch PR with `gh pr view`
   - Read EVERY changed file completely
   - Understand business logic and intent
   - Check for issues across multiple dimensions

2. **Multi-Dimensional Analysis**:

   **Security** (Critical Priority):
   - SQL injection vulnerabilities
   - XSS attack vectors
   - CSRF protection
   - Authentication bypasses
   - Authorization gaps
   - Secrets in code
   - Unsafe deserialization
   - Path traversal risks

   **Code Quality**:
   - DRY violations (duplicated code)
   - SRP violations (functions doing too much)
   - Complex conditionals (>3 levels)
   - Long functions (>50 lines)
   - Poor naming conventions
   - Missing type hints (Python)
   - Unused imports/variables

   **Testing**:
   - New code without tests
   - Changed logic without test updates
   - Missing edge case coverage
   - Missing integration tests
   - Test quality issues

   **Performance**:
   - N+1 query problems
   - Inefficient algorithms
   - Memory leaks
   - Missing database indexes
   - Unnecessary computations in loops
   - Missing caching opportunities

   **Documentation**:
   - Missing docstrings
   - Outdated comments
   - README not updated
   - API docs missing
   - Breaking changes not documented

3. **Generate Review** with prioritized findings

4. **Post to GitHub**
   ```bash
   gh pr review <number> --comment -b "[review]"
   ```

**Example**:
```bash
# Someone else created PR #156
/git review 156

# ULTRATHINK deep analysis finds:
# 🔴 Critical: SQL injection in user input (must fix)
# 🟡 Important: Missing authentication check on endpoint
# 🟡 Important: No tests for new OAuth flow
# 🟢 Minor: Function too long (78 lines)
#
# Posts comprehensive review automatically
```

---

### Mode 4: `apply-suggestions` - Batch Apply Review Fixes
**Usage**: `/git apply-suggestions <pr-number>`

**What happens**:
1. Fetch your own review comments on PR
2. Parse all suggestions marked for auto-fix
3. Apply changes:
   - Fix linting issues
   - Add missing type hints
   - Split long functions
   - Add basic test scaffolding
   - Update documentation
4. Create new commit: `chore: apply code review suggestions`
5. Push updates

**Example**:
```bash
# After reviewing PR and finding 10 minor issues
/git apply-suggestions 123

# Automatically fixes:
# - Adds type hints to 5 functions
# - Splits 2 long functions
# - Adds docstrings to public methods
# - Updates README
#
# Commits and pushes automatically!
```

---

## ULTRATHINK Analysis Process

### Layer 1: Surface Analysis (Fast)
- File types changed
- Lines added/removed
- Modules affected
- **Time**: <5 seconds

### Layer 2: Semantic Analysis (Medium)
- Read changed files
- Understand logic flow
- Identify patterns
- Detect commit type
- **Time**: 10-15 seconds

### Layer 3: Deep Analysis (Thorough)
- Read related files (tests, docs, dependencies)
- Understand architectural impact
- Check for breaking changes
- Verify test coverage
- Security implications
- **Time**: 20-30 seconds

### Layer 4: Cross-File Analysis (Comprehensive)
- Check for ripple effects
- Verify consistency across codebase
- Detect missing updates in related files
- Integration test coverage
- **Time**: 30-45 seconds

**ULTRATHINK uses all 4 layers for maximum accuracy.**

---

## Automatic Commit Type Detection

### Detection Rules (Priority Order)

**feat** - New Features:
- New files in `src/` or `lib/`
- New public functions/classes
- New API endpoints
- New user-facing capabilities
- Keywords: "add", "implement", "create", "introduce"

**fix** - Bug Fixes:
- Changes in error handling
- Fixing crashes/exceptions
- Correcting logic errors
- Keywords: "fix", "resolve", "correct", "repair"

**docs** - Documentation:
- Only changes to `.md`, `.rst`, docstrings
- No code logic changes
- Keywords: "document", "explain", "clarify"

**style** - Formatting:
- Only whitespace, formatting changes
- No logic or behavior changes
- Keywords: "format", "style", "whitespace"

**refactor** - Code Restructuring:
- Code changes without behavior change
- Improving code organization
- No new features, no bug fixes
- Keywords: "refactor", "restructure", "reorganize"

**test** - Testing:
- Only changes in `tests/` or `*_test.py`
- Adding/updating test cases
- Keywords: "test", "spec", "coverage"

**chore** - Maintenance:
- Dependency updates
- Build configuration
- Tooling changes
- Keywords: "update", "upgrade", "config", "build"

**perf** - Performance:
- Optimizations improving speed/memory
- Caching implementations
- Algorithm improvements
- Keywords: "optimize", "cache", "performance", "faster"

### Manual Override

```bash
# Force specific type
/git commit feat    # Force feature type
/git commit fix     # Force fix type
/git commit docs    # Force docs type
```

---

## Full Workflow Examples

### Example 1: Feature Development
```bash
# 1. Create feature branch
git checkout -b feature-oauth2

# 2. Implement feature
# ... write code ...
# ... write tests ...
# ... update docs ...

# 3. Comprehensive commit and PR
/git

# ULTRATHINK analysis:
# - Detects: feat (new OAuth2 capability)
# - Scope: auth
# - Finds: 3 new files, 2 modified, tests added, docs updated
# - Generates commit message
# - Stages all changes
# - Commits locally
# - Pushes to remote
# - Asks: "Create PR? (y/n)"
# - If yes: Generates comprehensive PR description
# - Creates PR
# - Returns PR URL

# Done! Feature → Production-ready PR in one command.
```

### Example 2: Bug Fix
```bash
# 1. Fix bug
# ... make changes ...

# 2. Commit and push
/git

# ULTRATHINK analysis:
# - Detects: fix (error handling added)
# - Scope: api
# - Generates: "fix(api): handle timeout errors on external API calls"
# - Commits and pushes
# - Asks about PR
# - Creates PR with fix details

# Done!
```

### Example 3: Review Someone's PR
```bash
# Someone creates PR #89
/git review 89

# ULTRATHINK deep analysis:
# - Reads all 12 changed files
# - Finds 3 critical security issues
# - Finds 5 missing tests
# - Finds 2 performance concerns
# - Generates detailed review
# - Posts to GitHub

# Human sees comprehensive first-pass review
# Addresses critical issues before final review
```

### Example 4: Apply Review Suggestions
```bash
# After review, apply fixable issues automatically
/git apply-suggestions 89

# Applies:
# - Linting fixes
# - Type hint additions
# - Docstring additions
# - Basic test scaffolding
# - Commits and pushes

# Saves 30-60 minutes of manual fixes
```

---

## Implementation Details

### Smart Staging Algorithm

```python
def should_stage(file_path):
    """Determine if file should be staged"""

    # NEVER stage
    if matches_gitignore(file_path):
        return False
    if contains_secrets(file_path):
        return False
    if is_large_binary(file_path, threshold_mb=1):
        return False

    # ALWAYS stage
    if file_path.endswith(('.py', '.js', '.ts', '.md', '.json', '.yml')):
        return True
    if is_in_tests_dir(file_path):
        return True

    # ASK user for unknown file types
    return ask_user(f"Stage {file_path}?")
```

### Commit Message Generation (Ultrathink)

```python
def generate_commit_message(changes):
    """Generate conventional commit with deep analysis"""

    # Layer 1: Quick scan
    files_changed = get_changed_files()
    lines_changed = count_lines_changed()

    # Layer 2: Semantic analysis
    file_contents = read_all_changed_files()
    logic_changes = analyze_logic_changes(file_contents)

    # Layer 3: Deep analysis
    related_files = find_related_files(files_changed)
    architectural_impact = analyze_architecture(logic_changes)
    breaking_changes = detect_breaking_changes(logic_changes)

    # Layer 4: Cross-file analysis
    test_coverage = check_test_coverage(files_changed)
    doc_updates = verify_docs_updated(files_changed)

    # Synthesize into conventional commit
    commit_type = infer_type(logic_changes, files_changed)
    scope = infer_scope(files_changed)
    subject = generate_subject(logic_changes, max_length=72)
    body = generate_body(architectural_impact, breaking_changes)
    footer = generate_footer(related_issues, breaking_changes)

    return format_conventional_commit(commit_type, scope, subject, body, footer)
```

### PR Description Generation (Ultrathink)

```python
def generate_pr_description(branch, base):
    """Generate comprehensive PR description"""

    # Analyze all commits
    commits = get_commits_since_divergence(branch, base)
    commit_messages = [c['message'] for c in commits]

    # Analyze complete diff
    full_diff = get_full_diff(branch, base)
    files_changed = parse_diff_files(full_diff)

    # Read all changed files for context
    file_contents = {}
    for file in files_changed:
        file_contents[file] = read_file(file)

    # ULTRATHINK analysis
    summary = extract_key_changes(commits, file_contents)
    arch_changes = analyze_architectural_impact(file_contents)
    api_changes = detect_api_changes(file_contents)
    db_changes = detect_database_changes(file_contents)
    breaking = identify_breaking_changes(file_contents, commits)
    test_plan = generate_test_checklist(files_changed)
    related_issues = extract_issue_references(commit_messages)

    # Generate comprehensive description
    return build_pr_description(
        summary=summary,
        technical=arch_changes + api_changes + db_changes,
        breaking_changes=breaking,
        test_plan=test_plan,
        issues=related_issues
    )
```

---

## Advanced Features

### Interactive Mode
```bash
# Step-by-step confirmation
/git interactive

# Prompts at each step:
# 1. "Stage these files? (show list)"
# 2. "Use this commit message? (show generated)"
# 3. "Push to remote?"
# 4. "Create PR?"
```

### Dry Run Mode
```bash
# Show what would happen without executing
/git --dry-run

# Shows:
# - Files that would be staged
# - Generated commit message
# - Push command
# - PR description
# Without actually doing anything
```

### Force Type
```bash
# Override automatic detection
/git feat     # Force feature commit
/git fix      # Force fix commit
/git docs     # Force docs commit
```

---

## Safety & Security

### Secret Detection
Before committing, scans for:
- API keys (patterns: `sk-`, `ghp_`, `key=`, etc.)
- Passwords (`password=`, `pwd=`)
- Private keys (`BEGIN PRIVATE KEY`)
- Tokens (`token=`, `auth=`)
- Database credentials

**If detected**: Aborts commit, shows warning, suggests `.env` file.

### Large File Detection
- Warns if files >1MB
- Blocks if files >10MB (likely binary, should use git-lfs)
- Shows file sizes for review

### Confirmation Prompts
**Auto-confirms** (no prompt):
- <20 files changed
- <500 lines changed
- No secrets detected
- No large files

**Requires confirmation**:
- >100 files changed
- >1000 lines changed
- Potential secrets
- Binary files
- Pushing to main/master
- Creating PR with breaking changes

---

## Integration with Existing Workflow

### Compatible With
- ✅ Manual git commands (can still use `git commit` directly)
- ✅ GitHub web UI (can still create PRs manually)
- ✅ Other /commands (/commit, /push-pr still work individually)
- ✅ Pre-commit hooks (will run before commit)

### Enhanced Workflow
```bash
# Old way:
git add .
git commit -m "fix stuff"  # Vague message
git push
gh pr create              # Manually write description

# New way:
/git                      # One command, AI does everything
```

---

## Command Reference

```bash
# Default: commit-push workflow
/git

# Specific modes
/git commit-push          # Commit and push (no PR)
/git pr [base]            # Create PR against base branch
/git review <number>      # Review PR
/git apply-suggestions <number>  # Apply review fixes

# With options
/git --dry-run            # Show what would happen
/git interactive          # Step-by-step confirmations
/git feat                 # Force feature commit type
/git fix                  # Force fix commit type

# Common workflows
/git                      # Quick commit + push
/git pr                   # Create PR after feature complete
/git review 123           # First-pass review of PR
```

---

## Expected Output

### Successful /git execution:
```
🔍 ULTRATHINK: Analyzing code changes...

📊 Changes detected:
  Modified: 3 files
  Added: 2 files
  Deleted: 0 files
  Lines: +145 / -23

🧠 Analysis complete:
  Type: feat (new feature detected)
  Scope: auth (authentication module)
  Impact: OAuth2 authentication support

📝 Generated commit message:
  feat(auth): implement OAuth2 authentication flow

  Adds OAuth2 support with automatic token refresh and encrypted
  storage for third-party integrations.

  Closes #42
  Co-Authored-By: Claude <noreply@anthropic.com>

✅ Staged 5 files
✅ Committed: abc123d
✅ Pushed to origin/feature-oauth2

🎯 Next step: Create PR with /git pr
```

---

## Troubleshooting

**Issue**: "/git not found"
**Fix**: Restart Claude Code to load new command

**Issue**: "Not in a git repository"
**Fix**: Navigate to git repo directory first

**Issue**: "No changes to commit"
**Fix**: Make changes first, or check `git status`

**Issue**: "Failed to push"
**Fix**: Check network, verify `git remote -v`, authenticate with `gh auth login`

**Issue**: "PR already exists"
**Fix**: Use `gh pr view` to see existing PR, or merge/close it first

---

## Metrics & Performance

**Execution Time**:
- Ultrathink analysis: 20-30 seconds
- Commit generation: 5-10 seconds
- PR creation: 10-20 seconds
- Code review: 30-60 seconds (reads all files)
- **Total workflow**: ~1 minute (vs 10-15 minutes manual)

**Token Usage**:
- commit-push: ~2,000 tokens
- PR creation: ~5,000 tokens
- Code review: ~10,000 tokens (depends on PR size)

**Time Savings**:
- Commit message: 3 mins → 10 secs (18x faster)
- PR description: 10 mins → 20 secs (30x faster)
- First-pass review: 30 mins → 1 min (30x faster)
- **Total**: 43 mins → 1.5 mins per feature (29x faster!)

---

## Summary

**One command. Complete workflow.**

`/git` handles:
✅ Change detection
✅ Automatic staging
✅ Conventional commit messages (auto-type detection)
✅ Push to remote
✅ PR creation with comprehensive descriptions
✅ First-pass code reviews
✅ Batch apply review suggestions

**ULTRATHINK ensures**:
- Deep code understanding
- Accurate commit types
- Comprehensive PR descriptions
- Thorough security reviews
- Context-aware suggestions

**Execute the workflow now.**
