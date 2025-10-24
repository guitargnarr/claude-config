---
name: Resume Customizer
description: Automatically customizes Matthew's resume variants for specific job postings. Invokes when user discusses job applications, mentions tailoring resumes, or shares job descriptions.
---

# Resume Customization Skill

## When to Use This Skill

Invoke this skill automatically when the user:
- Mentions a job posting or job description
- Asks to customize/tailor a resume
- Discusses applying for a specific position
- Shares a job URL or job requirements
- Says "I found a job at [company]"

## Step-by-Step Process

### Step 1: Extract Job Information

If the user provides a job description or URL, extract:
- Company name
- Job title/position
- Key required skills
- Required experience level
- Industry/domain (healthcare, tech, AI, etc.)
- Location and remote status
- Key responsibilities

If information is incomplete, ask clarifying questions.

### Step 2: Analyze Job Category

Determine which resume variant is most appropriate:

**VARIANT_A (Pure QA/BA)** - Use when job emphasizes:
- Quality Assurance / Testing focus
- Business Analyst responsibilities
- Healthcare/compliance domain experience
- JIRA, ServiceNow, Agile methodologies
- CMS, Medicare, HIPAA compliance
- Minimal or no coding requirements

**VARIANT_B (QA + Python)** - Use when job emphasizes:
- QA/BA + automation skills
- Python scripting for testing
- API testing, automation frameworks
- "Technical BA" or "SDET" roles
- Both testing AND development skills
- Modern tech stack exposure

**VARIANT_C (AI Safety Target)** - Use when job emphasizes:
- AI/ML roles
- AI safety, ethics, responsible AI
- Model evaluation, red-teaming
- ML operations, model monitoring
- Emerging tech/research focus
- Self-taught technical skills valued

### Step 3: Query Professional Background

Use the matthew-career-coach Ollama model to get relevant experience:

```bash
!ollama run matthew-career-coach "What experience and achievements from Matthew's background best match these job requirements: [list key requirements]? Focus on quantifiable achievements."
```

### Step 4: Read Source Material

Read the appropriate base variant:
- VARIANT_A: `~/Desktop/Resumes_Master_2025/resumes/active/VARIANT_A_PURE_QA.txt`
- VARIANT_B: `~/Desktop/Resumes_Master_2025/resumes/active/VARIANT_B_QA_PLUS_PYTHON.txt`
- VARIANT_C: `~/Desktop/Resumes_Master_2025/resumes/active/VARIANT_C_AI_SAFETY_TARGET.txt`

Also read the master source for additional details:
- `~/Desktop/Resumes_Master_2025/resumes/source/MASTER_RESUME_SOURCE_TRUTH.txt`

### Step 5: Customize Resume Content

Create a customized version with these modifications:

**A. Skills Section Optimization**
- Move matching skills to the top of the list
- Emphasize technologies mentioned in job description
- Add specific tools/frameworks if Matthew has experience
- De-emphasize non-relevant skills (move to bottom)

**B. Experience Section Reordering**
- Reorder bullet points to highlight most relevant achievements
- Lead with accomplishments that match job requirements
- Quantify results where possible (%, numbers, metrics)
- Use keywords from job description naturally

**C. Professional Summary Tailoring**
- Craft 2-3 sentence summary emphasizing relevant expertise
- Mirror language from job posting
- Highlight years in specific domain if relevant (e.g., "9+ years healthcare QA")

**D. Achievement Highlighting**
Example transformations:
- Generic: "Tested software applications"
- Tailored for healthcare QA: "Ensured 100% CMS compliance across 1,000+ deployments in Medicare systems"
- Tailored for Python role: "Automated 40% of manual processes using Python, reducing cycle time"

### Step 6: Research Company Context (If Louisville Company)

If the company is in Louisville, KY, use louisville-job-market model:

```bash
!ollama run louisville-job-market "Provide information about [company name] - their industry, size, culture, and any relevant market position in Louisville."
```

Incorporate company-specific insights into the customization.

### Step 7: Generate Customized Resume

