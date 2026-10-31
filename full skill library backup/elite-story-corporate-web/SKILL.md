---
name: elite-story-corporate-web
description: Design premium, story-driven corporate websites that feel cinematic, intelligent, credible, and emotionally compelling. Use when the user wants to build, redesign, audit, or critique a high-stakes brand-facing site — especially for enterprise, luxury, technology, consulting, finance, healthcare, or government brands. Combines five-act narrative architecture, Tufte information design, cinematic scroll pacing, conversion psychology, motion-as-meaning, gamified engagement, and executive-grade visual restraint. Trigger phrases include "build a corporate website," "design a premium landing page," "redesign our homepage," "website that feels cinematic / premium / billion-dollar," "story-driven website," "scrollytelling experience," "executive-grade web design," "audit our marketing site," "make this site feel more elite," "choose-your-journey site," "interactive corporate narrative."
---

# Elite Story-Driven Corporate Web Design System

A complete narrative web architecture for producing websites that behave like films, guided conversations, interactive documentaries, and narrative operating systems — engineered for **belief, memory, clarity, and action.**

This skill exists because modern elite web design is not interface construction. It is **emotional sequencing**, **cognitive pacing**, and **guided perception**. The skill teaches Claude to design sites where the user is the hero, the brand is the expert guide, every section earns its scroll, every motion clarifies meaning, every CTA feels like the natural climax of a story the user co-authored.

---

## When to use this skill

Load this skill when the user wants to:

- Build, redesign, or audit a brand-facing corporate, enterprise, luxury, executive, or institutional website
- Design a premium landing page or product launch page for a high-stakes brand
- Create a scrollytelling experience or interactive narrative microsite
- Build a site that needs to feel "cinematic," "premium," "intelligent," "billion-dollar," or "executive-grade"
- Apply story-driven structure to corporate communication
- Critique an existing site against story-driven web standards
- Create a "choose your journey" or branching narrative experience
- Translate a complex enterprise offering into a guided perceptual experience

**Skip this skill** for: tiny brochure pages with no narrative requirements, admin dashboards, blogs, CMS interfaces, internal tools, quick throwaway prototypes.

---

## How this skill is organized (progressive disclosure)

This SKILL.md is the entry point and decision router. Deeper material lives in `references/`, `templates/`, `prompts/`, and `checklists/` — load only what the task needs.

| What you're doing | Load |
|---|---|
| Drafting the story arc / narrative beats | `references/01-narrative-framework.md` |
| Building data sections, charts, infographics, comparison panels | `references/02-tufte-data-design.md` |
| Adding scroll motion, micro-interactions, transitions | `references/03-motion-system.md` |
| Choosing typography, color, gradient atmospheres | `references/04-typography-color.md` |
| Picking or composing components (hero, chapter, breaker, CTA, nav) | `references/05-component-library.md` |
| Designing branching paths, unlockables, completion mechanics | `references/06-gamification.md` |
| Sequencing CTAs, conversion timing, multi-step persuasion | `references/07-conversion-psychology.md` |
| WCAG compliance, performance budgets, reduced-motion behavior | `references/08-accessibility-performance.md` |
| Bootstrapping a new site | `templates/starter-page.html` |
| Snippet for a specific component | `templates/component-*.html` |
| Eliciting the brief before designing | `prompts/discovery-questions.md` |
| Pre-ship review | `checklists/quality-control.md` |

---

## Mandatory workflow

Do these in order. Skipping steps produces sites that feel like brochures.

### 1. Discover before designing
Open `prompts/discovery-questions.md` and ask the user the discovery questions. Do not begin layout until you can answer in one paragraph: who the hero is, what conflict they're in, what proof the brand has earned, and what one action you want them to take.

### 2. Draft the narrative arc on paper first
Write the five-act outline as prose, not boxes. The user is the hero. The brand is the guide. Acts:

1. **THE HOOK** — 5-7 word bold headline, immediate value, atmospheric visual
2. **THE SETUP** — name the user's pain, missed opportunity, or quiet crisis; build empathy and urgency
3. **THE CHAPTERS** — services / products / capabilities revealed as progressive story beats
4. **THE BREAKER** — disrupt the scroll rhythm with proof, case studies, interactive 3D, horizontal movement, dramatic visual shift
5. **THE RESOLUTION** — direct, frictionless CTA that feels like the climax, not an ask

Detail in `references/01-narrative-framework.md`.

### 3. Choose pacing and visual rhythm
Decide which sections are dense, which are sparse, where rhythm breaks, where motion adds meaning. Whitespace is structure, not emptiness. Density signals intellectual depth. Sparseness signals luxury. Alternate the two like film cuts.

