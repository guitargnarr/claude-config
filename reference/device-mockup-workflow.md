# Device Mockup Workflow

**Created:** January 18, 2026
**Purpose:** Standard operating procedure for creating device mockups from client site screenshots
**Use Case:** projectlavos.com portfolio cards, client presentations, marketing materials

---

## Quick Reference

| Step | Tool | Output |
|------|------|--------|
| 1. Capture | Playwright | Raw screenshots (desktop/mobile/tablet) |
| 2. Mockup | MockUPhone or DeviceMockup.app | Device-framed images |
| 3. Store | /tmp or project assets | Final mockups for portfolio |

---

## Step 1: Capture Screenshots (All Viewports)

### Viewports (Canonical)

| Device | Width | Height | Use Case |
|--------|-------|--------|----------|
| Desktop | 1920 | 1080 | Full-width layouts |
| Mobile (iPhone 14) | 390 | 844 | Mobile responsiveness |
| Tablet (iPad) | 820 | 1180 | Tablet layouts |

### Capture Script

```bash
# Create output directories
mkdir -p /tmp/screenshots/{desktop,mobile,tablet}

# Site URL
SITE_URL="https://your-site.vercel.app"

# Pages to capture (customize per site)
PAGES=("" "beers" "taproom" "events" "shop" "about" "contact" "login")

# Desktop (1920x1080)
for page in "${PAGES[@]}"; do
  name=${page:-home}
  npx playwright screenshot --viewport-size="1920,1080" --wait-for-timeout=5000 \
    "${SITE_URL}/${page}" "/tmp/screenshots/desktop/${name}.png"
done

# Mobile - iPhone 14 (390x844)
for page in "${PAGES[@]}"; do
  name=${page:-home}
  npx playwright screenshot --viewport-size="390,844" --wait-for-timeout=5000 \
    "${SITE_URL}/${page}" "/tmp/screenshots/mobile/${name}.png"
done

# Tablet - iPad (820x1180)
for page in "${PAGES[@]}"; do
  name=${page:-home}
  npx playwright screenshot --viewport-size="820,1180" --wait-for-timeout=5000 \
    "${SITE_URL}/${page}" "/tmp/screenshots/tablet/${name}.png"
done
```

### Claude Code Commands

```bash
# Single page, all viewports
npx playwright screenshot --viewport-size="1920,1080" --wait-for-timeout=5000 "URL" desktop.png
npx playwright screenshot --viewport-size="390,844" --wait-for-timeout=5000 "URL" mobile.png
npx playwright screenshot --viewport-size="820,1180" --wait-for-timeout=5000 "URL" tablet.png
```

---

## Step 2: Generate Device Mockups

### Recommended Tools

| Tool | URL | Best For | Cost |
|------|-----|----------|------|
| **MockUPhone** | mockuphone.com | Quick iPhone/iPad frames, 80+ devices | Free |
| **DeviceMockup.app** | devicemockup.app | 219+ devices, local processing, privacy | Free |
| **Screenhance** | screenhance.com | iPhone 15 Pro Max, multiple export formats | Free |
| **iMockup Pro** | imockup.pro | 4K export, Figma integration, clay variants | Free |

### Device Selection Guide

| Screenshot Type | Recommended Device Frame |
|-----------------|--------------------------|
| Mobile (390x844) | iPhone 15 Pro or iPhone 14 Pro |
| Tablet (820x1180) | iPad Pro 12.9" or iPad Air |
| Desktop (1920x1080) | MacBook Pro 16" or browser frame |

### Manual Workflow (MockUPhone)

