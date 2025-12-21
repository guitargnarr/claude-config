# Deployment Inventory

**Last Updated:** 2025-12-18 (Full Audit Complete)
**Total Assets:** 224+ (57 code projects, 14 deployed URLs, 51 Ollama models)
**Single Source of Truth:** Update this file, then sync to unified-task-prompt.md and CLAUDE.md
**Audit Status:** ALL 13 FRONTEND SITES + 3 BACKEND APIs PASS

---

## Key Metrics

| Metric | Value |
|--------|-------|
| Code Projects | 56 |
| With GitHub Repo | 29 (52%) |
| With Visual Assets | 28 (50%) - 654 files |
| Deployed URLs | 14 (was 16, cleaned 6 orphans) |
| Vercel Projects | 20 (was 26, deleted 6) |
| Slash Commands | 25 |
| Agents | 7 |
| Scripts | 22 |
| Reference Docs | 35 |
| Ollama Models | 51 (38 custom) |

---

## Deployed Projects (14 - All HTTP 200, Audit Dec 18)

### Vercel + Render (Production)
| Project | URL | Local Path | GitHub | Platform |
|---------|-----|------------|--------|----------|
| projectlavos-monorepo | projectlavos.com | ~/Projects/projectlavos-monorepo | guitargnarr/projectlavos-monorepo | Vercel |
| ai-talent-optimizer | jobs.projectlavos.com | ~/Projects/ai-talent-optimizer | guitargnarr/ai-talent-optimizer | Vercel + Render |
| guitar-model-lab | guitar-model-lab.onrender.com | ~/Projects/guitar-model-lab | guitargnarr/guitar-model-lab | Render |
| projectlavos-backend | projectlavos-backend.onrender.com | ~/Projects/projectlavos-backend | guitargnarr/projectlavos-backend | Render |
| mirador-api | mirador-xva2.onrender.com | ~/Projects/Security-Tools/mirador-test | guitargnarr/mirador | Render |
| mirador-landing | mirador-o2wgw9o65-matthew-scotts-projects-1dc9743e.vercel.app | ~/Projects/projectlavos-monorepo/services/mirador | guitargnarr/projectlavos-monorepo | Vercel |
| mirador-enterprise | mirador-enterprise-p6snyl8xd-matthew-scotts-projects-1dc9743e.vercel.app | ~/Projects/projectlavos-monorepo/services/mirador-enterprise | guitargnarr/projectlavos-monorepo | Vercel |
| phishguard-ui | phishguard-ui.vercel.app | ~/Projects/phishguard-ui | guitargnarr/phishguard-ui | Vercel |
| interactive-resume | interactive-resume-ten-pi.vercel.app | ~/Projects/interactive-resume | guitargnarr/interactive-resume | Vercel |
| jobtrack | jobtrack-two.vercel.app | ~/Projects/jobtrack | guitargnarr/jobtrack | Vercel |
| OurJourney | ourjourney-app.vercel.app | ~/Projects/Personal/personal-journey | guitargnarr/OurJourney | Vercel |
| jaspermatters | jaspermatters-job-intelligence.vercel.app | ~/Projects/Career-Business/jaspermatters-job-intelligence | guitargnarr/jaspermatters-job-intelligence | Vercel |
| ba-pathfinder | ba-pathfinder.vercel.app | ~/Desktop/2_AI_PROJECTS_PORTFOLIO/ba-pathfinder | guitargnarr/ba-pathfinder | Vercel |
| 2025-skills-to-know | 2025-skills-to-know.vercel.app | ~/Desktop/Manus/2025-skills-to-know | NO-GIT | Vercel |
| phishguard-ml | (deployable) | ~/Projects/phishguard-ml | guitargnarr/phishguard-ml | - |
| apartment-demo | frontend-mu-dusky-38.vercel.app | ~/Projects/Portfolio/apartment-leasing-demo | guitargnarr/apartment-leasing-demo | Vercel |

