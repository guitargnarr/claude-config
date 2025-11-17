# Claude Code Memory System - Meta Documentation

**Last Updated**: 2025-11-13
**Structure Version**: 1.0 (Anthropic-aligned)

---

## Overview

This document explains the hierarchical CLAUDE.md memory system, why it's organized this way, and how to maintain it.

## File Structure

```
~/.claude/
├── CLAUDE.md (40 lines)                          # Global: Technical preferences
├── context/
│   ├── personal.md (17 lines)                    # Personal: Identity, philosophy, background
│   └── current-status.md (21 lines)              # Temporal: Job search, priorities, today's date
├── SYSTEM_DOCUMENTATION.md                       # This file (meta documentation)
└── CLAUDE.md.backup-2025-11-13                   # Backup of original 340-line file

~/Projects/projectlavos-monorepo/
└── CLAUDE.md (28 lines)                          # Project-specific: Build, deploy, style

~/Desktop/1_PRIORITY_JOB_SEARCH/
└── CLAUDE.md (32 lines)                          # Career work: Imports personal context
```

---

## Design Principles (From Anthropic Research)

### **1. Hierarchical Loading**
Claude Code loads files in this order:
1. Enterprise policy (not applicable for individual use)
2. User memory (`~/.claude/CLAUDE.md`) - applies to ALL projects
3. Project memory (`./CLAUDE.md`) - applies to current project only
4. Subdirectory memory - loaded on-demand when working in subtrees

**Precedence**: More specific overrides less specific

### **2. Minimalism**
**Anthropic guidance**: "Keep them concise and human-readable"
- Global file: <50 lines
- Project files: ~10-30 lines
- Focus on actionable content (commands, rules, workflows)
- Remove extensive content without proven effectiveness

### **3. Separation of Concerns**
**Global**: Technical preferences that apply everywhere
**Project**: Project-specific commands, rules, style
**Personal**: Identity/background (only loaded where relevant)
**Temporal**: Current status (updated frequently)

### **4. Import Syntax**
Use `@path/to/file` to reference without auto-loading:
- `@~/.claude/context/personal.md` - imports personal context
- Max 5 levels of recursive imports
- Ignored in code blocks

---

## What Goes Where

### **Global (~/.claude/CLAUDE.md)** - 40 lines
**Purpose**: Technical preferences across ALL projects
**Update frequency**: Rarely (monthly or when preferences change)

**Contains**:
- Critical rules (never create docs, never use emojis)
- System info (Python path, GitHub, deployment platforms)
- Deployment shortcuts (vercel, npm commands)
- Common pitfalls (NO vercel.json, NO Tailwind v4)
- Slash commands reference
- Communication preferences

**Does NOT contain**:
- Personal life details
- Project-specific info
- Temporal information
- Personal background

---

### **Personal (~/.claude/context/personal.md)** - 17 lines
**Purpose**: Stable personal context (changes rarely)
**Update frequency**: Rarely (when career/identity changes)

**Contains**:
- Identity (name, age, location, employment status)
- Philosophy (how I think, work preferences)
- Professional summary (Humana background, skills, current work)

