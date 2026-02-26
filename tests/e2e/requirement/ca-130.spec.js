const { test, expect } = require('../fixtures');

// CA-130: Filter framework search results by configuration
    test('CA-130: Filter by configuration is available', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#frameworks')).toBeVisible();
        const filterButton = page.locator('div[title="Filters"]');
        await expect(filterButton).toBeVisible();
        await filterButton.click();
        await expect(page.locator('.filter-sort-header').first()).toBeVisible();
    });
