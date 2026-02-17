# CaSS Editor — Project Knowledge (`CONTEXT.md`)

> **Purpose**: Single-file reference capturing all project-specific knowledge for the CaSS Editor.
> Generated from a full exploration of every source directory, config file, test suite, and project doc.

---

## 1. Project Overview

| Field | Value |
|---|---|
| **Name** | CaSS Editor (Competency and Skills Service — Competency Framework Editor) |
| **Version** | 1.6.11 (`package.json`) |
| **Author** | CaSS Project / Eduworks |
| **License** | Apache-2.0 |
| **Repository** | `cassproject/cass-editor` on GitHub |
| **Live Demo** | `https://cassproject.github.io/cass-editor/` |
| **Purpose** | Create, edit, import/export, crosswalk, and manage competency frameworks and concept schemes using linked data (RDF/JSON-LD) stored in a CaSS Repository. Designed to be embeddable in an `<iframe>`. |

### Key Capabilities
- **Framework CRUD** — browse, create, edit, delete, version, undo, bulk-edit competency frameworks
- **Concept Schemes** — SKOS-based concept scheme authoring (broadens/narrows, matches)
- **Crosswalking** — side-by-side alignment creation between two frameworks
- **Import** — CSV, CTDL-ASN JSON-LD, CASE JSON, ASN, Medbiquitous, OpenSalt URL, plain text, PDF
- **Export** — CASS JSON-LD, CTDL-ASN, CASE, ASN, RDF/XML, Turtle, N4, CSV
- **Configuration Management** — admin-definable profiles controlling visible properties, relationship types, value constraints, cardinality, criticality levels
- **User/Group Management** — user registration, organization (group) creation, KBAC-based ownership, reader, commenter permissions
- **Concurrent Editing** — WebSocket push for real-time multi-user collaboration
- **Assertions & Timelines** — xAPI-integrated assertion management and timeline visualization
- **Comments & Suggestions** — threaded comments, "suggest mode" edits reviewable by owners
- **Accessibility** — 508/WCAG compliance goal, keyboard shortcuts for all tree operations
- **Progressive Web App** — operates offline with service worker support
- **CSS Inheritance** — when embedded in an iframe, imports parent page styles for seamless branding

---

## 2. Technology Stack

| Layer | Technology | Notes |
|---|---|---|
| **Framework** | **Vue 2** (`vue@^2.6.10`) | Options API, mixins-based architecture |
| **State** | **Vuex** (`vuex@^3.1.1`) | 8 store modules |
| **Routing** | **Vue Router** (`vue-router@^3.0.6`) | Hash-mode routing |
| **CSS** | **Bulma** (`bulma@^0.7.5`) + SCSS | Theme & style files in `src/scss/` |
| **Data SDK** | **cassproject** (npm) | Client SDK for CaSS Repository API, provides `EcRepository`, `EcFramework`, `EcCompetency`, etc. |
| **Linked Data** | **jsonld** (`jsonld@^1.6.2`) | JSON-LD processing |
| **Build** | **Vue CLI / Webpack** | `vue.config.js` config, `compression-webpack-plugin`, Babel transpilation of `cassproject` + `yocto-queue` |
| **Dev Server** | localhost:8080 (HTTPS) | Uses local certs (`localhost.key`, `localhost.crt`, `ca.pem`) |
| **E2E Tests** | **Playwright** (`@playwright/test`) | 186 test files, Chromium only, baseURL `http://localhost:8082` |
| **Unit Tests** | **Jest** (`@vue/cli-plugin-unit-jest`) | 7 unit test files |
| **Code Coverage** | **NYC / Istanbul** | `.nyc_output` in tests directory |
| **Documentation** | **VuePress** | In `docs/` with `authoring/`, `dev/`, `guide/` sections |
| **UUID** | **pure-uuid** | Globally available as `window.UUID` |
| **Clipboard** | **v-clipboard** | Copy-to-clipboard Vue plugin |
| **Scroll** | **vue-scrollto** | Smooth scrolling within `#framework` container |
| **Lazy Loading** | **vue-infinite-loading** | Infinite scroll for framework lists |
| **HTTP** | **vue-resource** + custom fetch throttle | `main.js` patches `global.fetch` to cap at 10 concurrent requests |
| **Async Computed** | **vue-async-computed** | Async computed properties in components |
| **Visibility** | **vue-observe-visibility** | Intersection Observer for lazy rendering |

