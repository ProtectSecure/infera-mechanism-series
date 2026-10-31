---
name: infera-signal-interpretation
description: "Infera's core interpretation flow. Use when an event, anomaly, or signal needs to be converted into a structured interpretation — a market move, news break, sports performance shift, injury report, price/volume spike, sentiment inflection, or any observable change that demands a 'what is this and why is it happening' answer. Produces structured data (primary read + competing reads when contradictions exist) with full SSS scoring. Loads alongside infera-narrative-integrity (which validates the output) and alongside infera-signal-interpretation-markets or infera-signal-interpretation-sports for domain-specific pattern libraries. Triggers: phrases like 'interpret this,' 'what's driving,' 'what does this signal mean,' 'run the interpretation,' or any raw event/anomaly presented for analysis."
---

# Infera Signal Interpretation (Core)

## What this skill is

This is Infera's central cognitive flow — the skill that takes a raw event and produces a structured interpretation. It is deliberately **domain-agnostic**: the flow works identically for a market anomaly and an NFL usage-rate shift. Domain-specific knowledge (what patterns matter, what signals to weight) lives in the companion extension skills:

- `infera-signal-interpretation-markets` — traditional markets and news domain (equities, FX, options, fixed income, crypto, commodities)
- `infera-signal-interpretation-prediction-markets` — prediction markets and event contracts (Polymarket, Kalshi, Manifold, PredictIt)
- `infera-signal-interpretation-sports` — sports and fantasy domain (NFL, NBA, MLB, NHL)

Extensions may load together when an event spans domains (e.g., a stock reacting to a Polymarket signal loads both markets extensions).

This core skill handles the **flow**; the extensions provide the **pattern libraries**. When interpreting a signal, load this skill plus whichever domain extension fits the event.

**Always load `infera-narrative-integrity` alongside this skill.** That skill validates every output before it ships; this skill produces outputs that expect to pass through that gate.

---

## The interpretation flow

```
Event → Enrich → Structure → Pattern Match → Candidate Reads → SSS Scoring → Adaptive Output
```

Each stage is a concrete operation, not an abstraction.

### Stage 1: Event intake

Accept the raw event in whatever form it arrives: a price tick, a news headline, an injury report, a social sentiment spike, a line-movement notification. The event must carry:

- A **timestamp** (when did the observable change occur)
- A **source** (where did the data come from)
- A **primary entity** (what is the event about — see Entity Frames below)
- A **raw observation** (the actual data: the price change, the headline text, the stat line)

If any of these four are missing, halt and request them. An interpretation without entity or timestamp is not auditable and cannot be outcome-tracked later.

**Entity Frames.** The primary entity must be tagged with one of four structural frames. The frame determines which archetypes are eligible for pattern-matching in Stage 3.

- **`market_instrument`** — the market itself is the observable. A Polymarket event page, a stock price move, an options-flow anomaly. The entity is the *trading instrument*, not the underlying thing being traded. Market-behavior archetypes apply.
- **`real_world_event`** — the underlying event the data refers to. A US-Iran diplomatic meeting, an NFL injury, a Fed rate decision, a regulatory filing. The entity is the *happening in the world*, even if it's observed through a market. Real-world-event archetypes apply.
- **`specific_outcome`** — a single outcome within a multi-outcome market. "The April 30 outcome at 77%" rather than "the market as a whole." Archetype scoring narrows to that outcome specifically, and cross-outcome archetypes (like `time_gated_cumulative_repricing`) are not eligible.
- **`compound_event`** — an event whose resolution depends on two or more underlying events combined. Rare but real — e.g., "will TSLA hit $500 *and* a Fed pause happen by Q3." Compound events get handled with special logic noted in the domain extensions; most events are not compound.
- **`blended`** — an explicit opt-in frame that runs the interpretation across two or three primary frames in parallel and produces a single combined output structuring archetype matches by frame. Used when the user has determined (or asked the skill to surface) that multiple frames carry independent, non-competing signal on the same event — e.g., a prediction market exhibiting `elimination_yield_harvesting` at `market_instrument` level while `vote_already_cast_resolution_lag` fires at `specific_outcome` level. See "Blended frame mode" below for details. **This is opt-in only** — the skill does NOT auto-detect blended-mode applicability. Single-frame invocations produce single-frame output with adjacent-frame suggestions (preserves user frame control).

