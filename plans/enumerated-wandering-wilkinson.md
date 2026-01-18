# matthewscott.link - The Human Context

**Role:** The person behind projectlavos.com
**projectlavos.com** = "Look at what I built" (proof, portfolio, the work)
**matthewscott.link** = "Here's who I am and why I build this way" (context, philosophy, story)

**NOT a job-seeking site.** Brand establishment for self-employment.

---

## Philosophy Sources (from ~/.claude/context/)

Key documents informing the messaging:
- `the-pattern-we-broke.md` - Merry-go-round, skeleton crew, momentum > grinding
- `VALUES.md` - Truth over comfort, substance over flash, long-term over short-term
- `talking-about-ai-work.md` - How to discuss AI collaboration authentically
- `philosophy.md` - AI-native developer thesis

---

## Structure (Single Page, 4 Sections)

### 1. Hero
```
MATTHEW SCOTT

I build hybrid systems: AI where it's strong, deterministic code where it's not.

Louisville, KY
```

### 2. The Philosophy (The "Why")
This is the heart of the site - explaining the methodology.

```
LLMs can't count frets. They generate F# in E Phrygian and call it correct.

So my guitar riff generator uses Python for music theory and AI only for
style interpretation. The security auditor chains 30 AI personas - and
found a real CORS bug in my own production code.

I build with AI. Not against it. Not around it. With it.

The collaboration is the story. I orchestrate, AI executes, together we
build things neither could alone. This isn't about replacing developers.
It's about what one person with the right methodology can accomplish.

I care about tools that actually work, not demos that sound impressive.
```

**Values woven in:**
- Truth over comfort (honest about AI collaboration)
- Substance over flash (working tools > impressive demos)
- "Skeleton crew" model (one person, right methodology, real output)

### 3. The Work (Bridge to projectlavos.com)
Brief showcase linking to the proof:

```
THE WORK

These aren't demos. They're deployed, tested, running in production.

[Card: Guitar Model Lab]
Python music theory + AI style interpretation
2,415 passing tests. Exports to Guitar Pro.
→ See it live

[Card: Mirador]
30 AI personas with meta-cognitive oversight
Found real security bugs in production code.
→ See it live

[Card: Full Portfolio]
14 deployed projects. APIs, dashboards, tools.
→ projectlavos.com
```

### 4. Footer
```
Start a conversation: matthewdscott7@gmail.com
GitHub | LinkedIn
```

---

## Brand Voice

**Avoid:**
- "Available for work" / "Hire me"
- Resume language
- Selling availability

**Use:**
- First person, conversational
- Methodology over credentials
- "Start a conversation" not "Contact me"
- Story over pitch

---

## Tech Stack

- Vite + React (matches existing projects)
- Tailwind v3 with teal/orange palette
- Single App.jsx (~300 lines)
- No routing needed

---

## Files to Create

```
~/Projects/matthewscott-link/
  index.html
  package.json
  vite.config.js
  tailwind.config.js      # Copy from main-site
  postcss.config.js
  src/
    App.jsx               # All 5 sections
    App.css               # Copy animations from main-site
    main.jsx
  public/
    og-image.png
    favicon.ico
```

---

## Files to Copy From

1. `~/Projects/projectlavos-monorepo/main-site/tailwind.config.js` - colors
2. `~/Projects/projectlavos-monorepo/main-site/src/App.css` - animations

---

## Execution Steps

1. `npm create vite@latest matthewscott-link -- --template react` (5 min)
2. Install Tailwind, copy config (5 min)
3. Copy CSS animations (2 min)
4. Write App.jsx with 5 sections (30 min)
5. Generate og-image.png (10 min)
6. Test build: `npm run build && npm run preview` (5 min)
7. Deploy: `vercel --prod --yes` (5 min)
8. Point Namecheap DNS to Vercel (10 min)
9. Verify in incognito (5 min)

**Total: ~1.5 hours**

---

## DNS Setup

**Namecheap:**
- Remove WordPress.com DNS records
- Add Vercel CNAME or A records

**Vercel:**
- Add matthewscott.link as custom domain in project settings
