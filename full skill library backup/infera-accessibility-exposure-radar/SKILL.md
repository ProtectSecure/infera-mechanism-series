---
name: infera-accessibility-exposure-radar
description: Detects content exposed through accessibility-format (Section 508, ADA) versions of redacted public documents. Diffs standard PDF releases against tagged PDFs, accessible HTML, Word, and EPUB counterparts to surface content that leaked through the accessibility workflow — OCR text behind image-overlay redactions, alt-text describing redacted images, accessibility-tree references to removed content, retained metadata, and parallel-format releases with mismatched redaction states. Use whenever an agency, court, or settlement publishes both a standard and accessible version of a document; whenever a FOIA reading room offers an HTML or Word alternative; whenever a state portal provides accessibility-compliant duplicates. Pairs with infera-redaction-forensics for redaction-method classification, and respects the RULES-AND-METHODOLOGY verification gate before any finding is published.
---

# Infera Accessibility Exposure Radar

Section 508 and ADA accessibility requirements mean many public
documents exist in two or more parallel formats: the standard PDF
release and one or more accessibility-compliant alternatives. These
parallel versions are frequently produced by different workflows —
sometimes by different contractors — and the redaction state can
diverge between them.

This is a structural exposure surface that no current investigative
tool systematically monitors. This skill is that monitor.

## What this catches

**Image-overlay redactions defeated by the text layer.** A redaction
applied as a black rectangle drawn over a PDF leaves the underlying
text in the document's text layer. The visible PDF looks redacted;
the accessibility tree, screen reader output, or copy-paste buffer
still contains the original characters.

**Alt-text leakage.** Accessibility requires textual descriptions of
images and figures. The description sometimes says what the image is
*of*, including content the image visually obscures — written by a
contractor working from the unredacted source.

**Tagged reading order references.** Tagged PDFs preserve logical
reading order for screen readers. Structure-tree tags can name or
reference content that has been visually obscured but not removed
from the document structure.

**Parallel HTML / Word / EPUB releases.** Some agencies publish both
a redacted PDF and an "accessible HTML version" or "508-compliant
Word document," often regenerated from a different intermediate
file. If redaction was applied late in the PDF workflow but not
propagated upstream, the alternate format has a different redaction
state.

**Retained metadata and revision history.** Word documents converted
to PDF can retain author metadata, comments, track changes, and
document properties. The accessible Word version may be the original
or close to it.

**Form field labels.** Accessible PDFs require labeled form fields.
The labels sometimes describe what would be entered even when the
field itself is redacted on the visible form.

**OCR-layer mismatch.** When OCR runs on a pre-redaction scan and
the redactions are then applied visually to the post-OCR PDF, the
OCR text layer retains the original characters even though the
visible content is redacted.

## When to use

- Daily, on new agency FOIA releases that include accessible
  alternatives.
- On any document released with parallel formats (PDF + HTML, PDF +
  Word, PDF + EPUB).
- After every court order that includes "accessible version" in the
  docket entry text.
- On any settlement exhibit released in dual format.
- Retroactively on archives of past releases — many older releases
  predate current redaction discipline and have higher hit rates.
- Whenever `infera-redaction-forensics` flags a defeatable redaction
  method on a document that also has an accessible counterpart.

## When NOT to use

- On single-format releases (no accessible alternative exists to
  diff against).
- For interpretive analysis (use `infera-signal-interpretation`).
- For event-level exposure detection (use
  `infera-document-exposure-radar`).
- On documents that fall in any of the absolute out-of-scope
  categories defined in `RULES-AND-METHODOLOGY.md` Section III
  (classified information, active grand jury material, juvenile
  records, sealed presentencing reports, mental health records,
  sexual assault victim identity, active protective orders, trade
  secrets, minor children).

## Detection pipeline

For every paired document set:

**Step 1 — Identify the pair.** Confirm both versions reference the
same underlying source document. Match on title + date + case/docket
number + FOIA tracking ID + content correlation. Pair-mismatch is
the most common false-positive source.

**Step 2 — Multi-stream extraction.** From the standard PDF, extract:
- visible text layer
- OCR text layer (run independently if not present)
- embedded metadata (Author, Creator, Producer, CreationDate,
  ModDate, custom XMP)
- page count
- byte hash (SHA-256)
- file size
- redaction-area estimate (image/PDF analysis)

From the accessible version, extract:
- structured text
- accessibility tree (PDF/UA tags or HTML semantic structure)
- alt-text for every image
- form field labels
- embedded metadata
- revision history if present (Word `.docx` revision XML)

