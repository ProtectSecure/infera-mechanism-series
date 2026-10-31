---
name: infera-outcome-learning
description: "Infera's learning loop. Use when an interpretation needs to be registered for later outcome tracking, when a real-world outcome has become knowable and needs to be scored against prior interpretations, when reviewing calibration across a set of past interpretations, or when aggregating learning signals to recommend system adjustments. Tracks interpretations over time, compares stated confidence bands to observed hit rates, and surfaces calibration drift. Triggers: 'track this,' 'score this interpretation,' 'how was Infera's calibration,' 'review past signals,' 'the event resolved,' or any moment where a past interpretation and a now-knowable outcome exist together."
---

# Infera Outcome Learning

## What this skill is

This is Infera's moat. The interpretation pipeline (`infera-signal-interpretation` + domain extensions + `infera-narrative-integrity`) produces structured reads of signals. Without this skill, those reads are never tested against reality — which means Infera is a fancier news feed, not a learning system.

This skill does four things that make Infera actually learn:

1. **Registers** interpretations at the moment they're produced, capturing everything needed to score them later.
2. **Watches** for the outcomes of those interpretations to become knowable.
3. **Scores** interpretations against observed reality when outcomes resolve — not as pass/fail, but as *calibration*.
4. **Surfaces** calibration drift and novel-pattern signals so the rest of the system can be adjusted.

**What this skill does not do:**
- It does not auto-update archetype libraries, SSS weights, or any other skill. Feedback is surfaced, not applied. Adjustments require explicit human confirmation.
- It does not judge individual interpretations as "right" or "wrong." Single interpretations cannot be scored meaningfully — only calibration over samples can.
- It does not retroactively re-score past interpretations under changed definitions. Historical audit integrity matters more than consistency with current definitions.
- It does not score interpretations that declared no outcome type. You cannot score a claim that wasn't made.

---

## The learning loop

```
Interpretation produced → Registered → Outcome becomes knowable → Scored → Aggregated → Feedback surfaced
```

Each stage has a concrete trigger and a concrete output.

### Stage A: Registration

When `infera-signal-interpretation` completes and produces a structured interpretation, this skill captures a **tracking record**:

```
tracking_record: {
  tracking_id: <uuid>,
  interpretation_id: <uuid, from signal-interpretation>,
  event_id: <uuid, from Stage 2 structured event>,
  registered_at: <ISO-8601>,
  registered_by_skill_version: <version>,
  
  primary_entity: <string>,
  entity_frame: <frame_type>,
  domain: <domain>,
  
  interpretation_snapshot: {
    output_mode: "single" | "competing" | "unclassified" | "insufficient_data",
    reads: [
      {
        archetype: <name>,
        sss_normalized: <0-100>,
        confidence_state: <state>,
        prior_sss: <int or null>,
        interpretation_prose: <string>  // 1-2 sentence summary of the claim
      }
    ]
  },
  
  outcome_declarations: [
    {
      outcome_type: "binary_event" | "market_behavior" | "archetype_match" | "narrative_coherence",
      resolution_horizon: <ISO-8601 or "ongoing" or "never">,
      resolution_criterion: <string describing how the outcome will be known>,
      resolution_source: <string describing where to check>,
      claim: <string describing what this interpretation asserts about this outcome>
    }
  ],
  
  status: "open" | "resolved" | "unresolvable" | "partially_resolved"
}
```

**Every interpretation that ships gets a tracking record.** Interpretations in `unclassified` or `insufficient_data` modes are also registered — the fact that Infera declined to score something is itself trackable data that informs later archetype-library expansion.

**The `outcome_declarations` list is the core discipline.** Every interpretation must declare what kinds of outcomes it's making claims about. The four outcome types:

- **`binary_event`** — a real-world event either happens or doesn't. "A meeting occurs by April 30." Resolution is categorical.
- **`market_behavior`** — a prediction about how a market or observable signal will behave. "The SSS on this signal will strengthen over the next 48 hours." Resolution is measured against subsequent observations.
- **`archetype_match`** — a claim that the pattern matched was the right pattern. "This signal is `news_driven_diplomatic_repricing`, not `liquidity_vacuum`." Resolution is measured against which archetype retrospectively best fits the observed trajectory.
- **`narrative_coherence`** — a claim that the story Infera told held up. "The interpretation that ceasefire proximity was driving the pricing remained the best explanation for subsequent movement." Resolution is qualitative and often unresolvable — tracked for human review rather than automated scoring.

**Interpretations can declare multiple outcome types.** A US-Iran market interpretation might declare both `binary_event` (did the meeting happen) and `market_behavior` (did the signal strengthen as predicted). Each gets scored independently.

### Stage B: Outcome detection

Outcomes become knowable in three ways:

1. **Auto-detected** — the resolution horizon is a known date or a market that resolves on-chain. The skill polls for resolution. Polymarket/Kalshi markets, scheduled events (earnings releases, game completions, election dates) fall here.
2. **User-declared** — the user (or a connected data source) explicitly marks the outcome resolved. "The meeting happened April 22 in Islamabad." Needed for events without clean machine-readable resolution.
3. **Timeout-closed** — the resolution horizon passed without a clear outcome. The interpretation is closed as `unresolvable` and logged for human review.

**Polling cadence for auto-detected outcomes:**
- Horizon < 24 hours away: check every 2 hours.
- Horizon 1-7 days away: check daily.
- Horizon > 7 days away: check every 3 days, increasing as the horizon nears.
- This is a guideline; actual polling budget is constrained by the broader enrichment budget.

**Timeout rules:**
- `binary_event`: close as unresolvable 30 days after declared resolution_horizon if no outcome confirmed.
- `market_behavior`: close as unresolvable 7 days after declared measurement window.
- `archetype_match`: close as unresolvable 90 days after registration if the signal never matured.
- `narrative_coherence`: tracked indefinitely; never auto-closes.

### Stage C: Scoring

When an outcome is known, score the interpretation against observed reality. **Scoring produces a calibration delta per confidence band, not a pass/fail on the individual interpretation.**

**Scoring methodology by outcome type:**

