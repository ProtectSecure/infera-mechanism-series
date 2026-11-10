#!/usr/bin/env python3
"""The publish gate. Deterministic, outside any agent's reach, fails closed.
Run before any merge to main:   python3 _agent/scripts/gate.py [--fast] [--update-baseline]
Exit 0 = may publish. Exit 2 = blocked (reasons on stderr), the same convention Claude Code hooks use.

Site-wide hard gates (any page):   script errors, phone or desktop overflow, broken internal links,
                                   em/en dashes, a subscribe form not on the shared module.
Changed-page gates (vs origin/main, long pages): evidence tags, an other-side section, the disclosure
                                   line, a subscribe path, noindex left on a linked page.
Claims (K8):                       a changed long page needs a current verdict file from the claims-checker
                                   agent with no OVERSTATED, CONTRADICTED, UNSUPPORTED or WRONG_TAG. --no-claims skips.
Ratchet (keep-or-revert):          the site average may not fall below the recorded baseline.
"""
import json, os, subprocess, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')); os.chdir(ROOT)
BASE = '_agent/harness/baseline.json'
args = ['python3', '_agent/scripts/site-health.py'] + (['--no-render'] if '--fast' in sys.argv else [])
r = subprocess.run(args, capture_output=True, text=True)
if r.returncode != 0: sys.stderr.write('GATE BLOCKED: health check crashed\n' + r.stderr[-800:]); sys.exit(2)
pages = json.load(open('_drafts/site-health.json'))['pages']
try: changed = set(subprocess.run(['git', 'diff', '--name-only', 'origin/main...HEAD'], capture_output=True, text=True).stdout.split()) | set(subprocess.run(['git', 'diff', '--name-only', 'HEAD'], capture_output=True, text=True).stdout.split())
except Exception: changed = set()
fails, warns = [], []
for p, d in pages.items():
    if d.get('err390') or d.get('err1440'): fails.append('%s: script error: %s' % (p, (d.get('err390') or d.get('err1440'))[0]))
    if d.get('ov390', 0) > 2: fails.append('%s: overflows on phones by %dpx' % (p, d['ov390']))
    if d.get('ov1440', 0) > 2: fails.append('%s: overflows on desktop' % p)
    if d['broken']: fails.append('%s: broken links %s' % (p, d['broken'][:3]))
    if d['dashes']: fails.append('%s: %d em/en dashes' % (p, d['dashes']))
    if d['mailto_form']: fails.append('%s: subscribe form bypasses subscribe.js' % p)
    if p in changed and d['words'] > 900:
        if d['tags'] < 5: fails.append('%s (changed): fewer than five evidence tags' % p)
        if not d['mirror']: fails.append('%s (changed): no other-side section' % p)
        if not d['disclosure']: fails.append('%s (changed): no disclosure line' % p)
        if not d['signup']: fails.append('%s (changed): no way to subscribe' % p)
        if d['noindex'] and d['inbound'] > 0: warns.append('%s: linked from the site but still noindex (preview?)' % p)
        if d['sliders'] > 2: warns.append('%s: %d sliders; the standard asks for other mechanics' % (p, d['sliders']))
        if not d['recall']: warns.append('%s: no recall card' % p)
# K8 · claims: a changed long page needs a current verdict from the independent checker
import hashlib, re, importlib.util
spec = importlib.util.spec_from_file_location('xc', '_agent/scripts/extract-claims.py'); xc = importlib.util.module_from_spec(spec); spec.loader.exec_module(xc)
K8 = '--no-claims' not in sys.argv
for p in sorted(changed):
    if not K8 or p not in pages or pages[p]['words'] <= 900 or pages[p]['tags'] < 5: continue
    led = xc.extract(p); vf = '_drafts/claims/%s.verdict.json' % xc.slug(p)
    if not os.path.exists(vf): fails.append('%s (changed): no claims verdict; run the claims-checker agent on it' % p); continue
    v = json.load(open(vf))
    if v.get('claims_sha') != led['claims_sha']: fails.append('%s (changed): its claims changed since the last check; re-run the claims-checker' % p); continue
    blocking = [x for x in v.get('verdicts', []) if x.get('verdict') in ('OVERSTATED', 'CONTRADICTED', 'UNSUPPORTED', 'WRONG_TAG')]
    for x in blocking[:6]: fails.append('%s claim %s: %s. Fix: %s' % (p, x.get('id'), x.get('verdict'), (x.get('fix') or '')[:140]))
    unk = [x for x in v.get('verdicts', []) if x.get('verdict') == 'UNKNOWN']
    if unk: warns.append('%s: %d claims the checker could not verify (editor decides): %s' % (p, len(unk), ', '.join(x.get('id', '') for x in unk[:8])))
scores = [d['score'] for d in pages.values()]; avg = sum(scores) / len(scores)
base = json.load(open(BASE)) if os.path.exists(BASE) else {'avg': 0, 'min': 0}
if avg < base['avg'] - 0.5: fails.append('ratchet: site average %.1f is below the baseline %.1f' % (avg, base['avg']))
print('gate: %d pages, average %.1f (baseline %.1f), lowest %d, %d changed' % (len(pages), avg, base['avg'], min(scores), len([c for c in changed if c in pages])))
for w in warns: print('  warn:', w)
if fails:
    sys.stderr.write('GATE BLOCKED (%d):\n' % len(fails) + '\n'.join('  ' + f for f in fails[:40]) + '\n'); sys.exit(2)
if '--update-baseline' in sys.argv or not os.path.exists(BASE):
    json.dump({'avg': round(avg, 1), 'min': min(scores), 'pages': len(pages)}, open(BASE, 'w')); print('baseline recorded')
open('_agent/harness/.gate-pass', 'w').write(subprocess.run(['git', 'rev-parse', 'HEAD'], capture_output=True, text=True).stdout.strip())
print('GATE PASSED')
