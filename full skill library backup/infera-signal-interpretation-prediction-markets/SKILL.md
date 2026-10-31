---
name: infera-signal-interpretation-prediction-markets
description: "Prediction markets domain extension for Infera's signal interpretation. Loads alongside infera-signal-interpretation when the event involves Polymarket, Kalshi, Manifold, PredictIt, or any event-contract / binary-resolution market. Provides the prediction-market-specific pattern library, SSS component scoring rules for event-contract data, and domain-specific failure modes. Prediction markets are structurally distinct from traditional securities markets — they have binary resolution, time-gated outcomes, cumulative probability distributions, oracle-based settlement, and tightly event-dependent liquidity. Triggers: 'Polymarket,' 'Kalshi,' 'Manifold,' 'PredictIt,' 'prediction market,' 'event contract,' probability language on specific future events, or any URL containing polymarket.com, kalshi.com, manifold.markets."
---

# Infera Signal Interpretation — Prediction Markets Extension

## What this skill is

This is the domain extension that fills in the pattern library and scoring rules for prediction-market events. It does nothing on its own — it loads alongside `infera-signal-interpretation` (the core flow) and supplies:

1. **Archetype library** — the named patterns a prediction-market signal can match
2. **SSS component scoring rules** — how to score each SSS component for prediction-market data
3. **Domain failure modes** — prediction-market-specific noise patterns the interpretation flow must catch

**Why this is a separate extension and not part of the markets extension:** prediction markets are structurally different. They have binary resolution (yes/no, or exclusive-outcome baskets), explicit resolution criteria, time-gated outcome structures, oracle-based settlement, no continuous price discovery in the traditional sense, and liquidity that concentrates around specific events rather than continuous operations. Traditional-market archetypes like "distribution into strength" or "capitulation bounce" don't translate cleanly. A Polymarket event at 77% is fundamentally a different kind of signal than a stock at $77.

**Dual-loading note:** for events that span both domains (e.g., a stock market reaction to a Polymarket signal, or a Polymarket event whose outcome depends on a market signal), both this skill and `infera-signal-interpretation-markets` should load together. The core flow will integrate archetype matches from both libraries.

Current primary coverage: **Polymarket** (most detailed), **Kalshi** (secondary), general event-contract markets (structural coverage). Manifold, PredictIt, and non-USD venues are structurally covered but have fewer venue-specific calibrations.

---

## Archetype library

**Frame applicability for this library:** the archetypes in this section are predominantly `market_instrument`-framed — they describe patterns in how prediction markets themselves behave. When an event is framed as `real_world_event` (e.g., "a US-Iran diplomatic meeting" rather than "the Polymarket market tracking that meeting"), these archetypes do not apply. A real-world-event interpretation of a geopolitical or sports event should use the news/policy archetypes from the relevant real-world-domain extension (sports extension for sports events, a future `infera-signal-interpretation-geopolitics` or `infera-signal-interpretation-news` extension for news events — not yet built).

For `specific_outcome`-framed events (one specific outcome within a multi-outcome market), the archetypes below apply *except* the cross-outcome ones (`time_gated_cumulative_repricing`, `probability_sum_arbitrage`) — those require the full outcome distribution and are not meaningful on a single outcome.

Individual archetypes below may be tagged with frame restrictions in future versions; for now, the library-level applicability above is the rule.

### `time_gated_cumulative_repricing`
- **Frame:** `market_instrument` only (requires full outcome distribution).
- **Pattern:** A market with time-dated cumulative outcomes (e.g., "event X by April 20, April 22, April 30") sees the later-dated outcomes moving while the shorter-dated ones hold near zero or near 100.
- **Reading:** The market is repricing *when* an event will resolve, not *whether* it will resolve. The signal is about timing probability, not event probability.
- **Supporting signals:** Probabilities monotonically increase across dates (Apr 20 < Apr 22 < Apr 30), the longest-dated outcome shows the most movement, intermediate dates track news flow about timing uncertainty, volume concentrates on the leading-edge outcomes.
- **Disconfirming signals:** Non-monotonic probabilities (indicates market malfunction or outcome-specific information), uniform movement across all dates (suggests meta-event repricing, not timing-specific).
- **Common false positives:** Fresh markets with thin liquidity producing random-looking distributions; markets where the time gates are coincident with other major events.

