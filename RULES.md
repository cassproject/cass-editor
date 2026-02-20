# Project Rules

## E2E Testing (Playwright)

- **Do not use `waitForTimeout`** in tests. Use Playwright's built-in auto-waiting (e.g. `waitForSelector`, `expect(...).toBeVisible()`, `waitForResponse`, `waitForLoadState`) instead of fixed timeouts, which create flaky and slow tests.
- **Do not use inline `{ timeout: ... }` overrides** in assertions or waits. Rely on the global timeouts configured in `playwright.config.js`. If a test needs more time, increase the global config rather than adding per-assertion overrides.
- **Check `playwright-report.json` for results** after tests have been run instead of re-running the test suite. The JSON report contains pass/fail status, error messages, and timing for every test.
- **Do not degrade tests marked `FR: Accepted`**. These tests have been reviewed and approved by the user. Do not modify their assertions, logic, or structure unless explicitly asked.
- **One test per file**. Every E2E test must live in its own dedicated `.spec.js` file (e.g., `ca-83.spec.js`). Do not group multiple tests into a single file. This ensures isolation and makes it easier to run, debug, and review individual tests.
- **Run and fix tests one at a time**. Do not run the entire test suite to diagnose failures. Run individual test files, diagnose and fix one failure at a time, then move on to the next. Avoid batch-running all tests repeatedly.
- **Use package.json scripts** when available for commands instead of running the underlying tools (e.g. `npx`, `vue-cli-service`) directly manually.
- **Do not use mocks**. E2E tests should never use mocks, stubs, or standalone component instantiation. They must test the fully integrated system interacting naturally through the UI.
