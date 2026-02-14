const { test, expect, loginAndNavigate, createConfig } = require('./fixtures');

// CA-83: The CaSS Editor shall have a method for an administrator to define a CaSS Editor configuration.
test('CA-83: Create a new configuration', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/configuration?server=http://localhost/api/');
    await expect(page.locator('#configuration')).toBeVisible();
    const configRows = page.locator('.table tbody tr');
    await expect(configRows.first()).toBeVisible();
    const beforeCount = await configRows.count();
    const uid = Date.now();
    const configName = `Test Config ${uid}`;
    await createConfig(page, configName, 'Automated test configuration');
    await expect(configRows.first()).toBeVisible();
    const afterCount = await configRows.count();
    expect(afterCount).toBeGreaterThanOrEqual(beforeCount + 1);
});
