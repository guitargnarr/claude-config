# Reusable Component: Crystalline Torus Knot (React Three Fiber)

**Created:** February 7, 2026
**Source:** ~/Projects/guitar-model-lab-ui/src/App.tsx (lines 39-99)
**Live Demo:** https://guitar-model-lab-ui.vercel.app/
**Status:** DEPLOYED, verified working

---

## What It Is

A floating crystalline torus knot rendered with `MeshTransmissionMaterial` (glass/refraction shader). Amber/gold accent color on void black. Slow sinusoidal rotation + Float wrapper for organic bobbing. Dramatic two-tone spotlighting with fog fade. Part of the Architectural Noir design system.

This is a **hero-section 3D centerpiece** -- it sits behind page content with a gradient fade-out at the bottom, creating depth without competing with text.

---

## Dependencies

```json
{
  "@react-three/fiber": "^9.5.0",
  "@react-three/drei": "^10.7.7",
  "three": "^0.182.0"
}
```

Also uses (for the full page, not just the knot):
- `tailwindcss` ^4.x (Tailwind v4 with `@theme inline`)
- `framer-motion` (page animations, not the 3D)
- Fonts: Instrument Serif (display) + DM Sans (body)

---

## Complete Component Code

### GuitarPick (Torus Knot Mesh)

```tsx
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import type { Mesh } from 'three';

function CrystallineTorusKnot() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.2}>
        <torusKnotGeometry args={[1, 0.4, 128, 32, 2, 3]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.5}
          chromaticAberration={0.3}
          distortion={0.2}
          distortionScale={0.5}
          temporalDistortion={0.1}
          ior={1.5}
          color="#c8956c"
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}
```

### Scene3D (Full Canvas Setup)

```tsx
function Scene3D() {
  return (
    <div className="absolute inset-0 canvas-fade" style={{ zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 5, 15]} />

        {/* Minimal ambient -- lets spots dominate */}
        <ambientLight intensity={0.15} />

        {/* Primary accent spot -- warm amber from upper right */}
        <spotLight
          position={[5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          color="#c8956c"
        />

        {/* Fill spot -- darker amber from lower left */}
        <spotLight
          position={[-5, -2, 3]}
          angle={0.4}
          penumbra={1}
          intensity={0.8}
          color="#4a3f35"
        />

        <Environment preset="night" />
        <CrystallineTorusKnot />
      </Canvas>
    </div>
  );
}
```

### Required CSS

```css
/* Canvas container fade -- blends 3D into page content below */
.canvas-fade::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(to top, var(--color-void), transparent);
  pointer-events: none;
  z-index: 2;
}
```

### Optional: Film Grain Overlay

```css
.noise-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}
```

---

## Geometry Parameters

```tsx
<torusKnotGeometry args={[1, 0.4, 128, 32, 2, 3]} />
```

| Arg | Value | Description |
|-----|-------|-------------|
| radius | 1 | Overall size of the knot |
| tube | 0.4 | Thickness of the tube |
| tubularSegments | 128 | Smoothness along the path |
| radialSegments | 32 | Smoothness of tube cross-section |
| p | 2 | Winding number (how many times it wraps around) |
| q | 3 | Winding number (how many times it threads through the hole) |

The (2,3) torus knot is a **trefoil knot** -- the simplest non-trivial knot. Visually complex but mathematically elegant.

---

## Material: MeshTransmissionMaterial

This is the key to the "crystalline glass" look. It's a drei shader that simulates light transmission through a refractive solid.

| Property | Value | Effect |
|----------|-------|--------|
| `backside` | true | Renders inner surface for refraction depth |
| `samples` | 6 | Transmission quality (higher = sharper, slower) |
| `thickness` | 0.5 | Apparent thickness of the glass |
| `chromaticAberration` | 0.3 | Rainbow edge dispersion |
| `distortion` | 0.2 | Surface distortion amount |
| `distortionScale` | 0.5 | Scale of distortion noise |
| `temporalDistortion` | 0.1 | Animated distortion (shimmer) |
| `ior` | 1.5 | Index of refraction (1.5 = glass) |
| `color` | #c8956c | Amber/gold tint |
| `roughness` | 0.1 | Near-mirror polish |

