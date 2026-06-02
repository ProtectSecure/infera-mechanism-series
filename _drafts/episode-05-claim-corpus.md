# Episode 05 · The Composite State — Claim Corpus

**Season II · Episode 05 · INVESTIGATE phase deliverable 1 of 3**
**Status:** v0.1 draft · awaiting human review before INVESTIGATE phase advances
**Pairs with:** `episode-05-composite-state-brief.md` (DISCOVER brief, approved)
**Target corpus size:** 30 load-bearing claims · this draft: 32
**Date drafted:** 1 Jun 2026

---

## How to read each claim

Every claim carries six fields:

- **Claim** — written precisely, in the exact wording the episode is willing to publish
- **Layer** — Local / State / Federal / Authority Gate / Commercial-to-State / Composite Mechanics / Disparate Exposure
- **Tier** — T1 primary official source · T2 reputable reporting · T3 civil-liberties or scholarly interpretation · T4 contextual commentary
- **Confidence** — Strong / Plausible / Correlated / Competing
- **Provenance** — Documented / Modeled / Speculative
- **Source(s)** — name + URL · multiple where the claim needs triangulation

Where a claim still needs primary-source verification before render, it is marked **VERIFY** with the specific check needed. Eight claims carry that mark; all eight are foundational, none are decorative.

---

## LAYER · LOCAL RECORDS

### Claim L1
**Property deeds and tax-assessor records are public records in every U.S. jurisdiction, searchable by owner name, parcel, or address through county registrars.**
- Tier T1 · Strong · Documented
- Source: NAR overview of state public-records statutes — https://www.nar.realtor/property-records · individual county recorder offices vary
- *Note:* The deepest single fragment-set most readers don't realize is public. Every transaction creates a permanent searchable record tied to legal identity.

### Claim L2
**Court filings in state civil and criminal courts are presumptively public, with case dockets, parties, filings, and outcomes accessible through state court systems (and often free indexes like CourtListener).**
- Tier T1 · Strong · Documented
- Source: Federal Judicial Center · CourtListener (Free Law Project) — https://www.courtlistener.com/ · state-by-state PACER equivalents
- *Note:* Sealed filings are the exception, not the rule. The default is public, even for cases never adjudicated.

### Claim L3
**Police-incident reports, arrest records, and 911 call logs are governed by state public-records laws that vary materially by jurisdiction; in most states the existence of a call is public even when the audio is not.**
- Tier T1 · Plausible · Documented
- Source: Reporters Committee for Freedom of the Press · Open Government Guide — https://www.rcfp.org/open-government-guide/
- *VERIFY:* Cite the three or four most-restrictive states (Pennsylvania, Massachusetts, Virginia) and three most-permissive (Florida, Washington, Texas) with specific statute references.

### Claim L4
**Body-worn camera footage from municipal police is governed by a patchwork of state laws; release windows range from immediate (some California cases under SB 1421) to never (categorical exemption in some jurisdictions absent court order).**
- Tier T2 · Plausible · Documented
- Source: Brennan Center · 50-state body-camera policy survey — https://www.brennancenter.org/our-work/research-reports/police-body-worn-cameras

### Claim L5
**Automated license-plate reader (ALPR) data captured by local police is increasingly held in vendor-operated cloud systems (Flock Safety, Vigilant Solutions, Motorola Solutions) accessible to participating agencies across jurisdictional lines.**
- Tier T1 · Strong · Documented
- Source: Flock Safety transparency portal — https://www.flocksafety.com/transparency · EFF Atlas of Surveillance — https://atlasofsurveillance.org/
- *Note:* Cross-references EP 4½ Replayable City Flock claim. The local capture creates a record that becomes nationally searchable through the vendor.

---

## LAYER · STATE RECORDS

