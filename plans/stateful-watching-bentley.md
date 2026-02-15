# Plan: Implement Risk Solutions for Three Client Demo Sites

## Context
The site differentiation report (v2) identified 4 risks with 17 total solutions across the three client demo sites: Scout Aesthetics, Morgan Pottinger McGarvey, and Pillar Financial Advisors. All three share the Tier 2 Professional template base with Three.js hero formations. This plan implements all solutions from the report.

## Sites

| Site | Dir | Hero Component | Hero File |
|------|-----|----------------|-----------|
| Scout | `~/Projects/client-sites/scout-aesthetics/` | DNAHelixBg | `src/components/DNAHelixBg.tsx` (366 lines) |
| Morgan | `~/Projects/client-sites/morgan-pottinger-mcgarvey/` | VoronoiHero | `src/components/VoronoiHero.tsx` (305 lines) |
| Pillar | `~/Projects/client-sites/pillar-financial-advisors/` | LSystemHero | `src/components/LSystemHero.tsx` (398 lines) |

## Current State
- All 3 use `import * as THREE from 'three'` (namespace import)
- All 3 have static hero imports in App.tsx (not lazy-loaded)
- All 3 use identical `eslint.config.js` (flat config, no custom rules)
- No stylelint, no Playwright tests, no CSS custom properties, no body classes
- `vite.config.ts` is minimal (just react plugin)

---

## Risk 1: Three.js Bundle Size -- 4 Solutions

### 1a. React.lazy() dynamic import (all 3 sites)
**Files:** `src/App.tsx` per site

Change static import to lazy:
```tsx
// BEFORE
import DNAHelixBg from './components/DNAHelixBg';

// AFTER
import { lazy, Suspense } from 'react';
const DNAHelixBg = lazy(() => import('./components/DNAHelixBg'));
```

Wrap usage in Suspense with gradient fallback:
```tsx
<Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800" />}>
  <DNAHelixBg />
</Suspense>
```

Note: `Suspense` is already imported in all 3 App.tsx files. Just need to add `lazy`.

### 1b. Named imports in hero components (all 3 sites)
**Files:** Each hero component `.tsx`

Replace `import * as THREE from 'three'` with explicit named imports. For each component, extract only the classes actually used. Example for DNAHelixBg:
```tsx
import { Scene, PerspectiveCamera, WebGLRenderer, Color, Fog, ... } from 'three';
```

### 1c. Subpath imports for extras (all 3 sites)
**Files:** Each hero component `.tsx`

Already correct -- all 3 sites import from `three/examples/jsm/...` subpaths. No change needed.

### 1d. Bundle size performance budget (all 3 sites)
**Files:** `vite.config.ts` per site

Add `rollup-plugin-visualizer` as a dev dependency and configure in vite:
```ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ filename: 'dist/bundle-stats.html', gzipSize: true }),
  ],
})
```

---

## Risk 2: Mobile WebGL Performance -- 5 Solutions

### 2a. Low-end device detection (all 3 hero components)
**Files:** Each hero component `.tsx`

Add early return before WebGL init:
```tsx
const isLowEnd = navigator.hardwareConcurrency <= 4 ||
                 (navigator as any).deviceMemory <= 4;
if (isLowEnd) return; // Suspense fallback gradient shows instead
```

### 2b. Frame rate throttling on mobile (all 3 hero components)
**Files:** Each hero component `.tsx`

Add frame skip logic in the animation loop:
```tsx
const isMobile = window.innerWidth < 768;
let frameCount = 0;
function animate() {
  animId = requestAnimationFrame(animate);
  if (isMobile && ++frameCount % 2 !== 0) return;
  // ... render logic
}
```

### 2c. Adaptive geometry detail (all 3 hero components)
**Files:** Each hero component `.tsx`

Reduce geometry complexity based on viewport. Site-specific:
- Scout (DNAHelixBg): Reduce helix segments / rung count on mobile
- Morgan (VoronoiHero): Reduce seed point count on mobile
- Pillar (LSystemHero): Reduce L-system iterations on mobile

### 2d. IntersectionObserver visibility pause (all 3 hero components)
**Files:** Each hero component `.tsx`

Add observer to pause render loop when hero is off-screen:
```tsx
const observer = new IntersectionObserver(([entry]) => {
  isVisible = entry.isIntersecting;
}, { threshold: 0 });
observer.observe(container);

// In animate():
if (!isVisible) return;
```

### 2e. WebGL context loss handling (all 3 hero components)
**Files:** Each hero component `.tsx`

Listen for context loss and clean up gracefully:
```tsx
renderer.domElement.addEventListener('webglcontextlost', (e) => {
  e.preventDefault();
  cancelAnimationFrame(animId);
});
```

---

## Risk 3: CSS Override Specificity -- 4 Solutions

### 3a. Body class scoping (all 3 sites)
**Files:** `index.html` + `src/index.css` per site

