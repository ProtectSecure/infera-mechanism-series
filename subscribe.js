/* INFERA · one subscribe module for every page.
   ------------------------------------------------------------------
   SET THIS ONE LINE when the list backend is deployed (see
   _agent/subscribe-backend/README.md). Until it is set, the forms tell the
   reader the truth: their email app opens and nothing is saved until they
   press send.
*/
var INFERA_SUBSCRIBE_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyD4WtfeqKFyjXCR_Muzkvzqg2o7O7gkqM0y1d7JExUP-NUHtku6u28HBQBGhjpwgejKQ/exec';   // e.g. 'https://script.google.com/macros/s/XXXX/exec'

(function () {
  'use strict';
  var EP = (window.INFERA_SUBSCRIBE_OVERRIDE || INFERA_SUBSCRIBE_ENDPOINT || '').trim();
  var QKEY = 'infera.signup.queue', DKEY = 'infera.subscribed';
  var SEL = 'form#bsSignup, form#foundingSignup, form[data-stayclose], form[data-subscribe]';
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var BASE = (document.currentScript && document.currentScript.getAttribute('data-root')) || '';

  function ls(get, k, v) { try { if (get) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (_) {} return null; }
  function queue() { try { return JSON.parse(ls(true, QKEY) || '[]'); } catch (_) { return []; } }
  function saveQueue(q) { ls(false, QKEY, JSON.stringify(q.slice(-20))); }
  function tagOf(form) {
    var t = form.querySelector('input[name=tag]');
    return (form.getAttribute('data-tag') || (t && t.value) || (form.id === 'foundingSignup' ? 'founding-500' : 'reader'));
  }
  function note(form) {
    var n = form.parentNode.querySelector('.sub-note');
    if (!n) { n = document.createElement('p'); n.className = 'sub-note'; n.setAttribute('role', 'status'); n.setAttribute('aria-live', 'polite');
      n.style.cssText = 'margin:10px 0 0;font:12px/1.5 ui-monospace,Menlo,monospace;letter-spacing:.02em;opacity:.9';
      form.parentNode.insertBefore(n, form.nextSibling); }
    return n;
  }
  function mailto(email, tag) {
    var s = encodeURIComponent(tag === 'founding-500' ? 'Founding 500 · claim my seat' : 'Subscribe me · Mechanism Series');
    var b = encodeURIComponent('Please add this address to the list: ' + email + '\nList: ' + tag + '\nFrom page: ' + location.pathname + '\n\n(Just press send.)');
    return 'mailto:infera@melophon.com?subject=' + s + '&body=' + b;
  }
  function send(rec) {
    // text/plain keeps this a simple request (no preflight); the backend parses JSON.
    return fetch(EP, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(rec), redirect: 'follow' })
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .then(function (j) { if (!j || j.ok !== true) throw new Error((j && j.error) || 'rejected'); return j; });
  }

  // Self-heal: anything that failed to reach the list earlier is retried quietly on the next visit.
  function retryQueue() {
    if (!EP) return;
    var q = queue().filter(function (r) { return r && r.email && !r.sent; });
    if (!q.length) return;
    var keep = [];
    q.reduce(function (p, rec) {
      return p.then(function () { return send(rec).catch(function () { rec.tries = (rec.tries || 0) + 1; if (rec.tries < 6) keep.push(rec); }); });
    }, Promise.resolve()).then(function () { saveQueue(keep); });
  }

  function handle(form) {
    var input = form.querySelector('input[type=email]'), btn = form.querySelector('button[type=submit],button');
    var hp = form.querySelector('input[name=website]');
    var email = (input.value || '').trim().toLowerCase(), tag = tagOf(form), n = note(form);
    if (hp && hp.value) return;                         // bots fill hidden fields
    if (!EMAIL.test(email)) { n.textContent = 'That does not look like an email address. Check it and try again.'; input.focus(); return; }
    var rec = { email: email, tag: tag, source: location.pathname, at: new Date().toISOString() };
    var label = btn.textContent;

    if (!EP) {                                          // honest fallback: no list backend yet
      n.innerHTML = 'Your email app is opening with a short note to us. <b>Press send to finish.</b> Nothing is saved until you do. No email app? Write to <a href="' + mailto(email, tag) + '" style="color:inherit;text-decoration:underline">infera@melophon.com</a>.';
      window.location.href = mailto(email, tag);
      return;
    }
    btn.disabled = true; btn.textContent = 'Sending…'; n.textContent = '';
    send(rec).then(function (j) {
      form.classList.add('thanks'); input.disabled = true;
      ls(false, DKEY, tag);
      if (j.status === 'already') { btn.textContent = '✓ Already in'; n.textContent = 'You are already on the list. Nothing else to do.'; }
      else { btn.textContent = tag === 'founding-500' ? '✓ Seat held' : '✓ Almost done';
        n.textContent = 'Check your inbox for one email from infera@melophon.com and press the confirm link. That is the only step left.'; }
      if (typeof j.founding === 'number') paintCounter(j.founding);
    }).catch(function () {
      var q = queue(); q.push(rec); saveQueue(q);
      btn.disabled = false; btn.textContent = label;
      n.innerHTML = 'We could not reach the list just now. Your address is saved on this device and we will retry on your next visit. To be sure, <a href="' + mailto(email, tag) + '" style="color:inherit;text-decoration:underline">send it by email</a>.';
    });
  }

  // Capture phase so this replaces older inline handlers on every page.
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (!f || !f.matches || !f.matches(SEL)) return;
    e.preventDefault(); e.stopImmediatePropagation();
    handle(f);
  }, true);

  // Honeypot on every list form.
  function arm() {
    Array.prototype.forEach.call(document.querySelectorAll(SEL), function (f) {
      if (f.querySelector('input[name=website]')) return;
      var h = document.createElement('input'); h.type = 'text'; h.name = 'website'; h.tabIndex = -1; h.autocomplete = 'off';
      h.setAttribute('aria-hidden', 'true'); h.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0';
      f.appendChild(h);
    });
  }

  // Founding 500: only ever show a number the backend reported.
  function paintCounter(nClaimed) {
    var c = document.querySelector('[data-founding-counter]'); if (!c) return;
    var n = Math.max(0, Math.min(500, nClaimed | 0));
    var h = c.querySelector('[data-claimed]'), r = c.querySelector('[data-remaining]'), of = c.querySelector('[data-of]');
    if (h) h.innerHTML = n + ' seats <em>claimed.</em>';
    if (r) r.textContent = 500 - n;
    if (of) of.innerHTML = 'seats remain<b>of 500</b>';
    c.style.setProperty('--claimed', n);
    if (n >= 500) { var f = document.getElementById('foundingSignup'); if (f) { f.querySelector('button').disabled = true; note(f).textContent = 'The founding cohort is full. The regular list is open on the home page.'; } }
  }
  function loadCounter() {
    if (!EP || !document.querySelector('[data-founding-counter]')) return;
    fetch(EP + (EP.indexOf('?') < 0 ? '?' : '&') + 'count=1').then(function (r) { return r.json(); })
      .then(function (j) { if (j && typeof j.founding === 'number') paintCounter(j.founding); }).catch(function () {});
  }

  // A quiet way to subscribe on every long page that does not already have a form.
  function strip() {
    if (document.querySelector(SEL) || document.querySelector('[data-no-subscribe]')) return;
    if (ls(true, DKEY)) return;                           // already a subscriber on this device
    var base = BASE;
    var a = document.createElement('aside'); a.className = 'infera-stay'; a.setAttribute('aria-label', 'Subscribe');
    a.innerHTML = '<style>.infera-stay{margin:0;padding:44px 6vw;background:#0a0a0a;color:#fbf7eb;border-top:3px solid #c8ff1e;font-family:Georgia,serif}.infera-stay .in{max-width:980px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:28px;align-items:center}.infera-stay .k{font:700 10.5px/1 ui-monospace,Menlo,monospace;letter-spacing:.2em;text-transform:uppercase;color:#c8ff1e;margin-bottom:8px}.infera-stay h4{font:400 clamp(22px,2.4vw,30px)/1.15 Georgia,serif;margin:0 0 6px;color:#fbf7eb}.infera-stay p{font-size:15px;line-height:1.5;color:rgba(251,247,235,.72);margin:0}.infera-stay form{display:flex;width:100%;position:relative}.infera-stay input[type=email]{flex:1;min-width:0;background:transparent;border:1.5px solid rgba(200,255,30,.5);border-right:0;color:#fbf7eb;padding:14px;font:14px/1 ui-monospace,Menlo,monospace}.infera-stay button{background:#c8ff1e;color:#0a0a0a;border:1.5px solid #c8ff1e;padding:0 20px;min-height:46px;font:700 11px/1 ui-monospace,Menlo,monospace;letter-spacing:.18em;text-transform:uppercase;cursor:pointer}.infera-stay a{color:#c8ff1e}.infera-stay .sub-note{color:#fbf7eb}@media(max-width:760px){.infera-stay .in{grid-template-columns:1fr;gap:16px}}</style>' +
      '<div class="in"><div><div class="k">Stay close</div><h4>You read to the end. The next one lands quietly.</h4><p>One short email per drop. No tracking pixels, no list rental. One-click unsubscribe. Or claim a seat in the <a href="' + base + 'founding.html">Founding 500</a>.</p></div>' +
      '<div><form data-subscribe autocomplete="off" novalidate><input type="email" name="email" required placeholder="your@email.com" aria-label="Your email address"><button type="submit">Subscribe</button></form></div></div>';
    var lf = document.querySelector('.legal-footer') || document.querySelector('body > footer');
    if (lf && lf.parentNode) lf.parentNode.insertBefore(a, lf); else document.body.appendChild(a);
  }

  function init() { strip(); arm(); loadCounter(); retryQueue(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
