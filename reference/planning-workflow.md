# Plan Files for Complex Tasks

## Workflow for Multi-Step Tasks

1. Ask Claude to create plan in `plan.md`
2. Claude updates plan as it implements
3. Plan persists across sessions
4. Reference plan to resume work
5. Clear context frequently, plan maintains continuity

## Plan Template

```markdown
# Plan: [Task Name]

## Completed
- [x] Step 1
- [x] Step 2

## In Progress
- [ ] Current step

## Todo
- [ ] Next step
- [ ] Final step
```

## When to Use Plans

- Multi-step features requiring >1 hour
- Complex refactoring across multiple files
- Tasks that span multiple sessions
- When you need to resume after `/clear`

## Usage

Load when starting complex multi-step work:
```
@~/.claude/reference/planning-workflow.md
```
