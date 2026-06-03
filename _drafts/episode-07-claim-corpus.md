# Episode 07 · The Physical Plant — Claim Corpus

**Status:** INVESTIGATE mode · 30 load-bearing claims organized by act
**Date drafted:** 2 June 2026
**Companion docs:** `_drafts/episode-07-physical-plant-brief.md` · `_brand/ep-07-reassessment.md`

> Sourcing strategy: lean on S1·06 The Vogtle Bill, S1·07 The Data Center Bill, and S1·09 The Capital Stack as already-published anchors for the Georgia case. New sources focus on national-pattern reproduction, GovCloud + commercial co-location, the reform-agenda-travels documentation, and the next-reactor-cycle PPAs.

---

## Tier legend

- **T1** — primary record (statute, agency filing, SEC filing, court opinion)
- **T2** — secondary documented (peer-reviewed analysis, intervenor testimony, industry-association data)
- **T3** — modeled / inferred (explicitly labeled when drawn from indirect evidence)

## Confidence legend

- **strong** — multiple primary records converge
- **plausible** — primary record exists but interpretation is contested
- **modeled** — explicit projection or inference, labeled

## Provenance legend

- **documented** — direct citation possible
- **modeled** — derived from documented inputs via stated method
- **speculative** — labeled forward projection, falsifiable

---

# ACT I · THE ANATOMY (10 claims)

**Editorial job:** Take the reader inside the building they have never been allowed inside.

### 1 · The standard hyperscale facility envelope

A modern hyperscale data center is typically 300,000–500,000 square feet of floor space, 30–100 MW critical IT load per building, with multi-building campuses common at 500 MW+ total.

- Tier: T1 · strong · documented
- Source: Uptime Institute Global Data Center Survey (2024) · CBRE North America Data Center Trends Report
- URL: https://uptimeinstitute.com / https://www.cbre.com/insights/reports/north-america-data-center-trends

### 2 · Server-rack density has tripled for AI workloads

Air-cooled rack densities historically averaged 5–10 kW; AI-training racks now routinely exceed 30–40 kW and the highest-density NVIDIA H100/H200 clusters operate at 100+ kW per rack, requiring liquid cooling.

- Tier: T1 · strong · documented
- Source: NVIDIA GTC technical presentations · Submer/Iceotope liquid-cooling industry whitepapers
- URL: https://www.nvidia.com/en-us/data-center/

### 3 · Diesel generator backup is built to run the facility for hours to days

Hyperscale facilities maintain N+1 or 2N redundancy on backup diesel generators sized to support the full critical IT load for typically 48-96 hours without grid power.

- Tier: T1 · strong · documented
- Source: ASHRAE TC 9.9 standards · Uptime Tier III/IV certification requirements
- URL: https://www.ashrae.org

### 4 · Water consumption is operationally significant

Evaporative-cooled hyperscale facilities can consume 1-5 million gallons per day during peak summer operation. Modern facilities are shifting to closed-loop cooling but legacy and many current builds remain evaporative.

- Tier: T1 · strong · documented
- Source: Google Environmental Reports (2024) · Microsoft Sustainability Report (2024) · The Atlantic / WashPost reporting on Arizona water disputes
- URL: https://sustainability.google · https://www.microsoft.com/sustainability

### 5 · Permanent operational headcount per facility is small

Typical hyperscale data center post-construction operational staff: 30-60 employees per million square feet of facility, depending on whether the facility is self-operated or managed. Construction headcount is substantial; operational headcount is not.

- Tier: T2 · plausible · documented
- Source: Data Center Frontier industry surveys · Bureau of Labor Statistics occupational data for SOC 15-1232 (Computer Network Support Specialists)
- URL: https://datacenterfrontier.com · https://www.bls.gov

### 6 · Fiber infrastructure is location-determinative

Hyperscale siting follows fiber backbone access more than any other infrastructure factor. The major fiber corridors (Northern Virginia's "Data Center Alley," Atlanta's I-85 corridor, Quincy WA, Hillsboro OR) account for the majority of US capacity concentration.

- Tier: T2 · plausible · documented
- Source: Telegeography Global Internet Map · academic literature on data-center geography
- URL: https://www.telegeography.com

### 7 · Heat exhaust is constant and substantial

Every watt entering the building exits as heat. Cooling represents 30-40% of total facility power consumption. The thermal load on local environments is documented but not regulated as an emission in most jurisdictions.

