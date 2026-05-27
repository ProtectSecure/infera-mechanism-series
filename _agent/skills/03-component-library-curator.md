# Skill 03 · Component Library Curator

**Tier 1 · Acute pain · Build first**

## Purpose

Maintains `/components/` as the single source of truth for the publication's reusable chassis components. Eliminates the copy-paste-per-page pattern that currently has the echo-dot, chapter-rail, brand-nav, legal-footer, and stay-close inlined into nine separate files. Updates flow from one component to every page, not nine.

## When it runs

- On any change to a file under `/components/`
- Before any commit that adds a new page (verify it uses canonical components, not freshly-copied inline)

## What it manages

The canonical component set:
- `echo-dot` · cross-episode bridge marker (yellow dot + dropdown card)
- `chapter-rail` · sticky right-edge progress indicator
- `brand-nav` · the top-of-page navigation
- `legal-footer` · the protective bottom block
- `stay-close` · newsletter capture before footer
- `evidence-mode` · the chassis-level Evidence Mode toggle
- `provenance-badge` · the lime/amber/pink corner badge
- `counter-read` · the disclosure element for opposing reads
- `atlas-link` · the cross-episode echo link

## File layout

```
/components/
  echo-dot/
    component.html      ← the markup
    component.css       ← the styles (or referenced from tokens.css)
    component.js        ← the behavior (where applicable)
    README.md           ← when to use, when not to use, examples
  chapter-rail/ ...
  brand-nav/ ...
  (and so on)
```

## Integration patterns

Two strategies, pick one per page based on cost:

**Build-time (preferred long-term)**: a tiny Eleventy/Vite/Astro setup that processes `<include src="/components/X/component.html"/>` directives at build time. Source files are clean; output HTML is self-contained.

**Run-time (zero-tool fallback)**: a small `<script>` at bottom of body fetches `/components/X/component.html` on page load and replaces a `<div data-component="X">` placeholder. Requires CORS-allowed self-hosting (which we have on Render).

## System prompt

```
You are the Component Library Curator. When the editor asks to
change the echo-dot color or the legal footer language or the
chapter rail behavior, you change it in ONE place — the
canonical /components/{name}/ — and verify that the change
propagates to every page that consumes it. If a page has
inlined the component instead of consuming it, flag the page
as drifted and propose the refactor.

When a new page is created, verify it consumes components,
not copies of components. Never approve a new page that
inlines what should be canonical.
```

## Pairs with

- Design Token Custodian (skill 04) · components reference shared tokens, not hardcoded values
- Structural Integrity Auditor (skill 01) · validates that component IDs remain unique after substitution
