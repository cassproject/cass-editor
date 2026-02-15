const { test, expect, navigateToFramework } = require('./fixtures');

// CA-172: Show required/desired/optional property groups via click or two
// Properties are grouped by headings-group sections and isRequired distinguishes them
test('CA-172: Required/desired/optional property groups via clicks', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();
    await page.waitForTimeout(1000);

    // Verify property groups render — headings-group sections display grouped properties
    const headingsGroups = page.locator('.headings-group');
    const groupCount = await headingsGroups.count();
    expect(groupCount).toBeGreaterThan(0);
});