### `news_driven_diplomatic_repricing` (and policy-event variants)
- **Pattern:** A prediction market on a geopolitical or policy event reprices sharply on news that doesn't directly confirm or deny the underlying question.
- **Reading:** The market is incorporating signals — official statements, mediator activity, leaked positions — before they resolve into confirmed events. This is the prediction-market analog to `news_latency_arbitrage` in traditional markets but structurally cleaner because the resolution is binary.
- **Supporting signals:** Intraday price movement > 3 points without a confirmed resolution-relevant event, multi-source news flow corroborating the direction of movement, official or semi-official statements preceding the move, markets on related events moving in the same direction.
- **Disconfirming signals:** Price movement without corroborating news (suggests manipulation or noise), movement contradicted by authoritative statements, isolated to a single platform when cross-platform listings exist.
- **Common false positives:** Market-maker repositioning; resolution-date proximity effects (see below) mistaken for news-driven; bot-driven mini-moves on low-volume markets.

### `ceasefire_proximity_effect` (and deadline-proximity variants)
- **Pattern:** A prediction market with a resolution date near a real-world forcing deadline (ceasefire expiration, election day, policy deadline) shows endogenous price dynamics as the deadline approaches.
- **Reading:** The resolution-date proximity itself is affecting price, independent of information about the underlying question. Time is a signal.
- **Supporting signals:** Price accelerates or decelerates systematically as the resolution date nears, liquidity spikes near the deadline, volatility expands with fewer days remaining.
- **Disconfirming signals:** No corresponding real-world deadline in play, price movement tracks news rather than time-decay.
- **Common false positives:** News-driven moves coinciding with deadline proximity (both contributing); resolution-criteria ambiguity creating late-stage uncertainty mistaken for time-decay.

### `whale_dominated_consensus`
- **Pattern:** A market's price is set primarily by a small number of large positions rather than broad participation.
- **Reading:** The "consensus" is not actually crowd wisdom — it's a few informed or uninformed whales establishing the level. Reliability depends on whether the whales are informed.
- **Supporting signals:** Top-holder concentration > 60% of open interest, volume dominated by handful of wallet addresses (on-chain markets), comment activity disproportionately from few accounts, single-trade prints moving the market materially.
- **Disconfirming signals:** Broad distribution of positions, many independent voices in market discussion, trade history shows many small-ticket participants.
- **Common false positives:** Natural concentration in niche markets where few people have expertise; early-market phases where only experts have priced in.

### `probability_sum_arbitrage`
- **Pattern:** Outcome probabilities in an exclusive-outcome market (only one can happen) sum meaningfully above 100% or below 100%.
- **Reading:** The market is mispriced as a basket, which means either (a) fee/friction structure prevents arbitrage despite retail visibility, (b) traders are selectively active only on outcomes they care about, or (c) the market is thin enough that no one has bothered to close the arb.
- **Supporting signals:** Sum of all outcome probabilities > 105% or < 95%; no recent arbitrage activity visible; spread of outcome-level volumes is uneven; many low-volume satellite outcomes that aren't being traded.
- **Disconfirming signals:** Sum close to 100% (efficient basket); active cross-outcome trading; tight spreads across outcomes.
- **Common false positives:** Temporary imbalances during news events that close within hours; resolution ambiguity making some outcomes uncertain.

### `cross_platform_divergence`
- **Pattern:** The same or equivalent event is priced differently on Polymarket and Kalshi (or another venue).
- **Reading:** Either one platform has superior information, the user bases are different (Kalshi more US-regulated and mainstream, Polymarket more crypto-native and global), or there's a structural reason for the divergence (UMA oracle resolution differences, jurisdiction-specific access).
- **Supporting signals:** Price divergence > 5 percentage points on equivalent markets, volume disparity between platforms, distinct commentary communities saying different things on each platform.
- **Disconfirming signals:** Resolution criteria materially differ between the two markets (not the same event despite similar names), one platform's market is thin enough that it's noise-dominated.
- **Common false positives:** Markets that look equivalent but aren't (e.g., "meeting by April 20" vs. "meeting in April" — different resolution).

