# High Priority (Current Month) — fixes, branches, and before/after evidence

All four issues from the "Credential Engine Issue Tracking" project board, fixed on dedicated
issue branches for both the 1.6 and 1.7 lines. Nothing has been pushed.

| Issue | Repo | Branch(es) | Commit(s) |
|---|---|---|---|
| [#1427](https://github.com/cassproject/cass-editor/issues/1427) | CASS (server) | `issue-1427-1.7`, `issue-1427-1.6` | `bd372968a`, `08c4d92b4` (cherry-pick) |
| [#1421](https://github.com/cassproject/cass-editor/issues/1421) | schema.cassproject.org (submodule) | `issue-1421` (serves both lines once deployed) | `317037c` |
| [#1425](https://github.com/cassproject/cass-editor/issues/1425) | cass-editor | `issue-1425-1.7`, `issue-1425-1.6` | `ac0b906e8`, `ddde00665` (cherry-pick) |
| [#1423](https://github.com/cassproject/cass-editor/issues/1423) | cass-npm + cass-editor | `issue-1423` (5.0); `issue-1423-1.7`, `issue-1423-1.6` | `569a05e5`; `4b65ef59c`, `0d6c3bf60` |

---

## #1427 — Progression model: ceasn:publisher should be an array

**Fix:** `conceptArrays()` in `src/main/server/cartridge/adapter/ceasn.js` excluded
`ceasn:publisher` from scalar→array coercion (frameworks use a different function without the
exclusion). Removed the exclusion; `ceasn:publisherName` (a language map) stays excluded via an
exact-match test. Also intentionally normalizes Concept Scheme exports the same way.

**Test:** new `src/test/8.ceasn.progression.test.js` — saves a progression model with ONE
publisher, GETs `/api/ceasn/<guid>`, asserts an array. Run against a live in-process server +
elasticsearch (`npx mocha src/test/0.harness.test.js src/test/8.ceasn.progression.test.js`).

| | Result |
|---|---|
| BEFORE (unfixed code) | `1 failing — AssertionError: ceasn:publisher must be an array (cass-editor#1427): expected 'https://credentialengineregistry.org/…' to be an array` |
| AFTER (fixed code) | `4 passing` — `"ceasn:publisher": ["https://credentialengineregistry.org/resources/ce-…"]` |
| Regression guard | existing `8.ceasn.test.js` (framework export/import incl. O*NET): **5 passing** |

---

## #1421 — Progression Model export shows a w3 label for skos:notation

**Root cause (reproduced):** `0.4/jsonld1.1/cass2ceasnProgressions.json` defined `skos:notation`
without `@type`, so values expand as untyped literals; the credreg target context types the term
`xsd:string`, JSON-LD 1.1 term selection can't match, and the compact-IRI fallback is forbidden —
the full w3 IRI is emitted. Same-mechanism bonus defect: the `asn` prefix was lowercase
(`purl.org/asn/...`) vs. uppercase everywhere else, leaking full IRIs for `asn:*` terms.

**Fix:** add `"@type": "xsd:string"` to `skos:notation` (mirrors cass2ceasnConcepts.json) and fix
the `asn` prefix casing.

**Test:** jsonld@9 compaction harness against the live credreg context (scratchpad
`1421-harness.js`), mirroring the server's `jsonLdCompact` call:

| | notation key | @type |
|---|---|---|
| BEFORE | `http://www.w3.org/2004/02/skos/core#notation` | `http://purl.org/asn/schema/core/ProgressionModel` |
| AFTER | `skos:notation` | `asn:ProgressionModel` |

**Deploy note:** the CASS server fetches this context from schema.cassproject.org at runtime —
one deploy of the schema site fixes 1.6 and 1.7 simultaneously. Post-deploy check: GET
`https://cass.credentialengine.org/api/ceasn/7ac0b10e6acd3f77c7358f841d2d2e1c` (the issue's
example) and confirm the key reads `skos:notation`.

---

## #1425 — Require ceasn:publisher for Concept Scheme and Progression Model

**Fix (import half):** `ceasn:publisher` added to the `requiredProps` lists for
`skos:ConceptScheme` and `asn:ProgressionModel` in `src/mixins/import.js` (CE mode only —
inside the existing `ceasnDataFields === 'true'` gate; matches the framework rule precedent).

Executable before/after via the library validator the import pipeline calls:

| | `validateRequiredProperties(row-without-publisher, "asn:ProgressionModel", 2, rules)` |
|---|---|
| BEFORE rules | `null` (row passes; import proceeds) |
| AFTER rules | `"Row 2: Missing required properties for asn:ProgressionModel: ceasn:publisher"` (import blocked, error listed in the import UI) |

**Fix (editor half):** `"isRequired": "true"` on the Publisher descriptor in
`ctdlAsnConceptSchemeProfile` and `ctdlAsnProgressionModelProfile`
(`src/mixins/ctdlasnProfile.js`). Enforcement rides the existing mechanism used by required
description/publicationStatusType on these same profiles: Publisher renders with `*`, and
"Done editing" refuses with "Publisher is required. Please enter a value." until set.
New-object creation is unaffected (creation flows don't consult profiles).

- BEFORE: Publisher optional; editor closes with it empty.
- AFTER: asterisked; editing can't complete without a publisher URL. Note: existing objects
  lacking a publisher must have one entered before they can be re-saved from the editor —
  inherent to the requirement.
- Verified by lint + structural checks and mechanism parity with the four existing required
  properties on the same profiles; recommend a click-through QA against a dev instance with
  `?ceasnDataFields=true` before release.

---

## #1423 — Validate URL's (registry URL or CTID on CSV import)

**Fix (cass-npm, branch `issue-1423` off 5.0):** new `CTDLASNCSVImport.validateRegistryUrls()` —
fields configured per row `@type` must contain a CTID (`ce-...`) or an http(s) URL whose origin is
in `allowedOrigins`; pipe-delimited and array values checked per part; errors join the existing
`errors[]` aggregation which **blocks the import before anything is saved**. Hooked after all
eight existing `validateRequiredProperties` call sites in both importers. Inert without `urlRules`.

**Fix (cass-editor):** the four `validationRules` objects now include `urlRules` with the issue's
field lists per class, and `allowedOrigins` derived from `new URL(queryParams.newObjectEndpoint).origin`.
Only active in CE mode (existing `ceasnDataFields === 'true'` gate, per decision) and skipped
when `newObjectEndpoint` is unset.

**Tests (first CSV-import unit tests in cass-npm): 13 passing**, covering:

| Case | Result |
|---|---|
| CTID value | accepted |
| allowed-origin registry URL | accepted |
| URL from another origin (incl. prod URL under sandbox endpoint) | `Row N: <field> must be a CTID or a credential registry URL for this environment (got: <value>)` |
| arbitrary non-registry URL / non-URL text | rejected with same message |
| pipe-delimited mixed values | only the bad part reported |
| array values | per-element validation |
| multiple bad fields | one error per field |
| unconfigured field/type, missing urlRules, empty allowedOrigins, empty values | inert (no behavior change) |

- BEFORE: a framework CSV with `ceasn:creator = https://example.com/x` under
  `?ceasnDataFields=true&newObjectEndpoint=https://sandbox.credentialengineregistry.org/resources/`
  imported successfully with the bogus URL stored.
- AFTER: the import is blocked; the import error list names the row, field, and offending URL.

**Release dependency:** the editor half calls the new library function — publish **cassproject
5.0.18** from the `issue-1423`/5.0 branch, then bump `cassproject` to `^5.0.18` in cass-editor
package.json on 1.7 and 1.6 (deliberately not bumped yet: an unpublished version would break
`npm ci`).

---

## Remaining steps (need your go-ahead / release machinery)

1. Push the 8 branches and open PRs (one per repo per line).
2. Publish cassproject 5.0.18; bump the dep in both cass-editor lines.
3. Deploy schema.cassproject.org from `issue-1421`; then re-check the two live export URLs from
   the issues.
4. Browser QA: #1425 editor gating and a #1423 CSV import block/pass pair on a dev instance with
   `?ceasnDataFields=true`.
