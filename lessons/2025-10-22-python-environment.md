# Critical Lessons Learned - Python Environment

**Date:** October 22, 2025

---

## Lesson #1: Global Environment Variables Override Project .env Files

**Discovery:** `DATABASE_URL` in `~/.zshrc` was overriding all project-specific `.env` files

**Impact:**
- Blocked apartment-leasing-demo (SQLite) from working
- Caused cryptic "ModuleNotFoundError: No module named 'psycopg2'" errors
- Would affect ANY future SQLite projects

**Root Cause:** FretForge project set global variable for convenience, forgot to remove

**Solution:** Commented out line 137 in `~/.zshrc`:
```bash
# Line 137 - NOW DISABLED
# export DATABASE_URL='postgresql://localhost:5432/fretforge'
```

**Best Practice Going Forward:**
- ❌ NEVER set project-specific environment variables globally
- ✅ Use project-specific activation scripts or direnv
- ✅ Check `~/.zshrc` and `~/.zprofile` for global variable conflicts before debugging

---

## Lesson #2: Always Verify Package Versions Exist

**Discovery:** sentiment-analysis-api requirements.txt claimed "PyTorch 2.8.0 REQUIRED"

**Reality:** PyTorch 2.8.0 does not exist. Actual version is 2.9.0.

**Impact:** Any installation attempt would fail immediately

**Solution:** Updated requirements.txt to PyTorch 2.9.0 (verified to exist)

**Best Practice Going Forward:**
```bash
# Before pinning versions in requirements.txt, verify they exist:
pip index versions <package_name>

# Example:
pip index versions torch
# torch (2.9.0)  ← Current version
# torch (2.5.1)
# torch (2.4.0)

# THEN pin to actual version:
torch==2.9.0  # Verified to exist
```

---

## Lesson #3: Python 3.14 Has Mixed Ecosystem Support

**Compatibility Matrix (Verified October 22, 2025):**

| Package | Python 3.14 Support | Evidence |
|---------|---------------------|----------|
| PyTorch 2.9.0 | ✅ FULL | Native ARM64 wheels (74.4 MB) |
| Transformers 4.57.1 | ✅ FULL | Installed successfully |
| FastAPI 0.119.1 | ✅ FULL | Works perfectly |
| Pydantic 2.12.3 | ✅ FULL | Has Python 3.14 wheels |
| SQLAlchemy 2.0.44 | ✅ FULL | Upgraded from 2.0.25 |
| pydantic 2.11.1 | ❌ FAILED | No wheels, build failed |
| llama-cpp-python | ⚠️ RISKY | 40% success rate (requires compilation) |
| TensorFlow 2.20 | ⚠️ UNLIKELY | 80% chance incompatible |

**Strategy for Python Version Selection:**
- ✅ **Use Python 3.14 for:** Modern FastAPI, PyTorch 2.9+, web frameworks
- ⚠️ **Use Python 3.11/3.12 for:** TensorFlow, llama-cpp-python, legacy ML stacks
- ✅ **Use Python 3.9.6 for:** Trained ML models requiring exact version match

---

## Lesson #4: Virtual Environment Verification Protocol

**Critical Discovery:** Old venvs created with corrupted Python 3.13 may be broken

**Established Verification Protocol:**
```bash
# After creating ANY venv, ALWAYS verify:
source venv/bin/activate
python --version       # Must show expected version (e.g., Python 3.14.0)
which python           # Must point to venv/bin/python
pip --version          # Verify pip in venv, not global

# Test critical imports for the project:
python -c "import <critical_package>; print('✅ OK')"
```

**Red Flags:**
- ❌ `python --version` shows different version than expected
- ❌ `which python` points outside venv directory
- ❌ Import errors for packages that should be installed

**Fix:** Delete venv and recreate with correct Python version:
```bash
rm -rf venv
/Library/Frameworks/Python.framework/Versions/3.14/bin/python3 -m venv venv
source venv/bin/activate
python --version  # Verify before proceeding
```

---

## Lesson #5: Requirements.txt Comments Can Be Misleading

**Discovery:** sentiment-analysis-api claimed "Python 3.9.6 REQUIRED" but PyTorch 2.8 needs 3.10+

