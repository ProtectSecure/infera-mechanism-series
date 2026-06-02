# Infera · brand & infrastructure pack

Everything you need to wire the subscribe form, set up email, and ship the legal/copyright spine of the publication. Domain assumed throughout: **series.melophon.com**. If your domain is different, find-replace it across these files.

## What's in here

- **setup-guide.md** — the 20-minute checklist. Start here.
- **email-addresses.md** — proposed inbox addresses + the autoresponder body for each.
- **welcome-email.md** — the creative welcome a new subscriber receives. Editorial voice, short.
- **legal/footer-legal.md** — copyright notice, terms-of-use snippet, privacy statement, unsubscribe language. Ready to paste into Squarespace footer.
- **legal/editorial-disclosures.md** — sources, methodology, confidence stamps, corrections policy. The credibility scaffold.
- **legal/accessibility-statement.md** — WCAG 2.1 AA commitment + how readers report issues.

## Order of operations

1. Confirm domain on Squarespace (or transfer if needed)
2. Wire Google Workspace email through Squarespace ($6/user/month)
3. Create the inboxes from `email-addresses.md`
4. Sign up for Buttondown, point it at `infera@melophon.com`
5. Copy welcome-email.md into Buttondown's "welcome email" slot
6. Get the Buttondown form action URL, paste into `index.html` and the episode pages
7. Copy legal/footer-legal.md into Squarespace footer settings
8. Done. Ship.

Estimated time start to finish: **20 minutes of clicking** + 24 hours of DNS propagation.
