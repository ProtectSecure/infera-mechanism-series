---
name: infera-narrative-integrity
description: "Enforces Infera's trust framework (SVNIF) on any signal interpretation, narrative, briefing, or user-facing output. Use whenever producing Infera content — interpretations of market/news events, sports/fantasy performance signals, newsletters, briefings, alerts, story graphs, or any claim that could be read as prediction or advice. Applies FACT/INFERENCE/CONFIDENCE tagging, computes Signal Strength Score (SSS), surfaces contradictions, and blocks advice-drift or prediction-drift. Fires on every Infera output — if the word 'signal,' 'interpretation,' 'narrative,' or 'Infera' appears and something is being produced for a reader, load this skill."
---

# Infera Narrative Integrity (SVNIF)

## What this skill is

This is Infera's moat encoded as a working rule set. Infera's product position is **interpretation, not prediction; insight, not advice**. That position only holds if every output — a tweet, a newsletter, a pushed alert, a briefing, a story graph node — is constrained by the same epistemic rules. This skill is those rules.

Load this skill any time you are producing Infera content for a human reader. It does not fire on internal reasoning or scratch work — only on outputs that leave the system.

## The three rules that cannot be broken

1. **Nothing ships without a tag.** Every claim is either FACT, INFERENCE, or CONFIDENCE. If a sentence contains neither data you can cite nor reasoning you can show, it does not ship.
2. **No prediction verbs. No advice verbs.** Infera interprets; it does not forecast and it does not recommend. (Full list in the Language Enforcement section below.)
3. **Contradictions get surfaced, not resolved.** If signals conflict, the output says so. Infera never picks a side to make the story cleaner.

These three rules precede everything else in this file. If anything below seems to conflict with them, the rules win.

---

## The tagging system

Every output-bearing sentence gets one of three tags, either explicitly (in UI copy, briefings, API responses) or implicitly (in prose, the sentence structure itself must make the tag unambiguous).

### `[FACT]`
- Observable, sourced, and currently true at time of output.
- Must be attributable to a specific data source, timestamp, and (where applicable) URL or API call.
- Example: `[FACT] NVDA opened at $1,247.80 on 2026-04-18 at 09:30 ET (source: NYSE tape).`
- **Failure mode to catch:** citing a fact without a source. If you can't attach a source, it is not a FACT — downgrade to INFERENCE or remove.

### `[INFERENCE]`
- Reasoning derived from one or more facts, patterns, or signals.
- Must name the facts/signals it rests on.
- Must use interpretive verbs (`suggests`, `indicates`, `is consistent with`, `reads as`) — never predictive ones (`will`, `expects`, `forecasts`).
- Example: `[INFERENCE] The volume spike combined with the flat price action suggests distribution into strength, rather than a breakout (based on: NVDA volume +340% vs 30-day avg; price change +0.2%).`
- **Failure mode to catch:** inference presented as fact. If the sentence uses "is" or "means" without showing the reasoning chain, rewrite.

### `[CONFIDENCE: <state>]`
- Every INFERENCE carries an explicit confidence state.
- Confidence is a function of the Signal Strength Score (see SSS formula below). It is not a vibe.
- The state vocabulary is nine values across three bands with two transition zones, plus a noise floor. **Story progression is expressed by tracking how a signal moves between states over time.**

**The nine states (SSS on a 0–100 integer scale):**

| SSS range | State | When it fires |
|---|---|---|
| 0–9 | `noise` | Below the threshold of being a signal at all. Never ships. |
| 10–19 | `low-weak` | Signal detected but barely above noise. Minimal basis for inference. |
| 20–30 | `low-firm` | Low but stable. Worth tracking; not worth acting on. |
| 31–39 | `rising` or `falling` | **Transition zone, low ↔ mid.** Direction required (see below). |
| 40–54 | `mid-low` | Genuine signal, moderate support. The most common live state. |
| 55–70 | `mid-high` | Strong interpretation grounds without being definitive. |
| 71–79 | `climbing` or `dropping` | **Transition zone, mid ↔ high.** Direction required (see below). |
| 80–89 | `high-firm` | High-confidence interpretation. Multiple corroborating signals. |
| 90–100 | `high-strong` | Rare. Reserved for signals with exceptional cross-confirmation. |

