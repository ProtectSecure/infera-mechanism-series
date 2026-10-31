---
name: infera-platform-discoverer
description: Given a GA county or city name, probe all known meeting-platform vendors (Granicus, Legistar, CivicClerk, CivicPlus, Municode, IQM2, BoardDocs, Simbli, eScribe, Swagit, NovusAgenda) in parallel and emit a config patch identifying which platform that jurisdiction uses. Use when adding a new GA jurisdiction to the coverage system, or when an existing jurisdiction's platform appears to have changed. Replaces manual subdomain hunting — what used to be 30 minutes of clicking is one prompt.
---

# Infera Platform Discoverer

The manual platform-discovery sweep we did for the 7-county pilot found that
GA jurisdictions use 8+ distinct meeting platforms with no central registry.
Onboarding a new jurisdiction requires probing each platform's URL pattern
to see which one responds. This skill automates that.

## What it probes

For each candidate platform, the skill tests common URL patterns derived from
the jurisdiction's name (and known variants):

| Platform | URL pattern(s) tested |
|---|---|
| Granicus | `https://<slug>.granicus.com/ViewPublisher.php?view_id=1` |
| Legistar | `https://<slug>.legistar.com/Calendar.aspx` |
| CivicClerk | `https://<slug>.civicclerk.com/`, `https://<slug>.portal.civicclerk.com/` |
| CivicPlus | `https://<official_site>/AgendaCenter`, `https://<slug>.civicengage.com/` |
| Municode | `https://meetings.municode.com/?cc=<UPPER_SLUG>` |
| IQM2 | `https://<slug>.iqm2.com/Citizens/calendar.aspx` |
| BoardDocs | `https://go.boarddocs.com/ga/<short_slug>/Board.nsf/Public` |
| Simbli/eBoard | `https://meetings.eboardsolutions.com/Meetings.aspx?S=<numeric_id>` |
| eScribe | `https://pub-<slug>.escribemeetings.com/` |
| Swagit | `https://<slug>.swagit.com/` |
| NovusAgenda | `https://<slug>.novusagenda.com/agendapublic/` |

Slug variants tried:
- raw county name (`cobb`, `cobbcounty`, `cobbcountyga`, `cobbga`)
- city variants if applicable (`marietta`, `mariettaga`)
- common GSA acronyms (`gcps` for Gwinnett County Public Schools)

## Input

- Jurisdiction name (county or city)
- Optional jurisdiction type hint (`county_commission` | `board_of_education`
  | `city_council` | `planning_zoning`) — narrows slug heuristics

## Output

```json
{
  "jurisdiction": "Cobb County",
  "jurisdiction_type": "county_commission",
  "probed_at": "2026-05-13T18:00:00Z",
  "platforms_detected": [
    {
      "platform": "CivicClerk",
      "url": "https://cobbcoga.portal.civicclerk.com/",
      "status": 200,
      "platform_account": "cobbcoga",
      "confidence": "high",
      "evidence": "Returned 200 with civicclerk-signature HTML markers"
    }
  ],
  "platforms_not_detected": [
    "Granicus", "Legistar", "IQM2", "BoardDocs", "Simbli", "eScribe", "Swagit", "Municode", "NovusAgenda"
  ],
  "suggested_config_patch": {
    "fips": "13067",
    "county": "Cobb",
    "body": "county_commission",
    "platform": "CivicClerk",
    "platform_account": "cobbcoga",
    "meeting_page": "https://cobbcoga.portal.civicclerk.com/",
    "discovery_confidence": "high"
  }
}
```

## Hard rules

1. **All slug variants tested in parallel.** Don't serialize — the total
   probe should complete in under 5 seconds wall-clock.
2. **HEAD-then-GET fallback.** Some platforms reject HEAD. If HEAD fails
   for a server reason (not 404), try GET on a small range.
3. **Confidence based on HTML markers.** A 200 status isn't enough — the
   page must contain platform-specific markers (e.g., Granicus's
   ViewPublisher form, Legistar's CalendarMonthView script, CivicClerk's
   `data-app` attribute). Without those markers, confidence is "medium" or
   "low".
4. **Multi-platform detection.** Some jurisdictions use multiple platforms
   (e.g., agendas on Granicus, video on Swagit). Surface all matches, don't
   pick one.
5. **Slug generation must respect known GA quirks.**
   - "DeKalb" → both `dekalb` and `dekalbcountyga`
   - "Macon-Bibb" → `macongov`, `maconbibb`, `bibb`
   - "Athens-Clarke" → `athensclarkecounty`, `accgov`
   - Consolidated governments need both name variants tested.

## When to use

- A new GA county or city needs to be onboarded into the meeting-coverage
  layer.
- An existing jurisdiction's adapter has been failing for >24h — check if
  the platform changed.
- Sanity-check after a deploy: re-probe a small sample of jurisdictions to
  confirm no silent platform migrations.

## When NOT to use

- For platforms outside the meeting-coverage scope (CMS detection,
  campaign-finance platforms, etc.).
- For sub-municipal bodies that don't have their own platform — those
  inherit from the parent jurisdiction.

## How Claude should execute

1. Build the slug variant list using the rules in this file plus
   `data/slug-rules-ga.json` (which the user should populate with
   jurisdiction-specific overrides as they accumulate).
2. For each (platform × slug variant) pair, construct the probe URL.
3. Issue HEAD requests in parallel (concurrency ~16). Fall back to GET on
   405/501.
4. For 200 responses, fetch a small body chunk and check for the
   platform-specific markers listed in `data/platform-markers.json`.
5. Score each detection: marker present + 200 = high; 200 only = medium;
   redirect to a relevant domain = medium; nothing = no detection.
6. Emit the structured result above.

## Wiring

```bash
# Programmatic — write the result to a discovery file the hydrator can pick up
node skills/infera-platform-discoverer/scripts/probe.mjs \
  --jurisdiction "Athens-Clarke" \
  --type county_commission \
  > snapshots/discovery/13059-athens-clarke.json
```

Or interactively in Claude: "discover the meeting platform for Athens-Clarke
County" and the skill loads and runs.

## Files

- `SKILL.md` — this file
- `scripts/probe.mjs` — to be written; the probe runner (parallel HEAD/GET
  + marker check)
- `data/slug-rules-ga.json` — known slug overrides per jurisdiction
- `data/platform-markers.json` — HTML markers per platform (regex set)
