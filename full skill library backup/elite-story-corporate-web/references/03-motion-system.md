# Motion System — Movement as Meaning

Motion in elite story-driven design always answers one question:

> *What does this movement help the user understand?*

If the answer is "nothing — it just looks cool," remove the motion.

This file specifies the motion language, the technical patterns, and the timing constants.

---

## Three classes of motion

### 1. Reveal motion
Triggered by Intersection Observer as content enters the viewport. Reveals sequence, hierarchy, and pacing. The user's scroll is the conductor.

### 2. Interaction motion
Triggered by user input — hover, click, tap, focus. Reinforces causality ("I did that, this happened").

### 3. Ambient motion
Always running. Subtle. Atmospheric. Communicates that the system is alive, not frozen. Examples: a gradient that breathes, a particle drift, a slow ticker. Always silent and slow.

Every motion in your site must belong to exactly one class. Hybrids confuse.

---

## Timing constants (use these — do not improvise)

```css
:root {
  --motion-instant:  120ms;   /* button states, hover */
  --motion-quick:    240ms;   /* small reveals, micro-interactions */
  --motion-normal:   480ms;   /* section reveals, panel transitions */
  --motion-slow:     780ms;   /* dramatic reveals, breaker animations */
  --motion-ambient: 8000ms;   /* gradient breathing, particle drift */

  --ease-confident:  cubic-bezier(.3, .7, .4, 1);   /* default */
  --ease-arrival:    cubic-bezier(.2, .9, .3, 1);   /* settles smoothly */
  --ease-departure:  cubic-bezier(.6, 0, .8, .3);   /* gets out of the way */
  --ease-cinematic:  cubic-bezier(.65, 0, .35, 1);  /* dramatic curve */
}
```

Rules:
- Never use `ease-in` alone — it implies struggle.
- Never use linear easing for organic motion (only for marquees and tickers).
- Reveal motion uses `--ease-confident` unless overriding for drama.
- Interaction motion uses `--motion-instant` to `--motion-quick`.

---

## The Intersection Observer reveal pattern

The default reveal mechanism for the entire site. Use this — do not write per-section ad-hoc scroll listeners.

### HTML

Mark anything that should reveal on entry with `.reveal`. For staggered children inside a container, add `.reveal-stagger` to the parent.

```html
<section class="reveal">
  <h2>Section headline</h2>
</section>

<div class="cards reveal-stagger">
  <div class="card">…</div>
  <div class="card">…</div>
  <div class="card">…</div>
</div>
```

### CSS

```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity var(--motion-normal) var(--ease-confident),
              transform var(--motion-normal) var(--ease-confident);
}
.reveal.in {
  opacity: 1;
  transform: none;
}

/* staggered children */
.reveal-stagger > * {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--motion-normal) var(--ease-confident),
              transform var(--motion-normal) var(--ease-confident);
}
.reveal-stagger.in > *:nth-child(1) { transition-delay: 0ms; }
.reveal-stagger.in > *:nth-child(2) { transition-delay: 80ms; }
.reveal-stagger.in > *:nth-child(3) { transition-delay: 160ms; }
.reveal-stagger.in > *:nth-child(4) { transition-delay: 240ms; }
.reveal-stagger.in > *:nth-child(5) { transition-delay: 320ms; }
.reveal-stagger.in > *:nth-child(6) { transition-delay: 400ms; }
.reveal-stagger.in > *:nth-child(7) { transition-delay: 480ms; }
.reveal-stagger.in > *:nth-child(8) { transition-delay: 560ms; }
.reveal-stagger.in > * { opacity: 1; transform: none; }
/* override with .in suffixed selectors — actual rule above */
.reveal-stagger.in > *:nth-child(1),
.reveal-stagger.in > *:nth-child(2),
.reveal-stagger.in > *:nth-child(3),
.reveal-stagger.in > *:nth-child(4),
.reveal-stagger.in > *:nth-child(5),
.reveal-stagger.in > *:nth-child(6),
.reveal-stagger.in > *:nth-child(7),
.reveal-stagger.in > *:nth-child(8) { opacity: 1; transform: none; }
```

### JS

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);   // reveal once
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '-8% 0px -5% 0px'           // trigger slightly after entry
});

