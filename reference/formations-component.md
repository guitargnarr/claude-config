# Reusable Component: Three.js Formations (9 Interactive 3D Animations)

**Created:** February 7, 2026
**Updated:** February 9, 2026
**Source:** ~/Projects/texume/output/formations/
**Status:** Standalone: LOCAL (served via `python3 -m http.server 8877`). React integration: 3 client sites deployed via Vercel.
**Catalog:** ~/Projects/texume/output/formations/FORMATIONS_CATALOG.md

---

## What They Are

Nine standalone Three.js interactive 3D animations in the Architectural Noir aesthetic. Each is a single HTML file -- no React, no build step, no bundler. Glass materials (MeshPhysicalMaterial with transmission), UnrealBloomPass post-processing, OrbitControls, 5 switchable color palettes, and ambient dust particles. Designed as hero sections, section backgrounds, or standalone showpieces.

---

## File Inventory (9 files, ~7,700 LOC total)

| # | File | Lines | Geometry | Concept |
|---|------|-------|----------|---------|
| 01 | `torus_knot.html` | 729 | Parametric knot variants | Parametric beauty, math elegance |
| 02 | `lorenz_attractor.html` | 859 | ODE-traced butterfly curve | Chaos theory, butterfly effect |
| 03 | `orbital_system.html` | 795 | N-body sphere hierarchy | Microservice architecture, deployment map |
| 04 | `dna_helix.html` | 836 | Double parametric spiral | Paired systems, pub/sub, CI/CD |
| 05 | `voronoi_tessellation.html` | 808 | Half-space clipped cells | Domain boundaries, ownership zones |
| 06 | `governance_cascade.html` | 1216 | Cascading particle layers | Config flow, pipeline stages |
| 07 | `neural_mesh.html` | 847 | Layered directed graph | Neural networks, ML pipelines |
| 08 | `lsystem_tree.html` | 832 | Recursive branching | File systems, component hierarchy |
| 09 | `mobius_strip.html` | 807 | Non-orientable surfaces | Feedback loops, CI/CD cycles |

---

## Dependencies

```html
<!-- All formations use ES module import maps from CDN -->
<script type="importmap">
{
    "imports": {
        "three": "https://unpkg.com/three@0.162.0/build/three.module.js",
        "three/addons/": "https://unpkg.com/three@0.162.0/examples/jsm/"
    }
}
</script>
```

**Modules used:**
- `three` (core)
- `three/addons/controls/OrbitControls.js`
- `three/addons/postprocessing/EffectComposer.js`
- `three/addons/postprocessing/RenderPass.js`
- `three/addons/postprocessing/UnrealBloomPass.js`
- `three/addons/geometries/ConvexGeometry.js` (Voronoi only)
- `three/addons/geometries/ParametricGeometry.js` (Mobius only)

**Fonts:** Instrument Serif (display) + DM Sans (body) via Google Fonts

