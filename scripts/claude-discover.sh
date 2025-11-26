#!/bin/bash
# claude-discover: Automated deployment discovery and comparison
# Usage: claude-discover <url-or-project-name>

set -e

URL=$1
if [ -z "$URL" ]; then
    echo "Usage: claude-discover <url-or-project-name>"
    echo "Example: claude-discover https://myapp.vercel.app"
    echo "Example: claude-discover myproject"
    exit 1
fi

echo "🔍 Starting deployment discovery for: $URL"
echo ""

# Detect platform
if [[ $URL == *"vercel.app"* ]] || command -v vercel &> /dev/null; then
    PLATFORM="vercel"
elif [[ $URL == *"railway.app"* ]] || command -v railway &> /dev/null; then
    PLATFORM="railway"
elif [[ $URL == *"netlify.app"* ]] || command -v netlify &> /dev/null; then
    PLATFORM="netlify"
else
    PLATFORM="unknown"
fi

echo "📦 Detected platform: $PLATFORM"
echo ""

# List all deployments
echo "📋 Listing all deployments..."
case $PLATFORM in
    vercel)
        if command -v vercel &> /dev/null; then
            vercel list 2>/dev/null || echo "  (Run 'vercel login' first)"
        else
            echo "  Install: npm i -g vercel"
        fi
        ;;
    railway)
        if command -v railway &> /dev/null; then
            railway status 2>/dev/null || echo "  (Run 'railway login' first)"
        else
            echo "  Install: brew install railway"
        fi
        ;;
    netlify)
        if command -v netlify &> /dev/null; then
            netlify sites:list 2>/dev/null || echo "  (Run 'netlify login' first)"
        else
            echo "  Install: npm i -g netlify-cli"
        fi
        ;;
esac

echo ""
echo "🧪 Testing URL with browser..."
echo ""

# Create temporary Playwright test
TEMP_TEST="/tmp/claude-discover-test.spec.js"
cat > "$TEMP_TEST" << 'EOF'
import { test } from '@playwright/test';

const url = process.env.TEST_URL;

test('Deployment Discovery Test', async ({ page }) => {
  console.log(`\n🌐 Testing: ${url}\n`);

  try {
    await page.goto(url, { timeout: 10000 });

    const title = await page.title();
    console.log(`✅ Loads successfully`);
    console.log(`📄 Title: ${title}`);

    const h1 = await page.locator('h1').first().textContent().catch(() => 'None');
    console.log(`📰 Main heading: ${h1}`);

    const hasLogin = await page.locator('input[type="password"]').count() > 0;
    console.log(`${hasLogin ? '✅' : '❌'} Login form: ${hasLogin ? 'Present' : 'Missing'}`);

    const hasNav = await page.locator('nav, button:has-text("Ideas"), button:has-text("Calendar")').count() > 0;
    console.log(`${hasNav ? '✅' : '❌'} Navigation: ${hasNav ? 'Present' : 'Missing'}`);

    const screenshot = `/tmp/discovery-${Date.now()}.png`;
    await page.screenshot({ path: screenshot, fullPage: true });
    console.log(`📸 Screenshot: ${screenshot}`);
    console.log(`   View with: open ${screenshot}`);

  } catch (error) {
    console.log(`❌ Failed to load: ${error.message}`);
  }
});
EOF

# Run test
TEST_URL="$URL" npx playwright test "$TEMP_TEST" --reporter=line 2>/dev/null || {
    echo "⚠️  Playwright not installed. Install with:"
    echo "   npm install -D @playwright/test"
    echo "   npx playwright install chromium"
}

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "📊 NEXT STEPS:"
echo "1. Review screenshots in /tmp/"
echo "2. Compare UI quality of all found deployments"
echo "3. Decide which to use as foundation"
echo "4. Ask Claude to build on the chosen deployment"
echo "═══════════════════════════════════════════════════════════"
echo ""
