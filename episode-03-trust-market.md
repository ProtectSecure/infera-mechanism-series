# EPISODE 03 · THE TRUST MARKET
**Mechanism Series · Mockup Design Doc · v0.1**

---

## 0 · THESIS

Episode 01 (*Personhood Inc.*) showed how the system **builds a copy of you** out of data you didn't know was being collected. Episode 02 (*The Feed Engine*) showed how that copy **decides what you see, what you pay, and what you're shown is possible**. Episode 03 — *The Trust Market* — shows the consequence layer:

> Once a copy of you exists and is rich enough to be useful, **other systems start treating the copy as the real you.** A composite score — built from data you didn't authorize, processed by models you can't see, sold to gatekeepers you never met — decides which apartments come back, which interest rate you're offered, which interviews never happen, which dates appear in your queue, which medical procedures your insurer will cover.
>
> You're not denied. You're **quietly ranked.** And the ranked-you and the real-you diverge in ways neither of you can audit.

**The structural shift this episode names:**

| Era | Decision mode | Recourse |
|---|---|---|
| Pre-1990 | Overt denial (lawful basis required) | Lawsuit, civil-rights remedy |
| 1990–2010 | Statistical denial (FCRA-style scoring) | Dispute process, regulatory floor |
| **2010–now** | **Algorithmic ranking** (no decline event) | **Almost none** |

Quiet ranking sidesteps almost every consumer protection on the books — the protections were designed for explicit denial, not for "the offer never appeared in your feed."

---

## 1 · NARRATIVE SPINE · 9 STAGES

The episode runs roughly the same shape as 01/02: opening hero → diagnostic → mechanism reveals → interactive experiment → consequence math → protection → bridge to next.

### STAGE 01 · THE QUIET NO
**Hero · the moment of non-denial.**

Open on a series of small life moments where nothing visibly bad happens:
- The dating app shows you 4 matches today, not 40.
- The job application gets a polite auto-reply but no callback.
- The apartment listing scrolls past — "we already have other applicants."
- The mortgage offer is 0.4% higher than your neighbor's same-zip same-credit-score.
- The Lyft surge price is $4 more than the person beside you waiting for a different car.
- The insurance quote isn't denied — it just costs $80/mo more.

**The reveal:** none of these felt like discrimination. None of them have a paper trail. **All of them were decisions a model made about a composite of you.**

**Motion treatment:** A grid of 6 vignettes auto-plays. Each one runs through its little non-event in <8 sec. After the third or fourth, a translucent overlay creeps in showing the *score* the model assigned in each case — a tiny floating number you weren't supposed to see.

**Interactive layer:** Hover any vignette to flip it — front side shows the user-visible reality, back side shows the model's actual decision payload (composite ID, score, threshold, action).

---

### STAGE 02 · WHO RANKS YOU NOW · THE SECTOR MAP
**Hero · the systemic anatomy.**

A pannable horizontal scrollscape: nine sectors arranged across the page like organs in a body, all wired to the same central composite. Each sector shows:
- The decision being made about you
- The named operators ranking you in that sector
- The data inputs they're allowed to use (and which they use anyway)
- A "first denial year" stamp showing when algorithmic ranking became standard in that sector

| Sector | Operators (named, public-record) | Decision made about you |
|---|---|---|
| **Hiring** | Workday · iCIMS · Greenhouse · HireVue · Eightfold · Pymetrics · Checkr · Sterling | Will your resume reach a human? Will your video interview be flagged? |
| **Insurance** | LexisNexis Risk Solutions · Verisk · Milliman · OptumIQ · Cambridge Mobile Telematics | What does your premium cost? Will the claim be honored? |
| **Credit + lending** | FICO · VantageScore · Experian Boost · ZestAI · Upstart · Plaid · Klarna · Affirm | What rate are you offered? Will the BNPL approval come through? |
| **Housing** | RealPage · Yardi · CoreLogic SafeRent · TransUnion SmartMove | Did your application make the shortlist? Did your eviction record follow you? |
| **Dating** | Match Group (Tinder · Hinge · OkCupid · Match) · Bumble · Grindr | Who sees you? Whose queue do you appear in? |
| **Health + medical** | Optum · Athenahealth · 23andMe · AncestryDNA · Flo · Whoop · Oura | What does your insurer predict about you? What does your wearable accuse you of? |
| **Education** | Common App + Naviance · ETS · Turnitin · Canvas analytics · ISA providers | Did your application get a "demonstrated interest" flag? Were your essays AI-flagged? |
| **Public benefits + government** | Equifax (income verify) · LexisNexis Accurint · Thomson Reuters CLEAR · Palantir | Are you eligible for SNAP? Are you flagged for fraud review? Is your name on a list? |
| **Mobility + travel** | TSA PreCheck · CLEAR · Global Entry · airline FF programs · Uber/Lyft surge | Are you "trusted traveler"? Are you offered the upgrade? Is your fare surged? |

