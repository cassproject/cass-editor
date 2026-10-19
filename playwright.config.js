// End-to-end tests for the CaSS editor. See e2e/README.md.
import { defineConfig, devices } from '@playwright/test';

const CI = !!process.env.CI;
const EDITOR_PORT = process.env.E2E_EDITOR_PORT || '5179';

export default defineConfig({
    testDir: './e2e/tests',
    globalSetup: './e2e/global-setup.js',
    fullyParallel: true,
    forbidOnly: CI,
    retries: CI ? 1 : 0,
    workers: CI ? 2 : 4,
    timeout: 180_000,
    expect: { timeout: 20_000 },
    reporter: CI
        ? [['github'], ['html', { open: 'never', outputFolder: 'e2e/report' }], ['list']]
        : [['list'], ['html', { open: 'never', outputFolder: 'e2e/report' }]],
    outputDir: 'e2e/results',
    use: {
        baseURL: `http://localhost:${EDITOR_PORT}/`,
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        actionTimeout: 20_000,
        navigationTimeout: 90_000,
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1600, height: 1000 } } },
    ],
    webServer: {
        command: `npx vite --port ${EDITOR_PORT} --strictPort`,
        url: `http://localhost:${EDITOR_PORT}/`,
        reuseExistingServer: !CI,
        timeout: 180_000,
    },
});
