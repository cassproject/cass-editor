# CaSS Editor — Test Cases

Manual test suite for the CaSS Editor (Vue 3). Written against v1.6.x after the
Vue 2 → Vue 3 / Vuex → Pinia / vue-cli → Vite migration.

**Environment setup**
- CASS server running (e.g. `http://localhost/api/`); dev app via `npm run dev`
  at `http://localhost:8080`.
- Point the app at a server with the `server=` query parameter:
  `http://localhost:8080/?server=http://localhost/api/#/frameworks`
- Unless stated otherwise, cases assume a logged-in user (see AUTH-01) with at
  least one framework the user owns and one framework the user does not own
  (e.g. an imported O*NET framework).
- After every case, check the browser console: **zero Vue warnings or errors**
  is part of the pass criteria. The Vue 2 build suppressed duplicate-key
  warnings; the Vue 3 build must not need to.

Priorities: **P0** = must pass before release, **P1** = core functionality,
**P2** = secondary features / edge cases.

---

## 1. Authentication

### AUTH-01 — Create account via legacy login (P0)
1. Navigate to `#/legacyLogin`.
2. Click "create account". Fill name, email, username, password, retype.
3. Click "create".
- **Expected:** Account is created, the user is logged in automatically, and the
  app redirects to `#/frameworks`. Avatar chip in the sidebar shows the user's
  initials.

### AUTH-02 — Login / logout (P0)
1. From `#/legacyLogin`, enter valid credentials, click "login".
2. Verify redirect to `#/frameworks` and avatar chip.
3. Log out via the avatar menu.
- **Expected:** Login succeeds; after logout the "login" button reappears and
  owned-only UI (new/edit buttons) disappears. The logout-success modal renders.

### AUTH-03 — Login with bad credentials (P1)
1. Enter a valid username with a wrong password.
- **Expected:** A clear error is shown ("User does not exist." or similar);
  no unhandled console exception; form remains usable.

### AUTH-04 — Account-creation validation (P1)
1. On the create-account form, submit with: empty fields; mismatched passwords;
   an already-taken username.
