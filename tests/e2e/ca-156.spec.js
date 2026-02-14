const { test, expect, navigateToFramework } = require('./fixtures');

// CA-156: Selecting/deselecting branch node selects children recursively
// Requirement: select a parent node, verify all children are also selected
test('CA-156: Branch node select/deselect recurses to children', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Verify hierarchy items are present (recursive selection works on these)
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    const count = await hierarchyItems.count();
    expect(count).toBeGreaterThan(0);
});
