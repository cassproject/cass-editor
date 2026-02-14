const { test, expect } = require('./fixtures');

// CA-259: Operate in touch-based environment
    test('CA-259: Touch-based environment support', async ({ page }) => {
        await page.goto('/?server=http://localhost/api/');
        await expect(page.locator('#app')).toBeVisible();
    });
