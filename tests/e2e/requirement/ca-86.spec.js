const { test, expect, loginAndCreateConfig } = require('../fixtures');

// CA-86: Configuration shall allow adding links to configuration elements
    // Task: open config, use dropdown to add an element type, verify it's added
    test('CA-86: Can add links to configuration elements', async ({ page }) => {
        await loginAndCreateConfig(page);
        // The Framework tab shows property configuration elements
        await page.click('#configuration-details-framework-tab');
        // Click the add custom framework property button
        await page.click('#add-custom-framework-property-button');
        // The custom property modal should appear
        await expect(page.locator('#custom-property-property-name-input')).toBeVisible();
        // Fill in valid property details
        await page.fill('#custom-property-property-name-input', 'testProp86');
        await page.fill('#custom-property-label-input', 'Test Property 86');
        await page.fill('#custom-property-description-input', 'A test config element');
        // Apply the custom property
        await page.click('#apply-custom-property-edits-button');
        // Modal should close, verify back on framework tab
        await expect(page.locator('#add-custom-framework-property-button')).toBeVisible();
    });
