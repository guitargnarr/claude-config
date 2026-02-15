#!/usr/bin/env node
/**
 * create-article-fullpage-images.js
 * Generates full-page background images for "The Quiet Trade" article.
 * Each section gets a letter-page-ratio (8.5x11) atmospheric background
 * designed to have white/cream text overlaid on top.
 *
 * V2: Much stronger accent geometry (3-4x opacity), richer glows,
 *     bolder strokes. Art should be clearly visible, not just "dark purple."
 *
 * Usage:
 *   node create-article-fullpage-images.js
 *   node create-article-fullpage-images.js --section opening
 */

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
const W = 1700;
const H = 2200;

// Palette
const PLUM = '#1A0A2E';
const PLUM_DEEP = '#110720';
const PLUM_MID = '#251545';   // NEW: lighter plum for variety
const SLATE = '#4A6FA5';
const SLATE_BRIGHT = '#6B8FCC';
const SLATE_LIGHT = '#8AAEE0'; // NEW: brighter accent
const GOLD = '#D4A853';
const GOLD_LIGHT = '#F5E6C8';

// ---------------------------------------------------------------------------
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hexToRgb(hex) {
  return { r: parseInt(hex.slice(1, 3), 16), g: parseInt(hex.slice(3, 5), 16), b: parseInt(hex.slice(5, 7), 16) };
}

function rgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ---------------------------------------------------------------------------
// Shared base -- slightly lifted from pure black, softer vignettes
// ---------------------------------------------------------------------------
function renderBase(ctx) {
  // Gradient base instead of flat color -- adds depth
  const bg = ctx.createLinearGradient(0, 0, W * 0.3, H);
  bg.addColorStop(0, '#160B28');
  bg.addColorStop(0.5, PLUM_DEEP);
  bg.addColorStop(1, '#0F0618');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Softer vignettes (reduced from 0.40 to 0.22)
  const vigT = ctx.createLinearGradient(0, 0, 0, H * 0.06);
  vigT.addColorStop(0, rgba('#000000', 0.22));
  vigT.addColorStop(1, 'transparent');
  ctx.fillStyle = vigT;
  ctx.fillRect(0, 0, W, H * 0.06);

  const vigB = ctx.createLinearGradient(0, H * 0.94, 0, H);
  vigB.addColorStop(0, 'transparent');
  vigB.addColorStop(1, rgba('#000000', 0.22));
  ctx.fillStyle = vigB;
  ctx.fillRect(0, H * 0.94, W, H * 0.06);

  const vigL = ctx.createLinearGradient(0, 0, W * 0.03, 0);
  vigL.addColorStop(0, rgba('#000000', 0.15));
  vigL.addColorStop(1, 'transparent');
  ctx.fillStyle = vigL;
  ctx.fillRect(0, 0, W * 0.03, H);

  const vigR = ctx.createLinearGradient(W * 0.97, 0, W, 0);
  vigR.addColorStop(0, 'transparent');
  vigR.addColorStop(1, rgba('#000000', 0.15));
  ctx.fillStyle = vigR;
  ctx.fillRect(W * 0.97, 0, W * 0.03, H);
}

function renderCorners(ctx) {
  ctx.strokeStyle = rgba(SLATE_BRIGHT, 0.35);
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(W - 50, 35); ctx.lineTo(W - 50, 95); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(W - 50, 35); ctx.lineTo(W - 110, 35); ctx.stroke();
  ctx.strokeStyle = rgba(GOLD, 0.30);
  ctx.beginPath(); ctx.moveTo(50, H - 35); ctx.lineTo(50, H - 95); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(50, H - 35); ctx.lineTo(110, H - 35); ctx.stroke();
}

