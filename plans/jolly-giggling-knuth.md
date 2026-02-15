# Crestborne Private Office -- Tier 4 Spec Site

## Context

Research into WRISE Group revealed a $5.8 trillion UHNW wealth management niche where firms serve ultra-high-net-worth Chinese families across Asia-Pacific. These firms charge premium fees but run WordPress themes. The web quality bar is low and willingness to pay is high. This spec site demonstrates the ability to build institutional-grade digital presence for this niche, to be used as a portfolio piece and sales tool targeting EAMs, multi-family offices, and wealth platforms.

**Firm name:** Crestborne Private Office
**Palette:** Midnight / Silver-Sage / Pearl (100% new -- no overlap with any existing site)
**Scope:** Marketing site only (no auth, no dashboard)
**Formations:** Two entirely new, original formations (not ports of existing HTML)

---

## Palette: Midnight / Silver-Sage / Pearl

| Token | Hex | Usage |
|-------|-----|-------|
| Midnight (deep) | `#080e1a` | Void / deepest bg |
| Midnight | `#0c1220` | Primary dark bg |
| Midnight (surface) | `#131b2e` | Elevated surfaces |
| Silver-Sage (muted) | `#5a6e60` | Muted text, borders |
| Silver-Sage | `#8a9e8f` | Primary accent, icons |
| Silver-Sage (light) | `#a3b5a8` | Bright accent, hover states |
| Pearl (warm) | `#e8e2d8` | Secondary text |
| Pearl | `#f0ece4` | Headlines, primary text |
| Sage-glow | `rgba(138, 158, 143, 0.12)` | Glow effects, card borders |

Understated Japanese luxury. Deep blue-black voids. Muted sage green as the only color. Warm pearl whites. No gold, no teal, no emerald, no rose -- completely unique.

---

## Two Original Formations

### Hero: "Gravitational Lens" (`GravitationalLensHero.tsx`)

A field of ~600 luminous particles warped by an invisible gravitational mass at center. Particles stream in curved geodesic paths around a dark void, like light bending around a black hole. Silver-sage colored particles on midnight background. Pearl caustic highlights where light paths converge near the center.

**Technical approach:**
- BufferGeometry with 600 points, each with position + velocity attributes
- Custom ShaderMaterial for points (soft circular, sage-colored, alpha fades with distance)
- Gravity simulation in animate loop: each particle attracted toward center, but with angular momentum so they orbit rather than fall in
- Particles that get too close respawn at random edge positions (continuous flow)
- Subtle bloom pass (UnrealBloomPass, strength 0.4) for caustic glow near center
- A dark circle at exact center (the "mass") with faint distortion ring
- Manual camera: slow drift, slight parallax on mouse/gyro
- ~250-300 lines
- **Metaphor:** Wealth bending around invisible forces (regulation, tax, geopolitics) -- navigated with precision

### Section BG: "Silk Threads" (`SilkThreadsBg.tsx`)

Hundreds of thin luminous curves flowing in parallel, like draped silk fabric in slow motion. Curves respond to a subtle sine-wave function creating gentle ripple patterns across the field.

**Technical approach:**
- 40-60 Line geometries, each with 80-100 points along a horizontal path
- Y-position of each point determined by: `baseY + sin(x * freq + time + phaseOffset) * amplitude`
- Each line at a slightly different depth (z) and phase offset, creating layered depth
- LineBasicMaterial or ShaderMaterial with alpha falloff at edges
- Silver-sage color, varying opacity per line (0.05-0.3)
- Very slow animation (0.2x time scale) -- meditative, not frenetic
- No bloom needed -- pure line elegance
- Faint fog to create depth fade
- ~180-220 lines
- **Metaphor:** Interwoven strategies, connected wealth structures, the fabric of legacy

---

## Critical Files

