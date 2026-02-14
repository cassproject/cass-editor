const { test, expect, loginAndNavigate, createConfig } = require('./fixtures');

// CA-85: The CaSS Editor shall apply the default configuration to a framework upon creation.
test('CA-85: Default configuration is applied on framework creation', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/configuration?server=http://localhost/api/');
    await expect(page.locator('#configuration')).toBeVisible();
    const uid = Date.now();
    await createConfig(page, `CA85A ${uid}`, 'CA-85 config A');
    await createConfig(page, `CA85B ${uid}`, 'CA-85 config B');
    const manageButtons = page.locator('#configuration-list-item-manage-configuration-button');
    await expect(manageButtons.first()).toBeVisible();
    await manageButtons.first().click();
    await expect(page.locator('#configuration-details-configuration-name-input')).toBeVisible();
    const firstName = await page.locator('#configuration-details-configuration-name-input').inputValue();
    expect(firstName.length).toBeGreaterThan(0);
    await page.click('#configuration-details-cancel-button');
    await expect(page.locator('#configuration')).toBeVisible();
    await expect(page.locator('.table tbody tr').first()).toBeVisible();
    await expect(manageButtons.nth(1)).toBeVisible();
    await manageButtons.nth(1).click();
    await expect(page.locator('#configuration-details-configuration-name-input')).toBeVisible();
    const secondName = await page.locator('#configuration-details-configuration-name-input').inputValue();
    expect(secondName).not.toBe(firstName);
});
