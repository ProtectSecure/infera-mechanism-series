---
name: infera-investigative-narrative
description: "Converts Infera's structured interpretations into reader-facing prose. Use when a structured interpretation output from infera-signal-interpretation needs to be rendered as a briefing, alert, or deep dive for human consumption. Produces prose that faithfully preserves the interpretation's epistemic content — confidence states, verifiability flags, source diversity notes — without paraphrasing the load-bearing vocabulary or introducing claims absent from the structure. Triggers: 'draft a briefing,' 'write this up,' 'turn this into a newsletter item,' 'alert text,' or any moment where a structured interpretation needs to become readable prose."
---

# Infera Investigative Narrative

## What this skill is

Everything else in Infera produces structured data — tagged claims, SSS scores, confidence states, source credibility matrices, outcome declarations. Readers want prose. This skill is the bridge.

It does one job: convert a structured interpretation into reader-facing narrative at one of three lengths, preserving epistemic content exactly while writing for human readability.

**What this skill does not do:**
- It does not produce interpretations. That's `infera-signal-interpretation`. This skill only renders.
- It does not validate outputs. That's `infera-narrative-integrity`. This skill's output still has to pass through that gate.
- It does not decide which surface to use. That's `infera-distribution`. This skill produces prose at requested lengths; distribution decides which length goes where.
- It does not write when the structured interpretation is `unclassified` or `insufficient_data` — those modes ship with their own minimal output that doesn't need narrative treatment.

---

## The three narrative surfaces

Same structured interpretation, three different prose outputs. Each has a purpose and a length envelope.

### Briefing (200–400 words)

The standard deliverable. A reader who opens a briefing expects the full interpretation — primary read, competing reads if present, confidence state, source and diversity notes, outcome-tracking pointer if relevant.

Structure:
1. **Lead fact paragraph** — the FACT-tagged observations in prose form, sourced.
2. **Interpretation paragraph(s)** — primary read with SSS and confidence; competing reads with their scores if output_mode is `competing`.
3. **Epistemic qualifiers** — verifiability, ideological diversity, transition direction indeterminacy.
4. **Pointer** — outcome-learning registration ID and resolution horizon; adjacent frames available.

### Alert (50–100 words)

Push notification or email subject-line-adjacent. Must carry the confidence state and the single most important signal. Alerts that drop confidence information are failures.

Structure:
1. **One sentence of fact** — the observable.
2. **One sentence of interpretation** — with explicit confidence state tag.
3. **Optional one sentence of qualifier** — if verifiability is reduced or diversity is flagged.

### Deep dive (800–1500 words)

Newsletter-article length. Same structural backbone as a briefing, expanded with:
- Historical context on similar signals (from prior interpretations of the same entity or archetype)
- Explanation of the archetypes involved — what the pattern means, how it's typically read, what its common false positives are
- Full source-triage breakdown with bias coordinates
- Full adjacent-frame analysis
- Outcome-tracking rationale — what would make the interpretation hold vs. fail

---

## The preserve-don't-paraphrase principle

This is the core discipline of the skill and the most common failure mode in AI-generated news summaries.

**Vocabulary that must appear verbatim in the prose:**

- Confidence state labels: `noise`, `low-weak`, `low-firm`, `rising`, `falling`, `mid-low`, `mid-high`, `climbing`, `dropping`, `high-firm`, `high-strong`, `indeterminate`.
- Verifiability tags: `standard`, `reduced`.
- Mode labels: `competing reads`, `unclassified`, `insufficient data`.
- Archetype names: use the exact archetype name from the structured interpretation at least once per mention.
- Status flags: `IDEOLOGICAL_DIVERSITY: low`, `CONTRADICTIONS PRESENT`, etc. — these can be rephrased into prose but the concept must remain explicit.

**Paraphrase is allowed for flow**, but load-bearing epistemic terms anchor the prose. A reader should be able to extract the structured interpretation from the prose without ambiguity.

**Concrete example of correct preservation:**

*Structured:* `{archetype: "news_driven_diplomatic_repricing", sss: 35, confidence_state: "rising (indeterminate)"}`

*Correct prose:* "The primary lean reads this as news-driven diplomatic repricing, at SSS 35 in the rising band with indeterminate direction (no prior reading for this market)."

*Incorrect prose (softens):* "The signal suggests diplomatic news is driving the market's recent moves."
- Lost: the archetype name, the SSS, the confidence band, the indeterminacy.

*Incorrect prose (over-states):* "News-driven diplomatic repricing is the driver; the signal is strengthening."
- "Strengthening" is a different confidence-band concept (`climbing`) than `rising`.
- "Is the driver" is more confident than the structure supports.

