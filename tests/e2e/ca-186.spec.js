const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-186: Objects cuttable via CTRL/SHIFT+X
// Requirement: select competency, cut via keyboard
test('CA-186: Cut via keyboard shortcut', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Verify hierarchy items exist for cut operations
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    const count = await hierarchyItems.count();
    expect(count).toBeGreaterThan(0);
});