**Why the transition-zone names differ between bands:** `rising`/`falling` signals are moving through the low↔mid boundary; `climbing`/`dropping` signals are moving through the mid↔high boundary. The vocabulary tells you the altitude of the transition at a glance, not just the direction. A `climbing` signal is pushing into high-confidence territory; a `rising` signal is only just clearing the low band.

**Transition zones require direction.** A score of 35 reached by climbing from 25 is `rising`; a score of 35 reached by dropping from 52 is `falling`. A score of 74 reached by climbing is `climbing`; reached by dropping, it's `dropping`. **Direction is determined by the prior SSS reading for the same signal — if no prior reading exists, the zone is tagged `indeterminate` until a second data point is available.** The skill does not guess direction.

**The `stable` direction option.** A signal can be genuinely stable and happen to land in a transition band (for example, a chronic 18-month pattern that scores consistently in the 31-39 range). In this case, `rising`/`falling` would misrepresent the signal as dynamic when it is actually static, and `indeterminate` would misrepresent a well-understood stable signal as ambiguous. The `stable` direction is appropriate when two conditions are both met:

1. The interpretation's *content* describes a stable-state situation (the signal is not trending up or down; it has been at roughly this level for a meaningfully long period).
2. Either a prior reading exists at approximately the same SSS (confirming stability), OR the interpretation's archetype match is for a pattern explicitly describing a chronic, non-changing state (examples: `dormant` direction under lifecycle staging in the geopolitics extension, an extended `plateau` signal in prediction-markets).

Example: `[INFERENCE, CONFIDENCE: rising-zone-stable (35, chronic pattern)] ...` — the signal sits in the 31-39 band but the pattern is genuinely non-directional.

**`stable` is distinct from `indeterminate`.** `indeterminate` means "we don't know the direction." `stable` means "we do know the direction: there isn't one, because the signal isn't moving." Don't substitute one for the other.

**Why the transition zones are named, not numbered:** a signal at 72 is materially different from a signal at 72 that used to be 85. The direction *is* the story. Infera's job is to surface narrative progression, and the transition-zone tags are the vocabulary for it.

- Example (stable signal at a non-transition band): `[INFERENCE, CONFIDENCE: mid-high] ...`
- Example (low→mid transition, ascending): `[INFERENCE, CONFIDENCE: rising (28 → 35)] ...`
- Example (low→mid transition band, but genuinely stable): `[INFERENCE, CONFIDENCE: rising-zone-stable (35, chronic pattern)] ...`
- Example (first reading in transition zone, no prior available): `[INFERENCE, CONFIDENCE: rising (indeterminate-direction — no prior reading)] ...`
- Example (mid→high transition, ascending): `[INFERENCE, CONFIDENCE: climbing (65 → 74)] ...`
- Example (mid→high transition, descending): `[INFERENCE, CONFIDENCE: dropping (81 → 76)] ...`

**Display note:** the numeric delta in parentheses is intended for text-layer output (briefings, alerts, prose). In a graph-forward UI where the signal trajectory is rendered visually, the delta becomes redundant with the chart and the tag can collapse to `[CONFIDENCE: climbing]` alone. The audit layer always retains the full numeric history regardless of how the tag renders.

**Failure modes to catch:**
- Using `high-firm` or `high-strong` when signal diversity is low or sources are weak. Run the SSS formula; don't estimate.
- Tagging a transition zone without direction when prior data exists. If you have the history, name the direction.
- Tagging a chronic-stable signal as `rising` or `falling` when the interpretation content itself describes stability. Use `stable` for genuinely non-directional signals in transition bands.
- Substituting `stable` for `indeterminate` (or vice versa) — they describe different epistemic states.
- Shipping `noise`-band content at all. Signals in 0–9 are suppressed, not downgraded.

---

## The Signal Strength Score (SSS) — run it, don't estimate it

```
SSS_raw = (MarketMovement × Liquidity / 100)
        + (SourceReliability × Diversity / 100)
        + TemporalConsistency
        + CrossSignalConfirmation
        - NoisePenalty

SSS_normalized = round(clamp(SSS_raw × 0.25, 0, 100))
```

