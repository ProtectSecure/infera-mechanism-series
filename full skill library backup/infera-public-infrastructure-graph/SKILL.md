---
name: infera-public-infrastructure-graph
description: The federal/state/local public-accountability source registry and entity graph. Maintains the canonical list of every publicly-documented government rhythm — agency calendars, mandated reports, FOIA portals, rulemaking dockets, court calendars, oversight outputs, economic release calendars, and committee schedules — and the relationships between them (department → operating division → bureau → office → program → data feed → calendar → reports → FOIA office → oversight body → funding stream). Use whenever Infera needs to add a new source, identify the right custodian for a record, route a public-records request, locate the public calendar for an agency/program, or determine which oversight body covers a given mechanism. This skill is the seed map every other Infera signal skill depends on.
---

# Infera Public Infrastructure Graph

Infera's other skills assume there is a known map of where public
information comes from. This skill IS that map. It is the foundation
layer that turns "scrape the government" into a structured graph of
sources, custodians, rhythms, and obligations.

The point: news does not begin when the story breaks. News begins when a
documented system puts time on the calendar. This skill maps every such
system Infera knows about — and how to discover the next one.

## When to use

- Adding a new agency, sub-agency, program, or jurisdiction to Infera.
- Routing a public-records request to the correct custodian.
- Identifying which committee, oversight body, or FOIA office covers a topic.
- Finding the public calendar, RSS feed, API, or data portal for a system.
- Building a watchlist for a new issue area.
- Auditing whether Infera has full coverage of the public obligation surface
  for a story.
- Onboarding a new beat (education, energy, defense, healthcare, immigration,
  etc.) before any signal-collection work begins.

## When NOT to use

- For interpreting a single event (use `infera-signal-interpretation`).
- For pattern matching against historical analogs (use `infera-why-now-engine`).
- For scoring an event's coverage gravity (use `infera-coverage-gravity-scoring`).
- For detecting newly released documents (use `infera-document-exposure-radar`).

## Source registry schema

Every source Infera tracks lives in the registry with these fields:

| Field | Example |
|---|---|
| source_name | GovInfo Congressionally Mandated Reports |
| source_family | Reports to Congress |
| government_owner | GPO |
| coverage_scope | Agency reports submitted to Congress |
| url_or_api | https://www.govinfo.gov/app/collection/cmr |
| access_method | API / RSS / XML / HTML / email / social |
| refresh_cadence | daily / weekly / monthly / event-driven |
| entity_types | agency, committee, report, statute |
| signal_type | mandated report / hearing / rule / opinion / release / grant |
| lead_time | same-day / day-before / week-ahead / months-ahead |
| infera_score_factor | accountability trigger |
| reliability | Tier 1 official / Tier 2 official HTML / Tier 3 official PDF / Tier 4 credible non-gov |
| scrape_risk | low / medium / high |
| robots_terms_notes | … |
| last_successful_fetch | … |
| parser_status | working / broken / draft |

## Source families Infera maintains

**Federal executive** — White House news/live/remarks/actions, presidential
schedule tracker (Factba.se / Roll Call), cabinet department press releases
and secretary schedules, agency FOIA reading rooms, agency YouTube channels.

**Federal legislative** — Senate Hearings & Meetings (+XML), Senate floor
schedule, House Committee Repository, House Document Repository, House
Clerk legislative activity, Congress.gov API (bills/members/committees/
committee-meetings), GovInfo Congressional Calendars, House Press Gallery
resources.

**Federal judicial** — Supreme Court argument calendars/opinions/orders,
U.S. Courts RSS, CourtListener / RECAP, PACER, district/circuit court
calendars, DOJ press releases.

**Federal regulatory** — Federal Register Public Inspection (next-day
preview, posted 8:45 AM ET), Federal Register API, RegInfo Unified Agenda,
Regulations.gov API, GovInfo Unified Agenda collection, FDA advisory
committee calendar, SEC meetings/events page + Sunshine Act notices, FERC,
FTC, FCC, CFTC, EPA, OSHA.

**Federal oversight & accountability** — GAO (reports, legal decisions,
high-risk areas, open recommendations), Oversight.gov (aggregated IG
output + open recommendations), individual OIG sites for every cabinet
department, House Clerk "Reports to be Made to Congress" (the statutory
obligation calendar), GovInfo Congressionally Mandated Reports Collection.

**Federal funding & money** — SAM.gov Assistance Listings (+ API), Grants.gov
opportunity API, USAspending API, SAM.gov Subaward Reporting / FSRS,
Treasury fiscal data release calendar, Daily/Monthly Treasury Statement,
Treasury auction & quarterly refunding (first Wed of Feb/May/Aug/Nov).

**Federal economic releases** — BLS calendar (Employment Situation, CPI,
PPI, JOLTS, claims), BEA calendar (GDP, PCE, personal income/outlays,
trade, international accounts), Census economic indicators, Federal Reserve
FOMC calendar + statements + press conferences + minutes + Beige Book,
EIA petroleum (Wed 10:30 AM ET), USDA WASDE (monthly 12:00 PM ET), CFTC
Commitment of Traders (Fri 3:30 PM ET).

