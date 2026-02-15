#!/usr/bin/env node
/**
 * create-article-section-images.js
 * Generates rectangular section header images for "The Quiet Trade" article.
 * Each section gets a visually distinct atmospheric banner in the article's
 * plum/slate-blue/gold palette with unique accent geometry.
 *
 * Uses the same Canvas API + seeded PRNG pattern as create-cinematic-og.js.
 *
 * Usage:
 *   node create-article-section-images.js                    # All sections
 *   node create-article-section-images.js --section opening  # Single section
 *   node create-article-section-images.js --output ./custom-dir/
 */

const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Font Registration
// ---------------------------------------------------------------------------
registerFont('/System/Library/Fonts/Supplemental/Didot.ttc', { family: 'Didot' });
registerFont('/System/Library/Fonts/Supplemental/Georgia.ttf', { family: 'Georgia' });

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const W = 1200;
const H = 400;

// Palette -- matches the_quiet_trade.tex
const PLUM = '#1A0A2E';
const PLUM_DEEP = '#110720';
const SLATE = '#4A6FA5';
const SLATE_BRIGHT = '#6B8FCC';
const GOLD = '#D4A853';
const GOLD_LIGHT = '#F5E6C8';

// ---------------------------------------------------------------------------
// Seeded PRNG (mulberry32)
// ---------------------------------------------------------------------------
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------------------------------------------------------------------------
// Color helpers
// ---------------------------------------------------------------------------
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

function lerpColor(hex1, hex2, t) {
  const c1 = hexToRgb(hex1);
  const c2 = hexToRgb(hex2);
  const r = Math.round(c1.r + (c2.r - c1.r) * t);
  const g = Math.round(c1.g + (c2.g - c1.g) * t);
  const b = Math.round(c1.b + (c2.b - c1.b) * t);
  return `rgb(${r},${g},${b})`;
}

// ---------------------------------------------------------------------------
// Shared base layer -- all sections start here
// ---------------------------------------------------------------------------
function renderBase(ctx) {
  ctx.fillStyle = PLUM_DEEP;
  ctx.fillRect(0, 0, W, H);

  // Edge vignette
  const vigT = ctx.createLinearGradient(0, 0, 0, 60);
  vigT.addColorStop(0, rgba('#000000', 0.35));
  vigT.addColorStop(1, 'transparent');
  ctx.fillStyle = vigT;
  ctx.fillRect(0, 0, W, 60);

  const vigB = ctx.createLinearGradient(0, H - 60, 0, H);
  vigB.addColorStop(0, 'transparent');
  vigB.addColorStop(1, rgba('#000000', 0.35));
  ctx.fillStyle = vigB;
  ctx.fillRect(0, H - 60, W, 60);

  const vigL = ctx.createLinearGradient(0, 0, 50, 0);
  vigL.addColorStop(0, rgba('#000000', 0.20));
  vigL.addColorStop(1, 'transparent');
  ctx.fillStyle = vigL;
  ctx.fillRect(0, 0, 50, H);

  const vigR = ctx.createLinearGradient(W - 50, 0, W, 0);
  vigR.addColorStop(0, 'transparent');
  vigR.addColorStop(1, rgba('#000000', 0.20));
  ctx.fillStyle = vigR;
  ctx.fillRect(W - 50, 0, 50, H);
}

// ---------------------------------------------------------------------------
// Corner accents (shared, subtle)
// ---------------------------------------------------------------------------
function renderCorners(ctx, color1, color2, opacity) {
  ctx.strokeStyle = rgba(color1, opacity);
  ctx.lineWidth = 1;
  // Top right
  ctx.beginPath();
  ctx.moveTo(W - 30, 20);
  ctx.lineTo(W - 30, 50);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(W - 30, 20);
  ctx.lineTo(W - 60, 20);
  ctx.stroke();
  // Bottom left
  ctx.strokeStyle = rgba(color2, opacity * 0.85);
  ctx.beginPath();
  ctx.moveTo(30, H - 20);
  ctx.lineTo(30, H - 50);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(30, H - 20);
  ctx.lineTo(60, H - 20);
  ctx.stroke();
}

// ---------------------------------------------------------------------------
// Section title overlay
// ---------------------------------------------------------------------------
function renderTitle(ctx, title, subtitle) {
  // Title
  ctx.font = 'bold 36px Georgia';
  ctx.fillStyle = rgba('#ffffff', 0.92);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(title, W / 2, H / 2 - (subtitle ? 12 : 0));

  // Subtitle
  if (subtitle) {
    ctx.font = '16px Georgia';
    ctx.fillStyle = rgba(SLATE_BRIGHT, 0.65);
    ctx.fillText(subtitle, W / 2, H / 2 + 28);
  }

  // Gold rule
  ctx.strokeStyle = rgba(GOLD, 0.50);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 60, H / 2 + 50);
  ctx.lineTo(W / 2 + 60, H / 2 + 50);
  ctx.stroke();
}

