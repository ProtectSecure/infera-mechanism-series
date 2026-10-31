---
name: infera-common-ground-detector
description: Finds issues where left- and right-leaning voters, officials, and jurisdictions are actually converging — distinct from issues the national media frames as polarized but where the underlying public agrees. Methods include cross-party ballot-measure support, town-hall public-comment overlap, joint legislative co-sponsorship, public-statement language similarity, and issue-priority overlap from polls. Produces a convergence index per issue per geography, with the disagreeing-minority share always reported alongside. Use to counter the default "everything is polarized" frame, identify policy areas with quiet bipartisan support, or surface the gap between media polarization and electoral convergence.
---

# Infera Common Ground Detector

The default newsroom frame is polarization — it's vivid, simple, and
sells. The reality is more layered: many policy areas show real
cross-party convergence at the voter level even when elite discourse
remains hostile. This skill is the counter-bias instrument that surfaces
where the convergence is actually happening, with the rigor to
distinguish framing convergence from policy convergence.

## What it measures

Per issue per geography:

- **Cross-party ballot-measure support** — when both Republican-leaning
  and Democratic-leaning precincts vote the same way on a measure, the
  measure has cross-party support. Strongest signal available.
- **Public-comment overlap** — at meetings and hearings, do speakers
  from across the partisan map land on the same position? Coded from
  meeting transcripts when available.
- **Joint legislative co-sponsorship** — state-level bills with
  sponsors from both parties indicate elite-level convergence.
- **Public-statement language similarity** — when officials from
  different parties describe a problem using similar language, framing
  has converged even if policy hasn't.
- **Issue-priority overlap** — when "most important problem" surveys
  show both partisan camps naming the same top-3 issues, agenda
  convergence is occurring.

## The four convergence types (must be distinguished)

1. **Policy convergence** — voters in both camps would support the same
   law. Strongest form. Detected via ballot measures and well-designed
   policy-specific polls.
2. **Framing convergence** — voters in both camps describe the problem
   the same way but disagree on what to do about it. Common in
   immigration, economic anxiety.
3. **Agenda convergence** — voters in both camps name the same issue
   as a priority but rank causes / responsible actors differently.
   Common in cost of living.
4. **Coalition convergence** — same-side actors emerging from
   traditionally opposed coalitions (e.g., labor-right and labor-left,
   parents-right and parents-left on a school issue). Rarest but most
   politically generative.

The skill must label which type of convergence is found. Conflating
them is malpractice.

## Hard rules

1. **Convergence type must be labeled.** Every finding states which of
   the four types it is. "Common ground on X" without the type label is
   ambiguous enough to be misleading.
2. **Report the disagreeing minority.** A 70% cross-party agreement
   leaves 30% who don't agree. That 30% is part of the story and must
   be sized in the output.
3. **Elite vs voter convergence.** Convergence at the elite level
   (co-sponsorship, joint statements) does NOT imply convergence at the
   voter level. State which level is in evidence.
4. **Geographic specificity.** Convergence in coastal Georgia may not
   be convergence in north Georgia. Always report by jurisdiction or
   cluster — never collapse to a single statewide number unless the
   geographic data supports it.
5. **Selection bias on speakers.** Town-hall attendees and meeting
   commenters are not representative of voters. Convergence detected
   from comment overlap is a signal about the engaged minority, not
   the median voter — flag this explicitly.
6. **No "the country is uniting" rhetoric.** The skill produces narrow
   findings about specific issues in specific geographies. Aggregating
   them into civic-mood narratives is the editor's call, not the
   detector's.

## Output