**International** — UN Web TV + UN media alerts, NATO media advisories,
European Commission press corner + commissioner calendars, G7/G20 events,
major embassy press pages, foreign ministry public schedules.

**State** — RCFP Open Government Guide (state-by-state law map), NFOIC
state resources, state attorney general public-records guidance, state
secretary of state pages, central state request portals where they exist
(e.g., Utah Open Records Portal, Oregon centralized portal), state-built
NextRequest / GovQA / JustFOIA portals.

**County & municipal** — county clerk, sheriff records, county prosecutor,
county health, county elections, city clerk, city manager, police records,
fire department, planning/zoning, public works. Use MuckRock jurisdiction
pages, USA.gov state and local government directories, and platform
fingerprinting (NextRequest / GovQA / JustFOIA / Granicus / CivicPlus /
OpenGov) to discover the right portal.

**Public records request infrastructure** — FOIA.gov (federal wizard +
reports + developer API + search government websites), DOJ OIP FOIA
Reference Guide, NARA OGIS / FOIA Advisory Committee, MuckRock,
DocumentCloud, RCFP, NFOIC.

**Special districts & authorities** — transit, water/sewer, housing,
port, airport, school boards, fire districts, library districts, park
districts, utility districts, regional planning, public hospitals,
redevelopment agencies, election boards.

**Discovery seeds** — USA.gov A-Z Agency Index, Federal Register Agencies
API, Data.gov Catalog API, api.data.gov. These are the directories Infera
uses to find sources it doesn't yet know about.

## Entity graph schema

Every entity Infera tracks (person, agency, committee, court, program,
statute, document, location) lives in the graph with typed edges:

- testified before
- funded by
- investigated by
- reported to
- sued by
- regulated by
- cited in
- released by
- redacted by
- declassified by
- unsealed in
- scheduled with
- followed by
- preceded by
- contradicted by

Each edge carries a date — and entities carry multiple date layers:
planned date, actual event date, document filing date, document release
date, publication date, archive digitization date, declassification
completion date, news coverage date, social reaction date, policy outcome
date. **Preserve all date layers separately.** A document created in 1975,
declassified in 2005, digitized in 2026, cited in a lawsuit in 2027, and
covered in 2028 is a different artifact at each layer.

## Source-tier hierarchy (route requests in this order)

1. **API where available** (Congress.gov, Federal Register, USAspending,
   Grants.gov, Data.gov, GovInfo, FOIA.gov, NARA Catalog)
2. **RSS / XML / ICS / official datasets** (Senate XML, GovInfo RSS, court
   RSS, BLS calendar)
3. **Official HTML pages** (White House, agency press pages, committee
   pages, House/Senate schedules, C-SPAN schedules, OIG sites)
4. **Official PDFs** (agency reports, hearing packets, budget
   justifications, mandated reports, GAO/OIG reports)
5. **Credible non-government public sources** (Roll Call/Factba.se,
   Reuters/AP/Bloomberg, watchdog groups, university libraries,
   EveryCRSReport, MuckRock/DocumentCloud)

Treat scraping as the default ONLY when no upstream API/RSS/XML/email
alert exists. Cite source tier on every signal Infera emits.

## "Find the custodian" routing

Given a record type, return the likely custodian + statute + portal +
template + appeal path. The routing tree:

1. Who created or received the record?
2. Which level of government controls it? (federal / state / local / court
   / legislative / police / school / special district / tribal)
3. Is there already an open-data portal or reading room?
4. Is there a public-records portal? (NextRequest / GovQA / JustFOIA /
   custom)
5. Is the requester eligible? (Some states restrict out-of-state
   requesters — flag this.)
6. What statute applies? (FOIA / state PRA / sunshine law / court rules)
7. What deadline applies? (Federal FOIA: 20 business days; state varies)
8. What fees may apply?
9. What exemptions are likely?
10. What appeal/complaint path exists?

## Outputs

This skill emits structured records the rest of Infera depends on:

- `sources.csv` — the source registry
- `entities.json` — the entity graph (nodes + typed edges + date layers)
- `custodians.md` — record-to-custodian routing tables per jurisdiction
- `obligations.csv` — statutory reporting obligations (agency, statute,
  due frequency, receiving chamber/committee, last/next expected)
- `portals.csv` — discovered public-records portals (NextRequest/GovQA/
  JustFOIA/etc.) with URL, platform, jurisdiction, scope

Refresh `sources.csv` weekly; refresh `entities.json` daily during active
investigations; rebuild `obligations.csv` when the House Clerk
"Reports to be Made to Congress" updates annually.

## The Infera principle this skill encodes

Public data is commodity. Interpretive memory is the asset. The graph is
where memory lives — the structured, dated, sourced record of which
public obligation produced which event, which event produced which
narrative, and which narrative produced which consequence. Every other
Infera skill stands on top of this one.
