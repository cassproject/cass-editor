const { test, expect } = require('./fixtures');

// CA-131: Sort framework search results by last modified date
    test('CA-131: Sort by last modified is available', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#frameworks')).toBeVisible();
        await page.locator('div[title="Filters"]').click();
        await expect(page.locator('.filter-sort-header').filter({ hasText: 'Sort by' })).toBeVisible();
        const lastModifiedLabel = page.locator('label[for="lastEdited"]');
        await expect(lastModifiedLabel).toBeVisible();
        await lastModifiedLabel.click();
        await expect(page.locator('input#lastEdited')).toBeChecked();
    });
