---
name: infera-signal-interpretation-markets
description: "Markets and news domain extension for Infera's signal interpretation. Loads alongside infera-signal-interpretation when the event involves equities, ETFs, futures, FX, crypto, commodities, fixed income, options flow, or news that moves markets. Provides the market-specific pattern library (archetype definitions), SSS component scoring rules for market data, and domain-specific failure modes. Triggers: ticker symbols, price/volume references, 'market,' 'stock,' 'trading,' 'earnings,' 'Fed,' 'yield,' 'crypto,' or any financial instrument or macro economic event."
---

# Infera Signal Interpretation — Markets Extension

## What this skill is

This is the domain extension that fills in the pattern library and scoring rules for market and news signals. It does nothing on its own — it loads alongside `infera-signal-interpretation` (the core flow) and supplies:

1. **Archetype library** — the named patterns a market signal can match
2. **SSS component scoring rules** — how to score each SSS component for market data
3. **Domain failure modes** — market-specific noise patterns the interpretation flow must catch

This skill does not contain interpretation logic. That lives in the core skill. This one is pure domain knowledge.

---

## Archetype library

Every archetype below is a named interpretation pattern. When the core skill's Stage 3 (Pattern Match) runs, it returns one or more of these archetypes with historical-match scores.

**Frame applicability for this library:** the archetypes here are `market_instrument`-framed — they describe patterns in how traditional securities markets (equities, FX, options, fixed income, crypto, commodities) behave. For `real_world_event`-framed analysis of news or corporate events, this library is not the right fit; that work is currently routed to domain extensions that don't yet exist (`infera-signal-interpretation-news` is a known gap). `specific_outcome` framing is not generally meaningful for traditional markets (outcomes are continuous prices, not discrete outcomes), so this frame is rarely used here.

### `distribution_into_strength`
- **Pattern:** Price holds or rises modestly while volume spikes well above baseline.
- **Reading:** Large holders are selling into retail enthusiasm. Technical appearance is bullish; flow is bearish.
- **Supporting signals:** Volume > 200% of 30-day avg, price change < +1%, options put/call skew rising, large block trades visible.
- **Disconfirming signals:** Accumulation pattern in dark pool prints, insider buying filings, options call sweeps.
- **Common false positives:** Index rebalancing days, options expiration, earnings-day volume.

### `capitulation_bounce`
- **Pattern:** Sharp decline followed by volume spike at the low and reversal.
- **Reading:** Forced selling exhausted; marginal buyers are stepping in.
- **Supporting signals:** Price drop > 2 sigma from 20-day mean, volume 3x+ average, tape pattern shows absorption, VIX or vol proxy spiking then relaxing.
- **Disconfirming signals:** No volume increase at low, downward continuation without pause, credit spreads still widening.
- **Common false positives:** News-driven spikes that reverse but are not capitulation (e.g., confirmed rumor denial).

### `news_latency_arbitrage`
- **Pattern:** Measurable price movement before news is widely distributed.
- **Reading:** Informed flow is acting on information not yet in public sources. May be leak, may be pattern anticipation, may be coincidence.
- **Supporting signals:** Abnormal volume or price move preceding confirmed news by 10+ minutes, cross-asset movement in correlated names, options unusual activity on the name.
- **Disconfirming signals:** Correlated sector-wide move (not name-specific), no follow-through after news prints, move falls within normal session variance.
- **Common false positives:** Algorithmic reaction to related tickers, scheduled economic releases, index rebalancing.

### `liquidity_vacuum`
- **Pattern:** Outsized price move on below-average volume.
- **Reading:** Thin book allowed small flow to create large price impact. Move is mechanically real but economically thin.
- **Supporting signals:** Volume < 50% of 30-day avg, bid-ask spread wider than normal, time-of-day near session open/close or holiday-adjacent, small order flow moving large price range.
- **Disconfirming signals:** Volume normal or elevated, move corroborated across correlated assets.
- **Common false positives:** Genuine thin markets during legitimate low-activity sessions (August, late December).