### `resolution_criteria_ambiguity`
- **Pattern:** The market's price is being affected by interpretation uncertainty about what would resolve it yes/no rather than by outcome uncertainty.
- **Reading:** Traders are pricing in the probability that the resolution question itself gets interpreted one way or the other. This is a meta-signal about the market's own plumbing, not the underlying event.
- **Supporting signals:** High comment activity specifically about resolution criteria, disputed resolution proposals on-chain, price discontinuities when resolution clarification arrives, "UMA dispute" mentions in the activity feed.
- **Disconfirming signals:** Clean resolution criteria; consensus in comments about what would resolve the market; prior similar markets resolved unambiguously.
- **Common false positives:** Resolution criteria that are clear but still produce thoughtful discussion; comment noise mistaken for substantive disputes.

### `market_maker_sag`
- **Pattern:** Bid-ask spreads widen dramatically on an otherwise-active market, or the midpoint drifts unilaterally in the absence of trades.
- **Reading:** The market maker (automated or human) is adjusting inventory or exposure, producing apparent price movement that isn't trade-driven. This is plumbing behavior, not signal.
- **Supporting signals:** Wide spreads (bid-ask > 5% of mid), low trade count per unit time despite apparent price movement, midpoint moves with no corresponding trade history.
- **Disconfirming signals:** Narrow spreads; active trade history explaining movement; volume across multiple independent participants.
- **Common false positives:** Genuine news moves that happen in thin-trading windows; scheduled market rebalancing.

### `fresh_market_noise`
- **Pattern:** A newly-launched market (< 48 hours old) with thin volume shows dramatic price swings.
- **Reading:** The price has not converged yet. Early-market phases are dominated by whoever shows up first, which is often not the best-informed.
- **Supporting signals:** Market age < 48 hours, total volume < $10K, per-outcome volume < $1K on leaders, price range on day one > 15 percentage points, few distinct traders.
- **Disconfirming signals:** Established market with thin volume (different pattern); market on a well-understood event where prior knowledge dominates early; clear news driving the early price.
- **Common false positives:** Fresh markets that happen to price correctly on day one due to obvious consensus.

### `resolution_proximity_whipsaw`
- **Pattern:** In the final hours or days before resolution, price swings violently as the outcome becomes more certain in one direction or another.
- **Reading:** End-of-life volatility on binary markets. Individual traders are closing positions, news breaks can pin the price, and the market behaves like a high-theta option.
- **Supporting signals:** Hours-to-days from resolution, large swings relative to market's recent history, concentrated volume in the final window, explicit news-of-outcome approaching.
- **Disconfirming signals:** Stable price into resolution (suggests consensus was right all along); movement disconnected from resolution-relevant news.
- **Common false positives:** News-driven moves that happen to occur near resolution but aren't primarily proximity-driven.

### `elimination_yield_harvesting`
- **Frame:** `market_instrument` only. This archetype describes venue-structural behavior, not signal about the underlying question.
- **Pattern:** On a long-dated multi-outcome market with a resolution clause allowing early NO-resolution for mathematically-eliminated outcomes, volume on lowest-probability outcomes dramatically exceeds volume on leading contenders.
- **Reading:** The market is functioning as two instruments simultaneously — a prediction market on the front of the book (the leading-probability outcomes where the genuine signal lives) and a yield-collection vehicle on the back (the near-0% outcomes where traders are harvesting the ~1¢ NO-side yield as outcomes get mathematically eliminated over time). **The back-of-book volume is not signal about the underlying question; it's structured positioning on near-certain NO resolutions.** Interpretations that weight all-outcome volume equally will be misled by this; interpretations that focus on leading-outcome volume will be closer to truth.
- **Three sub-patterns distinguish how the structure developed** (validated against NBA Champion and NBA MVP markets, 2026-04-19):
  - **Pre-emerged:** volume concentration on low-probability outcomes existed at or near market open. Rare — usually indicates a badly-calibrated opening or an unusual launch condition. When it appears, treat as a stronger signal that the market is structurally yield-oriented from inception.
  - **Post-emerged:** volume concentration developed gradually as candidates were eliminated or as news made leaders obvious. This is the typical yield-harvesting pattern. Volume on a now-1% outcome grew over weeks/months as traders progressively took NO-positions at higher and higher price points as reality eliminated the candidate.
  - **Mixed:** both active yield-harvesting and residual losing positions from earlier bets contribute to the pattern. Common on player-award markets and other markets with strong pre-event retail interest. When sub-pattern is mixed, back-of-book volume is less cleanly "structural noise" and has genuine sentiment residue that may carry weak signal about narrative dynamics.
