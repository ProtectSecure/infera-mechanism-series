# The Curiosity Engine

**Status:** living ledger, opened 9 November 2026. Runs in tandem with the connective scan: the scan finds what a new piece connects to; the engine asks what the connections *mean* and turns the best questions into briefs. Add rows and briefs; never delete them. When a cue is answered, mark it, link the answering piece, and keep the row.

## How it works

Every cue is one true question, born from a fact-check delta (a surprise, a correction, a conflict between sources, or an open gap). Each cue is worked through seven lenses, and the lenses are what make the engine find things a single story cannot:

| Lens | The question it asks |
|---|---|
| **Convergence** | Where do two or more stories arrive at the same mechanism from different directions? |
| **Divergence** | Where do two stories that look alike turn out to run on different rules? (Often the best exhibit.) |
| **Alignment** | Who benefits in the same way across stories, even when the subjects differ? |
| **Legal intersection** | Which laws touch this, and where do two bodies of law meet or collide? |
| **Legal gap** | What harm here falls outside every law that exists? Name the boundary precisely. |
| **Historical analogue** | When did something with the same shape happen before, and how did it end? |
| **Next search** | The one search, document or person that would move the cue forward. |

**Triggers.** The engine runs (1) at the end of every connective scan, (2) on every update review under Editorial Standard v2 §10, and (3) whenever a sweep result touches an open cue. Each run updates the ledger and the brief, and records new through lines.

**Outputs.** A cue graduates when it earns a page: an exhibit inside an existing piece (retrofit), a new exhibit, a field note, or a mini-series. Every graduate gets a link here.

**Discipline.** Every claim in a brief carries its tag (FACT, REPORTED, ALLEGED, INFERENCE, WATCH). Historical analogues are offered as comparisons, never as proof that the same thing will happen. A cue that cannot be honestly sourced stays a question.

---

## Ledger

| # | Cue | Born from | Status | Graduates to |
|---|---|---|---|---|
| C-01 | Britain made banks pay for scams, and losses fell. What would happen if sportsbooks paid for problem gambling? | The House Already Knew; UK PSR results | **Briefed** | The Second Alarm · Exhibit 2 |
| C-02 | If knowing a customer is in trouble creates a duty, is it safer for a company not to know? | DraftKings' shelved model | **Briefed** | The Second Alarm · thesis room |
| C-03 | Who is the protective algorithm for: you, or the company's license? | House Already Knew; CAISSI | **Briefed** | EP 11 cold open; Second Alarm |
| C-04 | Your bank can block gambling. Can your sportsbook block your bank? | Monzo block | **Briefed** | The Second Alarm · Exhibit 2 instrument |
| C-05 | A church school knows a child from age five. What does it know at fifty? | Church data question, 9 Nov | **Graduated (preview)** | The Permanent Record (Faith Layer) |

## Through lines found so far

1. **Liability creates the alarm.** Card fraud protection followed liability caps; UK scam reimbursement followed mandatory reimbursement; sportsbook integrity alarms follow license risk. Where no one is liable for the harm, no alarm is built. (C-01, C-02, C-03, C-04) <span>INFERENCE across sourced cases</span>
2. **The same model, different customer.** The sportsbook "elasticity" model, church giving prediction ("capacity to give, likelihood of dropping out," per a consultant quoted by the Christian Post), and EP 09's rent ledger all score a person's value to an institution. (C-02, C-05; EP 09; EP 03)
3. **Permanence vs. erasure.** A sacrament that cannot be undone, a school record kept for life, a griefbot that outlives its subject, and EP 10's afterlife of data are one question: who decides when a record ends? (C-05; HIPAA for the Pews; EP 09; EP 10)
4. **The tester is the tested.** Sportsbooks police their own harm; AI labs hire their own evaluators; churches hold their own records outside most privacy law. (C-03, C-05; EP 11)

---

## Brief C-01 · If the bank pays, the bank builds the alarm

**Question.** Britain made banks pay for scams, and losses fell. What would happen if sportsbooks paid for problem gambling?

**What we know.**
- Britain's mandatory reimbursement for authorized push payment scams took effect 7 October 2024. By July 2026 the Payment Systems Regulator reported reimbursement rose from 54% to 65%, scam losses over Faster Payments fell about 21% (about £73 million a year), and the rule "strengthened incentives" for prevention. REPORTED (PSR via Regulation Tomorrow, 1 Jul 2026)
- In the US, the CFPB sued Zelle's operator and three banks in December 2024, alleging more than $870 million in customer losses over seven years; it dropped the case on 4 March 2025. REPORTED (NPR/APR)

**Convergence.** Two industries, one mechanism: the operator builds detection when the loss lands on its books.
**Divergence.** In banking the harmed customer and the protected institution want the same thing (stop the scam). In betting, stopping the harm stops revenue. Liability may need to be larger to bite.
**Alignment.** Banks and sportsbooks both resisted liability by pointing to customer choice ("authorized" payment; "legal" wager).
**Legal intersection.** Payments law (US Regulation E, Electronic Fund Transfer Act) meets gambling licensing (state). Banks process the deposits that fund betting.
**Legal gap.** US law generally treats a payment the customer authorized, even under deception, differently from an unauthorized one. WATCH (verify the Reg E boundary with a primary source before publishing)
**Historical analogue.** US law has capped consumer liability for unauthorized credit card use at $50 since the 1970s; card networks built fraud detection under that allocation of loss. REPORTED in general references; verify statute and year (15 U.S.C. 1643) before use.
**Next search.** PSR's full July 2026 report; any US state bill making sportsbooks liable for losses after a self-exclusion breach.
**Graduates to.** The Second Alarm, Exhibit 2.