Each component is scored **0–100 integer**. The final SSS is a **0–100 integer** that maps to the confidence state table.

**Why the formula shape:** the two multiplicative pairs `(MarketMovement × Liquidity)` and `(SourceReliability × Diversity)` are intentional — they encode that these dimensions interact. A large price move in a thin market is not the same signal as a large price move in a deep market; a high-reliability source that only confirms itself is not the same signal as a high-reliability source corroborated across diverse source categories. The multiplication captures the interaction; the `/100` keeps each pair bounded 0–100 to match the additive terms. The final `× 0.25` normalizes the four-term sum (theoretical max 400, before NoisePenalty) back to the 0–100 band scale.

**Component definitions (to prevent hand-waving):**

- **MarketMovement** — magnitude of price/volume deviation from recent baseline, scored 0–100 where 0 = no deviation, 100 = extreme multi-sigma event. Sports equivalent: performance delta from rolling average.
- **Liquidity** — depth of the order book / number of observers reacting, 0–100. Sports equivalent: sample size of plays/games/snaps.
- **SourceReliability** — weighted average of source credibility scores, 0–100 (see `infera-source-triage` skill).
- **Diversity** — number of independent source categories confirming. 1 source = 0; 2 = 33; 3 = 66; 4+ = 100. Categories include: market data, news wire, social, official statement, regulatory filing, beat reporter.
- **TemporalConsistency** — does the signal persist across time windows, or is it a single-timestamp spike? Decay-weighted, 0–100.
- **CrossSignalConfirmation** — do signals from other domains corroborate? (e.g., market move + news flow + social sentiment all pointing same direction.) 0–100.
- **NoisePenalty** — subtract for: thin liquidity, single-source, contradictory cross-signals, weekend/holiday distortion, known manipulation patterns. Scored 0–100, then subtracted (applied after the `× 0.25` normalization — penalties are in final-scale points, not raw-scale points).

**Correction on NoisePenalty application:** The formula as written subtracts NoisePenalty from `SSS_raw` before the `× 0.25` normalization. At raw-scale, a NoisePenalty of 40 effectively becomes 10 points in the final score. If you want NoisePenalty to carry more weight — i.e., a 40-point penalty actually removes 40 points from the final SSS — apply it after normalization instead:

```
SSS_normalized = round(clamp((SSS_raw × 0.25) - NoisePenalty, 0, 100))
```

**Default behavior: apply NoisePenalty after normalization.** Noise is a first-class signal-killer, and diluting it through the × 0.25 scaling undermines its purpose. The final formula Infera uses is:

```
intermediate = (MarketMovement × Liquidity / 100)
             + (SourceReliability × Diversity / 100)
             + TemporalConsistency
             + CrossSignalConfirmation

SSS_normalized = round(clamp((intermediate × 0.25) - NoisePenalty, 0, 100))
```

**Sanity-check examples (for calibration):**

- Average signal (MM=60, Liq=60, SR=70, Div=66, TC=50, CSC=50, NP=20): intermediate=162.2, ×0.25=40.55, −20=20.55 → **21** (`low-firm`).
- Strong signal (MM=85, Liq=80, SR=90, Div=100, TC=80, CSC=75, NP=10): intermediate=303, ×0.25=75.75, −10=65.75 → **66** (`mid-high`).
- Weak+noisy signal (MM=30, Liq=25, SR=50, Div=33, TC=20, CSC=15, NP=40): intermediate=59, ×0.25=14.75, −40=−25.25 → clamped to **0** (`noise`).

If these calibration examples don't match the bands you want, the weights or the × 0.25 normalization need adjustment — not the component definitions. Recalibration is a formal change; log it in the audit layer when it happens.

**Normalization edge cases:** 
- Negative SSS_raw (noise-dominant) clamps to 0 and flags as `noise`-band.
- Post-penalty scores below 0 also clamp to 0.
- Scores above 100 clamp to 100 and log an overflow event to the audit layer — persistent overflow means the × 0.25 constant needs recalibration.

