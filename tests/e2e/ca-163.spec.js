const { test, expect, loginAndNavigate } = require('./fixtures');

// CA-163: Filter results owned by the user
// Requirement: verify "owned by me" filter option exists
test('CA-163: Filter results by current user ownership', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await page.locator('.cass--list--item').first().waitFor({ state: 'visible' });
    const filterButton = page.locator('div[title="Filters"]');
    await expect(filterButton).toBeVisible();
    await filterButton.click();
    await expect(page.locator('label[for="ownedByMe"]')).toBeVisible();
});
