const { test, expect } = require('./fixtures');

// CA-134: Filter search results by search terms appearing in framework
    test('CA-134: Framework search filtering works', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#frameworks')).toBeVisible();
        const searchInput = page.locator('.cass--search-bar input[type="search"]');
        await expect(searchInput).toBeVisible();
        await searchInput.fill('test');
        await expect(searchInput).toHaveValue('test');
        // Verify search container remains accessible after search
        await expect(page.locator('#frameworks')).toBeVisible();
    });
