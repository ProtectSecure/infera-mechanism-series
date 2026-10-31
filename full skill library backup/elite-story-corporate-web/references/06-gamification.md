# Gamified Narrative Engagement System

Gamification in elite design is **not points, badges, or progress bars**. It is participation architecture: the system that turns a passive reader into an active investigator.

The user should feel like a strategist, an investigator, a builder, a decision-maker — not a consumer of information.

This file specifies the mechanics, the rules, and the ethics.

---

## Core principle

> Every interactive element must reward understanding, not engagement-for-its-own-sake. The reward is insight, not dopamine.

If a gamification mechanic doesn't help the user learn or remember something, remove it. If it manipulates the user into staying longer without giving them anything in return, remove it.

---

## Branching narrative pathways

The strongest gamification pattern for elite sites: let the user choose their journey.

### When to use
- The site serves multiple audiences (executive / technical / investor / customer).
- The brand offers multiple distinct services and a single arc would compromise depth.
- The story benefits from exploration over linear walk-through.

### Path design pattern
Each path is framed by the user's intent, not the brand's taxonomy:

| Intent-led (do this) | Brand-led (don't) |
|---|---|
| "I need to understand the problem" | "Our research" |
| "Show me the data" | "Insights" |
| "Show me the proof" | "Case studies" |
| "Let me explore the future" | "Vision" |
| "Help me decide" | "Solutions" |

### Implementation
A `<section>` of full-width path cards. On select, the page swaps the chapter set in place (no navigation). The breaker and resolution remain shared across paths.

```html
<section class="paths" id="pathPicker">
  <h2>What brought you here?</h2>
  <div class="path-grid">
    <button class="path" data-path="problem">
      <span class="ix">01</span>
      <span class="lbl">I need to understand the problem</span>
      <span class="meta">~ 4 min · 3 chapters · data-light</span>
    </button>
    <button class="path" data-path="data">
      <span class="ix">02</span>
      <span class="lbl">Show me the data</span>
      <span class="meta">~ 6 min · 4 chapters · data-heavy</span>
    </button>
    <button class="path" data-path="proof">
      <span class="ix">03</span>
      <span class="lbl">Show me the proof</span>
      <span class="meta">~ 5 min · 3 case studies</span>
    </button>
    <button class="path" data-path="decide">
      <span class="ix">04</span>
      <span class="lbl">Help me decide</span>
      <span class="meta">~ 3 min · comparison + recommendation</span>
    </button>
  </div>
</section>
```

```js
const paths = document.querySelectorAll('.path');
paths.forEach(p => {
  p.addEventListener('click', () => {
    const selected = p.dataset.path;
    document.body.dataset.path = selected;     // CSS hook
    document.querySelectorAll('[data-path-view]').forEach(view => {
      view.style.display = view.dataset.pathView === selected ? '' : 'none';
    });
    document.querySelector(`[data-path-view="${selected}"]`).scrollIntoView({ behavior: 'smooth' });
  });
});
```

```html
<section data-path-view="problem" style="display:none">… problem-led chapters …</section>
<section data-path-view="data" style="display:none">… data-led chapters …</section>
<section data-path-view="proof" style="display:none">… proof-led chapters …</section>
<section data-path-view="decide" style="display:none">… decide-led chapters …</section>
```

---

## Unlockable information architecture (six layers)

Information depth should expand on user curiosity, never overwhelm by default.

| Layer | Content |
|---|---|
| **1. Emotional hook** | Headline or one-sentence stake |
| **2. Clear explanation** | Body paragraph that explains plainly |
| **3. Data and proof** | Numbers, sources, micro-stats |
| **4. Technical depth** | How the system actually works |
| **5. Strategic implication** | What this means for the user's decision |
| **6. Decision pathway** | The next action |

Default the user sees: layers 1, 2, 5. The other layers are available via expander, hover, or "deepen" affordance.

```html
<div class="insight">
  <div class="layer-1">Headline insight.</div>
  <div class="layer-2">The plain explanation paragraph.</div>
  <button class="deepen" data-action="open-evidence">+ See the evidence</button>
  <div class="layer-3 layer-4 hidden">
    Data, source citations, technical detail.
  </div>
  <div class="layer-5">What this means for you, the decision-maker.</div>
  <a class="layer-6 cta" href="#cta">→ Take the next step</a>
</div>
```

---

## If-this-then-that interaction rules

Build interactions as explicit IF/THEN behaviors, not ambient niceties:

| IF | THEN |
|---|---|
| User hovers over a metric | Reveal its source, denominator, and trend in a small popover. |
| User clicks a path arrow | Move to a new narrative branch (smooth scroll, swap chapters). |
| User scrolls slowly through a section | Reveal deeper explanation, expand annotations. |
| User scrolls quickly past a section | Summarize, reduce friction, surface only the headline insight. |
| User selects a role at the top of the page | Personalize all subsequent copy to that role. |
| User opens a data point | Expand into a Tufte-style visual explanation. |
| User completes a section | Unlock the next insight visually (subtle progress beacon). |
| User returns to a prior section | Show accumulated progress and offer to skip past visited material. |
| User hovers a chapter card for 1.2s+ | Surface its three sub-claims as a preview. |
| User clicks a comparison toggle | Animate the visual transition between states. |

Code these explicitly. Do not rely on serendipity.

---

## Progression mechanics (the "I'm uncovering understanding" feel)

### Chapter progression indicator
A thin progress strip in the sticky nav that fills as the user scrolls. Not a percentage — a chapter strip with the active chapter highlighted.

```html
<nav class="exec-nav">
  <div class="brand">…</div>
  <div class="chapter-strip">
    <span data-ch="1" class="ch on"></span>
    <span data-ch="2" class="ch"></span>
    <span data-ch="3" class="ch"></span>
    <span data-ch="4" class="ch"></span>
  </div>
  <ul class="links">…</ul>
</nav>
```

```css
.chapter-strip { display: flex; gap: 6px; align-items: center; }
.ch {
  width: 28px; height: 2px; background: rgba(255,255,255,.25);
  transition: background var(--motion-quick), width var(--motion-quick);
}
.ch.on { background: var(--accent); width: 42px; }
.ch.done { background: rgba(255,255,255,.6); }
```

```js
const chapters = document.querySelectorAll('[data-chapter]');
const strip = document.querySelectorAll('.chapter-strip .ch');
const chObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const n = +e.target.dataset.chapter;
      strip.forEach((s, i) => {
        s.classList.toggle('on', i === n - 1);
        s.classList.toggle('done', i < n - 1);
      });
    }
  });
}, { threshold: 0.4 });
chapters.forEach(c => chObs.observe(c));
```

### Insight-unlocked moments
When the user opens a deepened layer or completes a key interactive section, a small "insight unlocked" indicator briefly appears in the nav.

```js
function flashInsight(label) {
  const el = document.createElement('div');
  el.className = 'insight-flash';
  el.textContent = '⌁ ' + label;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('in'));
  setTimeout(() => el.classList.remove('in'), 2400);
  setTimeout(() => el.remove(), 2900);
}
// trigger:
document.querySelectorAll('.deepen').forEach(b => {
  b.addEventListener('click', () => flashInsight('Evidence unlocked'));
});
```

```css
.insight-flash {
  position: fixed; top: 86px; right: 24px;
  background: var(--accent); color: var(--bg);
  font-family: var(--font-mono); font-size: 11px;
  letter-spacing: .18em; text-transform: uppercase;
  padding: 8px 14px; z-index: 95;
  opacity: 0; transform: translateY(-8px);
  transition: opacity .25s, transform .25s;
}
.insight-flash.in { opacity: 1; transform: none; }
```

---

## Decision-based interactions (use sparingly)

Embed light decision moments inside chapters:

- "Choose the risk you would eliminate first."
- "Predict the outcome before revealing the data."
- "Which future scenario concerns you most?"
- "Select your operational priority."
- "Explore the hidden bottleneck."

Each is a multi-choice prompt. The choice changes what is shown next — different chart annotation, different revealed insight, different next-chapter framing.

**Rules:**
- Never make the user feel wrong. Every choice is interesting.
- Reveal what the user *would have* seen with other choices — invite curiosity, not regret.
- Track choices to personalize the resolution CTA copy ("Given you prioritized X, here is the next step that fits.").

---

## Retention & memorization systems

### Memory landmarks
A page should contain 2–4 deliberately memorable moments:
- A specific large number that becomes the headline takeaway.
- A specific visual motif that recurs.
- A specific phrase the user could quote a week later.
- A specific interaction the user did with their own hands.

Plan these intentionally during narrative drafting. Don't hope they emerge.

### Visual motif recurrence
A recurring shape, color, or annotation style across chapters anchors memory. Example: a small mono-typed "+47%" annotation that appears on every chapter's data point, in the same color and position, builds visual rhythm and recall.

### Narrative callbacks
The resolution section explicitly references the setup section's conflict. "You arrived here looking for X. Here is X." Closes the loop. Activates memory.

### Earned reveals
A statistic shown after the user does something (selects a path, predicts an answer, opens a layer) is remembered far better than the same statistic shown as a callout. Reserve your strongest stats for earned reveals.

---

## Adaptive engagement logic

Adapt based on scroll velocity and dwell:

```js
let lastY = 0, lastT = Date.now(), velocityScore = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const t = Date.now();
  const v = Math.abs(y - lastY) / Math.max(1, t - lastT);  // pixels per ms
  velocityScore = velocityScore * 0.85 + v * 0.15;          // smoothed
  document.body.dataset.engagement = velocityScore > 1.6 ? 'scanning' : 'reading';
  lastY = y; lastT = t;
}, { passive: true });
```

```css
/* hide deep annotations when scanning, reveal when reading */
body[data-engagement="scanning"] .deep-annotation { opacity: 0; }
body[data-engagement="reading"]  .deep-annotation { opacity: 1; transition: opacity .4s; }
```

Use this lightly — overcomplication breaks trust.

---

## Ethical engagement rules (NON-NEGOTIABLE)

The skill **forbids** the following patterns:

- Fake scarcity ("Only 3 spots left" when there are not).
- Fake urgency countdown timers.
- Manipulative loss-aversion ("Don't miss out").
- Dark pattern opt-out checkboxes (pre-checked subscriptions).
- Endless scroll without resolution.
- Variable-reward dopamine loops disguised as engagement.
- Modal popups that block scroll.
- "Are you sure you want to leave?" exit-intent guilt prompts.
- Auto-playing audio or video.
- Notification permission requests on page load.
- Cookie banners that obscure 40%+ of the viewport.

If any of these appear in the output, the skill has been misapplied. Remove them.

---

## Executive-grade gamification rules

Gamification must feel appropriate for:
- Enterprise software brands
- Government modernization
- Elite consulting firms
- Finance and private wealth
- Healthcare and biotech
- Research institutions
- Technology platforms serving the above

The tone is **intellectually playful, respectful, exploratory, confidence-building**. Never **cartoonish, manipulative, juvenile, casino-like, dopamine-spam driven**.

Reference inspirations:
- Bloomberg Terminal interaction logic
- Pudding (long-form interactives)
- The NYT Upshot interactive features
- Interactive museum exhibits (e.g., Cooper Hewitt's interactive walls)
- Strategy games with restrained UI sophistication
- High-end simulation interfaces (e.g., Apple's keynote demos)
- Investigative documentary interactives

---

## The final test

After building any gamified section, ask:

1. **Did this teach the user something they could repeat to a colleague tomorrow?**
2. **Did the user have agency, or did the system manipulate them?**
3. **Could a Fortune 100 board chair use this without feeling condescended to?**
4. **Did the user leave feeling smarter, not stickier?**

If any answer is "no," the gamification is wrong. Strip it back to insight-only.
