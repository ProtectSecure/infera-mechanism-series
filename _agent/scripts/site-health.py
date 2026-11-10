#!/usr/bin/env python3
"""Site health check: the self-healing loop for series.melophon.com.

Scores every public page against the Editorial Standard and the Interaction
Library, then ranks the weakest first so each pass lifts the floor.

Run from the repo root:   python3 _agent/scripts/site-health.py [--no-render]
Writes:                   _drafts/site-health.json and _drafts/site-health-report.md

Checks per page
  integrity   visible em/en dashes, evidence tags, mirror, disclosure, noindex left on
  experience  phone and desktop overflow, script errors, sliders vs other mechanics,
              recall card, thread layer, read time
  findability title, description, canonical, sitemap, linked from somewhere, broken links
  relationship a working way to subscribe, a next step at the end
"""
import html, json, os, re, subprocess, sys, datetime

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
os.chdir(ROOT)
SKIP_DIRS = ('_drafts', '_agent', '_brand', '_edition-2-drafts', 'mockups', 'later', 'full skill library backup', 'assets', 'images', '.git')
SKIP_NAME = re.compile(r'(mockup|-alt\.html$)')

def pages():
    out = []
    for d, dirs, files in os.walk('.'):
        dirs[:] = [x for x in dirs if x not in SKIP_DIRS]
        for f in files:
            if f.endswith('.html'):
                p = os.path.normpath(os.path.join(d, f))
                if not SKIP_NAME.search(p):
                    out.append(p)
    return sorted(out)

def visible(h):
    b = h[h.find('<body'):] if '<body' in h else h
    b = re.sub(r'<(script|style)[\s\S]*?</\1>', ' ', b)
    return html.unescape(re.sub(r'<[^>]+>', ' ', b))

def static_checks(p, h, all_pages, sitemap, inbound):
    t = visible(h)
    words = len(t.split())
    d = {}
    d['words'] = words
    d['kb'] = round(len(h) / 1024)
    d['title'] = bool(re.search(r'<title>[^<]{8,}</title>', h))
    m = re.search(r'<meta name="description" content="([^"]*)"', h)
    d['description'] = bool(m and len(m.group(1)) >= 60)
    d['canonical'] = 'rel="canonical"' in h
    d['noindex'] = 'noindex' in h
    d['dashes'] = t.count('—') + t.count('–')
    d['sliders'] = h.count('type="range"')
    d['buttons'] = len(re.findall(r'<button', h))
    d['tags'] = len(re.findall(r'\b(FACT|REPORTED|ALLEGED|INFERENCE|WATCH|DOCUMENTED|ESTIMATED|MODELED)\b', t)) + len(re.findall(r'class="(tier|chip|prov)', h)) + h.count('data-provenance=')
    d['mirror'] = bool(re.search(r'(other side|the mirror|steelman|coach.s challenge|strongest counter|counter.?argument|case for|best case against|does not show|what we don.t know|honest limitation|could be wrong|does not claim|did not prove|what it does not|against, or wary|read this page honestly|what we did not)', t, re.I))
    d['disclosure'] = bool(re.search(r'(compiled with Claude|Researched and compiled with Claude)', t, re.I))
    d['readtime'] = bool(re.search(r'\b\d{1,2}\s*(min|minutes)\b', t, re.I))
    d['threads'] = 'thbar' in h or 'data-thread' in h
    d['recall'] = 'id="recall"' in h
    d['endcard'] = bool(re.search(r'(endcard|end-card|class="next"|Next episode|Read next|Keep going)', h, re.I))
    d['signup'] = 'subscribe.js' in h or bool(re.search(r'(data-subscribe|data-stayclose|bsSignup|foundingSignup)', h))
    d['mailto_form'] = 'action="mailto:' in h and 'subscribe.js' not in h
    d['img_no_alt'] = len(re.findall(r'<img(?![^>]*\balt=)[^>]*>', h))
    kit = 'site-kit.js' in h
    d['archived'] = d['noindex'] and inbound.get(p, 0) == 0
    if kit: d['disclosure'] = d['readtime'] = d['endcard'] = d['threads'] = True
    d['in_sitemap'] = p.replace(os.sep, '/') in sitemap
    d['inbound'] = inbound.get(p, 0)
    broken = []
    base = os.path.dirname(p)
    for href in set(re.findall(r'href="([^"#?]+)(?:[#?][^"]*)?"', h)):
        if re.match(r'^(https?:|mailto:|tel:|javascript:|data:)', href) or href.startswith('{'):
            continue
        if "'" in href or '+' in href or '${' in href:
            continue  # built in script, not a literal link
        target = os.path.normpath(href.lstrip('/')) if href.startswith('/') else os.path.normpath(os.path.join(base, href))
        if href in ('/', './'): target = 'index.html'
        if not os.path.exists(target):
            broken.append(href)
    d['broken'] = sorted(broken)[:8]
    return d

