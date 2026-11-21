/**
 * INFERA · subscriber list backend (Google Apps Script, free).
 * The list lives in a Google Sheet you own. Nothing is shared with a vendor.
 *
 * What it does
 *   POST {email, tag, source}  -> saves the address as "pending" and emails one confirm link (double opt-in)
 *   GET  ?confirm=TOKEN        -> marks the address confirmed, sends the welcome note
 *   GET  ?unsub=TOKEN          -> one-click unsubscribe (every email carries this link)
 *   GET  ?count=1              -> {"founding": N} for the Founding 500 counter (confirmed seats only)
 *   sendIssue(subject, html)   -> run by hand from the editor to email every confirmed reader
 *
 * Setup: see README.md in this folder (about five minutes).
 */
var SHEET = 'subscribers';
var FROM_NAME = 'Infera · The Mechanism Series';
var SITE = 'https://series.melophon.com/';
var FOUNDING_CAP = 500;
var POSTAL = 'ADD YOUR MAILING ADDRESS HERE'; // U.S. law (CAN-SPAM) requires a postal address in every list email

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET);
  if (!sh) { sh = ss.insertSheet(SHEET); sh.appendRow(['email', 'tag', 'source', 'signed_up', 'status', 'token', 'confirmed_at', 'seat']); sh.setFrozenRows(1); }
  return sh;
}
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function page_(title, body) {
  return HtmlService.createHtmlOutput('<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + title + '</title><body style="margin:0;background:#0a0a0a;color:#fbf7eb;font-family:Georgia,serif"><div style="max-width:560px;margin:18vh auto;padding:0 24px"><p style="font:700 11px/1 monospace;letter-spacing:.2em;color:#c8ff1e">INFERA · THE MECHANISM SERIES</p><h1 style="font-weight:400;font-size:34px;line-height:1.15">' + title + '</h1><p style="font-size:18px;line-height:1.6;color:#d8d2c2">' + body + '</p><p><a style="color:#c8ff1e" href="' + SITE + '">Back to the series</a></p></div></body>');
}
function rows_(sh) { var v = sh.getDataRange().getValues(); v.shift(); return v; }
function foundingCount_(sh) { return rows_(sh).filter(function (r) { return r[1] === 'founding-500' && r[4] === 'confirmed'; }).length; }
function url_() { return ScriptApp.getService().getUrl(); }
function footer_(token) {
  return '<hr style="border:0;border-top:1px solid #ddd;margin:28px 0 12px"><p style="font:12px/1.6 Arial,sans-serif;color:#777">You are getting this because you signed up at series.melophon.com. <a href="' + SITE + 'confirm.html?unsub=' + token + '">Unsubscribe in one click</a>. ' + POSTAL + '</p>';
}

/* ---------- Email design: "the file" ----------
   Every reader gets a file, and the email shows them all of it: the address, when and where they signed up,
   and its status. That is everything this list holds, so the email can say so truthfully. No tracking pixel. */
function esc_(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function when_(d) { try { return Utilities.formatDate(new Date(d), 'America/New_York', "d MMM yyyy, h:mm a") + ' ET'; } catch (e) { return ''; } }
function fileNo_(n) { return ('0000' + n).slice(-5); }
function fileCard_(f) {
  var rows = [['Subject', esc_(f.email)], ['Opened', esc_(when_(f.opened))], ['Opened at', 'series.melophon.com' + esc_(String(f.source || '/').replace(/^(?!\/)/, '/'))],
              ['Status', f.status], ['Holds', 'Nothing else. No name, no location, no reading history.']];
  if (f.seat) rows.splice(4, 0, ['Seat', 'Founding seat ' + f.seat + ' of ' + FOUNDING_CAP]);
  var h = '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px dashed #6b675c;border-radius:6px;background:#111210"><tr><td style="padding:16px 18px 6px;font:700 11px/1.2 Menlo,Consolas,monospace;letter-spacing:2px;color:#c8ff1e;text-transform:uppercase;white-space:nowrap">File No. ' + fileNo_(f.no) + '</td><td align="right" style="padding:16px 18px 6px;font:700 11px/1.2 Menlo,Consolas,monospace;letter-spacing:2px;color:#8a867a;text-transform:uppercase">Infera</td></tr>';
  rows.forEach(function (r) { h += '<tr><td valign="top" width="96" style="padding:8px 0 8px 18px;font:11px/1.5 Menlo,Consolas,monospace;letter-spacing:1px;color:#8a867a;text-transform:uppercase;border-top:1px solid #24251f">' + r[0] + '</td><td valign="top" style="padding:8px 18px 8px 10px;font:14px/1.5 Menlo,Consolas,monospace;color:#fbf7eb;border-top:1px solid #24251f;word-break:break-word">' + r[1] + '</td></tr>'; });
  return h + '<tr><td colspan="2" style="height:8px;font-size:0;line-height:0">&nbsp;</td></tr></table>';
}
function button_(href, label) { return '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px 0 8px"><tr><td bgcolor="#c8ff1e" style="border-radius:3px"><a href="' + href + '" style="display:inline-block;padding:16px 26px;font:700 13px/1 Menlo,Consolas,monospace;letter-spacing:2px;color:#0a0a0a;text-decoration:none;text-transform:uppercase">' + label + '</a></td></tr></table>'; }
function shell_(preheader, inner, token) {
  var bar = ['#06d6a0', '#8b9cff', '#e7b8ff', '#d9b35a'].map(function (c) { return '<td height="4" bgcolor="' + c + '" style="font-size:0;line-height:0">&nbsp;</td>'; }).join('');
  return '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"></head><body style="margin:0;padding:0;background:#0a0a0a">' +
    '<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#0a0a0a">' + preheader + '</div>' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#0a0a0a"><tr><td align="center" style="padding:24px 12px">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px"><tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>' + bar + '</tr></table></td></tr>' +
    '<tr><td style="padding:26px 6px 0;font:700 11px/1 Menlo,Consolas,monospace;letter-spacing:3px;color:#c8ff1e;text-transform:uppercase">Infera &middot; The Mechanism Series</td></tr>' +
    '<tr><td style="padding:0 6px;font:17px/1.65 Georgia,serif;color:#d8d2c2">' + inner + '</td></tr>' +
    '<tr><td style="padding:30px 6px 0;border-top:1px solid #24251f;font:12px/1.7 Arial,sans-serif;color:#8a867a"><br>This email has no tracking pixel. We cannot see whether you opened it.<br>' +
    (token ? 'You are getting this because you signed up at series.melophon.com. <a href="' + SITE + 'confirm.html?unsub=' + token + '" style="color:#8a867a">Close your file (unsubscribe)</a>.<br>' : 'You are getting this because someone entered this address at series.melophon.com.<br>') + esc_(POSTAL) + '</td></tr></table></td></tr></table></body></html>';
}
function h1_(t) { return '<h1 style="margin:22px 0 14px;font:400 34px/1.12 Georgia,serif;color:#fbf7eb">' + t + '</h1>'; }
function p_(t) { return '<p style="margin:0 0 16px">' + t + '</p>'; }

function confirmEmail_(f, token) {
  var founding = f.tag === 'founding-500', link = SITE + 'confirm.html?confirm=' + token;
  f.status = '<span style="color:#ffd500">Pending. Waiting on you.</span>';
  var html = shell_('One click makes it official. Inside: everything we hold on you. It is short.',
    h1_(founding ? 'Glad you are here. Your seat is waiting.' : 'Glad you found us.') +
    p_('One click below makes it official. First, something most lists never show you: everything we hold on you.') + fileCard_(f) +
    p_('<br>That is the whole file, and it stays that short. Most files kept on you run longer, and you never get to read them: the data broker&#39;s, the bank&#39;s, the power company&#39;s, the one behind the app you opened this morning.') +
    p_('The Mechanism Series opens files like those and lets you work the machinery yourself: <span style="color:#06d6a0">who pays</span>, <span style="color:#8b9cff">who keeps the record</span>, <span style="color:#e7b8ff">which clock is running</span>, and <span style="color:#d9b35a">whose voice gets heard</span>. Come in and try one.') +
    button_(link, founding ? 'Confirm my founding seat' : 'Confirm and come in') +
    p_('<span style="font-size:14px;color:#8a867a">If this was not you, do nothing. We will not write again unless this address is entered again.</span>'), null);
  var text = (founding ? 'Glad you are here. Your seat is waiting.' : 'Glad you found us.') + '\n\nOne click makes it official:\n' + link + '\n\nFirst, something most lists never show you: everything we hold on you.\n\n  File no.   ' + fileNo_(f.no) + '\n  Subject    ' + f.email + '\n  Opened     ' + when_(f.opened) + '\n  Status     Pending. Waiting on you.\n  Holds      Nothing else.\n\nThat is the whole file, and it stays that short.\n\nIf this was not you, do nothing. We will not write again unless this address is entered again.\n\n' + POSTAL;
  return { subject: founding ? 'Welcome. One click to confirm your founding seat.' : 'Welcome. One click to confirm your place.', html: html, text: text };
}

function welcomeEmail_(f, token) {
  var founding = !!f.seat;
  f.status = '<span style="color:#c8ff1e">Confirmed ' + esc_(when_(f.confirmed)) + '</span>';
  function door(color, kicker, title, href, line) { return '<tr><td style="padding:0 0 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#141512;border-left:3px solid ' + color + '"><tr><td style="padding:14px 16px"><div style="font:700 10px/1 Menlo,Consolas,monospace;letter-spacing:2px;color:' + color + ';text-transform:uppercase">' + kicker + '</div><a href="' + SITE + href + '" style="display:block;margin:7px 0 5px;font:400 21px/1.2 Georgia,serif;color:#fbf7eb;text-decoration:none">' + title + ' &rarr;</a><div style="font:15px/1.5 Georgia,serif;color:#b9b3a3">' + line + '</div></td></tr></table></td></tr>'; }
  var html = shell_(founding ? 'Seat ' + f.seat + ' of ' + FOUNDING_CAP + ' is yours. Three doors to start.' : 'Your file is confirmed. Three doors to start.',
    h1_(founding ? 'Seat ' + f.seat + ' of ' + FOUNDING_CAP + ' is yours.' : 'You are in. Welcome.') +
    p_('Your file, updated:') + fileCard_(f) +
    p_('<br>That is still the whole thing, and it stays that way. One short email when a new piece is published. Nothing sold, nothing shared.') +
    (founding ? p_('As a founding reader you also get one note a month from the editor, early drafts, and a place on the masthead if you want one. Reply with the name you would like shown, or tell us you would rather stay unnamed.') : '') +
    p_('You have joined people who would rather see how a thing works than be told what to think about it. Every piece here is built to be handled, not just read. Three doors, depending on what you are curious about tonight:') +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">' +
    door('#06d6a0', 'Money &middot; 9 min', 'Who Pays for the Scam', 'who-pays-for-the-scam.html', 'You are tricked into sending money. Who covers the loss, you or your bank? Britain and the U.S. answer differently. Play both.') +
    door('#8b9cff', 'Records &middot; 11 min', 'The Permanent Record', 'the-permanent-record.html', 'One life, from the baptismal font to the alumni office. See what a lifelong file can hold, and which laws reach it.') +
    door('#d9b35a', 'All four threads &middot; 6 min', 'The Loom', 'the-loom.html', 'Pick any two pieces and see how they sit together. Some pairings are written up. The rest are yours to find.') +
    '</table>' +
    p_('<br>Found a connection we missed, or a claim you think is wrong? Reply to this email. It goes to the editor, and corrections are part of the work.'), token);
  var text = (founding ? 'Seat ' + f.seat + ' of ' + FOUNDING_CAP + ' is yours.' : 'You are in. Welcome.') + '\n\nYour file is confirmed (' + when_(f.confirmed) + '). It still holds only your address, when you signed up, and where.\n\nOne short email when a new piece is published. Nothing sold, nothing shared.\n\nThree doors to start:\n\nWho Pays for the Scam\n' + SITE + 'who-pays-for-the-scam.html\n\nThe Permanent Record\n' + SITE + 'the-permanent-record.html\n\nThe Loom\n' + SITE + 'the-loom.html\n\nReply to this email any time. It goes to the editor.\n\nClose your file (unsubscribe): ' + SITE + 'confirm.html?unsub=' + token + '\n' + POSTAL;
  return { subject: founding ? 'Seat ' + f.seat + ' of ' + FOUNDING_CAP + ' is yours. Your file is confirmed.' : 'Your file is confirmed. Three doors to start.', html: html, text: text };
}

function doPost(e) {
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    var d = JSON.parse((e.postData && e.postData.contents) || '{}');
    var email = String(d.email || '').trim().toLowerCase();
    if (d.website) return json_({ ok: true, status: 'ok' });                       // honeypot: pretend success
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 200) return json_({ ok: false, error: 'bad email' });
    var tag = d.tag === 'founding-500' ? 'founding-500' : 'reader';
    var sh = sheet_(), all = rows_(sh), i;
    for (i = 0; i < all.length; i++) {
      if (String(all[i][0]).toLowerCase() === email) {
        if (all[i][4] === 'confirmed') {
          if (tag === 'founding-500' && all[i][1] !== 'founding-500' && foundingCount_(sh) < FOUNDING_CAP) { sh.getRange(i + 2, 2).setValue('founding-500'); sh.getRange(i + 2, 8).setValue(foundingCount_(sh)); }
          return json_({ ok: true, status: 'already', founding: foundingCount_(sh) });
        }
        sh.getRange(i + 2, 5).setValue('pending'); sh.getRange(i + 2, 2).setValue(tag);
        sendConfirm_({ no: i + 1, email: email, tag: tag, source: all[i][2], opened: all[i][3] }, all[i][5]);   // resend the confirm link
        return json_({ ok: true, status: 'pending', founding: foundingCount_(sh) });
      }
    }
    if (tag === 'founding-500' && foundingCount_(sh) >= FOUNDING_CAP) tag = 'reader';
    var token = Utilities.getUuid().replace(/-/g, '');
    sh.appendRow([email, tag, String(d.source || '').slice(0, 120), new Date(), 'pending', token, '', '']);
    sendConfirm_({ no: sh.getLastRow() - 1, email: email, tag: tag, source: String(d.source || '').slice(0, 120), opened: new Date() }, token);
    return json_({ ok: true, status: 'pending', founding: foundingCount_(sh) });
  } catch (err) { return json_({ ok: false, error: 'server' }); }
  finally { lock.releaseLock(); }
}