document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => observer.observe(el));
```

Notes:
- `rootMargin: '-8% 0px -5% 0px'` ensures the reveal fires *after* the element is meaningfully on screen — not at the moment its first pixel crosses the viewport.
- `unobserve` after firing prevents re-animation on scroll back. Reveals are once-only.
- For elements that should be visible immediately on page load (above-the-fold hero), do not add `.reveal` — let them be static.

---

## Sticky executive nav with backdrop blur

Communicates authority, orientation, and premium positioning. The single most powerful element to make a site feel serious.

```html
<nav class="exec-nav">
  <div class="brand">Acme · Capital</div>
  <ul class="links">
    <li><a href="#approach">Approach</a></li>
    <li><a href="#proof">Proof</a></li>
    <li><a href="#firm">Firm</a></li>
  </ul>
  <a class="cta" href="#contact">Begin briefing</a>
</nav>
```

```css
.exec-nav {
  position: sticky;
  top: 0;
  z-index: 80;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 36px;
  background: rgba(10, 16, 24, .62);
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  border-bottom: 1px solid rgba(255, 255, 255, .06);
  font-family: var(--font-sans);
  transition: padding var(--motion-quick) var(--ease-confident),
              background var(--motion-quick) var(--ease-confident);
}
.exec-nav.scrolled {
  padding: 12px 36px;
  background: rgba(10, 16, 24, .85);
}
.exec-nav .links { display: flex; gap: 28px; list-style: none; }
.exec-nav .links a {
  font-size: 13px;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: rgba(255,255,255,.78);
  text-decoration: none;
  transition: color var(--motion-instant);
}
.exec-nav .links a:hover { color: #fff; }
.exec-nav .cta {
  font-size: 12px;
  letter-spacing: .08em;
  text-transform: uppercase;
  padding: 10px 18px;
  border: 1px solid rgba(255,255,255,.4);
  color: #fff;
  text-decoration: none;
  transition: background var(--motion-quick), border-color var(--motion-quick);
}
.exec-nav .cta:hover { background: rgba(255,255,255,.1); border-color: #fff; }
```

```js
const nav = document.querySelector('.exec-nav');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 40);
  lastY = y;
}, { passive: true });
```

Optional: hide on scroll-down, show on scroll-up — only if the page is long enough to warrant it.

---

## Animated gradient atmosphere (no images required)

The atmospheric background that establishes mood without ever loading a single image asset.

```css
.atmosphere {
  position: fixed;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(ellipse at 20% 30%, rgba(20, 80, 170, .35), transparent 60%),
    radial-gradient(ellipse at 80% 70%, rgba(50, 30, 120, .28), transparent 65%),
    linear-gradient(180deg, #060a14 0%, #0a1530 50%, #060a14 100%);
  background-size: 200% 200%;
  animation: drift var(--motion-ambient) linear infinite;
}
@keyframes drift {
  0%   { background-position: 0% 0%; }
  50%  { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}
```

Recipes for different moods:

**Deep oceanic (default for finance, gov, consulting):**
- Base `#060a14`, gradient stops in navy `#0a1530`, accent radials in deep blue `rgba(20, 80, 170, .35)` and royal violet `rgba(50, 30, 120, .28)`.

**Studio bronze (luxury, hospitality):**
- Base `#1a1410`, gradient stops in dark amber `#3a2618`, accent radials in copper `rgba(180, 100, 40, .25)` and ivory `rgba(240, 220, 200, .12)`.

**Cool white (medical, scientific, research):**
- Base `#f4f6f8`, gradient stops in cool gray `#e8edf2`, accent radials in pale blue `rgba(100, 140, 200, .18)` and mint `rgba(120, 200, 170, .15)`.

**Editorial cream (publishing, advisory, founder-led):**
- Base `#f1ede1`, gradient stops in warm bone `#e6dfca`, accent radials in muted coral `rgba(220, 100, 110, .12)` and gold `rgba(220, 170, 80, .14)`.

Never use more than 3 radial gradients in a single atmosphere — beyond that, the eye can't resolve the layers and it reads as muddy.

---

## Hover and interaction motion patterns

### Magnetic button
The button subtly pulls toward the cursor when nearby. Premium and confident.

```js
document.querySelectorAll('.magnetic').forEach(btn => {
  const r = 40; // attraction radius beyond button bounds
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});
```

### Cursor-aware card tilt (3D)
Subtle parallax inside a card on hover. Use sparingly — at most one tilting element per section.

```js
document.querySelectorAll('.tilt').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${y * -6}deg) rotateY(${x * 8}deg)`;
  });
  el.addEventListener('mouseleave', () => { el.style.transform = ''; });
});
```

### Underline reveal
Premium underline that draws on hover. Use for inline links inside body copy.

```css
.link {
  position: relative;
  text-decoration: none;
  color: inherit;
}
.link::after {
  content: "";
  position: absolute;
  left: 0; right: 0;
  bottom: -2px;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--motion-quick) var(--ease-confident);
}
.link:hover::after { transform: scaleX(1); }
```

### Stat number count-up
On reveal, large stats count from 0 to their target value.

```js
function countUp(el, target, duration = 1200) {
  const start = performance.now();
  const isCurrency = el.dataset.format === 'currency';
  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);  // ease-out cubic
    const v = target * eased;
    el.textContent = isCurrency ? `$${v.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : Math.round(v).toLocaleString();
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// trigger via IntersectionObserver:
document.querySelectorAll('.countup').forEach(el => {
  const target = Number(el.dataset.target);
  new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { countUp(el, target); obs.unobserve(el); }
    });
  }, { threshold: 0.5 }).observe(el);
});
```

