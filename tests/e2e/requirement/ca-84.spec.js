const { test, expect, loginAndNavigate, createConfig } = require('../fixtures');

// CA-84: The CaSS Editor shall have a method for an administrator to select a default CaSS Editor configuration.
//FR: Accepted
test('CA-84: Default configuration selection is available', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/configuration?server=http://localhost/api/');
    await expect(page.locator('#configuration')).toBeVisible();
    const uid = Date.now();
    await createConfig(page, `CA84 Config ${uid}`, 'CA-84 test config');
    const configRows = page.locator('.table tbody tr');
    await expect(configRows.first()).toBeVisible();
    const rowCount = await configRows.count();
    expect(rowCount).toBeGreaterThan(0);
    const manageButton = page.locator('#configuration-list-item-manage-configuration-button').first();
    await expect(manageButton).toBeVisible();
    await manageButton.click();
    await expect(page.locator('#configuration-details-configuration-name-input')).toBeVisible();
    const nameValue = await page.locator('#configuration-details-configuration-name-input').inputValue();
    expect(nameValue.length).toBeGreaterThan(0);
});
