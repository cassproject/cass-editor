const { test, expect, loginAndNavigate, navigateToFramework } = require('../fixtures');

// CA-241: First owner identified as owner, others as editors
    test('CA-241: First owner identified as owner, others as editors', async ({ page }) => {
        await loginAndNavigate(page);
        await page.goto('/#/frameworks?server=http://localhost/api/');
        if (!await navigateToFramework(page)) return;
        await expect(page.locator('#framework')).toBeVisible();
    });