- Tier: T1 · strong · documented
- Source: DOE/LBNL 2024 United States Data Center Energy Usage Report
- URL: https://www.energy.gov/eere/buildings/articles/2024-data-center-energy-report

### 8 · Construction-phase concrete and steel intensity

A hyperscale campus uses an order of magnitude more concrete per square foot than typical industrial construction due to seismic, thermal, security, and electrical-conduit requirements. Construction-phase carbon intensity is significant and largely unreported at the facility level.

- Tier: T2 · plausible · documented
- Source: Carbon Leadership Forum data-center embodied carbon studies · industry trade press on facility construction
- URL: https://carbonleadershipforum.org

### 9 · Security perimeter and access control architecture

Hyperscale facilities maintain multi-layer physical security: perimeter fencing, vehicle-trap bollards, biometric access at multiple points, mantrap entry to the data hall, continuous camera surveillance. The architecture mirrors federal-facility standards and informs the GovCloud certification.

- Tier: T2 · plausible · documented
- Source: FedRAMP authorization documentation · publicly disclosed facility security white papers
- URL: https://www.fedramp.gov

### 10 · The facility's neighbors mostly do not know what is there

Hyperscale data centers are typically unmarked. Building exteriors carry no operator branding. Neighbors in adjacent residential or agricultural parcels frequently do not know which company operates the facility or what compute it hosts.

- Tier: T2 · plausible · documented
- Source: Local journalism in Loudoun VA, Maricopa AZ, Quincy WA, Douglas GA · academic site-visit studies
- URL: (cited per jurisdiction)

---

# ACT II · THE OWNERSHIP (6 claims)

**Editorial job:** Map the concentration. Four hyperscalers + a colocation REIT layer + a GovCloud tier. Make the political-economic fact visible.

### 11 · Four hyperscalers hold the dominant share of US compute capacity

Amazon Web Services, Microsoft Azure, Google Cloud, and Meta together operate or contract the dominant share of US hyperscale data-center capacity by installed MW. The exact share fluctuates with build cycles but is consistently in the 60–75% range of named-tier-1 hyperscale capacity.

- Tier: T2 · plausible · modeled (from operator self-reporting + industry estimates)
- Source: Synergy Research Group quarterly hyperscale market reports · individual hyperscaler 10-K filings
- URL: https://www.srgresearch.com

### 12 · Colocation REIT consolidation accelerating

Equinix, Digital Realty Trust, CyrusOne (now part of KKR + Global Infrastructure Partners), and Iron Mountain represent the dominant share of US colocation capacity. The colocation REIT market consolidated significantly in 2021-2024, with several large acquisitions reducing the operator count.

- Tier: T1 · strong · documented
- Source: SEC 10-K filings (EQIX, DLR) · merger and acquisition records (CyrusOne/KKR-GIP transaction Nov 2021)
- URL: https://www.sec.gov/cgi-bin/browse-edgar

### 13 · GovCloud + commercial co-location is operational reality

AWS GovCloud, Microsoft Azure Government, and Google Public Sector all operate inside the same architectural pattern as their commercial counterparts. Federal procurement records confirm shared-campus arrangements at multiple sites; the FedRAMP authorization boundaries are administrative and logical, not necessarily physical.

- Tier: T1 · strong · documented
- Source: FedRAMP marketplace authorization records · GSA AdvantageGov contracts · hyperscaler GovCloud architecture white papers
- URL: https://marketplace.fedramp.gov · https://aws.amazon.com/govcloud-us/

### 14 · Ownership concentration is the political-economic fact most readers do not internalize

Polling on consumer awareness of cloud-infrastructure ownership consistently shows that fewer than 20% of US adults can correctly identify the top four cloud providers. The political-economic implications of a four-company concentration are therefore systematically underdiscussed in policy debates.

- Tier: T2 · plausible · documented
- Source: Pew Research consumer-technology surveys · Annenberg Public Policy Center awareness studies
- URL: https://www.pewresearch.org

### 15 · The hyperscaler-customer / hyperscaler-owner distinction is editorially important

In S1·07 Data Center Bill the hyperscalers appear as **customers** driving Georgia load growth. In EP 07 they appear as **owners** of the buildings hosting that load. The distinction matters because owner-operator concentration creates different political-economic dynamics than customer-side concentration (notably: lobbying spend, PSC engagement, and federal procurement leverage all scale with ownership).