---

## Forbidden transformations

These patterns are common in AI-generated news prose and are forbidden here.

**1. Collapsing confidence states to binary certainty.**
- Forbidden: turning `rising (indeterminate)` into "likely" or "probably."
- Required: the band name appears in prose.

**2. Dropping verifiability flags.**
- Forbidden: shipping prose from a `VERIFIABILITY: reduced` interpretation without mentioning the reduction.
- Required: a sentence or clause noting the reduced verifiability and its cause.

**3. Dropping ideological-diversity flags.**
- Forbidden: shipping prose from a `IDEOLOGICAL_DIVERSITY: low` interpretation without noting source concentration.
- Required: a source-diversity note in briefings and deep dives (alerts may compress, but only if the signal SSS is already below mid-low).

**4. Converting interpretations to predictions.**
- Forbidden: "The signal indicates the meeting will happen." 
- Required: "The signal reads as..." or "The interpretation is consistent with..."
- Predictive verbs are already forbidden at the narrative-integrity layer; this skill must not reintroduce them via paraphrase.

**5. Inventing context not in the structure.**
- Forbidden: adding historical parallels, quotes, or analysis that isn't present in the structured interpretation's enrichment or prior-reading data.
- Required: prose is derived from structure; new claims require new interpretation.

**6. Using "analysis" or "experts" as hidden authority.**
- Forbidden: "Analysis suggests..." when the analysis is Infera's own interpretation.
- Forbidden: "Experts say..." when no experts were cited.
- Required: explicit source attribution. "Infera's interpretation reads..." is fine. "Analysis suggests" is authority laundering.

---

## Prose templates by surface

These are patterns, not fill-in-the-blank forms. The skill selects from them based on the interpretation's output mode and length target.

### Briefing template (competing reads mode)

```
[Lead fact paragraph — 2-3 sentences of sourced FACT claims]

[Connective sentence introducing the interpretation — e.g., "Infera's pipeline
produces three competing reads on this signal."]

Primary lean: [archetype name] at SSS [n] in the [confidence state] band.
[1-2 sentences explaining the reading in prose, anchored to the archetype's
supporting signals.] [If direction is indeterminate, state so with the reason.]

Secondary read: [archetype name] at SSS [n]. [1-2 sentences.]

Tertiary read (if present): [archetype name] at SSS [n]. [1 sentence.]

[Epistemic qualifiers paragraph — verifiability, diversity, adjacent frames.]

[Pointer paragraph — outcome tracking, next resolution horizon, suggested
secondary interpretations.]
```

### Briefing template (single read mode)

```
[Lead fact paragraph]

Infera's interpretation: [archetype name] at SSS [n] in the [confidence state]
band. [2-4 sentences of interpretation anchored to archetype's supporting signals.]

[Epistemic qualifiers paragraph.]

[Pointer paragraph.]
```

### Alert template

```
[One-sentence fact with entity and source.]

[Interpretation: reads at CONFIDENCE_STATE. Brief explanation.]

[Optional qualifier sentence if VERIFIABILITY: reduced or IDEOLOGICAL_DIVERSITY: low.]
```

### Deep dive template

Briefing structure, expanded with:
- **"Pattern in context" section** (200-300 words): explain the primary archetype — what it is, when it fires, what its common false positives are. Reference the archetype library's documentation verbatim where helpful.
- **"Source profile" section** (150-250 words): full breakdown of the sources used, their tier scores, their domain modifiers, their bias coordinates.
- **"Alternative frames" section** (100-200 words): detailed treatment of adjacent_frames — what a real-world-event interpretation would look at, what a specific_outcome frame would narrow to.
- **"What would change this read" section** (100-200 words): specific observations or data that would strengthen or weaken the interpretation. Derived from the outcome_declarations.

---

## Handling edge cases

**Unclassified interpretations.** Do not produce narrative prose. Instead, produce a brief status note:

```
Infera considered this signal against available archetypes in [domain] and did
not find a clean match. This is not a failure — unclassified signals are logged
for Learning Engine review and may indicate a novel pattern. [If closest
archetypes are noted in the structure, list them with their below-threshold scores.]
```

**Insufficient data interpretations.** Similar — a status note rather than narrative:

```
Infera lacks sufficient data to score this signal. Specifically: [list from
structured output's missing array]. The signal is observable but interpretation
exceeds what available data supports.
```

**Reduced verifiability.** Every reference to the primary lean must carry the reduced-verifiability qualification nearby. Do not mention it only once at the end of a long briefing — the reader shouldn't form an impression of confidence before the caveat lands.

