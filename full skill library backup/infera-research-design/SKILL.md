---
name: infera-research-design
description: For any ad-hoc finding or hypothesis surfaced by Infera, propose the doctoral-grade study design that would validate or refute it. Maps the question to the canonical political-science / quantitative-social-science method (difference-in-differences, regression discontinuity, synthetic control, instrumental variables, propensity-score matching, multilevel models, latent class analysis, network analysis, spatial econometrics, structural break detection, Bayesian hierarchical models, causal forests). Specifies the identification strategy, the null and alternate hypotheses, the threats to internal/external/construct/statistical-conclusion validity (Cook & Campbell), and at least one robustness check that would change the inference if it failed. Use when Infera has detected a pattern and needs to know how a methodologist would interrogate it before treating it as established, or before publishing any causal claim.
---

# Infera Research Design

This is the skill that prevents Infera from substituting confident
correlation for actual causal evidence. When the system detects
something — a precinct shift, a convergence finding, a civic pulse
spike — the question "what would it take to actually believe this
causally?" is answered here. The output is a methodologist's
interrogation: hypothesis, identification strategy, model, threats to
validity, robustness checks.

The skill does not RUN the analysis. It specifies the analysis. The
running is for a quantitative team or downstream tooling.

## When to use

- Infera has detected a pattern that someone wants to call causal.
- Before publishing any claim of the form "X is causing Y" — even when
  the claim is hedged.
- When a producer asks "how would a political scientist test this?"
- Before committing reporting resources to a hypothesis, to confirm the
  hypothesis is testable with available data.
- For internal calibration: did our editorial language outrun our
  evidence?

## When NOT to use

- For descriptive findings ("Cobb County shifted 3 points"). The
  cross-cycle skill handles descriptive shift; this skill is for the
  causal layer on top.
- For pure data lookups.
- For real-time election-night coverage where methodologically rigorous
  inference is impossible.

## The methodology library

Loaded from `data/political-science-methods.json`. Includes:

| Method | Question it answers | Identification strategy | When it fits |
|---|---|---|---|
| Difference-in-Differences (DiD) | Did the treatment cause the outcome change? | Parallel trends pre-treatment | Policy change with clear before/after, treated vs untreated units |
| Regression Discontinuity (RDD) | What's the local effect at a threshold? | Continuity at cutoff | Eligibility rules with sharp cutoffs (close elections, vote share thresholds) |
| Synthetic Control (SCM) | What would have happened absent the treatment? | Weighted donor pool match on pre-treatment trajectories | Single-unit treatment with rich pre-treatment data |
| Instrumental Variables (IV) | Causal effect when treatment is endogenous | Exogenous instrument that affects treatment but not outcome directly | When unobserved confounders bias OLS |
| Propensity Score Matching (PSM) | Treatment effect on observably similar units | Unconfoundedness on observables | Selection on observables, large samples |
| Multilevel / Hierarchical Models (MLM) | Effects at nested levels (precinct in county in state) | Random effects partition variance | Nested data with within- and between-group variation |
| Bayesian Hierarchical Models | Same as MLM with prior structure | Priors + posterior updating | When sample sizes are uneven across groups |
| Latent Class Analysis (LCA) | What sub-populations exist in the data? | Mixture-model identification | Voter typology that goes beyond demographic crosstabs |
| Time-Series Structural Break Detection | When did the regime change? | Chow / CUSUM / Bai-Perron tests | Identifying when an issue's salience or a candidate's coalition shifted |
| Causal Forests | Heterogeneous treatment effects across subgroups | Honest random forest splitting | Discovering which subgroups respond differently to a treatment |
| Network Analysis | Who's connected to whom and how does it matter? | Graph centrality, community detection | Endorsement networks, donation flows, co-sponsorship |
| Spatial Econometrics (SAR / SEM) | Spatial spillover effects | Spatial weight matrix | Precinct-level analysis where geography matters |

## Hard rules

1. **State the null hypothesis explicitly.** Every research design
   names the null in plain language. "No effect" is fine; "no
   difference between cohort A and B" is fine. Implicit nulls are
   forbidden.
2. **Identification strategy precedes the model.** Always specify HOW
   the design isolates the causal effect before naming the estimator.
   The estimator is a calculation; the identification is the argument.
3. **Cook & Campbell threats are mandatory.** Every design enumerates
   threats to internal validity (history, maturation, selection,
   regression to the mean, attrition, instrumentation, testing,
   interaction), external validity (generalizability), construct
   validity (does the measure measure the construct), and statistical
   conclusion validity (power, multiple testing, reliability).
4. **Robustness check or no inference.** The design proposes at least
   one robustness check that, if it failed, would change the inference.
   No robustness path = no causal claim.
