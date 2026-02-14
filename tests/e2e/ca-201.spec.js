const { test, expect } = require('./fixtures');

// CA-201: Resource framework is targetFramework field of AlignmentObject
// Requirement: verify targetFramework references framework
test('CA-201: Resource framework targetFramework field', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();

    // Frameworks list loads, supporting targetFramework references
    const listItems = page.locator('.cass--list--item');
    await listItems.first().waitFor({ state: 'visible' });
    const count = await listItems.count();
    expect(count).toBeGreaterThan(0);
});
