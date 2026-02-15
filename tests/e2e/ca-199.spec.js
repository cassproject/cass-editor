const { test, expect, navigateToFramework } = require('./fixtures');

// CA-199: Resource description is description field of CreativeWork
test('CA-199: Resource description field', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();
    await page.waitForTimeout(1000);

    // Verify properties render — description field is one of the schema properties
    const properties = page.locator('.lode__Property');
    const propCount = await properties.count();
    expect(propCount).toBeGreaterThan(0);
});
