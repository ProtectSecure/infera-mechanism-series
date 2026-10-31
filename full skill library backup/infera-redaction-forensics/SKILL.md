---
name: infera-redaction-forensics
description: Technical classification of redaction methods used on any released document. Identifies whether redactions were applied as true text removal, marker replacement, image overlay, drawn annotation, OCR-defeated, metadata-retaining, accessibility-tree-bypassing, or cross-format-inconsistent, and scores each redaction's defeatability. Runs on any FOIA release, court filing, settlement exhibit, or declassified document. Output feeds infera-accessibility-exposure-radar but also stands alone as an audit of redaction discipline by agency, court, or jurisdiction over time. Use whenever a redacted document is ingested into the Infera pipeline, when assessing the credibility of an agency's "fully redacted" claim, or when building a longitudinal audit of redaction quality. Bound by RULES-AND-METHODOLOGY.md regarding out-of-scope document categories and chain of custody.
---

# Infera Redaction Forensics

Redactions are not all equal. Some remove content from the document
entirely. Some hide content from the visible page while preserving
it in the underlying file. Some preserve content in the
accessibility tree, the OCR layer, the metadata, or the revision
history.

The taxonomy matters because:

- defeated redactions are public information by accident
- redaction discipline varies enormously by agency, era, and
  contractor
- longitudinal audit of redaction quality is itself a publishable
  finding
- some agencies have systematically worse practices than others, and
  that fact is news

This skill does the technical classification. It does not authorize
publication of any recovered content — see
`RULES-AND-METHODOLOGY.md`.

## Redaction method taxonomy

Every redacted span in a document is classified into one of the
following:

**T1 — True text removal.** Content is removed from the document
entirely; nothing remains in any stream. Visible page shows black
box or whitespace; text layer, OCR layer, accessibility tree, and
metadata all show absence. **Not defeatable.**

**T2 — Replacement string.** Content is replaced with a redaction
marker ("[REDACTED]", "(b)(6)", "█"). Text layer and accessibility
tree show the marker, not the original. **Not defeatable** from the
document itself, though length of marker sometimes leaks
information about length of redacted content.

**T3 — Image overlay over text.** A black rectangle is drawn over
the visible page; the underlying text remains in the text layer.
**Defeatable** by copy-paste, text extraction, or accessibility
tools. Very common in poorly produced FOIA releases.

**T4 — Image conversion with no OCR.** Page is rasterized as an
image; redaction is drawn on the image. Text layer is empty (no
text to leak). **Not defeatable** unless paired with an alternate
format generated before rasterization.

**T5 — Image conversion with OCR after redaction.** Page is
rasterized post-redaction, then OCR runs on the redacted image. OCR
layer reflects the redacted state. **Generally not defeatable.**

**T6 — Image conversion with OCR before redaction.** Page is OCR'd
first, then visually redacted on the image. OCR layer retains
original text. **Defeatable** through OCR layer inspection.
Surprisingly common.

**T7 — Annotation-style redaction.** Redactions are PDF annotations
that can be toggled or removed in some viewers. **Defeatable** by
removing the annotation layer.

**T8 — Accessibility-tree bypass.** Visible page is redacted but
the document's structure tree, tagged-PDF reading order, or
alt-text references the redacted content. **Defeatable** through
accessibility tools.

**T9 — Metadata leakage.** Visible content is redacted but document
metadata, author, comments, track changes, or revision history
contain the redacted content. **Defeatable** through metadata
inspection.

**T10 — Cross-format inconsistency.** Same document published in
multiple formats; redaction applied to one format but not another.
**Defeatable** through cross-format comparison. This is the surface
`infera-accessibility-exposure-radar` exploits.

## Detection methods per type

For each redacted region detected:

1. Extract from visible text layer; compare to bounding box of
   redaction. Text present in box → **T3**.
2. Extract OCR text from page image; compare to visible text. OCR
   text present where visible text is absent → **T6**.
3. Inspect PDF annotation list. Annotations overlapping redaction
   regions → **T7**.
4. Walk the accessibility tree. Tags or alt-text referencing the
   redacted region → **T8**.
5. Read document metadata, author, comments, revisions. Content
   matching the redacted region → **T9**.
6. If multiple format versions exist, run cross-format diff →
   **T10**.

For documents with no clear redaction markers (looking like clean
text), still run:

- author / metadata inspection (T9)
- accessibility tree walk (T8)
- revision history extraction if `.docx` source available (T9)

