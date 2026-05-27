# Infera Agent Library

The operating system of The Mechanism Series. Three primary agents that *make* the publication; sixteen support skills that keep it *consistent, dependable, and growing*.

## Architecture

```
primary/        — The three agents that produce the work.
                  Each makes editorial / visual / connective output.

skills/         — Sixteen support skills, in priority tiers.
                  Tier 1-2 are operational hygiene.
                  Tier 3-4 are long-tail maintenance and growth.

scripts/        — Runnable code for the Tier 1 skills.
                  Other tiers are specced; build when needed.

synergies.md    — Where new combinations of skills create
                  capabilities none of the parts had alone.
```

## Primary agents

- [`primary/editorial.md`](primary/editorial.md) — discovers mechanisms, investigates, drafts episodes
- [`primary/visual.md`](primary/visual.md) — proposes grammars, enforces motion-as-meaning
- [`primary/connective.md`](primary/connective.md) — maps connections, enforces atlas discipline

## Support skills · priority order

| # | Skill | Tier | Status |
|---|-------|------|--------|
| 01 | Structural Integrity Auditor | 1 | spec + script |
| 02 | Idempotency Sentinel | 1 | spec + script |
| 03 | Component Library Curator | 1 | spec |
| 04 | Design Token Custodian | 2 | spec |
| 05 | Episode Production Linter | 2 | spec |
| 06 | Visual Grammar Library Tender | 2 | spec |
| 07 | Mobile & Accessibility Auditor | 2 | spec |
| 08 | Link Rot Watchdog | 3 | spec |
| 09 | Copy Voice Auditor | 3 | spec |
| 10 | Cross-Episode Echo Discoverer | 3 | spec |
| 11 | Ratcheting Auditor | 3 | spec |
| 12 | Field Note Cadence Keeper | 4 | spec |
| 13 | Provenance Drift Sentry | 4 | spec |
| 14 | Founding 500 Custodian | 4 | spec |
| 15 | Onboarding Operator | 4 | spec |
| 16 | Editorial Calendar Conductor | 4 | spec |

## How a new episode is produced under this system

```
DISCOVER (Editorial Agent)
  → six candidate briefs → human picks one
INVESTIGATE (Editorial Agent)
  → claim corpus → Episode Production Linter checks → human approves
RENDER (Editorial + Visual Agents)
  → episode draft + new SVG art → Copy Voice Auditor + Visual Grammar
    Library Tender review → human edits
AUDIT (Editorial Agent + Ratcheting Auditor)
  → blind-spot section + ratcheting comparison → human approves
BIND (Connective Agent)
  → echo dots, atlas extension, claims atlas rows, case file recs
PRE-PUBLISH (Tier 1-2 skills)
  → Structural Integrity Auditor + Mobile/A11y Auditor + Link Rot
    Watchdog spot-check → block on any failure
HUMAN APPROVES + COMMITS
DEPLOY
  → Founding 500 Custodian, Field Note Cadence Keeper, Provenance Drift
    Sentry run on a cadence after publish
```

## Invocation patterns

Each spec is written as a Claude system prompt and can be pasted directly into a Claude agent or used as a skill in Claude Code. The runnable scripts (Tier 1) live in `scripts/` and are designed to run in pre-commit hooks or in CI.

The publication is operated by a single human editor with these agents as their cabinet. The human always exercises judgment; the agents always propose, never publish.

*Last updated · 26 May 2026*
