# Narrative Framework — The Five-Act Web Story Arc

Every elite story-driven website is structured as a five-act arc. This is not metaphor; it is the literal scaffolding. Each act has a purpose, a length, a mood, and a transition.

The user is the **hero**. The brand is the **guide**. The product or service is the **map** the guide hands to the hero. Every section answers one question: *what is the hero learning, feeling, or deciding right now?*

---

## ACT 1 — THE HOOK (above-the-fold)

**Purpose:** Stop the scroll. Establish atmosphere. Promise a journey worth taking.

**Components:**
- One bold 5–7 word headline. No more. Cut anything that survives only because it explains.
- One subordinate line: the immediate value or stakes — a sentence the hero will recognize as theirs.
- One atmospheric environment: animated CSS gradient, layered particles, restrained motion, no stock imagery.
- One sticky executive nav with backdrop blur.
- No more than one CTA, and only if it is a soft entry ("Begin the journey" / "See the framework") — not a hard ask.

**Mood:** Confident. Quiet. Inevitable. The user should feel they've walked into a serious room.

**Failure modes:**
- Headline longer than 7 words → cut.
- Three competing CTAs → choose one or zero.
- Stock executive photo → replace with atmosphere.
- Carousel of value props → choose one.
- Tagline trying to be clever → replace with a sentence that lands.

**Examples of strong hooks (structure, not copy to reuse):**
- "Make the invisible decisive." → "We build the analytics infrastructure that runs the rooms where decisions happen."
- "Capital, deployed with conviction." → "An investment firm for operators who would rather build than pitch."
- "Operate at the scale of the question." → "Strategic counsel for organizations whose problems do not have categories yet."

---

## ACT 2 — THE SETUP

**Purpose:** Name the user's pain, conflict, or missed opportunity. Build empathy and urgency. Create the gap the rest of the page will close.

**Components:**
- A short editorial paragraph (3–5 sentences) that names the problem in the user's own language.
- Optional: 2–4 specific, observed symptoms presented as small Tufte-style data points or annotated micro-stats.
- One transition line that pivots from problem to "here is what becomes possible."

**Mood:** Recognition. Tension. A held breath before the offer.

**Rules:**
- Be specific. "Your team is overwhelmed" fails. "Your operators are spending 14 hours a week reconciling data across four systems no one trusts" works.
- Mirror language the user would use about themselves — not industry jargon.
- Show, do not assert. Use observation, not flattery.
- Resist the urge to introduce the solution yet. The setup must be allowed to land.

**Transformation guide:**
| Replace | With |
|---|---|
| "We provide solutions for X" | "Here is the conflict we observed in X" |
| "Trusted by 200+ enterprises" | "Used by the team that runs the world's largest [specific operation]" |
| "Industry-leading" | The specific decision the leader makes faster because you exist |

---

## ACT 3 — THE CHAPTERS

**Purpose:** Introduce services, products, capabilities, or pillars as **progressive story beats** — each one a chapter in the larger argument. Not a feature grid.

**Structure:**
- 3–5 chapters maximum. (More than 5 and you are dumping, not telling.)
- Each chapter has: a name, a stake, a reveal, a proof point.
- Each chapter card or section should answer: *what does the hero now know that they did not know before?*

**Visual rhythm:**
- Alternate dense and sparse: a chapter that reveals a system can be data-dense; the next can be a single sentence with vast whitespace.
- Use scroll-triggered staggered reveals so the chapters feel paced, not dumped.
- Recurring visual motif (a color, a glyph, a specific number style) across chapters builds memory anchors.

**Anti-patterns:**
- Equal-weight feature cards in a 3x2 grid — this is brochure structure.
- Headlines that are noun phrases ("Analytics," "Integration," "Support") — replace with what the chapter argues.
- Identical CTA on every card — pick one, place at the end.

**Chapter template (prose):**
> "[Verb-led name of the chapter]. [One-sentence stake — why this matters now]. [One-sentence reveal — the move you make]. [One-sentence proof — what changes as a result]. [Optional: one annotated micro-data point]."

---

## ACT 4 — THE BREAKER

**Purpose:** Disrupt the scroll rhythm. Signal that what is coming is different. Deliver the proof that earns the resolution.

**This is the most important section of the page.** It is what separates story-driven design from brochure design. If your page lacks a breaker, it is a brochure.

**Breaker options (pick one):**
- A horizontal-scroll case study with cinematic chapter transitions
- A 3D interactive object or environment the user can manipulate
- An animated Tufte-style data visualization that reveals over scroll
- A full-bleed dramatic visual shift (color inversion, atmosphere change, scale collapse)
- A guided narrative video with annotated chapters
- A "choose your journey" branching interactive that lets the user pick the proof they care about
- A horizontal timeline that walks through a real engagement
- A small-multiples grid of outcomes across clients (with deliberate anonymization)

**Mood:** Surprise. Authority. *"Oh. They actually do this."*

**Rules:**
- The breaker must reveal **proof**, not promise.
- The breaker must change the visual language so the rest of the page feels different after.
- No CTAs inside the breaker — let it carry weight on its own.
- The breaker must end with a transition line that introduces the resolution.

---

## ACT 5 — THE RESOLUTION

**Purpose:** Give the hero the next step. The CTA. The frictionless climax.

**Components:**
- A single, direct, frictionless CTA.
- A short prose line — 1 to 3 sentences — that frames the CTA as the natural climax of what the user just read.
- Optional: a small reassurance block (a name, a process step, a "what happens after you click").

**Mood:** Relief. Arrival. Momentum. The user should feel: *"Of course this is what I do next."*

**Rules:**
- The CTA verb must match the journey. "Schedule a working session" works for consulting. "See the deployment guide" works for technical platforms. "Start the briefing" works for a guided tour.
- Never use generic verbs ("Contact us," "Submit," "Get in touch") at the resolution. They erase everything the page just built.
- The CTA must be visually dominant. Not because it screams, but because the rest of the resolution has space around it.
- One CTA. Not three. Not a primary-and-secondary pair unless the secondary is "explore another path."

---

## Pacing the arc

The acts are not equal in length. Typical pacing for a corporate site:

| Act | Approx. % of total scroll height |
|---|---|
| Hook | 8–12% |
| Setup | 10–15% |
| Chapters | 35–45% |
| Breaker | 15–25% |
| Resolution | 8–12% |
| (Trust footer, sources, legal) | 5–10% |

If your chapters exceed 50% of scroll, cut chapters. If your breaker is under 15%, it isn't doing enough.

---

## Sequencing emotional beats

A strong arc moves the user through these emotional states in order:

1. **Curiosity** — opened by the hook
2. **Recognition** — the setup mirrors them
3. **Hope** — the first chapter shows a path
4. **Trust** — chapters compound proof
5. **Surprise** — the breaker reframes
6. **Resolve** — the resolution gives the next step

If you can name which beat each section is delivering, the arc is working. If a section delivers no beat, it's brochure copy. Cut it.

---

## Multi-path narratives (advanced)

For sites that need to serve multiple audiences (executive / technical / investor), use a **branching Act 3** with a "choose your journey" interaction. Each branch has its own chapter set; the breaker and resolution remain shared. Detail in `references/06-gamification.md`.

---

## The pre-flight question

Before writing a single line of HTML, answer in one paragraph:

> The user arriving at this site is [who]. They are quietly worried about [conflict]. They are looking for [outcome] but have been let down by [common alternative]. By the end of this scroll, they will understand [single insight] and will feel that the natural next step is [action]. The single thing they will remember six months later is [memory anchor].

If you cannot answer this paragraph, do not build the site. Return to discovery.
