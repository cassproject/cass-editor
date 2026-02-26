const { test, expect } = require('../fixtures');

// CA-268: Version control via CaSS Repository API
    test('CA-268: Version control support', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
    });