---

## 3. Directory Structure

```
cass-editor/
├── CONTEXT.md              ← THIS FILE
├── README.md               ← Integration guide, URL params, keyboard shortcuts, dev setup
├── REQUIREMENTS.md          ← 186 formal requirements (CA-83 through CA-268)
├── CHANGELOG.md             ← 870 lines of version history (v0.4.26 → 1.2.9+)
├── package.json             ← v1.6.11, scripts, dependencies
├── vue.config.js            ← Webpack/devServer config
├── playwright.config.js     ← E2E test config (Chromium, port 8082, 120s timeout)
├── docs/                    ← VuePress documentation site
│   ├── authoring/           ← 18 authoring docs
│   ├── dev/                 ← 49 developer docs
│   └── guide/               ← 4 guide docs
├── src/
│   ├── main.js              ← App bootstrap (Vue instance, plugins, fetch throttle, cassproject init)
│   ├── App.vue              ← Root component (1523 lines) — WebSocket, identity, postMessage, framework CRUD
│   ├── router.js            ← 225 lines, 14+ named routes
│   ├── assets/              ← 44 static assets
│   ├── scss/                ← 15 SCSS files (theme, styles, component-specific)
│   ├── store/               ← Vuex store
│   │   ├── index.js         ← Store root
│   │   └── modules/         ← 8 modules (see §4)
│   ├── mixins/              ← 12 mixin files (see §5)
│   ├── components/          ← Reusable UI components (see §6)
│   │   ├── SideNav.vue      ← (33 KB) Main sidebar navigation
│   │   ├── NarrowSideNav.vue
│   │   ├── Topbar.vue
│   │   ├── FrameworkButtons.vue
│   │   ├── AddNewDropdown.vue
│   │   ├── Dropdown.vue / DropdownItem.vue
│   │   ├── Panel.vue / PanelItem.vue
│   │   ├── configuration/   ← 5 config components
│   │   ├── framework/       ← 8 framework components
│   │   ├── frameworks/      ← 1 component (list display)
│   │   ├── import/          ← 7 import components
│   │   ├── modalContent/    ← 28 modal dialogs
│   │   ├── modals/          ← 1 modal wrapper (DynamicModal)
│   │   └── plugins/         ← 2 plugin components
│   ├── views/               ← Route-level page components (see §7)
│   │   ├── Welcome.vue      ← Landing page (20 KB)
│   │   ├── ConfigurationEditor.vue
│   │   ├── Forbidden/InternalError/NotFound.vue ← Error pages
│   │   ├── conceptScheme/   ← 2 views
│   │   ├── directory/       ← 2 views
│   │   ├── framework/       ← 5 views
│   │   ├── login/           ← 3 views (Login, LegacyLogin, CreateAccount)
│   │   ├── organization/    ← 2 views
│   │   ├── plugins/         ← 2 views
│   │   ├── progressionModel/← 2 views
│   │   └── usersGroups/     ← 1 view
│   ├── lode/                ← Linked Open Data Editor subsystem (see §8)
│   │   ├── ietf-language-tags_json.json ← 957 KB language tag database
│   │   └── components/      ← 13 core editing components
│   └── layouts/             ← 1 layout component
└── tests/
    ├── e2e/                 ← 186 Playwright spec files + fixtures.js + coverage/
    └── unit/                ← 7 Jest unit test files
```

---

## 4. Vuex Store Modules

