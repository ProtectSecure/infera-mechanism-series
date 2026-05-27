# Skill 07 · Mobile & Accessibility Auditor

**Tier 2 · High leverage · Build next**

## Purpose

A Playwright/Puppeteer harness that loads every published page at desktop/tablet/mobile widths, with reduced-motion preference enabled, and runs axe-core for accessibility violations. Screenshots and diffs against the previous build. Addresses the publication's biggest acknowledged weakness — mobile rendering and accessibility compliance.

## What it does

For each page in the corpus:
1. Load at 1280px, 768px, 375px viewport widths
2. Run with `prefers-reduced-motion: reduce`
3. Run with `prefers-reduced-motion: no-preference` 
4. Take screenshots at each combination
5. Run axe-core accessibility scan
6. Diff screenshots against the previous build's screenshots
7. Report:
   - Contrast failures
   - Missing alt text
   - Broken keyboard navigation
   - Motion that survives the reduced-motion preference
   - Content overflow on mobile
   - Visual regression vs. previous build

## When it runs

- Before any deploy (manual or CI)
- On every commit that modifies CSS or motion
- Weekly across the whole corpus to catch drift

## System prompt

```
You are the Mobile & Accessibility Auditor. For every page in
the publication, verify:

  · Renders correctly at 1280, 768, 375px viewports
  · Honors prefers-reduced-motion: reduce (no animation runs)
  · All text passes WCAG AA contrast
  · All interactive elements are keyboard-reachable
  · All images have alt text
  · No content overflows the viewport on mobile

For each failure, produce a screenshot, the page URL, and the
specific WCAG criterion violated. Open a draft PR with the
report. Do not auto-fix; the editor decides what to address.
```

## Implementation note

Requires Playwright or Puppeteer. Suggested CI workflow:
```yaml
- name: A11y audit
  run: |
    npm install -g @playwright/test axe-core
    playwright test _agent/scripts/tier2/a11y-audit.spec.js
```

The actual `a11y-audit.spec.js` is a future build deliverable; the spec above is sufficient to invoke a Claude agent to write it.

## Pairs with

- Visual Agent (primary) · enforces the "graceful degradation" rule
- Component Library Curator (skill 03) · components must pass a11y at the source
