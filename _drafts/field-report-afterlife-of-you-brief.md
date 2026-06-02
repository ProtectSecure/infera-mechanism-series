# Field Report · The Afterlife of You — Brief

**Type:** Field dispatch (Season II side quest, ships between locked episodes)
**Status:** Brief drafted — awaiting research consolidation
**Length target:** 1,800-2,400 words + interactive data-trajectory simulator
**Date drafted:** 27 May 2026

---

## Compression Point

> ***"Your old data didn't die. It just got cheaper — and then more valuable."***

**Reader-arrival framing:** *You probably assume data about you from 2014 is stale, low-value, mostly forgotten. The opposite is true. Old data is more valuable than fresh data for many purposes — identity verification, fraud scoring, model training, lookalike modeling, social-engineering reconnaissance. Your data history is your audition for the future, and the audition tape never expires.*

**Working title:** *The Afterlife of You*
**Alternate:** *The Half-Life*

---

## Thesis Line

> *Nothing about you ever expires. Only the price does — and the price often goes back up once the data becomes "historical" enough to be useful for a different purpose than the one it was originally collected for.*

---

## The five things old data is actually used for

The reader probably assumes old data sits in archives, gathering dust, slowly aging out. In reality, old data is **actively used** for at least five purposes that fresh data cannot serve as well:

1. **Identity-verification authenticity.** Old data proves you are who you say you are. Lenders, identity-verification vendors (Jumio, Onfido, Socure, Persona), and government identity systems specifically value the *consistency of your history* — same address for 8 years, same name pattern, same email since 2011 — as the strongest signal that you are not a synthetic identity or a fraud account. Fresh data alone cannot do this.

2. **Fraud scoring.** Anti-fraud systems flag accounts whose history is *thin* or *inconsistent*. Your old data is your alibi. Without it, you are statistically more likely to be a fraud account — which means you get more friction, higher prices, more declined transactions.

3. **Lookalike modeling.** Advertisers build "people like you" segments from longitudinal panels of historical behavior. Your 2017 purchases are now the seed for someone else's targeted ad in 2026.

4. **AI training data.** Your historical text, search patterns, voice recordings, photos, location pings have all become potential training inputs for models that did not exist when the data was collected. The use was not foreseeable. The consent was not given for it. The data was retained anyway.

5. **Reconnaissance for social engineering.** Old breach data circulates on dark-web markets indefinitely. Even after you rotated passwords and changed cards, the historical record (where you lived, what you bought, who your contacts were, what services you used) remains valuable for impersonation, account takeover, and targeted phishing.

The reader's lived experience is *I have forgotten about that*. The system's experience is *we have not, and we still find use for it*.

---

## Interactive Core — *The Trajectory Tracker*

Single-page interactive. The reader picks a year from 2010-2025 and the page shows a stylized representation of "what data about you was likely created that year, by whom, and where it most plausibly lives now."

Example outputs:
- "Your 2014 location-app usage → most plausibly in 3-5 broker archives → still actively used in lookalike modeling → likely also leaked in at least one of the major breaches of that era → currently retrievable for ~$0.0002 per record on aftermarket panels."
- "Your 2017 email account creation → identity-verification anchor → fraud-score input → password-recovery surface → if breached (high probability), still a credential-stuffing target a decade later."
- "Your 2020 telehealth visit → HIPAA-covered until the provider transferred the data → de-identified clinical dataset → resold to pharma RWE vendors → contributes to real-world evidence submissions to FDA you will never see."

The tracker does not claim certainty about any specific reader's specific data. It shows the *likely lifecycle* given documented industry practice.

---

## Federal Oversight Gap — the load-bearing claim

The U.S. has no federal "right to be forgotten." The EU's GDPR Article 17 establishes one. The U.S. has only fragmented state laws (CCPA, CDPA, CPA, CTDPA, UCPA, plus newer additions) that provide deletion rights of varying scope and enforcement strength. None of them reach historical broker aftermarkets reliably. None of them reach breach-circulated data at all.

The honest framing: *deletion in U.S. law is largely a forward-looking gesture. The historical record is not meaningfully erasable through legal channels.* This is the part of the field report that most readers will find most disquieting because it is documented, structural, and unaddressed.

---

## Can You Buy Your Own Outdated Data?

Partial. There are three pathways:

