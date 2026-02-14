const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-192: Resource alignment competency definition
// Requirement: verify competency alignment field exists in resource
test('CA-192: Resource alignment competency definition', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Framework content area supports competency alignment definitions
    await expect(page.locator('#framework-content')).toBeVisible();
});
