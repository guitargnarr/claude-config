---
name: Cover Letter Generator
description: Generates personalized cover letters for job applications based on Matthew's background and specific job requirements. Auto-invokes when user mentions cover letters or completes resume customization.
---

# Cover Letter Generation Skill

## When to Use This Skill

Invoke this skill automatically when the user:
- Asks for a cover letter
- Completes resume customization and needs cover letter
- Mentions "cover letter" in context of job application
- Asks "what should I write in my cover letter?"
- Wants to apply to a specific company

## Prerequisites

Ideally, this skill runs AFTER resume customization, so we have:
- Company name and position
- Job requirements analysis
- Match score and key strengths
- Company research (if available)

If prerequisites are missing, gather them first.

## Step-by-Step Process

### Step 1: Gather Required Information

Collect or confirm:
- **Company name**
- **Position title**
- **Hiring manager name** (if known, otherwise use "Hiring Manager")
- **Key job requirements** (from job description)
- **Company information** (industry, size, mission, recent news)
- **Why user is interested** (ask if not stated)

### Step 2: Research Company Background

**If Louisville, KY company:**
```bash
!ollama run louisville-job-market "Provide detailed information about [company]: their mission, culture, recent news, market position, and what makes them unique in Louisville."
```

**For all companies:**
- Use any job description details provided
- Reference company website info if shared
- Note industry trends if relevant

### Step 3: Get Achievement Matching

Query matthew-career-coach for relevant achievements:

```bash
!ollama run matthew-career-coach "What are the top 3-4 achievements from Matthew's background that best demonstrate his fit for a [position] role at [company]? Focus on quantifiable results and relevant domain experience."
```

### Step 4: Structure Cover Letter

Create a cover letter with this structure:

**Paragraph 1: Opening Hook (2-3 sentences)**
- State position and how you learned about it
- Brief compelling statement about why you're excellent fit
- Hook their interest immediately

**Paragraph 2: Relevant Experience (3-4 sentences)**
- Lead with most impressive, relevant achievement
- Quantify results (numbers, percentages, scale)
- Connect experience directly to job requirements
- Show understanding of their needs

**Paragraph 3: Specific Fit for Company (3-4 sentences)**
- Demonstrate knowledge of company
- Explain why THIS company (not just any job)
- Show cultural/mission alignment
- Reference recent news, initiatives, or company values if applicable

**Paragraph 4: Additional Value Proposition (2-3 sentences)**
- Highlight unique skills or perspective
- Mention complementary skills (e.g., self-taught Python for QA role)
- Show growth mindset or continuous learning

**Paragraph 5: Strong Closing (2 sentences)**
- Express enthusiasm
- Clear call to action
- Professional sign-off

### Step 5: Craft Personalized Content

**For Healthcare/Compliance Roles:**
- Emphasize 9+ years in healthcare domain
- Highlight zero-defect record across 1,000+ deployments
- Reference CMS/Medicare compliance expertise
- Mention Humana experience (Fortune 50 credibility)

**For Technical/Python Roles:**
- Lead with self-taught Python and 11,000+ lines of code
- Mention specific projects (sentiment analysis API, Reflexia, etc.)
- Emphasize automation achievements (40% reduction in manual work)
- Show continuous learning mindset

**For QA/Testing Roles:**
- Open with zero critical defects achievement
- Highlight scale (1,000+ deployments, 9 years)
- Emphasize methodical approach and attention to detail
- Reference testing tools and methodologies

**For AI/ML Roles:**
- Lead with AI/ML personal projects
- Emphasize quality assurance background applied to AI
- Mention responsible AI perspective
- Show technical depth with specific models/frameworks

**For Business Analyst Roles:**
- Highlight stakeholder management
- Emphasize requirement gathering and documentation
- Reference Agile/Scrum experience
- Show business impact of work (metrics improvement 70% → 96%)

### Step 6: Apply Tone and Voice

**Tone Guidelines:**
- Professional but personable
- Confident without arrogance
- Enthusiastic but not desperate
- Specific and concrete (no generic fluff)

**Voice Characteristics:**
- Active voice ("I achieved" not "was achieved")
- Strong action verbs (delivered, architected, streamlined)
- Industry-appropriate language
- Natural, conversational flow

**Avoid:**
- Clichés ("passionate," "team player," "think outside the box")
- Repetition of resume content word-for-word
- Overly humble language ("I think," "I believe," "hopefully")
- Generic statements that could apply to anyone

### Step 7: Incorporate Strategic Keywords

From job description, naturally weave in:
- Technical skills mentioned
- Methodologies referenced
- Industry terminology
- Company-specific language

**Example:**
Job mentions "Agile environment" → Include "led sprint planning sessions in Agile environment"
Job mentions "stakeholder management" → Include "managed stakeholder expectations across 5 business units"

### Step 8: Add Unique Differentiators

Highlight what makes Matthew stand out:

**For Traditional Roles (QA/BA):**
- "While my formal role was QA, I proactively taught myself Python to automate 40% of manual processes, demonstrating initiative that extends beyond job requirements."

