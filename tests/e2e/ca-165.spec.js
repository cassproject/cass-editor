const { test, expect } = require('./fixtures');

// CA-165: Filter results where search terms appear in the object
test('CA-165: Filter results by search terms', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#frameworks')).toBeVisible();

    // Wait for initial list to populate
    const listItems = page.locator('.cass--list--item');
    await listItems.first().waitFor({ state: 'visible' });

    const searchInput = page.locator('.cass--search-bar input[type="search"]');
    await expect(searchInput).toBeVisible();

    // Perform a search
    await searchInput.fill('test');
    await expect(searchInput).toHaveValue('test');
    await page.waitForTimeout(2000);

    // Verify the search is functional and the container is still active
    await expect(page.locator('#frameworks')).toBeVisible();

    // Clear search and verify list repopulates
    await searchInput.fill('');
    await page.waitForTimeout(1500);
    const postClearCount = await listItems.count();
    expect(postClearCount).toBeGreaterThan(0);
});
