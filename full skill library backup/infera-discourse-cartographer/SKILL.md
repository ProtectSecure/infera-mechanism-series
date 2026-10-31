---
name: infera-discourse-cartographer
description: Maps what topics are actually being discussed across Georgia local government, school boards, and local news in real time. Tracks topic emergence (first appearance), dominance peak (mentions per week), persistence (weeks above threshold), geographic breadth (jurisdictions touching the topic), and decline curves. Distinguishes "loud topic" (lots of mentions in one place) from "wide topic" (mentions across many places) — the most common framing error in election coverage. Use when assessing whether an issue is breaking out, comparing media salience to actual citizen agenda items, or tracing the lifecycle of a frame ("election integrity", "school choice") across cycles.
---

# Infera Discourse Cartographer

The most common framing error in election coverage is conflating loud
discourse (a few outlets writing a lot) with wide discourse (many
constituencies discussing). This skill maps both axes — intensity AND
breadth — across local government meetings, school boards, and local
news. The output is an issue-attention heat map per jurisdiction per
week, plus a lifecycle profile for any tracked topic.

The deliverable is the answer to: "is this topic actually breaking
out, or is one Substack on a tear?"

## What it tracks

Per topic, per week, per jurisdiction:

- **Mentions** — count of meeting agenda items / minutes references /
  news articles touching the topic
- **Geographic breadth** — how many distinct jurisdictions / counties
  show ≥1 mention in the week
- **Source diversity** — how many distinct outlets / officials are
  speaking on it
- **Lifecycle stage** — emergence / climbing / peak / persistent /
  declining / dormant
- **Comparative anchor** — a control topic of similar baseline volume
  (e.g., "transportation budgets") for sanity check

Topics are not keyword matches — they're LDA-style soft clusters with
named labels. Keyword matches over-fit (e.g., "choice" hits both school
choice and abortion); topic clusters generalize.

## Hard rules

1. **Loud ≠ wide.** Always report mentions AND breadth. A 500-mention
   week in 3 counties is one story; a 500-mention week across 47
   counties is a different story. Never collapse them.
2. **Source diversity is the echo-chamber guard.** A topic surging in
   mentions but with low source diversity is editorial activity, not
   discourse. Flag it.
3. **Topic boundaries are fuzzy.** Use cluster membership probabilities,
   not hard keyword matches. "School choice" and "voucher" and "ESA" are
   the same topic; "choice" alone is not.
4. **Elite vs popular discourse.** Distinguish topics rising in the
   commentariat (op-ed pages, talking heads) from topics rising in
   public meeting comment sections. They are not the same population
   and conflating them inflates the perceived salience.
5. **Always run a control topic.** For any rising topic, pull a control
   topic of similar baseline volume in the same jurisdictions. If the
   control rose proportionally, the rise may be a measurement artifact
   (more meetings, more news) rather than a real surge.
6. **No predictive language.** The skill describes what's being
   discussed, not what's about to happen. Convergence with vote-share
   shifts is `infera-cross-cycle-voter-shift` territory; the cartographer
   stays descriptive.

## Output

```markdown
## Topic profile: {topic_label} — week of {date}

### Lifecycle stage: {emerging | climbing | peak | persistent | declining | dormant}

### Volume
- Mentions this week: {N}
- 4-week moving average: {N}
- 52-week baseline: {N}
- Ratio to baseline: {x.x}×

### Geographic breadth
- Jurisdictions with ≥1 mention this week: {N} of 159
- New jurisdictions this week (first-time mentions): {N}
- Concentration ratio (top-3 jurisdictions' share of mentions): {%}

### Source diversity
- Unique outlets covering: {N}
- Unique elected/appointed officials speaking: {N}
- Diversity score: {0-1, Simpson's index}
- Echo flag: {none | possible | strong}

### Channel split
- Local government meetings: {N mentions}
- School boards: {N mentions}
- Local news articles: {N mentions}
- Public comment sections in minutes: {N mentions}

### Elite vs popular
- Elite (op-ed / commentariat / official statements): {N}
- Popular (public comments / petitions / RSVPs to topic-specific events): {N}
- Ratio: {elite-driven | popular-driven | balanced}

### Control topic
- Control topic chosen: {label}
- Control topic ratio to its baseline this week: {x.x}×
- {topic} excess over control: {ratio}

### Lifecycle trajectory (last 26 weeks)
{ascii sparkline or markdown table of weekly mention counts}

### Geographic heat map (top 10 jurisdictions this week)
| Jurisdiction | Mentions | Rank delta vs prior week | First seen |
|---|---|---|---|
| ... | ... | ... | ... |

### Interpretation
{plain-language read with the "loud vs wide" distinction made explicit}
```

## When to use

- "Is school choice actually breaking out, or just trending in the
  commentariat?"
- "Map the rise of {topic} across the last 6 months."
- "Which topics are popular-driven vs elite-driven this week?"
- Producer's pre-show topic survey for a segment on issues.
- Pre-coverage check before assigning a reporter to a "trending"
  story — make sure the trend is real.

## When NOT to use

- For sentiment analysis. The skill counts and locates; it doesn't
  attribute valence. (A separate sentiment layer can sit on top.)
- For predicting election outcomes. Discourse salience and vote share
  are weakly correlated; don't bridge that gap here.
- For real-time anomaly detection on individual events. Use
  `infera-anomaly-watch`.

## How Claude should execute

1. Resolve the topic (label + cluster definition). If the user supplies
   keywords, expand to a topic cluster using `data/topic-clusters.json`
   (to be built as topics are catalogued).
2. Pull mention data per jurisdiction per week from:
   - `civic-meetings-ga` agenda items + minutes references
   - school-board adapter (when built)
   - `ga-local-news-monitor` articles (when built)
3. Compute volume, breadth, diversity, channel split, elite/popular
   ratio.
4. Choose a control topic of similar baseline volume in the same
   jurisdictions. Pull its current ratio.
5. Determine lifecycle stage:
   - emerging: first-week mentions in 3+ jurisdictions, baseline near 0
   - climbing: 4-week MA growing >25% week over week
   - peak: 4-week MA ratio to baseline > 3.0 and not yet declining
   - persistent: 4-week MA ratio > 1.5 for 8+ consecutive weeks
   - declining: 4-week MA falling >25% week over week from a recent peak
   - dormant: 4-week MA back within 1 SD of baseline
6. Detect echo: source diversity < 0.4 (Simpson's) AND mentions ratio >
   2.0 → echo flag = strong.
7. Emit structured output. Always include the control comparison and
   the geographic breadth panel.

## Composing with other skills

- `infera-civic-pulse` answers "is civic activity rising overall?";
  this skill answers "what is it about?"
- `infera-blind-spot-auditor` checks whether the topic clusters miss
  perspectives — e.g., is the "education quality" topic dominated by
  one parent group's framing while a different framing is invisible?
- `infera-cross-cycle-voter-shift` tests whether discourse salience
  precedes voting shift in the same jurisdictions across cycles — the
  causal claim from this is hard but the descriptive correlation is
  worth tracking.
- `infera-common-ground-detector` runs against any topic with high
  geographic breadth to see if cross-party convergence is occurring on
  it.
- `infera-investigative-method` opens a deeper investigation on a
  topic that shows persistence + popular drive + low source diversity
  (often signals an organized campaign).

## Files

- `SKILL.md` — this file
- `data/topic-clusters.json` — to be built; named topic clusters with
  their keyword vectors and cluster centroids
- `data/control-topics.json` — to be built; baseline-volume-matched
  control topics for each tracked topic
- `scripts/profile-topic.mjs` — to be written; the profiling runner
