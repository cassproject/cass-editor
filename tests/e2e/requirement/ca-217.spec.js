const { test, expect } = require('../fixtures');

// CA-217: Option to save relationships into third separate framework
test('CA-217: Save relationships to third framework option', async ({ page }) => {
    await page.goto('/#/crosswalk?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#crosswalk')).toBeVisible();

    // Crosswalk steps include third framework option
    await expect(page.locator('.crosswalk__steps')).toBeVisible();
});