// ===========================================================================
// SECTION 1: THE QUIET TRADE (Opening) -- Concentric interference rings
// ===========================================================================
function renderOpening(ctx, rng) {
  renderBase(ctx);

  // Large slate glow -- center
  const g1 = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 450);
  g1.addColorStop(0, rgba(SLATE, 0.22));
  g1.addColorStop(0.5, rgba(SLATE, 0.06));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Gold warmth -- lower right
  const g2 = ctx.createRadialGradient(W * 0.75, H + 50, 0, W * 0.75, H + 50, 300);
  g2.addColorStop(0, rgba(GOLD, 0.14));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  // Concentric interference rings
  const cx = W * 0.42;
  const cy = H * 0.48;
  for (let i = 0; i < 8; i++) {
    const r = 40 + i * 45;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(SLATE, 0.12 - i * 0.012);
    ctx.lineWidth = 0.7;
    ctx.stroke();
  }

  // Second ring origin (interference)
  const cx2 = W * 0.62;
  const cy2 = H * 0.55;
  for (let i = 0; i < 6; i++) {
    const r = 50 + i * 50;
    ctx.beginPath();
    ctx.arc(cx2, cy2, r, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(GOLD, 0.08 - i * 0.01);
    ctx.lineWidth = 0.6;
    ctx.stroke();
  }

  // Sparse particles
  for (let i = 0; i < 30; i++) {
    const x = rng() * W;
    const y = rng() * H;
    ctx.beginPath();
    ctx.arc(x, y, 1 + rng() * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = rgba(SLATE_BRIGHT, 0.03 + rng() * 0.05);
    ctx.fill();
  }

  renderCorners(ctx, SLATE, GOLD, 0.22);
  renderTitle(ctx, 'The Quiet Trade', null);
}

// ===========================================================================
// SECTION 2: THE SHIFT -- Diagonal fracture lines
// ===========================================================================
function renderShift(ctx, rng) {
  renderBase(ctx);

  // Asymmetric glows
  const g1 = ctx.createRadialGradient(W * 0.3, H * 0.3, 0, W * 0.3, H * 0.3, 350);
  g1.addColorStop(0, rgba(SLATE, 0.18));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  const g2 = ctx.createRadialGradient(W * 0.8, H * 0.7, 0, W * 0.8, H * 0.7, 280);
  g2.addColorStop(0, rgba(GOLD, 0.12));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  // Diagonal fracture lines -- the "shift"
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 12; i++) {
    const x1 = rng() * W * 0.4;
    const y1 = rng() * H;
    const angle = -0.35 + rng() * 0.15;
    const len = 200 + rng() * 400;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 + Math.cos(angle) * len, y1 + Math.sin(angle) * len);
    ctx.strokeStyle = rgba(SLATE_BRIGHT, 0.04 + rng() * 0.06);
    ctx.lineWidth = 0.5 + rng() * 0.8;
    ctx.stroke();
  }
  ctx.restore();

  // Horizontal measurement rule
  ctx.strokeStyle = rgba('#ffffff', 0.04);
  ctx.lineWidth = 0.3;
  ctx.beginPath();
  ctx.moveTo(80, H * 0.25);
  ctx.lineTo(W - 80, H * 0.25);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(80, H * 0.75);
  ctx.lineTo(W - 80, H * 0.75);
  ctx.stroke();

  renderCorners(ctx, SLATE, GOLD, 0.20);
  renderTitle(ctx, 'The Shift', 'From execution to evaluation');
}

