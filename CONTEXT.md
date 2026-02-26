# CaSS Editor — Full Project & Task Context

## Project Overview
CaSS Editor is a **Vue 2** single-page application for managing competency frameworks, concept schemes, progression models, and crosswalks. It connects to a CaSS backend server (Java/Elasticsearch) for data persistence.

### Tech Stack
- **Frontend**: Vue 2, Vuex, Vue Router, Webpack (via Vue CLI)
- **Testing**: Playwright (E2E), Jest (unit)
- **Coverage**: babel-plugin-istanbul (instrumentation), nyc (reporting)
- **Backend**: CaSS server (Java), Elasticsearch — runs in Docker
- **Package manager**: npm

### Key Directories
```
src/
├── main.js              — App entry, Vue init, global config
├── App.vue              — Root component, layout, sidebar
├── router.js            — All route definitions
├── store/               — Vuex store modules
│   ├── app.js           — App-wide state (modals, sidebar)
│   ├── editor.js        — Framework/competency editing state
│   ├── featuresFlags.js — Feature flag toggles
│   ├── lode.js          — LODE component state
│   └── crosswalk.js     — Crosswalk state
├── views/               — Page-level components
│   ├── Welcome.vue
│   ├── Login.vue, LegacyLogin.vue, CreateAccount.vue
│   ├── framework/
│   │   ├── Framework.vue       — Main framework editor
│   │   ├── Frameworks.vue      — Framework list
│   │   ├── Import.vue          — Import page (tabs for CSV/JSON/URL/server)
│   │   ├── ImportServer.vue    — Server-to-server import
│   │   ├── Crosswalk.vue       — Framework alignment/crosswalk
│   │   └── DirectoryList.vue   — Directory browsing
│   ├── conceptScheme/
│   │   ├── ConceptScheme.vue
│   │   └── ConceptHierarchy.vue  — 810 lines, concept tree
│   ├── progressionModel/
│   │   ├── ProgressionModel.vue
│   │   └── ProgressionHierarchy.vue — 1369 lines, progression tree
│   ├── configuration/
│   │   └── Configuration.vue
│   └── organization/
│       └── Organizations.vue
├── components/          — Reusable UI components
│   ├── SideNav.vue, NarrowSideNav.vue
│   ├── framework/       — EditorToolbar, RightAside, FilterAndSort, etc.
│   └── modals/          — ShareModal, ExportModal, etc.
├── lode/components/     — LODE framework editor components
│   ├── Hierarchy.vue    — Tree rendering for frameworks
│   ├── Thing.vue        — Read-only node display
│   ├── ThingEditing.vue — Editable node display
│   ├── Property.vue     — Property editor
│   └── ...
└── mixins/              — Shared logic mixed into components
    ├── common.js           — 761 lines, keyboard shortcuts, clipboard, drag-drop
    ├── import.js           — 1302 lines, file parsing (CSV, JSON, MEDBIQ, ASN)
    ├── ctdlasnProfile.js   — 2954 lines, CTDL-ASN schema definitions
    ├── t3Profile.js        — 247 lines, T3 schema definitions
    ├── tlaProfile.js       — 607 lines, TLA schema definitions
    ├── competencyEdits.js  — Framework save/edit operations
    └── getLevelsAndRelations.js — Loads levels & relations for frameworks
```

### Routes (from router.js)
| Route | Component | Notes |
|-------|-----------|-------|
| `/` | Welcome | Landing page |
| `/frameworks` | Frameworks | Framework list |
| `/framework` | Framework | Single framework editor |
| `/crosswalk` | Crosswalk | Alignment editor |
| `/concepts` | ConceptScheme | Concept scheme list |
| `/conceptScheme` | ConceptHierarchy | Single concept scheme |
| `/progressionLevels` | ProgressionModel | Progression model list |
| `/progressionModel` | ProgressionHierarchy | Single progression model |
| `/configuration` | Configuration | Config editor |
| `/users` | Users/Groups | User management |
| `/directory` | DirectoryList | Directory browser |
| `/login` | Login | SSO/CAS login |
| `/legacyLogin` | LegacyLogin | Username/password login |
| `/import` | Import | Import page |
| `/plugins` | Plugins | Plugin management |

