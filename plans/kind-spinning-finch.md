# Plan: Guitar Reference Library on projectlavos.com

## Context
24 guitar scale reference books exist as PDFs in `~/.mirador/exports/`. Each has a unique branded cover with distinct color palettes. Need to publish these on projectlavos.com at `/guitar`, following the same design patterns as `/blog` (Articles page). Also need a homepage CTA section (like the "Beyond the Code" Writing CTA) linking to the new page.

## Files to Modify/Create

### New: `main-site/src/pages/Guitar.jsx`
Full page component following Blog.jsx pattern:
- **BookCard** -- CSS gradient card using each book's 5-color cover palette (no images needed). `card-glass-elite` base, `aspect-[4/3]` gradient header with layered radial-gradient blobs + accent line, metadata below (title in `heading-display`, category tag, stats line)
- **BookDetail** modal -- Simplified ArticleViewer (no page navigation). Gradient header strip, full description, stats grid (keys, positions, exercise types, total exercises), prominent Download PDF button. Escape/backdrop close, Framer Motion enter/exit, body scroll lock
- **Guitar** page -- Same shell as Blog.jsx (bg-slate-900, ambient-bg, particles, intersection observer). Header with back link + "Guitar" h1 + subtitle. Content organized by 7 category sections, each with heading + card grid
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6` in `max-w-6xl`

Category groupings:
- Pentatonic & Blues (4): minor-pentatonic, major-pentatonic, blues, major-blues
- Diatonic Modes (7): natural-major, natural-minor, dorian, phrygian, lydian, mixolydian, locrian
- Harmonic Minor Family (2): harmonic-minor, phrygian-dominant
- Melodic Minor Family (3): melodic-minor, lydian-dominant, altered
- Symmetric Scales (3): whole-tone, half-whole-dim, whole-half-dim
- Bebop (1): bebop-dominant
- Exotic Scales (4): double-harmonic, hungarian-minor, hirajoshi, in-sen

All 24 book data objects defined inline (id, title, category, description, palette, pdfUrl, stats).

### Modify: `main-site/src/main.jsx`
- Import Guitar page
- Add `<Route path="/guitar" element={<Guitar />} />`

### Modify: `main-site/src/App.jsx`
- Add Guitar CTA section after Writing CTA (~line 1617): "Guitar" label, "Fretboard *Mastery*" heading, subtitle about 24 books, "Browse Library" CTA button
- Add "Guitar" link in footer nav (after "Articles")

### New: `main-site/public/guitar/` directory
- Copy all 24 PDFs from `~/.mirador/exports/` renamed to `{scale-type}.pdf`

## Implementation Order
1. Create `public/guitar/` and copy 24 PDFs
2. Create `src/pages/Guitar.jsx` with all components and data
3. Add route in `src/main.jsx`
4. Add homepage CTA + footer link in `src/App.jsx`
5. `npm run build` -- must pass
6. `npm run preview` -- visual verification
7. Commit, push, deploy

## Verification
```bash
cd ~/Projects/projectlavos-monorepo/main-site
npm run build
npm run preview
# Visit http://localhost:4173/guitar -- 24 books in 7 categories
# Click a book card -- detail modal with description + download
# Download a PDF -- verify it opens correctly
# Visit http://localhost:4173/ -- Guitar CTA visible, links to /guitar
# Footer nav includes Guitar link
# Test responsive: mobile (1 col), tablet (2 col), desktop (4 col)
```
