const { test, expect, loginAndNavigate } = require('./fixtures');

// CA-164: Filter results owned by specific user
// Requirement: verify ability to filter by specific owner
test('CA-164: Filter results by specific user', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await page.locator('.cass--list--item').first().waitFor({ state: 'visible' });
    const filterButton = page.locator('div[title="Filters"]');
    await expect(filterButton).toBeVisible();
    await filterButton.click();
    await expect(page.locator('label[for="ownedByMe"]')).toBeVisible();
    await expect(page.locator('label[for="notOwnedByMe"]')).toBeVisible();
});
