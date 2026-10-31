---
name: infera-sealed-document-watcher
description: Anticipates sealed-to-unsealed transitions, gag order expirations, and scheduled disclosure events by tracking docket entries with sealing orders, protective orders with sunset clauses, suppression orders, statutory unsealing schedules, and settlement disclosure phasing. The pre-event mirror of infera-document-exposure-radar — that skill catches unsealing events when they happen; this skill anticipates them before they happen, producing a forward calendar of likely future exposure events. Use to build the near-future disclosure watchlist, to pre-position interpretive infrastructure for high-coverage cases, and to detect when an expected unsealing fails to occur (which is itself news). Bound by RULES-AND-METHODOLOGY.md regarding active-protective-order content and chain of custody.
---

# Infera Sealed Document Watcher

`infera-document-exposure-radar` catches the unsealing event when it
happens. This skill mirrors that capability backward in time:
identify *when* a seal will lift, *what* will likely become public,
and *which* upcoming events are anchored to that disclosure.

The premise is simple. Most seals, gag orders, and protective orders
have a structure: a duration, a sunset clause, a triggering event
(case resolution, settlement finalization, statutory expiration), or
an ongoing review schedule. That structure is itself frequently
public, even when the sealed content is not. Mining it produces a
calendar.

## What this catches

- **Protective orders with sunset clauses.** Many civil protective
  orders specify a duration ("for the pendency of this litigation,"
  "for five years from entry," "until the resolution of all
  appeals"). When the triggering condition is satisfied, the
  protective order expires by its own terms — though enforcement
  varies.
- **Court orders with explicit unsealing dates.** Some sealing
  orders specify an unsealing date or a review date.
- **Gag orders with expiration.** Criminal case gag orders
  typically have a defined termination event (trial start, verdict,
  sentencing, end of trial coverage).
- **Statutory unsealing schedules.** Grand jury materials,
  presentencing reports, certain juvenile records, and certain
  national security materials have statutory unsealing schedules
  (often 30+ years, but variable). Note: routine processing of
  these materials is governed by the out-of-scope categories in
  `RULES-AND-METHODOLOGY.md` Section III.
- **Settlement disclosure phasing.** Settlements frequently mandate
  phased disclosure: some terms public immediately, certain
  exhibits sealed for N years, monitor reports due quarterly, final
  summary reports due at termination.
- **Sealing review schedules.** Some jurisdictions require periodic
  review of all sealed records. Those reviews are themselves
  scheduled events.
- **Expiring NDAs in public-interest litigation.** When a
  public-interest case settles with an NDA that has a defined term,
  the expiration date is calculable.
- **Monitorship report deadlines.** DOJ, CFTC, SEC, and state AG
  consent decrees often impose periodic monitor reports with
  scheduled public-release dates.

## When to use

- Daily, as part of the Overnight Desk / Morning Lock cycle, to
  refresh the seven-day, thirty-day, and ninety-day watchlists.
- When a new high-coverage case is opened — extract sealing-order
  structure immediately and add to the watchlist.
- When a case nears resolution — re-scan all protective orders for
  triggering-condition language.
- When a settlement is announced — extract all phased-disclosure
  obligations.
- When a statutory unsealing window approaches — pre-position
  interpretation for likely disclosures.
- When an *expected* unsealing fails to occur — that is itself an
  exposure-class event.

## When NOT to use

- For interpretation of unsealed content (use
  `infera-signal-interpretation` and the appropriate domain
  extension).
- For detection of unsealing when it happens (use
  `infera-document-exposure-radar`; this skill anticipates, that
  one catches).
- For circumventing in-force protective orders. This skill watches
  the public calendar; it does not solicit, request, or process
  sealed content.

## Data sources

| Surface | What to extract |
|---|---|
| PACER / CourtListener / RECAP | docket entries with sealing-order text, protective orders, motions to seal, motions to unseal |
| State court portals | same, for state-level cases |
| State court rules | jurisdictional unsealing schedules |
| Federal statutes | unsealing rules under FRCrP 6(e), FRCrP 32(e), 18 USC §3500, 5 USC §552(a)(2), etc. |
| Settlement databases | public-interest litigation settlements with disclosure terms |
| Public Access to Court Electronic Records | docket-level metadata |
| State AG offices | consumer-protection settlements with monitor-report schedules |
| Federal monitorship reports | scheduled monitor disclosures (DOJ, CFTC, SEC, etc.) |
| FOIA litigation dockets | Vaughn index unsealing schedules |
| Local clerk websites | jurisdiction-specific sealed-record review schedules |
| GAO and OIG reports | references to scheduled future disclosures by other parties |

## Detection method per surface

**PACER / CourtListener / RECAP.** Scan new docket entries for
sealing-order vocabulary: *protective order, sealing order, motion
to seal, order granting motion to seal, sealed pursuant to,
protective order entered, confidentiality order, gag order,
restraining order on extrajudicial statements, agreed protective
order, stipulated protective order.* When found, fetch the order
text (if available in RECAP) and extract:

- duration or expiration condition
- specific documents covered
- sunset triggering event
- review date if specified
- attorney's-eyes-only vs broader scope
- modification history

**Settlement filings.** Scan for disclosure-related sections:
*public reporting, monitor reports, periodic reporting, sunset,
termination, confidentiality period, surviving obligations.*
Extract calendar of future disclosure events.

**Statutory schedules.** Maintain a reference table of federal and
state statutes governing automatic unsealing. For each known sealed
matter, compute the statutory unsealing date.

**Monitorship reports.** Many consent decrees mandate periodic
monitor reports filed publicly. Build a reference table of known
active monitorships with their reporting cadence. Pre-position
coverage for each scheduled report.

## Output

For every detected scheduled-disclosure event, emit:

- `event_id`
- `case_or_matter_id`
- `seal_type` — (protective_order / gag_order / grand_jury /
  presentencing / settlement_phase / monitor_report / statutory /
  nda_expiration / review_cycle)
- `scheduled_or_estimated_disclosure_date`
- `confidence` — high (explicit calendar date), medium (triggering
  event likely to occur on schedule), low (speculative)
- `triggering_condition` — literal text or computed condition
- `expected_content_category` — category of material that will
  become public (NOT the content itself; the seal is still in
  force at the time of this skill's output)
- `linked_entities` — parties, counsel, judges, agencies
- `coverage_gravity_estimate` — pass-through to
  `infera-coverage-gravity-scoring`
- `analog_match` — pass-through from `infera-why-now-engine` if
  available
- `failure_to_unseal_alert_date` — date after which non-unsealing
  is itself a story
- `out_of_scope_category_match` — flag if the underlying matter
  intersects any absolute out-of-scope category from
  `RULES-AND-METHODOLOGY.md` Section III; if so, the skill
  observes the calendar but the eventual unsealed material is
  not processed downstream

Aggregate into rolling watchlists:

- `disclosure-watchlist-next-7-days.md`
- `disclosure-watchlist-next-30-days.md`
- `disclosure-watchlist-next-90-days.md`
- `disclosure-watchlist-long-horizon.md` (90 days to multi-year)

## "Failure to unseal" as its own signal

This skill produces a secondary output: a list of *expected*
unsealings that did not occur on schedule. When the date passes and
the document does not appear:

- check whether the underlying triggering condition occurred
- check for extension orders (renewed protective order, continued
  gag order, sealed motion to extend)
- check for sealed activity on the docket suggesting the matter
  remains active
- escalate as `failure-to-unseal-alert`

The pattern of which seals get extended, by which judges, in which
districts, in which case types is itself a story across enough
events. This is a longitudinal output: per-district and per-judge
extension rates, compared to peers.

## Failure modes

**Misreading sunset language.** "For the pendency of this
litigation" can mean different things in different jurisdictions.
Conservative interpretation: assume the latest plausible expiration
date.

**Sealed orders.** Some protective orders are themselves sealed.
Those cannot be scanned. Track them via docket-entry metadata only.

**Calendar drift.** Cases settle, dismiss, or stall on
unpredictable schedules. Re-validate the triggering-condition
status of every watchlist entry weekly.

**Confirmation bias on failure-to-unseal.** A seal not lifting on
schedule may be entirely innocent (motion practice, administrative
delay, ongoing settlement negotiations). Apply
`infera-blind-spot-auditor` before treating non-unsealing as news.

**State court coverage gaps.** State court electronic access is
uneven. Build the federal pipeline first; expand to states as
resources permit, starting with the largest population centers and
the states with the strongest open-courts statutes (e.g., Florida,
Washington, Texas).

**Over-watchlist.** A 90-day watchlist with thousands of entries
is operationally useless. Apply
`infera-coverage-gravity-scoring` aggressively — rank, don't list.

**Privacy intrusion via aggregation.** Aggregating sealed-case
metadata across many cases involving the same party can produce a
privacy-implicating profile even when no individual sealing order
is improper. Apply the same aggregation discipline used elsewhere
in Infera: surface patterns about institutions, not individuals.

## The Infera principle this skill encodes

Disclosure is rarely random. It is scheduled, ordered, statutorily
mandated, or contractually committed — and the schedule is, often,
itself public. The newsroom that reads the schedule has the story
before the disclosure happens. Watching the calendar of secrecy is
a different posture than waiting for revelations.
