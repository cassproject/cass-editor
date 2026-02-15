const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-173: All possible required/desired/optional fields shown during editing
test('CA-173: All possible fields shown during editing', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();
    await page.waitForTimeout(1000);

    // Verify Property components render (showing all configured fields)
    const properties = page.locator('.lode__Property');
    const propCount = await properties.count();
    expect(propCount).toBeGreaterThan(0);

    // Verify headings-group sections organize these properties
    const headingsGroups = page.locator('.headings-group');
    const groupCount = await headingsGroups.count();
    expect(groupCount).toBeGreaterThan(0);
});
