const { test, expect } = require('./fixtures');

// CA-198: Resource name is name field of CreativeWork
// Requirement: verify name field exists on frameworks page
test('CA-198: Resource name field', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();

    // Frameworks list shows resource names
    const listItems = page.locator('.cass--list--item');
    await listItems.first().waitFor({ state: 'visible' });
    const count = await listItems.count();
    expect(count).toBeGreaterThan(0);
});
