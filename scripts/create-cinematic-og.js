#!/usr/bin/env node
/**
 * create-cinematic-og.js
 * Generates dark cinematic OG images (1200x630) for client sites.
 * Each site gets a visually distinct brand atmosphere -- not just white text on black.
 *
 * Usage:
 *   node create-cinematic-og.js --batch           # All 3 sites
 *   node create-cinematic-og.js --site scout       # Single site
 *   node create-cinematic-og.js --site morgan --output ./test.png
 */

const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Font Registration
// ---------------------------------------------------------------------------
registerFont('/System/Library/Fonts/Supplemental/Didot.ttc', { family: 'Didot' });
registerFont('/System/Library/Fonts/Supplemental/Bodoni 72.ttc', { family: 'Bodoni 72' });
registerFont('/System/Library/Fonts/Supplemental/PTSerif.ttc', { family: 'PT Serif' });
registerFont('/System/Library/Fonts/Supplemental/Georgia.ttf', { family: 'Georgia' });

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const W = 1200;
const H = 630;
const CLIENT_SITES = '/Users/matthewscott/Projects/client-sites';

// ---------------------------------------------------------------------------
// Seeded PRNG (mulberry32) for reproducible particle placement
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
// Site Configurations
// ---------------------------------------------------------------------------
const SITE_CONFIGS = {
  scout: {
    key: 'scout',
    dir: 'scout-aesthetics',
    eyebrow: 'PREMIER MED SPA',
    title: 'Scout Aesthetics',
    tagline: 'Louisville, KY',
    primary: '#c9a0a0',
    secondary: '#e8b0b0',
    dark: '#2a1a1a',
    font: 'Didot',
    accentStyle: 'organic',
    vercelDomain: 'scout-aesthetics.vercel.app',
    ogTitle: 'Scout Aesthetics | Premier Med Spa in Louisville, KY',
    ogDescription: 'Personalized aesthetic treatments by experienced professionals.',
  },
  morgan: {
    key: 'morgan',
    dir: 'morgan-pottinger-mcgarvey',
    eyebrow: 'TRUSTED LEGAL COUNSEL SINCE 1974',
    title: 'Morgan Pottinger\nMcGarvey',
    tagline: 'Louisville, Kentucky Attorneys',
    primary: '#c8a87c',
    secondary: '#2a3d5c',
    dark: '#1a1510',
    font: 'Bodoni 72',
    accentStyle: 'geometric',
    vercelDomain: 'morgan-pottinger-mcgarvey.vercel.app',
    ogTitle: 'Morgan Pottinger McGarvey | Louisville Kentucky Attorneys',
    ogDescription: 'Trusted legal counsel since 1974. Banking, business litigation, personal injury, and real estate law.',
  },
  pillar: {
    key: 'pillar',
    dir: 'pillar-financial-advisors',
    eyebrow: 'WEALTH MANAGEMENT MADE PERSONAL',
    title: 'Pillar Financial\nAdvisors',
    tagline: 'Louisville, KY',
    primary: '#059669',
    secondary: '#6ee7b7',
    dark: '#0a1a14',
    font: 'PT Serif',
    accentStyle: 'growth',
    vercelDomain: 'pillar-financial-advisors.vercel.app',
    ogTitle: 'Pillar Financial Advisors | Wealth Management Made Personal',
    ogDescription: 'Personalized wealth management for pre-retirees and retirees in Louisville, KY.',
  },
  fulltilt: {
    key: 'fulltilt',
    dir: 'full-tilt-gym',
    eyebrow: 'HIGH-INTENSITY FITNESS',
    title: 'Full Tilt Gym',
    tagline: 'Louisville, KY',
    primary: '#f97316',
    secondary: '#fbbf24',
    dark: '#1a1008',
    font: 'Georgia',
    accentStyle: 'energy',
    vercelDomain: 'full-tilt-gym.vercel.app',
    ogTitle: 'Full Tilt Gym | High-Intensity Fitness in Louisville',
    ogDescription: 'Louisville\'s premier high-intensity fitness studio.',
  },
  caviar: {
    key: 'caviar',
    dir: 'caviar-creative-co',
    eyebrow: 'STRATEGY \u00B7 DESIGN \u00B7 STORY',
    title: 'Caviar Creative Co.',
    tagline: 'Louisville, KY',
    primary: '#f97316',
    secondary: '#f5efe6',
    dark: '#0a0a0a',
    font: 'Bodoni 72',
    accentStyle: 'noir',
    vercelDomain: 'caviar-creative-co.vercel.app',
    ogTitle: 'Caviar Creative Co. | Strategy, Design, Story',
    ogDescription: 'Brand protection served up without compromise.',
  },
  tomdrexler: {
    key: 'tomdrexler',
    dir: 'tom-drexler',
    eyebrow: 'RED CARPET TREATMENT SINCE 1982',
    title: 'Tom Drexler',
    tagline: 'Louisville, KY',
    primary: '#c0392b',
    secondary: '#1a3a5c',
    dark: '#0c0808',
    font: 'Georgia',
    accentStyle: 'industrial',
    vercelDomain: 'tom-drexler.vercel.app',
    ogTitle: 'Tom Drexler | Plumbing, Air & Electric',
    ogDescription: 'Louisville\'s Red Carpet Treatment since 1982.',
  },
  halsey: {
    key: 'halsey',
    dir: 'halsey-flats',
    eyebrow: 'ELEVATED LIVING IN ST. MATTHEWS',
    title: 'Halsey Flats',
    tagline: 'St. Matthews, Louisville',
    primary: '#6b8e6b',
    secondary: '#d4c5a9',
    dark: '#0a0d0a',
    font: 'Didot',
    accentStyle: 'architectural',
    vercelDomain: 'halsey-flats.vercel.app',
    ogTitle: 'Halsey Flats | Elevated Living in St. Matthews',
    ogDescription: 'Luxury apartments in St. Matthews, Louisville.',
  },
  springhurst: {
    key: 'springhurst',
    dir: 'springhurst-endo',
    eyebrow: 'EXPERT ENDODONTIC CARE',
    title: 'Springhurst\nEndodontics',
    tagline: 'Louisville, KY',
    primary: '#0d9488',
    secondary: '#93c5fd',
    dark: '#080d0d',
    font: 'PT Serif',
    accentStyle: 'clinical',
    vercelDomain: 'springhurst-endo.vercel.app',
    ogTitle: 'Springhurst Endodontics | Expert Root Canal Care',
    ogDescription: 'Expert root canal care in Louisville, KY.',
  },
  dgv: {
    key: 'dgv',
    dir: 'dgv-services',
    eyebrow: 'MEDICAL BILLING & REVENUE',
    title: 'dGv Services',
    tagline: 'Crestwood, KY',
    primary: '#1e3a5f',
    secondary: '#d4a84b',
    dark: '#08080c',
    font: 'Georgia',
    accentStyle: 'corporate',
    vercelDomain: 'dgv-services.vercel.app',
    ogTitle: 'dGv Services | Medical Billing & Revenue Management',
    ogDescription: 'Expert medical billing and revenue management.',
  },
  uofl: {
    key: 'uofl',
    dir: 'uofl-demo',
    eyebrow: 'EXPLORE LOUISVILLE',
    title: 'University of\nLouisville',
    tagline: 'Louisville, KY',
    primary: '#ad0000',
    secondary: '#ffd700',
    dark: '#0c0808',
    font: 'Georgia',
    accentStyle: 'academic',
    vercelDomain: 'uofl-demo.vercel.app',
    ogTitle: 'University of Louisville | Campus Demo',
    ogDescription: 'University website template demo.',
  },
  holland: {
    key: 'holland',
    dir: 'ky-family-lawyer',
    eyebrow: 'FAMILY LAW WITH COMPASSION',
    title: 'A. Holland Houston',
    tagline: 'Louisville, KY',
    primary: '#d4a017',
    secondary: '#243b53',
    dark: '#0a0a10',
    font: 'Bodoni 72',
    accentStyle: 'scales',
    vercelDomain: 'ky-family-lawyer.vercel.app',
    ogTitle: 'A. Holland Houston | Family Law Attorney Louisville KY',
    ogDescription: 'Compassionate family law services in Louisville.',
  },
  highland: {
    key: 'highland',
    dir: 'highland-cleaners',
    eyebrow: 'LOUISVILLE\'S PREMIER DRY CLEANER SINCE 1944',
    title: 'Highland Cleaners',
    tagline: 'Louisville, KY',
    primary: '#ffc600',
    secondary: '#6b8e23',
    dark: '#0a0a06',
    font: 'Georgia',
    accentStyle: 'fabric',
    vercelDomain: 'highland-cleaners.vercel.app',
    ogTitle: 'Highland Cleaners | Louisville Dry Cleaning Since 1944',
    ogDescription: 'Hand-finished quality with eco-friendly care. 12 locations.',
  },
  lawnco: {
    key: 'lawnco',
    dir: 'lawnco-louisville',
    eyebrow: 'EXPERT LAWN CARE SINCE 1978',
    title: 'Lawnco Louisville',
    tagline: 'Louisville, KY',
    primary: '#16a34a',
    secondary: '#f97316',
    dark: '#060a06',
    font: 'Georgia',
    accentStyle: 'organic',
    vercelDomain: 'lawnco-louisville.vercel.app',
    ogTitle: 'Lawnco Louisville | Expert Lawn Care Since 1978',
    ogDescription: 'Premier landscaping and lawn maintenance for Louisville.',
  },
  regina: {
    key: 'regina',
    dir: 'cleaning-by-regina',
    eyebrow: '25 YEARS OF SPOTLESS SERVICE',
    title: 'Cleaning By Regina',
    tagline: 'Louisville, KY',
    primary: '#0ea5e9',
    secondary: '#f59e0b',
    dark: '#060a0e',
    font: 'PT Serif',
    accentStyle: 'sparkle',
    vercelDomain: 'cleaning-by-regina.vercel.app',
    ogTitle: 'Cleaning By Regina | Louisville Cleaning Service',
    ogDescription: 'Professional residential and commercial cleaning. 25+ years experience.',
  },
  tonini: {
    key: 'tonini',
    dir: 'tonini-church-supply',
    eyebrow: 'SERVING THE SACRED SINCE 1883',
    title: 'Tonini Church\nSupply',
    tagline: 'Cincinnati, OH',
    primary: '#c9a227',
    secondary: '#722f37',
    dark: '#0a0808',
    font: 'Bodoni 72',
    accentStyle: 'gothic',
    vercelDomain: 'tonini-church-supply.vercel.app',
    ogTitle: 'Tonini Church Supply | Sacred Goods Since 1883',
    ogDescription: 'Five generations of quality church goods, vestments, and sacred art.',
  },
  tasteful: {
    key: 'tasteful',
    dir: 'tasteful-travels',
    eyebrow: 'GLOBAL FLAVORS \u00B7 KENTUCKY SOUL',
    title: 'Tasteful Travels',
    tagline: 'Logan Street Market, Louisville',
    primary: '#C75B39',
    secondary: '#1D6B6B',
    dark: '#0c0806',
    font: 'Didot',
    accentStyle: 'spice',
    vercelDomain: 'tasteful-travels.vercel.app',
    ogTitle: 'Tasteful Travels | Global Flavors, Kentucky Soul',
    ogDescription: 'Specialty foods from around the world at Logan Street Market.',
  },
  kentuckiana: {
    key: 'kentuckiana',
    dir: 'kentuckiana-gastro',
    eyebrow: 'EXPERT GASTROENTEROLOGY CARE',
    title: 'Kentuckiana\nGastroenterology',
    tagline: 'Louisville, KY',
    primary: '#1E5A8D',
    secondary: '#48A89C',
    dark: '#06080c',
    font: 'PT Serif',
    accentStyle: 'clinical',
    vercelDomain: 'kentuckiana-gastro.vercel.app',
    ogTitle: 'Kentuckiana Gastroenterology | Louisville GI Specialists',
    ogDescription: 'Board-certified gastroenterology specialists serving Louisville since 1984.',
  },
  kuhn: {
    key: 'kuhn',
    dir: 'kuhn-allergy',
    eyebrow: 'BREATHE EASIER WITH EXPERT CARE',
    title: 'Dr. Forrest S.\nKuhn, MD',
    tagline: 'Louisville, KY',
    primary: '#0284c7',
    secondary: '#22c55e',
    dark: '#060a0c',
    font: 'PT Serif',
    accentStyle: 'clinical',
    vercelDomain: 'kuhn-allergy.vercel.app',
    ogTitle: 'Dr. Forrest S. Kuhn, MD | Louisville Allergist',
    ogDescription: 'Board-certified allergist with 30+ years experience.',
  },
  clementine: {
    key: 'clementine',
    dir: 'clementine-cater',
    eyebrow: 'BESPOKE CATERING \u00B7 HISTORIC VENUE',
    title: 'Clementine\nCatering',
    tagline: 'Louisville, Kentucky',
    primary: '#c8a04e',
    secondary: '#2d5016',
    dark: '#0a0806',
    font: 'Didot',
    accentStyle: 'chandelier',
    vercelDomain: 'clementine-cater.vercel.app',
    ogTitle: 'Clementine Catering | Bespoke Catering at Peterson-Dumesnil House',
    ogDescription: 'Seasonal menus crafted from local ingredients. Served in an 1869 Italian villa on four acres of historic grounds.',
  },
  crestborne: {
    key: 'crestborne',
    dir: 'crestborne-private-office',
    eyebrow: 'INDEPENDENT WEALTH ADVISORY',
    title: 'Crestborne\nPrivate Office',
    tagline: 'Singapore \u00B7 Hong Kong \u00B7 Dubai',
    primary: '#8a9e8f',
    secondary: '#a3b5a8',
    dark: '#080e1a',
    font: 'Georgia',
    accentStyle: 'geometric',
    vercelDomain: 'crestborne-private-office.vercel.app',
    ogTitle: 'Crestborne Private Office | Independent Wealth Advisory',
    ogDescription: 'Independent wealth advisory for ultra-high-net-worth families across Asia-Pacific and the Middle East.',
  },
};

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

