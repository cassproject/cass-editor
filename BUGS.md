# Known Bugs

## Undo (FW-08): TypeError fixed; revert behavior matches Vue 2 (2026-07-19)

- **Undo button threw `TypeError: lastEditToUndo is not a function`** — the Vuex
  action `lastEditToUndo` was renamed `popLastEditToUndo` in the Pinia migration
  (it would collide with the state key of the same name), but EditorToolbar still
  called the old name and hit the state property. Fixed; a systematic sweep for
  this class (state/getter invoked as a function) found and fixed **5 more**:
  - MultiEdit.vue — `removeAddingValueAtIndex(null)` → `setRemoveAddingValueAtIndex`
    (broke removing a value in Edit Multiple)
  - Directory.vue ×2, DirectoryList.vue — `refreshSearch(...)` → `setRefreshSearch`
    (broke list refresh after creating a subdirectory/resource)
  - Organizations.vue — `organization(...)` → `setOrganization`
    (broke opening an organization)
  The sweep script parses each Pinia store and flags any call site invoking a
  state key or getter; it now reports zero mismatches.
- **Undo did not revert / UI did not refresh (follow-up, fixed):** three more
  layers under the TypeError, all invisible because `appError` is a no-op in
  production builds:
  1. `saveExpanded` ran `rld.copyFrom(compacted)` **before**
     `turnFieldsBackIntoArrays` — jsonld 9 (up from 5) compacts single-element
     arrays to scalars, and cassproject's `handleForwarding` throws
     `Cannot read properties of null (reading 'toPem')` on a bare `owner`
     string, killing the revert save inside a silent catch. Re-arrayify before
     `copyFrom` (matching ThingEditing's working save path).
  2. The revert signal `setChangedObject(shortId)` was a silent no-op: the
     edit flow leaves `changedObject` already holding that id (nothing consumes
     it while ThingEditing replaces Thing), and same-value writes don't fire
     watchers. Undo callbacks now clear-then-set across ticks, and bust
     `EcRepository.cache` so the watcher refetch gets the reverted object.
  3. The expanded-property undo path never called `$Progress.finish()/fail()`.
  Verified in-browser: rename → one undo click → hierarchy shows the old name
  immediately (no reload), repeats correctly on subsequent edit/undo rounds,
  server-side object confirmed reverted, zero console errors. (An earlier note
  here blamed pre-existing upstream behavior based on the Vue 2 reference
  showing the same visible failure — Vue 2 shares the same-value signal no-op,
  but the save-killing `copyFrom` crash was a genuine jsonld-9 migration
  regression.)

## Verified fixed 2026-07-19 (driven in-browser, AUTH-02 retested with `fray` on dev.cassproject.org)

- **Logout button did nothing** — `performApplicationLogout` cleared identities and
  the logged-on person, but App.vue's `loggedInPerson` watcher then read
  `EcIdentityManager.default.ids[0].ppk` on the now-empty identity list. The
  TypeError aborted Vue's update flush, freezing the UI in the logged-in state (no
  LogoutSuccess modal, chip still visible, no login button). The unguarded read
  existed at baseline too, but Vue 2's scheduler tolerated the throw. Fixed by
  guarding the watcher and resetting `me`/`subject` to null on logout. Verified:
  logout now shows the "Logged Out" modal, removes the avatar chip, and restores
  the login button with zero console errors.
- **"Signed in as" initials chip shown when logged out** — the SideNav avatar button
  rendered unconditionally (showing "ME" placeholder initials). Now hidden until a
  user or identity is present (`displayName !== 'No user'`).
- **Initials not centered in the avatar chip** — the chip forced `width: 2em` onto a
  padded Bulma button, squeezing the text off-center. Now a fixed 2.5em circle with
  zeroed padding and flex centering; measured text offset 0.0/0.0 px.
- **Login / create-account pages off-center** — App.vue applied the sidebar-clearing
  classes (`clear-side-bar`, margin-left 250px) to every route, including standalone
  routes with no sidebar; on the fixed full-viewport login overlay this shifted the
  card 250px right. The classes now apply only when the matched route defines a
  named `sidebar` view. Verified: login card margins measure 420/420.

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
