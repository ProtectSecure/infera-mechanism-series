---
name: infera-source-triage
description: "Scores the credibility, bias, and domain-specific reliability of any source feeding Infera's interpretation pipeline. Use when evaluating a news source, data feed, beat reporter, social account, API, or any origin of signal data. Produces a reliability tier (0-100), a bias coordinate, and domain-specific modifiers. Feeds directly into the SourceReliability SSS component used by every signal interpretation. Triggers: any URL, publication name, reporter handle, or data feed mentioned in an interpretation context; the phrase 'how reliable is X'; moments when an enrichment fetch returns content from a previously unseen source; periodic recalibration cycles as outcome-learning data accumulates."
---

# Infera Source Triage

## What this skill is

Every signal Infera interprets comes from a source. A market-data feed, a newswire, a beat reporter's tweet, a regulatory filing, a Polymarket page, a fantasy-analytics site. The quality of the interpretation is upper-bounded by the quality of the sources — garbage-in will produce garbage-out no matter how clean the interpretation logic is.

This skill does three things the rest of the system depends on:

1. **Scores source reliability on a 0–100 scale** with domain-specific modifiers, feeding the SourceReliability component of the SSS formula.
2. **Tracks bias as a separate dimension**, enabling contradiction-detection and opposite-perspective features downstream.
3. **Calibrates over time** — initial scores are priors; outcome-learning data refines them.

**What this skill does not do:**
- It does not judge whether specific claims are true. That's outcome-learning's job.
- It does not replace `infera-narrative-integrity`'s contradiction surfacing. Sources disagreeing is signal; this skill provides the weights.
- It does not censor or hide sources. Even low-reliability sources may carry signal — the skill ensures they're weighted appropriately, not that they're silenced.
- It does not auto-update scores. Recommendations for tier changes require human approval, mirroring outcome-learning's posture.

---

## The three-layer scoring model

Source scores are built from three layers that stack. Every source gets all three; the layers are evaluated independently and combined at query time.

### Layer 1: Base reliability tier

Every source has a base tier from 0–100 reflecting general credibility. Tier assignments come from three methods that feed the same field:

**Method A — Manual curation (seed set):**
A maintained list of ~200 sources across domains, scored by explicit human review. This is the starting ground truth. New sources added as Infera encounters them.

**Method B — Heuristic scoring (for uncurated sources):**
When a source appears that isn't in the curated set, compute a provisional tier from observable properties. This is a temporary score that carries a `provisional: true` flag until human review or enough outcome data calibrates it.

Heuristic scoring factors:
- **Institutional identity:** established news organization (+15), academic/research institution (+15), government primary source (+20), anonymous aggregator (-10), single-author blog (-5)
- **Track record visibility:** corrections policy published (+5), masthead/editorial staff identified (+5), ownership disclosed (+3)
- **AI-content posture** (added 2026): clear human editorial accountability (+5), undisclosed AI generation (-15), AI-tool usage with transparency (0)
- **Domain of appearance:** appearing as the origin source vs. appearing as an aggregator of other sources (+5 for primary)
- **Age and consistency:** published under same name >5 years (+5), has won recognized journalism awards or equivalent domain recognition (+5)
- **Funding transparency:** nonprofit with disclosed funding (+5), subscription-funded (+3), ad-funded (0), undisclosed funding (-5)

Sum the modifiers to a base of 50, clamp to 0–100. Flag as `provisional` until Method A or C refines it.

**Method C — Outcome-calibrated adjustment:**
Once `infera-outcome-learning` has enough resolved interpretations that cited this source, compute the source's observed accuracy rate on scored claims. If the source was cited in interpretations that resolved favorably more often than the source's tier predicted, adjust upward. If less often, downward.

Outcome-calibrated adjustments require minimum 30 resolved-citations before taking effect. Below threshold, the Method A or Method B score stands.

### Layer 2: Domain modifiers

Sources have different reliability in different domains. Adam Schefter is close to Tier-1 on NFL news and close to Tier-4 on macroeconomic commentary. Reuters is Tier-2 nearly everywhere but Tier-3 on hyperlocal stories the wire doesn't staff. Seeking Alpha is variable per-author — the platform's base score doesn't apply evenly to contributors.

Modifiers are additive to the base tier, applied at query time based on the domain of the signal being interpreted.

