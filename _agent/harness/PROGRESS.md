# Progress log

Newest first. Every working session ends by adding one entry: what was done, what the gate said, what is next. A fresh session reads this file, `state.json` and `git log -15` before touching anything.

## 2026-11-10
- Published: Permanent Record, FN 20, Second Alarm 02, subscription module, healing pass, site kit, The Loom (seven remixes).
- Built: `site-health.py` (evaluator), `heal.py`, `build-connections.py`, `gate.py` (publish gate), pre-publish hook (not yet switched on).
- Gate: PASSED at 110 pages, average 91.3. Baseline recorded.
- Lesson: a mechanical dash fix broke scripts on 14 pages before the health check caught it. Fixed by making the fix script-aware. This is why the gate now runs before every publish.
- Built K8, the claims checker: agent definition, claim extractor, 22-case test (22 of 22, no dangerous misses), gate hookup. First live run started on Field Note 20.
- First live K8 run, Field Note 20 (46 claims, about 26 sources read): 35 supported, 8 overstated, 1 unsupported, 2 extractor false positives. Twelve wording corrections applied on the harness branch; five of the misses added to the test set (now 27 cases). The page's claims changed, so it needs a re-check before the corrections publish.
- Lesson: the builder (me) overstated nine times on a page that had already passed sign-off. Typical slips: one diocese stated as a rule, 'more often' turned into 'most often', a shared figure given to one member.
- Next: connect the list (human step); verify Promise Audit quotes; watch 3 to 4 December Character.AI hearing.
