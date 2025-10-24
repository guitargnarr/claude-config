# Virtual Environment Template
**Standard workflow for Python projects**

## Create Virtual Environment

```bash
cd /path/to/project

# Create venv
python3 -m venv venv

# Activate (macOS/Linux)
source venv/bin/activate
```

## Verify Environment

```bash
# After activation, ALWAYS verify:
python --version       # Should match expected version
which python           # Should point to venv/bin/python
pip --version          # Should point to venv pip
```

## Install Dependencies

```bash
# Upgrade pip first
pip install --upgrade pip

# Install from requirements
pip install -r requirements.txt

# Verify critical imports
python -c "import <critical_package>; print('✅ OK')"
```

## Recreate if Broken

```bash
# If venv is corrupted, delete and recreate:
deactivate  # Exit venv first
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```