5. **Pre-registration is the gold standard.** When the design is to
   be implemented, recommend pre-registering hypotheses and analysis
   choices before looking at outcome data.
6. **Acknowledge what cannot be inferred.** Some questions have no
   identification strategy from available data. The honest output is
   "this is not testable with current evidence; here's what data would
   be required."

## Output

```markdown
## Research design: {question}

### 1. The substantive question
{plain-language statement of what we want to know causally}

### 2. Hypotheses
- **Null (H₀):** {explicit no-effect statement}
- **Alternate (H₁):** {the effect being tested}
- **Direction:** {one-sided or two-sided, justified}

### 3. Identification strategy
{how the design isolates the causal effect — this is the argument, not
the calculation. Must reference a specific assumption: parallel trends,
continuity at cutoff, exogeneity of the instrument, unconfoundedness on
observables, etc.}

### 4. Recommended estimator
- **Primary:** {DiD / RDD / SCM / IV / PSM / MLM / etc.}
- **Why:** {fit to question and data structure}
- **Specification:** {model equation in plain notation}

### 5. Data requirements
| Variable | Source | Granularity | Years | Already have? |
|---|---|---|---|---|
| Outcome Y | ... | precinct-week | 2018-2026 | yes / partial / no |
| Treatment T | ... | ... | ... | ... |
| Controls X | ... | ... | ... | ... |

### 6. Threats to validity (Cook & Campbell)
- **Internal validity** (does the design support a causal claim?)
  - History: {assess}
  - Maturation: {assess}
  - Selection: {assess}
  - Regression to mean: {assess}
  - Attrition: {assess}
- **External validity** (does it generalize?)
  - Geographic: {assess}
  - Temporal: {assess}
- **Construct validity** (do measures capture the construct?)
  - {assess per key variable}
- **Statistical conclusion validity** (is the test powered?)
  - Effect size detectable: {min effect size given N}
  - Multiple testing: {family-wise correction plan}

### 7. Robustness checks
At least one check that would change the inference if it failed:
- **Check 1:** {what to re-run with what change}
  - If result holds: {strengthens inference}
  - If result flips: {falsifies primary finding}
- **Check 2:** (optional) {...}

### 8. Pre-registration recommendation
{what to lock in before looking at outcome data: outcome definition,
sample, model specification, multiple-testing correction, decision
rules}

### 9. What this design can and cannot answer
- Can: {the specific causal claim the design supports if it works}
- Cannot: {generalizations, alternate-population claims, mechanism
  claims that require additional design layers}

### 10. Honest fallback
{if the question is not testable with available data: name what data
would be needed and acknowledge that the current evidence supports
only descriptive, not causal, claims}
```

## How Claude should execute

1. Parse the hypothesis. Strip it to a single sentence with a clear
   treatment, outcome, and population.
2. Write the null and alternate hypotheses explicitly.
3. Match the question shape to a method in `data/political-science-methods.json`:
   - Policy change with clear before/after → DiD
   - Threshold-based eligibility → RDD
   - Single-unit treatment → SCM
   - Endogenous treatment → IV (and identify the instrument)
   - Selection-on-observables, large N → PSM
   - Nested data → MLM
   - Sub-population discovery → LCA
   - Network structure relevant → network analysis
   - Spatial spillover plausible → spatial econometrics
4. Write the identification strategy as an argument referencing a
   specific assumption.
5. Specify the estimator and model.
6. Enumerate data requirements with sources and gaps.
7. Walk every Cook & Campbell threat in order. Do not skip threats.
8. Propose at least one robustness check that could flip the
   inference.
9. Recommend pre-registration commitments.
10. State what the design can and cannot answer.
11. If no testable design exists from available data, output the
    "Honest fallback" section and stop.

## Composing with other skills

- `infera-cross-cycle-voter-shift` produces a descriptive shift; this
  skill specifies the causal design that would test WHY the shift
  occurred.
- `infera-civic-pulse` shows correlation between engagement and
  outcomes; this skill proposes the DiD or IV design that would test
  the causal arrow.
- `infera-common-ground-detector` shows convergence; this skill
  specifies how to test whether the convergence was caused by a
  shared event (process tracing or DiD with shared-shock as
  treatment).
- `infera-blind-spot-auditor` and this skill are complementary —
  blind-spot audit is about what's missing in the data; research
  design is about what inference structure the data could support.
- `infera-investigative-method` produces the qualitative
  investigation; this skill produces the quantitative interrogation.
  Many findings benefit from both.

## Files

- `SKILL.md` — this file
- `data/political-science-methods.json` — the canonical methodology
  library
- `scripts/` — empty; LLM-only skill
