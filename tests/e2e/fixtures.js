const { test: baseTest, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/**
 * Shared helper: Create a fresh account and log in via the legacy login page.
 * Each call uses a unique username/email based on Date.now() to avoid collisions.
 * After login, the page is at #/frameworks with the user authenticated.
 */
async function loginAndNavigate(page) {
    await page.goto('/#/legacyLogin?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await page.evaluate(() => {
        if (window.app && window.app.$store) {
            window.app.$store.commit('featuresEnabled/apiLoginEnabled', false);
        }
    });
    await page.click('#legacy-login-create-account-button');
    const uid = Date.now();
    await page.fill('#legacy-login-create-link-person-name', 'Test User');
    await page.fill('#legacy-login-create-link-person-email', `testuser${uid}@test.com`);
    await page.fill('#legacy-login-create-account-username', `testuser${uid}`);
    await page.fill('#legacy-login-create-account-password', 'password123');
    await page.fill('#legacy-login-create-account-password-confirm', 'password123');
    await page.click('#legacy-login-create-link-person-button');
    await page.waitForSelector('#side-nav-user-icon-button');
}

/**
 * Shared helper: Navigate into the first framework from the frameworks list.
 * Targets the Thing component specifically (which has the @dblclick handler),
 * with retries to handle intermittent navigation failures under load.
 * Assumes the page is already on #/frameworks.
 */
async function navigateToFramework(page) {
    const thingItems = page.locator('.cass--list--item .cass--list--thing');
    await thingItems.first().waitFor({ state: 'visible', timeout: 15000 });

    // Try up to 3 times — under heavy parallelism the server can be slow
    for (let attempt = 0; attempt < 3; attempt++) {
        await thingItems.first().dblclick();
        try {
            await page.waitForURL(/#\/framework/,);
            break;
        } catch {
            if (attempt === 2) {
                // Last attempt — let it throw naturally
                await thingItems.first().dblclick();
                await page.waitForURL(/#\/framework/,);
            }
        }
    }
    await expect(page.locator('#framework')).toBeVisible();
}

const test = baseTest.extend({
    page: async ({ page }, use) => {
        await use(page);

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
 * Returns the unique ID used in the config name.
 */
async function loginAndCreateConfig(page) {
    await loginAndNavigate(page);
    await page.goto('/#/configuration?server=http://localhost/api/');
    await expect(page.locator('#configuration')).toBeVisible();
    await page.click('#create-new-configuration-button');
    await expect(page.locator('#configuration-details-configuration-name-input')).toBeVisible();
    const uid = Date.now();
    await page.fill('#configuration-details-configuration-name-input', `TestConfig${uid}`);
    await page.fill('#configuration-details-configuration-description-input', 'E2E test config');
    return uid;
}

module.exports = { test, expect, loginAndNavigate, navigateToFramework, createConfig, loginAndCreateConfig };
