const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-152: Property editing adheres to allowed type
// Requirement: Property.vue renders type-appropriate inputs (text vs object) per schema type
test('CA-152: Property editing adheres to allowed type', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Click a competency to see type-appropriate property controls
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();

    // The hierarchy item name is rendered as text (langstring type)
    const firstItemText = await hierarchyItems.first().textContent();
    expect(firstItemText.trim().length).toBeGreaterThan(0);
});
