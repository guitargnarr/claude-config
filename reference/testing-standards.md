# Testing Standards

## Test-Driven Development Workflow

1. Define requirements clearly
2. Ask Claude to write comprehensive tests FIRST
3. Run tests (they should fail initially)
4. Ask Claude to implement code to pass tests
5. Verify all tests pass
6. Only consider task complete when tests pass

## Example TDD Prompt

```
Before implementing user authentication, write comprehensive tests covering:
- Successful login with valid credentials
- Failed login with invalid credentials
- Password hashing verification
- Token generation and validation
- Session management

Then implement the feature to pass all tests.
```

## Test Coverage Requirements

- **Unit tests:** >80% coverage
- **Integration tests:** For critical paths
- **E2E tests:** For main user workflows
- **All tests must pass** before claiming done

## Verification Before Claiming Done

1. Run the actual tests
2. Check git status
3. Verify build passes
4. Test functionality manually

**If tests fail, task is NOT complete.**

## Usage

Load when implementing tests or verifying completion:
```
@~/.claude/reference/testing-standards.md
```
