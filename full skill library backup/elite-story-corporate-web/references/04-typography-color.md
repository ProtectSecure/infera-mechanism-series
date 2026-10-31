# Typography & Color — The Emotional Operating System

Typography and color are the emotional choreography of the site. Before any layout decision is made, the type system and color palette must be chosen and named.

This file specifies recommended pairings, gradient atmosphere recipes, and the rules for applying them.

---

## Typography hierarchy (four roles, no exceptions)

Every site uses exactly four type roles. More creates noise. Fewer creates monotony.

| Role | Purpose | Emotional signal |
|---|---|---|
| **Display** | Hero headline, breaker section headlines, oversized metric numbers | Gravity, authority, presence |
| **Sans-serif** | Body copy, nav, UI labels, captions | Trust, clarity, comprehension |
| **Serif (italic preferred)** | Pull-quotes, editorial dek copy, poetic punctuation, brand voice moments | Intelligence, humanism, soul |
| **Mono** | Stats, captions, source attributions, eyebrow labels, technical UI | Precision, technical authority, evidence |

---

## Recommended pairings (proven combinations)

### The Editorial Authority (default for consulting, finance, gov)
```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..900,0..100&family=Inter:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;700&display=swap');

:root {
  --font-display: 'Fraunces', Georgia, serif;       /* variable, opsz axis */
  --font-sans:    'Inter', system-ui, sans-serif;
  --font-italic:  'Instrument Serif', Georgia, serif;
  --font-mono:    'JetBrains Mono', ui-monospace, monospace;
}
```

Display use: `font-variation-settings: "opsz" 144, "SOFT" 30;` for the largest sizes — invokes Fraunces's optical-size axis and gives the headline weight without bulk.

### The Modern Brutalist (default for tech, AI, modern enterprise)
```css
:root {
  --font-display: 'Archivo Black', 'Helvetica Neue', sans-serif;
  --font-sans:    'Space Grotesk', 'Helvetica Neue', sans-serif;
  --font-italic:  'Instrument Serif', Georgia, serif;
  --font-mono:    'JetBrains Mono', ui-monospace, monospace;
}
```

### The Luxury Quiet (default for hospitality, private wealth, art)
```css
:root {
  --font-display: 'Cormorant Garamond', 'Apple Garamond', serif;
  --font-sans:    'Söhne', 'Inter', system-ui, sans-serif;  /* Söhne premium; Inter fallback */
  --font-italic:  'Cormorant Garamond', serif;              /* italic style */
  --font-mono:    'JetBrains Mono', ui-monospace, monospace;
}
```

### The Technical Precision (default for industrial, B2B platform, infrastructure)
```css
:root {
  --font-display: 'GT America', 'Inter Display', sans-serif;
  --font-sans:    'Inter', system-ui, sans-serif;
  --font-italic:  'GT Sectra', serif;
  --font-mono:    'GT America Mono', 'JetBrains Mono', ui-monospace, monospace;
}
```

---

## Type scale (modular, eight-step)

Use this scale. Do not improvise.

```css
:root {
  --t-xs:  11px;     /* mono labels, captions, eyebrow tags */
  --t-sm:  13px;     /* UI text, small body, nav links */
  --t-base:15px;     /* body copy */
  --t-md:  17px;     /* lead body, editorial dek */
  --t-lg:  22px;     /* sub-headings, pull-quotes inline */
  --t-xl:  32px;     /* section sub-headlines */
  --t-2xl: clamp(36px, 5vw, 64px);   /* breaker headlines, large stats */
  --t-3xl: clamp(54px, 8vw, 120px);  /* hero headline */
  --t-4xl: clamp(72px, 14vw, 220px); /* deconstructed display, big metrics */
}
```

Letter-spacing rules:
- Display sizes (≥ `--t-2xl`): `-0.03em` to `-0.04em` (tighter at larger sizes)
- Body sizes: default `0`
- Mono labels: `+0.14em` to `+0.22em` with `text-transform: uppercase`
- Italic editorial dek: `-0.01em`

Line-height rules:
- Display: `0.88` to `0.95` (tight)
- Body: `1.5` to `1.6`
- Mono labels: `1.0` to `1.4`
- Pull-quote italic: `1.35` to `1.45`

---

## Color systems

Choose one palette per site. Do not mix. Each palette is a complete operating system.

### Deep Oceanic (finance, government, consulting, infrastructure)
```css
:root {
  --bg:        #060a14;
  --bg-deep:   #0a1530;
  --paper:     #0f1d3a;
  --ink:       #f0f4fa;
  --ink-soft:  #98a8c4;
  --ink-faint: #5c6a82;
  --accent:    #3ecaf0;        /* cyan signal */
  --accent-2:  #f0b837;        /* gold accent — used sparingly */
  --warn:      #ff5959;        /* warning, loss, alarm */
  --rule:      rgba(255,255,255,.08);
}
```

### Editorial Ivory (advisory, founder-led, publishing, premium services)
```css
:root {
  --bg:        #f1ede1;
  --bg-warm:   #e6dfca;
  --paper:     #fbf7eb;
  --ink:       #0f1217;
  --ink-soft:  #3a3f48;
  --ink-faint: #7a7f88;
  --accent:    #c8412e;        /* terracotta */
  --accent-2:  #1a4d6e;        /* deep teal */
  --warn:      #b8392a;
  --rule:      #d8d2bf;
}
```

