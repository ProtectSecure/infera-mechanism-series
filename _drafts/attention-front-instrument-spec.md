# The Attention Front — Standing Instrument Spec

**Type:** Standing instrument (not an episode)
**Status:** Spec drafted — awaiting human approval for build
**Position:** Sits in publication nav alongside Systems Atlas, Claims Atlas, Case File
**Date drafted:** 27 May 2026

---

## What this is

A live, always-on page that monitors what is currently dominating public attention across U.S. and global discourse, decomposed by mechanism rather than by topic. Unlike the publication's episodes (slow, deep, definitive) and field dispatches (medium, geographically specific, empirical), the Attention Front is a **continuous instrument** — refreshed on a regular cadence, never "finished," readable as a snapshot or as a trend.

It is the publication's answer to the implicit question: *"You spend whole episodes describing mechanisms — what is the persuasion machine actually doing right now?"*

The answer lives at /attention-front.

---

## What it is not

- **Not an episode.** No six-act chassis. No compression point. No claim corpus. No counter-read defender hosting (per claim). The page reports observed activity; it does not argue a thesis.
- **Not a dashboard for the sake of dashboard.** Every panel has to earn its presence by surfacing something the episodes cannot — namely, *velocity, dominance, displacement, and timing* of current attention flows.
- **Not a news aggregator.** The publication will not compete with news sites on topic coverage. The Attention Front reports the *shape* of attention, not the substance.
- **Not real-time-of-the-second.** Refresh cadence is hourly to daily depending on panel, not sub-second. The instrument is editorial, not algorithmic.

---

## Why it exists

Three editorial functions, each load-bearing:

1. **It demonstrates the mechanism the episodes describe.** When the persuasion machine optimizes for engagement-maximizing rage, the Attention Front shows the resulting rage spike *as it happens*. Readers can verify the episodic claim against the live page.

2. **It cools the temperature on episode releases.** A publication that ships one major episode every few weeks has a discoverability problem in the off-weeks. The Attention Front gives readers a reason to return between episodes.

3. **It builds an empirical track record.** Over months, the Attention Front accumulates a longitudinal record of what dominated public attention and for how long. That record becomes its own evidence base for future episodes (the *Discourse Cartography* skill in the agent library is the operationalization).

---

## Panel architecture (v1)

Five panels. Each refreshes on its own cadence. Each cites its sources at the bottom of the panel.

### Panel 1 · Top Salience (refresh: hourly during waking hours)

The current top 10 topics dominating U.S. discourse, ranked by composite salience score across platform engagement, news article volume, search velocity. Each entry shows:
- Topic label (deliberately neutral phrasing — no editorial tilt)
- Salience score (0-100)
- Velocity (rising, plateau, declining)
- Lifecycle stage (emerging, dominant, persistent, declining, residual)
- Geographic concentration (national, regional, specific market)

**The discipline:** topics are described in mechanism-neutral terms. *"School board meeting attendance"* not *"angry parents at school board."* *"Federal infrastructure spending bill"* not *"Biden infrastructure win"* or *"Biden infrastructure failure."*

### Panel 2 · Engagement Architecture (refresh: every 4 hours)

For each of the top 5 salience topics, decompose the engagement signal:
- Outrage share of engagement
- Curiosity share of engagement
- Recognition share of engagement
- Mobilization share of engagement
- Unclassified share of engagement

Display: stacked horizontal bar per topic.

**The discipline:** outrage share is the most editorially sensitive metric. The page must not imply *outrage is bad*, only *outrage dominates*. The publication's voice describes; the reader interprets.

### Panel 3 · Convergence vs Polarization (refresh: daily)

For each of the top 5 salience topics, show whether public discourse is *converging* (left-leaning and right-leaning voters increasingly agreeing) or *polarizing* (increasingly disagreeing) over the last 30 days. Three-state display: converging / stable / polarizing. Includes a "quiet bipartisan agreement" callout for topics where polarization framing in media is high but actual public agreement is also high (the Common Ground Detector skill operationalizes this).

**The discipline:** convergence findings always show the disagreeing-minority share alongside. The page never implies unanimous agreement.

### Panel 4 · Lifecycle Trajectory (refresh: daily)

A timeline view of the last 30 days showing which topics emerged, peaked, persisted, declined. The visualization is a stack of horizontal lifelines, color-coded by stage. The reader sees the rhythm: topics that lasted two days, topics that lasted two weeks, topics that came back after a gap.

**The discipline:** this is the panel where the *Discourse Cartography* skill does most of its work. The page reports observed lifecycle; it does not predict.

### Panel 5 · Source Diversity (refresh: weekly)

For the top 10 salience topics of the past week, show the **source-diversity score** — how many distinct source types contributed to the topic's salience (T1 official, T2 institutional, T3 mainstream, T4 partisan, T5 attention-optimized). Topics dominated by T5 sources (engagement-optimized content) get a yellow flag indicating *low source diversity, high engagement load*. This is the page's quiet signal that a topic may be more atmospheric than substantive.

