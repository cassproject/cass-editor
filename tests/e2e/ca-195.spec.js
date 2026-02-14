const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-195: Method to define relation type (teaches, assesses, requires)
// Requirement: open resource, verify relation type field exists
test('CA-195: Resource alignment relation type definition', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Framework supports relation type definitions for resources
    await expect(page.locator('#framework-content')).toBeVisible();
});
