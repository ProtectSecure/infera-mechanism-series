---
name: infera-civic-pulse
description: Composite civic-engagement score (0-100) per Georgia county, triangulated across 8 leading-indicator channels — meeting attendance, public comment volume, FOIA filings, local news article count, candidate event RSVPs, voter registration delta, canvass volunteer signups, social organizing signals. Designed to catch civic-engagement spikes BEFORE they show up in polling or vote totals. Use when assessing where civic activity is rising, building an early-warning list for the producer, validating a "grassroots momentum" claim, or distinguishing real organizing from echo-chamber loudness.
---

# Infera Civic Pulse

The variable Infera does NOT have is "what voters are about to do." The
proxy this skill builds is "how civically active is this county right
now, compared to its own baseline and its peers, across multiple
independent channels." Spikes in this composite often precede vote-share
shifts by weeks or months. The score is not a prediction — it's an early
signal.

## What it measures

A composite engagement score 0–100 per county per week, built from 8
independent channels (full registry in
`data/civic-pulse-indicators.json`). Each channel is normalized against
the county's own 3-year rolling baseline AND against the statewide
distribution for the same week. The score is the weighted geometric mean
of the channel z-scores, mapped to 0–100.

Critical: the score's confidence is a function of how many channels
reported. A 75 backed by 7 of 8 channels is high-confidence; a 75 backed
by 2 of 8 is "look closer." Missing channels reduce confidence, never
the score itself.

## The channels

Loaded from `data/civic-pulse-indicators.json`. Summary:

| Channel | Source | Why it matters | Lead time |
|---|---|---|---|
| Meeting attendance proxy | `civic-meetings-ga` (agenda + minutes count, item-count growth) | More items, more attendees ≈ more civic press | 2–6 weeks |
| Public comment volume | meeting minutes parsed for "public comment" section | Direct measure of citizens showing up | 0–4 weeks |
| FOIA / open records filings | Georgia Sunshine Act logs (when published) | Citizens or watchdogs digging | 4–12 weeks |
| Local news article count | per-county news monitor; article count + byline diversity | Coverage volume tracks issue salience | 0–2 weeks |
| Candidate event RSVPs | Eventbrite / Mobilize / candidate sites (when scrapeable) | Direct engagement with the race | 1–8 weeks |
| Voter registration delta | GA SoS voter registration counts | New registrants register before they vote | 2–6 months |
| Canvass / volunteer signups | candidate / party site signups when public | Field organizing strength | 1–6 months |
| Social organizing signals | meetup.com, public Facebook events, public Discord servers | Issue-specific coalition formation | 2–8 weeks |

Each channel has its own collection adapter (most exist; some need
building per the strategic roadmap). This skill is the synthesis layer
ON TOP of those adapters — it doesn't fetch data itself.

## Hard rules

1. **Decomposition is mandatory.** Never publish the composite score
   without the per-channel breakdown. A 75 driven by news article count
   alone is editorial activity, not civic activity, and the reader needs
   to see that.
2. **Baseline-relative, not absolute.** Atlanta's "average" civic
   activity dwarfs Webster County's. The score is the county's
   deviation from its own baseline, not a national comparison.
3. **Engagement ≠ direction.** A rising civic-pulse in a county tells
   you something is happening. It does NOT tell you who benefits. Do not
   conflate "more civic activity" with "rising support for any
   candidate." The skill must flag this in every output.
4. **Missing channels reduce confidence, not score.** Don't impute zero
   for a channel that isn't reporting — that biases the score downward
   for under-instrumented counties. Mark confidence: high (6+ channels),
   medium (4–5), low (≤3).
5. **Spike vs trend.** Distinguish single-week spikes (event-driven, e.g.,
   a controversial meeting) from multi-week trends (sustained
   organizing). The narration must use different verbs for each.
6. **Echo chamber detection.** If the spike is driven by one channel
   (typically news article count or social organizing signals) and other
   channels show no movement, flag as "single-channel signal — possible
   echo." Do not treat as a civic-engagement spike until corroborated.

## Output

```markdown
## Civic Pulse: {county} — week of {date}

### Composite score: {0-100} | confidence: {high|medium|low}
### Baseline: {county 3-year rolling avg score for this week} | Statewide percentile: {N}

### Per-channel breakdown
| Channel | z-score vs baseline | Direction | Weight in composite |
|---|---|---|---|
| Meeting attendance proxy | +1.8 | ↑ | 0.18 |
| Public comment volume | +2.3 | ↑ | 0.18 |
| FOIA filings | +0.4 | ~ | 0.10 |
| Local news article count | +3.1 | ↑↑ | 0.12 |
| Candidate event RSVPs | +0.9 | ↑ | 0.14 |
| Voter registration delta | +0.2 | ~ | 0.16 |
| Canvass signups | (no data) | — | excl. |
| Social organizing signals | +1.4 | ↑ | 0.12 |

### Interpretation
{plain-language read — what's driving the score, what's missing, what
to compare against}

### Signal type
- [ ] Single-week spike (event-driven)
- [x] Multi-week trend (sustained — 4 consecutive weeks above baseline)
- [ ] Single-channel signal — possible echo

### Does NOT tell you
- Who the civic activity favors. A rising pulse is direction-agnostic.
- That this county will vote any particular way. The pulse is a leading
  indicator of activity, not of outcome.
- What the activity is ABOUT. Use `infera-discourse-cartographer` for
  topic mapping.

### Cross-reference
- Topics driving this spike (if known): {from discourse-cartographer}
- Convergence findings touching this county: {from signal-convergence-ga}
- Anomalies fired in this county in the last week: {from anomaly-watch}
```

## When to use

- Weekly producer briefing: "where is civic activity rising?"
- Before assigning a reporter to a county, validate that there's
  something to report on.
- Validating a "grassroots momentum" claim from a campaign — does the
  pulse support it or is it press-release engineering?
- Building an early-warning watch list for election night.
- Pre-rehearsal for the election runner — high-pulse counties get
  priority attention windows.

## When NOT to use

- For vote-share prediction. Use polls, voter file, or fundamental
  models — not this.
- For per-issue salience. Use `infera-discourse-cartographer`.
- For real-time anomaly detection. Use `infera-anomaly-watch`.

## How Claude should execute

1. Read the latest snapshot per channel from `snapshots/` for the
   target county and the prior 156 weeks (3 years).
2. For each channel, compute the county's 3-year rolling baseline and
   the current week's z-score against that baseline.
3. Compute weighted geometric mean of available channels' z-scores.
4. Map to 0–100 via a logistic transform centered on the statewide
   distribution.
5. Determine confidence based on channel-count present.
6. Detect signal type: single-week spike vs multi-week trend vs
   single-channel echo.
7. Cross-reference with `signal-convergence-ga.json` and
   `anomaly-watch.json` to add context.
8. Emit the structured output. Always show decomposition. Always state
   what the score does NOT tell you.

## Composing with other skills

- `infera-discourse-cartographer` answers "what is the civic activity
  ABOUT?"
- `infera-cross-cycle-voter-shift` answers "has this county's voting
  behavior actually moved historically?"
- `infera-blind-spot-auditor` checks whether the channel mix
  systematically misses certain populations (e.g., counties where
  meetings aren't published online get scored as quiet when they aren't).
- `infera-editor` synthesizes the pulse + topic + shift into a
  county-level brief.

## Files

- `SKILL.md` — this file
- `data/civic-pulse-indicators.json` — channel registry, weights,
  source mappings
- `scripts/compute-pulse.mjs` — to be written; the synthesis runner
