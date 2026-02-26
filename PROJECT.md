# CaSS Editor — Project Knowledge

## Overview

**CaSS Editor** is a Vue.js 2 web application for managing competency frameworks, taxonomies, and related educational data. It is the front-end editor for the [CaSS (Competency and Skills System)](https://cassproject.org) framework management system.

The app connects to a CaSS backend API server (typically at `http://localhost/api/`).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Vue.js 2 (Options API) |
| State | Vuex (store modules) |
| Routing | Vue Router (hash mode: `/#/route`) |
| Build | Vue CLI / Webpack |
| Testing | Playwright (E2E), nyc/Istanbul (coverage) |
| CSS | SCSS + Bulma framework |
| Backend | CaSS API server (Java-based, separate repo) |

## Source Structure

```
src/
├── App.vue                    # Main app (76KB, largest file — route handling, watchers, login logic)
├── main.js                    # App bootstrap, store/router setup
├── router.js                  # Vue Router config — hash mode routes
├── components/
│   ├── configuration/         # ConfigurationDetails, ConfigurationList, ConfigurationListItem
│   ├── framework/             # Comments, EditorToolbar, ListItemInfo, Search, SearchBar, Versions
│   ├── frameworks/            # FilterAndSort
│   ├── import/                # ImportFile, ImportServer, ImportTabs, ImportText, ImportUrl, DragAndDrop
│   ├── modalContent/          # MultiEdit, DuplicateImport, ConfigNotPermitted, etc.
│   ├── modals/                # DynamicModal
│   ├── plugins/               # PluginDetails, PluginListItem
│   ├── AddNewDropdown.vue, Dropdown.vue, DropdownItem.vue, Panel.vue, SideNav.vue, Topbar.vue
│   └── ...
├── lode/components/           # Core editor components
│   ├── Hierarchy.vue          # Tree view of competencies within a framework
│   ├── HierarchyNode.vue      # Individual node in the hierarchy tree
│   ├── Thing.vue              # Generic schema.org thing display/editing
│   ├── ThingEditing.vue       # Property editing panel for a selected thing
│   ├── Property.vue           # Individual property display
│   ├── PropertyString.vue     # String property editor
│   ├── List.vue               # Generic list component for frameworks/competencies
│   ├── AddProperty.vue        # Add new property to an object
│   └── Breadcrumbs.vue        # Breadcrumb navigation
├── mixins/
│   ├── import.js              # Import functionality (CSV, URL, file, text parsing) — 800+ lines
│   ├── common.js              # Shared methods (clipboard, multi-select, context menu, keyboard)
│   ├── configuration.js       # Configuration management methods
│   ├── competencyEdits.js     # Competency editing operations
│   ├── cassApi.js             # CaSS API interaction utilities
│   ├── cassUtil.js            # General CaSS utilities
│   ├── ctdlasnProfile.js      # CTDL-ASN profile field definitions (~3000 lines of schema)
│   ├── tlaProfile.js          # TLA profile field definitions (~600 lines)
│   ├── t3Profile.js           # T3 profile field definitions
│   ├── editDirectory.js       # Directory editing operations
│   ├── getLevelsAndRelations.js # Fetching related levels and relations
│   └── pluginUtil.js          # Plugin management utilities
├── store/                     # Vuex store modules
│   ├── app.js                 # App state (import status, modals, search)
│   ├── editor.js              # Editor state (framework, competency, query params)
│   ├── lode.js                # LODE state (search modal, property editing)
│   └── featuresEnabled.js     # Feature flags
├── views/                     # Route view components
│   ├── framework/             # FrameworkView, ConceptView, etc.
│   ├── login/                 # Login, CreateAccount, LegacyLogin
│   └── ...
├── scss/                      # SCSS stylesheets
└── assets/                    # Static assets (images, icons)
```

## Routes

| Hash Route | View | Description |
|------------|------|-------------|
| `/#/frameworks` | Frameworks list | Browse all competency frameworks |
| `/#/framework/{id}` | Framework detail | View/edit a single framework with hierarchy |
| `/#/import` | Import page | Tabs: File, Server, Text, URL imports |
| `/#/crosswalk` | Crosswalk | Align competencies across frameworks |
| `/#/concepts` | Taxonomies | Browse/manage concept schemes |
| `/#/configuration` | Configurations | Manage custom configurations |
| `/#/pluginManager` | Plugins | Manage plugins |
| `/#/users` | Users/Groups | User and group management |
| `/#/timeline` | Timeline | Assertion timeline |
| `/#/login` | Login | CAS/API login |
| `/#/legacyLogin` | Legacy Login | Username/password login + account creation |
| `/#/directory` | Directories | File/folder organization |

## Import System

The import system is one of the most complex parts of the app, spanning multiple components and the `import.js` mixin.

### Import Tabs
- **File Import** (`ImportFile.vue`): Upload CSV, XML, JSON, PDF, DOCX, HTML. Uses DragAndDrop.vue. After upload, click "Process Files" → CSV shows column config → click "Import".
- **Server Import** (`ImportServer.vue`): Connect to CASE or CaSS endpoints. Has "connect to CASE endpoint" and "connect to CaSS endpoint" buttons. OpenSalt.net example link.
- **Text Import** (`ImportText.vue`): Paste competency text + name framework → triggers `parseText` watcher.
- **URL Import** (`ImportUrl.vue`): Enter URL or click one of 5 O*Net example links → Import button triggers external fetch (can timeout).

### Import Flow (CSV)
1. Click File tab → Upload CSV → "Process Files" button
2. "5 Competencies Detected" → column config dropdowns auto-select
3. Framework name input (pre-filled from filename)
4. "Import" button → triggers `importCsv()` in import.js
5. Success → "done" / "Open" button

### Key IDs in Import UI
- `#import-file-tab-button`, `#import-server-tab-button`, `#import-text-tab-button`, `#import-url-tab-button`
- `#import-server-url-input`, `#import-server-connect-case-button`, `#import-server-connect-cass-button`
- `#import-url-input`, `#import-url-import-button`, `#import-url-example-1-link` through `#import-url-example-5-link`
- `#import-text-paste-textarea`
- `#import-from-file`, `#import-from-server`

## Framework Editor

When viewing a framework (`/#/framework/{id}`):
- **Left side**: Hierarchy tree (`Hierarchy.vue` + `HierarchyNode.vue`)
- **Right side**: Property editor (`ThingEditing.vue`) for selected competency
- **Toolbar**: `EditorToolbar.vue` — add, copy, delete, export, property view toggles

### Key IDs in Framework Editor
- `#framework` — framework view container
- `#add-competency-button`, `#copy-competency-button`, `#export-button`
- `#property-view-primary-button`, `#property-view-required-button`, `#property-view-all-button`
- `.lode__hierarchy-item` — individual competency nodes
- `.lode__thing` — thing display component
- `#search-bar-input` — search/filter bar

## Configuration System

- **ConfigurationList.vue** — Lists available configurations
- **ConfigurationDetails.vue** — Create/edit/delete configurations with toggles, text inputs, dropdowns
- **Key IDs**: `#configuration`, `#create-new-configuration-button`, `#configuration-details-configuration-name-input`, `#configuration-details-save-configuration-button`, `#configuration-details-delete-configuration-button`

## Authentication

- **Legacy Login** (`/#/legacyLogin`): Username/password + account creation form
- **API Login** (`/#/login`): CAS/SSO-based login
- **Feature flag**: `featuresEnabled/apiLoginEnabled` controls which login mode
- **Test approach**: Create throwaway accounts with unique `Date.now()`-based usernames

### Login Flow (Tests)
1. `page.goto('/#/legacyLogin?server=http://localhost/api/')`
2. Disable API login via store commit
3. Click create account → fill name, email, username, password → submit
4. Wait for `#side-nav-user-icon-button` to confirm logged in

## Test Infrastructure

### fixtures.js Exports
- `test` — Extended Playwright test that collects `window.__coverage__` after each test
- `expect` — Playwright expect
- `loginAndNavigate(page)` — Create account + login
- `navigateToFramework(page)` — Search for Harvard Emotional Intelligence framework, open it
- `createConfig(page, name, description)` — Create a configuration
- `loginAndCreateConfig(page)` — Login + create config, returns uid
- `TEST_FRAMEWORK_NAME` — `"Harvard Emotional Intelligence"`

### Coverage Collection
- App is instrumented with Istanbul (via babel-plugin-istanbul or similar)
- `window.__coverage__` is available on the page
- After each test, fixture writes coverage JSON to `.nyc_output/coverage-{timestamp}.json`
- `npx nyc report` aggregates all JSON files into a combined report

### playwright.config.js
- `testDir`: `./tests/e2e`
- `baseURL`: `http://localhost:8082`
- `timeout`: 120000ms (2 min)
- `expect.timeout`: 60000ms (1 min)
- `workers`: 3 (local), 1 (CI)
- `retries`: 1 (local), 2 (CI)
- `trace`: retain-on-failure
- Chromium only (Firefox/WebKit commented out)

## Backend Services

- **CaSS API**: `http://localhost/api/` — main backend for frameworks, competencies, identities
- **Dev server**: `http://localhost:8082` — Vue CLI dev server with coverage instrumentation
- **External**: OpenSalt.net (for server import examples), O*Net (for URL import examples)

## Key Libraries/Dependencies

- **cass-npm** / **cassproject**: CaSS client libraries (`EcFramework`, `EcCompetency`, `EcAlignment`, `EcRepository`, `EcIdentityManager`, etc.)
- **Bulma**: CSS framework (`.columns`, `.button`, `.modal`, etc.)
- **Font Awesome**: Icons (`.fa`, `.fas` classes)
- **lodash/debounce**: Used in ImportServer search

## WSL Environment Notes

- Project runs in WSL (Windows Subsystem for Linux)
- File permissions can cause issues with `.webm` video files in `test-results/`
- Workaround: Use `--output=/tmp/test-results` for Playwright output
- `EACCES` errors on `unlink` for `.webm` files are a known WSL artifact
