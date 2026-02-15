# Metal Riff Demo -- Full Song Expansion Plan

## Context
The 24-bar demo (44s at 130 BPM) has two complete riff sections with layered instrument entry, JR-style sparse rhythm guitar, and a proven motif/theory engine. The analysis showed dual-peak intensity, balanced riff proportions, and correct harmony intervals. Time to expand to a full 3:04 metal song (100 bars) with verse/pre-chorus/bridge/solo/breakdown/outro sections -- using every TabGenerator method we haven't touched yet.

## Target: 100 bars = 3:04 at 130 BPM

```
Section              Bars  Range    Time   Cumulative
------------------------------------------------------
Intro (Riff 1)       10    0-9      0:18   0:18
Break 1               2    10-11    0:04   0:22
Verse 1               8    12-19    0:15   0:37
Pre-Chorus             4    20-23    0:07   0:44
Chorus 1 (Riff 2)    10    24-33    0:18   1:02
Transition             2    34-35    0:04   1:06
Verse 2                8    36-43    0:15   1:21
Pre-Chorus 2           4    44-47    0:07   1:28
Chorus 2 (Riff 1)    10    48-57    0:18   1:47
Bridge                 8    58-65    0:15   2:02
Solo                   8    66-73    0:15   2:16
Final Chorus (Riff 2) 10   74-83    0:18   2:35
Breakdown              8    84-91    0:15   2:50
Outro                  6    92-97    0:11   3:01
End                    2    98-99    0:04   3:04
```

Triple-peak dynamic arc: Peak 1 (bar 9 intro climax) < Peak 2 (bar 73 solo climax) < Peak 3 (bar 87 breakdown unison)

## File: `/Users/matthewscott/Scripts/python/metal_riff_demo.py`

## What Stays Unchanged
- `build_riff1()` -- reused at bars 0-9 (intro) and 48-57 (chorus 2)
- `build_riff2()` -- reused at bars 24-33 (chorus 1) and 74-83 (final chorus)
- All GP5 plumbing (`mksong`, `mkhdrs`, `mkguitar`, `mkbass`, `mkdrums`)
- All note helpers (`note`, `anote`, `anotes`, `bnote`, `notes2`, `rest`, `drum`, `emit_col`)
- Motif system (`_note_pool`, `motif_from_indices`, `sequence_motif`, `harmonize_3rd`)

## What Gets Extracted to Module Level
Currently nested inside `build_riff1()` -- need to be accessible by multiple sections:
- `_power_chord(fret)` -> module-level function
- `_E5` -> module-level constant (after `_power_chord` is extracted)
- `_burst_cell(voice, vel)` -> module-level, takes `e5_chord` param
- `_motif_root_fret(motif)` -> module-level

These stay nested (section-specific): `_chug_bar`, `_legato_bar`, `_drums_standard`, `_drums_ride`, `_bass_pedal`, `_rhythm_bar`, `_rest_bar` (each section defines its own version)

## 7 New Section Builders

### 1. `build_verse(gt_track, bt_track, dt_track, bars_offset, rt_track, ht_track)`
**8 bars. Pulled-back, atmospheric, bass-forward.**

Layer entry:
- Bars 1-2: Bass + drums only (half-time: kick=[1,11], snare=[9], hho=[1,5,9,13])
- Bars 3-4: +Lead with `generate_pedal_tone('E','minor', position=2)` -- quarter notes, let_ring
- Bars 5-6: +Rhythm with `sad_progression` power chords (C5-A5-E5-B5) as half notes
- Bars 7-8: +Harmony with natural harmonics fret 12

Bass motif: `motif_from_indices(pool, [0, 6, 3, 7], art=['pick','hammer','pick','hammer'], pm=[True,F,F,F])` -- quarter notes

Tools used: `generate_pedal_tone()`, `generate_chord_progression('E','minor','sad_progression',chord_type='5')`

### 2. `build_prechorus(gt_track, ..., variation=False)`
**4 bars. Tension build toward chorus.**

Layer entry:
- Bars 1-2: Lead `generate_ascending_run()` (or `descending_run` if variation=True), drums switch to standard
- Bars 3-4: +Rhythm with `_rhythm_bar()` stab events, +bass 8th pedal, drums add double kicks

Tools used: `generate_ascending_run()`, `generate_descending_run()`, `generate_3nps_run()` (bars 3-4 fast fragments)

