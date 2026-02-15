# Plan: RMM 2.0 Service Delivery Pages Spec

## Context

Kevin forwarded Arica's service model (Feb 13 email) describing a 6-stage consulting workflow: qualification form (built), dispensing data intake, "Freed Working Capital" analysis, owner presentation, tiered implementation, monthly reporting. The qualification form and scoring engine are live, but everything downstream is unproductized.

Kevin is building the Wix site and has a Wix Partner advisor. He needs a spec document -- matching the v2.1 Wix Qualification Form Spec format he already has -- describing 3 new pages that support Arica's post-qualification service delivery.

**Critical constraint:** These pages support a manual consulting workflow. No new API backends. No automated pipelines. Arica does the analysis manually; the pages give her a professional intake point and client-facing dashboard.

**Wix Harmony limitation:** Harmony does NOT support Velo or dynamic CMS collections. The spec assumes Wix Studio. A note will flag this.

## Deliverable

A single PDF spec document (generated via the Texume pipeline) with 3 page specs:

### Page 1: "How It Works" (Content-only, no form)
- Visual 6-step process flow showing Arica's complete service model
- Steps: Qualification Assessment -> Dispensing Data Upload -> Freed Working Capital Analysis -> Owner Presentation -> Tiered Implementation -> Monthly Tracking
- Tiered implementation table mapping existing grades (A/B/C/D from pharmacy_scorecard.py) to onboarding approaches and timelines
- CTA linking back to the qualification form
- Kevin effort: 2-3 hours (static layout)

### Page 2: "Dispensing Data Upload" (Form page)
- 10-field intake form: Pharmacy Name, Owner Name, Email, Phone, PMS System, Data Format, Date Range, File Upload, Notes, Data Consent checkbox
- Explains 3 accepted data formats (PMS CSV export, DataQ report, manual entry)
- CMS collection `DataUploads` with status tracking (Received / Under Review / Complete / Delivered)
- Wix Automation sends email notification to Arica on submission
- No API integration -- just Wix Forms + CMS
- Kevin effort: 3-4 hours

### Page 3: "Client Dashboard" (Monthly reporting landing)
- Metric cards: Prescriptions Routed, Savings This Month, Cumulative Savings, ROI
- Month-over-month trend (static image updated by Arica monthly)
- Routing summary table, recommendations, next steps
- CMS collection `ClientDashboards` with per-month records
- Access: password-protected page initially, Wix Members Area when client count grows
- Phase 1 = manual updates by Arica; Phase 2 = database-connected
- Kevin effort: 2-4 hours

**Total Kevin effort: 7-11 hours across all 3 pages**

## Files to Create

### 1. `~/Projects/texume/data/service_delivery_spec.py`
- `get_report_data()` returning dict matching v2.1 pattern
- Pattern: `data/wix_form_spec.py` (same structure: metadata, overview, page sections with field tables, CMS schemas, design notes)
- Sources grade thresholds from `data/pharmacy_scorecard.py` (A>=80, B>=65, C>=50, D<50)

### 2. `~/Projects/texume/templates/brief_service_delivery_spec.tex`
- Clone of `templates/brief_wix_form_spec.tex` with structural changes:
  - Same cover page (navy bg, concentric rings, teal/orange accents)
  - Cover title: "Service Delivery Pages" instead of "Wix Qualification Form"
  - Overview section
  - Page 1 section: process steps rendered as insightboxes, tier table as longtable
  - Page 2 section: field table (exact v2.1 5-column longtable), CMS schema table, post-submission section
  - Page 3 section: dashboard layout description, metric cards, CMS schema, access options
  - Design Notes for Kevin (global)
  - Effort summary table
  - About This Document closing box

### 3. `~/Projects/texume/scripts/generate_service_delivery_spec.py`
- Clone of `scripts/generate_wix_form_spec.py`
- Imports from `data.service_delivery_spec`
- Renders `brief_service_delivery_spec.tex`
- Outputs `service_delivery_pages_spec.pdf`

### 4. Copy to deliverables
- `~/Desktop/RetailMyMeds/Documentation/service_delivery_pages_spec.pdf`

## Key Design Decisions

1. **No automated backends** -- The freed working capital analysis and owner presentation are manual Arica deliverables described in the process flow, not website features
2. **Same visual identity as v2.1** -- Navy/teal/orange color scheme, same cover page pattern, same field table format so Kevin recognizes the format
3. **Field tables only for Page 2** -- Pages 1 and 3 are content/layout specs, not form specs. Page 2 gets the full v2.1 field table treatment.
4. **CMS schemas for Pages 2 and 3** -- Both need Wix CMS collections for data persistence
5. **Tiered implementation uses existing grades** -- A/B/C/D thresholds already defined in pharmacy_scorecard.py

## Verification

1. `python3 ~/Projects/texume/scripts/generate_service_delivery_spec.py` produces PDF
2. Open PDF -- verify cover, all 3 pages render, field tables align, CMS schemas complete
3. Copy to `~/Desktop/RetailMyMeds/Documentation/`
4. `flake8` passes on the data module
5. Commit to texume repo
