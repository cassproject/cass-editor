const { test, expect } = require('./fixtures');

// CA-265: Operate from startup without internet
    test('CA-265: Offline startup capability', async ({ page }) => {
        await page.goto('/?server=http://localhost/api/');
        await expect(page.locator('#app')).toBeVisible();
    });
