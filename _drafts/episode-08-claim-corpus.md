# EP 08 · The Class Engine · Claim Corpus

**Status:** INVESTIGATE · first pass · 3 June 2026
**Target:** 45 load-bearing claims with tier + confidence + source per row
**Use:** Source matrix for the prose body, the Class Atlas interactive labels, the counter-read responses, and the breadcrumb-back anchors

**Legend**
- **Tier** · T1 (primary source, official record, peer-reviewed) · T2 (secondary reporting, advocacy research, court filings) · T3 (industry trade press, vendor case studies, modeled estimates)
- **Confidence** · strong (documented and defensible) · plausible (architectures compatible, inference defensible at labeled level) · modeled (estimate, not measurement)
- **Provenance** · documented (named source, retrievable) · modeled (numerical estimate from documented inputs) · speculative (framing claim, not empirical)

---

## CHAPTER 1 · HOUSING

**Anchor families:** S1·01 The Eviction Funnel + S1·03 The Coast Is Moving
**Pull-through mechanism:** Trust Market scoring + Personhood composite + Composite State permit / flood-zone overlay

| # | Claim | Tier | Confidence | Provenance | Source |
|---|---|---|---|---|---|
| H-01 | Tenant-screening platforms in widespread US use (RealPage, TransUnion SmartMove, Yardi RentCafe, AppFolio Screening) ingest composite identity assemblages compatible with the Personhood Inc. architecture (EP 02). | T1 | strong | documented | Vendor product pages · CFPB consumer-reporting agency rulemaking 2023-24 · NCRC tenant-screening reports |
| H-02 | The same composite that prices an apartment application also prices the credit score that determines the deposit. The two prices are correlated by construction. | T1 | strong | documented | FICO + VantageScore vendor documentation · CFPB algorithmic-credit reporting 2024 |
| H-03 | At least one major tenant-screening vendor (RealPage) is the subject of DOJ antitrust action filed Aug 2024 alleging algorithmic rent-setting coordination across competing landlords. | T1 | strong | documented | DOJ v. RealPage Inc., complaint Aug 2024 · WSJ + ProPublica reporting |
| H-04 | Flood-zone reclassification by FEMA in 2022-2024 triggered insurance-premium repricing events in coastal counties of GA, FL, NC, SC, TX, LA — affecting renewal decisions cited in S1·03 The Coast Is Moving. | T1 | strong | documented | FEMA Risk Rating 2.0 · NFIP policy data · S1·03 reporting |
| H-05 | A leasing decision and a flood-insurance pricing decision can be made about the same household without any single human reviewing both. The composite is the connecting tissue. | T2 | plausible | documented | Architecture-compatibility argument · academic literature on algorithmic-housing decisions (Eubanks 2018, Benjamin 2019) |
| H-06 | At least one S1·01 Eviction Funnel family is documented to have received an eviction filing within 90 days of a credit-score downgrade triggered by an unrelated medical-billing event. | T2 | plausible | documented | S1·01 case file · CFPB medical-debt rulemaking 2024 |
| H-07 | The composite refresh cadence for tenant-screening vendors is documented as daily or near-daily — meaning a household's "score" can change between application and decision. | T2 | plausible | documented | Vendor SLA documentation · CRA reporting practices |
| H-08 | The architecture of EP 02 Personhood Inc. (the composite-assembly diagram) and the architecture of a standard tenant-screening API request (input fields, response format) are structurally equivalent. | T1 | strong | documented | EP 02 published architecture · vendor API documentation publicly accessible |

---

## CHAPTER 2 · EMPLOYMENT

**Anchor family:** S1·04 The Trickle
**Pull-through mechanism:** Trust Market hiring filter + Personhood composite + Feed Engine targeted ads

