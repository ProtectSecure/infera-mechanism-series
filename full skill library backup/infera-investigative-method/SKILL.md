---
name: infera-investigative-method
description: Apply documented investigative-journalism frameworks (OCCRP follow-the-money, ICIJ parallel-team model, IRE paper-trail audit, Drew Sullivan's Reverse Engineering Power, 5W+H decomposition, source-diversity matrix) to a research question BEFORE data collection. Forces hypothesis-and-falsification thinking instead of working backwards from a conclusion. Use whenever opening a new investigation, when a finding feels too clean, when assembling a multi-source story, or when deciding whether the evidence on hand actually clears the publishing threshold.
---

# Infera Investigative Method

The reason investigative reporting doesn't collapse into vibes is that it
runs on documented methods. This skill encodes the canonical ones —
OCCRP, ICIJ, IRE — and forces them onto Infera investigations before
data collection rather than after. The point is not to dress up
conclusions in methodological language; the point is to write the
falsification test first.

## When to use

- At the **opening** of any new investigation, before collecting data.
- When a finding feels too clean — the method forces the counter-narrative.
- When assembling a multi-source story and the producer needs to know what
  the publishing threshold is.
- Before a SIGNAL or BREAKING moment escalates to a long-form piece.
- To audit an existing draft retroactively — "did we actually run the
  method, or did we work backwards from a hunch?"

## When NOT to use

- For real-time anomaly narration (use `infera-convergence-narrator`).
- For pure data lookups.
- For commentary or opinion pieces.

## The frameworks (loaded from `data/investigative-frameworks.json`)

Each framework has: the question it answers, the artifact it produces,
and the failure mode it prevents.

| Framework | Answers | Produces | Prevents |
|---|---|---|---|
| **5W+H Decomposition** | What do we actually know? | A grid of known/unknown facts | Vague claims masquerading as findings |
| **OCCRP Follow-the-Money** | Who benefits? | Entity → transaction → beneficiary chain | "Mystery donor" framing without follow-through |
| **ICIJ Parallel-Team Model** | What does each domain expert see in the same data? | Multi-perspective takes converged after independent work | Single-investigator confirmation bias |
| **IRE Paper-Trail Audit** | Where's the document? | Every claim mapped to a primary-source URL | Quote-as-fact substitution |
| **Drew Sullivan Reverse Engineering Power** | Who actually decides? | Decision-rights map (statutory + de facto) | Confusing visible actors with controlling actors |
| **Source-Diversity Matrix** | Whose voices are in the story? | 5-cell grid: govt / industry / academic / advocacy / impacted | Single-quadrant sourcing |
| **Hostile-Witness Protocol** | What would the subject's lawyer say? | Pre-rebuttal of the strongest counter-claim | Surprise on publication |
| **Minimum Publishable Unit** | What's the smallest defensible claim? | The narrowest version of the story that still holds | Overreach that collapses on first challenge |

## Hard rules

1. **Falsification first.** Before any data is pulled, write the
   single sentence that, if true, would make the investigation wrong.
   That sentence must be the first thing tested.
2. **The 3-source rule.** No claim against a named person without three
   independent T1/T2 sources (per `infera-source-classifier`). One source
   plus two corroborating witnesses is two sources, not three.
3. **Document or it didn't happen.** Every factual claim in the published
   piece must trace to a document or a transcript — not to a quote, not
   to a summary, not to "sources say."
4. **The minimum publishable unit.** Always identify the narrowest version
   of the finding that still survives the audit. Publish that. The
   broader version is the next story, not this one.
5. **Surface the counter-narrative.** The hostile-witness protocol must
   be run before publish. If you can't articulate the subject's strongest
   defense, you haven't reported enough.
6. **No working backwards.** If the data collection started AFTER the
   conclusion was drafted, the conclusion is invalid until re-derived.

## Output shape

```markdown
## Investigation brief: {question}

### 1. The question
{one-sentence statement of what we want to know}

### 2. The falsification test
{one sentence: if THIS is true, the investigation is wrong}

### 3. 5W+H grid
- Who: {known} / {unknown — must establish}
- What: {known} / {unknown}
- When: {known} / {unknown}
- Where: {known} / {unknown}
- Why: {known} / {unknown — note: motive is hardest}
- How: {known} / {unknown}

### 4. Evidence required to publish
| Claim | Document needed | Source tier required | Status |
|---|---|---|---|
| ... | ... | T1/T2 | not yet |

### 5. Source-diversity matrix (target)
- Government: {who}
- Industry / regulated entity: {who}
- Academic / expert: {who}
- Advocacy / opposition: {who}
- Impacted person: {who}

### 6. Method per framework
- OCCRP follow-the-money: {what chain to trace}
- IRE paper trail: {which documents to pull}
- Reverse engineering power: {who actually decides this}
- Parallel-team: {which two analysts should look independently}

### 7. Hostile-witness pre-rebuttal
The strongest counter-claim the subject can make is:
"{their best defense in their own voice}"

We address it by: {what evidence we need to rebut, OR an honest
acknowledgement that the counter holds}.

### 8. Minimum publishable unit
The smallest defensible version of this story is:
"{narrow claim that survives all the above}"

The broader version is a future story, not this one.

### 9. Publishing threshold
This story can be published when:
- [ ] Falsification test has been run and not refuted
- [ ] Every claim in section 4 is supported by listed documents
- [ ] Source-diversity matrix has at least 3 of 5 cells filled
- [ ] Hostile-witness pre-rebuttal is drafted
- [ ] Minimum publishable unit is the version being shipped
```

## How Claude should execute

1. Read the question from the user / producer.
2. Load `data/investigative-frameworks.json` for the canonical framework
   list and reach into specific frameworks based on the question type
   (financial → OCCRP-heavy; power-structure → Sullivan; institutional →
   IRE paper trail).
3. Draft the falsification test FIRST. If you can't write one, refuse
   the investigation — that's a sign it's not yet a question, it's a
   hunch.
4. Fill the 5W+H grid using what's already known from snapshots; the
   gaps become the data-collection plan.
5. Draft the evidence-required table with the specific document type per
   claim, and the source tier (use `infera-source-classifier`).
6. Run the source-diversity matrix and identify the empty cells.
7. Draft the hostile-witness pre-rebuttal — this is the single most
   important step. If you can't articulate the counter-claim cleanly,
   the investigation isn't done.
8. State the minimum publishable unit.
9. Return the structured brief.

## Composing with other skills

- After this skill produces the brief → `infera-blind-spot-auditor` runs
  against it to find what the method missed.
- After data is collected → `infera-research-design` proposes the
  doctoral-grade test for any quantitative claims.
- After the draft is written → `infera-trust-audit` validates citations.
- Final draft → `infera-narrative-integrity` (if installed) enforces
  SVNIF.

## Files

- `SKILL.md` — this file
- `data/investigative-frameworks.json` — the canonical methods library
- `scripts/` — empty; this is an LLM-only skill