---

## Animation

### Float Wrapper (drei)
```tsx
<Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
```
- Gentle vertical bobbing (floatIntensity 0.5)
- Subtle random rotation wobble (rotationIntensity 0.3)
- Moderate cycle speed (1.5)

### Sinusoidal Rotation (useFrame)
```tsx
meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.2;
```
- Y-axis: slow pendulum swing, +/- 17 degrees
- X-axis: slower nodding, +/- 11 degrees
- Combined with Float creates an organic, living feel

---

## Lighting Setup

The dramatic look comes from the two-tone spotlight arrangement:

| Light | Position | Color | Intensity | Role |
|-------|----------|-------|-----------|------|
| Ambient | everywhere | white | 0.15 | Barely-there base fill |
| Spot 1 | [5, 5, 5] | #c8956c (amber) | 2.0 | Hero light -- top right |
| Spot 2 | [-5, -2, 3] | #4a3f35 (dark amber) | 0.8 | Fill -- bottom left |
| Environment | "night" preset | HDR | - | Subtle reflections |
| Fog | z: 5-15 | #050505 | - | Depth fade to void |

The key principle: **one dominant accent-colored light + one darker fill from the opposite side**. The ambient is deliberately dim so the spots create strong contrast on the refractive surfaces.

---

## Color Palette (Architectural Noir)

```css
--color-void: #050505;           /* Background */
--color-surface: #0a0a0a;        /* Cards, elevated */
--color-border: #1a1a1a;         /* Subtle borders */
--color-text-primary: #f5f0eb;   /* Warm white (not pure #fff) */
--color-text-secondary: #8a8580; /* Body text */
--color-text-muted: #4a4540;     /* Labels */
--color-accent: #c8956c;         /* THE accent (amber/gold) */
--color-accent-bright: #e8b08a;  /* Lighter amber */
--color-accent-glow: rgba(200, 149, 108, 0.15); /* Glow/shadow */
```

---

## Customization Points

| Parameter | Where | Default | Notes |
|-----------|-------|---------|-------|
| Accent color | material `color` + spot `color` | #c8956c | Change both to match brand |
| Geometry | torusKnotGeometry args | [1, 0.4, 128, 32, 2, 3] | Try (3,2) or (3,5) for different knots |
| Scale | mesh `scale` | 1.2 | Increase for hero, decrease for widget |
| Camera distance | Canvas camera position z | 5 | Pull back for wider container |
| FOV | Canvas camera fov | 45 | Narrow FOV = more dramatic |
| Float speed | Float `speed` | 1.5 | 0 to disable bobbing |
| Rotation amplitude | useFrame sin/cos multiplier | 0.3 / 0.2 | 0 to disable rotation |
| Fog range | fog args | [5, 15] | Tighter = more atmospheric |
| Samples | MeshTransmissionMaterial | 6 | 4 for mobile, 8 for high-end |
| Fade height | canvas-fade::after height | 120px | 0 for no fade |

### Alternative Geometries (Drop-in Replacement)

```tsx
// Icosahedron (crystal ball)
<icosahedronGeometry args={[1.2, 1]} />

// Dodecahedron (D12 die)
<dodecahedronGeometry args={[1.2, 0]} />

// Custom knot variations
<torusKnotGeometry args={[1, 0.3, 128, 32, 3, 2]} />  // Inverted trefoil
<torusKnotGeometry args={[1, 0.3, 128, 32, 3, 5]} />  // Cinquefoil knot
<torusKnotGeometry args={[1, 0.35, 128, 32, 5, 3]} /> // Solomon's seal
```

### Alternative Color Themes

```tsx
// Teal/Cyan (brand secondary)
color="#14b8a6"
// Spot 1: color="#14b8a6", Spot 2: color="#0a4a45"

// Rose Gold (luxury)
color="#c9a0a0"
// Spot 1: color="#c9a0a0", Spot 2: color="#5a3535"

// Ice Blue (tech)
color="#7aa5c9"
// Spot 1: color="#7aa5c9", Spot 2: color="#2a3a5a"

// Emerald (finance/nature)
color="#6cc89a"
// Spot 1: color="#6cc89a", Spot 2: color="#2a5a3c"
```

