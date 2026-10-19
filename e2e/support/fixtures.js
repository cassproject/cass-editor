// Shared Playwright fixtures for the editor's end-to-end tests.
//
//   import { test, expect } from '../support/fixtures.js';
//   test('...', async ({ app, account }) => { await app.login(account); ... });
//
// - app: an App (support/app.js) for the test's page.
// - account / otherAccount: CaSS users created once per worker (logins live in memory, so
//   each test logs in through the UI with app.login).
// - console: everything the page logged; uncaught page errors fail the test automatically.
// - schemas: https://schema.cassproject.org is answered from the editor's bundled copy, so no test
//   depends on the internet (the editor still fetches it directly; see REG-02 in FINDINGS.md).
//   Routes a test adds itself take precedence.
import { test as base, expect } from '@playwright/test';
import { App, randomId, unique } from './app.js';
import { serveSchemasLocally } from './schemas.js';

// Console noise that is not an editor problem.
export const IGNORED_CONSOLE = [
    /Module "crypto" has been externalized/,
    /Webcrypto not available/,
    /Failed to load resource: the server responded with a status of 404/,
    /\[vite\]/,
    /Download the Vue Devtools/,
    // An open editor re-fetches every object any client changes (App.vue websocket handler); for
    // objects other tests delete meanwhile, that 404 is logged. TEST-CASES.md REG-01 counts 404s for
    // objects that legitimately don't exist as acceptable.
    /Object not found or you did not supply sufficient permissions to access the object/,
];

const newAccount = (label) => {
    const id = Date.now().toString(36) + randomId(5);
    return {
        name: `E2E ${label} ${id}`,
        email: `e2e-${label}-${id}@example.com`,
        username: `e2e${label}${id}`,
        password: `Pw-${id}-${label}!`,
    };
};

const createAccountFixture = (label) => [async ({ browser }, use) => {
    const account = newAccount(label);
    const page = await browser.newPage();
    await new App(page).createAccount(account);
    await page.close();
    await use(account);
}, { scope: 'worker', timeout: 120_000 }];

export const test = base.extend({
    console: [async ({ page }, use, testInfo) => {
        const log = { messages: [], pageErrors: [] };
        page.on('console', (m) => log.messages.push({ type: m.type(), text: m.text() }));
        page.on('pageerror', (e) => log.pageErrors.push(e.message));
        await use(log);
        if (testInfo.annotations.some((a) => a.type === 'allow-page-errors')) return;
        expect(log.pageErrors, 'uncaught errors in the page').toEqual([]);
    }, { auto: true }],

    schemas: [async ({ page }, use) => {
        await serveSchemasLocally(page);
        await use();
    }, { auto: true }],

    app: async ({ page }, use) => {
        await use(new App(page));
    },

    account: createAccountFixture('user'),
    otherAccount: createAccountFixture('other'),
});

/** Console errors and Vue warnings, minus known noise. */
export const problems = (log) => log.messages
    .filter((m) => m.type === 'error' || (m.type === 'warning' && /\[Vue warn\]/.test(m.text)))
    .map((m) => m.text)
    .filter((text) => !IGNORED_CONSOLE.some((re) => re.test(text)));

export { expect, unique };
