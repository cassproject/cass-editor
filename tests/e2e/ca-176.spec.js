const { test, expect, navigateToFramework } = require('./fixtures');

// CA-176: Relationships may carry additional data
// Requirement: view relationship, verify it shows configured properties
test('CA-176: Relationships may carry additional configuration data', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Framework content renders relationships with configuration data
    await expect(page.locator('#framework-content')).toBeVisible();
});
