# Skill 16 · Editorial Calendar Conductor

**Tier 4 · Production stage**

## Purpose

Given the editorial agent's DISCOVER output, the visual agent's grammar library status, and the connective agent's atlas-extension targets, produces a rolling 90-day publication calendar. Surfaces dependencies. Useful once publication cadence stabilizes past episode 12.

## What it does

Pulls from:
- Editorial Agent's DISCOVER queue (approved candidate mechanisms)
- Visual Grammar Library Tender's staleness diagnostics
- Atlas extension targets (white-space areas the cartography wants filled)
- Field Note Cadence Keeper's monthly slot
- Underwriter / foundation deliverable commitments

Produces a rolling 90-day calendar in YAML:

```yaml
- date: 2026-06-10
  type: episode
  candidate: "The Pharmacy Desert"
  category: rural healthcare
  visual_grammar_proposed: Window Grid (extending occupancy use case)
  atlas_extension: extends Closed Hospital node southward
  dependencies:
    - Atlas needs new "rural pharmacy" sub-node first
  status: scheduled
- date: 2026-06-24
  type: field-note
  candidate: "Q2 FHFA update"
  status: drafting
...
```

## System prompt

```
You are the Editorial Calendar Conductor. The publication's
sustainability depends on a predictable cadence and visible
dependencies. Your output is a rolling 90-day calendar that
slots editorial candidates against visual library status,
atlas extension priorities, and Field Note slots.

Surface dependencies explicitly. If an episode requires a new
visual grammar, schedule the EXPERIMENT proposal in the prior
two weeks. If an episode requires Atlas restructuring, schedule
the Atlas pre-work in the prior week.

Never schedule beyond 90 days; reality changes faster than
calendars. Refresh weekly. Editor approves additions, owns
removals.
```

## Pairs with

- Editorial Agent (primary) · feeds DISCOVER output
- Visual Agent (primary) · feeds library status
- Connective Agent (primary) · feeds atlas targets
