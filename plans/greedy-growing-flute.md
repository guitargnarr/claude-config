# Portfolio Improvement Plan

**Created:** 2025-12-05
**Status:** EXECUTED - ALL CRITICAL TASKS COMPLETE
**Question:** "What would you improve if you were me?"

---

## Execution Summary (Dec 5, 2025)

### Domain Mapping
- `resume.projectlavos.com` → Points to `interactive-resume` Vercel project
- `interactive-resume-ten-pi.vercel.app` → Same project (Vercel auto-generated URL)
- Both URLs serve the same deployed content

### Completed Tasks
| Task | Status | Verification |
|------|--------|--------------|
| Portfolio Hub (projectlavos.com) | Already current | HTTP 200, shows "Matthew Scott - Full Stack Developer" |
| BA Pathfinder dead links | Fixed & deployed | 6 internal links replaced with real external resources |
| Resume PDF generation | Created | `/Matthew_Scott_Resume.pdf` accessible (HTTP 200) |
| Download button in Hero | Added | Teal button with FaDownload icon |
| Nav anchors (Method/Contact) | Added | Header.tsx updated with new links |

### Files Modified
1. `ba-pathfinder/src/data/roadmaps/junior-ba/roadmap.json` - Dead links removed
2. `interactive-resume/scripts/generate-pdf.js` - PDF generator script created
3. `interactive-resume/public/Matthew_Scott_Resume.pdf` - PDF file generated
4. `interactive-resume/components/Hero.tsx` - Download button added
5. `interactive-resume/components/Header.tsx` - Method/Contact nav links added

---

## User Decisions (Original)

- Portfolio Hub: **Verify and redeploy** (verified - already current)
- BA Pathfinder: **Remove dead link references** (done)
- Resume PDF: **Generate from interactive resume content** (done)

---

## Executive Summary

Your portfolio is **85% share-ready**. The code quality, branding, and individual projects are strong. However, there are specific gaps that could hurt credibility with hiring managers or clients.

---

## Critical Issues (Fix Before Sharing)

### 1. Portfolio Hub Not Deployed (projectlavos.com)
**Impact:** HIGH - Front door shows wrong content

The source code has been rewritten as a developer portfolio, but production still shows "AI Demos for Louisville Businesses" messaging.

**Fix:**
```bash
cd ~/Projects/projectlavos-monorepo/main-site
npm run build && vercel --prod --yes
```
**Time:** 5 minutes

---

### 2. Interactive Resume Missing PDF Download
**Impact:** HIGH - Standard expectation for portfolio resumes

Hiring managers expect to download a resume. Currently no way to get a PDF.

**Fix:** Add download button in Hero section linking to `/Matthew_Scott_Resume.pdf`

**Files:**
- `~/Projects/interactive-resume/components/Hero.tsx` - Add download button
- `~/Projects/interactive-resume/public/Matthew_Scott_Resume.pdf` - Add PDF file

**Time:** 30 minutes

---

### 3. BA Pathfinder Has Dead Links
**Impact:** HIGH - Breaks trust immediately

The roadmap references 6+ resources that return 404:
- `/tools/sdlc-simulator`
- `/tools/user-story-validator`
- `/templates/interview-questions.docx`
- `/templates/user-story-template.md`
- `/content/certifications/ecba-guide.md`
- YouTube placeholder URL

**Fix Options:**
A) Remove dead resource links from roadmap JSON (30 min)
B) Create placeholder pages explaining "coming soon" (1 hour)
C) Actually build the tools (days)

**Recommendation:** Option A - Remove references to non-existent content

**File:** `~/Desktop/2_AI_PROJECTS_PORTFOLIO/ba-pathfinder/src/data/roadmap.json`

---

## High-Value Improvements (Next Priority)

### 4. Optimize Resume Images (1.3MB → ~400KB)
**Impact:** MEDIUM - Slow mobile load times

Project screenshots in `/public/projects/` are uncompressed PNGs:
- interactive-resume.png: 1.68MB
- jaspermatters.png: 1.06MB

**Fix:** Convert to WebP, compress to 70% quality

**Time:** 1 hour

---

### 5. Add Navigation Anchors to Resume
**Impact:** MEDIUM - Can't navigate to Method/Contact sections

Header nav missing links to Method and Contact sections.

**File:** `~/Projects/interactive-resume/components/Header.tsx`

**Time:** 15 minutes

---

### 6. Traction: Show Real Data Instead of Mock
**Impact:** MEDIUM - Proves you actually use your own tool

Dashboard shows 3 mock applications. Your real 107 applications would be more impressive.

**Fix:** Export your actual data as read-only showcase view

**Time:** 1 hour