**Motion treatment:** Each sector starts greyscale. As the user scrolls horizontally, the active sector fills in with color + a single live counter ticking ("`~47,000 hiring decisions made by Workday this hour`" etc.). The wires connecting every sector to a central "composite" pulse with data flowing inward.

**Public-data anchors:** EEOC algorithmic-hiring guidance (2022) · HUD v Facebook consent decree (2019) · CFPB algorithmic-discrimination cases · DOJ v RealPage (2024) · FTC Spokeo + Acxiom consent decrees · Wisconsin v Loomis (COMPAS).

---

### STAGE 03 · THE COMPOSITE · WHO ASSEMBLES IT
**Hero · the master file you've never seen.**

A central panel renders **your composite as a literal anatomical card** — a stylized passport / dossier page with 14 sections, each filled in by a different broker:
- Identity (LexisNexis · LiveRamp)
- Address history (CoreLogic · Equifax)
- Credit + cash flow (Experian · TransUnion · Plaid)
- Insurance history (LexisNexis CLUE · A-PLUS)
- Health + Rx (Optum · IQVIA)
- Genetic + family (23andMe · AncestryDNA)
- Behavioral signals (Acxiom · Oracle Data Cloud)
- Location + movement (X-Mode · SafeGraph · Veraset)
- Social graph (LinkedIn Talent · Pipl)
- Devices + identifiers (LiveRamp RampID · FullContact)
- Court + civil records (Thomson Reuters CLEAR)
- Public benefits + government (Palantir · Equifax Work Number)
- Employer + payroll (Equifax Work Number)
- Predicted scores (FICO · ZestAI · custom models per buyer)

**Interactive layer:** Click any section → expands to show which broker owns it, what fields it contains, what it costs to buy, who the typical buyers are, and the user's actual rights (or non-rights) over that section.

**The disquieting reveal:** A "completeness" meter at the bottom shows that for the average US adult, this dossier is now ~92% filled in **from sources the user never directly fed.**

**Public-data anchors:** FTC 2014 Data Brokers report · Vermont H.764 data-broker registry · California Delete Act (SB 362, 2024) · IRS-published list of Equifax Work Number subscribers · Markup investigations into LexisNexis Risk Solutions.

---

### STAGE 04 · THE VARIABLE REALITIES LAB *(signature interactive)*
**Hero · the engine of the episode.**

A multi-slider control panel where the user adjusts twelve variables and watches six scoring systems update in real time. **This is the part of the episode the reader is supposed to play with for ten minutes.**

#### Variables (input sliders)

| Slider | Range | Why it's in here |
|---|---|---|
| Zip code | rural-poor / rural-affluent / urban-poor / urban-mid / urban-affluent / suburban-elite | Insurance + credit + housing weight zip heavily; zip proxies race in ways the law mostly tolerates |
| Income decile | 1st–10th | Almost every scoring system has income as a top-3 input |
| Race / ethnicity | (presented carefully; toggle "show how disparate impact emerges") | Disparate-impact analysis is publicly documented for FICO, RealPage, several insurers |
| Age | 18–80 | Insurance + dating scoring are explicitly age-banded |
| Employment tenure | <6mo / 6mo–2yr / 2–5yr / 5–10yr / 10+yr | Lending + tenant scoring rank stability heavily |
| Marital status | single / partnered / married / divorced / widowed | Insurance + lending often discount married+; dating algorithms re-rank divorced |
| Education | none / HS / some-college / BA / advanced | "Education pricing" lawsuits document this explicitly |
| Credit utilization | 1% / 10% / 30% / 60% / 90%+ | Tier-1 FICO input |
| Health markers | excellent / good / fair / chronic-condition | Insurance + employer wellness scoring |
| Social-graph density | sparse / moderate / dense / influencer-tier | Dating + LinkedIn talent scoring |
| Digital footprint age | <1yr / 1–5yr / 5–10yr / 10+yr | Identity-trust scoring uses footprint age as a fraud-protection input — but flips into a class signal |
| Prior negative events | none / 1 / 2 / 3+ (eviction · bankruptcy · medical-collection · misdemeanor · etc.) | The tail that shapes everything else |