// ===========================================================================
// 1. OPENING -- Concentric interference rings
// ===========================================================================
function renderOpening(ctx, rng) {
  renderBase(ctx);

  // Large slate glow -- center-left
  const g1 = ctx.createRadialGradient(W * 0.35, H * 0.4, 0, W * 0.35, H * 0.4, H * 0.5);
  g1.addColorStop(0, rgba(SLATE, 0.45));
  g1.addColorStop(0.3, rgba(SLATE, 0.18));
  g1.addColorStop(0.7, rgba(SLATE, 0.05));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);

  // Gold warmth -- lower right
  const g2 = ctx.createRadialGradient(W * 0.75, H * 0.7, 0, W * 0.75, H * 0.7, H * 0.35);
  g2.addColorStop(0, rgba(GOLD, 0.25));
  g2.addColorStop(0.5, rgba(GOLD, 0.08));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);

  // Interference rings -- slate set
  for (let i = 0; i < 12; i++) {
    const r = 50 + i * 60;
    ctx.beginPath(); ctx.arc(W * 0.35, H * 0.38, r, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(SLATE_BRIGHT, 0.25 - i * 0.018);
    ctx.lineWidth = 1.2 + (12 - i) * 0.1; ctx.stroke();
  }
  // Interference rings -- gold set (offset)
  for (let i = 0; i < 8; i++) {
    const r = 70 + i * 65;
    ctx.beginPath(); ctx.arc(W * 0.6, H * 0.45, r, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(GOLD, 0.15 - i * 0.015);
    ctx.lineWidth = 0.8; ctx.stroke();
  }
  // Particles
  for (let i = 0; i < 80; i++) {
    ctx.beginPath(); ctx.arc(rng() * W, rng() * H, 1 + rng() * 3, 0, Math.PI * 2);
    ctx.fillStyle = rgba(rng() > 0.5 ? SLATE_LIGHT : GOLD, 0.06 + rng() * 0.10); ctx.fill();
  }
  renderCorners(ctx);
}

// ===========================================================================
// 2. THE SHIFT -- Diagonal fracture lines
// ===========================================================================
function renderShift(ctx, rng) {
  renderBase(ctx);

  const g1 = ctx.createRadialGradient(W * 0.25, H * 0.3, 0, W * 0.25, H * 0.3, H * 0.45);
  g1.addColorStop(0, rgba(SLATE, 0.40));
  g1.addColorStop(0.4, rgba(SLATE, 0.12));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);

  const g2 = ctx.createRadialGradient(W * 0.8, H * 0.65, 0, W * 0.8, H * 0.65, H * 0.3);
  g2.addColorStop(0, rgba(GOLD, 0.22));
  g2.addColorStop(0.5, rgba(GOLD, 0.06));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);

  // Diagonal fractures -- many more, much bolder
  for (let i = 0; i < 35; i++) {
    const x1 = rng() * W;
    const y1 = rng() * H;
    const angle = -0.5 + rng() * 0.4;
    const len = 200 + rng() * 800;
    ctx.beginPath(); ctx.moveTo(x1, y1);
    ctx.lineTo(x1 + Math.cos(angle) * len, y1 + Math.sin(angle) * len);
    ctx.strokeStyle = rgba(rng() > 0.6 ? GOLD : SLATE_BRIGHT, 0.08 + rng() * 0.14);
    ctx.lineWidth = 0.6 + rng() * 1.2; ctx.stroke();
  }
  // Cross-hatches at fracture intersections
  for (let i = 0; i < 15; i++) {
    const cx = rng() * W; const cy = rng() * H;
    ctx.strokeStyle = rgba(SLATE, 0.06 + rng() * 0.06); ctx.lineWidth = 0.4;
    ctx.beginPath(); ctx.moveTo(cx - 20, cy - 20); ctx.lineTo(cx + 20, cy + 20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx + 20, cy - 20); ctx.lineTo(cx - 20, cy + 20); ctx.stroke();
  }
  // Measurement rules
  ctx.strokeStyle = rgba('#ffffff', 0.08); ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(100, H * 0.12); ctx.lineTo(W - 100, H * 0.12); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(100, H * 0.88); ctx.lineTo(W - 100, H * 0.88); ctx.stroke();
  renderCorners(ctx);
}