### `sentiment_inflection`
- **Pattern:** Social/news sentiment flips direction before or alongside price.
- **Reading:** Narrative regime change; the story the market was telling about this name is shifting.
- **Supporting signals:** Sentiment score change > 1.5 sigma across multiple sources, engagement volume rising, tone shift in analyst notes, mention-adjacency changes.
- **Disconfirming signals:** Sentiment move confined to single platform/source, volume of sentiment signal flat, no price corroboration within 48 hours.
- **Common false positives:** Bot-amplified posts, single-influencer effects, meme-driven spikes.

### `cross_asset_divergence`
- **Pattern:** Historically correlated assets move opposite directions on the same catalyst.
- **Reading:** One market is mispricing the catalyst. The divergence is itself the signal — which one is wrong is the question.
- **Supporting signals:** Correlation breakdown > 2 sigma from 90-day norm, both assets showing above-average volume, catalyst is shared (macro print, Fed action, geopolitical event).
- **Disconfirming signals:** One asset has idiosyncratic news, liquidity disparity explains the divergence, prior correlation was weak.
- **Common false positives:** End-of-quarter positioning, single-name events misread as cross-asset signal.

### `earnings_reaction_misread`
- **Pattern:** Stock moves counter to the apparent tone of the earnings report.
- **Reading:** Market is pricing something the headline didn't capture — guidance, whisper numbers, cohort dynamics, management tone.
- **Supporting signals:** Price action diverges from EPS/revenue surprise direction, options skew shifts mid-call, sector peers trading in sympathy with price action not the headline.
- **Disconfirming signals:** Move explained by one-time items disclosed in filings, short-cover dynamics, pre-announcement pricing.
- **Common false positives:** Low-float stocks where small flow moves price regardless of fundamentals.

### `regulatory_shock`
- **Pattern:** Sudden price move coinciding with regulatory announcement, filing, or rumor.
- **Reading:** Material change in the legal or operating environment for the entity or sector.
- **Supporting signals:** Official filing timestamp matches move, sector-wide contagion to similarly-exposed names, implied vol spike.
- **Disconfirming signals:** Rumor source untraceable, no confirmation in official channels within 2 hours, move isolated to single name without peer reaction.
- **Common false positives:** Seasonal regulatory noise (OpEx, quarterly filings), misread of routine disclosures.

### `macro_regime_break`
- **Pattern:** Assets across multiple classes all reprice simultaneously, suggesting regime change.
- **Reading:** The macro backdrop (rates, growth expectations, risk appetite) has shifted. Individual name signals are secondary to the regime signal.
- **Supporting signals:** Moves in bonds + equities + FX + commodities all consistent with a single narrative (e.g., "growth repricing"), VIX term structure shifting, yield curve changing shape.
- **Disconfirming signals:** Moves confined to single asset class, idiosyncratic narrative explains individual legs.
- **Common false positives:** End-of-month rebalancing, quarter-end flow, options expiration.

---

## Unclassified handling

If no archetype scores above 30 historical-match confidence, the core skill will tag the event `unclassified`. Markets-domain unclassified events should be logged with extra care because they are disproportionately valuable:

- **Novel patterns** deserve study — log all features of the event for Learning Engine review.
- **Edge cases** of existing archetypes may indicate the archetype needs refinement — flag the closest-matching archetype even below threshold.
- **Data artifacts** (bad prints, erroneous trades, feed glitches) need to be distinguished from genuine novelty — cross-check against the exchange's error/cancel feeds.

---

## Enrichment requirements (Stage 1.5)

When the core skill's Stage 1.5 runs for a markets-domain event, it consults this section to decide what to fetch. Requirements are prioritized so the fetch budget is spent on what matters most.

### High priority (needed for SSS to be meaningful)

