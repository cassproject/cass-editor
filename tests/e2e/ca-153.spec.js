const { test, expect, navigateToFramework } = require('./fixtures');

// CA-153: List valid values from current framework then system
// Requirement: verify framework-level competencies are listed in the hierarchy
test('CA-153: Valid values listed from framework then system', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Framework hierarchy lists competencies from the framework (valid objects)
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    const count = await hierarchyItems.count();
    expect(count).toBeGreaterThan(0);
});
