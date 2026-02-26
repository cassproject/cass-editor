const { test, expect, loginAndCreateConfig } = require('../fixtures');

// CA-104: Indicate missing properties so they can be remedied
    // Task: leave a required field blank, verify visual indicator
    test('CA-104: Missing properties are indicated to the user', async ({ page }) => {
        await loginAndCreateConfig(page);
        // Clear description to trigger validation
        await page.fill('#configuration-details-configuration-description-input', '');
        await page.click('#configuration-details-save-configuration-button');
        // Verify danger-styled text is shown
        await expect(page.locator('.has-text-danger').first()).toBeVisible();
    });
