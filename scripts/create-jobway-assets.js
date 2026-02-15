const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = process.argv[2] || '/Users/matthewscott/Projects/job-search-automation/frontend/public';

// Brand colors
const SLATE_900 = '#0f172a';
const SLATE_800 = '#1e293b';
const SLATE_700 = '#334155';
const SLATE_600 = '#475569';
const SLATE_400 = '#94a3b8';
const TEAL_500 = '#14b8a6';
const TEAL_400 = '#2dd4bf';
const TEAL_300 = '#5eead4';
const ORANGE_500 = '#f97316';
const ORANGE_400 = '#fb923c';
const WHITE = '#f8fafc';

// ============================================================
// FAVICON - Abstract "J" mark with radar/signal aesthetic
// ============================================================
function createFavicon(size, outputPath) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const s = size; // shorthand
  const cx = s / 2;
  const cy = s / 2;

  // Background - dark with subtle radial gradient
  const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, s * 0.7);
  bgGrad.addColorStop(0, '#162032');
  bgGrad.addColorStop(1, SLATE_900);
  ctx.fillStyle = bgGrad;

  // Rounded rect background
  const r = s * 0.18;
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(s - r, 0);
  ctx.quadraticCurveTo(s, 0, s, r);
  ctx.lineTo(s, s - r);
  ctx.quadraticCurveTo(s, s, s - r, s);
  ctx.lineTo(r, s);
  ctx.quadraticCurveTo(0, s, 0, s - r);
  ctx.lineTo(0, r);
  ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath();
  ctx.fill();

  // Subtle grid lines for "command center" feel (only on larger sizes)
  if (size >= 32) {
    ctx.strokeStyle = 'rgba(20, 184, 166, 0.06)';
    ctx.lineWidth = Math.max(0.5, s * 0.01);
    for (let i = 1; i < 6; i++) {
      const pos = (s / 6) * i;
      ctx.beginPath();
      ctx.moveTo(pos, s * 0.1);
      ctx.lineTo(pos, s * 0.9);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(s * 0.1, pos);
      ctx.lineTo(s * 0.9, pos);
      ctx.stroke();
    }
  }

  // The "J" mark - constructed from geometric elements
  // Main vertical stroke of J
  const strokeW = s * 0.16;
  const jLeft = s * 0.38;
  const jTop = s * 0.18;
  const jBottom = s * 0.68;

  // Teal gradient for the J
  const jGrad = ctx.createLinearGradient(jLeft, jTop, jLeft + strokeW, jBottom + s * 0.14);
  jGrad.addColorStop(0, TEAL_300);
  jGrad.addColorStop(0.5, TEAL_500);
  jGrad.addColorStop(1, TEAL_400);

  ctx.fillStyle = jGrad;

  // Draw J as a path - vertical bar + curved bottom
  ctx.beginPath();
  // Top of J (with a slight serif/widening)
  const serifExtra = s * 0.08;
  ctx.moveTo(jLeft - serifExtra, jTop);
  ctx.lineTo(jLeft + strokeW + serifExtra, jTop);
  ctx.lineTo(jLeft + strokeW + serifExtra, jTop + strokeW * 0.45);
  ctx.lineTo(jLeft + strokeW, jTop + strokeW * 0.45);
  // Vertical stroke down
  ctx.lineTo(jLeft + strokeW, jBottom);
  // Curved bottom of J
  const curveRadius = s * 0.18;
  ctx.quadraticCurveTo(
    jLeft + strokeW, jBottom + curveRadius * 1.2,
    jLeft + strokeW - curveRadius * 1.4, jBottom + curveRadius * 1.2
  );
  // The hook going left
  ctx.lineTo(jLeft - serifExtra * 0.5, jBottom + curveRadius * 1.2);
  ctx.lineTo(jLeft - serifExtra * 0.5, jBottom + curveRadius * 1.2 - strokeW * 0.5);
  ctx.lineTo(jLeft + strokeW - curveRadius * 1.1, jBottom + curveRadius * 1.2 - strokeW * 0.5);
  ctx.quadraticCurveTo(
    jLeft, jBottom + curveRadius * 0.4,
    jLeft, jBottom
  );
  // Back up
  ctx.lineTo(jLeft, jTop + strokeW * 0.45);
  ctx.lineTo(jLeft - serifExtra, jTop + strokeW * 0.45);
  ctx.closePath();
  ctx.fill();

  // Orange accent dot - "signal" indicator (top right)
  const dotR = s * 0.06;
  const dotX = s * 0.76;
  const dotY = s * 0.24;

  // Glow effect
  if (size >= 32) {
    const glowGrad = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, dotR * 3);
    glowGrad.addColorStop(0, 'rgba(249, 115, 22, 0.4)');
    glowGrad.addColorStop(1, 'rgba(249, 115, 22, 0)');
    ctx.fillStyle = glowGrad;
    ctx.fillRect(dotX - dotR * 3, dotY - dotR * 3, dotR * 6, dotR * 6);
  }

  ctx.fillStyle = ORANGE_500;
  ctx.beginPath();
  ctx.arc(dotX, dotY, dotR, 0, Math.PI * 2);
  ctx.fill();

  // Small teal arc/signal waves emanating from top-right (radar feel)
  if (size >= 32) {
    ctx.strokeStyle = 'rgba(20, 184, 166, 0.2)';
    ctx.lineWidth = Math.max(0.5, s * 0.015);
    for (let i = 1; i <= 2; i++) {
      ctx.beginPath();
      ctx.arc(dotX, dotY, dotR + s * 0.06 * i, -Math.PI * 0.8, -Math.PI * 0.1);
      ctx.stroke();
    }
  }

  // Save
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  console.log(`  Created: ${outputPath} (${size}x${size})`);
}