### Claim S1
**DMV records — driver's license, vehicle registration, traffic citations — are governed by the federal Driver's Privacy Protection Act (DPPA, 18 U.S.C. § 2721), which limits release to fourteen enumerated permissible uses including law enforcement, court process, insurance, and licensed private investigation.**
- Tier T1 · Strong · Documented
- Source: 18 U.S.C. § 2721 — https://www.law.cornell.edu/uscode/text/18/2721
- *Note:* The DPPA looks restrictive on the surface; the fourteen permissible uses cover most of the access requests actually made.

### Claim S2
**State professional license records — medical, legal, real estate, contracting, cosmetology, etc. — are public in every state, searchable by name, with disciplinary actions and license status disclosed.**
- Tier T1 · Strong · Documented
- Source: National Practitioner Data Bank — https://www.npdb.hrsa.gov/ · state licensing-board portals
- *Note:* For higher-income readers in licensed professions, this is often the deepest publicly visible administrative record they generate.

### Claim S3
**Vital records (birth, marriage, divorce, death) are state-controlled with varying public-access rules: most marriage and death records become public after a waiting period (typically 50–100 years for births, immediately for deaths and marriages in many states).**
- Tier T1 · Strong · Documented
- Source: CDC National Center for Health Statistics — https://www.cdc.gov/nchs/w2w/index.htm
- *VERIFY:* Cite specific state windows (CA, NY, TX, GA) with statute citations before publication.

### Claim S4
**State unemployment insurance records contain employment history, earnings, employer relationships, and benefit-claim history; UI databases are interfaced with federal IRS, Social Security, and DHS systems through the National Directory of New Hires.**
- Tier T1 · Strong · Documented
- Source: 42 U.S.C. § 653 (National Directory of New Hires) — https://www.acf.hhs.gov/css/ndnh
- *Note:* The NDNH is one of the most consequential cross-agency joins in the federal system. Most readers have no idea it exists.

### Claim S5
**State criminal-history databases feed FBI's NCIC (National Crime Information Center) and III (Interstate Identification Index), making a felony arrest in one state queryable by any law-enforcement agency in any other state within minutes.**
- Tier T1 · Strong · Documented
- Source: FBI CJIS Division · NCIC — https://www.fbi.gov/services/cjis/ncic
- *Note:* This is the canonical example of "no master file, but the fragments can be assembled on demand."

---

## LAYER · FEDERAL RECORDS

### Claim F1
**The IRS holds the most comprehensive single-agency record of U.S. resident financial activity, including W-2s, 1099s, bank-interest reports, brokerage trades, real-estate sales, and dependent claims — all linked to Social Security number.**
- Tier T1 · Strong · Documented
- Source: IRS Publication 17 — https://www.irs.gov/forms-pubs/about-publication-17 · IRS Data Book (annual) — https://www.irs.gov/statistics/irs-data-book

### Claim F2
**IRS tax-return information is protected by 26 U.S.C. § 6103 ("Confidentiality and Disclosure of Returns and Return Information"), one of the strictest federal record-confidentiality statutes; thirteen enumerated exceptions permit disclosure to specific agencies under specific conditions.**
- Tier T1 · Strong · Documented
- Source: 26 U.S.C. § 6103 — https://www.law.cornell.edu/uscode/text/26/6103
- *Note:* The exceptions are the loosely-bounded part of the architecture. Section 6103(i) alone (disclosure to federal law enforcement) is a substantial carve-out.

### Claim F3
**The Social Security Administration's earnings record covers the entire reported work history of every U.S. worker since 1937, indexed by SSN, and is interfaced with IRS, DHS (E-Verify), HHS (Medicare), VA, and state UI systems.**
- Tier T1 · Strong · Documented
- Source: SSA Office of the Inspector General audit reports — https://oig.ssa.gov/audit/