### Custom Domains (6)
| Domain | Points To | Purpose |
|--------|-----------|---------|
| projectlavos.com | main-site (Vercel) | Portfolio hub |
| guitar.projectlavos.com | guitar service | Guitar learning |
| jobs.projectlavos.com | ai-talent-optimizer | Job discovery |
| demos.projectlavos.com | demos service | AI demos |
| about.projectlavos.com | about service | About page |
| www.projectlavos.com | Redirect | → projectlavos.com |

---

## Render Services (3 Active - Audit Dec 18)

| Service | URL | Status | Endpoints Tested |
|---------|-----|--------|------------------|
| projectlavos-backend | projectlavos-backend.onrender.com | LIVE | /api/sentiment, /api/phishing |
| guitar-model-lab | guitar-model-lab.onrender.com | LIVE | /scales (12), /health, /generate-gp5 |
| ai-talent-optimizer | ai-talent-optimizer.onrender.com | LIVE (v3.1.0) | /stats (1,222 jobs), /jobs/tier1 (21 high-value) |
| jaspermatters-api | - | SUSPENDED | - |
| jobtracker-backend | - | SUSPENDED | - |

---

## Railway Projects (2 Active - Cleaned Dec 18)

| Project | Purpose | Status |
|---------|---------|--------|
| humble-perception | Postgres database | ACTIVE |
| poetic-optimism | Expert Sourcing demo | LIVE |

---

## Active Development (9 Projects)

| Directory | Type | GitHub | Visual Assets | Description |
|-----------|------|--------|---------------|-------------|
| ~/Projects/texume | Python | guitargnarr/texume | - | Resume LaTeX generator (9 scripts) |
| ~/Projects/reflexia-model-manager | Python | guitargnarr/reflexia | 17 | Ollama model manager CLI |
| ~/Projects/Security-Tools/mirador-test | Python | guitargnarr/mirador | 43 | Mirador Self-Governing AI (API: mirador-xva2.onrender.com, Landing: Vercel) |
| ~/Projects/phishguard-intel | Python | guitargnarr/phishguard-intel (PRIVATE) | - | OSINT infrastructure mapper for scam attribution |
| ~/Projects/claude-zones | Node.js | guitargnarr/claude-context-zones | - | Claude context zones |
| ~/Projects/job-search-automation | Python | guitargnarr/job-search-automation | - | Job automation tools |
| ~/Projects/fretforge-v1 | Node.js | LOCAL-ONLY | 116 | Guitar platform v1 |
| ~/Projects/tool-gmail-integration | Python | LOCAL-ONLY | - | Gmail automation |
| ~/Projects/mcp-vercel | Node.js | nganiet/mcp-vercel | - | MCP Vercel integration |

---

## Local Tools (8 Projects - No Git)

| Directory | Type | Description |
|-----------|------|-------------|
| ~/Projects/coparenting-cli | Python | Coparenting CLI tool |
| ~/Projects/gmail-automation-system | Python | Gmail automation |
| ~/Projects/job-hunter-pro | Python | Job search tool |
| ~/Projects/merry-go-round-monitor | Python | Monitor utility |
| ~/Projects/generated-services | Python | Auto-generated services |
| ~/Projects/prompt-factory | Python | Prompt templates |
| ~/Projects/DevelopmentTools/Guitar Technique Portfolio | Node.js | Guitar portfolio |
| ~/Projects/WebTools/Link Validator | Python | Link validation CLI |

---

## Manus Code Projects (6)

| Directory | Type | Description |
|-----------|------|-------------|
| ~/Desktop/Manus/fret-vision | Node.js | Guitar fretboard visualizer |
| ~/Desktop/Manus/mirador-one-of-many | Python | Mirador variant (65+ models) |
| ~/Desktop/Manus/prompt-fact | Python | Streamlit prompt generator |
| ~/Desktop/Manus/enter-the-unknown-of-inheritance | Python | 44-file comprehensive app |
| ~/Desktop/Manus/guitair | Python | Guitar AI |
| ~/Desktop/Manus/p5-sketch-animation | JS | p5.js animations |

---

## Top Visual Asset Projects

