# Standards retrofit · priority map

Opened Nov. 11, 2026 under `melophon-standards-retrofit`. Every published story page in sitemap.xml is scored here; hubs, navigation and legal pages are excluded (index, briefs/index, field-notes/index, desk/index, legal, founding, thesis, machine-readable, claims-atlas, systems-atlas, case-file, the-loom hub, desk-journal, the-afterlife stub). 99 pages scored.

## How the score works

Score = risk x3 + evidence gap x2 + reach x1, each on a 0 to 3 scale (maximum 18). Season I (the Pressure Series) breaks ties.

- **Risk.** 3: a private or deceased person, a minor, a recording or likeness, or an election-integrity accusation. 2: named public figures in quotes, or sensitive subjects (faith, health, grief, housing) without a private individual. 1: institutions and markets only.
- **Evidence gap.** 3: under 5 evidence tags per 1,000 words and no claims verdict. 2: tags present but no claims verdict, or no FACT chips. 1: a claims verdict exists. 0: a current verdict under Editorial Standard v2 (none yet).
- **Reach.** Homepage tile adds 2; 15 or more inbound links adds 1; with no homepage tile, 5 or more inbound links scores 1.

**Known limits of the inputs.** The tag counter in `site-health.py` matches upper-case labels and `chip`, `tier` or `prov` classes, so it undercounts pages that tag with `tag t-fact` and title-case labels. The Seized Record is one example: it scored "0 tags" but carries about 30. The claims extractor has the same blind spot, plus the known multi-sentence truncation. Risk was assigned by reading each page's description and opening the highest scorers, not by a full read of every page. Treat the order as a triage, not a measurement.

## Ranked list