| Module | File | Size | Purpose |
|---|---|---|---|
| `app` | `app.js` | 19 KB | Global app state: framework list, selected framework/competency, canEdit flag, right-aside panel, banner messages, search text, clipboard, organization, selected directory |
| `editor` | `editor.js` | 19 KB | Editor state: framework data, competency nodes, hierarchy relations, drag-and-drop, undo/redo, selection tracking, save/load |
| `crosswalk` | `crosswalk.js` | 11 KB | Crosswalk view state: left/right framework selection, alignment relationships |
| `lode` | `lode.js` | 8 KB | LODE subsystem state: Thing/Property/Hierarchy data, language tags, schema profiles |
| `configuration` | `configuration.js` | 4 KB | Configuration management state |
| `featuresEnabled` | `featuresEnabled.js` | 2 KB | Feature flag toggles based on URL params (`ceasnDataFields`, `concepts`, `disableAssertions`, etc.) |
| `user` | `user.js` | 1 KB | Logged-in user identity state |
| `environment` | `environment.js` | <1 KB | Environment variables (selected server URL) |

---

## 5. Mixins (Business Logic Layer)

Mixins house the bulk of business logic. They are mixed into components via `mixins: [...]`.

| Mixin | Size | Purpose |
|---|---|---|
| `configuration.js` | **131 KB** | Configuration profile definitions: CTDL-ASN, T3, TLA property mappings, schema field definitions, cardinality rules |
| `ctdlasnProfile.js` | **209 KB** | Full CTDL-ASN schema profile: field definitions, export mappings, field groupings (primary/required/optional/tertiary) |
| `import.js` | **72 KB** | Import logic for all formats: CSV, CTDL-ASN, CASE, ASN, Medbiquitous, PDF, text |
| `tlaProfile.js` | **46 KB** | Total Learning Architecture profile |
| `common.js` | **39 KB** | Shared utilities: framework helpers, language string handling, search, sorting, permissions checks |
| `t3Profile.js` | **24 KB** | T3 (Training and Testing) profile |
| `pluginUtil.js` | **12 KB** | Plugin system utilities |
| `cassUtil.js` | **8 KB** | CaSS Repository API utilities: search, save, delete wrappers |
| `getLevelsAndRelations.js` | **8 KB** | Level and relation type fetching from configurations |
| `editDirectory.js` | **7 KB** | Directory/collection editing logic |
| `cassApi.js` | **6 KB** | Low-level CaSS API helpers |
| `competencyEdits.js` | **5 KB** | Competency property editing helpers |

---

## 6. Component Architecture

### 6.1 LODE (Linked Open Data Editor) — Core Editing Engine

The `src/lode/components/` directory contains 13 components that form the generic RDF/JSON-LD editing engine:

| Component | Size | Role |
|---|---|---|
| `ThingEditing.vue` | **91 KB** | Main editing surface for any RDF "Thing" — renders all properties, handles save/undo |
| `Property.vue` | **62 KB** | Renders a single RDF property with appropriate input widget based on range type |
| `Hierarchy.vue` | **61 KB** | Tree view for hierarchical data (frameworks → competencies → sub-competencies) |
| `Thing.vue` | **55 KB** | Read-only view of an RDF Thing's properties |
| `HierarchyNode.vue` | **51 KB** | Individual node in the hierarchy tree — handles expand/collapse, drag-and-drop, selection |
| `AddProperty.vue` | **43 KB** | "Add property" panel for adding new fields to a Thing |
| `AssertionEditor.vue` | **37 KB** | xAPI assertion creation and editing |
| `List.vue` | **36 KB** | List view for flat collections of Things |
| `PropertyString.vue` | **21 KB** | String/langstring input with language tag support and autocomplete |
| `TimelineElement.vue` | **17 KB** | Single timeline entry for assertion history |
| `Breadcrumbs.vue` | **13 KB** | Framework path breadcrumbs showing where a competency sits in the hierarchy |
| `Assertion.vue` | **12 KB** | Read-only assertion display |
| `AssertionTimeline.vue` | **1 KB** | Timeline container for assertion history |

### 6.2 Framework Components (`src/components/framework/`)

| Component | Size | Role |
|---|---|---|
| `ListItemInfo.vue` | **84 KB** | Detailed info panel for a selected competency (largest non-LODE component) |
| `EditorToolbar.vue` | **30 KB** | Toolbar above the editor: add, move, indent/outdent, delete, search, collapse/expand |
| `Search.vue` | **17 KB** | In-framework search with highlighting |
| `SearchBar.vue` | **9 KB** | Search input bar |
| `Comments.vue` | **13 KB** | Comment thread display |
| `Comment.vue` | **6 KB** | Single comment |
| `RightAside.vue` | **4 KB** | Right-side details panel |
| `Versions.vue` | **2 KB** | Version history panel |

