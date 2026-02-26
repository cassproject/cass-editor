# Context — Current Work

## Active Objective

Increase CaSS Editor E2E code coverage from **33.89% lines** to **90%**.

## Coverage Progression

| Milestone | Lines | How |
|-----------|-------|-----|
| Baseline | 0.15% | No E2E coverage toolchain |
| Sessions 1–4 | 21.59% | Route visits, feature flags, auth flows, CRUD |
| Phase 5 Batch 1 | 31.78% | 5 specs for zero-coverage components |
| Phase 5 Complete | 32.77% | 13 specs across 3 batches |
| Phase 6 + import fixes | 33.89% | 6 deep workflow specs + CSV/text import fixes |

## Top Uncovered Files (by uncovered lines)

| File | Coverage | Uncovered Lines | Notes |
|------|----------|-----------------|-------|
| `ctdlasnProfile.js` | 0% | ~2954 | Profile schema constants |
| `tlaProfile.js` | 0% | ~607 | Profile schema constants |
| `import.js` | 21% | ~1030 | Import mixin — needs deeper flow |
| `common.js` | 16% | ~640 | Common mixin — needs interactions |
| `App.vue` | 26% | ~640 | Main app — route/watcher code |
| `ConfigurationDetails.vue` | 28% | ~594 | Config editing |
| `ImportServer.vue` | 1.7% | ~700 | Server import — needs connect flow |
| `ListItemInfo.vue` | 8.8% | ~686 | Info panel — needs accordion exercise |
| `ThingEditing.vue` | 36% | ~470 | Property editing |
| `Search.vue` | 0% | ~283 | Search modal component |
| `EditorToolbar.vue` | 27% | ~280 | Framework toolbar |
| `HierarchyNode.vue` | 35% | ~400 | Node-level interactions |
| `MultiEdit.vue` | 6% | ~310 | Multi-edit modal |

## What We've Done

### Infrastructure
- **Coverage collection**: `fixtures.js` collects `window.__coverage__` after each test, writes JSON to `.nyc_output/`. Run `npx nyc report` to see combined coverage.
- **Fixtures**: `loginAndNavigate()` creates a fresh account each run. `navigateToFramework()` searches for "Harvard Emotional Intelligence" framework by name, waits for search results, falls back to iterating.
- **Config**: `playwright.config.js` runs Chromium only, base URL `http://localhost:8082`, 120s timeout, 60s expect timeout, 3 workers, 1 retry.

### Spec Files Created (in `tests/e2e/coverage/`)
There are **85 spec files** in total. Key ones from this session:

**Phase 5 — 13 new specs:**
- `cov-progression-hierarchy.spec.js` → ProgressionHierarchy.vue
- `cov-concept-hierarchy.spec.js` → ConceptHierarchy.vue
- `cov-search-component.spec.js` → Search.vue (basic)
- `cov-comments.spec.js` → Comments.vue
- `cov-create-account.spec.js` → CreateAccount.vue
- `cov-import-mixin.spec.js` → import.js mixin (CSV upload + Process Files + text paste + all tabs)
- `cov-import-server.spec.js` → ImportServer.vue (OpenSalt.net example)
- `cov-list-item-info.spec.js` → ListItemInfo.vue
- `cov-multi-edit.spec.js` → MultiEdit.vue (clicks labels with `force: true`)
- `cov-app-deep.spec.js` → App.vue
- `cov-config-details.spec.js` → ConfigurationDetails.vue
- `cov-common-mixin-deep.spec.js` → common.js
- `cov-crosswalk-deep.spec.js` → Crosswalk.vue

**Phase 6 — 6 deep workflow specs (all passing ✅):**
- `cov-csv-import-workflow.spec.js` — Upload CSV → Process Files → Import (11.1s)
- `cov-text-import-workflow.spec.js` — Paste text → Name → Import (15.6s)
- `cov-framework-editing-deep.spec.js` — Select competency, edit properties, toolbar (22.1s)
- `cov-config-list-crud.spec.js` — Browse, create, edit, delete configs (12.6s)
- `cov-hierarchy-deep.spec.js` — Expand/collapse, drag, context menu, keyboard (22.2s)
- `cov-list-info-deep.spec.js` — Filter/sort, accordions, share links (13.6s)

**Phase 7 — 4 new specs (written, NOT YET VERIFIED):**
- `cov-import-server-deep.spec.js` — Connect to local CaSS endpoint + invalid URL error
- `cov-search-modal.spec.js` — Open search modal via add relation/property
- `cov-full-app-nav.spec.js` — Visit every route, sidebar links, user menu
- `cov-competency-editing.spec.js` — All property views, property string editing

### Key Fixes
- Fixed `require('./fixtures')` → `require('../fixtures')` in all `tests/e2e/requirement/*.spec.js` files (via sed)
- Fixed `cov-multi-edit.spec.js`: click `<label>` with `force: true` instead of hidden checkboxes
- Fixed `cov-import-mixin.spec.js`: added "Process Files" button click after CSV upload (user feedback)
- Removed URL import button click that triggered blocking external fetch to onetcenter.org

## Commands

```bash
# Run a single test
npx playwright test tests/e2e/coverage/cov-import-mixin.spec.js --output=/tmp/test-results

# Run multiple tests
npx playwright test tests/e2e/coverage/cov-csv-import-workflow.spec.js tests/e2e/coverage/cov-text-import-workflow.spec.js --output=/tmp/test-results

# Generate coverage report
npx nyc report

# Detailed per-file coverage
npx nyc report --reporter=text
```

## Current Approach

1. Write a spec targeting the largest uncovered file(s)
2. Run it with Playwright
3. If it fails, check error context: `cat /tmp/test-results/*/error-context.md`
4. Fix the spec based on actual page state from the error context
5. Run `npx nyc report` to check coverage gains
6. Repeat

## Rules (from RULES.md)
- No `waitForTimeout` — use Playwright auto-waiting
- No inline `{ timeout: ... }` overrides — use global config
- One test per file
- No mocks — test the fully integrated system
- Run and fix tests one at a time
- Check `playwright-report.json` for results

## Blockers
- **Browser tool unavailable**: CDP connection refused at `127.0.0.1:9222`. Cannot use browser subagent for visual inspection. Using Playwright error context snapshots instead.
- **WSL filesystem permissions**: `EACCES` errors on `.webm` files in `test-results/`. Workaround: `--output=/tmp/test-results`.
- **External URLs timeout**: O*Net URLs from ImportUrl examples time out. Don't click the import button for URL imports.
