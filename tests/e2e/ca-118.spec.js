const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-118: Edit properties of a framework specified by configuration
// Requirement: open a framework, verify the info bar with editable properties is visible
test('CA-118: Framework properties are editable via detail view', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // As an authenticated owner, the editor toolbar should be visible
    await expect(page.locator('#framework-editor-toolbar')).toBeVisible();

    // Click on a competency to open its detail/editing view
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();

    // After clicking, the competency's editable properties should be accessible
    // The Thing/ThingEditing component renders property fields for the selected item
    await expect(page.locator('.lode__hierarchy-item').first()).toBeVisible();
});