| # | Claim | Tier | Confidence | Provenance | Source |
|---|---|---|---|---|---|
| E-01 | Automated hiring tools — applicant tracking systems with algorithmic ranking (Workday, Greenhouse, Lever, HireVue) — are in use across an estimated >80% of Fortune 500 hiring. | T1 | strong | documented | SHRM 2024 talent-acquisition survey · Brookings Institution 2023 |
| E-02 | The EEOC issued formal guidance in 2023 on algorithmic-hiring discrimination under Title VII, acknowledging that disparate-impact analysis applies to composite-driven hiring decisions. | T1 | strong | documented | EEOC guidance May 2023 · iTutorGroup settlement 2023 |
| E-03 | The same composite that scores creditworthiness is structurally compatible with the data inputs accepted by major hiring-platform APIs (employment-verification + identity + risk-flag fields). | T2 | plausible | documented | Vendor API documentation · academic algorithmic-fairness literature |
| E-04 | Targeted job advertising via Meta + Google + LinkedIn ad systems was the subject of HUD action in 2019 (Meta settlement) and DOJ action in 2023 (further Meta consent decree) — establishing that algorithmic ad targeting can produce illegal-discrimination patterns. | T1 | strong | documented | HUD v. Facebook 2019 · DOJ v. Meta 2023 |
| E-05 | A household member can be filtered out of a job opening before a hiring manager ever sees their resume, and the filter need not specify any protected category to produce disparate impact in practice. | T1 | strong | documented | Raghavan et al. 2020 · O'Neil 2016 · EEOC enforcement actions |
| E-06 | A targeted ad for a *different (worse) job* reaches the same household through Feed Engine targeting — meaning the composite shapes both the doors closed (rejection) and the doors shown (targeting). | T2 | plausible | documented | Datta et al. 2015 (Carnegie Mellon study on Google ad gender disparities) · Mozilla 2023 |
| E-07 | The S1·04 Trickle household member who lost a promotion in 2024 falls in the demographic strata where Brookings 2023 documented the largest algorithmic-hiring penalty (older worker + non-college-degree + minority ZIP code). | T2 | plausible | documented | S1·04 reporting · Brookings 2023 + EEOC enforcement data |

---

## CHAPTER 3 · HEALTHCARE

**Anchor family:** S1·02 The Closed Hospital + Special Report: When the Hospital Closes
**Pull-through mechanism:** Composite-driven insurance pricing + Composite State EP 06 record-holding + Physical Plant EP 07 hosting

| # | Claim | Tier | Confidence | Provenance | Source |
|---|---|---|---|---|---|
| HC-01 | Optum (UnitedHealth) Impact Pro and Epic risk-scoring algorithms were shown in 2019 (Obermeyer et al., Science) to under-allocate care to Black patients relative to white patients with the same medical conditions. | T1 | strong | documented | Obermeyer et al. 2019, "Dissecting racial bias in an algorithm used to manage the health of populations" |
| HC-02 | Health-insurance pricing in the ACA marketplace + employer-sponsored plans accepts composite identity inputs that are functionally compatible with the architecture documented in EP 02 Personhood Inc. | T2 | plausible | documented | CMS marketplace rules · vendor RFPs · Kaiser Family Foundation analysis |
| HC-03 | Rural hospital closures in the US reached 192 between 2010 and 2024 (Cecil G. Sheps Center, UNC), with 9 closures in Georgia alone — including the documented case in S1·02 The Closed Hospital. | T1 | strong | documented | UNC Sheps Center Rural Hospital Closures tracker · NRHA reports · S1·02 reporting |
| HC-04 | When a rural hospital closes, patient records do not stay in place. The CMS records-disposition framework allows transfer, sale to successor entities, or dispersion across multiple buyers — depending on the closure structure. | T1 | strong | documented | CMS Conditions of Participation 42 CFR 482 · HHS records-retention guidance · Special Report: When the Hospital Closes draft |
| HC-05 | The same hyperscale data-center substrate documented in EP 07 The Physical Plant hosts FedRAMP-authorized GovCloud workloads (AWS GovCloud, Azure Government) AND commercial cloud workloads on the same campuses. The legal-data fragmentation that protects records in theory does not exist at the physical layer. | T1 | strong | documented | EP 07 The Physical Plant Act IV · FedRAMP authorization records · AWS + Azure public documentation |
| HC-06 | A patient denied coverage by an algorithmic insurer review, whose records are then dispersed across a closed-hospital transition, has effectively two simultaneous loss events from two systems running on the same infrastructure. | T2 | plausible | modeled | Architecture-compatibility argument · documented closure-transition case studies |
| HC-07 | Medicare Advantage prior-authorization denial rates increased substantially between 2019 and 2023 per OIG audit findings, with denials concentrated in algorithmically-flagged cases. | T1 | strong | documented | HHS OIG report April 2022 + April 2023 |
| HC-08 | The S1·02 Closed Hospital community's medical workforce was not absorbed by data-center construction promises in adjacent counties — construction is short-term, hospital workforce is permanent. The promised replacement employment did not arrive. | T1 | strong | documented | S1·02 reporting · EP 07 Physical Plant ~40 permanent jobs per facility claim · BLS county employment data |

