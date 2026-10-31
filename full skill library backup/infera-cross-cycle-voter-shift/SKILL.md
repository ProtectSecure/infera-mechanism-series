---
name: infera-cross-cycle-voter-shift
description: Documents aggregate voter persuasion across the 2018 → 2020 → 2022 → 2024 → 2026 election cycles using precinct-level results joined to demographic overlays and ballot-type breakdowns. Surfaces swing precincts, ticket-splitting rates, and demographic cells with statistically significant shift — while strictly refusing to make individual-voter claims (the ecological fallacy guard is non-negotiable). Use when investigating "are voters changing their minds?", building a swing-precinct watch list for election night, or assessing whether a candidate's coalition has actually moved or just turned out differently.
---

# Infera Cross-Cycle Voter Shift

The question every campaign asks and most outlets botch: "are voters
changing their minds?" The honest answer is almost never knowable at
the individual level from public data. What IS knowable, with care, is
aggregate behavior change in precincts and demographic cells — and that
is enough to drive serious coverage if you stay disciplined about the
language.

## The non-negotiable ecological fallacy guard

You cannot infer individual voter intent change from aggregate precinct
results. A precinct that went 60-40 Republican in 2020 and 55-45 in
2024 has NOT necessarily seen any voter change their mind. The shift is
consistent with:

- Different voters turning out (mobilization or demobilization)
- Different voters moving in or out of the precinct
- The same voters voting differently (actual persuasion)
- Any combination of the above

This skill produces aggregate findings only. The narration MUST use
aggregate language. "The precinct shifted" is fine. "Voters here changed
their minds" is not, unless backed by a panel survey, which precinct
results are not.

## Input

- `openelections-ga` precinct-level results per cycle (2018, 2020, 2022,
  2024, 2026)
- ACS 5-year demographic overlay per precinct (Census ACS API)
- Ballot-type breakdown (early in-person / absentee / election day)
  when available
- Statewide totals per cycle for drift comparison
- Optional: county-level voter file delta (registrations added /
  removed since prior cycle) when source permits

## Output

```markdown
## Cross-cycle shift: {jurisdiction}

### Headline shift
{e.g., "Precinct GA-067-014 swung 11.4 points D in the federal house
race from 2022 to 2024, vs statewide drift of 2.1 points D. Demographic
overlay: 38% under-35, 22% Black, 41% college-educated. Cohort-similar
precincts statewide drifted 4.8 points D — this precinct moved 6.6 points
beyond the cohort baseline."}

### Methodology guard
- Aggregate behavior, not individual persuasion.
- Statewide drift subtracted to isolate local-specific shift.
- Demographic cohort baseline applied.
- Turnout change reported alongside vote-share change (cannot interpret
  one without the other).

### Swing-precinct ranking (top 25 in jurisdiction)
| Precinct | 2018 → 2024 shift | Adjusted vs cohort | Turnout Δ | Notable demos |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |

### Ticket-splitting rate
- 2024 ballots where voter split between Senate D and POTUS R (or
  reverse), per precinct.
- Compared to 2020 and 2022 baselines.
- Note: ticket-splitting is computed from ballot-level summary tables
  when reported, otherwise estimated from precinct-level office-by-office
  comparison with confidence intervals.

### Demographic-cell drift
| ACS cohort | 2018 → 2024 vote-share shift | Confidence | Caveats |
|---|---|---|---|
| College-educated white women | ... | medium | sample size |
| Non-college white men | ... | high | |
| Black voters 18-34 | ... | medium | low precinct N |

### What this means and does not mean
- {plain-language read with the ecological-fallacy guard restated}
- {what would need to be true for the individual-persuasion claim to hold:
  panel data, exit polls with precinct-level cross-tabs, voter file
  cohort tracking — none of which this skill produces}

### Falsification check
- Statewide drift in same direction by same magnitude? → finding is
  consistent with a statewide tide, not a local shift.
- Cohort baseline already drifting? → finding is consistent with
  demographic-cohort change, not precinct-specific change.
- Low N precincts in the tail? → mark as "noise candidate," not "shift."
```

