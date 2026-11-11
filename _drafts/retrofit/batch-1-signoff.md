# Retrofit batch 1 · sign-off list

Nov. 11, 2026. Three pages, retrofitted under `melophon-standards-retrofit` and checked by the claims checker at Level 2 (Level 3 for the Guthrie passage). Every substantive change is a dated correction on the page. Nothing republishes until Jared signs.

| Page | Score | What changed | Correction note | Claims check | Republish? |
|---|---|---|---|---|---|
| The Seized Record | 17 | Another user's Midjourney image removed. Status since publication added. Olsen, memo date, McCotter letter, double-scan, Boulee and Ray wording, and statute of limitations corrected. Stance relabeled. Monitored-counties line labeled. Closed watch items marked. Method note added. | Yes | Round 3: 72 supported, 1 unknown, 1 blocking (a ruler marker, fixed after round 3, not re-checked). Tag labels were also upper-cased in source so the tools count them, which changed the ledger sha. | Jared: yes / no |
| The Runoff Tells | 16 | "Targeting infrastructure" claim withdrawn from the page, its description and its bridge. June 16 results and Bottoms's general-election win added. Turnout figures, the 2008 note, Collins's office, the Kennedy title, runoff counts, Senate primary shares, early-voting dates and FairVote framing corrected. Lenses labeled as hypotheses. Non-verbatim quotation marks removed. | Yes | Passed round 3: 50 supported, 2 unknown | Jared: yes / no |
| EP 05 The Replayable City | 17 | "A real commute" corrected to illustrative. Block callouts, tally, retention tails and data-debt chart labeled as models. Exhibit F (camera count from typed text) cut. Guthrie anchor re-sourced, with status and NBC disclosure. January 6 figures rebuilt and the clemency added. Camera counts and retention corrected. FOIA scoped. Defenses corrected. Anthropic conflict note added. | Yes | Round 3: 44 supported, 5 blocking one-line items (a badge, a chart bar flag, a chart key, correction-note wording, a footer claim), all fixed after round 3, not re-checked | Jared: yes / no |

## Decisions only Jared can make

0. **Post-round-3 fixes.** Both The Seized Record and EP 05 had small fixes applied after the third and final claims round, so the gate shows them blocked on stale verdicts. Choose one: approve a narrow fourth check of only those lines (a few minutes), or override as with PR #15 and #16.

1. **EP 05, Guthrie anchor.** It uses a kidnapping victim's case, which is still open, to make a point about vendor data. It now rests only on public official statements, and it carries the NBC disclosure. Keep it, or replace it with a non-victim example?
2. **The Seized Record, hero image.** Leave the plain texture, or commission a Melophon-made plate?
3. **The withdrawn targeting claim on other pages.** The checker found it on EP 04, EP 07, EP 08, EP 09 and the Claims Atlas. The Runoff Tells' correction now covers only that page. Should those pages go into batch 2 ahead of the pilot order?
4. **Gate exemption for listing pages.** Still open from PR #15 and PR #16.
5. **Title changes.** None proposed in this batch.

## Open items carried forward

- Code change: teach `extract-claims.py` and `site-health.py` the older tag styles (`tag t-fact`, title-case labels, tier labels). Until then, checkers read pages directly.
- EP 05: move the conflict note up beside the Google and Amazon passages (checker's suggestion). Add a Lever Map tile for the records request. Remove the dead Exhibit F script.
- The Runoff Tells: race-card "lane" descriptions are unsourced. The flow, slope and compass charts need an "illustrative" label on the canvas itself.

## Reader-test plan (pilot)

Run the plan after the batch 2 pilot pages ship, so all six forms are tested together.

**Audiences**
- Informed news readers: 5 to 8 people, recruited from subscribers.
- Researchers and newsroom staff: 3 to 5 people.

**Questions, asked after reading each page**
1. What did you discover?
2. What remains uncertain?
3. Where did the story repeat itself?
4. Which interaction helped you understand something?
5. What would you return to find out?

**Measures alongside the answers**
- Completion: reached the method note.
- Return visits within 14 days.
- Saves and shares.
- Evidence use: source links opened, and evidence mode toggled where the page has it.

Longer reading time is not counted as success on its own. It can mean interest, complexity or difficulty.

**Page-specific checks**
- **Seized Record:** can a reader say what the written rule requires, and what is still unknown?
- **Runoff Tells:** can a reader say why a runoff result describes who came back rather than the whole electorate?
- **EP 05:** can a reader say which figures are measured and which are modeled?
