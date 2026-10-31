---
name: infera-signal-interpretation-sports
description: "Sports and fantasy domain extension for Infera's signal interpretation. Loads alongside infera-signal-interpretation when the event involves NFL, NBA, or other sports contexts — player usage, snap counts, injury reports, coaching changes, target shares, betting line movements, depth-chart shifts, or any performance signal. Provides the sports-specific pattern library (archetype definitions), SSS component scoring rules for sports data, and domain-specific failure modes. Triggers: player names, team names, 'snap count,' 'targets,' 'usage,' 'injury,' 'fantasy,' 'start/sit,' 'line movement,' 'DFS,' or any sports statistical reference."
---

# Infera Signal Interpretation — Sports Extension

## What this skill is

This is the domain extension that fills in the pattern library and scoring rules for sports and fantasy signals. It does nothing on its own — it loads alongside `infera-signal-interpretation` (the core flow) and supplies:

1. **Archetype library** — the named patterns a sports signal can match
2. **SSS component scoring rules** — how to score each SSS component for sports data
3. **Domain failure modes** — sports-specific noise patterns the interpretation flow must catch

This skill does not contain interpretation logic. That lives in the core skill. This one is pure domain knowledge.

Current primary sports coverage: **NFL** (snap counts, targets, carries, red-zone usage, route participation). The framework extends to NBA and other sports but the pattern libraries below are NFL-first for now.

---

## Archetype library

**Frame applicability for this library:** sports archetypes are predominantly `real_world_event`-framed — they describe patterns in on-field, practice, and roster events themselves. The `line_movement_divergence` archetype is a `market_instrument`-framed exception (it describes betting-market behavior). When a sports signal arrives through a betting market (e.g., a DraftKings spread move), the primary frame should usually be `market_instrument` and routed to `line_movement_divergence` first, with on-field archetypes invoked as a secondary frame if the market movement is significant enough to warrant real-world-event interpretation.

### `usage_rate_shift`
- **Pattern:** A player's snap share, route rate, carry share, or target share changes meaningfully week-over-week without a clear injury explanation.
- **Reading:** Coaching staff is reallocating opportunity. The player's role is shifting — durably or as a one-week experiment.
- **Supporting signals:** Snap share change > 10 percentage points vs. rolling average, route-participation-rate change > 10 pts, consistent direction across two or more usage metrics, beat reporter confirmation of role change.
- **Disconfirming signals:** Game script explains the shift (blowout, early exit), opponent-specific game plan, small sample size for new role.
- **Common false positives:** Garbage-time stats inflating usage of backups, weather games that compress total plays.

### `injury_tag_ambiguity`
- **Pattern:** A player is tagged Questionable or Doubtful with contradictory signals about actual availability.
- **Reading:** Team is managing information flow. The tag itself has less predictive value than the underlying signal pattern.
- **Supporting signals:** Practice participation inconsistent with tag (full practice but listed Questionable, or vice versa), beat-reporter signals diverge from official line, line movement in betting markets before news drops, team's historical behavior with similar tags.
- **Disconfirming signals:** Tag consistent with practice reports, standard recovery timeline for the listed injury, no late-week line movement.
- **Common false positives:** Coaches using ambiguity as competitive edge (Belichick-style), routine rest-day designations misread as injury concern.

### `coaching_change_adjustment`
- **Pattern:** New offensive or defensive coordinator (or head coach) alters scheme in ways that shift player values.
- **Reading:** The reallocation is structural, not week-to-week. Prior-season data loses predictive weight.
- **Supporting signals:** Snap-share and target-share patterns depart from prior-coach baselines, formation tendencies shift (more 11 personnel, more two-TE sets, etc.), pace-of-play changes, scheme-specific beneficiaries emerge.
- **Disconfirming signals:** Only one or two games of data, small-sample variance, injury explains apparent scheme change.
- **Common false positives:** Season-opening adjustments before the offense settles, opponent-specific game plans mistaken for scheme identity.

### `sample_size_regression`
- **Pattern:** A player's recent production is far above or below their underlying opportunity metrics.
- **Reading:** Efficiency is the noisy metric; opportunity is the signal. Production will regress toward opportunity.
- **Supporting signals:** Touchdown rate > 2 sigma from positional norm, yards-per-touch far above career baseline, target-per-route-run efficiency outlier, red-zone conversion rate unsustainable.
- **Disconfirming signals:** Role change explains the efficiency shift, genuine talent tier change (rookie breakout, veteran recovery from injury), consistent efficiency over many games.
- **Common false positives:** Elite players whose efficiency really is sustained, scheme fits that create durable efficiency edges.

