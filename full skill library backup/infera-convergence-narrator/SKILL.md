---
name: infera-convergence-narrator
description: Read signal-convergence-ga.json output and write 200-word newsroom-ready ledes for each convergence or divergence finding. Closes the loop from "convergence detected" to "publishable copy on the page". Use after signal-convergence-ga has run, or whenever a finding from that adapter needs to become a SIGNAL moment for the war room. Honors source diversity (must surface multi-source nature), refuses to extrapolate beyond the finding, and respects tier-aware confidence language.
---

# Infera Convergence Narrator

`signal-convergence-ga` is the analytical engine that finds patterns across
adapters. This skill is the writer that turns each finding into a
publishable lede.

## Input

A finding from `signal-convergence-ga.json`, structured like:

```json
{
  "kind": "convergence",
  "prompt_id": "P-C1",
  "finding": "4 of GA's 7 coastal counties show simultaneous FEMA disaster activity AND >$1M outside spending in current federal races AND active federal court dockets",
  "supporting_data": {
    "counties": ["Chatham", "Glynn", "Camden", "McIntosh"],
    "adapters_cited": ["fema-ga", "fec-spending-ga", "federal-courts-ga"],
    "records": [ /* the actual data points */ ]
  },
  "source_urls": ["https://...", "https://...", "https://..."],
  "confidence": "high",
  "detected_at": "2026-05-13T15:00:00Z"
}
```

## Output

A 200-word lede in newsroom voice, structured as:

```markdown
**{Headline — 8–12 words, no sub-clauses}**

{Lede paragraph — 1–2 sentences. Names the convergence in plain language and
identifies which counties / actors are involved.}

{Body paragraph — 3–5 sentences. Walks through the converging signals one
by one, using tier-appropriate confidence language and citing the adapter
each signal came from.}

{Close — 1 sentence. Either flags what to watch next, or names the
counterfactual that would falsify the convergence.}

---
*Sources: {bullet list with URLs and tiers from the finding}*
```

## Hard rules

1. **The convergence IS the story.** Never bury the lede. The opening
   sentence must state the convergence.
2. **Source diversity is mandatory in copy.** If the finding cites 3
   adapters, the body must reference all 3 (e.g., "FEMA records show… while
   FEC filings indicate… and federal court dockets confirm…").
3. **No extrapolation.** Do not infer causation that the finding doesn't
   support. "These four counties show all three signals simultaneously" is
   fine; "the disasters are driving the outside spending" is not, unless
   the finding includes that claim.
4. **Tier-aware language.**
   - All T1 sources → "X is happening" / "records show X" / "confirmed"
   - Mix of T1+T2 → "X is reported" / "indicated"
   - Any T3 or below → "according to" / "reports suggest"
5. **Divergence handling.** When the input is a divergence (sources
   disagree), the lede must name the disagreement, not pretend it isn't
   there. Format: "Two source families disagree on X: {A says…} while
   {B says…}."

## When to use

- After every `signal-convergence-ga` run, narrate any new findings.
- When the producer wants to convert a specific finding into an
  on-air-ready segment.
- For the public-facing surface, where convergence findings need to read as
  short news stories.

## When NOT to use

- For raw data displays — that's the regular MOMENT card path.
- For BREAKING signals from anomaly-watch — those have their own
  short-form talent-prompt template and don't need narration.
- When the underlying finding has confidence: "low". Refuse and surface as
  "candidate convergence under review" instead.

## How Claude should execute

1. Read the finding from `signal-convergence-ga.json` (or accept it as
   direct input).
2. For each source URL in the finding, look up its tier from
   `infera-source-classifier/data/source-tier-registry.json`.
3. Pick the appropriate confidence language tier per the rules above.
4. Draft headline + lede + body + close.
5. Self-audit: every count, name, dollar figure, and date in the output
   must appear in the supporting_data. Remove or qualify anything that
   doesn't.
6. Return the markdown.

## Wiring

```js
// Inside the hydrator, after signal-convergence-ga writes its output:
import { query } from '@anthropic-ai/claude-agent-sdk';
import { readFileSync } from 'node:fs';

const convergence = JSON.parse(readFileSync('./snapshots/signal-convergence-ga.json', 'utf8'));

for (const finding of convergence.findings) {
  if (finding.confidence !== 'high') continue;
  const narration = await query({
    prompt: `Narrate this convergence finding as a 200-word lede:\n\n${JSON.stringify(finding, null, 2)}`,
    options: { skillsPaths: ['./skills'], allowedTools: ['Read'] },
  });
  // Push narration.text into a SIGNAL moment via pushMoment()
}
```

## Files

- `SKILL.md` — this file
- `scripts/` — empty for now; LLM-only skill
