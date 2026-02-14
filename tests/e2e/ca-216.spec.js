const { test, expect } = require('./fixtures');

// CA-216: Option to save relationships to each framework
test('CA-216: Save relationships to each involved framework', async ({ page }) => {
    await page.goto('/#/crosswalk?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#crosswalk')).toBeVisible();

    // Crosswalk steps provide save-to-framework options
    await expect(page.locator('.crosswalk__steps')).toBeVisible();
});
