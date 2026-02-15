# Plan: Texume Resume Tailoring Overhaul (v2)

## Problem (User Feedback)

Comparing input resume vs output resume for SEI "AI and Technology Consultant" JD:

1. **Summary got worse** - Canned consulting summary replaced user's superior summary that had Fortune 50 context, specific metrics, and consulting-specific language
2. **GitHub link removed** - `get_base_profile()` has `github: None`
3. **Technical Projects section removed** - Base profile has no `projects` field
4. **Company context stripped** - "Fortune 50" and "Digital Agency" descriptors lost
5. **Skills downgraded** - Canned skills weaker than user's input skills
6. **Bullet selection works** - This part is good, keep it

**Root cause:** Two architectural gaps:
- A) The Jobway backend doesn't pass the uploaded resume text to Texume (only sends company/title/description)
- B) When Texume uses its hardcoded profile, `customize_for_job()` **replaces** summary/skills with canned versions instead of **enhancing** what exists

## Solution: 3 Changes Across 3 Files

### Change 1: Backend passes resume text to Texume
**File:** `~/Projects/job-search-automation/backend/api/v1/ats.py` (line ~127-134)

Extract text from uploaded resume file and pass as `background` field:

```python
# Read resume file content as text
resume_content = await resume_file.read()
resume_text = resume_content.decode("utf-8", errors="ignore")

# Send to Texume with background
resp = await client.post(
    f"{TEXUME_API_URL}/generate",
    json={
        "company": company,
        "title": title,
        "description": job_description,
        "background": resume_text,
    }
)
```

Simple text extraction -- PDFs won't parse well this way but `.txt` and pasted resume content will. The frontend ATS optimizer already accepts text paste or file upload. For PDF support, add `PyPDF2` text extraction as a fallback.

### Change 2: Apply customize_for_job() to BOTH paths
**File:** `~/Projects/texume/api.py` (lines 482-493)

Currently the `background` path skips `customize_for_job()` entirely. Fix:

```python
if request.background and request.background.strip():
    data = parse_user_background(request.background)
    data['summary_title'] = f"TARGETING: {request.title.upper()[:50]}"
    # APPLY keyword-aware customization to user's resume too
    if jd_keywords:
        data = customize_for_job(
            data, request.title, request.company,
            emphasis, jd_keywords=jd_keywords
        )
else:
    data = get_base_profile()
    data = customize_for_job(
        data, request.title, request.company,
        emphasis, jd_keywords=jd_keywords
    )
```

### Change 3: Make customize_for_job() ENHANCE instead of REPLACE
**File:** `~/Projects/texume/data/matthew_scott.py` (lines 277-464)

This is the core fix. Three sub-changes:

**3a. Summary: enrich, don't replace**

Instead of overwriting summary with canned text, keep the existing summary and only append the JD keyword focus sentence. Remove the 4 canned summary blocks (lines 306-384).

```python
# REMOVE: The 4 emphasis-based summary replacements
# KEEP: The JD keyword enrichment (lines 410-433) - already appends focus terms
# KEEP: summary_title targeting header
```

The base profile summary is already good. The user's uploaded resume summary is even better. Neither should be replaced.

**3b. Skills: merge JD-relevant terms into existing skills, don't replace**

Instead of overwriting the entire skills list with 4 canned variants, keep existing skills and inject JD-specific terms:

```python
# REMOVE: The 4 emphasis-based skills replacements
# KEEP: The JD tech injection code (lines 436-455) - already adds to Specializations
# ADD: If JD has terms matching existing skill categories, ensure they're present
```

The existing skills injection code (lines 436-455) already handles adding tech keywords to Specializations. That's sufficient. Remove the canned skills replacement.

**3c. Add GitHub and Projects to base profile**

Update `get_base_profile()` to include:
```python
'github': 'github.com/guitargnarr',
'projects': [
    {
        'name': 'Texume',
        'url': 'https://github.com/guitargnarr/texume',
        'url_display': 'github.com/guitargnarr/texume',
        'tech': 'Python, FastAPI, LaTeX',
        'bullets': [
            'Resume generation API with JD-aware customization, keyword extraction, and LaTeX PDF output',
        ]
    },
    {
        'name': 'Jobway',
        'url': 'https://jobtrack.projectlavos.com',
        'url_display': 'jobtrack.projectlavos.com',
        'tech': 'React, FastAPI, PostgreSQL',
        'bullets': [
            'Job search automation platform with ATS optimization, email tracking, and analytics dashboard',
        ]
    },
]
```

## Files Modified

| File | Changes |
|------|---------|
| `~/Projects/texume/data/matthew_scott.py` | Remove canned summary/skills replacements, add github + projects to base profile |
| `~/Projects/texume/api.py` | Apply customize_for_job to background path |
| `~/Projects/job-search-automation/backend/api/v1/ats.py` | Extract resume text, pass as `background` |

## What This Preserves
- Bullet pool selection (working correctly)
- JD keyword extraction (working correctly)
- Summary focus-term enrichment (working correctly)
- Skills tech injection (working correctly)
- Emphasis detection (still used for future extensibility)

## What This Fixes
- Summary no longer replaced with weaker canned text
- Skills no longer replaced with weaker canned list
- GitHub link included in output
- Technical Projects section included in output
- User's uploaded resume content actually used
- Company context (Fortune 50, Digital Agency) preserved from input

## Verification

1. `flake8 api.py data/matthew_scott.py --max-line-length=127` passes
2. Curl test with SEI JD (no background) -- should produce resume with original summary + focus terms appended, GitHub link, Projects section
3. Curl test with background text -- should produce resume using user's content + JD keyword bullet selection + focus terms
4. End-to-end: Jobway ATS Optimizer with resume file + SEI JD -> PDF should use the uploaded resume content
5. Push both repos to main for Render auto-deploy, verify live API
