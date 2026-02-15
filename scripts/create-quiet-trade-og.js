#!/usr/bin/env node
/**
 * create-quiet-trade-og.js
 * Generates cinematic OG image (1200x630) for "The Quiet Trade" interactive experience.
 * Design: Sacred geometry, cave-to-light duality, amber vs silver-blue.
 *
 * Usage:
 *   node create-quiet-trade-og.js
 */

const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// Font Registration
registerFont('/System/Library/Fonts/Supplemental/Didot.ttc', { family: 'Didot' });
registerFont('/System/Library/Fonts/Supplemental/Georgia.ttf', { family: 'Georgia' });

const W = 1200;
const H = 630;

// Seeded PRNG (mulberry32)
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Colors
const CHARCOAL = '#0a0a0e';
const AMBER = '#d4a574';
const SILVER_BLUE = '#8fa4b8';
const WARM_DARK = '#1a1510';

function generate() {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  const rand = mulberry32(20260215); // Seed: article date

  // ─── Background: Deep charcoal void ───
  ctx.fillStyle = CHARCOAL;
  ctx.fillRect(0, 0, W, H);

  // ─── Subtle noise texture ───
  for (let i = 0; i < 8000; i++) {
    const x = rand() * W;
    const y = rand() * H;
    const a = rand() * 0.03;
    ctx.fillStyle = `rgba(255,255,255,${a})`;
    ctx.fillRect(x, y, 1, 1);
  }

  // ─── Amber radial glow (left side — the panel, certainty) ───
  const amberGlow = ctx.createRadialGradient(W * 0.25, H * 0.45, 0, W * 0.25, H * 0.45, 350);
  amberGlow.addColorStop(0, 'rgba(212,165,116,0.12)');
  amberGlow.addColorStop(0.4, 'rgba(212,165,116,0.06)');
  amberGlow.addColorStop(1, 'rgba(212,165,116,0)');
  ctx.fillStyle = amberGlow;
  ctx.fillRect(0, 0, W, H);

  // ─── Silver-blue radial glow (right side — the opening, ambiguity) ───
  const blueGlow = ctx.createRadialGradient(W * 0.78, H * 0.5, 0, W * 0.78, H * 0.5, 320);
  blueGlow.addColorStop(0, 'rgba(143,164,184,0.10)');
  blueGlow.addColorStop(0.4, 'rgba(143,164,184,0.04)');
  blueGlow.addColorStop(1, 'rgba(143,164,184,0)');
  ctx.fillStyle = blueGlow;
  ctx.fillRect(0, 0, W, H);

  // ─── Sacred geometry: concentric circles (cave-to-light) ───
  const cx = W * 0.5;
  const cy = H * 0.48;
  for (let r = 40; r < 300; r += 30) {
    const alpha = 0.04 - (r / 300) * 0.025;
    if (alpha <= 0) continue;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(212,165,116,${alpha})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  // ─── Radial lines emanating from center ───
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const innerR = 50;
    const outerR = 180 + rand() * 80;
    const alpha = 0.03 + rand() * 0.02;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * innerR, cy + Math.sin(angle) * innerR);
    ctx.lineTo(cx + Math.cos(angle) * outerR, cy + Math.sin(angle) * outerR);
    ctx.strokeStyle = `rgba(143,164,184,${alpha})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  // ─── Subtle grid lines (the map) fading left-to-right ───
  for (let i = 0; i < 20; i++) {
    const y = 80 + i * 25;
    const alpha = 0.015 + rand() * 0.01;
    const startX = W * 0.1 + rand() * W * 0.15;
    const endX = W * 0.5 + rand() * W * 0.3;
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(endX, y);
    ctx.strokeStyle = `rgba(143,164,184,${alpha})`;
    ctx.lineWidth = 0.3;
    ctx.stroke();
  }

  // ─── Scattered particles (amber + blue) ───
  for (let i = 0; i < 120; i++) {
    const x = rand() * W;
    const y = rand() * H;
    const size = rand() * 1.8 + 0.3;
    const isAmber = rand() > 0.45;
    const alpha = 0.08 + rand() * 0.15;

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    if (isAmber) {
      ctx.fillStyle = `rgba(212,165,116,${alpha})`;
    } else {
      ctx.fillStyle = `rgba(143,164,184,${alpha})`;
    }
    ctx.fill();
  }

  // ─── Bezier curves (organic flow — cave walls) ───
  for (let i = 0; i < 4; i++) {
    const startY = H * 0.15 + rand() * H * 0.7;
    const alpha = 0.025 + rand() * 0.015;
    ctx.beginPath();
    ctx.moveTo(-20, startY);
    ctx.bezierCurveTo(
      W * 0.25, startY + (rand() - 0.5) * 120,
      W * 0.75, startY + (rand() - 0.5) * 120,
      W + 20, startY + (rand() - 0.5) * 60
    );
    ctx.strokeStyle = `rgba(212,165,116,${alpha})`;
    ctx.lineWidth = 0.6;
    ctx.stroke();
  }

  // ─── Corner brackets (architectural precision) ───
  const bracketLen = 40;
  const bracketInset = 35;
  const bracketAlpha = 0.12;
  ctx.strokeStyle = `rgba(212,165,116,${bracketAlpha})`;
  ctx.lineWidth = 1;

  // Top-left
  ctx.beginPath();
  ctx.moveTo(bracketInset, bracketInset + bracketLen);
  ctx.lineTo(bracketInset, bracketInset);
  ctx.lineTo(bracketInset + bracketLen, bracketInset);
  ctx.stroke();

  // Top-right
  ctx.beginPath();
  ctx.moveTo(W - bracketInset - bracketLen, bracketInset);
  ctx.lineTo(W - bracketInset, bracketInset);
  ctx.lineTo(W - bracketInset, bracketInset + bracketLen);
  ctx.stroke();

  // Bottom-left
  ctx.beginPath();
  ctx.moveTo(bracketInset, H - bracketInset - bracketLen);
  ctx.lineTo(bracketInset, H - bracketInset);
  ctx.lineTo(bracketInset + bracketLen, H - bracketInset);
  ctx.stroke();

  // Bottom-right
  ctx.beginPath();
  ctx.moveTo(W - bracketInset - bracketLen, H - bracketInset);
  ctx.lineTo(W - bracketInset, H - bracketInset);
  ctx.lineTo(W - bracketInset, H - bracketInset - bracketLen);
  ctx.stroke();

  // ─── Edge vignette ───
  const vignette = ctx.createRadialGradient(W / 2, H / 2, W * 0.25, W / 2, H / 2, W * 0.7);
  vignette.addColorStop(0, 'rgba(10,10,14,0)');
  vignette.addColorStop(1, 'rgba(10,10,14,0.65)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, W, H);

  // ─── Typography ───

  // Eyebrow
  ctx.textAlign = 'center';
  ctx.fillStyle = AMBER;
  ctx.font = '11px Georgia';
  ctx.letterSpacing = '0.2em';
  const eyebrow = 'A N   I N T E R A C T I V E   E X P E R I E N C E';
  ctx.fillText(eyebrow, W / 2, H * 0.32);

  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 62px Didot';
  ctx.fillText('The Quiet Trade', W / 2, H * 0.50);

  // Gold rule under title
  const ruleW = 180;
  const ruleGrad = ctx.createLinearGradient(W / 2 - ruleW / 2, 0, W / 2 + ruleW / 2, 0);
  ruleGrad.addColorStop(0, 'rgba(212,165,116,0)');
  ruleGrad.addColorStop(0.2, 'rgba(212,165,116,0.5)');
  ruleGrad.addColorStop(0.5, 'rgba(212,165,116,0.7)');
  ruleGrad.addColorStop(0.8, 'rgba(212,165,116,0.5)');
  ruleGrad.addColorStop(1, 'rgba(212,165,116,0)');
  ctx.fillStyle = ruleGrad;
  ctx.fillRect(W / 2 - ruleW / 2, H * 0.535, ruleW, 1);

  // Byline
  ctx.fillStyle = 'rgba(143,164,184,0.6)';
  ctx.font = '13px Georgia';
  ctx.fillText('Matthew Scott  |  Project Lavos  |  February 2026', W / 2, H * 0.62);

  // ─── Watermark ───
  ctx.fillStyle = 'rgba(255,255,255,0.18)';
  ctx.font = '10px Georgia';
  ctx.fillText('projectlavos.com', W / 2, H - 18);

  return canvas;
}

// ─── Output ───
const canvas = generate();
const buffer = canvas.toBuffer('image/png');

const outputs = [
  '/Users/matthewscott/Projects/quiet-trade-experience/client/public/og-image.png',
  '/Users/matthewscott/Projects/projectlavos-monorepo/main-site/public/og-images/quiet-trade-og.png',
];

for (const outputPath of outputs) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outputPath, buffer);
  console.log(`Written: ${outputPath}`);
}

console.log('Done.');
