# Common Python Project Issues
**Quick reference for troubleshooting**

## Issue 1: Global Environment Variables Override .env Files

**Symptom:** SQLite project tries to connect to PostgreSQL
**Cause:** Global `DATABASE_URL` in ~/.zshrc overrides project .env

**Solution:**
```bash
# Check for global variables
env | grep -i url

# Temporary fix (per session)
unset DATABASE_URL

# Permanent fix: Comment out in ~/.zshrc
# Line 137: # export DATABASE_URL='postgresql://...'
```

## Issue 2: Package Version Doesn't Exist

**Symptom:** `pip install` fails with "no matching distribution"
**Cause:** requirements.txt specifies non-existent version

**Solution:**
```bash
# Check available versions
pip index versions <package_name>

# Install latest compatible version
pip install <package_name> --upgrade

# Update requirements.txt with working version
```

## Issue 3: Python Command Produces No Output

**Symptom:** `python3 --version` returns nothing
**Cause:** PATH points to corrupted Python installation

**Solution:**
```bash
# Use full path instead
/Library/Frameworks/Python.framework/Versions/3.14/bin/python3 --version

# Check PATH
which python3
echo $PATH | grep -i python
```

**See:** ~/.claude/CLAUDE.md for Python PATH fix instructions
