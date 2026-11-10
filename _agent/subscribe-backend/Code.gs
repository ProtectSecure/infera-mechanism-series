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
  return '<hr style="border:0;border-top:1px solid #ddd;margin:28px 0 12px"><p style="font:12px/1.6 Arial,sans-serif;color:#777">You are getting this because you signed up at series.melophon.com. <a href="' + url_() + '?unsub=' + token + '">Unsubscribe in one click</a>. ' + POSTAL + '</p>';
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
        sendConfirm_(email, all[i][5], tag);                                        // resend the confirm link
        return json_({ ok: true, status: 'pending', founding: foundingCount_(sh) });
      }
    }
    if (tag === 'founding-500' && foundingCount_(sh) >= FOUNDING_CAP) tag = 'reader';
    var token = Utilities.getUuid().replace(/-/g, '');
    sh.appendRow([email, tag, String(d.source || '').slice(0, 120), new Date(), 'pending', token, '', '']);
    sendConfirm_(email, token, tag);
    return json_({ ok: true, status: 'pending', founding: foundingCount_(sh) });
  } catch (err) { return json_({ ok: false, error: 'server' }); }
  finally { lock.releaseLock(); }
}

function doGet(e) {
  var p = e.parameter || {}, sh = sheet_();
  if (p.count) return json_({ founding: foundingCount_(sh), cap: FOUNDING_CAP });
  var token = p.confirm || p.unsub; if (!token) return page_('Nothing to do here.', 'This address handles list sign-ups for the series.');
  var all = rows_(sh);
  for (var i = 0; i < all.length; i++) {
    if (all[i][5] === token) {
      if (p.unsub) { sh.getRange(i + 2, 5).setValue('unsubscribed'); return page_('You are unsubscribed.', 'We will not email this address again. To erase the record entirely, write to infera@melophon.com.'); }
      if (all[i][4] !== 'confirmed') {
        sh.getRange(i + 2, 5).setValue('confirmed'); sh.getRange(i + 2, 7).setValue(new Date());
        var founding = all[i][1] === 'founding-500', seat = '';
        if (founding) { seat = foundingCount_(sh); if (seat > FOUNDING_CAP) { sh.getRange(i + 2, 2).setValue('reader'); founding = false; } else sh.getRange(i + 2, 8).setValue(seat); }
        MailApp.sendEmail({ to: all[i][0], name: FROM_NAME, subject: founding ? 'Seat ' + seat + ' of 500 is yours' : 'You are on the list',
          htmlBody: '<div style="font:17px/1.6 Georgia,serif;color:#222;max-width:560px">' + (founding ? '<p>Your founding seat is confirmed: <b>seat ' + seat + ' of 500</b>.</p><p>You will get one email a month from the editor, early drafts, and a place on the masthead if you want one. Reply to this email with the name you would like shown, or tell us you would rather stay unnamed.</p>' : '<p>You are confirmed. You will get one short email when a new piece is published, and nothing else.</p>') + '<p>Start anywhere: <a href="' + SITE + '">series.melophon.com</a></p>' + footer_(token) + '</div>' });
        return page_(founding ? 'Seat ' + seat + ' of 500 is yours.' : 'You are confirmed.', 'A welcome note is on its way. One short email per drop, and you can leave in one click.');
      }
      return page_('Already confirmed.', 'You are on the list. Nothing else to do.');
    }
  }
  return page_('That link has expired.', 'Sign up again on the site and we will send a fresh one.');
}

function sendConfirm_(email, token, tag) {
  MailApp.sendEmail({ to: email, name: FROM_NAME, subject: tag === 'founding-500' ? 'Confirm your Founding 500 seat' : 'Confirm your subscription',
    htmlBody: '<div style="font:17px/1.6 Georgia,serif;color:#222;max-width:560px"><p>Someone entered this address at series.melophon.com. If that was you, confirm here:</p><p><a href="' + url_() + '?confirm=' + token + '" style="display:inline-block;background:#0a0a0a;color:#c8ff1e;padding:14px 22px;text-decoration:none;font:700 13px/1 monospace;letter-spacing:.12em">CONFIRM</a></p><p style="color:#666;font-size:14px">If it was not you, ignore this email and nothing happens.</p></div>' });
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
