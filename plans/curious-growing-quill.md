# Resume Preview & Analysis Feature

## Goal

Add resume quick-preview with signal/sentiment analysis to both the Resumes page and Quick Apply step 3. Polish the UI for an integrated, sophisticated experience. Extract shared resume data with pre-analyzed metadata.

---

## Change 1: Shared Resume Data with Analysis

**File:** `frontend/src/data/resumes.js` (NEW)

Extract resume constants from both Resumes.jsx and RapidApply.jsx into a single shared module with embedded analysis metadata (pre-analyzed from reading both PDFs):

```js
export const RESUME_DATA = [
  {
    id: '1page',
    name: '1-Page Screening Resume',
    filename: 'Matthew_Scott_Resume_1page.pdf',
    pages: 1,
    updated: '2025-10-15',
    tags: ['Healthcare', 'Business Analyst', 'Screening-Optimized'],
    analysis: {
      targetRole: 'Senior Business Analyst',
      signal: ['Healthcare operations', 'Process optimization', 'Stakeholder management', 'Requirements documentation'],
      sentiment: 'Confident, results-oriented',
      sentimentScore: 82,
      bestFor: 'Screening rounds, ATS systems, recruiter quick-scan',
      strengths: ['Concise format', 'Healthcare-specific', 'ATS-optimized'],
      industries: ['Healthcare', 'Insurance', 'Government'],
    },
  },
  {
    id: '2page',
    name: '2-Page Portfolio Resume',
    filename: 'Matthew_Scott_Resume_2page.pdf',
    pages: 2,
    updated: '2025-10-15',
    tags: ['Technical', 'Portfolio', 'Proof of Work'],
    analysis: {
      targetRole: 'Senior Business Analyst / Technical BA',
      signal: ['Full-stack technical depth', 'AI/ML portfolio proof', 'Enterprise scale (51 sites)', '141k+ lines shipped'],
      sentiment: 'Authoritative, portfolio-driven',
      sentimentScore: 91,
      bestFor: 'Technical interviews, portfolio discussions, senior roles',
      strengths: ['Demonstrates building capability', 'AI/ML differentiation', 'Scale proof with metrics'],
      industries: ['Healthcare', 'Technology', 'SaaS', 'Enterprise'],
    },
  },
];
```

---

## Change 2: Resume Preview Modal Component

**File:** `frontend/src/components/shared/ResumePreviewModal.jsx` (NEW)

Reusable modal for both Resumes page and Quick Apply:
- Uses existing Modal.jsx with `wide` prop
- Left panel: PDF iframe (responsive, full height)
- Right sidebar: analysis summary panel
  - Target Role (prominent heading)
  - Signal keywords as teal chips
  - Sentiment score as progress bar with label
  - "Best For" text
  - Industries as subtle pills
  - Strengths list
- Footer: Download button + close

---

## Change 3: Resumes Page Redesign

**File:** `frontend/src/pages/Resumes.jsx` (REWRITE)

**Current:** Basic list with inline iframe preview, minimal styling (96 lines).

**New layout:**
- Import from shared `RESUME_DATA`
- Side-by-side resume cards (2-col grid desktop, stack mobile)
- Each card shows:
  - Name + page count badge + last updated
  - Tags as colored pills
  - Analysis panel inline:
    - Target Role (teal accent text)
    - Signal keywords as compact chips
    - Sentiment score (small bar)
    - Best For (1-line description)
  - Two buttons: "Preview" (opens ResumePreviewModal) + "Download"
- Matches existing dark-theme card styling (card-glow, ambient effects)

---

## Change 4: Quick Apply Step 3 Enhancement

**File:** `frontend/src/pages/RapidApply.jsx` (MODIFY step 3 only)

**Current:** Bare radio buttons with text label. No preview.

**New step 3:**
- Import from shared `RESUME_DATA`
- Replace radio list with styled selection cards
- Each card shows:
  - Resume name + page count
  - Tags row (compact)
  - Target role + sentiment score (1-line)
  - "Quick Look" icon button -> opens ResumePreviewModal
- Selected card: teal border + checkmark icon
- Unselected: subtle border, hover highlight

---

## Change 5: Show Resume Version in Applications

**Backend:** `backend/api/v1/applications.py`
- Add `resume_version` to the list endpoint response dict

**Frontend:** `frontend/src/pages/Applications.jsx`
- Display resume version as a small badge in the table/list

---

## Files Modified/Created

| File | Action |
|------|--------|
| `frontend/src/data/resumes.js` | NEW - shared resume data with analysis |
| `frontend/src/components/shared/ResumePreviewModal.jsx` | NEW - preview modal with analysis sidebar |
| `frontend/src/pages/Resumes.jsx` | REWRITE - card layout with analysis |
| `frontend/src/pages/RapidApply.jsx` | MODIFY - step 3 selection cards |
| `backend/api/v1/applications.py` | MODIFY - add resume_version to list |
| `frontend/src/pages/Applications.jsx` | MODIFY - show resume version badge |

---

## Out of Scope (Future Iterations)

- Domain-specific folder organization for resumes
- Resume usage cataloging per job
- Outcome tracking per resume version (efficacy measurement)
- Backend resume upload/management API
- Dynamic NLP-based resume analysis (currently pre-analyzed)

---

## Verification

1. `npm run build` passes clean
2. Resumes page: two cards with analysis, preview modal opens with PDF + analysis sidebar
3. Quick Apply step 3: styled selection cards with quick-look, selected state works
4. Applications page: resume version badge visible
5. Deploy to Vercel + verify at jobtrack.projectlavos.com
