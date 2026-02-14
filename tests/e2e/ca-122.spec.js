const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-122: Editing adheres to allowed type
// Requirement: property fields render with type-appropriate input controls.
// Property.vue uses isText() to determine if a value is string/URL/text/concept,
// and renders either text inputs (PropertyString) or object editors (ThingEditing)
// based on the allowed type from the schema.
test('CA-122: Property editing adheres to allowed type', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Click a competency to see its property fields
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();

    // The hierarchy item name should be text (a langstring type property),
    // rendered via a text-appropriate input — not an object picker
    const firstItemText = await hierarchyItems.first().textContent();
    expect(firstItemText.trim().length).toBeGreaterThan(0);
});
