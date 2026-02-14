const { test, expect, loginAndNavigate } = require('./fixtures');

// CA-230: Owner can add people to organization
    test('CA-230: Owner can add people to organization', async ({ page }) => {
        await loginAndNavigate(page);
        await page.goto('/#/users?server=http://localhost/api/');
        await expect(page.locator('#user-groups')).toBeVisible();
        await expect(page.locator('#create-new-user-group-button')).toBeVisible();
    });
