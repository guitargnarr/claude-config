---
name: client-demo-generator
description: Auto-scaffold branded demo websites from business information. Generates complete Vite + React + Tailwind projects using tier templates. Use when user wants to create a demo site, scaffold a client site, or says "create a site for [business]".
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---

# Client Demo Generator

Generate production-ready demo websites from business information using proven tier templates.

## When to Use This Skill

**Trigger phrases:**
- "Create a demo site for [business name]"
- "Scaffold a new client site"
- "Generate a tier [1-4] site for..."
- "Build a website for [business]"
- "New client demo: [business name]"

## Process Overview

### Step 1: Gather Business Information

Collect these required fields (ask if not provided):

```json
{
  "name": "Business Name",
  "tagline": "Compelling tagline",
  "phone": "(502) 555-0123",
  "email": "hello@business.com",
  "address": "123 Main St, Louisville, KY 40202",
  "hours": "Mon-Fri: 9AM-5PM",
  "services": [
    { "title": "Service 1", "description": "Description" }
  ],
  "locations": [
    { "name": "Main", "address": "123 Main St", "phone": "(502) 555-0123" }
  ],
  "social": {
    "facebook": "https://facebook.com/business",
    "instagram": "https://instagram.com/business"
  },
  "colors": {
    "primary": "#14b8a6",
    "secondary": "#f97316"
  }
}
```

### Step 2: Select Tier Template

Based on requirements, choose the appropriate tier:

| Tier | Use When |
|------|----------|
| **Tier 1** | Simple landing page, contact form, no booking |
| **Tier 2** | Multi-page, appointment booking needed |
| **Tier 3** | E-commerce, product catalog, shopping cart |
| **Tier 4** | User auth, admin dashboard, API integration |

**Default: Tier 1** unless client needs booking (Tier 2) or products (Tier 3).

### Step 3: Scaffold the Project

1. Copy template from `~/Projects/client-sites/templates/tier[N]-*`
2. Create new directory: `~/Projects/client-sites/[business-slug]/`
3. Update business info in config
4. Apply brand colors to tailwind.config.js
5. Generate OG image
6. Build and deploy to Vercel

### Step 4: Deliver

Provide:
- Vercel URL
- Local path
- Screenshot proof
- Next steps for customization

## Template Locations

```
~/Projects/client-sites/templates/
├── tier1-essential/       # Landing page
├── tier2-professional/    # Multi-page + booking
├── tier3-advanced/        # E-commerce
└── tier4-enterprise/      # Full SaaS
```

## Reference Files

- **Tier Templates Reference:** ~/.claude/reference/tier-templates-reference.md
- **Brand System:** Teal (#14b8a6) / Orange (#f97316)
- **Deployment Inventory:** ~/.claude/reference/deployment-inventory.md

## Example Sites Built

| Business | Tier | URL |
|----------|------|-----|
| Highland Cleaners | 1 | highland-cleaners.vercel.app |
| JW Cafe & Bakery | 1 | (local) |
| Nachbar | 1 | (local) |
| Rejuvenation Med Spa | 2 | (local) |

## Scaffolding Commands

```bash
# 1. Copy template
cp -r ~/Projects/client-sites/templates/tier1-essential ~/Projects/client-sites/[slug]

# 2. Navigate
cd ~/Projects/client-sites/[slug]

# 3. Install deps
npm install

# 4. Update business info in src/App.tsx or src/config/business.ts

# 5. Update tailwind.config.js colors

# 6. Test build
npm run build && npm run preview

# 7. Deploy
vercel --prod --yes

# 8. Generate OG image
# For differentiated sites: add to ~/.claude/scripts/create-cinematic-og.js SITE_CONFIGS, then:
# node ~/.claude/scripts/create-cinematic-og.js --site <key>
# git add -f public/og-image.png  (global gitignore blocks *.png)
```

## Color Customization

Update `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#14b8a6',  // Replace with client brand
          600: '#0d9488',
          700: '#0f766e',
        },
        secondary: {
          500: '#f97316',  // Replace with client accent
          600: '#ea580c',
        }
      }
    }
  }
}
```

## Success Criteria

Task complete when:
1. Site builds without errors
2. Deployed to Vercel with working URL
3. OG image generated and working
4. User can see site in browser
5. Business info correctly populated

## Common Customizations After Scaffolding

- Add real photos (replace placeholders)
- Update Google Maps coordinates
- Add additional services/locations
- Connect contact form to email service
- Add analytics tracking