#### Output dashboards (six live readouts)

1. **Insurance premium** — auto · health · life — multiplier off baseline
2. **Job-application response rate** — % of applications expected to get a callback, normalized
3. **Mortgage rate offered** — basis points above prime
4. **Dating-app visibility tier** — top 5% / top 20% / median / bottom 30%
5. **Rental-screening flag risk** — green / yellow / red
6. **Background-check risk score** — composite

#### The dramatic move

Beneath the six dashboards: a single **"life-cost delta"** meter — the *dollarized annual price* of being this version of you vs. the most-favored composite. For a worst-case scoring of these sliders vs. a best-case, this number can easily exceed **$8,000/year in trust-tax** before you've made a single bad decision.

#### Two preset buttons

- **"Show me the divergence"** — auto-runs a 6-second animation: starts at most-favored composite, then drags every slider one at a time toward median, then toward bottom-decile. The reader *watches* the gates close one by one.
- **"Run a 1,000-person simulation"** — Monte-Carlo: render a hex-grid of 1,000 stick-figures. Each gets a randomized composite from a US distribution. Color-code by life-cost-delta. The reader sees how much variance exists *just from data, not from behavior.*

#### Implementation notes

- All coefficients derived from public sources (FCRA-permissible factors, published actuarial guidance, EEOC enforcement actions, peer-reviewed papers on algorithmic discrimination — every coefficient gets a citation popover).
- The lab is **clearly labeled as illustrative, not a personal credit-score tool.** It shows *direction and magnitude*, not your actual number.
- This is the one place in the episode where the reader becomes the protagonist.

---

### STAGE 05 · THE TWO-YOUS PANEL
**Hero · model-you vs real-you, side by side.**

A split panel. Left side: a person's actual narrative ("I had a hard year. I went into collections on a medical bill in 2022. I started a business in 2023 that's now profitable. I'm engaged. I run 30 miles a week.") Right side: the model's representation of the same person ("subprime credit risk · address-instability flag · industry-transition flag · health-data-volunteer · social-graph diversity index: low").

The reader can toggle between **three pre-built archetypes** (recovering-from-divorce · first-gen-immigrant-W2-thin · post-grad-with-medical-debt) **or write their own narrative** in a free-text field and see Claude-style auto-tagging turn it into what the model would store. (The auto-tagging is keyword-only on the client side — no upload, no persistence.)

**The point:** even a perfectly honest description of a real life loses 90% of its dimensionality when squeezed into the score-friendly schema. The model isn't lying. It's just **not capable of seeing the texture that matters.**

**Public-data anchors:** Brookings 2022 *Algorithmic bias detection and mitigation* report · NIST Special Publication 1270 (Towards a Standard for Identifying and Managing Bias in AI) · Cathy O'Neil's *Weapons of Math Destruction* · Virginia Eubanks' *Automating Inequality* (Indiana Medicaid case).

---

### STAGE 06 · THE 7-YEAR TAIL · TIME AS A WEAPON
**Hero · how long different signals haunt you.**

A horizontal timeline 0–25 years. The reader drags negative-life-event tokens onto the timeline (medical collection · bankruptcy · eviction · DUI · misdemeanor · job gap · public-benefits enrollment). Each token sprouts a colored shadow showing how long it follows them through different scoring systems:

| Event | FCRA reporting cap | Insurance look-back | Employment background check | Tenant database | DNA/family insurance impact |
|---|---|---|---|---|---|
| Medical collection | 7 yrs | 5 yrs · most states | 7 yrs (or never if pre-2014 nuance) | Forever in CoreLogic | n/a |
| Bankruptcy | 10 yrs | 5–10 yrs | 7–10 yrs (some employers) | Forever | n/a |
| Eviction | 7 yrs | n/a | Sometimes | **Forever**, no expungement in most DBs | n/a |
| DUI | 7 yrs (FCRA) | 5–10 yrs (insurance) | 7 yrs | 7 yrs | n/a |
| Felony conviction | varies (most states) | usually permanent | usually permanent | usually permanent | n/a |
| Genetic predisposition (relative tested 23andMe) | n/a | **GINA covers health but NOT life/disability/long-term-care insurance** | n/a | n/a | Forever — and grows as more relatives test |

**The reveal:** GINA (Genetic Information Nondiscrimination Act, 2008) **does not protect life, disability, or long-term-care insurance from using genetic data.** A second cousin you've never met testing on AncestryDNA is enough to ID you and re-price your premiums.