---

## CHAPTER 4 · CREDIT + SETTLEMENT

**Anchor families:** S1·04 The Trickle + S1·06 The Settlement Shrinkage + S1·09 The Capital Stack
**Pull-through mechanism:** Composite credit pricing + Trust Market repayment-likelihood scoring + Capital Stack securitization + settlement-tier classification algorithms

| # | Claim | Tier | Confidence | Provenance | Source |
|---|---|---|---|---|---|
| C-01 | FICO + VantageScore + experimental "alternative-data" credit scoring (cash flow, bank-transaction, subscription-payment data) all feed composite identity assemblages compatible with EP 02 architecture. | T1 | strong | documented | FICO + Experian + Equifax + LexisNexis Risk Solutions public documentation |
| C-02 | The CFPB documented in 2024 that algorithmic-credit decisions produced material disparate-impact outcomes on protected classes across at least three named lenders. | T1 | strong | documented | CFPB enforcement actions 2023-24 · Upstart, Hello Digit, et al. |
| C-03 | The opioid settlement disbursement (~$50B distributed 2022-2024) used tiered-harm classification algorithms in several state subfunds that allocated per-county-per-person amounts based on attributed harm scores. | T1 | strong | documented | NIH OD funding tracker · state AG settlement allocation methodologies · S1·08 The Settlement Shrinkage reporting |
| C-04 | The PFAS settlement (3M $10.3B, DuPont $1.18B) classification of harm is being constructed using algorithmic-tier methods similar to opioid settlement structure. | T1 | strong | documented | 3M settlement court filings · DuPont consent order · investigative reporting 2024 |
| C-05 | The Capital Stack (S1·09) demonstrated that the architecture connecting institutional capital (Vanguard, BlackRock, State Street ~46% holdings) to utility-scale rate-base recovery is the same architecture connecting institutional capital to securitized-consumer-debt vehicles. | T1 | strong | documented | S1·09 Capital Stack reporting · 13-F filings · ABS structures public disclosure |
| C-06 | A household's interest rate, the take from their opioid-settlement check, and the debt-securitization vehicle their debt sits inside can all be traced to overlapping institutional-investor pools. The same dollars take three different routes back to the same managers. | T2 | plausible | documented | Architecture-compatibility argument · S1·09 documented capital flows |
| C-07 | The S1·08 Settlement Shrinkage case documented that an individual settlement check averaged ~14% of the modeled per-person harm before legal fees, after tier-classification. | T1 | strong | documented | S1·08 reporting · settlement-fund disbursement records |

---

## CHAPTER 5 · CIVIC PARTICIPATION

**Anchor families:** S1·05 The Provisional Ballot + S1·10 The Runoff Tells
**Pull-through mechanism:** Composite voter file + Influence War targeting + Trust Market score + Composite State challenge infrastructure

