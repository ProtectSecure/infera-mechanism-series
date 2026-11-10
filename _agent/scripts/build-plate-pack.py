#!/usr/bin/env python3
"""Writes _drafts/midjourney-plate-pack.md from _agent/plates.json: one prompt and one file name per page.
Drop the finished still in images/plates/ under that name, run build-connections.py, and the page shows it."""
import json, os, re
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')); os.chdir(ROOT)
P = json.load(open('_agent/plates.json')); C = json.load(open('connections.json'))['pages']
STYLE = 'editorial still life, dark studio, one warm practical light, deep shadow, muted cream and brass palette, 35mm film grain, shallow depth of field, no people, no faces, no text, no logos --ar 25:9 --style raw'
L = ['# Midjourney plate pack', '',
     'One still per page. Each is an illustration, never a picture of a real person or event, and the page labels it that way.',
     'The Chain of Title is left out on purpose: it uses public-domain archival plates only.', '',
     '**How to use:** run the prompt, pick one, export at 2560 px wide or more, save as `.webp` (or `.jpg`) in `images/plates/` under the file name shown, then run `python3 _agent/scripts/build-connections.py`. The page swaps its motion loop for the still, with a slow push-in, wherever it has room for one.', '',
     '**House rules:** objects and places, not people. No faces, no readable text, no brand marks, no real buildings that can be named. If a result looks like news photography, reject it.', '']
last = None
for p, x in P.items():
    if p not in C: continue
    sec = C[p]['section']
    if sec != last: L += ['', '## ' + sec, '']; last = sec
    slug = re.sub(r'\.html$', '', p).replace('/', '--')
    L += ['**%s**  ·  `images/plates/%s.webp`  ·  loop now: %s' % (C[p]['title'], slug, x.get('loop') or 'none (page has its own opening art; still is for social)'), '', '```', '%s, %s' % (x['subject'], STYLE), '```', '']
open('_drafts/midjourney-plate-pack.md', 'w').write('\n'.join(L) + '\n'); print('prompts:', sum(1 for p in P if p in C))
