const { test, expect } = require('./fixtures');

// CA-242: Importing frameworks from standards defined by CaSS
test('CA-242: Import page loads with supported formats', async ({ page }) => {
    await page.goto('/#/import?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#import')).toBeVisible();
    // Verify import link/tab is present
    await expect(page.locator('#import-link')).toBeVisible();
});
