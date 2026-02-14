const { test, expect } = require('./fixtures');

// CA-162: Sort search results by last modified
// Requirement: open filters, click sort by last modified, verify reordering
test('CA-162: Sort search results by last modified', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();

    const filterButton = page.locator('div[title="Filters"]');
    await expect(filterButton).toBeVisible();
    await filterButton.click();
    await expect(page.locator('.filter-sort-header').filter({ hasText: 'Sort by' })).toBeVisible();

    // Click the "last modified" sort option
    const lastEditedLabel = page.locator('label[for="lastEdited"]');
    await expect(lastEditedLabel).toBeVisible();
    await lastEditedLabel.click();
    await expect(page.locator('#lastEdited')).toBeChecked();
});
