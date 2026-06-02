# Episode 05 · The Composite State — DISCOVER Brief

**Season II · Episode 05**
**Status:** DISCOVER mode brief — candidate approved, compression pass complete, claim corpus assembly pending
**Atlas slot:** Civic Composite Layer (new node, parallel to commercial composite stack of EP 02-04, connects to Surveillance Substrate of EP 04½)
**Date drafted:** 27 May 2026

---

## Compression Point

> ***"You are not stored in one file. You are reconstructed on demand."***

**Reader-arrival framing:** *Every interaction with civic life — a license renewal, a court filing, a 911 call, a property purchase, a benefits claim, a passport application — leaves an administrative trace in a different system. No agency holds the master file. But when an event makes you matter — an investigation, a lawsuit, a benefits review, a security clearance, a divorce — those traces can be pulled, joined, and stitched into a person.*

**Working title:** *The Composite State*
**Subtitle (interior page only):** *The public-private machinery that turns civic records, surveillance, commercial data, litigation records, and infrastructure logs into different versions of you.*

---

## Why this is its own episode

The persuasion trilogy (EP 02-04) described the **commercial composite** — a probabilistic, prediction-driven profile assembled by brokers and used by advertisers. The Composite State describes a **parallel and structurally different machine**: an evidentiary, authority-driven profile assembled by government and used for eligibility, taxation, licensing, compliance, enforcement, and adjudication.

The two machines look similar from the outside. They are not the same.

**The advertiser asks:** *What will move this person?*
**The state asks:** *What is this person — legally, administratively, financially, spatially, procedurally?*

The advertiser profile is probabilistic, affinity-based, vulnerability-tuned, lookalike-extended. The state profile is evidentiary, identity-anchored, eligibility-gated, enforceable. Private-sector data wants **prediction**. Government data wants **authority**.

That distinction is the episode's thesis, and the publication has not yet named it. EP 05 names it.

---

## Six-Act Chassis — pinned to the realization arc

### HERO · *Familiarity*

> *You have one face.* They have *eleven* files.

### PRESSURE · *Unease*

There is a popular myth that the government maintains one omniscient file on every citizen. It does not. The accurate version is structurally more disquieting: you exist as **linked fragments** across agencies, vendors, case systems, databases, retention schedules, contracts, and legal authorities. No single agency holds the composite. Many agencies *can assemble* the composite when a triggering event creates legal authority to do so.

Your DMV record, your IRS file, your court filings, your 911 calls, your benefits claims, your property records, your travel logs, your professional licenses, your unemployment history, your vital records, your federal employment file, your military service record — these do not sit in one cabinet. They sit in dozens. The composite is created **on demand**, when an investigation, audit, litigation, benefits determination, fraud review, intelligence query, or interagency data match makes it useful for a specific authority to assemble it.

The myth of one master file is comforting because if it existed, there would be one place to oversee, one place to FOIA, one place to challenge. The reality — fragments connectable on demand by varying authorities under varying rules with varying retention windows — is harder to see, harder to oversee, and harder to defend.

### PIPELINE · *Recognition*

The episode walks the reader through the three jurisdictional layers and what each holds.

**LOCAL layer.** Property records. Court records. Police reports. 911 call logs. Permits. School records. Red-light and speed-camera events. Body-camera footage. Parking and toll records. Sometimes ALPR (automated license-plate reader) hits.

**STATE layer.** DMV identity. Vehicle registration. License status. Traffic violations. Unemployment records. Professional licenses. Benefits records. Business registrations. State tax records. Vital records (birth, marriage, divorce, death). State court systems.

**FEDERAL layer.** IRS tax records. Social Security earnings. Passport and immigration records. Federal benefits. Military and veteran records. Federal employment and security records. Medicare/Medicaid interfaces. Law-enforcement and intelligence records. Travel and border data. Agency-specific case files (HUD, VA, USDA, etc.).

