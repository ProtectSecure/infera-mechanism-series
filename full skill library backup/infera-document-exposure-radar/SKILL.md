---
name: infera-document-exposure-radar
description: Detect documents that have just become public — newly unsealed court filings, newly declassified archival records, FOIA releases, less-redacted/reprocessed versions, and silently modified or withdrawn official documents. Watches PACER/RECAP, NARA National Declassification Center release lists, the National Archives Catalog, agency FOIA reading rooms (FBI Vault, CIA Reading Room, NSA/DIA, State/FRUS, ODNI), Federal Register Public Inspection, GovInfo, GAO, Oversight.gov, MuckRock, and DocumentCloud. Tags exposure type (unsealed / declassified / unredacted / reprocessed / silently modified / withdrawn / newly digitized / newly indexed) and computes hash/page-count/file-size deltas to catch quiet changes. Use whenever Infera needs to know what just became visible — and crucially, to ask "why now?" of every exposure.
---

# Infera Document Exposure Radar

Most newsroom alert tools catch headlines. Infera's edge is catching
the moment a document becomes visible — sometimes weeks before any
outlet notices. This skill is the dragnet for that moment.

The job is not just to find new documents. It is to detect:

- newly **unsealed** court records
- newly **declassified** archival records
- newly **unredacted** / **less-redacted** versions of previously
  released records
- newly **reprocessed** FOIA productions
- **silently modified** official documents (replacement PDFs, removed
  pages, new redactions where none existed)
- **withdrawn** documents (rules, public-inspection items, FRUS
  materials, agency releases)
- newly **digitized** or newly **indexed** archival material
- documents newly **cited** in a hearing, court filing, GAO/OIG
  report, or news story

Each of these has a different meaning and a different newsroom value.

## When to use

- Daily, as part of the Overnight Desk and Morning Lock cycles.
- On any monitored court case (poll docket every 30–60 minutes during
  active windows).
- During SCOTUS opinion windows (late May–June: poll every 15 min).
- When a hearing is scheduled that references documents — pre-poll the
  underlying FOIA reading room.
- When Infera detects a "why now?" gap (an event with no obvious
  trigger) — search exposure radar for a matching recent release.
- When the National Declassification Center publishes a quarterly
  release list.

## When NOT to use

- For interpreting documents (use `infera-signal-interpretation` or
  `infera-investigative-narrative`).
- For routing a FOIA request you want to file (use the routing logic
  in `infera-public-infrastructure-graph`).
- For pure background research (use direct search).

## Release surfaces (the watch list)

| Type | Primary places |
|---|---|
| Newly unsealed court records | PACER, CourtListener/RECAP, state court portals, clerk pages, DocumentCloud mirrors |
| Declassified archival | NARA NDC release lists, National Archives Catalog/API, presidential libraries |
| Agency FOIA releases | agency FOIA libraries, FBI Vault, CIA Reading Room, NSA FOIA, DIA Electronic Reading Room, State FOIA / FRUS, ODNI / Intel.gov |
| Less-redacted versions | agency FOIA libraries, FOIA litigation dockets, MuckRock, DocumentCloud, National Security Archive |
| Upcoming regulatory docs | Federal Register Public Inspection, Federal Register API |
| Congressional report releases | GovInfo, committee sites, Congress.gov, House/Senate repositories |
| Oversight reports | GAO, Oversight.gov, agency OIG sites |
| Court opinions / orders | court websites, CourtListener, PACER, SCOTUS, state appellate sites |

## Detection method per surface

**PACER / CourtListener / RECAP.** Monitor docket-entry text for the
unsealing vocabulary: *unsealed, order unsealing, redacted version,
sealed document, motion to unseal, sealing order, access to sealed
document, transcript unsealed, exhibit unsealed, superseding indictment
unsealed, search warrant unsealed, affidavit unsealed, protective order
modified, document previously filed under seal.* When a known sealed
docket entry transitions to a downloadable document, fire an exposure
event.

**NARA NDC release lists.** Diff the latest quarterly release list
against the prior one; pull every newly added entry and tag with the
originating agency, date range, and material type (textual / moving
image / photographic).

