# Tier 4 Ultra-Luxury Client Site Generator

Generate production-ready ultra-luxury demo websites with AI Oracle concierge, user authentication, and museum-quality OG images for high-end Louisville businesses.

## When to Use This Skill

**Trigger phrases:**
- "Tier 4 site for [business]"
- "Ultra-luxury demo for [business]"
- "High-end site with Oracle for [business]"
- "UHNW client site for [business]"
- "Premium Tier 4 for [business]"

**Best for:**
- Jewelry stores, luxury retail
- High-end medical/aesthetic practices
- Premium real estate
- Fine dining establishments
- Luxury automotive
- Wealth management / financial services
- Any business targeting ultra-high-net-worth individuals

---

## Process Overview

### Phase 1: Business Intelligence Gathering

**Scrape the business website to extract:**
```
- Business name & tagline
- Address, phone, hours
- Founding year & founder name
- Key differentiators / guarantees
- Services or product categories
- Designer brands / certifications
- Price range indicators
- Social proof (years in business, awards)
```

**Use WebFetch to gather info:**
```bash
# Scrape business website
WebFetch [business-url] "Extract: name, address, phone, hours, founding year, founder, key services, guarantees, certifications, designer brands, social proof"
```

---

### Phase 2: Project Scaffolding

**Create Vite + React + TypeScript project:**
```bash
cd ~/Projects/client-sites
npm create vite@latest [business-slug] -- --template react-ts
cd [business-slug]
npm install
```

**Install Tailwind CSS v4 (luxury standard):**
```bash
npm install tailwindcss @tailwindcss/vite
```

**Configure vite.config.ts:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

---

### Phase 3: Luxury Theme System (Tailwind v4)

**Create src/index.css with @theme directive:**

```css
@import "tailwindcss";

/* Ultra-Luxury Theme for UHNW Clientele */
/* Tailwind CSS v4 - CSS-first configuration */

@theme {
  /* Luxury Color Palette - Customize per brand */
  --color-obsidian: #0a0a0a;
  --color-charcoal: #1a1a1a;
  --color-graphite: #2d2d2d;
  --color-slate: #4a4a4a;
  --color-silver: #c0c0c0;
  --color-platinum: #e5e4e2;
  --color-ivory: #fffff0;

  /* Brand Accent - Replace with client colors */
  --color-gold: #d4af37;
  --color-gold-light: #f4e4bc;
  --color-gold-dark: #b8860b;

  /* Typography */
  --font-display: 'Playfair Display', 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Inter', 'Helvetica Neue', system-ui, sans-serif;
  --font-accent: 'Cormorant', Georgia, serif;

  /* Animations */
  --animate-shimmer: shimmer 3s ease-in-out infinite;
  --animate-sparkle: sparkle 2s ease-in-out infinite;
  --animate-float: float 6s ease-in-out infinite;
  --animate-glow: glow 2s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { background-position: -200% center; }
  50% { background-position: 200% center; }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.3); }
  50% { box-shadow: 0 0 40px rgba(212, 175, 55, 0.6); }
}

/* Base Styles */
body {
  font-family: var(--font-body);
  background-color: var(--color-obsidian);
  color: var(--color-platinum);
  line-height: 1.7;
  font-weight: 300;
  letter-spacing: 0.02em;
  -webkit-font-smoothing: antialiased;
}

/* Luxury Typography */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 400;
  letter-spacing: 0.05em;
}

/* Luxury Button Styles */
.btn-luxury {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-obsidian);
  background: linear-gradient(135deg, var(--color-gold-light) 0%, var(--color-gold) 100%);
  border: none;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.btn-luxury:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 40px rgba(212, 175, 55, 0.3);
}

.btn-outline-luxury {
  padding: 1rem 2.5rem;
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-gold);
  background: transparent;
  border: 1px solid var(--color-gold);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.btn-outline-luxury:hover {
  background: var(--color-gold);
  color: var(--color-obsidian);
}

/* Luxury Card */
.card-luxury {
  background: linear-gradient(145deg, var(--color-charcoal) 0%, var(--color-obsidian) 100%);
  border: 1px solid rgba(212, 175, 55, 0.1);
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.card-luxury:hover {
  border-color: rgba(212, 175, 55, 0.3);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  transform: translateY(-4px);
}

/* Oracle AI Concierge */
.oracle-container {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, transparent 50%);
  border: 1px solid rgba(212, 175, 55, 0.2);
  backdrop-filter: blur(20px);
}

/* Glass Effect */
.glass-dark {
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(20px);
}

/* Scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--color-obsidian); }
::-webkit-scrollbar-thumb { background: var(--color-gold); border-radius: 4px; }

/* Selection */
::selection {
  background: var(--color-gold);
  color: var(--color-obsidian);
}
```

