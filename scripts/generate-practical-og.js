#!/usr/bin/env node
/**
 * Generate consistent cinematic OG images for Practical Apps section.
 * Style: Dark slate bg, teal accents, app name, tagline, stats, tech pills, URL.
 * Matches FretVision/Jobway design language.
 */

const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// Register system fonts
registerFont('/System/Library/Fonts/Helvetica.ttc', { family: 'Helvetica', weight: 'normal' });
registerFont('/System/Library/Fonts/HelveticaNeue.ttc', { family: 'Helvetica Neue', weight: 'normal' });

const W = 1200;
const H = 630;
const OUTPUT_DIR = '/Users/matthewscott/Projects/projectlavos-monorepo/main-site/public/og-images';

// Seeded PRNG
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const APPS = {
  fretvision: {
    name: 'FretVision',
    tagline: 'See the music. Play the fretboard.',
    stats: [
      { value: '24', label: 'Scale Books' },
      { value: '480', label: 'Exercises' },
      { value: 'MIDI', label: 'Playback' },
    ],
    tech: ['React', 'Python', 'Canvas', 'MIDI'],
    url: 'guitar.projectlavos.com',
    accent: [20, 184, 166],    // teal
    accentBright: [45, 212, 191],
    seed: 42,
    // Custom: fretboard lines
    customBg: 'fretboard',
  },
  meridian: {
    name: 'Meridian',
    tagline: 'Map the opportunity. Find the market.',
    stats: [
      { value: '41,755', label: 'Pharmacies' },
      { value: '50', label: 'States' },
      { value: 'Live', label: 'Data Feed' },
    ],
    tech: ['Next.js', 'TypeScript', 'D3', 'Tailwind'],
    url: 'phishguard-ui.vercel.app',
    accent: [20, 184, 166],
    accentBright: [45, 212, 191],
    seed: 77,
    customBg: 'map',
  },
  jobway: {
    name: 'Jobway',
    tagline: 'AI-powered job search automation.',
    stats: [
      { value: '14.3%', label: 'Response Rate' },
      { value: '30min', label: 'Saved/App' },
      { value: '81', label: 'Jobs Tracked' },
    ],
    tech: ['React', 'FastAPI', 'Gmail', 'NLP'],
    url: 'jobtrack.projectlavos.com',
    accent: [20, 184, 166],
    accentBright: [45, 212, 191],
    seed: 99,
    customBg: 'nodes',
  },
  ourjourney: {
    name: 'OurJourney',
    tagline: 'A private space for two.',
    stats: [
      { value: 'Private', label: 'By Design' },
      { value: '2', label: 'People Only' },
      { value: 'Real', label: 'Memories' },
    ],
    tech: ['React', 'Supabase', 'Vercel'],
    url: 'ourjourney.projectlavos.com',
    accent: [20, 184, 166],
    accentBright: [45, 212, 191],
    seed: 137,
    customBg: 'hearts',
  },
};

function drawDarkGradient(ctx) {
  // Deep slate gradient
  for (let y = 0; y < H; y++) {
    const t = y / H;
    const r = Math.round(8 + t * 7);
    const g = Math.round(12 + t * 8);
    const b = Math.round(24 + t * 12);
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, y, W, 1);
  }
}

function drawParticles(ctx, rng, accent, count) {
  for (let i = 0; i < count; i++) {
    const x = rng() * W;
    const y = rng() * H;
    const size = rng() * 2.5 + 0.5;
    const alpha = rng() * 0.3 + 0.05;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},${alpha})`;
    ctx.fill();
  }
}

function drawFretboardBg(ctx, rng, accent) {
  // Diagonal fretboard lines
  ctx.save();
  ctx.translate(W * 0.15, H * 0.1);
  ctx.rotate(-0.15);

  // Strings
  for (let i = 0; i < 6; i++) {
    const y = i * 45 + 80;
    ctx.beginPath();
    ctx.moveTo(-100, y);
    ctx.lineTo(W * 0.6, y);
    const alpha = 0.08 + (i * 0.015);
    ctx.strokeStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},${alpha})`;
    ctx.lineWidth = 1.5 - i * 0.1;
    ctx.stroke();
  }

  // Frets
  for (let i = 0; i < 14; i++) {
    const x = i * 55 + 20;
    ctx.beginPath();
    ctx.moveTo(x, 60);
    ctx.lineTo(x, 310);
    ctx.strokeStyle = `rgba(180,190,200,0.06)`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Dot inlays
  const dots = [3, 5, 7, 9, 12];
  dots.forEach(fret => {
    const x = fret * 55 - 7;
    const y = 185;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},0.25)`;
    ctx.fill();
  });

  ctx.restore();
  drawParticles(ctx, rng, accent, 40);
}

function drawMapBg(ctx, rng, accent) {
  // Abstract US map silhouette using scattered geometric shapes
  // State-like blocks in a rough US shape
  const blocks = [];
  for (let i = 0; i < 35; i++) {
    const x = 40 + rng() * 380;
    const y = 80 + rng() * 350;
    const w = 20 + rng() * 40;
    const h = 15 + rng() * 35;
    blocks.push({ x, y, w, h });
  }

  blocks.forEach(b => {
    const alpha = rng() * 0.08 + 0.02;
    ctx.fillStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},${alpha})`;
    ctx.fillRect(b.x, b.y, b.w, b.h);
    ctx.strokeStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},${alpha * 0.5})`;
    ctx.lineWidth = 0.5;
    ctx.strokeRect(b.x, b.y, b.w, b.h);
  });

  // Grid lines
  for (let x = 30; x < 440; x += 50) {
    ctx.beginPath();
    ctx.moveTo(x, 60);
    ctx.lineTo(x, 460);
    ctx.strokeStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},0.03)`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }
  for (let y = 60; y < 460; y += 40) {
    ctx.beginPath();
    ctx.moveTo(30, y);
    ctx.lineTo(440, y);
    ctx.strokeStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},0.03)`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  // Data points
  for (let i = 0; i < 20; i++) {
    const x = 60 + rng() * 350;
    const y = 100 + rng() * 300;
    const r = 2 + rng() * 5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},${0.1 + rng() * 0.15})`;
    ctx.fill();
  }

  drawParticles(ctx, rng, accent, 30);
}

