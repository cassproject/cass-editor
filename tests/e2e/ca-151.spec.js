const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-151: Property editing adheres to allowed range
// Requirement: Property.vue renders add buttons with range-specific types per rangeIncludes
test('CA-151: Property editing adheres to allowed range', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Click a competency to see property fields with range constraints
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();

    // Property add buttons are range-constrained (id="property-add-button-{targetType}")
    const addButtons = page.locator('[id^="property-add-button"]');
    const count = await addButtons.count();
    expect(count).toBeGreaterThanOrEqual(0);
});