### Modern Brutalist (tech, AI, modern enterprise)
```css
:root {
  --bg:        #f1ede1;
  --bg-deep:   #0a0a0a;
  --paper:     #fbf7eb;
  --ink:       #0a0a0a;
  --ink-soft:  #3a3a3f;
  --accent:    #c8ff1e;        /* acid lime */
  --accent-2:  #ff1a6b;        /* hot magenta */
  --accent-3:  #1e3cff;        /* cobalt */
  --warn:      #ff3a2e;
  --rule:      #d8d2bf;
}
```

### Luxury Quiet (hospitality, private wealth, art, hospitality)
```css
:root {
  --bg:        #1a1410;
  --bg-deep:   #0d0a08;
  --paper:     #f4ede0;
  --ink:       #f4ede0;
  --ink-soft:  #b8a890;
  --ink-faint: #7a6a55;
  --accent:    #c89858;        /* champagne bronze */
  --accent-2:  #708090;        /* slate */
  --warn:      #d4655a;
  --rule:      rgba(244, 237, 224, .12);
}
```

### Cool Clinical (healthcare, science, research, biotech)
```css
:root {
  --bg:        #f4f6f8;
  --bg-deep:   #e8edf2;
  --paper:     #ffffff;
  --ink:       #14202c;
  --ink-soft:  #4a5868;
  --ink-faint: #8a98a8;
  --accent:    #0070b8;        /* clinical blue */
  --accent-2:  #1ca97f;        /* trust green */
  --warn:      #e0532a;
  --rule:      #d8dde2;
}
```

---

## Gradient atmosphere recipes

Build atmospheric environments with CSS only. No image assets.

### Deep oceanic atmosphere
```css
.atmosphere {
  position: fixed;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(ellipse at 20% 30%, rgba(20, 80, 170, .35), transparent 60%),
    radial-gradient(ellipse at 80% 70%, rgba(50, 30, 120, .28), transparent 65%),
    radial-gradient(circle at 50% 100%, rgba(60, 200, 240, .15), transparent 55%),
    linear-gradient(180deg, #060a14 0%, #0a1530 50%, #060a14 100%);
  background-size: 200% 200%;
  animation: drift 12s ease-in-out infinite alternate;
}
@keyframes drift {
  0%   { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
}
```

### Editorial cream atmosphere (subtle warm wash)
```css
.atmosphere {
  position: fixed;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(ellipse at 70% 20%, rgba(220, 100, 70, .08), transparent 60%),
    radial-gradient(ellipse at 20% 80%, rgba(220, 170, 80, .10), transparent 65%),
    linear-gradient(180deg, #f1ede1 0%, #e6dfca 50%, #f1ede1 100%);
  background-size: 180% 180%;
  animation: drift 18s ease-in-out infinite alternate;
}
```

### Atmospheric noise overlay (adds tactile film grain)
```css
.noise {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .25 0'/></filter><rect width='160' height='160' filter='url(%23n)' opacity='.7'/></svg>");
  mix-blend-mode: multiply;
  opacity: .4;
}
```

Layer atmospheres: `.atmosphere` at z=-1 sets the color/motion, `.noise` at z=-1 adds texture. The combination feels expensive in a way pure flat color never does.

---

## The contrast ratio rule

For any text on any background:
- Body copy: minimum WCAG AA (4.5:1)
- Display headlines: minimum WCAG AAA (7:1) where feasible — display sizes can fail AA and still feel wrong
- UI text on overlay (e.g., on atmospheric gradient): test against the *darkest possible* state of the gradient mid-animation

Use [contrast-grid](https://contrast-grid.eightshapes.com/) or browser DevTools to verify before shipping.

---

## When to use serif vs sans-serif (emotional signaling)

**Serif (italic especially):**
- Pull-quotes and editorial dek
- Founder voice or first-person brand moments
- Long-form reading sections
- Anywhere humanity, soul, or restraint should be felt

**Sans-serif:**
- UI, navigation, body copy
- Anywhere clarity and trust are paramount
- Anywhere the data should not be embellished

**Display (heavy):**
- Hero headline
- Breaker headline
- Oversized stat numbers
- One-word section signals

**Mono:**
- Stats, sources, attributions
- Eyebrow labels above sections
- Technical or evidentiary signals
- Numbers inside tables

The rhythm: editorial italic punctuates sans-serif body, mono labels frame display headlines, sans-serif body builds trust between display moments. This rhythm is the voice of the site.

---

## Color rules for narrative

- **One accent per page, used sparingly.** The accent is what the user remembers. If you use it everywhere, they remember nothing.
- **A second accent appears only at the resolution.** Reserve a secondary color exclusively for the CTA. The user learns to associate it with arrival.
- **Warning color appears at most once per page**, and only for genuine warnings (loss, risk, problem statement).
- **Body copy at high contrast, not maximum.** `#0f1217` on `#fbf7eb` beats pure `#000` on `#fff` for long-form reading.
- **Backgrounds shift between sections** to mark act transitions. A cream act followed by a deep oceanic act tells the user: we have moved.

---

## The typography test

Set the hero headline at the largest size. Read it.

1. Is it confident at one glance?
2. Does the type carry weight without bold being added?
3. Does the spacing feel like silence around it?
4. Could you remove a word and not lose meaning?
5. Does the next line of body text feel like it was written by the same person?

If any answer is "no," the type system is wrong. Restart from the four-role hierarchy.