// ===========================================================================
// 3. THE SECOND PRICE -- Data streams + signal flow
// ===========================================================================
function renderSecondPrice(ctx, rng) {
  renderBase(ctx);

  const g1 = ctx.createRadialGradient(W * 0.5, H * 0.35, 0, W * 0.5, H * 0.35, H * 0.5);
  g1.addColorStop(0, rgba(PLUM_MID, 0.60));
  g1.addColorStop(0.4, rgba(SLATE, 0.15));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);

  const g2 = ctx.createRadialGradient(W * 0.65, H * 0.6, 0, W * 0.65, H * 0.6, H * 0.3);
  g2.addColorStop(0, rgba(GOLD, 0.28));
  g2.addColorStop(0.5, rgba(GOLD, 0.08));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);

  // Vertical data streams -- bolder
  for (let i = 0; i < 50; i++) {
    const x = 60 + rng() * (W - 120);
    ctx.strokeStyle = rgba(SLATE_BRIGHT, 0.08 + rng() * 0.10); ctx.lineWidth = 0.6 + rng() * 0.5;
    for (let s = 0; s < 8; s++) {
      const y1 = rng() * H; const y2 = y1 + 10 + rng() * 60;
      ctx.beginPath(); ctx.moveTo(x, y1); ctx.lineTo(x, Math.min(y2, H)); ctx.stroke();
    }
  }
  // Horizontal signal paths -- bolder
  for (let i = 0; i < 10; i++) {
    const y = H * 0.08 + i * (H * 0.09);
    ctx.strokeStyle = rgba(GOLD, 0.08 + rng() * 0.08); ctx.lineWidth = 0.8 + rng() * 0.5;
    ctx.beginPath(); ctx.moveTo(0, y);
    ctx.bezierCurveTo(W * 0.25, y - 30 + rng() * 60, W * 0.75, y - 30 + rng() * 60, W, y);
    ctx.stroke();
  }
  // Node dots -- bigger, brighter
  for (let i = 0; i < 40; i++) {
    ctx.beginPath(); ctx.arc(60 + rng() * (W - 120), 50 + rng() * (H - 100), 2.5 + rng() * 4, 0, Math.PI * 2);
    ctx.fillStyle = rgba(rng() > 0.5 ? GOLD : SLATE_LIGHT, 0.12 + rng() * 0.15); ctx.fill();
  }
  renderCorners(ctx);
}

// ===========================================================================
// 4. COGNITIVE DIMENSION -- Neural network
// ===========================================================================
function renderCognitive(ctx, rng) {
  renderBase(ctx);

  const g1 = ctx.createRadialGradient(W * 0.4, H * 0.4, 0, W * 0.4, H * 0.4, H * 0.45);
  g1.addColorStop(0, rgba(SLATE, 0.48));
  g1.addColorStop(0.3, rgba(SLATE, 0.16));
  g1.addColorStop(0.7, rgba(SLATE, 0.04));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);

  const g2 = ctx.createRadialGradient(W * 0.75, H * 0.55, 0, W * 0.75, H * 0.55, H * 0.25);
  g2.addColorStop(0, rgba(GOLD, 0.20));
  g2.addColorStop(0.5, rgba(GOLD, 0.06));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);

  // Neural nodes -- more, spread wider
  const nodes = [];
  for (let i = 0; i < 60; i++) {
    nodes.push({ x: 40 + rng() * (W - 80), y: 40 + rng() * (H - 80) });
  }
  // Connections -- stronger
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x; const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 320) {
        const fade = 1 - dist / 320;
        const t = (nodes[i].x + nodes[j].x) / (2 * W);
        ctx.strokeStyle = rgba(t < 0.5 ? SLATE_BRIGHT : GOLD, fade * 0.18);
        ctx.lineWidth = 0.6 + fade * 0.8;
        ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
      }
    }
  }
  // Node dots -- much brighter
  for (const n of nodes) {
    const t = n.x / W;
    const size = 3 + rng() * 4;
    // Glow
    const ng = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, size * 3);
    ng.addColorStop(0, rgba(t < 0.5 ? SLATE_LIGHT : GOLD, 0.20));
    ng.addColorStop(1, 'transparent');
    ctx.fillStyle = ng; ctx.fillRect(n.x - size * 3, n.y - size * 3, size * 6, size * 6);
    // Core
    ctx.beginPath(); ctx.arc(n.x, n.y, size, 0, Math.PI * 2);
    ctx.fillStyle = rgba(t < 0.5 ? SLATE_BRIGHT : GOLD, t < 0.5 ? 0.30 : 0.22); ctx.fill();
  }
  renderCorners(ctx);
}

