const { test, expect } = require('./fixtures');

// CA-224: Allow specification of username and password
    test('CA-224: Username and password fields present during user creation', async ({ page }) => {
        await page.goto('/#/createAccount?server=http://localhost/api/');
        await expect(page.locator('.control:has(label:has-text("username")) input')).toBeVisible();
        await expect(page.locator('.control:has(label:text-is("password")) input')).toBeVisible();
        await expect(page.locator('.control:has(label:text-is("confirm password")) input')).toBeVisible();
    });