def render_checks(plist):
    res = {}
    try:
        from playwright.sync_api import sync_playwright
    except Exception as e:
        print('playwright unavailable:', e); return res
    with sync_playwright() as pw:
        b = pw.chromium.launch()
        ctx = {w: b.new_context(viewport={'width': w, 'height': 900}) for w in (1440, 390)}
        for c in ctx.values():
            c.route(re.compile(r'^https?://'), lambda r: r.abort())  # offline: local files only
        for i, p in enumerate(plist):
            r = {}
            for w, c in ctx.items():
                pg = c.new_page(); errs = []
                pg.on('pageerror', lambda e, errs=errs: errs.append(str(e)[:140]))
                try:
                    pg.goto('file://' + os.path.join(ROOT, p), wait_until='load', timeout=20000)
                    pg.wait_for_timeout(250)
                    r['ov%d' % w] = pg.evaluate('document.documentElement.scrollWidth-window.innerWidth')
                    if w == 390:
                        r['small_tap'] = pg.evaluate("""[...document.querySelectorAll('button,a.cta,input[type=submit]')].filter(e=>{const b=e.getBoundingClientRect();return b.width>0&&b.height>0&&b.height<28}).length""")
                except Exception as e:
                    errs.append('load: ' + str(e)[:100])
                r['err%d' % w] = errs[:3]
                pg.close()
            res[p] = r
            if i % 20 == 0: print('rendered', i, '/', len(plist), flush=True)
        b.close()
    return res