Add body class to each `index.html`:
- Scout: `<body class="site-scout">`
- Morgan: `<body class="site-morgan">`
- Pillar: `<body class="site-pillar">`

Prefix existing site-specific CSS overrides with body class selector for explicit scoping.

### 3b. CSS custom properties (all 3 sites)
**Files:** `src/index.css` per site

Add CSS variable block at end of each index.css:
```css
:root {
  --card-radius: 1.5rem;      /* site-specific value */
  --accent-hue: 330;          /* site-specific */
  --card-shadow: 0 20px 60px -10px rgba(236, 72, 153, 0.08);
}
```

Update editorial base classes to reference variables where overrides exist.

### 3c. Stylelint no-important rule (all 3 sites)
**Files:** `.stylelintrc.json` (CREATE) + `package.json` per site

Create minimal stylelint config:
```json
{
  "rules": {
    "declaration-no-important": true
  }
}
```

Add `stylelint` + `stylelint-config-standard` as dev dependencies.

### 3d. Override contract comment (all 3 sites)
**Files:** `src/index.css` per site

Add comment block before site-specific section documenting which properties are safe to override.

---

## Risk 4: Iframe Fallback Prevention -- 4 Solutions

### 4a. ESLint no-iframe rule (all 3 sites)
**Files:** `eslint.config.js` per site

Add `no-restricted-syntax` rule targeting JSX iframe elements in Hero files:
```js
{
  files: ['src/components/*Hero*.tsx', 'src/components/*Bg*.tsx'],
  rules: {
    'no-restricted-syntax': ['error', {
      selector: 'JSXOpeningElement[name.name="iframe"]',
      message: 'iframes cause blank hero rendering. Use Pattern C (useEffect + useRef + Three.js).'
    }]
  }
}
```

### 4b. Formation scaffold script (all 3 sites)
**Files:** `scripts/create-formation.js` (CREATE, one copy per site) + `package.json`

Create a small Node script that generates a boilerplate formation component with correct Pattern C structure. Add `"create-formation"` to package.json scripts.

### 4c. Playwright no-iframe integration test (all 3 sites)
**Files:** `tests/no-iframe.spec.ts` (CREATE) per site

Create a Playwright test that visits the site and asserts zero iframes:
```ts
test('no iframes in production build', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const iframes = await page.locator('iframe').count();
  expect(iframes).toBe(0);
});
```

Add Playwright as dev dependency, add `playwright.config.ts`.

### 4d. Inline Pattern C documentation (all 3 hero components)
**Files:** Each hero component `.tsx`

Add comment block at top of each formation component:
```tsx
/**
 * Pattern C Formation Component
 * Uses useEffect + useRef + vanilla Three.js (NOT iframe).
 * iframes cause blank/gray hero rendering failures.
 * See: formations-component.md
 */
```

---

## Execution Order

1. **Hero component upgrades** (Risk 1b, 2a-2e, 4d) -- all changes inside the 3 hero .tsx files
2. **App.tsx lazy loading** (Risk 1a) -- change import + wrap in Suspense
3. **Vite bundle budget** (Risk 1d) -- add visualizer plugin
4. **CSS solutions** (Risk 3a-3d) -- index.html body class, CSS variables, stylelint, comments
5. **ESLint iframe rule** (Risk 4a) -- update eslint.config.js
6. **Scaffold script** (Risk 4b) -- create script + package.json entry
7. **Playwright test** (Risk 4c) -- create test file + config
8. **Build + deploy + verify** all 3 sites

## Files Modified Per Site (Summary)

| File | Changes |
|------|---------|
| `src/components/[Hero].tsx` | Named imports, low-end detection, frame throttling, adaptive geometry, visibility observer, context loss handling, inline docs |
| `src/App.tsx` | `lazy()` import + Suspense wrapper for hero |
| `vite.config.ts` | Add rollup-plugin-visualizer |
| `index.html` | Add body class (site-scout/morgan/pillar) |
| `src/index.css` | CSS custom properties block, override contract comment |
| `eslint.config.js` | Add no-iframe rule for Hero/Bg files |
| `.stylelintrc.json` | CREATE -- no-important rule |
| `package.json` | Add devDeps (rollup-plugin-visualizer, stylelint), add create-formation script |
| `scripts/create-formation.js` | CREATE -- scaffold script |
| `tests/no-iframe.spec.ts` | CREATE -- Playwright iframe check |
| `playwright.config.ts` | CREATE -- minimal Playwright config |

## Verification

Per site:
```bash
npm run build          # Zero errors, check bundle stats
npm run lint           # ESLint passes with new rules
vercel --prod --yes    # Deploy
npx playwright screenshot --wait-for-timeout=5000 "URL" /tmp/[site]-verify.png
```

Final: side-by-side screenshot comparison confirms all 3 formations still render correctly after changes.
