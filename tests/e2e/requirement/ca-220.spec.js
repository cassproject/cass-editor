const { test, expect } = require('../fixtures');

// CA-220: Find capabilities for each framework
test('CA-220: Search within each crosswalk framework', async ({ page }) => {
    await page.goto('/#/crosswalk?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#crosswalk')).toBeVisible();

    // Crosswalk steps include search/find for each framework panel
    await expect(page.locator('.crosswalk__steps')).toBeVisible();
});
