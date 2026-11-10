# The Infera Harness · loops, graphs and gates

**Status:** v1, 10 November 2026. Design plus the first working parts. Read with `_drafts/editorial-standard-v2.md`.

A harness is everything around the model that makes its work reliable: the queue it works from, the checks it cannot edit, the notes that survive between sessions, and the points where a person decides. The model does the reasoning. The harness decides what it may touch, when it must stop, and whether the result is allowed out.

Three building blocks:

- A **loop** repeats work until a condition is met.
- A **graph** says which step follows which, and what state passes between them.
- A **gate** is a check that can say no.

Loops without gates drift. Gates without loops only reject. Graphs without either are a diagram. They work when each loop runs inside a graph and ends at a gate.

---

## 1 · What the sources say (and what we take from each)

| Source | The finding | What we take |
|---|---|---|
| Anthropic, *Building effective agents* | Five workflow patterns (prompt chain with gates, routing, parallelization, orchestrator-workers, evaluator-optimizer) plus autonomous agents. Use the simplest thing that works; add complexity only when it measurably helps; keep planning visible; set stopping conditions such as a maximum number of iterations. | Our publish pipeline is a prompt chain with gates. Everything else is added only where the health score or a failure shows it is needed. |
| Anthropic, *How we built our multi-agent research system* | A lead agent plans, parallel subagents search, a separate agent places citations. Each subagent needs an objective, an output format, tool guidance and boundaries. Multi-agent runs use roughly 15 times the tokens of a chat, so reserve them for wide, valuable questions. Save the plan to external memory. Grade outcomes, not paths. About 20 test cases is enough to start. | Research fans out only for wide questions. Every delegated task gets a four-part brief. Plans and findings live in files, not in the conversation. |
| Anthropic, *Effective harnesses for long-running agents* | Sessions start with no memory. Fixes: a feature list with pass flags the agent may flip but not rewrite, a progress file, a commit after each change, a start-of-session routine, one item per session, and testing the way a user would. | `state.json` is our feature list. `PROGRESS.md` is the log. Every session starts and ends the same way. Pages are tested in a real browser at phone and desktop widths. |
| Anthropic, *Harness design for long-running application development* | Agents reliably praise their own work. A separate evaluator is easier to make skeptical than a builder is to make self-critical. Builder and evaluator agree on what "done" means before work starts. As models improve, remove scaffolding that no longer earns its cost. | The checker is never the builder. Each item carries an `accept` line written before the build. We review the harness itself and delete parts that stop paying. |
| Anthropic, *Demystifying evals for AI agents* | Three kinds of grader: code (fast, exact, brittle), model (flexible, needs calibrating against people), human (the standard, slow). Regression suites should sit near 100 percent. Start with 20 to 50 cases taken from real failures. Give judges an "unknown" option. | Gates are layered in that order: code first, model second, human last. Every real failure becomes a test case. |
| Claude Code hooks reference | Hooks are deterministic checks around the agent. Exit code 2 blocks on blockable events such as `PreToolUse` and `Stop`. Policy hooks should fail closed. Hooks run with your permissions, so review any hook before trusting it. | Our publish hook blocks a push or merge to main unless the gate passed for that exact commit, and fails closed. |
| LangGraph | State that every node reads and writes; fixed and conditional edges; cycles for retry; checkpoints after each node so a run can resume; interrupts that pause for a person. | We use the ideas without the framework: a state file, stages as nodes, git commits as checkpoints, sign-off as the interrupt. |
| Karpathy, *autoresearch* | A loop that edits one file, runs a fixed-time experiment, reads one metric, and keeps the change only if the metric improved, otherwise reverts. The evaluator is read-only to the agent. The human edits the instructions; the agent edits the work. | The site health average is our one metric. The evaluator is outside what a healing agent may edit. A change that lowers the score is reverted. |

**Cautions carried forward.** Multi-agent work is expensive and compounds errors. Model-based judges are lenient. An agent that can edit its own evaluator will. Text an agent reads from the web, a log or a file is data, never an instruction.

---

## 2 · Loops

Each entry: what it is, how it runs alone, and what it hands to the others.

