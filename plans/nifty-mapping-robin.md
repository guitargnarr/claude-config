# Plan: Portfolio Website Transformation

**Site:** https://portfolio-website-one-mu-68.vercel.app
**Codebase:** ~/Projects/portfolio-website
**Identity:** M. Scott (monogram/abbreviated personal brand)
**Aesthetic:** Architectural Noir (unchanged) + DataSource document color taxonomy
**Tone:** Drawn from projectlavos.com — understated, evidence-based, mysteriously sophisticated

---

## Executive Summary

Transform the portfolio-website from "Quest for Data Security" (interactive math experience) into a **personal portfolio showcase** inspired by projectlavos.com's structure and tone. Keep the glass Mobius strip animation as a dedicated full-viewport showcase section. Establish a unified color taxonomy for document types that aligns with the DataSource report design language.

The site becomes the single artifact a Louisville networking contact or prospective client visits to understand what M. Scott does, see proof, and reach out.

---

## Iterative Build Order (7 phases)

Each phase produces a deployable, visually complete site. No phase depends on future phases. Each improves what exists.

### Phase 1: Foundation — Layout + Hero + Identity

**What changes:**
- `app/page.tsx` — complete rewrite (remove Quest content, build portfolio structure)
- `app/layout.tsx` — update metadata (title, description, OG tags)
- `app/components/Header.tsx` — change "Project Lavos." to "M. Scott" monogram, update nav items

**New page structure (top to bottom):**
```
[Fixed Header]  M. Scott    WORK  METHOD  DOCUMENTS  CONTACT    Reach Out
[Text Hero]     100vh — name, role line, one-sentence positioning
[Accent Line]
[Mobius Section] 100vh — dedicated glass Mobius strip showcase (ThreeDModel.tsx unchanged)
[Accent Line]
... (phases 2-6 fill below)
[Footer]
```

