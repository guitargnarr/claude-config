# Studio Inventory Part II Rewrite: Forensic Action Items

## Context

Part II of the studio inventory PDF (Diagnostic Overview through Workflow Roadmap) currently reads like a generic consultant report. The analysis is abstract -- "9 duplication clusters", "48 empty sessions" -- without telling you what's actually INSIDE each session, whether it has value, what to do with it, and what the consequences of each decision are.

User's core requirement: **Every action item must include WHAT to do, WHY, HOW it will be done, WHAT it will accomplish, and FORESEEABLE ISSUES with the approach -- including 3rd and 4th order consequences.** Example: before deleting a duplicate, catalog whether it contains a unique groove, a different mix bus configuration, or audio takes not present in the canonical version.

The "2.24" denomination is the canonical revision. All instruments in completed songs reference 2.24 strips -- every drum piece, overhead, bus, guitar bus, parallel compression, drum reverb, and the full mastering suite on the master output. This is the convergence point and must be recognized as such.

## What Changes

### 1. Rewrite `data/studio_inventory.py` diagnostic section

**Session-level forensic triage** -- classify every session >5MB with specific content flags:
- `SHELL`: Has channel strips + plugins but 0 audio files (the value is the mix board config)
- `SKETCH`: Has 1-5 audio files, low track count, idea-stage
- `TRACKED`: Has >5 audio files, drums/guitar/bass recorded
- `MIX-READY`: Has >10 audio files, >12 plugins, bus routing evidence
- `TEMPLATE`: Identified as template lineage

For each session, compute:
- What's inside: drums? guitar? mastering chain? FX? orchestral?
- Is it a 2.24-era session? (has "2.24" strips or matches 2024+ plugin profile)
- Unused audio bloat (orphaned takes count)
- Whether it's a fork of another session (same BPM + key + track count + plugin set)

**Composition scoring fix** -- current scoring filters only >40MB >5tracks which pre-selects all A-grades. Expand to score ALL named sessions and include B/C/D/F grades. Add status inference that matches the real session content.

**Per-cluster deduplication action items** -- for each duplicate cluster, generate:
- Which version is canonical and why
- What's different between versions (size delta = audio file differences)
- What to check before deleting (any version with unique audio files)
- Specific risk if you delete without checking

**2.24 lineage recognition** -- identify all sessions/strips/presets in the 2.24 denomination and present them as the canonical reference point.

### 2. Rewrite template sections in `templates/studio_inventory.tex`

Replace the 5 analysis sections with content that matches the forensic detail:

**Section 9: Diagnostic Overview** -- Keep but sharpen. Add a "Document as Decision Engine" framing. Reference 2.24 as the convergence point.

**Section 10: Session Triage** (renamed from "Session Hygiene") -- Per-session action table. For every session with content, state: name, what's in it, what to do with it, risks of the action. Group by action: KEEP, ARCHIVE, DELETE, INVESTIGATE. Include callout boxes for specific complex cases (Immolation cluster, Untitled sessions with hidden value, template shells that ARE the mix board).

**Section 11: Composition Scorecard** -- Rescored with full range (A through F). Each composition gets a one-line assessment of what it IS and what it NEEDS. Grade distribution should show actual spread, not all-A.

**Section 12: The 2.24 Standard** (renamed from "Studio Consolidation") -- Frame 2.24 as the canonical denomination. Map every 2.24 strip, show the complete signal flow from individual drum mic through bus to master output. Show what "before 2.24" looked like vs "after 2.24". Template generation table stays but gets framed as "the path to 2.24".

**Section 13: Decision Matrix** (renamed from "Workflow Roadmap") -- Each action item gets the full treatment:
- WHAT: specific action
- WHY: what problem it solves
- HOW: step-by-step in Logic Pro
- RESULT: what changes after
- RISKS: what could go wrong, 3rd/4th order consequences
- PRO/CON: explicit tradeoffs

### 3. No new background images needed

Existing 09-13 backgrounds work fine. The change is all content.

## Critical Files

- `/Users/matthewscott/Projects/texume/data/studio_inventory.py` -- data module (major rewrite of diagnostic section)
- `/Users/matthewscott/Projects/texume/templates/studio_inventory.tex` -- template (major rewrite of Part II sections)
- `/tmp/studio_inventory_data.json` -- raw data source (read-only)
- `/Users/matthewscott/Projects/texume/scripts/generate_studio_inventory.py` -- generator (unchanged)

## Data Available

From the forensic analysis already performed:
- 140 total sessions, 66.1 GB
- 48 empty Untitled sessions (0 MB, pure Logic defaults)
- 3 Untitled sessions with real content (Untitled: 1,739 MB/26trk/3audio, Untitled 6: 1,692 MB/28trk/21audio, Untitled 1: 82 MB/35trk/0audio)
- 8 sessions >5MB with ZERO audio files (shells = mix board configs)
- 10,287 total unused audio file references (orphaned takes)
- 9 duplication clusters (excluding Untitled) consuming 19.9 GB
- Immolation: 8 sessions across 2 naming patterns, 15.6 GB
- 2.24 strips: the denomination covers drums (China, FTOM, HH, OH, Ride, Room, SNR BTM, SNR Top, Stack, Tom 1, Tom 2), guitars (FOR L/R, GOJ L/R, GOJ LEAD C/L/R, GTR Tracking), buses (Bass, Drum, DrumRev, FOR RHY, GOJ RHY, Inst, Lead, ParaComp), instruments (Djinn, PIV), and output (Mix Bus)
- Master chain: iZotope Ozone -> Waves MaxxBass -> Waves SSLComp -> Waves LinMB

## Verification

1. `python3 -c "from data.studio_inventory import get_inventory_data; d = get_inventory_data(); print(len(d['triage_rows']), 'triage rows'); print(len(d['composition_scores']), 'scored compositions')"` -- verify data computes
2. `python3 scripts/generate_studio_inventory.py` -- compile PDF
3. `open output/studio_inventory.pdf` -- visual check
4. Verify Part I sections unchanged (page count for Part I should be same)
5. Verify Part II has specific per-session action items, not generic bullets