### 3. `build_verse2(gt_track, ...)`
**8 bars. Verse variation -- legato lead, developed bass, ghost snare drums.**

Differences from verse 1:
- Lead: `generate_legato_run('E','minor', position=2)` instead of pedal_tone
- Bass: shifted motif via `sequence_motif()` with `[0, 3, 5, 3]`
- Drums: half-time + ghost snares at pos 6, 14
- Harmony enters bar 3 (earlier than verse 1 bar 5)

Tools used: `generate_legato_run()`

### 4. `build_bridge(gt_track, ...)`
**8 bars. Pivot section -- tapping intro, subtractive-then-additive layers.**

Layer entry (unusual -- subtract then rebuild):
- Bars 1-2: Lead ONLY with `generate_tapping_pattern()` pos 1. Shock of emptiness.
- Bars 3-4: +Bass melodic figure + drums (tribal pattern: toms, no hats/snare)
- Bars 5-6: +Rhythm with i-bVII-bVI-V (E5-D5-C5-B5 manually: `_power_chord(0,10,8,7)`). Lead switches to pedal_tone with pinch harmonics.
- Bars 7-8: Full band climax. Lead `generate_3nps_run()` 32nds. Drums double-bass. Rhythm `_rhythm_bar` dense bursts.

**bVII bug workaround**: `get_progression_chords('E','minor','metal_riff')` returns D# (wrong). Build manually: `_power_chord(0)` E5, `_power_chord(10)` D5, `_power_chord(8)` C5, `_power_chord(7)` B5.

Tools used: `generate_tapping_pattern()`, `generate_pedal_tone()`, `generate_3nps_run()`

### 5. `build_solo(gt_track, ...)`
**8 bars. Lead showcase with structured arc over stable rhythm bed.**

All instruments play throughout (lead varies):
- Bars 1-2: Melodic motif statement, pool pos 2, 8th notes. Custom motif with vibrato.
- Bars 3-4: `generate_legato_run()` pos 2, 16th notes
- Bars 5-6: `generate_sweep_arpeggio()` pos 2, 32nd notes
- Bars 7-8: `generate_3nps_run()` descending then ascending. Final note: bend + vibrato.

Backing: rhythm plays sad_progression half-note chords, bass pedals roots, drums ride -> double-bass. Harmony RESTS (solo = single voice).

Tools used: `generate_legato_run()`, `generate_sweep_arpeggio()`, `generate_3nps_run()`

### 6. `build_breakdown(gt_track, ...)`
**8 bars. Heaviest moment. Unison stabs then instruments strip away.**

Anti-layering (everything in, then exits):
- Bars 1-4: ALL instruments play identical syncopated E5 stab pattern. Half-time drums with china. No melody.
- Bars 5-6: Lead breaks away with slow expressive figure (bends, pinch harmonics). Others continue stabs.
- Bars 7-8: Instruments drop out one by one. Bar 8 = lead alone playing motif_a from Riff 1 (callback).

### 7. `build_outro(gt_track, ...)`
**6 bars. Riff 1 callback, rebuilds from nothing to final statement.**

Layer entry (mirrors intro):
- Bars 1-2: Lead alone with Riff 1 motif_a, quarter notes, vel 75-80
- Bars 3-4: +Drums (kick/hat) + bass (root E whole notes)
- Bars 5-6: Full band, one complete Riff 1 motif pass at 16ths, crash, final E5

## Updated `build()` Function