// ===========================================================================
// SECTION 3: THE SECOND PRICE -- Data stream / signal flow
// ===========================================================================
function renderSecondPrice(ctx, rng) {
  renderBase(ctx);

  // Deep violet glow
  const g1 = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.4, 400);
  g1.addColorStop(0, rgba('#2E1A4A', 0.30));
  g1.addColorStop(0.6, rgba(PLUM, 0.10));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Gold signal line running horizontally
  const g2 = ctx.createRadialGradient(W * 0.6, H * 0.6, 0, W * 0.6, H * 0.6, 250);
  g2.addColorStop(0, rgba(GOLD, 0.16));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  // Data stream -- vertical dashed lines
  for (let i = 0; i < 20; i++) {
    const x = 100 + rng() * (W - 200);
    const segments = 3 + Math.floor(rng() * 5);
    ctx.strokeStyle = rgba(SLATE, 0.04 + rng() * 0.06);
    ctx.lineWidth = 0.5;
    for (let s = 0; s < segments; s++) {
      const y1 = rng() * H;
      const y2 = y1 + 10 + rng() * 30;
      ctx.beginPath();
      ctx.moveTo(x, y1);
      ctx.lineTo(x, Math.min(y2, H));
      ctx.stroke();
    }
  }

  // Horizontal signal paths (Bezier)
  for (let i = 0; i < 4; i++) {
    const y = H * 0.2 + i * (H * 0.2);
    ctx.strokeStyle = rgba(GOLD, 0.05 + rng() * 0.04);
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(W * 0.3, y - 30 + rng() * 60, W * 0.7, y - 30 + rng() * 60, W, y);
    ctx.stroke();
  }

  // Node dots at intersections
  for (let i = 0; i < 15; i++) {
    const x = 100 + rng() * (W - 200);
    const y = 50 + rng() * (H - 100);
    ctx.beginPath();
    ctx.arc(x, y, 2 + rng() * 2, 0, Math.PI * 2);
    ctx.fillStyle = rgba(GOLD, 0.08 + rng() * 0.08);
    ctx.fill();
  }

  renderCorners(ctx, SLATE, GOLD, 0.18);
  renderTitle(ctx, 'The Second Price', 'Data you didn\'t know you were paying');
}

// ===========================================================================
// SECTION 4: COGNITIVE DIMENSION -- Neural drift / dissolution
// ===========================================================================
function renderCognitive(ctx, rng) {
  renderBase(ctx);

  // Central brain-like glow
  const g1 = ctx.createRadialGradient(W * 0.45, H * 0.5, 0, W * 0.45, H * 0.5, 300);
  g1.addColorStop(0, rgba(SLATE, 0.25));
  g1.addColorStop(0.4, rgba(SLATE, 0.08));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Warm dissolution on right side
  const g2 = ctx.createRadialGradient(W * 0.85, H * 0.5, 0, W * 0.85, H * 0.5, 250);
  g2.addColorStop(0, rgba(GOLD, 0.10));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  // Neural network -- connected nodes
  const nodes = [];
  for (let i = 0; i < 25; i++) {
    nodes.push({ x: 100 + rng() * (W - 200), y: 40 + rng() * (H - 80) });
  }

  // Connections (nearest neighbors)
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        const fade = 1 - dist / 200;
        // Left side: slate (clear thinking). Right side: gold (dissolution)
        const t = (nodes[i].x + nodes[j].x) / (2 * W);
        const color = t < 0.5 ? SLATE : GOLD;
        ctx.strokeStyle = rgba(color, fade * 0.08);
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }

  // Nodes themselves
  for (const n of nodes) {
    const t = n.x / W;
    const color = t < 0.5 ? SLATE_BRIGHT : GOLD;
    const opacity = t < 0.5 ? 0.15 : 0.10;
    ctx.beginPath();
    ctx.arc(n.x, n.y, 2 + rng() * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = rgba(color, opacity);
    ctx.fill();
  }

  renderCorners(ctx, SLATE, GOLD, 0.20);
  renderTitle(ctx, 'Beyond Privacy', 'The cognitive dimension');
}

// ===========================================================================
// SECTION 5: GENERATIONAL DIVIDE -- Strata / geological layers
// ===========================================================================
function renderGenerational(ctx, rng) {
  renderBase(ctx);

  // Slate glow top, gold glow bottom
  const g1 = ctx.createLinearGradient(0, 0, 0, H);
  g1.addColorStop(0, rgba(SLATE, 0.15));
  g1.addColorStop(0.5, 'transparent');
  g1.addColorStop(1, rgba(GOLD, 0.12));
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Geological strata -- horizontal curves with slight wave
  const layers = [
    { y: H * 0.25, color: SLATE, opacity: 0.10 },
    { y: H * 0.40, color: SLATE_BRIGHT, opacity: 0.07 },
    { y: H * 0.55, color: GOLD, opacity: 0.06 },
    { y: H * 0.70, color: GOLD, opacity: 0.08 },
    { y: H * 0.85, color: GOLD_LIGHT, opacity: 0.05 },
  ];

  for (const layer of layers) {
    ctx.strokeStyle = rgba(layer.color, layer.opacity);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, layer.y);
    for (let x = 0; x <= W; x += 10) {
      const wave = Math.sin(x * 0.008 + layer.y * 0.02) * 12 + Math.sin(x * 0.015) * 5;
      ctx.lineTo(x, layer.y + wave);
    }
    ctx.stroke();

    // Subtle fill below each stratum
    ctx.fillStyle = rgba(layer.color, layer.opacity * 0.3);
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.closePath();
    ctx.fill();
  }

  // Sparse sediment particles
  for (let i = 0; i < 40; i++) {
    const x = rng() * W;
    const y = rng() * H;
    const t = y / H;
    const color = t < 0.5 ? SLATE : GOLD;
    ctx.beginPath();
    ctx.arc(x, y, 0.8 + rng() * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = rgba(color, 0.03 + rng() * 0.04);
    ctx.fill();
  }

  renderCorners(ctx, SLATE, GOLD, 0.18);
  renderTitle(ctx, 'The Generational Divide', 'Before and after the tool');
}

