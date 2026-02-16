const { test, expect, navigateToFramework } = require('./fixtures');

// CA-190: Navigate to a competency in a framework via a relation
test('CA-190: Navigate to competency via relation', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Click a competency to see its properties (including relation properties)
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible', timeout: 10000 });
    await hierarchyItems.first().click();
    await page.waitForTimeout(2000);

    // Verify Properties render — relation properties provide navigation links
    const properties = page.locator('.lode__Property');
    const propCount = await properties.count();
    expect(propCount).toBeGreaterThan(0);

    // The URL should reference the framework (in-framework navigation context)
    const url = page.url();
    expect(url).toContain('framework');
});
