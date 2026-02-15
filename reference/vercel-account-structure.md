# Vercel Account Structure

**Updated:** 2026-02-08
**Source:** `vercel whoami`, `vercel project ls`, `vercel domains list`

---

## Account Overview

| Field | Value |
|-------|-------|
| Username | guitargnar |
| Team/Scope | matthew-scotts-projects-1dc9743e ("Matthew Scott's projects") |
| Tier | Hobby (free) |
| CLI Version | 48.2.6 |
| Total Projects | ~118 |

---

## Project Organization (~118 projects)

### Client Demo Sites (~58)

Business demo websites deployed from `~/Projects/client-sites/`. All use `.vercel.app` URLs. Includes affinity-dental, blown-away-bar, cardinal-uniforms, clater-jewelers, copper-barrel-brewing, cottage-cafe, dermcare-practitioners, fableandflows (custom domain), fritz-salon, genesis-diamonds, gray-family-dentistry, halsey-flats, headliners-louisville, hideaway-saloon, highland-cleaners (3 tier variants + v2), jbh-dental, jr-spa-salon, kentuckiana-gastro, kuhn-allergy, ky-family-lawyer, louisville-aesthetics (3 tier variants), louisville-family-chiro, louisville-nails-spa, maira-mediterranean, mallard-crossing, nachbar, north-lime-coffee, passtime-fish-house, pilates-plus-louisville, playthings-toy-shoppe, primary-express-care, rejuvenation-med-spa, schwartz-bankruptcy, shawarma-shack, sophias-rugs, springs-stony-brook, springhurst-endo, tasteful-travels, tom-drexler, tonini-church-supply, vance-stovall-optometry, and conceptual demos (auriga-chariot, caviar-creative-co, crushcore-pt, forma-archetypes, mission-possible-austin, psyche-jung, threshold-liminal, umbra-shadow, uofl-demo, tunisia-travel, the-proof-room, chabad-of-kentucky, paint-spot-louisville, credit-union-template-demo, dgv-services, lawnco-louisville).

### Monorepo Services (~10)

From `~/Projects/projectlavos-monorepo/`. Most map to `projectlavos.com` subdomains: main-site (projectlavos.com), about, demos, orchestrator, guitar, services, dashboard (jobs.), portfolio-crm (crm.), projectlavos-monorepo, matthewscott-link.

### Standalone Apps (~20)

interactive-resume, phishguard-ui, ba-pathfinder, ourjourney-app, jobway/job-search-automation, portfolio-website, entropy-viz, guitar-model-lab-ui, apartment-leasing-demo/frontend, mirador/mirador-enterprise, jaspermatters-job-intelligence, jcps-transfer, math-privacy-viz, texume, crushcore, off-the-script, datasource-monitor.

### Templates & Tooling (~7)

tier1-essential, tier2-professional, tier3-advanced, tier4-enterprise, tier-comparison, client-cms-admin, client-cms-api.

### Utility / One-Off (~15)

prompt-fact, prompt-factory, prompt-lab-v3, fret-vision, 2025-skills-to-know, ibanista-tools, tenerife-pal, advisor-meeting, outreach-tracker, outreach-pitches, portfolio-launcher, dist, public, admin, jobtrack.

### No Active Deployment (~3)

client-sites, matthewscott, templates -- listed but show no production URL.

---

## Custom Domains (2 on Vercel)

| Domain | Vercel Project | DNS Provider |
|--------|---------------|--------------|
| projectlavos.com | main-site | Third Party (external registrar) |
| fableandflows.com | fableandflows | Third Party (external registrar) |

jaspermatters.com is on Netlify. matthewscott.link is on WordPress.

### Subdomain Routing (projectlavos.com)

All subdomains CNAME to Vercel. Each maps to a separate Vercel project:

| Subdomain | Vercel Project |
|-----------|---------------|
| (root) | main-site |
| about | about |
| demos | demos |
| guitar | guitar |
| jobs | dashboard |
| jobtrack | job-search-automation |
| mirador | mirador |
| orchestrator | orchestrator |
| ourjourney | ourjourney-app |
| phishguard | phishguard-ui |
| ba-pathfinder | ba-pathfinder |
| resume | interactive-resume |
| prompts | prompt-fact |
| crm | portfolio-crm |

---

## Environment Variable Patterns

- **Vite apps (majority):** `VITE_` prefix required. Baked at BUILD time. Must use `VITE_X=value vercel build --prod` then `vercel deploy --prebuilt --prod --yes`.
- **Most client demos:** No env vars (static content, no API calls).
- **Backend-connected apps:** `VITE_API_URL` pointing to Render API.
- **Auth apps:** `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` for Supabase auth.

---

## Deployment Protection

- **Default:** Vercel Authentication ON for preview deployments (Hobby tier).
- **Production deployments:** Publicly accessible by default.
- **To disable preview protection:** Project Settings > Deployment Protection > Disable "Vercel Authentication".
- **All client demo sites** are public (production deployments, no preview branches).

---

## Billing & Usage

- **Tier:** Hobby (free)
- **Limits:** 100 deployments/day, 6000 build minutes/month, 100 GB bandwidth/month
- **~118 projects** within Hobby limits (mostly static sites, minimal traffic)
- **No paid features used** (no serverless functions, edge middleware, or analytics)
