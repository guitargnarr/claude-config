# Plan: Upgrade 3 Client Sites to Elite Tier with 3D Heroes

## Overview
Upgrade scout-aesthetics, morgan-pottinger-mcgarvey, and pillar-financial-advisors from basic tier templates to elite-tier sites with React Three Fiber 3D heroes, Architectural Noir aesthetic, glass-morphism cards, film grain overlay, and alternating dark/light sections.

**Reference implementation:** ~/Projects/client-sites/full-tilt-gym (proven working, deployed)

## Execution Order
1. **Pillar Financial Advisors** (hardest - needs font change + emerald color scheme)
2. **Scout Aesthetics** (rose gold color scheme, med spa)
3. **Morgan Pottinger McGarvey** (amber color scheme, law firm)

## Per-Site Changes (same pattern for all 3)

### Step 1: Install Three.js dependencies
```bash
npm install @react-three/fiber @react-three/drei three
npm install -D @types/three
```

### Step 2: Edit package.json
- Verify deps added correctly

### Step 3: Edit src/index.css
- Add CSS variables (--color-void, --color-surface, --color-accent, etc.)
- Add noise-overlay class
- Add canvas-fade::after gradient
- Add glass-card styles
- Add energyPulse keyframe animation
- Update font imports per site

### Step 4: Edit index.html
- Add noise overlay div before closing body tag

### Step 5: Edit src/App.tsx (major changes)
- Add Three.js imports (Canvas, useFrame, Float, MeshTransmissionMaterial, Environment, type Mesh)
- Add 3D hero components: CrystallineShape + HeroScene
- Rewrite hero section: min-h-screen, 3D canvas background, large serif typography, gradient fade
- Update header: transparent bg with backdrop-blur on scroll
- Alternate section backgrounds (dark/light rhythm)
- Each site gets unique color + geometry

### Step 6: Build, deploy, verify
```bash
npm run build && vercel --prod --yes
node /tmp/scroll-screenshot.js "https://SLUG.vercel.app" /tmp/SLUG-elite.png
```

## Color Schemes & Geometry

| Site | Accent Color | Hex | Geometry | Knot Args |
|------|-------------|-----|----------|-----------|
| Pillar Financial | Emerald | #6cc89a | torusKnot (2,3) trefoil | [1, 0.4, 128, 32, 2, 3] |
| Scout Aesthetics | Rose Gold | #c9a0a0 | torusKnot (3,5) cinquefoil | [1, 0.35, 128, 32, 3, 5] |
| Morgan Pottinger | Amber | #c8956c | torusKnot (5,3) star | [1, 0.38, 128, 32, 5, 3] |

## Fonts

| Site | Display Font | Body Font | Change Needed? |
|------|-------------|-----------|----------------|
| Pillar Financial | Instrument Serif | DM Sans | YES (currently Inter only) |
| Scout Aesthetics | Playfair Display | Inter | Keep existing |
| Morgan Pottinger | Playfair Display | Inter | Keep existing |

## Risk Mitigation
- Build locally before deploying (catch TypeScript errors)
- Use verbatimModuleSyntax-safe imports: `import type { Mesh } from 'three'`
- Keep all existing functionality (auth, dashboard, cart, etc.) - only upgrade visual layer
- Test with scroll-screenshot.js to catch IntersectionObserver blank areas

## Estimated Time
~20-30 min per site, ~60-90 min total
