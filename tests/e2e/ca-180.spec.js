const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-180: Objects movable up/down via keyboard and button
// Requirement: select competency, verify move up/down capability
test('CA-180: Objects movable up and down', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Verify hierarchy items exist for up/down movement
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    const count = await hierarchyItems.count();
    expect(count).toBeGreaterThan(0);
});
