const { test, expect } = require('./fixtures');

// CA-252: Work within permissioned web environment
    test('CA-252: Permissioned web environment support', async ({ page }) => {
        await page.goto('/?server=http://localhost/api/');
        await expect(page.locator('#app')).toBeVisible();
    });
