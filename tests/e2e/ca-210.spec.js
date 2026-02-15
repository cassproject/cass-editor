const { test, expect, navigateToFramework } = require('./fixtures');

// CA-210: Suggestion contains property to be edited
test('CA-210: Suggestion contains target property', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();
    await page.waitForTimeout(1000);

    // Verify Property components exist (target properties for suggestions)
    const properties = page.locator('.lode__Property');
    const propCount = await properties.count();
    expect(propCount).toBeGreaterThan(0);
});