**Frame selection guidance:**

- If the user provides a market URL or price data as the primary observation → default to `market_instrument`.
- If the user provides news content, a report, or asks about a real-world happening → default to `real_world_event`.
- If the user specifies a single outcome within a multi-outcome market explicitly → use `specific_outcome`.
- If the user explicitly requests `blended` interpretation, or asks to "interpret this across frames" / "give me the full multi-frame read" / similar → use `blended`.
- If the user explicitly requests a different frame than the default, honor the request.
- When genuinely ambiguous, ask the user which frame they want. Do not guess silently — silent frame selection is exactly the failure mode this system is designed to prevent.

**Adjacent frames.** Most events have legitimate alternative framings. A Polymarket event has both `market_instrument` (the market) and `real_world_event` (the thing the market tracks) as valid frames. The structured event carries `adjacent_frames: [...]` listing these alternatives. They are not automatically interpreted in single-frame mode, but they are surfaced in the output so downstream skills (or the user) can request a secondary interpretation through a different frame — or invoke `blended` mode to run them together.

**Blended frame mode.** When `entity_frame: "blended"` is declared:

- The skill runs pattern matching against 2–3 frames in parallel. The specific frames are declared in `blended_frames: ["market_instrument", "specific_outcome", ...]` on the structured event. If not declared, the skill uses `market_instrument` plus the highest-ranked adjacent frame.
- Each frame produces its own candidate reads under its own archetype library constraints. Frame-incompatible archetypes remain excluded per-frame.
- The output uses `output_mode: "blended"` and structures candidate reads under a `blended_frame_reads` map keyed by frame, rather than a flat list. Each frame's reads carry full SSS, confidence state, and narrative-integrity treatment individually.
- The narrative-integrity gate validates each frame's reads independently; the overall output ships only if all frames pass the gate.
- Cross-frame contradictions (where reads from different frames conflict in a way that suggests one frame is fundamentally wrong) are surfaced as a top-level `cross_frame_contradictions` list. Independent-but-complementary reads across frames (the common case — `elimination_yield_harvesting` at market_instrument + `vote_already_cast_resolution_lag` at specific_outcome both describing features of the same event) are presented as the normal state and surfaced via `cross_frame_complementarity` when the relationship between frames carries interpretive value (most often when one frame's pattern *generates* the other frame's pattern, or when the frames' evidence weights are materially asymmetric).
- Blended mode is expected to produce richer, more structurally complete interpretations than single-frame mode for markets where cross-frame signal is genuinely present. It is NOT a default — it requires more enrichment budget and more SSS computation, and on events where a single frame captures the signal, blended mode adds noise rather than clarity.
- Invocation hint: the skill's single-frame output already lists `suggested_secondary_interpretations`. When two or more of those suggestions carry archetype candidates that would match cleanly, that's the signal that `blended` mode would produce a more complete interpretation if re-invoked.


### Stage 1.5: Enrich (formerly Stage 0 in design notes — numbered 1.5 to preserve the mental model that intake and enrichment are paired)

Before structuring the event for pattern matching, actively fetch the data needed to score SSS components. **The skill does not wait for enriched events to arrive — it does the enrichment.** Unenriched events are only acceptable when the fetch budget is exhausted and the enrichment report explicitly documents what was attempted.

**Three sub-stages:**

**1.5a — Requirements derivation.** Based on the event's domain **and entity frame**, consult the loaded domain extension's *Enrichment Requirements* section to produce a prioritized list of data needed:

- High priority: data without which SSS cannot be meaningfully computed (price history for markets, rolling usage averages for sports).
- Medium priority: data that would disambiguate between archetypes (cross-asset moves, beat-reporter sentiment).
- Low priority: data that would only refine confidence within a band (social volume trends, historical archetype outcome rates).

**1.5b — Fetch with budget.** Attempt each high-priority item first, then medium, then low, subject to these limits:

- **Fetch budget:** maximum 6 external data fetches per event (web searches, API calls, document retrievals).
- **Time budget:** maximum 30 seconds of wall-clock time on enrichment.
- **Failure handling:** a failed fetch (timeout, source unavailable, returned nothing) counts against the budget. Record the attempt.
- Whichever budget is exhausted first terminates enrichment.

Override: the budget can be lifted for explicitly high-stakes events (user flags as `deep_enrich: true`), but the enrichment report notes the override.

**1.5c — Declaration of state.** Produce an enrichment report that is carried forward into every subsequent stage and recorded in the audit layer:

```
enrichment_report: {
  requirements_derived: [<list of data types needed>],
  fetches_attempted: [
    {type: <data_type>, source: <src>, result: "fetched" | "failed" | "skipped-budget", 
     latency_ms: <int>, data: <fetched data or null>}
  ],
  budget_used: {fetches: <int/6>, time_ms: <int/30000>},
  budget_exhausted_by: "fetches" | "time" | null,
  components_still_unknown: [<list of SSS components that remain unknown after enrichment>],
  override_used: true | false
}
```

**Why this matters:** after enrichment, a component marked `unknown` is categorically different from one that was never examined. `components_still_unknown` with `enrichment_attempted: true` is a **real absence** of signal — meaningful in itself. `components_still_unknown` with `enrichment_attempted: false` is just a data gap. The narrative-integrity gate will treat these differently in future versions.

**Front-loaded, not iterative.** This version of the skill does a single enrichment pass before pattern matching. A future iterative mode (enrich → initial match → enrich more based on leading archetypes → final match) is anticipated but not implemented. Front-loaded enrichment is simpler to specify, test, and debug.

### Stage 2: Structure the event

Normalize the raw event into the structured vector used across Infera:

```
{
  event_id: <uuid>,
  timestamp: <ISO-8601>,
  domain: "markets" | "prediction_markets" | "sports" | "other",
  primary_entity: <string>,
  entity_frame: "market_instrument" | "real_world_event" | "specific_outcome" | "compound_event",
  adjacent_frames: [
    {frame: <frame_type>, entity: <string>, note: <why this frame is adjacent>}
  ],
  raw: <original observation>,
  volatility: <0-100>,    // magnitude of deviation
  volume: <0-100>,        // participation / sample size
  sentiment: <-100 to 100>, // directional tilt if applicable
  macro: <string>,        // contextual regime (earnings season, playoffs, etc.)
  risk: <0-100>           // prior-known risk factors
}
```

Fields that cannot be populated from the raw event are marked `unknown` and flagged for the SSS NoisePenalty component.

**Example: Polymarket US-Iran diplomatic meeting event, structured from the `market_instrument` frame:**

```
{
  primary_entity: "Polymarket: US x Iran diplomatic meeting market",
  entity_frame: "market_instrument",
  adjacent_frames: [
    {frame: "real_world_event", entity: "US-Iran diplomatic engagement before ceasefire expiration",
     note: "The underlying geopolitical event — would invoke real-world-event archetypes (mediation dynamics, policy signals, diplomatic precedent) rather than market-behavior archetypes."},
    {frame: "specific_outcome", entity: "Apr 30 outcome at 77%",
     note: "Narrows to that outcome specifically — cross-outcome archetypes (time-gated cumulative) would not apply."}
  ],
  ...
}
```

The adjacent_frames list tells downstream skills what alternate interpretations *would* produce if invoked. This is not automatic re-interpretation — it's discoverable surface area.

### Stage 3: Pattern match

Hand the structured event to the relevant domain extension skill's pattern library. The extension returns a list of **candidate interpretation archetypes** that the signal is consistent with.

**Frame-aware archetype matching.** Each archetype in each extension declares which entity frame(s) it applies to. During pattern matching, only frame-compatible archetypes are scored. This prevents the silent mismatch where, for example, a `real_world_event`-framed signal gets scored against market-behavior archetypes that don't fit the frame.

Archetypes that declare no frame restriction are treated as frame-agnostic and scored against any frame.

Examples of archetypes (domain-specific — the extensions define them):
- Markets (`market_instrument`): `distribution_into_strength`, `capitulation_bounce`, `news_latency_arbitrage`, `liquidity_vacuum`, `sentiment_inflection`
- Prediction markets (`market_instrument`): `time_gated_cumulative_repricing`, `whale_dominated_consensus`, `ceasefire_proximity_effect`
- Real-world events (`real_world_event`): domain-extension-dependent — not all extensions currently have real-world-event archetypes, which is a known gap
- Sports (`real_world_event` by default): `usage_rate_shift`, `injury_tag_ambiguity`, `coaching_change_adjustment`, `sample_size_regression`

**Each archetype must come back with:**
- A name (matches a pattern in the extension's library)
- A historical-match confidence (how cleanly does this signal fit the archetype, 0–100)
- A list of supporting signals (which fields in the structured event point to this archetype)
- A list of disconfirming signals (which fields point away from this archetype)

If no archetype matches cleanly (all candidate scores below 30), tag the event `unclassified` and surface that — do not force-fit an archetype. Unclassified events are valuable; they feed the Learning Engine.

### Stage 4: Generate candidate reads

For each archetype returned in Stage 3, produce a **candidate read**:

```
{
  read_id: <uuid>,
  archetype: <name>,
  interpretation: <prose, 1-2 sentences>,
  supporting_signals: [<list>],
  disconfirming_signals: [<list>],
  sss_components: {
    market_movement: <0-100 or "unknown">,
    liquidity: <0-100 or "unknown">,
    source_reliability: <0-100 or "unknown">,
    diversity: <0-100>,
    temporal_consistency: <0-100 or "unknown">,
    cross_signal_confirmation: <0-100 or "unknown">,
    noise_penalty: <0-100>
  },
  sss_raw: <sum>,
  sss_normalized: <0-100 integer>,
  confidence_state: <state from narrative-integrity>,
  prior_sss: <prior reading or null>,
  unknown_count: <int>
}
```

Populate the SSS components using the domain extension's scoring rules. Do not estimate components the extension doesn't provide a rule for — mark `unknown`.

### Stage 5: Adaptive output logic

This is where the "single vs. competing" decision is made. Apply these rules in order:

**Rule A — Single read (clean signal):**
- Exactly one archetype scored above 70 in historical-match confidence, AND
- No other archetype scored above 40, AND
- No contradicting disconfirming signals in the top read
- → Output the single read as `primary_interpretation`. Other candidates go in `considered_and_rejected`.

**Rule B — Competing reads (contested signal):**
- Two or more archetypes scored above 50, OR
- The top archetype has significant disconfirming signals, OR
- `infera-narrative-integrity`'s contradiction detection fires on the candidate set
- → Output 2–3 reads as `competing_interpretations`, ranked by SSS. The highest-SSS read is marked `primary_lean`, not `primary_interpretation` — the language distinction matters. Each competing read carries its own SSS and confidence state.

**Rule C — Unclassified:**
- All candidates below 30 historical-match confidence
- → Output `{ status: "unclassified", event: <structured>, candidates_considered: [<all with scores>] }`
- This is not a failure; it's a legitimate output. The reader/downstream skill decides what to do with an unclassified signal.

**Rule D — Insufficient data:**
- Three or more SSS components are `unknown` across the top candidate AND the unknown-component ceiling is NOT being lifted
- → Output `{ status: "insufficient_data", event: <structured>, missing: [<list of what's needed>] }`
- If the ceiling IS being lifted (per `infera-narrative-integrity`'s opt-out rule), proceed with Rule A or B but tag the output `VERIFIABILITY: reduced`.

**Rule E — Library gap:**
- Event is classifiable: sufficient data has been enriched, a clear frame is declared, the relevant domain extension is loaded, and prior-reading continuity has been checked.
- AND no eligible archetype in any loaded extension scores above 40 historical-match confidence.
- AND the event does NOT belong under Rule C (unclassified) because a named archetype obviously *would* fit if the library contained it — the gap is in the library, not in the signal. Examples: a well-shaped market signal on a novel instrument type the extension hasn't yet modeled; a policy event that clearly belongs in a news/geopolitics extension that doesn't yet exist; a team-season sports question whose structure is recognizable but whose archetypes haven't been added.
- → Output `output_mode: "library_gap_reasoning"`. The skill proceeds to produce first-principles reasoning in place of archetype matching, tagged `verifiability: reduced` because no validated pattern library backed the interpretation. The output must explicitly log `missing_archetype_candidates: [<list of names and pattern descriptions>]` so the gap becomes actionable feedback for library development — this is the structural bridge between the interpretation pipeline and the Learning Engine's archetype-expansion recommendations (see `infera-outcome-learning`).

**The distinction between Rules C, D, and E is load-bearing:**
- Rule C (`unclassified`) = "this signal may be genuinely novel — the library isn't necessarily broken, this may just be something we haven't seen before."
- Rule D (`insufficient_data`) = "we don't have enough observable components to score SSS at all."
- Rule E (`library_gap_reasoning`) = "we have enough data and we recognize a pattern that should be here, but it isn't yet."

Rule E preserves the epistemic honesty of the system — rather than force-fit a poor match or silently improvise, the skill names what's missing and produces reasoning flagged as unvalidated.

---

## Output contract

The skill produces **structured data** as the source of truth. Prose output is generated by downstream skills (`infera-investigative-narrative`, `infera-distribution`) from this structure. This separation is deliberate — it keeps the interpretation logic pure and lets different surfaces format the same underlying read differently.

**Full output schema:**

```
{
  interpretation_id: <uuid>,
  event: <structured event from Stage 2>,
  output_mode: "single" | "competing" | "unclassified" | "insufficient_data" | "library_gap_reasoning" | "blended",
  primary_interpretation: <read object>       // if single
  primary_lean: <read object>,                // if competing
  competing_interpretations: [<read objects>], // if competing (includes primary_lean)
  considered_and_rejected: [<read objects>],
  first_principles_reasoning: <string>,       // if library_gap_reasoning
  missing_archetype_candidates: [             // if library_gap_reasoning
    {
      proposed_name: <string>,
      pattern_description: <string>,
      frame_applicability: <frame_type>,
      domain_extension_target: <extension_name_or_new>
    }
  ],
  blended_frame_reads: {                      // if blended
    // Keyed by frame name. Each frame's reads run under its own archetype library
    // constraints. Frame-incompatible archetypes are excluded per-frame.
    "<frame_name>": {
      frame: <frame_type>,
      entity: <string>,
      output_mode: "single" | "competing",    // each frame resolves to single or competing internally
      reads: [<read objects with SSS and confidence_state>],
      frame_specific_audit: {
        eligible_archetypes: [<names>],
        excluded_archetypes: [<names>]
      }
    }
  },
  cross_frame_contradictions: [               // if blended — only when frames conflict fundamentally
    {
      frames_involved: [<frame_names>],
      description: <string>,
      recommendation: <string>
    }
  ],
  cross_frame_complementarity: [              // if blended — when frames reinforce rather than conflict
    {
      frames_involved: [<frame_names>],
      relationship: "complementary" | "generative" | "asymmetric",
      // complementary: frames describe different facets of same situation
      // generative: one frame's pattern produces the other frame's pattern
      //   (e.g. chronic non-resolution GENERATES cumulative-time-gated market structure)
      // asymmetric: one frame carries materially stronger evidence than the other;
      //   the weaker frame's archetype may structurally match but ship at low SSS
      description: <string>,
      asymmetry_note: <string or null>        // present when relationship is asymmetric
                                              // or when one frame's SSS is materially
                                              // higher/lower than another's
    }
  ],
  contradictions_surfaced: [<list>],          // from narrative-integrity check
  verifiability: "standard" | "reduced",
  suggested_secondary_interpretations: [
    {
      frame: <frame_type>,
      entity: <string>,
      reason: <why this frame would produce a different interpretation>,
      invocation_hint: <how to request it — "re-run with entity_frame: real_world_event">
    }
  ],
  outcome_declarations: [
    // Each interpretation must declare at least one outcome it makes claims about,
    // so infera-outcome-learning can register and score it later.
    // See infera-outcome-learning skill for the full schema.
    {
      outcome_type: "binary_event" | "market_behavior" | "archetype_match" | "narrative_coherence",
      resolution_horizon: <ISO-8601 or "ongoing" or "never">,
      resolution_criterion: <string>,
      resolution_source: <string>,
      claim: <string>
    }
  ],
  audit: {
    domain_extension_used: <skill_name>,
    archetype_library_version: <version>,
    entity_frame_used: <frame_type>,
    frame_eligible_archetypes: [<names of archetypes eligible under this frame>],
    frame_excluded_archetypes: [<names excluded because frame didn't match>],
    pattern_matches_all: [<every candidate considered>],
    prior_interpretations_for_entity: [<event_ids>],
    timestamp_produced: <ISO-8601>
  }
}
```

This object is what downstream skills consume. The prose a reader sees — the newsletter paragraph, the briefing line, the alert body — is derived from this structure, not the other way around.

---

## The "adaptive" logic in practice

The adaptive mode is what makes Infera feel like a real analyst rather than a scoring engine. Concrete behavior:

**When a clean signal arrives** (Rule A), the output reads like confident interpretation: one archetype, one narrative, one SSS score. The reader gets a direct interpretation without noise.

**When a contested signal arrives** (Rule B), the output acknowledges that multiple readings are live. Instead of picking one and hiding the rest, the skill surfaces the competing interpretations with their relative strengths. This is the anti-prediction posture in action — Infera refuses to manufacture certainty that isn't in the data.

**When a signal is unclassified** (Rule C), the skill says so rather than inventing an archetype. Unclassified signals are explicitly valuable: they're either novel patterns (which the Learning Engine should study) or genuinely ambiguous situations (which the reader deserves to know are ambiguous).

**When data is insufficient** (Rule D), the skill refuses to score. "I can't tell you yet" is a legitimate output. This is where Infera earns trust — by being willing to say nothing when it has nothing to say.

**When the library is the problem** (Rule E), the skill names that explicitly. Rather than force-fitting a bad archetype match to appear scored, the skill produces first-principles reasoning with a reduced-verifiability tag AND proposes the missing archetype(s) by name and pattern. This turns a library gap from a silent failure into actionable product feedback. Every Rule E output is simultaneously an interpretation for the user and a Learning Engine input that expands the library over time.

**When blended mode is invoked** (user declares `entity_frame: "blended"`), the skill runs pattern matching across 2–3 frames in parallel and produces structured per-frame reads rather than a single flat interpretation. This is not auto-firing behavior — it requires explicit opt-in. The blended output is useful when an event legitimately exhibits independent signals at different frames (e.g., a prediction market where venue-structural dynamics fire at `market_instrument` level while content-specific dynamics fire at `specific_outcome` level). When the signal is concentrated at a single frame, blended mode adds noise rather than clarity, which is why opt-in is the right default posture.

---

## Prior-reading continuity

Every interpretation must check whether the entity has prior interpretations in the audit log. If it does:

- Pull the prior SSS for any signal in a transition zone (needed for direction tagging per narrative-integrity).
- Check whether the new interpretation's archetype matches or contradicts the prior one. If it contradicts, flag `archetype_shift_detected` in the audit layer — this is a meaningful narrative event in itself.
- Carry forward any `unclassified` prior readings so they can be revisited when new data arrives.

Prior-reading continuity is how Infera builds narrative over time rather than treating each signal as isolated.

**First-reading handling (no prior reading exists).** When an entity has no prior interpretation in the audit log (`prior_interpretations_for_entity: []`), direction tagging for transition-zone confidence states cannot be computed from historical SSS delta. The correct handling:

- Tag the confidence state with `indeterminate-direction` when SSS lands in a transition zone (`rising`/`falling` at 31-39 or `climbing`/`dropping` at 71-79). Example: `"rising (indeterminate-direction — no prior reading on this entity)"`.
- Do NOT invent a prior SSS to enable direction tagging. A first reading is a first reading; the transition-zone direction ambiguity is a real property of the data, not a gap to paper over.
- If the interpretation's content describes a stable situation that happens to land in a transition band (a chronic pattern scoring in the 31-39 range, for example), use the `stable` direction (see narrative-integrity's direction vocabulary) rather than `indeterminate`. The `stable` direction is appropriate when the interpretation content itself supports a stable-state reading regardless of historical SSS delta availability.
- The first-reading case is not a defect — it's the normal state at Infera's current maturity. As `infera-outcome-learning` accumulates tracking data, first-reading situations become rarer for frequently-interpreted entities.

---

## What this skill does NOT do

- It does not validate outputs — that's `infera-narrative-integrity`.
- It does not contain the domain pattern libraries — those are `infera-signal-interpretation-markets`, `infera-signal-interpretation-prediction-markets`, and `infera-signal-interpretation-sports`.
- It does not score source credibility — that's `infera-source-triage`.
- It does not decide what to publish or push — that's `infera-distribution`.
- It does not format prose for readers — that's `infera-investigative-narrative`.
- It does not track outcomes or update weights — that's `infera-outcome-learning`.

This skill is the **interpretation engine**. It takes events in and puts structured interpretations out. Everything else is handled elsewhere.

---

## Invocation checklist

Before producing any interpretation, confirm:

- [ ] Event has timestamp, source, primary_entity, entity_frame, and raw observation.
- [ ] Domain has been identified (markets / prediction_markets / sports / other).
- [ ] Entity frame has been assigned (market_instrument / real_world_event / specific_outcome / compound_event / blended — the last is opt-in only).
- [ ] If `blended` frame was declared, `blended_frames: [...]` lists the 2–3 frames to run in parallel; per-frame output is structured under `blended_frame_reads`.
- [ ] Adjacent frames have been enumerated in the structured event.
- [ ] The appropriate domain extension skill is loaded.
- [ ] `infera-narrative-integrity` is loaded (so output will be validated).
- [ ] Stage 1.5 enrichment has been attempted; enrichment_report is populated.
- [ ] Prior interpretations for this entity have been checked.
- [ ] Pattern matching was constrained to frame-compatible archetypes; frame-excluded archetypes are logged in the audit layer.
- [ ] SSS components are scored using the extension's rules, not estimated.
- [ ] Unknown components are distinguished into `enrichment_attempted` vs. `never_attempted`.
- [ ] Adaptive rule (A/B/C/D/E) has been correctly applied based on candidate scores.
- [ ] If Rule E fired (library_gap_reasoning), `missing_archetype_candidates` is populated with proposed names and pattern descriptions so the gap is actionable.
- [ ] Output includes `suggested_secondary_interpretations` for non-primary frames when applicable.
- [ ] At least one `outcome_declaration` is attached, or the interpretation is explicitly marked `narrative_coherence`-only. Interpretations that make no trackable claim cannot close the learning loop.
- [ ] Output follows the structured schema above, not free prose.

If prose is needed for a reader, let a downstream skill derive it from the structured output. Do not produce prose and structured data in parallel — one is the source, one is the derivation.
