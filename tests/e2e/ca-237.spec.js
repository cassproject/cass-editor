const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-237: Allow owner to add reader to any private linked data object
    test('CA-237: Add reader to private linked data object', async ({ page }) => {
        await loginAndNavigate(page);
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await navigateToFramework(page);
        await expect(page.locator('#framework')).toBeVisible();
    });