## Brief C-02 · The safest company knows nothing

**Question.** If knowing a customer is in trouble creates a duty, is it safer for a company not to know?

**What we know.** DraftKings built an at-risk model, found simple rules beat guessing, and canceled the presentation; the company says predictive tools were not "evidence-based." REPORTED (NYT via Boston Globe, 21 Sep 2026)
**Convergence.** CAISSI stopped publishing evaluations (EP 11 cold open). An unpublished test, like an unbuilt model, cannot be used as evidence of knowledge.
**Divergence.** In anti-money-laundering law, banks are punished for *not* knowing (know-your-customer duties). In consumer harm, not knowing is often safer. Same institutions, opposite incentives.
**Legal intersection.** Knowledge standards in negligence ("knew or should have known") meet regulatory duties of care.
**Legal gap.** No US gambling rule requires operators to build predictive harm detection. INFERENCE (verify across leading states: NJ, PA, MA)
**Historical analogue.** Tobacco and the internal research its makers held for decades before litigation surfaced it. Use only with a sourced citation to the litigation record.
**Next search.** An expert in gambling regulation or tort law on whether a built model creates notice; Massachusetts regulator's DraftKings inquiry outcome.
**Graduates to.** The Second Alarm, thesis room ("The Second Alarm: why the safest company knows nothing").

## Brief C-03 · Whose alarm is it?

**Question.** Who is the protective algorithm for: you, or the company's license?

**What we know.** Integrity monitoring flagged Porter's prop; no harm intervention is on the public record (The House Already Knew). CAISSI's independence questioned while labs hire their own evaluators (AP, 8 Nov 2026). REPORTED / INFERENCE
**Convergence.** Both are "who tests the tester."
**Alignment.** The party running the alarm is the party with the most to lose from it ringing.
**Legal intersection.** Licensing law (state gaming, federal AI policy) as the real enforcement surface rather than consumer law.
**Historical analogue.** NHTSA crash testing and the auto industry before 1966 (already the CAISSI hook). Verify dates of the National Traffic and Motor Vehicle Safety Act.
**Next search.** Who audits sportsbook responsible-gaming programs in each leading state, and whether results are public.
**Graduates to.** EP 11 Lever Map row; Second Alarm framing.

## Brief C-04 · The customer's own lock

**Question.** Your bank can block gambling. Can your sportsbook block your bank?

**What we know.** Monzo's block: more than 700,000 users; £9 million in gambling payments stopped in 2024; cooling-off periods up to 12 months, with 41% of self-serve users choosing the maximum. REPORTED (Finextra). Norway's state operator imposes mandatory loss limits. REPORTED
**Divergence.** Protection the customer controls is used widely; protection imposed by the profiting party is rare. INFERENCE
**Alignment.** The best tools sit with parties that do not profit from the loss.
**Legal gap.** No federal US rule requires banks to offer a gambling block. INFERENCE (verify)
**Next search.** Which US banks offer a merchant-category gambling block; usage numbers.
**Graduates to.** Second Alarm Exhibit 2 instrument ("Build your own lock").

## Brief C-05 · The Permanent Record

**Question.** A church school knows a child from age five. What does it know at fifty?

**What we know.**
- FERPA generally does not apply to private schools that receive no Department of Education funds. REPORTED (Dept. of Education privacy office, via RecordingLaw)
- Tuition assistance processors used by many Catholic and Christian schools ask families for tax returns and W-2s. REPORTED (school notices, e.g. CSBC 2021)
- PowerSchool's breach, disclosed 7 Jan 2025, reached Catholic school systems including the Diocese of Green Bay; the attacker claimed 62.4 million students. REPORTED (WBAY; BleepingComputer, hacker's claim, not confirmed)
- Gloo has served more than 30,000 churches with data-driven outreach, including neighborhood "risk reports." REPORTED (Christian Post)
- Eight states' privacy laws exempt all nonprofits (Virginia, Iowa, Montana, Nebraska, New Hampshire, Texas, Tennessee, Utah); Colorado and New Jersey have no nonprofit exemption; Maryland exempts only certain insurance-related nonprofit activity. REPORTED (PrivacyLawMap, 30 Mar 2026)
- The Council of Trent required Catholic parishes to keep baptism and marriage registers in 1563. REPORTED (PGSA)

**Convergence.** HIPAA for the Pews (law stops at the church door), Check-In (children's attendance), Inferred Faith (predicting belief), EP 09 (copy vs original), EP 10 (afterlife of data).
**Divergence.** The same record (a baptism) is sacred memory to the church and personal data to the law; Europe is testing which wins (Belgian case before the EU court).
**Legal intersection.** Education privacy (FERPA) meets religious liberty and church autonomy; state privacy law meets nonprofit exemptions; GDPR's special category for religious data.
**Legal gap.** A K-12 church school with no federal funds, a church with no HIPAA duty, and a home state that exempts nonprofits can leave a lifetime file covered by almost nothing but breach law. INFERENCE from the sourced rules above
**Historical analogue.** Parish registers predate civil registration and were long the state's record of birth and marriage. The "permanent record" was a church invention before it was a school threat.
**Next search.** Which church-school software (student information plus church management) vendors integrate both; any diocese policy on retention; Maryland MODPA thresholds as applied to a large church.
**Graduates to.** The Permanent Record (Faith Layer), preview 9 Nov 2026.

*Engine opened 9 November 2026 · Editorial Agent*
