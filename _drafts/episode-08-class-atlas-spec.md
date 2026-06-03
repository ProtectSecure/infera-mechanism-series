# EP 08 · The Class Engine · Class Atlas Interactive · Build Spec

**Status:** INVESTIGATE · 3 June 2026
**Purpose:** Component-by-component specification of the load-bearing interactive. Reader-facing demonstration that the five chapter mechanisms compound through one household to produce class outcomes.
**Build target:** Vanilla SVG + CSS + ~150 lines of JS (no framework). Same chassis pattern as EP 04 The Influence War interactive. Sticky-canvas treatment per the Trickle pattern. ~640px viewBox.

---

## CORE METAPHOR

A single household icon sits at the center. Five orbits surround it — one per chapter (housing, employment, healthcare, credit+settlement, civic). Each orbit contains:
- A **Season II mechanism node** on the outer ring (composite, score, target, fragment, substrate)
- A **Season I family card** on the inner ring (the anchor from Step C)

The reader clicks any mechanism → an arrow traces from the mechanism through the household to the family it produced. Click any family → arrow reverses, family back through household to the mechanism that produced them. Click all five mechanisms in sequence → the household darkens; the line "Five mechanisms. One household. One class." emerges for 3 seconds; the diagram resets.

---

## DATA MODEL

```javascript
const CHAPTERS = [
  {
    id: 'housing',
    angle: -90,        // top
    color: '#ff2d8b',  // magenta — strongest visual weight
    mechanism: {
      label: 'Trust Market',
      ep: 'EP 03',
      sub: 'tenant-screening score',
      icon: 'gate'     // svg symbol id
    },
    family: {
      names: 'Maria & Devon',
      zip: '30315',
      story: 'S1·01 The Eviction Funnel',
      outcome: 'eviction filing · 47 days after medical-debt FICO drop',
      url: 'the-eviction-funnel.html'
    },
    composite: 'EP 02 Personhood Inc.',
    arrow_text: 'score → renewal denied'
  },
  {
    id: 'employment',
    angle: -18,        // upper-right
    color: '#c79832',  // butter-ochre
    mechanism: {
      label: 'Algorithmic ATS',
      ep: 'EP 03',
      sub: 'resume ranker',
      icon: 'sort'
    },
    family: {
      names: 'James',
      zip: '30238',
      story: 'S1·04 The Trickle',
      outcome: '3 promotion denials in 14 months · supervisor recs overridden',
      url: 'the-trickle.html'
    },
    composite: 'EP 02 Personhood Inc.',
    arrow_text: 'rank → promotion denied'
  },
  {
    id: 'healthcare',
    angle: 54,         // lower-right
    color: '#4ba889',  // mint-green
    mechanism: {
      label: 'Composite State',
      ep: 'EP 06',
      sub: 'records · prior auth',
      icon: 'records'
    },
    family: {
      names: 'Dorothy',
      zip: '31810',
      story: 'S1·02 The Closed Hospital',
      outcome: 'records dispersed at closure · Medicare Advantage denial',
      url: 'the-closed-hospital.html'
    },
    composite: 'EP 02 Personhood Inc.',
    arrow_text: 'fragmentation → access lost'
  },
  {
    id: 'credit',
    angle: 126,        // lower-left
    color: '#8770b8',  // lavender
    mechanism: {
      label: 'Tier Classifier',
      ep: 'EP 03 + S1·09',
      sub: 'settlement + securitization',
      icon: 'sift'
    },
    family: {
      names: 'Robert',
      zip: '30401',
      story: 'S1·08 The Settlement Shrinkage',
      outcome: '$1,205 net · 14% of modeled harm · mortgage held by overlapping capital',
      url: 'the-settlement-shrinkage.html'
    },
    composite: 'EP 02 Personhood Inc.',
    arrow_text: 'tier → check shrunk'
  },
  {
    id: 'civic',
    angle: -162,       // upper-left
    color: '#5e88c2',  // blue
    mechanism: {
      label: 'Influence War',
      ep: 'EP 04',
      sub: 'composite voter target',
      icon: 'target'
    },
    family: {
      names: 'LaToya',
      zip: '30314',
      story: 'S1·05 The Provisional Ballot',
      outcome: 'provisional ballot rejected · broker-lag address challenge',
      url: 'the-provisional-ballot.html'
    },
    composite: 'EP 02 Personhood Inc.',
    arrow_text: 'challenge → vote rejected'
  }
];
```

5 chapters · 72° apart on a circle · starting at top and rotating clockwise.

---

## SVG STRUCTURE · idle state

ViewBox: `0 0 640 640`. Center at (320, 320).