**Motion:** Drag the genetic-event token last. Watch its shadow *grow over time* as the timeline advances — because more relatives are testing every year, and the implicit dossier on you thickens whether or not you participate.

**Public-data anchors:** Fair Credit Reporting Act §605 · GINA Title I + II text · GAO-20-621 (consumer access to data brokers) · MDLive v. Adams (genetic data + insurance) · Sweeney et al. (2018) cousin-triangulation study.

---

### STAGE 07 · THE QUIET-DENIAL LEDGER · CONSEQUENCE MATH
**Hero · what trust-tax actually costs over a lifetime.**

Stage 04's `life-cost delta` ($/yr) was a snapshot. Stage 07 runs it forward 40 years.

A live compounding ledger showing:
- 40-yr **insurance trust-tax** (median scenario · worst-decile scenario)
- 40-yr **lending trust-tax** (extra interest paid on cars + mortgages)
- 40-yr **rental trust-tax** (deposits, security, denied-app fees)
- 40-yr **employment trust-tax** (estimated lifetime-income gap from delayed callbacks)
- 40-yr **dating-and-network trust-tax** (compounded social-capital effect — controversial; presented with that caveat)

A single big number at the bottom: **total lifetime trust-tax for a worst-decile composite vs. best-decile composite, holding ability + intent constant.**

Published estimates I'll cite:
- Brookings (2022): zip-code-based insurance pricing alone costs Black households ~$300/yr median premium delta
- CFPB (2024): "junk fees" + algorithmic markups cost low-credit consumers $90B/yr nationally
- McKinsey + numerous follow-ups: hiring algorithms produce 14–22% callback-rate gaps that translate to ~$400K lifetime income loss in worst case
- FTC 2024: "dark patterns + algorithmic price discrimination" cost surveys

**Conservative midpoint estimate: a worst-decile composite pays $180,000–$320,000 more over 40 years than a best-decile composite — for the same income + ability.**

That's a working-class person's house.

---

### STAGE 08 · THE PROTECTION LAYER · WHAT YOU CAN ACTUALLY DO
**Hero · field manual, but with stakes-clear cost/benefit on every action.**

The same "actionable protection" pattern as the Feed Engine guide, but this time each action has four labels:
- **Time** to execute
- **Cost** ($ or $0)
- **Effectiveness** (1–5 scale, color-coded)
- **Discomfort** rating (1–5)

Actions (grouped by sector):

**Credit + finance**
- Freeze credit at all 3 bureaus + Innovis · 15 min · $0 · ★★★★★ · ☂☂
- Pull annual credit reports + dispute errors · 1 hr · $0 · ★★★★ · ☂☂☂
- Opt out of pre-screened offers at OptOutPrescreen.com · 5 min · $0 · ★★★ · ☂
- Lock Equifax Work Number employer-data sharing · 10 min · $0 · ★★★★ · ☂

**Insurance**
- Request CLUE report (LexisNexis insurance file) + dispute · 30 min · $0 · ★★★★ · ☂☂
- Decline telematics opt-in on auto + home · 2 min · $0 · ★★ · ☂

**Hiring + employment**
- LinkedIn: set profile to "open to recruiters" → off; remove engagement signals · 5 min · $0 · ★★ · ☂
- HireVue / Pymetrics asynchronous interviews: request accommodation · 10 min · $0 · ★★ · ☂☂

**Housing**
- Pull TransUnion SmartMove + CoreLogic SafeRent + RealPage tenant files · 30 min · ~$25 · ★★★★ · ☂☂
- Dispute eviction records aggressively (most contain errors) · 2 hrs · $0–200 · ★★★★ · ☂☂☂

**Health + DNA**
- Don't submit DNA. **Ask family not to.** · 0 min · $0 · ★★★★★ · ☂☂☂☂ (this is the hard one)
- Period tracking: switch to paper or local-only (Drip) post-Dobbs · 15 min · $0 · ★★★★★ · ☂
- 23andMe et al: request data deletion (federal law requires response in 30 days) · 20 min · $0 · ★★★ (data already shared with insurers / law-enforcement contracts may persist) · ☂☂

**Identity + general**
- LexisNexis Risk Solutions: request your file + opt out · 30 min · $0 · ★★★ · ☂☂
- California Delete Act (SB 362): single-button delete from 500+ brokers (when DPM-2 launches, target Jan 2026) · 5 min · $0 · ★★★★ · ☂