---

### Phase 4: App.tsx Architecture

**Required Components:**

1. **ToastProvider & ToastContext**
   - Success, error, info, warning states
   - Auto-dismiss after 4 seconds
   - Animated entrance/exit

2. **AuthProvider & AuthContext**
   - User state management
   - Tier system (Platinum/Gold/Silver)
   - Wishlist functionality
   - Login/logout methods

3. **OracleAI Component**
   - Auto-appears after 3 seconds
   - Minimizable chat interface
   - Suggestion chips based on business type
   - Context-aware responses
   - Typing indicator animation

4. **Navigation**
   - Sticky header with glass effect
   - Mobile hamburger menu
   - User account dropdown when logged in

5. **HomePage**
   - Parallax hero with brand imagery
   - Guarantees/trust badges strip
   - Featured products grid
   - Why choose us section
   - Location/contact info

6. **CollectionPage**
   - Category filtering
   - Product grid with hover effects
   - Quick view functionality

7. **ProductCard**
   - Luxury hover animations
   - Wishlist toggle
   - Price formatting
   - Badge system (New, Bestseller, Certified)

8. **ServicesPage**
   - Service cards with icons
   - Appointment booking CTA

9. **LoginPage / AccountPage**
   - Clean authentication forms
   - Account dashboard with tier display
   - Wishlist management

10. **Footer**
    - Business info
    - Quick links
    - Social media
    - Hours of operation

---

### Phase 5: Oracle AI Configuration

**Customize initial suggestions based on business type:**

```typescript
const oracleInitialSuggestions = [
  // For jewelry:
  "Help me find an engagement ring",
  "Show me luxury watches",
  "What's your best seller?",
  "Schedule a private viewing",

  // For med spa:
  "What treatments do you offer?",
  "Book a consultation",
  "Tell me about Botox",
  "What's your most popular service?",

  // For fine dining:
  "Make a reservation",
  "View the menu",
  "Private dining options",
  "Tell me about the chef"
];
```

**Response patterns:**
- Match keywords to provide relevant, detailed responses
- Always end with suggestion chips for next actions
- Maintain luxury tone (formal but warm)
- Include specific details from business research

---

### Phase 6: Product/Service Catalog

**Structure products with rich metadata:**

```typescript
interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  priceRange?: string;
  image: string;
  description: string;
  features: string[];
  designer?: string;
  certified?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}
```

**Use high-quality Unsplash images:**
- Search for relevant luxury imagery
- Use `?w=800&q=90` for product cards
- Use `?w=1920&q=90` for hero images

---

### Phase 7: Build & Deploy

```bash
# Build
npm run build

# Create vercel.json for SPA routing
echo '{"rewrites":[{"source":"/(.*)","destination":"/"}]}' > vercel.json

# Deploy
vercel --prod --yes

# Add clean alias
vercel alias [deployment-url] [business-slug].vercel.app
```

---

### Phase 8: Ultra-Luxury OG Image

**Create museum-quality OG image (1200x630px):**

1. **Write design philosophy** (.md file)
   - Name the aesthetic movement
   - Define visual principles
   - Emphasize craftsmanship

