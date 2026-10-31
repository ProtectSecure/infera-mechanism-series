---
name: infera-source-classifier
description: Classify any URL into Infera source tiers T1 (official primary source) through T5 (attention / engagement-optimized). Use whenever a new source URL appears in the pipeline and needs a tier label — for SOURCE_TIER registry updates, for cards displaying provenance, for any decision that depends on source reliability. Also use when a human asks "how should we tier this source?" or "what tier is X?". Returns {tier, confidence, rationale, parent_source_if_aggregator}.
---

# Infera Source Classifier

Assigns a source tier to any URL using the Infera SVNIF trust framework. This
skill exists because new source URLs arrive constantly and hardcoding the
`SOURCE_TIER` registry doesn't scale — but the classification logic should be
deterministic and auditable, not LLM-vibes.

## Tier definitions

- **T1 — Official primary source.** Government agency, court of record,
  regulator, the entity that produced the underlying data. URL on `.gov`,
  `.us`, `.mil`, or recognized official `.org` for non-government primary
  sources (NIH, Federal Reserve). The fact-of-record lives here.
- **T2 — Established newsroom.** Outlet with stated editorial standards,
  staff bylines, masthead. National (NYT, WSJ, WaPo, AP, Reuters) or major
  regional (AJC, ProPublica). Reporting that adds context to T1 facts.
- **T3 — Regional / specialist outlet.** Smaller newsroom or trade press
  with editorial process but limited reach. Local TV / NPR affiliates, trade
  publications (Inside Higher Ed, Education Week, Politico subverticals).
- **T4 — Aggregator / wire.** Re-publishers without original reporting on
  this story: Yahoo News, MSN, Google News, syndication wires when not the
  original. Useful for confirming spread, not for citing.
- **T5 — Attention-optimized.** Substack opinion, blogs, social media,
  engagement-optimized clickbait, AI-generated content farms. Citable only
  when the source IS the story (e.g., a candidate's own X post).

## When to use this skill

- A new adapter outputs a URL not yet in `SOURCE_TIER_REGISTRY`. Classify it
  before the URL becomes a citation.
- A human asks "what tier is X?" — return the tier with rationale.
- During trust-audit reviews to spot drift (e.g., a domain that used to be
  T2 has been acquired and is now T5 content-farm).

## When NOT to use this skill

- For URLs already in the registry — just look them up.
- For non-citation URLs (internal API endpoints, asset CDNs, OAuth callbacks).

## How to invoke

For deterministic classification, run the bundled script:

```bash
node scripts/classify.mjs <url>
node scripts/classify.mjs --batch < urls.txt    # one URL per line
```

Output (stdout JSON):

```json
{
  "url": "https://www.fec.gov/data/disbursements/",
  "tier": "T1",
  "confidence": "high",
  "rationale": "Federal Election Commission — federal regulator, official primary source for campaign finance data",
  "parent_source": null,
  "classified_at": "2026-05-13T16:00:00Z"
}
```

For interactive use, just tell Claude the URL and ask for the tier — Claude
will run the script, return the result, and explain any uncertainty.

## Classification algorithm

The script checks, in order:

1. **Exact-match registry lookup** in `data/source-tier-registry.json` (123+
   entries seeded from the GA data catalog).
2. **Domain-level lookup** — strips path/query and re-checks.
3. **TLD heuristics** — `.gov`, `.us`, `.mil`, state `.gov` subdomains → T1
   default; `.edu` → T2 if accredited, T3 otherwise; specific known-aggregator
   TLDs and patterns.
4. **Content-pattern heuristics** — known newsroom domains list, known
   aggregator domains list, known social/attention domains list.
5. **Fall-through** — returns `tier: "Unknown", confidence: "low"` and flags
   for human review.

When confidence is `low`, the calling code should not auto-publish citations
using this source until a human reviews it.

## Adding to the registry

When you classify a URL with `confidence: high` that's not in the registry,
the script can append it (with `--append-to-registry` flag). New entries get a
`source: "auto-classified"` field so they can be audited later.

```bash
node scripts/classify.mjs --append-to-registry https://new-source.example.com/
```

## Files

- `SKILL.md` — this file
- `scripts/classify.mjs` — the deterministic classifier
- `data/source-tier-registry.json` — seeded from the 123-source GA catalog
- `data/domain-patterns.json` — TLD and domain heuristics
