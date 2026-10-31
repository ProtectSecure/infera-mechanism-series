---
name: infera-anomaly-watch
description: Compare an adapter's previous snapshot to its current snapshot and emit BREAKING-class signals when defined thresholds are tripped. Catches "this just changed dramatically" — new FEMA declaration, FEC IE filing over $1M, poll flips, high-profile case names appearing, agendas mentioning "emergency". Use after every adapter refresh cycle, or as a standalone audit on any pair of snapshots. Returns a structured anomaly list with severity, evidence pointers, and suggested moment text.
---

# Infera Anomaly Watch

The 60-second war-room polling loop produces fresh snapshots every cycle. Most
cycles are uneventful — incremental data updates, no story. Occasionally
something genuinely new arrives: a major filing, a poll flip, a court
emergency. This skill is the comparator that surfaces those moments.

## When to use

- **After every adapter refresh** — feed the previous and current snapshots in,
  get back any anomalies. Anomalies become candidate BREAKING moments.
- **For backfill** — point at two historical snapshots to see what changed
  between them. Useful for "what did we miss between 9pm and 11pm?"
- **Pre-broadcast smoke test** — run against the last 24 hours of snapshots
  and confirm the anomaly detector would have caught known events.

## When NOT to use

- For semantic drift (e.g., a candidate's stance changing). This skill is
  threshold-based; for nuance use infera-editor with explicit prompts.
- For first-time snapshots (nothing to compare against) — skip silently.

## Anomaly rules (configurable in `data/rules.json`)

The default rules cover the patterns Jared's strategic memo flagged:

- **fema-new-declaration-ga**: any new entry in FEMA disaster snapshot whose
  state is GA and `declaration_date > now - 24h`.
- **fec-large-ie-filing**: any new Schedule E filing > $1M for GA federal
  races in the last 24 hours.
- **poll-flip**: any race whose lead direction changed (R+X → D+Y or
  vice-versa) since last snapshot.
- **high-profile-case**: any new federal court docket whose case caption
  matches a watch-list (`Trump`, `Kemp`, `Warnock`, `Ossoff`, etc — configurable).
- **agenda-emergency**: any meeting agenda item whose title or summary
  contains "emergency", "special called", "executive session", "moratorium".
- **adapter-status-change**: any adapter that flipped from healthy →
  quarantined since last cycle.

Each rule has:

```json
{
  "id": "fec-large-ie-filing",
  "applies_to_adapter": "fec-spending-ga",
  "trigger": { "kind": "new_record_above_threshold", "field": "amount", "threshold": 1000000 },
  "severity": "high",
  "moment_kind": "BREAKING",
  "talent_prompt_template": "Tracking a new {amount_fmt} outside-spending filing in {race_label} — funded by {committee_name}, dropped within the last 24 hours."
}
```

Rules are pure config — adding a new rule means appending to `rules.json`,
not changing code.

## How to invoke

```bash
# Diff two snapshot files
node scripts/diff.mjs \
  --previous ../../snapshots/fec-spending-ga.previous.json \
  --current  ../../snapshots/fec-spending-ga.json

# Diff every adapter that has both .previous and current
node scripts/diff.mjs --snapshots-dir ../../snapshots/

# Custom rules file
node scripts/diff.mjs --rules ./data/rules.json --previous a.json --current b.json
```

Output (stdout JSON):

```json
{
  "compared_at": "2026-05-13T17:30:00Z",
  "previous_snapshot": "fec-spending-ga.previous.json",
  "current_snapshot": "fec-spending-ga.json",
  "anomalies_found": 2,
  "anomalies": [
    {
      "rule_id": "fec-large-ie-filing",
      "severity": "high",
      "moment_kind": "BREAKING",
      "summary": "New $2.4M IE filing in GA-06 by Save GA PAC",
      "evidence": {
        "field": "amount",
        "previous_value": null,
        "current_value": 2400000,
        "record_path": "filings[847]"
      },
      "talent_prompt": "Tracking a new $2.4M outside-spending filing in GA-06 — funded by Save GA PAC, dropped within the last 24 hours.",
      "source_url": "https://www.fec.gov/data/disbursements/?committee_id=..."
    }
  ]
}
```

## Exit codes

- `0` — no anomalies (or first run with no `previous`).
- `1` — script error.
- `2` — anomalies found at severity `high` (cron should alert, war-room should
  surface BREAKING moments).
- `3` — anomalies found at severity `medium` only (log and surface in WIRE LOG
  but don't elevate visually).

## Wiring into the hydrator

After each adapter cycle, the hydrator can:

1. Move the previous `<adapter>.json` to `<adapter>.previous.json` before
   writing the new snapshot.
2. Run `node skills/infera-anomaly-watch/scripts/diff.mjs --previous … --current …`.
3. If exit code 2, parse the anomalies JSON and convert each into a BREAKING
   moment via the existing `pushMoment()` wrapper.

That's the whole BREAKING pipeline. ~30 lines of glue code in the hydrator.

## Files

- `SKILL.md` — this file
- `scripts/diff.mjs` — the comparator
- `data/rules.json` — anomaly rule definitions
