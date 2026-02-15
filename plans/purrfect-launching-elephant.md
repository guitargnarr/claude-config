# Plan: Packaging Checklist — Remaining Items

## Context

The user's 50-item packaging checklist identified 12 items as "Critical + actionable" or "High + actionable." After thorough audit, **7 of 12 are already complete** from previous sessions. This plan addresses the **5 items that genuinely need work**, ensuring each receives fair, equal-depth treatment.

## Audit Results: What's Already Done

| Item | Status | Evidence |
|------|--------|----------|
| #4 Command Manifest | DONE | `~/.claude/COMMAND_MANIFEST.md` (17K lines, updated today) |
| #5 Skills Documentation | DONE | Documented in COMMAND_MANIFEST.md |
| #6 Agent Documentation | DONE | Documented in COMMAND_MANIFEST.md |
| #8 Reference Index | DONE | `~/.claude/reference/INDEX.md` (11K lines) |
| #13 Transfer Guide | DONE | `~/.claude/TRANSFER_GUIDE.md` (519 lines) |
| #20 Template-to-Site Docs | DONE | `~/Projects/client-sites/templates/SITE_GENERATION_GUIDE.md` (470 lines) |
| #31 pyproject.toml | DONE | All 5 Python backends have them |

## 5 Items That Need Work

### Item #33 — Market Positioning Guide
**Current state:** Tier pricing exists ($1.5K-$8K+) in SITE_GENERATION_GUIDE.md and CATALOG.md, but no standalone positioning document with competitive analysis, target segments, or sales messaging.

**Deliverable:** `~/.claude/reference/market-positioning-guide.md` (~150 lines)
- Target customer segments (by business type + size + budget)
- Tier-to-segment mapping (which businesses get which tier)
- Pricing rationale (cost structure, margin analysis, market comparables)
- Competitive differentiation (vs Wix/Squarespace/local agencies/freelancers)
- Value propositions per tier
- Sales messaging framework (elevator pitch, objection handling)
- Revenue projections (per-site vs subscription model)

**Effort:** ~45 min

---

### Item #37 — Outreach CRM Test Coverage Documentation
**Current state:** Tests exist (3 files: test_auth.py, test_businesses.py, test_health.py, 339 lines) but no coverage metrics, no documentation of what's tested vs not, and the test suite hasn't been verified to pass.

**Deliverable:**
1. Run existing tests, document results
2. Identify coverage gaps (14 endpoints, which are tested?)
3. Add missing test files for untested endpoints (metrics, auth edge cases)
4. Update `~/Projects/outreach-api/` README or CLAUDE.md with test documentation

**Effort:** ~45 min

---

### Item #43 — Failed Deployment Fixes
**Current state:** The original checklist listed 5 sites: camp-j, crushcore, highland-cleaners, ln-credit-union, psyche-hub. All have proper file structure. camp-j directory is actually `camp-j` not `camp-j-lovat`. All were deployed with favicons this session except camp-j and crushcore (which weren't in the favicon batch). Need to verify live URLs and fix any that return errors.

**Deliverable:**
1. Verify live URLs for camp-j, crushcore with curl/playwright
2. Verify ln-credit-union, psyche-hub, highland-cleaners (jobtrack) are healthy
3. Redeploy any that fail
4. Confirm all 5 return HTTP 200

**Effort:** ~20 min

---

### Item #47 — Domain Transfer Manifest
**Current state:** Registrar confirmed as Namecheap for projectlavos.com. DNS records documented in paste-cache. Other domains (jaspermatters.com, matthewscott.link) registrar not confirmed. No formal transfer document exists.

**Deliverable:** `~/.claude/reference/domain-transfer-manifest.md` (~80 lines)
- 3 domains with registrar, nameservers, expiration dates
- DNS record inventory (A, CNAME, MX for each)
- Transfer authorization procedures
- Platform account credentials locations
- Emergency DNS contacts
- Note: Actual registrar lookups via whois for jaspermatters.com and matthewscott.link

**Effort:** ~30 min

---

### Item #48 — Vercel Account Documentation
**Current state:** Basic info exists (52 projects, guitargnar account, deploy commands). No structural documentation of project organization, environment variable patterns, or deployment protection settings.

**Deliverable:** `~/.claude/reference/vercel-account-structure.md` (~80 lines)
- Account type and team structure
- Project organization (by category: client-sites, monorepo services, standalone apps, templates)
- Environment variable naming conventions and management
- Deployment protection settings (which projects have auth disabled)
- Domain configuration patterns (custom domains vs .vercel.app)
- Billing tier and usage notes

**Effort:** ~30 min

---

## Execution Order

All 5 items are independent — can be parallelized. Recommended order if sequential:

1. **#43 Failed Deployments** (20 min) — Quick verification, builds momentum
2. **#37 Outreach Tests** (45 min) — Code work, best done while fresh
3. **#47 Domain Manifest** (30 min) — Research + writing
4. **#48 Vercel Account Docs** (30 min) — Research + writing
5. **#33 Market Positioning** (45 min) — Strategic writing, benefits from accumulated context

**Total estimated effort: ~2.5 hours**

## Parallel Execution Strategy

Launch 3 concurrent workstreams:
- **Stream A:** #43 (deploy fixes) + #37 (outreach tests) — code/deploy work
- **Stream B:** #47 (domains) + #48 (Vercel) — infrastructure documentation
- **Stream C:** #33 (market positioning) — strategic document

## Verification

Each item verified by:
- **#33:** File exists, covers all 7 sections listed above, pricing data matches existing docs
- **#37:** `pytest` passes, coverage gaps identified and documented, new tests pass
- **#43:** All 5 URLs return HTTP 200 via curl
- **#47:** File exists, whois data verified for all 3 domains, DNS records match live config
- **#48:** File exists, project count matches `vercel list`, categories match deployment inventory