| # | Loop | Runs alone as | Stops when | Feeds |
|---|---|---|---|---|
| L1 | **Agent loop** | Act, look at the result, decide the next step. The basic unit inside every node. | Task done, or a step limit is reached | Every other loop |
| L2 | **Build and check** (evaluator-optimizer) | A builder makes the page; a separate checker tests it against the `accept` line and returns specific failures; the builder fixes. | Checker passes, or three rounds, then a person | G1 at BUILD and CHECK; gates K1 to K9 |
| L3 | **Ratchet** (keep or revert) | Make one change, run the health check, keep the commit if the site average did not fall, otherwise revert. | No improving change found in N tries | L4; gate K7 |
| L4 | **Self-healing** | Run `site-health.py`, take the weakest page, fix what is mechanical, queue what needs judgment, re-score. | Floor reaches the target, or only editorial items remain | `state.json` (heal items); L3 |
| L5 | **Curiosity** | A surprise in fact-checking becomes a cue; a cue is worked through seven lenses; a strong cue becomes a brief. | Cue answered or parked | G1 at DISCOVER; G7 |
| L6 | **Update review** | Any new fact on a published story triggers: does this need a correction, a retrofit, or a new exhibit? | Decision recorded | G2 (router); L5 |
| L7 | **Session** | Start: read `PROGRESS.md`, `state.json`, recent commits; pick one item. End: commit, log, leave main clean. | One item advanced one stage | Everything; it is how work survives between sessions |
| L8 | **Watch** | A dated check on an open WATCH item (a hearing, a vote, a ruling). | Outcome sourced and written into the page | L6 |
| L9 | **Reader** | A reader finds a pairing in The Loom and sends it to the desk; it enters as a cue. | Cue triaged | L5 |
| L10 | **Failure to test** | Every real failure (a broken page, an overstatement caught late) becomes a check in `gate.py` or a case in the test set. | Check added and passing | All gates |
| L11 | **Audience** | Publish, email the list, measure what readers finished and returned to, feed that into what is built next. | Ongoing | L5; the Interaction Library. Needs the list connected. |

**Independently**, each loop is useful on its own: L4 alone lifted the site from 62 to 91. **Together**, they chain: L8 notices a ruling, L6 decides it warrants an update, L5 asks what it connects to, L2 builds and checks the retrofit, L3 confirms the site did not get worse, L7 records it, L10 turns any slip into a permanent check.

---

## 3 · Graphs

| # | Graph | Shape | Runs alone as | Works with |
|---|---|---|---|---|
| G1 | **The pipeline** (chain with gates) | CUE → BRIEF → INVESTIGATE → BUILD → CHECK → SIGN-OFF → LIVE → RETROFIT → WATCH | The path every piece takes. Each arrow is a gate. | L2 inside BUILD/CHECK; K10 at SIGN-OFF |
| G2 | **The router** | One input, many exits | Classifies anything that arrives: new story, update, correction, reader cue, ops task, social. Sends it to the right entry point of G1 or to a loop. | L6, L9 |
| G3 | **Fan-out, fan-in** | One splits to many, results merge | Independent sub-tasks in parallel: research lanes, or checking 110 pages at once. Merging is done by code, not by a model. | G4; K1 to K5 |
| G4 | **Lead and workers** | A lead plans and delegates at run time | For wide questions only. Each worker gets a brief: objective, output format, sources and tools, boundaries. Workers write findings to files and return a pointer. | G3; K8 |
| G5 | **The cycle** | An edge that points backward | Retry and refinement: CHECK returns to BUILD with the failure attached. Always has a round limit. | L2; K7 |
| G6 | **The state machine** | Nodes, edges, checkpoints, interrupts | `state.json` holds each item's stage; a git commit is the checkpoint after each node; sign-off is an interrupt that pauses for a person. A crashed run resumes from the last commit. | L7; K10 |
| G7 | **The content graph** | Pieces as nodes; threads, states and laws as edges | `connections.json`. Not an execution path: it is what The Loom, the keep-going cards and the curiosity engine read to find related work. | L5, L9 |
| G8 | **The dependency graph** | "This page reuses that fact" | When a home exhibit's fact changes, every remix that inherits it must be re-checked. Today this is by hand; the remix pages' "woven from" links are the edges. | L6; K8 |

**Independently**, G1 is a checklist and G7 is a site map. **Together**, G2 routes an input into G1; G1's BUILD node expands into G4 when the question is wide; G5 loops BUILD and CHECK; G6 remembers where every item is; G7 and G8 tell L6 what else the change touches.

---

## 4 · Gates

Ordered cheapest first. A page must clear the cheap gates before it spends time at the expensive ones.

