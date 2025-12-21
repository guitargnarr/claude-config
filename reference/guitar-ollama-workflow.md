# Guitar Ollama Model Workflow

**Created:** December 10, 2025
**Purpose:** Repeatable process for guitar tablature generation and validation

---

## Current Model

**Model Name:** `guitar_expert_precise`
**Base:** llama3.2
**Status:** ACTIVE (verified working Dec 10, 2025)

### Quick Test
```bash
ollama run guitar_expert_precise "Write a 4-bar E minor riff in standard EADGBE tuning at 120 BPM"
```

---

## What The Model Does

1. **Tablature Generation** - ASCII guitar tabs with standard 6-line format
2. **Theory Translation** - Names concepts behind intuitive playing
3. **Technique Analysis** - Breaks down sweeping, tapping, economy picking
4. **Practice Routines** - Progressive exercises for technical development
5. **Music Analysis** - Identifies scales, modes, techniques

### Output Format (EADGBE Standard Tuning - DEFAULT)
```
e|-------|  (thinnest string, highest pitch)
B|-------|
G|-------|
D|-------|
A|-------|
E|-------|  (thickest string, lowest pitch)
```

### Technique Markings
- `h` = hammer-on
- `p` = pull-off
- `b` = bend
- `/` = slide up
- `\` = slide down
- `~` = vibrato
- `x` = muted note

---

## Cross-Reference Validation Tools

### Online Tab Validators/Editors
| Tool | URL | Use For |
|------|-----|---------|
| **Songsterr** | songsterr.com | AI tab generation from audio, playback validation |
| **Guitar2Tabs** | klang.io/guitar2tabs | Convert recordings to tabs, export GP/MIDI |
| **Tabtify** | tabtify.com | Audio-to-tab AI, real-time playback |
| **Oolimo Chord Analyzer** | oolimo.com/en/guitar-chords/analyze | Validate chord shapes |
| **Guitar Pro 8** | guitar-pro.com | Professional tab editor (desktop app) |
| **TablEdit** | tabledit.com | Import/export ASCII, MIDI, GP formats |

### Validation Process
1. Generate tab with `guitar_expert_precise`
2. Paste into Songsterr or Tabtify to hear playback
3. Use Oolimo to verify chord names are correct
4. Compare with existing tabs on Ultimate-Guitar for known songs

---

## Existing Guitar Projects (Your Assets)

### Deployed Web Apps
| Project | URL | Features |
|---------|-----|----------|
| Guitar Learning Platform | guitar.projectlavos.com | 100+ lessons, MIDI playback, alphaTab rendering |
| FretForge v1 | ~/Projects/fretforge-v1 | Full-stack guitar app (backend + frontend) |

### Key Files
```
~/Projects/projectlavos-monorepo/services/guitar/    # Main guitar platform
~/Projects/fretforge-v1/                             # Earlier guitar project
~/Archives/2025/Manus_Projects/Tab Overlay/          # Tab parsing research (292MB)
~/Documents/iCloud_Recovery/Job_Roadmaps/            # Guitar-related PDFs
```

### Guitar Pro File Parser
```python
# ~/Archives/2025/Manus_Projects/Tab Overlay/.../parse_guitar_pro.py
import guitarpro

def parse_gp_file(filepath):
    song = guitarpro.parse(filepath)
    # Note: GP8 files NOT supported by guitarpro lib
```

### Modelfile Locations
```
~/.ollama/models/manifests/.../guitar_expert_precise/   # Active model
~/Projects/Security-Tools/mirador-test/src/ai_framework/models/optimized/guitar_expert_precise.modelfile  # Source
```

---

## Recreating The Model (If Deleted)

### Step 1: Create Modelfile
```bash
cat > /tmp/guitar_expert_precise.modelfile << 'EOF'
FROM llama3.2

PARAMETER temperature 0.4
PARAMETER top_p 0.85
PARAMETER num_ctx 16384
PARAMETER num_gpu 1
PARAMETER num_thread 8