```python
def build():
    TEMPO = 130
    song = mksong('Metal Riff Demo', TEMPO)

    mkhdrs(song, 10, marker='Intro - Riff 1')        # 0-9
    mkhdrs(song, 2,  marker='Break')                  # 10-11
    mkhdrs(song, 8,  marker='Verse 1')                # 12-19
    mkhdrs(song, 4,  marker='Pre-Chorus')             # 20-23
    mkhdrs(song, 10, marker='Chorus 1 - Melodic')     # 24-33
    mkhdrs(song, 2,  marker='Transition')             # 34-35
    mkhdrs(song, 8,  marker='Verse 2')                # 36-43
    mkhdrs(song, 4,  marker='Pre-Chorus 2')           # 44-47
    mkhdrs(song, 10, marker='Chorus 2 - Chug')        # 48-57
    mkhdrs(song, 8,  marker='Bridge')                 # 58-65
    mkhdrs(song, 8,  marker='Solo')                   # 66-73
    mkhdrs(song, 10, marker='Final Chorus')           # 74-83
    mkhdrs(song, 8,  marker='Breakdown')              # 84-91
    mkhdrs(song, 6,  marker='Outro')                  # 92-97
    mkhdrs(song, 2,  marker='End')                    # 98-99

    gt = mkguitar(song, 'Guitar', 29)
    rt = mkguitar(song, 'Rhythm Gtr', 30)
    ht = mkguitar(song, 'Harmony Gtr', 27)
    bt = mkbass(song, 'Bass', 33)
    dt = mkdrums(song)

    build_riff1(gt, bt, dt, 0, rt, ht)           # Intro
    # Break 1 inline (bars 10-11)
    build_verse(gt, bt, dt, 12, rt, ht)
    build_prechorus(gt, bt, dt, 20, rt, ht)
    build_riff2(gt, bt, dt, 24, rt, ht)          # Chorus 1
    # Transition inline (bars 34-35)
    build_verse2(gt, bt, dt, 36, rt, ht)
    build_prechorus(gt, bt, dt, 44, rt, ht, variation=True)
    build_riff1(gt, bt, dt, 48, rt, ht)          # Chorus 2
    build_bridge(gt, bt, dt, 58, rt, ht)
    build_solo(gt, bt, dt, 66, rt, ht)
    build_riff2(gt, bt, dt, 74, rt, ht)          # Final Chorus
    build_breakdown(gt, bt, dt, 84, rt, ht)
    build_outro(gt, bt, dt, 92, rt, ht)
    # End inline (bars 98-99)
```

## TabGenerator Method Usage (all 8 unused methods now deployed)

| Method | Section | Purpose |
|--------|---------|---------|
| `generate_pedal_tone()` | Verse 1, Bridge | Atmospheric lead, root+melody alternation |
| `generate_ascending_run()` | Pre-Chorus | Tension build, climbing energy |
| `generate_descending_run()` | Pre-Chorus 2 | Variation: dip before climb |
| `generate_3nps_run()` | Pre-Chorus, Bridge, Solo | Maximum speed shred passages |
| `generate_legato_run()` | Verse 2, Solo | Smooth connected melodic lines |
| `generate_tapping_pattern()` | Bridge | Texture shock, two-hand technique |
| `generate_chord_progression()` | Verse 1/2, Solo | sad_progression rhythm bed |
| `generate_random_pattern()` | (reserve for fills if needed) | Playable variation |

## Drum Pattern Reference (from drum_theory.py)

| Pattern | Kick | Snare | Cymbals | Use In |
|---------|------|-------|---------|--------|
| half_time | 1,11 | 9 | hho quarters | Verse 1/2 |
| tribal | 1,5,9,13 | 9 | tlo: 3,7,11,15 | Bridge bars 3-4 |
| groove_metal | 1,4,9,12 | 5,13 | hhc 8ths | Breakdown |
| (existing standard) | 1,9 + 5,13 kicks | 5,13 | hhc 16ths | Chorus, Pre-Chorus |
| (existing ride) | 1,9 + 5,13 kicks | 5,13 | ride 16ths | Solo, Melodic |

## Implementation Order

1. Extract `_power_chord`, `_E5`, `_burst_cell`, `_motif_root_fret` to module level
2. Update `build()` with 100-bar layout, inline breaks, all build_* calls
3. `build_verse()` -- simplest new section, validates bass-forward design
4. `build_prechorus()` -- ascending run build, tests variation flag
5. `build_verse2()` -- verse variant with legato
6. `build_bridge()` -- most complex (tapping, manual chords, layer subtraction)
7. `build_solo()` -- lead showcase, multiple generator methods
8. `build_breakdown()` -- unison stabs, strip-away
9. `build_outro()` -- Riff 1 callback
10. Run `build()`, open in Guitar Pro, verify all 100 bars
11. Run `analyze_metal_riff.py` (update section map for 100 bars) to validate

## Verification
1. `python3 metal_riff_demo.py` -- must output GP5 with 5 tracks, 100 bars, ~4000-6000 notes
2. Open in Guitar Pro -- all bars populated, markers visible, playback smooth
3. Update `analyze_metal_riff.py` SECTIONS constant for new structure, re-run analysis
4. Dynamic arc should show triple-peak pattern with valleys at verses
5. Commit to `/Users/matthewscott/Scripts` repo