Many documents are released as "unredacted" but still carry
sensitive metadata that no human looked at.

## Tool stack

- `pdfplumber` / `pdfminer.six` — text layer extraction
- `PyMuPDF` (fitz) — PDF structure, annotations, redaction object
  inspection
- `pikepdf` — low-level PDF object inspection, repair, secure
  comparison
- `pytesseract` + `tesseract` — independent OCR for layer
  comparison
- `python-docx` + raw XML inspection — `.docx` revision history,
  comments, tracked changes
- `mammoth` — `.docx` to HTML conversion for cross-format diff
- `BeautifulSoup` — HTML accessibility-version parsing
- `ExifTool` — comprehensive metadata extraction across formats

Lock library versions; record version in chain-of-custody log
(`RULES-AND-METHODOLOGY.md` Section V).

## When to use

- On every redacted document ingested by Infera, as a routine
  classification pass.
- When assessing whether an agency's redaction practice is robust
  enough to trust a "(b)(7)(A)" or similar exemption claim.
- When building a longitudinal report on redaction quality by
  agency or jurisdiction.
- As an input to `infera-accessibility-exposure-radar`.
- When verifying that a claimed exposure was in fact a structural
  redaction failure rather than something else.

## When NOT to use

- On classified documents the user does not have authorization to
  process technically. The forensics output may itself constitute a
  problem. See `RULES-AND-METHODOLOGY.md` Section III.
- On private third-party documents.
- For active circumvention of an in-force protective order. The
  skill documents what is present in the file; it does not
  authorize publication of what it finds.
- On any document falling in the absolute out-of-scope categories
  in `RULES-AND-METHODOLOGY.md` Section III.

## Output schema

For each document processed:

- `document_id`, `source_url`, `source_hash`,
  `retrieval_timestamp`
- `redaction_count_total`
- `redaction_count_by_type` (T1 through T10)
- `defeatable_count` (T3, T6, T7, T8, T9, T10)
- `defeated_content_summary` — for each defeatable redaction, the
  classification and a *structural description* of what was
  recovered. The structural description names the category, length,
  and position of the recovered content. It does NOT reproduce the
  recovered content itself in the routine output; recovered content
  is gated behind the verification process in
  `RULES-AND-METHODOLOGY.md`.
- `agency_or_court`, `release_date`, `contractor_if_known`
- `redaction_discipline_score` (0–100; weighted by how many
  redactions are T1/T2/T4/T5 versus the defeatable types)
- `tool_versions` — locked library versions used in analysis
- `chain_of_custody_id` — link to retrieval and processing log

## Longitudinal output

Per agency, per quarter, emit:

- average redaction discipline score
- count of defeatable redactions found
- distribution of defeatable types (which kind of mistake does
  this agency tend to make?)
- trend over time (improving / stable / declining)
- comparison to peer agencies in the same category

This is the basis for an annual "Redaction Discipline Report" that
is itself a publishable artifact and a pressure mechanism on bad
performers.

The discipline score must always be paired with a redaction-extent
metric (how much of the document is redacted at all) from the same
documents. A high discipline score on a heavily over-redacted
document is not good news. The pairing prevents the metric from
being gamed by simply redacting more.

## Failure modes

**Misidentifying a redaction.** Some documents have black rectangles
that are not redactions (image elements, design choices). Verify by
checking whether the rectangle aligns with content-absent regions
in any stream before classifying.

**Over-counting on poorly OCR'd documents.** Bad OCR produces
garbage text in regions that look like leaks but aren't. Cross-check
with a second OCR engine before flagging high-confidence finds.

**False stability scoring.** An agency with a high discipline score
on its released documents may simply be over-redacting (refusing to
release anything ambiguous). High score is not the same as good
behavior — pair with redaction-extent metrics as noted above.

**Tooling drift.** Different PDF libraries report text layer content
differently. Lock the library version and re-baseline only on
intentional upgrades. Record version in every analysis.

**Contractor signal noise.** Many agencies use multiple
accessibility contractors. Discipline metrics aggregated at the
agency level may mask large variation between contractors. When
possible, classify by contractor (via metadata "Producer" field)
rather than only by agency.

## The Infera principle this skill encodes

Public discipline is not measured by what agencies say about their
redaction practice. It is measured by what their files contain. A
forensic audit of those files is the only honest measure — and
publishing the audit is the only mechanism that creates real
pressure to improve.