| Rank | Project | Assets | Types |
|------|---------|--------|-------|
| 1 | fretforge-v1 | 116 | png |
| 2 | personal-journey | 90 | png |
| 3 | projectlavos-monorepo | 70 | png, svg |
| 4 | personal-journey-flow | 57 | png, svg |
| 5 | mirador-test | 43 | png, svg |
| 6 | portfolio-website | 33 | png |
| 7 | music-fretforge | 21 | png |
| 8 | reflexia-model-manager | 17 | png, svg, jpg |
| 9 | interactive-resume | 15 | png, svg |

---

## GitHub Repos (29 with Remotes)

### With Deployments (17)
| GitHub Repo | Deployment | Local Path |
|-------------|------------|------------|
| projectlavos-monorepo | projectlavos.com + subdomains | ~/Projects/projectlavos-monorepo |
| ai-talent-optimizer | jobs.projectlavos.com | ~/Projects/ai-talent-optimizer |
| guitar-model-lab | guitar-model-lab.onrender.com | ~/Projects/guitar-model-lab |
| phishguard-ui | phishguard-ui.vercel.app | ~/Projects/phishguard-ui |
| interactive-resume | interactive-resume-ten-pi.vercel.app | ~/Projects/interactive-resume |
| jobtrack | jobtrack-two.vercel.app | ~/Projects/jobtrack |
| OurJourney | ourjourney-app.vercel.app | ~/Projects/Personal/personal-journey |
| jaspermatters-job-intelligence | jaspermatters-job-intelligence.vercel.app | ~/Projects/Career-Business/jaspermatters-job-intelligence |
| mirador-consciousness-platform | vercel-demo-flame.vercel.app | ~/Projects/mirador-consciousness-platform |
| ba-pathfinder | ba-pathfinder.vercel.app | ~/Desktop/2_AI_PROJECTS_PORTFOLIO/ba-pathfinder |
| apartment-leasing-demo | frontend-mu-dusky-38.vercel.app | ~/Projects/Portfolio/apartment-leasing-demo |

### Without Deployments (12)
| GitHub Repo | Platform | Local Path |
|-------------|----------|------------|
| projectlavos-backend | Render | ~/Projects/projectlavos-backend |
| reflexia | CLI | ~/Projects/reflexia-model-manager |
| texume | CLI | ~/Projects/texume |
| mirador | Render API | ~/Projects/Security-Tools/mirador-test |
| job-search-automation | Local | ~/Projects/job-search-automation |
| phishguard-ml | ML | ~/Projects/phishguard-ml |
| sentiment-analysis-api | API | ~/Projects/AI-ML/sentiment-analysis-api |
| llm-engineer-demo | Demo | ~/Projects/AI-ML/llm-engineer-demo |
| career-automation | Local | ~/Projects/Career-Business/career-automation |
| JobTools | Local | ~/Projects/Career-Business/career-job-tools |
| FretVision | Local | ~/Projects/Music-Audio/music-fretvision-app |
| jcps-boots | Local | ~/Projects/Personal/jcps-boots |

### Legacy (DELETE from GitHub)
- projectlavos-frontend (superseded by main-site)
- jobtracker-frontend (legacy satire)
- jobtracker-backend (legacy)
- jaspermatters (superseded)
- sentiment-api (duplicate)

---

## Backend URLs Quick Reference

```
# Active APIs (4 on Render)
https://projectlavos-backend.onrender.com     # LIVE - 7 endpoints
https://guitar-model-lab.onrender.com         # LIVE - GP5 generation
https://ai-talent-optimizer.onrender.com      # LIVE - v3.1.0 job API
https://mirador-xva2.onrender.com             # LIVE - v2.0.0 AI orchestrator (30 personas, 6 chains)

# Frontend URLs
https://projectlavos.com                       # Portfolio hub
https://guitar.projectlavos.com                # Guitar platform
https://jobs.projectlavos.com                  # Job discovery
https://interactive-resume-ten-pi.vercel.app   # Resume
https://ourjourney-app.vercel.app              # Coparenting
https://jobtrack-two.vercel.app                # Job tracking
https://ba-pathfinder.vercel.app               # BA career guide
https://phishguard-ui.vercel.app               # Phishing demo

# Mirador (Landing + API)
https://mirador-o2wgw9o65-matthew-scotts-projects-1dc9743e.vercel.app  # Landing page (Self-Governing AI narrative)
https://mirador-xva2.onrender.com                                       # API backend (30 personas, 6 chains)
```

