# RiffGenerator Redesign Plan

**Created:** 2025-12-16
**Scope:** Visual refresh + Component split + Feature simplification
**Current State:** 1221-line monolithic component

---

## Goals

1. **Visual Refresh** - Apply elite styling from ScaleTrainer/FretVision (rosewood fretboard, glowing notes, DAW controls)
2. **Component Split** - Extract modular components following Catalog pattern (8 separate files)
3. **Simplify Features** - Remove premium gating, daily limits, upgrade modals. Free platform.

---

## Phase 1: Remove Premium Gating (~100 lines deleted)

**DELETE these sections from RiffGenerator.jsx:**
- Lines 351-374: Free tier constants and functions (`FREE_GENERATIONS_PER_DAY`, `isPremiumFeature`, `getGenerationsToday`, `incrementGenerations`)
- Lines 377-411: `UpgradeModal` component
- Lines 435-437: Premium state variables (`showUpgrade`, `upgradeReason`, `generationsToday`)
- Lines 627-645: `regenerate()` premium checks
- Lines 662-668: `exportMidi()` premium gating
- Lines 1196-1210: Free tier info footer
- Lines 1212-1216: UpgradeModal render

**Result:** All features unlocked, no daily limits

---

## Phase 2: Extract Components

### New File Structure
```
src/components/riffgen/
├── InteractiveFretboard.jsx   (~100 lines) - Extract lines 175-276
├── PlaybackControls.jsx       (~80 lines)  - Extract DAW controls
├── ScaleSettings.jsx          (~100 lines) - Root/Scale/Tuning selectors
├── PatternSettings.jsx        (~100 lines) - Pattern/Position/Bars/Tempo
├── TabDisplay.jsx             (~80 lines)  - Tab output + copy/export
└── index.js                   - Re-exports

src/lib/
├── GuitarSynthesizer.js       (~70 lines)  - Extract class from lines 83-143
├── midiGenerator.js           (~80 lines)  - Extract lines 7-80
└── tabParser.js               (~50 lines)  - Extract parseTab callback
```

### DELETE from RiffGenerator.jsx:
- MiniFretboard component (lines 279-348) - Unused

### Keep in RiffGenerator.jsx:
- State management (orchestrator pattern)
- URL param sync
- Keyboard shortcuts
- Component composition

**Target:** RiffGenerator.jsx reduces from 1221 lines to ~350 lines

---

## Phase 3: Visual Refresh (Elite Styling)

### Apply These CSS Patterns:

**From ScaleTrainer:**
- `.scale-trainer-fretboard` container with rosewood background
- `.scale-trainer-note-dot.root` / `.scale-trainer-note-dot.scale` styling
- `.scale-trainer-fret-marker` inlay dots

**From FretVision:**
- `.fretvision-note-dot` glow effects
- Note hover animations

**From TabPlayer:**
- `.daw-controls-panel` glass morphism
- `.btn-play`, `.btn-loop.active` states
- `.progress-bar-elite` with gradient animation

**New CSS Classes to Add (~150 lines):**
```css
.riffgen-page             /* Page background gradient */
.riffgen-settings-panel   /* Glass morphism card */
.riffgen-root-selector    /* Grid of root note buttons */
.riffgen-pattern-card     /* Pattern selection cards */
.riffgen-tab-output       /* Monospace tab display */
.riffgen-fretboard        /* Reuse scale-trainer fretboard styles */
```

---

## Phase 4: Files to Modify

| File | Action | Lines Changed |
|------|--------|---------------|
| `src/pages/RiffGenerator.jsx` | Major refactor | 1221 → ~350 |
| `src/components/riffgen/InteractiveFretboard.jsx` | CREATE | ~100 |
| `src/components/riffgen/PlaybackControls.jsx` | CREATE | ~80 |
| `src/components/riffgen/ScaleSettings.jsx` | CREATE | ~100 |
| `src/components/riffgen/PatternSettings.jsx` | CREATE | ~100 |
| `src/components/riffgen/TabDisplay.jsx` | CREATE | ~80 |
| `src/components/riffgen/index.js` | CREATE | ~10 |
| `src/lib/GuitarSynthesizer.js` | CREATE | ~70 |
| `src/lib/midiGenerator.js` | CREATE | ~80 |
| `src/index.css` | ADD elite classes | +150 |

---

## Phase 5: Execution Order

1. **Extract GuitarSynthesizer.js** - No UI changes, establishes pattern
2. **Extract midiGenerator.js** - Pure utilities
3. **Create riffgen/ directory** - Component structure
4. **Extract InteractiveFretboard.jsx** - Most complex UI piece
5. **Extract PlaybackControls.jsx** - DAW controls section
6. **Extract ScaleSettings.jsx** - Left panel top
7. **Extract PatternSettings.jsx** - Left panel bottom
8. **Extract TabDisplay.jsx** - Right panel bottom
9. **Add elite CSS** - Visual polish
10. **Remove premium code** - Simplification
11. **Refactor RiffGenerator.jsx** - Final orchestrator
12. **Test + Deploy**

---

## Success Criteria

- [ ] RiffGenerator.jsx < 400 lines
- [ ] 6+ extracted components in riffgen/
- [ ] Elite styling matches ScaleTrainer quality
- [ ] No premium gating (all features free)
- [ ] No unused code (MiniFretboard deleted)
- [ ] Build passes
- [ ] All playback features work
- [ ] Deployed to production

---

## Visual Proof Target

**URL:** https://guitar.projectlavos.com/riff-generator

**User Experience:**
- Rosewood fretboard with glowing notes
- Glass morphism control panels
- DAW-style playback bar
- All patterns/scales unlocked
- Clean, professional appearance matching rest of site

---

## Risk Mitigation

- **Test playback after each extraction** - Audio is fragile
- **Keep GuitarSynthesizer API identical** - Don't break playTab()
- **URL params must still work** - Test shareable links

---

**Estimated Effort:** 2-3 hours
**Complexity:** Medium-High (audio + state + modularization)
