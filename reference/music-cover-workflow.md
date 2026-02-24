# Music Production & Cover Workflow

**Created:** 2026-02-23
**Origin:** ERRA - Further Eden cover session
**Purpose:** Replicable pipeline for covering songs -- audio stem separation + tab extraction
**Repo:** `guitargnarr/songsterr-ripper` (private)

---

## Overview

Two complementary pipelines that together give the user everything needed to learn and cover a song:

1. **Audio Stem Separation** -- AI isolates instruments from a recording (real audio)
2. **Songsterr Tab Extraction** -- Reverse-engineers Songsterr CDN to get tablature as Guitar Pro files

These can be used independently or together. Always offer both when the user is working on a cover or learning material.

---

## Pipeline 1: Audio Stem Separation

### Tools
| Tool | Version | Install |
|------|---------|---------|
| yt-dlp | 2026.02.21+ | `pip3 install --upgrade yt-dlp` |
| audio-separator | latest | `pip3 install audio-separator onnxruntime` |
| ffmpeg | system | Pre-installed (Homebrew) |

### Steps

```bash
# 1. Download from YouTube
yt-dlp --js-runtimes node -x --audio-format wav -o "song.wav" "https://youtube.com/watch?v=VIDEO_ID"

# 2. Separate into 6 stems
audio-separator --model_filename htdemucs_6s.yaml "song.wav"
# Output: vocals, drums, bass, guitar, other, piano (44.1kHz)

# 3. Upsample to 48kHz (match Logic Pro project rate)
for f in *.wav; do ffmpeg -i "$f" -ar 48000 "48k_$f"; done

# 4. Organize
mkdir -p stems/48k stems/44.1k
mv 48k_*.wav stems/48k/
mv *.wav stems/44.1k/
```

### Logic Pro Import
- User drags stems into Logic session
- Select "Create new tracks" when prompted
- Select "Change Project" to match 48kHz sample rate if asked
- Place stems at bar 1 (beginning of timeline)

### Known Issues
- `demucs` package fails on Python 3.14 -- use `audio-separator` wrapper instead
- yt-dlp requires `--js-runtimes node` flag for YouTube extraction (2026+)
- Upsampling doesn't add real audio detail -- it just prevents Logic from doing real-time resampling

---

## Pipeline 2: Songsterr Tab Extraction

### Script
**Location:** `/Users/matthewscott/Music/covers/erra-further-eden/songsterr_to_gp5.py`
**Repo:** `guitargnarr/songsterr-ripper` (private, GitHub)

### Usage
```bash
# Basic usage -- auto-names output file
python3 songsterr_to_gp5.py "https://www.songsterr.com/a/wsa/SONG-NAME-tab-sNNNNNN"

# Custom output name
python3 songsterr_to_gp5.py "https://www.songsterr.com/a/wsa/SONG-NAME-tab-sNNNNNN" "output.gp5"

# Open in Guitar Pro 7 (must quit first for GP5 format)
osascript -e 'quit app "Guitar Pro 7"'; sleep 1; open "output.gp5"
```

### How It Works
1. Extracts song ID from URL (`-sNNNNNN` pattern)
2. Fetches metadata from `https://songsterr.com/api/meta/{songId}` (unauthenticated)
3. Constructs CDN URL: `https://dqsljvtekg760.cloudfront.net/{songId}/{revisionId}/{imageHash}/{trackIndex}.json`
4. Downloads all track JSON files (each track = one instrument)
5. Converts to GP5 format using `pyguitarpro`
6. Falls back to Playwright network interception if CDN fails

### Features (as of Feb 23, 2026)
- **Tempo changes** -- Writes mid-song tempo changes via MixTableChange on first beat of each tempo-change measure
- **Bend curves** -- Full bend point data with automatic type detection (bend, bendRelease, prebend, prebendRelease)
- **Tuplet support** -- Handles both array format `[3, 2]` and integer shorthand `3` (triplet)
- **MIDI channel overflow** -- Caps channels at 0-15 for songs with 8+ non-drum tracks
- **Track name sanitization** -- Strips non-ASCII, quotes, pipes; caps at 30 chars
- **Filename sanitization** -- Replaces slashes and special chars in output filenames
- **Auto drum skip** -- Skips drum tracks (instrumentId 1024) and vocal tracks
- **Effects:** palm mute, hammer-on/pull-off, let ring, ghost notes, dead notes, ties, slides, harmonics, vibrato

