const { test, expect, loginAndCreateConfig } = require('../fixtures');

// CA-96-102: RDF property shall specify various fields
    // Task: open an RDF property in config, verify all required fields are present
    test('CA-96 to CA-102: RDF property fields are present', async ({ page }) => {
        await loginAndCreateConfig(page);
        await page.click('#configuration-details-competency-settings-tab');
        await page.click('#add-custom-competency-property-button');
        // Verify all required fields are present in the custom property modal:
        // Name/identifier (CA-100)
        await expect(page.locator('#custom-property-property-name-input')).toBeVisible();
        // Display label
        await expect(page.locator('#custom-property-label-input')).toBeVisible();
        // Description (CA-99)
        await expect(page.locator('#custom-property-description-input')).toBeVisible();
        // Range type (CA-102)
        await expect(page.locator('#custom-property-range-select')).toBeVisible();
        // Display priority / heading (CA-97, CA-98)
        await expect(page.locator('#custom-property-priority-select')).toBeVisible();
        await expect(page.locator('#custom-property-heading-input')).toBeVisible();
        // Required switch (CA-96 cardinality)
        await expect(page.locator('#customPropertyRequiredSwitch')).toBeVisible();
    });
