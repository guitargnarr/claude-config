---
description: Generate validated guitar riff with auto-correction and optional playback
argument-hint: [scale] [--random] [--play] [--bars N]
---

Generate a validated guitar riff using the AI + Python hybrid pipeline.

**Usage:**
- `/riff` - Default 4-bar E Phrygian riff
- `/riff "A Minor" --bars 8` - 8-bar A Minor riff
- `/riff --random --play` - Random scale, open dashboard

**Pipeline:**
1. Ollama model generates creative tab
2. Python validates against scale fret map
3. Invalid frets auto-corrected to nearest valid
4. 100% scale-accurate output guaranteed

Run: `python3 ~/Projects/guitar-model-lab/generate_riff.py $ARGUMENTS`
