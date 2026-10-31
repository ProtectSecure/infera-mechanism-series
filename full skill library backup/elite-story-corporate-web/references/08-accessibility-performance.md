# Accessibility & Performance Standards

A site is not elite if it fails accessibility or performance. Both are non-negotiable.

This file is the audit list and the implementation patterns.

---

## Accessibility — WCAG 2.2 AA minimum

### Semantic HTML
Use the right element for the meaning. The skill produces sites with:
- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>` for structure
- `<h1>` once per page (the hero headline), `<h2>` for section headlines, `<h3>` for sub-sections — never skip levels
- `<button>` for actions, `<a>` for navigation. Never `<div onclick>`.
- `<figure>` + `<figcaption>` for charts and visual evidence
- `<dl>` / `<dt>` / `<dd>` for definition-style data (e.g., metric label → metric value)

### Keyboard navigation
Every interactive element must be reachable by Tab and operable by Enter/Space.

```css
/* Visible focus that doesn't break design */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 2px;
}
/* Remove only when intentionally replaced */
:focus:not(:focus-visible) { outline: none; }
```

For custom interactive components (path selectors, comparison toggles), add:
- `role="tablist"` / `role="tab"` / `role="tabpanel"` for tabbed interfaces
- `aria-selected="true|false"` on tabs
- `aria-expanded="true|false"` on expanders
- `aria-controls="id"` linking control to content
- `tabindex="0"` on custom interactive non-button elements

### Color contrast
- Body copy: minimum 4.5:1 (WCAG AA)
- Display headlines: aim for 7:1 (WCAG AAA)
- Large text (≥18pt or ≥14pt bold): minimum 3:1
- UI components (button borders, focus rings, separators): minimum 3:1

Test using:
- Chrome DevTools → Lighthouse → Accessibility
- [contrast-grid.eightshapes.com](https://contrast-grid.eightshapes.com/)
- [WhoCanUse.com](https://whocanuse.com/) for various vision conditions

### Reduced motion
**Mandatory.** Every site this skill produces must include:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .001ms !important;
    scroll-behavior: auto !important;
  }
  .reveal, .reveal-stagger > * { opacity: 1 !important; transform: none !important; }
  .atmosphere, .marquee, .ambient { animation: none !important; }
}
```

Without this rule, the site fails accessibility, regardless of how well the rest is built.

### Alt text and image descriptions
- Every `<img>` has `alt`. Decorative images get `alt=""`.
- SVG charts include `<title>` (for screen readers) and optional `<desc>` (longer description).
- Interactive visualizations should have a text equivalent — either a `<figcaption>` describing what the chart shows, or a hidden `<table>` with the underlying data.

```html
<figure>
  <svg role="img" aria-labelledby="chart-title chart-desc">
    <title id="chart-title">Quarterly revenue 2023-2025</title>
    <desc id="chart-desc">A line chart showing growth from $400K in Q1 2023 to $2.4M in Q4 2025, with a step change at Q2 2024 when the platform launched.</desc>
    <!-- chart elements -->
  </svg>
  <figcaption>Quarterly recurring revenue, Q1 2023–Q4 2025. Source: internal finance, audited.</figcaption>
</figure>
```

### Form accessibility
- Every input has a `<label>` — visible or `aria-label` if visually hidden.
- Required fields marked with `required` and visually obvious.
- Error messages use `aria-live="polite"` for announcements.
- Submit buttons have visible disabled state when form is invalid.

### Skip link
Add at the very top of the page:

```html
<a class="skip" href="#main">Skip to main content</a>
```

```css
.skip {
  position: absolute; left: -9999px;
  background: var(--accent); color: var(--bg);
  padding: 12px 18px; z-index: 999;
  font-family: var(--font-mono); font-size: 12px;
  text-transform: uppercase; letter-spacing: .14em;
  text-decoration: none;
}
.skip:focus { left: 16px; top: 16px; }
```

---

## Performance budgets

Elite sites load fast. Slow sites contradict every visual claim of competence.

### Targets (lab measurements)

| Metric | Target | Acceptable | Failure |
|---|---|---|---|
| First Contentful Paint (FCP) | < 1.0s | < 1.8s | > 2.5s |
| Largest Contentful Paint (LCP) | < 1.5s | < 2.5s | > 4.0s |
| Cumulative Layout Shift (CLS) | < 0.05 | < 0.1 | > 0.25 |
| Total Blocking Time (TBT) | < 100ms | < 300ms | > 600ms |
| JS bundle size (compressed) | < 80KB | < 200KB | > 400KB |
| Total page weight (initial) | < 500KB | < 1.5MB | > 3MB |

### Practical rules

