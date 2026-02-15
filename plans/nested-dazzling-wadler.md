# Plan: Blog Section for projectlavos.com

## Context
The Verification Gap article PDF is complete with cinematic cover page and 6 inline images. It's posted on LinkedIn. Now we need to feature it on projectlavos.com as an interactive blog experience -- a thumbnail card that opens a premium in-page PDF viewer (no Adobe, no browser PDF renderer).

## Approach: Pre-rendered Page Images + Custom Modal Viewer

### Why pre-rendered images instead of react-pdf
- `react-pdf` / `pdfjs-dist` adds ~400KB to the bundle for a 7-page PDF that rarely changes
- Pre-rendering to PNGs means zero runtime processing, instant display, no WASM worker
- The cinematic dark pages with embedded images will look identical as rasterized PNGs

### Step 1: Convert PDF pages to PNGs
- Use `pdftoppm` (poppler) to render each page at 200 DPI (~1650px wide, retina-ready)
- Store in `main-site/public/articles/verification-gap/page-1.png` through `page-7.png`
- Copy original PDF there too for a "Download PDF" link
- `git add -f` all PNGs (global gitignore)

### Step 2: Create `src/pages/Blog.jsx` (new route: /blog)
- Follows Manifesto.jsx pattern: own layout, ambient background, particles, back link, IntersectionObserver
- Article data array (id, title, subtitle, date, pageCount, coverImage, pages[], pdfUrl)
- **ArticleCard component**: `card-glass-elite` glass card, cover image thumbnail with aspect-[3/4], skeleton loader, title + subtitle + page count + date below
- **ArticleViewer modal component** (the PDF reader):
  - Fixed overlay with `bg-black/90 backdrop-blur-md`
  - Framer Motion `AnimatePresence` for open/close and page transitions
  - Large centered page image (`max-w-4xl`, `max-h-[85vh]`)
  - Round glass navigation buttons (left/right arrows) matching site's dark glass aesthetic
  - Stylistic X close button (top-right, rotates on hover)
  - Page counter (top-center, monospace, glass pill)
  - Keyboard navigation (arrow keys + Escape)
  - Body scroll lock when open
  - Adjacent page preloading
  - "Download PDF" link at bottom
  - Touch swipe support for mobile

### Step 3: Add route in `main.jsx`
- `import Blog from './pages/Blog.jsx'`
- `<Route path="/blog" element={<Blog />} />`
- Eager import (small component, no heavy deps beyond Framer Motion which is already bundled)

### Step 4: Add homepage CTA in `App.jsx`
- Insert between `</main>` (line 1558) and the Footer (line 1560)
- Actually needs to go INSIDE `<main>`, before line 1558's `</main>`
- New `<section id="writing">` with the same fade-in pattern (IntersectionObserver auto-picks up `section[id]`)
- Centered layout: "WRITING" eyebrow, "Beyond the Code" heading, subtitle, "Read Articles" ghost button with arrow
- Uses existing classes: `heading-display`, `accent-italic`, `gradient-text`, `section-glow-full`, teal ghost button style

### Step 5: Add blog link in Footer
- After the Manifesto link (line 1585), add `<span>·</span>` + `<a href="/blog">Articles</a>`
- Matches existing styling pattern

### Step 6: Minimal CSS addition
- Add `.z-60 { z-index: 60; }` to App.css for modal controls layering above the `z-50` overlay

## Files Modified
| File | Change |
|------|--------|
| `main-site/public/articles/verification-gap/*.png` | 7 new page images + PDF |
| `main-site/src/pages/Blog.jsx` | New file: blog page + article viewer modal |
| `main-site/src/main.jsx` | Add /blog route |
| `main-site/src/App.jsx` | Add writing CTA section (~line 1557) + footer blog link (~line 1585) |
| `main-site/src/App.css` | Add `.z-60` utility |

## Verification
1. `npm run build` passes (tsc + vite)
2. `npm run preview` -- visit `/`, scroll to writing CTA, click "Read Articles"
3. On `/blog`, click the article thumbnail -- modal opens with page 1
4. Arrow keys navigate pages, Escape closes
5. X button closes, Download PDF works
6. Mobile: touch swipe navigates pages
7. Playwright screenshot of `/blog` and the open modal
8. Deploy: `vercel --prod --yes`
