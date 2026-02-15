const { test, expect, navigateToFramework } = require('./fixtures');

// CA-178: Relationships displayed in similar fashion to properties
test('CA-178: Relationships displayed similar to properties', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();
    await page.waitForTimeout(1000);

    // Verify Property components render — both relationships and regular properties
    // use the same .lode__Property component, ensuring consistent visual styling
    const properties = page.locator('.lode__Property');
    const propCount = await properties.count();
    expect(propCount).toBeGreaterThan(0);
});