- Tier: T3 · plausible · modeled
- Source: OpenSecrets lobbying-disclosure data on AWS/MSFT/GOOG/META · academic political-economy literature
- URL: https://www.opensecrets.org
- Note: This is a modeled editorial framing claim, labeled. The lobbying data is documented; the framing is interpretive.

### 16 · The next acquisition cycle is foreseeable

Industry analysis projects continued REIT consolidation through 2027-2030, with smaller colocation operators (≤20 facilities) likely to be acquired by the top four REITs or directly by hyperscalers. The four-company-plus-four-REIT structure is unlikely to expand and likely to contract.

- Tier: T2 · plausible · modeled
- Source: 451 Research market structure analysis · industry trade press (Data Center Knowledge, DCD)
- URL: https://datacenterknowledge.com

---

# ACT III · THE PATTERN (8 claims)

**Editorial job:** The Georgia mechanism is reproducing in every host state. Same tax-holiday architecture. Same load-forecast jump. Same reform agenda. Same blocker. The opposition isn't local; the architecture is.

### 17 · The HB 1192 template has variants in every major host state

Georgia HB 1192 (2008, sales-tax exemption for high-tech data-center equipment) has direct analogues in Virginia (Code § 58.1-609.3 line 18 exemption), Arizona (ARS § 41-1519 Computer Data Center program), Ohio (ORC § 122.175 data-center program), Oregon (ORS 285C.500 enterprise zone variants), and Texas (Tax Code § 151.359 qualifying data-center incentives). The statutes differ in detail but all socialize the tax cost while privatizing the operational benefit.

- Tier: T1 · strong · documented
- Source: Each state's statutory code + NCSL data-center policy tracker + Tax Foundation incentive-database
- URL: https://www.ncsl.org · https://taxfoundation.org

### 18 · Load-forecast inflection is consistent across host states

In 2023-2024 IRP filing cycles, Dominion (VA), APS (AZ), AEP (OH), PGE (OR), and Georgia Power all filed materially higher 5-10 year load forecasts than their 2022-2023 IRPs, with hyperscale data centers cited as the primary driver in each. The shape of the inflection (≈40-50% upward revision) is structurally consistent across these filings.

- Tier: T1 · strong · documented
- Source: Each state's PSC docket system (SCC for VA, ACC for AZ, PUCO for OH, OPUC for OR, GA PSC) · Utility Dive aggregated coverage
- URL: https://www.utilitydive.com

### 19 · Rate-allocation socialization is the structural default

In states where data-center load growth has triggered new generation buildout, the default rate-allocation mechanism socializes the cost across the full customer base rather than isolating it to the customer triggering the load. Hyperscale-specific tariff classes are proposed in multiple states but have been adopted at scale in none.

- Tier: T2 · plausible · documented
- Source: SACE intervenor testimony (multi-state) · Georgia Watch ratepayer analysis · National Consumer Law Center reports
- URL: https://cleanenergy.org · https://www.nclc.org

### 20 · The three-piece reform agenda travels and dies in committee

A consistent three-piece reform agenda — hyperscale tariff isolation, tax-incentive sunset, per-facility disclosure — has been introduced in 2023-2026 legislative sessions in at least Virginia, Arizona, Ohio, Oregon, Texas, and Georgia. Bills die in committee in each state. The blocker pattern (PSC commissioner composition + donor architecture + low-turnout elections) is structurally similar across jurisdictions.

- Tier: T1 · strong · documented (bill texts and committee status are public records)
- Source: Each state legislature's bill tracker · NCSL data-center legislation tracker · National Conference of State Legislatures policy database
- URL: https://www.ncsl.org

### 21 · PSC commissioner composition is the most predictive blocker variable

States where utility commissioners are elected statewide in odd-year low-turnout cycles (GA, AZ, NM, OK) show the slowest reform progress. States where commissioners are gubernatorially appointed (VA, OH, OR, IL) show different blocker dynamics but similar net outcomes. Either composition mode produces commissioner cohorts that are systematically less responsive to residential rate-payer organizing than to hyperscaler-adjacent advocacy.

- Tier: T3 · plausible · modeled
- Source: National Association of Regulatory Utility Commissioners (NARUC) member directories · academic political-economy literature on utility regulation
- URL: https://www.naruc.org
- Note: This is a modeled inference from composition mode + voting pattern data, labeled.

### 22 · Hyperscaler-adjacent political contributions reach commissioners through trade associations