// ===========================================================================
// SCOUT AESTHETICS -- Warm rose atmosphere, organic flowing forms
// ===========================================================================
function renderScout(ctx, config, rng) {
  // Base: deep warm black
  ctx.fillStyle = '#0c0808';
  ctx.fillRect(0, 0, W, H);

  // Large rose glow -- bottom center
  const g1 = ctx.createRadialGradient(W / 2, H + 80, 0, W / 2, H + 80, 500);
  g1.addColorStop(0, rgba(config.primary, 0.25));
  g1.addColorStop(0.5, rgba(config.primary, 0.08));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Secondary glow -- top left
  const g2 = ctx.createRadialGradient(200, -100, 0, 200, -100, 400);
  g2.addColorStop(0, rgba(config.secondary, 0.12));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  // Concentric rings (visible, brand-colored)
  const cx = W / 2;
  const cy = H / 2;
  for (let i = 0; i < 6; i++) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((i * Math.PI) / 5 + 0.2);
    ctx.beginPath();
    ctx.ellipse(0, 0, 180 + i * 55, 80 + i * 35, 0, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(config.primary, 0.15 - i * 0.015);
    ctx.lineWidth = 0.8;
    ctx.stroke();
    ctx.restore();
  }

  // Flowing bezier curves
  ctx.strokeStyle = rgba(config.secondary, 0.12);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, H * 0.6);
  ctx.bezierCurveTo(W * 0.25, H * 0.3, W * 0.75, H * 0.7, W, H * 0.4);
  ctx.stroke();

  ctx.strokeStyle = rgba(config.primary, 0.08);
  ctx.beginPath();
  ctx.moveTo(0, H * 0.7);
  ctx.bezierCurveTo(W * 0.3, H * 0.5, W * 0.6, H * 0.8, W, H * 0.55);
  ctx.stroke();

  // Scattered soft dots
  for (let i = 0; i < 50; i++) {
    const x = rng() * W;
    const y = rng() * H;
    const r = 1 + rng() * 2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = rgba(config.primary, 0.04 + rng() * 0.06);
    ctx.fill();
  }
}

// ===========================================================================
// MORGAN POTTINGER -- Gold/navy authority, structured geometric grid
// ===========================================================================
function renderMorgan(ctx, config, rng) {
  // Base: deep warm navy
  ctx.fillStyle = '#08080c';
  ctx.fillRect(0, 0, W, H);

  // Gold glow -- centered
  const g1 = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 450);
  g1.addColorStop(0, rgba(config.primary, 0.15));
  g1.addColorStop(0.6, rgba(config.primary, 0.04));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Navy glow -- top
  const g2 = ctx.createRadialGradient(W * 0.7, -50, 0, W * 0.7, -50, 350);
  g2.addColorStop(0, rgba(config.secondary, 0.18));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  // Navy glow -- bottom-left
  const g3 = ctx.createRadialGradient(W * 0.2, H + 80, 0, W * 0.2, H + 80, 300);
  g3.addColorStop(0, rgba(config.secondary, 0.12));
  g3.addColorStop(1, 'transparent');
  ctx.fillStyle = g3;
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;
  const cy = H / 2;

  // Visible grid lines (gold)
  ctx.strokeStyle = rgba(config.primary, 0.08);
  ctx.lineWidth = 0.6;
  for (let x = 150; x <= W - 150; x += 75) {
    ctx.beginPath();
    ctx.moveTo(x, 50);
    ctx.lineTo(x, H - 50);
    ctx.stroke();
  }
  for (let y = 50; y <= H - 50; y += 75) {
    ctx.beginPath();
    ctx.moveTo(150, y);
    ctx.lineTo(W - 150, y);
    ctx.stroke();
  }

  // Bold horizontal rules framing the title
  ctx.strokeStyle = rgba(config.primary, 0.35);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - 250, cy - 90);
  ctx.lineTo(cx + 250, cy - 90);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - 250, cy + 90);
  ctx.lineTo(cx + 250, cy + 90);
  ctx.stroke();

  // Corner brackets (gold)
  const bracketSize = 30;
  const bracketInset = 40;
  ctx.strokeStyle = rgba(config.primary, 0.25);
  ctx.lineWidth = 1.2;
  // Top-left
  ctx.beginPath();
  ctx.moveTo(bracketInset, bracketInset + bracketSize);
  ctx.lineTo(bracketInset, bracketInset);
  ctx.lineTo(bracketInset + bracketSize, bracketInset);
  ctx.stroke();
  // Top-right
  ctx.beginPath();
  ctx.moveTo(W - bracketInset - bracketSize, bracketInset);
  ctx.lineTo(W - bracketInset, bracketInset);
  ctx.lineTo(W - bracketInset, bracketInset + bracketSize);
  ctx.stroke();
  // Bottom-left
  ctx.beginPath();
  ctx.moveTo(bracketInset, H - bracketInset - bracketSize);
  ctx.lineTo(bracketInset, H - bracketInset);
  ctx.lineTo(bracketInset + bracketSize, H - bracketInset);
  ctx.stroke();
  // Bottom-right
  ctx.beginPath();
  ctx.moveTo(W - bracketInset - bracketSize, H - bracketInset);
  ctx.lineTo(W - bracketInset, H - bracketInset);
  ctx.lineTo(W - bracketInset, H - bracketInset - bracketSize);
  ctx.stroke();

  // Diamond accents at corners of frame
  const diamonds = [
    [cx, cy - 90], [cx, cy + 90],
    [cx - 250, cy - 90], [cx + 250, cy - 90],
    [cx - 250, cy + 90], [cx + 250, cy + 90],
  ];
  diamonds.forEach(([dx, dy]) => {
    ctx.beginPath();
    ctx.moveTo(dx, dy - 6);
    ctx.lineTo(dx + 4, dy);
    ctx.lineTo(dx, dy + 6);
    ctx.lineTo(dx - 4, dy);
    ctx.closePath();
    ctx.fillStyle = rgba(config.primary, 0.3);
    ctx.fill();
  });
}

