# Plan: Add Rhythm + Harmony Guitar Layers to metal_riff_demo.py

## Context

The metal riff demo now generates articulation-dense output (19-20 notes/bar, 70% hammer/pull, 94% 16th/32nd notes) matching the Rick Graham benchmark. The screenshot from Guitar Pro confirms bars 1-2 sound exactly right -- palm-muted 16th pedal tone chugs with melodic hammer-on lines on the A string.

Now it needs production layering. Real metalcore tracks (Periphery, ABR, Erra) use 2-3 guitar layers:
1. **Lead guitar** (already exists) -- the riffs
2. **Rhythm guitar** -- doubles bass, provides the wall-of-sound, power chord bed
3. **Harmony/texture guitar** -- 3rds above melody lines, droning notes, sparse ornaments

## Files Modified

1. **`~/Scripts/python/metal_riff_demo.py`** -- add 2 new guitar tracks + build functions

## Implementation

### Step 1: Add Guitar 2 (Rhythm) and Guitar 3 (Harmony) tracks to `build()`

In `build()`, after the existing `gt = mkguitar(...)`:
```python
gt  = mkguitar(song, 'Guitar',    29)  # lead: overdriven
gt2 = mkguitar(song, 'Rhythm Gtr', 30)  # rhythm: distortion guitar
gt3 = mkguitar(song, 'Harmony Gtr', 27) # harmony: clean electric
```
- `inst=30` (Distortion Guitar) gives a heavier sound than the lead's overdriven (29)
- `inst=27` (Clean Electric) gives separation for the harmony layer
- Pass gt2, gt3 into build_riff1 and build_riff2

### Step 2: Add `harmonize_3rd()` helper function

No harmony transposition exists in the theory engine. Add a utility in metal_riff_demo.py:
```python
def harmonize_3rd(col, scale_notes):
    """Transpose a theory column up a diatonic 3rd (2 scale degrees).
    Returns new column with adjusted fret/string, or None if out of range."""
```
Logic:
- E minor scale = ['E', 'F#', 'G', 'A', 'B', 'C', 'D']
- Find each note's index in the scale, shift +2 positions (wrapping)
- E -> G (+3 semitones), F# -> A (+3), G -> B (+4), A -> C (+3), B -> D (+3), C -> E (+4), D -> F# (+3)
- Calculate new fret: `new_fret = old_fret + semitone_shift`
- If new_fret > 24 or same string is crowded, try shifting to the next higher string
- Copy articulation/duration/accent from original note

### Step 3: Build rhythm guitar for Riff 1 (bars 0-3)

**Bar 1-2: 8th-note palm-muted power chord chugs** -- the wall behind the lead's 16ths
- Use `GEN.generate_power_chord_riff('E', 'minor', position=1, bars=4)`
- Emit 8 beats per bar at dur=8, all palm-muted, velocity ~80 (quieter than lead)
- This doubles what the bass is doing but with power chord voicings (root+5th)

**Bar 3: Sustained power chord under the 32nd burst**
- Hold E5 as a half note, then D5 as a half note (2 beats each)
- The lead does the shredding; rhythm provides the harmonic anchor
- Palm mute off for sustain

**Bar 4: Matches the stab-rest pattern of the lead**
- Same stab timing as lead guitar (E5, rest, A5, rest, etc.) but at lower velocity
- Creates the locked-in tight metalcore sound

### Step 4: Build rhythm guitar for Riff 2 (bars 6-9)

**Bar 1: Sustained power chords under the legato run**
- Two half-note power chords: Em (beats 1-2), then Am (beats 3-4)
- Low velocity, clean sustain -- bed for the lead's legato

**Bar 2: Tremolo-picked single note under the sweep**
- Low E open string, all 16th notes, palm-muted
- Creates tension under the fast sweep arpeggio

**Bar 3: Follows descending run with 8th-note root motion**
- 8th notes following the bass line, descending
- Decrescendo matching the lead

**Bar 4: Sustained Em dyad under the resolution**
- Whole note Em power chord, let ring
- Matches the lead's resolving dyad

### Step 5: Build harmony guitar for Riff 1 (bars 0-3)

**Bar 1-2: Sparse -- single drone note on beat 1 of each bar**
- One whole-note high E (string 5, fret 0 or string 1 fret 12) per bar
- Very low velocity (~60) for subtle texture
- Clean tone separates it from the distorted chugs

**Bar 3: Harmonize the ascending 32nd burst in 3rds**
- Use `harmonize_3rd()` on the ascending run columns
- Same rhythm (32nd notes), same articulations, transposed up a diatonic 3rd
- This creates the classic dual-lead harmony (Iron Maiden / Trivium style)
- Velocity slightly below lead (~85 vs lead's crescendo to 120)

**Bar 4: Rest -- let the stab pattern breathe without harmony clutter**

### Step 6: Build harmony guitar for Riff 2 (bars 6-9)

**Bar 1: Harmonize the legato run in 3rds**
- `harmonize_3rd()` on the legato columns, same 16th rhythm
- Creates a lush twin-lead legato harmony
- Velocity ~85 (under the lead)

**Bar 2: Rest or single sustained note**
- The sweep arpeggio is complex enough on its own
- One whole-note drone on the 3rd of the key (G, fret 3 string 0) for warmth

**Bar 3: Sparse passing notes -- hit beats 1 and 3 only**
- Two half-note harmony notes (3rds above the descending run's beat-1 and beat-3 notes)
- Creates call-and-response texture without cluttering the descend

**Bar 4: Harmonize the resolve dyad**
- The lead resolves to E+B (root+5th). Harmony adds G (minor 3rd) -- completing the Em triad
- Single half-note G above the dyad
- Clean tone, low velocity -- ghostly resolution

### Step 7: Break and End bars for new tracks

**Break bars (4-5):**
- Rhythm: whole note low E ring, then rest (mirrors existing guitar)
- Harmony: rest both bars

**End bars (10-11):**
- Rhythm: E5 power chord ring, then rest (mirrors existing guitar)
- Harmony: single high E whole note, then rest

## What Does NOT Change

- Lead guitar (Guitar 1): unchanged -- 155 notes, articulations confirmed working
- Bass: unchanged
- Drums: unchanged
- Song structure: 4+2+4+2 = 12 bars
- Key/scale: E minor
- Tempo: 130 BPM

## Expected Output

- 5 tracks total (Lead, Rhythm, Harmony, Bass, Drums)
- Total notes: ~550-600 (up from 371)
- Rhythm guitar: ~80-100 notes (8th-note backbone)
- Harmony guitar: ~60-80 notes (selective 3rd harmonies + drones)
- Guitar Pro should show 3 guitar tab staves

## Verification

1. `python3 ~/Scripts/python/metal_riff_demo.py` -- produces GP5, opens in Guitar Pro
2. `node ~/Desktop/All_Guitar_Pro_Tabs/deep-parse.js ~/compositions/metal_riff_demo.gp5`
3. Check:
   - 5 tracks visible
   - Rhythm guitar: palm mutes on chugs, sustained chords in melodic sections
   - Harmony guitar: 3rd intervals above lead in bars 3, 7, 8; drones elsewhere
   - Lead guitar metrics unchanged from current benchmark
4. Open in Guitar Pro -- verify 3 guitar staves visible with distinct tonal roles