### 4. Build progressively
Bootstrap from `templates/starter-page.html`. Drop in component templates. Customize copy, data, gradients. Add motion only where it clarifies sequence, change, or causality.

### 5. Run the quality control checklist
Before declaring done, walk `checklists/quality-control.md` line by line. If anything fails, fix or remove.

---

## Core design principles (non-negotiable)

These apply to every site this skill produces.

### Atmosphere over images
Build environments with CSS — animated linear gradients, layered radial gradients, subtle noise filters, blend modes. Avoid generic stock photography. A deep oceanic gradient that breathes is more premium than a stock executive in a glass office.

### Motion as meaning
Motion must always answer: *"What does this movement help the user understand?"* Reserve motion for: revealing sequence, implying causality, signaling progress, rewarding curiosity. Never for decoration alone. Fast interactions imply competence. Delayed reveals imply importance. Smooth continuity implies confidence.

### Tufte as default for data
Every chart, diagram, comparison, or visual explanation follows Tufte's discipline: maximize data-ink ratio, remove chartjunk, annotate on the visual, use small multiples, let the data carry the drama. Detail in `references/02-tufte-data-design.md`.

### Visual hierarchy is emotional choreography
Typography establishes gravity. Spacing establishes pace. Scale signals importance. Contrast steers attention. Every type, space, and contrast decision is a directorial choice about what the user feels next.

### The customer is the hero
Replace "We provide solutions" with "Here is the conflict we observed, how we solved it, and what changed afterward." The brand is the guide handing the hero the map.

### Earn every CTA
Never ask before trust is established. Every CTA must feel earned. Conversion is the climax of understanding, not the goal of manipulation. Detail in `references/07-conversion-psychology.md`.

### Sticky executive nav signals authority
A backdrop-blurred sticky nav with restrained type tells the user: this is a serious operation that knows where it's going.

### Intersection Observer drives reveal pacing
Headlines, cards, metrics, and proof points stagger in as the user scrolls. Pacing belongs to the user's scroll, not to autoplay. Detail in `references/03-motion-system.md`.

### Restraint is the signal of seriousness
Three colors, two typefaces, deliberate motion, generous whitespace. Excess signals insecurity. Restraint signals competence.

---

## The narrative intelligence rules

The website is not a page. It is:

- A film
- A guided conversation
- An interactive documentary
- A psychological onboarding experience
- A narrative operating system

The user must feel: **understood, oriented, emotionally engaged, intellectually stimulated, progressively convinced, rewarded for continuing downward.**

The site must avoid: **static brochure behavior, generic SaaS templates, information dumping, emotionally flat UX, over-navigation, cluttered decision paths, excessive corporate sterility.**

Treat every section as a story beat with: a stake, a reveal, an emotional turn, and a reason to continue. Open `references/01-narrative-framework.md` whenever you doubt whether a section earns its scroll.

---

## The contrast you must always honor

| Traditional Web Design | Forward-Leaning Story Design |
|---|---|
| Passive user | Active participant |
| Feature-heavy grids | Narrative flow |
| Static images | Dynamic atmospheric visuals |
| Scattered CTAs | Climax-driven CTA |
| "What we sell" messaging | "How we solve your struggle" messaging |
| Decoration motion | Causality motion |
| Symmetric brochure layout | Tension-and-release pacing |
| Information dumping | Progressive disclosure |
| Generic stock imagery | CSS-built atmospheric environments |
| Sterile corporate tone | Intelligent vulnerability |

If a design slips toward the left column, restart from the narrative outline.

---

## What the user must feel at the end

> "I did not just visit a website. I explored a system, understood the stakes, and found my path forward. I remember this because I participated in it."

If the design does not produce this feeling, the skill has not been applied. Re-load `checklists/quality-control.md` and start the review again.

---

## Inspiration sources (for influence, not imitation)

The skill draws from:

- **Motion** — 60fps.design
- **Patterns** — catalogue.projectsbyif.com
- **A/B test learnings** — abtest.design
- **Inspiration** — designspells.com
- **Breakdowns** — uxsnaps.com
- **UI components** — uiplaybook.dev
- **Editorial pacing** — Apple product launches, Stripe documentation, Linear.app, Framer, high-end editorial interactives (Pudding, NYT Mag interactives), Bloomberg Terminal UX logic

Reference these for influence and benchmark — never for direct imitation. The output should feel singular to the brand.

---

## Final objective

This skill exists to enable Claude to produce websites that feel **expensive without excess, cinematic without chaos, intelligent without arrogance, modern without trend-chasing, emotional without manipulation.** The bar is: would a Fortune 100 board chair feel this site is operating at their level? If yes, ship. If no, return to the narrative arc.
