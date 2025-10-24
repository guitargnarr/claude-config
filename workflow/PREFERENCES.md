# Claude Code Workflow Optimization

---

## Tool Selection Preferences

**Use Claude Code (this tool) for:**
- Resume/cover letter customization (requires file access + /coach model)
- Job tracker updates (JOB_TRACKER_2025.csv modifications)
- Interview prep generation (integrated skills + Ollama models)
- Technical project work (AI/ML systems, automation scripts)
- Data analysis (job search metrics, application tracking)
- File creation/editing (any persistent outputs)
- Automation (repeated tasks, batch processing)
- Integration workflows (Ollama + files + Git)

**Recommend claude.ai for:**
- Visual artifacts (need to see interactive previews)
- Quick brainstorming (no file system risk)
- Sharing demos (send artifact links to others)
- Research without execution (reading, not doing)

**Workflow pattern:**
1. claude.ai (mobile/web): Initial research, company analysis, job description review
2. Claude Code: Execution (file edits, Ollama calls, tracking updates)
3. claude.ai (web): Final review of tone/presentation
4. Claude Code: Apply final edits and commit

## Output Organization Preferences

**File generation locations:**
- Designs/graphics: `~/Desktop/Designs/` (create if doesn't exist)
- Generated reports: `~/Desktop/Resumes_Master_2025/job_search/reports/`
- Temporary scripts: `~/Desktop/Resumes_Master_2025/scripts/temp/`
- Interview prep: `~/Desktop/Resumes_Master_2025/job_search/interview_prep/`
- Cover letters: `~/Desktop/Resumes_Master_2025/cover_letters/`
- Analysis outputs: `~/Desktop/Resumes_Master_2025/job_search/analysis/`

**Naming conventions:**
- Dates: YYYY-MM-DD format (2025-10-18)
- Designs: `{type}_{purpose}_{date}.{ext}` (e.g., `poster_tech_conference_2025-10-18.png`)
- Reports: `{topic}_report_{date}.{ext}`
- Scripts: `{purpose}_script.py`

## Technical Tool Preferences

**Python libraries (prefer these):**
- **Image generation:** Pillow (PIL), cairo, svgwrite
- **Data visualization:** matplotlib, seaborn, plotly
- **PDF creation:** reportlab, fpdf2
- **Data analysis:** pandas, numpy
- **Web:** FastAPI, requests
- **AI/ML:** transformers, torch

**Installation approach:**
- Use `pip install` for Python packages
- Verify installation before use
- Prefer lightweight libraries (respect disk space: 73% full)

**Code generation:**
- Prioritize local Ollama models (/code command) for Python generation
- Fall back to direct generation for complex tasks
- Always save generated code to files (never just display)
- Include comments explaining logic

## Ollama Model Usage Patterns

**When to automatically invoke models:**
- **/coach**: Any career/interview/background questions, resume customization
- **/louisville**: Company research, market data, Louisville-specific questions
- **/code**: Python script generation requests
- **/analyze**: Data analysis with structured output needed (JSON)
- **/tactic**: Hiring strategy, application tactics, system navigation
- **/humanize**: AI-generated text that needs naturalization
- **/quick**: Simple factual questions requiring brief answers

**Model chaining examples:**
```
Resume customization: /coach (background) → edit files → /humanize (final text)
Job analysis: /louisville (company data) → /tactic (strategy) → update tracker
Code generation: /code (generate) → test → debug → commit
```

## Skill Auto-Activation Preferences

**Auto-activate these skills when relevant:**
- **job-application-tracker**: When discussing applications, submissions, responses
- **interview-prep-auto**: When mentioning upcoming interviews
- **resume-customizer**: When discussing tailoring resumes or sharing job descriptions
- **cover-letter-generator**: After resume customization or when explicitly mentioned

**Integration workflow:**
When user says "I'm applying to [company]":
1. Auto-activate job-application-tracker
2. Call /louisville for company data
3. Call /coach for background alignment
4. Activate resume-customizer skill
5. Activate cover-letter-generator skill
6. Update JOB_TRACKER_2025.csv
7. Commit changes to Git (if in repo)

## Design and Visual Preferences

**For image/graphic generation (canvas-design command):**

**Color preferences:**
- Primary palette: Modern tech blues (#2563eb, #3b82f6, #60a5fa)
- Secondary: Slate grays (#64748b, #475569, #334155)
- Accent: Emerald greens (#10b981, #34d399) for success/growth themes
- Professional: Navy (#1e3a8a) + white (#ffffff) for business contexts

**Typography:**
- Headings: SF Pro Display (macOS system font) or Helvetica Neue Bold
- Body: SF Pro Text or Helvetica Neue Regular
- Monospace: SF Mono or Menlo (for technical content)

**Design philosophy:**
- Clean, minimal, professional
- High contrast for readability
- Generous whitespace
- Avoid cluttered designs
- Tech-forward aesthetic (suitable for AI/ML/QA roles)

**Output formats priority:**
1. PNG (high-res, 300 DPI for print, 72 DPI for screen)
2. PDF (for documents, presentations)
3. SVG (for logos, icons, scalable graphics)

## QR Code Generation

**Personal Profile URLs:**
- **LinkedIn**: https://linkedin.com/in/mscott77
- **GitHub**: https://github.com/mscott77

**QR Code Capabilities** (via QRCodeGenerator class in design_utils.py):
- **Styles**: Square, rounded corners, circular modules
- **Colors**: Custom branding (LinkedIn blue, tech blue, emerald)
- **Logo overlay**: Error correction L/H, centered logo placement
- **Business cards**: Print-ready, 300 DPI, professional layouts
- **Mobile verified**: All QR codes tested and working

**Common use cases:**
```python
# Generate LinkedIn QR code
from design_utils import QRCodeGenerator
qr_gen = QRCodeGenerator()
qr_gen.generate_qr_code(
    data="https://linkedin.com/in/mscott77",
    output_path="~/Desktop/Designs/qr_linkedin.png",
    style="rounded",
    fill_color="#0077B5"  # LinkedIn blue
)

# Business card with QR code
qr_gen.create_qr_business_card(
    name="Matthew David Scott",
    title="Business Analyst | QA Professional",
    qr_data="https://linkedin.com/in/mscott77",
    output_path="~/Desktop/Designs/business_card.png"
)
```

**Templates available:**
- 7 QR code templates in ~/Desktop/Designs/ (square, rounded, circle variants)
- Professional business card template (print-ready, 300 DPI)
- LinkedIn blue, tech blue, emerald color variants

**Integration patterns:**
- Add QR codes to resumes (header/footer)
- Business cards with contact info + QR
- LinkedIn banner with scannable profile link
- Interview portfolio covers

## Animation Capabilities

**Animation System** (via imageio + design_utils.py):
- **Format**: GIF export (infinite loop, customizable FPS)
- **Duration**: Configurable (default 3 seconds)
- **Effects**: Gradient waves, pulsing, fades, color shifts
- **Frame count**: Customizable (default 30 frames)

**Common animation types:**
```python
# Animated gradient background
from design_utils import create_animated_gradient
create_animated_gradient(
    output_path="~/Desktop/Designs/animation_gradient.gif",
    colors=["#2563eb", "#3b82f6", "#60a5fa"],
    duration=3,
    fps=10
)

# Pulsing logo/text
from advanced_design import create_pulsing_animation
create_pulsing_animation(
    text="Matthew Scott",
    output_path="~/Desktop/Designs/animation_pulse.gif",
    duration=2,
    fps=15
)
```

**Use cases:**
- LinkedIn post attention-grabbers
- Resume portfolio highlights
- Email signature animations
- Social media story graphics
- Interview presentation intros

**Performance:**
- GIF optimization via Pillow
- Frame interpolation for smooth motion
- File size optimization (palettes, disposal methods)

## Automation and Execution Preferences

**Default automation behaviors:**
- Always save important outputs to files (never just display)
- Use Git commits for significant file changes (with descriptive messages)
- Execute tests after code generation when applicable
- Provide file paths in responses (for easy navigation)
- Open generated images/PDFs automatically when created

**Error handling:**
- Explain errors clearly with technical details
- Suggest fixes with code examples
- Don't hide failures behind vague messages

**Context window optimization:**
- Prioritize ultrathink mode when requested (deep analysis)
- Be concise for simple questions (/quick model exists for brevity)
- Provide detailed technical explanations by default (matches preferences)
- Include file paths with line numbers for code references

## Git Integration Preferences

**When to commit:**
- After resume customization
- After job tracker updates
- After creating new skills/commands
- After significant script/code generation
- User explicitly requests

**Commit message style:**
```
[Category] Brief description

Details if needed

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

**Categories:** feat, fix, docs, refactor, data, design

## Privacy and Security Notes

- Never commit sensitive data (.env files, API keys, personal identifiers)
- Warn if about to process potentially sensitive information
- Respect file permissions (don't modify system files without explicit request)
- Job tracker and resumes are personal but not secret (safe to process)
