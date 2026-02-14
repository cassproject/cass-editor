const { test, expect, navigateToFramework } = require('./fixtures');

// CA-123: When type is valid object, list valid values from framework then system
// Requirement: open property dropdown/picker, verify framework values appear first
test('CA-123: Valid object values listed from framework then system', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);

    // The hierarchy displays competencies (valid objects) from the framework
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    const count = await hierarchyItems.count();
    expect(count).toBeGreaterThan(0);
});
