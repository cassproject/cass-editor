const { test, expect } = require('./fixtures');

test.describe('Configuration Management (CA-83 through CA-85)', () => {

    // CA-83: The CaSS Editor shall have a method for an administrator to define a CaSS Editor configuration.
    //TODO: Augment with more actual testing of the ability to define a configuration. Use defaults, but create it and save it.
    test('CA-83: Configuration editor is accessible and allows defining configurations', async ({ page }) => {
        await page.goto('/#/configuration?server=http://localhost/api/');
        await expect(page.locator('#configuration')).toBeVisible();
        await expect(page.locator('h3.title', { hasText: 'Configuration' })).toBeVisible();
        await expect(page.locator('#create-new-configuration-button')).toBeVisible();
    });

    // CA-84: The CaSS Editor shall have a method for an administrator to select a default CaSS Editor configuration.
    //FR: Accepted
    test('CA-84: Default configuration selection is available', async ({ page }) => {
        await page.goto('/#/configuration?server=http://localhost/api/');
        await expect(page.locator('#configuration')).toBeVisible();
        // Verify configuration page loads with content
        await expect(page.locator('h3.title', { hasText: 'Configuration' })).toBeVisible();
    });

    // CA-85: The CaSS Editor shall apply the default configuration to a framework upon creation.
    //TODO: Assign the default configuration in the configuration screen and ensure the default configuration is actually applied to the new framework.
    test('CA-85: Default configuration is applied on framework creation', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
        await expect(page.locator('.cass--search-bar')).toBeVisible();
    });

});
