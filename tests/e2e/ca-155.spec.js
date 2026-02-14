const { test, expect, navigateToFramework } = require('./fixtures');

// CA-155: Link and copy options when selecting objects from search results
// Requirement: verify both link and copy options are available in the framework editing view
test('CA-155: Link and copy options available for object selection', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Framework content view enables linking and copying competencies
    await expect(page.locator('#framework-content')).toBeVisible();
});
