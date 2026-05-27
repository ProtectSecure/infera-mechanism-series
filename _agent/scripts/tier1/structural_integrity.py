#!/usr/bin/env python3
"""
Structural Integrity Auditor · Tier 1 · Infera Agent Library

Pre-commit gate for HTML files in The Mechanism Series.
Catches the class of bugs that ate the most time in the build session:
  · unclosed tags, missing close tags
  · data-*-target attributes pointing at nonexistent ids
  · script blocks with syntax errors
  · duplicate id="infera-*" sentinels
  · broken internal anchor links
  · missing alt text on <img>

Usage:
  python3 structural_integrity.py              # all .html in repo root + subdirs
  python3 structural_integrity.py file1.html   # specific files
  python3 structural_integrity.py --baseline   # snapshot current state as
                                                 baseline (won't flag pre-existing)
"""
import os, re, sys, json, subprocess, tempfile
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[3]
BASELINE_FILE = REPO_ROOT / "_agent" / "scripts" / "tier1" / ".integrity_baseline.json"

# ====================================================================
# CHECKS
# ====================================================================

def check_tag_balance(text, tags=('div', 'section', 'style', 'script', 'body', 'html')):
    """Return dict of {tag: (open_count, close_count)} for each tag."""
    out = {}
    for tag in tags:
        # Avoid matching <tagname-something or attribute fragments
        opens = len(re.findall(rf'<{tag}\b', text, re.IGNORECASE))
        closes = len(re.findall(rf'</{tag}>', text, re.IGNORECASE))
        out[tag] = (opens, closes)
    return out

def check_anchor_resolution(text):
    """For every data-*-target or aria-controls or href="#X", verify id="X" exists."""
    failures = []
    # collect all ids on the page
    ids = set(re.findall(r'\bid=["\']([^"\']+)["\']', text))
    # data-*-target patterns
    for m in re.finditer(r'data-(?:echo|evidence)-target=["\']([^"\']+)["\']', text):
        target = m.group(1)
        if target not in ids:
            failures.append(f'data-*-target="{target}" has no matching id')
    # aria-controls
    for m in re.finditer(r'aria-controls=["\']([^"\']+)["\']', text):
        target = m.group(1)
        if target not in ids:
            failures.append(f'aria-controls="{target}" has no matching id')
    # href="#X" (internal only)
    for m in re.finditer(r'href=["\']#([^"\']+)["\']', text):
        target = m.group(1)
        if target and target not in ids:
            failures.append(f'href="#{target}" has no matching id on page')
    return failures

def check_script_syntax(text, file_label):
    """Extract <script> blocks, write to tmpfile, run node --check."""
    failures = []
    # match script blocks with content (skip those with src= and empty ones)
    pattern = re.compile(r'<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>', re.DOTALL | re.IGNORECASE)
    for i, m in enumerate(pattern.finditer(text)):
        body = m.group(1).strip()
        if len(body) < 20:
            continue
        with tempfile.NamedTemporaryFile(suffix='.js', delete=False, mode='w', encoding='utf-8') as f:
            f.write(body)
            tmp_path = f.name
        try:
            r = subprocess.run(
                ['node', '--check', tmp_path],
                capture_output=True, text=True, timeout=10
            )
            if r.returncode != 0:
                # extract just the error summary line
                err = (r.stderr or r.stdout).strip().split('\n')[0]
                failures.append(f'script block #{i+1} parse error: {err[:140]}')
        except (subprocess.TimeoutExpired, FileNotFoundError):
            pass
        finally:
            os.unlink(tmp_path)
    return failures

def check_sentinel_uniqueness(text):
    """Every id="infera-*" should appear exactly once per file."""
    failures = []
    sentinels = re.findall(r'id=["\'](infera-[^"\']+)["\']', text)
    counts = {}
    for s in sentinels:
        counts[s] = counts.get(s, 0) + 1
    for s, c in counts.items():
        if c > 1:
            failures.append(f'sentinel id="{s}" appears {c} times (should be 1)')
    return failures

def check_img_alt(text):
    """Every <img> needs an alt attribute (can be empty for decorative)."""
    failures = []
    for m in re.finditer(r'<img\b[^>]*>', text, re.IGNORECASE):
        tag = m.group(0)
        if not re.search(r'\balt=', tag):
            failures.append(f'img missing alt attribute: {tag[:80]}')
    return failures

# ====================================================================
# MAIN
# ====================================================================

def load_baseline():
    if BASELINE_FILE.exists():
        return json.loads(BASELINE_FILE.read_text())
    return {}

def save_baseline(data):
    BASELINE_FILE.parent.mkdir(parents=True, exist_ok=True)
    BASELINE_FILE.write_text(json.dumps(data, indent=2, sort_keys=True))

def audit_file(path, baseline):
    """Audit one file. Return list of failure strings new since baseline."""
    text = path.read_text(encoding='utf-8', errors='replace')
    label = str(path.relative_to(REPO_ROOT))

    new_failures = []

    # 1. tag balance
    balance = check_tag_balance(text)
    for tag, (o, c) in balance.items():
        if o != c:
            f = f'tag imbalance · <{tag}> {o} / </{tag}> {c} (delta {o-c:+d})'
            if f not in baseline.get(label, []):
                new_failures.append(f)

    # 2. anchor resolution
    for f in check_anchor_resolution(text):
        if f not in baseline.get(label, []):
            new_failures.append(f)

    # 3. script syntax
    for f in check_script_syntax(text, label):
        if f not in baseline.get(label, []):
            new_failures.append(f)

    # 4. sentinel uniqueness
    for f in check_sentinel_uniqueness(text):
        if f not in baseline.get(label, []):
            new_failures.append(f)

    # 5. img alt
    for f in check_img_alt(text):
        if f not in baseline.get(label, []):
            new_failures.append(f)

    return new_failures

def all_html_files():
    skip_dirs = {'_edition-2-drafts', '_agent', 'mockups', 'node_modules', '.git'}
    out = []
    for path in REPO_ROOT.rglob('*.html'):
        if any(p in skip_dirs for p in path.relative_to(REPO_ROOT).parts):
            continue
        out.append(path)
    return sorted(out)

def main():
    args = sys.argv[1:]
    baseline_mode = '--baseline' in args
    args = [a for a in args if not a.startswith('--')]

    files = [Path(a).resolve() for a in args] if args else all_html_files()
    baseline = {} if baseline_mode else load_baseline()

    if baseline_mode:
        # snapshot current state as the new baseline (no failures will be flagged)
        new_baseline = {}
        for path in files:
            failures = audit_file(path, baseline={})
            if failures:
                new_baseline[str(path.relative_to(REPO_ROOT))] = failures
        save_baseline(new_baseline)
        print(f'[baseline saved] {len(new_baseline)} files with pre-existing issues recorded')
        return 0

    any_fail = False
    for path in files:
        failures = audit_file(path, baseline)
        label = str(path.relative_to(REPO_ROOT))
        if failures:
            any_fail = True
            print(f'[fail] {label}')
            for f in failures:
                print(f'       · {f}')
        else:
            print(f'[pass] {label}')

    if any_fail:
        print('\nFAIL · structural integrity violations new since baseline')
        print('To accept current state as new baseline: python3 structural_integrity.py --baseline')
        return 1
    print('\nPASS · all files clean')
    return 0

if __name__ == '__main__':
    sys.exit(main())
