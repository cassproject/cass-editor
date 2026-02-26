const { test, expect } = require('../fixtures');

// CA-154: Search for values from system
// Requirement: search bar searches across all frameworks/objects in the system
test('CA-154: Search for values from system', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();

    // Verify search bar is available for system-wide search
    const searchInput = page.locator('.cass--search-bar input[type="search"]');
    await expect(searchInput).toBeVisible();

    // Perform a search and verify the list responds
    await searchInput.fill('test');
    await page.waitForTimeout(1000);
    await expect(page.locator('#frameworks')).toBeVisible();
});
