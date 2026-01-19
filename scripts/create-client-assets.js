#!/usr/bin/env node
/**
 * Client Site Asset Generator
 * Creates all required assets for a client site and portfolio entry
 *
 * Usage: node create-client-assets.js <site-name> <mobile-screenshot> [--colors primary,secondary]
 *
 * Generates:
 * - iPhone mockup (430x880)
 * - OG image (1200x630)
 * - QR code (370x370)
 * - Favicon (32x32, 16x16, 180x180)
 *
 * Requirements: npm install canvas qrcode
 *
 * Created: January 2026
 */

const { createCanvas, loadImage } = require('canvas');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Default brand colors (copper/amber for breweries, teal for default)
const DEFAULT_COLORS = {
  primary: '#14b8a6',   // teal-500
  secondary: '#f97316', // orange-500
  dark: '#1a1a1a'
};

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log(`
Client Site Asset Generator

Usage: node create-client-assets.js <site-name> <mobile-screenshot> [options]

Options:
  --colors <primary,secondary>  Brand colors (hex, comma-separated)
  --title <title>               Display title for OG image
  --subtitle <subtitle>         Subtitle for OG image
  --url <url>                   Site URL (default: https://<site-name>.vercel.app)
  --output <dir>                Output directory (default: ./output)

Example:
  node create-client-assets.js copper-barrel-brewing ./mobile.png --colors "#b45309,#78350f" --title "Copper Barrel" --subtitle "Brewing Co."
`);
    process.exit(1);
  }

  const siteName = args[0];
  const screenshotPath = args[1];

  let options = {
    siteName,
    screenshotPath,
    colors: { ...DEFAULT_COLORS },
    title: siteName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    subtitle: '',
    url: `https://${siteName}.vercel.app`,
    output: './output'
  };

  for (let i = 2; i < args.length; i++) {
    if (args[i] === '--colors' && args[i + 1]) {
      const [primary, secondary] = args[i + 1].split(',');
      options.colors.primary = primary || options.colors.primary;
      options.colors.secondary = secondary || options.colors.secondary;
      i++;
    } else if (args[i] === '--title' && args[i + 1]) {
      options.title = args[i + 1];
      i++;
    } else if (args[i] === '--subtitle' && args[i + 1]) {
      options.subtitle = args[i + 1];
      i++;
    } else if (args[i] === '--url' && args[i + 1]) {
      options.url = args[i + 1];
      i++;
    } else if (args[i] === '--output' && args[i + 1]) {
      options.output = args[i + 1];
      i++;
    }
  }

  return options;
}

// Helper function for rounded rectangles
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// Create iPhone mockup
async function createiPhoneMockup(inputPath, outputPath) {
  const frameWidth = 430;
  const frameHeight = 880;
  const screenWidth = 390;
  const screenHeight = 844;
  const borderRadius = 55;
  const bezelWidth = (frameWidth - screenWidth) / 2;

  const canvas = createCanvas(frameWidth, frameHeight);
  const ctx = canvas.getContext('2d');

  // Frame
  ctx.fillStyle = '#1a1a1a';
  roundRect(ctx, 0, 0, frameWidth, frameHeight, borderRadius);
  ctx.fill();

  // Bezel
  ctx.fillStyle = '#0f0f0f';
  roundRect(ctx, bezelWidth - 2, bezelWidth - 2, screenWidth + 4, screenHeight + 4, borderRadius - 8);
  ctx.fill();

  // Screenshot
  const screenshot = await loadImage(inputPath);
  ctx.save();
  ctx.beginPath();
  roundRect(ctx, bezelWidth, bezelWidth, screenWidth, screenHeight, borderRadius - 10);
  ctx.clip();
  ctx.drawImage(screenshot, bezelWidth, bezelWidth, screenWidth, screenHeight);
  ctx.restore();

  // Dynamic Island
  ctx.fillStyle = '#000000';
  roundRect(ctx, (frameWidth - 120) / 2, bezelWidth + 12, 120, 35, 17);
  ctx.fill();

  // Buttons
  ctx.fillStyle = '#2a2a2a';
  roundRect(ctx, frameWidth - 3, 180, 3, 80, 1);
  ctx.fill();
  roundRect(ctx, 0, 160, 3, 35, 1);
  ctx.fill();
  roundRect(ctx, 0, 210, 3, 55, 1);
  ctx.fill();

  fs.writeFileSync(outputPath, canvas.toBuffer('image/png'));
  console.log('  iPhone mockup:', outputPath);
}