| # | Page | Section | Score | Risk (x3) | Evidence gap (x2) | Reach (x1) | Words | Tags | FACT chips | Claims verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `the-seized-record.html` | pressure | 17 | 3 | 3 | 2 | 2260 | 0 | 0 | no |
| 2 | `episode-05-the-replayable-city.html` | mechanism | 17 | 3 | 3 | 2 | 2582 | 6 | 0 | no |
| 3 | `the-runoff-tells.html` | pressure | 16 | 3 | 2 | 3 | 2551 | 22 | 0 | no |
| 4 | `personhood-inc.html` | mechanism | 16 | 3 | 2 | 3 | 2429 | 24 | 0 | no |
| 5 | `the-closed-hospital.html` | pressure | 15 | 2 | 3 | 3 | 2092 | 9 | 0 | no |
| 6 | `the-eviction-funnel.html` | pressure | 15 | 2 | 3 | 3 | 2250 | 9 | 0 | no |
| 7 | `the-provisional-ballot.html` | pressure | 15 | 2 | 3 | 3 | 2170 | 10 | 0 | no |
| 8 | `the-trickle.html` | pressure | 15 | 2 | 3 | 3 | 2598 | 9 | 0 | no |
| 9 | `check-in.html` | - | 15 | 3 | 2 | 2 | 2049 | 38 | 6 | no |
| 10 | `episode-03-trust-market.html` | mechanism | 15 | 2 | 3 | 3 | 3520 | 13 | 0 | no |
| 11 | `episode-04-the-influence-war.html` | mechanism | 15 | 2 | 3 | 3 | 3870 | 0 | 0 | no |
| 12 | `grandma-updated.html` | - | 15 | 3 | 2 | 2 | 1908 | 72 | 14 | no |
| 13 | `the-angel-at-2am.html` | - | 15 | 3 | 2 | 2 | 4093 | 64 | 1 | no |
| 14 | `the-second-death.html` | - | 15 | 3 | 2 | 2 | 5256 | 181 | 15 | no |
| 15 | `episode-09-the-synthetic-self.html` | mechanism | 15 | 3 | 2 | 2 | 3681 | 113 | 12 | no |
| 16 | `the-house-already-knew.html` | mechanism | 15 | 3 | 2 | 2 | 1944 | 34 | 0 | no |
| 17 | `the-permanent-record.html` | - | 15 | 3 | 2 | 2 | 2206 | 23 | 0 | yes |
| 18 | `the-long-water.html` | pressure | 14 | 2 | 3 | 2 | 2121 | 0 | 0 | no |
| 19 | `episode-08-the-class-engine.html` | mechanism | 14 | 2 | 3 | 2 | 1290 | 1 | 0 | no |
| 20 | `field-notes/12-the-ventriloquist.html` | fieldnotes | 14 | 3 | 2 | 1 | 2046 | 60 | 5 | no |
| 21 | `brief-the-estate-of-the-dead.html` | briefs | 13 | 3 | 2 | 0 | 1420 | 39 | 4 | no |
| 22 | `episode-05-2-the-trickle-part-two.html` | pressure | 12 | 2 | 2 | 2 | 2643 | 32 | 0 | no |
| 23 | `the-capital-stack.html` | pressure | 12 | 2 | 2 | 2 | 2298 | 14 | 0 | no |
| 24 | `hipaa-for-the-pews.html` | - | 12 | 2 | 2 | 2 | 2380 | 78 | 12 | no |
| 25 | `inferred-faith.html` | - | 12 | 2 | 2 | 2 | 1804 | 46 | 5 | no |
| 26 | `redeeming-the-time.html` | - | 12 | 2 | 2 | 2 | 2962 | 88 | 21 | no |
| 27 | `the-chain-of-title.html` | chain | 12 | 2 | 2 | 2 | 9881 | 136 | 0 | no |
| 28 | `the-circulating-dollar.html` | chain | 12 | 2 | 2 | 2 | 7005 | 62 | 0 | no |
| 29 | `the-dilution.html` | chain | 12 | 2 | 2 | 2 | 8051 | 66 | 0 | no |
| 30 | `the-feed.html` | chain | 12 | 2 | 2 | 2 | 5898 | 50 | 0 | no |
| 31 | `the-quiet-guest.html` | - | 12 | 2 | 2 | 2 | 2368 | 80 | 3 | no |
| 32 | `the-terms.html` | chain | 12 | 2 | 2 | 2 | 7104 | 77 | 0 | no |
| 33 | `who-pays-for-the-scam.html` | mechanism | 12 | 2 | 2 | 2 | 1860 | 38 | 0 | yes |
| 34 | `the-coast-is-moving.html` | pressure | 11 | 1 | 3 | 2 | 1991 | 9 | 0 | no |
| 35 | `the-data-center-load.html` | pressure | 11 | 1 | 3 | 2 | 1598 | 0 | 0 | no |
| 36 | `the-settlement-shrinkage.html` | pressure | 11 | 1 | 3 | 2 | 922 | 0 | 0 | no |
| 37 | `the-vogtle-bill.html` | pressure | 11 | 1 | 3 | 2 | 1451 | 0 | 0 | no |
| 38 | `atlas-derivative-data.html` | atlas | 11 | 1 | 3 | 2 | 655 | 0 | 0 | no |
| 39 | `brief-the-bankruptcy-estate-of-you.html` | briefs | 11 | 2 | 2 | 1 | 1254 | 15 | 0 | no |
| 40 | `brief-the-list-at-the-door.html` | briefs | 11 | 2 | 2 | 1 | 3407 | 101 | 17 | no |
| 41 | `episode-06-composite-state.html` | mechanism | 11 | 1 | 3 | 2 | 1630 | 1 | 0 | no |
| 42 | `episode-07-the-physical-plant.html` | mechanism | 11 | 1 | 3 | 2 | 3445 | 0 | 0 | no |
| 43 | `the-feed-engine.html` | mechanism | 11 | 1 | 3 | 2 | 3960 | 12 | 0 | no |
| 44 | `field-notes/19-the-capital-call.html` | - | 11 | 2 | 2 | 1 | 3814 | 51 | 0 | no |
| 45 | `field-notes/20-the-estate-sale.html` | - | 11 | 2 | 2 | 1 | 1973 | 36 | 0 | no |
| 46 | `babel-or-pentecost.html` | - | 10 | 2 | 2 | 0 | 2254 | 86 | 22 | no |
| 47 | `the-pulpit-feed.html` | - | 10 | 2 | 2 | 0 | 2173 | 66 | 13 | no |
| 48 | `briefs/2026-06-08-the-certification-clock.html` | briefs | 10 | 1 | 3 | 1 | 1429 | 7 | 0 | no |
| 49 | `briefs/2026-06-10-the-269-day-clock.html` | briefs | 10 | 1 | 3 | 1 | 1992 | 0 | 0 | no |
| 50 | `field-notes/05-the-morning-after.html` | fieldnotes | 10 | 1 | 3 | 1 | 2319 | 8 | 0 | no |
| 51 | `same-building-two-bills.html` | - | 9 | 1 | 2 | 2 | 2094 | 68 | 13 | no |
| 52 | `the-feed-engine-guide.html` | - | 9 | 1 | 3 | 0 | 2760 | 0 | 0 | no |
| 53 | `briefs/2026-06-12-the-puc-large-load-tariff-clock.html` | briefs | 9 | 1 | 3 | 0 | 3440 | 6 | 0 | no |
| 54 | `briefs/2026-06-15-the-reassessment-clock.html` | briefs | 9 | 1 | 3 | 0 | 3346 | 7 | 0 | no |
| 55 | `briefs/2026-06-19-the-vogtle-cost-recovery-clock.html` | briefs | 9 | 1 | 3 | 0 | 2537 | 11 | 0 | no |
| 56 | `field-notes/01-fhfa-update.html` | fieldnotes | 9 | 1 | 3 | 0 | 1087 | 0 | 0 | no |
| 57 | `field-notes/03-three-converging-clocks.html` | fieldnotes | 9 | 1 | 3 | 0 | 3527 | 0 | 0 | no |
| 58 | `field-notes/04-the-loudest-story.html` | fieldnotes | 9 | 1 | 3 | 0 | 2400 | 0 | 0 | no |
| 59 | `field-notes/06-announced-not-signed.html` | fieldnotes | 9 | 1 | 3 | 0 | 2513 | 4 | 0 | no |
| 60 | `field-notes/07-the-fast-lane.html` | fieldnotes | 9 | 1 | 3 | 0 | 2511 | 10 | 0 | no |
| 61 | `field-notes/08-under-the-noise.html` | fieldnotes | 9 | 1 | 3 | 0 | 2887 | 4 | 0 | no |
| 62 | `field-notes/09-the-rally-that-faded.html` | fieldnotes | 9 | 1 | 3 | 0 | 3167 | 5 | 0 | no |
| 63 | `field-notes/10-the-strait-sets-the-price.html` | fieldnotes | 9 | 1 | 3 | 0 | 3006 | 5 | 0 | no |
| 64 | `field-notes/11-effective-on-arrival.html` | fieldnotes | 9 | 1 | 3 | 0 | 4260 | 19 | 0 | no |
| 65 | `field-notes/12-the-cliffs-that-didnt-fall.html` | - | 9 | 1 | 3 | 0 | 2654 | 6 | 0 | no |
| 66 | `field-notes/16-what-happened-before-the-votes-were-counted.html` | - | 9 | 1 | 3 | 0 | 2415 | 11 | 0 | no |
| 67 | `field-notes/17-what-the-news-skipped-after-the-election.html` | - | 9 | 1 | 3 | 0 | 2146 | 7 | 0 | no |
| 68 | `one-life-every-ledger.html` | loom | 9 | 1 | 2 | 2 | 592 | 11 | 0 | yes |
| 69 | `the-liability-switchboard.html` | loom | 9 | 1 | 2 | 2 | 421 | 12 | 0 | yes |
| 70 | `clocks-collide.html` | loom | 9 | 1 | 2 | 2 | 386 | 8 | 0 | yes |
| 71 | `same-model-different-customer.html` | loom | 9 | 1 | 2 | 2 | 463 | 10 | 0 | yes |
| 72 | `the-promise-audit.html` | loom | 9 | 1 | 2 | 2 | 527 | 12 | 0 | yes |
| 73 | `one-message-upstream.html` | loom | 9 | 1 | 2 | 2 | 490 | 11 | 0 | yes |
| 74 | `brief-decided-before-you-act.html` | briefs | 8 | 1 | 2 | 1 | 2947 | 127 | 25 | no |
| 75 | `brief-the-one-way-mirror.html` | briefs | 8 | 1 | 2 | 1 | 3236 | 141 | 16 | no |
| 76 | `brief-the-price-of-no.html` | briefs | 8 | 1 | 2 | 1 | 3743 | 182 | 45 | no |
| 77 | `brief-who-holds-the-speedometer.html` | briefs | 8 | 1 | 2 | 1 | 2694 | 115 | 22 | no |
| 78 | `brief-the-file-you-cant-see.html` | - | 8 | 2 | 1 | 0 | 3323 | 105 | 6 | yes |
| 79 | `accountability-exhibit-2026-06-08.html` | - | 7 | 1 | 2 | 0 | 2843 | 32 | 0 | no |
| 80 | `deck-tomorrow-board-2026-06-09.html` | - | 7 | 1 | 2 | 0 | 1834 | 50 | 11 | no |
| 81 | `the-open-record-order-locked-2026-06-09.html` | tomorrow | 7 | 1 | 2 | 0 | 1782 | 25 | 0 | no |
| 82 | `field-notes/13-closed-on-paper.html` | - | 7 | 1 | 2 | 0 | 1846 | 11 | 0 | no |
| 83 | `field-notes/14-why-stocks-fell-on-october-30.html` | - | 7 | 1 | 2 | 0 | 2369 | 20 | 0 | no |
| 84 | `field-notes/15-what-the-cameras-missed-on-election-eve.html` | - | 7 | 1 | 2 | 0 | 2333 | 22 | 0 | no |
| 85 | `brief-the-photocopy-problem.html` | briefs | 7 | 1 | 2 | 0 | 3591 | 120 | 23 | no |
| 86 | `desk/sealed-calendar/index.html` | desk | 7 | 1 | 2 | 0 | 3361 | 12 | 0 | yes |
| 87 | `field-notes/18-what-the-news-skipped-on-jobs-day.html` | - | 7 | 1 | 2 | 0 | 2096 | 14 | 0 | no |
| 88 | `tomorrow-exhibit-2026-06-08.html` | tomorrow | 7 | 1 | 2 | 0 | 1805 | 41 | 7 | no |
| 89 | `tomorrow-exhibit-2026-06-09.html` | tomorrow | 7 | 1 | 2 | 0 | 2373 | 72 | 0 | no |
| 90 | `tomorrow-exhibit-2026-06-10.html` | tomorrow | 7 | 1 | 2 | 0 | 2345 | 63 | 0 | no |
| 91 | `tomorrow-exhibit-2026-06-11.html` | tomorrow | 7 | 1 | 2 | 0 | 2728 | 60 | 0 | no |
| 92 | `tomorrow-exhibit-2026-06-12.html` | - | 7 | 1 | 2 | 0 | 2823 | 53 | 0 | no |
| 93 | `tomorrow-exhibit-2026-11-02.html` | - | 7 | 1 | 2 | 0 | 2373 | 38 | 0 | no |
| 94 | `tomorrow-exhibit-2026-11-03.html` | - | 7 | 1 | 2 | 0 | 2534 | 27 | 0 | no |
| 95 | `tomorrow-exhibit-2026-11-04.html` | - | 7 | 1 | 2 | 0 | 2933 | 62 | 0 | no |
| 96 | `tomorrow-exhibit-2026-11-05.html` | - | 7 | 1 | 2 | 0 | 2099 | 30 | 0 | no |
| 97 | `report-the-photocopy-problem.html` | - | 7 | 1 | 2 | 0 | 3061 | 48 | 0 | no |
| 98 | `brief-nobody-is-coming-to-patch-it.html` | briefs | 6 | 1 | 1 | 1 | 4056 | 179 | 27 | yes |
| 99 | `brief-whoever-holds-the-calendar.html` | - | 5 | 1 | 1 | 0 | 3554 | 159 | 16 | yes |

