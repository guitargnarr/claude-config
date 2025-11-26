You are about to run deployment discovery on a project.

MANDATORY STEPS - Do NOT skip:

1. **Platform Detection:**
   - Extract domain from URL user provided
   - Detect platform: Vercel, Railway, Netlify, GitHub Pages, or custom
   - Check for CLI tools: `vercel list`, `railway status`, `netlify sites:list`

2. **List ALL Deployments:**
   - Run platform CLI commands to list projects
   - Check dashboards if CLI unavailable
   - Document every URL found (production, preview, staging, custom domains)

3. **Test Each URL with Playwright:**
   - Install @playwright/test if needed
   - Create test script that checks EACH URL:
     * Does it load? (HTTP status)
     * Screenshot (full page)
     * UI quality assessment
     * Features present (login? nav? CRUD?)
     * Backend connectivity
   - Generate comparison screenshots

4. **Quality Comparison:**
   - Rate each deployment's UI (1-5 stars)
   - Assess functionality (working features vs broken)
   - Identify which has best UX/design
   - Identify which has best functionality
   - Note any that are 404/broken

5. **Generate Report:**
   - Create markdown table comparing all deployments
   - Include screenshots inline or as links
   - Provide CLEAR recommendation
   - Explain trade-offs

6. **Present to User:**
   - Show full comparison
   - Recommend which to build on (with reasoning)
   - Ask explicit question: "Which should we enhance?"
   - WAIT for user decision before coding

**CRITICAL:** Do NOT start building until user confirms which deployment to use as foundation.

**Time budget:** 15-20 minutes for discovery
**Output:** Comprehensive comparison report + recommendation

This prevents building on wrong codebase and wasting hours of work.
