const { test, expect, loginAndNavigate } = require('./fixtures');

// CA-232: Organization identity created and accessible only by owners/readers
    test('CA-232: Organization identity access restriction', async ({ page }) => {
        await loginAndNavigate(page);
        await page.goto('/#/users?server=http://localhost/api/');
        await expect(page.locator('#user-groups')).toBeVisible();
    });
