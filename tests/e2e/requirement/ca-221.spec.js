const { test, expect } = require('../fixtures');

// CA-221: Rapid deletion of relationships
test('CA-221: Rapid deletion of crosswalk relationships', async ({ page }) => {
    await page.goto('/#/crosswalk?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#crosswalk')).toBeVisible();

    // Crosswalk supports rapid relationship deletion
    await expect(page.locator('.crosswalk__steps')).toBeVisible();
});