### Claim F4
**Passport and entry/exit border-crossing records held by CBP through the TECS (formerly Treasury Enforcement Communications System) and ATS (Automated Targeting System) include every documented international entry by a U.S. person and most exits, retained for 75 years (TECS) and 15 years (ATS) respectively.**
- Tier T2 · Strong · Documented
- Source: DHS Privacy Impact Assessments (TECS, ATS) — https://www.dhs.gov/publication/dhscbppia-009-tecs-system-platform · https://www.dhs.gov/publication/automated-targeting-system-ats
- *VERIFY:* Confirm current retention windows; ATS retention has been litigated and adjusted at least twice since 2012.

### Claim F5
**The Federal Bureau of Investigation's NICS (National Instant Criminal Background Check System) retains denied-purchase records permanently and approved-purchase records for 24 hours (statutorily required to be destroyed under the Brady Act, as amended).**
- Tier T1 · Strong · Documented
- Source: FBI NICS Operations Reports — https://www.fbi.gov/how-we-can-help-you/more-fbi-services-and-information/nics
- *Note:* This is one of the few federal databases with a statutorily mandated short retention window. It's the exception.

### Claim F6
**Department of Homeland Security databases — IDENT (Automated Biometric Identification System), HART (its successor), CBP entry/exit, ICE Investigative Case Management — collectively hold biometric and case data on hundreds of millions of individuals, including non-citizens, naturalized citizens, and U.S. citizens crossing the border or applying for federal benefits.**
- Tier T1 · Strong · Documented
- Source: DHS Office of Biometric Identity Management — https://www.dhs.gov/obim · OBIM HART Privacy Impact Assessment
- *VERIFY:* The HART rollout has been delayed multiple times; confirm current operational status and scope before publication.

### Claim F7
**Federal employment records (OPM eOPF — electronic Official Personnel File), security-clearance records (e-QIP / SF-86 / SCattered Castles), and military service records (NPRC) are held by separate agencies with limited interoperability but high read-access by partner agencies on lawful request.**
- Tier T1 · Strong · Documented
- Source: 5 C.F.R. § 293 (federal personnel records) · DoD Manual 5200.02 (security-clearance program)

---

## LAYER · AUTHORITY GATES (LEGAL LIMITS)

### Claim A1
**The Privacy Act of 1974 (5 U.S.C. § 552a) requires federal agencies to publish "system of records notices" (SORNs) in the Federal Register before maintaining any "system of records" on identifiable individuals; the SORN is the public-facing description of what the agency holds and shares.**
- Tier T1 · Strong · Documented
- Source: 5 U.S.C. § 552a — https://www.law.cornell.edu/uscode/text/5/552a · Federal Register SORN search — https://www.federalregister.gov/

### Claim A2
**The Privacy Act's "routine use" exception (5 U.S.C. § 552a(b)(3)) lets an agency disclose records for any use "compatible with the purpose for which it was collected" as defined in the agency's published SORN — a clause that has been read broadly enough to authorize many interagency joins.**
- Tier T2 · Plausible · Documented
- Source: GAO Report GAO-08-536 · Privacy Act of 1974 implementation — https://www.gao.gov/products/gao-08-536
- *Note:* Counter-read material. The "routine use" exception is the load-bearing critique of Privacy Act effectiveness in the scholarly literature.

### Claim A3
**The Stored Communications Act (18 U.S.C. § 2703) permits government access to electronic communications and subscriber records under a tiered standard: subpoena for basic subscriber info, court order under § 2703(d) for transactional records, warrant for content less than 180 days old; the post-Carpenter (2018) doctrine requires a warrant for cell-site location information regardless of age.**
- Tier T1 · Strong · Documented
- Source: 18 U.S.C. § 2703 — https://www.law.cornell.edu/uscode/text/18/2703 · *Carpenter v. United States*, 138 S. Ct. 2206 (2018) — https://www.supremecourt.gov/opinions/17pdf/16-402_h315.pdf