- **Price history** — at minimum, 20 trading sessions preceding the event. Without this, MarketMovement cannot be scored (no baseline for sigma calculations) and TemporalConsistency cannot be evaluated.
- **Volume history** — 30-session rolling average and the event-window volume. Without this, Liquidity cannot be scored and several NoisePenalty factors (thin-session, OpEx mechanics) cannot be evaluated.
- **Bid-ask spread and order-book depth at event time** — informs both Liquidity and NoisePenalty. Often available from the same fetch as price data if the source supports it.

### Medium priority (disambiguates between archetypes)

- **Cross-asset moves** — sector peers for equities, related currencies for FX, commodity correlates, sovereign bond moves for credit events. Informs CrossSignalConfirmation and the `cross_asset_divergence` and `macro_regime_break` archetypes specifically.
- **Options flow and implied volatility** — unusual-activity flags, put/call skew changes, ATM-IV movement. Informs the `news_latency_arbitrage`, `distribution_into_strength`, and `regulatory_shock` archetypes.
- **News flow within ±24 hours** — regulatory filings, company announcements, major wire service items mentioning the entity. Informs `news_latency_arbitrage` archetype and the SourceReliability/Diversity components.
- **Social sentiment snapshot** — volume and directional tilt on the entity. Informs `sentiment_inflection` archetype specifically.

### Low priority (refines confidence within a band)

- **Historical archetype-match outcomes** — how have similar patterns for this entity or sector resolved previously? Refines confidence but not band.
- **Macro-calendar context** — is the event near a scheduled Fed meeting, CPI release, earnings? Informs NoisePenalty.
- **Prior Infera interpretations for the same entity** — audit-log lookup, not an external fetch. Informs prior_sss for transition-zone direction.

### Fetch-source preferences

When fetching, prefer in this order:
1. Exchange-direct feeds or regulatory-filing primary sources (Tier-1)
2. Established financial data providers — Bloomberg, Reuters, WSJ, FT, official SEC/company channels (Tier-2)
3. Vetted financial media and analyst publications (Tier-3)
4. Aggregators and social-listening tools (Tier-4)

Do not use Tier-5 sources (anonymous social, unverified rumor channels) for enrichment — they contaminate the SourceReliability score without adding signal.

### Signal-specific enrichment shortcuts

- **Polymarket / Kalshi / Manifold / prediction markets:** **Use `infera-signal-interpretation-prediction-markets` instead of this extension.** Prediction markets are structurally distinct from traditional securities markets and have their own archetype library, SSS scoring rules, and failure modes. For events that span both domains (e.g., a stock reacting to a Polymarket signal, or a Polymarket market whose outcome depends on a stock price), both extensions should load together. The core interpretation flow will integrate archetype matches from both libraries.
- **Earnings events:** fetch the actual release document, the consensus estimates, and first-15-minute intraday price for the `earnings_reaction_misread` archetype.
- **Crypto events:** fetch from at least two exchanges to control for manipulation risk; include known wash-trading indicators.

---

## SSS component scoring — markets rules

The core skill runs the SSS formula. This extension defines how each component is scored for market signals.

### MarketMovement (0–100)
- **< 0.5 sigma** from 20-day baseline → 0–20
- **0.5–1.0 sigma** → 21–40
- **1.0–2.0 sigma** → 41–65
- **2.0–3.0 sigma** → 66–85
- **> 3.0 sigma** → 86–100

Use log-returns for equities and crypto; absolute basis-point changes for fixed income; percentage moves for FX (adjusted for pair volatility).

### Liquidity (0–100)
- Score based on both order-book depth and realized volume vs. 30-day average.
- **Both below 50% of average** → 0–25 (thin market — signal is suspect)
- **One below average, one normal** → 26–55
- **Both at or above average** → 56–80
- **Both well above average (150%+)** → 81–100

For crypto, use 24-hour liquidity proxies. For illiquid names (small-cap, thin ETFs), adjust the baseline to the name's own distribution, not the market average.

