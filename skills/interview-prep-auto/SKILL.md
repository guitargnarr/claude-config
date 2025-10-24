---
name: Interview Prep Auto
description: Automatically generates comprehensive interview preparation materials when user mentions upcoming interviews. Integrates matthew-career-coach, louisville-job-market, and barrier-breaker Ollama models for complete prep.
---

# Automatic Interview Preparation Skill

## When to Use This Skill

Invoke this skill automatically when the user:
- Mentions "I have an interview"
- Says "Interview scheduled with [company]"
- Asks "How should I prepare for [company] interview?"
- Discusses upcoming interview
- Asks about interview tactics or strategies
- Mentions interview type (phone screen, technical, behavioral, etc.)

## Step-by-Step Process

### Step 1: Gather Interview Details

Collect or confirm:
- **Company name** (required)
- **Position/job title** (required)
- **Interview date/time** (if known)
- **Interview type** (phone screen, video, in-person, panel, technical, etc.)
- **Interview stage** (first round, final round, etc.)
- **Interviewers** (names/titles if known)
- **Duration** (30 min, 1 hour, etc.)
- **Format** (behavioral, technical, case study, presentation, etc.)
- **User's specific concerns** (what they're worried about)

If information is incomplete, ask clarifying questions.

### Step 2: Analyze Position and Background Match

Query matthew-career-coach for relevant background:

```bash
!ollama run matthew-career-coach "What are Matthew's top 3-5 achievements and experiences that best relate to a [position] role at [company]? Include quantifiable results and domain expertise. How should he position his background for maximum impact?"
```

This provides:
- Most relevant achievements
- How to frame experience
- Quantifiable talking points
- Domain expertise to emphasize

### Step 3: Research Company (If Louisville)

If company is in Louisville, KY:

```bash
!ollama run louisville-job-market "Provide comprehensive information about [company]: their industry, market position, size, culture, recent news, leadership, growth trajectory, and reputation in Louisville. What makes them unique?"
```

This reveals:
- Company background and culture
- Recent news and initiatives
- Market position and competitors
- Insider perspective on culture

### Step 4: Get Tactical Interview Strategy

Query barrier-breaker for hiring tactics:

```bash
!ollama run barrier-breaker "Provide specific interview tactics for a [position] role at a [company type/size] company. Include: question types to expect, how to handle objections, how to demonstrate value, red flags to watch for, and negotiation positioning."
```

This provides:
- Expected question types
- How to handle concerns (gaps, transitions, etc.)
- Demonstration strategies
- Negotiation prep

### Step 5: Prepare Question-Specific Responses

Based on position type, prepare answers for common questions:

**For ALL Interviews:**
1. "Tell me about yourself" (60-90 second elevator pitch)
2. "Why are you interested in this role/company?"
3. "What's your greatest strength?"
4. "Describe a challenge you overcame"
5. "Where do you see yourself in 5 years?"
6. "Why are you leaving your current position?" (or "Why did you leave Humana?")

**For QA/Testing Roles:**
1. "Describe your testing process/methodology"
2. "How do you prioritize testing when time is limited?"
3. "Tell me about a critical bug you found"
4. "How do you ensure quality in an Agile environment?"
5. "What testing tools and frameworks are you familiar with?"

**For Business Analyst Roles:**
1. "How do you gather requirements from stakeholders?"
2. "Describe a time stakeholders disagreed - how did you handle it?"
3. "How do you document requirements?"
4. "What's your experience with Agile/Scrum?"
5. "How do you measure success of a project?"

**For Technical/Python Roles:**
1. "Tell me about a technical project you built"
2. "How did you learn Python? (self-taught story)"
3. "Describe your approach to debugging complex issues"
4. "What's your experience with [specific tech from job description]?"
5. "How do you stay current with technology?"

**For AI/ML Roles:**
1. "Describe your AI/ML project experience"
2. "How do you approach model evaluation?"
3. "What's your perspective on responsible AI?"
4. "Tell me about your technical background"
5. "How does your QA experience relate to AI safety?"

### Step 6: Create STAR Stories

For behavioral questions, prepare 4-6 STAR (Situation, Task, Action, Result) stories:

**Story 1: Zero Defects Achievement**
- Situation: 9 years at Fortune 50 healthcare company
- Task: Maintain CMS compliance across Medicare systems
- Action: Rigorous testing methodology, attention to detail, stakeholder collaboration
- Result: Zero critical defects across 1,000+ production deployments

**Story 2: Team Performance Improvement**
- Situation: Team performance metrics at 70%
- Task: Improve team effectiveness
- Action: [Specific actions Matthew took]
- Result: Improved metrics from 70% to 96.68%

**Story 3: Process Automation**
- Situation: Manual compliance processes were time-consuming
- Task: Reduce manual effort
- Action: Self-taught Python, built automation tools
- Result: 40% reduction in manual processes

**Story 4: Self-Directed Learning**
- Situation: Wanted to expand technical skills beyond QA
- Task: Learn Python and AI/ML
- Action: Self-taught, built 7 AI/ML systems, 11,000+ lines of code
- Result: Production-quality systems including sentiment API, ML orchestration

