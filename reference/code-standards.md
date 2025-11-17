# File Size Standards

## Guidelines

- **Target:** <500 lines per file
- **Maximum:** 1000 lines (refactor if exceeded)
- **Strategy:** Extract reusable logic into utility modules

## Refactoring Strategy

When encountering large files:

1. Identify logical boundaries
2. Extract related functions into modules
3. Create clear interfaces between modules
4. Update imports and tests
5. Verify functionality after refactoring

## Module Organization

- Separate UI components into individual files
- Keep business logic separate from presentation
- Extract reusable utilities to shared modules

## .claudeignore Configuration

Create `.claudeignore` in project roots:

```
node_modules/
dist/
build/
*.log
*.min.js
coverage/
.git/
vendor/
__pycache__/
```

**Benefits:** Reduces context usage, faster operations, focus on relevant code

## Usage

Load when refactoring or organizing code:
```
@~/.claude/reference/code-standards.md
```
