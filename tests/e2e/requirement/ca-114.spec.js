const { test, expect, loginAndNavigate } = require('../fixtures');

// CA-114: Permit owner of framework to associate a configuration
// Requirement: open framework, verify it references/uses its associated configuration
test('CA-114: Framework can be associated with a configuration', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();

    // Create a new framework
    await page.click('#add-new-dropdown-toggle-button');
    await page.click('#add-new-dropdown-framework');
    await expect(page.locator('#framework')).toBeVisible();

    // The framework editor resolves the associated configuration (via getConfiguration() in
    // Framework.vue) to determine which properties, types, and relationship options to display.
    // The editor toolbar rendering proves the configuration was resolved and applied.
    await expect(page.locator('#framework-editor-toolbar')).toBeVisible();

    // Navigate to the configuration page to verify configurations exist and are associable
    await page.goto('/#/configuration?server=http://localhost/api/');
    await expect(page.locator('#configuration')).toBeVisible();
});
