---
name: infera-mandated-report-radar
description: Track statutory reporting obligations across the federal government — every report agencies are legally required to deliver to Congress, with statutory authority, frequency, receiving chamber/committee, last submitted date, next expected date, and delay/missing flags. Sources include the House Clerk "Reports to be Made to Congress" annual list, the GovInfo Congressionally Mandated Reports collection, the GovInfo API, OMB M-23-17 implementation, GAO open recommendations, and individual OIG semiannual reports. Use to detect pre-news (mandated reports often become hearings, oversight letters, GAO requests, lawsuits, and stories later), to score "accountability delay" mechanism candidates, and to surface the statutory deadline calendar Infera should anticipate. This is one of Infera's strongest pre-narrative signals because the obligation creates the news long before the agency does.
---

# Infera Mandated Report Radar

Reports to Congress and other mandated disclosures are one of the most
under-covered pre-news layers in American government. They are
predictable (statute names the cadence), public (House Clerk publishes
the obligation list), and consequential (delays, contents, and
contradictions all become stories). This skill turns that surface
into a structured radar.

## When to use

- During Tomorrow Board generation, to flag reports due tomorrow / this
  week / this month.
- Whenever Infera detects a "why now?" gap on a hearing or announcement
  — a recently submitted (or delayed) mandated report is often the
  hidden trigger.
- When opening a new beat — load the obligation calendar for the
  relevant agencies/committees before any signal-collection work.
- After every quarterly NDC release, semiannual OIG report, GAO high-
  risk update.
- When scoring an agency's accountability heat — overdue reports +
  open OIG recommendations + GAO open recommendations + FOIA backlog
  = a quantifiable accountability index.

## When NOT to use

- For interpreting the contents of a specific report (use
  `infera-investigative-narrative`).
- For routing a public-records request for a report Congress
  refused to release (use `infera-public-infrastructure-graph`).

## Source map

| Source | What it gives | Refresh |
|---|---|---|
| House Clerk "Reports to be Made to Congress" | Annual list of statutory reports agencies/officers must submit | Annual + statutory updates |
| GovInfo Congressionally Mandated Reports | Searchable repository of reports submitted to Congress | Weekly diff |
| GovInfo API (CMR endpoint) | Programmatic ingestion of mandated reports | Daily |
| OMB M-23-17 guidance + agency implementation | Documents the Access to Congressionally Mandated Reports Act rollout | Quarterly check for updates |
| GAO reports + open recommendations | Watchdog accountability | Daily |
| Oversight.gov | Aggregated IG output + open recommendations across federal IGs | Daily |
| Individual OIG sites | Per-agency audits, evaluations, investigations, semiannual reports | Weekly |
| GovInfo Congressional Record | Floor invocations of overdue / submitted reports | Daily |
| Committee reports + transcripts | Committee references to mandated reports | Event-driven |

## Obligation schema

Every tracked obligation lives in `obligations.csv`:

| Field | Example |
|---|---|
| obligation_id | OB-2026-EDU-NCES-001 |
| agency | Department of Education |
| sub_unit | NCES |
| report_title | The Condition of Education |
| statutory_authority | 20 U.S.C. § 9543 |
| frequency | annual |
| receiving_chamber | both |
| receiving_committees | Senate HELP, House Education & Workforce |
| typical_release_window | May–June |
| last_submitted | 2025-05-21 |
| next_expected | 2026-05–06 |
| status | on-track / due-soon / overdue / missing / submitted |
| latest_url | https://nces.ed.gov/programs/coe/ |
| infera_mechanism_tags | accountability delay if overdue |
| linked_hearings | committee meeting IDs that referenced this report |
| linked_oig_findings | IG report IDs |
| linked_gao_recs | open recommendation IDs |

## Status definitions

- **on-track** — within typical release window, no delay signal
- **due-soon** — 30 days from next_expected
- **overdue** — past next_expected by ≥ 30 days
- **missing** — past next_expected by ≥ 90 days, no public statement
- **submitted** — confirmed delivered (with URL)
- **withheld** — explicitly noted by Congress / agency as withheld
- **classified** — submitted in classified form only

## Detection rules

1. **Diff GovInfo CMR weekly.** New entries → mark `submitted`. Tag
   originating agency, statute, receiving committee.
2. **Compare obligations.csv against current date.** Surface `due-soon`
   and `overdue` to Tomorrow Board.
3. **Diff House Clerk list annually.** Capture additions / removals of
   obligations (these are themselves news).
4. **Diff individual OIG semiannual reports.** Compare promised /
   listed report titles in prior semiannuals to current delivery.
5. **Diff Oversight.gov open recommendations weekly.** Open
   recommendations that have been open >365 days score higher in
   the Accountability Index.
6. **Cross-reference hearings.** If a hearing mentions a report
   title, attach the meeting ID to the obligation row.

## The Accountability Index (per agency)

For each agency, Infera computes:

- count of `overdue` mandated reports
- count of `missing` mandated reports
- count of open GAO recommendations
- count of open OIG recommendations
- mean age of open recommendations
- FOIA backlog and oldest pending request age (from FOIA.gov reports)
- count of FOIA litigation cases filed in past 12 months

Aggregate to an Accountability Index 0–100. Surface the top-10 most
exposed agencies monthly. This is the input for:

- "Most oversight-exposed agencies this month" — Mechanism Brief recurring
- "Programs with repeated warnings but no corrective action" — Story Pack
- "Agencies with rising transparency friction" — public scorecard

## "Why now?" hook for hearings

When a hearing is scheduled, run this radar against:

- the agency testifying
- the committee holding the hearing
- the topic (matched via report titles + keywords)

Often the hearing is the legislative response to a recently submitted
(or recently overdue) mandated report. That connection is news.

## Outputs

- `obligations.csv` — the master obligation registry
- `accountability-index.csv` — per-agency monthly score
- `due-this-week.md` — surfaced into the Tomorrow Board
- `overdue-watchlist.md` — Mechanism Series story candidates
- `submitted-this-week.md` — new exposure events to enrich

## Failure modes

- **Stale obligation list.** The House Clerk list updates yearly but
  laws change mid-year. Cross-check against GovInfo when a statute
  is enacted that creates or sunsets a reporting obligation.
- **Classified-only submissions.** Some reports are submitted in
  classified form only — they look "missing" to public surfaces.
  Tag explicitly when public statements (committee press releases,
  member statements) confirm classified delivery.
- **Title drift.** Agencies rename reports. Use NLP similarity matching
  on titles plus statutory citation as primary key.
- **Receiving-committee ambiguity.** Some reports go to both chambers
  or multiple committees. Don't drop the obligation row when only
  one venue confirms receipt.

## The Infera principle this skill encodes

The government is constantly producing artifacts that explain itself.
Hearings, court filings, news cycles, and lawsuits are downstream of
these artifacts. Whoever tracks the obligation calendar most carefully
sees the next 60 days of news before everyone else does. That is
Infera's structural advantage.