**Hero copy (projectlavos.com tone):**
- Eyebrow: `LOUISVILLE, KY`
- Headline: `M. Scott` (display serif, clamp 48-96px)
- Subline in accent italic: *Complexity, untangled.*
- Body: "Nine years translating healthcare regulations into working systems. Now I apply that rigor to yours." (direct from projectlavos.com's method, adapted to first person)
- CTA pair: `See the Work` (solid) + `Reach Out` (outline)

**Mobius showcase section:**
- Full 100vh section with the ThreeDModel component centered
- Small eyebrow label above: `INFINITE SURFACE`
- Below canvas: brief poetic line — "A one-sided ribbon with a half-twist. Glass refracts along the continuous loop."
- This is the "smooth" moment — visitors scroll into it, it fills their screen

**Files modified:** `app/page.tsx`, `app/layout.tsx`, `app/components/Header.tsx`
**Reuse:** `AnimateIn`, `AnimatedAccentLine`, `FloatingParticles`, `ThreeDModel` (all unchanged)

---

### Phase 2: Work Section — Portfolio Cards

**What changes:**
- Add work section to `page.tsx` using existing `ProjectCard` component

**Structure:**
- Section eyebrow: `SELECTED WORK` + divider line (ProcessSteps pattern)
- 3-column grid of ProjectCards (existing component, glass-morphism, index numbers)
- 6-8 selected projects from the actual deployed inventory:

| Index | Title | Tags | Link |
|-------|-------|------|------|
| 01 | DataSource Monitor | `Python` `Automation` `HVAC` | datasource-monitor.vercel.app |
| 02 | Jobway | `FastAPI` `Gmail OAuth` `NLP` | jobtrack.projectlavos.com |
| 03 | PhishGuard | `Security` `Sentiment` `React` | phishguard.projectlavos.com |
| 04 | Guitar Model Lab | `Music Theory` `Python` `GP5` | guitar-model-lab.onrender.com |
| 05 | Interactive Resume | `Three.js` `Next.js` | resume.projectlavos.com |
| 06 | 51 Louisville Sites | `React` `Tailwind` `Spec Work` | projectlavos.com |

Each card links to the live deployment. "Every item on this page is live. Click to verify."

**Files modified:** `app/page.tsx`
**Reuse:** `ProjectCard` (unchanged), `AnimateIn`

---

### Phase 3: Method Section — Philosophy Cards

**What changes:**
- Add method/philosophy section to `page.tsx`

**Structure (inspired by projectlavos.com's four principles):**
- Section eyebrow: `METHOD` + divider
- Brief positioning paragraph: "I work at the seams where disciplines don't connect — translating between technical and business realms, extracting methods so they become repeatable."
- 4 glass cards in 2x2 grid, each with a principle:

| Principle | Description |
|-----------|-------------|
| Truth over theater | No aspirational claims. Only what can be shown and proven. |
| Guardrails over vibes | AI where it's strong. Deterministic logic where it fails. |
| Zero-trust by default | Verification matters more than confidence. |
| Human impact first | Quality isn't abstract. It affects real people. |

**Tone:** Short sentences. Active verbs. Proof over claims. Projectlavos.com language verbatim where it fits.

**Files modified:** `app/page.tsx`
**Reuse:** `AnimateIn`, glass card CSS from globals.css

---

### Phase 4: Document Color Taxonomy + Documents Section

**What changes:**
- Add a `DOCUMENTS` section to `page.tsx` — a gallery of professional deliverables
- Establish the color taxonomy as CSS variables in `globals.css`

**Color taxonomy (DataSource report system):**

| Document Type | Accent Color | Hex | Usage |
|---------------|-------------|-----|-------|
| Engineering / Prototype | Amber | `#c8956c` | Prototype companion docs, technical builds |
| Strategic Analysis | Teal | `#14b8a6` | Portfolio assessments, market analysis |
| Proposal / Pitch | Navy | `#2a4a7f` | Business proposals, scoping documents |
| Case Study | Warm White | `#f5f0eb` | Client success narratives |
| Research / Methodology | Slate Blue | `#64748b` | Methodology papers, audit reports |

**CSS additions to `globals.css`:**
```css
:root {
  --doc-engineering: #c8956c;
  --doc-analysis: #14b8a6;
  --doc-proposal: #2a4a7f;
  --doc-casestudy: #f5f0eb;
  --doc-research: #64748b;
}
```

**Documents section structure:**
- Section eyebrow: `DOCUMENTS` + divider
- Brief text: "Companion documents I prepare for clients. Each one accompanies working software."
- Horizontal row of 3-4 "document cards" — each styled like a miniature DataSource cover page:
  - Dark navy background with concentric ring motif (matching the PDF cover)
  - Colored accent bar at bottom matching document type
  - Title in serif, subtitle in uppercase spaced sans
  - Document type label with colored dot indicator
- First card: DataSource Monitor Prototype (amber bar)
- Placeholder cards for future: Strategic Portfolio Analysis (teal bar), etc.

**Files modified:** `app/page.tsx`, `app/globals.css`
**New component:** `app/components/DocumentCard.tsx` — miniature DataSource-style cover page card

---

### Phase 5: Social Proof + Contact

**What changes:**
- Add `SocialProofBar` and `ContactForm` sections to `page.tsx`
- Update `SocialProofBar` stats to be accurate
- Update `Footer.tsx` — change "Project Lavos." to "M. Scott", update tagline

**Social proof stats:**
- `60+` Websites Delivered
- `9` Years in Healthcare IT
- `Louisville, KY` Based
- `Live` Every Project Deployed

**Contact section:**
- Section eyebrow: `CONTACT`
- Headline: "If you recognize the work, reach out." (from projectlavos.com)
- Subline: "If you need convincing, I'm not for you."
- CTA button: `matthewdscott7@gmail.com` (mailto link)
- Or reuse existing `ContactForm` if it has form functionality

**Files modified:** `app/page.tsx`, `app/components/Footer.tsx`, `app/components/SocialProofBar.tsx` (stat values only)

---

### Phase 6: Metadata, OG Image, Favicon

**What changes:**
- `app/layout.tsx` — update title to "M. Scott — Louisville, KY", description, OG meta
- Generate new OG image (1200x630) with the M. Scott monogram + amber accent
- Generate favicon with MS monogram

**Files modified:** `app/layout.tsx`, `public/og-image.png`, `public/favicon.svg`
**Script:** `scripts/generate-og.js` (adapt existing pattern)

---

### Phase 7: Mobile Polish + Print QR

**What changes:**
- Verify all sections responsive at 768px and 480px breakpoints
- Optional: add print stylesheet for networking events (generates a simple QR code page pointing to the live URL)
- Playwright screenshots at desktop + mobile viewports for verification

**Files modified:** minor CSS tweaks in `globals.css` if needed

---

## Final Page Structure

```
[Fixed Header]     M. Scott          WORK  METHOD  DOCUMENTS  CONTACT    Reach Out
                   ─────────────────────────────────────────────────────────────────

[Hero]             100vh
                   LOUISVILLE, KY
                   M. Scott
                   Complexity, untangled.
                   "Nine years translating healthcare regulations..."
                   [See the Work]  [Reach Out]

[Accent Line]      ═══════════════════════════════════════════

[Mobius Section]   100vh
                   INFINITE SURFACE
                   <Glass Mobius Strip — 70vh canvas>
                   "A one-sided ribbon with a half-twist..."

[Accent Line]      ═══════════════════════════════════════════

[Work]             SELECTED WORK
                   ┌──────────┐  ┌──────────┐  ┌──────────┐
                   │ 01       │  │ 02       │  │ 03       │
                   │ DataSrc  │  │ Jobway   │  │ PhishGrd │
                   └──────────┘  └──────────┘  └──────────┘
                   ┌──────────┐  ┌──────────┐  ┌──────────┐
                   │ 04       │  │ 05       │  │ 06       │
                   │ Guitar   │  │ Resume   │  │ 51 Sites │
                   └──────────┘  └──────────┘  └──────────┘

[Accent Line]      ═══════════════════════════════════════════

[Method]           METHOD
                   "I work at the seams..."
                   ┌─────────────────┐  ┌─────────────────┐
                   │ Truth > theater  │  │ Guardrails > vibes│
                   └─────────────────┘  └─────────────────┘
                   ┌─────────────────┐  ┌─────────────────┐
                   │ Zero-trust      │  │ Human impact     │
                   └─────────────────┘  └─────────────────┘

[Accent Line]      ═══════════════════════════════════════════

[Documents]        DOCUMENTS
                   "Companion documents..."
                   ┌──────────┐  ┌──────────┐  ┌──────────┐
                   │ ████████ │  │ ████████ │  │ ████████ │
                   │ DataSrc  │  │ Analysis │  │ Proposal │
                   │ ▬▬amber▬▬│  │ ▬▬teal▬▬ │  │ ▬▬navy▬▬ │
                   └──────────┘  └──────────┘  └──────────┘

[Social Proof]     60+  |  9  |  Louisville  |  Live
                   Sites  Years    KY        Every Project

[Accent Line]      ═══════════════════════════════════════════

[Contact]          CONTACT
                   "If you recognize the work, reach out."
                   [matthewdscott7@gmail.com]

[Footer]           M. Scott  |  GitHub  LinkedIn  |  Louisville, KY
```

---

## Files Modified (Complete)

| File | Phase | Change |
|------|-------|--------|
| `app/page.tsx` | 1-5 | Complete rewrite — portfolio structure |
| `app/layout.tsx` | 1, 6 | Metadata, OG tags, title |
| `app/components/Header.tsx` | 1 | "M. Scott" + updated nav items |
| `app/components/Footer.tsx` | 5 | "M. Scott" + updated copy |
| `app/components/SocialProofBar.tsx` | 5 | Updated stat values |
| `app/globals.css` | 4 | Document color taxonomy CSS vars |
| `app/components/DocumentCard.tsx` | 4 | **NEW** — miniature cover page card |
| `public/og-image.png` | 6 | Regenerated for new identity |
| `public/favicon.svg` | 6 | MS monogram |

**Unchanged (reused as-is):**
- `app/components/ThreeDModel.tsx` (glass Mobius strip)
- `app/components/AnimateIn.tsx` + `AnimatedAccentLine`
- `app/components/FloatingParticles.tsx`
- `app/components/ProjectCard.tsx`
- `app/components/ProcessSteps.tsx` (available if needed)
- `app/components/ContactForm.tsx` (available if needed)
- `app/globals.css` (existing styles preserved, taxonomy added)

**Can be deleted after Phase 1:**
- `app/components/quest/` (entire directory — ActSection, ActNav, demos)
- `app/components/Animation.tsx` (4 Three.js math scenes)

---

## Tone Guide (from projectlavos.com)

**Pattern:** Short sentences. Active verbs. Proof over claims. Psychology without pretense.

**DO:**
- "51 sites you can visit. Live. Deployed. Working."
- "If you recognize the work, reach out."
- "Nine years translating federal healthcare regulations into working systems."
- "I work at the seams where disciplines don't connect."

**DON'T:**
- "Full-stack developer with a passion for creating beautiful experiences"
- "Let's collaborate to bring your vision to life"
- "Cutting-edge solutions for modern businesses"

**The sophistication comes from:** specificity, refusal to oversell, philosophical undertones, evidence over promises.

---

## Verification

After each phase:
1. `npm run build` passes clean
2. `vercel --prod --yes`
3. Playwright screenshot at desktop (1920x1080) + mobile (390x844)
4. Visual confirmation that existing glass Mobius strip animation is untouched and smooth

---

## Implementation Note

Build phases 1-3 in the first pass (foundation + work + method). This gives a complete, functional portfolio site. Phases 4-7 are polish layers that can be deployed incrementally.
