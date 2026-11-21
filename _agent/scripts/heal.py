#!/usr/bin/env python3
"""Mechanical healing pass. Safe to re-run. Fixes what needs no editorial judgment:
em/en dashes (Editorial Standard v2), missing meta descriptions and canonicals, the site-kit include,
and drops archived (noindex + unlinked) pages from the sitemap.  python3 _agent/scripts/heal.py"""
import html, json, os, re
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')); os.chdir(ROOT)
H = json.load(open('_drafts/site-health.json'))['pages']
MD, ND = '—', '–'

def dedash(s):
    s = s.replace('&mdash;', MD).replace('&ndash;', ND).replace('&#8212;', MD).replace('&#8211;', ND)
    s = re.sub(r'(\d)\s?' + ND + r'\s?(\d)', r'\1 to \2', s)                    # 5–10 -> 5 to 10
    s = re.sub(r'([A-Za-z]{3,})' + ND + r'([A-Z][a-z])', r'\1 to \2', s)        # Jan–Mar
    s = re.sub(r'(["\'>])\s*[' + MD + ND + r']\s*(["\'<])', r'\1-\2', s)        # lone placeholder
    s = re.sub(r'(>|^|["\'(])\s*[' + MD + ND + r']\s+', r'\1', s)                # leading attribution dash
    s = re.sub(r'\s*' + MD + r'\s*', ', ', s)                                   # clause dash
    s = re.sub(r'\s+' + ND + r'\s+', ', ', s)
    s = s.replace(ND, '-')
    s = re.sub(r',\s*,', ',', s); s = re.sub(r',\s*([.;:!?])', r'\1', s); s = re.sub(r'([.;:!?])\s*,\s+', r'\1 ', s)
    return s

def dedash_code(s):
    # inside <script>: touch only the dash characters themselves, never punctuation around code
    s = s.replace('&mdash;', MD).replace('&ndash;', ND)
    s = re.sub(r'(\d)\s?' + ND + r'\s?(\d)', r'\1 to \2', s)
    s = re.sub(r'(["\'`>])\s*[' + MD + ND + r']\s*(["\'`<])', r'\1-\2', s)
    s = re.sub(r'(\w|[)\]%])\s*' + MD + r'\s*(?=\w|[(\[$])', r'\1, ', s)
    s = re.sub(r'(\w)\s+' + ND + r'\s+(?=\w)', r'\1, ', s)
    return s.replace(MD, '-').replace(ND, '-')

def heal_dashes(h):
    parts = re.split(r'(<style[\s\S]*?</style>|<script[\s\S]*?</script>|<!--[\s\S]*?-->|(?:href|src|content|data-[a-z-]*url)="[^"]*")', h)
    for i in range(len(parts)):
        if i % 2 == 0: parts[i] = dedash(parts[i])
        elif parts[i].startswith('<script'): parts[i] = dedash_code(parts[i])
    return ''.join(parts)

def first_para(h):
    b = h[h.find('<body'):]; b = re.sub(r'<(script|style|nav|header class="top)[\s\S]*?</\1>', ' ', b)
    for m in re.finditer(r'<p[^>]*class="[^"]*(?:deck|lede|dek|standfirst|sub)[^"]*"[^>]*>([\s\S]*?)</p>|<p[^>]*>([\s\S]*?)</p>', b):
        t = html.unescape(re.sub(r'<[^>]+>', ' ', m.group(1) or m.group(2) or '')); t = re.sub(r'\s+', ' ', t).strip()
        if len(t) >= 90: 
            if len(t) > 158: t = t[:158].rsplit(' ', 1)[0].rstrip(',;:') + '.'
            return t.replace('"', "'")
    return None

n = dict(dash=0, meta=0, canon=0, kit=0)
archived = []
for p, v in H.items():
    h = open(p).read(); o = h
    if v['noindex'] and v['inbound'] == 0: archived.append(p); continue
    if MD in h or ND in h or '&mdash;' in h or '&ndash;' in h:
        h2 = heal_dashes(h)
        if h2 != h: h = h2; n['dash'] += 1
    if not v['description']:
        d = first_para(h)
        if d:
            if re.search(r'<meta name="description"', h): h = re.sub(r'<meta name="description" content="[^"]*"\s*/?>', '<meta name="description" content="%s">' % d, h, 1)
            else: h = re.sub(r'(<title>[^<]*</title>)', r'\1\n<meta name="description" content="%s">' % d.replace('\\', ''), h, count=1)
            n['meta'] += 1
    if 'rel="canonical"' not in h and not v['noindex']:
        h = re.sub(r'(<title>[^<]*</title>)', r'\1\n<link rel="canonical" href="https://series.melophon.com/%s">' % p.replace(os.sep, '/'), h, count=1); n['canon'] += 1
    if 'site-kit.js' not in h and 'subscribe.js' in h:
        rel = '../' * p.count('/')
        h = h.replace('<script src="%ssubscribe.js"' % rel, '<script src="%ssite-kit.js" defer data-root="%s" data-page="%s"></script>\n<script src="%ssubscribe.js"' % (rel, rel, p, rel), 1); n['kit'] += 1
    if h != o: open(p, 'w').write(h)
import glob
for f in glob.glob('*.html'):
    if f not in H and 'noindex' in open(f).read(): archived.append(f)
s = open('sitemap.xml').read()
for p in archived: s = re.sub(r'\s*<url><loc>https://series\.melophon\.com/%s</loc>.*?</url>' % re.escape(p), '', s)
open('sitemap.xml', 'w').write(s)
print(n, 'archived', archived)