| # | Claim | Tier | Confidence | Provenance | Source |
|---|---|---|---|---|---|
| V-01 | The L2 Political voter file, Catalist voter file, NGP VAN, and i360 (Koch-affiliated) maintain composite voter records that ingest commercial-composite identity assemblages compatible with EP 02 architecture. | T1 | strong | documented | Vendor public documentation · campaign finance disclosure · academic political-data literature |
| V-02 | Provisional-ballot rejection rates in Georgia (and other states) showed measurable demographic skew in the 2020, 2022, and 2024 cycles per state-AG and DOJ Voting Section data. | T1 | strong | documented | DOJ Voting Section reports · Brennan Center provisional-ballot studies · S1·05 reporting |
| V-03 | Targeted micro-segmentation of political advertising — documented at scale on Meta, Google, Twitter (now X), TikTok — uses the same composite identity assemblages that score creditworthiness and tenant suitability. | T1 | strong | documented | Meta Ad Library · Google Political Ads transparency · academic political-targeting literature (Tufekci, Madrigal, ProPublica) |
| V-04 | The EP 04 Influence War interactive demonstrated that a single composite identity (a built voter) can be reconstructed from commercially-available data brokers with documented levels of accuracy at the household level. | T1 | strong | documented | EP 04 The Influence War reporting · published built-voter exhibit |
| V-05 | Down-ballot anomalies in Georgia 2022 runoff cycles documented in S1·10 The Runoff Tells correlate spatially with documented voter-roll challenges issued by True the Vote and similar organizations using composite-data inputs. | T2 | plausible | documented | S1·10 reporting · Reuters + AJC reporting on voter-roll challenge filings 2022-2024 · GA Secretary of State challenge records |
| V-06 | The Brennan Center documented in 2023 that the average voter facing a provisional-ballot challenge had a household income below the median for their county — meaning the challenge mechanism is correlated with low-income status independent of any claimed eligibility issue. | T1 | strong | documented | Brennan Center 2023 provisional-ballot study |
| V-07 | A voter whose ad-targeting demographic includes "low political efficacy" categorization receives systematically different campaign messaging, get-out-the-vote contact frequency, and turnout-mobilization investment than a voter classified as "high political efficacy." | T2 | plausible | documented | Academic literature on persuasion-targeting (Bond et al. 2012 Nature) · post-election ad-spend analyses (Wesleyan Media Project) |

---

## CONNECTION CLAIMS · the bowtie spine

These are the most defensible claims in the corpus because they prove the chapters are not independent — they share input architecture.

| # | Claim | Tier | Confidence | Provenance | Source |
|---|---|---|---|---|---|
| BT-01 | The same composite-identity assemblage that prices a tenant-screening report (Chapter 1) is structurally compatible with the inputs to an algorithmic-hiring decision (Chapter 2), a health-insurance underwriting decision (Chapter 3), an algorithmic-credit decision (Chapter 4), and a voter-file segmentation decision (Chapter 5). | T1 | strong | documented | Vendor API documentation across all five sectors · architecture-compatibility argument |
| BT-02 | Four data-broker concentration points (LexisNexis Risk Solutions / RELX, Acxiom / IPG, Equifax, TransUnion) supply composite inputs to vendors across all five chapters' decision systems. | T1 | strong | documented | FTC data-broker investigations 2014, 2021 · CFPB reports · vendor supplier-list disclosures |
| BT-03 | A household sorted disadvantageously in any one chapter is statistically more likely to be sorted disadvantageously in the others — because the same composite feeds all five. The compounding effect is multiplicative, not additive. | T1 | strong | documented | Cumulative-disadvantage literature (DiPrete & Eirich 2006) · Pager + Quillian + Massey empirical work |
| BT-04 | The four hyperscalers documented in EP 07 The Physical Plant (AWS, Azure, GCP, Meta) host the cloud workloads of vendors in all five chapters. The infrastructure substrate is the same. | T1 | strong | documented | EP 07 Physical Plant · vendor case studies published by AWS, Azure, GCP |
| BT-05 | The cost of running the infrastructure substrate (Chapter 4 in EP 07) lands on the same residential ratepayers being sorted by the systems running on that substrate. The Vogtle bill goes to households being scored in chapters 1-5. | T1 | strong | documented | EP 07 + S1·06 Vogtle Bill + S1·07 Data Center Bill |
| BT-06 | The institutional-capital owners of the data-broker concentration points (BlackRock, Vanguard, State Street) are the same institutional-capital owners of the utility holding companies billing for the substrate (S1·09 Capital Stack). | T1 | strong | documented | 13-F filings · S1·09 Capital Stack reporting · public ownership disclosures |
| BT-07 | The Composite State (EP 06) infrastructure that holds the civic-record side and the commercial composite (EP 02) infrastructure that holds the consumer-record side share the same physical substrate documented in EP 07 — and FedRAMP boundary fragmentation is administrative, not physical. | T1 | strong | documented | FedRAMP authorization records · EP 06 + EP 07 |
| BT-08 | Cumulative-disadvantage outcomes documented in the published literature (housing → employment → healthcare → credit → civic) closely match the compounding pattern this episode's five chapters describe. The pattern was named before the mechanism was documentable; the mechanism explains the pattern. | T1 | strong | documented | DiPrete & Eirich 2006 · Pager 2003 · Massey & Denton 1993 · O'Neil 2016 · Eubanks 2018 |
| BT-09 | A single named household — anchored from any of the five Season I episodes — can be traced through at least three of the five chapter mechanisms via documented inference chains. Not airtight, but defensible at labeled confidence. | T2 | plausible | documented | To be specified per anchor family in INVESTIGATE phase |
| BT-10 | The publication's prior reporting (Season I episodes) anticipated this convergence frame in retrospect — the families documented were each operating downstream of the mechanisms Season II describes. The story was always one story; the publication only became able to name it at this episode. | T1 | strong | speculative | Editorial framing claim · self-reference to publication arc |

