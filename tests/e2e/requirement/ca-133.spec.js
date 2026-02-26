const { test, expect, loginAndNavigate } = require('../fixtures');

// CA-133: Filter showing only results owned by specific user
    test('CA-133: Filter by specific owner is available', async ({ page }) => {
        await loginAndNavigate(page);
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible();
        // Wait for frameworks list to load
        await page.locator('.cass--list--item').first().waitFor({ state: 'visible' });
        // Open filter panel
        const filterButton = page.locator('div[title="Filters"]');
        await expect(filterButton).toBeVisible();
        await filterButton.click();
        // Verify owner-based filter options exist
        await expect(page.locator('label[for="ownedByMe"]')).toBeVisible();
        await expect(page.locator('label[for="notOwnedByMe"]')).toBeVisible();
    });
