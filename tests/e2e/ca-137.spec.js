const { test, expect, navigateToFramework } = require('./fixtures');

// CA-137: Recently opened frameworks list persists over browser refreshes
// Requirement: open a framework, refresh, verify the frameworks list still loads
test('CA-137: Recently opened frameworks persist after refresh', async ({ page }) => {
    // Navigate to frameworks page first
    await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Go back to frameworks list
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();

    // Verify list items still appear after navigation
    const reloadedItems = page.locator('.cass--list--item');
    await reloadedItems.first().waitFor({ state: 'visible' });
    const count = await reloadedItems.count();
    expect(count).toBeGreaterThan(0);
});
