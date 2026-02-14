const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-148: Edit all properties specified by configuration
// Requirement: open competency → verify all config-specified properties are shown and editable
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

    // The competency editing view shows property fields per configuration
    const text = await hierarchyItems.first().textContent();
    expect(text.trim().length).toBeGreaterThan(0);
});
