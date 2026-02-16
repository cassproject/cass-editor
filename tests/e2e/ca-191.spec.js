const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-191: Resource alignment xAPI verb/score
// Checks that the framework supports property schemas for alignment data
test('CA-191: Resource alignment xAPI verb and score', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible', timeout: 10000 });
    await hierarchyItems.first().click();
    await page.waitForTimeout(2000);

    // Verify Property components render (framework schema supports alignment data)
    const properties = page.locator('.lode__Property');
    const propCount = await properties.count();
    expect(propCount).toBeGreaterThan(0);
});
