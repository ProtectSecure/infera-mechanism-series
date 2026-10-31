---
name: infera-blind-spot-auditor
description: Red-teams your own coverage. For any finding, brief, lede, or convergence claim, asks the seven hard questions: who's absent from the data, whose voice is structurally missing, what alternative explanations were ruled out (and how), what survivorship bias is in the source set, what would the strongest counterfactual look like, what method bias is operating, what confirmation bias signature does the draft show. Surfaces blind spots that the original method by definition couldn't catch. The audit's output is a "Blind spots" section appended to the piece, not a deletion — transparency about uncertainty, not paralysis. Use before publishing any non-trivial claim, before issuing a BREAKING moment with a causal frame, or whenever a finding feels suspiciously clean.
---

# Infera Blind Spot Auditor

The instruments that catch the most truth also have the most consistent
blind spots. This skill is the audit pass that exists because the
original investigator and the original method cannot, by definition, see
what they were not designed to look for. The audit produces a "Blind
spots" section that ships WITH the finding — transparency, not censorship.

## The seven audit dimensions

For any finding submitted to the auditor:

### 1. Voice absence
Whose perspective is structurally missing because the source surface
doesn't include them?
- Renters in a property-tax story sourced from county commission meetings
- Non-internet households in any social-organizing-driven finding
- Spanish-speaking GA residents when sources are English-only
- Voters who don't attend meetings (the vast majority)

### 2. Geographic absence
Which counties / precincts / urban-rural categories are under-sampled
in the finding's evidence?
- A "statewide trend" claim sourced from 5 metro counties
- A "rural sentiment" claim with no rural-county data
- Coastal vs piedmont vs mountain GA — each has distinct dynamics
  and any one of the three can be missing without anyone noticing

### 3. Temporal absence
Are we comparing apples to oranges across time?
- Election-year vs off-year baselines
- Pre-redistricting vs post-redistricting
- Pre-pandemic vs post-pandemic civic engagement levels
- Same calendar week vs same election-cycle week

### 4. Method bias
Would a different method tell a different story? If polls, voter file,
and election results disagree, which one is foreground in this finding
— and is that choice defensible or convenient?

### 5. Confirmation bias signature
Did the reporter look as hard for evidence AGAINST as for evidence FOR?
- Did they search both pro- and anti- framings of the question?
- Did they interview hostile sources or only sympathetic ones?
- Did they use the SAME methodology to test the counter-claim?

### 6. Survivorship bias
Which entities / data / sources are absent from the analysis because
they failed, dropped out, or were excluded?
- News deserts (counties with no local outlet)
- Voters purged from rolls
- Candidates who dropped out before the data window
- Meetings cancelled or moved to executive session (not in agendas)
- Records the FOIA officer denied

### 7. Counterfactual generation
What is the strongest argument that the finding is wrong? Has the
investigation tested it, or just acknowledged it?

The auditor generates the 3 most likely alternate explanations and
maps each to: (a) evidence in hand that addresses it, (b) evidence that
would falsify the finding, (c) honest acknowledgement if neither exists.

## Hard rules

1. **The audit ships WITH the piece.** Blind spots become a labeled
   section in the published copy, not a deletion of the finding. The
   reader deserves to know what you couldn't see, not have it hidden.
2. **At least one revision recommendation per blind spot.** "Maybe
   nothing was missed" is never a valid conclusion. Either name the
   residual uncertainty in copy or revise the claim to fit what the
   evidence actually supports.
3. **Counterfactual generation is mandatory.** Every non-trivial
   finding gets 3 alternate explanations generated, even if all 3 are
   dismissable. The dismissal must be earned, not assumed.
4. **The auditor doesn't kill findings, it qualifies them.** Refusing
   to publish is the editor's call. The auditor's job is to ensure the
   publish-vs-hold decision is made with full visibility on what's
   uncertain.
5. **Audit by dimension, not by gestalt.** Walk every one of the 7
   dimensions every time. Skipping one because "it doesn't apply" is
   the most common way blind spots survive an audit.
6. **Cross-check with `infera-investigative-method`.** If the
   investigation didn't run the method's framework, the audit notes
   that and recommends running it before publishing.

## Output

