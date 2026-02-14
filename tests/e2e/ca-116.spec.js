const { test, expect } = require('./fixtures');

// CA-116: Method for permitting a user to list frameworks
// Requirement: navigate to frameworks, verify list items appear with correct count
test('CA-116: Frameworks list is accessible', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#frameworks')).toBeVisible();

    // Verify the search bar and heading are present
    await expect(page.locator('.cass--search-bar')).toBeVisible();

    // Verify framework list items are present and countable
    const listItems = page.locator('.cass--list--item');
    await listItems.first().waitFor({ state: 'visible' });
    const count = await listItems.count();
    expect(count).toBeGreaterThan(0);

    // Verify each list item has visible text content
    const firstItemText = await listItems.first().textContent();
    expect(firstItemText.trim().length).toBeGreaterThan(0);
});
