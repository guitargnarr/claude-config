# Deployment Audit Log (Archive)

**Purpose:** Historical record of deployment changes. Moved from deployment-inventory.md to reduce context size.
**Current inventory:** ~/.claude/reference/deployment-inventory.md

---

## Summary

- **Jan 1-6, 2026:** Created 21 client demo sites
- **Dec 28, 2025:** OurJourney API deployed to Render
- **Dec 24, 2025:** Full URL audit (38 → 67 live URLs)
- **Dec 18, 2025:** Cleanup audit, deleted orphans

---

## Jan 6, 2026 - Client Demo Sites 17-21

Created 5 sites: Paint Spot Louisville, Chabad of Kentucky, Louisville Nails Spa, Kentuckiana Gastro, Pilates Plus Louisville, Tasteful Travels, Shawarma Shack

## Jan 5, 2026 - Client Demo Sites 10-16

Created: Camp J, Tonini Church Supply, Highland Cleaners Tier 1/4, Highland Cleaners V2

## Jan 4, 2026 - Tier Templates

Created 5 tier templates: tier1-essential through tier4-enterprise + comparison

## Jan 3, 2026 - Client Demo Sites 6-9

Created: Lawnco Louisville, KY Family Lawyer, Highland Cleaners, Cottage Cafe

## Jan 2, 2026 - Client Demo Sites 3-5

Created: Louisville Aesthetics, Nachbar, Rejuvenation Med Spa

## Jan 1, 2026 - Client Demo Sites 1-2

Created: JW Cafe & Bakery, PassTime Fish House

## Dec 28, 2025 - OurJourney API

Deployed ourjourney-api to Render with PostgreSQL database

## Dec 24, 2025 - Full URL Audit

- 38 live URLs verified (was 16)
- Found new subdomains: ourjourney, jobtrack, phishguard, ba-pathfinder, resume, prompts
- Found Railway app: poetic-optimism-production

## Dec 18, 2025 - Cleanup Audit

- 13 frontend sites PASS
- 3 backend APIs PASS
- Deleted 6 orphaned Vercel projects
- Deleted 3 empty Railway projects
- Deleted 5 legacy GitHub repos
