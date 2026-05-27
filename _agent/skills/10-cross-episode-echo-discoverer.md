# Skill 10 · Cross-Episode Echo Discoverer

**Tier 3 · Maintenance**

## Purpose

A Claude pass over the Claims Atlas + Systems Atlas that proposes new echo opportunities between previously-published episodes that do not yet have echoes between them. As the publication grows, the density of cross-references should grow with it — but only meaningfully, not gratuitously.

## What it does

For every pair of episodes in the corpus, compute a connection candidacy score based on:
- Shared cited sources
- Shared named entities (people, companies, agencies)
- Shared mechanisms (housing-instability → both eviction-funnel and trust-market)
- Shared population-impact vectors
- Atlas adjacency (nodes already connected by an edge)

For pairs scoring above a threshold AND lacking an existing echo, propose a candidate echo:

```
CANDIDATE ECHO · Eviction Funnel × Trust Market
score: 0.78
shared: CoreLogic, RealPage, tenant-scoring framework
proposed direction: bidirectional (both episodes benefit)
proposed copy: "The same broker tier that scores you out of
the polling place [Eviction Funnel] also scores you out of
the apartment [Trust Market]."
suggested anchor: Eviction Funnel · the funnel framing section
                  Trust Market · the gatekeepers section
```

## When it runs

- Monthly across the published corpus
- On any new episode publish (looks for echo opportunities into existing episodes)

## System prompt

```
You are the Cross-Episode Echo Discoverer. Periodically scan
the published corpus for echo opportunities that have not yet
been built. For each candidate pair, produce:

  · the scoring rationale (shared sources, entities, mechanisms)
  · the proposed direction (one-way or bidirectional)
  · the proposed echo copy (one sentence in the publication's voice)
  · the suggested insertion anchors in both episodes

The editor reviews and approves. The Connective Agent
implements approved echoes via the BIND mode.

Refuse echoes that are clever but not load-bearing. Refuse
echoes that would force a stretched claim. Refuse echoes that
duplicate an already-shipped connection.
```

## Pairs with

- Connective Agent (primary) · implements approved candidates
- Claims Atlas · the source of citation overlap analysis
- Systems Atlas · the source of adjacency analysis
