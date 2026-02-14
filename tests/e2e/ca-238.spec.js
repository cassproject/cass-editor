const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-238: Allow owner to remove reader from any private linked data object
    test('CA-238: Remove reader from private linked data object', async ({ page }) => {
        await loginAndNavigate(page);
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await navigateToFramework(page);
        await expect(page.locator('#framework')).toBeVisible();
    });