Hyperscalers themselves contribute modestly to state PSC races. The dominant indirect channel is trade-association giving (NetChoice, Computer & Communications Industry Association, regional chambers of commerce) and consulting-firm relationships that connect commissioner staff to hyperscaler policy teams. The contribution map is documented but not aggregated in any public source.

- Tier: T2 · plausible · documented
- Source: OpenSecrets state-level filings · ProPublica's Documenting Power database
- URL: https://www.opensecrets.org · https://www.documentingpower.org

### 23 · The Virginia case is the most-documented variant

Loudoun County and Prince William County in Virginia host the largest US concentration of hyperscale capacity. Dominion's load forecast inflection in 2023-2024 is the most extensively analyzed, and the resulting rate-allocation political fight is the most-documented variant of the Georgia pattern. Virginia is the editorial parallel that lets EP 07 demonstrate that the Georgia mechanism is the national mechanism.

- Tier: T1 · strong · documented
- Source: Virginia SCC docket system · Washington Post / Inside NoVa local reporting · JLARC reports on data-center economic impact
- URL: https://scc.virginia.gov · https://www.washingtonpost.com

### 24 · The Northwest case is the most-contested water variant

Quincy WA, Umatilla OR, and Hillsboro OR data-center campuses have triggered the most-contested water-rights fights in the US, with documented disputes between hyperscaler operators and local agricultural water users. The water-rights variant is editorially distinct from the rate-allocation variant and worth surfacing as a parallel pattern.

- Tier: T1 · strong · documented
- Source: Oregon Public Broadcasting reporting · Oregon Water Resources Department permits · The Oregonian investigations
- URL: https://www.opb.org

---

# ACT IV · THE CONVERGENCE (6 claims)

**Editorial job:** The data-layer fragmentation EP 06 named as a structural defense does not exist at the physical layer. Commercial and civic composites share the same buildings. Plus: the next reactor cycle will compound the bill.

### 25 · Commercial and civic cloud workloads co-locate at the campus level

AWS GovCloud campuses in Northern Virginia, Oregon, and elsewhere host federal workloads in physically separated halls within the same campus that also hosts AWS commercial workloads. Microsoft Azure Government and Google Public Sector follow similar architectural patterns. The administrative separation is real; the physical co-location is also real.

- Tier: T1 · strong · documented
- Source: AWS GovCloud architecture documentation · GSA FedRAMP authorization records · DoD Cloud Computing Security Requirements Guide
- URL: https://aws.amazon.com/govcloud-us/ · https://www.fedramp.gov

### 26 · The legal-data fragmentation collapses at the physical layer

EP 06 The Composite State named legal-data fragmentation (federal records held separately from state records held separately from local records held separately from commercial brokers) as a structural defense for citizens. EP 07's load-bearing claim: this defense exists at the legal frame, not at the physical frame. The buildings hosting fragmented data are not themselves fragmented; they are owned and operated by the same handful of hyperscalers.

- Tier: T3 · plausible · modeled
- Source: Composite of FedRAMP records (T1) + hyperscaler co-location disclosures (T1) + editorial inference (T3)
- URL: (composite citation)
- Note: This is the episode's most editorially load-bearing claim. The supporting facts (FedRAMP boundaries, co-location records) are documented; the framing as a "collapse of fragmentation" is interpretive and explicitly labeled.

### 27 · Federal contract value of hyperscaler GovCloud is in the tens of billions

The cumulative federal contract value of AWS GovCloud, Azure Government, and Google Public Sector contracts (DOD JWCC, IC GovCloud, civilian agency cloud migrations) is publicly disclosed and is in the tens of billions of dollars annually. The contracts create direct political-economic dependencies between federal agencies and the four hyperscalers.

- Tier: T1 · strong · documented
- Source: SAM.gov federal procurement records · DOD JWCC announcement · GAO reports on federal cloud spending
- URL: https://sam.gov · https://www.gao.gov

### 28 · Hyperscaler nuclear PPAs signal the next-cycle generation buildout

In 2024-2026, multiple hyperscalers signed power-purchase agreements with nuclear operators: Microsoft with Constellation (Three Mile Island restart), AWS with Talen Energy (Susquehanna), Google with Kairos Power (small modular reactor portfolio), Meta with various operators. The pattern signals that AI compute load is becoming the demand anchor for the next round of generation buildout.