function drawNodesBg(ctx, rng, accent) {
  // Connected node graph
  const nodes = [];
  for (let i = 0; i < 12; i++) {
    nodes.push({
      x: 50 + rng() * 400,
      y: 80 + rng() * 400,
      r: 8 + rng() * 18,
    });
  }

  // Connections
  nodes.forEach((n, i) => {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = Math.hypot(n.x - nodes[j].x, n.y - nodes[j].y);
      if (dist < 220) {
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        const alpha = Math.max(0.02, 0.12 - dist / 2000);
        ctx.strokeStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  });

  // Nodes
  nodes.forEach(n => {
    // Glow
    const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 2);
    grad.addColorStop(0, `rgba(${accent[0]},${accent[1]},${accent[2]},0.12)`);
    grad.addColorStop(1, `rgba(${accent[0]},${accent[1]},${accent[2]},0)`);
    ctx.fillStyle = grad;
    ctx.fillRect(n.x - n.r * 2, n.y - n.r * 2, n.r * 4, n.r * 4);

    // Circle
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},0.2)`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  drawParticles(ctx, rng, accent, 30);
}

function drawHeartsBg(ctx, rng, accent) {
  // Floating abstract heart/circle pairs — intimate, not cheesy
  for (let i = 0; i < 18; i++) {
    const x = 40 + rng() * 420;
    const y = 60 + rng() * 480;
    const size = 6 + rng() * 20;
    const alpha = rng() * 0.12 + 0.03;

    // Paired circles (abstract intimacy motif)
    ctx.beginPath();
    ctx.arc(x - size * 0.35, y - size * 0.2, size * 0.55, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},${alpha})`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + size * 0.35, y - size * 0.2, size * 0.55, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},${alpha * 0.8})`;
    ctx.fill();
  }

  // Connecting arcs — like threads between memories
  for (let i = 0; i < 8; i++) {
    const x1 = 60 + rng() * 350;
    const y1 = 100 + rng() * 350;
    const x2 = x1 + 50 + rng() * 150;
    const y2 = y1 + (rng() - 0.5) * 120;
    const cpY = Math.min(y1, y2) - 30 - rng() * 60;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo((x1 + x2) / 2, cpY, x2, y2);
    ctx.strokeStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},${0.04 + rng() * 0.06})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  drawParticles(ctx, rng, accent, 25);
}

function generateOG(key) {
  const app = APPS[key];
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  const rng = mulberry32(app.seed);

  // 1. Dark gradient background
  drawDarkGradient(ctx);

  // 2. Custom background decoration (left side)
  if (app.customBg === 'fretboard') drawFretboardBg(ctx, rng, app.accent);
  else if (app.customBg === 'map') drawMapBg(ctx, rng, app.accent);
  else if (app.customBg === 'nodes') drawNodesBg(ctx, rng, app.accent);
  else if (app.customBg === 'hearts') drawHeartsBg(ctx, rng, app.accent);

  // 3. Subtle vignette
  const vignette = ctx.createRadialGradient(W / 2, H / 2, W * 0.25, W / 2, H / 2, W * 0.7);
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.4)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, W, H);

  // 4. Top accent line
  const lineGrad = ctx.createLinearGradient(W * 0.35, 0, W * 0.85, 0);
  lineGrad.addColorStop(0, `rgba(${app.accent[0]},${app.accent[1]},${app.accent[2]},0)`);
  lineGrad.addColorStop(0.3, `rgba(${app.accent[0]},${app.accent[1]},${app.accent[2]},0.6)`);
  lineGrad.addColorStop(0.7, `rgba(${app.accent[0]},${app.accent[1]},${app.accent[2]},0.6)`);
  lineGrad.addColorStop(1, `rgba(${app.accent[0]},${app.accent[1]},${app.accent[2]},0)`);
  ctx.fillStyle = lineGrad;
  ctx.fillRect(W * 0.35, 0, W * 0.5, 2);

  // --- Right-side content (text starts at x=520) ---
  const textX = 540;

  // 5. App name
  ctx.font = 'bold 72px "Helvetica Neue", Helvetica, sans-serif';
  ctx.fillStyle = '#f0f0f0';
  ctx.textBaseline = 'top';
  ctx.fillText(app.name, textX, 90);

  // 6. Accent rule under name
  const nameWidth = ctx.measureText(app.name).width;
  const ruleGrad = ctx.createLinearGradient(textX, 0, textX + nameWidth, 0);
  ruleGrad.addColorStop(0, `rgb(${app.accentBright[0]},${app.accentBright[1]},${app.accentBright[2]})`);
  ruleGrad.addColorStop(1, `rgba(${app.accent[0]},${app.accent[1]},${app.accent[2]},0.3)`);
  ctx.fillStyle = ruleGrad;
  ctx.fillRect(textX, 172, Math.min(nameWidth, 280), 3);

  // 7. Tagline
  ctx.font = '24px "Helvetica Neue", Helvetica, sans-serif';
  ctx.fillStyle = 'rgba(200,210,220,0.8)';
  ctx.fillText(app.tagline, textX, 195);

  // 8. Tech pills
  ctx.font = '14px "Helvetica Neue", Helvetica, sans-serif';
  let pillX = textX;
  const pillY = 250;
  app.tech.forEach(t => {
    const tw = ctx.measureText(t).width + 20;
    // Pill background
    ctx.beginPath();
    const pr = 10;
    ctx.roundRect(pillX, pillY, tw, 28, pr);
    ctx.fillStyle = `rgba(${app.accent[0]},${app.accent[1]},${app.accent[2]},0.15)`;
    ctx.fill();
    ctx.strokeStyle = `rgba(${app.accent[0]},${app.accent[1]},${app.accent[2]},0.35)`;
    ctx.lineWidth = 1;
    ctx.stroke();
    // Pill text
    ctx.fillStyle = `rgb(${app.accentBright[0]},${app.accentBright[1]},${app.accentBright[2]})`;
    ctx.fillText(t, pillX + 10, pillY + 8);
    pillX += tw + 10;
  });

  // 9. Stats row
  const statsY = 340;
  app.stats.forEach((stat, i) => {
    const sx = textX + i * 190;

    // Value
    ctx.font = 'bold 42px "Helvetica Neue", Helvetica, sans-serif';
    ctx.fillStyle = `rgb(${app.accentBright[0]},${app.accentBright[1]},${app.accentBright[2]})`;
    ctx.fillText(stat.value, sx, statsY);

    // Label
    ctx.font = '15px "Helvetica Neue", Helvetica, sans-serif';
    ctx.fillStyle = 'rgba(180,190,200,0.6)';
    ctx.fillText(stat.label, sx, statsY + 50);
  });

  // 10. URL at bottom right
  ctx.font = '15px "Helvetica Neue", Helvetica, sans-serif';
  ctx.fillStyle = 'rgba(140,150,160,0.5)';
  ctx.textAlign = 'right';
  ctx.fillText(app.url, W - 40, H - 30);
  ctx.textAlign = 'left';

  // 11. Bottom accent line
  const botGrad = ctx.createLinearGradient(W * 0.4, 0, W, 0);
  botGrad.addColorStop(0, `rgba(${app.accent[0]},${app.accent[1]},${app.accent[2]},0)`);
  botGrad.addColorStop(0.5, `rgba(${app.accent[0]},${app.accent[1]},${app.accent[2]},0.3)`);
  botGrad.addColorStop(1, `rgba(${app.accent[0]},${app.accent[1]},${app.accent[2]},0)`);
  ctx.fillStyle = botGrad;
  ctx.fillRect(W * 0.4, H - 2, W * 0.6, 2);

  // Write file
  const outPath = path.join(OUTPUT_DIR, `${key}-og.png`);
  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(outPath, buf);
  console.log(`  Generated: ${outPath} (${(buf.length / 1024).toFixed(0)}K)`);
}

// Generate all three
console.log('Generating Practical Apps OG images...');
Object.keys(APPS).forEach(key => generateOG(key));
console.log('Done.');