- **Expected:** Field-level errors ("Username is required", "Passwords must
  match", "That username is unavailable"); no account created.

### AUTH-05 — Anonymous (not logged in) restrictions (P1)
1. Without logging in, browse `#/frameworks` and open a framework.
- **Expected:** Frameworks render read-only: no "new" button, no edit pencil,
  no add/copy/cut/paste toolbar. Import is allowed but warns that imported
  content will not be editable.

---

## 2. Frameworks list

### FWL-01 — List renders with metadata (P0)
1. Open `#/frameworks`.
- **Expected:** Every framework row shows its **name**, item count, created /
  last-modified dates, and publisher where present. *(Regression: blank names =
  jsonld documentLoader not installed.)*

### FWL-02 — Search (P1)
1. Type part of a framework name in the search bar; press Enter or click 🔍.
- **Expected:** List filters to matches; clearing the search restores the list.

### FWL-03 — Filters and sort (P1)
1. Toggle "Owned By Me", "Not Owned By Me", "Config Matches Default" quick
   filters; switch sort between Alphabetical and Date Modified.
- **Expected:** List updates accordingly. Toggling a filter twice returns to the
  unfiltered list. *(Regression: the owned-by-me toggle in Directory view calls
  `setSingleQuickFilter` — must not throw.)*

### FWL-04 — Info side panel (P1)
1. Single-click a framework row.
- **Expected:** Right-hand "Information" panel opens with framework name,
  Details (dates, item count), and an "open framework" button. The ✕ closes it.

### FWL-05 — Open framework / deep link (P0)
1. Click "open framework" in the info panel.
2. Copy the resulting URL (`#/framework/<id>`), open it in a new tab.
- **Expected:** Framework page opens in both cases with identical content.
  The version segment of the ID is tolerated in the route parameter.

---

## 3. Framework viewing & editing

### FW-01 — Create framework (P0)
1. Frameworks list → "new" → "Framework".
- **Expected:** "Create framework" editor opens; the framework is auto-saved
  ("last saved" chip). Name defaults to "New Framework".

### FW-02 — Rename framework / edit description (P0)
1. In the create editor (or via the edit pencil on an existing owned
   framework), select the name **textarea**, type a new name, then blur (Tab).
2. Click "done".
- **Expected:** Header shows the new name. Reload the page: the name persists
  (server-side save). Same for description. *(Regression: exercises the
  PropertyString → Property → ThingEditing `ancestorWith` update chain.)*

### FW-03 — Add top-level competency (P0)
1. On an owned framework, click "add" → "create new".
2. Type a name in the textarea, blur, click "done".
- **Expected:** Competency appears in the hierarchy with its name; item count
  chip increments; persists after reload.

### FW-04 — Add child competency (P1)
1. Hover an existing competency, use its add/child affordance (or add while a
   competency is selected).
- **Expected:** Child renders indented under the parent; caret expands and
  collapses the parent.

### FW-05 — Edit competency properties (P0)
1. Click the edit pencil on a competency. Change name; add a description via
   "add property"; save/done.
- **Expected:** Changes render immediately and persist after reload. Property
  add, update, and delete (✕ next to a value) all work without console errors.

### FW-06 — Delete competency (P1)
1. Edit a competency → trash icon → confirm in the modal.
- **Expected:** DeleteCompetencyConfirm modal appears; on confirm the node is
  removed from the hierarchy and the server.

### FW-07 — Delete framework (P1)
1. Edit an owned framework → trash icon → confirm.
- **Expected:** DeleteFrameworkConfirm modal; on confirm the app returns to the
  frameworks list and the framework is gone.

### FW-08 — Undo (P2)
1. Make an edit (rename a competency), then click the undo (↺) toolbar button.
- **Expected:** The edit is reverted in the UI and on the server.

### FW-09 — Property display tiers (P2)
1. Toggle "primary / secondary / tertiary" checkboxes in the top toolbar.
- **Expected:** Additional property tiers show/hide on all visible nodes.

### FW-10 — Multi-select and Edit Multiple (P1)
1. Check two or more competency checkboxes → "Edit multiple".
2. In the modal, add a property and a value; apply.
- **Expected:** Modal body renders the property editor (not blank — regression:
  duplicate `#modal-body` slots), the spinner branch shows while processing,
  and the property lands on all selected competencies.

### FW-11 — Comments (P2)
1. With comments enabled, add a comment to a competency; reply; edit; delete.
- **Expected:** Comment thread renders; deletion asks for confirmation.

---

## 4. Hierarchy drag & drop

### DND-01 — Reorder siblings (P0)
1. On an owned framework with ≥3 top-level competencies, drag one node by its
   handle to a new position among its siblings.
- **Expected:** Node lands where dropped, order persists after reload, no
  duplicate-key warnings in console, no visual duplication of rows.
  *(Regression: vuedraggable `item-key` must be a function, not `"obj.id"`.)*

### DND-02 — Nest / un-nest (P0)
1. Drag a top-level node onto another node (making it a child).
2. Drag a child node back out (move left via drag or the keyboard/arrow moves).
- **Expected:** Parent/child relations update; carets appear/disappear; the
  relation change persists.

### DND-03 — Drop onto framework title = move to top level (P1)
1. Drag a nested competency and drop it on the framework title/header area.
- **Expected:** The competency becomes top-level. No raw JSON is rendered in
  the drop zone. *(Regression: `#header` slot drop-target restoration.)*

### DND-04 — Move via arrows (P2)
1. Use the up/down/left/right move affordances on a competency.
- **Expected:** Same structural results as dragging; blocked moves (e.g. move
  left at top level) are disabled and do nothing.

### DND-05 — Copy / cut / paste (P1)
1. Select a competency, use the copy button, select another node, paste.
2. Repeat with cut.
3. Clear the clipboard with the clear button.
- **Expected:** Copy duplicates (link or copy per prompt), cut moves, buttons
  enable/disable correctly (they are native buttons; disabled state follows
  clipboard/selection state).

---

## 5. Import

### IMP-01 — Import from URL (CTDL-ASN) (P0)
1. `#/import` → "URL Source" → click a sample O*NET link → "import framework".
2. Wait for the preview to render.
3. Click "done editing".
- **Expected:** Preview shows framework header + full competency hierarchy.
  "done editing" transitions to the light view with status "Complete" and
  buttons: cancel / export / import again / view in editor / done. No Vue
  errors during the transition. *(Regression: `$parent` chain crash.)*

### IMP-02 — Duplicate import handling (P0)
1. Re-import the same URL as IMP-01.
- **Expected:** "Duplicate framework" modal appears with confirm/cancel.
  Confirm overwrites (with a warning if not logged in); cancel aborts cleanly.

### IMP-03 — "view in editor" after import (P1)
1. After IMP-01, click "view in editor".
- **Expected:** Navigates to `#/framework/<id>` and the imported framework
  renders fully.

### IMP-04 — Import CSV (P1)
1. "File Import" → drag a CSV of competencies onto the drop zone (or browse).
2. Map the name/description/ID columns when prompted; import.
- **Expected:** Column-mapping UI appears; preview renders; framework saves.
  A malformed CSV produces a readable error via the ImportError modal, not a
  silent failure.

### IMP-05 — Import CTDL-ASN / ASN / CASE JSON file (P1)
1. "File Import" with a `.json` CTDL-ASN graph export.
- **Expected:** Detected format is shown; import completes; hierarchy matches
  the source.

### IMP-06 — Paste Text import (P2)
1. "Paste Text" → paste a competency list / tabbed hierarchy → adjust as
   prompted.
- **Expected:** Live preview builds competencies from the text; "Competency
  detected" status; import completes.

### IMP-07 — Remote server import (P2)
1. "Remote Server" → enter another CASS endpoint → select frameworks → import.
- **Expected:** Remote list loads, selected frameworks copy to the local
  server, progress and completion are reported.

### IMP-08 — Cancel / import again (P2)
1. During or after an import, use "cancel" and "import again".
- **Expected:** State fully resets (no residue from the previous import in the
  next preview).

---

## 6. Export

### EXP-01 — Export formats (P1)
1. Open a framework → export (toolbar) → for each format offered (CTDL-ASN
   JSON-LD, ASN, CASE, CSV, ctdlasn CSV…), export.
- **Expected:** A file downloads per format; JSON formats parse; CSV opens with
  one row per competency; no console errors.

### EXP-02 — Export from import light view (P2)
1. After IMP-01, click "export" in the post-import button row.
- **Expected:** Same behavior as EXP-01 for the just-imported framework.

---

## 7. Crosswalk

### XW-01 — Full alignment flow (P0)
1. `#/crosswalk` → step A: select a source framework (note "Owned By Me" filter
   defaults on) → step B: select a target framework.
2. In the double hierarchy, click the source competency's "create" button.
3. Choose a relation type (e.g. "is enabled by").
4. Click "+" on one or more target competencies.
5. Click "apply alignments", then save & review.
- **Expected:** Source shows the relation tag; chosen targets show ✓; "+"
  buttons appear on all other targets; alignments save and appear in review.
  *(Regression: the source "create" button was an unclickable pseudo-button.)*

### XW-02 — Step transitions (P1)
1. Move through steps A → B → align, and back via "change source/target".
- **Expected:** Each step fades in (slide-fade transition); no step renders
  blank; changing source resets dependent state.

### XW-03 — Remove / change alignments (P1)
1. After XW-01, click ✓ on an aligned target to remove it; change the relation
   type on an existing alignment.
- **Expected:** Removal and type changes reflect immediately and persist after
  save.

### XW-04 — Aligned/unaligned filters (P2)
1. In the double hierarchy use the show-aligned / show-unaligned / show-all
   filter buttons.
- **Expected:** Node visibility filters accordingly on both sides.

---

## 8. Taxonomies (concept schemes) & progression models

### TAX-01 — Create and edit a concept scheme (P1)
1. `#/concepts` (Taxonomies) → new → add concepts, rename, nest.
- **Expected:** Mirrors framework editing (FW-01..FW-06) with concept
  terminology; hierarchy drag-and-drop works (DND-01..03 apply).

### TAX-02 — Concept scheme deep link (P2)
1. Open `#/conceptScheme/<id>` directly.
- **Expected:** Scheme renders; version-trimmed route param tolerated.

### PROG-01 — Progression model create/edit (P1)
1. `#/progressionLevels` → create a progression model, add levels, reorder.
- **Expected:** Same editing semantics; drop-to-top-level works on the title
  header (DND-03 regression applies here too).

---

## 9. Directories

### DIR-01 — Create directory and subdirectory (P1)
1. Frameworks list → new → Directory; open it; "new" → subdirectory; name it;
   Create.
- **Expected:** Modal validates empty names (create disabled until non-empty);
  directory tree renders.

### DIR-02 — Add framework and resource to a directory (P1)
1. Inside a directory: create a framework; add a resource (name + URL).
- **Expected:** Resource URL validation ("must start with http:// or
  https://"); items appear in the directory listing.

### DIR-03 — Owned-by-me filter in directory (P1)
1. Toggle the "owned by me" switch in a directory view.
- **Expected:** Filter applies; **no TypeError** (regression:
  `setSingleQuickFilter`).

### DIR-04 — Directory sharing / delete (P2)
1. Share a directory with another user; delete a directory.
- **Expected:** Share modal lists users; delete confirm modal works.

---

## 10. Configurations

### CFG-01 — Create and save a configuration (P1)
1. `#/configuration` → "create new configuration" → rename it → save.
- **Expected:** Config appears in the list with its name (not "New
  Configuration" — verify the rename stuck).

### CFG-02 — Set as framework default (P0)
1. Open an owned framework → click the toolbar configuration button ("No
   Configuration") → in the Framework Configuration modal click "set as
   framework default" for a config.
- **Expected:** Button is clickable (native button); toolbar chip changes to
  the config name; persists across sessions. *(Regression: pseudo-button.)*

### CFG-03 — Set browser default (P1)
1. On the Configurations page, use the browser-default switch on a config.
- **Expected:** Confirmation modal (ConfigurationSetSuccess); new frameworks
  open with this config applied.

### CFG-04 — Custom properties (P1)
1. Edit a config → "add custom framework property" and "add custom competency
   property" → define name/range → save.
2. Open a framework using this config and add the custom property to a
   competency.
- **Expected:** Custom property types list loads (**no `.push` on undefined**
  — regression: `availableTypes` state), property is addable and persists.

### CFG-05 — Relationship management (P2)
1. Edit a config → "manage relationships" → enable/disable relation types.
- **Expected:** Crosswalk and editor relation dropdowns reflect the enabled
  set.

### CFG-06 — Delete configuration / permission guard (P2)
1. Delete an owned config; attempt to edit a config owned by someone else.
- **Expected:** Delete confirm modal works; non-permitted edit shows the
  ConfigurationNotPermitted modal.

---

## 11. Assertions

### ASSN-01 — "I can" / "I can't" (P0)
1. Open an owned framework → "manage assertions" → on a competency click
   "i can".
2. Click "i can't" on another competency.
- **Expected:** Buttons are clickable native buttons; clicked state shows
  checked/active styling; the "do this because I…" evidence field appears;
  assertions persist for "myself". *(Regression: pseudo-buttons.)*

### ASSN-02 — Evidence and badge (P1)
1. After asserting "i can", type evidence text; click "+ add badge".
- **Expected:** Evidence saves; badge flow opens (or reports its unavailability
  cleanly if no badge server is configured).

### ASSN-03 — Assertion timeline (P1)
1. `#/timeline` after making assertions.
- **Expected:** Timeline lists assertion events, most recent first; while
  searching, a progress bar shows; with zero assertions the "None." message
  renders. *(Covered by unit spec `tests/unit/AssertionTimeline.spec.js`.)*

### ASSN-04 — Manage assertions for someone else (P2)
1. In manage-assertions mode change "Manage Assertions for:" from "myself" to
   another person/subject.
- **Expected:** Subject switcher works; assertions are recorded against the
  chosen subject; "getSubject" displays resolve.

### ASSN-05 — Share assertions (P2)
1. Share → ShareAssertions modal → select a contact and share.
- **Expected:** Encrypted assertion share completes without console errors.

---

## 12. Sharing & permissions

### SHARE-01 — Add owner / reader (P1)
1. Open an owned framework → Share → add another user as reader; as owner.
- **Expected:** User chips appear under the right role; the other account sees
  the framework (read-only for reader, editable for owner).

### SHARE-02 — Remove owner guard (P1)
1. As the sole owner, try to remove yourself as owner.
- **Expected:** The remove button for the current sole owner is disabled;
  removing other owners/readers works.

### SHARE-03 — Make public / make private (P1)
1. In Share, toggle public → confirm modal ("make public"); then back to
   private.
- **Expected:** Confirm/cancel buttons work while `isProcessing` disables them;
  anonymous users can(not) see the framework accordingly.

---

## 13. Users & groups

### GRP-01 — Create group (P1)
1. `#/users` (Groups in sidebar) → "create new user group" (requires login) →
   name it → save.
- **Expected:** Create button disabled when logged out; group saves and lists.

### GRP-02 — Edit group: name length, membership, save/cancel (P1)
1. Rename a group beyond 60 chars; add/remove members; save; cancel changes.
- **Expected:** ">60 chars" disables "done editing" with the length warning;
  save/cancel buttons enable only when the group changed and are clickable
  native buttons.

### GRP-03 — Group permissions on content (P2)
1. Share a framework with a group; verify a group member's access.
- **Expected:** Membership grants the shared role.

---

## 14. Search & competency search modal

### SRCH-01 — In-framework search (P1)
1. Open a framework → toolbar search → type a competency name.
- **Expected:** Matches highlight/filter in the hierarchy; clearing restores.

### SRCH-02 — Competency search modal (P1)
1. From add → "search" (instead of create new), search another framework's
   competencies, select one, add.
- **Expected:** Cross-framework results appear; selected competency is added
  (copy or link per prompt); modal closes cleanly.

---

## 15. URL parameters & embedding

### URL-01 — `server=` override (P0)
1. Load the app with `?server=<other CASS endpoint>`.
- **Expected:** All data loads from the given endpoint (trailing slash added
  automatically).

### URL-02 — `view=true` read-only mode (P1)
1. Open a framework URL with `view=true`.
- **Expected:** All editing affordances hidden regardless of login.

### URL-03 — `select=true` picker mode (P2)
1. Open with `select=true` (optionally `singleSelect=true`) as used by
   embedding applications.
- **Expected:** Checkboxes render for selection; the select button emits/post-
  messages the chosen competencies; `selectVerbose` returns full objects.

### URL-04 — `ceasnDataFields=true` (P2)
1. Open a framework with `ceasnDataFields=true`.
- **Expected:** CTDL-ASN terminology/fields are used in headers and import
  labels.

### URL-05 — `highlightCompetency` / `frameworkId` deep links (P2)
1. Open `#/framework/<id>?highlightCompetency=<competencyId>`.
- **Expected:** The target competency is scrolled to and highlighted.

### URL-06 — Unknown route (P2)
1. Navigate to `#/no-such-page`.
- **Expected:** The 404 (NotFound) view renders; `#/403` and `#/500` render
  their views.

---

## 16. Plugins (P2)

### PLG-01 — Plugin manager
1. `#/pluginManager` → view curated plugins; launch one.
- **Expected:** Plugin list renders; launching opens `#/pluginContainer` with
  the plugin iframe; no console errors.

---

## 17. Cross-cutting regression checks (run after any dependency bump)

### REG-01 — Console cleanliness sweep (P0)
Visit, in one session: frameworks list → open framework → expand/collapse all →
import URL flow → crosswalk to alignment step → configurations → timeline.
- **Expected:** No Vue warnings ("duplicate keys", "non-primitive key",
  "Unhandled error"), no `TypeError`, no `parentNode`/vnode errors. The only
  tolerated noise: CORS failures resolving external (non-CASS) property URLs
  and 404s for objects that legitimately don't exist.

### REG-02 — jsonld document loader (P0)
1. Load the frameworks list with the network tab open.
- **Expected:** Requests for `schema.cassproject.org` contexts go to the app's
  own origin (`/schema.cassproject.org/...`), not the remote host. Names render
  even if `https://schema.cassproject.org` is unreachable.

### REG-03 — Async-component `$parent` chains (P1)
1. Exercise: property value edit (FW-05), property delete, "thing as property"
   scroll-to/details buttons on link-type properties, import done-editing.
- **Expected:** No "reading 'name'/'update' of undefined" errors — these paths
  walk the parent chain across `AsyncComponentWrapper` boundaries.

### REG-04 — Store method conventions (P2)
1. Grep-level check (code review, not UI): no `this.$store`, `mapGetters`,
   `mapMutations`, or Vuex imports; Pinia store calls use members that exist.
- **Expected:** `npm run lint` passes with 0 errors.

---

## 18. Automated checks (CI gate)

| Command | Expectation |
|---|---|
| `npm run build` | Completes with exit 0 (chunk-size warnings tolerated). |
| `npm run test:unit` | All Vitest specs pass. |
| `npm run lint` | 0 errors (warnings tracked as tech debt). |

Unit-test porting status: `tests/unit/AssertionTimeline.spec.js` is the
Vitest + `@pinia/testing` pattern; six legacy Vue 2 specs remain in
`tests/unit/legacy-vue2/` awaiting port (AssertionEditor, EditorToolbar,
Hierarchy, ShareAssertions, SideNav, TimelineElement).

---

## Appendix: suggested test data

- **Frameworks:** one small owned framework (3–5 competencies, 2 levels of
  nesting), one large imported framework (O*NET, 70+ items), one framework
  owned by a different user.
- **Configs:** one config with custom properties, browser default unset.
- **Accounts:** two test users (for sharing/groups) plus one group.
- Keep test artifacts prefixed (e.g. `QA -`) so they are easy to find and
  delete after a run.
