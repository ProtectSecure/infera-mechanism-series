# The Attention Front · Standing Instrument Spec v2

**Type:** Standing instrument (not an episode). Sits in nav beside Systems Atlas, Claims Atlas, Case File.
**Status:** v2, revised 23 October 2026. Still awaiting human approval to build. v2 adds three panels earned by work published since May, aligns the visual treatment with the house style, and proposes a midterm-week launch.
**Lives at:** /attention-front

---

## What changed in v2, and why

The May spec described a mechanism monitor in the abstract. Since then three Field Notes did by hand what this page would do on a schedule:

- **Field Note № 04 The Loudest Story** measured what dominated a day.
- **Field Note № 08 Under the Noise** found what slid past while attention was elsewhere: a surveillance law three days from lapse, a $1.5 trillion defense bill marked up behind closed doors.
- **Field Note № 12 The Ventriloquist** tracked the voices of the dead in campaigns and pulpits eleven days before the midterms.

v2 turns those three habits into panels. Also: the May spec called for a dark palette. The publication's house style is now a light paper ground with glass drawn in code. v2 follows the house style.

---

## What this is

A live page that reports the **shape** of public attention, decomposed by mechanism rather than topic. Episodes are slow and definitive; Field Notes are monthly; Briefs follow clocks. The Attention Front is continuous: refreshed on a public cadence, never finished, readable as a snapshot or a trend.

## What it is not (unchanged)

Not an episode (no thesis). Not a dashboard for its own sake. Not a news aggregator. Not real-time to the second. No personalization, no predictions, no per-topic commentary, no virality contest.

## Why it exists (unchanged, sharpened)

1. **It demonstrates the mechanism.** EP 02 The Feed Engine and EP 04 The Influence War describe; this page shows the same mechanism running today.
2. **It gives readers a reason to return** between episodes.
3. **It builds a record.** Archived daily, it becomes evidence for future episodes and a check on our own claims.

---

## Panel architecture (v2)

Panels 1 to 5 are carried from v1 with no change in substance. Panels 6 to 8 are new.

| # | Panel | Refresh | Grammar | Origin |
|---|---|---|---|---|
| 1 | Top Salience | hourly, waking hours | Liquid Columns | v1 |
| 2 | Engagement Architecture (outrage / curiosity / recognition / mobilization) | 4 hours | Stacked Field | v1 |
| 3 | Convergence vs Polarization, with a "quiet bipartisan agreement" callout | daily | Radial Dial | v1 |
| 4 | Lifecycle Trajectory | daily | Flow Rivers | v1 |
| 5 | Source Diversity (T1 to T5) | weekly | Constellation Field | v1 |
| 6 | **Under the Noise** | daily | Undertow (a thin second river beneath Panel 4) | Field Note № 08 |
| 7 | **Synthetic Voices** | daily in election season, weekly otherwise | Case wall | Field Note № 12 · EP 09 |
| 8 | **Sabbath Dip** | weekly | Seven-segment week clock | Faith Layer 07 (planned) |

### Panel 6 · Under the Noise

The public schedule underneath the loud story: rules entering Federal Register Public Inspection, hearings, filing deadlines and expirations that drew little attention on days when one topic dominated. Each item is paired with the topic that dominated attention that day. Source substrate: The Desk (Tomorrow Board, Federal Register PI Scan), plus Field Note № 11's Public Inspection method.

**Discipline:** the panel shows *coincidence*, never intent. "Low attention on a high-attention day" is the claim; "buried on purpose" is not, unless separately evidenced to episode standard.

### Panel 7 · Synthetic Voices

A labeled log of synthetic speech by real people that reached public attention, with the dead flagged separately. Columns: who, for whom, consent documented (yes / no / unknown), labeled (yes / no), platform, label tier. Seeded from The Ventriloquist's dated case table.

**Discipline:** entries require two independent reports. The page never rates whether a synthetic message was persuasive. Consent and labeling are reported as observed.

**Launch fit:** the 2026 midterms are November 3. A pre-election and post-election snapshot of this panel is the most direct test of The Ventriloquist's watch item ("no 2026 midterm ad using an AI-resurrected dead person found").

### Panel 8 · Sabbath Dip

How much the attention curve flattens during common rest windows (Friday sundown to Saturday sundown, Sunday morning, Friday midday). Reported as observed dips or non-dips by source type. It links to Faith Layer 07 *A Palace in Time*.

**Discipline:** no claim that rest is or is not observed by any group. The panel measures platform activity, not piety.

---

## Data sources

| Panel | Primary adapter | Secondary |
|---|---|---|
| 1 | discourse-cartography | civic-pulse |
| 2 | signal-interpretation | source-classifier |
| 3 | common-ground-detector | (none) |
| 4 | discourse-cartography | anomaly-watch |
| 5 | source-classifier | source-triage |
| 6 | tomorrow-board · mandated-report-radar | why-now-engine |
| 7 | source-triage · narrative-integrity | trust-audit |
| 8 | discourse-cartography | (none) |

Stale data shows a **Stale** badge with the last successful refresh. The page never presents stale data as current.

## Editorial governance

The four founding refusals: no partisanship, no conspiracy, no dystopia, no mind-control framing. Modeled metrics are labeled INFERENCE; counted metrics are labeled FACT or REPORTED by source. Voice rules: declarative, no exclamation marks, no dashes.

## Reader surfaces

Refresh button; 90-day time-machine slider; **Cite this snapshot** (timestamped URL). New: **Seen in an episode** chips. When a panel item matches a mechanism the publication has covered, a small chip links to it (for example a synthetic-voice entry links to EP 09; an Under the Noise utility filing links to Same Building, Two Bills).

## Visual treatment

House style: light paper ground, glass drawn in code, Newsreader and Instrument Sans with IBM Plex Mono for data. Each panel keeps its v1 grammar. Reduced-motion renders static frames.

## Integration with episodes

Episodes deep-link to panels; the Case File can say *"While you read this, Panel 7 logged a new synthetic voice."* EP 11 The Governance Layer links Panel 6 as the live view of "levers moving while nobody watched."

## Build sequence

1. **Static prototype** with mocked data for all eight panels.
2. **Panel 7 live first**, by hand if adapters lag, from October 26 to November 10, bracketing the November 3 midterms. One editor, two-source rule.
3. **Panels 1, 4, 6 live.** Then 2, 3, 5, 8.
4. **Public launch** announced by a Field Note.
5. **Longitudinal archive** of daily snapshots.

## Cadence

Maintenance is low once adapters are healthy; monitored by Trust Audit and Anomaly Watch. The midterm window is the reason to approve Phase 1 and 2 now rather than with Season III.

---

*v1 drafted 27 May 2026 · v2 revised 23 October 2026 · Connective Agent · awaiting human approval for build*