**Standard domain modifier values:**
- **Beat domain** (source's primary coverage area, demonstrated competence): +15
- **Adjacent domain** (related but not primary): +5
- **Neutral domain** (source has no demonstrated edge or weakness): 0
- **Weak domain** (source has shown poor track record): -10
- **Out-of-depth domain** (source is commenting outside their competence): -20

Example encoding:
```
source: "Adam Schefter / ESPN"
base_tier: 78
domain_modifiers: {
  "sports.nfl": +15,
  "sports.nba": -5,
  "sports.general": +5,
  "markets": -20,
  "geopolitics": -20
}
```

When interpreting an NFL injury signal, the effective SourceReliability is 78 + 15 = 93 (Tier-1 equivalent). When interpreting a market signal citing the same handle, it's 78 - 20 = 58 (mid-tier).

**Modifier maintenance:** domain modifiers are set alongside base tier during Method A curation. Method C outcome calibration can adjust modifiers per-domain once domain-specific samples cross the 30-resolution threshold.

### Layer 3: Bias coordinates

Bias is tracked separately from reliability because they answer different questions. "Can I trust this source's factual claims?" is reliability. "Does this source systematically frame stories in one direction?" is bias.

Bias is encoded as a two-dimensional coordinate:

**Axis 1: Ideological lean (-100 to +100)**
- -100: far-left / far-progressive framing
- 0: no systematic ideological lean detected
- +100: far-right / far-traditionalist framing

**Axis 2: Establishment lean (-100 to +100)**
- -100: systematically anti-establishment / contrarian
- 0: no systematic establishment bias
- +100: systematically pro-establishment / deferential to institutional authority

Sources can be reliable on facts while carrying meaningful bias coordinates. The axes capture different kinds of framing and are tracked independently because they correlate only loosely in practice. Ad Fontes's methodology uses a similar two-axis approach.

**How bias is used:**
- It is NOT deducted from the SourceReliability score. High-bias sources can still be factually accurate.
- It IS used by `infera-narrative-integrity` when evaluating whether a signal's corroboration is ideologically diverse (three sources that all lean -70 are less diverse than three sources spanning -40 to +30).
- It IS used by `infera-personal-feed` for the opposite-perspective injection feature (30% adjacent + contrarian content).

---

## Standard source tier priors

A starting ground-truth set for common sources. These are Method A curated values.

### Markets and financial data

| Source | Base tier | Primary domain | Notable modifiers |
|---|---|---|---|
| Exchange direct feeds (NYSE, Nasdaq, CME) | 95 | markets.exchange_data | +0 everywhere |
| SEC EDGAR | 95 | markets.regulatory | -10 speed-of-breaking-news |
| Bloomberg Terminal | 90 | markets.general | +5 markets.ficc, -5 equities.small_cap |
| Reuters | 85 | general | +0 broadly |
| Wall Street Journal | 82 | markets.equities | -5 geopolitics |
| Financial Times | 82 | markets.global | +5 geopolitics.economic |
| CNBC | 68 | markets.general | -10 markets.crypto |
| Seeking Alpha | 55 | markets.equities | Variable per-author, flag for per-contributor review |
| Zero Hedge | 35 | markets.general | -15 factual reporting, high contrarian bias |

### News and geopolitics

**Tier structure for geopolitics sources** (calibrated per `infera-signal-interpretation-geopolitics` domain requirements):

**Tier-1 (primary sources, default base 88):**

| Source | Base tier | Primary domain | Notes |
|---|---|---|---|
| State Department official briefings/statements | 88 | geopolitics.official_us | On-record positions. Treat as authoritative for US posture. |
| Foreign ministry statements (primary parties) | 88 | geopolitics.official_{country} | Authoritative for that party's public posture; not independent for factual claims. |
| UN resolutions and official documents | 90 | geopolitics.official_multilateral | High authority on institutional positions. |
| Treaty texts and formal agreements | 95 | geopolitics.official_documents | Highest tier when directly quoted. |
| Head-of-state / FM on-record statements | 88 | geopolitics.official | +5 when delivered in official venue (joint press conference, UN speech, etc). |

**Tier-2 (authoritative observer media, default base 82):**

| Source | Base tier | Primary domain | Notes |
|---|---|---|---|
| Associated Press | 88 | news.general | +0 geopolitics. Wire-service reliability. |
| Reuters | 85 | news.general | +0 geopolitics. |
| AFP (Agence France-Presse) | 85 | news.general | +5 geopolitics.europe, +5 geopolitics.africa. |
| BBC | 82 | news.general | +0 geopolitics. |
| Washington Post (State Dept. beat) | 82 | geopolitics.state_department | Named correspondents get +5 (e.g., John Hudson). |
| New York Times (diplomatic desk) | 82 | geopolitics.diplomatic_general | |
| Financial Times | 82 | geopolitics.economic | +5 geopolitics.economic intersection. |
| NPR (Michele Kelemen) | 82 | geopolitics.diplomatic_general | Named correspondent +5 modifier. |
| Al Jazeera | 70 | news.geopolitics_mena | **+15 geopolitics.mena** (regional-specialist bonus → effective 85). |
| Bloomberg | 90 | markets.general | -5 geopolitics default; +0 geopolitics.economic. |

**Tier-3 (specialized outlets, default base 70):**

| Source | Base tier | Primary domain | Notes |
|---|---|---|---|
| Foreign Affairs | 75 | geopolitics.analysis | Scholarly analysis, slower cycle. |
| Foreign Policy | 72 | geopolitics.analysis | |
| The Diplomat | 70 | geopolitics.asia_pacific | **+10 geopolitics.asia_pacific** (regional specialist → effective 80). |
| Al-Monitor | 68 | geopolitics.mena | **+10 geopolitics.mena** → effective 78. |
| Americas Quarterly | 68 | geopolitics.latam | **+10 geopolitics.latam** → effective 78. |
| South China Morning Post | 70 | geopolitics.asia_pacific | **+10 geopolitics.china_region** → effective 80. Note establishment-axis bias. |
| Haaretz | 72 | geopolitics.israel | **+5 geopolitics.israel**. |
| Times of Israel | 68 | geopolitics.israel | **+5 geopolitics.israel**. |
| Politico EU | 70 | geopolitics.europe | **+5 geopolitics.europe**. |
| CFR / Brookings / Carnegie / RAND analysis | 72 | geopolitics.analysis | Individual analyst variance; evaluate per-author for named pieces. |

**Tier-4 (general media and analyst-driven, default base 55):**

| Source | Base tier | Primary domain | Notes |
|---|---|---|---|
| The Guardian | 72 | news.general | -0 geopolitics.general. |
| Time | 70 | news.general | -5 geopolitics default (speed-over-depth trade-off). |
| CNN | 72 | news.politics_us | **-5 geopolitics** default (diplomatic-beat depth has declined per 2006-onward coverage shift). |
| Fox News | 55 | news.politics_us | -10 geopolitics. |
| MSNBC | 55 | news.politics_us | -10 geopolitics. |
| Axios | 65 | news.politics_us | +0 geopolitics.dc_insider when sourced from administration officials. |
| Regional/national outlets without specialist beat | 55 | news.general | Evaluate per-outlet. |

**Tier-5 (state media and unverified sources, default base 25):**

| Source | Base tier | Use | Notes |
|---|---|---|---|
| TASS (Russia) | 25 | Party posture only | NEVER as independent confirmation. Treat as how Russia wants to be heard. |
| RT (Russia) | 20 | Party posture only | Lower than TASS due to greater editorial bias. |
| Press TV (Iran) | 25 | Party posture only | Iranian government public posture. |
| Xinhua / People's Daily / Global Times | 30 | Party posture only | Chinese government positions; Global Times lowest of the three for factual reporting. |
| IRNA (Iran state news) | 28 | Party posture only | |
| Anatolian Agency (Turkey semi-official) | 45 | Party posture, some independence | Better than most state media; still treat with +20 noise penalty. |
| State broadcasters (general) | 25 | Party posture only | Apply to conflict parties; state broadcasters in non-party states (e.g., BBC for a non-UK conflict) are still Tier-2. |

**Named diplomatic correspondent modifier:** +5 to effective score when a story is bylined by a named correspondent with established diplomatic-beat credentials. Current (as of 2026) named correspondents with +5 personal modifier: John Hudson (*WaPo*), Michele Kelemen (NPR), Shaun Tandon (AFP), Carol Morello (*WaPo*), Anne Gearan (*WaPo*). List is maintained; add/remove as beat assignments change.

**Regional specialist bonus:** +10 to sources with demonstrated track record on a specific region or conflict type. The bonus applies when the source's primary expertise matches the signal's region. Bonus is additive on top of base tier. Use domain modifiers (e.g., `geopolitics.mena = +15` for Al Jazeera) rather than free-form adjustment.

### News (non-geopolitics)

The general-news tier listing above covers domestic-political and general-interest coverage. When a news story is primarily geopolitical, use the geopolitics tier structure above; when primarily domestic, general-news tiers apply.

**Wikipedia:** tier 65 as reference pointer, -15 when used as primary source (effective 50). Wikipedia is valuable for orientation and source aggregation but should never be the sole source for a claim.

### Sports

| Source | Base tier | Primary domain |
|---|---|---|
| Official league data (NFL/NBA/MLB/NHL GSIS and equivalents) | 95 | sports.{league}.official |
| Pro Football Reference | 88 | sports.nfl.data |
| PFF | 82 | sports.nfl.analytics |
| Adam Schefter | 82 | sports.nfl.breaking_news |
| Adrian Wojnarowski | 82 | sports.nba.breaking_news |
| Shams Charania | 80 | sports.nba.breaking_news |
| ESPN editorial | 70 | sports.general |
| RotoWire | 72 | sports.nfl.fantasy, sports.nba.fantasy |
| FantasyPros | 70 | sports.nfl.fantasy |
| Draft Sharks | 68 | sports.nfl.fantasy |
| Team official accounts | 72 | sports.{team}.official — apply bias discount on gameday injury info |
| Generic fantasy sites | 50 | sports.{sport}.fantasy — evaluate per-author |

### Prediction markets

| Source | Base tier | Primary domain |
|---|---|---|
| Polymarket price feed | 85 | prediction_markets.polymarket |
| Kalshi price feed | 85 | prediction_markets.kalshi |
| Manifold price feed | 60 | prediction_markets.manifold (play-money; treat separately) |
| PredictIt price feed | 75 | prediction_markets.predictit |
| Polymarket Analytics | 78 | prediction_markets.polymarket.analysis |
| Venue commentary (comments sections) | 25 | prediction_markets — treat as retail sentiment, not signal |

### Social and alternative

| Source | Base tier | Notes |
|---|---|---|
| Verified official government accounts | 88 | Apply bias discount (+/-) based on political positioning |
| Verified official company accounts | 78 | Gameday/earnings-adjacent content has known bias |
| Individual journalists (beat-specific) | Variable | Evaluate per-handle with domain modifiers |
| Anonymous social accounts | 15 | Default low; rare exceptions for historically-accurate anonymous handles |
| Reddit (topic-specific subreddits) | 35-50 | Varies significantly by subreddit moderation quality |
| Substack/independent newsletters | 40-70 | Evaluate per-newsletter |

---

## Usage in the SSS formula

The SourceReliability component in the SSS formula pulls from this skill. The query pattern:

```
Given: signal_sources = [list of source identifiers], signal_domain = <domain>

For each source:
  base_tier = lookup(source, 'base_tier')
  modifier = lookup(source, 'domain_modifiers', signal_domain) or 0
  effective_score = clamp(base_tier + modifier, 0, 100)

SourceReliability = weighted_average(effective_scores, weighted by source contribution)
```

**Weighting by contribution:** if a signal cites three sources but one provides 80% of the corroborating evidence, that source's effective score weights accordingly. The weighting comes from the enrichment report or the calling skill's declaration.

**Unseen sources:** when a source isn't in the curated set and hasn't been heuristically scored, the calling skill receives a flag requesting triage before proceeding. Default fallback (used only when Stage 1.5's fetch budget is exhausted): treat as effective_score = 40, provisional: true, with a NoisePenalty bump of +5 flagged in the audit layer.

---

## Integration with other skills

**`infera-signal-interpretation`:** the domain extensions currently hard-code Tier-N defaults (e.g., markets extension says "Tier-1 = 90"). Once this skill is active, those defaults are deprecated in favor of actual source lookups. The extensions will still name their preferred source tiers for documentation, but the effective score comes from this skill.

**`infera-narrative-integrity`:** the ideological-diversity check on corroborating sources queries this skill for bias coordinates. Three sources with bias coordinates of (-70, +20), (-65, +15), (-60, +25) are recognized as low-diversity despite appearing numerically diverse.

**`infera-outcome-learning`:** scored interpretations contribute to Method C adjustment over time. Per-source calibration deltas (how often claims from this source turn out to match their stated confidence) accumulate, and periodic recalibration cycles adjust tiers.

**Future `infera-personal-feed`:** bias coordinates enable the contrarian-perspective feature. Users receiving a feed heavy on sources in one bias quadrant get automatic counter-weighting from the opposite quadrant.

---

## Maintenance and recalibration

**Scheduled cycles:**
- **Monthly:** review flagged novel sources from Method B heuristic scoring. Promote to Method A curation where appropriate.
- **Quarterly:** run Method C outcome-calibration on sources with 30+ resolved-citations. Surface recommendations to human reviewer.
- **Annually:** full curation review of Method A seed set. Tier drift happens — a reliable source can deteriorate, a new source can establish credibility.

**Event-driven recalibration:**
- **Major accuracy failure:** a source publishes a materially incorrect claim that Infera interpreted. Flag for immediate review.
- **Ownership or editorial change:** a source changes ownership, leadership, or editorial direction. Flag for tier review.
- **Platform policy change:** significant changes to moderation, verification, or AI-disclosure policies trigger bias or tier adjustment.

---

## Cold-start handling

This skill has the same cold-start problem as `infera-outcome-learning`. The seed set of Method A values provides initial coverage. Method B handles new sources provisionally. Method C refinements only start after outcome data accumulates.

During cold-start:
- The skill should honestly flag source scores as `provisional` when they come from Method B heuristics without Method A confirmation.
- Interpretations relying heavily on provisional sources should carry a `source_confidence: provisional` flag visible to narrative-integrity.
- The UX should make provisional source scoring discoverable — not hidden.

---

## What this skill intentionally avoids

**Automated bias detection from article text.** Systems that try to classify bias from content alone produce noisy results and often codify the classifier's own biases. Bias coordinates are human-curated for the seed set, and changes require human review. Method B heuristics do not attempt to infer bias from writing style.

**Single aggregate "trust score."** Reliability, bias, and domain competence are tracked separately because they answer different questions. Collapsing them into a single number loses information that downstream skills actually use.

**Silencing low-tier sources.** A Tier-3 source carrying a signal that Tier-1 sources haven't picked up yet is still data. The skill weights appropriately; it does not remove sources from consideration.

**Political bias adjustment based on editorial content alone.** Sources are rated for bias based on framing patterns observed over time, not on any single article's political content.

---

## Example: US-Iran interpretation re-examined

From our test run, the sources cited were: Polymarket page, AP, CNN, Time, Al Jazeera, Wikipedia, CNBC (MS NOW attribution), Bloomberg (Kalshi coverage), Euronews.

Running through this skill:

```
sources_queried: [
  {id: "Polymarket", base_tier: 85, domain_modifier: "prediction_markets.polymarket = +0", effective: 85, bias: (0, -10)},
  {id: "Associated Press", base_tier: 88, domain_modifier: "geopolitics.general = +0", effective: 88, bias: (-5, +10)},
  {id: "CNN", base_tier: 72, domain_modifier: "news.politics_us = +0, geopolitics = -5", effective: 67, bias: (-35, +15)},
  {id: "Time", base_tier: 70, domain_modifier: "geopolitics = -5", effective: 65, bias: (-15, +5)},
  {id: "Al Jazeera", base_tier: 70, domain_modifier: "geopolitics.mena = +15", effective: 85, bias: (-10, -20)},
  {id: "Wikipedia", base_tier: 65, domain_modifier: "-15 as primary source (treat as pointer)", effective: 50, bias: (0, +5)},
  {id: "Bloomberg", base_tier: 90, domain_modifier: "geopolitics = -5", effective: 85, bias: (+5, +20)}
]

weighted_average SourceReliability = 75
bias_distribution: ideological axis spans -35 to +5 (moderate left-of-center cluster with one neutral outlier), establishment axis spans -20 to +20 (diverse)
```

**What this tells us that the hard-coded Tier-3 = 70 default in the last test did not:**
- The effective SourceReliability of 75 is higher than the flat 70-85 defaults we used, because Al Jazeera gets a +15 MENA modifier that reflects its real competence for this story.
- The ideological bias is clustered slightly left-of-center. Narrative-integrity should note this as low ideological diversity and potentially flag the interpretation for contrarian-perspective corroboration.
- The establishment bias axis is genuinely diverse (-20 to +20), which strengthens the corroboration — sources disagree about establishment positioning but agree on facts.

This is the signal the previous interpretation pipeline wasn't surfacing. With source-triage active, the SourceReliability component becomes a precise, domain-aware number rather than a flat default.

---

## Version notes

- **v0.2** expanded geopolitics/news tier structure to support `infera-signal-interpretation-geopolitics` extension (Session 2, 2026-04-19). Geopolitics tier structure now spans Tier-1 (primary sources) through Tier-5 (state media), with explicit named-correspondent bonuses and regional-specialist modifiers. State-media sources (TASS, RT, Press TV, Xinhua, etc.) now have explicit "party posture only" designation to prevent use as independent confirmation. Seed set grew from ~40 sources to ~65 sources.
- **v0.1** initial draft. Seed set of ~40 sources across four domains; full 200-source curation deferred to production build-out. Method B heuristic factors are starting values; should be tuned against real novel-source encounters. Method C outcome calibration is specified but cannot run until `infera-outcome-learning` has accumulated data.
- Bias coordinates are scaled -100 to +100 for clarity; internal storage can be fractional.
- Expect this skill to evolve faster than the interpretation skills — the source landscape shifts, new outlets emerge, existing ones drift.