**Novel archetypes (where match score is high but the archetype is newly added).** Note this in prose: "This archetype is newly added to the library and has fewer resolved prior interpretations to draw on."

**Transition zone directionality.**
- `rising`/`falling` (low→mid): in prose, use "moving toward mid-band" or the original verb itself.
- `climbing`/`dropping` (mid→high): use "strengthening toward high" or the original verb.
- `indeterminate`: this MUST appear in prose. "Direction is indeterminate because no prior reading exists for this entity." Do not drop this.

---

## Integration with other skills

**`infera-signal-interpretation`:** the structured interpretation is the input to this skill. The skill does not re-derive any interpretation content; it only translates.

**`infera-narrative-integrity`:** this skill's output passes through the gate. Any prose that violates the checklist gets rejected before shipping. In practice this means the gate and this skill converge on the same rules — this skill's "forbidden transformations" are the gate's requirements from a different angle.

**`infera-source-triage`:** source tier scores and bias coordinates from triage feed into the source-profile sections of briefings and deep dives. This skill does not re-score; it reads the triage output.

**`infera-distribution`:** downstream. Distribution consumes this skill's output and routes briefings to newsletters, alerts to push channels, deep dives to long-form publication.

**`infera-outcome-learning`:** this skill notes the tracking_id and resolution horizon in briefings and deep dives so readers know the interpretation is registered for future calibration.

---

## Example: rendering the US-Iran test interpretation

**Input:** the structured interpretation from the end-to-end test (competing reads mode, three archetypes, SSS 35/32/30, ideological diversity flag, outcome tracking registered).

**Output as briefing (~350 words):**

```
Polymarket's "US x Iran diplomatic meeting by...?" market shows April 30 at
77% with the outcome trading in the 77-83% range intraday, across $2.78 million
in total volume over nine time-gated outcomes. The market opened April 16 2026.
Concurrent reporting (AP, CNN, Time, Al Jazeera, Wikipedia, Bloomberg, Euronews,
April 14-18) confirms Round 1 talks concluded April 12 in Islamabad without
agreement; the US-Iran ceasefire expires April 21-22; Iran's deputy foreign
minister stated on April 18 that no date is set for Round 2 pending a basic
framework; Pakistani mediation is active.

Infera's pipeline produces three competing reads on this signal, all in the
rising band with indeterminate direction (no prior Infera reading exists for
this market).

Primary lean: news_driven_diplomatic_repricing at SSS 35. The intraday
movement on the April 30 outcome corresponds to a period of active diplomatic
signaling — Pakistani military chief's Tehran mission carrying a US message,
Trump's public hints at an imminent follow-up, multi-party mediation including
Oman and Turkey. The market is incorporating policy signals faster than they
resolve into confirmed meetings.

Secondary read: ceasefire_proximity_effect at SSS 32. The steepest segment
of the probability curve (16% → 38% → 61% across April 20-22) coincides with
the ceasefire expiration window. The real-world deadline is shaping the
pricing distribution independent of event-probability updates.

Tertiary read: time_gated_cumulative_repricing at SSS 30. The monotonic
probability ramp indicates the market is pricing a timing distribution rather
than a binary event. The question the market is answering is "when," not "if."

Source diversity note: the corroborating sources cluster moderate-left-of-center
ideologically. The factual claims are well-corroborated, but contrarian
perspectives were not captured in enrichment.

Confidence is capped by the fresh-market-noise penalty — the market is two
days old. If these reads are correct, SSS should strengthen past the current
rising band as the market matures past the 48-hour window. The interpretation
is registered (track-e2e-20260418-poly-us-iran) with scoring windows at
April 25 (market behavior) and April 30 (binary event and archetype match).
```

Word count: 330. Preserves every load-bearing term from the structure: all three archetype names, all three SSS scores, the rising band, indeterminate direction, the diversity flag, the verifiability posture (standard, not reduced), the tracking ID, the resolution horizons. A reader could reconstruct the structured interpretation from this prose.

---

## Version notes

- **v0.1** initial draft. Three narrative surfaces (briefing, alert, deep dive) specified. Templates are starting patterns — will need refinement based on real reader feedback.
- The "preserve don't paraphrase" principle should be measurable: given prose output and structured input, a validator could check that all load-bearing vocabulary is present. A future enhancement could implement this as a pre-ship check inside the skill itself.
- Expect this skill to need the most tuning of any drafted so far. Prose quality is inherently subjective and the preserve-fidelity constraint is in tension with natural readability. Getting the balance right will take iteration with real outputs.