## Hard rules

1. **Ecological fallacy is the headline guard.** No claim about
   individual voter persuasion from precinct data, ever. The narrative
   layer (`infera-convergence-narrator`) will be asked to honor this.
2. **Drift adjustment is mandatory.** A precinct's raw shift means
   nothing without comparison to the statewide drift in the same race.
3. **Turnout and vote share are two variables.** Reporting one without
   the other is malpractice. A precinct can "shift left" because R voters
   stayed home, which is a mobilization story, not a persuasion story.
4. **Cohort baselining is required.** Compare each precinct's shift to
   demographically similar precincts statewide. A 6-point shift in a
   precinct whose cohort moved 5 points is barely news; a 6-point shift
   in a cohort that didn't move is a story.
5. **Low-N precincts are noise candidates.** Any precinct with <300
   ballots cast in a cycle gets a "noise candidate" flag, not a finding.
   Most apparent "huge swings" in rural Georgia are small-sample artifacts.
6. **Boundary changes invalidate comparison.** Redistricting (2021 in
   Georgia) means 2018/2020 precincts may not equal 2022/2024 precincts.
   The skill must flag any precinct ID whose boundary changed between
   cycles and refuse a raw comparison; reaggregate to a stable geography
   (block-group or VTD crosswalk) before claiming a shift.

## When to use

- "How has Cobb County shifted across the last three federal cycles?"
- "Build me a swing-precinct watch list for election night."
- "Is the Black vote in coastal GA moving, and how much?"
- "Is ticket-splitting up or down in the suburbs?"
- Producer prep for a deep-dive segment on coalition change.

## When NOT to use

- For individual-voter-intent claims. Use a panel survey or voter-file
  longitudinal study instead — and disclose that's what you're doing.
- For real-time election night calls — that's the runner's job.
- For demographic causal claims. This skill is descriptive; for causal
  inference use `infera-research-design`.

## How Claude should execute

1. Resolve the jurisdiction and the race(s) of interest.
2. Pull precinct results per cycle from `openelections-ga` snapshots.
3. Apply the redistricting boundary check. If precincts changed, either
   reaggregate to a stable geography or refuse the multi-cycle comparison
   and produce a single-cycle view instead.
4. Compute raw precinct shift per cycle pair.
5. Compute statewide drift in the same race. Subtract to get
   precinct-specific shift.
6. Join ACS demographic overlay (precinct-to-block-group crosswalk if
   needed).
7. Compute cohort baselines: for each precinct, find statewide
   demographically-similar precincts and compute their average shift.
8. Compute precinct shift minus cohort baseline. This is the "real"
   shift figure.
9. Flag low-N precincts.
10. Rank, table, narrate using the output shape above.
11. Self-audit before returning: every claim uses aggregate language,
    no individual-persuasion verbs ("changed their mind", "switched
    sides", "abandoned"). Replace with shift / drift / moved.

## Composing with other skills

- After this skill produces a shift finding → `infera-blind-spot-auditor`
  asks what coalitions are NOT showing in the data.
- For real causal claims about WHY the shift happened →
  `infera-research-design` proposes the design (DiD, synthetic control)
  that would establish causation.
- For narration → `infera-convergence-narrator` writes the lede, with
  the ecological-fallacy guard preserved in the prose.
- For source claims about candidate behavior or events that may explain
  the shift → `infera-investigative-method` runs the investigation.

## Files

- `SKILL.md` — this file
- `scripts/` — `compute-shift.mjs` (to be written when the
  `openelections-ga` adapter snapshot shape is wired): joins
  precinct results across cycles, applies the boundary check,
  computes cohort baselines, and emits the structured output JSON
  that the narration layer consumes.
- `data/` — `redistricting-2021-flags.json` to be populated when the
  Georgia 2021 precinct boundary deltas are catalogued.