### 6.3 Import Components (`src/components/import/`)

| Component | Role |
|---|---|
| `ImportTabs.vue` | Tab container for import methods |
| `ImportFile.vue` | File upload (CSV, JSON-LD, PDF) |
| `ImportServer.vue` | Import from remote server (CASE, OpenSalt) |
| `ImportUrl.vue` | Import from a URL |
| `ImportText.vue` | Paste-in text import |
| `ImportDetails.vue` | Import preview/mapping |
| `DragAndDrop.vue` | Drag-and-drop file upload zone |

### 6.4 Configuration Components (`src/components/configuration/`)

| Component | Role |
|---|---|
| `ConfigurationDetails.vue` | **256 KB** — Main configuration editor (largest file in project) — field definitions, relations, levels, property constraints |
| `ConfigurationList.vue` | List of available configurations |
| `ConfigurationListItem.vue` | Individual config card |
| `FrameworkCompetencyPropertyListItem.vue` | Property list entry in config |
| `RelationshipListItem.vue` | Relationship type entry in config |

### 6.5 Modal Dialogs (`src/components/modalContent/`)

28 modal components covering: delete confirmations (competency, concept, framework, config, directory, level, comment), export options, import errors, share/permissions, assertion sharing, search, multi-edit, comments, login/logout, framework configuration, required properties, and message-of-the-day.

Key large modals:
- `Share.vue` (68 KB) — user/group permission management
- `SearchModal.vue` (27 KB) — global search overlay
- `SupportedImportDetails.vue` (28 KB) — import format documentation
- `MultiEdit.vue` (20 KB) — bulk property editing
- `Single.vue` (15 KB) — single-item detail modal
- `ShareAssertions.vue` (17 KB) — assertion sharing controls
- `ExportOptionsModal.vue` (15 KB) — export format selection

---

## 7. Routes

| Path | Name | View Component(s) |
|---|---|---|
| `/` | `welcome` | `Welcome.vue` + SideNav + Topbar |
| `/frameworks` | `frameworks` | Framework list + SideNav + Topbar |
| `/collections` | `collections` | Collection list + SideNav + Topbar |
| `/concepts` | `concepts` | Concept scheme list + SideNav + Topbar |
| `/progressionLevels` | `progressionLevels` | Progression model list + SideNav + Topbar |
| `/login` | `login` | Login view |
| `/legacyLogin` | `legacyLogin` | Legacy login form |
| `/createAccount` | `createAccount` | Account creation |
| `/configuration` | `configuration` | ConfigurationEditor + SideNav + Topbar |
| `/users` | `users` | User management + SideNav + Topbar |
| `/pluginManager` | `pluginManager` | Plugin management + SideNav + Topbar |
| `/crosswalk` | `crosswalk` | Framework crosswalk tool + SideNav + Topbar |
| `/timeline` | `timeline` | Assertion timeline + SideNav + Topbar |
| `/framework` | `framework` | Framework detail/editor + SideNav + Topbar |
| `/directory` | `directory` | Directory browser + SideNav + Topbar |
| `/organization` | `organization` | Organization management + SideNav + Topbar |

---

## 8. Data Model (CaSS / JSON-LD)

The editor works with RDF objects via the `cassproject` SDK. Core types:

| RDF Type | SDK Class | Description |
|---|---|---|
| `schema:Framework` | `EcFramework` | Container for competencies with `competency[]` and `relation[]` arrays |
| `schema:Competency` | `EcCompetency` | Individual competency with name, description, coded notation, etc. |
| `schema:Relation` | `EcAlignment` | Relationship between two competencies (narrows, requires, equivalent, etc.) |
| `schema:ConceptScheme` | `EcConceptScheme` | SKOS concept scheme container |
| `schema:Concept` | `EcConcept` | SKOS concept |
| `schema:Level` | `EcLevel` | Proficiency level |
| `schema:CreativeWork` | — | Resource alignment (teaches, assesses, defines) |
| `schema:Person` | `EcPerson` | User identity with linked `EcIdentity` |
| `schema:Organization` | `EcOrganization` | Group/organization with shared identity |

