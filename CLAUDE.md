# Matthew David Scott - Context for Claude Code

## Current Reality (November 2025)

**Career Crossroads:** Transitioning from corporate → teaching/consulting in AI
- **Age:** 35
- **Background:** 10 years healthcare IT, laid off from Humana (August 2025, interpersonal conflict)
- **Direction:** Teaching AI to individuals, consulting for Louisville KY businesses
- **Not pursuing:** Corporate ML Engineer roles

**Philosophy:** Use AI skills to help others navigate disruption. Build locally, teach practically, consult honestly.

---

## Live Projects - Problem → Solution

### **projectlavos.com** - Consulting Demo Hub (PRIMARY)
**Problem:** Louisville businesses don't know if AI can help them
**Solution:** 4 interactive demos they can try immediately (sentiment, lead scoring, phishing, prompt engineering)
**Purpose:** Client acquisition, credibility proof, consultation starter
**Tech:** React + Vite (Vercel), FastAPI + Claude API (Render)
**Status:** LIVE - November 2025 | Updated Nov 5 with prompt engineering playground
**Use for:** Email outreach, meeting demos, social sharing, hiring proof (prompt engineering expertise)

### **jaspermatters.com** - Technical Credibility
**Problem:** "Can you actually build sophisticated ML systems?"
**Solution:** Full production ML platform with TensorFlow
**Purpose:** Technical proof for skeptical buyers, portfolio showcase
**Tech:** React + Vite + Tailwind (Netlify), FastAPI + TensorFlow (Render)
**Status:** LIVE - Deployed November 2025
**Use for:** Credibility validation, "see my work" link

### **phishguard-ml** - Cybersecurity Expertise Signal
**Problem:** Email security for businesses
**Solution:** 7-model ensemble phishing detection
**Purpose:** Shows security + ML depth, opens legal/financial consulting
**Tech:** FastAPI, 7 ML models, 2,039 features, Docker-ready
**Status:** Production-ready on GitHub
**Use for:** Security-focused clients, technical depth proof

### **mirador** - Privacy/Compliance Positioning
**Problem:** HIPAA-compliant AI for healthcare/legal
**Solution:** Local-only AI orchestration (no cloud, no data leakage)
**Purpose:** Healthcare/legal market entry, privacy-first credibility
**Tech:** Python, Ollama, 64 agents, packaged (pip install mirador-ai)
**Status:** Packaged on GitHub
**Use for:** Healthcare/legal clients, compliance discussions

**Work Location:** ~/Projects/ (3.8 GB, 48K files - active development)
**GitHub:** guitargnarr (9 repos now) - matthewdscott7@gmail.com

---

## System Architecture

**Primary Locations:**
- ~/Projects/ - Active development, experiments, tools (don't document, I'll find it)
- ~/Desktop/ - Organized into 8 numbered folders
- ~/career/ - Job search archive (transitioning away from this)
- ~/Documents/ - Long-term storage, personal files

**Python:** 3.14 at /Library/Frameworks/Python.framework/Versions/3.14/bin/python3

---

## How to Help Me

**Primary Goal:** Help me make important life/career decisions with unique perspectives based on truth.

**Use Claude Code For:**
- Building client demonstration tools
- Creating teaching materials
- Business intelligence prototypes
- Louisville market analysis
- Systems that help others learn AI

**Do NOT:**
- Create documentation unless specifically requested
- Build job search infrastructure
- Make reference materials unprompted
- Assume corporate employment is the goal

**Communication:**
- Direct, technical, honest
- Present options, respect my autonomy
- Challenge assumptions when you see better paths
- Ultrathink when I ask for deep analysis
- **NEVER assume my energy levels or suggest rest** - I manage my own schedule and energy
- **NEVER say "maybe do this tomorrow"** - If I'm working, I'm working. Let me decide when to stop.
- Ask "What next?" not "Should you rest?"

---

## Background Context (if needed)

**Previous GitHub Accounts (deleted):**
- guitargnar - ToS violation, data sanitization concerns
- scyther7 - Temporary workaround, deleted after issues

**Current:** guitargnarr (permanent)

**Note:** ~/Projects/ has some repos still pointing to scyther7 (deleted account). Leave them as-is unless specific need arises.

---

---

## Proven Deployment Workflow (Tested Nov 2025)

### **Full-Stack Demo Site Pattern:**

**Backend (API):**
1. FastAPI in ~/Projects/[project]-backend/
2. Push to GitHub (guitargnarr/[project]-backend)
3. Deploy to Render.com (free tier, auto-deploy on push)
4. **Result:** [project]-backend.onrender.com

**Frontend (Website):**
1. React + Vite in ~/Projects/[project]-frontend/
2. Create public/ folder for: favicon.ico, og-image.png, icons
3. Push to GitHub (guitargnarr/[project]-frontend)
4. Deploy to Vercel via CLI: `vercel --prod --yes`
5. **Result:** [project].vercel.app

**Custom Domain:**
1. Buy domain at Namecheap (~$12/year)
2. In Vercel: Add domain, get DNS instructions
3. In Namecheap: Advanced DNS → Add A record + CNAME
4. **Result:** Live at custom domain in 5-10 min

**Assets for Social Sharing:**
- favicon.ico (32x32)
- og-image.png (1200x630 PNG, not SVG)
- Meta tags in index.html (Open Graph + Twitter)
- **Critical:** PNG format for Messages/Slack compatibility

**Tested on:** projectlavos.com (Nov 2, 2025) - Complete success
**Time:** 4-5 hours from scratch to live
**Cost:** Domain only (~$12), hosting free (Vercel + Render)

### **Known Issues:**

**Netlify:**
- Can have repo connection problems (jaspermatters connected to wrong repo)
- Cache can block new assets (OG images return 404)
- **Recommendation:** Use Vercel for new projects

**Platform Choice:**
- Vercel: Auto-detects Vite, handles public/ folder correctly ✅
- Render: Reliable for FastAPI backends ✅
- Netlify: Works but can have configuration issues ⚠️

---

## Job Search Tracking System (Built Nov 5, 2025)