// ===========================================================================
// PILLAR FINANCIAL -- Emerald/teal growth, ascending vertical motif
// ===========================================================================
function renderPillar(ctx, config, rng) {
  // Base: deep forest
  ctx.fillStyle = '#060d0a';
  ctx.fillRect(0, 0, W, H);

  // Strong emerald glow -- bottom center
  const g1 = ctx.createRadialGradient(W / 2, H + 100, 0, W / 2, H + 100, 550);
  g1.addColorStop(0, rgba(config.primary, 0.28));
  g1.addColorStop(0.4, rgba(config.primary, 0.10));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Mint accent -- top right
  const g2 = ctx.createRadialGradient(W * 0.85, 50, 0, W * 0.85, 50, 300);
  g2.addColorStop(0, rgba(config.secondary, 0.15));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;

  // Three vertical "pillar" lines
  const pillarPositions = [cx - 200, cx, cx + 200];
  pillarPositions.forEach((px, i) => {
    const alpha = i === 1 ? 0.18 : 0.08;
    const width = i === 1 ? 1.5 : 0.8;
    ctx.strokeStyle = rgba(config.primary, alpha);
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(px, 40);
    ctx.lineTo(px, H - 40);
    ctx.stroke();
  });

  // Ascending dot trajectory (growing, emerald)
  const dots = 24;
  for (let i = 0; i < dots; i++) {
    const t = i / (dots - 1);
    const x = cx - 180 + t * 360;
    const y = H - 100 - t * (H - 200) + Math.sin(t * Math.PI * 2) * 25;
    const radius = 1.5 + t * 4;
    const alpha = 0.08 + t * 0.2;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = rgba(config.secondary, alpha);
    ctx.fill();
  }

  // Horizontal tier lines
  const tiers = [H * 0.2, H * 0.4, H * 0.6, H * 0.8];
  tiers.forEach((ty, i) => {
    const tierWidth = 100 + i * 60;
    ctx.strokeStyle = rgba(config.primary, 0.06 + i * 0.02);
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(cx - tierWidth, ty);
    ctx.lineTo(cx + tierWidth, ty);
    ctx.stroke();
  });

  // Quarter-circle arcs (growth motif)
  ctx.strokeStyle = rgba(config.secondary, 0.12);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx - 200, H - 40, 120, -Math.PI / 2, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx + 200, H - 40, 80, -Math.PI, -Math.PI / 2);
  ctx.stroke();

  // Scattered emerald particles
  for (let i = 0; i < 35; i++) {
    const x = rng() * W;
    const y = rng() * H;
    const r = 0.5 + rng() * 1.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = rgba(config.secondary, 0.03 + rng() * 0.05);
    ctx.fill();
  }
}

// ===========================================================================
// FULL TILT GYM -- Orange energy, radiating lines, pulse circles, dynamic arcs
// ===========================================================================
function renderFullTilt(ctx, config, rng) {
  ctx.fillStyle = '#0c0806';
  ctx.fillRect(0, 0, W, H);

  // Intense orange glow -- center
  const g1 = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 400);
  g1.addColorStop(0, rgba(config.primary, 0.22));
  g1.addColorStop(0.5, rgba(config.primary, 0.06));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Yellow accent glow -- top right
  const g2 = ctx.createRadialGradient(W * 0.8, 80, 0, W * 0.8, 80, 300);
  g2.addColorStop(0, rgba(config.secondary, 0.12));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;
  const cy = H / 2;

  // Radiating lines from center (explosion pattern)
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2 + rng() * 0.1;
    const innerR = 80 + rng() * 40;
    const outerR = 250 + rng() * 150;
    ctx.strokeStyle = rgba(config.primary, 0.06 + rng() * 0.08);
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * innerR, cy + Math.sin(angle) * innerR);
    ctx.lineTo(cx + Math.cos(angle) * outerR, cy + Math.sin(angle) * outerR);
    ctx.stroke();
  }

  // Pulse circles (concentric rings)
  for (let i = 0; i < 5; i++) {
    const r = 60 + i * 55;
    ctx.strokeStyle = rgba(config.primary, 0.12 - i * 0.018);
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Dynamic arcs -- sweeping curves
  ctx.strokeStyle = rgba(config.secondary, 0.15);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx - 100, cy + 50, 200, -Math.PI * 0.3, Math.PI * 0.2);
  ctx.stroke();
  ctx.strokeStyle = rgba(config.primary, 0.10);
  ctx.beginPath();
  ctx.arc(cx + 120, cy - 40, 180, Math.PI * 0.5, Math.PI * 1.1);
  ctx.stroke();

  // Scattered energy dots
  for (let i = 0; i < 40; i++) {
    const x = rng() * W;
    const y = rng() * H;
    const r = 1 + rng() * 2.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = rgba(config.primary, 0.05 + rng() * 0.08);
    ctx.fill();
  }
}

// ===========================================================================
// CAVIAR CREATIVE CO. -- Noir aesthetic, angular slashes, scattered dots
// ===========================================================================
function renderCaviar(ctx, config, rng) {
  ctx.fillStyle = '#080808';
  ctx.fillRect(0, 0, W, H);

  // Orange glow -- bottom left
  const g1 = ctx.createRadialGradient(W * 0.25, H + 50, 0, W * 0.25, H + 50, 400);
  g1.addColorStop(0, rgba(config.primary, 0.18));
  g1.addColorStop(0.5, rgba(config.primary, 0.05));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Cream glow -- top right (subtle warmth)
  const g2 = ctx.createRadialGradient(W * 0.8, -30, 0, W * 0.8, -30, 350);
  g2.addColorStop(0, rgba(config.secondary, 0.06));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;
  const cy = H / 2;

  // Angular slashes (diagonal lines cutting across)
  for (let i = 0; i < 8; i++) {
    const x1 = rng() * W;
    const y1 = rng() * H * 0.3;
    const length = 200 + rng() * 300;
    const angle = Math.PI * 0.2 + rng() * 0.3;
    ctx.strokeStyle = rgba(config.primary, 0.06 + rng() * 0.06);
    ctx.lineWidth = 0.6 + rng() * 0.8;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 + Math.cos(angle) * length, y1 + Math.sin(angle) * length);
    ctx.stroke();
  }

  // Film-grain texture (dense tiny dots)
  for (let i = 0; i < 120; i++) {
    const x = rng() * W;
    const y = rng() * H;
    const r = 0.3 + rng() * 0.8;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = rgba(config.secondary, 0.03 + rng() * 0.04);
    ctx.fill();
  }

  // Bold framing lines (noir composition)
  ctx.strokeStyle = rgba(config.primary, 0.20);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(80, cy - 80);
  ctx.lineTo(W - 80, cy - 80);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(80, cy + 80);
  ctx.lineTo(W - 80, cy + 80);
  ctx.stroke();

  // Vertical accent bars at edges
  ctx.strokeStyle = rgba(config.primary, 0.12);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(60, 100);
  ctx.lineTo(60, H - 100);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(W - 60, 100);
  ctx.lineTo(W - 60, H - 100);
  ctx.stroke();

  // Scattered larger accent dots (ink splatter feel)
  for (let i = 0; i < 15; i++) {
    const x = rng() * W;
    const y = rng() * H;
    const r = 2 + rng() * 4;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = rgba(config.primary, 0.04 + rng() * 0.05);
    ctx.fill();
  }
}