## Story profiles and swap test

Recorded for the pilot and the top of the list. Columns: reader question · new contribution · primary evidence · dominant form · register · ending.

| Page | Reader question | Contribution | Primary evidence | Form | Register | Ending |
|---|---|---|---|---|---|---|
| The Seized Record | Did the government's steps in the 2020 Fulton matter meet its own election-timing rule? | Lines the record up against Justice Manual 9-85.500 | Court records, DOJ memos | Follow-up | Procedural, restrained | Argued position plus a watch list (now with status) |
| The Runoff Tells | What can a runoff show about a coalition, and what can it not? | Runoff turnout history plus four competing lenses | SoS results, turnout studies | Mechanism investigation | Analytical | Lenses left open (the targeting claim is withdrawn) |
| EP 05 The Replayable City | How long does footage of an ordinary day actually live? | The gap between retention policy and recoverable data | Operator policies, court filings, official statements | Human journey (an illustrative commute) | Unsettling | "You were recoverable" |
| The Provisional Ballot | Why is the same provisional ballot counted in one county and rejected in another? | Maps the forks between counties | County rules, cure data | Comparison | Procedural | Named competing explanations |
| The Long Water | Two years after Helene, who has been paid, and what is the storm doing on the ballot? | The unpaid share of damage, by the state's own figures | State recovery data | Consequential decision | Civic | The ballot as the decision point |
| Who Pays for the Scam | When you are tricked into paying, who covers the loss? | Britain's reimbursement rule and its measured effect | Regulator data, an independent review | Attempted repair | Practical | A repair that was tried, with results |
| The Trickle | Where did 40,000 commutes go? | One plausible mechanism, named as one of several | Commute and employment data | Mechanism investigation | Investigative | Competing explanations |
| The Closed Hospital | Does a closure cause the outcome shift, or travel with it? | The causal question made explicit | Hospital and outcome data | Comparison | Careful | Causal question left open |
| EP 03 The Trust Market | Who scores your reputation, and with what? | A composite reputation built from unauthorised data | Mostly assertion; few sources | Mechanism investigation | Ominous | "Outcomes you'll never know happened" |
| EP 09 The Synthetic Self | Who already speaks in your voice? | The cost of staying yourself | Vendor records, campaign ads | Mechanism investigation | Ominous | The replica is cheap, the original is rent |
| The Second Death | Who calls grief by a name when a griefbot falls silent? | Griefbots, wishes card, both sides | Vendor terms, theology | Cultural and ethical | Tender | A take-home wishes card |
| The House Already Knew | What did a betting app know about one bettor? | The missing alarm, against a fixed-bet alarm that worked | Court records, league reports | Reconstruction | Investigative | Did anything tell him to stop |

**Swap test.** A recurring revelation runs across the Season II episodes, the Faith Layer and Briefs 006 to 015: *an institution holds a file on you; the law protects the institution, not the person; here is the record you can request.* Swap the names in EP 03, EP 06, Brief 006, Brief 008, Brief 010, Brief 015, The Permanent Record and The Promise Audit, and the argument and ending largely still fit. These are re-angle candidates, not polish candidates. Each needs its own discovery: a changed outcome, an exception, a distinction, or a person's choice. The Pressure Series varies far more, because each piece is tied to one Georgia mechanism and its own numbers.

## Pilot (six pieces, deliberately varied)

| Form | Page | Score | Batch |
|---|---|---|---|
| Follow-up | The Seized Record | 17 | 1 |
| Human journey | EP 05 The Replayable City | 17 | 1 |
| Deep mechanism investigation | The Runoff Tells | 16 | 1 |
| Comparison | The Provisional Ballot | 15 | 2 |
| Consequential decision | The Long Water | 14 | 2 |
| Attempted repair | Who Pays for the Scam | 12 | 2 |

The mix is an experiment, not a quota. After the pilot, batches of three proceed down the ranked list, Season I first.