function doGet(e) {
  var p = e.parameter || {}, sh = sheet_();
  if (p.count) return json_({ founding: foundingCount_(sh), cap: FOUNDING_CAP });
  var r = act_(p, sh);
  return p.json ? json_(r) : page_(r.title, r.body);
}
/** Confirm or unsubscribe by token. Returns {state, title, body}; the site's confirm.html asks for it as JSON. */
function act_(p, sh) {
  var token = p.confirm || p.unsub; if (!token) return { state: 'none', title: 'Nothing to do here.', body: 'This address handles list sign-ups for the series.' };
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    var all = rows_(sh);
    for (var i = 0; i < all.length; i++) {
      if (all[i][5] === token) {
        if (p.unsub) { sh.getRange(i + 2, 5).setValue('unsubscribed'); return { state: 'unsubscribed', title: 'You are unsubscribed.', body: 'We will not email this address again. To erase the record entirely, write to infera@melophon.com.' }; }
        if (all[i][4] !== 'confirmed') {
          sh.getRange(i + 2, 5).setValue('confirmed'); sh.getRange(i + 2, 7).setValue(new Date());
          var founding = all[i][1] === 'founding-500', seat = '';
          if (founding) { seat = foundingCount_(sh); if (seat > FOUNDING_CAP) { sh.getRange(i + 2, 2).setValue('reader'); founding = false; } else sh.getRange(i + 2, 8).setValue(seat); }
          try {
            var w = welcomeEmail_({ no: i + 1, email: all[i][0], source: all[i][2], opened: all[i][3], confirmed: new Date(), seat: founding ? seat : '' }, token);
            MailApp.sendEmail({ to: all[i][0], name: FROM_NAME, subject: w.subject, body: w.text, htmlBody: w.html });
          } catch (err) {}   // the confirmation stands even if the welcome note cannot be sent today
          return { state: 'confirmed', seat: seat, title: founding ? 'Seat ' + seat + ' of 500 is yours.' : 'You are confirmed.', body: 'A welcome note is on its way. One short email per drop, and you can leave in one click.' };
        }
        return { state: 'already', title: 'Already confirmed.', body: 'You are on the list. Nothing else to do.' };
      }
    }
    return { state: 'expired', title: 'That link has expired.', body: 'Sign up again on the site and we will send a fresh one.' };
  } finally { lock.releaseLock(); }
}

function sendConfirm_(f, token) {
  var m = confirmEmail_(f, token);
  MailApp.sendEmail({ to: f.email, name: FROM_NAME, subject: m.subject, body: m.text, htmlBody: m.html });
}

/** Run from the editor: sendIssue('Subject line', '<p>Body html</p>'). Sends to confirmed readers only. */
function sendIssue(subject, html, onlyTag) {
  var sh = sheet_(), all = rows_(sh), left = MailApp.getRemainingDailyQuota(), sent = 0;
  for (var i = 0; i < all.length && left > 1; i++) {
    if (all[i][4] !== 'confirmed') continue;
    if (onlyTag && all[i][1] !== onlyTag) continue;
    MailApp.sendEmail({ to: all[i][0], name: FROM_NAME, subject: subject, htmlBody: '<div style="font:17px/1.6 Georgia,serif;color:#222;max-width:600px">' + html + footer_(all[i][5]) + '</div>' });
    sent++; left--;
  }
  Logger.log('Sent ' + sent + '. Quota left today: ' + left);
  return sent;
}