| Purpose | Path |
|---------|------|
| Template base | `~/Projects/client-sites/templates/tier4-enterprise/` |
| VoronoiHero (Pattern C reference) | `~/Projects/client-sites/morgan-pottinger-mcgarvey/src/components/VoronoiHero.tsx` |
| OG image script | `~/.claude/scripts/create-cinematic-og.js` |

---

## Steps

### 1. Scaffold project
- Copy `tier4-enterprise` template to `~/Projects/client-sites/crestborne-private-office/`
- `npm install three @types/three`
- Remove `react-router-dom` (single page, no routing)
- Update `package.json` name to `crestborne-private-office`

### 2. Configure palette and typography
- **tailwind.config.js**: Midnight/Silver-Sage/Pearl primary scale
  - Primary scale maps midnight (900) through pearl (50)
  - Accent scale for silver-sage
  - Font families: `Cormorant Garamond` (display) + `Inter` (body)
- **index.html**: Google Fonts import for Cormorant Garamond + Inter, OG meta tags, title
- **index.css**: Dark Architectural Noir theme
  - CSS vars: `--void: #080e1a`, `--surface: #131b2e`, `--midnight: #0c1220`, `--sage: #8a9e8f`, `--pearl: #f0ece4`
  - Glass-morphism cards: `bg-white/[0.03] backdrop-blur-sm border border-white/[0.06]`
  - Sage outline buttons, dark glass header, film grain overlay (2% SVG noise)
  - Custom scrollbar in midnight/sage

### 3. Build GravitationalLensHero.tsx (NEW -- original formation)
~250-300 lines. Vanilla Three.js Pattern C.
- 600 point particles with gravity simulation
- Custom ShaderMaterial (soft circle, sage glow)
- UnrealBloomPass (strength 0.4)
- Dark void center with distortion ring
- Manual camera drift (NO OrbitControls)
- WebGL guard + CSS fallback (animated radial gradient with floating dots)
- IntersectionObserver for off-screen optimization
- Mobile frame skipping
- Canvas: `pointer-events: none`
- All lights: `light.position.set()`, NOT Object.assign
- PAL: `{ base: '#8a9e8f', bright: '#a3b5a8', dim: '#0c1220', spot2: '#131b2e' }`

### 4. Build SilkThreadsBg.tsx (NEW -- original formation)
~180-220 lines. Vanilla Three.js Pattern C.
- 50 Line geometries with sine-wave animation
- Silver-sage lines, varying opacity
- Slow animation (meditative pace)
- Fog for depth fade
- NO bloom, NO OrbitControls
- WebGL guard + CSS fallback
- Same Pattern C guards as hero

### 5. Build App.tsx (single-page marketing site)
Write from scratch. No router, no auth, no cart. ~450-550 lines.

**Sections in order:**

1. **Header** -- Dark glass, fixed. "CRESTBORNE" in Cormorant Garamond (tracked). Scroll links: Services, Approach, Global, Insights, Contact. Sage outline pill CTA. Mobile hamburger with full-screen overlay.

2. **Hero** -- Full viewport. GravitationalLensHero background (Suspense/lazy). Gradient overlay from void bottom. Eyebrow: "CRESTBORNE PRIVATE OFFICE" (sage, 10px uppercase tracked). Headline: "Where Legacy Meets Precision" (Cormorant, pearl, clamp 42-96px). Sub: "Independent wealth advisory for ultra-high-net-worth families across Asia-Pacific and the Middle East" (pearl/warm). CTA: "Schedule a Consultation" (sage outline) + "Our Approach" (ghost). Trust badges: MAS | SFC | DIFC as glass pills. **Hero headline in plain HTML (not motion.div with opacity:0).**

3. **Services** -- Anchor+grid layout (large card left 40%, 2x2 grid right 60%). Six services: Investment Management, Wealth Structuring, Trust & Estate, Cross-Border Advisory, Family Office Services, Market Intelligence. Glass cards on midnight.