**`binary_event` scoring:**
- Map the interpretation's confidence state to an implied probability range (see table below).
- Compare to the binary outcome (the event happened or didn't).
- Calibration delta = (observed outcome - midpoint of implied probability range).
- Accumulate deltas within each band. The band's calibration is the mean delta across samples.

**Confidence band → implied probability:**

| State | Implied probability range | Midpoint |
|---|---|---|
| `noise` | 0–10% | 5% |
| `low-weak` | 10–20% | 15% |
| `low-firm` | 20–30% | 25% |
| `rising` | 30–40% (directional) | 35% |
| `falling` | 30–40% (directional, inverse) | 35% |
| `mid-low` | 40–55% | 47.5% |
| `mid-high` | 55–70% | 62.5% |
| `climbing` | 70–80% (directional) | 75% |
| `dropping` | 70–80% (directional, inverse) | 75% |
| `high-firm` | 80–90% | 85% |
| `high-strong` | 90–100% | 95% |

**`market_behavior` scoring:**
- Compare predicted trajectory (signal will strengthen, will weaken, will hold) against observed trajectory over the declared measurement window.
- Score as hit/miss for direction plus a magnitude accuracy score.

**`archetype_match` scoring:**
- When the signal matures or resolves, retrospectively identify which archetype best fits the full observed trajectory.
- Score the original interpretation's match-strength against the retrospective best-fit.
- Novel signals that didn't match any existing archetype well and turned out meaningful get flagged for Learning Engine review — these are candidates for new archetype additions.

**`narrative_coherence` scoring:**
- Never automated. Flagged for human review at resolution time.
- Reviewer marks the narrative as `held`, `partially held`, `broke down`, or `inconclusive`.
- Tracked for qualitative pattern-spotting, not for automated calibration.

### Stage D: Aggregation

Scoring single interpretations produces noise. Calibration only becomes meaningful over samples.

**Minimum sample size for calibration conclusions: 30 resolved interpretations per confidence band.** Below this threshold, the aggregate score is treated as descriptive only — not actionable.

**Aggregation outputs:**

```
calibration_report: {
  report_id: <uuid>,
  generated_at: <ISO-8601>,
  sample_window: {start: <date>, end: <date>},
  total_interpretations_resolved: <int>,
  
  per_band_calibration: [
    {
      band: <state>,
      sample_count: <int>,
      meets_minimum_sample: <bool>,
      expected_hit_rate: <midpoint probability>,
      observed_hit_rate: <actual>,
      calibration_delta: <observed - expected>,
      classification: "well-calibrated" | "overconfident" | "underconfident" | "insufficient-samples"
    }
  ],
  
  per_archetype_performance: [
    {
      archetype: <name>,
      domain_extension: <name>,
      match_count: <int>,
      retrospective_best_fit_rate: <percentage of times this archetype was retrospectively the best fit>,
      flagged_for_review: <bool>
    }
  ],
  
  novel_patterns_detected: [
    {
      event_ids: [<uuids>],
      description: <string>,
      candidate_new_archetype: <suggested name>,
      recommended_action: <string>
    }
  ]
}
```

**Calibration classifications:**
- **well-calibrated**: observed hit rate is within ±10 percentage points of expected. Band is functioning as designed.
- **overconfident**: observed hit rate is more than 10 pts below expected. The band claims more certainty than reality supports.
- **underconfident**: observed hit rate is more than 10 pts above expected. The band is too conservative.
- **insufficient-samples**: below 30 resolved interpretations in this band. Report but do not act.

### Stage E: Feedback surfacing

Calibration drift does not automatically change anything. It surfaces recommendations.

**Recommendation types:**

1. **SSS component weight adjustment** — if a band is consistently overconfident/underconfident, the SSS formula weights or NoisePenalty values may need recalibration. The skill surfaces a specific proposed adjustment based on which component's scoring correlated most strongly with the drift. Human approves or rejects.

2. **Archetype definition refinement** — if an archetype's retrospective best-fit rate is low (the archetype gets matched but isn't actually the best explanation more than 40% of the time), the skill surfaces the archetype for definition review. Possible causes: overlapping with another archetype, defined too broadly, false-positive signals not in the disconfirming list.

3. **Archetype library expansion** — if novel patterns cluster into a recognizable theme, the skill surfaces a candidate new archetype with proposed name, pattern description, supporting/disconfirming signals, and examples.

4. **Unknown-component ceiling recalibration** — if lifted-ceiling interpretations underperform their confidence band by more than 15 pts, the skill surfaces this and recommends tightening the conditions under which the ceiling can be lifted.

**Every recommendation requires human review before application.** The skill will not silently change the system.

---

## Operating modes

This skill has three distinct operating modes.

**Passive registration mode (default):** The skill is invoked automatically when `infera-signal-interpretation` completes. It produces a tracking record but does not block the interpretation output. Tracking records accumulate in the audit log.

**Active resolution mode:** Triggered when an outcome becomes knowable — either by user declaration, scheduled polling detection, or resolution-horizon-reached event. The skill finds all open tracking records matching the resolved outcome and scores them.

**Review mode:** Triggered by an explicit request ("show me calibration for the last 30 days," "which archetypes are drifting," "what novel patterns has Infera flagged"). Produces calibration reports, archetype performance summaries, and novel-pattern surfacing.

---

## Cold-start handling

Outcome-learning suffers from a cold-start problem: until a meaningful sample has accumulated, there's nothing to calibrate against. The skill handles this honestly:

- **Below 30 interpretations per band:** report the sample count and descriptive stats but do not classify calibration. Do not surface adjustment recommendations.
- **Below 100 total resolved interpretations:** flag all calibration outputs with a "cold-start" caveat visible in reports.
- **No attempt to "bootstrap" calibration from assumed priors.** The skill starts genuinely empty.