// ===========================================================================
// SECTION 6: THE WINDOW -- Aperture / closing iris
// ===========================================================================
function renderWindow(ctx, rng) {
  renderBase(ctx);

  // Central bright glow -- the window of opportunity
  const g1 = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 200);
  g1.addColorStop(0, rgba(GOLD_LIGHT, 0.18));
  g1.addColorStop(0.3, rgba(GOLD, 0.10));
  g1.addColorStop(0.6, rgba(SLATE, 0.06));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Iris aperture blades -- converging arcs
  const blades = 8;
  for (let i = 0; i < blades; i++) {
    const angle = (i / blades) * Math.PI * 2;
    const innerR = 80;
    const outerR = 280;
    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.arc(0, 0, outerR, -0.15, 0.15);
    ctx.arc(0, 0, innerR, 0.15, -0.15, true);
    ctx.closePath();
    ctx.strokeStyle = rgba(SLATE, 0.09 - i * 0.005);
    ctx.lineWidth = 0.7;
    ctx.stroke();
    ctx.restore();
  }

  // Time-pressure lines converging toward center
  for (let i = 0; i < 16; i++) {
    const angle = rng() * Math.PI * 2;
    const startR = 250 + rng() * 200;
    const endR = 60 + rng() * 40;
    const sx = W / 2 + Math.cos(angle) * startR;
    const sy = H / 2 + Math.sin(angle) * startR;
    const ex = W / 2 + Math.cos(angle) * endR;
    const ey = H / 2 + Math.sin(angle) * endR;
    ctx.strokeStyle = rgba(GOLD, 0.03 + rng() * 0.04);
    ctx.lineWidth = 0.4;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.stroke();
  }

  renderCorners(ctx, SLATE, GOLD, 0.22);
  renderTitle(ctx, 'The Window', 'It will close through habituation');
}

// ===========================================================================
// SECTION 7: DECISIONS -- Grid / decision matrix
// ===========================================================================
function renderDecisions(ctx, rng) {
  renderBase(ctx);

  // Slate glow -- structured
  const g1 = ctx.createRadialGradient(W * 0.4, H * 0.5, 0, W * 0.4, H * 0.5, 400);
  g1.addColorStop(0, rgba(SLATE, 0.16));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Gold accent glow
  const g2 = ctx.createRadialGradient(W * 0.7, H * 0.3, 0, W * 0.7, H * 0.3, 200);
  g2.addColorStop(0, rgba(GOLD, 0.10));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  // Decision grid -- faint structural lines
  ctx.strokeStyle = rgba(SLATE, 0.04);
  ctx.lineWidth = 0.3;
  for (let x = 100; x < W - 100; x += 80) {
    ctx.beginPath();
    ctx.moveTo(x, 60);
    ctx.lineTo(x, H - 60);
    ctx.stroke();
  }
  for (let y = 60; y < H - 60; y += 60) {
    ctx.beginPath();
    ctx.moveTo(100, y);
    ctx.lineTo(W - 100, y);
    ctx.stroke();
  }

  // Highlighted cells (some decisions glow)
  for (let i = 0; i < 8; i++) {
    const gx = 100 + Math.floor(rng() * 13) * 80;
    const gy = 60 + Math.floor(rng() * 5) * 60;
    ctx.fillStyle = rgba(GOLD, 0.04 + rng() * 0.04);
    ctx.fillRect(gx, gy, 80, 60);
  }

  // Connecting arcs between highlighted cells
  for (let i = 0; i < 5; i++) {
    const x1 = 200 + rng() * (W - 400);
    const y1 = 100 + rng() * (H - 200);
    const x2 = 200 + rng() * (W - 400);
    const y2 = 100 + rng() * (H - 200);
    ctx.strokeStyle = rgba(SLATE_BRIGHT, 0.05);
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(x1 + 50, y1 - 30, x2 - 50, y2 + 30, x2, y2);
    ctx.stroke();
  }

  renderCorners(ctx, SLATE, GOLD, 0.22);
  renderTitle(ctx, 'Decisions Available to You', null);
}

