# GP7 XML Editing Reference

**Created:** 2026-02-16
**Purpose:** Programmatic editing of Guitar Pro 7 (.gp) files via Python
**Proven at:** metal_riff_demo_v2.gp bar 73-74 rework (Feb 2026)

---

## File Format

GP7 files (`.gp`) are ZIP archives containing:
- `Content/score.gpif` -- the score XML (this is what you edit)
- Other files (audio, thumbnails) -- pass through unchanged

```python
import zipfile, xml.etree.ElementTree as ET, io

with zipfile.ZipFile('file.gp', 'r') as z:
    with z.open('Content/score.gpif') as f:
        tree = ET.parse(f)
        root = tree.getroot()
    other_files = {n: z.read(n) for n in z.namelist() if n != 'Content/score.gpif'}
```

**pyguitarpro CANNOT read GP7 format.** It only supports GP5. Use `zipfile` + `xml.etree.ElementTree`.

---

## XML Structure

Root children (in order):
```
GPVersion, GPRevision, Encoding, Score, MasterTrack, AudioTracks,
Tracks, MasterBars, Bars, Voices, Beats, Notes, Rhythms
```

Everything is ID-referenced (flat, not nested):
- `MasterBars` > `MasterBar` > `<Bars>0 1 2 3 4</Bars>` (space-separated Bar IDs, one per track)
- `Bars` > `Bar id="0"` > `<Voices>0 -1 -1 -1</Voices>` (-1 = unused voice)
- `Voices` > `Voice id="0"` > `<Beats>21 186 23 ...</Beats>` (space-separated Beat IDs)
- `Beats` > `Beat id="21"` > `<Notes>13 14 0</Notes>` (space-separated Note IDs)
- `Rhythms` > `Rhythm id="0"` > `<NoteValue>16th</NoteValue>`

**Track order in MasterBar's `<Bars>` matches `<Tracks>` order.** First ID = Track 1 (lead guitar).

---

## Required Note Properties

GP7 will render notes as RESTS if properties are missing. A working Note element requires ALL of these:

```xml
<Note id="329">
  <InstrumentArticulation>0</InstrumentArticulation>
  <Properties>
    <Property name="ConcertPitch">
      <Pitch><Step>G</Step><Accidental></Accidental><Octave>3</Octave></Pitch>
    </Property>
    <Property name="Fret">
      <Fret>10</Fret>
    </Property>
    <Property name="Midi">
      <Number>55</Number>
    </Property>
    <Property name="String">
      <String>1</String>
    </Property>
    <Property name="TransposedPitch">
      <Pitch><Step>G</Step><Accidental></Accidental><Octave>4</Octave></Pitch>
    </Property>
  </Properties>
</Note>
```

**Critical:** `ConcertPitch` and `TransposedPitch` are REQUIRED. Without them, GP7 shows rests in the TAB even though Fret/String/Midi are present. TransposedPitch octave = ConcertPitch octave + 1 (guitar is a transposing instrument).

---

## Required Beat Properties

```xml
<Beat id="496">
  <Dynamic>MF</Dynamic>
  <Rhythm ref="0" />
  <TransposedPitchStemOrientation>Upward</TransposedPitchStemOrientation>
  <ConcertPitchStemOrientation>Undefined</ConcertPitchStemOrientation>
  <Notes>329</Notes>
  <Properties>
    <Property name="PrimaryPickupVolume"><Float>0.500000</Float></Property>
    <Property name="PrimaryPickupTone"><Float>0.500000</Float></Property>
  </Properties>
</Beat>
```

---

## String Numbering (Standard Tuning)

GP7 strings are numbered low-to-high:
| GP String | Physical | Open MIDI | Open Note |
|-----------|----------|-----------|-----------|
| 0 | Low E (6th) | 40 | E2 |
| 1 | A (5th) | 45 | A2 |
| 2 | D (4th) | 50 | D3 |
| 3 | G (3rd) | 55 | G3 |
| 4 | B (2nd) | 59 | B3 |
| 5 | High E (1st) | 64 | E4 |

MIDI pitch = open string MIDI + fret number.

---

## MIDI to Pitch Conversion

```python
NOTE_STEPS = ['C','C','D','D','E','F','F','G','G','A','A','B']
NOTE_ACCS  = ['', '#','','#','', '','#','','#','', '#','']

def midi_to_pitch(midi):
    octave = (midi // 12) - 1
    idx = midi % 12
    return NOTE_STEPS[idx], NOTE_ACCS[idx], octave
```

Concert octave = computed octave. Transposed octave = concert + 1.

---

## Writing Back to ZIP

```python
xml_bytes = io.BytesIO()
tree.write(xml_bytes, encoding='utf-8', xml_declaration=True)

with zipfile.ZipFile('output.gp', 'w', compression=zipfile.ZIP_STORED) as zout:
    zout.writestr('Content/score.gpif', xml_bytes.getvalue())
    for name, data in other_files.items():
        zout.writestr(name, data)
```

**Use `ZIP_STORED` (no compression).** GP7 expects this.

---

## Critical Rules

1. **NEVER Cmd+S in GP7 after corrupted in-memory state.** If GP7's undo/navigation created phantom bars or emptied content, its in-memory state is wrong. Saving overwrites the file with garbage. Quit WITHOUT saving, fix on disk, reopen.

2. **Always create a locked backup before editing.** `cp file.gp file_LOCKED.gp && chmod 444 file_LOCKED.gp`

3. **GP7 can open multiple files as tabs.** The "+" button in the top-right adds tabs. `open file.gp` adds to existing GP7 instance (unlike GP5 which required quitting first).

4. **Title/Artist via accessibility tree.** XML `<Score><Title>` and `<Artist>` don't always sync to GP7's UI. Set them via macOS accessibility: find AXTextArea elements with description "Title"/"Artist" using `entire contents of front window`.

5. **Go To bar navigation.** Edit menu > "Go to..." opens a Qt dialog. Type bar number and Enter. This is the only reliable navigation method -- keyboard shortcuts like Ctrl+Right trigger macOS desktop switching.

---

## Utility Module

`~/Scripts/python/gp7_editor.py` provides reusable functions:
- `read_gp7(path)` -- returns (tree, root, other_files)
- `write_gp7(path, tree, other_files)` -- writes ZIP
- `get_bar_voice(root, bar_number, track_index)` -- returns voice element for a bar/track
- `create_note(container, id, string, fret)` -- creates Note with all required properties
- `create_beat(container, id, note_id, rhythm_ref, dynamic)` -- creates Beat with all required properties
- `replace_bar_notes(root, bar_number, track_index, note_data, rhythm_ref)` -- full bar replacement

---

## Related

- **GP5 pipeline (different from GP7):** `~/.claude/reference/music-cover-workflow.md` -- Songsterr CDN extraction to GP5 via `pyguitarpro`. GP5 and GP7 are completely separate formats requiring different tools.
- **Guitar Ollama workflow:** `~/.claude/reference/guitar-ollama-workflow.md` -- AI tab generation (complementary to extraction)
