const { test, expect, loginAndCreateConfig } = require('../fixtures');

// CA-87: Configuration shall allow defining a configuration element
    // Task: open config, define a new element, verify it appears in the config
    test('CA-87: Can define a configuration element within a configuration', async ({ page }) => {
        await loginAndCreateConfig(page);
        // Go to Competency Settings tab
        await page.click('#configuration-details-competency-settings-tab');
        // Click add custom competency property
        await page.click('#add-custom-competency-property-button');
        // The custom property modal should appear with fields for defining the element
        await expect(page.locator('#custom-property-property-name-input')).toBeVisible();
        await expect(page.locator('#custom-property-label-input')).toBeVisible();
        await expect(page.locator('#custom-property-description-input')).toBeVisible();
        // Fill in details
        await page.fill('#custom-property-property-name-input', 'testProp87');
        await page.fill('#custom-property-label-input', 'Test Property 87');
        await page.fill('#custom-property-description-input', 'A custom competency prop');
        // Apply the new property
        await page.click('#apply-custom-property-edits-button');
        // Verify modal closed and we're back on the competency tab
        await expect(page.locator('#add-custom-competency-property-button')).toBeVisible();
    });
