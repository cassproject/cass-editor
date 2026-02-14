const { test, expect } = require('./fixtures');

// CA-248: Adhere to KBAC security practices
    test('CA-248: KBAC security practices', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });
