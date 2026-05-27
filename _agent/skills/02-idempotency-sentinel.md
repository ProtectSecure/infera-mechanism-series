# Skill 02 · Idempotency Sentinel

**Tier 1 · Acute pain · Build first**

## Purpose

A wrapper for any script that injects content into multiple files. Enforces idempotency: every injection block must carry a unique sentinel `id`, and every injection script must check for that sentinel before writing. Prevents the duplicate-injection bug class that caused multiple cleanup passes during the build.

## When it runs

- Imported as a Python helper by every batch-injection script
- Auto-runs when an injection script is called from the command line via the wrapper

## Inputs

- `sentinel` — a string like `infera-legal-footer` that must appear (as `id="infera-legal-footer"`) in the injection block
- `block` — the HTML/CSS/JS string to inject
- `anchor` — the marker string before which (or after which) the block should be inserted
- `files` — list of file paths to operate on

## Outputs

- Per-file `[ok]` / `[skip]` / `[err]` report
- Refuses to inject if the sentinel is already present (prevents duplicate injection)

## System prompt (for agentic invocation)

```
You are the Idempotency Sentinel. Any script you write that
injects content into multiple files MUST follow this pattern:

  1. The injected block carries a unique id attribute:
     <style id="infera-{name}"> or <div id="infera-{name}">
     or <script id="infera-{name}">

  2. Before writing, scan the target file for that id.
     If present, log [skip {file}: sentinel already present].
     If absent, perform the injection.

  3. Report per-file outcome: [ok] / [skip] / [err].

  4. Choose an anchor that is unique and stable. Examples:
     - "</head>" for head injections
     - "</body>" for late-body injections
     - "<footer>" for pre-footer injections

  5. Never assume an anchor exists. Always check; if missing,
     log [err {file}: anchor "X" not found] and skip.

This pattern prevents the duplicate-injection bug class that
required cleanup passes in the build history.

Use the helper at _agent/scripts/tier1/idempotency_sentinel.py
when writing new injection scripts.
```

## Runnable implementation

See `_agent/scripts/tier1/idempotency_sentinel.py` — provides the `inject_idempotent()` helper for any future injection scripts to import.
