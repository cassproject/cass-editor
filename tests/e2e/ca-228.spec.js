const { test, expect, loginAndNavigate } = require('./fixtures');

// CA-228: Create an Organization (group)
    test('CA-228: Organization/group creation is accessible', async ({ page }) => {
        await loginAndNavigate(page);
        // Navigate to user groups
        await page.goto('/#/users?server=http://localhost/api/');
        await expect(page.locator('#user-groups')).toBeVisible();
        // Verify create group button exists
        await expect(page.locator('#create-new-user-group-button')).toBeVisible();
    });
