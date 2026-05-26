# Setup guide · 20 minutes, four tabs open

This walks you from "form captures to nowhere" to "subscriber gets a welcome email from `hello@infera.studio` within sixty seconds of signing up." Domain assumed: **infera.studio**.

You'll have four tabs open: Squarespace, Google Workspace, Buttondown, and a code editor (or just this folder).

---

## Step 1 · Domain & email · Squarespace + Google Workspace (~8 min)

Squarespace partners with Google Workspace for custom-domain email. You manage it from inside Squarespace.

1. Log in to Squarespace → **Settings → Domains → infera.studio**.
2. If you don't own infera.studio yet, register it here. ($20–$30/year, same flow.)
3. In the domain detail panel, click **Email** → **Get a Google Workspace account**.
4. Choose **Business Starter** ($6/user/month). You only need one user to start — `hello@infera.studio`.
5. Walk through the Google Workspace setup wizard. Squarespace auto-publishes the MX records — no manual DNS.
6. Verify: send a test email from your personal account to `hello@infera.studio`. It should arrive in the new Gmail-style inbox within minutes.

**You now have a working `@infera.studio` inbox.**

---

## Step 2 · Create the additional inboxes (~3 min)

Inside the new Google Workspace admin, create these as **aliases of hello@infera.studio** (free — aliases don't cost extra users):

- `hello@infera.studio` — primary inbox, the user
- `press@infera.studio` — alias → forwards to hello
- `subscribe@infera.studio` — alias → forwards to hello
- `corrections@infera.studio` — alias → forwards to hello
- `legal@infera.studio` — alias → forwards to hello

Path: **Google Workspace Admin → Apps → Google Workspace → Gmail → Routing → Add → Catch-all or specific aliases**. Or use **Directory → Users → hello → Add alternate emails**.

See `email-addresses.md` for the full list + the autoresponder body for each.

---

## Step 3 · Newsletter capture · Buttondown (~5 min)

Squarespace's newsletter block only works inside Squarespace pages. Your site is custom HTML on Render — so we use Buttondown, which is designed for exactly this.

1. Go to **buttondown.email** → sign up with `hello@infera.studio`.
2. Newsletter name: **The Mechanism Series**. Slug: `mechanism`.
3. **Settings → Domains** → add `infera.studio` → follow the DNS verification (one TXT + one MX record, copy-paste into Squarespace's DNS panel).
4. **Settings → Sending Email From** → set to `hello@infera.studio`.
5. **Settings → Welcome Email** → paste the body from `welcome-email.md`. Subject from the same file.
6. **Settings → Embeds** → grab the **form action URL**. It looks like:
   `https://buttondown.email/api/emails/embed-subscribe/mechanism`
7. Copy that URL.

---

## Step 4 · Wire the form (~2 min)

In `index.html`, search for `<form class="bs-signup-form" id="bsSignup"` and update:

```html
<!-- BEFORE -->
<form class="bs-signup-form" id="bsSignup" autocomplete="off" action="#" method="post">

<!-- AFTER -->
<form class="bs-signup-form" id="bsSignup" autocomplete="off"
      action="https://buttondown.email/api/emails/embed-subscribe/mechanism"
      method="post" target="popupwindow"
      onsubmit="window.open('https://buttondown.email/mechanism','popupwindow')">
```

Repeat for the episode-end `data-stayclose` forms (8 pages). Or run this one-line find-and-replace in your repo:

```bash
cd ~/infera/mechanism-series-repo
grep -lE 'data-stayclose|id="bsSignup"' *.html | xargs sed -i '' \
  -e 's|action="#" method="post"|action="https://buttondown.email/api/emails/embed-subscribe/mechanism" method="post" target="popupwindow"|g'
```

Then also remove the localStorage-only fallback JS, or leave it — Buttondown will handle the real submission, the JS just adds a friendly thank-you state on top.

---

## Step 5 · Squarespace footer legal (~2 min)

In Squarespace → **Pages → Footer → Edit** (or wherever your global footer lives), paste the block from `legal/footer-legal.md`. This adds copyright, terms link, privacy link, accessibility link, and unsubscribe.

If you want full standalone Terms and Privacy pages, create two Pages in Squarespace called `/terms` and `/privacy` and paste from `legal/footer-legal.md` (each section is split clearly).

---

## Step 6 · Ship it.

Commit and push:

```bash
cd ~/infera/mechanism-series-repo
git add .
git commit -m "Wire newsletter capture to Buttondown · @infera.studio email live · legal spine"
git push origin main
```

Send a test from a clean browser. The subscriber should:
1. Submit the form
2. Receive the welcome email from `hello@infera.studio` within a minute
3. The welcome email contains the unsubscribe link (Buttondown adds automatically)

If anything misfires, the most common culprit is DNS propagation — wait 60 minutes and retry.

---

## Alternatives if Buttondown isn't your speed

The form action URL is the only line that changes. Swap to:

- **ConvertKit** — `https://app.kit.com/forms/[id]/subscriptions` — more automation, $15/month, less literary.
- **Mailchimp** — `https://[server].list-manage.com/subscribe/post?u=...&id=...` — corporate default, generous free tier.
- **Substack** — works but you'd be giving a competitor your subscriber list. Not recommended.
- **Self-host Listmonk on a $5/month server** — full control, no monthly fee, requires you to manage DNS and deliverability. Only if you enjoy ops.
