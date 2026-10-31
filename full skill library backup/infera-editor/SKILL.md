---
name: infera-editor
description: Plain-English brief generator over the infera-coverage snapshot set. Use when a human or another agent asks "brief me on X" — a county, a race, a person, a topic, a time window. Assembles facts ONLY from the latest snapshots in snapshots/, cites every claim with a public URL, and explicitly refuses to assert anything it cannot back. Returns publishable draft copy with inline source citations. Does NOT hallucinate — if the snapshots don't support a claim, the brief says "no data" rather than improvising.
---

# Infera Editor

The intelligence layer that lets a human or an agent ask plain-English
questions and get back a brief grounded in the snapshot set. This is the
moment the data layer becomes a newsroom.

## Hard rules (must follow)

1. **No claim without a citation.** Every assertion of fact in the output
   must point to a specific URL from a specific snapshot. If you can't cite
   it, you can't say it.
2. **No claim outside the snapshot window.** Do not draw on Claude's training
   knowledge for factual claims about the present. Snapshots are the only
   source of truth. Background context (e.g., "the Voting Rights Act is a
   federal civil-rights law") is acceptable; current factual claims
   ("Senator X voted Y last week") must come from a snapshot.
3. **Tier-aware confidence.** Use the infera-source-classifier tier of each
   citation to qualify how strongly you assert the claim. A T1 source
   supports "X is happening"; a T3 supports "X is reported to be happening";
   a T5 supports "X is being claimed by Y."
4. **Refuse mode.** When the user asks something the snapshots don't cover,
   say so explicitly and suggest what data would need to exist. Do not
   invent context to fill the gap.
5. **Convergence-aware.** If `signal-convergence-ga.json` contains findings
   relevant to the question, surface them — they're the highest-quality
   signals available.

## Input shape

The skill expects to be invoked with:

- A natural-language question (the user's request).
- A path to the snapshots directory (default: `./snapshots/`).
- Optionally: a path to `signal-convergence-ga.json` if it exists.
- Optionally: a target length (default: ~250 words).
- Optionally: a target audience ("on-air talent", "producer", "editor",
  "newsletter reader") — changes voice, not facts.

## Output shape

```markdown
## Brief: {question summary}

{lead paragraph — answers the question in 1–3 sentences, fully cited.}

### What we know

- {fact 1} [1]
- {fact 2} [2]
- {fact 3 — converging signal} [3][4]

### What we don't yet know

- {explicit gap 1}
- {explicit gap 2}

### Sources

1. [URL] — T{tier} — {organization} — fetched {snapshot timestamp}
2. ...
```

## When to use

- **A producer asks "brief me on Cobb County before air."**
- **An editor asks "what's converging in coastal GA right now?"**
- **An agent (e.g., infera-convergence-narrator) needs source-grounded
  context before writing copy.**
- **A reader asks via a Q&A box on the public surface.**

## When NOT to use

- For pure data lookups ("how many counties?"). Just run a script.
- For opinion or speculation. The skill refuses both.
- For real-time event narration during a live broadcast — use BREAKING
  moments from infera-anomaly-watch instead, this skill is for considered
  briefs.

## How Claude should execute

When invoked:

1. **Parse the question.** Identify entities (county, race, person, topic)
   and time scope (now, today, last week).
2. **Locate the relevant snapshots.** Scan `snapshots/` directory listing.
   For each candidate adapter, read only the snapshots that match the
   entity/time scope. Use `infera-source-classifier` data to know each
   source's tier in advance.
3. **Check `signal-convergence-ga.json`.** If any convergence findings match
   the entity, prefer those — they're already multi-source-validated.
4. **Draft.** Write the brief using the output shape above. Every numbered
   claim gets a numbered citation in the Sources block.
5. **Self-audit.** Before returning, walk every claim in the output and
   verify it traces to a snapshot URL. If anything doesn't, either remove
   the claim or move it under "What we don't yet know."

## Wiring into your code

```js
// Programmatic use from warroom-hydrator.mjs or any node service
import { query } from '@anthropic-ai/claude-agent-sdk';

const brief = await query({
  prompt: 'Brief me on Chatham County in 200 words for on-air talent.',
  options: {
    skillsPaths: ['./skills'],
    cwd: process.cwd(),
    // Restrict tool use to file reads so it can only see snapshots + skill data
    allowedTools: ['Read', 'Glob', 'Grep'],
  },
});
```

The `allowedTools` restriction is important — by limiting to read-only file
tools, the skill physically cannot make claims from anything other than the
snapshot files Claude can read. That's how the no-hallucination guarantee
actually holds.

## Files

- `SKILL.md` — this file
- `scripts/` — empty for now; this skill is LLM-only. Add a thin Node wrapper
  here if you want a CLI entry point that boots the SDK with the right
  config and prompts.