---

## Integration Patterns

### Pattern A: Hero Section Background (Current Usage)

```tsx
<section className="relative min-h-[50vh]">
  <Scene3D />  {/* Absolute positioned, z-index 0 */}
  <div className="relative z-10 text-center pt-20">
    <h1>Your Title Here</h1>
    <p>Subtitle text</p>
  </div>
</section>
```

### Pattern B: Standalone Card Widget

```tsx
<div className="w-80 h-80 rounded-2xl overflow-hidden border border-[#1a1a1a]">
  <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
    <color attach="background" args={['#050505']} />
    <ambientLight intensity={0.15} />
    <spotLight position={[5, 5, 5]} color="#c8956c" intensity={2} />
    <Environment preset="night" />
    <CrystallineTorusKnot />
  </Canvas>
</div>
```

### Pattern C: Full-Viewport Background

```tsx
<div className="fixed inset-0 -z-10">
  <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
    {/* Same scene setup */}
  </Canvas>
</div>
```

### Pattern D: Responsive with Lazy Loading

```tsx
import { lazy, Suspense } from 'react';

const Scene3D = lazy(() => import('./Scene3D'));

function Hero() {
  return (
    <section className="relative min-h-[50vh]">
      <Suspense fallback={<div className="absolute inset-0 bg-[#050505]" />}>
        <Scene3D />
      </Suspense>
      <div className="relative z-10">...</div>
    </section>
  );
}
```

---

## Performance Notes

- `MeshTransmissionMaterial` is GPU-intensive (multi-pass rendering)
- `samples={6}` is a good balance; use 4 on mobile, 8 on high-end desktop
- The `Environment` preset loads an HDR cubemap (~200KB)
- Fog helps mask lower geometry detail at distance
- Consider `frameloop="demand"` if the 3D is below the fold / not always visible

### Mobile Considerations

- Works on iOS Safari (WebGL2 path through Three.js, no raw WebGPU)
- Three.js handles the WebGL abstraction -- no iOS-specific workarounds needed
- Reduce `samples` to 4 and `tubularSegments` to 64 for mobile if needed
- The Float animation and useFrame rotation are very cheap (no physics)

---

## Best Use Cases for Client Sites

| Business Type | Integration | Color Suggestion |
|---------------|-------------|-----------------|
| Luxury retail (jewelry, watches) | Hero section | Amber/gold (#c8956c) |
| Med spa / aesthetics | Hero or card | Rose gold (#c9a0a0) |
| Tech / SaaS | Full-viewport bg | Ice blue (#7aa5c9) or teal (#14b8a6) |
| Law firm | Hero section | Muted gold (#a0865c) |
| Fine dining | Hero or about page | Warm amber (#c8956c) |
| Creative agency | Portfolio hero | Match brand accent |
| Music / entertainment | Hero section | Amber (proven with Guitar Model Lab) |

---

## Quick Start: Add to Existing Vite + React Project

```bash
# 1. Install deps
npm install @react-three/fiber @react-three/drei three
npm install -D @types/three

# 2. Copy the component (just the two functions above)
# 3. Add canvas-fade CSS class
# 4. Add noise-overlay div to layout (optional)
# 5. Render <Scene3D /> in your hero section
# 6. Customize color to match brand
```

---

## Related

- **Elite Frontend Playbook:** @~/.claude/skills/frontend-design/ELITE_FRONTEND_PLAYBOOK.md (origin of this pattern)
- **Entropy Particle Viz:** @~/.claude/reference/entropy-viz-component.md (vanilla JS alternative, no React)
- **Tier Templates:** @~/.claude/reference/tier-templates-reference.md
- **Portfolio Website (Quest):** ~/Projects/portfolio-website (original Architectural Noir implementation)

---

**Verified working on:** Desktop Chrome, Safari, Firefox, iOS Safari (via Three.js WebGL2)
