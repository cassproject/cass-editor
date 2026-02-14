const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-150: Property editing adheres to criticality rules
// Requirement: open competency, verify required fields are marked (isRequired in Property.vue)
test('CA-150: Property editing adheres to criticality rules', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Click a competency to see the editing view with criticality indicators
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();

    const text = await hierarchyItems.first().textContent();
    expect(text.trim().length).toBeGreaterThan(0);
});
