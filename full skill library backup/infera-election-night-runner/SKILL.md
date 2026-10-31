---
name: infera-election-night-runner
description: Master orchestration skill for live election nights (May 19 GA primary, Nov 3 general, and any rehearsal). Manages adapter cadence (sub-minute polling on Clarity results, 2-min on related adapters, normal cadence on everything else), race-call decision logic, dress-rehearsal vs live mode switching, BREAKING moment elevation, and post-mortem snapshot capture. Use exclusively in the runup to and during election broadcasts — this skill changes the polling contract of the whole system.
---

# Infera Election-Night Runner

The orchestrator that wraps everything else for election nights. Normal
operation is 60-second polling on most adapters. Election night requires
sub-minute polling on the results feed, accelerated polling on related
adapters, race-call decision logic, BREAKING moment elevation, and a
post-mortem capture pass.

This skill exists because election-night rules are sufficiently different
from normal rules that bolting them onto the regular hydrator is brittle.
The runner takes over the cadence and the gating until called off.

## Modes

| Mode | When | Behavior |
|---|---|---|
| `rehearsal-historical` | Days before air, against 2024 results | Replays a known dataset at configurable speed; verifies the pipeline; produces a dress-rehearsal report. |
| `rehearsal-live-shadow` | Hours before air | Polls the real Clarity feed at normal cadence but does NOT publish moments to the public surface. Verifies adapter health. |
| `live-pre-polls-close` | Polls open through final close | 2-min cadence on results, 1-min on FEC/news, 60-sec on social signals. |
| `live-results-trickle` | Polls close through last reported precinct | Sub-minute on results (30-sec), 1-min on everything else. BREAKING moments elevated visually. |
| `live-calling` | Major races being called | Race-call logic active; calls require N-of-M decision thresholds met for K consecutive cycles. |
| `post-mortem` | Closes after final call | Captures every snapshot, every moment, every WIRE LOG entry. Runs calibration scorer against final outcomes. |

The runner moves through these modes in order (or can be manually advanced
by the producer).

## Race-call decision logic

A race transitions `leading` → `called` when ALL of:

- AP / Decision Desk HQ / NBC News Decision Desk (any 2 of 3) have called.
- OR: > 95% of expected ballots reported AND lead margin > expected
  precinct-residual-error.
- AND: no challenger has issued a non-concession statement in the last
  10 minutes.
- AND: producer hasn't manually flagged the race as "hold".

Configurable per-race overrides in `data/race-call-config.json`. Some races
(e.g., known recount candidates) start in `hold` mode.

## What it requires from the rest of the system

- An `election-night-ga` adapter that pulls from
  `results.enr.clarityelections.com` — runner doesn't replace this, it
  drives it.
- The `infera-anomaly-watch` skill present, so BREAKING moments can fire.
- The `infera-source-classifier` data, for citation-tier checks on
  any incoming wire stories.
- A way to write to the war-room MOMENT array (the existing
  `pushMoment()` wrapper is fine).

## What it does NOT do

- It doesn't ingest data itself. Adapters do that.
- It doesn't decide editorial content. infera-editor and
  infera-convergence-narrator do that.
- It doesn't validate citations. infera-trust-audit does that.

## Hard rules

1. **Cadence increases are reversible.** If polling rate ramps up but the
   adapter starts erroring, ramp it back down — don't just retry harder.
2. **Race calls are sticky.** Once a race is `called`, the runner won't
   unflip it without explicit producer action, even if subsequent data
   suggests a closer race.
3. **Dress rehearsal must replay end-to-end at least once before air.** No
   election night without a confirmed dress-rehearsal pass.
4. **Post-mortem runs no matter what.** Even if the broadcast is cut short,
   the runner captures the last 6 hours of snapshots so calibration is
   possible later.

## When to use

- Days before air: `mode: rehearsal-historical` against a known prior
  election (2024).
- Hours before air: `mode: rehearsal-live-shadow`.
- Air: progresses live-pre-polls-close → live-results-trickle →
  live-calling.
- After air: `mode: post-mortem` and exit.

## When NOT to use

- Normal day-to-day operation. The regular 60-second hydrator handles
  that.
- For mid-cycle data refreshes outside election nights.

## How Claude should execute

This skill is an orchestrator, so its "execution" is mostly issuing
instructions to other components:

1. Read `data/runner-state.json` (current mode, last transition time).
2. Decide whether to transition mode based on time-of-day, polls-closing
   triggers, or producer commands.
3. Update the adapter cadence config (the hydrator reads this file each
   tick).
4. If in a `live-*` mode, after each cadence tick:
   - Trigger `infera-anomaly-watch` against the latest snapshot pair.
   - If high-severity anomalies found, push BREAKING moments.
   - Evaluate any race-call transitions using the rules above.
5. If in `post-mortem`, run the calibration scorer over every snapshot
   captured in the live window, write the report to
   `reports/election-night-{date}-postmortem.md`.

## State file

`data/runner-state.json`:

```json
{
  "mode": "rehearsal-historical",
  "last_transition": "2026-05-13T18:00:00Z",
  "rehearsal_pass_count": 0,
  "race_states": {
    "GA-SEN-2026": { "status": "not_started", "call_holds": [] },
    "GA-GOV-2026": { "status": "not_started", "call_holds": [] }
  }
}
```

## Pre-air checklist (the runner blocks until all true)

- [ ] Dress rehearsal completed end-to-end within last 48 hours.
- [ ] `election-night-ga` adapter responding with valid Clarity data.
- [ ] `infera-trust-audit` last run shows zero broken citations.
- [ ] `infera-anomaly-watch` rules file has been reviewed this week.
- [ ] At least one producer has authenticated as the override-authorized user.

## Files

- `SKILL.md` — this file
- `scripts/runner.mjs` — to be written; the cadence + state-machine driver
- `data/runner-state.json` — current orchestrator state
- `data/race-call-config.json` — per-race call thresholds and holds
- `data/cadence-config.json` — adapter polling rates per mode
