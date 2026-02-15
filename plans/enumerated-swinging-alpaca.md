# Medittoica: Ashley's Artwork as Scroll-Reactive Particle Portrait

## Context
Ashley created a digital painting of a Stoic philosopher with cosmic/iridescent hair (pinks, blues, golds, teals) on a light background. The user wants the existing scroll-reactive particle system to **morph into the shape and colors of this painting** as the user scrolls, then release back to the dissolution flow. This is not placing an image -- it's making 1400 particles arrange themselves into the portrait.

## Files Modified
- `public/ashley-stoic.png` -- Clean artwork cropped from tablet screenshot (NEW)
- `src/App.tsx` -- Image sampling, morph logic in animate loop, camera adjustments, new attribution section

## How It Works

### Image Preparation
Crop the tablet screenshot (remove bezels + UI chrome) via Python PIL. Save clean artwork to `public/ashley-stoic.png`.

### Image Sampling (runs once on mount)
- Load PNG onto offscreen canvas at ~47x66px
- Skip pixels with brightness > 0.85 (white background) or alpha < 0.5
- Collect ~1400-2000 candidate pixels with their RGB colors
- Shuffle and assign to particles (1:1 mapping up to TOTAL count)
- Map pixel (x,y) to world coordinates centered at (0, 12, 0), spanning ~40x56 world units
- Particles without an image target stay in their eroded positions during morph

### Scroll-Driven Morph (integrated into existing animate loop)

| Scroll Range | Behavior |
|---|---|
| 0.00-0.30 | Existing erosion/constellation (unchanged) |
| 0.30-0.45 | **MORPH IN** -- particles lerp from eroded positions to image targets, colors shift from marble/bronze to painting colors |
| 0.45-0.65 | **PORTRAIT HOLD** -- particles hold shape with subtle breathing, constellations connect the portrait |
| 0.65-0.80 | **RELEASE** -- particles leave portrait, resume dissolution |
| 0.80-1.00 | Existing fade/dissolve (unchanged) |

Per-particle stagger using existing `phases[]` array so particles arrive in waves, not all at once.

### Color Morph
- Store `baseColors` (copy of original column palette) and `imageColors` (sampled from painting)
- Each frame: `colorArray[i] = lerp(baseColors[i], imageColors[i], effectiveMorph)`
- Set `geometry.attributes.color.needsUpdate = true` only when colors are changing

### Camera During Portrait
- Orbit speed drops to 15% of normal
- Camera angle lerps toward 0 (facing the z=0 portrait plane)
- Distance tightens to 90 units for better framing
- Height/lookAt shift to center on portrait (~12 world units Y)
- FOV tightens to 58 degrees
- All driven by `effectiveMorph` -- fully reversible

### Shader Adjustments
- Add `uMorph` uniform
- Vertex: particles shrink 25% during portrait for sharper definition
- Fragment: suppress bronze rim by 60% so image colors dominate

### Attribution Section (DOM)
New section after Source Texts, before The Question:
- Heading: "What the philosopher sees when the mind goes quiet"
- Brief poetic copy about stillness and spectrum
- Credit line: "Original artwork by Ashley"
- Semi-transparent background so particle portrait shows through

## Implementation Order
1. Crop artwork from screenshot, save as `public/ashley-stoic.png`
2. Add `smoothstepFn` utility near existing `lerp`
3. Add image sampling code (imageTargets, imageColors, baseColors, hasImageTarget arrays)
4. Add `uMorph` uniform + vertex/fragment shader modifications
5. Integrate morph blend into the particle position loop in animate()
6. Integrate morph-aware camera behavior
7. Optionally tighten constellation threshold during portrait hold
8. Add Artist's Vision attribution section to DOM
9. Build, verify locally with Playwright at scroll 0%, 35%, 50%, 75%, 100%
10. Deploy to Vercel, verify live
11. Commit and push

## Risk: Portrait Recognizability
1400 particles for a detailed portrait is tight. The painting has high contrast (dark figure + vivid cosmic hair against light bg) which helps. If recognition is poor, options: increase sample resolution, adjust brightness threshold, or increase particle count to ~2000. Will test visually and adjust.

## Verification
1. `npm run build` must pass
2. Playwright screenshots at 5 scroll positions -- portrait must be recognizable at 50%
3. Scroll reversal returns to normal particle behavior
4. Mobile viewport (393x852) -- portrait visible at 700 particles
5. Image load failure gracefully degrades (no morph, particles behave normally)