Three concentric rings:
- **r=80** · Household icon (the central object · 160×160 square equivalent)
- **r=170** · Family-card inner ring (5 family cards positioned at chapter angles)
- **r=260** · Mechanism-node outer ring (5 mechanism nodes positioned at chapter angles)

```
                MECHANISM 1
                    ⬢
            FAMILY 1
              ▭▭
                
   MECHANISM 5       MECHANISM 2
       ⬢                ⬢
   FAMILY 5  ╭────╮  FAMILY 2
     ▭▭     │ ⌂  │    ▭▭
            │HHLD│
   FAMILY 4 ╰────╯  FAMILY 3
     ▭▭                ▭▭
       ⬢                ⬢
   MECHANISM 4       MECHANISM 3
```

### Household icon (center)
- 160×160 area at (320,320)
- Stylized two-adult-two-child family silhouette in soft ink-line (per Season I-and-II family-photo grid visual restraint)
- Surrounded by a thin dashed circle showing "the household composite is read from the inside out and the outside in"
- Label below icon: small mono caps **"ONE HOUSEHOLD"**

### Mechanism node (outer ring, ×5)
- 64×64 hexagon
- Filled with chapter color at idle opacity 0.5
- Centered on point at r=260 from household, at chapter angle
- Inside the hex: small icon glyph (gate / sort / records / sift / target)
- Label above hex: **mechanism.ep · mechanism.label** in mono
- Sublabel below hex: **mechanism.sub** in mono italic, smaller

### Family card (inner ring, ×5)
- 80×54 rounded rectangle
- Background cream paper with thin ink-line border
- Centered on point at r=170 from household, at chapter angle
- Inside:
  - First names in serif italic (Instrument Serif)
  - ZIP in mono caps
  - Story slug in mono caps tiny (e.g., "S1·01 EVICTION FUNNEL")

### Connecting line (idle)
- Each chapter has a thin dashed line connecting mechanism → family at idle, in chapter color, opacity 0.25
- Suggests latent connection without activating it

---

## INTERACTION STATES

### HOVER on mechanism node
- Hex fills to opacity 0.85 + small pulse animation
- Idle dashed connecting-line solidifies (opacity 0.7) but does not animate
- Tooltip appears near node: *"Click to trace from this mechanism through one household to the outcome."*
- 200ms transition

### HOVER on family card
- Card glows with a thin pink-magenta outer ring
- Idle dashed connecting-line solidifies in chapter color (opacity 0.7) but does not animate
- Tooltip: *"Click to reverse-trace from this outcome back to the mechanism."*
- 200ms transition

### CLICK on mechanism node · forward trace
1. Mechanism hex pulses brightly (0.3s scale up + back)
2. Arrow traces from mechanism → household, in chapter color, with **stroke-dasharray animation** giving the dashes-flowing-along-path feel · 0.8s
3. Household icon receives a brief brightness flash as arrow arrives
4. Arrow continues from household → family, with same flowing-dash effect · 0.8s
5. Family card animates from idle into "selected" state: card glows in chapter color, the outcome text reveals via opacity 0→1
6. Arrow-text label appears mid-arrow showing `arrow_text` (e.g., "score → renewal denied")
7. Audio cue (optional, off by default): subtle "tick" sound

State persists until the reader hovers elsewhere or clicks again.

### CLICK on family card · reverse trace
- Same animation, reversed direction
- Same persistence

### CLICK ALL FIVE MECHANISMS IN ANY ORDER · the reveal
- Five active-state mechanisms tracked in `state.activatedMechanisms`
- When `activatedMechanisms.size === 5`, the reveal sequence fires:

```
Step 1 (0.0s):   All five arrows simultaneously pulse to maximum intensity for 0.4s
Step 2 (0.4s):  Household icon darkens (cream → ink black) over 0.8s while all five arrows hold steady at max brightness
Step 3 (1.2s):  Title text fades in over the household: "Five mechanisms."
Step 4 (1.8s):  Subtitle text fades in below: "One household."
Step 5 (2.4s):  Footer text fades in: "One class."
Step 6 (3.4s):  Hold the full state for 2 seconds
Step 7 (5.4s):  Everything fades out over 1.2s, diagram resets to idle
Step 8 (6.6s):  Replay tooltip appears: "Click another chapter to begin again, or click any family to read their story."
```

The reveal text styling:
- Three-line stack centered on household
- "Five mechanisms." in serif italic, 28px
- "One household." in serif italic, 32px
- "One class." in serif italic, 38px, color punk-magenta
- Each line drop-in animation with 0.3s ease-out

---

## REPLAY FLOW