def score(d):
    """100 is the house standard. Each miss costs what it costs a reader."""
    s = 100; why = []
    def miss(n, msg):
        nonlocal s; s -= n; why.append(msg)
    longform = d['words'] > 900
    if d.get('err1440') or d.get('err390'): miss(20, 'script error')
    if d.get('ov390', 0) > 2: miss(15, 'overflows on phones (%dpx)' % d['ov390'])
    if d.get('ov1440', 0) > 2: miss(8, 'overflows on desktop')
    if d['broken']: miss(min(12, 4 * len(d['broken'])), 'broken links: ' + ', '.join(d['broken'][:3]))
    if d['dashes']: miss(min(8, 1 + d['dashes'] // 4), '%d em/en dashes' % d['dashes'])
    if d['noindex']: miss(6, 'noindex still set')
    if not d['description']: miss(5, 'no usable meta description')
    if not d['canonical']: miss(3, 'no canonical link')
    if not d['in_sitemap']: miss(4, 'missing from sitemap')
    if d['inbound'] == 0: miss(8, 'orphan: nothing links here')
    if d['mailto_form']: miss(10, 'subscribe form goes to mailto')
    if longform:
        if d['tags'] < 5: miss(10, 'few or no evidence tags')
        if not d['mirror']: miss(8, 'no mirror / other side found')
        if not d['disclosure']: miss(5, 'no AI disclosure line')
        if not d['readtime']: miss(3, 'no read time')
        if not d['threads']: miss(5, 'no thread layer')
        if not d['endcard']: miss(6, 'no next step at the end')
        if not d['recall']: miss(3, 'no recall card')
        if not d['signup']: miss(4, 'no way to subscribe on the page')
        if d['sliders'] >= 4: miss(min(8, d['sliders']), '%d sliders' % d['sliders'])
    if d['img_no_alt']: miss(min(5, d['img_no_alt']), '%d images without alt text' % d['img_no_alt'])
    if d.get('small_tap', 0) > 3: miss(3, '%d small tap targets on phones' % d['small_tap'])
    return max(s, 0), why

def main():
    plist = pages()
    sitemap = open('sitemap.xml').read() if os.path.exists('sitemap.xml') else ''
    sm = set(re.findall(r'series\.melophon\.com/([^<]*)</loc>', sitemap))
    sm.add('index.html') if '' in sm else None
    src = {p: open(p, encoding='utf-8', errors='ignore').read() for p in plist}
    inbound = {}
    for p, h in src.items():
        base = os.path.dirname(p)
        for href in set(re.findall(r'href="([^"#?]+\.html)', h)):
            if href.startswith('http'): continue
            t = os.path.normpath(href.lstrip('/')) if href.startswith('/') else os.path.normpath(os.path.join(base, href))
            if t != p: inbound[t] = inbound.get(t, 0) + 1
    data = {p: static_checks(p, src[p], plist, sm, inbound) for p in plist}
    if '--no-render' not in sys.argv:
        for p, r in render_checks(plist).items(): data[p].update(r)
    data = {p: d for p, d in data.items() if not d.get('archived')}
    rows = []
    for p, d in data.items():
        d['score'], d['why'] = score(d); rows.append((d['score'], p))
    rows.sort()
    today = datetime.date.today().isoformat()
    json.dump({'date': today, 'pages': data}, open('_drafts/site-health.json', 'w'), indent=1)
    n = len(rows); avg = sum(s for s, _ in rows) / n
    issue_counts = {}
    for d in data.values():
        for w in d['why']:
            k = re.sub(r'[:(].*', '', re.sub(r'^\d+ ', '', w)).strip(); issue_counts[k] = issue_counts.get(k, 0) + 1
    L = ['# Site health report · %s' % today, '',
         'Generated by `_agent/scripts/site-health.py`. This is the self-healing loop: run it after every publish, fix from the top of the weakest list, and the floor rises. 100 is the house standard set by the newest exhibits.', '',
         '**%d pages · average %.0f · %d at 90 or above · %d below 70**' % (n, avg, sum(1 for s, _ in rows if s >= 90), sum(1 for s, _ in rows if s < 70)), '',
         '## Most common gaps', '', '| Gap | Pages |', '|---|---|']
    for k, v in sorted(issue_counts.items(), key=lambda x: -x[1]): L.append('| %s | %d |' % (k, v))
    L += ['', '## Weakest 25 (heal these first)', '', '| Score | Page | What is missing |', '|---|---|---|']
    for s, p in rows[:25]: L.append('| %d | `%s` | %s |' % (s, p, '; '.join(data[p]['why'])))
    L += ['', '## Strongest 10 (the bar)', '', '| Score | Page |', '|---|---|']
    for s, p in rows[-10:][::-1]: L.append('| %d | `%s` |' % (s, p))
    L += ['', '## Every page', '', '| Score | Page | Words | Sliders | Tags |', '|---|---|---|---|---|']
    for s, p in rows: L.append('| %d | `%s` | %d | %d | %d |' % (s, p, data[p]['words'], data[p]['sliders'], data[p]['tags']))
    open('_drafts/site-health-report.md', 'w').write('\n'.join(L) + '\n')
    print('pages', n, 'avg %.1f' % avg)
    for s, p in rows[:25]: print(s, p, '|', '; '.join(data[p]['why']))
    print('---');
    for k, v in sorted(issue_counts.items(), key=lambda x: -x[1]): print(v, k)

if __name__ == '__main__':
    main()
