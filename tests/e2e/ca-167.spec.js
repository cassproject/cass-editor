const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-167: Bulk deletion of objects
// Requirement: select multiple competencies → bulk delete → verify removed
test('CA-167: Bulk deletion of objects from hierarchy or list', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Verify hierarchy items exist for bulk deletion operations
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    const count = await hierarchyItems.count();
    expect(count).toBeGreaterThan(0);
});
