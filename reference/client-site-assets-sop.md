# Client Site Asset Generation SOP

**Updated:** February 9, 2026
**Time:** ~10 minutes end-to-end
**Proven with:** copper-barrel-brewing (Jan 2026)

---

## Prerequisites (one-time)

```bash
cd ~/.claude/scripts && npm install canvas qrcode
```

---

## Step-by-Step

### 1. Capture Mobile Screenshot (2 min)

```bash
npx playwright screenshot --viewport-size="390,844" --wait-for-timeout=5000 \
  "https://<site>.vercel.app" mobile.png
```

### 2. Generate All Assets (1 min)

```bash
node ~/.claude/scripts/create-client-assets.js <site-name> ./mobile.png \
  --colors "#primary,#secondary" \
  --title "Display Name" \
  --subtitle "Tagline"
```

> **OG Image Standard (Feb 2026):** For sites in `create-cinematic-og.js`, use that script instead of the generic OG from `create-client-assets.js`. Run `node ~/.claude/scripts/create-cinematic-og.js --site <key>`. Add new sites by extending `SITE_CONFIGS` in that script. Force-add with `git add -f` (global gitignore blocks *.png).

**Outputs in `./output/`:**

| File | Size | Use |
|------|------|-----|
| `<site>-preview.png` | 430x880 | Portfolio card (iPhone mockup) |
| `<site>-og.png` | 1200x630 | Social sharing |
| `<site>-qr.png` | 370x370 | Print materials |
| `favicon-32.png` | 32x32 | Browser tab |
| `favicon-16.png` | 16x16 | Browser tab (small) |
| `apple-touch-icon.png` | 180x180 | iOS home screen |

### 3. Copy to Client Site (1 min)

```bash
cp output/favicon-32.png ~/Projects/client-sites/<site>/public/favicon.png
cp output/favicon-16.png ~/Projects/client-sites/<site>/public/
cp output/apple-touch-icon.png ~/Projects/client-sites/<site>/public/
cp output/<site>-og.png ~/Projects/client-sites/<site>/public/og-image.png
```

### 4. Copy to Portfolio (1 min)

```bash
cp output/<site>-preview.png ~/Projects/projectlavos-monorepo/main-site/public/previews/
cp output/<site>-og.png ~/Projects/projectlavos-monorepo/main-site/public/og-images/
cp output/<site>-qr.png ~/Projects/projectlavos-monorepo/main-site/public/qr-codes/
```

### 5. Update Client Site HTML (1 min)

Add to `<head>` in `index.html`:
```html
<link rel="icon" type="image/png" href="/favicon.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<meta property="og:image" content="https://<site>.vercel.app/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

### 6. Add Portfolio Card (2 min)

In `~/Projects/projectlavos-monorepo/main-site/src/App.jsx`, add to `localClients`:
```javascript
{
  id: "<site-id>",
  title: "Business Name",
  url: "https://<site>.vercel.app",
  preview: "/previews/<site>-preview.png",
  ogImage: "/og-images/<site>-og.png",
  qrCode: "/qr-codes/<site>-qr.png",
  description: "Short description",
  category: "Category",
  specWork: true,
  details: "Detailed description..."
}
```

### 7. Verify Locally FIRST (1 min)

```bash
cd ~/Projects/client-sites/<site> && npm run dev &
npx playwright screenshot --wait-for-timeout=5000 --full-page "http://localhost:5173" local-verify.png
kill %1
```

Read the screenshot. All sections must be visible. Fix rendering bugs locally before deploying.

### 8. Deploy Both (2 min)

```bash
cd ~/Projects/client-sites/<site> && vercel --prod --yes
cd ~/Projects/projectlavos-monorepo/main-site && vercel --prod --yes
```

### 9. Verify Live (1 min)

```bash
curl -I "https://<site>.vercel.app/og-image.png"  # HTTP 200
npx playwright screenshot --wait-for-timeout=5000 "https://projectlavos.com" verify.png
```

---

## Scripts Reference

| Script | Path | Purpose |
|--------|------|---------|
| All-in-one | `~/.claude/scripts/create-client-assets.js` | Mockup + OG + QR + favicons |
| iPhone only | `~/.claude/scripts/create-iphone-mockup.js` | Standalone iPhone frame |

## Online Alternatives (if script unavailable)

- [MockUPhone](https://mockuphone.com) - 80+ devices, free
- [DeviceMockup.app](https://devicemockup.app) - 219+ devices, local processing

---

## Checklist

- [ ] Mobile screenshot captured (390x844)
- [ ] All 6 assets generated
- [ ] 4 files copied to client site `public/`
- [ ] 3 files copied to portfolio directories
- [ ] HTML meta tags added
- [ ] Portfolio card entry added
- [ ] Client site deployed
- [ ] Portfolio deployed
- [ ] OG image returns HTTP 200
- [ ] Portfolio card visible
