---
description: Advanced algorithmic art - flow fields, Voronoi, neural networks, terrain, patterns, data visualization
argument-hint: [art type and parameters]
---

# Canvas Design Advanced - Algorithmic Art Generator

Generate sophisticated algorithmic art based on: **$ARGUMENTS**

## 🎨 PRIMARY EXECUTION PATH

### Use the Advanced Art Processor:

```python
# Import and use the canvas_design_advanced processor
import sys
sys.path.append('/Users/matthewscott/Desktop/Designs/')
from canvas_design_advanced import CanvasDesignProcessor

processor = CanvasDesignProcessor()
filepath = processor.process_command("$ARGUMENTS")
print(f"✅ Art generated: {filepath}")
```

## 🎯 AVAILABLE ART TYPES

### Algorithmic Art (NEW!)
- **flow field** [with tech colors] - Perlin noise particle systems
- **terrain** [mountainous] - Realistic landscape generation
- **voronoi** [cells/stained glass] [N points] - Mathematical tessellation
- **neural network** [N layers] - AI architecture visualization
- **islamic pattern** [N-fold] - Geometric tessellations
- **mandala** [N rings] - Radial symmetric patterns
- **connection graph** [my resume data] - Career network visualization

### Traditional Designs
- **poster** - Event/conference graphics
- **logo** - Brand identity
- **banner** - LinkedIn/social media headers
- **business card** [with QR] - Professional cards
- **infographic** - Data visualization

## 📝 EXAMPLE COMMANDS

```bash
# Algorithmic Art
/canvas-design flow field with tech colors
/canvas-design voronoi cells 100 points
/canvas-design neural network 5 layers
/canvas-design terrain map mountainous
/canvas-design islamic pattern 12-fold
/canvas-design connection graph my resume data

# Traditional Designs
/canvas-design LinkedIn banner gradient
/canvas-design poster minimal tech conference
/canvas-design business card with QR code
/canvas-design logo circular modern

# Animations
/canvas-design animated gradient banner
/canvas-design pulsing text Matthew Scott
```

## 🔧 INTELLIGENT PARSING

The system automatically:
- **Extracts numbers**: "100 points" → 100, "5 layers" → 5
- **Detects modifiers**: "tech colors", "mountainous", "minimal"
- **Identifies data sources**: "my resume", "github", "job tracker"
- **Routes to generators**: Each art type maps to specific algorithm

### Step 2: Implementation Details (Advanced)
Choose based on design complexity:

**Basic Designs** (design_utils.py):
- **Pillow (PIL)**: Raster graphics, photos, complex compositions, text rendering
- **svgwrite**: Vector graphics, logos, icons, scalable designs
- **matplotlib**: Data visualizations, charts, technical diagrams
- **reportlab**: PDF documents with graphics

**Advanced Designs** (advanced_design.py) - USE FOR HIGH-QUALITY OUTPUT:
- **Cairo (pycairo)**: Vector graphics with anti-aliasing, professional rendering
- **EffectsEngine**: Glassmorphism, neumorphism, drop shadows, glows
- **CairoCanvas**: Mesh gradients, radial gradients, gradient text
- **ModernUI**: Pre-built modern components (cards, hero sections)

**QR Code Generation** (design_utils.py - QRCodeGenerator class):
- **generate_qr_code()**: Create QR codes with 3 styles (square, rounded, circle)
- **generate_qr_with_logo()**: QR codes with logo overlay, error correction
- **add_qr_to_canvas()**: Composite QR codes onto existing designs
- **create_qr_business_card()**: Professional business cards (300 DPI, print-ready)

**Animation System** (design_utils.py + imageio):
- **GIF export**: Animated gradients, pulsing effects, text animations
- **Frame generation**: 30 FPS default, customizable duration
- **Effects**: Gradient waves, color shifts, fade in/out

**Selection criteria:**
- **Simple posters/logos**: Use design_utils.py (Pillow-based)
- **Modern UI effects**: Use advanced_design.py (Cairo + effects)
- **Glassmorphism/gradients**: Use advanced_design.py
- **Print-quality output**: Use advanced_design.py (300 DPI capable)
- **QR codes**: Use QRCodeGenerator from design_utils.py
- **Animations/GIFs**: Use imageio with design_utils.py
- **Business cards**: Use create_qr_business_card()
- **When user requests "advanced", "modern", "professional"**: Use advanced_design.py