// ============================================================
// OG IMAGE - 1200x630 dark command center aesthetic
// ============================================================
function createOGImage(outputPath) {
  const W = 1200;
  const H = 630;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // === BACKGROUND ===
  // Deep dark base
  ctx.fillStyle = SLATE_900;
  ctx.fillRect(0, 0, W, H);

  // Subtle radial gradient - warm center glow
  const centerGlow = ctx.createRadialGradient(W * 0.35, H * 0.45, 0, W * 0.35, H * 0.45, W * 0.6);
  centerGlow.addColorStop(0, 'rgba(20, 184, 166, 0.04)');
  centerGlow.addColorStop(0.5, 'rgba(20, 184, 166, 0.02)');
  centerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = centerGlow;
  ctx.fillRect(0, 0, W, H);

  // === GRID PATTERN - command center feel ===
  ctx.strokeStyle = 'rgba(20, 184, 166, 0.04)';
  ctx.lineWidth = 1;
  const gridSize = 40;
  for (let x = 0; x <= W; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y <= H; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  // Brighter crosshair lines
  ctx.strokeStyle = 'rgba(20, 184, 166, 0.08)';
  ctx.lineWidth = 1;
  // Horizontal emphasis line
  ctx.beginPath();
  ctx.moveTo(0, H * 0.5);
  ctx.lineTo(W, H * 0.5);
  ctx.stroke();
  // Vertical emphasis
  ctx.beginPath();
  ctx.moveTo(W * 0.38, 0);
  ctx.lineTo(W * 0.38, H);
  ctx.stroke();

  // === DECORATIVE ELEMENTS - right side dashboard mockup ===
  // Simulated dashboard cards (right side)
  const cardX = W * 0.6;
  const cardY = H * 0.12;
  const cardW = W * 0.34;
  const cardH = H * 0.76;

  // Card background with border
  ctx.fillStyle = 'rgba(30, 41, 59, 0.6)';
  ctx.strokeStyle = 'rgba(51, 65, 85, 0.5)';
  ctx.lineWidth = 1;
  roundRect(ctx, cardX, cardY, cardW, cardH, 12);
  ctx.fill();
  ctx.stroke();

  // Mini KPI cards inside
  const miniCards = [
    { label: 'ACTIVE JOBS', value: '81', color: TEAL_500 },
    { label: 'APPLIED', value: '25', color: TEAL_400 },
    { label: 'INTERVIEWS', value: '8', color: ORANGE_500 },
    { label: 'RESPONSE', value: '14%', color: ORANGE_400 },
  ];

  const mcW = (cardW - 36) / 2;
  const mcH = 52;
  miniCards.forEach((mc, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const mx = cardX + 12 + col * (mcW + 12);
    const my = cardY + 16 + row * (mcH + 10);

    // Mini card bg
    ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.4)';
    ctx.lineWidth = 0.5;
    roundRect(ctx, mx, my, mcW, mcH, 6);
    ctx.fill();
    ctx.stroke();

    // Label
    ctx.fillStyle = SLATE_400;
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(mc.label, mx + 10, my + 18);

    // Value
    ctx.fillStyle = mc.color;
    ctx.font = 'bold 22px monospace';
    ctx.fillText(mc.value, mx + 10, my + 42);
  });

  // Simulated bar chart
  const chartY = cardY + 148;
  const chartH = 100;
  const barW = 18;
  const barGap = 8;
  const bars = [0.4, 0.7, 0.55, 0.9, 0.65, 0.8, 0.45, 0.6, 0.75, 0.5, 0.85, 0.7];
  const chartX = cardX + 20;

  bars.forEach((h, i) => {
    const bx = chartX + i * (barW + barGap);
    const bh = h * chartH;
    const by = chartY + chartH - bh;

    const barGrad = ctx.createLinearGradient(bx, by, bx, by + bh);
    barGrad.addColorStop(0, i % 3 === 0 ? ORANGE_500 : TEAL_500);
    barGrad.addColorStop(1, i % 3 === 0 ? 'rgba(249,115,22,0.3)' : 'rgba(20,184,166,0.3)');
    ctx.fillStyle = barGrad;
    roundRect(ctx, bx, by, barW, bh, 3);
    ctx.fill();
  });

  // Chart baseline
  ctx.strokeStyle = 'rgba(51, 65, 85, 0.5)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(chartX - 4, chartY + chartH + 2);
  ctx.lineTo(chartX + bars.length * (barW + barGap), chartY + chartH + 2);
  ctx.stroke();

  // Simulated list items below chart
  const listY = chartY + chartH + 24;
  for (let i = 0; i < 5; i++) {
    const ly = listY + i * 28;
    // Status dot
    const dotColors = [TEAL_500, ORANGE_500, TEAL_400, TEAL_500, ORANGE_400];
    ctx.fillStyle = dotColors[i];
    ctx.beginPath();
    ctx.arc(cardX + 22, ly + 6, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Line placeholder
    const lineW = [160, 120, 180, 140, 155][i];
    ctx.fillStyle = 'rgba(148, 163, 184, 0.15)';
    roundRect(ctx, cardX + 36, ly + 1, lineW, 10, 3);
    ctx.fill();

    // Badge placeholder
    ctx.fillStyle = i < 2 ? 'rgba(20, 184, 166, 0.15)' : 'rgba(71, 85, 105, 0.2)';
    roundRect(ctx, cardX + cardW - 70, ly, 50, 12, 3);
    ctx.fill();
  }

  // === LEFT SIDE - Brand content ===

  // Decorative teal line accent (vertical, left edge)
  const accentGrad = ctx.createLinearGradient(42, H * 0.15, 42, H * 0.85);
  accentGrad.addColorStop(0, 'rgba(20, 184, 166, 0)');
  accentGrad.addColorStop(0.3, TEAL_500);
  accentGrad.addColorStop(0.7, TEAL_500);
  accentGrad.addColorStop(1, 'rgba(20, 184, 166, 0)');
  ctx.strokeStyle = accentGrad;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(42, H * 0.15);
  ctx.lineTo(42, H * 0.85);
  ctx.stroke();

  // Small orange indicator on the line
  ctx.fillStyle = ORANGE_500;
  ctx.beginPath();
  ctx.arc(42, H * 0.38, 5, 0, Math.PI * 2);
  ctx.fill();

  // "JOBWAY" - main title
  ctx.textAlign = 'left';

  // Letter-spaced title effect using monospace bold
  const titleY = H * 0.38;
  const titleX = 72;

  // Title with glow
  ctx.shadowColor = 'rgba(20, 184, 166, 0.3)';
  ctx.shadowBlur = 30;
  ctx.fillStyle = WHITE;
  ctx.font = 'bold 72px "Helvetica Neue", Helvetica, sans-serif';
  ctx.fillText('JOBWAY', titleX, titleY);
  ctx.shadowBlur = 0;

  // Teal underline accent
  const titleMetrics = ctx.measureText('JOBWAY');
  const ulY = titleY + 12;
  const ulGrad = ctx.createLinearGradient(titleX, ulY, titleX + titleMetrics.width * 0.6, ulY);
  ulGrad.addColorStop(0, TEAL_500);
  ulGrad.addColorStop(1, 'rgba(20, 184, 166, 0)');
  ctx.strokeStyle = ulGrad;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(titleX, ulY);
  ctx.lineTo(titleX + titleMetrics.width * 0.6, ulY);
  ctx.stroke();

  // Tagline
  ctx.fillStyle = SLATE_400;
  ctx.font = '20px "Helvetica Neue", Helvetica, sans-serif';
  ctx.fillText('AI-Powered Job Search Automation', titleX, titleY + 44);

  // Feature pills
  const pills = ['ATS Optimizer', 'Email Tracking', 'Smart Follow-ups', 'Analytics'];
  let pillX = titleX;
  const pillY = titleY + 80;

  pills.forEach((pill, i) => {
    const pillMetrics = ctx.measureText(pill);
    const pw = pillMetrics.width + 20;
    const ph = 28;

    // Pill background
    ctx.fillStyle = i === 0 ? 'rgba(20, 184, 166, 0.15)' : 'rgba(51, 65, 85, 0.3)';
    ctx.strokeStyle = i === 0 ? 'rgba(20, 184, 166, 0.3)' : 'rgba(51, 65, 85, 0.4)';
    ctx.lineWidth = 1;
    roundRect(ctx, pillX, pillY, pw, ph, 14);
    ctx.fill();
    ctx.stroke();

    // Pill text
    ctx.fillStyle = i === 0 ? TEAL_400 : SLATE_400;
    ctx.font = '13px "Helvetica Neue", Helvetica, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(pill, pillX + pw / 2, pillY + 18);
    ctx.textAlign = 'left';

    pillX += pw + 10;
  });

  // URL at bottom
  ctx.fillStyle = SLATE_600;
  ctx.font = '14px monospace';
  ctx.fillText('jobtrack.projectlavos.com', titleX, H - 40);

  // Small teal dot before URL
  ctx.fillStyle = TEAL_500;
  ctx.beginPath();
  ctx.arc(titleX - 12, H - 44, 3, 0, Math.PI * 2);
  ctx.fill();

  // === TOP-RIGHT corner decoration ===
  // Radar-like concentric arcs
  const radarX = W - 60;
  const radarY = 60;
  ctx.strokeStyle = 'rgba(20, 184, 166, 0.06)';
  ctx.lineWidth = 1;
  for (let i = 1; i <= 4; i++) {
    ctx.beginPath();
    ctx.arc(radarX, radarY, 20 * i, Math.PI * 0.5, Math.PI * 1.1);
    ctx.stroke();
  }
  ctx.fillStyle = ORANGE_500;
  ctx.beginPath();
  ctx.arc(radarX, radarY, 4, 0, Math.PI * 2);
  ctx.fill();

  // === BORDER ===
  ctx.strokeStyle = 'rgba(51, 65, 85, 0.4)';
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, W - 1, H - 1);

  // Inner accent border - top
  const topBorderGrad = ctx.createLinearGradient(0, 0, W, 0);
  topBorderGrad.addColorStop(0, 'rgba(20, 184, 166, 0)');
  topBorderGrad.addColorStop(0.2, 'rgba(20, 184, 166, 0.4)');
  topBorderGrad.addColorStop(0.5, 'rgba(20, 184, 166, 0.1)');
  topBorderGrad.addColorStop(1, 'rgba(20, 184, 166, 0)');
  ctx.strokeStyle = topBorderGrad;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 1);
  ctx.lineTo(W, 1);
  ctx.stroke();

  // Save
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  console.log(`  Created: ${outputPath} (${W}x${H})`);
}

// Helper: rounded rectangle
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ============================================================
// GENERATE ALL ASSETS
// ============================================================
console.log('\nGenerating Jobway brand assets...\n');

// Ensure output dir exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Favicons
createFavicon(16, path.join(OUTPUT_DIR, 'favicon-16x16.png'));
createFavicon(32, path.join(OUTPUT_DIR, 'favicon-32x32.png'));
createFavicon(180, path.join(OUTPUT_DIR, 'apple-touch-icon.png'));
createFavicon(192, path.join(OUTPUT_DIR, 'favicon-192x192.png'));
createFavicon(512, path.join(OUTPUT_DIR, 'favicon-512x512.png'));

// OG Image
createOGImage(path.join(OUTPUT_DIR, 'og-image.png'));

console.log('\nAll assets generated successfully.');
console.log(`Output directory: ${OUTPUT_DIR}\n`);
