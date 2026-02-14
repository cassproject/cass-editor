const { test, expect, loginAndNavigate } = require('./fixtures');

// CA-234: Recycle organization identity
    test('CA-234: Organization identity recycling', async ({ page }) => {
        await loginAndNavigate(page);
        await page.goto('/#/users?server=http://localhost/api/');
        await expect(page.locator('#user-groups')).toBeVisible();
    });
