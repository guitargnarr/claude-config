---
name: Job Application Tracker
description: Automatically tracks job applications by updating JOB_TRACKER_2025.csv when user discusses applying to positions, submitting applications, or receiving responses. Maintains complete application history.
---

# Job Application Tracking Skill

## When to Use This Skill

Invoke this skill automatically when the user:
- Mentions submitting/sending an application
- Says "I applied to [company]"
- Completes resume/cover letter for specific job
- Discusses job application status
- Mentions interview scheduled/completed
- Reports rejection or offer
- Asks "what jobs have I applied to?"

## Step-by-Step Process

### Step 1: Detect Tracking Trigger

Listen for phrases like:
- "I just applied to..."
- "Submitted application for..."
- "Got an interview at..."
- "Heard back from..."
- "They rejected me..."
- "Got an offer from..."
- "Following up with..."

### Step 2: Extract Application Information

Gather these details (ask if not provided):
- **Company name** (required)
- **Position/job title** (required)
- **Date applied** (default to today if not specified)
- **Resume variant used** (VARIANT_A, VARIANT_B, VARIANT_C, or CUSTOM)
- **Cover letter sent** (yes/no)
- **Application status** (submitted, phone_screen, interview, offer, rejected, withdrawn)
- **Job URL** (if available)
- **Salary range** (if mentioned)
- **Remote status** (remote, hybrid, onsite, not_specified)
- **Contact name/email** (if known)
- **Notes** (any additional context)

### Step 3: Read Existing Tracker

Read the current tracker file:
```
~/Desktop/Resumes_Master_2025/job_search/tracking/JOB_TRACKER_2025.csv
```

Parse existing entries to:
- Check if application already exists (avoid duplicates)
- Get current application count
- Identify patterns (which variants used most, response rates, etc.)

### Step 4: Determine Action

**If NEW application:**
- Add new row to CSV with all details
- Assign unique ID (sequential number or timestamp)
- Set initial status (usually "submitted")
- Set date_applied to today (or user-specified date)

**If UPDATING existing application:**
- Find matching entry (by company + position)
- Update status field
- Add to notes field (append with timestamp)
- Update follow-up date if applicable

### Step 5: Update CSV File

**CSV Format:**
```csv
id,company,position,job_url,date_applied,date_follow_up,status,resume_variant,cover_letter_sent,contact_name,contact_email,notes,salary_range,remote_status,last_updated
```

**Status Values:**
- `submitted` - Application sent, awaiting response
- `phone_screen` - Initial phone screening scheduled/completed
- `interview_scheduled` - In-person/video interview scheduled
- `interview_completed` - Interview done, awaiting decision
- `offer` - Offer received
- `rejected` - Application/interview rejected
- `withdrawn` - User withdrew application
- `no_response` - No response after follow-up period

**Resume Variant Values:**
- `VARIANT_A` - Pure QA/BA resume
- `VARIANT_B` - QA + Python resume
- `VARIANT_C` - AI Safety resume
- `CUSTOM_[details]` - Custom resume (note company/position)

Use Edit tool to append new entry or update existing entry (NOT Write tool - that would overwrite).

### Step 6: Provide Tracking Confirmation

After updating, show:
```
📊 APPLICATION TRACKED

Company: [Company Name]
Position: [Position Title]
Status: [Status]
Date Applied: [Date]
Resume Used: [Variant]
Cover Letter: [Yes/No]

📈 TRACKING STATS:
Total Applications: [X]
This Month: [X]
Awaiting Response: [X]
Interviews Scheduled: [X]
```

### Step 7: Provide Insights and Recommendations

Based on updated tracker, offer insights:

**Response Rate Analysis:**
```
Response Rate by Variant:
- VARIANT_A: X% response rate (Y applications)
- VARIANT_B: X% response rate (Y applications)
- VARIANT_C: X% response rate (Y applications)
```

**Follow-Up Recommendations:**
- If status is "submitted" and >2 weeks since application: "Consider following up with [company]"
- If interview completed >1 week ago: "Suggest sending thank you or status inquiry"
- If no_response status: "May want to mark as inactive and focus efforts elsewhere"

**Activity Tracking:**
- "You've applied to X jobs this week (goal: Y)"
- "Most active application day: [day of week]"
- "Average applications per week: [X]"

### Step 8: Offer Next Actions

Present options:
```
📋 NEXT ACTIONS:
[ ] Set follow-up reminder for this application
[ ] View all pending applications
[ ] Generate weekly application report
[ ] Update other application statuses
[ ] Export tracker for external review
```

## Advanced Features

### Feature: Follow-Up Reminders

When user wants follow-up reminder:
1. Calculate appropriate follow-up date (default: 2 weeks after application)
2. Add date_follow_up to CSV entry
3. Offer to create calendar event or reminder

### Feature: Application Analytics

When user asks "how many applications?" or similar:

Provide statistics:
- Total applications (all time, this month, this week)
- Applications by status
- Response rate overall and by variant
- Average time from application to response
- Most common rejection reasons (if tracked in notes)
- Success rate by company size, industry, or location

### Feature: Weekly Report Generation

Generate weekly report:
```
📊 WEEKLY APPLICATION REPORT (Oct 14-20, 2025)

ACTIVITY:
- Applications submitted: X
- Responses received: Y
- Interviews scheduled: Z
- Offers received: A

BY VARIANT:
- VARIANT_A: X applications
- VARIANT_B: Y applications
- VARIANT_C: Z applications

TOP COMPANIES:
1. [Company] - [Status]
2. [Company] - [Status]
3. [Company] - [Status]

PENDING FOLLOW-UPS:
- [Company] - Applied [date], no response
- [Company] - Interview completed [date], awaiting decision

RECOMMENDED ACTIONS:
- [Action 1]
- [Action 2]
```