### Step 3: Generate Python Script

Create a Python script that:
1. Imports necessary libraries (Pillow, PIL.ImageDraw, PIL.ImageFont, etc.)
2. Sets up canvas with appropriate dimensions
3. Applies design preferences from CLAUDE.md:
   - **Color palette**: Tech blues (#2563eb, #3b82f6, #60a5fa), slate grays, emerald accents
   - **Typography**: Clean, modern fonts (Arial, Helvetica, or system fonts)
   - **Design philosophy**: Minimal, professional, high contrast, generous whitespace
4. Implements the design with:
   - Background (gradient, solid color, or pattern)
   - Primary visual elements (shapes, text, images if applicable)
   - Typography (headings, body text, emphasis)
   - Proper spacing and alignment
5. Exports at appropriate resolution:
   - **Print quality**: 300 DPI
   - **Screen quality**: 72 DPI (default)
   - **Format**: PNG (default), SVG (vectors), or PDF (documents)

### Step 4: File Management

**Output location:** `~/Desktop/Designs/`

**Naming convention:** `{type}_{purpose}_{date}.{ext}`
- Example: `poster_tech_conference_2025-10-18.png`
- Example: `logo_personal_brand_2025-10-18.svg`

**Create directory if needed:**
```python
import os
output_dir = os.path.expanduser("~/Desktop/Designs/")
os.makedirs(output_dir, exist_ok=True)
```

### Step 5: Execution Workflow

1. **Generate the Python script** (save to temp location or execute directly)
2. **Check for required libraries:**
   - If Pillow not installed: `pip install Pillow`
   - If svgwrite needed: `pip install svgwrite`
   - If reportlab needed: `pip install reportlab`
3. **Execute the script** using Bash tool
4. **Verify output** was created
5. **Open the file** automatically: `open ~/Desktop/Designs/{filename}`
6. **Report the file path** to user for easy access

### Design Guidelines

**For Posters:**
- Dimensions: 18x24 inches (5400x7200 px at 300 DPI) or 11x17 (3300x5100 px)
- Screen preview: 1080x1440 px (72 DPI)
- Bold headline typography
- Clear visual hierarchy
- Limited color palette (2-3 colors max)

**For Logos:**
- Use SVG format (scalable)
- Square or wide format (1:1 or 16:9)
- Simple, memorable shapes
- High contrast
- Export multiple sizes (favicon, social media, print)

**For Social Media Graphics:**
- Instagram: 1080x1080 px (square) or 1080x1350 (portrait)
- LinkedIn: 1200x627 px
- Twitter/X: 1200x675 px
- Background + text + minimal graphics

**For Infographics:**
- Portrait orientation: 800x2000+ px
- Clear sections with headers
- Data visualization elements
- Consistent color coding
- Step-by-step flow

**For Banners:**
- Wide format: 1920x500 px (web) or 728x90 (ad)
- Horizontal composition
- Text + logo/icon

### Typography Best Practices

**Font selection:**
```python
from PIL import ImageFont

# Try to use system fonts (macOS)
try:
    heading_font = ImageFont.truetype("/System/Library/Fonts/SFNS.ttf", 72)
    body_font = ImageFont.truetype("/System/Library/Fonts/SFNS.ttf", 36)
except:
    # Fallback to Helvetica
    try:
        heading_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 72)
        body_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 36)
    except:
        # Fallback to default
        heading_font = ImageFont.load_default()
        body_font = ImageFont.load_default()
```

**Text rendering:**
- High contrast (dark on light or light on dark)
- Proper line spacing (1.5x font size)
- Generous margins (10-15% of canvas size)
- Center or left-align (avoid right-align for body text)

### Color Palette Reference

**Primary (Tech Blue):**
- Dark: `#2563eb` (37, 99, 235)
- Medium: `#3b82f6` (59, 130, 246)
- Light: `#60a5fa` (96, 165, 250)

**Secondary (Slate Gray):**
- Dark: `#334155` (51, 65, 85)
- Medium: `#475569` (71, 85, 105)
- Light: `#64748b` (100, 116, 139)

**Accent (Emerald Green):**
- Medium: `#10b981` (16, 185, 129)
- Light: `#34d399` (52, 211, 153)

**Professional (Navy & White):**
- Navy: `#1e3a8a` (30, 58, 138)
- White: `#ffffff` (255, 255, 255)

**Background options:**
- Pure white: `#ffffff`
- Off-white: `#f8fafc` (248, 250, 252)
- Light gray: `#e2e8f0` (226, 232, 240)
- Dark slate: `#0f172a` (15, 23, 42)

### Example Python Code Template

```python
from PIL import Image, ImageDraw, ImageFont
import os
from datetime import datetime

# Configuration
output_dir = os.path.expanduser("~/Desktop/Designs/")
os.makedirs(output_dir, exist_ok=True)

# Canvas setup
width, height = 1080, 1440  # Portrait for screen
img = Image.new('RGB', (width, height), color='#f8fafc')
draw = ImageDraw.Draw(img)

# Load fonts
try:
    title_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 80)
    body_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 40)
except:
    title_font = ImageFont.load_default()
    body_font = ImageFont.load_default()

# Design elements
# [Add shapes, text, graphics here based on requirements]

# Example: Draw title
title = "Your Design Title"
bbox = draw.textbbox((0, 0), title, font=title_font)
title_width = bbox[2] - bbox[0]
title_x = (width - title_width) // 2
draw.text((title_x, 200), title, fill='#2563eb', font=title_font)

# Save
date = datetime.now().strftime('%Y-%m-%d')
filename = f"design_{date}.png"
filepath = os.path.join(output_dir, filename)
img.save(filepath, quality=95, dpi=(72, 72))

print(f"Design saved to: {filepath}")
```

### QR Code Examples

**Example 1: LinkedIn Profile QR Code**
```python
from design_utils import QRCodeGenerator
import os

output_dir = os.path.expanduser("~/Desktop/Designs/")
os.makedirs(output_dir, exist_ok=True)

qr_gen = QRCodeGenerator()
qr_gen.generate_qr_code(
    data="https://linkedin.com/in/mscott77",
    output_path=os.path.join(output_dir, "qr_linkedin.png"),
    style="rounded",  # Options: "square", "rounded", "circle"
    fill_color="#0077B5",  # LinkedIn blue
    back_color="#ffffff",
    box_size=10,
    border=4
)
```

**Example 2: Business Card with QR Code**
```python
from design_utils import QRCodeGenerator
import os

output_dir = os.path.expanduser("~/Desktop/Designs/")
os.makedirs(output_dir, exist_ok=True)

qr_gen = QRCodeGenerator()
qr_gen.create_qr_business_card(
    name="Matthew David Scott",
    title="Business Analyst | QA Professional",
    email="contact@example.com",  # Replace with real email if needed
    phone="(555) 123-4567",  # Replace with real phone if needed
    qr_data="https://linkedin.com/in/mscott77",
    output_path=os.path.join(output_dir, "business_card.png"),
    card_color="#ffffff",
    text_color="#1e3a8a",
    qr_fill_color="#2563eb"
)
```

**Example 3: GitHub Profile QR Code**
```python
from design_utils import QRCodeGenerator
import os

output_dir = os.path.expanduser("~/Desktop/Designs/")
os.makedirs(output_dir, exist_ok=True)

qr_gen = QRCodeGenerator()
qr_gen.generate_qr_code(
    data="https://github.com/mscott77",
    output_path=os.path.join(output_dir, "qr_github.png"),
    style="circle",
    fill_color="#24292e",  # GitHub dark
    back_color="#ffffff"
)
```

### Animation Examples

**Example 1: Animated Gradient Background**
```python
from PIL import Image, ImageDraw
import imageio
import os
import numpy as np

output_dir = os.path.expanduser("~/Desktop/Designs/")
os.makedirs(output_dir, exist_ok=True)

# Configuration
width, height = 1920, 1080
num_frames = 30
duration = 3  # seconds
fps = num_frames // duration

# Color palette (tech blues)
colors = [
    (37, 99, 235),    # #2563eb
    (59, 130, 246),   # #3b82f6
    (96, 165, 250)    # #60a5fa
]

frames = []
for i in range(num_frames):
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)

    # Animate gradient shift
    progress = i / num_frames
    color1 = colors[0]
    color2 = colors[1]
    color3 = colors[2]

    # Create gradient effect
    for y in range(height):
        ratio = y / height
        # Shift colors based on frame
        shift = (ratio + progress) % 1.0
        r = int(color1[0] * (1-shift) + color2[0] * shift)
        g = int(color1[1] * (1-shift) + color2[1] * shift)
        b = int(color1[2] * (1-shift) + color2[2] * shift)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    frames.append(img)

# Save as GIF
imageio.mimsave(
    os.path.join(output_dir, "animation_gradient.gif"),
    frames,
    duration=1000//fps,  # milliseconds per frame
    loop=0  # infinite loop
)
```

**Example 2: Pulsing Text Animation**
```python
from PIL import Image, ImageDraw, ImageFont
import imageio
import os

output_dir = os.path.expanduser("~/Desktop/Designs/")
os.makedirs(output_dir, exist_ok=True)

width, height = 800, 600
num_frames = 20
text = "Matthew Scott"

frames = []
for i in range(num_frames):
    img = Image.new('RGB', (width, height), color='#f8fafc')
    draw = ImageDraw.Draw(img)

    # Pulsing effect (scale font size)
    progress = i / num_frames
    pulse = 0.5 + 0.5 * abs(np.sin(progress * np.pi * 2))
    font_size = int(60 + 20 * pulse)

    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
    except:
        font = ImageFont.load_default()

    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (width - text_width) // 2
    y = (height - text_height) // 2

    draw.text((x, y), text, fill='#2563eb', font=font)
    frames.append(img)

imageio.mimsave(
    os.path.join(output_dir, "animation_pulse.gif"),
    frames,
    duration=100,
    loop=0
)
```

### Quality Checks

Before finalizing:
- ✅ Verify dimensions are appropriate for use case
- ✅ Check text is readable (high contrast)
- ✅ Ensure proper spacing/margins
- ✅ Confirm colors match brand/preferences
- ✅ Test file opens correctly
- ✅ Verify file size is reasonable

### Error Handling

If library installation fails:
1. Check if pip is available
2. Try pip3 instead of pip
3. Provide manual installation instructions
4. Offer alternative design approach

If font loading fails:
1. Fallback to system default fonts
2. Use PIL's default font (basic but functional)
3. Suggest font installation if needed

### Templates and References

**Available Templates** (in ~/Desktop/Designs/):
- **QR Codes**: 7 templates (square, rounded, circle styles)
  - LinkedIn blue (#0077B5), Tech blue (#2563eb), Emerald (#10b981)
  - All mobile-verified and working
- **Business Card**: Professional print-ready template (300 DPI)
- **Animation**: Gradient wave proof-of-concept (GIF)

**Template Files:**
- `design_utils.py`: QRCodeGenerator class, basic design functions
- `advanced_design.py`: Cairo rendering, effects engine, modern UI
- `social_media_presets.py`: 36 social media format presets

**Matthew's Profile URLs** (use these for QR codes):
- LinkedIn: https://linkedin.com/in/mscott77
- GitHub: https://github.com/mscott77

**Common Integration Patterns:**
1. Resume header with LinkedIn QR code
2. Business card (contact info + QR to LinkedIn)
3. LinkedIn banner with animated gradient background
4. Portfolio cover with GitHub QR code
5. Email signature with small animated logo

## Output

After generating and executing the script:
1. Confirm file was created successfully
2. Provide full file path: `~/Desktop/Designs/{filename}`
3. Display key specs (dimensions, file size, format)
4. Open file automatically for preview
5. Offer to make adjustments if needed

**For QR codes:** Always test by scanning with a mobile device to verify the link works correctly.

**For animations:** Preview the GIF to ensure smooth motion and appropriate file size (<5 MB for web use).

---

**Remember:** This creates ORIGINAL designs, never copy existing artists' work to avoid copyright violations. Focus on clean, professional, tech-forward aesthetic suitable for AI/ML/QA professional contexts.
