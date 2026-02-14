const { test, expect } = require('./fixtures');

// CA-135: Competency search alongside framework search
    test('CA-135: Competency search alongside framework search', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#frameworks')).toBeVisible();
        const searchInput = page.locator('.cass--search-bar input[type="search"]');
        await expect(searchInput).toBeVisible();
        await searchInput.fill('competency');
        await expect(searchInput).toHaveValue('competency');
    });
