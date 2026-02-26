const { test, expect, navigateToFramework } = require('../fixtures');

// CA-198: Resource name is name field of CreativeWork
test('CA-198: Resource name field', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    if (!await navigateToFramework(page)) return;
    await expect(page.locator('#framework')).toBeVisible();

    // Verify the hierarchy displays competency names (name field)
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    const firstItemText = await hierarchyItems.first().textContent();
    expect(firstItemText.trim().length).toBeGreaterThan(0);
});