// ===========================================================================
// 5. GENERATIONAL DIVIDE -- Geological strata
// ===========================================================================
function renderGenerational(ctx, rng) {
  renderBase(ctx);

  // Stronger gradient
  const g1 = ctx.createLinearGradient(0, 0, 0, H);
  g1.addColorStop(0, rgba(SLATE, 0.30));
  g1.addColorStop(0.3, rgba(SLATE, 0.08));
  g1.addColorStop(0.5, 'transparent');
  g1.addColorStop(0.7, rgba(GOLD, 0.08));
  g1.addColorStop(1, rgba(GOLD, 0.25));
  ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);

  const layers = [
    { y: H * 0.15, color: SLATE_BRIGHT, opacity: 0.22 },
    { y: H * 0.28, color: SLATE, opacity: 0.18 },
    { y: H * 0.42, color: SLATE_LIGHT, opacity: 0.14 },
    { y: H * 0.55, color: GOLD, opacity: 0.16 },
    { y: H * 0.68, color: GOLD, opacity: 0.18 },
    { y: H * 0.80, color: GOLD_LIGHT, opacity: 0.12 },
    { y: H * 0.90, color: GOLD, opacity: 0.15 },
  ];
  for (const layer of layers) {
    // Thicker strokes
    ctx.strokeStyle = rgba(layer.color, layer.opacity); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, layer.y);
    for (let x = 0; x <= W; x += 8) {
      const wave = Math.sin(x * 0.005 + layer.y * 0.012) * 22 + Math.sin(x * 0.015) * 10;
      ctx.lineTo(x, layer.y + wave);
    }
    ctx.stroke();
    // Stronger fill below each strata line
    ctx.fillStyle = rgba(layer.color, layer.opacity * 0.35);
    ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill();
  }
  // More particles, brighter
  for (let i = 0; i < 100; i++) {
    const x = rng() * W; const y = rng() * H;
    ctx.beginPath(); ctx.arc(x, y, 1 + rng() * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = rgba(y / H < 0.5 ? SLATE_LIGHT : GOLD, 0.06 + rng() * 0.08); ctx.fill();
  }
  renderCorners(ctx);
}