After reveal completes:
- Diagram resets to idle (all opacities back to baseline)
- `state.activatedMechanisms` clears
- A small "PLAY AGAIN" link appears bottom-right of the SVG
- Optionally: a "shuffle order" mode that highlights a different chapter sequence each replay (housing → employment → healthcare → credit → civic is the canonical order; other orders allowed)

The user can also click family-card-link (the "Read S1·01 The Eviction Funnel" link) which navigates to the Season I story — but only after explicit click on the family card's small "read story" CTA, not on the card itself (so the reverse-trace remains the primary card interaction).

---

## ACCESSIBILITY

- All animations honor `@media (prefers-reduced-motion: reduce)` — arrows snap into final state instead of tracing
- All mechanism nodes are keyboard-focusable via tab
- All family cards are keyboard-focusable via tab
- Enter / Space triggers click behavior
- Each hex + card has aria-label combining mechanism + family + chapter title
- The reveal text is announced via aria-live="polite"
- High-contrast mode: chapter colors remain identifiable; opacity differences increased to ensure 4.5:1 contrast minimum

---

## MOBILE FALLBACK

On viewports under 700px:
- Switch from radial layout to vertical stack (5 chapter cards stacked)
- Each chapter card shows: mechanism block on left, household icon in middle (small), family card on right
- Connecting arrow stays as horizontal animated dash from mechanism → household → family within each card
- Tap to trigger forward trace (and tap family-card side to reverse)
- The five-mechanism reveal happens when all 5 have been tapped at least once — full-screen overlay with the three-line text + dismiss

---

## DATA-INTEGRITY FEATURES

Below the Atlas (or in a collapsible drawer):

**Inference chain confidence indicator** — small chip on each family card showing the highest confidence link in their chain (e.g., "STRONG · 4 of 6 links") with a tooltip exposing the per-link breakdown from `_drafts/episode-08-anchor-families.md`.

**Counter-explanation peek** — a small `(i) counter-read` link in the corner of each family card; tap to expand the hosted counter-explanation paragraph from the Step C document.

These two features keep the DISCIPLINE block visible in the interactive itself — the reader can never be in the Atlas without being able to see how defensible each chain is and what the defender's argument is.

---

## VISUAL STYLE

- Background: cream paper (`#f4eee4`) with subtle grain
- Household icon: ink-line on cream
- Mechanism hexes: chapter-color fills with ink-line outlines
- Family cards: cream paper rounded-rect with ink-line border, dropshadow at 6px-12px
- Arrows: chapter-color with `stroke-dasharray` for the flowing-dash effect
- Reveal text: serif italic on cream, with the final line in punk-magenta on darkened household

The aesthetic carries the Mechanism Series visual grammar (pastels, ink-line, mid-century serif typography + JetBrains Mono) — no break from established style.

---

## PROGRESSIVE-DISCLOSURE BEHAVIOR

The Atlas does not start with everything visible. On scroll-into-view:

```
Step 1 (0.0s):  Household icon fades in
Step 2 (0.4s):  Five idle connecting dashed lines fade in
Step 3 (0.8s):  Five mechanism hexes fade in (small scale-up animation, stagger 80ms each)
Step 4 (1.4s):  Five family cards fade in (small drop-in animation, stagger 80ms each)
Step 5 (2.0s):  Tooltip appears: "Click any mechanism (outer) or any family (inner) to trace."
```

A one-time entry sequence — not on subsequent re-scrolls into the Atlas.

---

## ANALYTICS HOOKS (light touch · no PII)

- `atlas_mechanism_clicked` — fires with chapter id
- `atlas_family_clicked` — fires with chapter id
- `atlas_full_reveal` — fires once per page load when all five mechanisms activated
- `atlas_family_story_followed` — fires when "read story" CTA triggers navigation
- `atlas_counter_read_opened` — fires when counter-read peek expanded

Use these to measure: which chapter draws the most engagement, what % of readers complete the full-reveal, what % follow through to a Season I story.

---

## BUILD ESTIMATE

- SVG static structure: ~80 lines
- CSS for states + animations: ~120 lines
- JS for state + click handlers + reveal sequence: ~150 lines
- Total: ~350 lines of code · single file · no dependencies

---

## NEXT STEPS

- **Step E** · Counter-read defender outreach (FAccT researcher + vendor spokesperson + sociological skeptic)
- **Step F** · Mockup v0.1 — chassis + acts I-VI + Class Atlas embedded
- Pre-publication: re-contact each of the five anchor families for opt-in confirmation (per Step C ethics note)

---

*Class Atlas spec drafted 3 June 2026 · INVESTIGATE Step D complete · ready for Step E counter-read outreach and Step F mockup phase*
