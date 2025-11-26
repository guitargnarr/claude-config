#!/usr/bin/env python3
"""
claude-discover: Comprehensive deployment discovery and comparison
Prevents building on wrong codebase by testing ALL deployments first
"""

import subprocess
import sys
import json
import os
from urllib.parse import urlparse
from pathlib import Path

def detect_platform(url):
    """Detect deployment platform from URL"""
    if 'vercel.app' in url:
        return 'vercel'
    elif 'railway.app' in url:
        return 'railway'
    elif 'netlify.app' in url:
        return 'netlify'
    elif 'github.io' in url:
        return 'github-pages'
    else:
        return 'unknown'

def list_vercel_deployments():
    """List all Vercel deployments"""
    try:
        result = subprocess.run(
            ['vercel', 'list'],
            capture_output=True,
            text=True,
            timeout=10
        )
        return result.stdout
    except:
        return None

def list_railway_projects():
    """List all Railway projects"""
    try:
        result = subprocess.run(
            ['railway', 'status'],
            capture_output=True,
            text=True,
            timeout=10
        )
        return result.stdout
    except:
        return None

def test_url_basic(url):
    """Basic HTTP test of URL"""
    try:
        result = subprocess.run(
            ['curl', '-I', '-s', '-L', url],
            capture_output=True,
            text=True,
            timeout=10
        )
        if '200 OK' in result.stdout or 'HTTP/2 200' in result.stdout:
            return 'ONLINE', result.stdout
        elif '404' in result.stdout:
            return 'NOT_FOUND', result.stdout
        elif '401' in result.stdout:
            return 'AUTH_REQUIRED', result.stdout
        elif '502' in result.stdout or '503' in result.stdout:
            return 'SERVER_ERROR', result.stdout
        else:
            return 'UNKNOWN', result.stdout
    except:
        return 'FAILED', 'Connection failed'

def main():
    if len(sys.argv) < 2:
        print("Usage: claude-discover <url>")
        print("Example: claude-discover https://myapp.vercel.app")
        sys.exit(1)

    url = sys.argv[1]

    print("🔍 Deployment Discovery Protocol")
    print("=" * 60)
    print(f"\n🌐 Target URL: {url}\n")

    # Step 1: Platform detection
    platform = detect_platform(url)
    print(f"📦 Platform: {platform}")

    # Step 2: List all deployments
    print(f"\n📋 Discovering all {platform} deployments...\n")

    if platform == 'vercel':
        deployments = list_vercel_deployments()
        if deployments:
            print(deployments)
        else:
            print("  ⚠️  Vercel CLI not configured. Run: vercel login")

    elif platform == 'railway':
        projects = list_railway_projects()
        if projects:
            print(projects)
        else:
            print("  ⚠️  Railway CLI not configured. Run: railway login")

    # Step 3: Test target URL
    print(f"\n🧪 Testing target URL...\n")
    status, response = test_url_basic(url)

    if status == 'ONLINE':
        print(f"  ✅ Status: ONLINE (HTTP 200)")
    elif status == 'AUTH_REQUIRED':
        print(f"  🔒 Status: AUTH REQUIRED (HTTP 401)")
        print(f"     → Might be working but password-protected")
    elif status == 'NOT_FOUND':
        print(f"  ❌ Status: NOT FOUND (HTTP 404)")
    elif status == 'SERVER_ERROR':
        print(f"  ⚠️  Status: SERVER ERROR (HTTP 502/503)")
    else:
        print(f"  ❌ Status: {status}")

    # Step 4: Recommendations
    print("\n" + "=" * 60)
    print("📊 RECOMMENDED NEXT STEPS:")
    print("=" * 60)
    print("\n1. Use Playwright to test ALL found deployments")
    print("   cd <project-dir>")
    print("   npx playwright test <test-file>")
    print("\n2. Compare UI quality visually")
    print("   - Open screenshots side-by-side")
    print("   - Rate UX/design (1-5 stars)")
    print("\n3. Test functionality")
    print("   - Which has working features?")
    print("   - Which has backend connected?")
    print("\n4. Choose foundation")
    print("   - Best UI + Working backend = ideal")
    print("   - Ask user which to build on")
    print("\n5. THEN start coding")
    print("   - Never assume local code is canonical")
    print("   - Build on the chosen deployment\n")

    print("💡 TIP: When in Claude Code session, use /discover command")
    print("   This triggers full protocol with Playwright tests\n")

if __name__ == '__main__':
    main()
