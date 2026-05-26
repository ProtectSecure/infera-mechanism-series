# Welcome email · subscriber autoresponder

Paste this into Buttondown → Settings → Welcome Email. Send-from address: `hello@infera.studio`.

---

## Subject line

**You found us. Now you'll find the next one.**

(Alt options if A/B testing: *"One short note before the next investigation"* · *"What you signed up for"*)

---

## Preview text

The Mechanism Series, formally. One email per drop. No tracking pixels.

---

## Body (HTML-aware — Buttondown renders markdown, so this is markdown)

You found us.
Which means you read longer than most.
We'll be brief here on purpose — and almost everywhere else.

---

**What you'll get from this list**

One short email when a new episode publishes. The email will contain: the headline, the mechanism, the place, a one-paragraph read of what we found, and a link. That's it. We don't market and we don't share lists.

**What we're doing**

Infera publishes investigative journalism the way newer systems get built — as serialized, interactive, source-cited *mechanisms*. Each episode reverse-engineers one observable system: a commute, an eviction, a closed hospital, a coast moving, a ballot adjudication, a feed algorithm, a credit composite. We show the upstream pressure, the legal scaffolding, and the disparate downstream outcome. We stamp our confidence on every claim. We publish what we don't yet know.

If you want the long form of that, it's on the index: <https://infera-mechanism-series.onrender.com>

**Two seasons, ten episodes, growing**

*Season I · The Pressure Series* — five Georgia mechanisms, civic in scope. *Season II · Machine-Readable* — three of seven live, on the algorithmic stack that converts you into a graded product. There's a third season coming late 2026. We don't talk about it yet.

**A few things to start with**

If you have ten minutes, the first one to read is **[The Trickle](https://infera-mechanism-series.onrender.com/the-trickle.html)**. It's the strongest argument for what this publication is.

If you have twenty-five minutes and want the personal one, **[Personhood Inc.](https://infera-mechanism-series.onrender.com/personhood-inc.html)** is what most readers come back to talk about.

If you've ever wondered what the algorithm is actually selling, **[The Trust Market](https://infera-mechanism-series.onrender.com/episode-03-trust-market-mockup.html)** is the receipts.

**Reply if you want to**

This is a working inbox. Send notes, corrections, story ideas, or the question you couldn't quite answer after reading. If you're a reporter, foundation, or operator who wants to talk about underwriting an episode, write to **press@infera.studio** with your context. We respond to those within a day.

**A few practical things**

Unsubscribe is one click at the bottom of every email and we honor it instantly. We do not use tracking pixels. We do not sell, rent, or share this list. The footer also has a "manage your subscription" link if you want to change your address.

---

Welcome.
We'll write again when the next mechanism lands.

— *The Infera editorial desk*
*infera.studio · independent · reader-supported*

---

## Implementation notes for the dev (Buttondown specifics)

- Buttondown handles the unsubscribe link automatically — don't write one in manually, it'll double up.
- Buttondown supports `{{ subscriber.metadata.referrer }}` if you want the welcome email to reference where they signed up from. Optional polish: change "You found us" to *"You found us on **{{ referrer_page_title }}**"* if Buttondown lets you pass page context through the form. Not necessary for v1.
- Subject lines starting with capital-letter declarative ("You found us") have higher open rates than questions or imperatives in this category. Don't switch to questions.
- Plain text version: Buttondown auto-generates it; let it.
- From-name: **The Mechanism Series** (not "Infera"). The brand is the publication for the email reader. "Infera" lives in the signature.
