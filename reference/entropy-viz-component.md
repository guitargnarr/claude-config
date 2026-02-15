# Reusable Component: Entropy Particle Visualization

**Created:** February 7, 2026
**Source:** ~/Projects/entropy-viz/
**Live Demo:** https://entropy-viz.vercel.app/
**Status:** DEPLOYED, iOS + Android + Desktop verified

---

## What It Is

Interactive 3D particle visualization: 2048 particles in a BCC crystal lattice. Click shatters into Brownian chaos. Click again reassembles. Shannon entropy computed in real-time from particle speed distribution.

**Caption:** *"Order requires energy. Chaos is free."*

---

## Integration Options

### Option A: Full-Page Hero (Current Implementation)
Fullscreen canvas background with overlay UI. Best for landing pages, about pages, or standalone showpieces.

### Option B: Section Background
Embed as a contained `<canvas>` behind a content section. Set `position: relative` on the container, `position: absolute` on the canvas.

### Option C: Card/Widget
Render in a smaller bounded container. Reduce particle count (256-512) and camera distance for smaller viewports.

### Option D: React Component Wrapper
Wrap the vanilla JS modules in a React `useEffect` + `useRef` pattern. See "React Integration" section below.

---

## Tech Stack

- **Vanilla JS** -- no React, no build step, no bundler
- **WebGPU** (Chrome/Edge desktop) -- 2048 particles, compute shaders, volumetric raymarch
- **WebGL2** (fallback) -- 512 particles, point sprites, Gaussian blur
- **iOS** -- Force WebGL2 (Metal backend has WGSL compat issues)
- **Fonts:** DM Sans (body) + JetBrains Mono (entropy counter)
- **Deploy:** Static files on Vercel, no server needed

---

## File Inventory (14 files, ~2,800 LOC)

| File | Lines | Purpose |
|------|-------|---------|
| `index.html` | 60 | Canvas + UI overlay + OG meta tags |
| `style.css` | 218 | Fullscreen canvas, overlay positioning, responsive |
| `og-image.png` | -- | 1200x630 social preview image |
| `vercel.json` | 13 | WGSL content-type headers + SPA rewrite |
| `js/main.js` | 152 | Entry: WebGPU detection, iOS fallback, RAF loop |
| `js/webgpu-renderer.js` | ~450 | WebGPU device, 6 compute/render pipelines, buffers |
| `js/webgl-fallback.js` | 395 | WebGL2 degraded renderer (512 particles, point sprites + blur) |
| `js/state-machine.js` | 84 | ORDERED/SHATTERING/CHAOS/REASSEMBLING + easing |
| `js/entropy-calculator.js` | 53 | Shannon entropy from GPU histogram readback |
| `js/camera.js` | 61 | Slow orbital drift + mouse parallax + portrait adapt |
| `js/ui.js` | 58 | DOM: entropy counter, state label, click instruction |
| `js/color-map.js` | 53 | Blackbody LUT: deep blue -> teal -> amber -> white |
| `js/math-utils.js` | 120 | mat4 lookAt/perspective/inverse, vec3 ops (zero deps) |
| `shaders/*.wgsl` | ~400 | 7 WGSL shaders (physics, density, raymarch, histogram) |

---

## Architecture: Dual Renderer

### WebGPU Path (Chrome/Edge desktop)

```
Per frame:
1. Compute: density-clear    (zero 64^3 voxel buffer)
2. Compute: physics           (spring forces + Brownian noise)
3. Compute: density-splat     (Gaussian kernel to atomic<u32>)
4. Compute: histogram         (bin particle speeds)
5. Render:  fullscreen-quad + raymarch (Beer-Lambert, blackbody LUT)
6. Copy:    histogram -> readback (async mapAsync)
7. CPU:     Shannon entropy = -sum(p_k * log2(p_k))
```

### WebGL2 Path (Safari, Firefox, iOS, Android)