**The discipline:** source tiers are not value judgments. T5 content can be true. T1 content can be wrong. The diversity score reports *distribution*, not *quality*.

---

## Where the data comes from

The Attention Front depends on signal adapters that are part of the agent library and Infera coverage infrastructure. Each panel maps to one or more adapters:

| Panel | Primary adapter | Secondary adapter |
|---|---|---|
| 1 · Top Salience | discourse-cartography | civic-pulse (for civic-engagement spikes) |
| 2 · Engagement Architecture | signal-interpretation (markets/sports/geopolitics extensions) | source-classifier |
| 3 · Convergence vs Polarization | common-ground-detector | (none) |
| 4 · Lifecycle Trajectory | discourse-cartography | anomaly-watch |
| 5 · Source Diversity | source-classifier | source-triage |

If an adapter is offline or its data is stale, the corresponding panel displays a *Stale* badge with the timestamp of last successful refresh. The page never silently presents stale data as current.

---

## Editorial governance

The Attention Front is governed by the **same Four Founding Refusals** as the rest of the publication:

1. **No partisanship.** Topic labels are mechanism-neutral. Partisan framings are not adopted in the page's voice even when they dominate the discourse the page reports.
2. **No conspiracy.** Lifecycle and salience are reported as observed; coordinated-amplification claims require the same evidentiary bar as any episode claim.
3. **No dystopia.** Every modeled metric (engagement-architecture decomposition, source-diversity score) is labeled as inferred rather than measured. Documented metrics (article counts, search velocity) are labeled as such.
4. **No mind-control framing.** The page reports what is dominating attention. It does not assert that the dominance was engineered intentionally or that any specific reader has been manipulated by it.

The page also imports the publication's standard voice rules: declarative, italics for emphasis, no exclamation marks, banned words absent, no imperative "believe."

---

## What the page does NOT do

Important boundaries:

- **No personalization.** The Attention Front shows every reader the same panels. There is no algorithmic feed. The page is the same for everyone, refreshed on a public cadence.
- **No predictions.** The page does not forecast which topics will dominate tomorrow. It reports what is dominating now.
- **No commentary per topic.** No "Infera's take" on a specific item. The instrument reports flow; episodes do interpretation.
- **No virality contest.** The page does not amplify what's hot; it observes what's hot.

---

## Reader interaction surfaces

The page is mostly read, not operated. Three small interactions:

1. **Refresh button** in the header (manual refresh; the page auto-refreshes on cadence).
2. **Time-machine slider** at the bottom: drag back to view the Top Salience snapshot from any prior day in the last 90 days.
3. **Cite this snapshot** button: generates a citable URL with the current timestamp embedded, so researchers, journalists, and future readers can reference a specific state of the page.

---

## Visual treatment

Dark editorial palette consistent with the rest of the publication. Each panel uses a different grammar from the visual library:

- Panel 1 · Top Salience — **Liquid Columns** (rising/falling bars)
- Panel 2 · Engagement Architecture — **Stacked Field** (variant of Window Grid)
- Panel 3 · Convergence vs Polarization — **Radial Dial** (compass needle per topic)
- Panel 4 · Lifecycle Trajectory — **Flow Rivers** (horizontal lifelines)
- Panel 5 · Source Diversity — **Constellation Field** (dots clustered by tier)

Each panel renders gracefully in reduced-motion mode (static frames; no breathing animations).

---

## Integration with episodes

Episodes can deep-link into the Attention Front. Example: an episode about election-night narrative dynamics can include a link to *"Attention Front: see today's lifecycle trajectory for this topic."* This connects the slow editorial work to the live observation work in a way that makes both more useful.

The Case File can also surface relevant Attention Front state: *"While you were reading this episode, the Attention Front observed [topic] entering the lifecycle's dominant phase."* That contextualization deepens the reader's experience of being inside the system the publication describes.

---

## Build sequence

**Phase 1 — Static prototype.** Build the page shell with mocked data for all five panels. Verify visual treatment, navigation, and source-citation layout. No live adapters yet.

**Phase 2 — Single-panel live wiring.** Wire Panel 1 (Top Salience) to its adapter. Verify refresh cadence, stale-detection, source-citation. Ship to internal review.

**Phase 3 — Full live wiring.** Wire Panels 2-5 to their adapters. Verify cross-panel consistency. Ship to founding-500 internal preview.

**Phase 4 — Public launch.** Add to main publication nav. Announce via field dispatch.

**Phase 5 — Longitudinal record.** Begin archiving daily snapshots for future research and accountability. The page becomes its own historical instrument over time.

---

## Cadence

Build target: alongside or shortly after EP 04 publishes. The instrument's editorial purpose is sharpest when it can be referenced from the persuasion-trilogy episodes as live demonstration of the mechanisms those episodes describe.

Maintenance burden after launch: low, assuming adapters are healthy. The page is designed to be operated by the same single editor who runs the publication, with adapter health monitored by the existing Trust Audit and Anomaly Watch skills.

---

*Spec drafted 27 May 2026 · Connective Agent · awaiting human approval for build*
