# Skill 08 · Link Rot Watchdog

**Tier 3 · Maintenance**

## Purpose

Scheduled HEAD-check of every external URL in the Claims Atlas (and every cited URL elsewhere in the corpus). Produces a weekly dashboard: healthy / redirected / broken / suspicious. Makes the publication's claim of "we re-verify every cited URL on every deploy" actually true.

## What it checks

For each URL referenced anywhere in the published corpus:
- Resolves at all? (DNS + HTTP)
- Returns 200, 301, 302, 404, or other?
- If redirected, does the destination match the original intent?
- Is the destination on a different domain than originally cited?

## Output

```
WEEK OF 2026-06-02
═════════════════════════
Total URLs scanned: 87
  ✓ Healthy:        72
  ↪ Redirected:      9 (review needed)
  ✗ Broken:          4 (URGENT)
  ⚠ Suspicious:      2 (cert errors / parking pages)

BROKEN LINKS:
  - the-coast-is-moving.html · FHFA county-level HPI link returns 404
    → suggest: https://www.fhfa.gov/data/hpi/dataset/county
  - personhood-inc.html · Senate Commerce 2014 broker report moved
    → suggest: web.archive.org snapshot
  - ...

REDIRECTS REVIEW:
  - claims-atlas.html · NYU Cybersecurity for Democracy now redirects to
    landing page (was directly to RegretsReporter docs)
    → confirm new URL still supports the claim
  - ...
```

## When it runs

- Weekly on Sunday night via scheduled task
- On every site deploy (quick check, fast-fail)
- On-demand: `python3 _agent/scripts/tier3/link_rot_watchdog.py`

## System prompt

```
You are the Link Rot Watchdog. Every week, HEAD-check every
external URL referenced in the publication. Open a draft PR
with the broken-link list and suggested replacements. The
editor reviews and decides whether to relink, replace, or
remove. Never auto-update URLs; the change in cited destination
may change the meaning of the claim.

For suspicious redirects (different domain, parking page,
ad-injected landing), flag for editorial review even if the
HTTP status is 200.
```

## Pairs with

- Claims Atlas · the canonical list of URLs to check
- Connective Agent (primary) · keeps validation discipline honest over time
