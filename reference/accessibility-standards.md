# Portfolio Accessibility Standards

**Created:** 2026-01-01
**Status:** Verified across 9 portfolio URLs
**Standard:** WCAG 2 AA compliance

---

## Color Contrast Requirements

### The Problem
Tailwind's default `teal-500` (#14b8a6) fails WCAG 2 AA contrast requirements when used with white text. This caused accessibility violations across multiple portfolio sites.

### The Solution
Use `teal-700` (#0f766e) instead of `teal-500` for backgrounds with white text.

| Color | Hex | With White Text | Status |
|-------|-----|-----------------|--------|
| teal-500 | #14b8a6 | 3.2:1 | FAIL (needs 4.5:1) |
| teal-600 | #0d9488 | 3.8:1 | FAIL |
| teal-700 | #0f766e | 4.8:1 | PASS |

### Tailwind Pattern

```jsx
// BAD - fails contrast
<button className="bg-teal-500 text-white">Submit</button>

// GOOD - passes contrast
<button className="bg-teal-700 hover:bg-teal-600 text-white">Submit</button>
```

---

## Touch Target Requirements

### Minimum Size
All interactive elements must be at least 44x44 pixels on mobile.

### Tailwind Pattern

```jsx
// BAD - too small
<a href="..." className="text-sm">Click here</a>

// GOOD - meets 44px minimum
<a href="..." className="min-h-[44px] flex items-center px-4">Click here</a>

// GOOD - icon buttons
<a href="..." className="w-11 h-11 flex items-center justify-center">
  <Icon className="w-6 h-6" />
</a>
```

---

## Gradient Background Fix

### The Problem
Axe-core detects blended/computed colors when elements are on gradient backgrounds. Even with correct static colors, the computed color may fail contrast.

### The Solution
Use explicit hex colors with full opacity for cards on gradients:

```jsx
// BAD - may compute to blended color on gradient
<div className="dark:bg-slate-800 dark:text-slate-300">

// GOOD - explicit colors, maximum contrast
<div className="dark:bg-[#0f172a] dark:text-white">
```

---

## Sites Verified (2026-01-01)

All 9 portfolio URLs pass axe-core with 0 violations:

| URL | Status |
|-----|--------|
| https://projectlavos.com | PASS |
| https://guitar.projectlavos.com | PASS |
| https://resume.projectlavos.com | PASS |
| https://ba-pathfinder.vercel.app | PASS |
| https://ourjourney-app.vercel.app | PASS |
| https://phishguard-ui.vercel.app | PASS |
| https://projectlavos.com/projects | PASS |
| https://projectlavos.com/skills | PASS |
| https://projectlavos.com/contact | PASS |

---

## Testing Commands

```bash
# Test single URL
npx @axe-core/cli https://your-site.com --exit

# Test multiple URLs
for url in projectlavos.com guitar.projectlavos.com resume.projectlavos.com; do
  echo "Testing $url..."
  npx @axe-core/cli "https://$url" --exit
done
```

---

## Component Checklist

Before deploying any component:

- [ ] Buttons with colored backgrounds use teal-700 (not teal-500)
- [ ] All links/buttons are at least 44x44px on mobile
- [ ] Cards on gradient backgrounds use explicit hex colors
- [ ] Form labels are associated with inputs
- [ ] Images have alt text
- [ ] Focus states are visible

---

## Fixes Applied (2026-01-01)

### phishguard-ui
- ContactForm button: `bg-teal-500` → `bg-teal-700`

### ourjourney-app
- Login button: `#14b8a6` → `#0f766e`
- Tab active state: `#14b8a6` → `#0f766e`

### interactive-resume
- Card background: `dark:bg-slate-800` → `dark:bg-[#0f172a]`
- Text color: `dark:text-slate-300` → `dark:text-white`
- Email link: Added `min-h-[44px]`
- Social icons: Added `w-11 h-11` (44px)

### main-site (projectlavos.com)
- All project cards: Updated for contrast compliance
- Navigation links: Verified touch targets

---

## Brand Colors (Updated)

```css
/* Primary - Use teal-700 for backgrounds with white text */
--teal-700: #0f766e;    /* Buttons, CTAs */
--teal-600: #0d9488;    /* Hover states */
--teal-500: #14b8a6;    /* Accents only (no white text) */
--teal-400: #2dd4bf;    /* Decorative */

/* Secondary */
--orange-500: #f97316;  /* Highlights */
--orange-400: #fb923c;  /* Hover */

/* Backgrounds */
--slate-900: #0f172a;   /* Dark mode base */
--slate-800: #1e293b;   /* Cards (avoid on gradients) */
```

---

**Maintenance:** Run axe tests after any UI changes to buttons, links, or color schemes.