// ===========================================================================
// TOM DREXLER -- Industrial red/blue, pipe lines, bolt dots, circuit grid
// ===========================================================================
function renderTomDrexler(ctx, config, rng) {
  ctx.fillStyle = '#0a0808';
  ctx.fillRect(0, 0, W, H);

  // Red glow -- center
  const g1 = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 420);
  g1.addColorStop(0, rgba(config.primary, 0.18));
  g1.addColorStop(0.5, rgba(config.primary, 0.05));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Blue glow -- bottom right
  const g2 = ctx.createRadialGradient(W * 0.75, H + 60, 0, W * 0.75, H + 60, 350);
  g2.addColorStop(0, rgba(config.secondary, 0.15));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;
  const cy = H / 2;

  // Horizontal pipe lines
  const pipeYs = [120, 200, H - 200, H - 120];
  pipeYs.forEach((py) => {
    ctx.strokeStyle = rgba(config.secondary, 0.10);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, py);
    ctx.lineTo(W - 100, py);
    ctx.stroke();
    // Pipe joints (small circles along line)
    for (let x = 150; x < W - 100; x += 120 + rng() * 60) {
      ctx.beginPath();
      ctx.arc(x, py, 4, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(config.primary, 0.18);
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  });

  // Circuit grid (faint background)
  ctx.strokeStyle = rgba(config.secondary, 0.04);
  ctx.lineWidth = 0.5;
  for (let x = 50; x < W; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 30; y < H; y += 60) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  // Bolt dots at grid intersections (sparse)
  for (let i = 0; i < 20; i++) {
    const x = 50 + Math.floor(rng() * 19) * 60;
    const y = 30 + Math.floor(rng() * 10) * 60;
    ctx.beginPath();
    ctx.arc(x, y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = rgba(config.primary, 0.12 + rng() * 0.10);
    ctx.fill();
  }

  // Red accent bars flanking title zone
  ctx.fillStyle = rgba(config.primary, 0.15);
  ctx.fillRect(cx - 300, cy - 95, 4, 190);
  ctx.fillRect(cx + 296, cy - 95, 4, 190);
}

// ===========================================================================
// HALSEY FLATS -- Sage/beige architectural, building silhouettes, window grid
// ===========================================================================
function renderHalsey(ctx, config, rng) {
  ctx.fillStyle = '#080a08';
  ctx.fillRect(0, 0, W, H);

  // Sage glow -- bottom center
  const g1 = ctx.createRadialGradient(W / 2, H + 80, 0, W / 2, H + 80, 500);
  g1.addColorStop(0, rgba(config.primary, 0.22));
  g1.addColorStop(0.5, rgba(config.primary, 0.06));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Warm beige glow -- top
  const g2 = ctx.createRadialGradient(W / 2, -60, 0, W / 2, -60, 400);
  g2.addColorStop(0, rgba(config.secondary, 0.10));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  // Building outline silhouettes (skyline at bottom)
  const buildings = [
    { x: 80, w: 100, h: 180 },
    { x: 200, w: 70, h: 250 },
    { x: 290, w: 120, h: 200 },
    { x: 430, w: 80, h: 300 },
    { x: 530, w: 110, h: 220 },
    { x: 660, w: 90, h: 280 },
    { x: 770, w: 130, h: 190 },
    { x: 920, w: 80, h: 260 },
    { x: 1020, w: 100, h: 210 },
  ];
  buildings.forEach((b) => {
    const by = H - b.h;
    ctx.strokeStyle = rgba(config.primary, 0.08);
    ctx.lineWidth = 0.8;
    ctx.strokeRect(b.x, by, b.w, b.h);

    // Window grid inside each building
    const winW = 8;
    const winH = 10;
    const gapX = 18;
    const gapY = 22;
    for (let wx = b.x + 10; wx < b.x + b.w - 10; wx += gapX) {
      for (let wy = by + 15; wy < H - 15; wy += gapY) {
        if (rng() > 0.4) {
          ctx.fillStyle = rgba(config.secondary, 0.03 + rng() * 0.05);
          ctx.fillRect(wx, wy, winW, winH);
        }
      }
    }
  });

  // Floor lines (horizontal structure)
  for (let i = 0; i < 6; i++) {
    const y = H - 40 - i * 45;
    ctx.strokeStyle = rgba(config.primary, 0.04 + i * 0.01);
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(50, y);
    ctx.lineTo(W - 50, y);
    ctx.stroke();
  }
}

// ===========================================================================
// SPRINGHURST ENDODONTICS -- Teal/blue clinical, clean bars, dot matrix, cross
// ===========================================================================
function renderSpringhurst(ctx, config, rng) {
  ctx.fillStyle = '#060a0a';
  ctx.fillRect(0, 0, W, H);

  // Teal glow -- center-left
  const g1 = ctx.createRadialGradient(W * 0.4, H / 2, 0, W * 0.4, H / 2, 400);
  g1.addColorStop(0, rgba(config.primary, 0.20));
  g1.addColorStop(0.5, rgba(config.primary, 0.06));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Blue accent glow -- top right
  const g2 = ctx.createRadialGradient(W * 0.85, 60, 0, W * 0.85, 60, 280);
  g2.addColorStop(0, rgba(config.secondary, 0.12));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;
  const cy = H / 2;

  // Clean horizontal bars (clinical precision)
  const barYs = [cy - 110, cy - 100, cy + 100, cy + 110];
  barYs.forEach((by, i) => {
    const width = i < 2 ? 500 : 500;
    ctx.fillStyle = rgba(config.primary, 0.15);
    ctx.fillRect(cx - width / 2, by, width, 1.5);
  });

  // Dot matrix (evenly spaced clinical grid)
  for (let x = 100; x < W - 80; x += 40) {
    for (let y = 60; y < H - 40; y += 40) {
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      if (dist > 120 && dist < 450) {
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fillStyle = rgba(config.primary, 0.04 + rng() * 0.03);
        ctx.fill();
      }
    }
  }

  // Subtle cross pattern (medical motif) -- centered
  ctx.strokeStyle = rgba(config.secondary, 0.08);
  ctx.lineWidth = 1;
  // Vertical bar of cross
  ctx.beginPath();
  ctx.moveTo(cx, cy - 180);
  ctx.lineTo(cx, cy + 180);
  ctx.stroke();
  // Horizontal bar of cross
  ctx.beginPath();
  ctx.moveTo(cx - 180, cy);
  ctx.lineTo(cx + 180, cy);
  ctx.stroke();

  // Corner arcs (clinical precision)
  ctx.strokeStyle = rgba(config.primary, 0.10);
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.arc(60, 60, 30, 0, Math.PI / 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(W - 60, 60, 30, Math.PI / 2, Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(60, H - 60, 30, -Math.PI / 2, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(W - 60, H - 60, 30, Math.PI, Math.PI * 1.5);
  ctx.stroke();
}

// ===========================================================================
// DGV SERVICES -- Navy/gold corporate, diagonal stripes, ascending chart line
// ===========================================================================
function renderDgv(ctx, config, rng) {
  ctx.fillStyle = '#08080c';
  ctx.fillRect(0, 0, W, H);

  // Navy glow -- center
  const g1 = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 450);
  g1.addColorStop(0, rgba(config.primary, 0.20));
  g1.addColorStop(0.5, rgba(config.primary, 0.06));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Gold glow -- bottom right
  const g2 = ctx.createRadialGradient(W * 0.75, H + 40, 0, W * 0.75, H + 40, 350);
  g2.addColorStop(0, rgba(config.secondary, 0.15));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;
  const cy = H / 2;

  // Diagonal stripes (corporate pattern)
  ctx.strokeStyle = rgba(config.primary, 0.06);
  ctx.lineWidth = 0.6;
  for (let i = -10; i < 25; i++) {
    const x = i * 80;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + H, H);
    ctx.stroke();
  }

  // Ascending chart line (revenue growth motif)
  ctx.strokeStyle = rgba(config.secondary, 0.25);
  ctx.lineWidth = 2;
  ctx.beginPath();
  const chartPoints = [];
  for (let i = 0; i < 12; i++) {
    const x = 120 + i * 85;
    const progress = i / 11;
    const y = H - 80 - progress * 350 + (rng() - 0.5) * 40;
    chartPoints.push({ x, y });
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Data points on chart
  chartPoints.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = rgba(config.secondary, 0.35);
    ctx.fill();
  });

  // Framing rules
  ctx.strokeStyle = rgba(config.secondary, 0.12);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - 280, cy - 85);
  ctx.lineTo(cx + 280, cy - 85);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - 280, cy + 85);
  ctx.lineTo(cx + 280, cy + 85);
  ctx.stroke();
}

