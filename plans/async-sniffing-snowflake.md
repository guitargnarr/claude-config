# Algorithmic Variation System for technique_song.py

## Context
The key-agnostic harmony engine is COMPLETE (verified across 12 roots x 10 scale types = 120 combinations, all valid). Now: when exercise bars repeat within a section, they're note-for-note identical. Verse 1 bar 3 = verse 1 bar 0. The song needs to evolve -- repeated sections should sound composed, not looped.

## File: `/Users/matthewscott/Scripts/python/technique_song.py`
## Read-only: `/Users/matthewscott/Projects/guitar-model-lab/guitar_theory.py`

---

## Approach: Pure transform functions on bar_data

Transform functions take `bar_data` (list of 16 `(gp_string, fret)` tuples) and return a new list of the same shape. Composable via pipeline. Original exercise arrays are never mutated. All transforms are deterministic.

### New constant
```python
REST_NOTE = (-1, -1)  # sentinel for "rest this note"
```

### New transform functions (7 total, ~120 lines)
Insert after `_rest_bar()`, before section builders.

1. **`var_rotate(bar_data, shift, art_list=None)`** -- Rotate 16-note pattern by N positions. shift=1 pushes everything one sixteenth late (syncopated feel). Returns (data, art).

2. **`var_sparsify(bar_data, keep_mask, art_list=None)`** -- Replace positions where mask is False with REST_NOTE. Returns (data, art).

3. **`var_octave_displace(bar_data, positions, direction=1)`** -- Shift notes at given indices +/-12 frets. Clamp to 0-24, leave unchanged if out of range. Returns data only.

4. **`var_retrograde(bar_data, art_list=None)`** -- Reverse the 16-note sequence. Returns (data, art).

5. **`var_velocity_contour(n_notes, contour, base_vel)`** -- Return list of 16 velocity ints. Contours: 'crescendo', 'decrescendo', 'accent_1_3', 'accent_2_4', 'swell'. Returns vel list (not a data transform).

6. **`var_diatonic_shift(bar_data, degree_shift)`** -- Shift all notes by N scale degrees using `_KEY.scale_notes`. Chromatic fallback: `round(degree_shift * 12/7)` semitones. Octave-wraps if out of 0-24 range. Returns data only.

7. **`var_note_swap(bar_data, swap_pairs)`** -- Swap selected pairs of note positions. Returns data only.

### Predefined masks (~8 lines)
```python
MASK_DOWNBEATS  = [i % 4 == 0 for i in range(16)]   # 4 notes
MASK_ODDS       = [i % 2 == 0 for i in range(16)]   # 8 notes
MASK_DROP_4TH   = [i % 4 != 3 for i in range(16)]   # 12 notes
MASK_FIRST_HALF = [i < 8 for i in range(16)]         # first 8
MASK_LAST_HALF  = [i >= 8 for i in range(16)]        # last 8
MASK_BOOKENDS   = [i < 4 or i >= 12 for i in range(16)]  # beats 1+4
```

### New emission function (~25 lines)
**`_emit_exercise_bar_varied(voice, bar_data, dur=16, vel=VEL_F, art_list=None, vel_contour=None)`**
- Handles REST_NOTE entries (emits 16th rest)
- Handles per-note velocity via vel_contour list
- Replicates cross-string legato fix from existing `_emit_exercise_bar`
- Always emits exactly 16 events at dur=16 -> 960 ticks guaranteed

### Pipeline helper (~20 lines)
**`apply_variations(bar_data, transforms, art_list=None)`**
- Takes list of `(transform_fn, kwargs)` tuples
- Chains them, routing art_list through transforms that support it
- Returns `(transformed_data, transformed_art)`

### Updated harmony helper
**`_diatonic_3rd_bar`** needs to handle REST_NOTE -- when it encounters (-1, -1), emit a rest instead of computing a harmony note. ~3 lines added.

---

## Section-by-Section Variation Plan

### Principle: First hearing = original, repeats = varied, escalating through song