This means Infera will honestly say "I don't yet have enough history to tell you how calibrated I am" for the first period of operation. That's the correct posture — claiming calibration data you don't have is exactly the kind of overconfidence the rest of the system is designed to prevent.

---

## Integration with other skills

**`infera-signal-interpretation`:** The core flow invokes this skill at the end of its output production. The interpretation output includes the tracking record as an audit artifact.

**`infera-narrative-integrity`:** The gate validates that every interpretation has at least one `outcome_declaration` or explicitly marks itself as `narrative_coherence`-only. Interpretations with no declarations cannot be scored, which is a failure mode to catch before shipping.

**Domain extensions:** Archetype libraries consume the `per_archetype_performance` output from calibration reports. Low-performing archetypes are candidates for definition refinement; high-performing ones earn confidence.

**Future skills:**
- `infera-source-triage` will consume per-source calibration data to refine source reliability tiers dynamically.
- `infera-personal-feed` will consume per-user outcome history to personalize confidence presentation.
- `infera-story-graph` will consume outcome data to weight the edges between related events by how often they actually correlate vs. how often they seemed like they should.

---

## Example: the US-Iran diplomatic meeting interpretation

To make this concrete, here's what outcome-learning would do with the interpretation we produced in testing.

**At registration (April 18, 2026):**

```
tracking_id: "track-20260418-poly-us-iran"
interpretation_id: "interp-20260418-us-iran-meeting"
registered_at: "2026-04-18T14:45:00-04:00"

outcome_declarations: [
  {
    outcome_type: "binary_event",
    resolution_horizon: "2026-04-30T23:59:59-04:00",
    resolution_criterion: "A diplomatic meeting between US and Iran representatives occurring by April 30 2026 as defined by Polymarket market rules",
    resolution_source: "Polymarket market resolution OR consensus of credible reporting",
    claim: "Market is pricing 77% probability of resolution-yes on the Apr 30 outcome; at mid-high implied (62.5%) for primary read, this interpretation suggests the true probability is in the 55-70 band"
  },
  {
    outcome_type: "market_behavior",
    resolution_horizon: "2026-04-25",  // measurement window 7 days out
    resolution_criterion: "SSS on this signal reaches mid-high or higher within 7 days (signal matures past the 2-day fresh-market-noise penalty)",
    resolution_source: "Re-run interpretation with fresh Stage 1.5 enrichment",
    claim: "Current SSS of 37 (rising) is depressed by fresh-market-noise penalty; at market maturity the signal should clear mid-high"
  },
  {
    outcome_type: "archetype_match",
    resolution_horizon: "2026-04-30",
    resolution_criterion: "Retrospective review of the market's full pricing trajectory identifies best-fit archetype",
    resolution_source: "Human review post-resolution",
    claim: "time_gated_cumulative_repricing + ceasefire_proximity_effect are the best-fit archetypes"
  }
]
```

**At resolution (on or around April 30):**
- The `binary_event` outcome is auto-detected when Polymarket resolves.
- The `market_behavior` outcome is scored April 25 — did the SSS actually strengthen as predicted?
- The `archetype_match` outcome is flagged for human review post-resolution.

**Calibration contribution:**
- If the meeting happened by April 30, the `mid-high` band gets a +1 hit for this interpretation (consistent with 62.5% implied probability).
- If it didn't happen, the band gets a +1 miss.
- These single-interpretation results are noise until 29 more mid-high interpretations have resolved. At sample 30, the aggregate is first meaningful.

---

## Version notes

- **v0.1** initial draft. Confidence-band-to-probability mapping is inherited from narrative-integrity. Minimum sample size of 30 is a starting heuristic — should be tuned once real data shows how quickly calibration converges.
- Expect this skill to evolve significantly once real outcome data starts accumulating. The definitions here are testable claims, not final truths.
