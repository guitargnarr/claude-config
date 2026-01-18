#!/bin/bash
# Mobile Verification Script
# Captures desktop + mobile screenshots for visual comparison
# Usage: mobile-verify.sh <url> [output-dir]

set -e

URL="${1:-}"
OUTPUT_DIR="${2:-./screenshots}"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

if [ -z "$URL" ]; then
    echo -e "${RED}Usage: mobile-verify.sh <url> [output-dir]${NC}"
    echo ""
    echo "Examples:"
    echo "  mobile-verify.sh https://north-lime-coffee.vercel.app"
    echo "  mobile-verify.sh https://hideaway-saloon.vercel.app ./my-screenshots"
    echo ""
    echo "Viewports captured:"
    echo "  Desktop: 1280x800"
    echo "  Mobile:  375x667 (iPhone SE)"
    exit 1
fi

# Extract domain for filename
DOMAIN=$(echo "$URL" | sed -E 's|https?://||' | sed 's|/.*||' | sed 's|\.vercel\.app||' | sed 's|\.||g')

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo -e "${YELLOW}Mobile Verification: $URL${NC}"
echo "Output: $OUTPUT_DIR"
echo ""

# Desktop screenshot
echo -e "Capturing ${GREEN}desktop${NC} (1280x800)..."
npx playwright screenshot \
    --viewport-size="1280,800" \
    --wait-for-timeout=5000 \
    --full-page \
    "$URL" \
    "$OUTPUT_DIR/${DOMAIN}-desktop-${TIMESTAMP}.png" 2>/dev/null

# Mobile screenshot
echo -e "Capturing ${GREEN}mobile${NC} (375x667)..."
npx playwright screenshot \
    --viewport-size="375,667" \
    --wait-for-timeout=5000 \
    --full-page \
    "$URL" \
    "$OUTPUT_DIR/${DOMAIN}-mobile-${TIMESTAMP}.png" 2>/dev/null

echo ""
echo -e "${GREEN}Screenshots saved:${NC}"
echo "  Desktop: $OUTPUT_DIR/${DOMAIN}-desktop-${TIMESTAMP}.png"
echo "  Mobile:  $OUTPUT_DIR/${DOMAIN}-mobile-${TIMESTAMP}.png"
echo ""

# Quick visual check hints
echo -e "${YELLOW}Visual Check Hints:${NC}"
echo "  - Hero text readable on mobile?"
echo "  - Navigation accessible (hamburger menu)?"
echo "  - CTAs tappable (min 44x44px)?"
echo "  - No horizontal scroll?"
echo "  - Images not cut off?"
echo ""
echo -e "Open with: ${GREEN}open $OUTPUT_DIR/${DOMAIN}-mobile-${TIMESTAMP}.png${NC}"