### Claim A4
**IRS § 7609 third-party summons authority lets the IRS compel records from third parties (banks, employers, brokerages, credit card processors) about a named taxpayer, with limited notice rights for the taxpayer; the John Doe summons procedure (§ 7609(f)) permits collective summonses against unnamed classes of taxpayers, used most prominently against Coinbase and other crypto exchanges.**
- Tier T1 · Strong · Documented
- Source: 26 U.S.C. § 7609 — https://www.law.cornell.edu/uscode/text/26/7609 · IRS John Doe Summons program documentation

### Claim A5
**The Fourth Amendment third-party doctrine — that information voluntarily given to a third party retains no reasonable expectation of privacy — was substantially narrowed by *Carpenter v. United States* (2018) for cell-site location information but otherwise remains the dominant doctrine for most administrative records.**
- Tier T1 · Plausible · Documented
- Source: *Carpenter v. United States*, 138 S. Ct. 2206 (2018) · *Smith v. Maryland*, 442 U.S. 735 (1979) · *United States v. Miller*, 425 U.S. 435 (1976)
- *Note:* Scholarly counter-read territory. Several legal scholars argue *Carpenter* implicitly overrules large parts of *Smith* and *Miller*; courts have largely not yet followed.

---

## LAYER · COMMERCIAL-TO-STATE ACQUISITION (THE MODERN TWIST)

### Claim C1
**The U.S. government has, since at least 2018, purchased commercial smartphone-location data from private data brokers (notably Venntel, Babel Street, and X-Mode) without obtaining a warrant, on the legal theory that commercial purchase does not constitute a Fourth Amendment "search."**
- Tier T1 · Strong · Documented
- Source: ODNI declassified report on commercially available information — https://www.dni.gov/files/ODNI/documents/assessments/ODNI-Declassified-Report-on-CAI-January2022.pdf · ACLU FOIA litigation against DHS, CBP, ICE
- *Note:* The ODNI report itself is the strongest T1 anchor. It's a formal admission by the intelligence community that the practice is widespread.

### Claim C2
**Fog Reveal, a product of Fog Data Science, packaged location-broker data into a tool sold to local and state law enforcement starting in approximately 2018, allowing officers to query device movements over time without judicial process.**
- Tier T2 · Strong · Documented
- Source: AP investigation (Sep 2022) — https://apnews.com/article/technology-government-and-politics-business-mobile-apps-d395409ef5a8c6c3f8cdf183019e2300 · EFF analysis — https://www.eff.org/deeplinks/2022/09/inside-fog-data-science-secretive-company-selling-mass-surveillance-local-police
- *Note:* This is the canonical case study. Vermont AG filed suit; multiple state AGs followed.

### Claim C3
**Flock Safety's networked LPR system, with default 30-day retention stored in AWS GovCloud, enables interagency searches across participating agencies' captures regardless of which agency owns the camera that recorded a given plate.**
- Tier T1 · Strong · Documented
- Source: Flock Safety published transparency policy — https://www.flocksafety.com/transparency
- *Note:* Cross-references EP 4½ Replayable City. Same architecture, different framing: in EP 4½ it's surveillance density; in EP 05 it's an example of cross-jurisdictional record assembly.

### Claim C4
**Clearview AI's facial-recognition database, built from approximately 30 billion scraped social-media images, has been sold to thousands of U.S. law enforcement agencies; the BIPA settlement (Illinois, 2022) restricts its sale to most private parties but explicitly preserves law-enforcement access.**
- Tier T1 · Strong · Documented
- Source: ACLU v. Clearview AI settlement (Cook County Cir. Ct., May 2022) — https://www.aclu.org/cases/aclu-v-clearview-ai · BuzzFeed News investigation (2021) — https://www.buzzfeednews.com/article/ryanmac/clearview-ai-fbi-ice-global-law-enforcement
- *Note:* The settlement structure is the story. Commercial use restricted, law-enforcement use preserved.

### Claim C5
**Vermont is one of four U.S. states (with California, Texas, and Oregon) that maintain a data-broker registry; as of 2024 it lists approximately 100+ entities operating in or selling data into the state, providing a public floor for who exists in the broker market.**
- Tier T1 · Strong · Documented
- Source: Vermont Data Broker Registry — https://sos.vermont.gov/securities/data-broker/
- *VERIFY:* Confirm current registry count and equivalent CA / TX / OR registry counts before publication.