2. **Generate image with Python/PIL:**
   - Obsidian background with radial gradient
   - Brand accent color accents (gold, etc.)
   - Art deco corner elements
   - Geometric icon representing business
   - Business name in elegant serif (Italiana, Playfair)
   - Tagline in italic serif
   - Establishment info
   - Subtle sparkle/light effects
   - Film grain texture

3. **Save to `/public/og-image.png`**

4. **Update index.html meta tags:**
   ```html
   <meta property="og:image" content="https://[url]/og-image.png" />
   <meta property="og:image:width" content="1200" />
   <meta property="og:image:height" content="630" />
   ```

---

### Phase 9: Add to Portfolio

**Update projectlavos main-site:**

1. Add entry to `localClients` array in App.jsx:
   ```javascript
   {
     id: "[business-slug]",
     title: "[Business Name]",
     url: "https://[business-slug].vercel.app",
     preview: "/previews/[business-slug].png",
     ogImage: "/og-images/[business-slug]-og.png",
     qrCode: "/qr-codes/[business-slug]-qr.png",
     description: "[Short tagline]",
     altText: "[SEO description]",
     category: "[Category]",
     specWork: true,
     details: "Tier 4 ultra-luxury demo... [features description]"
   }
   ```

2. Create assets:
   ```bash
   # Preview screenshot
   npx playwright screenshot --viewport-size="800,600" --wait-for-timeout=5000 "[url]" ~/Projects/projectlavos-monorepo/main-site/public/previews/[slug].png

   # Copy OG image
   cp ~/Projects/client-sites/[slug]/public/og-image.png ~/Projects/projectlavos-monorepo/main-site/public/og-images/[slug]-og.png

   # Generate QR code
   python3 -c "import qrcode; qr = qrcode.QRCode(version=1, box_size=10, border=4); qr.add_data('[url]'); qr.make(fit=True); img = qr.make_image(); img.save('~/Projects/projectlavos-monorepo/main-site/public/qr-codes/[slug]-qr.png')"
   ```

3. Build and deploy main-site:
   ```bash
   cd ~/Projects/projectlavos-monorepo/main-site
   npm run build && vercel --prod --yes
   ```

---

## Quality Checklist

Before marking complete:

- [ ] Business info accurately scraped and integrated
- [ ] Tailwind v4 @theme with luxury color palette
- [ ] Oracle AI appears after 3 seconds with relevant suggestions
- [ ] User auth with tier system works
- [ ] Toast notifications functional
- [ ] All pages route correctly
- [ ] Mobile responsive
- [ ] Hero parallax smooth
- [ ] Product cards have hover animations
- [ ] OG image is museum-quality (1200x630)
- [ ] Meta tags include absolute OG image URL
- [ ] Site deployed and accessible
- [ ] Added to projectlavos.com portfolio
- [ ] Preview, OG, and QR assets created

---

## Color Palette Variations

**Jewelry/Luxury Goods:** Obsidian + Gold
```css
--color-accent: #d4af37;
--color-accent-light: #f4e4bc;
--color-accent-dark: #b8860b;
```

**Medical/Spa:** Deep Navy + Silver
```css
--color-accent: #c0c0c0;
--color-accent-light: #e5e4e2;
--color-accent-dark: #a0a0a0;
--color-obsidian: #0a1628;
```

**Fine Dining:** Burgundy + Cream
```css
--color-accent: #722f37;
--color-accent-light: #d4a574;
--color-accent-dark: #4a1c23;
```

**Real Estate:** Slate + Emerald
```css
--color-accent: #50c878;
--color-accent-light: #98d8aa;
--color-accent-dark: #2e7d32;
```

---

## Success Criteria

Task complete when:
1. Site builds without errors
2. Deployed with working URL
3. Oracle AI functional
4. Auth system works
5. OG image passes social share preview test
6. Added to projectlavos.com
7. User can see visual proof (screenshot)

---

## Reference Implementation

**Genesis Diamonds** - The gold standard:
- URL: https://genesis-diamonds.vercel.app
- Local: ~/Projects/client-sites/genesis-diamonds
- Features: Oracle AI, auth, 11 products, obsidian/gold theme
