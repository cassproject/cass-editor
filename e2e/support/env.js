// Where the tests find CaSS. Defaults match e2e/docker-compose.yml.
export const CASS_URL = (process.env.E2E_CASS_URL || `http://localhost:${process.env.E2E_CASS_PORT || '18080'}/api/`).replace(/\/?$/, '/');
// Where the tests find the editor's dev server (playwright.config.js webServer).
export const EDITOR_URL = `http://localhost:${process.env.E2E_EDITOR_PORT || '5179'}/`;