### Claim C6
**The Federal Trade Commission has brought enforcement actions against several data brokers (X-Mode, InMarket, Avast) for selling sensitive-category location data without adequate consent; the settlements typically require data destruction and audit but do not prohibit the underlying business model.**
- Tier T1 · Strong · Documented
- Source: FTC press releases — https://www.ftc.gov/news-events/news/press-releases · X-Mode order (Jan 2024), InMarket order (Jan 2024)

---

## LAYER · COMPOSITE ASSEMBLY MECHANICS

### Claim M1
**A federal civil investigation can lawfully assemble a multi-source composite on a single individual through grand-jury subpoenas, IRS § 7609 summonses, Stored Communications Act process, NCIC queries, and DHS cross-database matching, without that individual being notified at the time of assembly.**
- Tier T2 · Plausible · Documented
- Source: DOJ Justice Manual § 9-11.140 (grand-jury secrecy) · Federal Rules of Criminal Procedure 6(e) · multiple decline-to-prosecute disclosures via FOIA

### Claim M2
**Federal Rule of Civil Procedure 26 permits discovery of "any nonprivileged matter that is relevant to any party's claim or defense and proportional to the needs of the case," which has been interpreted to include third-party records, communications, location data, and substantially any administrative record bearing on the dispute.**
- Tier T1 · Strong · Documented
- Source: Fed. R. Civ. P. 26 — https://www.law.cornell.edu/rules/frcp/rule_26

### Claim M3
**State and federal agencies routinely cross-match records for fraud detection, eligibility verification, and enforcement via formal computer-matching agreements published under the Privacy Act's Computer Matching and Privacy Protection Act of 1988 (5 U.S.C. § 552a(o)–(r)); the Federal Register lists hundreds of active matching agreements.**
- Tier T1 · Strong · Documented
- Source: 5 U.S.C. § 552a(o)–(r) · Federal Register CMPPA notices — https://www.federalregister.gov/

### Claim M4
**The IRS's Compliance Data Warehouse joins return data with third-party reporting (W-2, 1099, K-1), state tax-administrator exchange, and Bureau of Labor Statistics data into a single analytic environment used for examination selection; the warehouse is described in published IRS strategy documents.**
- Tier T2 · Plausible · Documented
- Source: IRS Inflation Reduction Act Strategic Operating Plan — https://www.irs.gov/about-irs/strategic-plan-and-results
- *VERIFY:* Confirm latest published documentation; the operating plan has been updated multiple times since 2023.

---

## LAYER · DISPARATE EXPOSURE

### Claim D1
**Means-tested federal and state benefits programs (SNAP, TANF, Medicaid, HUD Section 8, WIC, SSI) require detailed disclosure of household composition, income, assets, expenses, and employment as a condition of enrollment; recipients generate substantially more state-held administrative data than non-recipients at equivalent income levels.**
- Tier T2 · Plausible · Documented
- Source: GAO reports on SNAP eligibility verification · USDA SNAP Quality Control · HUD Family Reporting requirements

### Claim D2
**Court-involvement records (eviction filings, criminal charges, child-welfare contact, probation/parole) generate persistent administrative records that are searchable through commercial background-check services (TransUnion SmartMove, RealPage, Checkr, GoodHire) regardless of disposition.**
- Tier T1 · Strong · Documented
- Source: CFPB consumer reporting agency examinations — https://www.consumerfinance.gov/data-research/research-reports/ · Princeton Eviction Lab — https://evictionlab.org/
- *Note:* Cross-references EP 2 Personhood Inc. and EP 3 Trust Market on commercial scoring.

