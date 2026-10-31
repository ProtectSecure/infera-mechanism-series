---
name: infera-signal-interpretation-geopolitics
description: "Geopolitics and international relations domain extension for Infera's signal interpretation. Loads alongside infera-signal-interpretation when the event involves diplomatic activity, international conflict, ceasefire or negotiation dynamics, sanctions, mediation, treaty processes, or policy signals with international reach. Provides the archetype library, SSS component scoring, and domain-specific failure modes for real_world_event-framed geopolitical signals. Archetypes are tagged with lifecycle stage (pre-crisis / acute / negotiation / resolution / aftermath) where applicable. Triggers: 'diplomatic meeting,' 'ceasefire,' 'sanctions,' 'mediator,' 'peace talks,' 'State Department,' 'foreign minister,' 'embassy,' 'treaty,' 'international conflict,' country pairs in negotiation or conflict contexts, or any URL from State Department, UN, major diplomatic sources, or regional foreign ministries."
---

# Infera Signal Interpretation — Geopolitics Extension

## What this skill is

This is the domain extension that fills in the pattern library and scoring rules for `real_world_event`-framed geopolitical and international-relations signals. It does nothing on its own — it loads alongside `infera-signal-interpretation` (the core flow) and supplies:

1. **Archetype library** — the named patterns a geopolitical signal can match
2. **SSS component scoring rules** — how to score each SSS component for geopolitical events
3. **Domain failure modes** — geopolitics-specific noise patterns the interpretation flow must catch
4. **Source-triage contributions** — tier priors for diplomatic correspondents and official sources (used by `infera-source-triage`)

This skill does not contain interpretation logic. That lives in the core skill. This one is pure domain knowledge.

**Scope: deliberately narrow.** This extension covers:
- Diplomatic activity (bilateral meetings, multilateral summits, envoy missions)
- International conflict dynamics (wars, ceasefires, escalation sequences)
- Negotiation processes (framework talks, treaty processes, sanctions negotiations)
- Mediation dynamics (third-party intermediaries, venue selection, handoffs)
- Policy signals with international reach (executive orders with foreign-policy impact, coordinated multinational actions)

