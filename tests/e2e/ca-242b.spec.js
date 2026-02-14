const { test, expect } = require('./fixtures');

// CA-242b: Verify import button is accessible from frameworks toolbar
test('CA-242b: Import button accessible from frameworks toolbar', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#frameworks')).toBeVisible();
    // The desktop import button is #import-framework-button-mobile (naming is swapped in source)
    await expect(page.locator('#import-framework-button-mobile')).toBeVisible();
});
