# EP 08 · The Class Engine · Anchor Families

**Status:** INVESTIGATE · 3 June 2026
**Purpose:** Identify one named household per Season I chapter for the EP 08 PIPELINE act. Each anchor must carry a documented outcome (from S1 reporting), a reconstructible composite identity (from public + S1 facts), and a traceable inference chain from EP 02-07 mechanism to the S1 outcome.

**Critical discipline:** *The chain does not need to be airtight. It needs to be defensible at the labeled confidence level.* This is the move that converts the publication from "two seasons of journalism" to "one argument with receipts."

**Naming convention:** First names + ZIP code per the brief's visual-restraint instruction. Last names withheld for both safety and visual restraint. ZIP codes accurate to the S1 reporting.

**For each family:**
1. The Season I story they anchor
2. The documented outcome
3. Their composite identity reconstruction (what data brokers would have on them)
4. The Season II mechanism most plausibly involved
5. The inference chain · step by step · with confidence labels
6. Counter-explanation hosted

---

## CHAPTER 1 · HOUSING

### ANCHOR FAMILY · MARIA & DEVON · ZIP 30315 (Atlanta, Mechanicsville)

**Season I source:** S1·01 The Eviction Funnel · also overlaps with S1·03 The Coast Is Moving via second-property thread

**Documented outcome (from S1·01):**
Maria + Devon were evicted from a Mechanicsville rental in spring 2024. They had rented from the same landlord for 6 years. The eviction filing came 47 days after Maria's hospital visit triggered a medical-debt collection action — which dropped her credit score by 80 points. The landlord, a 14-unit operator, used a tenant-screening report from one of the three named major vendors (Yardi RentCafe, AppFolio, TransUnion SmartMove — exact vendor not disclosed in S1·01 reporting). The renewal was denied. The eviction filing followed when they did not vacate within the statutory window.

**Composite identity reconstruction · what data brokers would have on them in spring 2024:**
- Identity layer · Maria (Black, 34, GED, 1 child) · Devon (Black, 36, no degree, hospitality worker) · cohabiting at the same address 6+ years
- Credit layer · FICO score dropped 580 → 500 in 30 days · medical debt of $4,800 in collections (Grady Memorial · pre-CFPB-2023-medical-debt-rule)
- Employment layer · Devon hospitality irregular hours · Maria childcare-worker · combined household income ~$38K
- Housing layer · 6-year tenancy · no prior eviction filings · rent-to-income ratio at lease signing ~31%, by renewal ~44%
- Flood-zone layer · Mechanicsville on the edge of a 2022 FEMA Risk Rating 2.0 reclassification zone; landlord's insurance premium rose 28% mid-lease
- Digital layer · Maria's iCloud, Facebook, Instagram, banking app, transit app, Cash App — all feeding standard commercial-broker pipelines

**Season II mechanism most plausibly involved:**
EP 02 Personhood Inc. (composite assembly) + EP 03 Trust Market (the score that opened/closed the renewal gate)

**Inference chain:**

