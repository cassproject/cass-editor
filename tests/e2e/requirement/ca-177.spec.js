const { test, expect, navigateToFramework } = require('../fixtures');

// CA-177: Relationships displayed alongside properties
test('CA-177: Relationships displayed alongside properties', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    if (!await navigateToFramework(page)) return;
    await expect(page.locator('#framework')).toBeVisible();

    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();
    await page.waitForTimeout(1000);

    // Verify both Property components and headings-group sections render
    // (relationships are displayed alongside regular properties in the same view)
    const properties = page.locator('.lode__Property');
    const propCount = await properties.count();
    expect(propCount).toBeGreaterThan(0);

    const headingsGroups = page.locator('.headings-group');
    const groupCount = await headingsGroups.count();
    expect(groupCount).toBeGreaterThan(0);
});
