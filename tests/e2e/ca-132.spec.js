const { test, expect, loginAndNavigate } = require('./fixtures');

// CA-132: Filter showing only results owned by the user
    test('CA-132: Filter by owned by me is available', async ({ page }) => {
        await loginAndNavigate(page);
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
        // Wait for frameworks list to load
        await page.locator('.cass--list--item').first().waitFor({ state: 'visible' });
        // Open filter panel
        const filterButton = page.locator('div[title="Filters"]');
        await expect(filterButton).toBeVisible();
        await filterButton.click();
        // Verify "Owned by me" quick filter checkbox is visible
        await expect(page.locator('label[for="ownedByMe"]')).toBeVisible();
    });
