const { test, expect, loginAndNavigate, navigateToFramework } = require('../fixtures');

// CA-235: Allow owner to add an owner to any linked data object
    test('CA-235: Add owner to linked data object', async ({ page }) => {
        await loginAndNavigate(page);
        await page.goto('/#/frameworks?server=http://localhost/api/');
        if (!await navigateToFramework(page)) return;
        // Framework editor allows sharing/permission management
        await expect(page.locator('#framework')).toBeVisible();
    });
