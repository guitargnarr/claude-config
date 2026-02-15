# The Forge: Elite Frontend Masterclass

## Concept

A single-page website with ONE evolving 3D crystal that morphs through 5 stages as the user scrolls. Each stage demonstrates a different tier pattern while maintaining the Architectural Noir aesthetic.

**Metaphor:** "From chaos to clarity. Watch ideas take form."

**The Crystal Journey:**
1. **Entropy** (0-20%) - Scattered particles, no form
2. **Gathering** (20-40%) - Particles coalesce into rough shape
3. **Shaping** (40-60%) - Geometry becomes defined
4. **Refinement** (60-80%) - Facets polish, transmission material emerges
5. **Radiance** (80-100%) - Perfect crystal with full glow

---

## Architecture

### Fixed 3D Canvas (fullscreen background)
- Position: fixed, inset: 0
- Crystal always visible, morphing based on scroll progress
- Fog fades edges into void

### Content Sections (scroll over canvas)
- 5 sections, each ~100vh
- Semi-transparent backgrounds so crystal shows through
- Each section demonstrates ONE tier pattern

---

## Section Breakdown

### Section 1: ENTROPY (Tier 1 - Smooth Scroll)
**Scroll: 0-20% | Crystal: Scattered particles**

Content:
- Hero headline with staggered entrance
- "Ideas begin as scattered fragments"
- Smooth scroll navigation to other sections
- Parallax text effect

Tier 1 Patterns: Smooth scroll nav, staggered animations, parallax

### Section 2: GATHERING (Tier 2 - Progress + Selection)
**Scroll: 20-40% | Crystal: Particles coalescing**

Content:
- 3-step progress indicator (active step 1)
- Service selection cards (3 options)
- "Choose your path" messaging

Tier 2 Patterns: Multi-step progress indicator, selection cards, form preview

### Section 3: SHAPING (Tier 3 - Search + Filter + Grid)
**Scroll: 40-60% | Crystal: Defined geometry emerges**

Content:
- Search input with real-time filtering
- Category filter pills
- 6-card grid of "materials" (skills/tools)

Tier 3 Patterns: Search with filtering, category pills, product grid

### Section 4: REFINEMENT (Tier 4 - Dashboard + Metrics)
**Scroll: 60-80% | Crystal: Polished facets, transmission material**

Content:
- Mini dashboard with 4 stat cards
- Progress ring showing "completion"
- Mini sparkline charts
- Toast notification demo button

Tier 4 Patterns: Progress rings, sparklines, toast notifications

### Section 5: RADIANCE (All Combined - Contact)
**Scroll: 80-100% | Crystal: Full radiance, perfect form**

Content:
- "Your vision, realized" headline
- Contact form with validation
- Social links
- Full crystal glow behind

Combined: Form validation, glass-morphism, staggered animations, CTA

---

## Files

| File | Action | Purpose |
|------|--------|---------|
| `app/forge/page.tsx` | NEW | Main Forge page |
| `app/forge/components/ForgeCanvas.tsx` | NEW | Fixed 3D canvas with morphing crystal |
| `app/forge/components/CrystalGeometry.tsx` | NEW | Crystal that morphs based on progress |
| `app/forge/components/Section1Entropy.tsx` | NEW | Hero + parallax |
| `app/forge/components/Section2Gathering.tsx` | NEW | Progress + selection |
| `app/forge/components/Section3Shaping.tsx` | NEW | Search + filter + grid |
| `app/forge/components/Section4Refinement.tsx` | NEW | Dashboard + metrics |
| `app/forge/components/Section5Radiance.tsx` | NEW | Contact + finale |
| `app/forge/components/ForgeNav.tsx` | NEW | 5-dot side navigation |
| `app/forge/components/ToastProvider.tsx` | NEW | Toast notification context |

**Total: 10 new files, ~1500 lines**

---

## Crystal Morphing Logic

```tsx
// Smooth interpolation pattern
const smoothProgress = useRef(0);
useFrame(() => {
  smoothProgress.current += (scrollProgress - smoothProgress.current) * 0.08;
});

// Crystal parameters based on progress (0-1)
// Stage 1 (0-0.2): particleSpread high, no geometry
// Stage 2 (0.2-0.4): particleSpread decreasing, rough shape
// Stage 3 (0.4-0.6): geometry defined, facets forming
// Stage 4 (0.6-0.8): transmission material, roughness decreasing
// Stage 5 (0.8-1.0): full glow, rotation speed increases
```

---

## Design System (Reuse globals.css)

Already have everything needed:
- `--color-void`, `--color-accent`, `--color-text-primary`
- `.card-glass`, `.accent-line`
- `.animate-stagger-1` through `.animate-stagger-7`
- Font imports: Instrument Serif + DM Sans

**No new CSS needed.** All styling reuses existing design system.

---

## Build Order

1. Create `app/forge/` directory and `app/forge/components/`
2. Create ForgeCanvas.tsx with scroll tracking + fixed canvas
3. Create CrystalGeometry.tsx with morphing logic
4. Build sections 1-5 sequentially (each ~150 lines)
5. Create ForgeNav.tsx (5-dot navigation)
6. Create ToastProvider.tsx for Section 4 demo
7. Wire up page.tsx to compose everything
8. `npm run build` - must pass clean
9. Start dev server, verify scroll interactions

---

## Verification

```bash
npm run build          # Must pass clean
npm run dev            # Start dev server
open http://localhost:3000/forge  # View the Forge

# Checklist:
# [ ] Crystal morphs smoothly through 5 stages as you scroll
# [ ] Section 1: Staggered entrance, smooth scroll nav works
# [ ] Section 2: Progress indicator updates, selection cards work
# [ ] Section 3: Search filters grid in real-time
# [ ] Section 4: Progress rings animate, toast appears on click
# [ ] Section 5: Form validates, submit shows success
# [ ] ForgeNav dots track current section
# [ ] Mobile responsive (sections stack, crystal smaller)
# [ ] No hydration errors
```

---

## What Makes This a Masterclass

1. **Single Compelling Concept** - The morphing crystal IS the narrative
2. **Progressive Disclosure** - Each stage reveals new capabilities
3. **Tier Pattern Integration** - Every tier's best feature, naturally placed
4. **Technical Excellence** - 60fps scroll-driven 3D, smooth interpolation
5. **Architectural Noir Aesthetic** - Consistent, premium, memorable
6. **Educational Value** - Visitors see what's possible, in action

**Not a template showcase. A unified experience.**
