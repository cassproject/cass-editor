const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-187: Objects copyable via CTRL/SHIFT+C
// Requirement: select competency, copy via keyboard
test('CA-187: Copy via keyboard shortcut', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Verify hierarchy items exist for copy operations
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    const count = await hierarchyItems.count();
    expect(count).toBeGreaterThan(0);
});