### `line_movement_divergence`
- **Pattern:** Betting market (spread, total, player props) moves against the direction implied by the public or the apparent news.
- **Reading:** Sharp money or inside information is acting. The market knows something the narrative doesn't.
- **Supporting signals:** Spread moves opposite to public betting percentage, player-prop totals shift without corresponding news, movement concentrated in a specific time window, movement consistent across multiple sportsbooks.
- **Disconfirming signals:** Injury news explains the move, late coach's decision announcement, lineup scratch that was rumored.
- **Common false positives:** Book-specific movement (one sportsbook adjusting to limit exposure), weather-driven total adjustments.

### `injury_cluster_opportunity`
- **Pattern:** Multiple injuries at one position on a single team create cascading role changes.
- **Reading:** Downstream players on the depth chart are about to get unexpected workload. The signal is about who benefits, not who's hurt.
- **Supporting signals:** Two or more starters out at the same position group, practice reports show specific backups getting first-team reps, historical pattern of how the team distributes replacement workload.
- **Disconfirming signals:** Team signs a veteran free agent to fill the gap, promotes from practice squad, changes scheme to minimize the position.
- **Common false positives:** Late-week healthy scratches misinterpreted as injury absence, bye-week confusion.

### `quarterback_change_ripple`
- **Pattern:** QB injury or benching changes the passing environment for every pass-catcher on the offense.
- **Reading:** Individual player values reprice collectively. Target shares may hold, but efficiency, ADOT, and target quality shift significantly.
- **Supporting signals:** Backup QB's historical tendencies differ (more checkdowns, shorter ADOT, different red-zone approach), practice reports indicate specific pass-catchers are being featured, vegas total adjustments on team's implied points.
- **Disconfirming signals:** Backup has starting experience with same system, injury expected to be brief (one week), game script suggests run-heavy approach mitigates QB change.
- **Common false positives:** One-week QB changes that revert before meaningful data accumulates.

### `weather_signal`
- **Pattern:** Game-day weather forecast will meaningfully affect game script.
- **Reading:** Passing volume, kicking attempts, and pace-of-play shift. Running backs and defenses benefit; pass-catchers and kickers suffer.
- **Supporting signals:** Wind > 15 mph, precipitation during game window, temperature extremes, dome team traveling to adverse-weather stadium.
- **Disconfirming signals:** Dome game, forecast uncertain > 24 hours out, team has shown ability to pass in adverse weather.
- **Common false positives:** Weather forecasts that change before game time, overblown impact of moderate conditions.

### `vegas_total_shift`
- **Pattern:** Game total moves significantly from opening number.
- **Reading:** Expected game environment (scoring, pace) has changed. Affects all offensive players in the game — in both directions.
- **Supporting signals:** Total movement > 3 points, movement consistent across books, injury reports or weather news corroborate the direction.
- **Disconfirming signals:** Movement isolated to one book, movement preceding news that doesn't support the direction, reverse-line-movement suggesting book positioning.
- **Common false positives:** Routine week-of adjustments mistaken for meaningful information.

### `depth_chart_promotion`
- **Pattern:** A player moves up the depth chart absent injury — genuine role expansion.
- **Reading:** Coaching staff's evaluation has shifted. This is a durable signal if reps-based, a fragile signal if single-game-based.
- **Supporting signals:** Practice reports show first-team reps expanding over multiple sessions, coach comments support the shift, target or carry share trajectory up for multiple weeks, beat-reporter consistency.
- **Disconfirming signals:** Single-game spike without practice corroboration, veteran injury disguised as a benching, bye-week schedule changes creating apparent promotion.
- **Common false positives:** Preseason promotions that don't translate to regular-season usage, garbage-time reps misread as expanding role.

---

## Unclassified handling

Sports-domain unclassified events often come from:

- **Novel coaching hires** — first weeks of a new OC/DC regime may not match any existing archetype.
- **Rookie breakouts** — no prior data on the player, limited archetype fit.
- **Unprecedented injury situations** — quirky absences that don't map to the standard recovery timelines.
- **Rule changes** — mid-season rule emphasis changes (e.g., officiating focus shifts).

Log unclassified sports events with the player, team, week, and closest-matching archetype (even below 30 threshold) for Learning Engine review. Novel patterns in sports tend to cluster — what's unclassified this week may become an archetype next season.

---

## Enrichment requirements (Stage 1.5)

When the core skill's Stage 1.5 runs for a sports-domain event, it consults this section to decide what to fetch.