```markdown
## Blind-spot audit: {finding label}

### Source finding
{quote or restate the finding in one sentence}

### Audit by dimension

**1. Voice absence**
- Missing: {who's not in the data and why}
- Risk: {how this could change the finding}
- Recommendation: {add this source / qualify the claim / note the gap}

**2. Geographic absence**
- Missing: {jurisdictions or regions absent}
- Risk: {whether finding extrapolates beyond its evidence base}
- Recommendation: {narrow claim to geography in evidence / collect more}

**3. Temporal absence**
- Comparison risk: {what's being compared that may not be comparable}
- Recommendation: {restate timeframe explicitly / add caveats}

**4. Method bias**
- This finding relies primarily on: {method/source family}
- Alternate methods that might disagree: {what they are}
- Recommendation: {cross-check / acknowledge the methodological choice}

**5. Confirmation bias signature**
- Evidence searched FOR: {what was looked for}
- Evidence searched AGAINST: {what counter-evidence search was done}
- Asymmetry: {assess}
- Recommendation: {run the symmetric search if not done}

**6. Survivorship bias**
- Missing because failed/dropped: {entities or data absent for
  selection reasons}
- Recommendation: {acknowledge the surviving-subset nature explicitly}

**7. Counterfactual generation**
- Alternate explanation 1: {strongest plausible alternative}
  - Evidence addressing it: {what we have}
  - Evidence that would falsify our finding: {what to look for}
- Alternate explanation 2: {next-strongest alternative}
  - Evidence addressing it: {what we have}
  - Evidence that would falsify our finding: {what to look for}
- Alternate explanation 3: {third alternative}
  - Evidence addressing it: {what we have}
  - Evidence that would falsify our finding: {what to look for}

### Recommended additions to the published piece

**Blind spots (to be included in copy):**
- {explicit gap 1 in plain language}
- {explicit gap 2}
- {explicit gap 3}

**Claim revisions (if any):**
- Original: "{original claim}"
- Revised: "{narrower / qualified version}"
- Why: {what the evidence does and doesn't support}

### Publish recommendation
- [ ] Publish as written
- [ ] Publish with blind-spots section appended
- [ ] Publish with claim revision applied
- [ ] Hold for additional reporting on: {specific gap}
```

## When to use

- Before publishing any non-trivial claim, especially convergence
  findings.
- Before issuing a BREAKING moment with a causal frame.
- Whenever a finding "feels too clean" or "tells too good a story."
- Retrospectively on published pieces to learn institutional blind
  spots over time.
- Before assigning a follow-up story — the audit identifies where the
  follow-up should aim.

## When NOT to use

- For pure data lookups (no claim to audit).
- For real-time breaking events where speed precludes a full audit.
  In that case, a lightweight "what we don't know yet" callout in copy
  is the substitute.
- For commentary or opinion pieces where the auditor's grounding in
  evidence-based claims doesn't fit.

## How Claude should execute

1. Accept the finding as input (quoted, structured, or referenced).
2. Identify the source data that supports it (snapshots, adapter
   outputs).
3. Walk each of the 7 dimensions in order. Do not skip dimensions.
   For each, produce specifics — generic "could be more diverse" is
   useless; the specific name of who's missing is what matters.
4. Generate exactly 3 counterfactuals. Force yourself to make them
   plausible, not strawmen. The test is: would a hostile editor accept
   each as a possible alternate explanation?
5. For each blind spot, write the revision recommendation.
6. Compose the "Blind spots" section that can be appended to the
   piece in publication.
7. Recommend publish / publish-with-section / publish-with-revision /
   hold.

## Composing with other skills

- After `infera-investigative-method` produces the brief → this skill
  audits.
- After `infera-cross-cycle-voter-shift` produces a shift finding →
  this skill checks who's missing from the precinct evidence.
- After `infera-civic-pulse` produces a high pulse score → this skill
  checks whether the channel mix systematically misses populations.
- After `infera-common-ground-detector` finds convergence → this skill
  checks whether the convergence is artifact of source selection.
- Before `infera-convergence-narrator` writes a lede → this skill
  produces the qualifying language the narrator must honor.
- Before `infera-editor` ships a brief → this skill's findings are
  appended as a "Blind spots" section.

## Files

- `SKILL.md` — this file
- `data/known-blind-spots-ga.json` — to be built; institutional
  knowledge of recurring GA-specific blind spots (e.g., counties with
  no published meeting minutes, traditionally undersampled rural
  precincts, demographic groups consistently absent from polling
  cross-tabs)
- `scripts/` — empty; LLM-only skill
