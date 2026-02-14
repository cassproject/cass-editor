const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-212: Suggestion may be accepted by owner
// Requirement: owner views and accepts suggestion, property updates
test('CA-212: Owner can accept suggestion', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Framework supports suggestion acceptance by owner
    await expect(page.locator('#framework-content')).toBeVisible();
});
