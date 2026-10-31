# Component Library

Every story-driven site is composed from a small set of repeating components. Each component is a named pattern with a purpose, a structure, and a set of rules. Do not invent new components — compose from these.

For working HTML for each component, load the matching `templates/component-*.html` file.

---

## 01 — Sticky executive nav

**Purpose:** Establish authority, orientation, premium positioning.
**Where:** Fixed at top, present on every page.
**Template:** `templates/component-executive-nav.html`

**Rules:**
- Backdrop blur (`backdrop-filter: blur(18px)`).
- Translucent background that darkens on scroll.
- 3–5 nav items maximum. Anything more is over-navigation.
- One CTA, top-right, outline style (not solid) until the resolution section.
- Brand mark on the left in display weight. Optional "·" separator and subtitle.
- Height: 64–72px at rest, compress to 48–56px on scroll.

---

## 02 — Hero hook section

**Purpose:** Stop the scroll. Promise the journey.
**Where:** Above the fold. First section.
**Template:** `templates/component-hero-hook.html`

**Structure:**
- Full-viewport height (`min-height: 92vh`).
- One headline, 5–7 words, set at `--t-3xl` or `--t-4xl` in display font.
- One sub-headline, single sentence, set in serif italic or sans at `--t-md`.
- Atmospheric background (CSS gradient + noise overlay).
- Optional: one soft CTA ("Begin the briefing") at the bottom.
- Optional: a small "scroll" indicator (mono label + downward chevron).

**Rules:**
- No carousel.
- No competing CTAs.
- No stock photo.
- Headline must arrive without animation (static) — the page should not "loading-bar" itself into existence.
- Sub-headline and CTA can stagger in with `.reveal` after 200–400ms.

---

## 03 — Problem setup section

**Purpose:** Name the user's conflict. Build empathy.
**Where:** Immediately after hero. Act 2.
**Template:** `templates/component-problem-setup.html`

**Structure:**
- Editorial paragraph (3–5 sentences) at `--t-md` in serif italic or in a generous sans.
- Optional: 2–4 micro-stat callouts arranged as small data points.
- Closing transition line that pivots toward Act 3.

**Rules:**
- Mirror the user's own language.
- Show, do not assert.
- Cite at least one observed reality with a number or specific.
- Do not introduce the solution yet.

---

## 04 — Narrative chapter card

**Purpose:** Progressive story beat — a chapter of the larger argument.
**Where:** Act 3. Three to five chapters per page maximum.
**Template:** `templates/component-chapter-card.html`

**Structure:**
- Chapter number (mono, eyebrow).
- Verb-led chapter name (display, large).
- One-sentence stake.
- One-sentence reveal (the move you make).
- One-sentence proof.
- Optional: a small annotated data point.
- Optional: a "read more" expander that reveals deeper layers.

**Rules:**
- Alternate visual rhythm: chapter 1 dense, chapter 2 sparse, chapter 3 dense.
- Reveal via `.reveal-stagger` so chapters arrive in sequence.
- Recurring visual motif across chapters (color, glyph, number style) builds memory anchors.

---

## 05 — Tufte data panel

**Purpose:** Carry evidence with rigor.
**Where:** Inside chapters as proof, or as the heart of Act 4 (breaker).
**Template:** `templates/component-tufte-panel.html`

**Variants:**
- **Metric callout** — one oversized number + sourcing line.
- **Metric block** — 3 to 5 metrics in a row.
- **Sparkline strip** — 5–12 small multiples.
- **Annotated chart** — SVG with in-place annotation lines.
- **Comparison table** — clean rows, no vertical rules.
- **Before/after panel** — two states with specific numbers.

**Rules:**
- All numbers carry a source line in mono.
- No 3D, no gradients on bars, no chartjunk.
- Annotations live on the visual, not in a legend.
- See `references/02-tufte-data-design.md` for the full ruleset.

---

## 06 — Case study breaker

**Purpose:** Disrupt scroll rhythm. Deliver proof. Earn the resolution.
**Where:** Act 4. One per page.
**Template:** `templates/component-case-breaker.html`

**Variants (pick one):**
- Horizontal-scroll case study (cinematic chapter transitions)
- 3D interactive object
- Scroll-driven animated data viz
- Full-bleed dramatic visual shift
- Guided video with annotated chapters
- Choose-your-journey branching interactive
- Horizontal timeline of a real engagement
- Small-multiples grid of client outcomes

**Rules:**
- Different visual language from the chapter sections — the breaker should look different.
- No CTA inside the breaker — it carries weight alone.
- End with a transition line that introduces the resolution.

---

## 07 — Interactive comparison section

**Purpose:** Help the user understand difference. Often paired with chapters or breaker.
**Template:** Inline pattern.

**Structure:**
- A toggle, slider, or tab control.
- Two or three side-by-side states (before/after, conventional/this-system, three approaches).
- Each state has its own visual + text payload that swaps on interaction.

**Rules:**
- The interaction must change something substantial — not just color.
- Default state should be the "before" or "conventional" — so the user sees the contrast on action.
- Provide a quiet keyboard control (arrow keys) for accessibility.

---

## 08 — Interactive scrollytelling section

**Purpose:** Walk the user through a multi-stage explanation tied to scroll.
**Template:** See pattern in `references/03-motion-system.md`.

