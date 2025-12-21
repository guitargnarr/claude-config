# Guitar Platform - New Features Implementation Plan

## Overview
Build 3 new tools for the guitar platform, all free tier.

| Feature | Route | Effort | Dependencies |
|---------|-------|--------|--------------|
| Backing Tracks | /backing | 1.5-2h | Metronome timing, Soundfont |
| Scale Trainer | /scales | 1.5-2h | FretVision visualization |
| Ear Training | /ear-training | 3-4h | Web Audio API, Tuner patterns |

**Total estimated: 6-8 hours**

---

## Feature 1: Backing Tracks (`/backing`)

### Files to Create
- `services/guitar/src/pages/BackingTracks.jsx`

### Files to Modify
- `services/guitar/src/App.jsx` - Add route
- `services/guitar/src/components/Navigation.jsx` - Add nav link
- `services/guitar/src/pages/Home.jsx` - Add feature card

### Implementation

**Core UI:**
```jsx
// State
const [key, setKey] = useState('C')        // Root note (C, C#, D... B)
const [bpm, setBpm] = useState(100)        // 40-200
const [style, setStyle] = useState('rock') // rock, blues, jazz, pop
const [isPlaying, setIsPlaying] = useState(false)

// Controls
- Key selector: 12 buttons (chromatic)
- BPM slider: 40-200 with tap tempo
- Style dropdown: rock, blues, jazz, pop, funk
- Play/Stop button
```

**Audio Engine (reuse Metronome patterns):**
```javascript
// Web Audio API scheduler (from Metronome.jsx)
const scheduleNote = (time, isDownbeat) => {
  const osc = audioContext.createOscillator()
  const gain = audioContext.createGain()
  osc.frequency.value = isDownbeat ? 1000 : 800
  // ... envelope and connect
}

// Bass line based on chord progression
const PROGRESSIONS = {
  rock: ['I', 'IV', 'V', 'I'],
  blues: ['I', 'I', 'I', 'I', 'IV', 'IV', 'I', 'I', 'V', 'IV', 'I', 'V'],
  jazz: ['ii', 'V', 'I', 'I']
}
```

**Chord-to-Note Mapping:**
```javascript
const CHORD_NOTES = {
  'C': { I: 'C', ii: 'Dm', IV: 'F', V: 'G' },
  'G': { I: 'G', ii: 'Am', IV: 'C', V: 'D' },
  // ... all 12 keys
}
```

### Visual Design
- Match existing Metronome UI style
- Color: orange (new tool color)
- Beat indicator showing current chord
- Progress bar for song structure

---

## Feature 2: Scale Trainer (`/scales`)

### Files to Create
- `services/guitar/src/pages/ScaleTrainer.jsx`
- `services/guitar/src/data/scales.js` (extended scale data)

### Files to Modify
- `services/guitar/src/App.jsx` - Add route
- `services/guitar/src/components/Navigation.jsx` - Add nav link
- `services/guitar/src/pages/Home.jsx` - Add feature card

### Implementation

**Reuse from FretVision:**
```javascript
// From FretVision.jsx (lines 5-40)
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const TUNINGS = { standard: [4, 11, 7, 2, 9, 4] } // E A D G B E
const SCALES = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  // ... existing scales
}
```

**New Practice Modes:**
```jsx
const PRACTICE_MODES = [
  { id: 'ascending', name: 'Ascending', description: 'Play scale low to high' },
  { id: 'descending', name: 'Descending', description: 'Play scale high to low' },
  { id: 'random', name: 'Random Notes', description: 'Play notes in random order' },
  { id: 'intervals', name: 'Intervals', description: 'Skip notes (3rds, 4ths, etc.)' }
]
```

**Core State:**
```jsx
const [rootNote, setRootNote] = useState(0)      // 0-11 (C-B)
const [scaleType, setScaleType] = useState('major')
const [practiceMode, setPracticeMode] = useState('ascending')
const [currentNote, setCurrentNote] = useState(0)  // Index in sequence
const [score, setScore] = useState({ correct: 0, total: 0 })
const [isListening, setIsListening] = useState(false)
```

**Pitch Detection (from Tuner.jsx):**
```javascript
// Reuse autocorrelation algorithm from Tuner.jsx
const detectPitch = (buffer, sampleRate) => {
  // ... autocorrelation implementation
  return frequency
}

// Convert frequency to note
const frequencyToNote = (freq) => {
  const noteNum = 12 * Math.log2(freq / 440) + 69
  return Math.round(noteNum) % 12
}
```

**Gameplay Loop:**
1. Display target note on fretboard (highlighted)
2. User plays note on guitar
3. Microphone detects pitch
4. Compare to expected note
5. Show correct/incorrect feedback
6. Advance to next note
7. Track score (correct/total)

### Visual Design
- Reuse FretVision fretboard visualization
- Highlight current target note in yellow
- Green flash for correct, red for incorrect
- Score display: "8/10 correct"
- Color: teal (new tool color)

---

## Feature 3: Ear Training (`/ear-training`)

### Files to Create
- `services/guitar/src/pages/EarTraining.jsx`
- `services/guitar/src/data/intervals.js`

### Files to Modify
- `services/guitar/src/App.jsx` - Add route
- `services/guitar/src/components/Navigation.jsx` - Add nav link
- `services/guitar/src/pages/Home.jsx` - Add feature card

### Implementation