**Story 5: Handling Complex Data**
- Situation: Managing 2,000+ Medicare PDF documents
- Task: Ensure accuracy and compliance
- Action: [Matthew's approach]
- Result: 100% accuracy maintained

**Story 6: Stakeholder Management**
- Situation: [Specific stakeholder challenge]
- Task: [Navigate competing priorities or disagreement]
- Action: [Matthew's approach]
- Result: [Positive outcome]

### Step 7: Prepare Questions to Ask

Prepare 8-10 thoughtful questions to ask the interviewer:

**About the Role:**
1. "What does success look like in this role in the first 90 days?"
2. "What are the biggest challenges facing the team right now?"
3. "How is this role's success measured?"
4. "Can you describe the typical project lifecycle?"

**About the Team:**
5. "How is the team structured? Who would I work most closely with?"
6. "What's the team's approach to professional development?"
7. "How does the team balance new initiatives with maintenance work?"

**About the Company:**
8. "How has the company/department evolved in the past year?"
9. "What's the company's approach to [relevant topic: quality, innovation, work-life balance]?"
10. "What excites you most about the company's direction?"

**Strategic (for later rounds):**
11. "What are the growth opportunities for someone in this role?"
12. "How does this role contribute to the company's larger objectives?"

### Step 8: Address Potential Concerns Proactively

Identify and prepare for potential objections:

**Concern: Long tenure at one company (9 years Humana)**
*Response Strategy:* Frame as deep expertise + continuous growth
"While I spent 9 years at Humana, I continuously expanded my skillset—from QA fundamentals to self-teaching Python and building AI systems. The stability allowed me to develop true expertise while the scale provided exposure to diverse challenges."

**Concern: Career transition (QA → AI/ML or other role)**
*Response Strategy:* Show intentional progression + transferable skills
"My QA background actually provides a unique foundation for [target role]. Both require rigorous methodology, attention to failure modes, and systematic thinking. I've been deliberately building toward this transition through self-directed learning and project work."

**Concern: Self-taught technical skills (not formal CS degree)**
*Response Strategy:* Demonstrate results + learning ability
"I'm a committed self-learner who builds production-quality systems. My 7 AI/ML projects represent 11,000+ lines of code with FastAPI, Docker, transformers—demonstrating not just theoretical knowledge but practical engineering skills."

**Concern: Why leaving after 9+ years?**
*Response Strategy:* Growth + new challenges (not negative about Humana)
"I'm grateful for my time at Humana—it provided deep healthcare domain expertise and opportunities to excel. I'm now seeking new challenges that align with my growing technical interests, particularly in [target area]. This role represents that next chapter."

**Concern: Overqualified (for certain roles)**
*Response Strategy:* Emphasize fit + long-term interest
"I'm focused on fit over title. This role offers [specific aspects] that genuinely excite me. My background means I can contribute immediately while having room to grow in [direction]."

### Step 9: Create Interview Prep Document

Generate comprehensive prep document:

**Filename:** `INTERVIEW_PREP_{COMPANY}_{POSITION}_{DATE}.md`
**Location:** `~/Desktop/Resumes_Master_2025/job_search/interview_prep/`

**Document Structure:**
```markdown
# Interview Preparation: [Company] - [Position]
**Interview Date:** [Date/Time]
**Interview Type:** [Type]
**Interviewers:** [Names if known]

## Company Overview
[Research findings from louisville-job-market or other sources]

## Position Analysis
[Key requirements and how Matthew's background maps]

## Top Talking Points
1. [Achievement 1 with numbers]
2. [Achievement 2 with numbers]
3. [Achievement 3 with numbers]

## STAR Stories Prepared
### Story 1: [Title]
- **Situation:**
- **Task:**
- **Action:**
- **Result:**

[Continue for all stories]

## Expected Questions & Answers
### "Tell me about yourself"
[60-90 second pitch]

[Continue for all expected questions]

## Questions to Ask Interviewer
1. [Question 1]
2. [Question 2]
[...]

## Potential Concerns & Responses
### Concern: [Concern]
**Response:** [Strategy]

[Continue for all concerns]

## Interview Tactics
[Insights from barrier-breaker model]

## Logistics
- **Date/Time:** [Details]
- **Location/Link:** [Details]
- **Duration:** [Duration]
- **Format:** [Format]
- **What to bring:** [List]

## Pre-Interview Checklist
- [ ] Review company website and recent news
- [ ] Review job description one more time
- [ ] Practice STAR stories out loud
- [ ] Prepare questions to ask
- [ ] Test tech setup (if virtual)
- [ ] Choose appropriate attire
- [ ] Plan to arrive 10 min early (or log in 5 min early)
- [ ] Bring copies of resume
- [ ] Bring notepad and pen

## Post-Interview Actions
- [ ] Send thank you email within 24 hours
- [ ] Note any follow-up items discussed
- [ ] Update job tracker with interview status
- [ ] Reflect on what went well / what to improve
```

### Step 10: Provide Prep Summary and Encouragement

After generating document, provide summary:

```
🎤 INTERVIEW PREP COMPLETE FOR: [Company] - [Position]

📅 INTERVIEW: [Date/Time]

📁 FULL PREP SAVED TO:
~/Desktop/Resumes_Master_2025/job_search/interview_prep/INTERVIEW_PREP_[COMPANY]_[POSITION]_[DATE].md

✨ KEY STRENGTHS TO EMPHASIZE:
1. [Strength 1]
2. [Strength 2]
3. [Strength 3]

💡 STRATEGIC INSIGHTS:
- [Insight 1]
- [Insight 2]

📋 QUICK PREP CHECKLIST:
[ ] Review STAR stories (practice out loud)
[ ] Research company news from last 30 days
[ ] Prepare 3-5 questions to ask
[ ] Test tech setup (if virtual)
[ ] Get good night's sleep before interview

🎯 YOU'VE GOT THIS:
[Personalized encouragement based on match quality]

Would you like to practice any specific questions or scenarios?
```

## Advanced Features

### Feature: Mock Interview Practice

Offer to conduct mock interview:
```
"Would you like to practice answering interview questions? I can act as the interviewer and provide feedback on your responses."
```

If accepted:
1. Ask common questions one at a time
2. User provides answer
3. Give constructive feedback on:
   - Structure (STAR format for behavioral)
   - Specificity (quantified results)
   - Length (concise vs. too long/short)
   - Relevance to question asked
   - Confidence level (word choice)
4. Suggest improvements

### Feature: Company-Specific Research

Offer deeper research:
```
"Would you like me to research [company]'s recent news, product launches, or leadership changes? This can help you ask more informed questions."
```

Conduct web search or ask user to share what they've found.

### Feature: Technical Interview Prep

For technical roles, offer:
```
"This appears to be a technical role. Would you like to review:
- Python concepts and common interview questions
- Your technical projects and how to discuss them
- Code architecture and design principles
- Specific technologies mentioned in job description
```

### Feature: Salary Negotiation Prep

For later-stage interviews:
```
"This is a final round interview. Let's prepare for potential salary discussion:
- Market rate for [position] in [location]
- Your target range based on experience
- How to discuss compensation professionally
- Benefits and non-salary factors to consider
```

Query barrier-breaker for negotiation tactics.

### Feature: Thank You Email Template

After interview:
```
"Interview complete! Would you like me to draft a thank you email to send within 24 hours?"
```

Generate personalized thank you referencing specific discussion points.

## Special Scenarios

### Scenario: Phone Screen (15-30 min)

Adjust prep for brevity:
- Focus on 3-4 key talking points
- Prepare concise 45-60 second "tell me about yourself"
- Have 2-3 questions ready
- Emphasize fit and interest
- Keep STAR stories short (2-3 min max)

### Scenario: Technical Interview

Include:
- Review of technical projects
- Architecture discussion prep
- Code explanation practice
- Problem-solving approach
- Whiteboarding tips (if applicable)

### Scenario: Panel Interview

Additional prep:
- Research each interviewer (LinkedIn)
- Prepare to address different perspectives
- Practice making eye contact with all
- Direct answers to questioner but engage all
- Have questions relevant to each role

### Scenario: Case Study/Presentation

Create:
- Framework for approaching case
- Structure for presentation
- Practice timing
- Backup plans for tech issues
- Q&A preparation

## Quality Checks

Before finalizing prep document:
- [ ] All STAR stories include quantified results
- [ ] Company research is current (within 30 days)
- [ ] Questions to ask are thoughtful and researched
- [ ] Potential concerns addressed proactively
- [ ] Interview logistics confirmed
- [ ] Prep checklist is complete
- [ ] Document is well-organized and scannable
- [ ] Ollama model insights incorporated

## Integration Points

**Works with:**
- resume-customizer: References custom resume details
- cover-letter-generator: Builds on cover letter themes
- job-application-tracker: Updates tracker with interview status
- barrier-breaker (Ollama): Tactical interview strategies
- matthew-career-coach (Ollama): Background and achievements
- louisville-job-market (Ollama): Company research (Louisville companies)

**Triggers:**
- User mentions upcoming interview
- After application moves to interview stage
- User asks about interview preparation
- User expresses concern about interview

## Error Handling

**If insufficient interview details:**
1. Gather minimum info (company, position, approximate date)
2. Create general prep document
3. Offer to refine when more details available

**If Ollama models unavailable:**
1. Use built-in knowledge of Matthew's background
2. Provide general interview prep
3. Note which insights are missing
4. Offer to regenerate when models available

**If no company research available:**
1. Provide general industry insights
2. Recommend user research company
3. Include prompts for what to research
4. Suggest using company website and LinkedIn

## Success Metrics

- Interview prep completion rate (% of interviews prepped)
- Time to generate prep (target: <20 minutes)
- User confidence rating (self-reported)
- Interview success rate when prepped vs. not prepped
- Quality of STAR stories (specific and quantified)
- Usefulness of company insights

## Post-Interview Follow-Up

After interview, prompt user:
```
"How did the interview with [company] go? Let's debrief:
- What questions did they ask?
- What went well?
- What would you improve for next time?
- Any follow-up needed?
- Should we update your interview prep template based on this experience?"
```

Use feedback to improve future prep documents.