**Structure:**
- A sticky visual on one side (image, SVG, canvas).
- A scrolling column of text steps on the other.
- Each step triggers a state on the sticky visual.

**Rules:**
- The visual must change meaningfully at each step.
- The steps should narrate the change, not just announce it.
- Reset gracefully on scroll back.

---

## 09 — Choose-your-journey selector

**Purpose:** Branching narrative entry point.
**Where:** Beginning of Act 3 (if multi-audience site) or as a Breaker variant.

**Structure:**
- 3–6 large, full-width or 50/50 path selectors.
- Each path titled with the user's intent ("I need to understand the problem" / "Show me the data" / "Show me the proof").
- Selecting one reveals that path's chapter set; shared breaker/resolution.

**Rules:**
- Paths must lead to genuinely different content, not the same content reskinned.
- Each path should signal its own depth — "show me the data" leads to data-dense; "tell me a story" leads to narrative.
- Detail in `references/06-gamification.md`.

---

## 10 — CTA climax section

**Purpose:** The resolution. The natural climax.
**Where:** Act 5. End of the page.
**Template:** `templates/component-cta-climax.html`

**Structure:**
- One short prose line (1–3 sentences) framing the CTA as natural next step.
- One CTA button, visually dominant — accent color, generous padding.
- Optional: a small reassurance block ("what happens after you click").
- Optional: a single secondary path ("or explore the proof").

**Rules:**
- One CTA. Not three. If there must be a secondary, it is a path back into the story.
- CTA verb is specific to the journey ("Schedule a working session" / "See the deployment guide" / "Begin the briefing"). Never "Submit" or "Contact us."
- Surround the CTA with generous whitespace — its dominance comes from space, not size.

---

## 11 — Footer trust layer

**Purpose:** Close the experience with credibility.
**Where:** Bottom of every page.
**Template:** `templates/component-footer-trust.html`

**Structure:**
- A short closing line in display or italic — the brand's parting voice.
- Three to four columns: nav, legal, social/contact, location.
- A small sources/methodology link.
- A trust line (year, location, regulatory or certification if relevant).

**Rules:**
- No newsletter signup form unless the brand earns it (most don't).
- No social proof badges in the footer (those belong in the chapters).
- Set in a darker or differently-toned background from the rest of the page — the footer should feel like the credits.

---

## 12 — Insight expander (progressive disclosure)

**Purpose:** Let curious users go deeper without overwhelming the rest.
**Where:** Inside chapters, inside Tufte panels, anywhere a layer is warranted.

**Structure:**
- A short summary line + a small "read more" / "+" affordance.
- An expanded panel that reveals on click with deeper explanation, second-layer data, technical detail, or a related insight.

**Rules:**
- The summary alone must make sense without the expansion.
- The expansion should reward curiosity with something substantive — not just more bullet points.
- Animate the expansion with `--motion-quick`; do not slow-reveal.

---

## 13 — Stat ticker (subtle ambient)

**Purpose:** Communicate scale without claiming.
**Where:** Below the hero, above the footer, or as a thin band between acts.

**Structure:**
- A horizontal strip of 4–8 stats that scroll slowly left-to-right or right-to-left.
- Each stat is a single number + a short denominator + a source mark.

**Rules:**
- Slow scroll only (ambient motion class).
- No CTA, no link, no popup.
- Pause on hover so a curious user can read.
- Numbers must be real and sourced — fake ticker numbers destroy credibility.

---

## 14 — Editorial pull-quote

**Purpose:** Break a long section with a held breath.
**Where:** Inside chapters, between acts.

**Structure:**
- A short italic line, set in serif italic at `--t-xl` or `--t-2xl`.
- Optional small attribution underneath.

**Rules:**
- One per page maximum. Two becomes a pattern, which dilutes the effect.
- The line should land — read it aloud. If it doesn't land aloud, it doesn't land on the page.

---

## 15 — Live receipt / accounting panel

**Purpose:** Make abstract value flow concrete. Strong for sites that need to communicate ROI, cost-savings, or quantified outcomes.
**Where:** Inside Act 4 breaker or as a Tufte panel variant.

**Structure:**
- A receipt-style panel (monospace, line items).
- Live update on input (slider, dropdown).
- Calculations shown transparently.
- A bold bottom-line number.

**Rules:**
- Numbers must be defensible.
- Calculations should be visible — the user trusts what they can see being computed.
- The bottom-line number is the memory anchor.

---

## Composition rule

A typical page composes from these components in order:

1. Sticky executive nav (always)
2. Hero hook (Act 1)
3. Problem setup (Act 2)
4. Stat ticker [optional]
5. Narrative chapter cards × 3–5 (Act 3)
6. Tufte data panels [inside or between chapters]
7. Interactive comparison [optional, inside a chapter]
8. Case study breaker (Act 4) — sometimes a scrollytelling section or live receipt
9. Editorial pull-quote [optional, transition into Act 5]
10. CTA climax (Act 5)
11. Footer trust layer (always)

---

## What never to compose

- Two heroes on one page (multi-hero kills focus).
- More than 5 narrative chapters in a single act.
- A second CTA outside the climax section (the resolution must be the only ask).
- Carousels.
- Modals that interrupt the scroll.
- Pop-up newsletter signups.
- Chat widgets that appear automatically.

These patterns belong to brochure design or growth-hacking sites. They are forbidden here.
