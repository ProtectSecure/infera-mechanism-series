#!/usr/bin/env python3
"""Builds connections.json: one record per public page (title, section, threads, minutes, blurb).
The Loom, the keep-going cards and the thread lists all read this one file.
Run from the repo root after any publish:  python3 _agent/scripts/build-connections.py
Hand-written additions live in _agent/connections-extra.json and are merged in (they win)."""
import html, json, os, re
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')); os.chdir(ROOT)
SECTIONS = {'season-1': ('The Pressure Series', ['money', 'voices']), 'season-2': ('Machine-Readable', ['records']),
            'faith-layer': ('The Faith Layer', ['records', 'voices']), 'chain-of-title': ('The Chain of Title', ['money', 'voices']),
            'second-alarm': ('The Second Alarm', ['money', 'clocks']), 'remix': ('The Loom', [])}
idx = open('index.html').read()
secs = [(m.start(), m.group(1)) for m in re.finditer(r'<section[^>]*\bid="([^"]+)"', idx)]
sec_of = {}
for i, (pos, sid) in enumerate(secs):
    end = secs[i + 1][0] if i + 1 < len(secs) else len(idx)
    if sid in SECTIONS:
        for h in dict.fromkeys(re.findall(r'href="([^"#]+\.html)"', idx[pos:end])): sec_of.setdefault(h, sid)
tile_threads = {h: t.split() for t, h in re.findall(r'data-threads="([^"]+)" href="([^"]+)"', idx)}
health = json.load(open('_drafts/site-health.json'))['pages'] if os.path.exists('_drafts/site-health.json') else {}
out = {}
for p, v in sorted(health.items()):
    h = open(p).read()
    if 'noindex' in h and v.get('inbound', 0) == 0: continue          # archived
    if v['words'] < 250: continue
    t = re.search(r'<title>([^<]+)</title>', h); title = html.unescape(t.group(1)) if t else p
    title = re.split(r'\s+[·|]\s+(?:The Mechanism Series|Infera|INFERA).*$', title)[0].strip()
    d = re.search(r'<meta name="description" content="([^"]*)"', h)
    sid = sec_of.get(p) or ('field-notes' if p.startswith('field-notes/') else 'briefs' if p.startswith('brief') else 'desk' if p.startswith(('desk/', 'tomorrow')) else 'site')
    name, default = SECTIONS[sid] if sid in SECTIONS else ({'field-notes': 'Field Notes', 'briefs': 'The Mechanism Brief', 'desk': 'The Desk', 'site': 'Infera'}[sid], ['clocks'] if sid == 'briefs' else [])
    threads = tile_threads.get(p) or default
    out[p] = {'title': title, 'section': name, 'sid': sid, 'threads': threads, 'minutes': max(2, round(v['words'] / 230 + 1)), 'blurb': html.unescape(d.group(1))[:170] if d else ''}
if os.path.exists('_agent/connections-extra.json'):
    for p, x in json.load(open('_agent/connections-extra.json')).items(): out.setdefault(p, {}).update(x)
# Motion plates: a loop for each page listed in _agent/plates.json, and a still if one has been dropped in images/plates/.
if os.path.exists('_agent/plates.json'):
    for p, x in json.load(open('_agent/plates.json')).items():
        if p not in out: continue
        if not x.get('loop'): continue   # page already opens with its own picture
        out[p]['loop'] = x['loop']
        slug = re.sub(r'\.html$', '', p).replace('/', '--')
        for ext in ('webp', 'jpg', 'png'):
            if os.path.exists('images/plates/%s.%s' % (slug, ext)): out[p]['plate'] = 'images/plates/%s.%s' % (slug, ext)
json.dump({'threads': {'money': '#06d6a0', 'records': '#8b9cff', 'clocks': '#e7b8ff', 'voices': '#d9b35a'}, 'pages': out}, open('connections.json', 'w'), indent=0, ensure_ascii=False)
print('connections:', len(out))
