# Metal Riff Demo -- Session Handoff (Feb 14 2026)

## File
`/Users/matthewscott/Scripts/python/metal_riff_demo.py`
Repo: `/Users/matthewscott/Scripts` (main branch, commit `c3bf482`)
Output: `~/compositions/metal_riff_demo.gp5`
Dependency: `~/Projects/guitar-model-lab` (GuitarTheory, TabGenerator)

## What It Does
Generates a 24-bar GP5 file: 5 tracks (Lead, Rhythm Gtr, Harmony Gtr, Bass, Drums).
Structure: Riff 1 (10 bars chug) | Break (2) | Riff 2 (10 bars melodic) | End (2).
130 BPM, 4/4, E standard tuning.

## Current State (Riff 1 -- what we worked on this session)

### Layer Entry
- Bars 1-2: Lead ALONE (16th pedal chugs, motif-based: ABCA / AB'CA)
- Bars 3-4: Lead + drums (kick/hat only, no snare)
- Bars 5-6: THE DROP -- rhythm + harmony + bass enter TOGETHER
- Bars 7-8: Full -- rhythm escalates, harmony goes 16th 3rds, expressive lead
- Bar 9: Climax burst
- Bar 10: Stab-rest resolution

### Rhythm Guitar System (the main work this session)
- **Static E5 power chord** -- never changes. Lead weaves around it.
- **JR "Ishimura" reference** -- 32-32-16 machine-gun burst cells
- **Event-map system** (`_rhythm_bar()`) supports 3 event types:
  - `'burst'` = 32-32-16 cell (2 16th slots)
  - `'stab'` = single 16th PM E5
  - `'half'` = single 8th PM E5 (half-time feel, 2 slots)
- **Placement per bar (verified by data annotation against GP file):**
  - Bar 5: stab at pos 14 (4&, upbeat). 1 event, 15 rests.
  - Bar 6: stab pos 8 (beat 3 downbeat) + burst pos 14 (4& upbeat). Push/pull.
  - Bar 7: burst pos 2 (1& upbeat) + stab pos 8 (beat 3 down) + stab pos 13 (4e up).
  - Bar 8: half pos 4 (beat 2 down) + burst pos 10 (3& upbeat). Half-time meets double-time.
- All rhythm events land on lead's legato (HP) moments for contrast, never on PM low-E anchors.
- `_find_burst_positions()` exists for programmatic placement but bars 5-8 currently use hand-crafted event maps.

### Harmony Guitar (bars 5-6)
- Sparse 3rds on beats 1 and 3 only (quarter notes + rests)
- E->G (minor 3rd) and A->C (diatonic 3rd in Em). Verified correct.
- Bars 7-8: full 16th-note 3rd harmony tracking the lead

### What User Liked
- The 32-32-16 burst cell feel (confirmed "you nailed the triplet feel")
- Static E5 anchor approach
- Mixed vocabulary (stabs + bursts + half-time holds)
- Upbeat/downbeat variation across bars
- Harmony 3rds in bars 5-6 confirmed as belonging

### Potential Next Steps (not requested yet)
- Riff 2 rhythm guitar (bars 12-21) -- hasn't been touched, still uses old patterns
- Further tuning of burst/stab placement based on listening
- Bass could potentially get similar treatment (currently follows motif roots)
- Jason Richardson GPX tabs are in `~/Desktop/All_Guitar_Pro_Tabs/PURCHASED TABS__JASON RICHARDSON - "I"__*` but pyguitarpro can't parse GP6+ format. Ishimura.gp5 was used as parseable reference.

## Key Technical Notes
- pyguitarpro 0.10.1 -- reads/writes GP5 only, not GPX/GP7
- Guitar Pro must be quit (`osascript -e 'tell application "Guitar Pro" to quit'`) before reopening to load fresh file
- Global gitignore blocks *.png but not *.gp5
- Python 3.14 at `/Library/Frameworks/Python.framework/Versions/3.14/bin/python3`
