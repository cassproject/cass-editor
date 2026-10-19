# Findings from automating TEST-CASES.md

Writing the end-to-end suite (October 2026, editor 1.7.4 against CaSS 1.7.12) turned up places where the
editor and [TEST-CASES.md](../TEST-CASES.md) disagreed, plus editor, library and server bugs. This page
records how each was resolved. Known bugs have a test that describes the intended behaviour and is
marked `test.fail()`: it shows as an expected failure until the bug is fixed, then as "unexpectedly
passed" — at which point remove the `test.fail()` line.

## TEST-CASES.md corrected (the editor's behaviour is intended)

| Case | Now documented as |
|---|---|
| AUTH-01 | The user chip shows the first two characters of the email |
| AUTH-02, AUTH-05 | Logged-out users see "New" and create frameworks owned by nobody, which everybody can edit |
| IMP-04 | A malformed CSV's errors are listed on the import page (no modal) |
| IMP-05 | CASE frameworks import from a CASE server (Remote Server); a CASE JSON file is rejected |
| DND-04 | Moves are Shift+Arrow keys on the selected competency; blocked moves do nothing |
| DND-05 | Copy then paste links the competency (adds a relation, no duplicate) |
| XW-01 | The source competency's button is "add" (shown on hover) |
| PROG-01 | Progression models are offered with `?ceasnDataFields=true` |
| DIR-02 | A resource URL must be a valid URL; any scheme is accepted |
| CFG-06 | Someone else's configuration offers a read-only view |
| SHARE-02 | The sole owner of a public framework may remove themselves (it becomes ownerless) |
| GRP-01 | The button is "create new group"; logged-out visitors to `#/users` are redirected to Welcome |
| URL-05 | The highlighted competency is not scrolled to |

## Fixed in the editor with this suite

| Bug | Where |
|---|---|
| Deleting any object made every other open editor throw | `App.vue` websocket `changedObject` |
| `<a href="#">` menu items also navigated to the Welcome page (directory New → Framework/Resource, directory breadcrumbs, comment "edit", timeline competency link, Import breadcrumb) | `AddNewDropdown.vue`, `Directory.vue`, `Comment.vue`, `TimelineElement.vue`, `Import.vue` |
| `$scrollTo` passed vue-scrollto options to `scrollIntoView`, which throws in current browsers (File Import "Import", invalid configuration save, configuration section links, "done" on a new concept/level) | `src/main.js` |
| RDF Quads / RDF+XML / Turtle exports contained "undefined" | `stores/editor.js` `getThing` |
| Cancelling an import left the previous CSV's columns in the mapping | `stores/app.js` `clearImport` |
| Removing a badge was not saved (and left the assertion undecryptable) | `AssertionEditor.vue` `revokeBadge` |
| Launching a plugin from the side nav threw; two route checks never matched | `SideNav.vue`, `App.vue` (`$route.name` with Vue Router 4) |
| Plugin container heading never rendered | `PluginContainer.vue` |
| Unused computeds reading store members that do not exist (`showImportInfoModal`, `getSubjectName`, `frameworkSearchTerm`) removed | `ImportError.vue`, `AssertionEditor.vue`, `Crosswalk.vue` |
| "Configuration matches default" ignored in directories (and a Vue warning on every directory view) | `Directory.vue` |
| Every timeline entry warned; the subject area never showed | `TimelineElement.vue` |
| Double-clicking a list row logged "URL is null" | `List.vue` (declared `emits`) |
| Opening Filter & sort before the schema loaded threw | `FilterAndSort.vue` |
| Deleting a directory threw | `stores/app.js` `setRightAsideObject` |
| Confirming a competency delete before its usage counts loaded threw | `DeleteCompetencyConfirm.vue` |
| The configuration list showed only the first page (~50) | `mixins/configuration.js` |
| A concept-scheme highlight deep link referenced an undefined variable | `ConceptScheme.vue` |
| `npm run lint` reported 199 errors | autofixed (mostly `DirectoryList.vue` indentation) |

## Known bugs (tests marked `test.fail()`)

| Case | Bug |
|---|---|
| AUTH-05 | Copy/cut/paste/clipboard toolbar shown on frameworks the user cannot edit |
| SRCH-01 | In-framework search was removed in 2020 (commit 09abde0ad) and is to come back |
| DND-03, SHARE-01 | After a deep link or reload, edit rights are computed before the saved login loads: title drop ignored, a reader of a private framework lands on the list; under load the owner sometimes gets no edit controls (not reproduced on demand) |
| FWL-03 | "Show only mine" never renders in a directory |
| FWL-03 | Filter & sort opened before the saved login loads never offers Owned by me / Not owned by me (same root cause as DND-03; the tests wait for the user chip) |
| DND-04 | Shift+ArrowLeft un-nests to one place above the last item |
| IMP-05 | The detected format is not shown, only counts |
| IMP-06 | Paste Text's status no longer matches the string `Hierarchy.vue` checks, so export / import again / view in editor never appear |
| IMP-07 | Remote CaSS import of a single framework never shows the preview |
| TAX-01, PROG-01 | Concept/progression drag and drop: moving up lands wrong (`v-model` on a read-only computed); dropping a top-level level on the title duplicates it; the first drag in a page session throws while `HierarchyNode` lazy-loads. Not reproduced on demand: progression-model field edits are sometimes lost (the test re-enters them until saved) |
| DIR-04 | Deleting a directory leaves its frameworks behind, still pointing at it |
| CFG-06 | The ConfigurationNotPermitted modal never shows on the framework page |
| CFG-01 | One configuration without `frameworkConfig["@id"]` crashes the Configurations page |
| URL-05 | `#/framework/<id>?highlightCompetency=` (query after the `#`) highlights nothing |
| URL-06 | Unknown routes redirect to the 403 view instead of the 404 view |
| REG-02 | `Thing.vue`/`ThingEditing.vue` fetch a type schema from schema.cassproject.org directly (up to ~160 times per page) when the startup preload of the app's own copy has not finished; rows rendered meanwhile stay nameless offline |

Seen but not reproduced on demand: double-clicking a directory row sometimes leaves the list on
#/frameworks while it refreshes (2 of ~25 tries, no errors; the tests retry the double-click).

Not fixed on purpose: query values keep `+` instead of a space (`main.js`), because embedding hosts may
pass unencoded base64 values that contain a literal `+`.

## cassproject library and CaSS server (filed)

- [cassproject/cass-npm#542](https://github.com/cassproject/cass-npm/issues/542) — `CTDLASNCSVImport` fails on a CSV ending with a newline (known-bug test in IMP-05).
- [cassproject/cass-npm#543](https://github.com/cassproject/cass-npm/issues/543) — `CSVExport.exportFramework` throws for a framework without relations (known-bug test in EXP-01).
- [cassproject/cass-npm#541](https://github.com/cassproject/cass-npm/issues/541) — `EcRepository.multiget` refetches every id when caching is off.
- [cassproject/CASS#644](https://github.com/cassproject/CASS/issues/644) — configurations with custom properties vanish from search (index at its 1000-field limit; known-bug test in CFG-04). Likely the same cause: a `multiput` of such a configuration returns `[]` and stores nothing.
- [cassproject/CASS#645](https://github.com/cassproject/CASS/issues/645) — multiPut stalls for an object sharing type and guid with an existing one under another host.
- [cassproject/CASS#646](https://github.com/cassproject/CASS/issues/646) — assertion search fails with "Fielddata is disabled" on a fresh assertion index.
