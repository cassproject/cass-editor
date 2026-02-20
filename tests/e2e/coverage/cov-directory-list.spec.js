const { test, expect } = require('@playwright/test');
const { loginAndNavigate } = require('../fixtures.js');

test.describe('Coverage: DirectoryList.vue', () => {
    test.beforeEach(async ({ page }) => {
        await loginAndNavigate(page);
        await page.goto('/#/frameworks');
    });

    test('creates a directory and exercises DirectoryList', async ({ page }) => {
        test.setTimeout(25000);

        // Wait for frameworks page to load
        await page.waitForSelector('#frameworks', { state: 'visible' });

        // Click Add new dropdown
        await page.click('#add-new-dropdown-toggle-button');

        // Click Create directory
        await page.click('#add-new-dropdown-directory');

        // Fill out modal and create
        await expect(page.locator('#add-directory-name-input')).toBeVisible();
        await page.fill('#add-directory-name-input', 'Coverage Test Directory');
        await page.click('#add-directory-create-button');

        // It should automatically redirect to /directory
        await page.waitForURL(/.*#\/directory/);
        await page.waitForSelector('#directoryList', { state: 'visible' });

        // Now perform a search
        await expect(page.locator('#search-bar-input')).toBeVisible();
        await page.fill('#search-bar-input', 'NonExistentTestItem404');

        // Wait for search result text
        await expect(page.locator('.no-results')).toBeVisible({ timeout: 10000 });

        // Clear search
        await page.fill('#search-bar-input', '');
        await page.waitForTimeout(500);
    });
});