4. **Approach** -- Silk Threads background section. "The EAM Advantage". Three columns: Open Architecture, Independent Advisory, Multi-Custodian. Glass cards with Lucide icons + sage accent lines.

5. **Global Presence** -- Midnight section. 5 office cards (Singapore HQ, Hong Kong, Dubai DIFC, Tokyo, Taipei). City + address + timezone. Responsive 3+2 grid. Sage dot accents.

6. **Insights Preview** -- 3 mock article cards. Categories: REGULATORY, INVESTMENT, FAMILY OFFICE. Glass-morphism. Horizontal scroll mobile / 3-col desktop.

7. **Contact** -- Split-screen. Left: headline + "investable assets exceeding USD 10 million" + direct contact. Right: glass card form. Sage outline submit button.

8. **Footer** -- Deep void (#080e1a). 3-column. Brand + regulatory badges, quick links, Singapore HQ. Back-to-top sage arrow.

### 6. Simplify main.tsx
StrictMode + App. No router.

### 7. Build and verify locally
```
npm run build  # zero errors required
npm run dev &
npx playwright screenshot --wait-for-timeout=5000 "http://localhost:5173" local-verify.png
npx playwright screenshot --wait-for-timeout=5000 --full-page "http://localhost:5173" local-fullpage.png
npx playwright screenshot --viewport-size="390,844" --wait-for-timeout=5000 "http://localhost:5173" local-mobile.png
```
Read all three. Confirm: Gravitational Lens renders in hero, all sections visible, Silk Threads behind Approach, mobile responsive, no invisible content.

### 8. Deploy to Vercel
```
vercel --prod --yes
```

### 9. Generate cinematic OG image
Add `crestborne` config to `create-cinematic-og.js`:
- Primary: `#8a9e8f` (sage), Secondary: `#a3b5a8` (light sage), Dark: `#080e1a` (void)
- Accent style: `geometric` (angular accents for institutional feel)
- Font: Georgia fallback
- Generate, copy to public/og-image.png, update OG meta tags, redeploy.

### 10. Final verification
Playwright of live URL. curl OG image for 200. `git add -f` all PNGs. Commit.

### 11. Add to projectlavos.com portfolio
Copy PNGs. Add entry with category "Financial Services". Build + deploy with CRM env var. Verify.

---

## Differentiation Matrix

| | Pillar FA | Morgan PM | Scout | **Crestborne** |
|---|---|---|---|---|
| Hero | L-System | Voronoi | Torus Knot | **Gravitational Lens (NEW)** |
| Section BG | Orbital | Neural Mesh | DNA Helix | **Silk Threads (NEW)** |
| Palette | Emerald | Gold/Navy | Rose | **Midnight/Silver-Sage/Pearl** |
| Font | PT Serif | Bodoni 72 | Didot | **Cormorant Garamond** |
| Features | Icon-strip | Anchor+2x3 | Zigzag | **Anchor+2x2** |
| Contact | Portal login | 3-office | Glass card | **Split-screen** |
| Cards | Rounded, shadow | Rounded-lg | Rounded | **Angular, sage glow** |
| Buttons | Filled rounded | Outlined subtle | Rounded-full | **Sage outline, angular** |
| Mood | Approachable | Established | Soft luxury | **Understated Japanese noir** |

Zero overlap with any existing site in formations, palette, or typography.

---

## Verification Checklist
- [ ] `npm run build` passes with zero errors
- [ ] Local Playwright: hero Gravitational Lens renders (not blank/gray)
- [ ] Local Playwright: all content sections visible on full-page screenshot
- [ ] Local Playwright: mobile screenshot shows responsive layout, no stuck opacity:0
- [ ] Silk Threads renders behind Approach section
- [ ] Live Vercel URL loads correctly
- [ ] OG image returns HTTP 200
- [ ] All PNGs staged with `git add -f`, verified with `git ls-files --cached | grep '\.png'`
- [ ] Added to projectlavos.com portfolio and live