### Claim D3
**Immigration-related records (visa applications, naturalization, asylum, deportation proceedings, USCIS A-files, ICE detainers, CBP encounters) generate dense federal records subject to broad interagency sharing under the immigration-enforcement exceptions to most general-purpose privacy statutes.**
- Tier T1 · Strong · Documented
- Source: USCIS A-File policy — https://www.uscis.gov/records/request-records-through-the-freedom-of-information-act-or-privacy-act · ICE Investigative Case Management PIA

---

## COUNTER-READ · the strongest defenses, hosted fairly

The episode hosts three named defender positions. Each is rendered as the strongest version of itself, then responded to.

### Defender Voice 1 · "Fragmentation is the protection"
**Representative scholar:** Stewart Baker (former NSA general counsel, Steptoe & Johnson) is associated with this argument in his Lawfare and Volokh Conspiracy writings.
**The argument:** *The absence of a single federal master file is not an accident — it is the deliberate result of constitutional, statutory, and inter-jurisdictional design choices. The Privacy Act, FERPA, HIPAA, FCRA, GLBA, and dozens of sector-specific statutes prevent any one authority from holding the omniscient view. Aggregation is hard on purpose. The "composite on demand" framing overstates how often that demand actually arises and understates how thoroughly each assembly requires authorized process.*
**The response we plan to publish:** True at the level of any single record. The episode's claim is not that the composite is omnipresent — it is that the composite *is assemblable at the point an event makes it useful*, and that the legal authorities to perform the assembly are real, active, and unevenly distributed. Fragmentation is a feature of the storage layer; it is not a feature of the inquiry layer.

### Defender Voice 2 · "Administrative authority is a precondition of a functioning state"
**Representative scholar:** Adrian Vermeule (Harvard Law) and broader administrative-law scholarship.
**The argument:** *Tax collection, benefits adjudication, license issuance, public safety, court systems, and electoral administration cannot operate without records. The records exist because the functions exist. Refusing to maintain administrative records does not make government smaller — it makes government arbitrary. The "composite state" framing risks treating the existence of state capacity as a pathology.*
**The response we plan to publish:** Conceded. The episode does not argue against the existence of administrative records. It argues that the **scale, integration, and commercial-data acquisition layered on top** of those records exceeds the architecture of oversight that grew up around the records themselves. The defense holds for the existence of records; it does not extend to the unbounded commercial-data acquisition layer that has emerged in the last decade.

### Defender Voice 3 · "Transparency mechanisms work — they're just under-used"
**Representative scholar:** Margaret Kwoka (University of Denver, FOIA scholar) — her empirical work on FOIA use cuts both ways but is one of the strongest defenses of the system as designed.
**The argument:** *FOIA, the Privacy Act, agency Office of Inspector General reports, GAO investigations, sunset reviews, OMB privacy-impact assessments, congressional oversight, and journalism collectively constitute a real transparency apparatus. The fact that most members of the public never use it does not mean it doesn't work for the ones who do — journalists, advocacy organizations, and corporate counsel who file FOIA at industrial scale.*
**The response we plan to publish:** Partial. The empirical record (DOJ Office of Information Policy annual reports, RCFP litigation tracking) supports the claim that the system *can* produce releases. The same record also shows that median response times exceed statutory windows, that Exemption 7 denials dominate surveillance-footage requests (see EP 4½), and that fee structures favor institutional requesters over individuals. Transparency works for some readers; the architecture it monitors works on all readers.

---

## THE DISCIPLINE STATEMENT (what we did NOT prove)

The episode will publish, in its CLOSER section, an explicit list of what the corpus does *not* establish:

1. **No specific agency exceeded its lawful authority in any specific case** documented in this corpus.
2. **No proof of coordination** between the agencies, vendors, and statutory regimes that collectively produce the assemblage. The architecture is the accumulated product of independent procurement, statutes, contracts, and court rulings.
3. **No proof that intelligence-agency capabilities** in the National Capital Region (NSA, CIA, FBI counterintelligence) exceed publicly documented authorities. Presence is documented; capability specifics are not, by design.
4. **No proof that FOIA or the Privacy Act are systematically broken.** They are uneven in use and outcome. Several scholars, including the one cited as Defender Voice 3, argue persuasively that they work for sophisticated requesters.
5. **No proof that the disparate-exposure pattern (Layer D1–D3) is intentional.** The disparity arises from the structure of who interacts with which agencies for what reasons, not from agency intent.

