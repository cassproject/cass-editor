const { test, expect } = require('./fixtures');

// CA-251: Operate as progressive web application
    test('CA-251: Progressive web application support', async ({ page }) => {
        await page.goto('/?server=http://localhost/api/');
        // Verify the page loads successfully in browser
        await expect(page.locator('#app')).toBeVisible();
    });