1. Go to [mockuphone.com](https://mockuphone.com)
2. Select device category (iPhone, iPad, etc.)
3. Choose specific model (iPhone 15 Pro recommended)
4. Upload screenshot from `/tmp/screenshots/mobile/`
5. Download mockup PNG
6. Repeat for tablet screenshots with iPad frame

### Manual Workflow (DeviceMockup.app)

1. Go to [devicemockup.app](https://devicemockup.app)
2. Select device from 219+ options
3. Upload screenshot (PNG, JPG, WebP supported)
4. Preview and adjust if needed
5. Download mockup (PNG format)

**Note:** DeviceMockup.app processes locally in browser - files never leave your device.

---

## Step 3: Store and Organize

### Directory Structure

```
/tmp/screenshots/
  copper-barrel-brewing/
    raw/
      desktop/
        home.png
        beers.png
        ...
      mobile/
        home.png
        beers.png
        ...
      tablet/
        home.png
        beers.png
        ...
    mockups/
      iphone-home.png
      iphone-beers.png
      ipad-home.png
      macbook-home.png
```

### For Portfolio Cards (projectlavos.com)

Portfolio cards should display:
- **Primary:** iPhone mockup of homepage (mobile-first)
- **Secondary:** Desktop screenshot or MacBook mockup
- **Optional:** iPad mockup for tablet-optimized sites

---

## Automation Notes

### Local iPhone Mockup Script (Recommended)

**Script:** `~/.claude/scripts/create-iphone-mockup.js`

```bash
# Install dependency (one-time)
cd ~/.claude/scripts && npm install canvas

# Generate iPhone mockup
node ~/.claude/scripts/create-iphone-mockup.js input-mobile.png output-mockup.png
```

**Features:**
- iPhone 14 Pro frame with Dynamic Island
- Proper rounded corners and bezels
- Side buttons (power + volume)
- No external API required - runs locally

### Additional Asset Scripts

**OG Image Generator:**
```bash
# Create OG image (1200x630) with phone mockup and branding
# See /tmp/create-og-image.js for template
```

**QR Code Generator:**
```bash
# Requires: npm install qrcode
const QRCode = require('qrcode');
await QRCode.toFile('output.png', 'https://site.vercel.app', { width: 370 });
```

**Favicon Generator:**
```bash
# Create circular favicon with initials
# See /tmp/create-favicon.js for template
```

### External Tools (Manual Upload)

For additional device frames beyond iPhone:

---

## Integration with Portfolio

### projectlavos.com Card Stack

Each client site card should include:
- Site name and description
- iPhone mockup thumbnail (primary visual)
- "View Site" link
- Optional: Desktop preview on hover

### Image Requirements

| Use Case | Recommended Size | Format |
|----------|------------------|--------|
| Card thumbnail | 400x800 (2:1 aspect) | WebP or PNG |
| Lightbox/modal | Original mockup size | PNG |
| OG image | 1200x630 | PNG |

---

## Checklist: Client Site Verification + Mockup

Before adding a client site to portfolio:

- [ ] **Capture screenshots** (desktop, mobile, tablet)
- [ ] **Verify content** (read screenshots, check for issues)
- [ ] **Generate mockups** (iPhone for mobile, iPad for tablet)
- [ ] **Store in project assets** or portfolio image directory
- [ ] **Create portfolio card** with mockup as primary image
- [ ] **Update client-cms** if using managed content

---

## Related Documents

- **Tier Templates:** @~/.claude/reference/tier-templates-reference.md
- **Workflows:** @~/.claude/reference/workflows.md
- **Deployment Inventory:** @~/.claude/reference/deployment-inventory.md

---

## Sources

- [MockUPhone](https://mockuphone.com) - 80+ devices, free
- [DeviceMockup.app](https://devicemockup.app) - 219+ devices, local processing
- [Screenhance](https://screenhance.com) - iPhone/iPad frames, multiple formats
- [iMockup Pro](https://imockup.pro) - 4K export, Figma integration
- [Mediamodifier](https://mediamodifier.com) - Has Mockup API for automation
- [Mockuuups Studio](https://mockuuups.studio) - Drag-and-drop, best Apple mockups guide

---

**Last Updated:** January 18, 2026
