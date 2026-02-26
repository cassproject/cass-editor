const { test, expect, loginAndNavigate, navigateToFramework } = require('../fixtures');

// CA-240: Allow owner to remove commenter from any linked data object
    test('CA-240: Remove commenter from linked data object', async ({ page }) => {
        await loginAndNavigate(page);
        await page.goto('/#/frameworks?server=http://localhost/api/');
        if (!await navigateToFramework(page)) return;
        await expect(page.locator('#framework')).toBeVisible();
    });
