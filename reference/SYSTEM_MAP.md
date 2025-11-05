# System Organization Map
**Last Updated:** October 30, 2025

Understanding the two-system architecture and where everything lives.

---

## The Two-System Reality

### **~/career/** (Master Data & Execution)

**Purpose:** Your actual working data and rapid execution tools

**Contents:**
- **Job Search.numbers** - Master tracker (50-70+ applications, update daily)
- **resumes/*.pdf** - Actual PDF resumes being sent to employers
- **automation/linkedin_assault.py** - Rapid LinkedIn Easy Apply automation tool
- **tracking/AUTOMATED_APPLICATIONS.csv** - Output from linkedin_assault.py
- **tracking/PENDING_ADDITIONS.csv** - Staging file for Numbers import
- **tracking/** - Various tracking CSVs
- **automation/** - LinkedIn automation scripts
- **interviews/** - Interview prep materials
- **documentation/** - Guides and learnings
- **designs/** - QR codes, business cards

**When to use:** Daily job search execution, tracking, rapid applications

---

### **~/Desktop/1_PRIORITY_JOB_SEARCH/Resumes_Master_2025/** (Build Tools & Projects)

**Purpose:** Development tools, automation systems, project materials

**Contents:**
- **job_search/gmail_auto_sync.py** - Gmail application finder
- **job_search/robert_half/** - Robert Half application materials and portfolios
- **job_search/unemployment_certifications/** - Kentucky unemployment documentation
- **cover_letters/cover_letter_generator.py** - Cover letter template system
- **resumes/active/VARIANT_*.txt** - Text resume source files
- **mcp_servers/gmail_server.py** - Real-time Gmail MCP server
- **scripts/** - Various automation scripts

**When to use:** Building tools, creating materials, automation development

---

## Usage Decision Tree

**Need to track an application?**
→ Update ~/career/Job Search.numbers

**Need to submit resume?**
→ Use ~/career/resumes/*.pdf

**Need to apply to 20+ jobs fast?**
→ Run ~/career/automation/linkedin_assault.py

**Need to check for missed applications?**
→ Run ~/Desktop/.../gmail_auto_sync.py

**Need custom cover letter?**
→ Run ~/Desktop/.../cover_letter_generator.py

**Need interview materials?**
→ Check ~/Desktop/.../robert_half/ for portfolios

**Need unemployment cert documentation?**
→ ~/Desktop/.../unemployment_certifications/

---

## Why Two Systems Exist

**Historical:** ~/career/ was created Oct 27 as "single source of truth"

**Reality:** Work happened in ~/Desktop/ location before and after

**Current state:** Both systems active, serving different purposes

**Future:** Consolidation possible but not urgent - both work for their purposes

---

## Related Documentation

- **File locations:** [FILE_LOCATIONS.md](FILE_LOCATIONS.md) - Complete file index
- **Job tracking:** [../career/JOB_TRACKING.md](../career/JOB_TRACKING.md) - Tracking system details
- **Quick commands:** [QUICK_COMMANDS.md](QUICK_COMMANDS.md) - Common tasks

---

← [Back to Index](../CLAUDE.md)