**Agency FOIA reading rooms.** Snapshot the index page weekly. Diff for
new entries, new subject pages, replaced PDFs, modified PDFs, new
"proactive disclosure" items, FOIA-Improvement-Act-mandated high-
public-interest releases.

**Federal Register Public Inspection.** Poll the public-inspection page
every 30 minutes during business hours. Tag every item with its
publication date and flag tomorrow's items. Watch for withdrawals
between public inspection and actual publication.

**FRUS and State Department history.** Crawl FRUS volume listings
monthly. Compare against archived snapshots (Wayback / archive.today)
to catch silent removals — the 2025 Able Archer removal precedent
matters.

## Hash + structure tracking (the silent-change catcher)

For every important PDF/text document, store:

- source URL
- original byte hash (SHA-256)
- extracted-text hash
- page count
- file size
- publication date
- last-modified HTTP header
- OCR text (full)
- redaction-area estimate (image/PDF analysis)
- named entities
- version label assigned by Infera

Then alert when:

- PDF hash changes
- page count changes
- file size changes
- text appears where black boxes used to be (redaction-area decrease)
- a newer "redacted" or "unredacted" version appears at the same URL
- prior URL disappears (404 / soft 404)
- archived version differs from current

This is how Infera catches quiet replacements that no public release
list will ever announce.

## Exposure tags (taxonomy)

Every exposure event is tagged with one or more of:

- `newly-released` — first public availability
- `newly-declassified` — formal declassification completed
- `newly-unsealed` — court order lifted seal
- `newly-unredacted` — less-redacted version released
- `reprocessed` — agency reissued production
- `replacement-version` — same URL, different content
- `silently-modified` — content changed without official notice
- `withdrawn` — document removed from public access
- `newly-digitized` — older paper record now scanned
- `newly-indexed` — existing digital record now searchable
- `newly-mirrored` — third party (NSArchive / DocumentCloud / news)
  published a copy
- `newly-cited` — appears in a hearing / filing / report / news story

A newly digitized 1970s record is not the same as an unsealed indictment
yesterday. Both can become news, but their `why-now` logic is different.

## "Why now?" enrichment

Every exposure event should attempt to answer:

- Why was this released now?
- Court order? FOIA litigation? MDR appeal? Statutory deadline?
  Congressional pressure? Anniversary? Investigation? Related hearing?
  Related lawsuit?
- What changed from prior version?
- Who requested it?
- Was it previously withheld? Under what exemption?

Pass the event to `infera-why-now-engine` for historical analog
matching and probability scoring.

## Outputs

- `exposure-log-YYYY-MM-DD.csv` — every exposure event, structured
- `exposure-deltas.md` — narrative summary of the day's exposure events
- `silent-changes-flagged.md` — high-priority list of replacement
  PDFs, withdrawals, redaction shifts (these are usually the highest-
  signal events on any given day)
- `exposure-to-event-bridge.md` — map of newly exposed documents to
  upcoming Tomorrow Board events that reference the same entities

## Failure modes

- **Hash false positives from CMS resaves.** Many agency CMSes resave
  PDFs nightly without changing content. Diff extracted text, not just
  byte hash, before alerting.
- **PACER paywall.** Many sealed-to-unsealed transitions live behind
  PACER fees. Use RECAP to mirror documents already paid for by
  others; flag known sealed entries for manual fetch when budget allows.
- **OCR drift.** OCR text changes when the OCR engine changes. Lock
  the engine version and re-baseline only on intentional upgrades.
- **Anchor on the wrong URL.** Agency reading rooms often rotate URLs
  on redesign. Snapshot the canonical document, not the listing-page
  URL.

## The Infera principle this skill encodes

A document can be created in 1975, declassified in 2005, digitized in
2026, cited in a lawsuit in 2027, and become news in 2028. Each of
those is a different artifact. The Exposure Radar preserves all date
layers separately so Infera can ask the only question that matters:
**why is this becoming visible now, and what upcoming event makes it
matter?**
