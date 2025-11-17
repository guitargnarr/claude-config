# Frontend Testing and Debugging

## Using Playwright MCP Server (When Available)

When troubleshooting HTML, CSS, and JavaScript issues:

1. Navigate to page with `mcp__playwright__browser_navigate`
2. Use `mcp__playwright__browser_snapshot` to capture page state
3. Check `mcp__playwright__browser_console_messages` for JS errors
4. Use `mcp__playwright__browser_evaluate` to run JS interactively

**Setup:** `claude mcp add playwright npx @playwright/mcp@latest`

## Common Frontend Debugging Workflows

- **HTML/CSS issues:** Use browser_snapshot to inspect DOM
- **JavaScript errors:** Check browser_console_messages
- **Interactive debugging:** Use browser_evaluate to run JS
- **Network issues:** Monitor with browser_network_requests

## Best Practices for Front-End Work

1. Always work with local servers Claude can access
2. Use hot reload for quick iteration
3. Keep test pages minimal to avoid token limits
4. Take screenshots manually and attach to prompts
5. Describe visual issues in detail (spacing, alignment, colors)
6. Reference specific elements by class names or IDs
7. Break CSS problems into small, testable changes
8. Verify each change before moving to next issue

## CSS Framework Guidelines

- Document design system tokens and variables in project CLAUDE.md
- Include responsive breakpoints and grid systems
- Add framework-specific conventions

## Usage

Load when doing frontend debugging work:
```
@~/.claude/reference/frontend-testing.md
```
