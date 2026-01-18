# Scaffolding Steps

Detailed step-by-step process for generating a client demo site.

## Pre-Flight Checklist

Before starting:
- [ ] Business name confirmed
- [ ] At least one service/product defined
- [ ] Contact phone number
- [ ] Tier selected based on requirements

## Step 1: Create Project Directory

```bash
# Generate slug from business name
SLUG=$(echo "Business Name" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd 'a-z0-9-')

# Create in client-sites directory
mkdir -p ~/Projects/client-sites/$SLUG
```

**Directory naming conventions:**
- All lowercase
- Hyphens instead of spaces
- No special characters
- Examples: `highland-cleaners`, `jw-cafe-bakery`, `louisville-aesthetics`

## Step 2: Copy Template

```bash
# For Tier 1
cp -r ~/Projects/client-sites/templates/tier1-essential/* ~/Projects/client-sites/$SLUG/

# For Tier 2
cp -r ~/Projects/client-sites/templates/tier2-professional/* ~/Projects/client-sites/$SLUG/

# For Tier 3
cp -r ~/Projects/client-sites/templates/tier3-advanced/* ~/Projects/client-sites/$SLUG/

# For Tier 4
cp -r ~/Projects/client-sites/templates/tier4-enterprise/* ~/Projects/client-sites/$SLUG/
```

## Step 3: Install Dependencies

```bash
cd ~/Projects/client-sites/$SLUG
npm install
```

## Step 4: Update Business Information

### For Tier 1 (Single File)

Edit `src/App.tsx` - update the `businessInfo` object:

```typescript
const businessInfo = {
  name: 'Highland Cleaners',
  tagline: "Louisville's Premier Dry Cleaning Since 1968",
  phone: '(502) 454-4641',
  email: 'info@highlandcleaners.com',
  address: '2457 Bardstown Road, Louisville, KY 40205',
  hours: 'Mon-Fri: 7AM-6PM | Sat: 8AM-3PM',
  mapQuery: 'Highland+Cleaners+Louisville+KY',
  social: {
    facebook: 'https://facebook.com/highlandcleaners',
    instagram: 'https://instagram.com/highlandcleaners',
  },
};

const services = [
  {
    title: 'Dry Cleaning',
    description: 'Expert care for your finest garments',
    icon: 'Shirt'
  },
  // ... more services
];
```

### For Tier 2+ (Config File)

Create/edit `src/config/business.ts`:

```typescript
export const businessConfig = {
  name: 'Business Name',
  tagline: 'Tagline here',
  // ... full config
};

export const services = [...];
export const locations = [...];
```

## Step 5: Update Brand Colors

Edit `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',   // Lightest
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',  // Main brand color
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',  // Darkest
        },
        secondary: {
          500: '#f97316',  // Accent color
          600: '#ea580c',
        }
      }
    }
  },
  plugins: [],
}
```

**Color generation tip:** Use a tool like https://uicolors.app to generate a full palette from a single hex color.

## Step 6: Update Meta Tags

Edit `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Update these -->
    <title>Highland Cleaners | Louisville's Premier Dry Cleaning</title>
    <meta name="description" content="Family-owned dry cleaning serving Louisville since 1968. 12 convenient locations." />

    <!-- OG Tags -->
    <meta property="og:title" content="Highland Cleaners" />
    <meta property="og:description" content="Louisville's Premier Dry Cleaning Since 1968" />
    <meta property="og:image" content="https://highland-cleaners.vercel.app/og-image.png" />
    <meta property="og:url" content="https://highland-cleaners.vercel.app" />
    <meta property="og:type" content="website" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Highland Cleaners" />
    <meta name="twitter:description" content="Louisville's Premier Dry Cleaning Since 1968" />
    <meta name="twitter:image" content="https://highland-cleaners.vercel.app/og-image.png" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## Step 7: Test Build

```bash
# Build
npm run build

# Preview locally
npm run preview
# Opens at http://localhost:4173
```

**Verify:**
- [ ] No build errors
- [ ] Site loads correctly
- [ ] All sections visible
- [ ] Mobile responsive (resize browser)
- [ ] Contact form displays
- [ ] Links work

## Step 8: Generate OG Image

Create HTML template for OG image (1200x630):

```html
<!-- Save to /tmp/og-template.html -->
<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1200px;
      height: 630px;
      background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .card {
      background: white;
      border-radius: 24px;
      padding: 60px;
      width: 1000px;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    h1 {
      font-size: 72px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 20px;
    }
    p {
      font-size: 32px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Business Name</h1>
    <p>Tagline goes here</p>
  </div>
</body>
</html>
```

Generate with Playwright:

```bash
npx playwright screenshot --viewport-size=1200,630 /tmp/og-template.html public/og-image.png
```

## Step 9: Deploy to Vercel

```bash
# Deploy
vercel --prod --yes

# Note the URL (e.g., business-name.vercel.app)
```

## Step 10: Update OG URLs

After deployment, update `index.html` with the actual Vercel URL:

```html
<meta property="og:image" content="https://actual-url.vercel.app/og-image.png" />
<meta property="og:url" content="https://actual-url.vercel.app" />
```

Then redeploy:

```bash
vercel --prod --yes
```

## Step 11: Verify & Screenshot

```bash
# Take screenshot for proof
npx playwright screenshot --wait-for-timeout=3000 "https://business-name.vercel.app" /tmp/demo-screenshot.png
```

## Delivery Checklist

Provide to user:
- [ ] Live URL: `https://business-name.vercel.app`
- [ ] Local path: `~/Projects/client-sites/business-name`
- [ ] Screenshot showing working site
- [ ] OG image preview (paste URL into Slack/Twitter to test)

## Post-Scaffolding Customizations

Common next steps after initial scaffold:

1. **Replace placeholder images** - Add real business photos
2. **Update Google Maps** - Set correct coordinates
3. **Connect contact form** - Integrate with Formspree/Netlify Forms
4. **Add analytics** - Google Analytics or Plausible
5. **Custom domain** - Configure in Vercel dashboard
6. **Additional pages** - If needed, upgrade to Tier 2

## Troubleshooting

### Build fails with TypeScript errors
```bash
# Check for unused imports
npm run build 2>&1 | grep "is declared but"
# Remove unused imports
```

### Tailwind styles not applying
```bash
# Verify content paths in tailwind.config.js
content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
```

### OG image not showing
- Ensure absolute URL (https://...)
- Clear cache / use OG debugger tools
- Verify image exists at URL
