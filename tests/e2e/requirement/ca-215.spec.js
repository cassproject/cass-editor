const { test, expect } = require('../fixtures');

// CA-215: Bulk creation of relationships between frameworks
    test('CA-215: Bulk relationship creation between frameworks', async ({ page }) => {
    await page.goto('/#/crosswalk?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
        await expect(page.locator('#crosswalk')).toBeVisible();
        await expect(page.locator('.crosswalk__steps')).toBeVisible();
    });