### SourceReliability (0–100)
- Provided by `infera-source-triage`. Markets-domain sources have a priors table:
- Tier-1 (exchange direct feeds, regulatory filings): default 90
- Tier-2 (Bloomberg, Reuters, WSJ, FT, official company disclosures): default 80
- Tier-3 (major financial media, vetted analyst reports): default 65
- Tier-4 (social media with verified accounts, niche financial blogs): default 40
- Tier-5 (anonymous social, unverified rumors): default 15
- These are starting points; `infera-source-triage` applies per-source calibration from historical performance.

### Diversity (0–100)
- 1 source category: 0
- 2 categories: 33
- 3 categories: 66
- 4+ categories: 100

Market-domain categories: exchange data, regulatory filing, newswire, company official, analyst note, options flow, social/sentiment, alternative data (satellite, credit card, etc.).

### TemporalConsistency (0–100)
- **Single-tick spike, no follow-through** → 0–20
- **Persists 5–30 minutes** → 21–45
- **Persists 30 minutes–4 hours** → 46–70
- **Persists through session close** → 71–90
- **Multi-session persistence** → 91–100

Decay-weight recent signals: a signal strong an hour ago but fading now should score lower than one climbing steadily.

### CrossSignalConfirmation (0–100)
- **Only source domain shows the signal** → 0–20
- **One additional domain corroborates** → 21–45
- **Two additional domains** → 46–70
- **Three or more domains, all aligned** → 71–100

Domains for markets: price/volume, options flow, news, social, macro, sector-peer behavior, credit spreads, FX, commodities.

### NoisePenalty (0–100, subtracted)
Apply penalties cumulatively for any that apply:
- Thin-liquidity session (pre-market, after-hours, holiday-adjacent): +15
- Single-source signal with no cross-domain confirmation: +20
- Known manipulation pattern active (pump-and-dump, wash trading indicators): +30
- Weekend or overnight gap (for equities): +10
- Options expiration day: +10
- Index rebalancing day: +10
- Earnings day noise (first 15 minutes post-release): +15

Cap the cumulative NoisePenalty at 80. A signal can't be drowned entirely in penalties — at some point the penalty stack means the signal just shouldn't be scored, and the core skill should return Rule D (insufficient data) instead.

---

## Domain-specific failure modes

Markets-specific things the interpretation flow must catch:

**False-flag earnings reactions.** The first 15 minutes after an earnings print are often algorithmic chaos. Don't interpret anything in that window as a durable signal — flag it `earnings_noise_window` and wait.

**OpEx distortion.** Options expiration days produce mechanical moves that look like genuine signals. Always check whether the signal time falls on a monthly or quarterly OpEx.

**Index flow masquerading as single-name signal.** When a stock moves hard on no news, check whether an index including it is rebalancing or if an ETF inflow/outflow explains the move. Single-name archetypes misapplied to index-driven moves is a common failure.

**News latency reversal.** A signal tagged `news_latency_arbitrage` must be revisited when the news finally prints. If the price move was in the *wrong* direction relative to the actual news, the archetype was wrong — log as a Learning Engine event.

**Cross-market correlation breaks.** When correlations break, the default assumption should not be that the break is the signal — often one market is just slow. Require corroboration before assigning `cross_asset_divergence`.

**Thin-name amplification.** Small-cap and low-float names produce outsized moves on minimal flow. Adjust MarketMovement scoring downward for names with market cap below a threshold (suggest $500M) or average daily volume below a threshold (suggest $5M).

**Crypto-specific:** watch for known wash-trading venues and manipulated pairs. Signals from exchanges with documented volume inflation must carry a NoisePenalty of at least +25.

---

## Version notes

- **Archetype library version: 0.1** — initial draft, nine archetypes. Will expand as real signals are processed and the Learning Engine flags gaps.
- Archetypes should be treated as stable interfaces. Adding new archetypes is easy; changing the definition of an existing one requires a version bump and a log entry because historical audit data references these names.