// ===========================================================================
// UOFL DEMO -- Cardinal red/gold academic, heraldic shield, serif flourishes
// ===========================================================================
function renderUofL(ctx, config, rng) {
  ctx.fillStyle = '#0a0606';
  ctx.fillRect(0, 0, W, H);

  // Cardinal red glow -- center
  const g1 = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 400);
  g1.addColorStop(0, rgba(config.primary, 0.22));
  g1.addColorStop(0.5, rgba(config.primary, 0.06));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Gold glow -- top
  const g2 = ctx.createRadialGradient(W / 2, -40, 0, W / 2, -40, 350);
  g2.addColorStop(0, rgba(config.secondary, 0.10));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;
  const cy = H / 2;

  // Heraldic shield outline (centered behind text)
  ctx.strokeStyle = rgba(config.primary, 0.18);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx - 100, cy - 120);
  ctx.lineTo(cx + 100, cy - 120);
  ctx.lineTo(cx + 100, cy + 40);
  ctx.quadraticCurveTo(cx + 100, cy + 120, cx, cy + 150);
  ctx.quadraticCurveTo(cx - 100, cy + 120, cx - 100, cy + 40);
  ctx.closePath();
  ctx.stroke();

  // Inner shield detail
  ctx.strokeStyle = rgba(config.secondary, 0.10);
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(cx - 75, cy - 95);
  ctx.lineTo(cx + 75, cy - 95);
  ctx.lineTo(cx + 75, cy + 30);
  ctx.quadraticCurveTo(cx + 75, cy + 95, cx, cy + 120);
  ctx.quadraticCurveTo(cx - 75, cy + 95, cx - 75, cy + 30);
  ctx.closePath();
  ctx.stroke();

  // Horizontal rules (academic tradition)
  ctx.strokeStyle = rgba(config.primary, 0.12);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - 350, cy - 140);
  ctx.lineTo(cx - 120, cy - 140);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx + 120, cy - 140);
  ctx.lineTo(cx + 350, cy - 140);
  ctx.stroke();

  // Serif flourishes (small decorative marks at rule ends)
  const flourishPoints = [
    [cx - 350, cy - 140], [cx - 120, cy - 140],
    [cx + 120, cy - 140], [cx + 350, cy - 140],
  ];
  flourishPoints.forEach(([fx, fy]) => {
    ctx.beginPath();
    ctx.arc(fx, fy, 3, 0, Math.PI * 2);
    ctx.fillStyle = rgba(config.secondary, 0.20);
    ctx.fill();
  });

  // Column lines (pillars of academia)
  const cols = [cx - 250, cx - 200, cx + 200, cx + 250];
  cols.forEach((colX) => {
    ctx.strokeStyle = rgba(config.primary, 0.06);
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(colX, 80);
    ctx.lineTo(colX, H - 80);
    ctx.stroke();
  });

  // Scattered gold particles
  for (let i = 0; i < 30; i++) {
    const x = rng() * W;
    const y = rng() * H;
    const r = 0.5 + rng() * 1.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = rgba(config.secondary, 0.03 + rng() * 0.05);
    ctx.fill();
  }
}

// ===========================================================================
// A. HOLLAND HOUSTON -- Gold/navy authority, scales of justice motif, balanced lines
// ===========================================================================
function renderHolland(ctx, config, rng) {
  ctx.fillStyle = config.dark;
  ctx.fillRect(0, 0, W, H);

  // Gold glow -- center-bottom
  const g1 = ctx.createRadialGradient(W / 2, H + 60, 0, W / 2, H + 60, 480);
  g1.addColorStop(0, rgba(config.primary, 0.22));
  g1.addColorStop(0.5, rgba(config.primary, 0.06));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Navy glow -- top
  const g2 = ctx.createRadialGradient(W * 0.6, -60, 0, W * 0.6, -60, 380);
  g2.addColorStop(0, rgba(config.secondary, 0.18));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;
  const cy = H / 2;

  // Scales of justice silhouette (balanced beam)
  ctx.strokeStyle = rgba(config.primary, 0.18);
  ctx.lineWidth = 1.2;
  // Vertical pillar
  ctx.beginPath();
  ctx.moveTo(cx, cy - 160);
  ctx.lineTo(cx, cy + 160);
  ctx.stroke();
  // Horizontal beam
  ctx.beginPath();
  ctx.moveTo(cx - 180, cy - 100);
  ctx.lineTo(cx + 180, cy - 100);
  ctx.stroke();
  // Left pan (arc)
  ctx.strokeStyle = rgba(config.primary, 0.12);
  ctx.beginPath();
  ctx.arc(cx - 180, cy - 60, 50, 0, Math.PI);
  ctx.stroke();
  // Right pan (arc)
  ctx.beginPath();
  ctx.arc(cx + 180, cy - 60, 50, 0, Math.PI);
  ctx.stroke();
  // Chains
  ctx.strokeStyle = rgba(config.primary, 0.10);
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(cx - 180, cy - 100);
  ctx.lineTo(cx - 180, cy - 60);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx + 180, cy - 100);
  ctx.lineTo(cx + 180, cy - 60);
  ctx.stroke();

  // Horizontal rules (authority)
  ctx.strokeStyle = rgba(config.primary, 0.25);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - 200, cy - 90);
  ctx.lineTo(cx + 200, cy - 90);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - 200, cy + 90);
  ctx.lineTo(cx + 200, cy + 90);
  ctx.stroke();

  // Corner brackets (gold)
  const bs = 25;
  const bi = 35;
  ctx.strokeStyle = rgba(config.primary, 0.20);
  ctx.lineWidth = 1;
  [[bi, bi], [W - bi, bi], [bi, H - bi], [W - bi, H - bi]].forEach(([bx, by]) => {
    const dx = bx < W / 2 ? 1 : -1;
    const dy = by < H / 2 ? 1 : -1;
    ctx.beginPath();
    ctx.moveTo(bx, by + dy * bs);
    ctx.lineTo(bx, by);
    ctx.lineTo(bx + dx * bs, by);
    ctx.stroke();
  });

  // Scattered gold particles
  for (let i = 0; i < 35; i++) {
    const x = rng() * W;
    const y = rng() * H;
    const r = 0.5 + rng() * 1.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = rgba(config.primary, 0.03 + rng() * 0.05);
    ctx.fill();
  }
}

// ===========================================================================
// HIGHLAND CLEANERS -- Yellow/olive, fabric weave pattern, hanger silhouette
// ===========================================================================
function renderHighland(ctx, config, rng) {
  ctx.fillStyle = config.dark;
  ctx.fillRect(0, 0, W, H);

  // Warm yellow glow -- center
  const g1 = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 420);
  g1.addColorStop(0, rgba(config.primary, 0.18));
  g1.addColorStop(0.5, rgba(config.primary, 0.05));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Olive accent -- bottom left
  const g2 = ctx.createRadialGradient(W * 0.2, H + 60, 0, W * 0.2, H + 60, 350);
  g2.addColorStop(0, rgba(config.secondary, 0.15));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;
  const cy = H / 2;

  // Fabric weave pattern (diagonal cross-hatch)
  ctx.strokeStyle = rgba(config.primary, 0.05);
  ctx.lineWidth = 0.5;
  for (let i = -15; i < 30; i++) {
    const x = i * 60;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + H * 0.7, H);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + H * 0.7, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }

  // Hanger silhouette (centered, subtle)
  ctx.strokeStyle = rgba(config.primary, 0.15);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  // Hook at top
  ctx.arc(cx, cy - 130, 12, Math.PI, 0);
  ctx.stroke();
  ctx.beginPath();
  // Shoulders
  ctx.moveTo(cx, cy - 118);
  ctx.lineTo(cx - 120, cy - 50);
  ctx.lineTo(cx + 120, cy - 50);
  ctx.lineTo(cx, cy - 118);
  ctx.stroke();

  // Framing lines
  ctx.strokeStyle = rgba(config.primary, 0.20);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - 250, cy + 80);
  ctx.lineTo(cx + 250, cy + 80);
  ctx.stroke();

  // Scattered warm dots
  for (let i = 0; i < 40; i++) {
    const x = rng() * W;
    const y = rng() * H;
    const r = 0.5 + rng() * 2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = rgba(config.primary, 0.04 + rng() * 0.05);
    ctx.fill();
  }
}

// ===========================================================================
// LAWNCO LOUISVILLE -- Green/orange organic, leaf veins, growth curves
// ===========================================================================
function renderLawnco(ctx, config, rng) {
  ctx.fillStyle = config.dark;
  ctx.fillRect(0, 0, W, H);

  // Green glow -- bottom
  const g1 = ctx.createRadialGradient(W / 2, H + 80, 0, W / 2, H + 80, 520);
  g1.addColorStop(0, rgba(config.primary, 0.25));
  g1.addColorStop(0.5, rgba(config.primary, 0.08));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Orange accent -- top right (sunset warmth)
  const g2 = ctx.createRadialGradient(W * 0.8, -40, 0, W * 0.8, -40, 300);
  g2.addColorStop(0, rgba(config.secondary, 0.14));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;
  const cy = H / 2;

  // Leaf vein pattern (branching lines from center-bottom)
  const leafCenter = { x: cx, y: H + 40 };
  for (let i = 0; i < 12; i++) {
    const angle = -Math.PI / 2 + (i - 5.5) * 0.12;
    const len = 250 + rng() * 200;
    const endX = leafCenter.x + Math.cos(angle) * len;
    const endY = leafCenter.y + Math.sin(angle) * len;
    ctx.strokeStyle = rgba(config.primary, 0.06 + rng() * 0.06);
    ctx.lineWidth = 0.6 + rng() * 0.6;
    ctx.beginPath();
    ctx.moveTo(leafCenter.x, leafCenter.y);
    ctx.quadraticCurveTo(
      leafCenter.x + Math.cos(angle) * len * 0.4 + (rng() - 0.5) * 60,
      leafCenter.y + Math.sin(angle) * len * 0.4,
      endX, endY
    );
    ctx.stroke();
  }

  // Growth curve (swooping upward arc)
  ctx.strokeStyle = rgba(config.primary, 0.18);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(100, H - 80);
  ctx.bezierCurveTo(W * 0.3, H - 200, W * 0.6, H - 350, W - 100, H - 400);
  ctx.stroke();

  // Second growth curve
  ctx.strokeStyle = rgba(config.secondary, 0.10);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(150, H - 60);
  ctx.bezierCurveTo(W * 0.35, H - 150, W * 0.65, H - 280, W - 80, H - 320);
  ctx.stroke();

  // Scattered organic dots (seed-like)
  for (let i = 0; i < 50; i++) {
    const x = rng() * W;
    const y = rng() * H;
    const r = 1 + rng() * 2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = rgba(config.primary, 0.04 + rng() * 0.06);
    ctx.fill();
  }
}