SYSTEM """You are a master guitarist specialized in technical death metal and advanced techniques. Your expertise combines practical guitar skills with theoretical knowledge. Your capabilities include:

1. Tablature Generation: Create ASCII guitar tabs for exercises and riffs with precise fingering notation
2. Theory Translation: Name and explain the theoretical concepts behind intuitive playing
3. Technique Analysis: Break down complex techniques (sweeping, tapping, economy picking)
4. Practice Routines: Design progressive exercises for technical development
5. Music Analysis: Identify scales, modes and techniques in existing music

When working with a feel player, focus on naming what they already know intuitively rather than enforcing theoretical approaches.

DEFAULT TUNING: EADGBE (standard 6-string) unless user specifies otherwise.
SUPPORTED DROP TUNINGS: Drop D (DADGBE), Drop C (CGCFAD), Drop G 7-string (GCGCFAD)

For tablature, ALWAYS use standard 6-line format with EADGBE labels:
e|-------|  (high E - thinnest)
B|-------|
G|-------|
D|-------|
A|-------|
E|-------|  (low E - thickest)

Include timing indicators and technique markings (h=hammer-on, p=pull-off, b=bend, /=slide up, \=slide down, ~=vibrato, x=mute)."""
EOF
```

### Step 2: Build Model
```bash
ollama create guitar_expert_precise -f /tmp/guitar_expert_precise.modelfile
```

### Step 3: Verify
```bash
ollama run guitar_expert_precise "Generate a simple E minor pentatonic lick in EADGBE tuning"
```

---

## Usage Examples

### Basic Riff Request
```bash
ollama run guitar_expert_precise "Write a 4-bar metal riff in E Phrygian, standard tuning, 140 BPM"
```

### Theory Explanation
```bash
ollama run guitar_expert_precise "Explain the notes and intervals in this chord shape: 022100"
```

### Practice Exercise
```bash
ollama run guitar_expert_precise "Create a 3-note-per-string chromatic exercise for alternate picking"
```

### Song Analysis
```bash
ollama run guitar_expert_precise "What scale is used in a progression of Em - C - G - D?"
```

---

## Integration with Web Tools

### Export to Guitar Pro
1. Generate tab with model
2. Paste into Tabtify (tabtify.com)
3. Export as .gp5 or .gpx file
4. Open in Guitar Pro or Songsterr

### Validate Accuracy
1. Use Oolimo (oolimo.com) for chord validation
2. Use Songsterr playback to hear the tab
3. Compare timing with original source

---

## Your Tuning Presets

| Tuning | Strings | Use Case |
|--------|---------|----------|
| **EADGBE** | Standard 6 | DEFAULT - most exercises |
| DADGBE | Drop D 6 | Metal power chords |
| CGCFAD | Drop C 6 | Heavy metal |
| GCGCFAD | Drop G 7 | 7-string metal (your preferred) |

**Important:** Model defaults to EADGBE. Specify tuning explicitly for non-standard.

---

## Troubleshooting

### Model Not Found
```bash
ollama list | grep guitar
# If missing, recreate using steps above
```

### Output Not ASCII Tab Format
Add to prompt: "Output in standard 6-line ASCII tablature format"

### Wrong Tuning Assumed
Explicitly state: "in standard EADGBE tuning" at end of prompt

### GP8 Files Not Parsing
The `guitarpro` Python library doesn't support GP8 format. Export to GP5 first.

---

## Sources for Validation

- [Songsterr](https://www.songsterr.com) - Tab playback and AI generation
- [Guitar2Tabs](https://klang.io/guitar2tabs) - Audio to tab conversion
- [Tabtify](https://tabtify.com) - Free AI tab editor
- [Oolimo](https://www.oolimo.com/en/guitar-chords/analyze) - Chord analysis
- [Guitar Pro](https://www.guitar-pro.com) - Professional tab editor
- [TablEdit](https://tabledit.com) - Multi-format tab editor

---

**Last Updated:** December 10, 2025
**Status:** Model active and verified
