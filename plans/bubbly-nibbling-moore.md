# Red Thread: GGD Rendering + Split Crown Completion

## Problem
GGD drum packs are MIDI-only. FluidSynth renders sound poor. Need real GGD samples rendered through Logic Pro + EZdrummer.

## Current Assets
- `./jam` CLI tool with Slate Digital EMPRESS (working)
- GP5 drum patterns for Split Crown (Mechanical + Crystalline)
- Chord progressions defined (D Phrygian vs D Lydian)
- Other session building 573-sample browser

## Proposed Actions

### Action 1: Batch Render GGD via Logic Pro (One-Time, 20 min)
Create a Logic Pro project template for batch rendering GGD MIDI to WAV:

1. Create `Red Thread/logic_templates/ggd_render.logicx`
2. Pre-configure:
   - Software Instrument track with EZdrummer
   - GGD kit loaded
   - Output routing ready for bounce
3. Render these tempos (matching Red Thread tracks):
   - 95 BPM (Red Thread, Seventh Heaven)
   - 115 BPM (Split Crown)
   - 122 BPM (Runloop)
   - 130 BPM (Claw My Way)
   - 142 BPM (False Floor, Integer)
4. Export to `Red Thread/audio/ggd_rendered/`
5. Update `jam` tool to use rendered WAVs

### Action 2: Alternative - Stick with Slate Digital
Skip GGD rendering entirely. Slate EMPRESS already provides:
- Real recorded drums (not MIDI)
- Professional quality
- Tempo-matched loops for all 7 tracks

Trade-off: Different character than GGD (less "modern metal")

### Action 3: Focus on Split Crown Completion
With drums solved (either path), complete Split Crown:
1. Record guitar to 115 BPM drums
2. Test Mechanical (L) vs Crystalline (R) panning
3. Validate D Phrygian / D Lydian contrast

## Recommendation
**Action 1 + Action 3**: Render GGD once (20 min in Logic), then have both Slate AND GGD available. Proceed with Split Crown recording.

## Files to Create/Modify
- `Red Thread/logic_templates/ggd_render.logicx` - Logic Pro template
- `Red Thread/audio/ggd_rendered/*.wav` - Rendered GGD loops
- `Red Thread/jam` - Update to include rendered GGD paths

## Decision Needed
Which path?
- A) Render GGD in Logic Pro (20 min setup, get real GGD sound)
- B) Use Slate only (zero setup, slightly different character)
- C) Both (render GGD, keep Slate as alternative)
