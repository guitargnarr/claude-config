# Tier Selection Decision Tree

## Quick Decision Matrix

| Requirement | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|-------------|--------|--------|--------|--------|
| Single page landing | Y | Y | Y | Y |
| Contact form | Y | Y | Y | Y |
| Multiple pages | - | Y | Y | Y |
| Appointment booking | - | Y | Y | Y |
| Photo gallery | - | Y | Y | Y |
| Product catalog | - | - | Y | Y |
| Shopping cart | - | - | Y | Y |
| User authentication | - | - | - | Y |
| Admin dashboard | - | - | - | Y |
| API integration | - | - | - | Y |

## Decision Flow

```
START
  │
  ├─► Does client need user login/accounts?
  │     YES ──► TIER 4
  │     NO ──┐
  │          │
  ├──────────┴─► Does client sell products online?
  │               YES ──► TIER 3
  │               NO ──┐
  │                    │
  ├────────────────────┴─► Does client need appointment booking?
  │                         YES ──► TIER 2
  │                         NO ──┐
  │                              │
  ├──────────────────────────────┴─► Does client need multiple pages?
  │                                   YES ──► TIER 2
  │                                   NO ──► TIER 1
```

## Tier Descriptions

### Tier 1: Essential (Default)
**Best for:** Simple service businesses, restaurants, local shops
**Examples:** Highland Cleaners, JW Cafe, Nachbar

**Includes:**
- Single-page layout with smooth scroll navigation
- Hero section with CTA
- Services/menu grid
- About section
- Contact form
- Google Maps embed
- Social media links
- Mobile responsive

**Build time:** 15-30 minutes

### Tier 2: Professional
**Best for:** Service businesses needing scheduling, professional services
**Examples:** Rejuvenation Med Spa, Salons, Consultants

**Adds to Tier 1:**
- React Router multi-page navigation
- 3-step appointment booking wizard
- Photo gallery with lightbox
- Form validation with error states
- Page transitions

**Build time:** 30-45 minutes

### Tier 3: Advanced
**Best for:** Retail, e-commerce, businesses with product catalogs
**Examples:** Boutiques, specialty stores, online shops

**Adds to Tier 2:**
- Product catalog with categories
- Shopping cart with sidebar
- Product search and filtering
- Analytics dashboard preview
- Priority support badge

**Build time:** 45-60 minutes

### Tier 4: Enterprise
**Best for:** SaaS, membership sites, complex business applications
**Examples:** Gyms with member portals, subscription services

**Adds to Tier 3:**
- User authentication system
- Admin dashboard
- Toast notification system
- Progress ring visualizations
- API integration demos

**Build time:** 60-90 minutes

## Industry-Based Defaults

| Industry | Default Tier | Reason |
|----------|-------------|--------|
| Restaurant/Cafe | 1 | Menu display, contact |
| Dry Cleaner | 1 | Services, locations |
| Hair Salon | 2 | Appointment booking |
| Med Spa | 2 | Service booking |
| Retail Shop | 3 | Product catalog |
| Fitness Center | 4 | Member accounts |
| Law Firm | 1-2 | Info + consultation booking |
| Real Estate | 2 | Property gallery |
| Healthcare | 2-4 | Depends on patient portal needs |

## Upgrade Triggers

**Tier 1 → Tier 2:**
- Client mentions "booking" or "appointments"
- Client mentions "gallery" or "portfolio"
- Client needs separate About/Services/Contact pages

**Tier 2 → Tier 3:**
- Client mentions "products" or "shop"
- Client mentions "cart" or "checkout"
- Client needs inventory management

**Tier 3 → Tier 4:**
- Client mentions "login" or "accounts"
- Client mentions "dashboard" or "admin"
- Client needs user data management

## Template Paths

```
~/Projects/client-sites/templates/tier1-essential/
~/Projects/client-sites/templates/tier2-professional/
~/Projects/client-sites/templates/tier3-advanced/
~/Projects/client-sites/templates/tier4-enterprise/
```

## Deployed Template References

| Tier | URL | Use for Reference |
|------|-----|-------------------|
| 1 | https://tier1-essential.vercel.app | Basic patterns |
| 2 | https://tier2-professional.vercel.app | Booking flow |
| 3 | https://tier3-advanced.vercel.app | E-commerce |
| 4 | https://tier4-enterprise.vercel.app | Auth patterns |
| All | https://tier-comparison.vercel.app | Side-by-side |