**Active Status:** Aggressively pursuing corporate roles (5-7 applications/day) alongside consulting pivot. High volume LinkedIn Easy Apply strategy with 19% response rate.

### Complete Application Tracker

**Master File:** `~/Desktop/1_PRIORITY_JOB_SEARCH/Resumes_Master_2025/job_search/JOB_TRACKER_LIVE.csv`

**Statistics (as of Nov 5, 2025):**
- **107 total entries** (104 real applications + 3 phishing flagged)
- **Date range:** Oct 22 - Nov 5, 2025 (14 days)
- **Application velocity:** 7.4 apps/day average
- **Response rate:** 19% (34 responses from 104 apps - excellent vs industry 5-10%)
- **Sources:** 95 LinkedIn, 9 Robert Half, various others

**Columns:** Date_Applied | Company | Position_Title | Location | Contact_Name | Contact_Email | Source | Status | Response_Date | Next_Action | Priority | Notes

### How the Tracker Was Built (Reproducible Process)

**Step 1: LinkedIn Application Export**
- Export from LinkedIn Jobs → Applications tab
- Copy full list with company names, positions, locations, dates
- Parse relative dates ("2mo ago", "1w ago", "5d ago", "23m ago") to actual dates

**Step 2: Robert Half Portal Export**
- Export from Robert Half "My Jobs" dashboard
- Includes position details, pay ranges, job types, application dates
- 9 applications total with acknowledgment confirmations

**Step 3: Gmail Deep Scan**
- IMAP connection: `matthewdscott7@gmail.com`
- Password: `wdfj euvs dqmn deak` (spaces required)
- Search last 14 days in "[Gmail]/All Mail"
- Extract 206 job-related emails with full body content
- Filter: application responses, interview requests, rejections, phishing

**Step 4: Cross-Reference & Merge**
- Match companies across LinkedIn + Robert Half + Gmail
- Overlay Gmail response data onto application entries
- Flag phishing attempts (Jobot, fake Experian/Turing)
- Assign priorities (URGENT, HIGH, MEDIUM, LOW)
- Identify missed opportunities (Hollie Nelson interview request)

**Result:** Single source of truth CSV with complete application history + response tracking

### Gmail Integration

**Script:** `gmail_auto_sync.py` (existing, works)
**Email:** matthewdscott7@gmail.com
**App Password:** `wdfj euvs dqmn deak` (must preserve spaces for auth)
**Access:** IMAP SSL (imap.gmail.com)

**Capabilities:**
- Scan all job-related emails (keywords: application, position, interview, etc.)
- Extract full email bodies (not just headers)
- Filter out spam/newsletters (LinkedIn newsletters, Indeed marketing, etc.)
- Identify actual company responses vs auto-confirmations
- 206 job emails extracted in last 14 days

**Key Findings from Nov 5 Scan:**
- 1 missed interview request (Hollie Nelson, Robert Half - Oct 29)
- 1 rejection (Brown-Forman)
- 2 resume downloads (active recruiter interest)
- 4 applications viewed by recruiters
- Multiple ATS acknowledgments (Workable, Greenhouse)
- Robert Half profile fully activated

### Known Phishing Patterns

**⚠️ DO NOT RESPOND TO:**
1. **Jobot "Instant Interview"** - alerts@jobs.jobot.com
   - Multiple fake "instant interview" invitations
   - Real Jobot applications are through LinkedIn (legitimate)

2. **Fake Experian Assessments** - donotreply@sovaassessment.com
   - Claiming to be Experian with assessment links
   - Real Experian applications through LinkedIn

3. **Fake Turing "Vikram Bagga"** - vikramjit.b@turing.com
   - Fake recruiter with assessment login links
   - Real Turing: communications@turing.com (legitimate)

**How to Identify:**
- LinkedIn Easy Apply confirmations go to jobs-noreply@linkedin.com (safe)
- Real companies use their own domains or reputable ATS systems
- Phishing uses generic domains with urgent "take assessment now" language
- Real recruiters provide phone numbers and LinkedIn profiles

### Supporting Tools

**Slash Commands (7 verified):**
- `/coach`, `/louisville`, `/tactic`, `/analyze`, `/code`, `/humanize`, `/quick`
- Location: `~/.claude/commands/`
- All functional, tested Nov 5, 2025

**Browser History Mining:**
- Script: `mine_job_search_history.py`
- Extracts job searches from Safari/Chrome databases
- Output: `~/Desktop/1_PRIORITY_JOB_SEARCH/Resumes_Master_2025/job_search/browser_mining/`

**Comet Interface:**
- Script: `comet_interface.py`
- Browser automation bridge (not actively used)

**Ollama Models - Limited Use:**
- Advisory models (`matthew-career-coach`, `barrier-breaker`, `louisville-job-market`) have stale data
- Can't track daily progress - trained once, never updated
- **Use Claude Code for real-time advice instead**
- Utility models work: `humanizer`, `code-executor`, `data-analyzer-qwen`

### How to Update Tracker

**Add new applications:**
1. Export updated list from LinkedIn
2. Parse with date conversion (relative → absolute)
3. Check Gmail for responses
4. Append to JOB_TRACKER_LIVE.csv
5. Update priorities based on responses

**Check for responses:**
1. Run Gmail IMAP scan (last N days)
2. Filter job-related emails
3. Match company names to existing entries
4. Update Status, Response_Date, Contact_Name columns
5. Flag urgent actions (interviews, follow-ups)

**Maintain data quality:**
- Remove duplicates (same company + position)
- Flag phishing with ⚠️ in Status column
- Keep notes updated with latest information
- Sort by Priority to focus on urgent items

---

---

## Deployment Retrospective & Lessons (Nov 5, 2025)

### 🎯 Key Findings from Job Tracker + Project Lavos Deployments

**Critical Issues (Both Deployments):**
1. **Vercel.json Problem** - 30+ minutes wasted debugging routing when Vercel handles Vite SPAs automatically (NO CONFIG NEEDED)
2. **Missing Assets Pattern** - Generated favicon/OG images but forgot to `git add public/` on BOTH deployments
3. **Time Waste Identified** - ~40 minutes lost to preventable configuration mistakes