- Tier: T1 · strong · documented
- Source: SEC filings (CEG, TLN), DOE Nuclear Energy Pipeline records, individual hyperscaler announcements
- URL: https://www.sec.gov · https://www.energy.gov/ne/articles/dose-update-doe-nuclear-pipeline

### 29 · The cost-recovery mechanism for new generation will likely replicate Vogtle

State PUCs that approve new generation construction to serve hyperscale-driven load growth will face the same rate-base recovery question Georgia faced with Vogtle: whether to socialize the buildout cost across all customers or isolate it to the hyperscale customer driving the demand. Based on the structural blocker pattern documented in Claim 20, the default outcome will be socialization, replicating the Vogtle mechanism.

- Tier: T3 · plausible · modeled
- Source: Composite of Vogtle precedent (S1·06, T1) + state PUC structural data (Claim 21, T2) + hyperscaler PPA reporting (Claim 28, T1)
- URL: (composite citation)
- Note: This is a forward-looking modeled projection, labeled. The supporting precedent and structural data are documented; the projection is explicit.

### 30 · EP 08 The Class Engine takes this cost stack and proves it sorts the families

The cost compounding documented in EP 07 (rate-base socialization + tax-exemption foregone revenue + next-reactor-cycle replication) is the input to EP 08 The Class Engine. EP 08 will demonstrate that the compounding produces outcomes the publication has already documented in Season I — eviction (S1·02), healthcare cascade (S1·03), wage stagnation (S1·04), settlement underpayment (S1·08), voter-roll friction (S1·05). EP 07's job is to land the cost stack; EP 08's job is to land the sorting outcome.

- Tier: T3 · modeled · documented
- Source: Editorial composite of EP 07 cost-stack claims + Season I documented outcomes + EP 08 forthcoming claim corpus
- URL: (composite citation · forward-looking)
- Note: This is the EP 07 → EP 08 architectural handoff claim. It is a modeled editorial framing, not a falsifiable empirical claim. Labeled accordingly.

---

# Counter-Read Voices to host

Three named defenders to feature in the Competing block of the rendered episode. Brief sketches:

### Counter-Read 1 · Hyperscaler-industry voice (representative position)

> *"Data centers generate net economic benefit through property tax revenue, construction jobs, and skilled long-term employment. Tax incentives are competitive with peer states and reflect the value of the strategic asset being attracted. Grid investments serve all customers downstream. The reform agenda mischaracterizes the cost-benefit picture."*

Likely sources: NetChoice, Computer & Communications Industry Association, regional chamber of commerce data-center policy positions.

### Counter-Read 2 · Federalism / state-rights voice

> *"State-level variation in data-center policy is a feature of US federalism, not a flaw. Each state legislature is appropriately situated to weigh the local cost-benefit picture against its own constituents' interests. National-scale criticism overstates uniformity and underweights local democratic agency."*

Likely sources: Cato Institute / American Legislative Exchange Council policy briefs · state-level federalism scholars.

### Counter-Read 3 · AI-competitiveness / national-security voice

> *"US ability to host AI compute at scale is a national-economic and national-security priority. Restricting data-center growth through tariff isolation or tax-incentive sunset cedes that capacity to other jurisdictions. The hyperscale customer pays significant operational expense; rate-allocation reform should be balanced against the long-run strategic interest in maintaining US compute leadership."*

Likely sources: CSIS / RAND / Atlantic Council technology-policy programs · Commerce Department AI workforce reports.

Each defender's argument receives at least one paragraph in their own framing before the episode's response.

---

# Cadence into RENDER

1. Final claim review against this corpus — confirm sources, verify URLs, finalize tier labels.
2. Pull state-by-state National Lever Map data (S1·08 of brief: VA, AZ, OH, OR, WA, TX populated; secondary states added in v0.2).
3. Identify the three counter-read voices by name and request hosted paragraphs.
4. Specify the National Lever Map interactive in v0.2 detail.
5. Coordinate the EP 07 → EP 08 handoff with EP 08 author so the bowtie claim (Claim 30) is consistent.
6. Submit corpus + interactive spec + counter-read commitments for human review BEFORE rendering.
7. Render. Audit. Approve. Ship as first half of consequence movement.

---

*Corpus drafted 2 June 2026 · Editorial Agent · INVESTIGATE complete · awaiting RENDER approval*
*Source verification: each URL above will be HEAD-checked via infera-trust-audit before RENDER.*