---

## Current Task: Increase Code Coverage to 90%

### Current Coverage: ~21.59% lines (before session 5 report merge)
Session 5 collected data but the combined nyc report hasn't been regenerated yet.

### Progress History

| Phase | What | Result |
|-------|------|--------|
| Baseline | Initial instrumented server check | 0.15% |
| Session 1 | All routes unauthenticated | 7.76% |
| Session 2 | Feature flags, SideNav, import tabs, keyboard, postMessage | 12.65% |
| Session 3 | Auth flows: login, config, users, crosswalk, concepts | 17.27% |
| Session 4 | Framework CRUD, hierarchy, detail editor, export | 21.59% |
| E2E suite | 223 Playwright specs (8 workers) | included above |
| Jest | 47 unit tests | included above |
| Session 5 | 13 sub-sessions targeting all remaining gaps | **data collected, report pending** |

### Session 5 Results (data in .nyc_output/)
All 13 sub-sessions completed successfully:
- `ctdlasn-profile` — 54 files (navigated with `ceasnDataFields=true`)
- `t3-profile` — 44 files
- `tla-profile` — 44 files
- `concept-hierarchy` — 36 files
- `progression-hierarchy` — 36 files
- `directory-list` — 40 files (found 3 items)
- `search` — 38 files
- `import-deep` — 38 files (0 import tabs found — may need different approach)
- `common-mixin` — 44 files (keyboard shortcuts: Ctrl+X/C/V, Tab, Delete, Ctrl+Z)
- `crosswalk-deep` — 41 files (0 crosswalk items)
- `welcome-deep2` — 59 files (33 buttons/links clicked)
- `app-deep` — 38 files (viewport resize: 375px, 768px, 1920px)
- `login-deep` — 17 files

---

## Profile Mixin Activation — Critical Knowledge

The profile mixins (`ctdlasnProfile.js`, `t3Profile.js`, `tlaProfile.js`) are **computed properties** that return large schema objects. They only execute when accessed by the component.

### Framework.vue decides which profile to use (lines 279-291):
```javascript
frameworkProfile: function() {
    // T3 profile — activated by Vuex store state
    if (this.$store.state.editor.t3Profile === true)
        return this.t3FrameworkProfile;

    // CTDL-ASN Collection — subType check
    if (this.isCeasn && this.framework.subType === 'Collection')
        return this.ctdlAsnCollectionProfile;

    // CTDL-ASN Framework — URL param ceasnDataFields=true
    if (this.isCeasn && ((this.config && !this.configSetOnFramework) || !this.config))
        return this.ctdlAsnFrameworkProfile;

    // TLA — URL param tlaProfile=true
    if (this.queryParams.tlaProfile === "true" && ...)
        return this.tlaFrameworkProfile;

    // Custom config or default
    if (this.config) return this.config.frameworkConfig;
    return { /* default profile */ };
}
```

The `isCeasn` computed property checks `this.queryParams["ceasnDataFields"] === 'true'`.

### URL Parameters for Profile Activation:
| URL Parameter | Profile | Mixin File |
|---------------|---------|------------|
| `ceasnDataFields=true` | CTDL-ASN | `ctdlasnProfile.js` |
| `tlaProfile=true` | TLA | `tlaProfile.js` |
| Store: `editor.t3Profile=true` | T3 | `t3Profile.js` |
| `concepts=true` | Concept mode | Activates ConceptHierarchy |
| `view=true` | View-only mode | Disables editing |

### Example URLs to trigger profiles:
```
# CTDL-ASN
http://localhost:8082/#/frameworks?server=http://localhost/api/&ceasnDataFields=true

# TLA
http://localhost:8082/#/frameworks?server=http://localhost/api/&tlaProfile=true

# Concept mode
http://localhost:8082/#/concepts?server=http://localhost/api/

# Progression mode
http://localhost:8082/#/progressionLevels?server=http://localhost/api/

# View-only
http://localhost:8082/#/frameworks?server=http://localhost/api/&view=true
```

---

## Coverage Toolchain Details

### Instrumentation
- `babel-plugin-istanbul` is configured in `babel.config.js` (or similar)
- It instruments source files during Webpack compilation
- The `serve:coverage` script runs the dev server with instrumentation enabled on port 8082