**Does NOT contain**:
- Current job search status (that's in current-status.md)
- Project details (that's in project CLAUDE.md files)
- Temporal information

**Loading**: NOT auto-imported globally. Only imported in career/job-search CLAUDE.md

---

### **Current Status (~/.claude/context/current-status.md)** - 21 lines
**Purpose**: Temporal information that changes frequently
**Update frequency**: Weekly or when status changes

**Contains**:
- Today's date (updated manually when working on date-sensitive tasks)
- Active job search details (UofL interview, application metrics)
- Current priorities (job search primary, consulting secondary)
- Decision framework (end of December reassessment)

**Does NOT contain**:
- Stable personal info (that's in personal.md)
- Technical preferences (that's in global CLAUDE.md)

**Loading**: NOT auto-imported globally. Only imported in career/job-search CLAUDE.md

---

### **Project Files (e.g., projectlavos/CLAUDE.md)** - 28 lines
**Purpose**: Project-specific commands, rules, structure
**Update frequency**: As needed when working in project

**Contains**:
- Build & deploy commands (specific to this project)
- Critical rules (ALWAYS/YOU MUST statements)
- Minimal project structure (enough to understand layout)
- Code style (project-specific patterns)

**Does NOT contain**:
- Marketing/positioning information
- Detailed architecture explanations
- Project history or philosophy
- Global preferences (already in global CLAUDE.md)

**Loading**: Auto-loads when working in project directory

---

### **Career/Job Search (~/Desktop/1_PRIORITY_JOB_SEARCH/CLAUDE.md)** - 32 lines
**Purpose**: Career work workflows and imports personal context
**Update frequency**: As needed when job searching

**Contains**:
- Imports: `@~/.claude/context/personal.md` and `current-status.md`
- Resume guidelines (actionable bullets)
- Interview prep workflow
- Job tracking information
- Application patterns

**Loading**: Auto-loads when working in job search directory
**Personal context loads HERE**: This is where personal background is relevant

---

## Loading Behavior Examples

### **Working in ~/Projects/projectlavos-monorepo/**
**Loads**:
- `~/.claude/CLAUDE.md` (40 lines) - global technical
- `~/Projects/projectlavos-monorepo/CLAUDE.md` (28 lines) - project-specific

**Total**: 68 lines
**All coding-relevant**, zero personal life details

---

### **Working in ~/Desktop/1_PRIORITY_JOB_SEARCH/**
**Loads**:
- `~/.claude/CLAUDE.md` (40 lines) - global technical
- `~/Desktop/1_PRIORITY_JOB_SEARCH/CLAUDE.md` (32 lines) - career workflows
  - Which imports `@~/.claude/context/personal.md` (17 lines)
  - Which imports `@~/.claude/context/current-status.md` (21 lines)

**Total**: 110 lines
**All relevant for career work** (technical + personal + job search)

---

### **Working anywhere else (no project CLAUDE.md)**
**Loads**:
- `~/.claude/CLAUDE.md` (40 lines) only

**Total**: 40 lines (minimal)

---

## Maintenance Guidelines

### **When to Update Each File**

**Global CLAUDE.md**:
- Add new technical preferences that apply to ALL projects
- Update when you get new system paths or tools
- Use `#` key during work when you repeat global instructions

**personal.md**:
- Update when career transitions (new job, major life change)
- Update when philosophy/approach changes
- Rarely updated (stable personal info)

**current-status.md**:
- Update weekly or when job search status changes
- Update when priorities shift
- Update dates when working on time-sensitive tasks
- Most frequently updated file

**Project CLAUDE.md files**:
- Create when starting new project
- Update when you repeat project-specific instructions
- Use `#` key during work to add to project file
- Remove content that doesn't improve Claude's output

---

## Using the `#` Key (Anthropic Best Practice)

**During any coding session**:
1. If you repeat an instruction multiple times
2. Press `#` at start of message
3. Claude will prompt which CLAUDE.md file to add to
4. Select appropriate file (global vs project)
5. Instruction automatically added

**Example**:
```
# Always add assets to git after generation
```
Claude asks: "Add to global or project CLAUDE.md?"
Choose project → Adds to projectlavos/CLAUDE.md

**This is the recommended way to grow CLAUDE.md files organically.**

---

## Common Mistakes to Avoid

### **❌ Adding extensive content without testing**
Anthropic: "Common mistake is adding extensive content without iterating on its effectiveness"
**Fix**: Start minimal, add only what demonstrably improves Claude's output

### **❌ Mixing personal and technical in global file**
**Old approach**: Global file had job search status, personal background
**Fix**: Separate concerns - global = technical only, personal = separate file

### **❌ Treating CLAUDE.md like README.md**
**Wrong**: Explain project architecture, business goals, marketing
**Right**: Commands to run, rules to follow, style to use

### **❌ No project-specific files**
**Wrong**: Put everything in global, hope it applies everywhere
**Right**: Create project CLAUDE.md for each repo with specific context

### **❌ Auto-loading personal context everywhere**
**Wrong**: Import personal.md in global CLAUDE.md
**Right**: Only import personal context in career/job-search work

---

## Anthropic Standards Compliance

| Standard | Our Implementation | Status |
|----------|-------------------|--------|
| Global <50 lines | 40 lines | ✅ |
| Project ~10-30 lines | 28-32 lines | ✅ |
| Focus on commands/rules | Yes, removed marketing | ✅ |
| Minimize content | Removed 60-80% from original | ✅ |
| Hierarchical structure | Global → Project → Imports | ✅ |
| Use `#` key for growth | Documented, ready to use | ✅ |
| Emphasis on critical items | ALWAYS, YOU MUST added | ✅ |
| Separation of concerns | Clear layers | ✅ |

---

## Migration Notes (Nov 13, 2025)

### **What Changed**
**Before**: Single 340-line global file with mixed content
**After**: Hierarchical structure with 5 focused files totaling 138 lines

### **Breaking Changes**
- Personal context no longer auto-loads in coding projects
- Project-specific context moved to project CLAUDE.md files
- Temporal info separated from stable info

### **Backup**
Original file backed up at: `~/.claude/CLAUDE.md.backup-2025-11-13`

### **Improvements**
- 60-80% reduction in context per session
- Right context for right task
- Easier to maintain (update one file, not touch everything)
- Follows industry best practices

---

## Future Additions

### **When Working in New Projects**
Create `CLAUDE.md` in each project root:
- `~/Projects/jaspermatters/CLAUDE.md`
- `~/Projects/mirador-core/CLAUDE.md`
- etc.

### **Subdirectory Files (Advanced)**
For large projects, create subdirectory CLAUDE.md files:
```
~/Projects/projectlavos-monorepo/
├── CLAUDE.md (root)
├── main-site/CLAUDE.md (frontend-specific)
├── demos/CLAUDE.md (demo-specific)
└── backend/CLAUDE.md (backend-specific)
```
**Benefit**: Load only relevant context for current subtree

---

## References

- **Anthropic Official**: https://www.anthropic.com/engineering/claude-code-best-practices
- **Claude Docs**: https://code.claude.com/docs/en/memory
- **Research Date**: 2025-11-13
- **Implementation**: Full industry standard alignment

---

## Quick Reference

```bash
# File locations
~/.claude/CLAUDE.md                               # Global (40 lines)
~/.claude/context/personal.md                     # Personal (17 lines)
~/.claude/context/current-status.md               # Temporal (21 lines)
~/Projects/projectlavos-monorepo/CLAUDE.md        # Project (28 lines)
~/Desktop/1_PRIORITY_JOB_SEARCH/CLAUDE.md         # Career (32 lines)

# Line counts
wc -l ~/.claude/CLAUDE.md ~/.claude/context/*.md

# View what loads in current directory
# (No command - just work in directory, Claude auto-loads)

# Add instruction to CLAUDE.md during work
# Press # at start of message, Claude will prompt for location
```

---

**This structure is production-ready and follows Anthropic's latest best practices (2025).**
