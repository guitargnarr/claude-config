#!/bin/bash
# Batch Mobile Verification Script
# Captures mobile screenshots for multiple URLs
# Usage: mobile-verify-batch.sh [output-dir]

set -e

OUTPUT_DIR="${1:-./mobile-audit-$(date +%Y%m%d)}"
SCRIPT_DIR="$(dirname "$0")"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# Client demo sites to verify (top 10 highest value)
URLS=(
    "https://hideaway-saloon.vercel.app"
    "https://genesis-diamonds.vercel.app"
    "https://headliners-louisville.vercel.app"
    "https://fritz-salon.vercel.app"
    "https://affinity-dental.vercel.app"
    "https://dupont-pediatric-dentistry.vercel.app"
    "https://kentuckiana-gastro.vercel.app"
    "https://north-lime-coffee.vercel.app"
    "https://rejuvenation-med-spa.vercel.app"
    "https://primary-express-care.vercel.app"
)

mkdir -p "$OUTPUT_DIR"

echo -e "${CYAN}========================================${NC}"
echo -e "${CYAN}  Mobile Verification Batch Audit${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""
echo "Output directory: $OUTPUT_DIR"
echo "Sites to verify: ${#URLS[@]}"
echo ""

PASSED=0
FAILED=0

for URL in "${URLS[@]}"; do
    DOMAIN=$(echo "$URL" | sed -E 's|https?://||' | sed 's|\.vercel\.app||')
    echo -e "${YELLOW}Verifying:${NC} $DOMAIN"

    # Mobile screenshot only for batch (faster)
    if npx playwright screenshot \
        --viewport-size="375,667" \
        --wait-for-timeout=5000 \
        "$URL" \
        "$OUTPUT_DIR/${DOMAIN}-mobile.png" 2>/dev/null; then
        echo -e "  ${GREEN}OK${NC} - Screenshot captured"
        ((PASSED++))
    else
        echo -e "  ${RED}FAIL${NC} - Could not capture"
        ((FAILED++))
    fi
done

echo ""
echo -e "${CYAN}========================================${NC}"
echo -e "${CYAN}  Results: ${GREEN}$PASSED passed${NC}, ${RED}$FAILED failed${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""
echo "Screenshots saved to: $OUTPUT_DIR/"
echo ""
echo -e "Open all: ${GREEN}open $OUTPUT_DIR/*.png${NC}"
echo ""

# Generate HTML report for easy viewing
cat > "$OUTPUT_DIR/index.html" << 'HTMLEOF'
<!DOCTYPE html>
<html>
<head>
    <title>Mobile Verification Report</title>
    <style>
        body { font-family: -apple-system, sans-serif; padding: 20px; background: #1e293b; color: white; }
        h1 { color: #14b8a6; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .card { background: #334155; border-radius: 12px; overflow: hidden; }
        .card img { width: 100%; height: 400px; object-fit: cover; object-position: top; }
        .card h3 { padding: 12px; margin: 0; font-size: 14px; }
        .timestamp { color: #94a3b8; font-size: 12px; }
    </style>
</head>
<body>
    <h1>Mobile Verification Report</h1>
    <p class="timestamp">Generated: TIMESTAMP_PLACEHOLDER</p>
    <div class="grid">
HTMLEOF

for URL in "${URLS[@]}"; do
    DOMAIN=$(echo "$URL" | sed -E 's|https?://||' | sed 's|\.vercel\.app||')
    if [ -f "$OUTPUT_DIR/${DOMAIN}-mobile.png" ]; then
        cat >> "$OUTPUT_DIR/index.html" << CARDEOF
        <div class="card">
            <img src="${DOMAIN}-mobile.png" alt="$DOMAIN mobile">
            <h3><a href="$URL" target="_blank" style="color: #14b8a6;">$DOMAIN</a></h3>
        </div>
CARDEOF
    fi
done

cat >> "$OUTPUT_DIR/index.html" << 'HTMLEOF'
    </div>
</body>
</html>
HTMLEOF

# Replace timestamp
sed -i '' "s|TIMESTAMP_PLACEHOLDER|$(date)|" "$OUTPUT_DIR/index.html"

echo -e "View report: ${GREEN}open $OUTPUT_DIR/index.html${NC}"