### Feature: Duplicate Detection

Before adding new application:
1. Check if company + position combination already exists
2. If found, ask: "You already applied to [position] at [company] on [date]. Update existing entry or create new one?"
3. Prevent accidental duplicate applications

### Feature: Batch Import

If user provides list of applications:
```
User: "I applied to 5 jobs today: Humana BA role, Norton QA position, ..."

Parse list and add all at once, confirming each:
"Adding 5 applications:
1. Humana - Business Analyst [✓]
2. Norton - QA Specialist [✓]
3. ...
All tracked successfully."
```

## Output Format

### New Application Added:
```
✅ APPLICATION TRACKED

📋 DETAILS:
Company: [Company Name]
Position: [Position Title]
Applied: [Date]
Status: Submitted
Resume: [Variant Used]
Cover Letter: [Yes/No]
URL: [Job URL if provided]

📊 YOUR STATS:
Total Applications: [X]
This Month: [X]
Response Rate: [X]%
Interviews: [X] scheduled

💡 INSIGHTS:
- [Insight 1]
- [Insight 2]

🔔 REMINDER:
Follow up if no response by [Date]

📋 NEXT STEPS:
[ ] Add to calendar for follow-up
[ ] View all pending applications
[ ] Generate application report
```

### Application Updated:
```
🔄 APPLICATION UPDATED

Company: [Company Name]
Position: [Position]
Previous Status: [Old Status]
New Status: [New Status]
Updated: [Today's Date]

📝 NOTES ADDED:
[Any new notes]

📊 INTERVIEW PIPELINE:
Phone Screens: [X]
Interviews: [Y]
Offers: [Z]
```

## Special Scenarios

### Scenario: Group Application (Career Fair)

User: "I applied to 10 companies at the career fair today"

Response:
1. Ask for company names (or read from list if provided)
2. Use same position if multiple companies, same role
3. Set date_applied to career fair date
4. Add note: "Career fair application - [event name]"
5. Bulk import all entries

### Scenario: Application Through Referral

If user mentions referral:
- Add to contact_name field: "Referred by [name]"
- Add to notes: "Internal referral - [context]"
- Suggest prioritizing follow-up (referrals have higher response rate)

### Scenario: Recruiter Outreach

User: "A recruiter reached out about [position] at [company]"

Track as:
- Status: "recruiter_outreach"
- Notes: "Inbound recruiter contact - [recruiter name]"
- Contact fields populated
- Different follow-up timeline (respond within 24-48 hours)

### Scenario: Application Withdrawal

User: "I'm withdrawing from [company] process"

Update:
- Status: "withdrawn"
- Notes: Add reason if provided
- Date_follow_up: Clear (no longer needed)
- Confirm withdrawal tracked

## CSV Maintenance

### Backup Before Edits
Always create backup before modifying CSV:
```bash
cp ~/Desktop/Resumes_Master_2025/job_search/tracking/JOB_TRACKER_2025.csv \
   ~/Desktop/Resumes_Master_2025/job_search/tracking/JOB_TRACKER_2025.csv.backup_$(date +%Y%m%d)
```

### Data Validation
Before saving, verify:
- [ ] No duplicate entries (same company + position + date)
- [ ] All required fields populated (company, position, date_applied)
- [ ] Dates in correct format (YYYY-MM-DD)
- [ ] Status values from approved list
- [ ] CSV properly escaped (commas in company names, etc.)

### File Integrity
After edit:
- [ ] Verify CSV still parses correctly
- [ ] Check row count increased (or stayed same for updates)
- [ ] Confirm no data corruption

## Query Examples

Handle natural language queries:

**"How many applications this month?"**
→ Count entries where date_applied is current month

**"Which companies haven't responded?"**
→ Filter status = "submitted" AND date_applied > 2 weeks ago

**"What's my interview rate?"**
→ (Count status IN interview|offer) / (Count total applications)

**"Show me all VARIANT_A applications"**
→ Filter resume_variant = "VARIANT_A"

**"Applications to healthcare companies"**
→ Filter company IN [known healthcare companies] or ask user to specify

## Integration Points

**Works with:**
- resume-customizer: Tracks which variant was used
- cover-letter-generator: Records if cover letter sent
- interview-prep-auto: Links to interview preparation
- MCP job database (future): Query via SQL instead of CSV parsing

**Triggers:**
- After resume customization completion
- After cover letter generation
- When user mentions application activity
- When user queries application stats

## Error Handling

**If CSV file doesn't exist:**
1. Offer to create new tracker with headers
2. Initialize with first entry
3. Confirm file location

**If CSV is malformed:**
1. Alert user to corruption
2. Offer to restore from backup
3. Create new tracker if needed

**If duplicate detected:**
1. Show existing entry
2. Ask: Update, Create new, or Cancel?
3. Prevent accidental duplicates

**If required fields missing:**
1. Prompt for required info (company, position, date)
2. Use sensible defaults where possible
3. Allow partial entry with note to complete later

## Success Metrics

- Application tracking completion rate (% of applications tracked)
- Data accuracy (correct dates, statuses, variants)
- Time to track application (target: <1 minute)
- Insights usefulness (user acts on recommendations)
- Follow-up adherence (% of recommended follow-ups completed)

## Future Enhancements

When MCP server is configured (Item #3):
- Query tracker via SQL instead of CSV parsing
- More sophisticated analytics
- Automatic duplicate detection
- Better date range queries
- Exportable reports
