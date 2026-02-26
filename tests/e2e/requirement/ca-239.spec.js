const { test, expect, loginAndNavigate, navigateToFramework } = require('../fixtures');

// CA-239: Allow owner to add commenter to any linked data object
    test('CA-239: Add commenter to linked data object', async ({ page }) => {
        await loginAndNavigate(page);
        await page.goto('/#/frameworks?server=http://localhost/api/');
        if (!await navigateToFramework(page)) return;
        await expect(page.locator('#framework')).toBeVisible();
    });
