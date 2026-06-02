# Publish validation · standing rules

> Last updated: 2 June 2026
>
> Rules every page must pass **before going live on series.melophon.com**.
> These supersede anything left over from internal drafting.

---

## RULE 1 · No "mockup" in anything reader-visible

The word **mockup** (any casing) must not appear in:

- **URL slugs / filenames.** No `*-mockup.html`. The canonical URL is the clean slug. If a draft was built as `something-mockup.html`, rename to `something.html` and leave a redirect stub at the old URL (see RULE 1b).
- **`<title>` tags.**
- **`<meta name="description">` tags.**
- **OpenGraph / Twitter card tags** (`og:title`, `og:description`, `twitter:title`, etc.).
- **Visible page copy** — headers, kickers, stickers, badges, body, captions, footer fine print, console logs.
- **Cross-page link text** in masthead nav, episode lists, atlas entries, echo cards, "next episode" tails.

It is **fine** for `mockup` to appear in:

- Repo-internal files: `_drafts/`, comments, commit messages, `TASKS.md`, this file.
- Filenames inside `mockups/` directory (working scratch space).

### Diagnostic before push

```bash
cd ~/infera/mechanism-series-repo
# Fail if any HTML in repo root or subdirs contains "mockup" (case-insensitive)
grep -rln -i "mockup" --include="*.html" .
# Fail if any filename in the publish-set contains "mockup"
ls *.html | grep -i mockup
```

If either returns anything other than legitimate `_drafts/`, `mockups/`, or redirect-stub matches, **fix before pushing**.

## RULE 1b · Leave a redirect stub at every renamed URL

When renaming `something-mockup.html` → `something.html`, drop a one-page stub at the old URL with:

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Moved · [Page Name] · Infera</title>
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=/[new-slug].html">
<link rel="canonical" href="https://series.melophon.com/[new-slug].html">
<style>body{font-family:system-ui,sans-serif;max-width:560px;margin:80px auto;padding:0 24px;color:#1a1a1a}a{color:#ff2d8b}</style>
</head>
<body>
<h1>This page moved.</h1>
<p>[Page name] now lives at <a href="/[new-slug].html">/[new-slug].html</a>. Redirecting…</p>
</body>
</html>
```

This protects every inbound link that was shared before the rename.

---

## RULE 2 · No `@infera.studio` addresses

The publication uses `infera@melophon.com`. Any leftover `@infera.studio` (any prefix) in HTML must be replaced before push.

```bash
grep -rln "@infera.studio" --include="*.html"
```

## RULE 3 · No Buttondown form actions

Subscribe forms post to `mailto:infera@melophon.com`. Any `action=` containing `buttondown.email` or `buttondown.com` must be fixed before push.

```bash
grep -rln "buttondown" --include="*.html"
```

## RULE 4 · Status sticker / badge language

If a page is INVESTIGATE (working) but ready to ship visually, the visible status sticker reads `INVESTIGATE` or `PREVIEW`, **never `MOCKUP`**.
If it is PUBLISH (full editorial pass complete), the sticker reads `PUBLISHED` or no sticker at all.

## RULE 5 · Footer fine-print template

Footer fine print on every episode follows:

```
INFERA · MECHANISM SERIES · EP NN · *[Title]* · [scope or status sentence] · © Infera 2026.
```

Never include the word `mockup` in this line. If a working caveat is needed, use `visual preview` or `awaiting final editorial pass`.

---

## Pre-push checklist (one-shot script)

Save as `_brand/scripts/prepush-check.sh` (not yet committed — copy this into a one-liner when needed):

```bash
cd ~/infera/mechanism-series-repo

echo "=== RULE 1: mockup in HTML (case-insensitive) ==="
grep -rln -i "mockup" --include="*.html" . | grep -v "/mockups/" | grep -v "redirect" || echo "  CLEAN"

echo "=== RULE 1: filenames with mockup ==="
ls *.html | grep -i mockup || echo "  CLEAN"

echo "=== RULE 2: @infera.studio leaks ==="
grep -rln "@infera.studio" --include="*.html" || echo "  CLEAN"

echo "=== RULE 3: buttondown leaks ==="
grep -rln -i "buttondown" --include="*.html" || echo "  CLEAN"
```

Run before every push. If anything fails, fix before pushing.
