const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-192: Resource alignment competency definition
test('CA-192: Resource alignment competency definition', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();
    await page.waitForTimeout(1000);

    // Verify the competency editing view loads (alignment competency definition)
    const properties = page.locator('.lode__Property');
    const propCount = await properties.count();
    expect(propCount).toBeGreaterThan(0);
});
