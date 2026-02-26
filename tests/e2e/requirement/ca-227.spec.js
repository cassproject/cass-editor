const { test, expect } = require('../fixtures');

// CA-227: Person associated with email address
    test('CA-227: Person associated with email', async ({ page }) => {
        await page.goto('/#/createAccount?server=http://localhost/api/');
        await expect(page.locator('.control:has(label:has-text("email")) input')).toBeVisible();
    });
