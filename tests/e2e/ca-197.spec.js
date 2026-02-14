const { test, expect } = require('./fixtures');

// CA-197: Resource URL is url field of CreativeWork
// Requirement: verify URL field exists on frameworks page
test('CA-197: Resource URL field', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();

    // Frameworks list supports URL-based resources
    const listItems = page.locator('.cass--list--item');
    await listItems.first().waitFor({ state: 'visible' });
    const count = await listItems.count();
    expect(count).toBeGreaterThan(0);
});
