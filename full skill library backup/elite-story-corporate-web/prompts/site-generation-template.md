# Site Generation Prompt Templates

Templates for invoking this skill to generate a complete site from a brief.

---

## Prompt 1 — Generate a full site from a discovery paragraph

```
Build an elite story-driven corporate website using the Elite Story-Driven Corporate Web Design System skill.

DISCOVERY PARAGRAPH:
The user arriving at this site is [who]. They are quietly worried about [conflict]. They are looking for [outcome] but have been let down by [common alternative]. By the end of this scroll, they will understand [single insight] and will feel that the natural next step is [action]. The single thing they will remember six months later is [memory anchor].

INDUSTRY: [finance / government / luxury / tech / healthcare / consulting]
PALETTE: [Deep Oceanic / Editorial Ivory / Modern Brutalist / Luxury Quiet / Cool Clinical]
TYPE SYSTEM: [Editorial Authority / Modern Brutalist / Luxury Quiet / Technical Precision]
PRIMARY CTA VERB: [exact 3-5 word verb phrase]
REASSURANCE LINE: [what happens after they click]

PROOF AVAILABLE:
- [Numbered list of specific stats, named clients (anonymized), case study moments]

INTERACTIVE ELEMENTS DESIRED: [single-path / choose-your-journey with N paths / scrollytelling case study / interactive comparison]

OUTPUT:
- Single self-contained HTML file built from templates/starter-page.html
- Filled with discovery-aligned copy, real numbers, accurate proof
- Apply chosen palette and type system
- Include sticky executive nav, full 5-act arc, Tufte data panels, CTA climax, footer trust layer
- Mandatory: reduced-motion media query, semantic HTML, single h1
- Run mental pass through checklists/quality-control.md before declaring done
```

---

## Prompt 2 — Audit an existing site against the system

```
Audit [URL or attached HTML] against the Elite Story-Driven Corporate Web Design System.

For each act of the 5-act arc, report:
1. Is the act present?
2. Does it earn its scroll?
3. What is broken or missing?
4. What single change would improve it most?

Run the full quality-control checklist and produce a numbered list of issues, sorted by severity:
- CRITICAL — fails accessibility, performance, or trust
- MAJOR — violates story-driven principle (brochure structure, multiple CTAs, decoration motion)
- MINOR — refinement opportunity

End with a one-paragraph verdict on whether the site is operating at the level it claims.
```

---

## Prompt 3 — Redesign a single section

```
Redesign the [hero / setup / chapters / breaker / resolution] section of [site] using the Elite Story-Driven Corporate Web Design System.

CURRENT STATE:
[Paste current section HTML or describe]

WHAT'S WRONG:
[Brief observation — e.g., "three competing CTAs," "stock photo of executives," "feature grid with no narrative beat"]

INTENDED FEELING:
[e.g., "the user should feel recognition, not pitched"]

OUTPUT:
- Replacement HTML matching the existing palette and type system
- Aligned to the act's purpose per references/01-narrative-framework.md
- Use templates/component-[matching].html as scaffolding
- One specific change, explained in one sentence: "I moved [X] because [Y]"
```

---

## Prompt 4 — Generate a Tufte data panel from raw numbers

```
Generate a Tufte-disciplined data panel from these numbers:

[Paste raw numbers, sources, context]

REQUIREMENTS:
- Pick the right variant: metric callout / metric block / sparkline strip / annotated chart / comparison table
- One accent color, sourced annotations, no chartjunk
- Each visual answers at least one of: cause, comparison, sequence, consequence
- Caption with source line in mono
- Reduced-motion safe

Apply the Tufte test before returning: can a reader understand it in 6 seconds?
```

---

## Prompt 5 — Plan the narrative arc before building

```
Before I build, draft the 5-act narrative arc for this site as PROSE (no boxes, no wireframes yet).

DISCOVERY: [paste discovery paragraph]

For each act, write:
- Act name
- Purpose in 1 sentence
- Mood (e.g., "recognition, held breath")
- Section copy as a paragraph
- Key beat / proof point / interaction element

End with the pre-flight question: "The user arriving here is [...]" filled in.

Once approved, generate the HTML using Prompt 1.
```

---

## Use these prompts as templates

Customize for the specific project. The goal is to make the discovery and intent explicit *before* generating HTML — never bury those decisions inside the build prompt.
