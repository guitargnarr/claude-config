# Python Setup Template
**Reference this from project CLAUDE.md files**

## Python Installation Verification

**Before starting ANY Python project:**

```bash
# 1. Verify Python works (should produce output)
python3 --version
python3 -c "print('Python is working')"

# 2. Check which Python is in PATH
which python3

# 3. If no output appears, use full path:
/Library/Frameworks/Python.framework/Versions/3.14/bin/python3 --version
```

## Version Requirements

- **System Python:** 3.9.6 (macOS built-in) - for compatibility
- **Primary Python:** 3.14.0 - modern projects
- **Full path:** `/Library/Frameworks/Python.framework/Versions/3.14/bin/python3`

**If project requires different version, specify in project CLAUDE.md**

## Pip Upgrade

```bash
# After activating venv, always upgrade pip first:
pip install --upgrade pip
```

## Red Flags

🚨 `python3 --version` produces no output → Python broken, use full path
🚨 Import errors for installed packages → Wrong venv activated
🚨 "No matching distribution" → Package version doesn't exist

**See:** ~/.claude/CLAUDE.md for troubleshooting history
