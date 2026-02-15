# Fix Mobile Scrolling for The Quiet Trade

## Context

Mobile scrolling on The Quiet Trade interactive experience doesn't work well. Tested on iPhone 16 Pro Max. The experience uses a custom touch-to-scroll system (`useMobileScroll`) that translates swipe gestures into `window.scrollBy()` calls against a 1600vh scroll spacer. Multiple issues compound to make mobile scrolling feel broken.

## Root Cause Analysis

**Primary: `scroll-behavior: smooth` + custom momentum = double interpolation**
- `index.css:181` sets `scroll-behavior: smooth` globally
- `useMobileScroll.ts:114` calls `window.scrollBy(0, scrollDelta)` which triggers browser smooth-scroll animation
- The hook ALSO runs its own momentum animation loop (`startMomentum` at line 53) with rAF
- Result: two animation systems fight each other -- the browser interpolates scrollBy, and the hook applies friction-based momentum on top. Scrolling feels sluggish, delayed, and unresponsive.

**Secondary: Canvas `touchAction: none` + `pointer-events` conflict**
- `Experience3D.tsx:373` sets `touchAction: "none"` on the canvas wrapper div
- `Experience3D.tsx:389` sets `touchAction: "none"` on the canvas style too
- `index.css:201` has `canvas { touch-action: none }` (triple redundancy)
- The canvas div is `fixed inset-0` covering the full viewport
- R3F's event system (`events` config at line 391-396) intercepts pointer events
- The custom scroll hook attaches to `document` so it does receive touches, but R3F's event system can cause frame drops during touch processing

**Tertiary: Sensitivity too low for 1600vh spacer**
- With `1600vh` spacer on iPhone 16 Pro Max (~932px viewport), total scroll distance is ~14,912px
- `sensitivity: 3.0` means a 100px swipe moves 300px -- requiring ~50 full-screen swipes to complete
- Combined with smooth-scroll interpolation delay, progress feels imperceptible

**Tertiary: framer-motion title animation on mobile**
- Title uses `motion.h1` with `initial={{ opacity: 0, y: 20 }}` (TextOverlay.tsx:144-148)
- Per CLAUDE.md pitfall: framer-motion opacity:0 can silently fail on mobile

## Plan

### Step 1: Remove `scroll-behavior: smooth` for touch devices
**File:** `client/src/index.css` (line 181)

Replace:
```css
html {
  scroll-behavior: smooth;
}
```
With:
```css
@media (pointer: fine) {
  html {
    scroll-behavior: smooth;
  }
}
```
This keeps smooth scrolling for mouse/trackpad users but removes it on touch devices where the custom hook handles motion.

### Step 2: Remove `touchAction: "none"` from canvas wrapper, add `pointer-events: none`
**File:** `client/src/components/Experience3D.tsx`

The canvas is purely decorative (no interactive 3D elements -- no OrbitControls, no click handlers). It should not intercept touch events at all.

- Line 373: Change `touchAction: "none"` to `pointerEvents: "none"` on the wrapper div
- Line 389: Remove `touchAction: "none"` from canvas style
- Lines 391-396: Simplify events config to disable R3F pointer processing entirely: `events={() => ({ enabled: false, priority: 0 })}`

### Step 3: Remove redundant CSS canvas touch-action
**File:** `client/src/index.css` (line 200-203)

Remove:
```css
canvas {
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
}
```
Keep only the `-webkit-tap-highlight-color: transparent` if desired (move to a broader selector).

### Step 4: Increase mobile scroll sensitivity
**File:** `client/src/pages/Home.tsx` (lines 62-67)

Change mobile sensitivity from `3.0` to `4.5` and adjust momentum:
```typescript
useMobileScroll({
  sensitivity: device.isMobile ? 4.5 : 2.5,
  friction: device.isIOS ? 0.92 : 0.90,
  momentumThreshold: 0.2,
  maxVelocity: device.isMobile ? 10 : 8,
});
```
Higher sensitivity = more scroll distance per swipe. Lower friction = momentum decays faster (less floaty). Higher maxVelocity allows faster flick-through.

### Step 5: Fix framer-motion title for mobile
**File:** `client/src/components/TextOverlay.tsx` (lines 144-171)

Replace `motion.h1` and `motion.p` and `motion.div` in the title section with plain HTML elements that use CSS animation instead. Per CLAUDE.md pitfall, framer-motion initial opacity:0 can fail silently on mobile.

Replace with plain elements using CSS `@keyframes` for fade-in, defined in index.css.

### Step 6: Add iOS safe area insets for bottom UI elements
**File:** `client/src/components/TextOverlay.tsx` (line 418)

Change scene indicator bottom from `1.5rem` to `max(1.5rem, env(safe-area-inset-bottom, 0px) + 1rem)` for notched devices.

**File:** `client/src/pages/Home.tsx` (line 143)

Change mobile scroll hint bottom from `6rem` to `max(6rem, env(safe-area-inset-bottom, 0px) + 5rem)`.

### Step 7: Add `touch-action: pan-y` to body for native scroll passthrough
**File:** `client/src/index.css`

Add to the mobile touch section:
```css
@media (pointer: coarse) {
  body {
    touch-action: pan-y;
  }
}
```
This tells the browser to allow vertical panning (scroll) natively on the body, which cooperates with the custom scroll hook rather than fighting it.

## Verification

1. `pnpm build` must pass (zero errors)
2. Start dev server on port 5199
3. Cannot fully test mobile scroll from desktop -- deploy once, then user verifies on iPhone 16 Pro Max
4. Desktop scroll behavior should be unchanged (still smooth)

## Key Files

| File | Changes |
|------|---------|
| `client/src/index.css` | Remove smooth scroll on touch, remove canvas touch-action, add body touch-action pan-y, add CSS fade-in keyframes |
| `client/src/components/Experience3D.tsx` | pointer-events: none on wrapper, disable R3F events |
| `client/src/pages/Home.tsx` | Increase mobile sensitivity/maxVelocity, lower friction |
| `client/src/components/TextOverlay.tsx` | Replace framer-motion title with CSS animation, safe area insets |