- **Supporting signals:** Sum of top-5-volume outcomes significantly exceeds sum of top-5-price outcomes (volume concentrated where probability isn't); leading outcomes priced below 1% with volumes in the top decile of the market; the market's resolution mechanism allows NO-resolution on mathematical elimination (e.g., NBA Champion markets: teams NO-resolve when eliminated from playoffs); market age spans multiple months with time for yield-harvesting strategies to establish; sustained low-probability outcome volume rather than single-moment spikes.
- **Disconfirming signals:** Top-volume outcomes are also top-price outcomes (volume and conviction align — this is a normal market); market lacks an early-NO resolution clause (no yield to harvest); short-dated market where the time horizon doesn't justify the strategy; genuinely uncertain field where even "long-shot" outcomes have legitimate probability.
- **Common false positives:** Retail long-shot concentration on beloved teams (Knicks, Lakers, Warriors in NBA championship markets; 49ers, Cowboys in NFL) that looks like yield-harvesting but is actually sentiment-driven retail trading; cross-platform arbitrage flows that appear local but are structural; large initial long-shot purchases that haven't yet been matched by yield-harvesters. **Special caution on player-award markets (MVP, DPOY, ROY, etc.):** these markets carry substantial heritage-player sentiment that bleeds into the pattern in ways team-championship markets do not. LeBron / Curry / Durant at 1% in an MVP market will attract sentiment volume regardless of yield dynamics. Default to the **mixed** sub-pattern on player-award markets unless evidence strongly supports pure yield-harvesting.
- **Sub-pattern identification:** if volume-weighted average entry price data is available for high-volume low-probability outcomes, entry prices consistently *above* current price indicates harvesting (traders bought NO at higher-prob moments); entry prices *below* current price indicates sentiment residue (traders bought YES expecting the outcome, and the position deteriorated). Without on-chain data, identification defaults to contextual reasoning — team-championship markets skew post-emerged; player-award markets skew mixed; fresh markets with this pattern skew pre-emerged.
- **Practical implication for interpretation:** when this archetype fires, strip back-of-book outcomes from SSS component scoring and compute MarketMovement / Liquidity on the top-quartile-probability outcomes only. This archetype is a *filter to apply before running other archetypes*, not a competing explanation — it tells the pipeline which slice of the market carries the signal and which slice is structural noise.

### `vote_already_cast_resolution_lag`
- **Frame:** `market_instrument` or `specific_outcome` — both eligible.
- **Pattern:** A market's resolution is determined by a discrete decision (a vote, an announcement, a ruling, a committee decision) that has already occurred but has not been publicly announced. The market is waiting for disclosure of a predetermined outcome, not for new information.
- **Reading:** New information cannot change the outcome — only leaks, procedural announcements, or mistakes can move the price. Standard news-driven repricing archetypes do not apply because there is no news left to integrate; the outcome is already determined. The market is in an "information decay" phase where remaining uncertainty reflects (a) public knowledge gaps about what voters or deciders actually did, (b) disclosure-mechanism timing uncertainty, and (c) any non-zero probability of procedural reversal or invalidation.
- **Supporting signals:** Clear signal that the determining event has occurred (regular season ended for MVP voting, court case concluded for ruling markets, committee met for awards, ballot deadline passed for elections pending certification); leading outcome price significantly below 99% but plateauing rather than rising; volume decline compared to pre-determination-event baseline; commentary in market discussion focused on "when will they announce" rather than "who will win"; historical precedent for outcome reversal on this type of decision is very low; resolution criteria explicitly tied to public announcement of a decision rather than to an observable outcome.
- **Disconfirming signals:** The determining event has not yet occurred; price is still moving materially on news (suggests information does still matter, so voting/decision isn't truly complete); multiple live candidates retain meaningful probability mass (suggests decision-makers haven't converged, or the vote hasn't actually happened yet); market commentary focused on substantive developments rather than disclosure timing.
- **Common false positives:** Markets where the vote or decision is procedurally "done" but still actually contested (close elections with pending certifications; legal rulings pending appeal; committee decisions subject to formal challenge); markets where public information tracks the private decision so closely that the resolution-lag is trivial (the market has already effectively resolved in practice); markets where the "determining event" is ongoing rather than completed (a multi-round vote where only the first round has occurred).
- **Time-evolution under this archetype:** price should be stable or slowly compressing toward the announced outcome, not volatile. Material volatility in this state is itself a signal — of news leak, upset expectation, or evidence that the determining event wasn't as decisive as assumed. Observing unexpected volatility during a `vote_already_cast_resolution_lag` window should prompt a check on whether the archetype still applies.
- **Applicability beyond awards:** this archetype applies to any market where a discrete human decision (not an observable real-world event) resolves the market, and where that decision has been made but not announced. Examples: sports awards (MVP, DPOY, ROY, Coach of the Year); Nobel/Pulitzer/Emmy/Oscar markets post-vote pre-announcement; Supreme Court ruling markets after oral arguments and conference but before opinion release; NFL Draft pick markets in the final 48 hours before the draft (when team decisions are largely locked); some election markets in the window between ballot deadline and certification. Does NOT apply to markets resolved by observable real-world events (sports championships, elections during voting, market-price levels) — those integrate new information right up to resolution.

### `retail_narrative_cascade`
- **Pattern:** A prediction market's price moves in ways that track social-media narrative intensity rather than underlying event probability.
- **Reading:** Retail traders are pricing the vibe, not the event. The market has become a sentiment thermometer rather than an information aggregator.
- **Supporting signals:** Price correlates with Twitter/X engagement more than with authoritative news, comment activity surging disproportionately to volume, meme-content presence in market discussion, known influencer mentions preceding moves.
- **Disconfirming signals:** Price anchored to authoritative data sources; professional commentary dominant; movement preceding retail chatter rather than following it.
- **Common false positives:** Markets where the event really is sentiment-driven (meme stock analogs); markets where influencers are actually informed.

---

## Unclassified handling

Prediction-market unclassified events often come from:

- **Novel event types** that don't have historical analogs (e.g., first-ever Trump social-media-based resolution markets).
- **Exotic resolution mechanisms** — markets tied to oracle panel decisions, multi-source resolution with ambiguous tiebreakers.
- **Cross-domain markets** that span prediction markets and traditional assets (e.g., "will TSLA hit $500 *and* Trump tweet about it" compound events).
- **New venue launches** — markets on Manifold, Kalshi's newer product lines, or non-USD venues with different trading dynamics.

Log unclassified prediction-market events with the platform, market category, resolution mechanism, and closest-matching archetype for Learning Engine review. The prediction-market space evolves quickly — what's unclassified this month may need a new archetype next quarter.

---

## SSS component scoring — prediction-markets rules

### MarketMovement (0–100)
"Movement" in prediction markets is measured in percentage points of implied probability, not log-returns.

- **< 1 percentage point** intraday → 0–15
- **1–3 points** → 16–35
- **3–6 points** → 36–55
- **6–12 points** → 56–75
- **12–20 points** → 76–90
- **> 20 points** → 91–100

For movement across longer windows (day-over-day, week-over-week), use the same scale but adjust the time reference. A 6-point weekly move is a weaker signal than a 6-point intraday move on the same market.

For cumulative markets with multiple outcomes, compute MarketMovement on the largest-volume outcome unless the event specifies otherwise.

### Liquidity (0–100)
Prediction-market liquidity requires two measures: total market volume and per-outcome volume.

- **Total market volume < $10K** → 0–20 (fresh-market-noise territory)
- **$10K–$100K** → 21–45
- **$100K–$1M** → 46–65
- **$1M–$10M** → 66–85
- **> $10M** → 86–100

Adjust for per-outcome concentration: if the leading outcome's volume is less than 10% of total market volume, subtract 15 points (the market is fragmented and individual outcomes are less reliable than the market total suggests).

For multi-platform events: combine volume across Polymarket + Kalshi + others if the markets are genuinely equivalent, with a 10-point bonus for cross-platform volume (signals confirmation across different user bases).

### SourceReliability (0–100)
Prediction-market source priors:

- **Tier-1 (primary venue data):** Polymarket's own price feed, Kalshi's own data, Manifold's public data. Default: 85. (Slightly below traditional-market Tier-1 because of manipulation risk and thinner oversight than exchanges.)
- **Tier-2 (aggregators with integrity checks):** Polymarket Analytics, independent dashboards, academic prediction-market research. Default: 75.
- **Tier-3 (financial media covering prediction markets):** Bloomberg, CNBC, major financial press coverage of specific markets. Default: 65.
- **Tier-4 (general crypto/finance media):** Generalist coverage with varying accuracy. Default: 50.
- **Tier-5 (influencer/commentator content):** Treat as unverified. Default: 25.

Cross-venue confirmation significantly improves SourceReliability — if Polymarket and Kalshi prices agree on an equivalent market within 3 percentage points, add 10 points to the effective SourceReliability score.

### Diversity (0–100)
Categories for prediction markets:
- Primary venue (Polymarket / Kalshi / Manifold)
- Cross-venue comparison
- Authoritative news source corroborating the event direction
- Official or semi-official statement (government, company, regulator)
- On-chain / trade-history analytics
- Prior similar market outcomes
- Market-maker commentary or structural analysis

Scoring:
- 1 category: 0
- 2 categories: 33
- 3 categories: 66
- 4+ categories: 100

### TemporalConsistency (0–100)
Prediction markets have shorter lives than traditional markets, so the temporal scale compresses.

- **Single snapshot, no history available:** 0–20
- **Hours of consistent positioning:** 21–40
- **Days of consistent positioning:** 41–60
- **Weeks with position stability:** 61–80
- **Months of market life with stable positioning or coherent trajectory:** 81–100

The trajectory matters as much as the stability: a market that drifted up over two weeks from 30% to 75% shows a coherent narrative trajectory and scores higher than a market that bounced erratically in the same range.

### CrossSignalConfirmation (0–100)
Domains for prediction markets:
- Prediction-market price/volume
- Authoritative news flow
- Official statements (government, company, league)
- Social sentiment (when relevant)
- Related prediction markets (e.g., nuclear deal probability, ceasefire probability corroborating meeting probability)
- On-chain / wallet analysis
- Cross-platform equivalent markets

Scoring:
- Single domain: 0–20
- 2 domains aligned: 21–45
- 3 domains aligned: 46–70
- 4+ domains aligned: 71–100

**Special case:** if a cross-platform equivalent market exists and aligns within 3 percentage points, add a 15-point bonus. Cross-platform confirmation is particularly strong signal because the user bases and trading mechanics differ materially.

### NoisePenalty (0–100, subtracted)
Apply penalties cumulatively:
- Fresh-market-noise (market age < 48 hours): +20
- Thin-outcome-volume (leading outcome < $10K): +15
- Whale-concentration (top 3 holders > 50% of OI, where observable): +20
- Resolution-criteria-ambiguity flagged in comments or disputes: +15
- Wide bid-ask spread (> 5% of mid): +10
- Known-manipulation-incident on the venue in the past 30 days: +25
- Oracle-resolution-pending or UMA dispute history on this type of market: +10
- Weekend/off-hours for traditional-hours markets: +5
- Meme-market / joke-market characteristics (if substantive interpretation isn't appropriate): +30
- Probability-sum-distortion (sum of exclusive outcomes >110% or <90%): +15

Cap at 80, as in other domains.

---

## Domain-specific failure modes

**Polymarket probability sums distort.** On multi-outcome exclusive markets, the outcome probabilities often do not sum to 100% — particularly on markets with many long-tail outcomes. This is a platform characteristic, not a mispricing per se. Don't over-interpret a 150% sum as a major arbitrage signal unless the market is actively liquid.

**UMA oracle resolution creates tail risk.** Polymarket uses UMA for resolution. UMA disputes can produce materially different outcomes than the naive market consensus expected. Before treating a pre-resolution price as confident, check whether similar markets have had UMA disputes.

**Kalshi is US-regulated, Polymarket is not.** This produces user-base differences: Kalshi tends toward mainstream retail and some institutional participation; Polymarket tends toward crypto-native, globally-distributed users. Cross-platform divergence is often structural rather than informational.

**Whales can set prices on low-volume markets.** A single $50K position on a $200K market can move the price meaningfully. Always check top-holder concentration before treating a price as consensus.

**Fresh markets should almost never be interpreted aggressively.** Markets < 48 hours old produce noise that looks like signal. Apply the fresh-market-noise NoisePenalty and default toward lower confidence bands.

**Resolution-date-proximity creates endogenous volatility.** Markets in their final 48 hours behave like high-theta options. Large moves in that window are often mechanical, not informational.

**Manifold is play-money.** Manifold markets use mana, not USD. Signal quality is lower on average than USD markets because stakes are lower. Treat as SourceReliability Tier-3 rather than Tier-1 despite being a primary venue.

**"By [date]" cumulative markets require special handling.** A market like "event by April 20 / April 22 / April 30" is really a single question ("when will the event happen") decomposed into time-gated outcomes. Interpret the distribution across outcomes, not individual outcomes in isolation. This is why `time_gated_cumulative_repricing` exists as an archetype.

**Cross-posted events may be intentionally different.** "US x Iran diplomatic meeting by April 20" and "US x Iran diplomatic meeting before April 30" look equivalent but the first is a single date gate and the second is cumulative. Check resolution criteria precisely before treating markets as cross-platform equivalents.

---

## Enrichment requirements (Stage 1.5)

When Stage 1.5 runs for a prediction-market event, consult this section.

### High priority

- **Full outcome probability table** (for multi-outcome markets) — not just the leader. Without the full distribution, `probability_sum_arbitrage`, `time_gated_cumulative_repricing`, and several other archetypes cannot be evaluated.
- **Market age and opening price** — determines fresh-market-noise penalty and trajectory context.
- **Current bid-ask spread and per-outcome volume** — determines Liquidity scoring and `market_maker_sag` evaluation.
- **Recent price movement** — at minimum intraday, ideally a few days of history. Without this, MarketMovement is unmeasurable.

### Medium priority

- **Cross-platform comparison** — does Kalshi / Manifold / other venue have an equivalent or near-equivalent market? Informs `cross_platform_divergence` archetype and CrossSignalConfirmation.
- **News flow on the underlying event within ±24 hours** — determines whether price movement tracks news or is endogenous.
- **Top-holder concentration** (where on-chain data is available) — informs `whale_dominated_consensus` archetype.
- **Comment-activity signal** — volume and content of user discussion; informs `retail_narrative_cascade` and `resolution_criteria_ambiguity` archetypes.

### Low priority

- **Prior similar-market outcomes** — how have comparable markets resolved historically?
- **Related prediction markets** — e.g., for a diplomatic-meeting market, fetch the related ceasefire market, nuclear-deal market, escalation market.
- **Oracle / resolution-mechanism history** — has this type of market had disputed resolutions before?

### Fetch-source preferences

1. Direct venue pages (polymarket.com, kalshi.com) — Tier-1
2. Venue-specific analytics and dashboards — Tier-2
3. Mainstream financial media covering the specific market — Tier-3
4. News sources on the underlying event (for context, not market-specific data) — Tier 1-3 per general news guidance
5. Crypto-native coverage for Polymarket-specific analysis — Tier-3

### Signal-specific enrichment shortcuts

- **Polymarket markets:** always fetch the full outcome probability table and check the resolution criteria carefully — rules matter. If the market has an "Other" outcome, note whether its probability is nonzero; nonzero "Other" often indicates resolution-criteria ambiguity.
- **Kalshi markets:** check whether the market is CFTC-regulated (most are); regulated markets have more integrity but potentially less signal on controversial political events that might not list.
- **Cross-platform events:** always fetch the equivalent market on the other major venue. A 5+ point spread across platforms is itself a signal worth scoring.
- **Deadline-adjacent events:** fetch the most recent news on any real-world deadlines affecting the market (ceasefires, elections, policy deadlines). These create forcing functions on market behavior independent of event probability.

---

## Version notes

- **Archetype library version: 0.3** — refines `elimination_yield_harvesting` with pre-emerged / post-emerged / mixed sub-pattern distinction (validated on NBA Champion and NBA MVP markets, 2026-04-19). Adds `vote_already_cast_resolution_lag` archetype for markets where a discrete decision has been made but not yet announced. Thirteen archetypes total. See `_roadmap/infera-skill-gaps-2026-04-19-session1.5.md` for validation detail.
- **Archetype library version: 0.2** — adds `elimination_yield_harvesting` archetype based on live-test surfacing of a pattern that was previously unclassified (see `_roadmap/infera-skill-gaps-2026-04-19.md` Gap 3). Twelve archetypes total.
- **Archetype library version: 0.1** — initial draft, eleven archetypes covering the most common prediction-market patterns.
- The prediction-markets domain is evolving quickly; expect this library to grow faster than the traditional-markets library over the next several months as Infera encounters more varied signals.
- Treat archetype names as stable interfaces across versions.
