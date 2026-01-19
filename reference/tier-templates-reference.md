# Tier Templates Reference

**Created:** January 4, 2026
**Updated:** January 17, 2026
**Purpose:** Reference templates for client website development with proven UI/UX patterns
**Status:** DEPLOYED - All templates live and tested

---

## Quick Reference (TOC)

| Section | Line | Description |
|---------|------|-------------|
| [Lighthouse Scores](#lighthouse-scores) | 30 | Performance metrics for all tiers |
| [Content Rules](#content-rules-critical---jan-2026) | 53 | No fabricated testimonials |
| [Portfolio Presentation](#portfolio-presentation-jan-2026) | 75 | Device mockups for projectlavos.com |
| [Template URLs](#template-urls) | 100 | Live URLs and local paths |
| [Tech Stack](#tech-stack-all-templates) | 112 | Vite, React, Tailwind, Framer Motion |
| **Tier Templates** | | |
| [Tier 1: Essential](#tier-1-essential-landing-page) | 73 | Single-page, scroll nav, contact form |
| [Tier 2: Professional](#tier-2-professional-multi-page--booking) | 122 | Multi-page, booking wizard, gallery |
| [Tier 3: Advanced](#tier-3-advanced-e-commerce--analytics) | 189 | E-commerce, cart, search/filter |
| [Tier 4: Enterprise](#tier-4-enterprise-auth--api--toasts) | 254 | Auth, dashboard, toasts, charts |
| **Shared Patterns** | | |
| [CSS Variables](#css-variables-all-templates) | 398 | Brand colors, component classes |
| [Accessibility (WCAG AA)](#accessibility-wcag-aa-compliance) | 455 | Contrast ratios, ARIA requirements |
| [Error Boundaries](#error-boundaries) | 545 | Graceful error handling |
| [Lazy Loading](#lazy-loading-images) | 636 | Image optimization patterns |
| [Code Splitting](#code-splitting-architecture-note) | 677 | Route-based lazy loading |
| **Interactive Effects** | | |
| [3D Card Hover](#3d-card-hover-effects-tier-1) | 745 | Framer Motion transforms |
| [Parallax Scroll](#parallax-scroll-effects-tier-1) | 835 | Background depth effects |
| [Real-time Availability](#real-time-availability-tier-2-booking) | 906 | Booking slot simulation |

---

## Lighthouse Scores (January 5, 2026 - Updated Jan 17, 2026)

| Template | Performance | Accessibility | Best Practices | SEO |
|----------|-------------|---------------|----------------|-----|
| Tier 1 Essential | 97 | 100 | 100 | 100 |
| Tier 2 Professional | 95 | 100 | 100 | 100 |
| Tier 3 Advanced | 96 | 100 | 100 | 100 |
| Tier 4 Enterprise | 95 | 100 | 100 | 100 |
| Tier Comparison | 100 | 100 | 100 | 91 |

**All 4 templates achieve 100% Accessibility.** Fix applied: `role="listitem"` on outer `div.card-3d` wrapper.

**Performance optimizations applied:** Converted CSS background-image to `<img>` with `fetchPriority="high"`, added preload hints, reduced image size/quality, added meta descriptions.

**Catalog:** ~/Projects/client-sites/templates/CATALOG.md

---

## Content Rules (CRITICAL - Jan 2026)

**FORBIDDEN CONTENT - Do NOT include in any client site:**

| Content Type | Rule | Reason |
|--------------|------|--------|
| Testimonials | NEVER | Fabrication - fake reviews are unethical |
| Star Ratings | NEVER | Cannot verify authenticity |
| Review Counts | NEVER | Fabricated data |
| Fake Quotes | NEVER | Misrepresentation |

**When building client sites:**
1. Research the actual business first
2. Use real services/products they offer
3. If social proof needed, use "Featured In" logos (if verifiable) or awards (if real)
4. Omit testimonial sections entirely rather than fabricate

**Image Requirements:**
- Verify every Unsplash image returns HTTP 200 before use
- No reusing images across different client sites
- Diversify year searches (2020-2026) for variety

---

## Portfolio Presentation (Jan 2026)

**Standard operating procedure for representing client sites on projectlavos.com portfolio.**

### Screenshot Requirements

| Viewport | Dimensions | Device | Use Case |
|----------|------------|--------|----------|
| Desktop | 1920x1080 | - | Full layout verification |
| Mobile | 390x844 | iPhone 14 | Mobile responsiveness |
| Tablet | 820x1180 | iPad | Tablet layouts |

**Capture ALL pages** - Not just homepage. Include: Home, About, Services, Contact, Shop, etc.

### Device Mockup Workflow

1. **Capture raw screenshots** (Playwright)
   ```bash
   npx playwright screenshot --viewport-size="390,844" --wait-for-timeout=5000 "URL" mobile.png
   ```

2. **Generate device frames** using local scripts (RECOMMENDED):
   ```bash
   cd ~/.claude/scripts && npm install canvas qrcode  # One-time
   node create-client-assets.js <site-name> ./mobile.png --colors "#hex1,#hex2"
   ```
   Generates: iPhone mockup (430x880), OG image (1200x630), QR code, favicons

   **Or use online tools:**
   - [MockUPhone](https://mockuphone.com) - 80+ devices, free
   - [DeviceMockup.app](https://devicemockup.app) - 219+ devices, local processing

3. **Recommended device frames:**
   - Mobile: iPhone 14 Pro (matches local script output)
   - Tablet: iPad Pro 12.9" or iPad Air
   - Desktop: MacBook Pro 16" (optional)

4. **Store mockups** in project assets or portfolio directory

**Full workflow documentation:** @~/.claude/reference/device-mockup-workflow.md
**Proven with:** copper-barrel-brewing (Jan 2026)

### CSS Device Frame Component

```tsx
// Minimal iPhone frame - Tailwind only
function iPhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-64 h-[520px] bg-slate-900 rounded-[2.5rem] p-2.5 shadow-2xl">
      {/* Notch/Dynamic Island */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-900 rounded-b-xl z-10" />
      {/* Screen */}
      <div className="rounded-[2rem] overflow-hidden h-full">
        <img src={src} alt={alt} className="w-full h-full object-cover object-top" loading="lazy" />
      </div>
    </div>
  );
}
```

### Hover Effects for Portfolio Cards

```tsx
// 3D tilt on hover with Framer Motion
<motion.div
  whileHover={{ y: -8, rotateX: 5, rotateY: -5 }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  style={{ perspective: 1000 }}
>
  {/* Card content with device mockup */}
</motion.div>
```

### Portfolio Card Requirements

| Element | Source |
|---------|--------|
| Primary image | iPhone mockup of homepage |
| Hover image | Desktop screenshot (optional) |
| Site name | Business name |
| Description | Industry + key features |
| CTA | "View Site" link |

### Quality Checklist Before Portfolio Addition

- [ ] All pages captured at 3 viewports
- [ ] Screenshots reviewed for content issues
- [ ] iPhone mockup generated from mobile screenshot
- [ ] No broken images or placeholder text
- [ ] Site loads within 3 seconds
- [ ] Mobile navigation functional

---

## Overview

These 4 tiered templates represent the canonical reference for client website development. Each tier builds on the previous, demonstrating progressively more complex features while maintaining consistent UX patterns.

**Use these templates when:**
- Building new client sites
- Implementing UI/UX improvements
- Adding interactive features
- Setting up new React + Tailwind projects

---

## Template URLs

| Tier | Name | URL | Local Path |
|------|------|-----|------------|
| 1 | Essential | https://tier1-essential.vercel.app | ~/Projects/client-sites/templates/tier1-essential |
| 2 | Professional | https://tier2-professional.vercel.app | ~/Projects/client-sites/templates/tier2-professional |
| 3 | Advanced | https://tier3-advanced.vercel.app | ~/Projects/client-sites/templates/tier3-advanced |
| 4 | Enterprise | https://tier4-enterprise.vercel.app | ~/Projects/client-sites/templates/tier4-enterprise |
| - | Comparison | https://tier-comparison.vercel.app | ~/Projects/client-sites/tier-comparison |

---

## Tech Stack (All Templates)

- **Framework:** Vite + React + TypeScript
- **Styling:** Tailwind CSS v3
- **Animations:** Framer Motion
- **Scroll Detection:** react-intersection-observer
- **Icons:** Lucide React
- **Routing:** React Router (Tier 2+)

---

## Tier 1: Essential (Landing Page)

**Use case:** Simple single-page business websites

### Features
- Single-page website with smooth scroll navigation
- Mobile responsive with animated hamburger menu
- Contact form with basic validation
- Google Maps integration
- Service cards with hover effects
- Social media links
- Basic SEO setup

### Key UI/UX Patterns

**Smooth Scroll Navigation:**
```typescript
const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
```

**Animated Mobile Menu (CSS-only, no conditional render):**
```tsx
<div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
  mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
}`}>
  {/* Menu content */}
</div>
```

**Service Card Hover Effects:**
```tsx
<div className="card p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
  <div className="w-12 h-12 bg-primary-100 group-hover:bg-primary-500 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300">
    <Icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors duration-300" />
  </div>
  <h3 className="text-xl font-bold text-slate-800 group-hover:text-primary-600 mb-2 transition-colors">
    {title}
  </h3>
</div>
```

---

## Tier 2: Professional (Multi-Page + Booking)

**Use case:** Service businesses with appointment scheduling

### Features (adds to Tier 1)
- Multi-page navigation with React Router
- Online booking system with 3-step wizard
- Photo gallery with lightbox
- Form validation with error messages
- Progress indicators with labels
- Page transitions

### Key UI/UX Patterns

**Multi-Step Progress Indicator:**
```tsx
{[
  { num: 1, label: 'Service' },
  { num: 2, label: 'Date & Time' },
  { num: 3, label: 'Details' }
].map((s, i) => (
  <div key={s.num} className="flex flex-col items-center">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
      step > s.num ? 'bg-green-500 text-white' :
      step === s.num ? 'bg-primary-500 text-white ring-4 ring-primary-200' :
      'bg-slate-200 text-slate-500'
    }`}>
      {step > s.num ? (<CheckCircle className="w-6 h-6" />) : (s.num)}
    </div>
    <span className={`text-xs mt-2 font-medium ${
      step >= s.num ? 'text-primary-600' : 'text-slate-400'
    }`}>{s.label}</span>
  </div>
))}
```

**Form Validation with Error States:**
```tsx
const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; phone?: boolean }>({});

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone: string) => /^[\d\s\-()+ ]{10,}$/.test(phone);

const validateField = (field: string, value: string) => {
  if (field === 'name' && !value.trim()) return 'Name is required';
  if (field === 'email' && !value.trim()) return 'Email is required';
  if (field === 'email' && value && !validateEmail(value)) return 'Please enter a valid email';
  if (field === 'phone' && !value.trim()) return 'Phone number is required';
  if (field === 'phone' && value && !validatePhone(value)) return 'Please enter a valid phone number';
  return '';
};

// Input with error styling
<input
  className={`input-field ${touched.email && errors.email ? 'border-red-500 focus:ring-red-200' : ''}`}
  onBlur={() => handleBlur('email')}
/>
{touched.email && errors.email && (
  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
    <XCircle className="w-4 h-4" /> {errors.email}
  </p>
)}
```

---

## Tier 3: Advanced (E-commerce + Analytics)

**Use case:** Businesses selling products or services online

### Features (adds to Tier 2)
- E-commerce with shopping cart
- Product search and filtering
- Analytics dashboard
- Priority support badge
- Enhanced card hover effects

### Key UI/UX Patterns

**Product Search with Real-time Filtering:**
```tsx
const [searchQuery, setSearchQuery] = useState('');

const filteredProducts = products.filter(p => {
  const matchesCategory = filter === 'All' || p.category === filter;
  const matchesSearch = searchQuery === '' ||
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase());
  return matchesCategory && matchesSearch;
});

// Search input
<div className="relative">
  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
  <input
    type="text"
    placeholder="Search products..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
  />
  {searchQuery && (
    <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
      <X className="w-4 h-4" />
    </button>
  )}
</div>
```

**Product Card with Quick-Add Overlay:**
```tsx
<div className="card overflow-hidden group hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
  <div className="relative overflow-hidden">
    <img src={product.image} alt={product.name} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
    <span className="absolute top-3 right-3 bg-primary-500 text-white text-xs px-2 py-1 rounded">{product.category}</span>
    {/* Quick add overlay on hover */}
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
      <button className="bg-white text-primary-600 font-semibold px-4 py-2 rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
        <Plus className="w-4 h-4" /> Quick Add
      </button>
    </div>
  </div>
  <div className="p-6">
    <h3 className="text-xl font-bold text-slate-800 group-hover:text-primary-600 mb-2 transition-colors">{product.name}</h3>
    {/* ... */}
  </div>
</div>
```

---

## Tier 4: Enterprise (Auth + API + Toasts)

**Use case:** Full-featured SaaS or enterprise platforms

### Features (adds to Tier 3)
- User authentication system
- Admin dashboard
- Toast notification system
- Progress ring visualizations
- Mini sparkline charts
- API integration demos

### Key UI/UX Patterns

**Toast Notification System:**
```tsx
interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: Toast['type'], message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

// Usage
const { addToast } = useToast();
addToast('success', 'Settings saved successfully!');
```

**Animated Progress Ring:**
```tsx
function ProgressRing({ progress, size = 60, strokeWidth = 6, color = 'primary' }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-slate-200" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
          className="text-primary-500"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-slate-700">{progress}%</span>
      </div>
    </div>
  );
}
```

**Mini Sparkline Chart:**
```tsx
function MiniSparkline({ data, color = 'primary' }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 30;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <motion.polyline
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="stroke-primary-500"
        points={points}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </svg>
  );
}
```

---

## Comparison Page Patterns

**Enhanced CTA Buttons:**
```tsx
<a
  href={`mailto:matthewdscott7@gmail.com?subject=${tier.name}%20Package%20Inquiry`}
  className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group ${
    tier.popular
      ? 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 hover:shadow-md'
  }`}
>
  {tier.cta}
  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
</a>
```

**Card Hover with Framer Motion:**
```tsx
<motion.div
  whileHover={{ y: -8, transition: { duration: 0.2 } }}
  className="tier-card hover:shadow-2xl transition-shadow duration-300"
>
  {/* Card content */}
</motion.div>
```

**Feature Card with Icon Animation:**
```tsx
<motion.div
  whileHover={{ y: -5, transition: { duration: 0.2 } }}
  className="text-center p-6 rounded-xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer group"
>
  <div className="w-14 h-14 bg-teal-100 group-hover:bg-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
    <Icon className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors duration-300" />
  </div>
  <h3 className="font-semibold text-slate-800 group-hover:text-teal-600 mb-2 transition-colors">{title}</h3>
</motion.div>
```

---

## CSS Variables (All Templates)

```css
/* Base styles in index.css */
@layer base {
  :root {
    --primary-50: #f0fdfa;
    --primary-100: #ccfbf1;
    --primary-200: #99f6e4;
    --primary-300: #5eead4;
    --primary-400: #2dd4bf;
    --primary-500: #14b8a6;
    --primary-600: #0d9488;
    --primary-700: #0f766e;
    --primary-800: #115e59;
    --primary-900: #134e4a;

    --secondary-50: #fff7ed;
    --secondary-100: #ffedd5;
    --secondary-500: #f97316;
    --secondary-600: #ea580c;
  }
}

/* Reusable component classes - WCAG AA Compliant */
@layer components {
  .btn-primary {
    /* IMPORTANT: Use primary-700 for WCAG AA contrast (5.4:1 ratio on white) */
    /* primary-500 (#14b8a6) only has 3.0:1 ratio - fails AA */
    @apply bg-primary-700 hover:bg-primary-800 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5;
  }

  .btn-outline {
    /* Use primary-700 for text color to meet WCAG AA contrast */
    @apply border-2 border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200;
  }

  .card {
    @apply bg-white rounded-2xl shadow-lg p-6;
  }

  .input-field {
    @apply w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all;
  }

  .section-title {
    @apply text-3xl font-bold text-slate-800 mb-4;
  }

  .section-subtitle {
    @apply text-slate-600 max-w-2xl mx-auto;
  }
}
```

---

## Accessibility (WCAG AA Compliance)

All tier templates achieve **100% Lighthouse Accessibility score**. Key requirements:

### Color Contrast Requirements

**WCAG AA requires 4.5:1 contrast ratio for normal text.**

| Color | Hex | Contrast on White | Status |
|-------|-----|-------------------|--------|
| primary-500 | #14b8a6 | 3.0:1 | FAILS AA |
| primary-600 | #0d9488 | 4.0:1 | FAILS AA |
| primary-700 | #0f766e | 5.4:1 | PASSES AA |
| primary-800 | #115e59 | 7.1:1 | PASSES AAA |

**Rule:** Always use `primary-700` or darker for text/buttons on white backgrounds.

### Contrast Fix Patterns

**Buttons (use primary-700):**
```css
/* CORRECT - passes WCAG AA */
.btn-primary { @apply bg-primary-700 hover:bg-primary-800 text-white... }
.btn-outline { @apply border-primary-700 text-primary-700 hover:bg-primary-700... }

/* WRONG - fails contrast */
.btn-primary { @apply bg-primary-500 hover:bg-primary-600... }
```

**Inline text on white backgrounds:**
```tsx
/* CORRECT */
<span className="text-primary-700">Highlighted text</span>

/* WRONG */
<span className="text-primary-600">Highlighted text</span>
```

**Hero CTAs with white background:**
```tsx
/* CORRECT */
<Link className="bg-white text-primary-700 hover:bg-primary-50...">

/* WRONG */
<Link className="bg-white text-primary-600...">
```

### ARIA Requirements

**Role semantics matter:**
```tsx
/* WRONG - role="list" requires role="listitem" children */
<div role="list" className="flex gap-4">
  <a href="...">Link 1</a>  {/* <a> can't be listitem */}
</div>

/* CORRECT - use aria-label for semantic grouping */
<div className="flex gap-4" aria-label="Social media links">
  <a href="..." aria-label="Facebook">...</a>
</div>
```

**All interactive elements need labels:**
```tsx
<button aria-label="Open mobile menu">
  <Menu className="w-6 h-6" aria-hidden="true" />
</button>

<input aria-label="Email address" placeholder="your@email.com" />
```

### Loading States Need Status Roles

```tsx
<div role="status" aria-label="Loading page content">
  <div className="animate-spin..." aria-hidden="true" />
  <p>Loading...</p>
</div>
```

### Keyboard Navigation

All templates include:
- Skip-to-main-content links
- Escape key handlers for modals/menus
- Focus management for interactive elements
- Tab order follows visual order

---

## Error Boundaries

All tier templates include Error Boundaries for graceful error handling. This prevents entire app crashes when individual components fail.

### Error Boundary Component Pattern

```tsx
import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-[400px] flex items-center justify-center p-8" role="alert">
          <div className="text-center max-w-md">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Something went wrong</h2>
            <p className="text-slate-600 mb-4">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
```

### Usage in App

Wrap your entire app or specific sections:

```tsx
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
```

### TypeScript Import Note

**IMPORTANT:** When using `verbatimModuleSyntax` in TypeScript, use separate type imports:

```tsx
// CORRECT - type-only import
import { useState, Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

// WRONG - will fail with verbatimModuleSyntax
import { useState, Component, ErrorInfo, ReactNode } from 'react';
```

---

## Lazy Loading Images

All templates use native lazy loading for images to improve initial page load performance.

### Pattern

Add `loading="lazy"` to any image that isn't immediately visible (below the fold):

```tsx
{/* Hero image - DON'T lazy load (above fold) */}
<img src="/hero.jpg" alt="Hero" className="w-full h-96 object-cover" />

{/* Gallery/product images - DO lazy load */}
<img
  src={product.image}
  alt={product.name}
  className="w-full h-48 object-cover"
  loading="lazy"
/>

{/* User avatars in lists - DO lazy load */}
<img
  src={user.avatar}
  alt=""
  className="w-8 h-8 rounded-full"
  loading="lazy"
/>
```

### When to Use

| Location | Lazy Load? | Reason |
|----------|------------|--------|
| Hero images | No | Above fold, critical path |
| Product grids | Yes | Many images, scrolled to |
| User avatars in lists | Yes | Not critical path |
| Gallery images | Yes | User scrolls to view |
| Cart item images | Yes | Often in drawer/modal |

---

## Code Splitting (Architecture Note)

### Current Template Design

The tier templates are **single-file designs** (`App.tsx` contains all pages) for simplicity and portability. They include `Suspense` and `PageLoading` components ready for code splitting if you extract pages to separate files.

### Ready-to-Use Infrastructure

Templates already have:
```tsx
import { Suspense } from 'react';

// PageLoading component for Suspense fallback
function PageLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]" role="status" aria-label="Loading page content">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent" aria-hidden="true" />
    </div>
  );
}
```

### To Enable Route-Based Code Splitting

If you extract pages to separate files:

```tsx
// 1. Create separate page files
// src/pages/HomePage.tsx
// src/pages/AboutPage.tsx
// src/pages/ServicesPage.tsx

// 2. Use React.lazy in App.tsx
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));

// 3. Wrap routes in Suspense
<Routes>
  <Route path="/" element={
    <Suspense fallback={<PageLoading />}>
      <HomePage />
    </Suspense>
  } />
  <Route path="/about" element={
    <Suspense fallback={<PageLoading />}>
      <AboutPage />
    </Suspense>
  } />
</Routes>
```

### When to Extract Pages

**Keep single-file design when:**
- Template is reference/demo only
- Site has < 5 pages
- Each page shares most components

**Extract to separate files when:**
- Site has 5+ distinct pages
- Individual pages have heavy dependencies
- Need to optimize bundle size for production

---

## 3D Card Hover Effects (Tier 1+)

All tier templates include 3D card hover effects using Framer Motion's `useMotionValue` and `useTransform` hooks, creating smooth interactive depth effects with spring-based animations.

### Hook Implementation (Framer Motion)

```tsx
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

function use3DCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform mouse position to rotation values
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  // Spring animation for smooth transitions
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize to -0.5 to 0.5 range
    x.set((mouseX - centerX) / rect.width);
    y.set((mouseY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { x, y, rotateX: springRotateX, rotateY: springRotateY, handleMouseMove, handleMouseLeave };
}
```

### CSS Classes (index.css)

```css
@layer components {
  /* 3D Card Hover Effect */
  .card-3d {
    perspective: 1000px;
  }
}
```

### Usage Example

```tsx
function ServiceCard3D({ service }: { service: { title: string; description: string } }) {
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = use3DCard();

  return (
    <div className="card-3d" style={{ perspective: 1000 }}>
      <motion.article
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="card p-6 cursor-pointer"
      >
        <h3>{service.title}</h3>
        <p>{service.description}</p>
      </motion.article>
    </div>
  );
}
```

### Benefits of Framer Motion Implementation

- **Smoother animations:** Spring-based transforms vs manual CSS
- **No direct DOM manipulation:** Uses motion values instead of `style.transform`
- **Automatic spring reset:** Mouse leave smoothly animates back to origin
- **Better performance:** Framer Motion optimizes animation frames

---

## Parallax Scroll Effects (Tier 1+)

All tier templates include parallax scrolling effects for hero sections, creating depth as users scroll.

### Hook Implementation

```tsx
import { useState, useEffect } from 'react';

function useParallax() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return offset;
}
```

### CSS Classes (index.css)

```css
/* Parallax Hero Background */
.parallax-hero {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
```

### Usage Example

```tsx
function Hero() {
  const parallaxOffset = useParallax();

  return (
    <section className="relative text-white py-20 md:py-32 overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-700"
        style={{
          transform: `translateY(${parallaxOffset * 0.3}px)`,
          backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-primary-900/70" aria-hidden="true" />

      {/* Content with reverse parallax */}
      <div className="relative max-w-6xl mx-auto px-4 text-center">
        <h1 style={{ transform: `translateY(${parallaxOffset * -0.1}px)` }}>
          Your Business Name
        </h1>
      </div>
    </section>
  );
}
```

---

## Real-time Availability (Tier 2 Booking)

The Tier 2 Professional template includes real-time availability simulation for booking time slots.

### Hook Implementation

```tsx
type SlotAvailability = 'available' | 'limited' | 'unavailable';

function useSlotAvailability() {
  const [availability, setAvailability] = useState<Record<string, SlotAvailability>>({});

  useEffect(() => {
    const slots = [
      '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
      '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
    ];
    const statuses: SlotAvailability[] = ['available', 'limited', 'unavailable'];

    // Initialize with random availability
    const initialAvailability: Record<string, SlotAvailability> = {};
    slots.forEach(slot => {
      initialAvailability[slot] = statuses[Math.floor(Math.random() * 3)];
    });
    setAvailability(initialAvailability);

    // Simulate real-time updates every 30 seconds
    const interval = setInterval(() => {
      const updatedSlot = slots[Math.floor(Math.random() * slots.length)];
      setAvailability(prev => ({
        ...prev,
        [updatedSlot]: statuses[Math.floor(Math.random() * 3)]
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return availability;
}
```

### CSS Classes (index.css)

```css
/* Time slot availability indicators */
.slot-available {
  @apply bg-green-100 text-green-700 hover:bg-green-200;
}
.slot-limited {
  @apply bg-yellow-100 text-yellow-700 hover:bg-yellow-200;
}
.slot-unavailable {
  @apply bg-slate-100 text-slate-400 cursor-not-allowed;
}
```

### Usage Example

```tsx
function TimeSlots() {
  const slotAvailability = useSlotAvailability();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', /* ... */];

  return (
    <div className="card p-6">
      {/* Legend */}
      <div className="flex gap-2 text-xs mb-4">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-green-500" /> Available
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-yellow-500" /> Limited
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-slate-300" /> Full
        </span>
      </div>

      {/* Time Slots */}
      <div className="grid grid-cols-3 gap-2">
        {timeSlots.map((time) => {
          const availability = slotAvailability[time] || 'available';
          const isUnavailable = availability === 'unavailable';

          return (
            <button
              key={time}
              onClick={() => !isUnavailable && setSelectedTime(time)}
              disabled={isUnavailable}
              className={`py-2 px-3 rounded text-sm font-medium ${
                selectedTime === time
                  ? 'bg-primary-500 text-white'
                  : isUnavailable
                    ? 'slot-unavailable'
                    : availability === 'limited'
                      ? 'slot-limited'
                      : 'slot-available'
              }`}
            >
              {time}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-slate-500 mt-3" aria-live="polite">
        Availability updates in real-time
      </p>
    </div>
  );
}
```

---

## Usage Guidelines

### When Building New Client Sites

1. **Choose the appropriate tier** based on client needs
2. **Copy the template** as starting point
3. **Reference patterns** from this document for consistent UI/UX
4. **Apply brand colors** using Tailwind config
5. **Test all interactive features** before deployment

### When Adding Features to Existing Sites

1. **Check if pattern exists** in a higher tier template
2. **Copy the implementation** exactly as documented
3. **Adapt styling** to match existing site brand
4. **Test the feature** in isolation before integrating

### Pattern Priority

When multiple approaches exist, prefer patterns from:
1. Tier 4 (most refined, includes feedback systems)
2. Tier 3 (e-commerce patterns)
3. Tier 2 (form validation, multi-step)
4. Tier 1 (basic interactions)

---

## Related Documents

- **Deployment Inventory:** @~/.claude/reference/deployment-inventory.md
- **Workflows:** @~/.claude/reference/workflows.md
- **Brand System:** See `splendid-jumping-kahan.md` plan

---

**Last Updated:** January 17, 2026 (TOC added, Lighthouse scores synced with CATALOG.md)