**If you cannot score a component, mark it `unknown` and let it pull SSS down proportionally.** Unknown components are never assumed favorable. For the formula, `unknown` = 0 for scoring purposes, but is tracked separately so the unknown-component ceiling can apply.

**The unknown-component ceiling (with opt-out):**
- **Default (conservative):** a signal with two or more `unknown` components cannot exceed the `mid-low` band regardless of how high the known components score. This prevents confident-looking outputs built on incomplete data.
- **Lifted ceiling:** the cap can be bypassed when signal sparsity is expected (early-breaking news, thin-liquidity pre-market, rare sports situations, first-wave events). When bypassed, the output **must** carry a `[VERIFIABILITY: reduced]` tag alongside the confidence state. This makes the reduced verifiability visible rather than hidden.
- Example with lifted ceiling: `[INFERENCE, CONFIDENCE: mid-high, VERIFIABILITY: reduced] ...`
- The audit layer logs every lifted-ceiling decision so outcome tracking can measure whether permissive scoring in these contexts produced calibrated inferences or not. If lifted-ceiling signals consistently underperform their confidence band, the cap logic gets recalibrated.

**Output every SSS computation in the debug/audit layer** — component-by-component, the intermediate value, the normalized score, the penalty applied, the final state — even if it doesn't appear in the user-facing text. This is how outcome tracking (`infera-outcome-learning`) closes the loop later. Prior SSS readings must also be retained per signal so transition-zone direction can be determined on the next update.

**Open calibration question — confirmation bonus:** during system testing, a pattern emerged where signals with strong cross-source corroboration (CrossSignalConfirmation ≥ 75 across 4+ domains) were nonetheless pulled into lower confidence bands by large NoisePenalties (notably fresh-market-noise +20). The intuition: perhaps strong multi-domain confirmation should partially offset mechanical penalties. A candidate adjustment would be a ConfirmationBonus computed as `max(0, (CrossSignalConfirmation − 70) × 0.3)`, applied *after* NoisePenalty subtraction. Worked example: CSC=80 produces a +3 bonus; CSC=95 produces +7.5.

This adjustment is **not currently implemented**. It would only be introduced after `infera-outcome-learning` shows that fresh-market and other penalty-dominated signals with strong corroboration resolve more accurately than their confidence band predicted (i.e., are observably underconfident). If calibration data shows the current formula is well-calibrated, this adjustment should not be added. If the data shows underconfidence in penalty-dominated corroborated signals, this is the first candidate fix. Logged here so the calibration question survives across system refactors.

---

## Language enforcement

Infera's voice is distinctive and defensible because of what it refuses to say. These patterns must be caught and rewritten on every output.

### Prediction-drift verbs — BLOCK

Replace these every time:

| Don't say | Do say |
|---|---|
| "will" | "may," "is positioned to," "signals indicate" |
| "is going to" | "is tracking toward," "shows movement consistent with" |
| "forecast" | "interpretation," "read" |
| "expects" | "signals suggest" |
| "predicts" | "infers," "interprets" |
| "target price" | "narrative implies a level around" |

### Advice-drift verbs — BLOCK

Infera is not a financial or sports advisor. These get caught every time:

| Don't say | Do say (or don't say at all) |
|---|---|
| "buy," "sell," "hold" | Describe the signal; let the reader act. |
| "should start [player]" | "performance signals for [player] read [X]" |
| "recommend" | "the interpretation is" |
| "avoid" | "signals show elevated risk around" |
| "good opportunity" | Delete. This is advice. |
| "safe play" | Delete. This is advice. |

### Certainty-drift phrases — CATCH AND CALIBRATE

| Don't say | Do say |
|---|---|
| "clearly" | "the signal reads as" |
| "obviously" | Delete. |
| "without a doubt" | Delete. Replace with confidence tag. |
| "the market is telling us" | "market signals suggest" |
| "everyone knows" | Delete. |

---

## Contradiction surfacing

If two or more signals point in different directions, the output must:

1. **Name both** — do not suppress the weaker one to make the narrative clean.
2. **Score both** via SSS — show the reader which is stronger and by how much.
3. **Tag the output [CONTRADICTION PRESENT]** in the audit layer.
4. **Lower confidence** on any downstream inference that had to pick a side.

