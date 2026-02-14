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
 * with a retry to handle intermittent navigation failures.
 * Assumes the page is already on #/frameworks.
 */
async function navigateToFramework(page) {
    const thingItems = page.locator('.cass--list--item .cass--list--thing');
    await thingItems.first().waitFor({ state: 'visible' });
    // First attempt — target the Thing component where the dblclick handler lives
    await thingItems.first().dblclick();
    try {
        await page.waitForURL(/#\/framework/, { timeout: 5000 });
    } catch {
        // Retry once if the first dblclick didn't trigger navigation
        await thingItems.first().dblclick();
        await page.waitForURL(/#\/framework/);
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

module.exports = { test, expect, loginAndNavigate, navigateToFramework };