This extension does NOT cover:
- Corporate news or business-domain events (would need a separate `-corporate-news` extension)
- Domestic-only policy (would need a separate `-domestic-policy` extension)
- Cultural events, tech milestones, public health (separate extensions)
- Market reactions to geopolitical events (that's `market_instrument`-framed, routed to `-markets` or `-prediction-markets`)

**Frame applicability:** archetypes in this library are predominantly `real_world_event`-framed. They describe patterns in diplomatic and international-relations events themselves. When a prediction market *reflects* a geopolitical event, interpret the market at `market_instrument` frame using the prediction-markets extension; interpret the underlying event at `real_world_event` frame using this extension; invoke `blended` frame mode in the core skill when both matter.

---

## Lifecycle staging

Geopolitical events unfold through recognizable phases. Archetypes below are tagged with the lifecycle stage they apply to, so pattern-matching during Stage 3 can prioritize archetypes appropriate to the event's current phase.

**The five stages:**

- **`pre-crisis`** — tensions building, escalation signals accumulating, but active conflict or active negotiation has not yet started. Sources: warning-sign reporting, intelligence leaks, rising-tension indicators.
- **`acute`** — active conflict, hostile actions, or immediate crisis is underway. Sources: real-time event reporting, damage assessments, official statements under pressure.
- **`negotiation`** — parties have entered some form of diplomatic engagement, whether publicly acknowledged or back-channel. Includes mediation phases, framework talks, and stalled-but-continuing diplomacy.
- **`resolution`** — an agreement is being finalized or has just been reached. Includes implementation early stages and the immediate aftermath of signed agreements.
- **`aftermath`** — the formal event has concluded; the interpretation concerns durability, compliance, and follow-on consequences.

**Stage direction adds a second dimension:**
- **`escalating`** — the situation is moving toward greater intensity, confrontation, or disruption
- **`de-escalating`** — movement toward reduced tension or resolution
- **`dormant`** — neither direction, situation is holding at current level

A signal's lifecycle stage and direction together inform which archetypes are most likely to fire. A `negotiation` stage with `de-escalating` direction favors `framework_before_date_pattern`; a `negotiation` stage with `escalating` direction favors `public_posture_vs_backchannel_gap` or `announcement_latency`.

**Stage is inferred, not required at intake.** The structured event doesn't need to carry the stage — pattern-matching derives it from the observable signals. But domain extensions can short-circuit inference when the user or a prior interpretation has already declared it.

---

## Archetype library

### `mediator_shuttle_dynamics`
- **Stage:** `negotiation`, often with `escalating` or `de-escalating` direction depending on what's happening
- **Pattern:** A third-party mediator (state or international body) moves between parties with increasing or decreasing frequency. The mediator's travel schedule, venue choices, and communication cadence carry signal about the underlying negotiation state.
- **Reading:** Mediator activity is often the most observable indicator of talks' health when parties aren't speaking directly. An accelerating shuttle (multiple trips per week, senior officials dispatched) signals active progress or active crisis management. A decelerating shuttle or a mediator stepping back signals either breakthrough (no more mediation needed) or breakdown (mediation isn't working). Which it is depends on accompanying signals.
- **Supporting signals:** Senior mediator officials (foreign ministers, military chiefs, heads of state) traveling with formal agendas; venue-of-meeting changes or consolidations; public statements from the mediator about "productive discussions" (often platitude, sometimes substantive); simultaneous engagement with multiple related capitals; mediator's PM or equivalent making regional tours. Example (April 2026): Pakistani Army Chief Munir's Tehran visit carrying US messages, PM Sharif's subsequent Saudi Arabia / Qatar / Turkey tour building regional support.
- **Disconfirming signals:** Mediator withdraws publicly; parties announce direct talks (bypassing mediator); one party rejects the mediator; the mediator's travel is ceremonial rather than substantive.
- **Common false positives:** Normal diplomatic travel being read as mediation when it isn't (routine bilateral visits); hype coverage treating routine communications as shuttle diplomacy; "track 2" academic or NGO diplomacy misread as state-level mediation.

### `ceasefire_forcing_function`
- **Stage:** `acute` → `negotiation` transitions, often paired with `de-escalating` direction
- **Pattern:** An agreed ceasefire has a fixed expiration or renewal point that compresses diplomatic activity toward the deadline. The deadline itself is a forcing function, not a prediction of resolution.
- **Reading:** Ceasefires rarely resolve on their exact terms; they extend, modify, or collapse near the deadline. The shape of diplomatic activity *within* the ceasefire window — whether talks accelerate, stall, or fragment — is the signal. Observable patterns: accelerating meeting cadence in the final week, framework discussions moving to detail discussions, venue and participant consolidation versus fragmentation.
- **Supporting signals:** Ceasefire has a specified end date or trigger condition; diplomatic activity demonstrably compressed toward the deadline; both parties making statements about "next phase" or "next round" language; incentive structures (sanctions, asset releases, territorial arrangements) explicitly tied to the timeline; pressure from mediating states to extend rather than collapse.
- **Disconfirming signals:** Indefinite ceasefire with no forcing date; unilateral extension without negotiation; one party accelerating military preparation rather than diplomatic activity; news flow indicates neither side believes the deadline matters.
- **Common false positives:** Routine renewal cycles with built-in extensions treated as high-drama deadlines; asymmetric ceasefires (one side cares about the deadline, one doesn't) misread as bilateral forcing functions.

### `public_posture_vs_backchannel_gap`
- **Stage:** `negotiation` during any direction; most pronounced in `acute-to-negotiation` transitions
- **Pattern:** Public statements from negotiating parties systematically diverge from back-channel signals reported by mediators, senior-level leaks, or regional allies. The size and direction of the gap carries information about the real state of talks.
- **Reading:** Public posturing serves domestic political audiences; back-channel signals reflect what negotiators actually think possible. When public posture is hawkish but back-channel signals are conciliatory, parties are preparing their domestic audiences for a deal. When public posture is optimistic but back-channel signals are pessimistic, parties are preparing for breakdown while maintaining face.
- **Supporting signals:** Clear divergence between press statements and leaked negotiating positions; multiple independent back-channel sources reporting the same private position; consistent pattern of public hardening followed by private softening (or vice versa); historical precedent for this pattern between these parties; leaked draft documents diverging from public demands.
- **Disconfirming signals:** Public and private positions closely align across all observable sources; "back-channel" sources all trace to one speculative origin; no senior-official-level divergence, only analyst-commentary divergence.
- **Common false positives:** Analyst speculation about "what they really think" treated as back-channel signal; hostile-party leaks designed to manipulate rather than reflect truth; domestic political dissent within a party's government misread as the party's private position.

### `framework_before_date_pattern`
- **Stage:** `negotiation` with `de-escalating` direction
- **Pattern:** Negotiating parties signal "framework first, then we'll set a date" or the inverse "date announced, framework to be determined." The sequencing carries information about each side's leverage and their confidence about concluding.
- **Reading:** "Framework first" is the stronger negotiator's preference — it anchors terms before setting commitments that constrain the stronger side. "Date first" is typically a signal of political pressure (often from mediators or allies) forcing activity even when substance isn't ready. The 2026 US-Iran pattern is textbook: "you can't do that in two days" — the strong side insists on framework before scheduling the next round. The weaker side often insists on date-setting to force the conversation.
- **Supporting signals:** Explicit statements from officials about sequencing ("we need a framework first" / "we want to announce a date"); mediator statements about which side is holding up which sequence; leaked draft agreements that specify sequencing; historical pattern of this negotiating dyad preferring framework-first or date-first.
- **Disconfirming signals:** Both sides agreeing on sequencing without friction; sequencing being set by external forcing function (a deadline) rather than by negotiator preference; announcements of both simultaneously (suggests active coordination).
- **Common false positives:** Short-duration negotiations where sequencing doesn't meaningfully differentiate; negotiations on predictable/routine matters where framework is pre-established.

### `announcement_latency`
- **Stage:** Any stage, but particularly `resolution` → `aftermath`
- **Pattern:** The time between when a decision is made (in private, among decision-makers) and when it is announced publicly carries signal about the decision's content and political fragility.
- **Reading:** Short announcement latency (same day, within 24 hours) indicates either a pre-coordinated message release (decision was ready-for-announcement at moment of agreement) or urgency. Long latency (days, weeks) indicates that the decision content is being negotiated with additional stakeholders, or that political groundwork is needed before release, or that parties are hedging. Extended latency with no apparent friction often signals a problem — if the decision were simple and final, it would be announced.
- **Supporting signals:** Clear signal that a decision has been made (e.g., meetings concluded, draft agreement visible, signatures reported); visible time gap between decision signal and public announcement; leak activity increasing in the gap period; parties reportedly "finalizing details" for extended periods; implementation details being renegotiated after the "decision."
- **Disconfirming signals:** Near-simultaneous decision and announcement (short latency = no signal); announcement clearly constrained by formal procedural requirements (legislative ratification, court procedure); the "decision" is aspirational rather than made.
- **Common false positives:** Routine procedural delays misread as political latency; media reports anticipating "imminent announcement" when no decision has been made; one-party announcements of unilateral decisions misread as bilateral delays.

### `mediation_handoff_signal`
- **Stage:** `negotiation` during any direction, often during transitions
- **Pattern:** The identity of the primary mediator changes, or multiple mediators coordinate differently over time. Who mediates is as informative as whether mediation happens.
- **Reading:** Mediators are selected based on which party accepts them. A handoff from one mediator to another often reflects shifting party positions, strategic repositioning, or emergence of a new regional actor. The 2026 US-Iran timeline shows this: initial joint proposal from Egypt/Pakistan/Turkey → Turkey declines → Pakistan takes primary role → PM Sharif builds Saudi/Qatar/Turkey support. Each transition was a signal about the underlying negotiation.
- **Supporting signals:** Public mediator declining or being declined; parties publicly requesting a specific mediator; regional actors consolidating or fragmenting support for a single channel; venue changes mapping to mediator changes; formal handoff ceremonies or statements.
- **Disconfirming signals:** Multiple mediators coordinating stably without handoffs; routine rotation of mediator roles within established frameworks; mediator changes driven by external factors (election, coup, health) rather than negotiation dynamics.
- **Common false positives:** Media coverage treating multiple simultaneous back-channels as "mediator handoff" when they're actually parallel tracks; self-promotion from would-be mediators misread as real handoff dynamics.

### `attention_diversion_atrophy`
- **Stage:** Any, most observable during `negotiation` with `dormant` direction
- **Pattern:** A dominant mediator (typically a major power like the US) shifts primary diplomatic attention to a competing crisis, causing the original process to atrophy without formal breakdown. Talks continue at a lower cadence, reduced staffing, and less principal-level engagement, while public messaging maintains the fiction of an active process.
- **Reading:** The atrophy is not a negotiating failure in the normal sense — no party has walked away, no substantive position has shifted. The process is just receiving less *bandwidth* from the dominant mediator. This produces a distinctive signal pattern: surface-level activity continues (lower-ranked officials meet, statements of "productive discussions" are issued), but the substance does not advance. Distinct from `mediator_handoff_signal` because no new mediator emerges to fill the gap; distinct from `public_posture_vs_backchannel_gap` because the gap is not about positions diverging but about attention being elsewhere.
- **Supporting signals:** Primary mediator publicly named as "focused on" another crisis (explicit statements like "Washington's attention has shifted toward Iran" during Russia-Ukraine talks); reduced principal-level engagement on the original file (secretaries/foreign ministers not meeting, delegated to deputies); public messaging continues but at lower cadence; substantive deliverables absent or delayed; mediator's travel schedule visibly reallocated; analysts or named commentators noting the shift in multiple independent sources.
- **Disconfirming signals:** Active principal-level engagement persisting on the file; substantive breakthroughs or breakdowns (either direction) indicating real engagement; mediator publicly doubling down on the file; increased rather than decreased travel and staffing.
- **Common false positives:** Routine diplomatic quieting between negotiating rounds misread as attention shift; normal vacation/holiday-cycle lulls mistaken for atrophy; analyst speculation about priorities not grounded in observable mediator behavior; a mediator genuinely multi-tasking without meaningful reduction in bandwidth on any file.
- **Recurrence pattern:** Observed in US-mediated processes during major-power crisis cycles — Israel-Palestine attenuation when Iran spikes; Afghanistan-related diplomacy during Ukraine war; Ukraine-Russia process during Middle East escalation. Major-power diplomatic bandwidth is finite; when a new crisis demands attention, older processes receive less of it without formal acknowledgment.
- **Interpretation implication:** When this archetype fires, the primary read should be that process-state changes are being driven by the mediator's bandwidth reallocation, not by substantive negotiating developments. Distinguishing these matters: atrophy implies the process can be revived with renewed attention, while substantive breakdown implies structural barriers that attention alone cannot overcome.

### `economic_pressure_backdrop`
- **Stage:** Any, but most active during `negotiation` and `resolution`
- **Pattern:** Economic conditions affecting one or both parties (sanctions, currency collapse, commodity prices, blockades) create the negotiating context. The economic state is often the real driver of diplomatic movement even when the formal talks focus on other issues.
- **Reading:** Observable diplomatic activity often lags the economic conditions that are actually forcing movement. A party under severe economic pressure is moving toward negotiation (or desperate escalation) regardless of the public negotiating posture. Quotes like "Iran has no money. They're broke. We know it. And they know we know it" are the pattern made explicit; usually it's present but unstated.
- **Supporting signals:** Observable economic distress in one or both parties (currency, commodity flows, sanctions impact, food/fuel shortages); economic news concurrent with diplomatic movement; leaked or stated negotiating positions explicitly tied to economic relief; public rhetoric shifting as economic pressure intensifies; third-party economic actors (oil producers, trade partners, financial centers) taking positioning actions.
- **Disconfirming signals:** Negotiating parties in similar economic circumstances; diplomatic movement preceded by non-economic events (security incident, succession, regime change); negotiations on issues unrelated to economic incentives.
- **Common false positives:** Every negotiation has economic context; the archetype only fires when economic pressure is *driving* the pace, not just present. Routine sanctions activity misread as pressure-driven negotiation; economic analysis over-explaining diplomatic moves that had other drivers.

### `regional_coalition_activation`
- **Stage:** `pre-crisis` or `negotiation` during `escalating` direction
- **Pattern:** A set of regionally-adjacent states coordinate positions publicly or operationally, often around a focal conflict or negotiation. The activation of a coalition (versus individual state positions) changes the negotiating dynamics.
- **Reading:** Coalition activation multiplies diplomatic weight but also constrains each member's flexibility. When multiple states jointly issue statements, propose frameworks, or coordinate sanctions, the negotiation shifts from bilateral to quasi-multilateral. The 2026 pattern of Egypt/Pakistan/Turkey joint proposal, then regional consultations in Islamabad, is a textbook activation. Coalition strength matters: tight coalitions have durable positions; loose coalitions fracture under pressure.
- **Supporting signals:** Joint statements from multiple states on a single issue; coordinated diplomatic missions; shared frameworks or proposals submitted collectively; regional institutional involvement (ASEAN, Arab League, GCC, SCO); back-channel coordination reported by trusted mediators.
- **Disconfirming signals:** States taking visibly divergent positions on the same issue; one state's coalition membership being publicly questioned; coalition statements contradicted by individual member actions; institutional framework absent or rejected.
- **Common false positives:** Media bundling of unrelated national positions into "coalition" language; hostile-party coalitions projected onto neutral actors; coalition rhetoric that has no enforcement mechanism.

### `official_statement_calibration`
- **Stage:** Any, most relevant during `acute` and `resolution`
- **Pattern:** The specific language choices in official statements — which verbs, which conditional qualifiers, which named actors — carry precise signal that deviates from rhetorical surface meaning.
- **Reading:** Diplomatic language is engineered. "We are committed to" is different from "we support." "Ongoing engagement" is different from "active negotiation." The named subject of a statement (White House vs. President; State Department vs. Secretary personally) affects how binding the commitment is. Comparing a statement to the same actor's prior similar statements often reveals shifts that less-calibrated readers miss. 2026 example: Iran's deputy foreign minister stating "no date is set until a basic framework is reached" is a specific signal about sequencing preference, not a general pessimism about talks.
- **Supporting signals:** Language comparisons revealing shifts from prior statements; specific named-vs-unnamed actors as signatories; presence or absence of binding language ("commit" vs. "endorse" vs. "note"); conditional qualifiers ("pending further review," "subject to verification"); removal of previously-standard language as signal.
- **Disconfirming signals:** Statement uses boilerplate with no deviation from prior instances; the statement is extracted from context that changes its meaning; the actor is known for imprecise statement drafting.
- **Common false positives:** Over-reading of minor word choices; translations that introduce interpretive ambiguity; analyst speculation about "what they really meant" projected back onto language that actually is routine.

### `venue_selection_as_signal`
- **Stage:** `negotiation`
- **Pattern:** The choice of venue for diplomatic engagement — which country, which city, which facility — carries information about the power dynamic, the mediator's role, and the intended audience.
- **Reading:** Venue is never neutral. Islamabad carries different signal than Geneva than Muscat than Doha. Neutral venues (Switzerland, Oman) signal parity and discretion. Mediator-home venues (Islamabad for Pakistan-mediated talks) signal mediator centrality. Capital-of-one-party signals that party's host role. The US-Iran pattern used Muscat (Oman) early, then Islamabad (Pakistan) for the April 11-12 round — a shift from one mediator's home venue to another reflects changing mediator roles. Rome as potential venue signals European involvement.
- **Supporting signals:** Explicit venue announcements; venue changes over successive rounds; public reactions to venue (one party protesting or endorsing a specific venue); historical precedent for this venue in similar contexts; regional symbolism of the city (neutral territory, Islamic-world capital, Western-aligned capital).
- **Disconfirming signals:** Venue chosen for logistical rather than political reasons; venue imposed by external factors (visa restrictions, security); remote/virtual venues that negate the signal; routine venue rotation within established frameworks.
- **Common false positives:** Over-interpretation of neutral venue selection (not every choice is coded); venues chosen for security with no political signal; repeated venues creating the illusion of meaningful selection.

### `succession_or_leadership_instability`
- **Stage:** Any, transforms others during `pre-crisis`
- **Pattern:** Leadership uncertainty in one of the parties — illness, succession questions, coup risk, election campaigns, cabinet changes — reshapes the negotiation. Counterparts negotiate differently with a party whose leadership is unstable.
- **Reading:** Negotiations with an unstable counterpart produce either accelerated activity (capture agreement before regime changes) or paralysis (don't commit to something that won't survive the transition). The uncertainty itself becomes part of the interpretation — the archetype fires whenever leadership questions materially affect diplomatic calculations. 2026 example: post-strike Iran succession questions about Mojtaba Khamenei shifting the negotiating calculus.
- **Supporting signals:** Observable leadership questions (reported illness, succession speculation, power-struggle coverage); comparison of pre-instability and post-instability negotiating posture; allied and adversarial parties recalibrating positions; intelligence-derived succession assessments reported publicly.
- **Disconfirming signals:** Stable leadership across both parties; leadership change confirmed as smooth succession without negotiating impact; instability confined to domestic issues without foreign-policy implications.
- **Common false positives:** Routine political cycles (upcoming elections) misread as instability; foreign-media projection of instability onto parties that are actually stable; analyst predictions of succession that never materialize.

### `sanctions_architecture_shift`
- **Stage:** `resolution` and `aftermath`, also `pre-crisis` when sanctions are being tightened
- **Pattern:** The architecture of sanctions — which entities, which sectors, which mechanisms, which carve-outs — shifts in ways that reveal negotiating state. Sanctions aren't binary; they're structured, and their structure carries signal.
- **Reading:** Sanctions-easing signals often appear before formal deal announcements; sanctions-tightening often appears as pressure before negotiation phases. The specific architecture matters: tariff changes vs. SDN list additions vs. secondary sanctions vs. maritime restrictions each signal different things. The 2026 pattern where naval blockade pressure accompanied diplomatic engagement is textbook — the sanctions architecture and the diplomatic activity are two sides of one coordinated strategy.
- **Supporting signals:** Treasury/OFAC announcements with specific entity or sector changes; unfreezing of assets or release of seized property; carve-out creation for humanitarian or energy flows; secondary-sanction enforcement decisions on third parties; explicit linkage in statements between sanctions and negotiating progress.
- **Disconfirming signals:** Sanctions activity unrelated to concurrent diplomatic movement; routine enforcement activity without strategic significance; symbolic sanctions without material effect.
- **Common false positives:** Routine Treasury activity misread as diplomatic signal; symbolic actions treated as architectural; tightening in one area being offset by easing elsewhere (net neutral).

### `historical_pattern_anchoring`
- **Stage:** Any, meta-archetype
- **Pattern:** The current event closely mirrors a named historical precedent (the 1979 Iran hostage crisis pattern; the 2015 JCPOA pattern; the Camp David pattern). Interpreting the current event through the historical template produces testable predictions.
- **Reading:** History doesn't repeat, but diplomatic patterns recur because the underlying incentive structures recur. Identifying that a current situation mirrors a historical precedent lets interpretation borrow lessons from how the precedent resolved — but with discipline. The archetype fires when the mirror is specific and observable; it misfires when applied too broadly. Iran-US negotiations unavoidably carry 1979 and 2015 echoes; the question is which mirror more closely fits the present structure.
- **Supporting signals:** Specific structural similarities (same mediators, same venues, same issues, same succession patterns); public invocation of the precedent by participants or analysts; comparable sequencing of events; similar incentive structures on both sides.
- **Disconfirming signals:** Superficial similarity without structural match; precedent invoked rhetorically rather than analytically; historical comparison being used to argue for a predetermined outcome.
- **Common false positives:** Lazy analogies (every Middle East negotiation compared to Camp David); selective citation of precedents that support a desired interpretation; nostalgia-driven comparison to unrepresentative historical events.

---

## Unclassified handling

Geopolitics-domain unclassified events often come from:
- **Novel institutional configurations** — first-of-kind coalitions, new multilateral frameworks, unprecedented venue-mediator pairings.
- **Multi-decade fresh starts** — negotiations between parties with no recent diplomatic history, where archetypes tuned to ongoing relationships don't apply.
- **Technology-enabled diplomacy** — emerging patterns around satellite surveillance, cyber operations, AI-mediated translation, social-media direct communication between leaders.
- **Post-regime-change diplomacy** — when one party's government changes, continuity-based archetypes lose validity.

Log unclassified geopolitical events with the country-pair, lifecycle stage, and closest-matching archetype for Learning Engine review. Historical precedent accumulation is how this library grows; unclassified events flagged now often become archetypes once enough instances cluster.

---

## SSS component scoring — geopolitics rules

### MarketMovement (0–100)
In geopolitics, "movement" means the magnitude of observable change in diplomatic state or situation intensity relative to a baseline.

For diplomatic activity:
- **Routine activity, no change** → 0–15
- **Increased activity, within established pattern** → 16–35
- **Notable deviation from pattern (new participant, new venue, new timing)** → 36–60
- **Major escalation or de-escalation event (ceasefire, breakdown, first-time meeting)** → 61–85
- **Historic-level shift (regime change, first-ever engagement, unprecedented agreement)** → 86–100

For conflict intensity:
- **Normal background state** → 0–20
- **Notable incident without strategic change** → 21–40
- **Significant military or diplomatic action** → 41–65
- **Major escalation or direct state-on-state confrontation** → 66–85
- **Large-scale conflict or existential-level event** → 86–100

### Liquidity (0–100)
"Liquidity" in geopolitics = observability. How much verifiable information is available about the event from diverse, high-quality sources?

- **Single anonymous source, no confirmation** → 0–20
- **Single named source with indirect knowledge** → 21–40
- **Multiple sources, but all from one side of the conflict** → 41–55
- **Multiple sources across sides plus mediator sources** → 56–75
- **Full confirmation across parties, mediators, and neutral observers** → 76–95
- **Officially published and publicly verified across all parties** → 96–100

### SourceReliability (0–100)
Provided by `infera-source-triage`. Geopolitics-domain source priors (moderate-strictness calibration per Session 2 design):

**Tier-1 (primary sources, default 88):** On-the-record statements from heads of state, foreign ministers, defense ministers; official government publications; treaty texts; UN resolutions; regulatory filings from primary parties.

**Tier-2 (authoritative observers, default 82):** Reuters, Associated Press, AFP, BBC, *Washington Post* (State Dept. beat), *New York Times* (diplomatic desk), *Financial Times*, NPR diplomatic correspondents, Al Jazeera (Middle East and global south competence), Bloomberg (geopolitics-economics intersection).

**Tier-3 (reliable specialized outlets, default 70):** *Foreign Affairs*, *Foreign Policy*, regional specialist publications (Al-Monitor for MENA, *The Diplomat* for Asia-Pacific, *Americas Quarterly* for Latin America), established wire-service regional bureaus, recognized think-tank analysts (CFR, Brookings, Carnegie, RAND).

**Tier-4 (general media and analyst-driven, default 55):** Major national newspapers without specialized diplomatic beats, television network coverage (which has largely abandoned dedicated State Department presence), think-tank analysts without specialized recognition, podcast-based analysts with recognized track record.

**Tier-5 (unverified or highly-biased, default 25):** Anonymous social media, state-media of the parties to the dispute (use for understanding their framing, not as independent source), analyst-commentators without institutional accountability, specifically-identified disinformation operations.

**Regional-specialist bonus modifier:** +10 to any source with demonstrated track record on the specific region or conflict in question. Al Jazeera +10 on MENA; *The Diplomat* +10 on Asia-Pacific; *South China Morning Post* +10 on China-region; Haaretz +5 on Israel-domain. Regional specialists get bonus precisely because general-purpose outlets lose fidelity on regional nuance.

**State-media calibration:** State media of parties to the dispute (TASS, RT, Press TV, Xinhua, state broadcasters) get Tier-5 for interpretation but are treated as **important primary sources for that party's public posture**. They're how that government wants to be heard. Never use them as independent confirmation of anything; always use them for understanding what the party is signaling publicly.

**Diplomatic correspondent identification (as of 2026):** Named diplomatic correspondents with recognized credentials — John Hudson (*WaPo*), Michele Kelemen (NPR), Shaun Tandon (AFP), Anne Gearan (*WaPo*, White House but foreign-policy focus) — carry +5 personal credibility modifier on top of their outlet's tier.

### Diversity (0–100)
Categories for geopolitics corroboration:
- Official statements from primary parties
- Mediator officials (third-party states' statements)
- Regional-specialist media
- Major wire services (Reuters/AP/AFP)
- General newspapers with diplomatic beats
- Think-tank analysis
- Academic expertise (IR scholars)
- Intelligence-community leaks or assessments (use carefully)

Scoring:
- 1 source category: 0
- 2 categories: 33
- 3 categories: 66
- 4+ categories: 100

Special-weight: confirmation that spans *adversarial* sources (e.g., a claim confirmed by both US and Iranian sources, or by Israel and an Arab state) counts as stronger diversity than confirmation from multiple aligned sources. Add 15 to the diversity score when adversarial-source confirmation is present.

### TemporalConsistency (0–100)
Geopolitical events unfold across distinctive time scales. Temporal consistency here means: does the signal persist or is it a flash?

- **Single news cycle only, immediately contradicted or faded** → 0–20
- **Persists across 24-48 hours with some confirmation** → 21–45
- **Persists across a week with consistent treatment** → 46–65
- **Multi-week trajectory with coherent direction** → 66–85
- **Months of consistent pattern (a negotiation phase, a campaign)** → 86–100

Diplomatic events have longer temporal signatures than market events. A week-old signal that's still being built upon is strong; a day-old signal being walked back is weak.

### CrossSignalConfirmation (0–100)
Domains for geopolitics:
- Diplomatic activity (meetings, statements, mediation)
- Military posture (deployments, readiness, actions)
- Economic signals (sanctions, trade, currency, commodities)
- Regional reactions (allied and adversarial state responses)
- International institutional response (UN, regional bodies)
- Public sentiment (in the affected countries)
- Market reactions (prediction markets, relevant financial instruments)

Scoring:
- Single domain: 0–20
- 2 domains: 21–45
- 3 domains: 46–70
- 4+ domains, aligned: 71–100

**Bonus for asymmetric alignment:** when diplomatic signal is confirmed by market signal (prediction markets or financial instruments moving consistent with the diplomatic read), add 10 to CrossSignalConfirmation. Markets aren't infallible, but alignment with independent financial positioning adds real weight.

### NoisePenalty (0–100, subtracted)
Apply cumulatively:
- **Active information operations context:** +25 (one or both parties have demonstrated info-ops capability; signals may be seeded rather than genuine)
- **Single-source dependence (story traces to one origin):** +20
- **Anonymous-only sourcing:** +15
- **Translation ambiguity (cross-language sources disagree on nuance):** +10
- **Election or succession-cycle distortion:** +15 (domestic political cycles distort foreign-policy signaling)
- **Pre-existing narrative lock-in (the story fits a heavily-preexisting narrative, which could mean it's accurate or that observers are pattern-matching regardless of fit):** +10
- **State-media-only coverage:** +30 (a story existing only in state-aligned media should be treated as potentially manufactured)
- **Holiday/weekend timing that shifts cycle dynamics:** +5
- **Mediator's own incentive to claim progress:** +10 (mediator-sourced reporting of "productive talks" carries known bias)

Cap cumulative NoisePenalty at 80 per the core skill's conventions.

---

## Domain-specific failure modes

**State-media laundering.** A story breaks in a state-aligned outlet, gets picked up by a Tier-3 specialized outlet that credits the state media, then by Tier-2 wire services that cite "multiple sources" — the apparent diversity is illusory, the story has one source. Always trace the origin of a cross-outlet story. If the root is state media, the independent-source count is one, not three.

**Translation introducing interpretive content.** Diplomatic statements translated from the original language often have nuance compressed or elaborated. "Constructive" in one translation may be "promising" in another; the difference matters. When SSS scoring for geopolitical events, prefer original-language sources with multiple independent translations. Flag translation disagreements explicitly.

**Succession speculation cascading.** Leadership uncertainty in one party triggers cascading speculation that often exceeds actual instability. The 2026 Mojtaba Khamenei succession discussion shows this — the speculation becomes its own signal, semi-independent of actual succession probability.

**Mediator self-promotion.** Mediators have strong incentive to report progress. "Productive discussions" from a mediator source is often platitude. Pair mediator signals with party signals before treating as substantive.

**Analyst-loop feedback.** Major IR analysts often react to each other's analyses. A "consensus" reading across Tier-3 sources may actually be three sources citing each other. Check for independent origin of analyst claims before treating as corroboration.

**Historical-template over-application.** Every Middle East negotiation gets compared to Camp David; every Asian dispute to Taiwan-Strait dynamics; every Russia question to Cold War templates. The `historical_pattern_anchoring` archetype is powerful but high false-positive rate — use with discipline.

**Publication lag vs. event time.** Diplomatic reporting often lags events by 24-72 hours as sources are confirmed. A story "breaking" today may describe events from several days ago. Always check the actual event time against the publication time before using reporting as a real-time signal.

**Regional vs. universal sourcing.** A Washington-based correspondent may have excellent US-side sources but limited access to Iranian, Pakistani, or regional-partner sources. Stories that come entirely from one capital's sources are incomplete even when technically accurate.

**Leaked-document-as-signal versus leaked-document-as-position.** Genuine leaks from the negotiation process carry signal. Strategic leaks — documents released by one party to influence the negotiation — are positions, not signals. Distinguishing these is hard; treat all leaks with heightened source-triage attention.

---

## Enrichment requirements (Stage 1.5)

When Stage 1.5 runs for a geopolitics-domain event, consult this section.

### High priority

- **Primary-party official statements** — original-language statements from the parties to the dispute, with authoritative translations. Without these, SourceReliability can't be calibrated.
- **Mediator statements and activity** — who's mediating, what they've said publicly, their travel schedule. Critical for `mediator_shuttle_dynamics` and `mediation_handoff_signal`.
- **Event timeline anchoring** — the immediate prior events that establish the lifecycle stage (when did the crisis start, when did ceasefire begin, when did last round end). Without a clear timeline, stage tagging misfires.

### Medium priority

- **Regional coalition statements** — positions from allied and nearby states.
- **Economic context** — sanctions architecture, currency state, trade flows, commodity dynamics specific to the dispute.
- **Military/security activity** — deployments, movements, readiness signals, incidents that accompany the diplomatic activity.
- **Historical precedent search** — prior negotiations between these parties or similar-pattern events.
- **Multiple-source corroboration check** — trace story origins to verify independent sourcing.

### Low priority

- **Analyst commentary roundup** — IR scholar and think-tank analysis. Useful for interpretation but not for verification.
- **Prediction market positioning** — where relevant markets exist, their state is useful context (bonus for CrossSignalConfirmation per SSS rules).
- **Public sentiment indicators** — domestic opinion polling in the affected countries.
- **Prior Infera interpretations** — audit-log lookup for the same country-pair or related events.

### Fetch-source preferences

1. Official government publications (State Department briefings, foreign ministry statements, UN documents) — Tier-1
2. Named diplomatic correspondents at major outlets — Tier-2 with personal bonus
3. Regional specialist outlets (Al Jazeera for MENA, *The Diplomat* for Asia-Pacific, etc.) — Tier-2 to Tier-3 depending on specificity fit
4. Major wire services for breaking news — Tier-2
5. Original-language primary sources from parties — Tier-1 for public posture, Tier-5 for factual independence

### Signal-specific enrichment shortcuts

- **Ceasefire or negotiation-deadline events:** always fetch the specific ceasefire terms and expiration; always fetch the positions each side has publicly staked for this window; always fetch the previous round's outcome for pattern-matching against this round.
- **Mediation events:** trace the mediator's prior activity on this conflict (first intervention or ongoing role); fetch the mediator's public statements about progress.
- **Succession or leadership events:** fetch the full successor-candidate information and the institutional succession mechanism; treat succession speculation as an event in itself, not just context.
- **Sanctions announcements:** fetch the specific SDN additions, sector designations, or architectural changes; check for explicit linkage to diplomatic activity.

---

## Lifecycle stage inference rules

When the user hasn't declared a lifecycle stage, infer from observable signals:

- If active combat or direct hostile action is current → `acute`
- If formal talks are ongoing or publicly announced → `negotiation`
- If a final agreement has been reached within 72 hours → `resolution`
- If the last notable diplomatic event was >30 days ago → `aftermath` (or `dormant` direction)
- If escalation signals are accumulating but no active conflict yet → `pre-crisis`
- If in the first 72 hours after an event, allow two-stage consideration — e.g., `acute → negotiation` during a ceasefire announcement

**Stage direction:**
- `escalating` when intensity, scope, or hostility measures are increasing
- `de-escalating` when those measures are decreasing
- `dormant` when they're holding steady

Tag stage-and-direction on the structured event in the audit layer. Subsequent interpretations of the same country-pair or conflict can reference the stage for continuity.

---

## Version notes

- **Archetype library version: 0.2** — adds `attention_diversion_atrophy` archetype based on live-test surfacing (Session 2 validation, 2026-04-19). The pattern was flagged by multiple 2025-2026 sources (Al Jazeera, CBS) describing "Washington's attention having shifted towards Iran" during Russia-Ukraine negotiations — a structural feature of major-power diplomatic bandwidth that is distinct from mediator_handoff (no new mediator emerges) and from public_posture_vs_backchannel_gap (the gap is about attention, not positions). Thirteen archetypes total. See `_roadmap/infera-session2-validation-results-2026-04-19.md` for validation detail.
- **Archetype library version: 0.1** — initial draft, twelve archetypes across the full lifecycle. Current primary focus on US-Iran / Middle East / mediation dynamics because that's where 2026 testing data is richest. Expansion plans:
  - Asia-Pacific patterns (Taiwan-Strait dynamics, Korean Peninsula, ASEAN coordination)
  - European patterns (EU enlargement, NATO decisions, Russia-related)
  - Latin America patterns (migration, regional governance, US-hemisphere)
  - Africa patterns (AU coordination, specific regional conflicts)
- Expect this library to grow substantially as Infera encounters more geopolitical signals. Archetypes should be added when a pattern appears repeatedly and has named structural features that generalize.
- Treat archetype names as stable interfaces across versions.
