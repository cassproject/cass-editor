# Project Rules

## E2E Testing (Playwright)

- **Do not use `waitForTimeout`** in tests. Use Playwright's built-in auto-waiting (e.g. `waitForSelector`, `expect(...).toBeVisible()`, `waitForResponse`, `waitForLoadState`) instead of fixed timeouts, which create flaky and slow tests.
- **Do not use inline `{ timeout: ... }` overrides** in assertions or waits. Rely on the global timeouts configured in `playwright.config.js`. If a test needs more time, increase the global config rather than adding per-assertion overrides.
- **Check `playwright-report.json` for results** after tests have been run instead of re-running the test suite. The JSON report contains pass/fail status, error messages, and timing for every test.
- **Do not degrade tests marked `FR: Accepted`**. These tests have been reviewed and approved by the user. Do not modify their assertions, logic, or structure unless explicitly asked.