// ===========================================================================
// 6. THE WINDOW -- Aperture / closing iris
// ===========================================================================
function renderWindow(ctx, rng) {
  renderBase(ctx);

  // Central golden glow -- much stronger
  const g1 = ctx.createRadialGradient(W / 2, H * 0.4, 0, W / 2, H * 0.4, H * 0.35);
  g1.addColorStop(0, rgba(GOLD_LIGHT, 0.35));
  g1.addColorStop(0.2, rgba(GOLD, 0.20));
  g1.addColorStop(0.5, rgba(SLATE, 0.10));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);

  // Iris blades -- bolder
  const blades = 12;
  for (let i = 0; i < blades; i++) {
    const angle = (i / blades) * Math.PI * 2;
    ctx.save(); ctx.translate(W / 2, H * 0.4); ctx.rotate(angle);
    ctx.beginPath();
    ctx.arc(0, 0, 420, -0.14, 0.14);
    ctx.arc(0, 0, 100, 0.14, -0.14, true);
    ctx.closePath();
    ctx.strokeStyle = rgba(SLATE_BRIGHT, 0.18 - i * 0.006); ctx.lineWidth = 1.2; ctx.stroke();
    ctx.fillStyle = rgba(SLATE, 0.04); ctx.fill();
    ctx.restore();
  }
  // Converging lines -- brighter
  for (let i = 0; i < 30; i++) {
    const angle = rng() * Math.PI * 2;
    const startR = 400 + rng() * 400;
    const endR = 60 + rng() * 60;
    ctx.strokeStyle = rgba(rng() > 0.5 ? GOLD : SLATE_BRIGHT, 0.06 + rng() * 0.10); ctx.lineWidth = 0.5 + rng() * 0.5;
    ctx.beginPath();
    ctx.moveTo(W / 2 + Math.cos(angle) * startR, H * 0.4 + Math.sin(angle) * startR);
    ctx.lineTo(W / 2 + Math.cos(angle) * endR, H * 0.4 + Math.sin(angle) * endR);
    ctx.stroke();
  }
  // Concentric thin rings around iris
  for (let i = 0; i < 6; i++) {
    const r = 450 + i * 50;
    ctx.beginPath(); ctx.arc(W / 2, H * 0.4, r, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(GOLD, 0.08 - i * 0.01); ctx.lineWidth = 0.5; ctx.stroke();
  }
  renderCorners(ctx);
}

// ===========================================================================
// 7. DECISIONS -- Grid / decision matrix
// ===========================================================================
function renderDecisions(ctx, rng) {
  renderBase(ctx);

  const g1 = ctx.createRadialGradient(W * 0.4, H * 0.4, 0, W * 0.4, H * 0.4, H * 0.5);
  g1.addColorStop(0, rgba(SLATE, 0.35));
  g1.addColorStop(0.4, rgba(SLATE, 0.10));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);

  const g2 = ctx.createRadialGradient(W * 0.7, H * 0.3, 0, W * 0.7, H * 0.3, H * 0.25);
  g2.addColorStop(0, rgba(GOLD, 0.20));
  g2.addColorStop(0.5, rgba(GOLD, 0.06));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);

  // Grid -- more visible
  ctx.strokeStyle = rgba(SLATE, 0.08); ctx.lineWidth = 0.5;
  for (let x = 100; x < W - 100; x += 90) {
    ctx.beginPath(); ctx.moveTo(x, 60); ctx.lineTo(x, H - 60); ctx.stroke();
  }
  for (let y = 60; y < H - 60; y += 70) {
    ctx.beginPath(); ctx.moveTo(100, y); ctx.lineTo(W - 100, y); ctx.stroke();
  }
  // Highlighted cells -- brighter
  for (let i = 0; i < 20; i++) {
    const gx = 100 + Math.floor(rng() * 16) * 90;
    const gy = 60 + Math.floor(rng() * 28) * 70;
    ctx.fillStyle = rgba(rng() > 0.6 ? GOLD : SLATE, 0.06 + rng() * 0.08);
    ctx.fillRect(gx, gy, 90, 70);
  }
  // Connecting arcs -- stronger
  for (let i = 0; i < 14; i++) {
    const x1 = 150 + rng() * (W - 300); const y1 = 100 + rng() * (H - 200);
    const x2 = 150 + rng() * (W - 300); const y2 = 100 + rng() * (H - 200);
    ctx.strokeStyle = rgba(rng() > 0.5 ? SLATE_BRIGHT : GOLD, 0.10 + rng() * 0.06);
    ctx.lineWidth = 0.6 + rng() * 0.6;
    ctx.beginPath(); ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(x1 + 80, y1 - 50, x2 - 80, y2 + 50, x2, y2); ctx.stroke();
  }
  renderCorners(ctx);
}

