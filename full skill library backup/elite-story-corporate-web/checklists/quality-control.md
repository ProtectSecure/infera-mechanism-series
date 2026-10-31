# Quality Control Checklist

Run this checklist before declaring any site complete. If any item fails, fix or remove. **The skill is not applied if this checklist has not been walked.**

The checklist is organized by what fails the site, not what makes it pretty. A site can be visually striking and still fail every item below.

---

## Narrative arc (Acts 1–5)

- [ ] Hero headline is 5–7 words, set in display type
- [ ] Hero has at most one CTA, and it is soft entry (not a hard ask)
- [ ] Hero atmosphere is CSS — no stock photo
- [ ] Setup section names the user's conflict in their own language
- [ ] Setup includes at least one specific, observed number with a source
- [ ] Setup does NOT introduce the solution yet
- [ ] Chapters are 3 to 5 in number (not 6+, not 2)
- [ ] Each chapter has: a name (verb-led), a stake, a reveal, a proof
- [ ] Chapter visuals alternate dense/sparse rhythm
- [ ] Recurring visual motif appears across chapters (color, glyph, number style)
- [ ] Breaker section disrupts the visual rhythm noticeably
- [ ] Breaker delivers proof, not promise
- [ ] Breaker contains no CTA
- [ ] Breaker ends with a transition line into the resolution
- [ ] Resolution section contains exactly ONE CTA (no secondary unless it is an explore-deeper path)
- [ ] CTA verb is journey-specific, not generic
- [ ] Reassurance line below CTA answers "what happens next" concretely
- [ ] User feels recognition, hope, trust, surprise, resolve — in that order

---

## Visual hierarchy

- [ ] Exactly 4 type roles in use (display, sans, italic, mono) — no more, no less
- [ ] Headline letter-spacing is tight (-0.03em or tighter at display sizes)
- [ ] Body line-height is 1.5–1.6
- [ ] Mono labels are uppercase with letter-spacing 0.14em+
- [ ] One accent color, used sparingly
- [ ] CTA uses a second accent color reserved for that moment only
- [ ] Warning/loss color appears at most once
- [ ] Body contrast meets WCAG AA (4.5:1)
- [ ] Display headlines meet WCAG AAA (7:1) where feasible
- [ ] Whitespace is generous around the CTA section
- [ ] Pacing alternates dense and sparse sections

---

## Tufte data discipline

- [ ] Every chart has a source line in monospace
- [ ] No 3D, no fake depth, no gradient bars
- [ ] No chartjunk (decorative icons inside charts)
- [ ] Annotations live on the visual, not in a side legend
- [ ] Comparison tables have no vertical rules
- [ ] Numbers in tables are right-aligned
- [ ] Sparkline strips have consistent Y-axis scaling across multiples
- [ ] Stats include denominators (per what? out of what?)
- [ ] Every visual answers at least one: cause / comparison / sequence / consequence
- [ ] A reader could understand each visual in 6 seconds

---

## Motion

- [ ] Every motion answers "what does this teach?"
- [ ] No ambient motion runs forever for decoration
- [ ] Reveal animations fire once (then unobserve)
- [ ] Reveal animation duration ≤ 800ms
- [ ] Easing is `cubic-bezier(.3,.7,.4,1)` or similar — never plain `ease-in`
- [ ] `prefers-reduced-motion: reduce` media query is implemented
- [ ] Tested with reduced motion enabled — site works and feels intentional
- [ ] No motion on body paragraphs being read
- [ ] No simultaneous motion on multiple things in the same row
- [ ] No motion below the fold of the CTA section
- [ ] Off-screen animations pause (IntersectionObserver-driven)

---

## Sticky executive nav

- [ ] Sticky nav present on all sections
- [ ] Backdrop blur applied
- [ ] Background darkens on scroll
- [ ] 3–5 nav items maximum
- [ ] One CTA in nav, outline style (not solid)
- [ ] Brand mark in display weight on the left
- [ ] Optional chapter strip shows scroll progress
- [ ] Nav compresses on scroll (padding reduces)
- [ ] All nav links visible at 200% browser zoom