| Step | Claim | Confidence |
|---|---|---|
| 1 | Maria's medical-debt collection action was reported to one of the three CRAs (Experian / Equifax / TransUnion). | **strong** (documented · CFPB rulemaking confirms this pipeline operated as standard practice pre-2023) |
| 2 | The credit-score drop appeared in the tenant-screening vendor's API response within the standard 24-72hr CRA refresh window. | **strong** (documented · vendor SLAs) |
| 3 | The landlord pulled a tenant-screening report at renewal decision. (Mid-size landlords pulling reports at renewal is documented industry practice; S1·01 did not confirm specific vendor.) | **plausible** (industry practice; specific instance inferred) |
| 4 | The vendor's recommendation flipped from "approve renewal" to "do not renew" based on the post-medical-debt credit score and the rent-to-income ratio update. | **plausible** (the score-driven flip is the documented vendor behavior; specific decision is inferred) |
| 5 | The landlord followed the vendor recommendation. | **plausible** (industry practice; outcome consistent) |
| 6 | The flood-zone reclassification + insurance premium increase made non-renewal more financially attractive to the landlord than a workout — an independent compounding factor. | **plausible** (FEMA reclassification documented; landlord's specific calculus inferred) |

**Counter-explanation hosted:**
"The eviction may have happened anyway. Rent-to-income ratio rose to 44%. The landlord was not obligated to absorb the unpaid medical debt or the insurance premium increase. A traditional human reviewer might have made the same decision." *The episode's response:* True — and the episode does not claim the algorithm caused the eviction. It claims the algorithm made the decision *faster*, *cheaper*, and *with less human review*, in a way that compounds with the four other chapters in this episode for the same household. The cumulative outcome is engineered class even if any single decision is defensible.

---

## CHAPTER 2 · EMPLOYMENT

### ANCHOR FAMILY · JAMES · ZIP 30238 (Jonesboro, Clayton County)

**Season I source:** S1·04 The Trickle

**Documented outcome (from S1·04):**
James, 51, worked for 11 years as a logistics supervisor at a regional distribution center. In 2023 he was passed over for a promotion to operations manager three times in a 14-month window. Each promotion went to a candidate hired through the company's applicant tracking system (Workday or competitor — S1·04 did not name the specific vendor) with measurably less institutional tenure but a stronger algorithmic-resume score. James's resume was filtered to the bottom tier of internal candidates each time despite supervisor recommendations.

**Composite identity reconstruction:**
- Identity layer · James (Black, 51, associate's degree from community college) · married · 2 children · stable household 15+ years
- Employment layer · 11-year tenure · supervisor responsibilities · zero disciplinary actions · strong supervisor recommendations
- Credit layer · stable mid-prime FICO ~700 · mortgage paid on time · auto loan paid on time
- Digital layer · LinkedIn profile minimal · no professional networking activity · Facebook personal · Indeed account used for original application
- Algorithmic-resume vulnerabilities · no four-year degree · age 51 in a category where Brookings 2023 documented largest algorithmic-hiring penalty · resume keyword density below typical Workday-optimized profiles

**Season II mechanism most plausibly involved:**
EP 03 Trust Market (the algorithmic-resume score) + EP 02 Personhood Inc. (the composite the score is built from)

**Inference chain:**

| Step | Claim | Confidence |
|---|---|---|
| 1 | The employer used an algorithmic applicant-tracking system for the operations-manager role. ATS use is >80% in Fortune 500 hiring (E-01). | **strong** (industry practice well-documented) |
| 2 | James's resume was processed through the algorithmic ranker for each of the three promotion windows. | **plausible** (consistent with documented vendor behavior; specific instance inferred) |
| 3 | James's profile pattern (no four-year degree, age 51, minimal LinkedIn presence, modest keyword density) matches the demographic strata where Brookings 2023 documented the largest algorithmic-hiring penalty (E-07). | **strong** (Brookings 2023 empirical) |
| 4 | The promotion decision went to candidates with stronger algorithmic-resume scores. (S1·04 reports supervisor recommendations were overridden by hiring-platform recommendations in at least one of the three windows.) | **plausible** (S1·04 reporting; institutional pattern documented) |
| 5 | EEOC's 2023 guidance on algorithmic-hiring discrimination explicitly covers this disparate-impact pattern (E-02). | **strong** (regulatory documentation) |
| 6 | Targeted ads for *different and lower-tier* logistics jobs reached James through Meta + Indeed ad systems during the same 14-month window. | **plausible** (E-06 architecture-compatibility; specific ad-targeting inferred) |

**Counter-explanation hosted:**
"The promotion may have gone to better-qualified candidates by any reasonable metric. The algorithmic score may have correctly identified the stronger management profile. James's supervisor recommendation may have been politically motivated." *The episode's response:* Possible — but EEOC's 2023 guidance explicitly addresses why supervisor overrides should not be presumed wrong simply because they conflict with algorithmic scores. The point is not that the algorithm was wrong; the point is that the algorithm compounded with the four other chapters in this episode to produce a household trajectory.

---

## CHAPTER 3 · HEALTHCARE

### ANCHOR FAMILY · DOROTHY · ZIP 31810 (Buena Vista, Marion County)

**Season I source:** S1·02 The Closed Hospital · with overlap to Special Report: When the Hospital Closes

**Documented outcome (from S1·02):**
Dorothy, 71, was a patient of Marion Memorial Hospital for 23 years before it closed in 2021 — one of the 9 Georgia rural hospitals to close 2010-2024 (HC-03). Her medical records were transferred to two separate buyers as the hospital's assets were divided in bankruptcy: her cardiology records to Phoebe Putney Health System (Albany), her routine records to Wellstar (Atlanta). The records-transition disposition was conducted under standard CMS 42 CFR 482 records-retention guidance, but no patient consent process was performed for the cross-system transfer. Dorothy did not know which institution held what until she sought care in late 2022 and was told her cardiology records were not available at the nearest open facility.

**Composite identity reconstruction:**
- Identity layer · Dorothy (Black, 71, widow, retired sharecropper's daughter, 8th grade education) · sole-occupant household 6 years since husband's death
- Healthcare layer · 23-year patient at Marion Memorial · 4 cardiac events over 12 years · Medicare + Medicaid dual-eligible · prescribed 7 medications
- Geography layer · 32 miles to nearest open hospital after Marion closure · no public transit · adult son lives 90 miles away in Macon and visits weekly
- Records layer · cardiology records held by Phoebe Putney (now also subject to a 2023 cyber incident affecting ~2.5M patient records) · routine records held by Wellstar (which operates on AWS/Azure FedRAMP-aligned infrastructure)
- Civic layer · voter, regular Sunday-service attendee · Medicare Part D plan algorithmically selected by an insurance-marketplace recommendation tool · 2022 Medicare Advantage prior-authorization denial documented in S1·02

**Season II mechanism most plausibly involved:**
EP 06 The Composite State (civic-record holding) + EP 07 The Physical Plant (the infrastructure substrate holding both halves)

**Inference chain:**

| Step | Claim | Confidence |
|---|---|---|
| 1 | Marion Memorial closed in 2021 per documented Georgia rural-hospital-closure tracker (HC-03). | **strong** (UNC Sheps Center) |
| 2 | Records were dispersed across multiple successor entities per the CMS 42 CFR 482 framework (HC-04). | **strong** (regulatory framework documented) |
| 3 | Both successor entities (Phoebe Putney + Wellstar) operate substantial workloads on hyperscaler infrastructure documented in EP 07 (HC-05). | **strong** (vendor case studies + GovCloud authorization records public) |
| 4 | The 2023 Phoebe Putney cyber incident affected ~2.5M records · Dorothy's cardiology records were likely in the affected set, given her transfer destination. | **plausible** (incident scope documented; specific records inferred) |
| 5 | Dorothy's 2022 Medicare Advantage prior-authorization denial falls in the cohort the HHS OIG 2022/2023 reports documented as algorithmically-flagged (HC-07). | **plausible** (OIG empirical match; specific denial inferred at population level) |
| 6 | The data-center construction promised to adjacent counties in 2020-2023 did not absorb the medical workforce that Marion Memorial lost on closure (HC-08). The labor backdrop the data-center announcements were marketed against is Dorothy's community. | **strong** (BLS county employment data + EP 07 ~40 permanent jobs claim) |

**Counter-explanation hosted:**
"The hospital closed for documented financial reasons unrelated to algorithmic systems. Dorothy's record-dispersion is standard CMS regulatory practice. The denial of Medicare Advantage authorization may have been a correct clinical decision. The data-center comparison is not causally connected to her care outcome." *The episode's response:* True for each individual link in the chain. The episode does not claim direct causal chain from algorithm to denial. It claims the *integration* — the fact that her records, her insurance, her closed hospital, and the data-center infrastructure all run on architecturally related systems (operated by overlapping institutional capital, hosted on shared physical substrate, governed by frameworks that are administrative not physical) — is the engineered-class condition the chapter names.

---

## CHAPTER 4 · CREDIT + SETTLEMENT

### ANCHOR FAMILY · ROBERT · ZIP 30401 (Swainsboro, Emanuel County)

**Season I source:** S1·08 The Settlement Shrinkage + secondary thread S1·04 The Trickle + S1·09 The Capital Stack

**Documented outcome (from S1·08):**
Robert, 56, lost his brother to opioid overdose in 2017. As a documented next-of-kin survivor, he was eligible for compensation under Georgia's share of the 2022-2024 national opioid settlement. The state's algorithmic tier-classification of his harm allocated his per-person compensation at $1,847 — approximately 14% of the modeled per-person harm value before legal fees were deducted, leaving him with $1,205 net. S1·08 reporting documented that this share fell at the median for his demographic (rural southern white male, age 50+, no surviving spouse claim) and well below shares allocated to claimants in higher-tier classifications.

**Composite identity reconstruction:**
- Identity layer · Robert (white, 56, divorced, no degree, mechanic) · single-occupant household · adult child estranged
- Financial layer · FICO ~640 · primary residence purchased 2003, refinanced 2019, current LTV ~62% · auto loan paid · two store-card balances
- Health layer · own opioid prescription 2014-2018 (legitimate post-surgery, tapered properly) · brother's overdose 2017 · own no-current-substance-use
- Settlement layer · classification tier "B" (mid-tier) per state allocation methodology · documented next-of-kin status · no surviving spouse claim
- Capital-stack layer · primary mortgage held by a securitization vehicle managed by one of the top-3 institutional capital pools documented in S1·09 (Vanguard, BlackRock, State Street holdings of MBS aggregates)

**Season II mechanism most plausibly involved:**
EP 03 Trust Market (the tier classification) + EP 02 Personhood Inc. (the composite the classification uses)

**Inference chain:**

| Step | Claim | Confidence |
|---|---|---|
| 1 | The Georgia opioid-settlement disbursement used algorithmic tier-classification for per-person allocation (C-03). | **strong** (state AG methodology public; S1·08 reporting confirms) |
| 2 | Robert's tier-B classification reflects the composite identity assembled from his documented status (next-of-kin · no surviving spouse · no documented surviving minor child · rural residence). | **strong** (state methodology documented; classification mechanically applied) |
| 3 | The composite-identity inputs to settlement classification are structurally compatible with the same data-broker pipelines that feed credit scoring (BT-02). | **strong** (architecture compatibility) |
| 4 | Robert's FICO ~640 + the documented credit-line architecture of CFPB-flagged algorithmic-credit vendors places him in the cohort that pays measurably higher interest rates than identically-credit-risk borrowers in non-algorithmic markets (C-02). | **plausible** (CFPB enforcement empirical; specific rate impact inferred at population level) |
| 5 | His mortgage securitization vehicle's owners overlap with the institutional capital pools holding the settlement-fund management entities (BT-06). The same dollars take three routes back to overlapping managers. | **strong** (13-F filings) |
| 6 | The S1·08 reporting documented that his net check was ~14% of modeled per-person harm before tier-classification (C-07). | **strong** (S1·08 reporting) |

**Counter-explanation hosted:**
"The settlement tier-classification reflects documented harm methodology that necessarily allocates differently across claimant types. Robert's interest rates reflect his credit profile. The mortgage securitization is unrelated to the settlement allocation." *The episode's response:* True that each piece is documented and methodologically defensible in isolation. The chapter's claim is that the integration of pieces 1-6 — particularly the BT-06 capital-flow overlap — is itself the engineered-class condition. The check shrinkage, the interest-rate burden, and the securitization premium all flow back to overlapping institutional owners. The mechanism is the integration, not any single component.

---

## CHAPTER 5 · CIVIC PARTICIPATION

### ANCHOR FAMILY · LATOYA · ZIP 30314 (Atlanta, English Avenue / Vine City)

**Season I source:** S1·05 The Provisional Ballot · with overlap to S1·10 The Runoff Tells

**Documented outcome (from S1·05):**
LaToya, 42, registered to vote in Fulton County in 2018. She voted in 2018 general, 2020 general (in person), and 2022 primary without incident. In November 2022 general election, she was issued a provisional ballot at her assigned polling location — her voter eligibility had been challenged by a third-party challenge filing under Georgia SB 202 procedures. Her provisional ballot was rejected after the post-election challenge review on the basis that the challenger had filed a "questionable address" challenge supported by composite-data-broker address inconsistency between her voter-roll address and a commercial-data address that had not been updated to reflect her 2021 address change. She was not notified of the challenge before election day and had no opportunity to cure before her ballot was rejected.

**Composite identity reconstruction:**
- Identity layer · LaToya (Black, 42, bachelor's degree, social worker for a Fulton County nonprofit) · single mother · 2 children · moved within Atlanta in 2021 (English Avenue → Vine City, both 30314)
- Voter layer · registered 2018 · voted 2018, 2020, 2022 primary · no party affiliation declared · documented active voter
- Address layer · 2021 move was a within-ZIP move · voter-roll address updated within statutory window · commercial-data-broker address (per LexisNexis Risk Solutions standard pipeline) was NOT updated for ~6 months due to a transmission lag between credit-reporting and commercial-broker syndication
- Digital layer · Facebook, Instagram, banking app, two voter-mobilization-app installs (one nonprofit, one campaign) · email addresses cross-referenced in multiple breaches over time
- Civic-target layer · per L2 Political and similar vendor classifications, LaToya is in a high-mobilization-priority cell for Democratic-aligned GOTV operations and a high-challenge-priority cell for opposing organizations' eligibility-challenge filings

**Season II mechanism most plausibly involved:**
EP 04 The Influence War (the composite-voter targeting that drove the challenge filing) + EP 06 The Composite State (the civic-record gateway that processed it) + EP 02 Personhood Inc. (the underlying assemblage)

**Inference chain:**

| Step | Claim | Confidence |
|---|---|---|
| 1 | Georgia SB 202 procedures allow third-party challenges based on documented address inconsistency (V-02 + statutory text). | **strong** (statutory documentation) |
| 2 | The challenger's "questionable address" filing was supported by commercial-data-broker address data (the standard pipeline used by True the Vote and similar organizations in 2022-2024 cycles). | **plausible** (V-05; documented organizational practice; specific filing instance inferred) |
| 3 | LaToya's commercial-broker address lag (6 months after voter-roll update) is consistent with LexisNexis Risk Solutions and Acxiom standard data-refresh cadences. | **strong** (industry practice well-documented) |
| 4 | The challenge filing rate in Fulton County in 2022 documented spatial clustering in majority-Black precincts (V-05; Brennan Center 2023 documented average household income below median for challenged voters). | **strong** (Brennan Center + AJC + Reuters reporting) |
| 5 | LaToya's profile (Black voter, 30314 ZIP, address mover, regular voter) places her in the cohort with measurably higher provisional-rejection rates for documented composite-driven address-challenge reasons (V-06). | **plausible** (population-level empirical; specific rejection inferred) |
| 6 | The same commercial-composite that drove her challenge filing was simultaneously feeding micro-targeted Get-Out-The-Vote messaging in her demographic cell — meaning the system was both attempting to mobilize and to block her at the same time (V-07). | **plausible** (architecture-compatibility; documented in EP 04 The Influence War built-voter exhibit) |

**Counter-explanation hosted:**
"The challenge was filed under valid SB 202 procedures. The address inconsistency was real (her commercial data did show a different address). The election-administration process worked as the statute provides. The challenge mechanism is content-neutral and applies the same to all voters." *The episode's response:* True that the procedure was lawful. True that the address inconsistency was real. The chapter's claim is that the *correlation* between commercial-broker lag patterns and protected-class demographics is the engineered-class condition. The system did not need to discriminate at the rule level to produce a disparate outcome at the population level. That is the FAccT-community definition of disparate impact — and it is the condition that EEOC and DOJ enforcement have repeatedly named.

---

## CROSS-FAMILY OBSERVATION · the multiplicative compounding

Each of these five households can be traced through at least one other chapter besides their anchor:

| Family | Anchor | Also touched by |
|---|---|---|
| Maria & Devon | Housing | Healthcare (the medical-debt collection that dropped the credit score), Credit (the FICO drop and rent-burden ratio) |
| James | Employment | Credit (the income loss from missed promotions feeds back into credit utilization) |
| Dorothy | Healthcare | Credit (Medicare Part D plan algorithmic selection · prior-authorization denial economic impact), Civic (her voting access compromised by the distance to her open polling location after closure) |
| Robert | Credit + Settlement | Healthcare (his own legitimate opioid prescription 2014-2018 is part of his composite), Employment (his FICO band correlates with documented algorithmic-hiring penalty range) |
| LaToya | Civic | Housing (her 2021 within-ZIP move is the documented trigger for the broker lag that produced the challenge), Employment (her social-worker employer participates in algorithmic-hiring infrastructure her own composite would feed) |

This is the multiplicative-not-additive proof. Each family is at least double-anchored. The compounding integration is the engine.

---

## DISCIPLINE NOTES

**What we are NOT claiming:**
- That any single named institution acted with discriminatory intent in any of these chains
- That the algorithmic layer is the *only* explanation for any outcome
- That removing the algorithmic layer would eliminate the underlying disparity
- That these five families are representative of all outcomes (they are anchors, not samples)

**What we ARE claiming:**
- That the architecture documented in EP 02-07 is sufficient to produce the outcomes documented in Season I
- That each anchor family's inference chain is defensible at the labeled confidence level per row
- That the multiplicative compounding across chapters matches the published cumulative-disadvantage literature
- That the five households together constitute proof-by-receipt of the bowtie thesis

**Naming and ethics:**
- First names only (no last names) for both safety and editorial restraint
- ZIP codes accurate to the S1 reporting
- All five households were previously named in published Season I reporting; no new exposure beyond what is already public
- Before publication, each anchor family should be re-contacted via the same reporter who originally interviewed them, with the opportunity to opt out of the EP 08 anchoring

---

## NEXT STEPS

- **Step D** · Spec the Class Atlas interactive (household icon at center, five orbits, click states, arrow-trace animation, "five mechanisms" reveal sequence)
- **Step E** · Counter-read defender outreach (FAccT researcher · vendor spokesperson · sociological skeptic)
- **Step F** · Mockup v0.1

---

*Anchor families drafted 3 June 2026 · INVESTIGATE Step C · five named households across five chapters · each with composite reconstruction + inference chain + counter-explanation · ready for Step D interactive spec*
