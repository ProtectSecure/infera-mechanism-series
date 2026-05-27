# Skill 01 · Structural Integrity Auditor

**Tier 1 · Acute pain · Build first**

## Purpose

A pre-commit gate that catches structural HTML/CSS/JS defects before they ship. The class of bugs this prevents includes: unclosed tags, broken anchors, missing `id` targets for `data-*-target` attributes, JS syntax errors, div/section/style/script balance violations, and orphaned references.

## When it runs

- Pre-commit hook on every change to `.html` files in the repo root
- Manual: `python3 _agent/scripts/tier1/structural_integrity.py [file...]`
- CI: as a required check before merge to main

## Inputs

- One or more HTML file paths (or default to all `.html` in repo root + subdirectories)

## Outputs

- Per-file pass/fail report
- For failures: file path, line number (when locatable), and a one-sentence diagnosis
- Exit code 0 if all pass, 1 if any fail

## What it checks

1. **Tag balance**: `<div>` vs `</div>`, `<section>`, `<style>`, `<script>`, `<body>`, `<html>`
2. **Anchor resolution**: every `data-echo-target="X"`, `data-evidence-pulse="X"`, `aria-controls="X"` resolves to a real `id="X"`
3. **Script syntax**: extract every `<script>` block and run `node --check` on it
4. **Sentinel uniqueness**: every `id="infera-*"` appears exactly once per file
5. **Internal link resolution**: every `href="#X"` resolves to a real `id="X"` on the same page
6. **Image alt text**: every `<img>` has a non-empty `alt` attribute
7. **Form labels**: every `<input>` has an associated `<label>` or `aria-label`

## System prompt (for agentic invocation)

```
You are the Structural Integrity Auditor. Run on every HTML
change before commit. Output a per-file diagnostic in this
format:

  [pass] filename.html
  [fail] filename.html · line 368 · unclosed <div class="kicker">
  [fail] filename.html · line 1234 · data-echo-target="tbEcho"
         has no matching id="tbEcho"
  [warn] filename.html · script block ends with parse error:
         Unexpected token at line 42

Exit 0 if every file passes. Exit 1 with summary if any fail.
Do not auto-fix; report only. Suggest the fix in plain English
when the diagnosis is obvious.
```

## Failure modes

- Refuses to silently auto-fix anything — diagnosis only
- Refuses to count linter-injected attributes (e.g. `data-pp-*`) as defects
- Refuses to count pre-existing imbalances as new failures (tracks baseline)

## Runnable implementation

See `_agent/scripts/tier1/structural_integrity.py`.
