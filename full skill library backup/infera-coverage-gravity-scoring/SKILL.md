---
name: infera-coverage-gravity-scoring
description: Score every detected event on a 0–100 "coverage gravity" scale that combines power proximity, institutional venue, camera/livestream availability, conflict level, novelty, recurrence, and same-time collision with other high-gravity events. Produces the ranking that turns Tomorrow Board, Document Exposure Radar, and Mandated Report Radar output into a daily decision-ready watchboard. Use after the Tomorrow Board is built, after every Exposure Radar event, and during Real-time Monitor cycles. This is the skill that lets Infera say "these are the five events most likely to shape tomorrow's narrative" with a defensible methodology, not a vibe.
---

# Infera Coverage Gravity Scoring

Coverage gravity is the score that turns a long list of detected
events into a ranked watchboard. It is how Infera matches newsroom
prioritization speed without newsroom access — the assignment desk's
"what do we cover and what do we skip" call, made explicit and
defensible.

The score is not a prediction. It is a structured estimate of which
events deserve the next 5 minutes of producer / reader / analyst
attention.

## When to use

- After Tomorrow Board generation, score every row.
- After every `infera-document-exposure-radar` event.
- After every `infera-mandated-report-radar` "submitted" or "overdue"
  event.
- During the Real-time Monitor cycle to re-score in light of new
  signals (social spike, market move, related agency action).
- Before publishing any Mechanism Brief Top-5 ranking.

## When NOT to use

- For interpretation (use `infera-signal-interpretation`).
- For historical analog comparison (use `infera-why-now-engine`).
- As the sole publishing gate — gravity ≠ accuracy. Pair with
  `infera-source-triage` and `infera-investigative-method`.

## The scoring rubric

Every event accumulates points. Cap at 100. Floor at 0.

### Power-proximity points

| Signal | Points |
|---|---|
| POTUS / VP involved | +25 |
| Cabinet official testifying or speaking | +18 |
| Speaker / Senate leadership / committee chair as principal | +14 |
| Federal agency head appearance | +12 |
| State governor / major mayor as principal | +8 |
| Sub-cabinet senior official | +6 |

### Institutional-venue points

| Signal | Points |
|---|---|
| Congressional hearing | +15 |
| Court / legal action (SCOTUS oral arg / opinion day / circuit case) | +15 |
| Federal Register final rule | +12 |
| Federal Register proposed rule with public-comment window | +8 |
| Foreign leader / summit | +15 |
| Press conference / briefing | +12 |
| Stakeout / pool spray | +6 |

### Visibility points

| Signal | Points |
|---|---|
| Public livestream available (WH / C-SPAN / committee / agency) | +10 |
| Open press | +6 |
| Pool spray | +5 |
| Closed press / classified | -3 (lower visibility ≠ lower importance, but lower gravity for *coverage* purposes) |
| Transcript expected post-event | +3 |
| Witness list publicly posted | +3 |

### Conflict-level points

| Signal | Points |
|---|---|
| Trial / indictment / sentencing | +12 |
| Protest / public action at the venue | +8 |
| Scandal / resignation watch | +10 |
| Oversight / impeachment / subpoena context | +10 |
| Active foreign crisis context | +10 |
| Major legislation moving | +8 |
| Bipartisan agreement (often news because it's rare) | +6 |

### Novelty points

| Signal | Points |
|---|---|
| First public appearance of an entity | +8 |
| Sudden schedule change | +12 |
| TBA → resolved with high-power entity | +10 |
| Emergency gaggle / late-day update | +10 |
| New / never-before-seen document referenced | +8 |
| Witness contradicts prior public statement | +10 |

### Recurrence points

| Signal | Points |
|---|---|
| Same issue appeared 3+ times in past 7 days | +10 |
| Same entity appeared 3+ times in past 14 days | +8 |
| Reactivates an open GAO/OIG recommendation | +8 |
| Reactivates a previously declassified / unsealed document | +10 |

### Confirmation / reliability points

| Signal | Points |
|---|---|
| Multiple Tier-1 sources confirm | +10 |
| Single Tier-1 source | +5 |
| Tier-2 / Tier-3 only | +2 |
| Tier-4 only (Roll Call, Factba.se, social) | +1 |
| Unconfirmed / rumored | -10 |

### Social / market sensitivity points

| Signal | Points |
|---|---|
| Market-sensitive sector explicitly involved | +8 |
| Pre-event social spike already forming | +8 |
| Prediction-market activity moving on the event | +6 |

### Collision penalty/bonus

When three or more events scoring above 70 fire in the same 60-minute
window:

- The *highest-power-proximity* event keeps its full score
- The next two are flagged with a `collision` tag but keep their scores
- All other events in the window receive a `-5` collision-burial
  penalty (they will likely be under-covered today, which is itself
  newsworthy in the Attention Gap report)

## Gravity tiers

| Score | Label | Meaning |
|---|---|---|
| 90–100 | Alert now | Must-cover, time-sensitive, high consequence |
| 75–89 | High gravity | Anchor stories of the day |
| 60–74 | Likely coverage | Second-tier stories |
| 40–59 | Watch | Boring on the surface but operationally important |
| 0–39 | Low | Background |

## Output schema

Per event, append to the day's `gravity-ledger.csv`:

| Field | Notes |
|---|---|
| event_id | from Tomorrow Board |
| score | 0–100 |
| tier | Alert / High / Likely / Watch / Low |
| components | breakdown of points awarded |
| collision_flag | true / false |
| collision_window | timestamp range |
| under_covered_risk | true if collision-buried |
| recommended_action | "Top 5" / "Mention" / "Skip" / "Investigate" |

## Calibration loop

Every Friday, `infera-outcome-learning` should pull the past 7 days
of `gravity-ledger.csv` and compare predicted gravity to actual
outcomes:

- Did Alert-now events generate news clips?
- Did High-gravity events generate follow-up coverage within 48
  hours?
- Did Watch events that scored 50–60 turn out to be the buried
  important story?
- Were any Alert-now events nothingburgers? Why?

Use the calibration to adjust component weights monthly. Do NOT
adjust on single-event surprises.

## The "Attention Gap" output

This is one of the most powerful things this skill produces.

Compare daily:

- gravity-ledger.csv (what Infera ranked as important)
- coverage-actuals (what news outlets actually covered, scraped from
  major outlets)

Surface:

- **High gravity, low coverage** — under-covered important events
- **Low gravity, high coverage** — spectacle that grabbed cameras

These two lists become recurring Mechanism Series content:
**What the cameras missed** and **The story that took the oxygen**.

## Failure modes

- **Power-bias loop.** Always scoring POTUS highest produces a Trump-
  forever board. Cap power-proximity contribution at 40% of total
  score; force institutional / novelty / recurrence components to
  carry weight.
- **Visibility ≠ importance.** A closed-press classified briefing may
  matter more than a public stakeout. Flag with `coverage-blind`
  tag so the Mechanism Series can still investigate.
- **Recency bias.** Don't let 24-hour recurrence dominate. Use the
  7-day and 14-day windows above.
- **Score-as-truth drift.** Gravity is an attention-allocation tool,
  not a fact-strength tool. Pair every Top-5 list with
  `infera-source-triage` results so readers know reliability ≠ gravity.

## The Infera principle this skill encodes

NBC has cameras. Infera has the pattern. Coverage gravity is the
score that lets Infera publicly show its prioritization math — and
makes "make the machinery visible before the headline hardens"
operational. The score is defensible because every point is sourced
to a specific structural feature of the event, not a vibe.