**The modern twist (the part most readers don't know):** government can also **obtain or buy** third-party commercial data depending on agency, purpose, authority, contract, and legal limits. Reporting on Fog Data Science documented law-enforcement access to commercially sourced smartphone location data. Flock Safety's networked LPR systems, stored in AWS GovCloud, enable broad interagency searches that no individual agency would have built unilaterally.

The pipeline visualization shows: an everyday event (the reader picks one) creates a record. The record splits across local, state, and possibly federal systems. Different authorities can pull different fragments under different rules. The reader sees the splay.

### OUTCOME · *Implication*

Disparate impact across three populations:

- *Lower-income populations* generate more state-side records (benefits, public housing, court contact, parole/probation), and those records are more accessible to more authorities than the records generated by higher-income populations.
- *Immigrant populations* generate more federal records (immigration, visa, border, naturalization) that interlink with state and local records in ways that can have consequences far beyond the originating purpose.
- *Higher-income populations* generate more commercial-side records (broker data, mortgage filings, business registrations, professional licenses), and the state can purchase or subpoena commercial records under varying authorities.

The result: the composite the state can assemble is *deeper* on lower-income and immigrant populations, even though everyone has fragments in the system. The civic composite, like the commercial composite before it, sorts unequally.

### COMPETING · *Systems Realization · one half*

The strongest defenders of the architecture argue four things.

First, **administrative authority is necessary** for a functioning state. Tax collection, benefits adjudication, license issuance, public safety, and court systems cannot operate without records. The records exist because the functions exist.

Second, **fragmentation is itself a privacy protection**. The lack of one master file is not an accident — it is the result of constitutional, statutory, and inter-jurisdictional design choices that prevent any one authority from having omniscient view. The composite is hard to assemble *on purpose*.

Third, **legal authority is the gating constraint.** A police officer cannot pull IRS records on a whim. A divorce attorney cannot subpoena a federal employment file without showing relevance. The gates exist. The episode must show them honestly.

Fourth, **transparency mechanisms exist** — FOIA, public-records laws, court-record access, agency Privacy Act notices — that are meaningfully usable, even if imperfect.

Each defense holds in part. The episode hosts each fairly.

### DISCIPLINE · *Systems Realization · other half*

The episode must refuse three convenient simplifications.

First, **no conspiracy.** No agency is asserted to have coordinated this architecture. It is the accumulated product of statutes, agency procurement, vendor consolidation, federal grant programs, court rulings, and inter-jurisdictional agreements made over decades by independent actors. The accidental nature of the assemblage is part of the story.

Second, **no dystopia.** The state has legitimate administrative interests. The episode must label every modeled or speculative claim and refuse to dramatize the documented ones beyond what the evidence supports.

Third, **no mind-control framing.** The state's composite is *evidentiary*, not persuasive. It does not shape what the reader feels. It shapes what the reader is *eligible for*, *liable for*, *taxed at*, *licensed to do*, *accountable for*, and *visible to enforcement authority for*. These are different harms than the commercial composite's harms. The episode must keep them distinct.

What we did NOT prove:
- We did not prove any specific agency exceeded its authority in any specific case.
- We did not prove the architecture is intentionally designed for surveillance rather than administration.
- We did not prove FOIA or transparency mechanisms are systematically broken — only that they are uneven, and that the integration across systems lacks integrated oversight.

What we *did* prove: the fragments exist, the joins are possible, the authorities to perform the joins are real and active, and no single oversight mechanism covers the assemblage.

### CLOSER

> *"You are not stored in one file. You are reconstructed on demand."*

---

## Interactive Core — Build the Person → Watch the Record Split → Who Can See What → When Does It Become Public

Four-stage participatory mechanic. The reader operates each stage and the system builds their composite in front of them.

**Stage 1 · BUILD THE PERSON.** The reader picks life events from a menu:

```
[ ] license renewal     [ ] house purchase    [ ] new job
[ ] lawsuit filed       [ ] hospital visit    [ ] divorce
[ ] speeding ticket     [ ] benefits claim    [ ] airport travel
[ ] passport renewal    [ ] business filing   [ ] arrest record
```

Each click adds a life event to a timeline.

**Stage 2 · WATCH THE RECORD SPLIT.** As each event is added, animated record-fragments fan out across a three-tier (local / state / federal) and one-vendor (third-party broker) grid. The reader sees one event producing 3-7 fragments across multiple systems. The persistent timeline accumulates fragments across all events the reader chose.

**Stage 3 · WHO CAN SEE WHAT?** The reader picks an authority:

```
ADVERTISER  ·  POLICE OFFICER  ·  DIVORCE ATTORNEY  ·  IRS AUDITOR
JOURNALIST  ·  DATA BROKER  ·  CAMPAIGN  ·  LANDLORD  ·  INSURER
```

Each authority illuminates a different subset of the accumulated fragments — the records they can lawfully access. The reader sees that *no single authority sees everything*, but every authority sees more than the reader expected.

**Stage 4 · WHEN DOES IT BECOME PUBLIC?** The reader watches the record types color-code by public-disclosure mechanism:

```
LIME    · ordinary public record (court filing, property deed)
AMBER   · subject to subpoena or discovery (texts, bank, location)
PINK    · sealed by default but pullable under specific authority
GREY    · effectively private absent extraordinary cause
```

The closing display: the reader's accumulated composite is a stippled cloud of fragments, color-coded by accessibility. They see who can pull what.

---

## Visual Grammar

Proposed: extension of **Flow Rivers** with a new sub-grammar called **Fragment Splay**. Single life event enters at top; record fragments fan out in branching tributaries that terminate in different jurisdictional reservoirs (local pool, state pool, federal pool, vendor pool). Each pool has a different color shore. Authority overlays appear as semi-transparent lenses that illuminate which fragments are accessible.

No pan, no zoom. Static frame, kinetic interior. The fan-out is the motion. The lens-overlay is the interaction.

---

## Connective Scaffolding

**Echo dots:**
- ← Personhood Inc. (EP 02): *"The commercial composite assembles your behavior. The civic composite assembles your authority footprint. They are different machines."*
- ← The Trust Market (EP 03): *"What's priced commercially is what predicts you. What's recorded administratively is what binds you."*
- ← The Influence War (EP 04): *"The persuasion machine wants to move you. The administrative machine wants to fix you in place — eligibility, liability, license, status."*
- ← The Replayable City (EP 04½): *"The footage collected there is one input to the composite assembled here."*
- → The Physical Plant (EP 06): *"Both composites live in the same buildings. Often the same racks."*

**Atlas updates:**
- *Systems Atlas* — add **Civic Composite** node; edges to Personhood Inc., Trust Market, Influence War, Surveillance Substrate, Physical Plant
- *Claims Atlas* — ~30 new rows (the layer-by-layer claims, third-party data acquisition, court-evidence mechanics, retention schedules, authority gates)
- *Case File* — adds a "Civic Footprint" panel showing record-types the reader's session and self-reported life events would plausibly generate

**Visual grammar:** new — **Fragment Splay** (extension of Flow Rivers grammar)

---

## Source Matrix Starter

| Tier | Source | Use |
|---|---|---|
| T1 | IRS publications on third-party summons authority | What the IRS can pull from whom |
| T1 | Federal Privacy Act notices (Federal Register) | Legal scope of agency record-holding |
| T1 | FOIA response data (DOJ, agency reports) | Transparency mechanism reality |
| T1 | State-level public-records statutes (sample states) | Jurisdictional variation |
| T1 | Federal Rules of Civil Procedure (discovery scope) | What becomes evidence |
| T1 | Federal Rules of Evidence | What is admissible |
| T2 | EFF, ACLU reporting on Fog Data Science | Commercial location-data acquisition by law enforcement |
| T2 | Flock Safety published policy + AWS GovCloud documentation | LPR architecture and access |
| T2 | Brennan Center on government data acquisition | Authority analysis |
| T2 | Markup, Vice reporting on data brokers selling to government | Aftermarket-to-state pipeline |
| T2 | GAO reports on agency data sharing | Inter-agency reality |
| T2 | Vermont Data Broker Registry | Vendor visibility |
| T3 | Academic literature on the administrative state | Theoretical grounding |
| T3 | Legal scholarship on Privacy Act, Fourth Amendment doctrine | Authority limits and erosion |
| T3 | Investigative journalism on specific composite-assembly cases | Case studies |

Target: 30 load-bearing claims, each with counter-read URL.

---

## Cadence into INVESTIGATE

1. Build claim corpus against source matrix above (target: 30 rows).
2. Identify three named counter-read defenders (one for fragmentation-as-protection, one for administrative-authority-necessity, one for transparency-mechanisms-work). Each gets a hosted paragraph.
3. Specify the Build the Person interactive in detail (event-to-fragment mapping, authority-to-access mapping, retention-window data).
4. Submit corpus + interactive spec for human review BEFORE rendering.
5. Render. Audit. Approve. Ship.

## Linkage to Season Arc

EP 05 is the pivot from commercial to civic. After EP 05, the reader understands:
- That two parallel composite machines exist (commercial, civic)
- That they are structurally different (prediction vs authority)
- That they sometimes overlap (commercial data purchased by government; government data leaked or subpoenaed into commercial use)
- That neither has integrated oversight matching the integrated architecture
- That fragmentation is both the system's vulnerability and its defense

EP 06 (The Physical Plant) then closes the season by showing that the two machines live in the same physical buildings, powered by the same grid, owned by the same handful of companies.

---

*Brief drafted 27 May 2026 · Editorial Agent · DISCOVER mode complete · awaiting INVESTIGATE approval*
