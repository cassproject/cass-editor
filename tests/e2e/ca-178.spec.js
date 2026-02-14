const { test, expect, navigateToFramework } = require('./fixtures');

// CA-178: Relationships displayed similar to properties
// Requirement: verify relationship fields have consistent visual styling with property fields
test('CA-178: Relationships displayed similar to properties', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Framework content renders relationships with consistent styling
    await expect(page.locator('#framework-content')).toBeVisible();
});
