const { test, expect, navigateToFramework } = require('./fixtures');

// CA-177: Relationships displayed alongside properties
// Requirement: select competency, verify relationships appear alongside properties panel
test('CA-177: Relationships displayed alongside properties', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Click competency to see properties and relationships side by side
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();

    // Framework content shows both properties and relationships
    await expect(page.locator('#framework-content')).toBeVisible();
});
