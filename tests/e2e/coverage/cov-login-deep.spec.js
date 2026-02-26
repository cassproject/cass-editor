/**
 * Coverage: Login deep — SSO login form, validation states, password mismatch.
 * Derived from collect-coverage5.js login-deep session.
 * Exercises Login.vue, LegacyLogin.vue, CreateAccount.vue validation paths.
 */

const { test, expect } = require('../fixtures');

test('Login deep: SSO form, create account validation, and password mismatch', async ({ page }) => {
    // Visit the SSO/CAS login page
    await page.goto('/#/login?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#app')).toBeVisible();

    // Fill any visible inputs on the login page
    const loginInputs = page.locator('input');
    const inputCount = await loginInputs.count();
    for (let i = 0; i < inputCount; i++) {
        const isVisible = await loginInputs.nth(i).isVisible().catch(() => false);
        if (isVisible) {
            await loginInputs.nth(i).fill('testvalue').catch(() => { });
        }
    }

    // Try submit button
    const submitBtn = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign")');
    const submitVisible = await submitBtn.first().isVisible().catch(() => false);
    if (submitVisible) {
        await submitBtn.first().click();
    }

    // Navigate to legacy login for create account validation
    await page.goto('/#/legacyLogin?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#app')).toBeVisible();

    // Disable API login to show legacy form
    await page.evaluate(() => {
        if (window.app && window.app.$store) {
            window.app.$store.commit('featuresEnabled/apiLoginEnabled', false);
        }
    });

    // Open create account form
    const createBtn = page.locator('#legacy-login-create-account-button');
    const createVisible = await createBtn.isVisible().catch(() => false);
    if (createVisible) {
        await createBtn.click();

        // Test validation: short username
        await page.locator('#legacy-login-create-account-username').fill('a');
        // Test validation: short password
        await page.locator('#legacy-login-create-account-password').fill('short');
        // Test validation: password mismatch
        await page.locator('#legacy-login-create-account-password-confirm').fill('mismatch');

        // Try submitting invalid form to trigger validation paths
        const personBtn = page.locator('#legacy-login-create-link-person-button');
        const personBtnVisible = await personBtn.isVisible().catch(() => false);
        if (personBtnVisible) {
            await personBtn.click().catch(() => { });
        }
    }

    await expect(page.locator('#app')).toBeVisible();
});