1. **Consumer-facing data-removal services** (DeleteMe, Optery, Kanary, Privacy Bee). These remove your data from a fixed list of brokers — typically 100-500 — on a recurring basis. They do not reach the long tail of broker resale chains.
2. **Researcher-accessible breach databases** (Have I Been Pwned, DeHashed, IntelX). You can sometimes find your own historical records this way. You cannot meaningfully remove them.
3. **Direct purchase from data brokers.** Most consumer-facing brokers will not sell you your own data on consumer terms. Some will sell it back to you at enterprise pricing — which is to say, far more than they sold it to other buyers. The economic asymmetry is editorially load-bearing.

The cleanest version of the truth: *you can locate some of your historical data. You cannot reliably retrieve, control, or destroy it.*

---

## The Black Market

The aftermarket for breach data is mature, durable, and largely unaddressed by enforcement. Stolen credentials from 2014 are still being sold and used in 2026 because:

- Many users still rely on the same email-as-username across services
- Old passwords often resemble new passwords (incremented suffixes, predictable rotations)
- The metadata (name, DOB, address history, employer history, contact graph) remains useful for impersonation regardless of password rotation
- Resale chains pass records through enough hands that origin attribution is effectively impossible

The economics: old breach data is priced low (cents per record at scale) but the *use cases* for it are now AI-augmented social engineering, which has raised the effective return per record substantially. The decline in record price and the rise in record utility have happened simultaneously, which is the editorial point.

---

## Counter-Read (hosted)

The strongest defenders of current practice argue three things, each fairly hosted:

1. **Retention serves users.** Identity verification, fraud prevention, recommendation, and personalization all depend on historical data. Stripping retention rights would degrade many services consumers actively rely on.

2. **De-identification works at the scale most uses require.** For AI training, aggregate analysis, RWE submissions, and lookalike modeling, individual identifiability is not required. The strongest version of this argument holds that population-scale uses do not warrant individual-scale concerns.

3. **The breach aftermarket is a law-enforcement problem, not an industry-practice problem.** Criminal markets exist for many lawful products. The lawful retention industry should not be conflated with the unlawful aftermarket built on it.

Each defense holds in part. The episode hosts each. The episode's response: the defenses calibrated to one use case at a time miss the *cumulative effect* of permanent retention across many use cases, and the de-identification claim is increasingly weak as the Sweeney-line re-identification literature documents.

---

## Discipline (what we did NOT prove)

- We did not prove any specific broker or service exceeded its lawful authority.
- We did not prove de-identification *cannot* protect any specific dataset; only that it does not reliably do so at the scales currently in use.
- We did not prove the federal oversight gap is intentional; only that it is structural and unaddressed.

What we did prove: old data is more valuable than the reader assumes, the legal mechanisms to control it are weaker than the reader assumes, and the aftermarket is more durable than the reader assumes.

---

## Closer (locked)

> *"You did not lose that data. You only stopped knowing where it was."*

---

## Connective Scaffolding

**Echo dots:**
- → Personhood Inc. (EP 02): *"The composite assembled there is also the composite resold."*
- → The Composite State (EP 05): *"The state can buy historical commercial data the state itself never collected."*
- → Season III opener: *"What is actually possible now — that is what comes next."*

**Atlas updates:**
- *Systems Atlas* — add **Data Aftermarket** node; edges to Personhood Inc., Composite State, Physical Plant
- *Claims Atlas* — ~15 new rows (the five uses for old data, the federal oversight gap, the breach-aftermarket economics, the de-identification critique)

---

## Source Matrix Starter

| Tier | Source |
|---|---|
| T1 | GDPR Article 17 text (for the comparative oversight claim) |
| T1 | CCPA, CDPA, CPA, CTDPA, UCPA state-law texts |
| T2 | Latanya Sweeney's re-identification research body |
| T2 | Have I Been Pwned aggregate breach data |
| T2 | FTC actions against data brokers (Kochava, X-Mode/Outlogic) |
| T2 | Vermont Data Broker Registry filings |
| T2 | Investigative reporting on DeleteMe / Optery effectiveness |
| T3 | Trade press on identity-verification vendor practices |
| T3 | Academic literature on AI training data provenance |

---

*Brief drafted 27 May 2026 · Editorial Agent · field-dispatch format*