### Collection
- `window.__coverage__` is available on any page served by the instrumented server
- Coverage data is a JSON object keyed by file path
- Playwright tests use `tests/e2e/fixtures.js` which wraps the base test to auto-collect coverage after each test

### Reporting
```bash
# Text report
npx nyc report --reporter=text --include="src/**"

# HTML report (browsable)
npx nyc report --reporter=html --include="src/**"

# Report file location
.nyc_output/          — raw coverage JSON files
coverage/             — generated HTML report
coverage-report.txt   — text report snapshot
```

### Existing E2E Tests
- **57 coverage tests** in `tests/e2e/coverage/cov-*.spec.js`
- Use Playwright with custom fixtures for automatic coverage collection
- Run with: `npx playwright test tests/e2e/coverage/`

---

## Standalone Coverage Scripts (in project root)

These were created during this effort but should be converted to proper E2E tests:

| Script | Purpose |
|--------|---------|
| `collect-coverage.js` | Session 1: all routes unauthenticated |
| `collect-coverage2.js` | Session 2: feature flags, SideNav, import, keyboard |
| `collect-coverage3.js` | Session 3: authenticated (login, config, users, crosswalk) |
| `collect-coverage4.js` | Session 4: framework CRUD, LODE components |
| `collect-coverage5.js` | Session 5: profiles, concepts, progressions, directories, etc. |

---

## Remaining Coverage Gaps (before session 5 data merged)

| File | Lines | Pre-S5 Coverage | Session 5 Targeted? |
|------|-------|-----------------|---------------------|
| `ctdlasnProfile.js` | 2954 | 0% | ✅ via `ceasnDataFields=true` |
| `import.js` (mixin) | 1302 | 1.38% | Partially (no file upload) |
| `ProgressionHierarchy.vue` | 1369 | 0% | ✅ via `/progressionLevels` |
| `ConceptHierarchy.vue` | 810 | 0% | ✅ via `/concepts` |
| `common.js` | 761 | 8.95% | ✅ keyboard shortcuts |
| `ImportServer.vue` | 753 | 0% | Partially |
| `tlaProfile.js` | 607 | 0% | ✅ via `tlaProfile=true` |
| `Crosswalk.vue` | 630 | 11.5% | ✅ but 0 items found |
| `DirectoryList.vue` | 464 | 0% | ✅ via `/directory` |
| `t3Profile.js` | 247 | 0% | ✅ via store |
| `Search.vue` | 283 | 0% | ✅ |
| `Comments.vue` | 228 | 0% | Not yet targeted |

---

## Login Flow (for creating authenticated test sessions)

```javascript
// Navigate to legacy login
await page.goto('http://localhost:8082/#/legacyLogin?server=http://localhost/api/');
await page.waitForTimeout(3000);

// Click "Create Account"
await page.click('#legacy-login-create-account-button');

// Fill form
const username = 'testuser_' + Date.now();
await page.fill('#legacy-login-create-link-person-name', username);
await page.fill('#legacy-login-create-link-person-email', username + '@test.com');
await page.fill('#legacy-login-create-account-username', username);
await page.fill('#legacy-login-create-account-password', 'password123');
await page.fill('#legacy-login-create-account-password-confirm', 'password123');

// Submit
await page.click('#legacy-login-create-link-person-button');

// Wait for login completion
await page.waitForSelector('#side-nav-user-icon-button', { timeout: 30000 });
```

---

## Next Steps (Priority Order)

1. **Regenerate coverage report** — `npx nyc report --reporter=text --include="src/**"` to measure impact of session 6
2. ~~**Convert standalone scripts to proper E2E tests**~~ ✅ Done — 13 new spec files, originals deleted
3. **Target remaining gaps** — especially `import.js` (needs actual file uploads), `ImportServer.vue`, `Comments.vue`
4. **Update MYTASKS.md** with new coverage numbers
5. ~~**Clean up** — remove standalone `collect-coverage*.js` after conversion~~ ✅ Done

## Environment Notes
- CaSS backend running on **port 80**
- Editor (instrumented) running on **port 8082**
- Don't start either server — user manages them manually
