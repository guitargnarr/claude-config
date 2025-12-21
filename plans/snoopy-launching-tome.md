# Home Directory Reorganization Plan

**Created:** 2025-12-10
**Source Data:** `~/full_system_map.md`
**Approach:** Sector-by-sector, safest first, music LAST

---

## Guiding Principles

1. **No destructive operations** - Move, don't delete (deletions only after manual review)
2. **Sector-by-sector** - Complete one area before moving to next
3. **Music files are UNTOUCHABLE until final phase** - Logic, plugins, presets, samples stay put
4. **Backup before each phase** - Snapshot critical items before moving
5. **Verify after each move** - Confirm files accessible before proceeding

---

## Phase Order (Safest → Riskiest)

| Phase | Sector | Files | Risk | Time Est |
|-------|--------|-------|------|----------|
| 1 | Root Clutter (~/) | 190 files | LOW | 20 min |
| 2 | Downloads | 110 files, 19 dirs | LOW | 15 min |
| 3 | Desktop | 28 files, 17 dirs | MEDIUM | 15 min |
| 4 | Documents | 14 files, 16 dirs | MEDIUM | 10 min |
| 5 | Archive Consolidation | 3 archive dirs | MEDIUM | 10 min |
| 6 | Cache Cleanup | .cache, .npm, etc | LOW | 5 min |
| 7 | **Music/Audio** | 92 GB | **LAST** | TBD |

---

## Phase 1: Root Clutter Cleanup (~/)

**Goal:** Reduce 190+ loose files at ~/ to <10

### 1.1 Create Target Directories
```
~/Organized/
├── Sessions/           # Claude session .md files (63 files)
├── Resumes/            # All resume variants (19 files)
├── Scripts/            # Loose .py, .sh, .scpt files (22 files)
├── Modelfiles/         # Ollama Modelfiles (8 files)
├── Databases/          # .db files (6 files)
├── Media/              # Screen recordings, images (15 files)
├── Legacy/             # Old .as files, junk (5 files)
└── Temp/               # Temp audit files, logs (50+ files)
```

### 1.2 File Moves (by category)