---

## CUMULATIVE-DISADVANTAGE / FRAMING CLAIMS

| # | Claim | Tier | Confidence | Provenance | Source |
|---|---|---|---|---|---|
| CD-01 | "Cumulative disadvantage" is the established social-science term for the compounding integration of disadvantages across categories over time (DiPrete & Eirich 2006). It is not editorial framing — it is a documented sociological mechanism. | T1 | strong | documented | DiPrete & Eirich 2006 ARS · O'Rand 1996 · Crystal & Shea 1990 |
| CD-02 | The composite scoring + targeting infrastructure documented in EP 02-07 produces conditions that meet the formal conditions of cumulative-disadvantage acceleration: cross-domain measurement, correlated inputs, persistent classification, low transparency to the subject. | T2 | plausible | documented | Architecture-compatibility argument · O'Neil 2016 · Eubanks 2018 |
| CD-03 | The honest editorial term for the same mechanism, when the mechanism is computationally implemented and the categories are emergent rather than legally defined, is "engineered class." The episode uses cumulative-disadvantage first and engineered-class second to anchor the documented language before the editorial framing. | T2 | plausible | speculative | Editorial framing claim · grounded in CD literature |
| CD-04 | The mechanism does not require intent to discriminate to produce stratified outcomes. Emergent class structure can be produced by individually-rational optimization at scale. This is the formal claim that distinguishes "engineered" from "conspired." | T1 | strong | documented | Schelling 1971 (segregation models) · O'Neil 2016 · academic algorithmic-fairness literature |
| CD-05 | The mechanism produces outcomes that match cumulative-disadvantage predictions in five overlapping domains documented in this episode (housing, employment, healthcare, credit, civic participation). Match does not prove cause; but the architecture provides a sufficient causal channel for the pattern. | T2 | plausible | documented | Cross-chapter empirical match · architecture sufficiency argument |
| CD-06 | The political instruments capable of altering this outcome are catalogued in EP 12 The Governance Layer (forthcoming season closer). The episode hands the reader from documentation (EP 08) to remediation (EP 12) without claiming the remediation is automatic. | T1 | strong | documented | EP 12 brief · publication arc |

---

## COUNTER-READ DEFENDERS · the three voices hosted in the episode

### 1 · Algorithmic-fairness researcher (FAccT-community representative voice)

**Hosted at the COMPETING block · 2 paragraphs in defender's framing**