**For Technical Roles:**
- "As a self-taught developer, I bring a unique perspective: combining rigorous QA methodology with modern development practices, having built 7 AI/ML systems totaling 11,000+ lines of production-quality code."

**For AI Roles:**
- "My background in healthcare compliance QA provides a unique foundation for AI safety work—both domains require meticulous attention to potential failure modes and zero-tolerance for critical errors."

### Step 9: Generate Cover Letter

Create cover letter with:
- **Filename**: `COVER_LETTER_{COMPANY}_{POSITION}_{YYYYMMDD}.txt`
- **Location**: `~/Desktop/Resumes_Master_2025/resumes/custom/`
- **Format**: Professional business letter format
- **Length**: 3/4 to 1 full page (300-400 words ideal)

### Step 10: Provide Usage Guidance

After generating, provide:
- Copy-paste ready version
- Customization suggestions (if user has specific details to add)
- Tips for personalizing further
- Reminder to update [Hiring Manager name] if they find it

## Output Format

```
✉️ COVER LETTER GENERATED FOR: [Company] - [Position]

📁 SAVED TO: ~/Desktop/Resumes_Master_2025/resumes/custom/COVER_LETTER_[COMPANY]_[POSITION]_[DATE].txt

───────────────────────────────────────────────────

[Full cover letter content displayed]

───────────────────────────────────────────────────

📝 PERSONALIZATION TIPS:
- [Tip 1]
- [Tip 2]
- [Tip 3]

🎯 KEY STRENGTHS HIGHLIGHTED:
- [Strength 1]
- [Strength 2]
- [Strength 3]

✅ NEXT STEPS:
[ ] Review and personalize if needed
[ ] Update hiring manager name if found
[ ] Save to application tracking system
[ ] Prepare for application submission

Would you like me to add this to your job application tracker?
```

## Template Structure

Use this template structure (fill with personalized content):

```
[Your Name]
[Your Email] | [Your Phone] | [LinkedIn URL] | Louisville, KY

[Date]

[Hiring Manager Name]
[Company Name]
[Company Address] (if known)

Dear [Hiring Manager Name / Hiring Manager],

[OPENING HOOK - Why you're writing and immediate value proposition]

[RELEVANT EXPERIENCE - Your most impressive, quantifiable achievement that matches their needs]

[COMPANY FIT - Why THIS company specifically, demonstrate research and alignment]

[ADDITIONAL VALUE - Unique skills or perspective that differentiate you]

[CLOSING - Enthusiasm and clear call to action]

Sincerely,
Matthew David Scott
```

## Special Scenarios

### Scenario: Career Transition (QA → AI/ML)

Address the transition directly and positively:
```
"While my formal title was Senior Risk Management Professional, my passion for AI led me to independently build 7 AI/ML systems, including a sentiment analysis API and multi-model orchestration platform. This combination of rigorous QA methodology and hands-on ML development positions me uniquely for AI safety roles."
```

### Scenario: Self-Taught Technical Skills

Frame as strength:
```
"I'm a committed self-learner, having independently mastered Python and built production-quality systems totaling 11,000+ lines of code—including FastAPI services, Docker containerization, and transformer-based NLP models. This demonstrates the initiative and learning capacity essential for [company's fast-paced environment]."
```

### Scenario: Long Tenure at One Company

Turn potential concern into strength:
```
"My 9+ years at Humana (Fortune 50) provided deep expertise in healthcare compliance while maintaining intellectual curiosity—I independently pursued AI/ML development, built automation tools, and continuously expanded my technical skillset beyond my core role."
```

### Scenario: Applying to Startup (from Fortune 50)

Address culture transition:
```
"While my experience is with a Fortune 50 organization, I've operated with a startup mindset: proactively identifying problems, building solutions independently (like Python automation reducing manual work by 40%), and driving initiatives beyond my job description."
```

## Quality Checks

Before finalizing, verify:
- [ ] Specific to THIS company (not generic)
- [ ] Quantified achievements included
- [ ] No typos or grammatical errors
- [ ] Appropriate length (300-400 words)
- [ ] Professional tone throughout
- [ ] Clear connection between experience and requirements
- [ ] Compelling opening hook
- [ ] Strong closing with call to action
- [ ] Contact information accurate
- [ ] Company name spelled correctly

## Integration Points

**Works with:**
- resume-customizer: Often follows resume customization
- interview-prep-auto: Can trigger interview prep after cover letter
- job-application-tracker: Records cover letter completion

**Triggers:**
- Automatically offered after resume customization
- User mentions "cover letter" in conversation
- User asks about application materials

## Error Handling

**If insufficient information:**
1. Ask for missing details (company, position, why interested)
2. Offer to create generic template for user to customize
3. Suggest researching company first

**If company information unavailable:**
1. Use generic but professional company language
2. Focus on role requirements rather than company specifics
3. Recommend user add company-specific details before sending

**If achievements don't clearly match:**
1. Focus on transferable skills
2. Emphasize learning ability and adaptability
3. Highlight growth mindset
4. Use "Additional Value" paragraph for unique perspective

## Success Metrics

- Cover letter completion time (target: <15 minutes)
- User satisfaction with content
- Application success rate when cover letter included
- Personalization depth (specific vs. generic)
