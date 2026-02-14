const { test, expect } = require('./fixtures');

// CA-115: Permit user to find an item within the framework
// Requirement: navigate to frameworks, verify search bar exists and accepts input
test('CA-115: Search within framework is available', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#frameworks')).toBeVisible();

    // Verify search bar is visible
    await expect(page.locator('.cass--search-bar')).toBeVisible();
    const searchInput = page.locator('.cass--search-bar input[type="search"]');
    await expect(searchInput).toBeVisible();

    // Verify the search bar accepts input
    await searchInput.fill('test search term');
    await expect(searchInput).toHaveValue('test search term');

    // Clear the search and verify it clears
    await searchInput.fill('');
    await expect(searchInput).toHaveValue('');
});