Create the customized resume with:
- Filename: `CUSTOM_{COMPANY}_{POSITION}_{YYYYMMDD}.txt`
- Location: `~/Desktop/Resumes_Master_2025/resumes/custom/`
- Format: Match the base variant format exactly
- Length: Maintain 1-2 page equivalent length

### Step 8: Provide Analysis and Recommendations

After creating the customized resume, provide:

**Match Score**: Estimate how well Matthew's background fits (0-100%)
- 90-100%: Excellent fit, apply immediately
- 75-89%: Strong fit, emphasize transferable skills
- 60-74%: Moderate fit, highlight learning ability
- Below 60%: Stretch role, focus on potential

**What Changed**: Summarize key modifications made
- Skills reordered
- Achievements emphasized
- New summary focus
- Keywords added

**Cover Letter Talking Points**: Suggest 3-5 key points for cover letter
- Why this company
- How experience translates
- Specific achievements that match needs
- Unique value proposition

**Interview Preparation Notes**: Initial prep suggestions
- Key talking points about relevant experience
- Questions to ask interviewer
- Potential concerns to address proactively

### Step 9: Offer Follow-Up Actions

Ask if the user wants:
- Cover letter generation (triggers cover-letter-generator skill)
- Interview preparation deep dive (triggers interview-prep-auto skill)
- Application tracking entry (triggers job-application-tracker skill)
- Company research deep dive

## Output Format

```
🎯 RESUME CUSTOMIZED FOR: [Company] - [Position]

📊 MATCH SCORE: [XX]% ([Excellent/Strong/Moderate] Fit)

📁 SAVED TO: ~/Desktop/Resumes_Master_2025/resumes/custom/CUSTOM_[COMPANY]_[POSITION]_[DATE].txt

✏️ KEY CHANGES MADE:
1. [Change 1]
2. [Change 2]
3. [Change 3]
...

💡 COVER LETTER TALKING POINTS:
- [Point 1]
- [Point 2]
- [Point 3]

🎤 INTERVIEW PREP HIGHLIGHTS:
- [Highlight 1]
- [Highlight 2]
- [Highlight 3]

📋 RECOMMENDED NEXT STEPS:
[ ] Generate cover letter
[ ] Deep interview preparation
[ ] Add to job application tracker
[ ] Research company further

Would you like me to proceed with any of these next steps?
```

## Special Considerations

**Healthcare/Compliance Roles:**
- Emphasize zero-defect record
- Highlight CMS/Medicare compliance expertise
- Feature Humana tenure and domain knowledge

**Technical/Python Roles:**
- Lead with self-taught Python projects
- Emphasize AI/ML personal projects
- Highlight automation achievements

**AI Safety/Ethics Roles:**
- Feature consciousness experiments and AI projects
- Emphasize responsible AI perspective
- Highlight quality assurance mindset applied to AI

**Startup/Agile Roles:**
- Emphasize adaptability and learning speed
- Highlight diverse project portfolio
- Feature self-directed learning

## Quality Checks

Before finalizing customized resume, verify:
- [ ] No PII beyond standard resume info
- [ ] All dates accurate and consistent
- [ ] No typos or formatting errors
- [ ] Keywords from job description naturally integrated
- [ ] Maintains professional tone
- [ ] Length appropriate (1-2 pages)
- [ ] Contact information correct
- [ ] File saved in correct location

## Integration with Other Skills

This skill works with:
- **cover-letter-generator**: Automatically offer after resume customization
- **interview-prep-auto**: Suggest for high-match roles
- **job-application-tracker**: Record customization in tracker

## Error Handling

If the job description is unclear or incomplete:
1. Ask specific clarifying questions
2. Make best-effort customization based on available info
3. Note assumptions made in output
4. Recommend user provide more details for better customization

If no clear variant matches:
1. Default to VARIANT_B (most versatile)
2. Explain why this variant was chosen
3. Note any gaps between experience and requirements
4. Suggest emphasizing transferable skills

## Success Metrics

Track to measure skill effectiveness:
- Time to customize resume (target: <10 minutes)
- Match score accuracy (user feedback)
- Application success rate by variant
- User satisfaction with customizations