**Interval Data:**
```javascript
// services/guitar/src/data/intervals.js
export const INTERVALS = [
  { name: 'Minor 2nd', semitones: 1, example: 'Jaws theme' },
  { name: 'Major 2nd', semitones: 2, example: 'Happy Birthday' },
  { name: 'Minor 3rd', semitones: 3, example: 'Greensleeves' },
  { name: 'Major 3rd', semitones: 4, example: 'Oh When the Saints' },
  { name: 'Perfect 4th', semitones: 5, example: 'Here Comes the Bride' },
  { name: 'Tritone', semitones: 6, example: 'Simpsons theme' },
  { name: 'Perfect 5th', semitones: 7, example: 'Star Wars' },
  { name: 'Minor 6th', semitones: 8, example: 'The Entertainer' },
  { name: 'Major 6th', semitones: 9, example: 'NBC chime' },
  { name: 'Minor 7th', semitones: 10, example: 'Star Trek theme' },
  { name: 'Major 7th', semitones: 11, example: 'Take On Me' },
  { name: 'Octave', semitones: 12, example: 'Somewhere Over the Rainbow' }
]
```

**Core State:**
```jsx
const [mode, setMode] = useState('intervals')  // intervals, chords, notes
const [difficulty, setDifficulty] = useState(1) // 1-3
const [currentQuestion, setCurrentQuestion] = useState(null)
const [score, setScore] = useState({ correct: 0, total: 0 })
const [showAnswer, setShowAnswer] = useState(false)
```

**Audio Generation (Web Audio API):**
```javascript
// Play a note at given frequency
const playNote = (frequency, duration = 0.5) => {
  const osc = audioContext.createOscillator()
  const gain = audioContext.createGain()

  osc.type = 'sine'
  osc.frequency.value = frequency
  gain.gain.setValueAtTime(0.5, audioContext.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

  osc.connect(gain)
  gain.connect(audioContext.destination)
  osc.start()
  osc.stop(audioContext.currentTime + duration)
}

// Play interval (two notes)
const playInterval = (baseFreq, semitones) => {
  playNote(baseFreq, 0.5)
  setTimeout(() => {
    playNote(baseFreq * Math.pow(2, semitones / 12), 0.5)
  }, 600)
}
```

**Question Generation:**
```javascript
const generateQuestion = () => {
  const baseNote = 220 + Math.random() * 220  // A3-A4 range
  const interval = INTERVALS[Math.floor(Math.random() * INTERVALS.length)]

  return {
    baseFrequency: baseNote,
    interval: interval,
    options: getRandomOptions(interval, 4)  // 4 multiple choice
  }
}
```

**Difficulty Levels:**
```javascript
const DIFFICULTY = {
  1: { intervals: [0, 5, 7, 12], name: 'Easy (P4, P5, Octave)' },
  2: { intervals: [0, 2, 3, 4, 5, 7, 9, 12], name: 'Medium (Major/Minor)' },
  3: { intervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], name: 'Hard (All)' }
}
```

**Game Modes:**
1. **Intervals** - Hear two notes, identify interval
2. **Chords** - Hear chord, identify quality (Major/Minor/7th)
3. **Notes** - Hear single note, identify name

### Visual Design
- Large "Play" button to hear question
- 4 multiple choice buttons for answers
- Score tracker
- Streak indicator
- Color: pink/magenta (new tool color)

---

## Navigation Update

### Current Nav (6 tools):
```
Home | FretVision | Tab Player | Catalog | Chords | Tuner | Metronome
```

### New Nav (9 tools):
```
Home | FretVision | Tab Player | Catalog | Chords | Tuner | Metronome | Scales | Backing | Ear
```

**Color scheme:**
- Green: FretVision, Catalog
- Blue: Tab Player, Chords
- Purple: Tuner, Metronome
- Teal: Scale Trainer (NEW)
- Orange: Backing Tracks (NEW)
- Pink: Ear Training (NEW)

---

## Home Page Update

Add 3 new feature cards to match existing pattern:

```jsx
// New cards to add
{
  title: 'Scale Trainer',
  description: 'Practice scales with real-time pitch detection',
  icon: '🎯',
  path: '/scales',
  color: 'teal'
},
{
  title: 'Backing Tracks',
  description: 'Practice with key and tempo-matched rhythm tracks',
  icon: '🎸',
  path: '/backing',
  color: 'orange'
},
{
  title: 'Ear Training',
  description: 'Develop your musical ear with interval and chord recognition',
  icon: '👂',
  path: '/ear-training',
  color: 'pink'
}
```

---

## Execution Order

| Step | Task | Time |
|------|------|------|
| 1 | Backing Tracks (simplest, validates audio patterns) | 1.5h |
| 2 | Scale Trainer (builds on FretVision + Tuner) | 1.5h |
| 3 | Ear Training (most complex, uses patterns from 1 & 2) | 3h |
| 4 | Update Nav, Home, routes | 30min |
| 5 | Test all features | 30min |

**Total: ~7 hours**

---

## Critical Files to Read Before Implementation

1. `services/guitar/src/pages/Metronome.jsx` - Audio scheduling pattern
2. `services/guitar/src/pages/FretVision.jsx` - Scale data, fretboard rendering
3. `services/guitar/src/pages/Tuner.jsx` - Pitch detection, microphone access
4. `services/guitar/src/components/Navigation.jsx` - Nav structure
5. `services/guitar/src/pages/Home.jsx` - Feature card pattern
6. `services/guitar/src/App.jsx` - Routing structure

---

## Commit Strategy

3 separate commits (one per feature):
1. `feat(guitar): add backing tracks tool`
2. `feat(guitar): add scale trainer tool`
3. `feat(guitar): add ear training tool`

Each commit includes:
- New page component
- Route addition
- Nav link
- Home card
