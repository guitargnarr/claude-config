# SEO Checklist for Client Sites

**Created:** 2026-01-12
**Purpose:** Standardized SEO requirements for all client demo sites
**Automation:** Use `~/Projects/client-sites/fix-all-meta.py` for bulk updates

---

## Pre-Deployment Checklist

### 1. Meta Title (Required)
- [ ] Under 60 characters
- [ ] Primary keyword first
- [ ] Business name included
- [ ] Location if local business
- [ ] Format: `[Primary Keyword] | [Business Name] - [Location]`

**Example:**
```html
<title>Emergency Plumber Louisville | Tom Drexler - 24/7 Service</title>
```

### 2. Meta Description (Required)
- [ ] 150-155 characters (shows fully in SERP)
- [ ] Contains primary keyword naturally
- [ ] Includes call-to-action
- [ ] Compelling value proposition
- [ ] Phone number or "Call Now" for service businesses

**Example:**
```html
<meta name="description" content="Louisville's trusted plumber since 1982. 24/7 emergency service, 200+ trucks. Call (502) 456-5982 for same-day appointments. 4th generation master plumber.">
```

### 3. JSON-LD Structured Data (Required)
- [ ] LocalBusiness schema for local businesses
- [ ] Correct @type (Plumber, Restaurant, Dentist, etc.)
- [ ] Name, address, phone, hours
- [ ] Geographic coordinates
- [ ] Price range if applicable
- [ ] Aggregate rating if reviews exist

**Template:**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Business Name",
  "image": "https://example.com/og-image.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Louisville",
    "addressRegion": "KY",
    "postalCode": "40202",
    "addressCountry": "US"
  },
  "telephone": "+1-502-555-0123",
  "openingHours": "Mo-Fr 09:00-17:00",
  "priceRange": "$$",
  "url": "https://example.com",
  "sameAs": [
    "https://facebook.com/business",
    "https://instagram.com/business"
  ]
}
```

### 4. Open Graph Tags (Required)
- [ ] og:title (same as meta title or slightly longer)
- [ ] og:description (same as meta description)
- [ ] og:image (1200x630px, absolute URL)
- [ ] og:url (canonical URL)
- [ ] og:type (website or local_business)
- [ ] og:site_name

**Template:**
```html
<meta property="og:title" content="Emergency Plumber Louisville | Tom Drexler">
<meta property="og:description" content="Louisville's trusted plumber since 1982...">
<meta property="og:image" content="https://tom-drexler.vercel.app/og-image.png">
<meta property="og:url" content="https://tom-drexler.vercel.app">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Tom Drexler Plumbing">
```

### 5. Twitter Cards (Recommended)
- [ ] twitter:card (summary_large_image)
- [ ] twitter:title
- [ ] twitter:description
- [ ] twitter:image

### 6. Canonical URL (Required)
- [ ] Absolute URL (not relative)
- [ ] Points to preferred version
- [ ] No trailing slash inconsistency

```html
<link rel="canonical" href="https://tom-drexler.vercel.app">
```

### 7. H1 Hierarchy (Required)
- [ ] Single H1 per page
- [ ] H1 contains primary keyword
- [ ] H2s for section headings
- [ ] Logical heading order (no skipping levels)

### 8. Image Alt Text (Required)
- [ ] All images have alt text
- [ ] Descriptive, not keyword-stuffed
- [ ] Empty alt="" for decorative images
- [ ] Include location for local businesses

**Good:** `alt="Tom Drexler service truck in Louisville Kentucky"`
**Bad:** `alt="plumber plumbing Louisville KY emergency plumber"`

### 9. Mobile-First (Required)
- [ ] Viewport meta tag present
- [ ] Touch targets 44x44px minimum
- [ ] No horizontal scroll
- [ ] Text readable without zoom
- [ ] Test with Playwright 375x667 viewport

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

---

## File Requirements

### robots.txt (Required)
Location: `/public/robots.txt`

```
User-agent: *
Allow: /
Sitemap: https://[domain]/sitemap.xml
```

### sitemap.xml (Recommended)
For multi-page sites. Use `vite-plugin-sitemap` for automatic generation.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.w3.org/2000/urlset/1.0">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2026-01-12</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

### favicon.ico (Required)
- [ ] 32x32 and 16x16 sizes
- [ ] Apple touch icon (180x180)
- [ ] Located in /public/

---

## High-ROI SEO Targets

Based on ULTRATHINK analysis (Jan 2026):

| Priority | Site | Search Intent | Est. Monthly Volume |
|----------|------|---------------|---------------------|
| 1 | tom-drexler | "Louisville plumber emergency" | 2,000+ |
| 2 | genesis-diamonds | "Louisville jeweler engagement ring" | 1,500+ |
| 3 | affinity-dental | "dentist Louisville KY" | 2,500+ |
| 4 | dupont-pediatric-dentistry | "pediatric dentist Louisville" | 1,200+ |
| 5 | headliners-louisville | "Louisville live music venue" | 1,000+ |
| 6 | fritz-salon | "men's salon Louisville" | 800+ |
| 7 | schwartz-bankruptcy | "bankruptcy lawyer Louisville" | 600+ |
| 8 | hideaway-saloon | "video game bar Louisville" | 500+ |
| 9 | kentuckiana-gastro | "gastroenterologist Louisville" | 400+ |
| 10 | jbh-dental | "family dentist St Matthews" | 300+ |

---

## Automation Commands

### Bulk Meta Fix (All Sites)
```bash
cd ~/Projects/client-sites
python3 fix-all-meta.py
```

### Add JSON-LD to Single Site
```bash
cd ~/Projects/client-sites
python3 add-jsonld.py [site-folder]
```

### Verify OG Image
```bash
npx playwright screenshot --wait-for-timeout=5000 "https://[url]" /tmp/og-check.png
```

### Mobile Viewport Test
```bash
npx playwright screenshot --viewport-size=375,667 --wait-for-timeout=5000 "https://[url]" /tmp/mobile.png
```

---

## Business Type Mappings

For JSON-LD @type field:

| Business Category | Schema.org @type |
|-------------------|------------------|
| Plumber | Plumber |
| Restaurant/Cafe | Restaurant |
| Dentist | Dentist |
| Salon/Barber | HairSalon or BarberShop |
| Law Firm | LegalService |
| Medical Practice | MedicalClinic |
| Retail Store | Store |
| Gym/Fitness | HealthClub |
| Church | Church |
| Bar/Nightclub | BarOrPub |
| Real Estate | RealEstateAgent |
| Auto Service | AutoRepair |
| Cleaning Service | HousekeepingService |
| Spa | DaySpa |
| Jewelry Store | JewelryStore |

---

## Verification Tools

### Google Rich Results Test
https://search.google.com/test/rich-results

### Facebook Sharing Debugger
https://developers.facebook.com/tools/debug/

### Twitter Card Validator
https://cards-dev.twitter.com/validator

### Lighthouse SEO Audit
```bash
npx lighthouse https://[url] --only-categories=seo --output=json
```

---

## Post-Deployment Checklist

- [ ] Submit sitemap to Google Search Console
- [ ] Test OG image with Facebook debugger
- [ ] Verify JSON-LD with Rich Results Test
- [ ] Check mobile rendering
- [ ] Verify canonical URL resolves correctly
- [ ] Test page speed (target: 90+ Lighthouse)

---

**Reference:** @~/.claude/reference/deployment-inventory.md for all site URLs
**Automation:** ~/Projects/client-sites/fix-all-meta.py
**Last Updated:** 2026-01-12
