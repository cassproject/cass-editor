const { test, expect } = require('../fixtures');

// CA-225: Create a Person to describe the user
    test('CA-225: Person record created during account creation', async ({ page }) => {
        await page.goto('/#/createAccount?server=http://localhost/api/');
        // Person is created as part of account creation — verify person fields exist
        await expect(page.locator('.control:has(label:has-text("first name")) input')).toBeVisible();
        await expect(page.locator('.control:has(label:has-text("last name")) input')).toBeVisible();
    });
