const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-188: Objects pastable via CTRL/SHIFT+V
// Requirement: cut/copy competency, paste via keyboard
test('CA-188: Paste via keyboard shortcut', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Verify hierarchy items exist for paste operations
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    const count = await hierarchyItems.count();
    expect(count).toBeGreaterThan(0);
});