```
Per frame:
1. CPU:     Physics simulation (Float32Array, spring + noise)
2. CPU:     Speed histogram (64 bins)
3. GPU:     Point sprites to FBO (additive blending)
4. GPU:     Gaussian blur fullscreen pass
5. CPU:     Shannon entropy from histogram
```

---

## State Machine

```
ORDERED (tOrder=1.0) --click--> SHATTERING (1.5s, ease-out-cubic) --> CHAOS (tOrder=0.0)
CHAOS --click--> REASSEMBLING (2.0s, ease-in-out-quad) --> ORDERED
```

Physics interpolation via `tOrder`:
- Spring force = k * (home - pos) * tOrder
- Brownian noise = strength * (1.0 - tOrder)
- Damping = lerp(0.999, 0.97, tOrder)

---

## Color Palette

Blackbody-inspired ramp matching brand colors:

| Range | Color | Hex Range |
|-------|-------|-----------|
| 0.0-0.15 | Deep blue-teal | #050a1f -> #0d2659 |
| 0.15-0.30 | Teal | #14b8a6 range |
| 0.30-0.65 | Bright teal -> amber | transition |
| 0.65-0.80 | Orange | #f97316 range |
| 0.80-1.0 | Warm white | #ffcc80 -> #fff5e6 |

CSS variables:
```css
--void: #020205;
--text-primary: #f5f0eb;
--text-muted: #6a6560;
--accent-cold: #14b8a6;
--accent-hot: #f97316;
```

---

## iOS Compatibility (Critical)

**Problem:** iPhone 16 Pro Max (iOS 18+) has WebGPU enabled via Safari 26 Metal backend. Our WGSL shaders use patterns (atomic storage buffers, density splat) that are incompatible with Apple's Metal backend.

**Solution:** Force WebGL2 on ALL iOS devices:
```javascript
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

if (navigator.gpu && !isIOS) {
  // WebGPU path
} else {
  // WebGL2 fallback
}
```

**Additional iOS WebGL2 fixes applied:**
- FBO uses RGBA8 (not RGBA16F -- unsupported on iOS Safari)
- FBO dimensions capped at 2048px (memory limit)
- Point size clamped to `gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)` max (~63px on iOS)
- `touch-action: none` on canvas CSS
- `passive: false` on touchend/touchmove listeners
- `powerPreference: 'high-performance'` on context creation
- WebGL context loss/restore handlers

---

## Responsive Behavior

**Portrait phones:** Camera pulls back automatically:
```javascript
updateAspect() {
  const aspect = window.innerWidth / window.innerHeight;
  this.radius = aspect < 1.0
    ? this.baseRadius * (1.0 + (1.0 - aspect) * 0.8)
    : this.baseRadius;
}
```

**Mobile CSS breakpoint (640px):**
- Entropy font: 42px -> 28px
- Bar width: 180px -> 120px
- Caption hidden
- Padding reduced

---

## React Integration Pattern

To embed in a React app (e.g., a client site section):

```tsx
import { useEffect, useRef } from 'react';

function EntropyVisualization({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Dynamic import to avoid SSR issues
    Promise.all([
      import('./entropy/webgl-fallback'),
      import('./entropy/state-machine'),
      import('./entropy/entropy-calculator'),
      import('./entropy/camera'),
    ]).then(([{ WebGLFallback }, { StateMachine }, { EntropyCalculator }, { Camera }]) => {
      const renderer = new WebGLFallback(canvas);
      const stateMachine = new StateMachine();
      const entropy = new EntropyCalculator(64);
      const camera = new Camera();

      renderer.init().then(() => {
        let running = true;
        let lastTime = performance.now();
        let totalTime = 0;

        function frame(now: number) {
          if (!running) return;
          requestAnimationFrame(frame);
          const dt = Math.min((now - lastTime) / 1000, 1/20);
          lastTime = now;
          totalTime += dt;
          stateMachine.update(dt);
          camera.update(dt);
          renderer.frame(dt, stateMachine.tOrder, totalTime, camera);
          const hist = renderer.getHistogram();
          if (hist) entropy.compute(hist);
          entropy.updateDisplay(dt);
        }

        requestAnimationFrame(frame);

        canvas.addEventListener('click', () => {
          if (stateMachine.canClick) stateMachine.click();
        });

        cleanupRef.current = () => { running = false; };
      });
    });

    return () => cleanupRef.current?.();
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
```