// ===========================================================================
// CLEANING BY REGINA -- Sky blue/amber, sparkle dots, sweeping clean arcs
// ===========================================================================
function renderRegina(ctx, config, rng) {
  ctx.fillStyle = config.dark;
  ctx.fillRect(0, 0, W, H);

  // Sky blue glow -- center
  const g1 = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 400);
  g1.addColorStop(0, rgba(config.primary, 0.20));
  g1.addColorStop(0.5, rgba(config.primary, 0.06));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Amber warmth -- bottom right
  const g2 = ctx.createRadialGradient(W * 0.75, H + 40, 0, W * 0.75, H + 40, 320);
  g2.addColorStop(0, rgba(config.secondary, 0.12));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;
  const cy = H / 2;

  // Sweeping clean arcs (wide curves suggesting freshness)
  ctx.strokeStyle = rgba(config.primary, 0.14);
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(cx - 150, H + 100, 350, -Math.PI * 0.7, -Math.PI * 0.15);
  ctx.stroke();
  ctx.strokeStyle = rgba(config.primary, 0.10);
  ctx.beginPath();
  ctx.arc(cx + 200, H + 150, 400, -Math.PI * 0.75, -Math.PI * 0.2);
  ctx.stroke();

  // Sparkle stars (4-point stars scattered)
  for (let i = 0; i < 20; i++) {
    const sx = rng() * W;
    const sy = rng() * H;
    const size = 3 + rng() * 6;
    const alpha = 0.08 + rng() * 0.12;
    ctx.fillStyle = rgba(config.secondary, alpha);
    // 4-point star
    ctx.beginPath();
    ctx.moveTo(sx, sy - size);
    ctx.lineTo(sx + size * 0.25, sy);
    ctx.lineTo(sx, sy + size);
    ctx.lineTo(sx - size * 0.25, sy);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(sx - size, sy);
    ctx.lineTo(sx, sy + size * 0.25);
    ctx.lineTo(sx + size, sy);
    ctx.lineTo(sx, sy - size * 0.25);
    ctx.closePath();
    ctx.fill();
  }

  // Clean horizontal rule
  ctx.strokeStyle = rgba(config.primary, 0.20);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - 220, cy + 85);
  ctx.lineTo(cx + 220, cy + 85);
  ctx.stroke();

  // Scattered tiny dots (mist/freshness)
  for (let i = 0; i < 60; i++) {
    const x = rng() * W;
    const y = rng() * H;
    const r = 0.5 + rng() * 1.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = rgba(config.primary, 0.03 + rng() * 0.04);
    ctx.fill();
  }
}

// ===========================================================================
// TONINI CHURCH SUPPLY -- Gold/burgundy gothic, pointed arches, cross, rosette
// ===========================================================================
function renderTonini(ctx, config, rng) {
  ctx.fillStyle = config.dark;
  ctx.fillRect(0, 0, W, H);

  // Sacred gold glow -- center
  const g1 = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 450);
  g1.addColorStop(0, rgba(config.primary, 0.20));
  g1.addColorStop(0.5, rgba(config.primary, 0.06));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Burgundy glow -- bottom
  const g2 = ctx.createRadialGradient(W / 2, H + 80, 0, W / 2, H + 80, 400);
  g2.addColorStop(0, rgba(config.secondary, 0.18));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;
  const cy = H / 2;

  // Gothic pointed arch (centered)
  ctx.strokeStyle = rgba(config.primary, 0.18);
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(cx - 100, H - 60);
  ctx.lineTo(cx - 100, cy - 20);
  ctx.quadraticCurveTo(cx - 100, cy - 140, cx, cy - 180);
  ctx.quadraticCurveTo(cx + 100, cy - 140, cx + 100, cy - 20);
  ctx.lineTo(cx + 100, H - 60);
  ctx.stroke();

  // Inner arch
  ctx.strokeStyle = rgba(config.primary, 0.10);
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(cx - 70, H - 60);
  ctx.lineTo(cx - 70, cy);
  ctx.quadraticCurveTo(cx - 70, cy - 100, cx, cy - 130);
  ctx.quadraticCurveTo(cx + 70, cy - 100, cx + 70, cy);
  ctx.lineTo(cx + 70, H - 60);
  ctx.stroke();

  // Cross at top of arch
  ctx.strokeStyle = rgba(config.primary, 0.25);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx, cy - 210);
  ctx.lineTo(cx, cy - 170);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - 15, cy - 195);
  ctx.lineTo(cx + 15, cy - 195);
  ctx.stroke();

  // Rosette window (concentric circles at top of arch)
  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = rgba(config.primary, 0.08 - i * 0.01);
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.arc(cx, cy - 80, 20 + i * 15, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Side pilaster lines
  const pilasters = [cx - 250, cx - 220, cx + 220, cx + 250];
  pilasters.forEach((px) => {
    ctx.strokeStyle = rgba(config.secondary, 0.06);
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(px, 60);
    ctx.lineTo(px, H - 60);
    ctx.stroke();
  });

  // Scattered gold particles (candlelight)
  for (let i = 0; i < 40; i++) {
    const x = rng() * W;
    const y = rng() * H;
    const r = 0.5 + rng() * 2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = rgba(config.primary, 0.04 + rng() * 0.06);
    ctx.fill();
  }
}

// ===========================================================================
// TASTEFUL TRAVELS -- Terracotta/teal, spice route curves, compass rose, exotic dots
// ===========================================================================
function renderTasteful(ctx, config, rng) {
  ctx.fillStyle = config.dark;
  ctx.fillRect(0, 0, W, H);

  // Terracotta glow -- center
  const g1 = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 420);
  g1.addColorStop(0, rgba(config.primary, 0.20));
  g1.addColorStop(0.5, rgba(config.primary, 0.06));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Deep teal glow -- top left
  const g2 = ctx.createRadialGradient(W * 0.2, -40, 0, W * 0.2, -40, 350);
  g2.addColorStop(0, rgba(config.secondary, 0.15));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;
  const cy = H / 2;

  // Spice route curves (flowing trade route lines)
  ctx.strokeStyle = rgba(config.primary, 0.12);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, H * 0.65);
  ctx.bezierCurveTo(W * 0.2, H * 0.4, W * 0.5, H * 0.7, W, H * 0.35);
  ctx.stroke();
  ctx.strokeStyle = rgba(config.secondary, 0.10);
  ctx.beginPath();
  ctx.moveTo(0, H * 0.75);
  ctx.bezierCurveTo(W * 0.3, H * 0.55, W * 0.7, H * 0.8, W, H * 0.5);
  ctx.stroke();

  // Compass rose (8-point star, subtle)
  const compassR = 40;
  ctx.strokeStyle = rgba(config.primary, 0.15);
  ctx.lineWidth = 0.8;
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const len = i % 2 === 0 ? compassR : compassR * 0.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
    ctx.stroke();
  }
  // Compass circle
  ctx.beginPath();
  ctx.arc(cx, cy, compassR * 0.35, 0, Math.PI * 2);
  ctx.stroke();

  // Concentric rings (journey motif)
  for (let i = 0; i < 5; i++) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(i * 0.15);
    ctx.beginPath();
    ctx.ellipse(0, 0, 120 + i * 40, 70 + i * 25, 0, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(config.primary, 0.06 - i * 0.008);
    ctx.lineWidth = 0.6;
    ctx.stroke();
    ctx.restore();
  }

  // Exotic spice dots (varied sizes, warm colors)
  for (let i = 0; i < 45; i++) {
    const x = rng() * W;
    const y = rng() * H;
    const r = 1 + rng() * 3;
    const color = rng() > 0.5 ? config.primary : config.secondary;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = rgba(color, 0.04 + rng() * 0.06);
    ctx.fill();
  }
}

