# Skill 04 · Design Token Custodian

**Tier 2 · High leverage · Build next**

## Purpose

Moves every `:root{ --ink:...; --lime:...; }` block out of individual HTML files and into a single `/tokens.css`. Every page imports it. Any palette, typography, spacing, or motion-duration change happens in one place. Eliminates token drift across the nine-plus pages that currently each declare identical (but separately-maintained) token blocks.

## What it manages

```css
/* /tokens.css */
:root {
  /* Ink palette */
  --ink: #08080c;
  --ink-soft: #101018;
  --ink-card: #161620;
  /* Paper / type */
  --paper: #f7f3e8;
  --cream: #fbf7eb;
  --bone: #e8e3d4;
  --dim: #a8a298;
  --faint: #5a564e;
  --whisper: #36343a;
  /* Electric accents */
  --lime: #c8ff1e;
  --pink: #ff1a6b;
  --cobalt: #1e3cff;
  --amber: #ffd500;
  --teal: #00ddc8;
  --tang: #ff7a2e;
  --violet: #9b6dd4;
  /* Type */
  --display: 'Archivo Black', system-ui, sans-serif;
  --editorial: 'Fraunces', 'Times New Roman', serif;
  --italic: 'Instrument Serif', 'Fraunces', serif;
  --sans: 'Inter', system-ui, sans-serif;
  --mono: 'JetBrains Mono', ui-monospace, monospace;
  /* Spacing */
  --space-1: 4px; --space-2: 8px; --space-3: 14px;
  --space-4: 22px; --space-5: 36px; --space-6: 56px;
  /* Motion */
  --easing-out: cubic-bezier(.3, .7, .4, 1);
  --duration-fast: .2s; --duration-med: .45s; --duration-slow: .85s;
  /* Breakpoints (for reference) */
  --bp-mobile: 640px; --bp-tablet: 980px; --bp-desktop: 1320px;
}
```

## System prompt

```
You are the Design Token Custodian. Every CSS variable used
across the publication lives in /tokens.css. Pages reference
tokens via var(--name); they never declare their own
:root{ } block of tokens. When a token is added, changed, or
deprecated, you update /tokens.css and audit every page for
any hardcoded value that should have been a token reference.
Flag drift; propose canonicalization.

When a new visual grammar requires a new color or new motion
timing, you propose the addition to /tokens.css with rationale.
Reject hex values inlined in components; they belong in tokens.
```

## Migration

The migration from per-page :root blocks to /tokens.css is a one-time refactor:
1. Verify all per-page tokens are identical (they currently are)
2. Move them to /tokens.css
3. Add `<link rel="stylesheet" href="/tokens.css">` to every page's <head>
4. Delete the per-page :root blocks
5. Run Structural Integrity Auditor to confirm no visual regression

## Pairs with

- Component Library Curator (skill 03) · components reference these tokens
- Visual Grammar Library Tender (skill 06) · grammar palette signatures live here