1. **CSS-only atmospheres.** No background images. Gradients render at 0KB cost.

2. **System fonts as fallback.** Specify webfonts but provide `system-ui` fallbacks. Use `font-display: swap` to avoid invisible text during font load.

3. **Subset webfonts.** Use Google Fonts with `text=…` parameter for hero-only display fonts, or self-host with `unicode-range` rules.

4. **No carousel libraries.** A carousel adds 50KB+ for a pattern that violates story-driven design anyway.

5. **No analytics-of-analytics.** Pick one analytics provider (preferably privacy-respecting like Plausible) and add no second tracker.

6. **No third-party fonts beyond Google Fonts** unless served from your own CDN. Third-party font services add render-blocking requests.

7. **Defer non-critical JS.** Use `<script src="…" defer></script>` for everything that doesn't need to run before paint.

8. **Inline critical CSS.** The first paint should not block on external CSS. Inline the styles for the hero in `<head>`.

9. **Lazy-load below-the-fold images.** Use `loading="lazy"` on `<img>` and `loading="lazy"` on iframes.

10. **Preconnect to font origins.**
    ```html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    ```

11. **Avoid heavy frameworks** for marketing sites. Vanilla HTML/CSS/JS produces faster, more durable sites than React/Vue for content-driven pages. Reserve frameworks for app-like UI where state management is genuinely necessary.

---

## Image and asset optimization

If images are required (e.g., a team photo on the about page):

- Format: AVIF first, WebP fallback, JPEG last resort.
- Resolution: 2× device pixel ratio max — beyond that is invisible to the human eye.
- Compression: AVIF Q60, WebP Q75, JPEG Q80 — these are perceptually loss-free.
- Always set `width` and `height` to prevent CLS.
- Use `<picture>` for responsive art-direction or format negotiation.

```html
<picture>
  <source srcset="founder.avif" type="image/avif">
  <source srcset="founder.webp" type="image/webp">
  <img src="founder.jpg" width="800" height="1000" alt="Founder portrait" loading="lazy">
</picture>
```

---

## Animation performance

- Animate only `opacity` and `transform`. These are GPU-accelerated.
- Avoid animating `top`, `left`, `width`, `height`, `box-shadow`, `border-radius` — these trigger layout/paint.
- Use `will-change: transform, opacity` sparingly on elements that will animate. Remove after the animation completes.
- Pause animations on elements off-screen using IntersectionObserver.
- Cap `requestAnimationFrame` to 60fps (browsers do this); if you must throttle to 30fps for heavy canvas work, do so explicitly.

---

## Privacy and consent

- Use privacy-respecting analytics (Plausible, Fathom, Simple Analytics) — no cookies, no GDPR banner required.
- If you must use Google Analytics, implement consent management *correctly* — never auto-load before consent.
- Do not load any third-party tracker on hero load.
- No "session replay" tools without explicit, clear consent.
- Cookie banner (if needed): clear, non-obscuring, with a real "Reject all" button equal in prominence to "Accept all."

---

## SEO essentials

Elite sites still need to be findable.

```html
<head>
  <title>[Brand] · [Core promise in 6 words]</title>
  <meta name="description" content="[Setup line — 1 sentence, 140-160 chars, mirrors the problem the user is searching for].">
  <meta property="og:title" content="[Same as title]">
  <meta property="og:description" content="[Same as description]">
  <meta property="og:image" content="https://[domain]/og.png">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="canonical" href="https://[domain]/">
</head>
```

Rules:
- `<title>` is 50-60 characters, brand-first.
- `<meta description>` is 140-160 characters, written for a human, includes the problem language.
- `og:image` is 1200×630px, includes the headline and brand mark, no stock photo.
- Use a single `<h1>` per page. Search engines and screen readers both rely on this.
- Semantic HTML helps SEO as well as accessibility — `<article>` and `<section>` carry signal.

---

## The accessibility & performance audit

Before shipping:

1. Run Lighthouse → must score 95+ on Performance, 100 on Accessibility, 100 on Best Practices, 95+ on SEO.
2. Test keyboard nav from top to bottom — Tab through every interactive element. Reachable? Operable? Visible focus?
3. Test with screen reader (VoiceOver on macOS, NVDA on Windows) — does the page narrate the structure cleanly?
4. Test `prefers-reduced-motion` — does the site work and look intentional with motion off?
5. Test on a throttled 3G connection — does the hero appear within 2 seconds?
6. Test on a mid-range Android phone — is the site usable, or does the atmosphere stutter?
7. Test color contrast on every text-over-background combination, including animated states.
8. Test with browser zoom at 200% — does the layout hold?

If any test fails, fix before shipping. Elite sites do not ship with accessibility debt.