### Security Model (KBAC)
- **`@owner`** — RSA public keys of owners (full CRUD)
- **`@reader`** — RSA public keys of readers (decrypt private objects)
- Objects without `@owner` are public
- Private objects are encrypted; only `@owner`/`@reader` key holders can decrypt
- Group identities: organizations create a shared keypair; members gain the group's identity

---

## 9. URL Parameters (iframe Integration)

The editor is designed for iframe embedding and extensively configurable via URL parameters:

| Parameter | Purpose |
|---|---|
| `server=<url>` | CaSS Repository API endpoint |
| `view=true` | Read-only mode |
| `concepts=true` | Concept scheme mode |
| `select=<label>` | Enable competency selection with button label |
| `singleSelect=<label>` | Single-select mode |
| `selectVerbose=true` | Return full competency objects in selection |
| `selectExport=ctdlasn` | CTDL-ASN schema in selection postMessages |
| `selectRelations=true` | Include relations in selection |
| `action=add\|import` | Auto-navigate to create/import workflow |
| `frameworkId=<url>` | Open specific framework |
| `filter=<query>` | Pre-filter framework search |
| `user=self\|wait` | User identity mode |
| `show=mine` / `ownedByMe=true` | Show only owned frameworks |
| `private=true` | Default new objects to private |
| `ceasnDataFields=true` | Enable CTDL-ASN field profiles |
| `newObjectEndpoint=<url>` | Custom canonical URI prefix |
| `frameworksPage=true` | Bypass welcome page |
| `disableAssertions=true` | Hide assertion features |
| `css=<url>` | Import external CSS |
| `editorRoot=<path>` | Override root path |
| `webSocketOverride=<url>` | Custom WebSocket endpoint |
| `origin=<url>` | PostMessage origin for parent page |

---

## 10. PostMessage API

The editor communicates with parent pages via `window.postMessage`:

### Inbound Messages (from parent)
| Action | Purpose |
|---|---|
| `identity` | Pass RSA private key for user authentication |
| `template` | Set default properties for new competencies/frameworks/concepts |
| `export` | Trigger export in specified schema |
| `select` | Trigger selection action |
| `set` | Set properties on an object by `@id` |
| `highlightedCompetencies` | Highlight specific competencies in tree |

### Outbound Events (to parent)
| Message Type | When |
|---|---|
| `selected` | User selects competencies |
| `frameworkChanged` | Framework properties modified |
| `frameworkClicked` | Framework selected/opened |
| `competencyChanged` | Competency properties modified |
| `competencyClicked` | Competency selected |
| `viewChanged` | Internal view navigation |
| `response` (export) | Export data ready |
| `setOk` / `setFail` | Object set operation result |

---

## 11. Build & Development

### Scripts
```bash
npm run serve          # Dev server (localhost:8080, HTTPS)
npm run build          # Production build
npm run test:unit      # Jest unit tests
npm run test:e2e       # Playwright e2e tests (needs app on :8082)
npm run lint           # ESLint
```

### Dev Server Config (`vue.config.js`)
- HTTPS with local certs
- Source maps enabled
- Optimization disabled (development)
- Babel transpiles `cassproject` and `yocto-queue` from `node_modules`
- Gzip compression plugin
- `publicPath: ''` for relative deployment

### Environment Variables
```
VUE_APP_SELECTEDSERVER=https://dev.api.cassproject.org/api/  # in .env.local
```

---

## 12. Testing

### E2E Tests (Playwright)
- **186 spec files** in `tests/e2e/`, named after requirements (e.g., `ca-83.spec.js` through `ca-268.spec.js`)
- Additional specs: `smoke.spec.js`, `navigation.spec.js`, `content-management.spec.js`, `requirements.spec.js`, `debug_login.spec.js`
- **Fixtures**: `fixtures.js` provides test helpers, common selectors, and setup routines
- **Config**: Chromium only, 120s test timeout, 60s expect timeout, 1 retry, 8 workers (1 on CI)
- **Coverage**: Istanbul/NYC output in `tests/e2e/coverage/`

