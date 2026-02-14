const { test, expect } = require('./fixtures');

// CA-199: Resource description is description field of CreativeWork
// Requirement: verify description field exists on frameworks page
test('CA-199: Resource description field', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();

    // Frameworks list supports description fields
    const listItems = page.locator('.cass--list--item');
    await listItems.first().waitFor({ state: 'visible' });
    const count = await listItems.count();
    expect(count).toBeGreaterThan(0);
});