```markdown
## Common ground finding: {issue} — {geography}

### Convergence type: {policy | framing | agenda | coalition}
### Level: {voter | elite | both}
### Strength: {high | medium | low}

### Evidence
| Channel | Direction | Magnitude | Source |
|---|---|---|---|
| Ballot measure (Amendment X, 2024) | both party-coded precincts ≥ 60% YES | high | openelections-ga |
| Joint co-sponsorship | 3 R + 2 D state senators on SB-NNN | medium | ga-legislature-tracker |
| Public comment overlap | 14 of 20 transcribed comments support position, speakers cross partisan markers | medium | civic-meetings-ga |
| Issue-priority overlap | both party camps rank issue in top 3 in latest GA polls | low (poll sample) | polls-ga |

### Convergence pattern
{plain-language description of what's actually agreed upon — be very
specific, this is where careless writing breaks the finding}

### Disagreeing minority
- Estimated share: {%}
- Where they cluster: {jurisdictions or demographic cells}
- What they actually disagree with: {the specific point of objection}

### What this is NOT
- Not "the country is coming together."
- Not "polarization is overstated" broadly — only on this specific
  issue.
- Not a prediction that any legislation will pass.
- Not evidence of convergence outside the geography studied.

### Falsification check
- Cross-party ballot vote was driven by a low-info ballot description?
  → re-check with deliberate-question polling if available.
- Joint co-sponsorship is a strategic move (one party signaling) not
  genuine alignment? → check sponsor pattern across other bills.
- Comment overlap was from a single organized turnout? → check
  attendee names for organizational affiliation clustering.
```

## When to use

- Producer wants a counter-frame to a polarization story.
- A bill is moving through the GA legislature with unusual sponsor mix.
- Public meeting transcripts show suspicious cross-partisan agreement
  that's worth understanding.
- Building a year-end "where Georgia actually agrees" piece.
- Strategist or campaign asks "what issues have bipartisan support?"
  (and the answer requires evidence, not vibes).

## When NOT to use

- For national-level claims. Scope the skill to GA jurisdictions
  Infera actually instruments.
- For predicting legislative passage. Convergence ≠ political
  feasibility; many converged issues die for procedural or leadership
  reasons.
- For "the parties are the same actually" framing. The skill produces
  evidence for narrow convergence on specific issues. It does not
  support sweeping equivalence claims.

## How Claude should execute

1. Resolve the issue (must be specific — "housing affordability" is too
   broad; "by-right ADU permitting" is the right grain).
2. Resolve the geography (county / cluster / statewide).
3. Pull evidence from the relevant channels:
   - Ballot measures touching the issue (openelections-ga + ballot text)
   - State legislative bills (ga-legislature-tracker when built)
   - Meeting transcripts touching the issue (civic-meetings-ga)
   - Polling cross-tabs (polls-ga)
4. For ballot measures: cross-reference precinct partisan baseline
   (presidential vote in the same precinct) to determine whether both
   sides voted the same way.
5. For meeting transcripts: code commenters by stated party
   affiliation OR by precinct partisan baseline when affiliation is
   absent. Note when affiliation is inferred — that's a weaker signal.
6. For co-sponsorship: pull sponsor lists and party labels.
7. For polling: extract the relevant cross-tab and report the sample
   size; flag if the cross-tab is underpowered.
8. Determine convergence type (the four types above) and level (voter
   vs elite vs both).
9. Compute disagreeing-minority share.
10. Run the falsification checks. If any fail, downgrade strength or
    refuse the finding.
11. Emit the structured output. Always restate "what this is NOT."

## Composing with other skills

- `infera-discourse-cartographer` provides the topic frequency context
  — a converged issue with low discourse salience is invisible
  consensus, which is a distinct story.
- `infera-investigative-method` opens the deeper investigation on WHY
  the convergence exists when it's surprising (organized cross-party
  coalition? shared funder? generational shift?).
- `infera-blind-spot-auditor` checks whether the convergence is
  artifact of the source mix (e.g., we're only looking at meetings, and
  meeting attendees are a self-selected pro-engagement subset).
- `infera-research-design` proposes the rigorous test if the finding
  needs to clear a doctoral-grade bar before publishing.

## Files

- `SKILL.md` — this file
- `data/convergence-channels.json` — to be built; channel weights and
  source mappings
- `scripts/detect-convergence.mjs` — to be written; the runner
