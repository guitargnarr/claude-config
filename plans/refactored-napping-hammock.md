# GEO Quick Wins - All Items Implementation Plan

## Context
Matthew Scott needs to increase his entity footprint for Generative Engine Optimization. We already enhanced JSON-LD on projectlavos.com and added "Built by Matthew Scott at Project Lavos" attribution to 62 client site footers. Now we're implementing all remaining quick wins to maximize structured data signals.

## Changes

### 1. humans.txt + security.txt (5 min)
**Files:**
- CREATE `/Users/matthewscott/Projects/projectlavos-monorepo/main-site/public/humans.txt`
- CREATE `/Users/matthewscott/Projects/projectlavos-monorepo/main-site/public/.well-known/security.txt`

### 2. Client Site Schema Injection (30 min)
**What:** Add `creator` JSON-LD to each client site's `index.html` pointing back to `projectlavos.com/#matthew-scott`
**Approach:** Python script that reads each site's existing index.html, injects a small JSON-LD block before `</head>`, writes back. Many sites already have LocalBusiness schema -- we'll add a SEPARATE `WebPage` schema with `creator` property (won't conflict).
**Schema to inject:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "creator": {
    "@type": "Person",
    "@id": "https://projectlavos.com/#matthew-scott",
    "name": "Matthew Scott",
    "url": "https://projectlavos.com"
  }
}
```
**Files:** ~67 client site `index.html` files
**Deploy:** `vercel --prod --yes` for each site (batch, one at a time per user preference)

### 3. SoftwareApplication Schema for 5 Apps (10 min)
**File:** `/Users/matthewscott/Projects/projectlavos-monorepo/main-site/index.html`
**What:** Add 5 new JSON-LD blocks for FretVision, PhishGuard, Vantage, Jobway, BA Pathfinder as SoftwareApplication type with `author` referencing `@id`

### 4. Expand Guitar Books from 10 to 24 in CollectionPage Schema (10 min)
**File:** `/Users/matthewscott/Projects/projectlavos-monorepo/main-site/index.html` (lines 616-627)
**What:** Add 14 missing books to the `hasPart` array: Major Pentatonic, Major Blues, Natural Minor, Phrygian, Lydian, Mixolydian, Locrian, Phrygian Dominant, Lydian Dominant, Whole Tone, Half-Whole Diminished, Whole-Half Diminished, Double Harmonic (already listed but as "Byzantine/Arabic"), Hungarian Minor, In Sen

### 5. BlogPosting Schema for "The Verification Gap" (5 min)
**File:** `/Users/matthewscott/Projects/projectlavos-monorepo/main-site/index.html`
**What:** Enhance the existing Blog schema's blogPost entry with full BlogPosting properties (datePublished, wordCount, keywords, articleSection)

### 6. Fix Stale Numbers (while we're in there)
**File:** `/Users/matthewscott/Projects/projectlavos-monorepo/main-site/index.html`
**What:** Several meta tags still say "51" instead of "67" deployed sites. Update all instances.

## Execution Order
1. humans.txt + security.txt (create files)
2. Update index.html (items 3-6 all in one edit pass)
3. Build + deploy projectlavos.com
4. Client site schema injection script
5. Batch deploy client sites
6. Verify with build

## Verification
- `npm run build` in main-site (must pass)
- Google Rich Results Test on projectlavos.com
- Spot-check 3 client sites for injected schema
- Playwright screenshot of projectlavos.com
