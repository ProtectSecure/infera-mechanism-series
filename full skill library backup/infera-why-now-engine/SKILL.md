---
name: infera-why-now-engine
description: Historical analog matching + structured anticipation engine. For any planned upcoming event OR newly fired signal, extract entities, search Infera's archive for prior similar events, compare outcomes, assign event-family classification, and produce probability bands for likely follow-ups (hearings, lawsuits, rules, resignations, news clips, market reaction). Answers the core Infera question — "Why is this happening now, and what does it resemble?" — rather than pretending to predict the future. Use after the Tomorrow Board is built, after every Document Exposure Radar event, before publishing any non-trivial Mechanism Series piece, and whenever a finding feels too clean (cross-checks against the analog history).
---

# Infera Why-Now Engine

Infera's interpretive edge is not "we know what will happen." It is
"we know what this resembles, what usually happens next, and what
historical record sits underneath today's event."

Structured anticipation > prediction.

This skill produces probability bands grounded in matched historical
analogs — not guesses, and not retrofits.

## When to use

- After the Tomorrow Board is built, run on every event scoring above
  60 coverage gravity.
- After every `infera-document-exposure-radar` event — the "why now?"
  question is the whole point of exposure.
- Before publishing any Mechanism Series piece that asserts causation
  or pattern.
- When a finding feels too clean — analog matching will surface the
  counter-pattern.
- When the producer asks "should we cover this?" — analog outcomes
  inform the answer.
- When building a Story Pack — the analog history IS the depth.

## When NOT to use

- For pure same-day commentary (use `infera-signal-interpretation`).
- For real-time anomaly narration (use `infera-convergence-narrator`).
- For source verification (use `infera-source-triage`).
- To generate predictions presented as certainties — refuse, and emit
  probability bands instead.

## The workflow

**Step 1: Capture the event.** Extract entities, institutions,
committees, witnesses, agencies, statutes, topics, related bills,
related rules, related reports, expected livestream availability, public
document sources.

**Step 2: Search historical analogs.** Query Infera's archive for:

- prior events by the same committee
- prior appearances by the same witness or office
- prior actions by the same agency
- prior invocations of the same statutory authority
- prior events on the same topic
- prior GAO / OIG findings
- prior Federal Register rules / proposed rules
- prior litigation
- prior FOIA releases
- prior declassified records
- prior news / social attention spikes
- prior market / sector reactions
- prior policy outcomes

**Step 3: Classify into event families.** Every event is tagged with
one or more:

- oversight hearing
- budget testimony
- nomination hearing
- crisis response
- post-scandal legitimacy repair
- rulemaking defense
- foreign-policy posture
- enforcement announcement
- court challenge
- public-comment deadline
- grant / funding rollout
- classified / declassified disclosure
- technology adoption risk
- civil-liberties conflict
- procurement consolidation
- agency reorganization
- whistleblower disclosure
- inspector general escalation

**Step 4: Compare prior outcomes.** For each matched event family, ask:

- Did prior events lead to legislation?
- Did they produce subpoenas?
- Did they trigger resignations?
- Did they create new rules?
- Did they fade with no follow-up?
- Did they cause market movement?
- Did they become culture-war clips?
- Did they generate FOIA litigation?
- Did they reveal new documents within 30–90 days?
- Did oversight recommendations remain open afterward?

**Step 5: Emit probability bands.** Never single-point predictions.
Always bands. Example output format:

> Upcoming: House Oversight hearing on AI procurement (June 12).
> Why now: OMB guidance updated, agency IG report issued, Federal
> Register notice opened comment period, GAO recommendation remains
> open, and a major contract award posted last week.
> Historical analog: Similar procurement oversight cycles in 2013
> (cloud modernization) and 2020 (pandemic IT spending).
> Probability bands:
>   • follow-up oversight letters within 30 days — HIGH
>   • OIG investigation opened within 60 days — MEDIUM
>   • immediate legislation — LOW
>   • media clip potential if witness contradicts agency — HIGH
>   • document release within 7–30 days — MEDIUM-HIGH
> Mechanism: automation acceleration without accountability
> infrastructure.

## Probability scoring rubric

| Factor | Signal pattern |
|---|---|
| Prior recurrence | Similar event happened N times in past 24 months |
| Outcome strength | Prior events led to rule changes / hearings / resignations |
| Document density | Many related reports/filings exist |
| Institution weight | White House / DOJ / SCOTUS / Fed / major committee |
| Timing pressure | Statutory deadline / fiscal year / election cycle |
| Secrecy/exposure | Sealed→unsealed transition / declassification / FOIA litigation |
| Narrative conflict | Competing frames already forming |
| Visibility | Livestream / press availability / court docket / C-SPAN |
| Social/market sensitivity | Prior reactions were measurable |
| Mechanism match | Same hidden mechanism appeared in priors |

Weight institution and outcome strength most heavily. Discount narrative
conflict on its own — it's often noise.

## Event-family stable mechanisms

Each event family has a stable underlying mechanism Infera tags from
the canonical taxonomy:

- **Incentive Drift** — incentives no longer match public purpose
- **Regulatory Lag** — technology or behavior outruns rulemaking
- **Accountability Delay** — reports/audits exist but action lags
- **Burden Shift** — government complexity offloads work to citizens
- **Legitimacy Repair** — institutions stage visible action to restore trust
- **Attention Capture** — spectacle buries lower-visibility consequences
- **Scarcity Loop** — resource limits create recurring crisis
- **Oversight Theater** — hearings perform without correction
- **Automation Without Accountability** — tech increases speed without
  transparent governance
- **Public-Private Blur** — contractors/vendors become hidden policy
  actors
- **Document Exposure** — sealed/redacted/withheld records become
  newly visible

## Counter-pattern check

Before emitting an analog match, run the inverse:

- What would the strongest disconfirming analog look like?
- Have similar events fizzled? How often?
- Is the matched pattern survivor-biased (only the loud cases
  remembered)?
- Is the prior outcome attributable to other factors?

If the disconfirming analog is stronger than 1/3 of the supporting
analogs, downgrade the probability band by one tier and note the
counter-pattern explicitly.

## Outputs

- `why-now-{event-id}.md` — per-event analog report with bands
- `analog-archive.csv` — appended row per matched analog (for compounding
  memory)
- `probability-ledger.csv` — bands emitted + actuals (back-filled by
  `infera-outcome-learning`)

## Failure modes

- **Forcing analogs where none exist.** If <2 strong matches, say so:
  "no reliable analog — first-of-kind event."
- **Recency bias.** Don't only match the last 6 months. Reach 2–10
  years back for institutional analogs.
- **Mistaking salience for relevance.** A loud prior event is not
  automatically the best analog. Use entity / statute / committee
  match before topical match.
- **Hindsight smoothing.** Outcomes that look inevitable now were not
  inevitable then. Tag every prior with the probability band it would
  have received at the time, not the band it deserves in retrospect.

## The Infera principle this skill encodes

Major decisions rarely appear out of nowhere. They are scheduled,
filed, noticed, funded, discussed, buried, delayed, reframed,
escalated. The Why-Now Engine is the system that turns that scattered
machinery into structured anticipation — so Infera can say, before
the headline hardens: "this is forming, here is why, here is what it
resembles, here is what to watch."