---

## Cleanup Actions Required

### Vercel Dashboard - COMPLETED Dec 18
~~DELETE: mirador-consciousness-platform, matthewscott, projectlavos-frontend, projectlavos, jobtracker-frontend, ourjourney-flow~~
**DONE** - Deleted 6 orphaned projects, now 20 remaining

### Railway Dashboard - COMPLETED Dec 18
~~DELETE: precious-vibrancy, adaptable-harmony, earnest-cat~~
**DONE** - Deleted 3 empty projects manually

### GitHub - COMPLETED Dec 18
~~DELETE: projectlavos-frontend, jobtracker-frontend, jobtracker-backend, jaspermatters, sentiment-api~~
**DONE** - Deleted 5 legacy repos via `gh repo delete`

---

## Deployment Commands

```bash
# Vercel (no env vars)
vercel --prod --yes

# Vercel (with VITE_ env vars)
VITE_API_URL=https://api.example.com vercel build --prod
vercel deploy --prebuilt --prod --yes

# Render
# Auto-deploys from GitHub on push to main
# Manual: Dashboard → Service → Manual Deploy

# Check all URLs
for url in projectlavos.com guitar.projectlavos.com jobs.projectlavos.com; do
  curl -s -o /dev/null -w "%{http_code} $url\n" "https://$url"
done
```

---

**Maintenance Notes:**
- GitHub Auto-Deploy: phishguard-ui, interactive-resume, jobtrack, ba-pathfinder, jaspermatters-job-intelligence, apartment-leasing-demo
- Manual Deploy: All projectlavos-monorepo services, ourjourney-app
- Render: Free tier spins down after 15min (~30sec cold start)
- Railway: `railway link` then `railway up` from project directory

---

## Audit Log (Dec 18, 2025)

### Frontend Sites Audited (13 PASS)
| Site | Status | Issues Found | Fixed |
|------|--------|--------------|-------|
| projectlavos.com | PASS | - | - |
| guitar.projectlavos.com | PASS | - | - |
| jobs.projectlavos.com | PASS | - | - |
| interactive-resume-ten-pi.vercel.app | PASS | - | - |
| ourjourney-app.vercel.app | PASS | - | - |
| jobtrack-two.vercel.app | PASS | - | - |
| ba-pathfinder.vercel.app | PASS | - | - |
| phishguard-ui.vercel.app | PASS | - | - |
| frontend-mu-dusky-38.vercel.app | PASS | - | - |
| jaspermatters-job-intelligence.vercel.app | PASS | 3 broken GitHub links, OG 404 | Fixed all |
| vercel-demo-flame.vercel.app | PASS | - | - |
| 2025-skills-to-know.vercel.app | PASS | - | - |
| fretforge-showcase.vercel.app | 404 | Orphaned deployment | Removed from Projects.jsx |

### Backend APIs Audited (3 PASS)
| API | Status | Endpoints Verified |
|-----|--------|-------------------|
| projectlavos-backend.onrender.com | PASS | /api/sentiment, /api/phishing |
| guitar-model-lab.onrender.com | PASS | /scales, /health |
| ai-talent-optimizer.onrender.com | PASS | /stats, /jobs/tier1 |

### Fixes Applied
1. **jaspermatters-job-intelligence**: Removed 3 broken GitHub links (mirador, job-search-automation, unemployment-quest-system), replaced with Guitar Platform and OurJourney cards, created og-image.png
2. **Projects.jsx**: Removed fretforge-showcase entry (404 deployment)
3. **Vercel**: Deleted 6 orphaned projects (mirador-consciousness-platform, matthewscott, projectlavos-frontend, projectlavos, jobtracker-frontend, ourjourney-flow)
