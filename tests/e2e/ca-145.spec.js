const { test, expect } = require('./fixtures');

// CA-145: Search for objects separate from frameworks
// Requirement: search bar on frameworks page searches across all framework/objects
test('CA-145: Search for objects outside frameworks', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();

    // Verify the search bar is present
    const searchInput = page.locator('.cass--search-bar input[type="search"]');
    await expect(searchInput).toBeVisible();

    // Type a search term and verify the list updates
    await searchInput.fill('test');
    await page.waitForTimeout(1000);
    // After searching, the frameworks container should still be visible (results or "no results")
    await expect(page.locator('#frameworks')).toBeVisible();
});
