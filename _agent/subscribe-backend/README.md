# Subscriber list backend · setup (about five minutes, free)

**What was wrong (diagnosed 10 Nov 2026).** No subscribe form on the site was connected to a list. All ten forms opened the reader's own email app (`mailto:`) and then showed "✓ Subscribed" whether or not the reader pressed send. The Founding 500 page also had a script error, and its counter ("247 seats claimed") was a fixed number in the page, not a count. No one could become a member, and no one could be confirmed or unsubscribed.

**What is fixed on the site.** One module, `subscribe.js`, now runs every form. Until a backend is connected it tells readers the truth (their email app opens; nothing is saved until they press send). The counter no longer shows a number the list did not report.

**What you do once** (this needs your Google account, which is why it is not done for you):

1. Signed in as the account that should own the list, create a Google Sheet named `Infera subscribers`.
2. In the Sheet: Extensions → Apps Script. Delete what is there, paste all of `Code.gs` from this folder. Put your mailing address in the `POSTAL` line (U.S. law requires a postal address in list email; a P.O. box is fine).
3. Deploy → New deployment → type **Web app**. Execute as **Me**. Who has access **Anyone**. Deploy, approve the permissions (Sheets and sending mail as you).
4. Copy the Web app URL (it ends in `/exec`).
5. Paste it into the first line of `subscribe.js`: `var INFERA_SUBSCRIBE_ENDPOINT = 'https://script.google.com/macros/s/…/exec';` and publish. (Or send the URL to Claude and it will do this step and test it.)

**What readers get.** Sign up → one confirm email → click → welcome note. Founding members get their seat number. Every email has a one-click unsubscribe. The Founding 500 counter shows confirmed seats only and the form closes itself at 500.

**Sending an issue.** In the Apps Script editor run `sendIssue('Subject', '<p>Body</p>')`; add a third argument `'founding-500'` for the founding cohort only.

**Limits to know.** A Google Workspace account can send about 1,500 emails a day through Apps Script (a free Gmail account about 100). That covers the Founding 500 and the first stretch of growth. When the list outgrows it, export the Sheet to a mail service; Kit's free plan (up to 10,000 subscribers) is the likely next step, and `subscribe.js` only needs its endpoint changed.

**Self-healing.** If a sign-up cannot reach the list (network or quota), the reader's browser keeps it and retries on their next visit, and offers email as a backup. `_agent/scripts/site-health.py` flags any page whose form is not on the shared module.
