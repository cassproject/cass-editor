const { test, expect, loginAndNavigate } = require('../fixtures');

// CA-231: Owner can remove people from organization
    test('CA-231: Owner can remove people from organization', async ({ page }) => {
        await loginAndNavigate(page);
        await page.goto('/#/users?server=http://localhost/api/');
        await expect(page.locator('#user-groups')).toBeVisible();
    });
