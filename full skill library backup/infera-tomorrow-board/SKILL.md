---
name: infera-tomorrow-board
description: Generate the next-day "Open Record Order" — Infera's public-source emulation of a newsroom assignment desk. Pulls committee schedules, Federal Register public-inspection, C-SPAN, agency advisories, court calendars, economic-release calendars, and presidential/cabinet public schedules into a single chronological board for the next business day, with coverage-gravity scoring, mechanism tags, and a prewritten interpretive scaffold. Run daily at 4–6 PM ET. Use when planning tomorrow's coverage, prewriting interpretive branches for scheduled releases, or producing the daily Mechanism Brief. This is the planning-cycle anchor for the entire Infera production rhythm.
---

# Infera Tomorrow Board

The most important Infera operational shift is this: planning happens
the day before. By 4–6 PM ET, the next-day Open Record Order should
already exist. By 11:30 PM the Overnight Desk has rolled in late
changes. By 8:15 AM the Morning Lock has confirmed everything before
the 8:30 AM economic releases hit. This skill builds the first and
most important artifact: the Tomorrow Board.

## When to use

- Daily at 4–6 PM ET (the primary fire time).
- Before any Mechanism Brief, Daily Signal, or Watchboard product ships.
- Before any creator/journalist intake call where Infera owes a "what's
  coming this week" view.
- When a major event already happened and Infera needs to anticipate
  the follow-up calendar.
- When onboarding a new beat — generate Tomorrow Board for that beat
  to seed the watchlist.

## When NOT to use

- For real-time same-day monitoring (use the Morning Lock + real-time
  signal scan instead).
- For historical pattern matching (use `infera-why-now-engine`).
- For interpreting a single fired signal (use `infera-signal-interpretation`).

## The three-cycle daily rhythm this skill anchors

| Cycle | Time (ET) | Purpose | Output |
|---|---|---|---|
| Tomorrow Board | 4–6 PM | Build next-day open record order | This skill's primary artifact |
| Overnight Desk | 11:30 PM–1 AM | Capture WH schedule + late agency updates + international | Delta to the Tomorrow Board |
| Morning Lock | 5:30–8:15 AM | Refresh high-priority sources before 8:30 releases | Confirmed board + prewritten release scaffolds |
| Real-time Monitor | every 5–30 min | Detect changes, live events, hearings, streams | Change alerts |
| Evening Close | 6–9 PM | Compare planned vs. actual; archive outcomes | Outcome ledger |

## Inputs (pulled in this order)

1. **Congressional** — Senate Hearings & Meetings XML, House Committee
   Repository, House floor schedule, Congress.gov committee-meeting
   endpoint, GovInfo Congressional Calendars.
2. **Federal Register** — Public Inspection page (next-day preview),
   Federal Register API filtered by tomorrow's publication date.
3. **Executive** — White House news/live/remarks/actions, Factba.se /
   Roll Call presidential schedule, State Department public schedule,
   Treasury press, DOJ press, DOD press, agency advisory calendars.
4. **Judicial** — SCOTUS argument/opinion/order days, U.S. Courts RSS,
   CourtListener docket alerts for monitored cases.
5. **Economic** — BLS / BEA / Census release calendars, FOMC calendar,
   Treasury auction/refunding calendar, EIA petroleum (Wed),
   USDA WASDE (monthly), CFTC COT (Fri).
6. **Visual availability** — C-SPAN schedule, agency YouTube channels,
   committee livestream pages, White House Live, UN Web TV.
7. **International** — UN media alerts, NATO advisories, European
   Commission calendar, G7/G20 events, foreign-ministry schedules.
8. **DC civic** — DC Mayor schedule, DC Council, MPD public releases,
   National Mall / NPS permits, think-tank events (Brookings, AEI, CSIS,
   Heritage, CFR, Atlantic Council, Wilson Center), university events.

## The Open Record Order schema

Every row in the Tomorrow Board:

| Field | Notes |
|---|---|
| time_et | normalized; flag TBA |
| event | clean title |
| entities | people/orgs involved |
| institution | WH / Senate / House / DOJ / NATO / etc. |
| location | room / building / city |
| public_source | URL of the canonical source |
| source_tier | T1 / T2 / T3 / T4 (per `infera-source-classifier`) |
| stream | livestream URL if known |
| access_type | open press / pool / closed / public stream / unknown |
| change_status | new / updated / time-changed / removed |
| confidence | official / likely / rumored / unconfirmed |
| coverage_gravity | score 0–100 (per `infera-coverage-gravity-scoring`) |
| mechanism_tags | comma-separated from the mechanism taxonomy |
| historical_analog | result of `infera-why-now-engine` if available |
| infera_read | one-line interpretation |
| watchlist_next | what to monitor afterward |

## The interpretive scaffold (prewrite before the event)

For every known recurring event type (jobs report, CPI, PPI, FOMC,
Treasury refunding, EIA petroleum, SCOTUS opinion day, major committee
hearing, presidential travel, etc.), Infera prepares branches in advance:

- **Jobs report:** beat / miss / unemployment up / wage growth hot /
  revisions negative / government jobs distort headline / labor force
  participation shifts.
- **CPI/PPI:** hot / cool / shelter-driven / energy-driven / tariff-effect
  visible / disinflation continuing / re-acceleration.
- **FOMC:** hold / cut / hike / hawkish hold / dovish hold / SEP shifts /
  press-conference walkback.
- **Committee hearing:** witness contradicts agency / agency contradicts
  GAO / partisan split / new disclosure / nothing-burger / news-clip moment.

At release time, fill in the actual numbers and ship the correct branch.
This is how Infera matches newsroom speed without newsroom access.

## Coverage-gravity ranking (top of the board)

After all rows are scored via `infera-coverage-gravity-scoring`, the
Tomorrow Board sorts by gravity and labels the top tier:

- **Alert now** — must-cover, time-sensitive, high consequence
- **High gravity** — anchor stories of the day
- **Likely coverage** — second-tier stories
- **Watch** — boring on the surface but operationally important
- **Low** — background

## The Narrative Collision Map

Flag time-overlapping high-gravity events. When 3+ items at the same
hour cross 70 gravity, Infera should note:

> "Three high-gravity events compete for attention at 10:00. Story X
> may be under-covered today. Watch for the agency-only follow-up by
> 5 PM."

## Outputs

- `tomorrow-board-YYYY-MM-DD.csv` — full row-level board
- `tomorrow-board-YYYY-MM-DD.md` — narrative version for the Mechanism
  Brief
- `collision-map-YYYY-MM-DD.md` — same-time clashes
- `prewrite-scaffolds-YYYY-MM-DD/` — one md per scheduled major release,
  with branches ready to fill

## Failure modes to guard against

- **Schedule drift over weekends and holidays.** Federal Register and
  most committee schedules go quiet Fri night – Sun. Tomorrow Board for
  Monday must be run Friday afternoon, then refreshed Sunday evening.
- **TBA collapse.** Many record-order-style events live as TBA all day
  and resolve late. Tag aggressively, re-poll those sources on the
  Overnight Desk and Morning Lock cycles.
- **Withdrawn Federal Register documents.** Public Inspection items are
  tentative. Never assert they will publish; flag as "scheduled,
  withdrawable."
- **Over-confidence in non-official trackers.** Factba.se / Roll Call
  is excellent but not the White House; mark T4 reliability and
  cross-check against official WH posts.

## The Infera principle this skill encodes

The earlier you can see how a story is forming, the more power you
have to understand it, challenge it, prepare for it, or use it. The
Tomorrow Board is the artifact that makes "before the headline
hardens" operational — once a day, every day.