**Data hygiene**
- Email aliases (HideMyEmail, SimpleLogin, Firefox Relay) · 15 min · $0–36/yr · ★★★ · ☂
- Phone aliasing (Google Voice, MySudo) · 30 min · $0–20/mo · ★★★ · ☂☂
- Tracker blockers (uBlock Origin · Brave · Apple Mail Privacy) · 10 min · $0 · ★★★ · ☂

**Civic / structural**
- Comment on CFPB rulemakings · 30 min · $0 · ★★ · ☂
- Support state-level data privacy bills (CO · CT · OR · TX active 2025) · varies · $0 · ★★ · ☂

**The reader gets a custom "privacy regimen" they can download as a PDF field manual** (same pattern as the Feed Engine guide — printable, dated, with weekly discipline checklist).

---

### STAGE 09 · THE BRIDGE TO EPISODE 04 — THE INFLUENCE WAR
**Hero · the next layer up.**

If Episode 03 is about *what other systems do with your composite*, Episode 04 will be about *what political and persuasion systems do with it*. Microtargeted political ads, primary-jury-pool-style "issue testing," AI-generated synthetic constituents, the use of trust-market data by campaigns. Brief teaser; carry-forward of the persona.

---

## 2 · PUBLIC-DATA SOURCE CITATIONS (running list)

Federal:
- FTC 2014 *Data Brokers: A Call for Transparency and Accountability*
- FTC Spokeo consent decree (2012)
- FTC Facebook $5B order (2019)
- FTC 2022 *Bringing Dark Patterns to Light* enforcement guidance
- CFPB Algorithmic-Discrimination cases (2022–24)
- CFPB 2024 Junk Fees Report
- EEOC May 2022 *Technical Assistance Document on AI and the ADA*
- HUD v. Facebook consent decree (2019, ad-targeting)
- DOJ v. RealPage (2024, rental algorithmic price-fixing)
- GAO-20-621 *Consumer Data Brokers: Limited Tools Are Available for Consumers*
- NIST SP 1270 *Towards a Standard for Identifying and Managing Bias in AI*
- Wisconsin v. Loomis 881 N.W.2d 749 (Wis. 2016) — COMPAS sentencing
- 15 U.S.C. §1681 Fair Credit Reporting Act §605
- 42 U.S.C. §2000ff Genetic Information Nondiscrimination Act
- CA SB 362 *Delete Act* (2024)
- VT Title 9 §2430-§2447 *Data Broker Regulation*

Academic + investigative:
- O'Neil, Cathy · *Weapons of Math Destruction* (2016)
- Eubanks, Virginia · *Automating Inequality* (2018)
- Benjamin, Ruha · *Race After Technology* (2019)
- Zuboff, Shoshana · *The Age of Surveillance Capitalism* (2019)
- Brookings · *Algorithmic Bias Detection and Mitigation* (2022)
- Sweeney, Latanya et al. · cousin-DNA triangulation papers (2018, 2022)
- The Markup · multiple investigations into RealPage, LexisNexis, tenant screening
- ProPublica · machine-bias reporting (2016, ongoing) — COMPAS audit
- Pew Research · 2023 Privacy + Data Collection survey
- Consumer Reports · 2023 Data-Broker Opt-Out audit

---

## 3 · TECHNICAL + DESIGN NOTES

**Persona carry-forward:** Same six personas as Episodes 01/02 (`curator · caretaker · drifter · believer · hustler · apprentice`), carried via `localStorage 'infera.persona'`. Stage 04 (Variable Realities Lab) pre-loads the slider positions to match the carried persona's typical composite — but the reader is invited to drag any slider to see how the score shifts. **This is where the reader experiences that the persona they "chose" 2 episodes ago was never really their choice.**

**Visual language:** Continues the brutalist editorial dark palette established in Episodes 01/02 (`--ink #0a0a0a · --cream #fbf7eb · --cobalt #1e3cff · --pink #ff1a6b · --lime #c8ff1e · --yellow #ffd500`), Archivo Black display, Instrument Serif italic for accents, Space Grotesk body, JetBrains Mono for tags.

**Motion vocabulary:**
- Sector map = horizontal pan-scroll with sticky header
- Composite anatomy card = click-to-expand sections
- Variable Realities Lab = real-time slider → six animated counters with eased lerp
- Two-yous panel = side-by-side scroll-locked compare
- 7-Year Tail = drag-and-drop token timeline with growing shadows
- Lifetime trust-tax ledger = compounding-number animation that ticks up year-by-year
- Protection field manual = checklist with strikethrough on complete, downloadable PDF

