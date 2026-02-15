# RMM 2026 Landscape & Positioning -- Standalone Strategic Document

## Context
Matthew has a 9-page research PDF covering the 2026 independent pharmacy landscape, RMM positioning, regulatory analysis, and go-to-market strategy. It needs to be rebuilt as a polished Texume document that:
- Kevin screens first, then sends to Arica as reading material
- Makes Kevin look good -- serious strategic thought on his watch
- Matthew (and AI tooling) are completely invisible
- Stands alone from the technical/build documents Kevin already received

## Key Decisions
- **Prepared By:** Kevin McCarron (his name, his document to hand to Arica)
- **Prepared For:** Arica Collins -- RetailMyMeds
- **Color scheme:** Teal primary (matches existing RMM documents Kevin has seen)
- **Technical metrics:** ALL stripped. No LOC, no hours, no "deployed on Render". Pure business strategy.
- **Case study:** Keep pharmacy names (illustrative sample data, adds credibility)
- **Phase summary:** Keep as strategic overview but remove effort hours and cost columns

## What Gets STRIPPED
1. All references to Matthew Scott (name, background, Humana, "rapid prototyper")
2. All references to Mirador AI / ZIGGY / Reflexia / Claude Code
3. All AI-assisted development methodology (23 hrs vs 136 hrs, etc.)
4. Caviar Creative cross-reference
5. Directive language ("Kevin must implement...")
6. Old "async scorecard architecture" -> updated to zero-code webhook
7. All code-level metrics (541 lines, 14,139 LOC, etc.)
8. Phase effort hours and monthly cost columns

## Files to Create

### 1. `data/landscape_strategy_2026.py` (~800-900 lines)
Full data dict covering:
- Cover metadata (Kevin as preparer, Arica as recipient)
- Executive summary: the 24-month reimbursement gap (2026-2028)
- Regulatory landscape: CAA 2026, PBM Reform timeline, milestone table
- MFP analysis: MTF mechanism, $722.55/transaction gap, Cycle 1/2/3
- GLP-1 economics: $37-42/fill loss, 95% losing money, 700% growth, forced-fill dynamic
- DIR compression: AWP-4-11% to AWP-18-26%, Express Scripts AWP-26.3%
- RMM product architecture: $275/month, technician-managed, ROI scenarios, privacy differentiators
- Competitive positioning: vs PMS, vs Apaly Rx, vs DiversifyRx, positioning matrix
- Scoring methodology: 3 dimensions, weights, A-D grading (no code metrics)
- Portfolio case study: LA/MS sample pharmacies with scores and grades
- Go-to-market: state associations (NDPhA April 16-18, MPhA/MIPA, Montana MPA), trade pubs (Drug Store News, Drug Topics, Pharmacy Times), GEO strategy
- Strategic window: 24-month gap, urgency, recommended priorities
- Sources: CMS, NCPA, Three Axis Advisors, industry publications

### 2. `templates/landscape_strategy_2026.tex` (~380-420 lines)
Teal primary color scheme (reuse work_summary.tex preamble pattern):
- Cover page: concentric teal rings, "Independent Pharmacy Landscape 2026" title
- `\mychapter{}` for major sections, `\insightbox[]{}` for key data, `\questionbox[]{}` for callouts
- Regulatory milestone table (tabularx)
- MFP cycle comparison table
- ROI scenario table
- Competitive positioning table
- Scoring dimension table with weights
- Portfolio case study table (ranked pharmacies)
- Convention target table
- GEO factor table
- Sources section at end

### 3. `scripts/generate_landscape_strategy.py` (~55 lines)
Standard Texume generator. Output: `rmm_landscape_strategy_2026.pdf`

## Document Structure (8 sections)

### Cover Page
- Title: "Independent Pharmacy Landscape 2026"
- Subtitle: "Regulatory Analysis | Market Positioning | Strategic Opportunity"
- Prepared For: Arica Collins -- RetailMyMeds
- Prepared By: Kevin McCarron

### 1. Executive Summary (~1 page)
The 24-month reimbursement gap between CAA 2026 passage (Feb 3) and reform implementation (2028-2029). Three compounding forces: PBM reform timing, MFP cash flow drain, GLP-1 margin erosion. RMM as the operational bridge.

### 2. The Regulatory Landscape (~2 pages)
- CAA 2026 timeline table (passage -> rebate passthrough -> delinking -> full implementation)
- MFP/MTF analysis: retrospective refund model, $722.55/transaction, $10,838/week exposure
- MFP Cycle 1/2/3 progression table
- GLP-1 economics: loss per fill, forced-fill dynamic, shortage resolution impact
- DIR compression: rate progression, Express Scripts benchmark

### 3. RetailMyMeds: Product & Positioning (~1.5 pages)
- $275/month, technician-managed, cash flow orchestration
- ROI table (conservative/moderate/aggressive -- no technical detail about how it works)
- Privacy/independence differentiators (not PBM-affiliated, no PHI)
- Founded by practicing pharmacist (Arica's credibility)

### 4. Competitive Landscape (~1.5 pages)
- 5 market categories table
- RMM vs PMS (bolt-on, not competing)
- RMM vs Apaly Rx (pharmacy-side vs employer-side)
- RMM vs DiversifyRx (eliminate losses vs add revenue)
- RMM's whitespace: only pharmacy-facing loss elimination platform

### 5. Qualification & Scoring (~1.5 pages)
- 3-dimension model (Financial Fit 45%, Operational Readiness 30%, Market Urgency 25%)
- A-D grading scale with action for each grade
- Portfolio case study: LA/MS sample pharmacies ranked table
- 67% conversion-ready finding

### 6. Go-to-Market Strategy (~2 pages)
- State association replication (WVIPA validation, target states)
- Convention calendar: NDPhA April 16-18, MIPA April 8-9, MPhA June 4-6
- Trade publication strategy: Drug Store News, Drug Topics, Pharmacy Times with specific angles
- GEO strategy: why AI search matters, citation-friendly content, FAQ schema, E-E-A-T signals

### 7. Strategic Recommendations (~1 page)
- The 24-month window (2026-2028) is the opportunity
- Wix form + zero-code webhook integration (described in business terms, not technical)
- Content-led GEO dominance (reports -> HTML pages)
- Association replication (Q2 2026)
- Trade publication execution (Q2-Q3 2026)

### 8. Sources
Numbered citation list: CMS, NCPA, Three Axis Advisors, industry publications

## Reference Files (read for data patterns, no changes)
- `data/mfp_crisis_brief.py` -- MFP cycle data structure
- `data/competitive_landscape.py` -- competitor profiles and positioning
- `data/glp1_value_proposition.py` -- GLP-1 economics data
- `templates/work_summary.tex` -- teal primary template pattern to clone

## Verification
1. `python3 scripts/generate_landscape_strategy.py` -- compiles first attempt
2. Open PDF -- verify teal primary, professional layout, no Matthew/AI references
3. `flake8` clean
4. Do NOT copy to RetailMyMeds folder yet -- Kevin hasn't seen this; Matthew holds it until timing is right
