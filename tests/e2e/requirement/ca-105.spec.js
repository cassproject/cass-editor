const { test, expect, loginAndCreateConfig } = require('../fixtures');

// CA-105/106: RDF class shall specify a name and description
    // Task: open RDF class config, verify name and description fields exist and are editable
    test('CA-105/106: RDF class specifies name and description', async ({ page }) => {
        await loginAndCreateConfig(page);
        // In the general tab, verify name and description fields exist
        await expect(page.locator('#configuration-details-configuration-name-input')).toBeVisible();
        await expect(page.locator('#configuration-details-configuration-description-input')).toBeVisible();
        // Verify they are editable
        await expect(page.locator('#configuration-details-configuration-name-input')).toBeEditable();
        await expect(page.locator('#configuration-details-configuration-description-input')).toBeEditable();
    });