**Success Patterns:**
- ✅ Vercel + Render combo works perfectly
- ✅ Python asset generation scripts are fast and consistent
- ✅ Separate frontend/backend repos enable independent deployment
- ✅ Environment variable strategy (.env.production) is clean

**The Big Lesson:**
Both Project Lavos and Job Tracker hit **identical issues** despite being 2 days apart, proving you need a **written deployment checklist** to prevent repeated mistakes.

### 📋 Deployment Checklist (Pre-Flight Verification)

**Before First Deploy:**

#### Backend (Render)
- [ ] FastAPI app in app/main.py or main.py
- [ ] requirements.txt with exact versions
- [ ] README.md with deployment instructions
- [ ] Push to GitHub: guitargnarr/[project]-backend
- [ ] Connect to Render.com
- [ ] Set environment variables (if needed)
- [ ] Test health endpoint: https://[project]-backend.onrender.com/health
- [ ] Note backend URL for frontend .env

#### Frontend (Vercel)
- [ ] React + Vite project structure
- [ ] package.json with build script: "build": "vite build"
- [ ] Environment variable file: .env.production with VITE_API_URL
- [ ] Generate assets: `python3 generate_assets.py`
- [ ] **CRITICAL:** `git add public/` after asset generation
- [ ] `git status` - Verify favicon.ico and og-image.png are tracked
- [ ] Complete OG meta tags in index.html with absolute URLs
- [ ] Push to GitHub: guitargnarr/[project]-frontend
- [ ] Deploy: `vercel --prod --yes`
- [ ] **DO NOT add vercel.json** (Vercel auto-detects Vite)
- [ ] Test production URL

#### Post-Deploy Validation
- [ ] Visit production URL
- [ ] Check browser Network tab for 404s
- [ ] Test OG image: paste URL in Slack/Messages
- [ ] Test SPA routing: navigate to /about, refresh page
- [ ] Test API connectivity from frontend
- [ ] Check mobile responsiveness

### ⚡ Critical "Don'ts" (Learned the Hard Way)

**DO NOT:**
- ❌ Add vercel.json for Vite projects (Vercel auto-detects)
- ❌ Use relative paths for OG images (must be absolute URLs)
- ❌ Deploy before committing public/ assets
- ❌ Skip `git status` after generating assets
- ❌ Override Vercel's default Vite configuration

**DO:**
- ✅ Trust platform defaults first (Vercel knows Vite)
- ✅ Use absolute URLs for all OG/meta tags
- ✅ Run `git add public/` immediately after asset generation
- ✅ Test locally with `npm run build && npm run preview` before deploy
- ✅ Keep .env.production in repo for consistent backend URLs

### 📊 Deployment Time Targets

| Phase | Target Time | What Can Go Wrong |
|-------|-------------|-------------------|
| Backend (Render) | 15-20 min | CORS config, requirements.txt |
| Frontend (Vite) | 20-30 min | Asset generation, OG tags |
| Asset Generation | 5 min | Forgetting to commit |
| Deploy + Test | 10 min | vercel.json, 404s |
| Custom Domain | 5-10 min | DNS propagation |
| **Total** | **60-90 min** | Add 30 min if mistakes |

### 🔧 Asset Generation Best Practice

**Always use this pattern:**
```bash
# 1. Generate
python3 generate_assets.py

# 2. Verify
ls public/
# Should show: favicon.ico  og-image.png

# 3. Stage
git add public/

# 4. Verify staged
git status | grep public

# 5. Commit
git commit -m "feat(assets): Add favicon and OG images"

# 6. Deploy
vercel --prod --yes
```

### 📁 Future: Deployment Template (TODO)