---

## Customization Points

| Parameter | Location | Default | Notes |
|-----------|----------|---------|-------|
| Particle count | webgl-fallback.js:9 | 512 | Lower for mobile/small widgets |
| Crystal spacing | webgl-fallback.js:51 | 5.0/side | Adjust lattice density |
| Spring constant | webgl-fallback.js:235 | 12.0 | Higher = snappier reassembly |
| Noise strength | webgl-fallback.js:236 | 4.0 | Higher = more chaotic |
| Shatter duration | state-machine.js:33 | 1.5s | Ease-out-cubic |
| Reassemble duration | state-machine.js:38 | 2.0s | Ease-in-out-quad |
| Camera radius | camera.js:10 | 8.0 | Pull back for smaller containers |
| Orbital speed | camera.js:13 | 0.02 rad/s | 0 to disable drift |
| Color stops | color-map.js:12-19 | teal->amber | Match any brand palette |
| Background | style.css:23 | #020205 | Void black |
| Caption text | index.html:55 | "Order requires energy..." | Any tagline |

---

## Performance

| Metric | WebGPU | WebGL2 |
|--------|--------|--------|
| Particles | 2048 | 512 |
| Target FPS | 60 | 30+ |
| GPU memory | ~2 MB | ~50 KB |
| Frame budget | <16.6ms | <33ms |
| iOS iPhone 16 PM | N/A (forced WebGL2) | 30+ FPS |

---

## OG Image

Programmatically generated 1200x630 PNG using node-canvas:
- Left half: ordered BCC lattice dots
- Right half: chaotic teal-to-amber scatter
- "ENTROPY" title, "ORDER" / "CHAOS" labels
- Film grain + vignette

Generator script pattern available at scratchpad -- can be adapted for any client site OG image that needs an algorithmic/physics aesthetic.

---

## Best Use Cases for Client Sites

| Business Type | Integration | Why |
|---------------|-------------|-----|
| Tech/SaaS | Full-page hero | Impressive technical showpiece |
| Data/Analytics | Section background | "We make sense of chaos" metaphor |
| Creative Agency | Interactive portfolio piece | Demonstrates technical capability |
| Healthcare/Science | About page section | Information entropy / data analysis metaphor |
| Cybersecurity | Landing page | Order vs chaos, system integrity theme |
| Education | Interactive demo | Teach thermodynamics / information theory |

---

## Quick Start: Add to Existing Project

```bash
# 1. Copy the JS modules
cp -r ~/Projects/entropy-viz/js/ your-project/src/entropy/
cp ~/Projects/entropy-viz/style.css your-project/src/entropy/entropy.css

# 2. Add canvas + overlay HTML to your page

# 3. Import and initialize
# <script type="module" src="entropy/main.js"></script>

# 4. Customize colors in color-map.js to match brand
# 5. Adjust camera.js radius for container size
# 6. Reduce PARTICLE_COUNT for smaller widgets
```

---

## Related

- **Elite Frontend Playbook:** @~/.claude/skills/frontend-design/ELITE_FRONTEND_PLAYBOOK.md
- **Tier Templates:** @~/.claude/reference/tier-templates-reference.md
- **Animation-Driven Template (Quest):** Similar pattern -- 3D scenes responding to user input
- **Color palette matches brand:** teal (#14b8a6) / orange (#f97316)

---

**Verified working on:** Desktop Chrome (WebGPU), Desktop Safari (WebGL2), Firefox Android (WebGL2), iPhone 16 Pro Max iOS 18 Safari (WebGL2 forced)
