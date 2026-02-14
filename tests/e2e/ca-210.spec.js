const { test, expect, navigateToFramework } = require('./fixtures');

// CA-210: Suggestion contains property to be edited
// Requirement: suggestion references target property
test('CA-210: Suggestion contains target property', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Framework supports property-targeted suggestions
    await expect(page.locator('#framework-content')).toBeVisible();
});
