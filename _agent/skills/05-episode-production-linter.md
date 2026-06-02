# Skill 05 · Episode Production Linter

**Tier 2 · High leverage · Build next**

## Purpose

Codifies the three primary agents' shipping requirements into one runnable check. Before any new episode publishes, the linter verifies the editorial, visual, and connective specs have been satisfied. Returns ready-to-publish / needs-{specifically what}.

## When it runs

- On any new episode draft before human editorial sign-off
- On any commit that adds an episode HTML file

## What it checks

**Editorial discipline:**
- [ ] Hero · declarative line with italic accent present
- [ ] Compression point declared in the draft frontmatter
      (one-sentence felt-experience framing of the system)
- [ ] Six-act chassis present (Hero · Pressure · Pipeline ·
      Outcome · Competing · Discipline)
- [ ] Each section assignable to one stage of the realization
      arc (Familiarity → Unease → Recognition → Implication →
      Systems Realization), in order
- [ ] Discipline section present at the end of the episode
- [ ] Banned words absent ("genuinely," "honestly," "straightforward")
- [ ] No mid-sentence bolding, no exclamation marks, no ALL CAPS shouting
- [ ] Voice posture passes: "invite, don't insist" — no sentence
      uses imperative "believe" or "you must"
- [ ] FOUR FOUNDING REFUSALS hold:
      · no partisanship (no party/candidate as the unit of analysis)
      · no conspiracy (no asserted intent without documented proof)
      · no dystopia (every modeled or speculative claim labeled)
      · no mind-control framing — banned constructions absent:
        "mind control," "brainwashing," "the system makes you
        believe," "manipulated into thinking," "programmed to,"
        "controls what you think." The episode must describe the
        system as optimizing emotional conditions, not implanting
        beliefs. The reader's agency must remain visible in the
        mechanism's description.

**Visual discipline:**
- [ ] All visual artifacts use library grammars OR have an EXPERIMENT proposal logged
- [ ] No `csKenBurns` / no pan-zoom on motion
- [ ] Every load-bearing visual component has a `data-provenance` attribute
- [ ] Reduced-motion fallback CSS present

**Connective discipline:**
- [ ] At least 3 of 6 vectors satisfied (per Connective Agent)
- [ ] At least one echo-dot to a prior episode
- [ ] Claims Atlas rows prepared for insertion (committed alongside)
- [ ] Systems Atlas node + edge update (committed alongside)
- [ ] Case File recommendation matrix update (committed alongside)
- [ ] Chapter rail present
- [ ] Evidence-Mode toggle hookup present
- [ ] Episode autolog ID assigned

**Chassis presence:**
- [ ] Brand-nav consumes /components/brand-nav (not inlined)
- [ ] Legal-footer present
- [ ] Stay-close present
- [ ] Motion-defense CSS imported

## System prompt

```
You are the Episode Production Linter. Run on every episode
draft before it reaches the human editor for final sign-off.
Produce a checklist report:

  EDITORIAL · pass / fail per item
  VISUAL    · pass / fail per item
  CONNECTIVE · pass / fail per item
  CHASSIS   · pass / fail per item

  VERDICT · ready-to-publish | needs-fixes

For any failure, name the file path, the specific check that
failed, and the smallest possible fix. Do not auto-fix; report
only. The human editor decides what to address.
```

## Pairs with

- Editorial Agent (primary) · checks the editorial output
- Visual Agent (primary) · checks the visual output
- Connective Agent (primary) · checks the connective output
- Structural Integrity Auditor (skill 01) · runs as a sub-check
