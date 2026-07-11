# Known Bugs

## Verified fixed (driven in-browser against localhost CASS server, 2026-07-10, logged in as `claude-test`)

- **Framework/competency names blank everywhere; 40+ jsonld errors on load** — the
  jsonld documentLoader that serves schema.cassproject.org contexts from the app's own
  origin was moved into a Pinia action (`initDocumentLoader`) during migration but
  never called, so every `jsonld.expand` hit the remote schema host (whose TLS cert is
  currently expired) and failed. Now invoked from main.js at startup. Verified: names,
  dates, and publishers render on the frameworks list and framework pages with zero
  console errors.
- **Import → URL Source → "done editing" did nothing** (original bug #1 in this file) —
  clicking set `importTransition = 'light'`, but the re-render crashed inside `<Thing>`
  (`Cannot read properties of undefined (reading 'name')`), aborting the patch and
  producing the downstream `parentNode` / `vnode is null` Vue-internals errors. Root
  cause: `this.$parent.$parent.obj` in Thing.vue — in Vue 3, `defineAsyncComponent`
  inserts `AsyncComponentWrapper` instances into the `$parent` chain, so fixed hop
  counts land on wrappers. Fixed by walking up to the nearest ancestor exposing the
  needed member. Verified: the full URL-import flow completes ("Complete" status,
  export / view in editor / done buttons appear), no Vue errors.
- **Property editing calls broken by the same $parent issue** — all 8
  `this.$parent.update/add/remove/removeByValue/saveThing` calls in Property.vue
  resolved to an AsyncComponentWrapper (method undefined → TypeError on any property
  edit). Fixed with the same ancestor-walk helper. (Fix verified by code path; full
  edit flow needs a logged-in retest.)
- **Hierarchy drag-and-drop DOM corruption** — `item-key="obj.id"` resolved to
  `undefined` for every row (vuedraggable 4 does not support path strings); replaced
  with `:item-key="(el) => el.obj.id"`. The warn-handler suppressions hiding the
  duplicate-key warnings were removed from main.js. Verified: framework hierarchy
  renders all nodes with zero key warnings.
- **cassproject `fetch(url, {headers: null})` threw TypeError** — the global fetch
  interceptor now drops null headers; external name-resolution requests fail with
  ordinary CORS errors (same as Vue 2) instead of synchronous TypeErrors.

Additional logged-in verification (account `claude-test`, password with the team):

- **Property editing works end-to-end** — created a framework, renamed it via the
  name field (PropertyString → Property → `ancestorWith('update')` → ThingEditing),
  added a competency; server-side object confirmed to carry the new name.
- **Assertions "I can"/"I can't"** — now native `<button>`s; clicking "i can" toggles
  the active state and reveals the evidence field.
- **"Set as framework default"** — native `<button>` in the Framework Configuration
  modal; clicking it set the config, and the toolbar shows the config name across
  sessions.
- **Crosswalk full flow** — source select → source "create" button (was the broken
  pseudo-button) → relation type → target "+" buttons appear and clicking one forms
  a working alignment ("apply alignments" appears). The original "Add + not enabled"
  bug was downstream of the broken source button.
- **Crosswalk step transitions** render correctly after moving `v-if` inside
  `<transition>` and renaming `.slide-fade-enter` → `.slide-fade-enter-from`.

## Fixed, still needs manual retest

- **Drop-to-top-level on framework title** — restored inside the draggable via the
  `#header` slot in Framework.vue, ConceptScheme.vue, and ProgressionModel.vue.
  Drag-and-drop itself was not exercised by automation.
- **"Owned by me" filter in Directory view threw TypeError** — call site used the old
  Vuex mutation name `singleQuickFilter`; now calls `setSingleQuickFilter`.
- **Edit Multiple modal body could render blank** — three sibling
  `<template #modal-body>` blocks were not a single `v-if` chain (invalid duplicate
  slots in Vue 3); merged into one `v-if`/`v-else-if`/`v-else` chain.
- **Custom property types UI could throw on undefined `availableTypes`** — the
  configuration store now declares `availableTypes: []` in state.

## Test data left on the localhost server (cleanup needed)

Created by automated testing on 2026-07-10 under the `claude-test` account:

- ~8 empty frameworks named "New Framework" (flaky test runs)
- Framework "Claude Migration Test" (1 competency "Test Competency Alpha",
  one "i can" assertion, default config set to "Claude Test Config")
- Configurations "Claude Test Config" and one junk "New Configuration"
- One unapplied crosswalk working alignment (never saved)
- The `claude-test` user account itself
- The O*NET "Essential Skills" framework was overwritten once via URL re-import
  (duplicate-confirm flow); content is the same O*NET data.

## Technical debt

- **Legacy unit tests:** `tests/unit/legacy-vue2/` holds 6 spec files written for
  Vue 2 / Vuex / Jest / @vue/test-utils v1. They are excluded from `npm run test:unit`
  and need porting to Vitest + @vue/test-utils v2 + `@pinia/testing`
  (see `tests/unit/AssertionTimeline.spec.js` for the ported pattern).
- **Remaining $parent walks:** `Thing.vue`/`ThingEditing.vue` `save()` still walk
  `$parent.$parent` for the `expandedThing` bail-out check — currently lands on
  `Property` (which mirrors the same object) so behavior is preserved, but it is
  fragile; consider the `ancestorWith` pattern there too.
- **Lint warnings:** `npm run lint` passes with 0 errors but ~570 warnings
  (mostly `vue/no-mutating-props`, `no-unused-vars`, `vue/require-explicit-emits`).
- **Pre-existing dead store references** (broken before the migration too):
  `showImportInfoModal` (ImportError.vue), `getSubjectName` (AssertionEditor.vue),
  and `frameworkSearchTerm` (Crosswalk.vue) reference store members that have never
  existed.
- **Anonymous URL re-import 404s:** after an anonymous "done editing", the app looks
  up competency objects that were never saved (not logged in) → benign 404s in the
  console. Same behavior as Vue 2.