// Create OG image
async function createOGImage(screenshotPath, outputPath, options) {
  const width = 1200;
  const height = 630;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, options.colors.primary);
  gradient.addColorStop(1, options.colors.secondary || options.colors.primary);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Texture
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  for (let i = 0; i < 30; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 100 + 50, 0, Math.PI * 2);
    ctx.fill();
  }

  // Phone mockup on left
  try {
    const screenshot = await loadImage(screenshotPath);
    const phoneWidth = 280;
    const phoneHeight = 570;
    const phoneX = 80;
    const phoneY = (height - phoneHeight) / 2;

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    roundRect(ctx, phoneX + 10, phoneY + 10, phoneWidth, phoneHeight, 35);
    ctx.fill();

    // Frame
    ctx.fillStyle = '#1a1a1a';
    roundRect(ctx, phoneX, phoneY, phoneWidth, phoneHeight, 35);
    ctx.fill();

    // Screen
    ctx.save();
    ctx.beginPath();
    roundRect(ctx, phoneX + 12, phoneY + 12, phoneWidth - 24, phoneHeight - 24, 28);
    ctx.clip();
    ctx.drawImage(screenshot, phoneX + 12, phoneY + 12, phoneWidth - 24, phoneHeight - 24);
    ctx.restore();

    // Notch
    ctx.fillStyle = '#000';
    roundRect(ctx, phoneX + (phoneWidth - 80) / 2, phoneY + 20, 80, 24, 12);
    ctx.fill();
  } catch (e) {
    console.log('  Warning: Could not load screenshot for OG image');
  }

  // Text
  const textX = 420;

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 64px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillText(options.title, textX, 260);

  if (options.subtitle) {
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.font = '32px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(options.subtitle, textX, 320);
  }

  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = '20px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillText(options.url.replace('https://', ''), textX, 550);

  // Badge
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  roundRect(ctx, textX, 480, 220, 40, 8);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.font = '16px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillText('Built by projectlavos.com', textX + 15, 506);

  fs.writeFileSync(outputPath, canvas.toBuffer('image/png'));
  console.log('  OG image:', outputPath);
}

// Create QR code
async function createQRCode(url, outputPath) {
  await QRCode.toFile(outputPath, url, {
    width: 370,
    margin: 2,
    color: { dark: '#000000', light: '#ffffff' }
  });
  console.log('  QR code:', outputPath);
}

// Create favicon
function createFavicon(outputPath, size, initials, color) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  const fontSize = Math.floor(size * 0.45);
  ctx.font = `bold ${fontSize}px -apple-system, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(initials, size/2, size/2 + 1);

  fs.writeFileSync(outputPath, canvas.toBuffer('image/png'));
}

// Main execution
async function main() {
  const options = parseArgs();

  // Validate input
  if (!fs.existsSync(options.screenshotPath)) {
    console.error('Error: Screenshot not found:', options.screenshotPath);
    process.exit(1);
  }

  // Create output directory
  if (!fs.existsSync(options.output)) {
    fs.mkdirSync(options.output, { recursive: true });
  }

  console.log(`\nGenerating assets for: ${options.siteName}`);
  console.log(`Output directory: ${options.output}\n`);

  // Get initials for favicon
  const initials = options.title
    .split(' ')
    .slice(0, 2)
    .map(w => w.charAt(0).toUpperCase())
    .join('');

  // Generate all assets
  await createiPhoneMockup(
    options.screenshotPath,
    path.join(options.output, `${options.siteName}-preview.png`)
  );

  await createOGImage(
    options.screenshotPath,
    path.join(options.output, `${options.siteName}-og.png`),
    options
  );

  await createQRCode(
    options.url,
    path.join(options.output, `${options.siteName}-qr.png`)
  );

  // Favicons
  console.log('  Favicons:');
  createFavicon(path.join(options.output, 'favicon-32.png'), 32, initials, options.colors.primary);
  createFavicon(path.join(options.output, 'favicon-16.png'), 16, initials, options.colors.primary);
  createFavicon(path.join(options.output, 'apple-touch-icon.png'), 180, initials, options.colors.primary);
  console.log(`    - favicon-32.png, favicon-16.png, apple-touch-icon.png`);

  console.log(`\nAll assets generated successfully!`);
  console.log(`\nNext steps:`);
  console.log(`  1. Copy preview to: ~/Projects/projectlavos-monorepo/main-site/public/previews/`);
  console.log(`  2. Copy OG image to: ~/Projects/projectlavos-monorepo/main-site/public/og-images/`);
  console.log(`  3. Copy QR code to: ~/Projects/projectlavos-monorepo/main-site/public/qr-codes/`);
  console.log(`  4. Copy favicons to client site: ~/Projects/client-sites/${options.siteName}/public/`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
