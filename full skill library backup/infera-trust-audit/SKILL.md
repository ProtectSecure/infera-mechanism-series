---
name: infera-trust-audit
description: Walk every citation URL visible on the war-room page (or in any war-room snapshot JSON) and HEAD-check that it still resolves to live content. Catches link rot — moved sources, dead domains, 404s, cert errors, redirect chains pointing to ad pages. Use whenever you need to verify the trust contract is still intact, before going live, after a deploy, or on a schedule. Returns a structured report of healthy / redirected / broken / suspicious URLs grouped by source tier.
---

# Infera Trust Audit

The Infera trust contract says every visible claim cites a public URL. That
guarantee is only as good as the URLs — if a citation rotted last week and
nobody noticed, the contract is silently broken.

This skill walks every citation URL in a war-room snapshot (or a custom URL
list) and HEAD-checks them in parallel, returning a structured report.

## When to use

- **Before going live for a broadcast.** Run as part of pre-air checks.
- **After a deploy.** Catch citations that broke when an adapter changed
  format.
- **On a schedule (hourly or daily).** Catch organic rot over time.
- **When investigating a "this looks wrong" complaint.** Quickly verify the
  cited source is still saying what we claim it is.

## When NOT to use

- For URLs from sources known to block HEAD requests (some `.gov` sites do —
  the script handles this with a GET fallback but it's slower).
- For paywalled content (returns 200 but content is unverifiable — flagged
  separately).
- For verifying *content* match (this is a liveness check, not a semantic one
  — for content drift use infera-anomaly-watch).

## How to invoke

```bash
# Audit a snapshot file (extracts every URL it contains)
node scripts/audit-urls.mjs --snapshot ../../snapshots/war-room-state.json

# Audit a flat URL list
node scripts/audit-urls.mjs --file urls.txt

# Audit URLs from stdin
cat urls.txt | node scripts/audit-urls.mjs --stdin

# Just check a single URL
node scripts/audit-urls.mjs https://www.fec.gov/data/

# Configure parallelism (default 8) and per-request timeout (default 10s)
node scripts/audit-urls.mjs --snapshot snap.json --concurrency 16 --timeout 15000
```

Output (stdout JSON):

```json
{
  "audited_at": "2026-05-13T17:00:00Z",
  "total": 247,
  "healthy": 230,
  "redirected": 11,
  "broken": 4,
  "suspicious": 2,
  "duration_ms": 8340,
  "results": [
    {
      "url": "https://www.fec.gov/data/disbursements/",
      "status": 200,
      "final_url": "https://www.fec.gov/data/disbursements/",
      "redirect_chain_length": 0,
      "response_time_ms": 145,
      "verdict": "healthy"
    },
    {
      "url": "https://old.opensecrets.org/api/",
      "status": 410,
      "final_url": "https://old.opensecrets.org/api/",
      "verdict": "broken",
      "note": "API permanently retired April 2025"
    }
  ]
}
```

## Verdict definitions

- **healthy** — 2xx, final URL on same domain as original, response time
  under threshold.
- **redirected** — final URL differs from original. Common and usually fine
  (`http→https`, trailing-slash normalization), but flagged so a human can
  glance at the new destination.
- **broken** — 4xx/5xx, network error, cert error, or timeout.
- **suspicious** — 2xx but final URL on a different parent domain (possible
  parking page or hijack), or response body suggests an error page despite
  200 status.

## Exit codes

- `0` — all URLs healthy or harmless redirects.
- `1` — script error (bad input, can't read snapshot).
- `2` — one or more URLs `broken` (cron should alert).
- `3` — one or more URLs `suspicious` but none broken (cron should log).

## Schedule recommendation

- **Pre-air check** before any broadcast: blocking run, fail the deploy if
  exit code 2.
- **Hourly cron** during normal operation: log exit code 2/3, alert on
  threshold (e.g., >5 broken in one run = real rot).
- **Daily diff** against yesterday's report: surface URLs that changed
  status (healthy → broken is more interesting than always-broken).

## Files

- `SKILL.md` — this file
- `scripts/audit-urls.mjs` — the auditor
