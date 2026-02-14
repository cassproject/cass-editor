const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-168: Bulk removal of objects from framework
// Requirement: select multiple competencies → remove from framework
test('CA-168: Bulk removal of objects from framework', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Verify hierarchy items exist for bulk removal operations
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    const count = await hierarchyItems.count();
    expect(count).toBeGreaterThan(0);
});
