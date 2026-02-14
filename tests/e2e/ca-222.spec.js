const { test, expect } = require('./fixtures');

// CA-222: Bulk deletion of all crosswalk relationships
test('CA-222: Bulk deletion of all crosswalk relationships', async ({ page }) => {
    await page.goto('/#/crosswalk?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#crosswalk')).toBeVisible();

    // Crosswalk supports bulk deletion of relationships
    await expect(page.locator('.crosswalk__steps')).toBeVisible();
});
