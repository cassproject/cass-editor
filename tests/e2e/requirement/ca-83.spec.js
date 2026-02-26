const { test, expect, loginAndNavigate, createConfig } = require('../fixtures');

// CA-83: The CaSS Editor shall have a method for an administrator to define a CaSS Editor configuration.
test('CA-83: Create a new configuration', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/configuration?server=http://localhost/api/');
    await expect(page.locator('#configuration')).toBeVisible({ timeout: 10000 });
    const uid = Date.now();
    const configName = `Test Config ${uid}`;
    await createConfig(page, configName, 'Automated test configuration');

    // Navigate back to configuration list and verify the new config exists by name
    await page.goto('/#/configuration?server=http://localhost/api/');
    await expect(page.locator('#configuration')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.table tbody tr').first()).toBeVisible({ timeout: 10000 });
    // Look for the config name in the table — more reliable than counting rows
    const newConfig = page.locator(`.table tbody tr:has-text("${configName}")`);
    await expect(newConfig).toBeVisible({ timeout: 10000 });
});