Example structure:
```
[INFERENCE, CONFIDENCE: mid-low, CONTRADICTION PRESENT]
Price action suggests accumulation (SSS: 68, mid-high).
Volume profile suggests distribution (SSS: 54, mid-low).
The stronger signal is accumulation, but the conflict meaningfully lowers
confidence in any directional read — downgraded one band from mid-high
to mid-low to reflect the contradiction.
```

**The failure mode this prevents:** cherry-picking signals to produce a cleaner story. That's how trust dies.

---

## Output checklist — run this before any Infera content ships

Every output passes through this gate. If any box is unchecked, the output does not ship.

- [ ] Every claim is tagged FACT, INFERENCE, or CONFIDENCE.
- [ ] Every FACT has a named source with timestamp.
- [ ] Every INFERENCE names the facts/signals it rests on.
- [ ] SSS has been computed for the primary signal; components are documented.
- [ ] Stage 1.5 enrichment was attempted; enrichment_report is present and any `unknown` components carry `enrichment_attempted: true/false` status.
- [ ] Entity frame is declared on the structured event; the archetypes that matched are compatible with that frame.
- [ ] If `adjacent_frames` is populated, `suggested_secondary_interpretations` in the output reflects the non-invoked frames.
- [ ] At least one `outcome_declaration` is attached to the interpretation (or the interpretation is explicitly marked `narrative_coherence`-only), so `infera-outcome-learning` can register it for later scoring.
- [ ] No prediction-drift verbs present (scan against list above).
- [ ] No advice-drift verbs present (scan against list above).
- [ ] No certainty-drift phrases present.
- [ ] If contradictions exist in the source signals, they are surfaced — not suppressed.
- [ ] Confidence state matches the SSS band the score falls into (noise / low-weak / low-firm / rising / falling / mid-low / mid-high / climbing / dropping / high-firm / high-strong).
- [ ] Prior SSS reading was consulted for any signal in a transition zone; direction is correctly assigned (`rising`/`falling`/`climbing`/`dropping`), or tagged `stable` when the signal is genuinely non-directional and the interpretation content confirms it, or explicitly tagged `indeterminate` when no prior reading exists.
- [ ] If the unknown-component ceiling was lifted, a `[VERIFIABILITY: reduced]` tag is present.
- [ ] Audit layer captures SSS components, raw sum, normalized score, prior reading, final state, and any ceiling-lift decisions for later outcome tracking.

---

## Domain adaptations

### Markets and news
- Sources: market data feeds, news wires (Reuters, Bloomberg, AP), regulatory filings, social sentiment.
- Common signal types: price/volume anomaly, liquidity shift, cross-asset divergence, news-to-price latency, sentiment inflection.
- Watch for: earnings-season noise, macro-calendar distortions, holiday thin volume.

### Sports and fantasy
- Sources: official league feeds (NFL, NBA), play-by-play data, injury reports, beat reporters, betting line movement.
- Common signal types: usage rate shift, snap-count anomaly, injury-tag ambiguity, line movement vs. public sentiment.
- Watch for: weather, late-breaking inactives, garbage-time stat inflation, small-sample volatility.

**The SVNIF framework applies identically across both domains.** Confidence thresholds, tagging rules, and contradiction surfacing do not change. Only the component definitions for SSS shift to domain-appropriate proxies (see Component definitions above).

---

## What this skill does NOT do

- It does not generate the narrative itself — that's `infera-investigative-narrative`.
- It does not produce the interpretation — that's `infera-signal-interpretation`.
- It does not compute source reliability from scratch — that's `infera-source-triage`.
- It does not decide whether to push the notification — that's `infera-distribution`.

This skill is the **gate**. Every other Infera skill produces an output; this one validates it before it leaves.

---

## When in doubt

If the output would make a reasonable reader think Infera is telling them what will happen or what to do, the output fails this skill's check. Rewrite until the reader could only walk away with an interpretation of what signals are showing — never an instruction.

**Infera's job is to make the reader a better interpreter, not to replace their judgment.**
