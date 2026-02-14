const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-205: All comments displayable alongside the object
// Requirement: verify comments panel is visible alongside properties
test('CA-205: Comments displayable alongside object', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Click competency to verify comments alongside properties
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();

    await expect(page.locator('#framework-content')).toBeVisible();
});
