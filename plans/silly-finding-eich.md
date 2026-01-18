# Rebuild Prompt Factory AI in React for Vercel

**Created:** 2025-12-22
**Status:** READY FOR EXECUTION
**Scope:** Port Streamlit app to React with full brand consistency

---

## Goal

Rebuild Prompt Factory AI (currently Streamlit) as a React/Vite app matching portfolio standards. Deploy to Vercel with full teal/orange brand system.

---

## Source Analysis

**Current Streamlit App:** `~/Desktop/Manus/prompt-fact/streamlit_app.py` (842 lines)
**Live URL:** https://prompt-factory-ai-gfxncq69axae73qk3yenzb.streamlit.app/

**Features to Port:**
1. Hierarchical prompt tree builder (recursive nodes)
2. 7 templates (Blank, Cybersecurity, Marketing, DevOps, Product, AI Agent, Code Review)
3. Export to Markdown and JSON
4. Tree visualization (ASCII view + stats)
5. JSON import
6. Onboarding screen for new users

---

## Target Architecture

**Location:** `~/Projects/prompt-factory/` (new repo)
**Deployment:** Vercel at `prompt-factory.vercel.app` or subdomain

### Project Structure
```
prompt-factory/
├── src/
│   ├── App.jsx                    # Main app with routing
│   ├── main.jsx                   # Entry point
│   ├── index.css                  # Tailwind + custom animations
│   ├── components/
│   │   ├── Layout.jsx             # Sidebar + main content wrapper
│   │   ├── Sidebar.jsx            # Templates + stats
│   │   ├── TreeBuilder.jsx        # Add/edit/delete nodes
│   │   ├── TreeView.jsx           # Visual tree structure
│   │   ├── TreeVisualization.jsx  # ASCII tree + stats cards
│   │   ├── ExportPanel.jsx        # Markdown/JSON export
│   │   ├── TemplateGallery.jsx    # Template selector
│   │   ├── NodeForm.jsx           # Add node form
│   │   ├── Onboarding.jsx         # First-time user screen
│   │   └── ui/                    # Shared UI components
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── Tabs.jsx
│   │       └── Input.jsx
│   ├── lib/
│   │   ├── tree-utils.js          # Tree operations (add, delete, traverse)
│   │   ├── export-utils.js        # Markdown/JSON generation
│   │   └── templates.js           # 7 pre-built templates
│   └── hooks/
│       └── usePromptTree.js       # State management hook
├── public/
│   ├── favicon.ico
│   ├── og-image.png               # 1200x630 social preview
│   └── icon-192.png
├── index.html                     # SEO meta tags
├── tailwind.config.js             # Teal/orange palette
├── postcss.config.js
├── vite.config.js
├── vercel.json                    # SPA routing
└── package.json
```

---

## Data Structures

```typescript
interface PromptTree {
  id: string;
  title: string;
  description: string;
  version: string;
  metadata: {
    created_at: string;  // ISO8601
    updated_at: string;
    tags: string[];
  };
  root_node: PromptNode;
}

interface PromptNode {
  id: string;
  title: string;
  content: string;
  examples: string[];
  children: PromptNode[];
}
```

---

## Implementation Phases

### Phase 1: Project Setup (10 min)
1. Create new Vite + React project
2. Install dependencies: `react-router-dom`, `tailwindcss`, `uuid`
3. Copy tailwind.config.js from monorepo (teal/orange palette)
4. Add vercel.json for SPA routing
5. Create index.html with meta tags

### Phase 2: Core Components (45 min)
1. **Layout.jsx** - Sidebar + main content grid
2. **Sidebar.jsx** - Logo, template categories, stats display
3. **Tabs component** - Builder | Visualize | Export | About
4. **Onboarding.jsx** - Hero + feature cards + template selector

### Phase 3: Tree Logic (30 min)
1. **usePromptTree.js** - State hook with localStorage persistence
2. **tree-utils.js** - Recursive operations:
   - `addNode(tree, parentId, node)`
   - `deleteNode(tree, nodeId)`
   - `findNode(tree, nodeId)`
   - `getTreeDepth(node)`
   - `countNodes(node)`
3. **templates.js** - All 7 templates as JSON objects

### Phase 4: Builder UI (45 min)
1. **TreeBuilder.jsx** - Main builder interface
2. **NodeForm.jsx** - Add/edit node form (parent selector, title, content)
3. **TreeView.jsx** - Indented node list with icons (folder/file)
4. Delete confirmation modal

### Phase 5: Export & Visualization (30 min)
1. **export-utils.js** - Markdown and JSON generators
2. **ExportPanel.jsx** - Format selector + preview + download
3. **TreeVisualization.jsx** - ASCII tree + 4 stat cards

### Phase 6: Polish & Deploy (20 min)
1. Generate OG image (1200x630)
2. Test all features locally
3. Deploy to Vercel
4. Verify live URL

---

## Key Implementation Details

### Tailwind Config (exact colors)
```javascript
colors: {
  teal: { 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488' },
  orange: { 400: '#fb923c', 500: '#f97316', 600: '#ea580c' },
  slate: { 300: '#cbd5e1', 700: '#334155', 800: '#1e293b', 900: '#0f172a' }
}
```

### Touch Targets (44px minimum)
```jsx
<button className="min-h-[44px] min-w-[44px] flex items-center justify-center">
```

### ASCII Tree Generation
```javascript
function generateAsciiTree(node, prefix = '', isLast = true) {
  const connector = isLast ? '└── ' : '├── ';
  const extension = isLast ? '    ' : '│   ';
  let result = prefix + connector + node.title + '\n';
  node.children.forEach((child, i) => {
    result += generateAsciiTree(child, prefix + extension, i === node.children.length - 1);
  });
  return result;
}
```

### Markdown Export
```javascript
function nodeToMarkdown(node, level = 1) {
  const heading = '#'.repeat(Math.min(level + 1, 6));
  let md = `${heading} ${node.title}\n\n`;
  if (node.content) md += `${node.content}\n\n`;
  if (node.examples.length) {
    md += `**Examples:**\n${node.examples.map(e => `- ${e}`).join('\n')}\n\n`;
  }
  node.children.forEach(child => {
    md += nodeToMarkdown(child, level + 1);
  });
  return md;
}
```

---

## Dependencies

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "vite": "^5.4.0"
  }
}
```

---

## Success Criteria

- [ ] All 7 templates load correctly
- [ ] Add/delete nodes works recursively
- [ ] Markdown export matches Streamlit output
- [ ] JSON export is re-importable
- [ ] ASCII tree visualization renders
- [ ] Stats (nodes, depth) calculate correctly
- [ ] Dark theme with teal/orange brand
- [ ] Touch targets 44px minimum
- [ ] OG image displays on social share
- [ ] Deployed to Vercel, public URL works

---

## Estimated Time

| Phase | Time |
|-------|------|
| Setup | 10 min |
| Core Components | 45 min |
| Tree Logic | 30 min |
| Builder UI | 45 min |
| Export & Viz | 30 min |
| Polish & Deploy | 20 min |
| **Total** | **~3 hours** |

---

**Ready to execute.**