**Step 3 — Cross-stream diff.** Compare:
- visible PDF text vs. accessibility-tree text
- visible PDF text vs. alt-text descriptions
- visible PDF text vs. OCR layer
- standard-version metadata vs. accessible-version metadata
- redaction regions in standard PDF vs. corresponding regions in
  accessible version

Identify spans present in one but not the other.

**Step 4 — Classify each diff.** Most diffs are benign. Categorize:

- `formatting-only` — whitespace, encoding, line breaks
- `metadata-only` — author, creation tool, timestamps
- `alt-text-descriptive` — alt-text describes image content
- `accessibility-tree-divergence` — tree references content
  missing from visible layer
- `text-layer-divergence` — text present in one stream missing
  from the other (high signal)
- `revision-history-retained` — Word track changes or comments
  visible in accessible Word but not in PDF
- `form-label-descriptive` — form field labels describe redacted
  entries
- `ocr-layer-leak` — OCR text recoverable behind image-overlay
  redaction

**Step 5 — Score exposure likelihood.** Run each high-signal diff
through `infera-redaction-forensics` to classify the underlying
redaction method. Score: was this a true redaction that was
defeated, or a formatting artifact that looks like a leak?

**Step 6 — Verification gate.** Run every claimed exposure through
the five-check verification gate documented in
`RULES-AND-METHODOLOGY.md` Section I. Findings that don't pass all
five checks are logged but not published.

## Output schema

For every analyzed pair, emit:

- `pair_id` — stable identifier
- `source_agency_or_court`
- `document_title`
- `standard_version_url`, `standard_version_hash`,
  `standard_version_retrieval_timestamp`
- `accessible_version_url`, `accessible_version_hash`,
  `accessible_version_retrieval_timestamp`, `accessible_format`
  (HTML / tagged_PDF / Word / EPUB)
- `diff_count_total`
- `diff_count_by_category`
- `exposure_score` (0–100, weighted by category and forensics-flagged
  redaction defeatability)
- `verified` — boolean, only true after passing all five gates
- `notable_diffs[]` — top-ranked diffs with surrounding context
  (excluding any content in absolute out-of-scope categories)
- `redaction_forensics_summary` — passed through from
  `infera-redaction-forensics`
- `legal_review_required` — boolean per RULES Section VIII
- `notification_required` — boolean per RULES Section VI

Emit unverified daily inventory to
`accessibility-exposure-log-YYYY-MM-DD.json`.

Emit verified high-score findings to
`accessibility-exposure-verified-YYYY-MM-DD.md` with full provenance.

Emit longitudinal agency-level rollups quarterly to
`accessibility-discipline-by-agency-YYYYQN.md`.

## Failure modes

**Conversion artifacts misclassified as exposures.** PDF-to-HTML
conversion frequently changes text representation in ways that look
like content differences but aren't. The classification step is
where most false positives die. Tune category thresholds
conservatively — false positives here are reputationally expensive.

**OCR drift across engines.** The accessible version may have been
OCR'd with a different engine, producing real text differences that
are not exposures. Compare visible-layer text to visible-layer text
across versions before comparing visible to accessibility tree.

**Encoding mismatch.** Unicode normalization differences (NFC vs
NFD), curly-quote conversion, ligature handling. Normalize before
diffing.

**Wrong pair.** Two documents with similar titles may not reference
the same underlying source. Strict pair-identification matters more
than diff quality.

**Stale accessibility version.** Some agencies post an accessibility
version of an *earlier* release of a document and never update it
when the standard PDF is replaced. The diff may reflect a
historical state, not a current leak. Check publication timestamps
on both versions.

**Methodology gaming.** Once published, the methodology gives
agencies a roadmap to harden their workflows specifically against
this detection. That is the intended outcome and a feature, not a
bug — but it means hit rates will decline over time as agencies
adapt, and the skill will need updates.

**Confirmation bias on "leak found" framing.** A discovered diff is
not a story. A discovered diff that passes the verification gate
and the publication-interest test is a candidate for a story. Most
findings should die at the gate, not be published.

## The Infera principle this skill encodes

Public means public. If an agency publishes a document in two
formats and the formats disagree about what is redacted, both
versions are public. Infera does not break redactions; it observes
that the agency has, structurally, not fully applied them. The
skill is a mirror held up to the agency's own workflow — and a tool
for raising the cost of sloppy redaction discipline by making its
outputs checkable.