**Session Artifacts → ~/Organized/Sessions/**
- All `*_COMPLETE*.md`, `SESSION_*.md`, `HANDOFF_*.md`
- All `AUDIT_*.md`, `DEPLOYMENT_*.md`
- All `PHISHGUARD_*.md`, `MIRADOR_*.md`
- 63 files total

**Resumes → ~/Organized/Resumes/**
- All `MATTHEW_SCOTT_*.docx`, `*.tex`, `*.txt`
- 19 files total (will consolidate to 1 source later)

**Scripts → ~/Organized/Scripts/**
- All `*.py` (12 files)
- All `*.sh` (10 files)
- All `*.scpt` (5 files)

**Modelfiles → ~/.ollama-presets/** (existing directory)
- `barrier-breaker.Modelfile`
- `code-executor.Modelfile`
- `data-analyzer-qwen.Modelfile`
- `humanizer.Modelfile`
- `louisville-job-market.Modelfile`
- `matthew-career-coach.Modelfile`
- `quick-advisor-phi.Modelfile`
- `timeline-crystalizer.Modelfile`

**Databases → ~/Organized/Databases/**
- `.file_integrity.db`
- `.mirador_analytics.db`
- `consciousness_tracking.db`
- `context_maximizer.db`
- `logic_analysis.db`
- `production_quality_analysis.db`

**Media → ~/Organized/Media/**
- `Screen Recording 2025-08-04...mov` (254 MB)
- All `*.png` at root level
- `*.rtf` files (Untitled 3.rtf, Untitled 5.rtf, etc.)

**Legacy/Junk → ~/Organized/Legacy/**
- `fukk.as` (2021)
- `LLE ORION SETUP.as` (2021)
- `dead.letter`
- `Agent` (empty)
- `code`, `code 2` (if not needed)

### 1.3 Files to KEEP at ~/
- `.zshrc`, `.bashrc`, `.gitconfig` (shell configs)
- `.gitignore*` files
- `CLAUDE.md` (if actively used)
- `README.md` (if meaningful)
- Standard dotfiles

### 1.4 Verification
- [ ] All moved files accessible from new locations
- [ ] No broken symlinks created
- [ ] Scripts still executable

---

## Phase 2: Downloads Cleanup

**Goal:** Organize ~/Downloads into categorized structure

### 2.1 Target Structure
```
~/Downloads/
├── 0_Inbox/            # New downloads land here
├── Documents/          # PDFs, DOCX (move existing)
├── Code-Snippets/      # Loose .py, .java, .tsx files
├── MIDI-Packs/         # GGD packs, Toontrack (KEEP WHERE THEY ARE for now)
├── Stems/              # Bad Thing Stems, etc.
├── Installers/         # Already exists
└── Archives/           # .zip files
```

### 2.2 Sensitive Files (MOVE FIRST - Security)
**Move to secure location (e.g., ~/Secure/ or 1Password):**
- `1Password Emergency Kit.pdf` (x2)
- `github-recovery-codes.txt` (x2)
- `PyPI-Recovery-Codes-guitargnarr-*.txt`

### 2.3 Resume Files → ~/Organized/Resumes/
- `Resume-Matthew-Scott-Enhanced.pdf` (x2)
- `Matthew-Scott-CV-AI-Systems.pdf`
- `Matthew-Scott-Resume.pdf` (x3)
- `matthew-scott-resume-2025.pdf`
- All resume variants

### 2.4 UI Benefits Docs → ~/Desktop/UI Benefits/ (consolidate)
- All `WFD-UI-Benefits*.pdf` files (20+ files)

### 2.5 Code Snippets → ~/Downloads/Code-Snippets/
- `Dashboard.tsx`, `App.tsx`
- `MealPlanningService.java`, `MealPlanningController.java`
- `ai_recommendation_engine.py`, `ingredient_detector.cpp`
- All loose code files

### 2.6 MIDI Packs - NO CHANGES
Per user request, leave in current locations:
- `GGD_Modern_Metal_Ali_Richardson_MIDI_Pack/`
- `Tech Metal Navene MIDI Pack/`
- `GGD_Free_Grooves_Vol1/`, `Vol2/`
- `Toontrack/`, `Drums/`, `Guitars/`

---

## Phase 3: Desktop Consolidation

**Goal:** Clean up loose files, preserve numbered folder system

### 3.1 Current Structure (PRESERVE)
```
~/Desktop/
├── 1_PRIORITY_JOB_SEARCH/    # Keep
├── 2_AI_PROJECTS_PORTFOLIO/  # Keep
├── 3_DOCUMENTATION_REPORTS/  # Keep
├── 4_SCREENSHOTS_2025/       # Keep
├── 5_MEDIA_DESIGNS_CREATIVE/ # Keep
├── 7_DEVELOPMENT_CODE/       # Keep
├── 8_PERSONAL_CREATIVE/      # Keep
└── [loose files to organize]
```

### 3.2 Loose Files to Move
- Screenshots at root → `4_SCREENSHOTS_2025/December/`
- `*.md` files at root → `3_DOCUMENTATION_REPORTS/`
- `JOB_TRACKER_LIVE.csv` → `1_PRIORITY_JOB_SEARCH/`
- `*.sh` scripts → `7_DEVELOPMENT_CODE/`

### 3.3 Backup Directories (Evaluate)
- `OurJourney-backup-20251129/` - Keep or archive?
- `GitHub-Backup-20251129/` - Keep or archive?

---

## Phase 4: Documents Cleanup

**Goal:** Remove migration leftovers, organize scripts

### 4.1 Migration Folders (EVALUATE)
- `Documents - Matthew's MacBook Pro (2)/`
- `Documents - Matthew's MacBook Pro (2) - 1/`
These appear to be old Mac migration artifacts. Review contents, merge if needed.

### 4.2 Plugin Folders (NO CHANGES - Music Phase)
Leave untouched until Phase 7:
- `Native Instruments/`
- `FabFilter/`
- `iZotope/`
- `SubMission Audio/`
- `STL/`
- `Blackmagic Design/`
- `REAPER Media/`

### 4.3 Scripts to Consolidate
Move to ~/Organized/Scripts/ or ~/Scripts/:
- `file_organizer_march.py`
- `file_organizer_marchv2.py`
- `midi.composer.py.py`
- `Setup_AI_Scraper.py`

---

## Phase 5: Archive Consolidation

**Goal:** Merge multiple archive systems into one

### 5.1 Current Archives
- `~/Archive-2024/` (13 GB)
- `~/Archives/` (6.4 GB)
- `~/Organization-Backup-20250923_083256/`
- `~/Repository-Consolidation-20250926/`
- `~/claude-backup-20251114-091527/`

### 5.2 Proposed Structure
```
~/Archives/
├── 2024/               # All 2024 content
├── 2025/               # 2025 backups
├── Claude-Configs/     # Claude backup snapshots
└── Organization/       # Previous organization attempts
```

### 5.3 Verification Before Merge
- Check for duplicates across archive directories
- Verify nothing critical is only in one location

---

## Phase 6: Cache Cleanup (Optional)

**Goal:** Reclaim disk space from caches

### 6.1 Safe to Clear
- `~/.npm/_cacache/` - 3.9 GB (can regenerate)
- Old huggingface models not in use

### 6.2 Review Before Clearing
- `~/.ollama/models/` - 77 GB (keep active models)
- `~/.cache/huggingface/` - 46 GB (keep active models)

### 6.3 User Decision Required
- Which Ollama models are actively used?
- Which Huggingface models can be deleted?

---

## Phase 7: Music/Audio (LAST - User Controlled)

**This phase is SKIPPED until explicitly requested.**

### 7.1 Directories to PRESERVE (Do Not Touch)
- `~/Music/` (92 GB total)
- `~/Music/Logic/` (21 GB)
- `~/Music/GuitarInstructionals/` (56 GB)
- `~/Music/Audio Music Apps/` (9.1 GB)
- `~/Music/Spitfire Audio/`
- `~/Music/EZdrummer/`
- `~/Documents/Native Instruments/`
- `~/Documents/FabFilter/`
- `~/Documents/iZotope/`
- `~/Documents/SubMission Audio/`
- `~/Documents/STL/`
- `~/Documents/REAPER Media/`
- `~/Spitfire/`
- `~/Splice/`
- `~/STEMS/`
- `~/Music-Production-Suite/`
- `~/MusicProductionPack/`
- `~/Professional.logicx/`
- All MIDI packs in Downloads

### 7.2 Future Considerations (When Ready)
- Consolidate MIDI packs to `~/Studio/MIDI/`
- Organize sample libraries
- Archive unused presets

---

## Execution Checklist

### Before Starting
- [ ] Create `~/Organized/` directory structure
- [ ] Verify backup of critical files exists
- [ ] Close any applications using files being moved

### Phase 1 (Root)
- [ ] Create subdirectories
- [ ] Move session .md files
- [ ] Move resume files
- [ ] Move scripts
- [ ] Move Modelfiles to ~/.ollama-presets/
- [ ] Move databases
- [ ] Move media files
- [ ] Verify all moves successful

### Phase 2 (Downloads)
- [ ] SECURE sensitive files first (1Password kits, recovery codes)
- [ ] Move resumes to consolidated location
- [ ] Move UI Benefits docs
- [ ] Organize code snippets
- [ ] DO NOT touch MIDI packs

### Phase 3 (Desktop)
- [ ] Move loose screenshots
- [ ] Move loose .md files
- [ ] Evaluate backup directories

### Phase 4 (Documents)
- [ ] Review migration folders
- [ ] Move scripts
- [ ] DO NOT touch plugin folders

### Phase 5 (Archives)
- [ ] Create unified structure
- [ ] Verify no data loss before merging
- [ ] Consolidate duplicates

### Phase 6 (Caches)
- [ ] Get user confirmation on models to keep
- [ ] Clear npm cache if approved
- [ ] Clear unused ML models if approved

### Phase 7 (Music)
- [ ] SKIP until user explicitly requests
- [ ] User maintains full control

---

## Rollback Plan

If any phase goes wrong:
1. All moves use `mv` which preserves data
2. No deletions until user confirms
3. Can reverse any move by swapping source/dest
4. All operations logged for audit trail

---

## User Decisions (Captured)

| Question | Answer |
|----------|--------|
| Resume source of truth | Use `~/Desktop/Research/Originals_Dec2025/` as canonical |
| Sensitive files (1Password, recovery codes) | Already in 1Password vault - DELETE from Downloads |
| Cache cleanup | Defer decision to Phase 6 |
| Documents migration folders | Leave untouched |

---

## HIGH-VALUE ASSETS (DO NOT MOVE - Preserve in Place)

**Canonical Resume Assets (Dec 8, 2025 - Latest):**
```
~/Desktop/Research/Originals_Dec2025/
├── LinkedIn_ORIGINAL.pdf          (260K, Dec 8)
├── Curriculum Vitae_Matthew_Scott.pdf  (126K, Dec 8)
├── identity_ORIGINAL.pdf          (251K, Dec 8)
└── Strengths Profile_ORIGINAL.pdf (169K, Dec 8)
```

**Working Copies (Dec 4, 2025):**
```
~/Desktop/Research/Working_Copies_Dec2025/
├── LinkedIn.pdf
├── Curriculum Vitae.pdf
├── identity.pdf
└── Strengths Profile.pdf
```

**Supporting Research:**
```
~/Desktop/Research/
├── Independent Pharmacy Trends Report | 2025.pdf  (Dec 9)
├── ULTRATHINK_*.md files (analysis docs)
├── *.tex source files
└── AssistRx/, AssistRx_POC/ (project materials)
```

**Action:** The entire `~/Desktop/Research/` folder is PROTECTED. Do not reorganize contents.

---

## Resume Consolidation Strategy (Updated)

**Source of Truth:** `~/Desktop/Research/Originals_Dec2025/`

**Old variants to ARCHIVE (not delete):**
- All `MATTHEW_SCOTT_*.docx` at ~/ root → `~/Organized/Resumes/Legacy/`
- All resume PDFs in Downloads → `~/Organized/Resumes/Legacy/`
- Resume files at ~/ root → `~/Organized/Resumes/Legacy/`

**Result:** One clear canonical location, old variants preserved but organized.

---

*Ready to execute Phase 1 on your approval.*
