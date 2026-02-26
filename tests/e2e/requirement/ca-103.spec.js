const { test, expect, loginAndCreateConfig } = require('../fixtures');

// CA-103: Prevent saving object missing required/primary property
    // Task: leave a required field blank, attempt save, verify save is blocked or error shown
    test('CA-103: Saving is prevented when required properties are missing', async ({ page }) => {
        await loginAndCreateConfig(page);
        // Clear the name field so it's empty (name is required)
        await page.fill('#configuration-details-configuration-name-input', '');
        // Try to save
        await page.click('#configuration-details-save-configuration-button');
        // The validation section should appear with an error message about the missing name
        await expect(page.locator('#config-invalid')).toBeVisible();
    });