| Section | Bars | Variation Level | Strategy |
|---------|------|----------------|----------|
| Intro | 0-3 | 0 (none) | First hearing, half speed already |
| Verse 1 | 4-11 | 1 (subtle) | Bars 0-2 original, bars 3-7 get velocity contour + note swaps + rotation |
| Pre-Chorus | 12-15 | 0 | First hearing |
| Chorus 1 | 16-23 | 1 (subtle) | Bars 0-2 original, bars 3-7 get accents + octave displacement + diatonic shift on final bar |
| Break | 24-25 | 0 | Static chord ring |
| Verse 2 | 26-33 | 2 (moderate) | Bars 0-3 original, bars 4-7 get rotation + sparsify + retrograde + octave displacement |
| Pre-Chorus 2 | 34-37 | 2 | Already reversed order; add octave displacement + velocity swell + sparsify |
| Chorus 2 | 38-45 | 2 (moderate) | ALT bars get diatonic shifts; ECON bars get retrograde + octave displacement |
| Bridge | 46-49 | 1 | Bars 0-1 atmospheric (no change), bars 2-3 get rotation + crescendo |
| Solo | 50-57 | 3 (dramatic) | Octave displacement on pent bars, velocity swells + retrograde + diatonic shift on sweep bars |
| Final Chorus | 58-65 | 3 (dramatic) | All 5 exercises varied: retrograde, diatonic shift, rotation + octave, crescendo/decrescendo |
| Outro | 66-71 | 2 | Progressive sparsification: DROP_4TH -> ODDS -> DOWNBEATS (mirrors instrument dropout) |

### Detailed per-bar transforms (example: build_verse)
```
bar 0: LEGATO_EX2[0] -- original
bar 1: LEGATO_EX2[1] -- original
bar 2: LEGATO_EX2[2] -- original
bar 3: LEGATO_EX2[0] + velocity_contour('crescendo')
bar 4: LEGATO_EX2[1] + note_swap([(1,2), (5,6)])
bar 5: LEGATO_EX2[2] + velocity_contour('accent_2_4')
bar 6: LEGATO_EX2[0] + rotate(2) + velocity_contour('swell')
bar 7: LEGATO_EX2[1] + sparsify(MASK_DROP_4TH)
```
Similar tables for all 10 builders, defined as dict lookups inside each function.

---

## Implementation Sequence

1. Add REST_NOTE, masks, 7 transform functions, pipeline helper (~170 lines, after `_rest_bar`)
2. Add `_emit_exercise_bar_varied` (~25 lines, after `_emit_exercise_bar_half_speed`)
3. Update `_diatonic_3rd_bar` to handle REST_NOTE (~3 lines)
4. Modify section builders one at a time (verse -> chorus -> verse2 -> prechorus -> chorus2 -> bridge -> solo -> final_chorus -> outro)
5. Each builder: add variation dict, swap `_emit_exercise_bar` calls to `_emit_exercise_bar_varied` for bars that have transforms, pass transformed data to `_diatonic_3rd_bar`
6. Run and validate after each builder

## What does NOT change
- Exercise data arrays (never mutated)
- Drum patterns (already vary per section)
- Bass patterns (already chord-aware via CHORD_MAP)
- Rhythm guitar patterns (already chord-aware)
- Intro (first hearing, no variation needed)
- Break (static chord ring)
- GP5 plumbing, build() signature, key engine

## Bar Duration Safety
Every transform preserves exactly 16 entries. `_emit_exercise_bar_varied` emits exactly 16 sixteenth-note events (notes or rests). 16 * 60 ticks = 960 ticks = valid 4/4 bar. `validate_bar_durations()` catches violations.

## Estimated scope
- ~255 new lines (transforms + emission + masks + pipeline)
- ~60 modified lines (variation dicts + call swaps in 10 builders)
- ~315 total lines of change

## Verification
1. `build()` with Am default -- zero duration errors, 3522+ notes
2. `build(root='E', scale_type='minor')` -- zero errors, valid GP5
3. Open in Guitar Pro -- repeated bars should sound different from first occurrence
4. Compare note count: should be slightly lower than 3522 (sparsification drops some notes)
5. Spot-check: verse bar 6 should sound like a rotated/swelled version of bar 0