// ===========================================================================
// KENTUCKIANA GASTRO -- Medical blue/teal, digestive tract curve, clinical dots
// ===========================================================================
function renderKentuckiana(ctx, config, rng) {
  ctx.fillStyle = config.dark;
  ctx.fillRect(0, 0, W, H);

  // Deep blue glow -- center
  const g1 = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 430);
  g1.addColorStop(0, rgba(config.primary, 0.22));
  g1.addColorStop(0.5, rgba(config.primary, 0.06));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Teal accent -- top right
  const g2 = ctx.createRadialGradient(W * 0.8, 40, 0, W * 0.8, 40, 300);
  g2.addColorStop(0, rgba(config.secondary, 0.14));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;
  const cy = H / 2;

  // Organic flowing curves (medical/anatomical feel)
  ctx.strokeStyle = rgba(config.secondary, 0.15);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(W * 0.15, cy - 80);
  ctx.bezierCurveTo(W * 0.3, cy - 150, W * 0.5, cy + 100, W * 0.7, cy - 50);
  ctx.bezierCurveTo(W * 0.8, cy - 100, W * 0.9, cy + 50, W * 0.95, cy);
  ctx.stroke();

  // Second flowing curve
  ctx.strokeStyle = rgba(config.primary, 0.08);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(W * 0.1, cy + 40);
  ctx.bezierCurveTo(W * 0.25, cy + 120, W * 0.45, cy - 60, W * 0.65, cy + 80);
  ctx.bezierCurveTo(W * 0.8, cy + 140, W * 0.9, cy - 20, W, cy + 60);
  ctx.stroke();

  // Clean horizontal bars (clinical precision)
  ctx.fillStyle = rgba(config.primary, 0.12);
  ctx.fillRect(cx - 250, cy - 100, 500, 1.5);
  ctx.fillRect(cx - 250, cy + 100, 500, 1.5);

  // Dot matrix (clinical grid)
  for (let x = 80; x < W - 60; x += 45) {
    for (let y = 50; y < H - 30; y += 45) {
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      if (dist > 130 && dist < 400) {
        ctx.beginPath();
        ctx.arc(x, y, 0.8, 0, Math.PI * 2);
        ctx.fillStyle = rgba(config.secondary, 0.03 + rng() * 0.03);
        ctx.fill();
      }
    }
  }

  // Medical cross (subtle)
  ctx.strokeStyle = rgba(config.secondary, 0.06);
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(cx, cy - 150);
  ctx.lineTo(cx, cy + 150);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - 150, cy);
  ctx.lineTo(cx + 150, cy);
  ctx.stroke();
}

// ===========================================================================
// DR. KUHN -- Medical blue/green, airway curves, pollen dots, breathing motif
// ===========================================================================
function renderKuhn(ctx, config, rng) {
  ctx.fillStyle = config.dark;
  ctx.fillRect(0, 0, W, H);

  // Medical blue glow -- center
  const g1 = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 420);
  g1.addColorStop(0, rgba(config.primary, 0.20));
  g1.addColorStop(0.5, rgba(config.primary, 0.06));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Health green glow -- bottom
  const g2 = ctx.createRadialGradient(W * 0.4, H + 60, 0, W * 0.4, H + 60, 350);
  g2.addColorStop(0, rgba(config.secondary, 0.14));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;
  const cy = H / 2;

  // Airway/breathing curves (two parallel flowing curves)
  ctx.strokeStyle = rgba(config.primary, 0.14);
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(cx - 250, cy - 20);
  ctx.bezierCurveTo(cx - 100, cy - 80, cx + 100, cy + 80, cx + 250, cy - 20);
  ctx.stroke();
  ctx.strokeStyle = rgba(config.primary, 0.10);
  ctx.beginPath();
  ctx.moveTo(cx - 250, cy + 20);
  ctx.bezierCurveTo(cx - 100, cy + 80, cx + 100, cy - 80, cx + 250, cy + 20);
  ctx.stroke();

  // Pollen/allergen dots (various sizes, scattered)
  for (let i = 0; i < 30; i++) {
    const x = rng() * W;
    const y = rng() * H;
    const r = 2 + rng() * 5;
    const rings = 2 + Math.floor(rng() * 2);
    for (let j = 0; j < rings; j++) {
      ctx.strokeStyle = rgba(config.secondary, 0.04 + rng() * 0.04);
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(x, y, r + j * 3, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, Math.PI * 2);
    ctx.fillStyle = rgba(config.secondary, 0.08 + rng() * 0.06);
    ctx.fill();
  }

  // Clean medical bars
  ctx.fillStyle = rgba(config.primary, 0.12);
  ctx.fillRect(cx - 230, cy - 95, 460, 1.5);
  ctx.fillRect(cx - 230, cy + 95, 460, 1.5);

  // Corner arcs (clinical precision)
  ctx.strokeStyle = rgba(config.primary, 0.08);
  ctx.lineWidth = 0.8;
  [[55, 55, 0, Math.PI / 2], [W - 55, 55, Math.PI / 2, Math.PI],
   [55, H - 55, -Math.PI / 2, 0], [W - 55, H - 55, Math.PI, Math.PI * 1.5]].forEach(([ax, ay, start, end]) => {
    ctx.beginPath();
    ctx.arc(ax, ay, 25, start, end);
    ctx.stroke();
  });
}

// ---------------------------------------------------------------------------
// Typography (shared)
// ---------------------------------------------------------------------------
// ===========================================================================
// CLEMENTINE CATERING -- Warm gold chandelier, cascading crystal drops
// ===========================================================================
function renderClementine(ctx, config, rng) {
  // Base: deep warm brown-black
  ctx.fillStyle = config.dark;
  ctx.fillRect(0, 0, W, H);

  // Warm gold glow -- center
  const g1 = ctx.createRadialGradient(W / 2, H / 2 - 60, 0, W / 2, H / 2 - 60, 500);
  g1.addColorStop(0, rgba(config.primary, 0.22));
  g1.addColorStop(0.5, rgba(config.primary, 0.06));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Green accent glow -- bottom left
  const g2 = ctx.createRadialGradient(W * 0.15, H + 50, 0, W * 0.15, H + 50, 350);
  g2.addColorStop(0, rgba(config.secondary, 0.10));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  // Green accent glow -- top right
  const g3 = ctx.createRadialGradient(W * 0.85, -30, 0, W * 0.85, -30, 280);
  g3.addColorStop(0, rgba(config.secondary, 0.08));
  g3.addColorStop(1, 'transparent');
  ctx.fillStyle = g3;
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;

  // Chandelier hub -- concentric arcs at top
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.arc(cx, 20, 80 + i * 50, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.strokeStyle = rgba(config.primary, 0.12 - i * 0.02);
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }

  // Crystal strands cascading down
  const strands = 12;
  for (let s = 0; s < strands; s++) {
    const angle = (s / strands) * Math.PI * 0.7 + 0.15 * Math.PI;
    const startR = 80;
    const endR = 200 + rng() * 180;
    const sx = cx + Math.cos(angle) * startR;
    const sy = 20 + Math.sin(angle) * startR;
    const ex = cx + Math.cos(angle) * endR;
    const ey = 20 + Math.sin(angle) * endR + 80;

    // Wire line
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.strokeStyle = rgba(config.primary, 0.08);
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Crystal drops along strand
    const drops = 3 + Math.floor(rng() * 3);
    for (let d = 0; d < drops; d++) {
      const t = 0.3 + (d / drops) * 0.7;
      const dx = sx + (ex - sx) * t;
      const dy = sy + (ey - sy) * t;
      const size = 2 + rng() * 3;
      // Diamond shape
      ctx.beginPath();
      ctx.moveTo(dx, dy - size);
      ctx.lineTo(dx + size * 0.6, dy);
      ctx.lineTo(dx, dy + size);
      ctx.lineTo(dx - size * 0.6, dy);
      ctx.closePath();
      ctx.fillStyle = rgba(config.primary, 0.15 + rng() * 0.15);
      ctx.fill();
    }
  }

  // Horizontal gold rule (thin, elegant)
  ctx.strokeStyle = rgba(config.primary, 0.25);
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(cx - 200, H / 2 + 75);
  ctx.lineTo(cx + 200, H / 2 + 75);
  ctx.stroke();

  // Small ornamental diamond at center of rule
  const ry = H / 2 + 75;
  ctx.beginPath();
  ctx.moveTo(cx, ry - 5);
  ctx.lineTo(cx + 4, ry);
  ctx.lineTo(cx, ry + 5);
  ctx.lineTo(cx - 4, ry);
  ctx.closePath();
  ctx.fillStyle = rgba(config.primary, 0.35);
  ctx.fill();

  // Corner accents -- vine/leaf inspired
  const cornerInset = 35;
  const cornerLen = 50;
  ctx.strokeStyle = rgba(config.primary, 0.18);
  ctx.lineWidth = 0.8;
  // Top-left arc
  ctx.beginPath();
  ctx.arc(cornerInset + cornerLen, cornerInset + cornerLen, cornerLen, Math.PI, 1.5 * Math.PI);
  ctx.stroke();
  // Top-right arc
  ctx.beginPath();
  ctx.arc(W - cornerInset - cornerLen, cornerInset + cornerLen, cornerLen, 1.5 * Math.PI, 2 * Math.PI);
  ctx.stroke();
  // Bottom-left arc
  ctx.beginPath();
  ctx.arc(cornerInset + cornerLen, H - cornerInset - cornerLen, cornerLen, 0.5 * Math.PI, Math.PI);
  ctx.stroke();
  // Bottom-right arc
  ctx.beginPath();
  ctx.arc(W - cornerInset - cornerLen, H - cornerInset - cornerLen, cornerLen, 0, 0.5 * Math.PI);
  ctx.stroke();

  // Scattered ambient particles (warm gold dust)
  for (let i = 0; i < 60; i++) {
    const x = rng() * W;
    const y = rng() * H;
    const r = 0.5 + rng() * 1.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = rgba(config.primary, 0.03 + rng() * 0.06);
    ctx.fill();
  }
}

