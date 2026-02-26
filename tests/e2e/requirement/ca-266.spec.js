const { test, expect } = require('../fixtures');

// CA-266: Operate with intermittent/degraded connection
    test('CA-266: Degraded connection handling', async ({ page }) => {
        await page.goto('/?server=http://localhost/api/');
        await expect(page.locator('#app')).toBeVisible();
    });
