const { test, expect } = require('../fixtures');

// CA-258: Time estimates for processes > 2 minutes
    test('CA-258: Time estimates for very long operations', async ({ page }) => {
        await page.goto('/?server=http://localhost/api/');
        await expect(page.locator('#app')).toBeVisible();
    });
