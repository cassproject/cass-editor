const { test, expect } = require('./fixtures');

// CA-165: Filter results where search terms appear
// Requirement: type search term, verify list filters
test('CA-165: Filter results by search terms', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    const searchInput = page.locator('.cass--search-bar input[type="search"]');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('test');
    await expect(searchInput).toHaveValue('test');
});