**Server required:** Must serve over HTTP (not file://). Use `python3 -m http.server 8877`.

---

## Rendering Stack (Shared Across All 9)

| Component | Technology | Settings |
|-----------|-----------|----------|
| Engine | Three.js r162 (ES modules from CDN) | No React, no build step |
| Material | MeshPhysicalMaterial (transmission glass) | envMapIntensity: 3.0, ior: 1.6, iridescence: 0.5 |
| Post-processing | UnrealBloomPass | strength: 0.8, radius: 0.5, threshold: 0.7 |
| Controls | OrbitControls | Auto-rotate 0.4-0.8, damping, zoom limits |
| Particles | InstancedMesh (SphereGeometry) | 60-80 orbital dust motes |
| Tone mapping | ACES Filmic | Exposure: 1.5-1.6 |
| Environment | Procedural CubeCamera (512px) | Gradient sky + hotspot lights for refraction |
| Renderer | WebGLRenderer | antialias, pixelRatio capped at 2 |

---

## Color Palettes (5 Standard, All Formations)

| Name | Base | Bright | Spot 1 (Key) | Spot 2 (Fill) |
|------|------|--------|-------------|-------------|
| amber | #c8956c | #e8b08a | #c8956c | #4a3f35 |
| teal | #14b8a6 | #5eead4 | #14b8a6 | #0a4a45 |
| violet | #a78bfa | #c4b5fd | #a78bfa | #3b2870 |
| rose | #f43f5e | #fb7185 | #f43f5e | #5c1525 |
| bone | #d4cfc8 | #f5f0eb | #d4cfc8 | #3a3835 |

Palette switching updates: material color, sheen color, wireframe color, key/fill lights, dust particles. All formations share the same `setColor(name)` API pattern.

---

## CSS Variables (Architectural Noir)

```css
:root {
    --void: #050505;
    --surface: #0a0a0a;
    --border: #1a1a1a;
    --border-hover: #2a2a2a;
    --text-primary: #f5f0eb;
    --text-secondary: #8a8580;
    --text-muted: #4a4540;
    --accent: #c8956c;
    --accent-bright: #e8b08a;
    --accent-glow: rgba(200, 149, 108, 0.15);
}
```

---

## Shared UI Pattern

Every formation includes:
- **Title overlay** (top center): Eyebrow label + serif heading with italic accent word
- **Stats bar** (above controls): Vertex count, formation-specific metric, FPS counter
- **Controls panel** (bottom center): Glass-morphism bar with variant buttons, color chips, toggles
- **Film grain overlay**: SVG feTurbulence noise at 2.5% opacity
- **Edge fades**: Top + bottom gradient fades to void black

### Shared Animations
- `fadeSlideDown` (title): 1.2s ease, 0.3s delay
- `fadeSlideUp` (controls/stats): 0.8s ease, 1.0-1.4s delay
- Staggered entrance creates a cinematic reveal sequence

---

## Per-Formation Details

### Formation 01: Torus Knot

**Variants:** 5 knot types -- (3,2) trefoil, (5,2) pentagonal, (5,3) star, (7,3) braid, (8,5) extreme
**Material:** MeshPhysicalMaterial with transmission 0.9, iridescence 0.5, sheen 0.8
**Controls:** Knot variant buttons, color chips, wireframe toggle
**Animation:** Breathing scale, tilt oscillation, auto-rotate, 80 dust particles
**Unique:** Procedural environment map with ShaderMaterial sky sphere + hotspot lights for rich glass refraction

### Formation 02: Lorenz Attractor

**Variants:** Classic (sigma=10, rho=28), Tight, Wide, Chaotic (rho=99.96), Calm
**Geometry:** 12,000 ODE steps -> CatmullRomCurve3 (1,200 samples) -> TubeGeometry glass tube
**Controls:** Variant buttons, color chips, orbit toggle, wireframe toggle, parameter display sidebar
**Unique:** 6 runner particles race along the curve with 3-layer orbs (core + mid + additive halo) and 20-dot trailing particles

### Formation 03: Orbital System

**Layouts:** Microservices (real deployment data), Solar System, K8s Cluster
**Geometry:** Central glass hub + orbiting service nodes + satellite sub-orbits + connection beams
**Controls:** Layout buttons, color chips, orbit/links/rings toggles, system info sidebar
**Unique:** Uses actual projectlavos.com deployment data (8 real APIs as orbital nodes)

### Formation 04: DNA Helix

**Variants:** B-DNA (classic), Z-DNA (zigzag), Wide, Tight, Unzipped (separated strands)
**Geometry:** Two TubeGeometry glass strands + CylinderGeometry base pair rungs + junction spheres
**Controls:** Variant buttons, color chips, wireframe toggle, orbit toggle, rungs toggle
**Unique:** 8 bidirectional runner packets (4 per strand) with 12-dot color-matched trails

### Formation 05: Voronoi Tessellation

**Layouts:** Organic (16 random seeds), Crystal (perturbed BCC), Lattice (3x3x3 grid), Cluster, Shell
**Geometry:** ConvexGeometry from half-space clipping + EdgesGeometry edge network + 3-layer seed orbs
**Controls:** Layout buttons, color chips, wireframe toggle, orbit toggle, faces toggle
**Unique:** Custom half-space Voronoi algorithm (no Delaunay library), pulsing edge opacity wave

### Formation 06: Governance Cascade

**Concept:** Config flows through 4 processing layers -- orbs spawn, fall, pause at each layer, settle as glass artifacts
**Layers:** Directives (15) -> Skills (14) -> Commands (12) -> Artifacts (13) using real CLAUDE.md data
**Controls:** Speed (1x/2x/Slow), color chips, orbit toggle, burst button
**Unique:** Particle lifecycle with smoothstep color transitions, ring flash/ripple on contact, settled artifacts as random glass geometries. Largest formation at 1,216 lines.

### Formation 07: Neural Mesh

**Architectures:** Dense (4-8-12-8-4), Sparse (40% pruned), Deep (8 layers), Wide (16-node hidden), Skip (residual connections)
**Geometry:** Glass sphere nodes + LineBasicMaterial weighted edges + QuadraticBezierCurve3 skip connections
**Controls:** Architecture buttons, color chips, wireframe toggle, orbit toggle, fire button
**Unique:** Activation pulse cascade -- orbs race along edges with 70% probability to spawn new pulses at destination nodes. Auto-spawn every 2.5 seconds.

### Formation 08: L-System Tree

**Systems:** Binary (fork), Ternary (3-way), Stochastic (random), Bush (4-way), Fern (spiral)
**Geometry:** Tapered CylinderGeometry branches (radius * 0.7^depth) + glass junction spheres + leaf orbs
**Controls:** System buttons, color chips, wireframe toggle, orbit toggle, leaves toggle
**Unique:** 3D turtle with pitch/roll jitter for natural asymmetry, auto-centering camera fit

### Formation 09: Mobius Strip

**Variants:** Half-Twist (classic), Full-Twist, Trefoil (1.5 twists), Figure-8 (pinched), Klein (bottle immersion)
**Geometry:** ParametricGeometry for mathematical surfaces + edge lines (1 or 2 depending on twist parity)
**Controls:** Variant buttons, color chips, wireframe toggle, orbit toggle, edges toggle
**Unique:** Klein bottle figure-8 immersion (self-intersecting closed surface), runners trace continuous surface

---

## Critical Technical Lessons

| Lesson | Formation | Detail |
|--------|-----------|--------|
| Glass needs rich environments | All | Flat black background = invisible glass. Procedural env map with bright hotspots required |
| Glow-to-glass ratio: 1.4-1.5x | Orbital | Halos at 2.0x swallow glass; 1.4x provides atmosphere while glass stays hero |
| Minimum tube radius for glass: 0.22 | DNA Helix | 0.08r tube = invisible wisp; 0.28r = solid architectural glass |
| Leaf glow density: opacity < 0.04 when count > 200 | L-System | 510 leaves at 0.06 opacity = opaque fog cloud |
| Edge visibility: baseline 0.15 opacity | Neural Mesh | Edges at 0.08 = floating disconnected spheres |
| Reserve transmission for hero objects | Governance | Glass discs with transmission = 4 FPS; MeshBasicMaterial flat circles = 3x improvement |
| Voronoi vertex cap: 60 per cell | Voronoi | Uncapped O(n^2) edge intersections crash page |
| Runner orb ratio: core:mid:halo = 1:2.4:4.4 | Mobius | Halos > 37% of surface width dominate the surface |
| **NEVER Object.assign position** | Neural, Orbital | `Object.assign(new THREE.PointLight(...), { position: ... })` crashes at runtime. Use `light.position.set(x,y,z)` |

---

## Common JavaScript API Pattern

All formations expose these window functions for interactive controls:

```javascript
// Shared across all formations
window.setColor = function(name) { ... }       // 'amber', 'teal', 'violet', 'rose', 'bone'
window.toggleWireframe = function() { ... }     // Toggle wireframe overlay
window.toggleOrbit = function() { ... }         // Toggle auto-rotation (most formations)

// Per-formation variant switcher (name varies)
window.setKnot(p, q)          // Formation 01
window.setVariant(name)       // Formations 02, 09
window.setLayout(name)        // Formations 03, 05
window.setSystem(name)        // Formation 08
window.setArch(name)          // Formation 07
window.setSpeed(name)         // Formation 06
```

---

## Procedural Environment Map (Reusable Pattern)

All formations generate their own environment with this pattern -- critical for glass refraction:

```javascript
const envScene = new THREE.Scene();
const envRT = new THREE.WebGLCubeRenderTarget(512, {
    format: THREE.RGBAFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
});
const envCamera = new THREE.CubeCamera(0.1, 100, envRT);

// Sky sphere with gradient + hotspots (ShaderMaterial)
const envGeo = new THREE.SphereGeometry(50, 64, 64);
const envMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    uniforms: {
        colorTop: { value: new THREE.Color('#2a1f18') },
        colorMid: { value: new THREE.Color('#3d2e22') },
        colorBot: { value: new THREE.Color('#1a1510') },
        colorAccent: { value: new THREE.Color('#c8956c') },
    },
    // Gradient + directional hotspots + horizon glow
    // (see torus_knot.html lines 552-596 for full shader)
});
envScene.add(new THREE.Mesh(envGeo, envMat));

// Bright point lights for sharp glass reflections
envScene.add(new THREE.PointLight(0xc8956c, 5, 80));

envCamera.update(renderer, envScene);
scene.environment = envRT.texture;
```

---

## 3-Layer Runner Orb Pattern (Reusable)

Used in Lorenz, DNA Helix, Governance, Neural Mesh, Mobius:

```javascript
function createRunner(palette, index) {
    const group = new THREE.Group();
    group.renderOrder = 100;

    // Hot core (opaque white point)
    const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0xfff5eb })
    );
    core.renderOrder = 102;
    group.add(core);

    // Colored mid
    const mid = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 10, 10),
        new THREE.MeshBasicMaterial({
            color: new THREE.Color(palette.bright),
            transparent: true, opacity: 0.5, depthWrite: false,
        })
    );
    mid.renderOrder = 101;
    group.add(mid);

    // Additive halo
    const halo = new THREE.Mesh(
        new THREE.SphereGeometry(0.28, 10, 10),
        new THREE.MeshBasicMaterial({
            color: new THREE.Color(palette.bright),
            transparent: true, opacity: 0.06,
            blending: THREE.AdditiveBlending, depthWrite: false,
        })
    );
    halo.renderOrder = 99;
    group.add(halo);

    return { group, core, mid, halo, t: index / total, speed: 0.015 };
}
```

---

## Ambient Dust Pattern (Reusable)

```javascript
const DUST_COUNT = 80;
const dustDummy = new THREE.Object3D();
const dustMesh = new THREE.InstancedMesh(
    new THREE.SphereGeometry(1, 6, 6),
    new THREE.MeshBasicMaterial({ color: palette.bright, transparent: true, opacity: 0.7 }),
    DUST_COUNT
);

const dustOrbits = Array.from({ length: DUST_COUNT }, () => ({
    angle: Math.random() * Math.PI * 2,
    radius: 2.5 + Math.random() * 2.5,
    height: (Math.random() - 0.5) * 3,
    speed: 0.03 + Math.random() * 0.07,
    size: 0.01 + Math.random() * 0.02,
    phaseY: Math.random() * Math.PI * 2,
    phaseR: Math.random() * Math.PI * 2,
}));

function updateDust(t) {
    for (let i = 0; i < DUST_COUNT; i++) {
        const d = dustOrbits[i];
        const a = d.angle + t * d.speed;
        const r = d.radius + Math.sin(t * 0.3 + d.phaseR) * 0.25;
        dustDummy.position.set(Math.cos(a) * r, d.height + Math.sin(t * 0.5 + d.phaseY) * 0.35, Math.sin(a) * r);
        dustDummy.scale.setScalar(d.size);
        dustDummy.updateMatrix();
        dustMesh.setMatrixAt(i, dustDummy.matrix);
    }
    dustMesh.instanceMatrix.needsUpdate = true;
}
```

---

## Integration Patterns

### Pattern A: Standalone Full-Page (Current Usage)

```bash
cd ~/Projects/texume/output/formations
python3 -m http.server 8877
open http://localhost:8877/torus_knot.html
```

### Pattern B: Embed in Existing Page (iframe) -- FAILED

**WARNING:** iframe embedding causes rendering failures in production. The 3D canvas renders as blank/gray in Vite+React apps. Tested Feb 2026 with Voronoi and L-System formations -- both failed to render in iframe. **Use Pattern C instead.**

```html
<!-- DO NOT USE - kept for historical reference -->
<section style="position: relative; height: 70vh;">
    <iframe src="/formations/torus_knot.html"
        style="position: absolute; inset: 0; width: 100%; height: 100%; border: none;"
        loading="lazy"></iframe>
</section>
```

### Pattern C: useEffect + Vanilla Three.js Component (PROVEN -- Use This)

Port the formation's Three.js code into a React component using `useEffect` + `useRef`. Install `three` via npm (not CDN import maps). The full scene setup, animation loop, and cleanup run inside useEffect.

**Dependencies:** `npm install three @types/three`

**Proven implementations:**
- `morgan-pottinger-mcgarvey/src/components/VoronoiHero.tsx` (~240 lines, Voronoi tessellation)
- `pillar-financial-advisors/src/components/LSystemHero.tsx` (~290 lines, L-System tree)

**Pattern:**

```tsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export default function FormationHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // 1. Scene, camera, renderer
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#050505');
        scene.fog = new THREE.Fog('#050505', 18, 45);
        const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 200);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.domElement.style.pointerEvents = 'none'; // Let touch events pass through
        container.appendChild(renderer.domElement);

        // 2. Post-processing (bloom)
        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        composer.addPass(new UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 0.8, 0.5, 0.7));

        // 3. Manual camera orbit (DO NOT use OrbitControls -- hijacks mobile scroll)
        const orbitRadius = 18;
        let cameraAngle = 0;
        camera.position.set(0, 2, orbitRadius);

        // 4. Procedural env map (CRITICAL for glass refraction)
        // ... (see VoronoiHero.tsx or LSystemHero.tsx for full implementation)

        // 5. Build formation geometry + materials
        // 6. Ambient dust (InstancedMesh, 60-80 particles)
        // 7. Animation loop
        let prev = performance.now();
        function animate() {
            animationId = requestAnimationFrame(animate);
            const now = performance.now();
            const dt = (now - prev) / 1000;
            prev = now;
            cameraAngle += dt * 0.1;
            camera.position.x = Math.sin(cameraAngle) * orbitRadius;
            camera.position.z = Math.cos(cameraAngle) * orbitRadius;
            camera.lookAt(0, 0, 0);
            composer.render();
        }
        let animationId = requestAnimationFrame(animate);

        // 8. Resize handler
        function onResize() { /* update camera aspect, renderer size, composer size */ }
        window.addEventListener('resize', onResize);

        // 9. Cleanup
        return () => {
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(animationId);
            renderer.dispose();
            if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={containerRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
}
```

**Key differences from standalone HTML formations:**
- Import `three` from npm package, not CDN import map
- Import paths use `three/examples/jsm/...` (with `.js` extension)
- No UI controls panel, stats bar, or title overlay (hero background only)
- **NO OrbitControls** -- use manual sin/cos camera orbit (OrbitControls hijacks mobile scroll even with all interaction disabled)
- `pointer-events: none` on canvas and container for mobile scroll pass-through
- Only `canUseWebGL()` guard -- no mobile width bypass or `isLowEnd` device checks
- Cleanup function disposes renderer and removes canvas from DOM

### Pattern D: Deploy as Static Site

```bash
# Copy formations to a new Vercel project
mkdir formations-gallery && cd formations-gallery
cp ~/Projects/texume/output/formations/*.html .
echo '{}' > package.json  # Vercel needs this
vercel --prod --yes
```

---

## Best Use Cases for Client Sites

| Business Type | Formation | Why |
|---------------|-----------|-----|
| Tech/SaaS | Neural Mesh, Orbital System | Network/architecture metaphor |
| Healthcare | DNA Helix | Biological precision, science credibility |
| Data/Analytics | Lorenz Attractor, Voronoi | Chaos-to-order, domain boundaries |
| Creative Agency | Torus Knot, Mobius Strip | Mathematical beauty, infinite creativity |
| Finance | L-System Tree, Voronoi | Growth structures, market segmentation |
| Cybersecurity | Governance Cascade, Neural Mesh | Pipeline flow, threat detection |
| Law/Consulting | Voronoi, Orbital System | Jurisdictions, org structure |
| Education | Any | Interactive science demonstrations |
| CI/CD Tools | Mobius Strip, Governance Cascade | Continuous loops, pipeline stages |

---

## Performance Notes

- All formations target 60 FPS on desktop
- MeshPhysicalMaterial with transmission is GPU-intensive -- limit to 1-2 hero objects per scene
- InstancedMesh dust particles are very cheap (single draw call)
- UnrealBloomPass adds ~2ms per frame
- Governance Cascade (1,216 lines) is the most complex -- settled glass artifacts accumulate GPU load
- Pixel ratio capped at 2 to prevent 4K/Retina performance issues
- Import map CDN loads add ~200ms on first visit (cached after)

---

## Quick Start: Add Formation to Existing Project

```bash
# 1. Copy desired formation(s)
cp ~/Projects/texume/output/formations/torus_knot.html your-project/public/

# 2. Serve (if standalone)
cd your-project/public && python3 -m http.server 8877

# 3. Or embed via iframe in your page
# <iframe src="/torus_knot.html" style="width:100%;height:70vh;border:none;"></iframe>

# 4. Customize colors: find PALETTES object, modify hex values
# 5. Customize geometry: find buildKnot/buildCurve function, adjust parameters
```

---

## Proven Client Site Deployments (Feb 2026)

### Hero Formations (full viewport, behind main hero text)

| Site | Formation | PAL | Component | URL |
|------|-----------|-----|-----------|-----|
| scout-aesthetics | Torus Knot (R3F) | Rose #c9a0a0 | R3F Canvas (HeroScene) | scout-aesthetics.vercel.app |
| morgan-pottinger-mcgarvey | Voronoi Tessellation | Gold #a0865c | VoronoiHero.tsx | morgan-pottinger-mcgarvey.vercel.app |
| pillar-financial-advisors | L-System Tree | Emerald #6cc89a | LSystemHero.tsx | pillar-financial-advisors.vercel.app |

### Section Background Formations (dark cinematic band behind content)

| Site | Formation | PAL | Component | Section | Dark BG |
|------|-----------|-----|-----------|---------|---------|
| scout-aesthetics | DNA Helix | Pink #c9a0a0/#e8b0b0/#5a3535/#8b6060 | DNAHelixBg.tsx | Stats | #050505 |
| morgan-pottinger-mcgarvey | Neural Mesh | Blue #4a6fa5/#7a9fd4/#1a2744/#2a3d5c | NeuralMeshBg.tsx | Features | #0a0c14 |
| pillar-financial-advisors | Orbital System | Green #059669/#6ee7b7/#022c22/#065f46 | OrbitalSystemBg.tsx | Stats | #020c08 |

### Standard: Two Formations Per Site (Feb 2026)

Every client site gets TWO 3D formations:
1. **Hero formation** -- Full viewport, behind hero text (VoronoiHero, LSystemHero, etc.)
2. **Section background formation** -- Dark cinematic band behind a content section (DNAHelixBg, NeuralMeshBg, OrbitalSystemBg)

The section background pattern: `position: relative; overflow: hidden` parent with dark bg color, `<FormationBg />` component at z-index 0, semi-transparent overlay (`bg-black/30` to `bg-black/40`), content at z-index 2.

```tsx
<section className="relative py-24 overflow-hidden" style={{ background: '#0a0c14' }}>
  <NeuralMeshBg />
  <div className="absolute inset-0 bg-black/30 pointer-events-none" style={{ zIndex: 1 }} />
  <div className="relative max-w-6xl mx-auto px-4" style={{ zIndex: 2 }}>
    {/* Content here */}
  </div>
</section>
```

### Formations NOT Yet Ported to React (Available for Future Sites)

| Formation | HTML Source | Best For | Personality |
|-----------|-----------|----------|-------------|
| Torus Knot | torus_knot.html | Luxury retail, jewelry, creative | Mathematical beauty |
| Lorenz Attractor | lorenz_attractor.html | AI/ML, data science, analytics | Chaos, complexity |
| Governance Cascade | governance_cascade.html | DevOps, cybersecurity, enterprise | Pipeline flow |
| Mobius Strip | mobius_strip.html | CI/CD tools, monitoring, feedback | Infinite loops |

These 4 formations exist as standalone HTML but have NOT been ported to React components yet. Port using Pattern C when needed.

**Lessons learned:**
- iframe approach (Pattern B) was tested first and failed -- formations rendered as blank/gray backgrounds. Switching to Pattern C (useEffect + vanilla Three.js) fixed the issue completely.
- `Object.assign(new THREE.PointLight(...), { position: ... })` crashes at runtime in newer Three.js ("Cannot assign to read only property 'position'"). Always use `light.position.set(x, y, z)` instead.

---

## Related

- **Entropy Viz:** @~/.claude/reference/entropy-viz-component.md (WebGPU/WebGL2 particle system)
- **Torus Knot (React):** @~/.claude/reference/torus-knot-component.md (React Three Fiber version)
- **Elite Frontend Playbook:** @~/.claude/skills/frontend-design/ELITE_FRONTEND_PLAYBOOK.md
- **Tier Templates:** @~/.claude/reference/tier-templates-reference.md
- **Full Catalog:** ~/Projects/texume/output/formations/FORMATIONS_CATALOG.md

---

**Verified working on:** Desktop Chrome, Safari, Firefox (WebGL2 via Three.js)
**React integration verified:** Vite + React + TypeScript with `three` npm package (Feb 2026)
**Mobile:** React components use `canUseWebGL()` as the only guard (no mobile width bypass, no `isLowEnd` CPU checks). Manual camera orbit instead of OrbitControls. `pointer-events: none` on canvas for scroll pass-through. Standalone HTML formations are desktop-only.