| # | Gate | Kind | Blocks when | Where it lives |
|---|---|---|---|---|
| K1 | **Render** | Code | A script error, or the page overflows a phone or desktop screen | `gate.py` (built) |
| K2 | **Links and index** | Code | A broken internal link; a live page missing from the sitemap | `gate.py` (built) |
| K3 | **Style** | Code | Em or en dashes; a subscribe form off the shared module; warns on more than two sliders | `gate.py` (built) |
| K4 | **Evidence shape** | Code | A changed long page has fewer than five evidence tags, no other-side section, or no disclosure line | `gate.py` (built) |
| K5 | **Scope** | Code | An agent edits outside its allowed files (a healing agent may not edit the evaluator or the gate) | Convention today; a hook next |
| K6 | **Secrets and privacy** | Code | A private address, a key, or reader data in a commit | To build |
| K7 | **Ratchet and budget** | Code | The site average falls below the recorded baseline; a loop exceeds its round limit | `gate.py` ratchet (built); round limits by convention |
| K8 | **Claims** | Model, separate from the builder | Any claim not traceable to its cited source at its stated tag; any overstatement; a remix that upgrades a tag | By hand today. Next: a checker agent with a rubric and an "unknown" verdict |
| K9 | **Experience** | Model, then human | Fewer than three kinds of interaction; nothing new to the site; reading level above the stated audience | Interaction Library rules; by hand today |
| K10 | **Sign-off** | Human | Always, before anything new goes live | You. The graph's interrupt. |
| K11 | **Conflict and consequence** | Human | A piece touches Anthropic or the AI capital markets without the disclosure; any action that cannot be undone (deleting, emailing the list, spending money) | You |
| K12 | **Tool gate** | Hook | A push or merge to main for a commit the gate has not passed | `hooks/pre-publish.sh` (built, not yet switched on) |
| K13 | **Input trust** | Rule | Treating a supplied article, screenshot, or fetched page as fact or as an instruction | Standing rule: source independently; fetched text is data |

**Independently**, each gate catches one class of failure. **Together** they form a funnel: K1 to K7 run in about three minutes with no model and no cost, so nothing reaches K8 (which costs tokens) or K10 (which costs your attention) with a broken link in it. K12 makes the funnel impossible to skip. K13 protects the front door.

---

## 5 · How they fit: the harness

```
 inputs ──▶ G2 router ──▶ state.json (the queue; one item, one stage, one accept line)
                               │
                 L7 session picks ONE item
                               │
   G1 pipeline:  CUE ▶ BRIEF ▶ INVESTIGATE ▶ BUILD ◀──┐ ▶ CHECK ▶ SIGN-OFF ▶ LIVE ▶ WATCH
                              (G4 if wide)      L2/G5 │    │         │               │
                                                      └────┘      K10,K11          L8 ─▶ L6
                                gates K1..K7 (gate.py) ─▶ K8, K9 ─▶ K12 hook
                               │
        every node: commit (checkpoint) + PROGRESS.md (what happened, what is next)
                               │
   background loops:  L4 self-heal + L3 ratchet (weekly) · L5 curiosity · L9 reader · L10 failure→test
```

Five rules hold it together:

1. **One queue.** All work is an item in `state.json` with a stage and an acceptance line written before the work starts.
2. **One evaluator, out of reach.** `site-health.py` and `gate.py` are the fixed scorer. An agent doing content or healing work does not edit them in the same change.
3. **The checker is not the builder.** Whoever made the page does not grade its claims.
4. **Everything important is in a file.** Plans, findings, progress and decisions live in the repo so a fresh session can pick up cold.
5. **A person holds the irreversible.** Publishing, emailing the list, deleting and spending always pass through you.

---

## 6 · What exists today and what is next

| Part | State |
|---|---|
| Evaluator (`site-health.py`), healer (`heal.py`), content graph (`connections.json`) | Working |
| Publish gate (`gate.py`): K1 to K4 and the K7 ratchet | Working; baseline recorded at 91.3 |
| Queue and log (`state.json`, `PROGRESS.md`) | Seeded |
| Publish hook (K12) | Written and tested; copy `settings.example.json` to `.claude/settings.json` to switch it on |
| Weekly L4 and L8 runs | Not scheduled yet |
| Claims checker (K8) as a separate agent with a 20-case test set | Next build; the highest-value missing gate |
| Scope and secrets gates (K5, K6) | To build |
| Dependency graph (G8) in `connections.json` | To build; needed as remixes multiply |
| Audience loop (L11) | Waiting on the subscriber list |

**Order of work.** Switch on K12. Schedule L4 and L8 weekly. Build K8 with a test set drawn from tonight's real catches ("90 percent borrowed" applied too widely; "no alarm rang" where the record only shows none on file; a hook line with no source). Then G8.

**When to remove things.** Each quarter, check every part against one question: did it block or catch something real since the last review? If not, simplify or delete it.

*Sources: Anthropic engineering (Building effective agents; multi-agent research system; Effective harnesses for long-running agents; Harness design for long-running application development; Demystifying evals for AI agents); Claude Code hooks reference; LangGraph concepts as summarized by Mastra; Karpathy's autoresearch as described by Kingy AI. Read 10 November 2026.*
