/* THE LOOM · shared helpers for the remix exhibits. */
var Loom = (function () {
  'use strict';
  var T = { F: '<span class="tag fact">FACT</span>', R: '<span class="tag rep">REPORTED</span>', I: '<span class="tag inf">INFERENCE</span>', W: '<span class="tag watch">WATCH</span>', A: '<span class="tag all">ALLEGED</span>' };
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function src(href, label) { return '<span class="sub">from <a href="' + href + '">' + label + '</a></span>'; }
  function recall(Q, hostId, scoreId, doneMsg) {
    var rc = $(hostId || 'recall'), answered = 0, right = 0;
    Q.forEach(function (q) {
      var d = el('div', 'rq', '<div class="q">' + q[0] + '</div><div class="opts"></div><div class="back">Back to <a href="' + q[4] + '">' + q[3] + '</a></div>'), o = d.querySelector('.opts');
      q[1].forEach(function (t, i) { var b = el('button', '', t); b.type = 'button'; b.addEventListener('click', function () { if (d.classList.contains('done')) return; d.classList.add('done'); answered++; if (i === q[2]) right++; b.classList.add(i === q[2] ? 'ok' : 'no'); o.children[q[2]].classList.add('ok'); if (answered === Q.length) $(scoreId || 'recallScore').textContent = right + ' of ' + Q.length + '. ' + (doneMsg || 'Each link above goes back to where the answer lives.'); }); o.appendChild(b); });
      rc.appendChild(d);
    });
  }
  // "You found a thread" · keep a reader's own convergence on their device and offer to send it in.
  function cue(host, text) {
    var w = el('div', 'cue'), save = el('button', 'btn', 'Keep this thread'), send = el('a', 'btn', 'Send it to the desk');
    save.type = 'button';
    send.href = 'mailto:infera@melophon.com?subject=' + encodeURIComponent('A thread I found in The Loom') + '&body=' + encodeURIComponent(text + '\n\nFound on: ' + location.pathname + '\n\nWhat I think it means: ');
    send.style.textDecoration = 'none'; send.style.color = 'inherit';
    save.addEventListener('click', function () { try { var k = 'infera.loom.kept', a = JSON.parse(localStorage.getItem(k) || '[]'); if (a.indexOf(text) < 0) a.push(text); localStorage.setItem(k, JSON.stringify(a.slice(-30))); save.textContent = '✓ Kept on this device (' + a.length + ')'; } catch (_) { save.textContent = 'Could not save here'; } });
    w.appendChild(save); w.appendChild(send); host.appendChild(w); return w;
  }
  var REMIX = [['the-loom.html', 'The Loom'], ['one-life-every-ledger.html', 'One Life, Every Ledger'], ['the-liability-switchboard.html', 'The Liability Switchboard'], ['clocks-collide.html', 'Clocks Collide'], ['same-model-different-customer.html', 'Same Model, Different Customer'], ['the-promise-audit.html', 'The Promise Audit'], ['one-message-upstream.html', 'One Message, Upstream']];
  function shelf(hostId) {
    var h = $(hostId || 'shelf'); if (!h) return; var here = location.pathname.split('/').pop();
    h.innerHTML = '<div class="k">The Loom · seven remixes</div><div class="chips">' + REMIX.map(function (r) { return '<a class="btn' + (r[0] === here ? ' on' : '') + '" style="text-decoration:none" href="' + r[0] + '">' + r[1] + '</a>'; }).join('') + '</div>';
  }
  document.addEventListener('DOMContentLoaded', function () { shelf(); });
  return { T: T, $: $, el: el, src: src, recall: recall, cue: cue, REMIX: REMIX };
})();
