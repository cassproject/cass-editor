const { test: baseTest, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/**
 * Shared helper: Create a fresh account or log in with an existing one via the legacy login page.
 * If a `uid` is provided, it logs in using `testuser${uid}`.
 * If no `uid` is provided, it creates a new account using `Date.now()` to avoid collisions.
 * After login, the page is at #/frameworks with the user authenticated.
 * Returns the `uid` used.
 */
let lnuid = null;
async function loginAndNavigate(page) {
    await page.goto('/#/legacyLogin?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await page.evaluate(() => {
        if (window.app && window.app.$store) {
            window.app.$store.commit('featuresEnabled/apiLoginEnabled', false);
        }
    });

    if (lnuid) {
        // Log in with existing account
        await page.fill('#legacy-login-username', `testuser${lnuid}`);
        await page.fill('#legacy-login-password', 'password123');
        await page.click('#legacy-login-button');
    } else {
        // Create new account
        lnuid = Date.now();
        await page.click('#legacy-login-create-account-button');
        await page.fill('#legacy-login-create-link-person-name', 'Test User');
        await page.fill('#legacy-login-create-link-person-email', `testuser${lnuid}@test.com`);
        await page.fill('#legacy-login-create-account-username', `testuser${lnuid}`);
        await page.fill('#legacy-login-create-account-password', 'password123');
        await page.fill('#legacy-login-create-account-password-confirm', 'password123');
        await page.click('#legacy-login-create-link-person-button');
    }

    await page.waitForSelector('#side-nav-user-icon-button');
    await page.waitForSelector('#frameworks');
    return lnuid;
}

/**
 * Known test framework name. Tests should import this framework so it's always available.
 */
const TEST_FRAMEWORK_NAME = 'Harvard Emotional Intelligence';

/**
 * Shared helper: Navigate into a framework that has data (hierarchy items).
 * Searches for the Harvard Emotional Intelligence framework via #search-bar-input.
 * Falls back to trying each framework until one with data is found.
 * Assumes the page is already on #/frameworks.
 * Returns true if successfully navigated to a framework with data, false otherwise.
 */
async function navigateToFramework(page) {
    const thingItems = page.locator('.cass--list--item .cass--list--thing');
    try {
        await thingItems.first().waitFor({ state: 'visible', timeout: 15000 });
    } catch {
        return false;
    }

    // Search for the known test framework using the search bar
    const searchInput = page.locator('#search-bar-input');
    if (await searchInput.isVisible().catch(() => false)) {
        await searchInput.fill('"' + TEST_FRAMEWORK_NAME + '"');
        // Wait for a matching framework to appear in the filtered list
        const matchingItem = page.locator(`.cass--list--item .cass--list--thing:has-text("${TEST_FRAMEWORK_NAME}")`);
        try {
            await matchingItem.first().waitFor({ state: 'visible', timeout: 10000 });
            if (await tryOpenFramework(page, matchingItem.first())) return true;
            // Didn't have data — go back
            await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
            await thingItems.first().waitFor({ state: 'visible', timeout: 15000 });
        } catch {
            // Search returned no results — clear and fall back
        }
        // Clear the search for fallback
        if (await searchInput.isVisible().catch(() => false)) {
            await searchInput.fill('');
            try {
                await thingItems.first().waitFor({ state: 'visible', timeout: 10000 });
            } catch {
                return false;
            }
        }
    }

    // Fall back: try each framework in the list
    const count = await thingItems.count();
    for (let i = 0; i < count; i++) {
        if (await tryOpenFramework(page, thingItems.nth(i))) return true;
        await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
        try {
            await thingItems.first().waitFor({ state: 'visible', timeout: 15000 });
        } catch {
            return false;
        }
    }

    return false;
}

/**
 * Try to open one framework item and verify it has hierarchy data.
 * Returns true if the framework has data, false otherwise.
 */
async function tryOpenFramework(page, locator) {
    for (let attempt = 0; attempt < 3; attempt++) {
        await locator.dblclick();
        try {
            await page.waitForURL(/#\/framework/);
            break;
        } catch {
            if (attempt === 2) return false;
        }
    }
    try {
        await page.locator('.lode__hierarchy-item').first().waitFor({ state: 'visible', timeout: 5000 });
        return true;
    } catch {
        return false;
    }
}

const test = baseTest.extend({
    page: async ({ page }, use, testInfo) => {
        // Collect browser logs during the test
        const logs = [];
        page.on('console', msg => logs.push(`[${msg.type()}] ${msg.text()}`));
        page.on('pageerror', error => logs.push(`[error] ${error.message}`));

        await use(page);

        // Attach logs if the test failed
        if (testInfo.status !== testInfo.expectedStatus) {
            await testInfo.attach('browser-console-logs.txt', {
                body: logs.join('\n'),
                contentType: 'text/plain',
            });
        }

        // Collect coverage after each test
        const coverage = await page.evaluate(() => window.__coverage__);
        if (coverage) {
            const coveragePath = path.join(__dirname, '..', '..', '.nyc_output', `coverage-${Date.now()}.json`);
            if (!fs.existsSync(path.dirname(coveragePath))) {
                fs.mkdirSync(path.dirname(coveragePath), { recursive: true });
            }
            fs.writeFileSync(coveragePath, JSON.stringify(coverage));
        }
    },
});

/**
 * Shared helper: Create a configuration and return to the list.
 */
async function createConfig(page, name, description) {
    await page.click('#create-new-configuration-button');
    await expect(page.locator('#configuration-details-configuration-name-input')).toBeVisible();
    await page.fill('#configuration-details-configuration-name-input', name);
    await page.fill('#configuration-details-configuration-description-input', description);
    await page.click('#configuration-details-save-configuration-button');
    await expect(page.locator('#configuration')).toBeVisible();
}

/**
 * Shared helper: Login, navigate to configuration page, and create a new config for testing.
 * Returns the unique ID used in the config name, and the login uid.
 */
async function loginAndCreateConfig(page, loginUid = null) {
    const uid = await loginAndNavigate(page, loginUid);
    await page.goto('/#/configuration?server=http://localhost/api/');
    await expect(page.locator('#configuration')).toBeVisible();
    await page.click('#create-new-configuration-button');
    await expect(page.locator('#configuration-details-configuration-name-input')).toBeVisible();
    const configId = Date.now();
    await page.fill('#configuration-details-configuration-name-input', `TestConfig${configId}`);
    await page.fill('#configuration-details-configuration-description-input', 'E2E test config');
    return { configId, uid };
}

module.exports = { test, expect, loginAndNavigate, navigateToFramework, createConfig, loginAndCreateConfig, TEST_FRAMEWORK_NAME };