---

## Interactive elements (where applicable)

- [ ] Every interactive change has a reason (teaches, reveals, personalizes)
- [ ] Choose-your-journey paths lead to genuinely different content
- [ ] Path selectors are framed by user intent, not brand taxonomy
- [ ] Expanders animate quickly (≤240ms), don't slow-reveal
- [ ] State changes are announced via aria-live where appropriate
- [ ] Keyboard operates every interactive element
- [ ] Focus state is visible (`:focus-visible` with offset outline)
- [ ] Sliders, toggles, tabs have proper ARIA roles
- [ ] If using state-personalized CTAs, they update correctly per choice

---

## Conversion sequencing

- [ ] Trust budget paid before any ask (recognition → hope → proof → specificity → imagination)
- [ ] No sticky footer CTA bar
- [ ] No popup CTAs
- [ ] No exit-intent modals
- [ ] No auto-opening chat widget
- [ ] No "X people viewing right now" decorations
- [ ] No fake countdown timers
- [ ] Form (if present) asks for the minimum to start (often: email only)
- [ ] Submit button has visible disabled state when form invalid
- [ ] If multi-step persuasion, Step 1 is the artifact request — not the meeting

---

## Accessibility (WCAG 2.2 AA)

- [ ] Single `<h1>` per page
- [ ] Heading levels are sequential, never skipped
- [ ] Semantic HTML throughout (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- [ ] Skip-to-main-content link at top
- [ ] All interactive elements reachable by Tab
- [ ] Focus order is logical (matches visual order)
- [ ] All images have alt text (or `alt=""` if decorative)
- [ ] SVG charts include `<title>` and `<desc>`
- [ ] Form inputs have associated labels
- [ ] Color is never the only indicator of meaning
- [ ] Site works at 200% browser zoom
- [ ] Lighthouse Accessibility score = 100

---

## Performance

- [ ] Lighthouse Performance ≥ 95
- [ ] LCP < 1.5s on broadband
- [ ] CLS < 0.05
- [ ] JS bundle < 80KB compressed
- [ ] Total initial page weight < 500KB
- [ ] CSS-only atmospheres (no background images)
- [ ] Webfonts use `font-display: swap`
- [ ] Critical CSS for hero inlined in `<head>`
- [ ] Below-the-fold images use `loading="lazy"`
- [ ] No third-party fonts beyond preconnected Google Fonts (or self-hosted)
- [ ] No carousel libraries
- [ ] No second analytics tracker
- [ ] Animations use `transform` and `opacity` only

---

## SEO essentials

- [ ] `<title>` is 50-60 chars, brand-first
- [ ] `<meta description>` is 140-160 chars, written for a human
- [ ] `og:image` is 1200×630, with headline and brand mark (no stock photo)
- [ ] Canonical URL set
- [ ] Single `<h1>` per page

---

## Privacy

- [ ] Privacy-respecting analytics chosen (Plausible / Fathom / Simple Analytics)
- [ ] If cookies are used, banner is non-obscuring with a real "Reject all" button
- [ ] No session-replay tools without explicit consent
- [ ] No trackers loaded before consent
- [ ] No pre-checked subscribe boxes

---

## Brand & voice

- [ ] Setup section reflects the user's own language (not industry jargon)
- [ ] At least one editorial italic / pull-quote moment that lands
- [ ] One specific phrase the user could quote a week later
- [ ] Resolution copy frames the CTA as natural climax, not as ask
- [ ] Footer "closing line" matches brand voice

---

## The five elite questions (the final pass)

After all items above pass, ask:

1. **Would a Fortune 100 board chair feel this site is operating at their level?**
2. **Did the user have agency, or were they manipulated?**
3. **What single moment will they remember six months later?**
4. **If you removed all motion, all atmosphere, and all interactivity, would the page still earn its scroll?**
5. **Would you be proud to put your name on this?**

If any answer is "no" or "I don't know," return to the narrative outline and restart from the act that failed.

---

## The print-out

You can paste this checklist into the project and tick items physically. The act of going through it line by line is the value. Skipping is the failure.
