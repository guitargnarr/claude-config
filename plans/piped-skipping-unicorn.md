# Plan v6: State-Level GLP-1 Loss Data from Public CMS Sources

## Context

v5b (complete) added "GLP-1 Loss Exposure" labels to the dashboard but used a fabricated formula (`contactable * $174K national avg`). User correctly identified this isn't measured data -- we don't have state-level GLP-1 prescription volume. The numbers need to come from real, verifiable, publicly accessible federal data.

The CSV is the primary deliverable (sits alongside `qualified_independent_pharmacies_feb2026.csv` in `~/Desktop/RetailMyMeds/Pharmacy_Database/`). The dashboard then consumes it.

## Data Sources (all verified, free, no auth)

| Source | URL | Size | What it gives us |
|--------|-----|------|-----------------|
| CMS Medicare Part D by Geography & Drug (2023) | `data.cms.gov/.../MUP_DPR_RY25_P04_V10_DY23_Geo.csv` | 13.4 MB | State-level GLP-1 claims + total drug cost (Medicare only) |
| Medicaid SDUD (2024) | `download.medicaid.gov/data/sdud-2024-updated-dec2025.csv` | 478 MB | State-level GLP-1 prescriptions + reimbursement by NDC (Medicaid only) |
| NADAC (2024) | `download.medicaid.gov/data/nadac-national-average-drug-acquisition-cost-12-25-2024.csv` | 124 MB | What pharmacies actually pay to acquire each GLP-1 drug (national, per-NDC) |

## GLP-1 Drugs to Filter

| Brand | Generic | Manufacturer | NDC Labeler |
|-------|---------|-------------|-------------|
| Ozempic | semaglutide | Novo Nordisk | 0169 |
| Wegovy | semaglutide | Novo Nordisk | 0169 |
| Mounjaro | tirzepatide | Eli Lilly | 0002 |
| Zepbound | tirzepatide | Eli Lilly | 0002 |
| Trulicity | dulaglutide | Eli Lilly | 0002 |
| Victoza | liraglutide | Novo Nordisk | 0169 |
| Saxenda | liraglutide | Novo Nordisk | 0169 |

## Pipeline: `scripts/build_glp1_state_data.py`

### Step 1: Download
- Download all 3 CSVs to `scripts/cache/` (skip if already cached)
- Progress bars via print statements (files are large)

### Step 2: Parse Part D data
- Filter: `Prscrbr_Geo_Lvl == 'State'` AND `Brnd_Name` in GLP-1 list
- Extract per state: `Tot_Clms` (total claims), `Tot_Drug_Cst` (total cost), `Tot_30day_Fills`
- Sum across all GLP-1 brands per state

### Step 3: Parse Medicaid SDUD
- 478 MB file -- stream with csv reader, don't load into memory
- Filter by `Product Name` containing GLP-1 brand names (case-insensitive)
- Extract per state: `Number of Prescriptions`, `Total Amount Reimbursed`
- Sum across all GLP-1 NDCs per state, aggregate all 4 quarters of 2024

### Step 4: Parse NADAC for acquisition cost
- Filter for GLP-1 NDCs (match by NDC description containing brand names)
- Get most recent `NADAC_Per_Unit` for each drug
- Calculate avg acquisition cost per fill (units per fill * NADAC_Per_Unit)
- This gives us what pharmacies PAY for GLP-1 drugs

### Step 5: Calculate per-state metrics
For each state:
- `medicare_glp1_claims` = from Part D data
- `medicaid_glp1_claims` = from SDUD data
- `total_govt_glp1_claims` = medicare + medicaid
- `avg_reimbursement_per_claim` = total drug cost / total claims (from Part D, more reliable)
- `avg_acquisition_cost_per_claim` = from NADAC
- `loss_per_fill` = acquisition cost - reimbursement (if negative = loss to pharmacy)
- `total_state_glp1_loss` = loss_per_fill * total_govt_glp1_claims
- `independent_pharmacy_count` = from existing pharmacy CSV (count by state)
- `avg_loss_per_pharmacy` = total_state_glp1_loss / independent_pharmacy_count

### Step 6: Output CSV

**File:** `~/Desktop/RetailMyMeds/Pharmacy_Database/state_glp1_loss_data_2024.csv`

**Columns:**
```
state,state_name,medicare_glp1_claims,medicaid_glp1_claims,total_govt_glp1_claims,total_drug_cost,avg_reimbursement_per_claim,avg_acquisition_cost_per_claim,est_loss_per_fill,total_state_glp1_loss,independent_pharmacy_count,avg_loss_per_independent_pharmacy,data_sources,data_year
```

Every number traceable to a specific CMS dataset. The CSV header row includes a comment or metadata row with source URLs.

## Dashboard Integration (after CSV is verified)

Once the CSV exists and the numbers are verified:
1. Add a second Python script or extend `build_glp1_state_data.py` to also output a `public/data/state-glp1-losses.json` for the dashboard
2. Add `glp1` fields to `PharmacyMetrics` interface in `overlay-data.ts`
3. Update `FALLBACK_STATE_METRICS` with real per-state numbers from the JSON
4. Update ranking formula to use measured state-level data instead of `contactable * AVG_ANNUAL_GLP1_LOSS`
5. Update "Why This Matters" block to cite CMS data year and source

This is a separate step AFTER the CSV is built and reviewed.

## Files

| File | Action |
|------|--------|
| `scripts/build_glp1_state_data.py` | New -- data pipeline script |
| `scripts/cache/` | New dir -- cached downloads (gitignored) |
| `~/Desktop/RetailMyMeds/Pharmacy_Database/state_glp1_loss_data_2024.csv` | Output CSV |

## Verification

1. Run `python3 scripts/build_glp1_state_data.py` -- downloads, processes, outputs CSV
2. Open CSV -- 51 rows (50 states + DC), all columns populated
3. Spot-check: NY and CA should have highest claim volumes; smaller states (WY, VT) lowest
4. Cross-reference a few state totals against CMS Part D explorer to confirm numbers match
5. Loss-per-fill should be negative (pharmacies lose money) and in the -$30 to -$50 range based on strategic research estimates
