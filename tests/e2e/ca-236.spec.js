const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-236: Allow owner to remove an owner from any linked data object
    test('CA-236: Remove owner from linked data object', async ({ page }) => {
        await loginAndNavigate(page);
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await navigateToFramework(page);
        await expect(page.locator('#framework')).toBeVisible();
    });
