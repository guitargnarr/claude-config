# Matthew David Scott - Professional Context
**Permanent memory for all Claude Code sessions**

---

## Configuration Index

This file serves as the central index to modular configuration files. All detailed information has been organized into topic-specific modules for easier maintenance and navigation.

### Core Modules

**Environment & System:**
- [Python Environment Status](environment/PYTHON_STATUS.md) - Python 3.14 installation, PATH issues, verification protocols
- [System Specifications](reference/SYSTEM_SPECS.md) - Hardware specs, macOS configuration

**Career & Job Search:**
- [Professional Background](career/BACKGROUND.md) - Work history, skills, achievements, education
- [Gmail Job Tracking System](career/JOB_TRACKING.md) - Application tracking, verified data, strategic recommendations

**Technical Integration:**
- [Ollama Models](integrations/OLLAMA.md) - Available AI models, specs, usage patterns
- [File Locations](reference/FILE_LOCATIONS.md) - Resume paths, project directories, key files

**Workflow & Preferences:**
- [Claude Code Workflow Optimization](workflow/PREFERENCES.md) - Tool selection, output organization, automation preferences

**Lessons Learned:**
- [Python Environment Lessons (2025-10-22)](lessons/2025-10-22-python-environment.md) - Critical lessons from October 22, 2025

---

## Communication Preferences

- **Direct and technical**: Appreciate detailed technical explanations
- **Factual accuracy**: Value honesty over optimism
- **No urgency assumptions**: Don't assume employment is immediate priority
- **Respect autonomy**: Present options, don't prescribe actions
- **Ultrathink when requested**: Deep analytical breakdowns

---

## Integration Notes

This system has custom Ollama models integrated with Claude Code via:
- Slash commands (direct model invocation)
- Subagents (delegated workflows)
- Skills (autodiscovery)
- Headless scripts (automation)

When working with career-related tasks, leverage the Ollama models for specialized knowledge and automation.

---

## Quick Reference

**Most common tasks:**
1. **Resume for job:** `/coach` → customize VARIANT → /humanize → save
2. **Interview prep:** interview-prep-auto skill → /coach + /louisville + /tactic
3. **Track application:** job-application-tracker skill → update CSV
4. **Gmail extraction:** Run `enhanced_gmail_extractor.py` with full Python path → CSV + database
5. **Filter X noise:** Run `filter_x_noise.py` → Remove 50% noise automatically
6. **Generate image:** `/canvas-design [description]` → saves to ~/Desktop/Designs/
7. **Analyze data:** /analyze → process JOB_TRACKER_2025.csv → generate report
8. **Research company:** /louisville [company] → /tactic [hiring approach]
9. **QR code:** `/canvas-design QR code for linkedin.com/in/mscott77` → LinkedIn QR
10. **Business card:** `/canvas-design business card with QR code` → print-ready card
11. **Animation:** `/canvas-design animated gradient banner` → GIF for social media

**Design system quick reference:**
- **QR codes**: Square, rounded, circle styles + logo overlay + business cards
- **Animations**: GIF export, gradient waves, pulsing effects, 30 FPS
- **Templates**: 7 QR templates, 1 business card, gradient animation proof
- **LinkedIn**: https://linkedin.com/in/mscott77
- **GitHub**: https://github.com/mscott77

**File locations quick reference:**
- Resumes: `~/Desktop/Resumes_Master_2025/resumes/active/`
- Job tracker: `~/Desktop/Resumes_Master_2025/job_search/tracking/JOB_TRACKER_2025.csv`
- Gmail data (filtered): `~/Desktop/Resumes_Master_2025/job_search/tracking/GMAIL_VERIFIED_APPLICATIONS_FILTERED.csv`
- Gmail database: `~/Desktop/Resumes_Master_2025/job_search/database/job_tracker.db`
- Gmail extractor: `~/Desktop/Resumes_Master_2025/job_search/enhanced_gmail_extractor.py`
- Noise filter: `~/Desktop/Resumes_Master_2025/job_search/filter_x_noise.py`
- Designs: `~/Desktop/Designs/`
- Scripts: `~/Desktop/Resumes_Master_2025/scripts/`
- Design utils: `~/Desktop/Resumes_Master_2025/scripts/design_utils.py`
- Advanced design: `~/Desktop/Resumes_Master_2025/scripts/advanced_design.py`

**Gmail tracking commands:**
```bash
# Extract all job emails from Gmail (use full Python path)
cd ~/Desktop/Resumes_Master_2025/job_search
/Library/Frameworks/Python.framework/Versions/3.14/bin/python3 enhanced_gmail_extractor.py

# Filter out X/Twitter noise
/Library/Frameworks/Python.framework/Versions/3.14/bin/python3 filter_x_noise.py

# View filtered results
open tracking/GMAIL_VERIFIED_APPLICATIONS_FILTERED.csv
```

**Python execution (CRITICAL):**
```bash
# WRONG (produces zero output - Python 3.13 is broken):
python3 script.py

# RIGHT (use full path to Python 3.14):
/Library/Frameworks/Python.framework/Versions/3.14/bin/python3 script.py
```

---

## Module Update Tracking

| Module | Last Updated | Key Changes |
|--------|--------------|-------------|
| PYTHON_STATUS.md | 2025-10-22 | Initial modularization, PATH issue documentation |
| 2025-10-22-python-environment.md | 2025-10-22 | Initial modularization, 7 critical lessons |
| JOB_TRACKING.md | 2025-10-22 | Initial modularization, Gmail system documentation |
| BACKGROUND.md | 2025-10-22 | Initial modularization, professional background |
| OLLAMA.md | 2025-10-22 | Initial modularization, model specs |
| FILE_LOCATIONS.md | 2025-10-22 | Initial modularization, path references |
| SYSTEM_SPECS.md | 2025-10-22 | Initial modularization, hardware/software specs |
| PREFERENCES.md | 2025-10-22 | Initial modularization, workflow preferences |

---

**Modularization Date:** October 24, 2025
**Original File Preserved:** `~/.claude/CLAUDE.md.backup-20251024` (983 lines)
**Total Modules Created:** 8 files across 6 directories
**Index File:** This file (180 lines)
