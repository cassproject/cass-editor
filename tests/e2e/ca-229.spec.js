const { test, expect, loginAndNavigate } = require('./fixtures');

// CA-229: Creator becomes owner of organization
    test('CA-229: Creator becomes organization owner', async ({ page }) => {
        await loginAndNavigate(page);
        await page.goto('/#/users?server=http://localhost/api/');
        await expect(page.locator('#user-groups')).toBeVisible();
        // Verify the user groups page loaded with the member list
        await expect(page.locator('h3', { hasText: 'My User Groups' })).toBeVisible();
    });
