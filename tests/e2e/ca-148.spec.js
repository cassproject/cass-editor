const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-148: Edit all properties specified by configuration
// Requirement: open competency editing view, verify Property components render per config
test('CA-148: All properties editable as specified by configuration', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Click a competency to see its editable properties
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();
    await page.waitForTimeout(1000);

    // Verify Property components render (configuration-specified properties)
    const properties = page.locator('.lode__Property');
    const propCount = await properties.count();
    expect(propCount).toBeGreaterThan(0);
});