// ===========================================================================
// SECTION 8: THE TERMS (Closing) -- Horizon line / signature
// ===========================================================================
function renderClosing(ctx, rng) {
  renderBase(ctx);

  // Wide horizontal glow -- horizon
  const g1 = ctx.createRadialGradient(W / 2, H * 0.6, 0, W / 2, H * 0.6, 500);
  g1.addColorStop(0, rgba(GOLD, 0.14));
  g1.addColorStop(0.3, rgba(SLATE, 0.06));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Horizon line
  ctx.strokeStyle = rgba(GOLD, 0.18);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(80, H * 0.6);
  ctx.lineTo(W - 80, H * 0.6);
  ctx.stroke();

  // Above: clear slate atmosphere
  const g2 = ctx.createLinearGradient(0, 0, 0, H * 0.6);
  g2.addColorStop(0, rgba(SLATE, 0.08));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H * 0.6);

  // Below: warm gold undertone
  const g3 = ctx.createLinearGradient(0, H * 0.6, 0, H);
  g3.addColorStop(0, 'transparent');
  g3.addColorStop(1, rgba(GOLD, 0.06));
  ctx.fillStyle = g3;
  ctx.fillRect(0, H * 0.6, W, H * 0.4);

  // Diminishing ripples from horizon
  for (let i = 0; i < 5; i++) {
    const r = 60 + i * 80;
    ctx.beginPath();
    ctx.ellipse(W / 2, H * 0.6, r * 2.5, r * 0.3, 0, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(GOLD, 0.06 - i * 0.01);
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  // Sparse stars above horizon
  for (let i = 0; i < 20; i++) {
    const x = rng() * W;
    const y = rng() * H * 0.55;
    ctx.beginPath();
    ctx.arc(x, y, 0.5 + rng() * 1, 0, Math.PI * 2);
    ctx.fillStyle = rgba('#ffffff', 0.03 + rng() * 0.05);
    ctx.fill();
  }

  renderCorners(ctx, SLATE, GOLD, 0.20);
  renderTitle(ctx, 'The Terms', 'The window for reading them is open');
}

// ===========================================================================
// Section registry
// ===========================================================================
const SECTIONS = {
  opening:      { render: renderOpening,     seed: 42,   file: '01-the-quiet-trade.png' },
  shift:        { render: renderShift,       seed: 137,  file: '02-the-shift.png' },
  second_price: { render: renderSecondPrice, seed: 271,  file: '03-the-second-price.png' },
  cognitive:    { render: renderCognitive,    seed: 389,  file: '04-cognitive-dimension.png' },
  generational: { render: renderGenerational, seed: 503,  file: '05-generational-divide.png' },
  window:       { render: renderWindow,      seed: 619,  file: '06-the-window.png' },
  decisions:    { render: renderDecisions,    seed: 743,  file: '07-decisions.png' },
  closing:      { render: renderClosing,     seed: 857,  file: '08-the-terms.png' },
};

// ===========================================================================
// CLI
// ===========================================================================
function main() {
  const args = process.argv.slice(2);
  let sectionFilter = null;
  let outputDir = path.join(__dirname, '..', '..', 'Projects', 'texume', 'output', 'quiet-trade-sections');

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--section' && args[i + 1]) sectionFilter = args[++i];
    if (args[i] === '--output' && args[i + 1]) outputDir = args[++i];
  }

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const entries = sectionFilter
    ? { [sectionFilter]: SECTIONS[sectionFilter] }
    : SECTIONS;

  if (sectionFilter && !SECTIONS[sectionFilter]) {
    console.error(`Unknown section: ${sectionFilter}`);
    console.error(`Available: ${Object.keys(SECTIONS).join(', ')}`);
    process.exit(1);
  }

  console.log(`\nGenerating section images (${W}x${H}) ...\n`);

  for (const [name, config] of Object.entries(entries)) {
    const canvas = createCanvas(W, H);
    const ctx = canvas.getContext('2d');
    const rng = mulberry32(config.seed);

    config.render(ctx, rng);

    const outPath = path.join(outputDir, config.file);
    const buf = canvas.toBuffer('image/png');
    fs.writeFileSync(outPath, buf);
    console.log(`  ${config.file} (${(buf.length / 1024).toFixed(0)} KB)`);
  }

  console.log(`\nDone. Output: ${outputDir}\n`);
}

main();