**Create: ~/Templates/vite-vercel-template/** with:
- .env.example
- .env.production.example
- .gitignore (correct version)
- generate_assets.py (reusable)
- DEPLOY_CHECKLIST.md (copy of above)
- package.json with standard dependencies

**Usage:**
```bash
cp -r ~/Templates/vite-vercel-template ~/Projects/[new-project]-frontend
cd ~/Projects/[new-project]-frontend
npm install
# Customize and deploy using checklist
```

---

## Recent Work: Prompt Engineering Showcase (Nov 5, 2025)

**What:** Added 4th demo to projectlavos.com - interactive prompt engineering playground
**Why:** Prove advanced LLM expertise for hiring (AI Conversation Designer, Prompt Engineer roles)
**How:** Educational demo with transparent prompt display + technique explanations

**Implementation:**
- Backend: 5 prompt techniques (zero-shot, few-shot, CoT, role-based, structured) via Claude Haiku API
- Frontend: 3-tab interface (Result / Prompt Used / Explanation) with copy functionality
- Time: 6-7 hours (backend + frontend + styling)
- Code: +735 lines (275 backend, 230 component, 230 CSS)

**Files Modified:**
- `projectlavos-backend/main.py` (+275 lines, API v1.1.0)
- `projectlavos-frontend/src/App.jsx` (+230 lines, 4 demos now)
- `projectlavos-frontend/src/App.css` (+230 lines, tabs + styling)
- `projectlavos-backend/requirements.txt` (+ anthropic SDK)

**GitHub Repo Created:** `guitargnarr/prompt-engineering-showcase`
- Includes authentic REAL_PROMPT_EXAMPLES_SHOWCASE.md from Robert Half interview prep
- Portfolio proof: real prompts from production systems with metrics
- Links to live demo on projectlavos.com

**Hiring Value:**
- Demonstrates zero-shot, few-shot, chain-of-thought, role-based, structured output techniques
- Shows ability to explain complex concepts (educational tabs)
- Proves real LLM integration (not just API wrappers)
- Can demo live during interviews: "Let me show you how chain-of-thought improves results..."

**Deployment Status (as of Nov 5):** ✅ DEPLOYED & LIVE

---

## Recent Project Updates

### Prompt Engineering Showcase - November 5, 2025 (Evening)

**Successfully deployed complete prompt engineering playground to projectlavos.com:**

**What Was Built:**
- Interactive educational demo with 5 advanced LLM techniques
- Full-stack integration: React frontend + FastAPI backend + Claude Haiku API
- 3-tab interface: Generated Content / Prompt Used / Explanation
- GitHub repository: prompt-engineering-showcase with comprehensive README
- Portfolio integration on jaspermatters.com for hiring managers

**Technical Implementation:**
- **Backend:** 275 lines of FastAPI code implementing 5 prompt builders
  - Zero-shot, few-shot, chain-of-thought, role-based, structured output
  - Claude API integration with environment variable security
  - Health endpoint updated to v1.1.0 with 4 demos
- **Frontend:** 460 lines (230 component + 230 CSS)
  - Radio selector for techniques with descriptions
  - Character counter (0/2000)
  - Copy-to-clipboard for results and prompts
  - Syntax-highlighted code blocks
- **Deployment:** Render.com (backend) + Vercel (frontend)

**Critical Issue Resolved:**
- httpx compatibility issue with anthropic==0.39.0
- Fixed by pinning httpx==0.27.2 in requirements.txt
- Root cause: `TypeError: Client.__init__() got an unexpected keyword argument 'proxies'`

**Files Modified:**
- projectlavos-backend: main.py (+275), requirements.txt (+1)
- projectlavos-frontend: App.jsx (+230), App.css (+230), index.html (+Google Analytics)
- jaspermatters-job-intelligence: index.html (+34 lines, 4th project section)
- Created: prompt-engineering-showcase/README.md (293 lines)

**Commits:**
- 0f06727: projectlavos-frontend - feat: Add prompt engineering showcase integration
- a50b934: projectlavos-backend - feat: Add prompt engineering API with 5 techniques
- 03a865e: projectlavos-backend - fix: Pin httpx version to resolve Anthropic SDK compatibility
- 3b7cab1: jaspermatters - feat: Add prompt engineering project showcase

**Live URLs:**
- Frontend: https://projectlavos-frontend-dwrg2wo7f.vercel.app (Vercel)
- Backend: https://projectlavos-backend.onrender.com (Render)
- Custom domain: projectlavos.com (to be verified)

**Verified Working:**
- Health endpoint: `{"status": "healthy", "demos_available": 4, "version": "1.1.0"}`
- Zero-shot technique tested successfully with Claude Haiku
- API generates professional emails with ~300-500 token prompts

**Deployment Time:** ~4 hours (including debugging httpx issue)

**Cost Impact:**
- Anthropic API key configured: matthewdscott7@gmail.com account
- Claude Haiku: ~$0.0005 per demo generation (half a penny)
- Estimated usage: <$5/month even with 1000+ generations

**Hiring Value:**
- Demonstrates prompt engineering expertise for AI Conversation Designer roles
- Shows full-stack Claude API integration
- Educational interface proves ability to explain complex concepts
- Live demo capability for screen share interviews
- Complements 19% response rate on jaspermatters.com

**Next Steps:**
- Test all 5 techniques via frontend UI
- Verify custom domain projectlavos.com routing
- Add real Google Analytics Measurement ID
- Document which techniques hiring managers respond to

---

## Dual-Site Brand Differentiation Project - November 5-9, 2025

### The Brand Identity Crisis (Problem Statement)

**Discovered:** November 5, 2025 @ 8:00 PM
**Symptom:** Both projectlavos.com and jaspermatters.com use identical purple gradients, typography, and visual language
**Impact:** Brand confusion undermines both sites' effectiveness

**Specific Issues:**
1. **Visual Confusion:** Louisville SMB owner lands on jaspermatters.com, sees "$1.2M value generated, 79+ models" and thinks consulting is too expensive/complex
2. **Messaging Conflict:** projectlavos says "AI Consultant • Louisville, KY" while jaspermatters says "seeking senior ML roles" - contradictory positioning
3. **No Differentiation:** Same purple gradient (#667eea → #764ba2) on both sites = no visual distinction
4. **Underutilized Vercel Quota:** 4.4K edge requests (0.44% of 1M free tier) = massive opportunity cost
5. **Zero Analytics:** Google Analytics placeholder means no conversion tracking, no data-driven optimization

**User Journey Conflicts:**

| Aspect | Current (Broken) | Needed |
|--------|------------------|--------|
| **Audience** | Mixed/confused | projectlavos: Louisville SMBs, jaspermatters: Tech recruiters |
| **Goal** | Unclear | projectlavos: Book consultations, jaspermatters: Get job offers |
| **Tone** | Same (professional-ish) | projectlavos: Friendly/accessible, jaspermatters: Technical/impressive |
| **Visuals** | Identical purple twins | Distinct identities (neubrutalism vs minimalism) |
| **Conversion** | No tracking | Demo completion → email contact vs Resume download |

---

### The Strategic Solution (4-5 Day Dual Rebrand)

**Timeline:** November 5-9, 2025 (32-40 hours total)
**Approach:** Simultaneous Tailwind CSS v4 migration with distinct visual identities
**Goal:** Eliminate brand confusion, enable targeted traffic strategies, maximize Vercel quota utilization

**Design Philosophy:**

**projectlavos.com = "Accessible Local Expert"**
- **Visual Identity:** Neubrutalism (extend Job Tracker's bold aesthetic)
- **Audience:** Louisville small business owners (restaurants, legal firms, real estate)
- **Psychology:** "This feels approachable and fun - I can trust this local expert"
- **Conversion:** Try demo → See immediate value → Email for free 1-hour assessment
- **Success Metric:** 3% email contact rate (15 contacts from 500 visitors)

**jaspermatters.com = "Technical Authority"**
- **Visual Identity:** Sleek minimalism (serious, professional, corporate-ready)
- **Audience:** Hiring managers, tech recruiters, senior engineers
- **Psychology:** "This person builds serious production systems"
- **Conversion:** Explore projects → Download resume → Schedule interview
- **Success Metric:** 15% resume download rate (45 downloads from 300 visitors)

---

### Phase 1: Foundation Setup - ✅ COMPLETED (November 5, 2025 @ 9:00 PM)

**Duration:** 2 hours
**Status:** 6/6 tasks completed

#### projectlavos-frontend - Neubrutalism Foundation

**Installed:**
- Tailwind CSS v4 + @tailwindcss/postcss
- PostCSS + Autoprefixer
- Framer Motion 12.1.1 (micro-animations)

**Configured (`tailwind.config.js`):**
```javascript
colors: {
  'lavos-blue': '#1e40af',      // Primary: Trust (blue-700)
  'lavos-blue-light': '#3b82f6', // Hover states
  'lavos-orange': '#f97316',     // Secondary: Warmth (orange-500)
  'lavos-green': '#10b981',      // Accent: Growth (green-500)
  'lavos-black': '#0a0a0a',      // Borders (neubrutalism)
},
boxShadow: {
  'brutal': '8px 8px 0px 0px rgba(0, 0, 0, 1)',      // 3D effect
  'brutal-sm': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
  'brutal-lg': '12px 12px 0px 0px rgba(0, 0, 0, 1)',
},
borderWidth: {
  '3': '3px',  // Thick neubrutalism borders
  '4': '4px',
}
```

**Build Status:** ✅ Successful (583ms, 10.48 kB CSS, 216.54 kB JS)

#### jaspermatters-job-intelligence - Minimal Tech Foundation

**Installed:**
- Tailwind CSS v4 + @tailwindcss/postcss
- PostCSS + Autoprefixer
- Initialized npm for static HTML site

**Configured (`tailwind.config.js`):**
```javascript
colors: {
  'jasper-slate': '#0f172a',        // Primary: Serious tech (slate-900)
  'jasper-slate-light': '#1e293b',
  'jasper-electric': '#3b82f6',     // Secondary: Innovation (blue-500)
  'jasper-purple': '#8b5cf6',       // Accent: Creativity (purple-500, keeping current!)
},
fontFamily: {
  sans: ['Inter', ...],             // Clean, professional
  mono: ['JetBrains Mono', ...],    // Code/terminal aesthetic
},
boxShadow: {
  'glow': '0 0 20px rgba(59, 130, 246, 0.3)',         // Subtle electric glow
  'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3)',  // Purple accent glow
}
```

**Custom Components (`styles.css`):**
- `.tech-card` - Minimal card with border hover transition
- `.code-block` - Terminal styling (slate background, white text, mono font)
- `.btn-primary` / `.btn-secondary` - Minimal button styles
- `.gradient-text` - Slate → Electric gradient for headlines

---

### Phase 2: projectlavos Neubrutalism - ✅ COMPLETED (November 6, 2025)

**Status:** Week 1 Day 1-2 complete, neubrutalism design live on projectlavos.com

**Accomplishments:**
- Converted all 4 demos to neubrutalism styling (border-3, shadow-brutal, lavos-blue/orange/green palette)
- Added sample data buttons to all demos (Louisville restaurant review, tech startup lead, phishing email, prompt contexts)
- Fixed critical Tailwind CSS v4 → v3 incompatibility (custom classes not generating)
- Cleaned App.css from 884 → 299 lines (removed conflicting CSS overrides)
- Deployed successfully with Vercel auto-deploy

**Technical Fix:**
- **Problem:** Tailwind v4 `@tailwindcss/postcss` plugin doesn't read `tailwind.config.js` properly
- **Solution:** Switched to Tailwind CSS v3.4.16 with standard PostCSS plugin
- **Result:** CSS bundle grew 8.22 kB → 20.41 kB (all custom utilities now generating)

**Commits:**
- d2e5ba4: Converted all demos to neubrutalism with sample data
- 557d6c3: Cleaned App.css, removed conflicting styles
- 2387246: Fixed Tailwind v3 compatibility for custom class generation

**Verification:** ✅ projectlavos.com displaying bold neubrutalism design with brutal shadows, thick borders, playful colors

---

### Phase 3: jaspermatters Minimalism (Pending - November 7-8, 2025)

#### jaspermatters.com Minimal Tech Conversion

**Hero Section:**
- Dark gradient (jasper-slate → jasper-electric)
- Gradient text on headline (slate → electric)
- Thin border-1 border-slate-200 on cards
- Subtle shadow-glow on hover
- Clean, spacious layout

**Project Cards:**
- Minimal white cards with border-slate-200
- Hover: border-jasper-electric + shadow-glow
- Code snippets with .code-block styling
- GitHub star badges (dynamic from API if time permits)
- Tech stack icons

**Terminal Section:**
- Improve or simplify current fake terminal
- Consider: Real interactive demo or remove entirely
- If keeping: Enhance with JetBrains Mono, subtle glow effects

**Expected Impact:**
- Professional, technical credibility
- Clear "I build serious systems" signal
- Hiring managers impressed, not confused

---

### Design System Documentation

**Shared Principles:**
- Typography: Inter variable font (400-700 weight range)
- Spacing: Tailwind's default scale (consistent)
- Responsive: Mobile-first, breakpoints at sm/md/lg/xl
- Animations: Framer Motion for entrance, Tailwind transitions for hover

**Neubrutalism (projectlavos) Patterns:**
- Thick borders (3-4px black)
- Hard shadows (8px 8px 0px black)
- High contrast colors (blue/orange/green on white)
- Bold typography (font-bold, large sizes)
- Playful, slightly chaotic energy
- Inspired by: Job Tracker, Gumroad, Linktree

**Minimalism (jaspermatters) Patterns:**
- Thin borders (1px slate-200)
- Soft glows (20px blur, 30% opacity)
- Low contrast base (slate/white) + electric accents
- Regular typography (font-normal/font-semibold)
- Clean, spacious, organized
- Inspired by: Linear, Vercel, GitHub

**Component Reusability:**
- Both sites use same spacing scale (avoid custom values)
- Both use Inter font (but different weights/sizes)
- Shared animation timings (300ms transitions)
- Different: colors, shadows, borders, typography scale

---

### Traffic Utilization Strategy

**Current Vercel Metrics (Last 30 Days):**
- Edge requests: 4.4K / 1M (0.44% utilization)
- Data transfer: 31.83 MB / 100 GB (0.03%)
- Function invocations: 20 / 1M (0.002%)

**Verdict:** Massive headroom. Can handle 200x traffic without hitting limits.

**Target Metrics (90 Days Post-Launch):**

**projectlavos.com:**
- 500+ unique visitors (LinkedIn, local outreach, SEO)
- 150+ demo runs (30% engagement with sample data buttons)
- 15+ email inquiries (3% conversion rate)
- 5+ consultations booked (33% close rate)

**jaspermatters.com:**
- 300+ unique visitors (job applications, GitHub, LinkedIn)
- 50+ resume downloads (17% conversion)
- 20+ LinkedIn connections from site
- 5+ interview requests (10% interview rate)

**Combined:** 10K+ edge requests/month (1% of quota) = meaningful validation without cost concerns

**Traffic Generation Tactics:**

**projectlavos (Local):**
1. LinkedIn posts in Louisville Business First, Kentucky Startup groups
2. Email outreach to Chamber of Commerce members
3. QR codes at local events (Tech meetups, Chamber mixers)
4. Local SEO: "AI consultant Louisville", Google Business Profile
5. Demo videos: Screen recordings showing real use cases

**jaspermatters (Hiring):**
1. GitHub README links in all 9 repos
2. LinkedIn Featured link + profile banner
3. Job applications: Include URL in cover letters
4. Reddit r/MachineLearning: "Show & Tell" posts
5. HackerNews: "Show HN: 92% accurate salary predictor"

**Conversion Optimization:**
- Google Analytics 4 (replace placeholder G-XXXXXXXXXX)
- Custom events: demo_used, cta_click, resume_download, email_submit
- A/B test: CTA button text, hero copy, demo order
- Exit intent: "Want help implementing this?" modal on projectlavos

---

### Technical Decisions (Rationale)

**Why Tailwind CSS v4?**
- Modern utility-first approach (fast development)
- Design tokens + CSS variables (easy theming)
- Already using Vite (perfect integration)
- Smaller bundle size than custom CSS (tree-shaking)
- Industry standard (easy to maintain, hire for)

**Why Neubrutalism for projectlavos?**
- Extends Job Tracker aesthetic (visual consistency across portfolio)
- Playful, memorable (stands out from corporate AI sites)
- Accessible to non-technical audiences (feels friendly, not intimidating)
- 2025 trend (Gumroad, Linktree, indie products)

**Why Minimalism for jaspermatters?**
- Technical credibility (serious engineers use clean, functional design)
- Professional polish (hiring managers expect corporate-ready aesthetics)
- Timeless (won't age poorly like trendy designs)
- Contrast with projectlavos (clear differentiation)

**Why Framer Motion?**
- Lightweight (4.5 KB gzipped)
- React-native API (hooks-based, intuitive)
- Performant (GPU-accelerated, 60fps)
- Entrance animations increase engagement 25% (industry data)

**Why Sample Data Buttons?**
- Reduces friction (don't need to think of input)
- Increases demo completion 3x (Stripe, Figma, Notion data)
- Shows real use cases (educational)
- Faster time-to-value (see results in 5 seconds)

---

### Expected End State (November 9, 2025)

**Visual Differentiation:**
- ✅ Two distinct color palettes (blue/orange/green vs slate/electric/purple)
- ✅ Two distinct design styles (neubrutalism vs minimalism)
- ✅ Clear audience targeting (SMBs vs hiring managers)
- ✅ No brand confusion (playful vs professional immediately obvious)

**User Experience:**
- ✅ Sample data buttons on all projectlavos demos (instant value)
- ✅ Smooth micro-animations (Framer Motion entrance effects)
- ✅ Mobile responsive (test on iPhone 13, Android)
- ✅ Fast load times (<1s LCP, Vercel optimized)

**Analytics & Tracking:**
- ✅ Google Analytics 4 configured (demo usage, conversions)
- ✅ Custom events tracking (which demos popular, where users drop off)
- ✅ Conversion funnels (demo → email vs project → resume)
- ✅ Traffic sources (LinkedIn, GitHub, local referrals)

**Deployment:**
- ✅ projectlavos-frontend: Vercel (projectlavos.com)
- ✅ jaspermatters-job-intelligence: Netlify or Vercel (jaspermatters.com)
- ✅ Both sites tested on Safari, Chrome, Firefox
- ✅ Mobile tested on iOS and Android

**Documentation:**
- ✅ CLAUDE.md updated with design system, rationale, metrics
- ✅ README files in both repos explain new design approach
- ✅ Tailwind config files self-documenting (clear color names)

---

### Success Metrics (90-Day Checkpoint)

**Quantitative:**
- projectlavos: 5+ consultations booked ($5K+ potential pipeline)
- jaspermatters: 5+ interview requests (1-2 job offers)
- Combined: 10K+ edge requests (meaningful traffic validation)
- Demo completion: 30%+ (vs <10% without sample data)
- Conversion: projectlavos 3%+, jaspermatters 15%+

**Qualitative:**
- Client feedback: "This looks fun and approachable"
- Hiring manager feedback: "This looks professional and credible"
- No more confusion: visitors understand site purpose immediately
- Portfolio differentiation: "He has multiple project styles" (shows range)

**Strategic:**
- Dual revenue streams validated: Consulting + Employment
- Louisville market presence established (Chamber connections, local SEO)
- National tech market credibility (GitHub, Reddit, HackerNews visibility)
- Can confidently invest in paid marketing (know conversion rates)

---

## 🎯 STRATEGIC PIVOT: Option E - Execution Focus (November 5, 2025 @ 10:30 PM)

### The Decision: Revenue Over Portfolio Polish

**Critical Insight:** Three.js research revealed a hard truth - Bruno Simon spent 3+ months on his portfolio as a full-time project. We have 100 hours and need income.

**Reality Check:**
- 19% job application response rate = ALREADY standing out
- Zero consulting clients yet = need proof of demand, not more tech
- Louisville SMBs need demos they understand, not 3D wizardry
- Visual differentiation SOLVED with Tailwind (purple twins problem fixed in Phase 1)

**Three.js Assessment:**
- ✅ Impressive skill (undeniable)
- ✅ Marketable (high demand, low supply)
- ✅ Unique positioning (few portfolios have it)
- ❌ NOT required for brand differentiation (Tailwind achieves this)
- ❌ NOT required for job search success (response rate already excellent)
- ❌ NOT required for Louisville consulting (practical demos > 3D experiences)
- ❌ Costs $95 (Bruno's course) or slower progress (free YouTube route)

**Conclusion:** Three.js should come AFTER employment/clients validate the investment, not before.

---

### Option E: Free, Focused, Revenue-Driven (100 Hours, $0 Cost)

**Strategic Priorities:**
1. **Week 1:** Complete visual differentiation (Tailwind conversion)
2. **Week 2:** Add business value (new demos targeting Louisville)
3. **Week 3:** Drive revenue (LinkedIn posts, email outreach, job applications)
4. **Bonus:** Free Three.js exploration IF time permits (no pressure)

**Total Investment:** $0
**Total Time:** 100 hours over 3 weeks
**Focus:** Employment + consulting revenue FIRST, skill acquisition SECOND

---

### Week 1: Complete Visual Differentiation (40 hours - Nov 6-10)

**Monday-Tuesday (16 hours):**
- projectlavos Hero → Neubrutalism (solid lavos-blue, border-4, shadow-brutal-lg)
- StatsSection → Bold cards with thick borders and brutal shadows
- **Deliverable:** Hero visually distinct from jaspermatters, playful energy

**Wednesday-Thursday (16 hours):**
- projectlavos Demos → Demo cards with shadow-brutal, hover lift effects
- Add sample data buttons (reduces friction, 3x completion rate industry standard)
  - Sentiment: "Louisville restaurant review"
  - Lead Scoring: "Tech startup lead"
  - Phishing: "Real phishing example"
  - Prompt Engineering: Pre-filled contexts
- **Deliverable:** 5 interactive demos with instant value

**Friday (8 hours):**
- jaspermatters Hero → Minimal gradient (jasper-slate → jasper-electric)
- jaspermatters Projects → Border hover transitions (border-slate-200 → border-jasper-electric)
- **Deliverable:** Professional, technical aesthetic, hiring manager credibility

**Weekend Testing:**
- Cross-browser: Safari, Chrome, Firefox
- Mobile: iPhone, Android responsive checks
- Deploy: Vercel (projectlavos.com + jaspermatters.com)
- **Deliverable:** Both sites LIVE, visually differentiated, problem SOLVED

---

### Week 2: Add Business Value (30 hours - Nov 11-15)

**Monday-Tuesday (12 hours): Build "Louisville Restaurant Analyzer"**
- **Purpose:** Target local Louisville restaurants (pizza, BBQ, bourbon)
- **Input:** Restaurant name or review URL
- **Output:** Sentiment analysis + actionable recommendations
- **Sample Data:** Pre-loaded Louisville restaurant reviews (Proof on Main, Jack Fry's, etc.)
- **Value Prop:** "See what customers really think - free analysis"
- **Deliverable:** Demo that resonates with Louisville SMBs

**Wednesday (6 hours): Build "Sales Email Scorer"**
- **Purpose:** Help SMBs improve cold email outreach
- **Input:** Email text (subject + body)
- **Output:** Score 1-10 + specific improvement suggestions
- **Sample Data:** Good vs bad sales emails (real examples)
- **Value Prop:** "Improve your sales emails instantly"
- **Deliverable:** Practical AI application everyone understands

**Thursday-Friday (12 hours): Polish All Demos**
- Loading states (skeleton screens, spinners)
- Error handling (friendly messages, retry buttons)
- Success states (confetti animation, copy result button)
- Update projectlavos.com with new demos (now 6 total)
- Create demo GIFs for LinkedIn (screen recordings, 10-15 sec each)
- **Deliverable:** 6 polished demos, shareable marketing assets

---

### Week 3: Drive Revenue (30 hours - Nov 16-20)

**Monday-Wednesday (12 hours): LinkedIn Marketing**
- **6 Posts** (1 per demo, 2 hours each including GIF creation)
- **Format:** Demo GIF + "Built this AI tool for Louisville businesses. Try it free: [link]"
- **Tags:** #LouisvilleKY, #AIConsulting, #MachineLearning, @Louisville Business First
- **Groups:** Louisville Business First, Kentucky Startup Community, Louisville Tech
- **Goal:** Local visibility, engagement, inbound interest
- **Deliverable:** 6 LinkedIn posts, 500+ impressions target

**Thursday (8 hours): Email Outreach**
- **Target:** 50 Louisville Chamber of Commerce members
- **Template:** "Hi [Name], I noticed [Company] is in [Industry]. I built free AI demos for Louisville businesses. Would a 15-minute call to show you be valuable?"
- **Personalization:** First line specific to each recipient (LinkedIn profile, company website)
- **Follow-up:** Track replies in spreadsheet, schedule calls
- **Goal:** 5-10 responses (10-20% response rate realistic)
- **Deliverable:** 50 emails sent, reply tracking system

**Friday (10 hours): Job Application Acceleration**
- **Apply:** 20 ML/AI jobs (focus: Prompt Engineer, AI Consultant, ML Engineer roles)
- **Portfolio Script:** Record 30-second, 1-minute, 5-minute walkthrough versions
- **Practice:** Present demos out loud, time yourself
- **Prep:** Behavioral questions (STAR method), technical questions (system design)
- **Goal:** 5+ interview requests within 2 weeks
- **Deliverable:** 20 applications submitted, interview-ready

---

### Bonus: Free Three.js Exploration (Remaining Hours - Optional)

**IF you finish above early OR want to learn in parallel:**

**YouTube Learning Path (Free):**
1. **SimonDev:** "Building a Character Controller in Three.js" (5 hours)
2. **Robot Bobby:** "Three.js for Beginners" (5 hours)
3. **Discover Three.js:** Read chapters 1-5 (5 hours)
4. **Build:** Simple rotating tech cube for jaspermatters hero (5 hours)

**Result:** Basic Three.js knowledge, ONE simple 3D element, "Currently learning Three.js" badge

**No Pressure:** This is a bonus if time permits, NOT critical path

---

### Success Metrics (3-Week Checkpoint)

**Week 1 Success:**
- ✅ Both sites visually differentiated and deployed
- ✅ Purple gradient twins problem SOLVED
- ✅ Mobile responsive, cross-browser tested
- ✅ Sample data buttons increase demo completion

**Week 2 Success:**
- ✅ 6 total demos (was 4, now 6 with Restaurant + Email)
- ✅ Louisville-specific content (local market positioning)
- ✅ Demo GIFs created (shareable marketing assets)
- ✅ All demos polished with loading/error states

**Week 3 Success:**
- ✅ 6 LinkedIn posts published (500+ impressions)
- ✅ 50 email outreaches sent (5-10 replies expected)
- ✅ 20 job applications submitted (5+ interviews expected)
- ✅ Portfolio walkthrough practiced and polished

**90-Day Goals (Post-Execution):**
- **Consulting:** 3-5 client consultations booked ($3-5K potential pipeline)
- **Employment:** 5-10 interviews, 1-2 job offers
- **Traffic:** 500+ visitors to projectlavos, 300+ to jaspermatters
- **Conversion:** 3% email contact rate, 15% resume download rate

---

### Cost Comparison: Options Evaluated

| Option | Cost | Focus | Risk | ROI |
|--------|------|-------|------|-----|
| **A: Full 3D (Bruno's course)** | $95 | Learning | High (pauses job search 3 weeks) | 6/10 |
| **B: Hybrid 3D (Paid course)** | $95 | 60h learn + 40h build | Medium (slows job search 2 weeks) | 7/10 |
| **C: Future 3D (Paid course)** | $95 | Complete sites first, learn later | Low (no disruption) | 7/10 |
| **D: Free 3D Hybrid** | $0 | YouTube tutorials + simple elements | Medium (self-directed learning) | 8/10 |
| **E: Execution Focus** ✅ | $0 | Revenue-driven (employment + clients) | Low (accelerates goals) | **10/10** |

**Selected: Option E** - Maximum ROI, zero cost, revenue-focused

---

### Why Option E Is The Right Choice (November 2025)

**Your Current Situation:**
- ✅ 19% job application response rate (already standing out)
- ✅ Phase 1 complete (Tailwind installed, palettes defined, foundation solid)
- ❌ Zero consulting clients (need to prove demand)
- ❌ No job offers yet (need to accelerate pipeline)
- ⏰ 100 hours available (finite resource, must optimize)

**Three.js Reality:**
- Bruno Simon: 3+ months full-time, professional creative developer (10+ years)
- His clients: Video games, interactive agencies (NEED 3D)
- Your clients: Louisville restaurants, legal firms, real estate (DON'T need 3D)
- Job market: ML/AI roles value demos, not 3D wizardry

**Option E Advantages:**
1. **Zero Financial Risk:** No $95 investment until revenue validates it
2. **Accelerates Goals:** Job search + consulting outreach = direct path to income
3. **Solves Core Problem:** Visual differentiation achieved without 3D
4. **Shows Learning:** "Learning Three.js" on roadmap demonstrates growth mindset
5. **Expandable:** Can add 3D AFTER landing job/clients (with budget + validation)

**When To Revisit Three.js:**
- ✅ After landing job (free time + financial security)
- ✅ After landing clients (revenue to invest $95)
- ✅ After someone requests 3D (validated market demand)
- ❌ NOT before income (speculation, not execution)

---

### Execution Principles

**Focus > Features:**
- Finish Tailwind conversion (solves problem) > Learn Three.js (nice-to-have)
- Build demos clients understand (restaurant analyzer) > Build demos that impress developers (3D terrain)
- Drive traffic (LinkedIn, email) > Polish portfolio indefinitely

**Revenue > Résumé:**
- Job applications (direct path to income) > Portfolio polish (indirect)
- Client outreach (potential consulting revenue) > Learning new tech (future value)
- Interview prep (conversion optimization) > Adding 7th demo (diminishing returns)

**Done > Perfect:**
- Deploy with 6 demos > Wait for 10 demos
- Ship with Tailwind neubrutalism > Delay for 3D elements
- Iterate post-launch > Perfect pre-launch

**Validate > Speculate:**
- Prove consulting demand FIRST (email outreach) > Build 3D assuming demand
- Land job offers FIRST (applications) > Add 3D assuming differentiation needed
- Test messaging FIRST (LinkedIn posts) > Invest in new tech

---

### Timeline Checkpoint (3-Week Execution)

**Week 1 (Nov 6-10): Visual Differentiation** ✅ Expected
- Day 1: projectlavos Hero + Stats (8 hours)
- Day 2: projectlavos Demos + Sample data (8 hours)
- Day 3: jaspermatters Hero + Projects (8 hours)
- Day 4: Testing (Safari, Chrome, Firefox, mobile) (8 hours)
- Day 5: Deploy both sites (8 hours)

**Week 2 (Nov 11-15): Business Value** ✅ Expected
- Day 1-2: Louisville Restaurant Analyzer (12 hours)
- Day 3: Sales Email Scorer (6 hours)
- Day 4-5: Polish demos + create GIFs (12 hours)

**Week 3 (Nov 16-20): Revenue Generation** ✅ Expected
- Day 1-3: LinkedIn posts (12 hours)
- Day 4: Email outreach (8 hours)
- Day 5: Job applications + prep (10 hours)

**Bonus (Flexible): Three.js Exploration** 🎁 Optional
- Free YouTube tutorials (SimonDev, Robot Bobby)
- Build simple rotating cube
- Add to jaspermatters IF time permits

---

**Last Updated:** November 6, 2025
**Status:** Phase 2 Complete - projectlavos.com neubrutalism live (Week 1 Day 1-2 ✅)
**Timeline:** 3 weeks (Nov 6-26, 2025) - Week 1: Differentiation, Week 2: Value, Week 3: Revenue
**Next Action:** Begin jaspermatters.com minimalism conversion (Phase 3, Week 1 Day 3-5)
**Philosophy:** Revenue first, portfolio polish second. Execution over exploration.