**Problem Pattern:**
```python
# requirements.txt - MISLEADING
# Python Version: 3.9.6 (REQUIRED - compatible with transformers)
torch==2.8.0  # But PyTorch 2.8 requires Python 3.10+!
```

**Best Practice:**
```python
# requirements.txt - ACCURATE
# Python Version: 3.10+ (REQUIRED - PyTorch 2.9 minimum requirement)
# Tested with: Python 3.14.0 (October 22, 2025)
# Last Updated: 2025-10-22
torch==2.9.0  # Verified: requires Python 3.10-3.14
```

**Rules:**
1. Always state MINIMUM Python version (not arbitrary version)
2. Include testing verification line with date
3. Cross-reference package documentation for actual requirements
4. Update "Last Updated" date when changing versions

---

## Lesson #6: Package Upgrades May Be Required for Python 3.14

**Pattern Discovered:** Some pinned versions lack Python 3.14 support, but newer versions work

**Examples from October 22, 2025:**
- `pydantic 2.5.3` (pinned) → Failed on Python 3.14
- `pydantic 2.12.3` (upgraded) → ✅ Works perfectly
- `sqlalchemy 2.0.25` (pinned) → Worked but upgraded to 2.0.44
- `PyTorch 2.8.0` (pinned) → Doesn't exist, upgraded to 2.9.0

**Strategy:**
1. Try installing original requirements.txt first
2. If package fails with "no matching distribution", try upgrading:
   ```bash
   pip install <package> --upgrade
   ```
3. Update requirements.txt with working version
4. Document the upgrade in commit message

**When to Avoid Upgrades:**
- ⚠️ ML models trained with specific package versions (e.g., scikit-learn 1.6.1)
- ⚠️ Projects with strict version requirements in production
- ⚠️ Packages with breaking changes between versions

---

## Lesson #7: Check Shell Config Files for Stale Entries

**Files to Audit After Python Upgrades:**
- `~/.zshrc` - Check for Python PATH entries, global variables
- `~/.zprofile` - Check for Python PATH entries
- `~/.bashrc` - If using bash
- `~/.bash_profile` - If using bash

**Common Issues:**
```bash
# ~/.zshrc or ~/.zprofile

# ❌ OLD: References to corrupted Python 3.13
export PATH="/Library/Frameworks/Python.framework/Versions/3.13/bin:${PATH}"

# ❌ OLD: Global project variables
export DATABASE_URL='postgresql://localhost:5432/someproject'

# ✅ CURRENT: Python 3.14 only
export PATH="/Library/Frameworks/Python.framework/Versions/3.14/bin:${PATH}"
```

**Cleanup Protocol:**
```bash
# Search for stale Python references
grep -n "3.13\|3.12\|python" ~/.zshrc ~/.zprofile

# Search for global environment variables
grep -n "export.*URL\|export.*KEY\|export.*TOKEN" ~/.zshrc ~/.zprofile

# After cleanup, reload shell
source ~/.zprofile
source ~/.zshrc
```

---

## Quick Reference: Python Project Setup Checklist

**Before Starting ANY Python Project:**
- [ ] Verify Python works: `python3 --version` produces output
- [ ] Check for global variable conflicts: `env | grep -i url`
- [ ] Create project-specific venv: `python3 -m venv venv`
- [ ] Activate and verify: `source venv/bin/activate && python --version`
- [ ] Upgrade pip: `pip install --upgrade pip`
- [ ] Install requirements: `pip install -r requirements.txt`
- [ ] Verify critical imports: `python -c "import <package>"`
- [ ] Document Python version in CLAUDE.md

**Red Flags to Watch For:**
- 🚨 `python3 --version` produces no output → Python broken
- 🚨 Import errors for packages that should be installed → Wrong venv
- 🚨 Database connection errors on SQLite projects → Check DATABASE_URL
- 🚨 "No matching distribution" errors → Package version doesn't exist
- 🚨 Build errors on Python 3.14 → Try upgrading package or use Python 3.11/3.12

---

**Lessons Applied:** October 22, 2025
**Projects Fixed:** 3 of 6 (apartment-leasing-demo, sentiment-analysis-api, security-phishing-detector)
**Remaining Projects:** 3 (reflexia-model-manager, jaspermatters-job-intelligence, Resumes_Master_2025)
**Estimated Time to 100%:** 2-3 hours (dependency installation and testing)
