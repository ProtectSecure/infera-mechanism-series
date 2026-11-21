/* INFERA · site kit. One include that brings every long page up to the house standard:
   read time and progress, chapters and resume on long reads, an intermission on very long ones,
   a keep-going card with thread chips, the disclosure line, a motion plate under openings that
   have no picture, and scroll reveals on pages with no motion of their own. It only adds what a page lacks. */
(function () {
  'use strict';
  var S = document.currentScript, BASE = (S && S.getAttribute('data-root')) || '';
  var PATH = (S && S.getAttribute('data-page')) || location.pathname.replace(/^\//, '') || 'index.html';
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (_) {} return null; }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; }
  function words() { var c = document.body.cloneNode(true); Array.prototype.forEach.call(c.querySelectorAll('script,style,nav,footer,.legal-footer,.infera-stay'), function (n) { n.remove(); }); return (c.textContent || '').trim().split(/\s+/).length; }

  function css() {
    var s = el('style'); s.id = 'infera-kit-css';
    s.textContent = '.ik-bar{position:fixed;left:0;top:0;height:3px;width:0;background:#c8ff1e;z-index:9998;pointer-events:none}' +
      '.ik-pill{position:fixed;right:14px;bottom:14px;z-index:9997;display:flex;gap:0;font:600 11px/1 ui-monospace,Menlo,monospace;letter-spacing:.08em;text-transform:uppercase;border-radius:20px;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,.35);opacity:0;transform:translateY(8px);transition:opacity .3s,transform .3s}' +
      '.ik-pill.on{opacity:1;transform:none}.ik-pill span,.ik-pill button{background:#0a0a0a;color:#fbf7eb;padding:10px 12px;border:0;font:inherit;letter-spacing:inherit;text-transform:inherit}.ik-pill button{background:#c8ff1e;color:#0a0a0a;cursor:pointer;min-height:36px}' +
      '.ik-menu{position:fixed;right:14px;bottom:60px;z-index:9997;width:min(340px,90vw);max-height:60vh;overflow:auto;background:#0a0a0a;color:#fbf7eb;border:1px solid #c8ff1e;border-radius:10px;padding:10px;font:14px/1.35 Georgia,serif}.ik-menu[hidden]{display:none}.ik-menu a{display:block;color:#fbf7eb;text-decoration:none;padding:9px 8px;border-bottom:1px solid rgba(251,247,235,.12)}.ik-menu a:hover,.ik-menu a:focus{background:rgba(200,255,30,.12)}.ik-menu a.cur{color:#c8ff1e}' +
      '@media(max-width:900px){.ik-pill{bottom:54px}.ik-menu{bottom:100px}}' +
      '.ik-card{margin:0;padding:40px 6vw;background:#101214;color:#fbf7eb;font-family:Georgia,serif;border-top:1px solid rgba(251,247,235,.14)}.ik-card .in{max-width:980px;margin:0 auto}.ik-card .k{font:700 10.5px/1 ui-monospace,Menlo,monospace;letter-spacing:.2em;text-transform:uppercase;color:#c8ff1e;margin-bottom:14px}' +
      '.ik-next{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}@media(max-width:760px){.ik-next{grid-template-columns:1fr}}.ik-next a{display:block;background:#181b1f;border-top:3px solid var(--c,#c8ff1e);border-radius:0 0 8px 8px;padding:14px;color:#fbf7eb;text-decoration:none;font-size:17px;line-height:1.3}.ik-next a:hover{background:#1f2328}.ik-next .t{display:block;font:600 10px/1.3 ui-monospace,Menlo,monospace;letter-spacing:.14em;text-transform:uppercase;color:var(--c,#c8ff1e);margin-bottom:6px}.ik-next .s{display:block;font:11px/1.4 ui-monospace,Menlo,monospace;color:rgba(251,247,235,.6);margin-top:6px}' +
      '.ik-chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;font:600 10.5px/1 ui-monospace,Menlo,monospace;letter-spacing:.12em;text-transform:uppercase}.ik-chips a{color:var(--c);border:1px solid var(--c);border-radius:20px;padding:7px 11px;text-decoration:none}' +
      '.ik-disc{font:11.5px/1.6 ui-monospace,Menlo,monospace;color:rgba(251,247,235,.6);margin-top:16px}' +
      '.ik-inter{margin:40px auto;max-width:640px;padding:18px 20px;border:1px dashed currentColor;border-radius:10px;font:16px/1.5 Georgia,serif;opacity:.92}.ik-inter b{display:block;font:700 10.5px/1 ui-monospace,Menlo,monospace;letter-spacing:.2em;text-transform:uppercase;margin-bottom:8px}' +
      '.ik-resume{position:fixed;left:50%;transform:translateX(-50%);bottom:18px;z-index:9999;background:#0a0a0a;color:#fbf7eb;border:1px solid #c8ff1e;border-radius:10px;padding:12px 14px;font:14px/1.4 Georgia,serif;display:flex;gap:10px;align-items:center;box-shadow:0 8px 30px rgba(0,0,0,.4);max-width:92vw}.ik-resume button{font:700 11px/1 ui-monospace,Menlo,monospace;letter-spacing:.1em;text-transform:uppercase;padding:9px 11px;border-radius:5px;border:1px solid #c8ff1e;background:#c8ff1e;color:#0a0a0a;cursor:pointer}.ik-resume button.x{background:transparent;color:#fbf7eb;border-color:rgba(251,247,235,.4)}' +
      '.ik-plate{position:relative;margin:28px auto;max-width:1180px;width:calc(100% - 32px);aspect-ratio:1280/460;overflow:hidden;border-radius:6px;background:#0f0e0c;box-shadow:0 18px 50px rgba(0,0,0,.35)}.ik-plate video,.ik-plate img{position:absolute;left:0;top:-6%;width:100%;height:112%;object-fit:cover;display:block;will-change:transform}.ik-plate img.kb{animation:ikkb 26s ease-in-out infinite alternate}@keyframes ikkb{from{transform:scale(1) translate(0,0)}to{transform:scale(1.09) translate(-1.5%,1%)}}' +
      '.ik-plate:before,.ik-plate:after{content:"";position:absolute;left:0;right:0;height:7%;background:#000;z-index:2;transform:scaleY(0);transition:transform 1.1s cubic-bezier(.2,.7,.2,1)}.ik-plate:before{top:0;transform-origin:top}.ik-plate:after{bottom:0;transform-origin:bottom}.ik-plate.on:before,.ik-plate.on:after{transform:scaleY(1)}' +
      '.ik-plate figcaption{position:absolute;left:14px;bottom:calc(7% + 8px);z-index:3;font:600 10px/1.3 ui-monospace,Menlo,monospace;letter-spacing:.14em;text-transform:uppercase;color:rgba(242,234,216,.78);text-shadow:0 1px 6px #000;max-width:80%}@media(max-width:600px){.ik-plate{margin:18px auto}.ik-plate figcaption{font-size:8.5px;left:10px}}' +
      '.ik-rv{opacity:0;transform:translateY(16px);transition:opacity .7s ease,transform .7s cubic-bezier(.2,.7,.2,1)}.ik-rv.in{opacity:1;transform:none}' +
      '@media (prefers-reduced-motion: reduce){.ik-rv{opacity:1;transform:none;transition:none}.ik-plate img.kb{animation:none}.ik-plate:before,.ik-plate:after{transition:none}}' +
      '@media print{.ik-bar,.ik-pill,.ik-menu,.ik-resume,.ik-plate{display:none}.ik-rv{opacity:1;transform:none}}';
    document.head.appendChild(s);
  }

  function reading(total) {
    if (total < 8 || document.querySelector('[data-no-kit-progress]')) return;
    var bar = el('div', 'ik-bar'); bar.setAttribute('aria-hidden', 'true'); document.body.appendChild(bar);
    var pill = el('div', 'ik-pill'), left = el('span'); left.setAttribute('aria-live', 'off'); pill.appendChild(left);
    var heads = Array.prototype.filter.call(document.querySelectorAll('h2'), function (h) { return h.offsetParent !== null && (h.textContent || '').trim().length > 3 && !h.closest('.legal-footer,.infera-stay,.ik-card'); });
    var menu = null;
    if (total >= 14 && heads.length >= 4) {
      var b = el('button', '', 'Chapters'); b.type = 'button'; b.setAttribute('aria-expanded', 'false'); pill.appendChild(b);
      menu = el('nav', 'ik-menu'); menu.hidden = true; menu.setAttribute('aria-label', 'Chapters');
      heads.forEach(function (h, i) { if (!h.id) h.id = 'ik-ch-' + (i + 1); var a = el('a'); a.href = '#' + h.id; a.textContent = (i + 1) + '. ' + h.textContent.trim().replace(/\s+/g, ' ').slice(0, 70); a.addEventListener('click', function () { menu.hidden = true; b.setAttribute('aria-expanded', 'false'); }); menu.appendChild(a); });
      b.addEventListener('click', function () { menu.hidden = !menu.hidden; b.setAttribute('aria-expanded', String(!menu.hidden)); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { menu.hidden = true; b.setAttribute('aria-expanded', 'false'); } });
      document.body.appendChild(menu);
    }
    document.body.appendChild(pill);
    var key = 'infera.place.' + PATH, tick = false;
    function upd() {
      tick = false;
      var max = document.documentElement.scrollHeight - innerHeight, f = max > 0 ? Math.min(1, scrollY / max) : 0;
      bar.style.width = (f * 100) + '%';
      var m = Math.max(0, Math.round(total * (1 - f)));
      left.textContent = f > .97 ? 'Done · ' + total + ' min read' : m + ' min left';
      pill.classList.toggle('on', f > .03 && f < .995);
      if (menu) { var cur = 0; heads.forEach(function (h, i) { if (h.getBoundingClientRect().top < innerHeight * .4) cur = i; }); Array.prototype.forEach.call(menu.children, function (a, i) { a.classList.toggle('cur', i === cur); }); }
      if (total >= 12 && f > .08) ls(key, f >= .97 ? '' : String(Math.round(f * 1000) / 1000));
    }
    addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true }); upd();
    // resume
    var saved = parseFloat(ls(key) || '0');
    if (total >= 12 && saved > .12 && saved < .95 && scrollY < 50 && !location.hash) {
      var r = el('div', 'ik-resume', '<span>You were about ' + Math.round(saved * 100) + '% through. Pick up there?</span>'); r.setAttribute('role', 'status');
      var go = el('button', '', 'Resume'), no = el('button', 'x', 'Start over'); go.type = no.type = 'button';
      go.addEventListener('click', function () { scrollTo({ top: saved * (document.documentElement.scrollHeight - innerHeight), behavior: RM ? 'auto' : 'smooth' }); r.remove(); });
      no.addEventListener('click', function () { ls(key, ''); r.remove(); }); r.appendChild(go); r.appendChild(no); document.body.appendChild(r);
      setTimeout(function () { if (r.parentNode) r.remove(); }, 12000);
    }
    // intermission on very long reads: placed before the heading nearest the midpoint
    if (total >= 26 && heads.length >= 6 && !document.querySelector('.ik-inter')) {
      var mid = document.documentElement.scrollHeight / 2, best = null, bd = 1e9;
      heads.forEach(function (h) { var y = h.getBoundingClientRect().top + scrollY, d = Math.abs(y - mid); if (d < bd) { bd = d; best = h; } });
      if (best) { var it = el('aside', 'ik-inter', '<b>Intermission · halfway</b>This is a ' + total + '-minute read and you are about halfway. Your place is saved on this device, so this is a good spot to stop and come back.'); best.parentNode.insertBefore(it, best); }
    }
  }

  function keepGoing(db) {
    var me = db.pages[PATH]; if (!me) return;
    var hasEnd = document.querySelector('.endcard,.end-card,.ik-card');
    var txt = document.body.textContent || '', hasDisc = /compiled with Claude/i.test(txt);
    if (hasEnd && hasDisc) return;
    var keys = Object.keys(db.pages), picks = [], seen = {}; seen[PATH] = 1;
    function add(p, why) { if (p && !seen[p] && db.pages[p] && picks.length < 3) { seen[p] = 1; picks.push([p, why]); } }
    var same = keys.filter(function (k) { return db.pages[k].sid === me.sid; }), i = same.indexOf(PATH);
    if (me.sid !== 'site') add(same[(i + 1) % same.length], 'Next in ' + me.section);
    (me.threads || []).forEach(function (t) { var c = keys.filter(function (k) { return !seen[k] && db.pages[k].sid !== me.sid && (db.pages[k].threads || []).indexOf(t) >= 0 && ['site', 'desk'].indexOf(db.pages[k].sid) < 0; }); if (c.length) add(c[(PATH.length + t.length) % c.length], t.charAt(0).toUpperCase() + t.slice(1) + ' thread'); });
    add('the-loom.html', 'Remix'); add('index.html', 'The series');
    var card = el('aside', 'ik-card'); card.setAttribute('aria-label', 'Keep going');
    var h = '<div class="in">';
    if (!hasEnd) {
      h += '<div class="k">Keep going</div><div class="ik-next">' + picks.map(function (x) { var q = db.pages[x[0]], c = db.threads[(q.threads || [])[0]] || '#c8ff1e'; return '<a href="' + BASE + x[0] + '" style="--c:' + c + '"><span class="t">' + x[1] + '</span>' + q.title + '<span class="s">' + q.section + ' · ' + q.minutes + ' min</span></a>'; }).join('') + '</div>';
      if ((me.threads || []).length && db.pages['the-loom.html']) h += '<div class="ik-chips" data-thread="1">' + me.threads.map(function (t) { return '<a href="' + BASE + 'the-loom.html#thread=' + t + '" style="--c:' + db.threads[t] + '">' + t + ' thread</a>'; }).join('') + '</div>';
    }
    if (!hasDisc) h += '<p class="ik-disc">Researched and compiled with Claude (Anthropic). Final editorial judgment: Melophon. Corrections: infera@melophon.com</p>';
    card.innerHTML = h + '</div>';
    var before = document.querySelector('.infera-stay') || document.querySelector('.legal-footer') || document.querySelector('body > footer');
    if (before && before.parentNode) before.parentNode.insertBefore(card, before); else document.body.appendChild(card);
  }

  /* Motion plate: a short silent loop (or a still, if one has been placed in images/plates/) under the
     opening of a page that has no picture of its own. Labelled as illustration. Never added where a
     page already opens with an image, a video or a drawn instrument. */
  function plate(db) {
    var me = db.pages[PATH]; if (!me || !me.loop || document.querySelector('.ik-plate,[data-no-plate]')) return;
    var h1 = document.querySelector('h1'); if (!h1) return;
    var has = Array.prototype.some.call(document.querySelectorAll('img,video,canvas,svg,iframe'), function (m) { var b = m.getBoundingClientRect(); return b.width > 280 && b.height > 120 && b.top + scrollY < 1000; });
    if (has) return;
    var top = h1, lim = Math.max(1100, innerHeight * 1.5); while (top.parentNode && top.parentNode !== document.body && top.parentNode.getBoundingClientRect().height <= lim) top = top.parentNode;
    if (top.getBoundingClientRect().height > lim) return;
    if (top === h1) return;   // never between a headline and its dek
    var pd = getComputedStyle(top.parentNode).display, pw = top.parentNode.getBoundingClientRect().width; if (/grid|flex/.test(pd) && getComputedStyle(top.parentNode).flexDirection !== 'column' || pw < Math.min(560, innerWidth * .85)) return;
    if (!top.parentNode || getComputedStyle(top).position === 'fixed' || getComputedStyle(top).position === 'sticky') return;
    var after = top.getBoundingClientRect().bottom + scrollY; if (scrollY > after - 80) return;   // never shift what is being read
    var f = el('figure', 'ik-plate'), m;
    var lite = RM || (navigator.connection && navigator.connection.saveData);
    f.setAttribute('role', 'img');
    if (me.plate) { m = el('img', lite ? '' : 'kb'); m.src = BASE + me.plate; m.alt = ''; m.loading = 'lazy'; f.setAttribute('aria-label', 'Illustration for this piece'); f.appendChild(m); f.appendChild(el('figcaption', '', 'Illustration · made with Midjourney · not a photograph of real people or events')); }
    else {
      var src = BASE + 'images/loops/' + me.loop;
      if (lite) { m = el('img'); m.src = src + '-poster.webp'; m.alt = ''; }
      else { m = el('video'); m.muted = true; m.loop = true; m.playsInline = true; m.setAttribute('muted', ''); m.setAttribute('playsinline', ''); m.preload = 'none'; m.poster = src + '-poster.webp'; m.src = src + '.mp4'; m.setAttribute('aria-hidden', 'true'); }
      f.setAttribute('aria-label', 'Abstract motion illustration'); f.appendChild(m);
      f.appendChild(el('figcaption', '', 'Motion plate · illustration, not footage'));
    }
    top.parentNode.insertBefore(f, top.nextSibling);
    if (!('IntersectionObserver' in window)) { f.classList.add('on'); return; }
    new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { f.classList.add('on'); if (m.play) { var pr = m.play(); if (pr && pr.catch) pr.catch(function () {}); } } else if (m.pause) m.pause(); }); }, { threshold: .15 }).observe(f);
    if (!lite) { var tk = false; addEventListener('scroll', function () { if (tk) return; tk = true; requestAnimationFrame(function () { tk = false; var b = f.getBoundingClientRect(); if (b.bottom < 0 || b.top > innerHeight) return; var k = (b.top + b.height / 2 - innerHeight / 2) / innerHeight; if (!me.plate) m.style.transform = 'translateY(' + (k * -5).toFixed(2) + '%)'; }); }, { passive: true }); }
  }

  /* Scroll reveals and count-ups for pages that have no motion of their own. Only touches what is
     below the fold when the page opens, so nothing a reader can already see ever disappears. */
  function reveals() {
    if (RM || !('IntersectionObserver' in window) || document.querySelector('[data-no-motion],.reveal,.rv,.fade-in,.in-view,[data-reveal],[data-aos]')) return;
    var sel = 'h2,h3,figure,blockquote,table,svg,canvas,[class*="card"],[class*="panel"],[class*="stat"],[class*="tile"],[class*="callout"],[class*="pull"]';
    var list = Array.prototype.filter.call(document.querySelectorAll(sel), function (n) {
      if (n.closest('.ik-card,.ik-plate,.ik-menu,.ik-pill,.infera-stay,nav,header,footer,[hidden]') || (n.parentNode.closest && n.parentNode.closest('.ik-rv'))) return false;
      var b = n.getBoundingClientRect(); if (!b.width || !b.height || b.top < innerHeight * 1.05) return false;
      var cs = getComputedStyle(n); return cs.position !== 'fixed' && cs.position !== 'sticky' && cs.opacity === '1' && cs.transform === 'none' && cs.transitionDuration === '0s' && cs.animationName === 'none';
    }).slice(0, 160);
    if (!list.length) return;
    var kept = []; list.forEach(function (n) { if (!kept.some(function (k) { return k.contains(n); })) kept.push(n); });
    function count(n) {
      var big = Array.prototype.filter.call(n.querySelectorAll('*'), function (c) { return !c.children.length && !c.id && /^[$]?\d[\d,]*(\.\d+)?\s?(%|M|B|K|bn|m)?$/.test((c.textContent || '').trim()) && parseFloat(getComputedStyle(c).fontSize) >= 26 && !c.closest('[aria-live],button,a,input,select'); }).slice(0, 4);
      big.forEach(function (c) {
        var txt = c.textContent, mm = txt.trim().match(/^([$]?)(\d[\d,]*)(\.\d+)?(.*)$/), end = parseFloat((mm[2] + (mm[3] || '')).replace(/,/g, '')), dec = mm[3] ? mm[3].length - 1 : 0, t0 = 0, last = txt;
        if (!(end > 0)) return;
        function step(ts) { if (!t0) t0 = ts; if (c.textContent !== last) return; var k = Math.min(1, (ts - t0) / 900); if (k >= 1) { c.textContent = txt; return; } var v = end * (1 - Math.pow(1 - k, 3)); last = mm[1] + (dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US')) + mm[4]; c.textContent = last; requestAnimationFrame(step); }
        requestAnimationFrame(step);
      });
    }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { var n = e.target; n.classList.add('in'); io.unobserve(n); setTimeout(function () { n.classList.remove('ik-rv', 'in'); }, 900); try { count(n); } catch (_) {} } }); }, { rootMargin: '0px 0px -8% 0px', threshold: .05 });
    kept.forEach(function (n) { n.classList.add('ik-rv'); io.observe(n); });
    addEventListener('beforeprint', function () { kept.forEach(function (n) { n.classList.add('in'); }); });
    addEventListener('hashchange', function () { setTimeout(function () { kept.forEach(function (n) { if (n.getBoundingClientRect().top < innerHeight) n.classList.add('in'); }); }, 400); });
  }

  function init() {
    if (document.querySelector('[data-no-kit]')) return;
    var w = words(); if (w < 700) return;
    css();
    var total = Math.max(2, Math.round(w / 230 + 1));
    reading(total);
    try { reveals(); } catch (_) {}
    var x = new XMLHttpRequest();
    try { x.open('GET', BASE + 'connections.json'); x.onload = function () { var db; try { db = JSON.parse(x.responseText); } catch (_) { return; } try { plate(db); } catch (_) {} try { keepGoing(db); } catch (_) {} }; x.send(); } catch (_) {}
  }
  if (document.readyState === 'complete') setTimeout(init, 0); else addEventListener('load', function () { setTimeout(init, 60); });
})();
