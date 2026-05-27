#!/usr/bin/env python3
"""
Idempotency Sentinel · Tier 1 · Infera Agent Library

Helper for any batch-injection script. Enforces that every injected
block carries a unique sentinel id and that the script checks for
that sentinel before writing.

Usage:
  from idempotency_sentinel import inject_idempotent

  result = inject_idempotent(
      files=['index.html', 'episode-01.html', ...],
      block='<style id="infera-mything">...</style>',
      anchor='</head>',          # insertion point
      anchor_position='before',  # 'before' or 'after'
      sentinel='infera-mything', # the unique id in the block
  )
  # returns dict: {file: 'ok' | 'skip' | 'err: ...'}
"""
import re
from pathlib import Path

def find_sentinel(text, sentinel):
    """Return True if id="{sentinel}" exists in text (any quote style)."""
    if not sentinel.startswith('infera-'):
        # enforce sentinel naming convention
        raise ValueError(f"sentinel must start with 'infera-': got {sentinel!r}")
    pattern = re.compile(rf'\bid=["\']{re.escape(sentinel)}["\']')
    return bool(pattern.search(text))

def inject_idempotent(files, block, anchor, sentinel, anchor_position='before',
                      verbose=True):
    """
    Inject `block` into each of `files` near `anchor`. Idempotent via `sentinel`.

    Args:
        files: list of file paths (str or Path)
        block: the HTML/CSS/JS string to inject (must contain id="{sentinel}")
        anchor: string marker to locate insertion point (e.g. '</head>')
        sentinel: unique id of the injected block (must start with 'infera-')
        anchor_position: 'before' or 'after' (relative to anchor)
        verbose: print per-file outcome

    Returns:
        dict: {file: 'ok' | 'skip' | 'err: reason'}
    """
    if not sentinel.startswith('infera-'):
        raise ValueError(f"sentinel must start with 'infera-': got {sentinel!r}")
    if f'id="{sentinel}"' not in block and f"id='{sentinel}'" not in block:
        raise ValueError(
            f"block does not contain id={sentinel!r}: every injection block "
            f"must carry its sentinel id"
        )
    if anchor_position not in ('before', 'after'):
        raise ValueError(f"anchor_position must be 'before' or 'after'")

    results = {}
    for fp in files:
        path = Path(fp)
        label = str(path)
        if not path.exists():
            results[label] = 'err: file missing'
            if verbose: print(f'[err]  {label} · file missing')
            continue
        text = path.read_text(encoding='utf-8', errors='replace')
        if find_sentinel(text, sentinel):
            results[label] = 'skip'
            if verbose: print(f'[skip] {label} · sentinel {sentinel} already present')
            continue
        idx = text.find(anchor)
        if idx == -1:
            results[label] = f'err: anchor {anchor!r} not found'
            if verbose: print(f'[err]  {label} · anchor {anchor!r} not found')
            continue
        if anchor_position == 'before':
            new_text = text[:idx] + block + ('\n' if not block.endswith('\n') else '') + text[idx:]
        else:  # after
            end = idx + len(anchor)
            new_text = text[:end] + ('\n' if not block.startswith('\n') else '') + block + text[end:]
        path.write_text(new_text, encoding='utf-8')
        results[label] = 'ok'
        if verbose: print(f'[ok]   {label}')
    return results

def remove_idempotent(files, sentinel, verbose=True):
    """
    Remove the block bearing id="{sentinel}" from each file.
    Block boundaries: the element opening the sentinel id and its matching close.
    Works for <style>, <script>, <div>, etc.

    Returns: dict {file: 'ok' | 'skip' | 'err: reason'}
    """
    results = {}
    for fp in files:
        path = Path(fp)
        label = str(path)
        if not path.exists():
            results[label] = 'err: file missing'
            if verbose: print(f'[err]  {label} · file missing')
            continue
        text = path.read_text(encoding='utf-8', errors='replace')
        # Find the opening tag containing id="sentinel"
        m = re.search(rf'<([a-zA-Z][a-zA-Z0-9-]*)\b[^>]*\bid=["\']' + re.escape(sentinel) + r'["\'][^>]*>', text)
        if not m:
            results[label] = 'skip'
            if verbose: print(f'[skip] {label} · sentinel not present')
            continue
        tag = m.group(1)
        open_start = m.start()
        # find matching close
        close_marker = f'</{tag}>'
        close_idx = text.find(close_marker, m.end())
        if close_idx == -1:
            results[label] = f'err: matching </{tag}> not found'
            if verbose: print(f'[err]  {label} · matching </{tag}> not found')
            continue
        close_end = close_idx + len(close_marker)
        new_text = text[:open_start] + text[close_end:]
        path.write_text(new_text, encoding='utf-8')
        results[label] = 'ok'
        if verbose: print(f'[ok]   {label} · removed')
    return results

if __name__ == '__main__':
    # quick self-test
    import sys
    print("idempotency_sentinel — helper module")
    print("Import and use inject_idempotent(files=..., block=..., anchor=..., sentinel='infera-...')")
    print()
    print("Example:")
    print("  from _agent.scripts.tier1.idempotency_sentinel import inject_idempotent")
    print("  inject_idempotent(")
    print("    files=['index.html', 'episode-01.html'],")
    print("    block='<style id=\"infera-foo\">/* css */</style>',")
    print("    anchor='</head>',")
    print("    sentinel='infera-foo',")
    print("  )")