// ===========================================================================
// 8. THE TERMS -- Horizon line
// ===========================================================================
function renderClosing(ctx, rng) {
  renderBase(ctx);

  // Big central gold glow
  const g1 = ctx.createRadialGradient(W / 2, H * 0.48, 0, W / 2, H * 0.48, H * 0.45);
  g1.addColorStop(0, rgba(GOLD, 0.30));
  g1.addColorStop(0.3, rgba(GOLD, 0.12));
  g1.addColorStop(0.6, rgba(SLATE, 0.06));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);

  // Horizon -- bold
  ctx.strokeStyle = rgba(GOLD, 0.40); ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(80, H * 0.48); ctx.lineTo(W - 80, H * 0.48); ctx.stroke();
  // Secondary horizon lines
  ctx.strokeStyle = rgba(GOLD, 0.12); ctx.lineWidth = 0.6;
  ctx.beginPath(); ctx.moveTo(120, H * 0.48 - 8); ctx.lineTo(W - 120, H * 0.48 - 8); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(120, H * 0.48 + 8); ctx.lineTo(W - 120, H * 0.48 + 8); ctx.stroke();

  // Above: slate atmosphere
  const g2 = ctx.createLinearGradient(0, 0, 0, H * 0.48);
  g2.addColorStop(0, rgba(SLATE, 0.18));
  g2.addColorStop(0.5, rgba(SLATE, 0.06));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H * 0.48);

  // Below: gold atmosphere
  const g3 = ctx.createLinearGradient(0, H * 0.48, 0, H);
  g3.addColorStop(0, 'transparent');
  g3.addColorStop(0.5, rgba(GOLD, 0.06));
  g3.addColorStop(1, rgba(GOLD, 0.14));
  ctx.fillStyle = g3; ctx.fillRect(0, H * 0.48, W, H * 0.52);

  // Ripple ellipses -- much stronger
  for (let i = 0; i < 8; i++) {
    const r = 60 + i * 90;
    ctx.beginPath(); ctx.ellipse(W / 2, H * 0.48, r * 2.8, r * 0.3, 0, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(GOLD, 0.14 - i * 0.014); ctx.lineWidth = 0.7; ctx.stroke();
  }
  // Stars above horizon -- brighter
  for (let i = 0; i < 50; i++) {
    const sx = rng() * W; const sy = rng() * H * 0.42;
    const size = 0.6 + rng() * 2;
    ctx.beginPath(); ctx.arc(sx, sy, size, 0, Math.PI * 2);
    ctx.fillStyle = rgba('#ffffff', 0.05 + rng() * 0.10); ctx.fill();
  }
  renderCorners(ctx);
}

// ===========================================================================
const SECTIONS = {
  opening:      { render: renderOpening,      seed: 42,   file: '01-opening.png' },
  shift:        { render: renderShift,        seed: 137,  file: '02-shift.png' },
  second_price: { render: renderSecondPrice,  seed: 271,  file: '03-second-price.png' },
  cognitive:    { render: renderCognitive,     seed: 389,  file: '04-cognitive.png' },
  generational: { render: renderGenerational,  seed: 503,  file: '05-generational.png' },
  window:       { render: renderWindow,       seed: 619,  file: '06-window.png' },
  decisions:    { render: renderDecisions,     seed: 743,  file: '07-decisions.png' },
  closing:      { render: renderClosing,      seed: 857,  file: '08-closing.png' },
};

function main() {
  const args = process.argv.slice(2);
  let sectionFilter = null;
  let outputDir = path.join(__dirname, '..', '..', 'Projects', 'texume', 'output', 'quiet-trade-fullpage');

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--section' && args[i + 1]) sectionFilter = args[++i];
    if (args[i] === '--output' && args[i + 1]) outputDir = args[++i];
  }

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const entries = sectionFilter ? { [sectionFilter]: SECTIONS[sectionFilter] } : SECTIONS;

  if (sectionFilter && !SECTIONS[sectionFilter]) {
    console.error(`Unknown section: ${sectionFilter}\nAvailable: ${Object.keys(SECTIONS).join(', ')}`);
    process.exit(1);
  }

  console.log(`\nGenerating full-page backgrounds (${W}x${H}) ...\n`);

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