### High priority (needed for SSS to be meaningful)

- **Rolling usage baselines** — 4-week rolling averages for snap share, route participation rate, target share, carry share, and red-zone usage for the player in question. Without these, MarketMovement cannot be scored for usage-based signals.
- **Sample-size context** — games played, total snaps, total touches for the season-to-date. Without this, Liquidity cannot be scored.
- **Game-script data** — final score, spread, pace of play for the most recent game. Informs NoisePenalty (garbage-time detection, blowout distortion).

### Medium priority (disambiguates between archetypes)

- **Practice participation reports** — limited / full / DNP status for the week. Informs `injury_tag_ambiguity` archetype and adjusts SourceReliability scoring for team-reported injury status.
- **Beat-reporter signals** — tweets and articles from the team's primary beat reporters within the relevant window. Informs most archetypes; primary data source for `injury_tag_ambiguity`, `depth_chart_promotion`, and `coaching_change_adjustment`.
- **Betting-market movement** — spread, total, and relevant player-prop movement. Informs `line_movement_divergence` archetype and corroborates or conflicts with on-field signals.
- **Weather forecast** — game-day and game-time conditions for the relevant game. Informs `weather_signal` archetype and NoisePenalty.
- **Depth-chart status** — official team designation and practice-rep distribution. Informs `depth_chart_promotion` and `injury_cluster_opportunity`.

### Low priority (refines confidence within a band)

- **Historical archetype-match outcomes** — how did similar usage shifts resolve for this coaching regime or player type?
- **Video / film grades** — PFF or equivalent. Informs target-quality adjustments for WR signals.
- **Prior Infera interpretations for the same player** — audit-log lookup.

### Fetch-source preferences

1. Official league data feeds, Pro Football Reference, PFF (Tier-1)
2. Established beat reporters with track record, major fantasy-data sites — RotoWire, FantasyPros, Draft Sharks (Tier-2–3)
3. Team-specific beat writers and local coverage (Tier-3)
4. Aggregators and fantasy analysts without direct reporting (Tier-4)

Team-issued injury designations are Tier-2 by source but carry a known bias discount — treat as adversarial signal on gameday-relevant injuries, not ground truth.

### Signal-specific enrichment shortcuts

- **Injury tag events:** always fetch practice participation for the full week, not just the event-day report. Also fetch beat-reporter reactions within ±6 hours of the tag.
- **Usage-rate shifts:** fetch game-script context first — a usage anomaly in a blowout is NoisePenalty territory, not a signal.
- **Line-movement events:** fetch from at least three sportsbooks to distinguish market-wide movement from single-book adjustment.
- **Coaching-change events:** fetch the previous coordinator's pace and personnel tendencies for comparison — a scheme change signal is only meaningful against the prior baseline.

---

## SSS component scoring — sports rules

### MarketMovement (0–100)
"Movement" in sports = magnitude of performance or usage deviation from baseline.

For usage signals (snap share, target share, carry share):
- **< 5 percentage points** from rolling 4-week avg → 0–20
- **5–10 pts** → 21–40
- **10–20 pts** → 41–65
- **20–35 pts** → 66–85
- **> 35 pts** → 86–100

For efficiency signals (yards per touch, yards per route run):
- Normalize to positional z-score.
- **< 1 sigma** → 0–30
- **1–2 sigma** → 31–60
- **2–3 sigma** → 61–85
- **> 3 sigma** → 86–100

For line-movement signals:
- **< 1 point / < 10 cents on juice** → 0–25
- **1–2 points** → 26–50
- **2–3 points** → 51–75
- **> 3 points** → 76–100

### Liquidity (0–100)
"Liquidity" in sports = sample size reliability.

- **Single game, < 10 snaps/touches** → 0–20 (noise zone)
- **Single game, 10–30 touches** → 21–45
- **2–3 games of data** → 46–65
- **4–6 games** → 66–80
- **Full season or multi-season** → 81–100

For betting-market signals, liquidity = bet volume and book consistency across books.

### SourceReliability (0–100)
- Provided by `infera-source-triage`. Sports-domain priors:
- Tier-1 (official league feeds, PFF snap data, NFL GSIS): default 92
- Tier-2 (established beat reporters with track record — Schefter, Rapoport, Pelissero for NFL; Woj, Shams for NBA): default 82
- Tier-3 (team-specific beat writers, major fantasy sites with accountability — RotoWire, FantasyPros, Draft Sharks): default 70
- Tier-4 (analyst-driven sites without real-time reporting, aggregators): default 50
- Tier-5 (anonymous social, unverified Twitter accounts, rumor accounts): default 20
- Injury reports from the team itself: Tier-2 equivalent, but with known bias — teams obfuscate strategically. Apply a reliability discount on gameday-relevant injuries.

