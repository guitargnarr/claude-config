#!/usr/bin/env node
/**
 * iPhone Mockup Generator
 * Creates an iPhone 14 Pro device frame around a mobile screenshot
 *
 * Usage: node create-iphone-mockup.js <input.png> <output.png>
 *
 * Requirements: npm install canvas
 *
 * Created: January 2026
 */

const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

async function createiPhoneMockup(inputPath, outputPath) {
  // iPhone 14 Pro dimensions
  const frameWidth = 430;
  const frameHeight = 880;
  const screenWidth = 390;
  const screenHeight = 844;
  const borderRadius = 55;
  const bezelWidth = (frameWidth - screenWidth) / 2;

  const canvas = createCanvas(frameWidth, frameHeight);
  const ctx = canvas.getContext('2d');

  // Draw iPhone frame (dark gray/black)
  ctx.fillStyle = '#1a1a1a';
  roundRect(ctx, 0, 0, frameWidth, frameHeight, borderRadius);
  ctx.fill();

  // Draw screen bezel (slightly lighter)
  ctx.fillStyle = '#0f0f0f';
  roundRect(ctx, bezelWidth - 2, bezelWidth - 2, screenWidth + 4, screenHeight + 4, borderRadius - 8);
  ctx.fill();

  // Load and draw screenshot
  const screenshot = await loadImage(inputPath);

  // Clip to rounded rectangle for screen
  ctx.save();
  ctx.beginPath();
  roundRect(ctx, bezelWidth, bezelWidth, screenWidth, screenHeight, borderRadius - 10);
  ctx.clip();

  // Draw screenshot scaled to fit
  ctx.drawImage(screenshot, bezelWidth, bezelWidth, screenWidth, screenHeight);
  ctx.restore();

  // Draw Dynamic Island (notch)
  ctx.fillStyle = '#000000';
  const notchWidth = 120;
  const notchHeight = 35;
  const notchX = (frameWidth - notchWidth) / 2;
  const notchY = bezelWidth + 12;
  roundRect(ctx, notchX, notchY, notchWidth, notchHeight, 17);
  ctx.fill();

  // Draw side button (right - power)
  ctx.fillStyle = '#2a2a2a';
  roundRect(ctx, frameWidth - 3, 180, 3, 80, 1);
  ctx.fill();

  // Draw volume buttons (left)
  roundRect(ctx, 0, 160, 3, 35, 1);
  ctx.fill();
  roundRect(ctx, 0, 210, 3, 55, 1);
  ctx.fill();

  // Save output
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  console.log('iPhone mockup created:', outputPath);
  console.log('Dimensions:', frameWidth, 'x', frameHeight);
}

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

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Usage: node create-iphone-mockup.js <input.png> <output.png>');
    console.log('');
    console.log('Example:');
    console.log('  node create-iphone-mockup.js mobile-screenshot.png iphone-mockup.png');
    process.exit(1);
  }

  const [inputPath, outputPath] = args;

  if (!fs.existsSync(inputPath)) {
    console.error('Error: Input file not found:', inputPath);
    process.exit(1);
  }

  createiPhoneMockup(inputPath, outputPath)
    .then(() => process.exit(0))
    .catch(err => {
      console.error('Error:', err.message);
      process.exit(1);
    });
}

module.exports = { createiPhoneMockup };
