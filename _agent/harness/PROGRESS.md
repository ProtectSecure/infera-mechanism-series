# Progress log

Newest first. Every working session ends by adding one entry: what was done, what the gate said, what is next. A fresh session reads this file, `state.json` and `git log -15` before touching anything.

## 2026-11-11
- Built: The Four Locks (Maryland secret recordings in court), first full dry run of the Intake 05 workflow: story brief, version check, IPA gate, competing hypotheses, assumptions gate, premortem, stop rule, declined forecast, frame check, reasoning lint. Execution record is in the training intake doc.
- Placed as a Season II companion (homepage tile, sitemap, manifest). Recall card added for the reader test.
- Gate (no claims): PASSED, 114 pages, average 91.4; the page scores 100.
- K8: three rounds. Round one: 69 supported, 10 blocking (notice period differed for HB 802; hate crimes wrongly given to HB 132; a Pennsylvania lamp cited a case that did not decide the point; "no one has measured" stated absence of a record as absence of the thing; two wrong tags; "handoff" was not in the letter). Round three: 80 of 80 supported. Full gate with claims PASSED.
- Lessons: the version check caught an error in our own premise (SB 661 was filed as a judge's-discretion bill and rewritten in committee). Paraphrases wearing quotation marks on interactive cards are easy to miss; check the script strings.
- Open for the editor: briefing video (Nov 2025) not reviewed; question to DLS about the SB 661 fiscal note's "prior introductions" line.
- Next: merge on sign-off; watch the 2027 session from 13 January.

## 2026-11-10
- Published: Permanent Record, FN 20, Second Alarm 02, subscription module, healing pass, site kit, The Loom (seven remixes).
- Built: `site-health.py` (evaluator), `heal.py`, `build-connections.py`, `gate.py` (publish gate), pre-publish hook (not yet switched on).
- Gate: PASSED at 110 pages, average 91.3. Baseline recorded.
- Lesson: a mechanical dash fix broke scripts on 14 pages before the health check caught it. Fixed by making the fix script-aware. This is why the gate now runs before every publish.
- Built K8, the claims checker: agent definition, claim extractor, 22-case test (22 of 22, no dangerous misses), gate hookup. First live run started on Field Note 20.
- First live K8 run, Field Note 20 (46 claims, about 26 sources read): 35 supported, 8 overstated, 1 unsupported, 2 extractor false positives. Twelve wording corrections applied on the harness branch; five of the misses added to the test set (now 27 cases). The page's claims changed, so it needs a re-check before the corrections publish.
- Lesson: the builder (me) overstated nine times on a page that had already passed sign-off. Typical slips: one diocese stated as a rule, 'more often' turned into 'most often', a shared figure given to one member.
- K8 run across all ten pages published this week plus the homepage. Round one found blocking items on every page (about 50 in all); three rounds of fix and re-check cleared them. Final: FN 20 45/45, Permanent Record 102/102, Who Pays 38/39 with one UNKNOWN (bill status), seven remixes and homepage tiles all supported. Full gate PASSED with the claims step on.
- Lessons: (1) the builder's commonest slips are one case stated as a rule, a dropped 'usually', a remix tag stronger than home, and a correction that breaks a script string (the render gate caught two). (2) A correction to a home page must trigger a re-check of every remix that reuses it; that is graph G8 and is still by hand. (3) The extractor misses script-held rows and untagged tile blurbs; the checker reads those by hand for now.
- Open for the editor: Spirit docket after 6 Nov; scam bill status on congress.gov; Georgia Power write-downs (Switchboard); Baltimore registers on Findmypast (FN 20); live privacy policies (Promise Audit).
- Next: connect the list (human step); verify Promise Audit quotes; watch 3 to 4 December Character.AI hearing.