### Diversity (0–100)
- 1 source category: 0
- 2 categories: 33
- 3 categories: 66
- 4+ categories: 100

Sports-domain categories: official league data, beat reporter, team official, betting market, video/film (PFF grades), fantasy-analytics site, coaching press conference, player social media (use with care).

### TemporalConsistency (0–100)
- **Single-week anomaly** → 0–25
- **Two-week pattern** → 26–50
- **Three-to-four-week pattern** → 51–75
- **Season-long trend** → 76–90
- **Multi-season pattern** → 91–100

Sports have a strong recency bias that needs to be actively counteracted. One-week signals look dramatic but often revert; persistent patterns carry the real information.

### CrossSignalConfirmation (0–100)
- **Only usage data shows the signal** → 0–25
- **Usage + one other domain** → 26–50
- **Usage + two other domains** → 51–75
- **Usage + three or more domains confirming** → 76–100

Domains for sports: on-field usage, practice reports, injury reports, beat reporting, betting-market movement, coach commentary, historical pattern, video/film grading.

### NoisePenalty (0–100, subtracted)
Apply penalties cumulatively:
- Single-game sample driving the signal: +20
- Garbage-time stats (4th quarter, spread > 14): +15
- Blowout game script distorting usage: +10
- Bye-week before or after (affects baseline): +5
- Preseason or Week 1 (no prior-season baseline yet): +10
- Weather extreme (wind > 20 mph, heavy precipitation): +10
- Injury return game (limited snap count expected): +15
- Coach with known deceptive injury reporting: +10
- Small-market team with thin beat coverage: +5

Cap at 80 as with markets.

---

## Domain-specific failure modes

**Snap share without route participation is a trap.** A WR at 85% snap share who runs routes on only 60% of dropbacks is being used as a blocker, not a pass-catcher. Always read both together.

**Injury reports are adversarial signals.** Teams have strategic reasons to obfuscate. Practice participation reports are more reliable than Questionable/Doubtful tags. Beat reporter network is more reliable than either.

**Target share without target quality is misleading.** 10 targets at an average depth of 4 yards downfield is not the same as 10 targets with an ADOT of 12. The archetype scoring should account for target quality where available.

**Small-sample efficiency is not a signal.** Yards-per-touch over 3 games is noise. Yards-per-touch over a season approaches signal. The `sample_size_regression` archetype exists specifically to catch this.

**Garbage-time stats inflate backup value.** A backup RB putting up 50 yards in the fourth quarter of a 35-7 game is not breaking out. Filter usage signals for meaningful-game-state plays where possible.

**Line movement can be book-driven.** A single sportsbook moving a line to limit exposure is not the same as sharp money moving a market. Require movement across multiple books before triggering `line_movement_divergence`.

**Week 1 baselines don't exist yet.** Rolling averages need 3–4 games of data to stabilize. Early-season signals should carry an automatic TemporalConsistency penalty.

**Coaching changes take multiple weeks to read.** A new OC's "scheme identity" emerges over 3–5 games, not 1. Don't assign `coaching_change_adjustment` archetype on Week 1 evidence alone.

**Beat reporter reliability is not uniform.** A Tier-2 beat reporter's credibility is team-specific — they may be Tier-1 reliable for their beat and Tier-3 for others. `infera-source-triage` handles this, but the extension flags it.

---

## NBA and other sports

The framework extends cleanly. Key adjustments:

- **NBA:** usage rate, minutes share, and on-court/off-court splits replace NFL's snap share. Back-to-back games and load management are major noise sources. Injury reports are more public but still adversarial.
- **MLB:** lineup card positioning, platoon splits, and bullpen usage are the primary signals. Weather matters more for totals. Sample sizes are larger but day-to-day volatility is higher.
- **NHL:** line combinations, ice time, power-play unit deployment are the usage equivalents. Goaltender starts are the highest-value single signal.

Archetypes will be built out for non-NFL sports as Infera's coverage expands. Until then, flag non-NFL signals as using `sports_extension_nfl_library` and note that archetype match scores may be lower.

---

## Version notes

- **Archetype library version: 0.1** — initial NFL-first draft, ten archetypes.
- Treat archetype names as stable interfaces. NBA and MLB extensions will add archetypes rather than redefine NFL ones.