---

### 7. PhishGuard: Fix Failing Tests
**Impact:** LOW (not user-facing) - But shows in CI

3 test files failing due to MSW/localStorage configuration.

**Time:** 30 minutes

---

## Content Improvements (Polish)

### 8. Resume "How I Work" Section Too Brief
Current footer has 2-3 sentences. Could expand with:
- Engagement types (project-based, advisory, embedded)
- Typical timeline
- Communication style

**Time:** 30 minutes

---

### 9. Portfolio Hub Messaging Could Be Stronger
Current: "Building practical tools with modern technology"

Better: "Full stack developer shipping production apps. 10 years healthcare IT at Humana. Now building tools for musicians, job hunters, and security teams - deployed and actively used."

**Time:** 15 minutes

---

### 10. Add About/Personal Narrative
No section explaining who you are beyond work. Consider adding brief personal context.

**Time:** 1 hour (if desired)

---

## Summary by Project

| Project | Status | Critical Fix | Time |
|---------|--------|--------------|------|
| Portfolio Hub | Deploy needed | Rebuild & deploy | 5 min |
| Interactive Resume | Missing PDF | Add download | 30 min |
| BA Pathfinder | Dead links | Remove from JSON | 30 min |
| Traction | Mock data visible | Optional: show real data | 1 hr |
| PhishGuard | Tests failing | Fix MSW config | 30 min |
| Guitar Platform | Good | None | - |
| OurJourney | Good | None | - |

---

## Recommended Execution Order

**Immediate (before sharing):**
1. Deploy portfolio hub (5 min)
2. Remove BA Pathfinder dead links (30 min)
3. Add resume PDF download (30 min)

**Same day:**
4. Add resume navigation anchors (15 min)
5. Optimize resume images (1 hr)

**This week:**
6. Expand "How I Work" section
7. Fix PhishGuard tests
8. Consider adding real Traction data

---

## What's Already Strong

- Brand consistency (teal/orange) across all projects
- Code quality is professional throughout
- All deployments are live and returning 200
- PhishGuard has real ML backend integration
- Traction solves a real problem you experienced
- Resume positioning as "AI-Enabled Strategist" is clear
- Test coverage on resume (105 unit, 40 E2E)

---

## Execution Plan

### Task 1: Verify and Redeploy Portfolio Hub (5-10 min)
```
1. Fetch projectlavos.com and check current content
2. Compare to source in ~/Projects/projectlavos-monorepo/main-site/src/App.jsx
3. If mismatched: npm run build && vercel --prod --yes
4. Verify deployment shows "Matthew Scott - Full Stack Developer"
```

### Task 2: Remove BA Pathfinder Dead Links (30 min)
```
File: ~/Desktop/2_AI_PROJECTS_PORTFOLIO/ba-pathfinder/src/data/roadmap.json

Remove or comment out references to:
- /tools/sdlc-simulator
- /tools/user-story-validator
- /templates/interview-questions.docx
- /templates/user-story-template.md
- /content/certifications/ecba-guide.md
- https://youtube.com/watch?v=example (placeholder)

Keep: Real external links (Atlassian, coursera, etc.)
Redeploy after changes
```

### Task 3: Generate Resume PDF (45 min)
```
1. Read resume content from ~/Projects/interactive-resume/lib/resumeData.ts
2. Generate clean PDF using Puppeteer or similar
3. Save to ~/Projects/interactive-resume/public/Matthew_Scott_Resume.pdf
4. Add download button to Hero.tsx
5. Redeploy resume site
```

### Task 4: Add Resume Navigation Anchors (15 min)
```
File: ~/Projects/interactive-resume/components/Header.tsx
Add: #method and #contact to navigation links
```

---

## Files to Modify

| File | Change |
|------|--------|
| `~/Projects/projectlavos-monorepo/main-site/` | Verify/redeploy |
| `~/Desktop/2_AI_PROJECTS_PORTFOLIO/ba-pathfinder/src/data/roadmap.json` | Remove dead links |
| `~/Projects/interactive-resume/public/Matthew_Scott_Resume.pdf` | Create new file |
| `~/Projects/interactive-resume/components/Hero.tsx` | Add download button |
| `~/Projects/interactive-resume/components/Header.tsx` | Add nav anchors |

---

## Success Criteria

- [x] projectlavos.com shows "Matthew Scott - Full Stack Developer"
- [x] BA Pathfinder roadmap has no 404 links (replaced with IIBA, Atlassian, etc.)
- [x] Resume has working PDF download button
- [x] Resume nav includes Method and Contact links
- [x] All sites return HTTP 200 after changes

**All criteria verified Dec 5, 2025.**
