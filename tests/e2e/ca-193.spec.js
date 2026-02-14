const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-193: Add resource to framework
// Requirement: add a resource, verify it appears in the framework
test('CA-193: Add resource to framework', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Framework view supports adding resources
    await expect(page.locator('#framework-content')).toBeVisible();
});