What we did prove: **the fragments exist, the joins are legally available, the authorities to perform the joins are real and used, the commercial-data-acquisition layer is documented at the federal level, and the integrated architecture is not matched by integrated oversight.**

---

## OPEN RESEARCH GAPS (for human review before INVESTIGATE concludes)

Eight items above are marked **VERIFY**. They are:

1. **L3** — specific state public-records statute citations (3 restrictive + 3 permissive)
2. **S3** — vital-records access windows by major state (CA, NY, TX, GA) with statute references
3. **F4** — current TECS / ATS retention windows (litigation may have shifted these since last published)
4. **F6** — current operational status of HART biometric system
5. **C5** — current count on Vermont / CA / TX / OR data-broker registries
6. **M4** — confirm latest IRS Compliance Data Warehouse documentation (operating plan has been revised)
7. **General** — confirm that the three named defender voices (Baker, Vermeule, Kwoka) would recognize the framings attributed to them, or substitute with directly-citable quotes if not.
8. **General** — every claim's source URL needs a final HEAD-check before publication; URLs cited as published in 2022-2024 are vulnerable to link rot.

Additional gaps not marked above:

- **No specific dollar figure** has been pinned to the total federal commercial-data acquisition spend. The ODNI report acknowledges the practice but does not aggregate procurement. A FOIA-based estimate is plausible but out of scope for this corpus pass.
- **No state-by-state matrix** of computer-matching agreements exists publicly; this would be a strong INVESTIGATE-phase enrichment, possibly via state SORN equivalents.
- **Disparate-exposure claims (D1–D3) lack a single quantitative summary statistic** comparable to "lower-income populations generate N× more administrative records than higher-income populations at equivalent activity levels." We may need to commission or estimate this, and if estimated, mark it Modeled clearly.

---

## RENDER-PHASE INPUT NOTES

This corpus is **dense by design**. The episode will not surface all 32 claims as foreground text. The corpus serves:

1. The episode's **prose body** — each section pulls 4–6 anchored claims as the spine of the argument.
2. The **Build the Person interactive** — Stages 1–4 reference the layer / authority / public-disclosure mappings encoded here.
3. The **Claims Atlas update** — every T1 and T2 claim above will be added to `claims-atlas.html`, episode-tagged "The Composite State."
4. The **Systems Atlas update** — the Civic Composite node and its five edges (to Personhood Inc., Trust Market, Influence War, Surveillance Substrate, Physical Plant) will be wired in.
5. The **counter-read panel** in the episode — the three defender voices above, each rendered as a hosted card with its own response.

The corpus is the **load-bearing record**. Every other deliverable references back to it.

---

## NEXT INVESTIGATE STEPS

In the suggested order:

1. **Human review** of this corpus draft. Verify the eight VERIFY flags, approve or amend the three defender voices, sign off on the discipline statement.
2. **Spec the Build the Person interactive** (`_drafts/episode-05-build-the-person-spec.md`) — event-to-fragment mapping table, authority-to-access matrix, color-coded public-disclosure key.
3. **Visual style alignment** — confirm the **Fragment Splay** sub-grammar (extension of Flow Rivers) is the right register, or adapt from the chassis used in EP 04 *Influence War*.
4. **Source matrix HEAD-check** — run every URL above through `infera-trust-audit` before the corpus moves to INVESTIGATE-approved.
5. **Draft prose body** referencing approved claims.
6. **Build HTML mockup**.

---

*Drafted 1 Jun 2026 · Editorial Agent · INVESTIGATE phase · v0.1 · awaiting human review*
