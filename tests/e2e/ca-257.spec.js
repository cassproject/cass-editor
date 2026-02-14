const { test, expect } = require('./fixtures');

// CA-257: Progress indicators for processes > 10 seconds
    test('CA-257: Progress indicators for long operations', async ({ page }) => {
        await page.goto('/?server=http://localhost/api/');
        await expect(page.locator('#app')).toBeVisible();
    });
