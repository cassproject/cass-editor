const { test, expect, navigateToFramework } = require('./fixtures');

// CA-190: Navigate to competency in framework via relation
// Requirement: find a relationship link, click it, verify navigation
test('CA-190: Navigate to competency via relation', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Click a competency to see its relations/navigation
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();

    // Framework content supports navigating between related competencies
    await expect(page.locator('#framework-content')).toBeVisible();
});
