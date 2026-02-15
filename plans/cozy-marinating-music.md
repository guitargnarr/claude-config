# Sprite Generator v5: CT-Quality Pixel Art Rewrite

## Context

v4 sprites have correct proportions (separated legs, organic silhouette, 18 colors) but look flat and boring compared to Chrono Trigger. Side-by-side pixel analysis reveals why:

| Metric | CT Crono | Our Jasper v4 | Target v5 |
|--------|----------|---------------|-----------|
| Horizontal neighbor match | 23% | 52% | <30% |
| Longest same-color run | 6px | 15px | <5px |
| Runs of 3+ same color | ~15 | 69 | <20 |
| Colors | 12 | 18 | 12-14 |
| Hair as % of height | 31% (11/35 rows) | 17% (8/48 rows) | 25%+ (12/48 rows) |
| Palette saturation | BOLD (orange+cyan+crimson) | MUTED (dark purple) | BOLD |

**Root cause:** v4 uses `span()` fills (3-6px of same color). CT places every pixel individually with alternating shades. Our code draws rectangles; CT draws tapestries.

**File modified:** `tools/generate_sprites.py` (complete rewrite of draw functions, ~1200 lines)
**Output:** Same 72 PNGs + 3 .tres + 3 previews (no schema changes)

## New Palette: Bold & Warm (user-selected)

```python
JASPER = {
    # Skin: 3 tones (matching CT skin tones)
    "s3": (248, 200, 152),   # skin light (CT exact)
    "s2": (248, 148, 112),   # skin mid (warm, saturated)
    "s1": (168, 88, 56),     # skin shadow

    # Hair: 3 tones (CT Crono-style orange/crimson)
    "h3": (248, 168, 0),     # hair bright orange
    "h2": (208, 56, 48),     # hair crimson
    "h1": (112, 16, 0),      # hair dark red

    # Tunic: 3 tones -- DEEP BLUE (high contrast vs orange hair)
    "t3": (88, 168, 232),    # tunic highlight (bright blue)
    "t2": (32, 96, 168),     # tunic base (medium blue)
    "t1": (8, 48, 88),       # tunic shadow (dark blue)

    # Cape: 2 tones -- CREAM/WHITE (reads against blue tunic)
    "c2": (232, 216, 192),   # cape light
    "c1": (168, 144, 112),   # cape shadow

    # Dark outline (warm, not black -- CT uses (40,24,32))
    "dk": (40, 24, 32),      # THE darkest color, warm near-black

    # Accent
    "mt": (208, 176, 64),    # gold metal (belt buckle, sword guard)
    "sw": (192, 200, 216),   # sword blade silver
    "wh": (248, 248, 248),   # pure white (eye catchlight, hair spike tips)
}
# Total: 14 colors (CT uses 12)
```

## Architecture: Pixel Tapestry, Not Rectangle Fills

### Core technique: `row()` function with pixel-by-pixel placement

Every row of the sprite is a hand-authored list of (x, color) pairs. NO `span()` fills longer than 2px. Adjacent pixels MUST alternate between 2-3 shades of the same zone.

```python
# BAD (v4 style -- flat fill):
span(i, 10, 20, y, c["t2"])  # 11px of identical blue

# GOOD (v5 -- CT tapestry style):
row(i, y, [(10,t1),(11,t3),(12,t2),(13,t1),(14,t3),(15,t2),
           (16,t1),(17,t3),(18,t2),(19,t1),(20,t3)])
```

### Metric enforcement
After generating each sprite, run a quality check:
- Count horizontal neighbor matches -- must be <30%
- Count runs of 3+ same color -- must be <25
- If either fails, print warning

## Key Changes

### 1. BIGGER, WILDER hair (12+ rows, ~25% of sprite)
CT Crono's hair is 11/35 rows = 31%. It's the most recognizable feature. Our hair needs to:
- Extend from y=0 to y=11 (12 rows)
- Have 3+ sharp asymmetric spikes going different directions
- Mix h3/h2/h1/wh on every row (no 2+ adjacent same color)
- Side locks extending to y=14+
- Walking frames: spikes lean opposite to movement

### 2. Toriyama proportions: bigger head, compact body
- Head+hair: y=0-15 (16 rows = 33% of sprite)
- Body+arms: y=16-28 (13 rows = 27%)
- Legs+boots: y=29-45 (17 rows = 35%)
- Remaining 3 rows (46-47) padding

CT ratio is roughly 35% head, 30% body, 35% legs. Current v4 is 30% head, 25% body, 40% legs.

### 3. NO flat fills anywhere
- Torso: Alternate t1/t2/t3 every pixel like a checkerboard with structure
- Legs: Same -- alternate shades per pixel, not per-row bands
- Hair: Pixel-by-pixel chaos mixing all 3 hair tones + white highlights
- Even boots: alternate dk and boot color

### 4. Bold contrasting palette
- Orange/crimson hair -> skin -> deep blue tunic -> cream cape -> dark boots
- Each zone boundary is a dramatic color shift (like CT: orange hair -> cyan tunic -> olive boots)
- White highlights scattered: hair spike tips, eye catchlight, belt buckle glint

### 5. Broken outlines
- Use dk (40,24,32) NOT on every edge pixel
- Skip outline every 2-3 pixels (broken line effect)
- Some edges defined by color contrast alone (no outline pixel needed)

### 6. Side locks and hair motion
- Front: 2 side locks extending below ears (y=7-14)
- Back: hair cascade dominating upper back
- Walk: hair shifts 1-2px opposite to movement direction per frame

### 7. Cape reads as fabric
- Front: shoulder drapes with alternating c1/c2 per pixel
- Back: large flowing cape with vertical fold lines in alternating shades
- Walk: cape flares on trailing side

### 8. NPC differentiation (same technique, different palettes)
- Villager: Brown hair, tan tunic, no cape, no sword
- Shopkeeper: Blonde hair, navy blue tunic, apron in front

## Execution

Single pass -- rewrite all three draw functions (draw_down, draw_up, draw_left) plus palette. Keep compose_right, animation system, .tres generator, preview generator unchanged.

Each draw function becomes ~150-200 lines of pure `row()` calls -- every pixel specified. This is how CT sprites are drawn: hand-placed, pixel by pixel.

## Verification
1. `python3 tools/generate_sprites.py` -- no errors
2. Run quality metrics on down_idle_0.png:
   - Horizontal neighbor match <30% (CT is 23%)
   - Max same-color run <5px (CT max is 6)
   - Runs of 3+ same color <25
3. View preview PNGs -- DRAMATIC visual difference from v4
4. Side-by-side comparison with CT Crono at 8x scale
5. Kill Godot, clear .godot/imported/, reopen, F5
6. Walk all 4 directions, verify animations look fluid