// ===========================================================================
// CRESTBORNE -- Midnight void, gravitational lens rings, sage particles
// ===========================================================================
function renderCrestborne(ctx, config, rng) {
  // Deep midnight void base
  ctx.fillStyle = '#050a16';
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;
  const cy = H / 2;

  // Subtle sage radial glow at center (gravitational mass)
  const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 320);
  g1.addColorStop(0, rgba(config.primary, 0.12));
  g1.addColorStop(0.4, rgba(config.primary, 0.04));
  g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  // Secondary glow top-right
  const g2 = ctx.createRadialGradient(W * 0.75, H * 0.15, 0, W * 0.75, H * 0.15, 250);
  g2.addColorStop(0, rgba(config.secondary, 0.08));
  g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  // Gravitational lens rings (concentric ellipses)
  for (let i = 0; i < 6; i++) {
    const radius = 80 + i * 45;
    const alpha = 0.04 + (1 - i / 6) * 0.08;
    ctx.beginPath();
    ctx.ellipse(cx, cy, radius, radius * 0.6, 0, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(config.primary, alpha);
    ctx.lineWidth = 0.5 + (1 - i / 6) * 0.5;
    ctx.stroke();
  }

  // Orbital particle trails (curved arcs around center)
  for (let i = 0; i < 40; i++) {
    const angle = rng() * Math.PI * 2;
    const r = 60 + rng() * 280;
    const arcLen = 0.2 + rng() * 0.6;
    ctx.beginPath();
    ctx.ellipse(cx, cy, r, r * (0.4 + rng() * 0.3), angle * 0.3, angle, angle + arcLen);
    ctx.strokeStyle = rgba(config.primary, 0.05 + rng() * 0.12);
    ctx.lineWidth = 0.4 + rng() * 0.8;
    ctx.stroke();
  }

  // Sage particles scattered around the gravitational center
  for (let i = 0; i < 120; i++) {
    const angle = rng() * Math.PI * 2;
    const dist = 30 + rng() * 350;
    const x = cx + Math.cos(angle) * dist;
    const y = cy + Math.sin(angle) * dist * 0.55;
    const size = 0.5 + rng() * 2;
    const alpha = 0.04 + rng() * 0.15;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = rgba(i % 4 === 0 ? config.secondary : config.primary, alpha);
    ctx.fill();
  }

  // Dark void at center
  const voidGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 35);
  voidGrad.addColorStop(0, 'rgba(0,0,0,0.9)');
  voidGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = voidGrad;
  ctx.fillRect(cx - 40, cy - 40, 80, 80);

  // Corner brackets (sage)
  const bracketSize = 28;
  const bracketInset = 35;
  ctx.strokeStyle = rgba(config.primary, 0.2);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(bracketInset, bracketInset + bracketSize);
  ctx.lineTo(bracketInset, bracketInset);
  ctx.lineTo(bracketInset + bracketSize, bracketInset);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(W - bracketInset - bracketSize, bracketInset);
  ctx.lineTo(W - bracketInset, bracketInset);
  ctx.lineTo(W - bracketInset, bracketInset + bracketSize);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(bracketInset, H - bracketInset - bracketSize);
  ctx.lineTo(bracketInset, H - bracketInset);
  ctx.lineTo(bracketInset + bracketSize, H - bracketInset);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(W - bracketInset - bracketSize, H - bracketInset);
  ctx.lineTo(W - bracketInset, H - bracketInset);
  ctx.lineTo(W - bracketInset, H - bracketInset - bracketSize);
  ctx.stroke();

  // Horizontal rule accents
  ctx.strokeStyle = rgba(config.primary, 0.15);
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(cx - 200, cy - 80);
  ctx.lineTo(cx + 200, cy - 80);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - 200, cy + 80);
  ctx.lineTo(cx + 200, cy + 80);
  ctx.stroke();
}

function renderTypography(ctx, config) {
  const cx = W / 2;
  const cy = H / 2;
  const fontFamily = `"${config.font}"`;

  const titleLines = config.title.split('\n');
  const isMultiLine = titleLines.length > 1;
  const titleSize = isMultiLine ? 50 : 58;

  // Eyebrow
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = rgba(config.primary, 0.8);
  const eyebrowY = cy - 100;
  drawLetterSpaced(ctx, config.eyebrow, cx, eyebrowY, 4, `12px ${fontFamily}`);

  // Title
  ctx.fillStyle = rgba('#ffffff', 0.95);
  let taglineY;
  if (isMultiLine) {
    const lineHeight = titleSize * 1.2;
    const blockHeight = lineHeight * (titleLines.length - 1);
    const startY = cy - blockHeight / 2 - 5;
    titleLines.forEach((line, i) => {
      ctx.font = `${titleSize}px ${fontFamily}`;
      ctx.fillText(line, cx, startY + i * lineHeight);
    });
    taglineY = startY + blockHeight + 40;
  } else {
    ctx.font = `${titleSize}px ${fontFamily}`;
    ctx.fillText(config.title, cx, cy - 15);
    taglineY = cy + 55;
  }

  // Tagline
  ctx.font = `16px ${fontFamily}`;
  ctx.fillStyle = rgba('#ffffff', 0.45);
  ctx.fillText(config.tagline, cx, taglineY);
}

function drawLetterSpaced(ctx, text, x, y, spacing, font) {
  ctx.font = font;
  let totalWidth = 0;
  for (let i = 0; i < text.length; i++) {
    totalWidth += ctx.measureText(text[i]).width + (i < text.length - 1 ? spacing : 0);
  }
  let curX = x - totalWidth / 2;
  for (let i = 0; i < text.length; i++) {
    ctx.fillText(text[i], curX + ctx.measureText(text[i]).width / 2, y);
    curX += ctx.measureText(text[i]).width + spacing;
  }
}

// ---------------------------------------------------------------------------
// Watermark
// ---------------------------------------------------------------------------
function renderWatermark(ctx) {
  const cx = W / 2;
  const bottomY = H - 28;

  ctx.strokeStyle = rgba('#ffffff', 0.08);
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(cx - 30, bottomY - 14);
  ctx.lineTo(cx + 30, bottomY - 14);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '10px Georgia';
  ctx.fillStyle = rgba('#ffffff', 0.18);
  ctx.fillText('projectlavos.com', cx, bottomY);
}

// ---------------------------------------------------------------------------
// Main render
// ---------------------------------------------------------------------------
function renderOG(config) {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  const seedMap = {
    scout: 42, morgan: 137, pillar: 256,
    fulltilt: 314, caviar: 421, tomdrexler: 512,
    halsey: 618, springhurst: 729, dgv: 833, uofl: 947,
    holland: 1051, highland: 1163, lawnco: 1279, regina: 1387,
    tonini: 1493, tasteful: 1601, kentuckiana: 1717, kuhn: 1823,
    clementine: 1937,
  };
  const rng = mulberry32(seedMap[config.key]);

  // Per-site renderer (background + accents combined)
  const renderers = {
    scout: renderScout,
    morgan: renderMorgan,
    pillar: renderPillar,
    fulltilt: renderFullTilt,
    caviar: renderCaviar,
    tomdrexler: renderTomDrexler,
    halsey: renderHalsey,
    springhurst: renderSpringhurst,
    dgv: renderDgv,
    uofl: renderUofL,
    holland: renderHolland,
    highland: renderHighland,
    lawnco: renderLawnco,
    regina: renderRegina,
    tonini: renderTonini,
    tasteful: renderTasteful,
    kentuckiana: renderKentuckiana,
    kuhn: renderKuhn,
    clementine: renderClementine,
    crestborne: renderCrestborne,
  };
  renderers[config.key](ctx, config, rng);

  // Shared layers
  renderTypography(ctx, config);
  renderWatermark(ctx);

  return canvas.toBuffer('image/png');
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
function main() {
  const args = process.argv.slice(2);
  const batch = args.includes('--batch');
  const siteIdx = args.indexOf('--site');
  const outputIdx = args.indexOf('--output');

  if (!batch && siteIdx === -1) {
    console.log('Usage:');
    console.log('  node create-cinematic-og.js --batch');
    console.log('  node create-cinematic-og.js --site <scout|morgan|pillar> [--output <path>]');
    process.exit(1);
  }

  const sites = batch
    ? Object.keys(SITE_CONFIGS)
    : [args[siteIdx + 1]];

  sites.forEach((siteKey) => {
    const config = SITE_CONFIGS[siteKey];
    if (!config) {
      console.error(`Unknown site: ${siteKey}`);
      process.exit(1);
    }

    const png = renderOG(config);

    let outputPath;
    if (outputIdx !== -1 && !batch) {
      outputPath = args[outputIdx + 1];
    } else {
      outputPath = path.join(CLIENT_SITES, config.dir, 'public', 'og-image.png');
    }

    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, png);
    const size = (png.length / 1024).toFixed(1);
    console.log(`[${config.key}] ${size}KB -> ${outputPath}`);
  });

  console.log('Done.');
}

main();
