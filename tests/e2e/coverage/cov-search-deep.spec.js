/**
 * Coverage: Deep search interactions — framework search, in-framework search, Ctrl+F.
 * Derived from collect-coverage5.js search session.
 * Exercises Search.vue, FilterAndSort.vue, and related search logic.
 */

const { test, expect, loginAndNavigate, navigateToFramework } = require('../fixtures');

test('Search deep: framework list search and in-framework search', async ({ page }) => {
    await loginAndNavigate(page);

    await page.goto('/#/frameworks?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#app')).toBeVisible();

    // Use the framework list search bar
    const searchInput = page.locator('#search-frameworks-input, .search-bar input, input[type="search"], input[placeholder*="Search"]');
    const searchVisible = await searchInput.first().isVisible().catch(() => false);
    if (searchVisible) {
        await searchInput.first().fill('test');
        await searchInput.first().fill('competency');
        await searchInput.first().fill('');
    }

    // Open a framework for in-framework search
    const items = page.locator('.cass--list--item .cass--list--thing');
    const count = await items.count();
    if (count > 0) {
        if (!await navigateToFramework(page)) return;

        // Try in-framework search bar
        const fwSearch = page.locator('.search-bar input, input[type="search"]');
        const fwSearchVisible = await fwSearch.first().isVisible().catch(() => false);
        if (fwSearchVisible) {
            await fwSearch.first().fill('test');
        }

        // Try Ctrl+F shortcut
        await page.keyboard.press('Control+f');
        await page.keyboard.press('Escape');
    }

    await expect(page.locator('#app')).toBeVisible();
});