```html
<span class="countup" data-target="2400000000" data-format="currency"></span>
```

---

## Scrollytelling section

A section where scroll progress drives narrative or visual state. Use for: data reveal, timeline walk-through, before/after sequence, multi-stage process explanation.

```html
<section class="scrolly" id="scrollyExample">
  <div class="scrolly-sticky">
    <div class="scrolly-stage">
      <!-- visual that morphs based on scroll progress -->
      <div class="state" data-step="0">State 0 visual</div>
      <div class="state" data-step="1">State 1 visual</div>
      <div class="state" data-step="2">State 2 visual</div>
    </div>
  </div>
  <div class="scrolly-steps">
    <div class="step" data-step="0">First insight</div>
    <div class="step" data-step="1">Second insight</div>
    <div class="step" data-step="2">Third insight</div>
  </div>
</section>
```

```css
.scrolly { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
.scrolly-sticky { position: sticky; top: 80px; height: calc(100vh - 80px); align-self: start; }
.scrolly-stage { position: relative; height: 100%; }
.scrolly-stage .state { position: absolute; inset: 0; opacity: 0; transition: opacity var(--motion-normal); }
.scrolly-stage .state.active { opacity: 1; }
.scrolly-steps { display: flex; flex-direction: column; gap: 80vh; padding: 40vh 0; }
.step { padding: 24px; background: rgba(255,255,255,.04); border-left: 2px solid var(--accent); }
```

```js
const stage = document.querySelector('.scrolly-stage');
const steps = document.querySelectorAll('.scrolly-steps .step');
const stepObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const idx = e.target.dataset.step;
      stage.querySelectorAll('.state').forEach(s => s.classList.toggle('active', s.dataset.step === idx));
    }
  });
}, { threshold: 0.5 });
steps.forEach(s => stepObs.observe(s));
```

---

## What never to animate

- Body copy paragraphs (animating words distracts from reading).
- Pricing tables (motion implies the prices are negotiable).
- Legal text (gravity requires stillness).
- Multiple things at the same time on the same row (the eye must pick one).
- Anything below the fold of the resolution / CTA section (the user has decided; do not distract).

---

## Reduced motion compliance

Always respect `prefers-reduced-motion`. This is not optional.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .001ms !important;
    scroll-behavior: auto !important;
  }
  .reveal, .reveal-stagger > * { opacity: 1 !important; transform: none !important; }
  .atmosphere { animation: none !important; }
}
```

This must appear in every site's stylesheet. Without it, the skill fails accessibility.

---

## The motion review

Before shipping, walk every motion on the page and answer:

1. **What is this motion teaching?** If "nothing," remove.
2. **Would the page work in `prefers-reduced-motion`?** Test.
3. **Does any motion run forever for decoration?** If yes, remove or slow to ambient class.
4. **Is anything animating off-screen and burning CPU?** Use `IntersectionObserver` to pause.
5. **Does motion happen when text is being read?** If yes, defer.

If a motion fails the review, it does not belong on the site.