### Unit Tests (Jest)
- 7 test files in `tests/unit/`

---

## 13. Real-Time Collaboration (WebSocket)

`App.vue` method `openWebSocket(r)` establishes a WebSocket to the CaSS server for real-time updates:
- Receives change notifications for frameworks, competencies, relations
- `changedObject(wut)` method processes incoming changes and updates the Vuex store
- Auto-reconnects on close
- `webSocketOverride` URL param supports reverse proxy configurations

---

## 14. App Initialization Flow (`App.vue.initializeApp()`)

1. Parse URL query parameters (`window.queryParams`)
2. Configure `EcRepository` with the selected server
3. Set feature flags from URL params → Vuex `featuresEnabled`
4. Load user identity (from localStorage, postMessage, or SSO)
5. Search for linked `Person` and group organizations
6. Add group identities to the identity manager
7. Open WebSocket for real-time collaboration
8. Load plugins (if plugin system enabled)
9. Navigate to appropriate route based on URL params (`frameworkId`, `action`, `concepts`, etc.)

---

## 15. Key Implementation Patterns

### Fetch Throttling (`main.js`)
Global `fetch` is monkey-patched to limit concurrent requests to 10, with 10ms poll intervals for queued requests. This prevents overwhelming the CaSS server.

### `v-click-outside` Directive
Custom Vue directive for detecting clicks outside an element, used for dismissing dropdowns and modals.

### EcRepository Caching
```js
EcRepository.caching = true;     // In-memory L1 cache
EcRepository.cachingL2 = true;   // Persistent L2 cache
```

### Vue Warn Suppression
Specific known warnings are silenced (Boolean prop type coercion, non-primitive keys, duplicate keys).

---

## 16. Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| ↑/↓ | Navigate framework/competency list |
| ←/→ | Expand/collapse nested competencies |
| Space | Select focused element (1.3+) |
| Tab | Focus navigation |
| Shift+X | Cut (drag) competency |
| Shift+C | Copy competency |
| Shift+V | Paste (drop) competency |
| Shift+↑/↓ | Move competency up/down |
| Shift+←/→ | Indent/outdent competency |

---

## 17. Past Conversation Context

### Schema Tooltip Fix (Conv. `4f9768ae`)
Fixed `JsonLdEditor.vue` to correctly render table header descriptions when a schema is selected — tooltips now appear on hover for property headers.

### Documentation Suite (Conv. `a58ca435`)
Created/updated documentation files: `FILE.md`, `CONFIGURATION.md`, `DEPLOYMENT.md`, `ISSUE_TEMPLATE.md`, `PULL_REQUEST_TEMPLATE.md`.

### Browser Coverage Exploration (Conv. `f1ca5b45`)
Drove browser-based code coverage exploration targeting zero-coverage components (`Breadcrumbs.vue`, `competencyEdits.js`, `AddProperty.vue`, `ListItemInfo.vue`). Combined manual exploration coverage with automated test coverage.

---

## 18. Large / Complex Files (by size)

| File | Size | Notes |
|---|---|---|
| `src/components/configuration/ConfigurationDetails.vue` | 256 KB | Configuration editor — largest in project |
| `src/mixins/ctdlasnProfile.js` | 209 KB | CTDL-ASN field/schema definitions |
| `src/mixins/configuration.js` | 131 KB | Configuration profile logic |
| `src/lode/components/ThingEditing.vue` | 91 KB | Core editing surface |
| `src/lode/components/Hierarchy.vue` | 61 KB | Tree component |
| `src/lode/components/Property.vue` | 62 KB | Property editor |
| `src/App.vue` | 76 KB | Root app (1523 lines) |
| `src/mixins/import.js` | 72 KB | Import logic |
| `src/components/modalContent/Share.vue` | 68 KB | Permission management |
| `src/lode/ietf-language-tags_json.json` | 957 KB | Language tag database |

---
