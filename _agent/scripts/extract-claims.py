#!/usr/bin/env python3
"""Pulls every tagged claim off a page into a ledger the claims checker works from.
  python3 _agent/scripts/extract-claims.py <page.html> [...]
Writes _drafts/claims/<slug>.claims.json: [{id, tag, claim, source_note, links, home}] plus a hash of the
claims themselves, so a verdict stays valid when only layout or scripts change."""
import hashlib, html, json, os, re, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')); os.chdir(ROOT)
TAGS = 'FACT|REPORTED|ALLEGED|INFERENCE|WATCH'
def slug(p): return re.sub(r'[^a-z0-9]+', '-', p.lower().replace('.html', '')).strip('-')
def text(s): return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', s))).strip()
def extract(p):
    h = open(p, encoding='utf-8').read()
    # JS string concatenation shortcuts used across the site resolve to tag spans
    for k, v in {'REP': 'REPORTED', 'INF': 'INFERENCE', 'T.R': 'REPORTED', 'T.I': 'INFERENCE', 'T.F': 'FACT', 'T.W': 'WATCH', 'T.A': 'ALLEGED'}.items():
        h = re.sub(r"'\s*\+\s*" + re.escape(k) + r"\b(\s*\+\s*')?", ' <span class="tag">' + v + '</span> ', h)
    h = re.sub(r"'\s*\+\s*S\('([^']+)','([^']+)'\)(\s*\+\s*')?", r' <span class="sub">from <a href="\1">\2</a></span> ', h)
    out, seen = [], set()
    for m in re.finditer(r'<span class="(?:tag|chip)[^"]*">\s*(' + TAGS + r')\s*</span>', h):
        start = max(h.rfind('<p', 0, m.start()), h.rfind('<li', 0, m.start()), h.rfind('<dd', 0, m.start()), h.rfind("['", 0, m.start()), h.rfind('<div class="why', 0, m.start()), m.start() - 700)
        before = text(h[start:m.start()])
        sents = re.split(r'(?<=[.!?])\s+(?=[A-Z"(])', before)
        claim = sents[-1].strip() if sents else before
        if len(claim) < 25 and len(sents) > 1: claim = (sents[-2] + ' ' + claim).strip()
        claim = re.split(r"[:,\[(]\s*'", before)[-1] if re.search(r"[:,\[(]\s*'", claim) else claim
        claim = claim.replace("\\'", "'").strip()
        tail = h[m.end():m.end() + 500]
        sm = re.match(r'\s*(?:<span class="tag[^"]*">[A-Z]+</span>\s*)*<span class="sub">([\s\S]*?)</span>', tail)
        note = text(sm.group(1)) if sm else ''
        links = re.findall(r'href="([^"]+)"', sm.group(1)) if sm else []
        if re.search(r"(var\s+REP|REP\s*=|INF\s*=)", h[max(0, m.start() - 60):m.start()]) or 'Tags: FACT' in claim or claim.startswith('Infera ·'): continue
        key = (m.group(1), claim[:90])
        if len(claim) < 15 or key in seen: continue
        seen.add(key)
        out.append({'id': 'c%03d' % (len(out) + 1), 'tag': m.group(1), 'claim': claim[-600:], 'source_note': note, 'links': links})
    srcs = re.search(r'<div class="sources">([\s\S]*?)</div>', h)
    sources = [text(x) for x in re.findall(r'<li[^>]*>([\s\S]*?)</li>', srcs.group(1))] if srcs else []
    sha = hashlib.sha256(json.dumps([(c['tag'], c['claim']) for c in out]).encode()).hexdigest()[:16]
    return {'page': p, 'claims_sha': sha, 'count': len(out), 'sources_listed': sources, 'claims': out}
if __name__ == '__main__':
    for p in sys.argv[1:]:
        d = extract(p); f = '_drafts/claims/%s.claims.json' % slug(p)
        json.dump(d, open(f, 'w'), indent=1, ensure_ascii=False); print(f, d['count'], 'claims', d['claims_sha'])
