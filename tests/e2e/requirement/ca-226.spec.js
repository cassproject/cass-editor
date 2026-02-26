const { test, expect } = require('../fixtures');

// CA-226: Person described by a name
    test('CA-226: Person can be described by name', async ({ page }) => {
        await page.goto('/#/createAccount?server=http://localhost/api/');
        await expect(page.locator('.control:has(label:has-text("first name")) input')).toBeVisible();
        await expect(page.locator('.control:has(label:has-text("last name")) input')).toBeVisible();
    });
