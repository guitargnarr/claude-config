# React/TypeScript Error Patterns

**Updated:** February 5, 2026

---

## verbatimModuleSyntax (Vite projects)

All Vite templates use `verbatimModuleSyntax: true` in `tsconfig.app.json`. This requires separating type imports:

```tsx
// WRONG - build fails
import { useState, Component, ErrorInfo, ReactNode } from 'react';

// CORRECT
import { useState, Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
```

**Applies to:** All `import type` scenarios - interfaces, type aliases, enums used only as types.

---

## Unused Variables (noUnusedLocals)

Templates enforce `noUnusedLocals: true` and `noUnusedParameters: true`.

```tsx
// WRONG - TS6133: 'props' declared but never read
function MyComponent(props: MyProps) { return <div /> }

// CORRECT - underscore prefix for intentionally unused
function MyComponent(_props: MyProps) { return <div /> }
```

---

## Tailwind v3 vs v4

**Rule:** Use Tailwind v3 for all projects. Exception: Next.js can use v4.

| | Tailwind v3 | Tailwind v4 |
|-|-------------|-------------|
| **Directive** | `@tailwind base/components/utilities` | `@import "tailwindcss"` |
| **Config** | `tailwind.config.js` (JS) | `@theme inline {}` (CSS) |
| **PostCSS** | `tailwindcss` plugin | `@tailwindcss/postcss` plugin |
| **Font imports** | After directives (OK) | BEFORE `@import "tailwindcss"` (CRITICAL) |
| **Custom vars** | `:root {}` in `@layer base` | `@theme inline {}` after import |

**v4 font ordering (causes silent failure if wrong):**
```css
@import url('https://fonts.googleapis.com/css2?family=...'); /* FIRST */
@import "tailwindcss"; /* SECOND */
```

---

## WCAG AA Contrast

Primary teal colors on white backgrounds:

| Color | Hex | Ratio | Status |
|-------|-----|-------|--------|
| primary-500 | #14b8a6 | 3.0:1 | FAILS |
| primary-600 | #0d9488 | 4.0:1 | FAILS |
| primary-700 | #0f766e | 5.4:1 | PASSES AA |
| primary-800 | #115e59 | 7.1:1 | PASSES AAA |

**Rule:** `bg-primary-700` for buttons, `text-primary-700` for text on white. Never use `-500` or `-600` for text/buttons on light backgrounds.

---

## ARIA Gotchas

```tsx
// WRONG - role="list" requires role="listitem" children
<div role="list"><a href="...">Link</a></div>

// CORRECT - use aria-label for semantic grouping
<div aria-label="Social links"><a href="..." aria-label="Facebook">...</a></div>

// REQUIRED - icon-only buttons need labels
<button aria-label="Open menu"><Menu aria-hidden="true" /></button>

// REQUIRED - loading states
<div role="status" aria-label="Loading"><Spinner aria-hidden="true" /></div>
```

---

## Vite vs Next.js Config

**Vite:** Split config (tsconfig.json references tsconfig.app.json + tsconfig.node.json). Uses `verbatimModuleSyntax`, `noUnusedLocals`, `erasableSyntaxOnly`.

**Next.js:** Single tsconfig.json. Uses `paths` aliases (`@/*`), `moduleResolution: "bundler"`, `plugins: [{ "name": "next" }]`. No `verbatimModuleSyntax`.

---

## Common Build Failures

| Error | Cause | Fix |
|-------|-------|-----|
| `TS2307: Cannot find module` | Missing dependency or wrong path | Check `npm install`, verify import path |
| `TS6133: declared but never read` | Unused var with strict linting | Prefix with `_` or remove |
| `TS1484: type imported as value` | Missing `import type` with verbatimModuleSyntax | Separate type imports |
| `Module not found: @/components` | Path alias in Vite (not supported by default) | Use relative paths or configure `vite.config.ts` resolve.alias |
| Tailwind classes not generating | Wrong content paths in config | Check `content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]` |
| Fonts not loading (v4) | Import order wrong | Font `@import` BEFORE `@import "tailwindcss"` |

---

## Pre-Commit Quality Gate

```bash
npm run build  # Must pass - no type errors, no unused vars
# Fix ALL issues before committing. No exceptions.
```
