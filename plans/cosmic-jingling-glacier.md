# Documents Cleanup Plan - Migration Ghost Directories

**Created:** 2025-12-10
**Status:** MANUAL ACTION REQUIRED (Finder-only access)

---

## Discovery Summary

### Migration Folders Status: FINDER-ONLY ACCESS

Two "Documents - Matthew's MacBook Pro (2)" folders exist in `~/Documents/`:

| Folder | Items | Size | Inode | Last Modified |
|--------|-------|------|-------|---------------|
| `Documents - Matthew's MacBook Pro (2)` | 18 | 576 bytes | 54322206 | Oct 1 12:09 |
| `Documents - Matthew's MacBook Pro (2) - 1` | 34 | 1088 bytes | 74211791 | Oct 15 22:18 |

**What We Know:**
- Valid inodes exist (54322206, 74211791)
- Directories show in `ls -la` with proper permissions (drwx------)
- Filesystem verification passed (no corruption)
- NOT iCloud stubs (no `.icloud` extension)
- NOT mount points
- brctl reports "file doesn't exist"

**Why Command Line Can't Access:**
This is likely a **macOS sandbox or Migration Assistant handler** issue. The directories may only be traversable through Finder's higher-privilege access. This is different from corruption - the data likely exists but requires GUI access.

**Root Cause:** Migration Assistant artifacts from old MacBook transfer. May contain valuable data from previous machine.

---

## MANUAL ACTION REQUIRED

### Step 1: Open Folders in Finder (YOU MUST DO THIS)

1. Open **Finder**
2. Press `Cmd+Shift+G` (Go to Folder)
3. Type: `~/Documents`
4. Look for folders named "Documents - Matthew's MacBook Pro (2)"
5. **Double-click to open them** - Finder may have access where Terminal doesn't

### Step 2: If Finder CAN Access

If you can see contents in Finder:
1. Review what's inside - this is likely old Documents from your previous MacBook
2. Copy any valuable files to `~/Archives/2024/` or appropriate location
3. Once salvaged, delete the migration folders

### Step 3: If Finder CANNOT Access

If Finder also shows empty or errors:
1. Check **iCloud.com** > iCloud Drive > Documents for cloud copies
2. If nothing there, these are truly orphaned entries
3. Safe to delete via Finder (right-click > Move to Trash)

### Step 4: Report Back

Tell me what you found so we can proceed with the rest of Documents cleanup.

---

## Other Documents Cleanup Items

### Loose Scripts (Move to Scripts/)
```
~/Documents/file_organizer_march.py      -> ~/Documents/Scripts/
~/Documents/file_organizer_marchv2.py    -> ~/Documents/Scripts/
~/Documents/Setup_AI_Scraper.py          -> ~/Documents/Scripts/
~/Documents/midi.composer.py.py          -> ~/Documents/Scripts/midi_composer.py (fix extension)
```

### Archive Candidates (Move to ~/Archives/2025/)
```
~/Documents/Updated_2-24.xlsx                  -> ~/Archives/2024/ (dated Feb 2024)
~/Documents/Extracted_URLs_validated.xlsx      -> ~/Archives/2025/
~/Documents/Unified_Vulnerability_Report.xlsx  -> ~/Archives/2025/
~/Documents/state_analysis.png                 -> ~/Archives/2025/
```

### PDFs - Move to Personal/ (User Decision)
```bash
mv ~/Documents/6230CF1B-5ECF-4CE5-ACD6-6CC3496BFE15-list.pdf ~/Documents/Personal/
mv ~/Documents/Scott.M.770612.HRC4094865.pdf ~/Documents/Personal/
mv ~/Documents/Untitled\ -\ November\ 12,\ 2025\ at\ 17.00.02.pdf ~/Documents/Personal/
```

### Potential Duplicates
```
~/Documents/Downloads_Archive/  - May overlap with ~/Archives/, review contents
```

### Protected (No Action - Music/Audio)
- Adobe/, FabFilter/, iZotope/, Native Instruments/, SubMission Audio/, REAPER Media/, Zoom/
- Blackmagic Design/ (video)

---

## Execution Order

1. **MANUAL (USER):** Open migration folders in Finder to check contents
2. **MANUAL (USER):** Salvage any valuable files, then delete folders
3. **CLAUDE:** Move scripts to Scripts/
4. **CLAUDE:** Archive old spreadsheets to Archives/
5. **CLAUDE:** Move PDFs to Personal/
6. **VERIFY:** Downloads_Archive contents before any merge

---

## Files to Modify

**Move (Scripts):**
- `~/Documents/file_organizer_march.py`
- `~/Documents/file_organizer_marchv2.py`
- `~/Documents/Setup_AI_Scraper.py`
- `~/Documents/midi.composer.py.py`

**Move (Archives):**
- `~/Documents/Updated_2-24.xlsx`
- `~/Documents/Extracted_URLs_validated.xlsx`
- `~/Documents/Unified_Vulnerability_Report.xlsx`
- `~/Documents/state_analysis.png`

**Delete (Ghost):**
- `~/Documents/Documents - Matthew's MacBook Pro (2)/`
- `~/Documents/Documents - Matthew's MacBook Pro (2) - 1/`

**Review (User via Finder):**
- `~/Documents/Documents - Matthew's MacBook Pro (2)/`
- `~/Documents/Documents - Matthew's MacBook Pro (2) - 1/`
- `~/Documents/Downloads_Archive/`