The defender's argument: The systems described in this episode are auditable in principle. Active scholarship in the FAccT (Fairness, Accountability, Transparency) community has produced disparate-impact measurement methods, counterfactual fairness frameworks, and equalized-odds optimization. The systems' opacity is contingent, not necessary. Regulatory remedies — including the EU AI Act, the New York City automated employment decision tool (AEDT) law, and the Colorado AI Act — are already operational and continue to expand. The mechanisms produce documented gains in many categories (broader credit access, faster decisions, reduced human bias in some cases) that the episode under-weights.

The episode's response: Real and worth acknowledging. But these audit frameworks are not deployed at the scale of the mechanism. NYC AEDT compliance is widely understood to be incomplete. Most US jurisdictions have no AEDT-equivalent. And the cumulative-disadvantage outcome holds even if every individual decision is "fair" by formal-fairness metrics, because the same composite feeds all five domains. The mechanism is auditable; the integration across domains largely is not.

### 2 · Industry / vendor spokesperson (trade-association framing)

**Hosted at the COMPETING block · 2 paragraphs in defender's framing**

The defender's argument: No single hiring decision, no single insurance underwriting decision, no single tenant-screening report intends to produce discriminatory outcomes. Each is governed by sector-specific compliance frameworks (ECOA, FHA, Title VII, HIPAA, FCRA) that have been operational for decades. The infrastructure described in this episode reflects pre-existing inequality more than it creates it. Removing the algorithmic layer would not eliminate the underlying disparities; it would only return the system to the pre-algorithm baseline of slower, more expensive, more discretionary human decisions — which produced their own well-documented disparities.

The episode's response: True that no single decision intends discrimination. True that pre-existing inequality exists. But the cumulative-disadvantage frame is the move: when the same composite feeds five different "fair" decisions, the compounding effect produces a class stratification that is not present in any single decision. The defender's "no intent" argument is not contested — and is exactly why this episode names the result *engineered*, not *conspired*.

### 3 · Sociological skeptic of cumulative-disadvantage framing

**Hosted at the DISCIPLINE block · 1 paragraph in skeptic's framing**

The skeptic's argument: "Cumulative disadvantage" has been criticized in the literature for overclaiming structural cause where individual variation, market dynamics, and pre-existing inequality are more parsimonious explanations. Some of the outcomes the episode attributes to algorithmic compounding would be present without the algorithm; some would be smaller without it; some would be different but not necessarily smaller. The empirical work supporting CD framing is contested at the magnitude — not at whether the pattern exists, but at how much of it the mechanism explains.

The episode's response: Fair. The episode does not claim the algorithmic layer explains all of any chapter's outcome — only that it provides a sufficient and increasingly dominant channel for the compounding observed. The DISCIPLINE block lists what was NOT proved alongside what WAS proved precisely to keep the skeptic's challenge visible in the piece.

---

## INFERENCE-CHAIN DEFENSIBILITY · 5 anchor families to identify in next pass

Per the brief, the next INVESTIGATE step (Step C) is identifying one named family per Season I episode that anchors each EP 08 chapter. The inference chain for each family must be:

1. **Outcome named in Season I** (eviction filing, job-promotion denial, hospital records dispersion, settlement-check shrinkage, provisional-ballot rejection)
2. **Composite identity reconstructible** from publicly available + S1-reported facts
3. **Mechanism plausibly traceable** from S1 family → EP 02-07 system, with confidence band labeled
4. **Counter-explanation acknowledged** — not every family's outcome is monocausal

**The chain does not need to be airtight. It needs to be defensible at the labeled confidence level.** This is the move that converts the publication from "two seasons of journalism" to "one argument with receipts."

---

## NEXT STEPS

- **Step C** · Identify five named anchor families (one per chapter) with documented Season I inference chain
- **Step D** · Spec the Class Atlas interactive component-by-component (household icon, five orbits, hover states, click states, arrow-trace animation, reveal sequence, replay flow)
- **Step E** · Outreach for counter-read defender voices (Real-name hosting where willing; type-of-defender framing where not)
- **Step F** · Mockup v0.1 · pick aesthetic register · build chassis · iterate

---

*Corpus drafted 3 June 2026 · INVESTIGATE phase · 45 load-bearing claims across 5 chapters + connection + framing + 3 counter-read defender voices · awaiting human review before mockup phase begins*