**Interactive depth tiers:**
- **Passive** (just watch): Stages 01, 02, 03, 09
- **Hover-active** (light interaction reveals more): Stages 03, 05
- **Variable-driven** (the reader is the protagonist): Stages 04, 06, 07
- **Action-required** (the reader leaves with a to-do list): Stage 08

**File output target:**
- `the-trust-market.html` — main episode (~150KB)
- `the-trust-market-guide.html` — companion field manual (printable, like Feed Engine guide)
- Optional: `the-trust-market-protection-pdf.pdf` — personalized protection regimen PDF generated client-side

**Persona-aware copy:** Stage 04's "your starting position" defaults to the carried persona. Stage 05's archetypes include one mapped to each persona. Stage 08's protection regimen prioritizes actions most relevant to the carried persona's risk profile.

---

## 4 · OPEN DESIGN QUESTIONS

These I'd want to talk through before I start building:

1. **How aggressive should the dollar-amount claims be?** I have ranges from peer-reviewed sources but the high end of "lifetime trust-tax = $320K" is going to be the headline number that gets quoted out of context. Should I quote a more conservative midpoint and link to the range, or quote the range with an explainer?

2. **Race / ethnicity in the Variable Realities Lab.** Disparate-impact data is well-documented and citable. But putting it on a user-controllable slider is loud. Three options:
   - (a) Include it with a clear "this is what the model uses as a proxy" frame
   - (b) Hide it behind a "show me the disparate impact" toggle
   - (c) Don't include it directly; show it only in the consequence-math stage with citations
3. **DNA + genetic insurance — how much of the family-cousin-triangulation chain to show?** This is the most viscerally upsetting reveal in the episode and I want to handle it with care. Probably worth a dedicated narrative beat in Stage 06.

4. **Should the Variable Realities Lab persist results?** If the reader spends 10 min building a composite and the results are interesting, maybe an "export as image" or "share this scenario" option. Privacy implication: ideally everything stays client-side; no server.

5. **Length/depth balance.** Episode 02 ended up huge. Episode 03 has more material — but the reader probably won't make it through if it's longer than 02. I think Stage 04 (Variable Realities Lab) is the destination and Stages 05–07 are denser-but-shorter. We can hold Stage 02's full sector deep-dive for an appendix or for Episode 04 cross-references.

6. **Tone of the protection layer.** Episode 02's field manual was action-positive ("you can rotate, triangulate, audit, slow down"). Episode 03's actions are MUCH harder to take (especially DNA + insurance) and many require enduring sustained inconvenience. Should the tone shift to acknowledge that asymmetry, or stay action-positive and trust the reader to weigh?

---

## 5 · RECOMMENDED BUILD ORDER (if approved)

Phase A — scaffold (1 session)
- Page shell + nav + hero
- Stage 01 (Quiet No vignettes) — pure motion, ~6 hours of design
- Stage 02 (Sector Map) — horizontal scrollscape

Phase B — anatomy (1 session)
- Stage 03 (Composite card)
- Stage 05 (Two-yous panel)

Phase C — the lab (1–2 sessions)
- Stage 04 (Variable Realities Lab) — this is the most complex single module in the series so far

Phase D — consequence + protection (1 session)
- Stage 06 (7-Year Tail)
- Stage 07 (Trust-Tax Ledger)
- Stage 08 (Protection field manual + PDF)
- Stage 09 (Bridge)

Phase E — companion (½ session)
- the-trust-market-guide.html

---

## 6 · WHY THIS EPISODE MATTERS IN THE SERIES ARC

Personhood Inc. asked: **what are you, really, to the system?** (Answer: a 1,500-field dossier you didn't author.)

The Feed Engine asked: **what does the system show you about the world?** (Answer: a personalized version of reality optimized for what it predicts you'll do next.)

The Trust Market asks: **what does the world see when it sees the system's version of you?** (Answer: a score, on which it has already made decisions you'll never know happened.)

Episode 04 (The Influence War — drafting) will close the loop: **what is the system trying to make you become?**

The thesis of the whole series is that personhood, perception, reputation, and persuasion have been quietly unbundled from the human and reassembled as inventory. Episode 03 is the chapter where the reader feels the price of that unbundling — not theoretically, but in dollars per year and in the apartment-call that never came.

---

*Draft v0.1 · ready for review · once approved I can begin Phase A scaffold.*
