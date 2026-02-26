const { test, expect } = require('../fixtures');

// CA-116: Method for permitting a user to list frameworks
// Requirement: navigate to frameworks, verify list items appear
test('CA-116: Frameworks list is accessible', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#frameworks')).toBeVisible();

    // Verify the search bar is present
    await expect(page.locator('.cass--search-bar')).toBeVisible();

    // Verify framework list items are present and countable
    const listItems = page.locator('.cass--list--item');
    await listItems.first().waitFor({ state: 'visible' });
    const count = await listItems.count();
    expect(count).toBeGreaterThan(0);

    // Wait for framework names to load asynchronously, then verify text content
    const firstItemName = listItems.first().locator('.cass--list--thing');
    await expect(firstItemName).toBeVisible();
});
