# Plan: Populate Jobway Pages with Sample Data

## Overview
Add a mock data fallback layer to the Jobway frontend so all pages render with realistic sample data when the backend API isn't reachable. Zero changes to page components - only modify the API layer.

## Approach
Modify `client.js` to catch fetch errors and return mock data. Create one new file `src/api/mockData.js` containing all sample data matching the exact shapes each page expects.

## Files Modified

### 1. `frontend/src/api/mockData.js` (NEW)
Single file with all mock data exports:
- `mockDashboard` - KPIs (12 active jobs, 23 applications, 18% response rate), application funnel (Applied: 23, Responded: 8, Interviewing: 4, Offered: 1, Rejected: 5), recommendations
- `mockPerformanceScore` - Score 72, grade B+, breakdown, 4 recommendations
- `mockJobs` - 8 realistic job entries (mix of Louisville companies: Humana, Yum! Brands, Kindred Healthcare, Waystar, Cedar, PwC, Optum, Elevance Health) with titles, salaries, priorities, ATS scores, keywords, verified_status
- `mockApplications` - 7 applications across various statuses (APPLIED, INTERVIEWING, OFFERED, REJECTED, READY, DRAFT, RESPONDED) with dates, ATS scores
- `mockApplicationStats` - { total_applications: 7, pending: 2, responded: 1, interviews: 1, offers: 1, rejections: 1, drafts: 1 }
- `mockFollowUps` - 6 follow-up items: 2 overdue, 1 today, 3 upcoming, with realistic dates relative to today
- `mockFollowUpAnalytics` - { total_scheduled: 6, completed: 4, completion_rate: 67, overdue: 2 }
- `mockEmailResponses` - 5 email entries (1 INTERVIEW, 1 OFFER, 1 REJECTION, 1 INFO_REQUEST, 1 OTHER) with from_address, subject, confidence, dates
- `mockEmailStats` - { connected: true, gmail_connected: true, email_address: "matthewdscott7@gmail.com", total_scanned: 847, total_emails: 847, total_responses: 5, interviews: 1, action_required: 2 }

### 2. `frontend/src/api/client.js` (MODIFY)
Add mock fallback wrapper. When API calls fail (network error / backend down), return the corresponding mock data instead of throwing. Each API module function gets a try/catch at the client level.

**Strategy:** Export a `withMock(apiCall, mockData)` helper that wraps any API call:
```js
export function withMock(apiCall, mockData) {
  return apiCall.catch(() => mockData);
}
```

### 3. `frontend/src/api/analytics.js` (MODIFY)
Wrap `getDashboard()` and `getPerformanceScore()` with mock fallbacks.

### 4. `frontend/src/api/jobs.js` (MODIFY)
Wrap `listJobs()` with mock fallback returning `{ jobs: mockJobs }`.

### 5. `frontend/src/api/applications.js` (MODIFY)
Wrap `listApplications()` and `getApplicationStats()` with mock fallbacks.

### 6. `frontend/src/api/followups.js` (MODIFY)
Wrap `getScheduledFollowUps()` and `getFollowUpAnalytics()` with mock fallbacks.

### 7. `frontend/src/api/email.js` (MODIFY)
Wrap `getResponses()` and `getEmailStats()` with mock fallbacks.

## Sample Data Content (Realistic Louisville Job Search)

**Jobs (8):**
| Company | Title | Salary | Priority | ATS | Status |
|---------|-------|--------|----------|-----|--------|
| Humana | Sr. Business Analyst | $95k-$125k | HIGH | 82 | verified |
| Yum! Brands | Data Analyst | $75k-$95k | HIGH | 74 | verified |
| Waystar | Healthcare Data Analyst | $80k-$110k | HIGH | 88 | verified |
| Kindred Healthcare | Clinical Analytics Manager | $100k-$135k | MEDIUM | 71 | pending |
| PwC | Advisory - Health Industries | $110k-$145k | MEDIUM | 65 | null |
| Optum | Business Intelligence Analyst | $85k-$115k | MEDIUM | 79 | verified |
| Elevance Health | Sr. Data Analyst | $90k-$120k | LOW | 58 | error |
| Cedar | Product Analyst (Remote) | $95k-$130k | HIGH | 91 | verified |

**Applications (7):** Map to jobs above with realistic timelines (applied 3-21 days ago).

**Follow-ups (6):** Mix of overdue (2-3 days past), today, and upcoming (3-10 days out). Types: NO_RESPONSE, THANK_YOU, POST_INTERVIEW.

**Emails (5):** From HR addresses matching the companies above.

## What Pages Will Show

| Page | Before (no backend) | After (with mocks) |
|------|---------------------|---------------------|
| Dashboard | Empty state "No data yet" | 4 KPI cards, funnel chart, recommendations |
| Jobs | Empty state "No jobs found" | 8 job cards with priorities, salaries, ATS scores |
| Applications | Empty state "No applications" | Stats bar + 7-row table with status dropdowns |
| Follow-ups | Empty state "No follow-ups" | Analytics bar + 3 sections (overdue/today/upcoming) |
| Email | Disconnected banner, empty | Connected banner, stats, 5 email responses |
| ATS Optimizer | No change (user-action driven) | No change needed |
| About | No change (static) | No change needed |

## Verification
1. `cd frontend && npm run build` passes
2. `npm run dev` - visit each page, confirm data renders
3. Take Playwright screenshots of all 5 data pages
4. Deploy to Vercel, verify live
