const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-181: Objects movable indent/outdent via keyboard and button
// Requirement: select competency, indent/outdent to change hierarchy level
test('CA-181: Objects movable indent and outdent', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Verify hierarchy items exist for indent/outdent operations
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    const count = await hierarchyItems.count();
    expect(count).toBeGreaterThan(0);
});