### What's NOT Captured Yet (Future Improvements)
- Trill/tapping indicators
- Whammy bar data
- Grace notes
- Dynamic variation (all notes velocity 95)
- Multi-voice measures (only voice 0 is read)

### Dependencies
```bash
pip3 install guitarpro requests playwright
# Playwright only needed for fallback (CDN usually works)
```

### Songsterr JSON Structure
```
Track JSON:
  name: string
  instrumentId: int (30=guitar, 1024=drums)
  tuning: [int] (MIDI note numbers, e.g. [64,59,55,50,45,40] = standard)
  frets: int (default 24)
  measures: [
    signature: [numerator, denominator]
    voices: [
      beats: [
        type: int (1=whole, 2=half, 4=quarter, 8=eighth, 16=sixteenth)
        dots: int
        tuplet: [enters, times] or int
        rest: bool
        notes: [
          string: int (0-indexed)
          fret: int
          bend: {tone: int, points: [{position: 0-60, tone: int}]}
          palmMute, hammerOn, pullOff, letRing, ghost, dead, tie,
          slide, harmonic, vibrato: bool
        ]
      ]
    ]
  ]
  automations:
    tempo: [{measure: int, bpm: int}]
```

---

## GP5 File Locations (Keep in Sync)

| Location | Purpose | Count |
|----------|---------|-------|
| `/Users/matthewscott/Music/covers/erra-further-eden/` | Source originals | 60 |
| `~/Projects/projectlavos-monorepo/services/guitar/public/tabs/` | Guitar platform (served to web) | 154 total |
| `~/Projects/Archive-Recovered-2025-11-18/FretForge/backend/tabs/` | FretForge archive | copy |

After generating new GP5 files, copy to all three locations:
```bash
cp *.gp5 ~/Projects/projectlavos-monorepo/services/guitar/public/tabs/
cp *.gp5 ~/Projects/Archive-Recovered-2025-11-18/FretForge/backend/tabs/
```

---

## Battle-Tested Results (Feb 23, 2026)

60 songs extracted in one session, including:
- 40-track orchestral arrangement (FF7 Temple of the Ancients)
- 17-track full production (A7X Nobody -- including "Boom" and "Dub Snare" tracks)
- 15-track forensic reconstruction (Queen - Bohemian Rhapsody)
- 697-measure compilation (Synyster Gates - All Multitrack Guitar Solos)
- 520-measure marathon at 243 BPM (Wes Hauch - Mesa Boogie playthrough)
- 11-track song with 6 tempo changes (A7X MIA -- 70/165/83/165/83/70 BPM)

### Bugs Found and Fixed During Session
1. **Tuplet format variance** -- Songsterr uses `[3, 2]` (array) and `3` (int) interchangeably
2. **MIDI channel overflow** -- 9+ tracks exceeded MIDI channel limit (0-15)
3. **Filename sanitization** -- Slashes in song titles (e.g. "1/8/23") created directory paths
4. **Track name corruption** -- Quotes and pipes in GP5 binary strings caused file corruption

---

## OPSEC Considerations

The CDN endpoint is publicly accessible with no auth. For personal use, risk is minimal. If scaling:
- Route requests through VPN/proxy (not residential IP)
- Add randomized delays between track downloads (1-3s)
- Use realistic User-Agent rotation
- Don't batch-rip entire catalog
- Repo name `songsterr-ripper` is self-incriminating -- consider renaming if distributing

---

## Evolution Notes

This workflow was discovered and built in a single session (Feb 23, 2026). It should evolve through experimentation:
- The Songsterr CDN structure may change (URL pattern, auth, rate limiting)
- New stem separation models may improve quality (htdemucs_6s was current best)
- GP5 format limitations may push toward GP7 output (requires different library approach)
- Additional note effects can be added as encountered in new songs
- Batch processing with delays could be added for bulk extraction

The core principle: **two pipelines, real audio + notation, working together.** The specific tools may change but the approach is proven.

---

## Related References
- `~/.claude/reference/gp7-xml-editing.md` -- GP7 format (different from GP5)
- `~/.claude/reference/guitar-ollama-workflow.md` -- AI tab generation (different from extraction)
- `~/.claude/reference/python-utilities-index.md` -- Script index
