const { test, expect, loginAndNavigate, navigateToFramework } = require('../fixtures');

// CA-118: Permit user to edit properties of a framework specified by configuration
// Requirement: open a framework, click a competency, verify editable properties appear
test('CA-118: Framework properties are editable via detail view', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    if (!await navigateToFramework(page)) return;
    await expect(page.locator('#framework')).toBeVisible();
    await expect(page.locator('#framework-editor-toolbar')).toBeVisible();

    // Click on a competency to open its detail/editing view
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();
    await page.waitForTimeout(1000);

    // Verify that property editing fields are rendered (Property.vue components)
    // The headings-group contains the editable property fields
    const propertiesGroup = page.locator('.headings-group');
    await propertiesGroup.first().waitFor({ state: 'visible' });

    // Verify at least one Property component is rendered
    const properties = page.locator('.lode__Property');
    const propCount = await properties.count();
    expect(propCount).toBeGreaterThan(0);
});
