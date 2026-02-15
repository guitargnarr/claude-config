# Oracle Query Pattern

**Created:** February 7, 2026
**Purpose:** Standard operating procedure for querying design models to produce elite frontend experiences
**Models:** design-oracle (creative), design-system-atlas (reference), elite-frontend (code)

---

## The Pattern (Exact Prompt Structure)

When the user wants to create a frontend for existing software, this is the multi-model query pipeline:

### Step 1: Software Selection

Identify software on the machine that deserves a frontend experience. Criteria:
- Ideas that are hard to communicate via language alone
- Communicates something meaningfully
- Solves a real, human problem
- NOT all software deserves a frontend — only what benefits from visual/interactive expression

### Step 2: Multi-Model Query (Run in Unison)

Query all three models with a description of the software — what it does, what it solves, who it's for. Specifically ask each model for ways to bring the software to life via a frontend UI/UX rich experience.

**Query design-oracle:** Creative direction. Ask for visual concepts, interaction metaphors, animation ideas, what makes this experience uniquely distinctive compared to existing website aesthetics. The oracle challenges defaults and proposes unexpected approaches.

**Query design-system-atlas:** System grounding. What tier, formation, palette, typography, and components from the existing system map to this software? What exact values apply?

**Query elite-frontend:** Implementation specifics. Given the software's data structures and functionality, what components, layouts, and interactions would bring it to life in production-ready code?

### Step 3: Analysis Against the Software

Based on model results:
- Verify what can be proven against the actual codebase
- Test what works with the software's real APIs/data/output
- Discard suggestions that don't map to reality
- Identify where model suggestions reveal unexploited capabilities in the software

### Step 4: Synthesis and Plan

Derive inspiration from the query results. Formulate a plan that:
- Maximizes quality
- Makes the experience uniquely distinctive
- Doesn't replicate existing website aesthetics
- Is grounded in what the software actually does
- Serves a real human need

---

## The Canonical Prompt (User's Exact Words)

> Run them in unison with a series of queries that describe a piece of software on my machine that deserves a front end experience. Describe the software and what it does and specifically ask the models directly for ways to bring the software to life via a front end UI/UX rich experience. Based on the results from the models, perform analysis against the software itself based on what can be proven and what works with the software. Not all software deserve a frontend. Ideas that are hard to communicate via language alone are worth it. Especially if it communicates something meaningfully or solves a real, human problem. Derive inspiration from the results of your queries and formulate a plan that maximizes the quality so that the experience is uniquely distinctive compared to other website aesthetics.

---

## Execution Commands

```bash
# Creative direction (temp 0.7, opinionated, challenges defaults)
ollama run design-oracle "[software description + what it does + ask for UX concepts]"

# System grounding (temp 0.15, exact values, maps to existing system)
ollama run design-system-atlas "[software description + ask for tier/formation/palette/components]"

# Code implementation (temp 0.1, production TypeScript, no explanations)
ollama run elite-frontend "[specific component spec derived from oracle + atlas results]"
```

---

## Key Principles

1. **Describe the software honestly** — what it actually does, not what it aspires to do
2. **Ask models for ways to bring it to life** — not just "make a website for it"
3. **Prove against reality** — model suggestions must map to actual software capabilities
4. **Distinctive over generic** — reject any suggestion that looks like every other site
5. **Human problems first** — the frontend must serve a real need, not just look impressive
6. **Language-insufficient ideas win** — if you can explain it in a paragraph, it might not need a frontend. If you need to SHOW it, build one.

---

## Anti-Patterns

- Querying models with abstract architecture questions (produces generic output)
- Accepting model suggestions without verifying against actual software
- Building frontends for software that communicates fine as CLI/API
- Copying existing website aesthetics instead of deriving from the software's nature
- Treating model output as final instead of as raw material for human curation

---

**This document is the prompt engineering SOP for the design model pipeline.**
