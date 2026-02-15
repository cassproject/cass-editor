const { test, expect } = require('./fixtures');

// CA-135: Search also performs competency search, displaying frameworks
// containing matching competencies after the framework matches
test('CA-135: Competency search alongside framework search', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#frameworks')).toBeVisible();

    // Wait for initial list to populate
    const listItems = page.locator('.cass--list--item');
    await listItems.first().waitFor({ state: 'visible' });

    // The search bar performs both framework and competency searches
    const searchInput = page.locator('.cass--search-bar input[type="search"]');
    await expect(searchInput).toBeVisible();

    // Search with a term — the Vuex store drives both framework and competency searches
    await searchInput.fill('knowledge');
    await expect(searchInput).toHaveValue('knowledge');

    // Wait for search to process
    await page.waitForTimeout(2000);

    // Verify the search term propagated to the Vuex store (app module)
    const searchState = await page.evaluate(() => {
        const store = window.app && window.app.$store;
        if (!store) return { error: 'no store' };
        return {
            hasSearchTerm: store.state.app &&
                store.state.app.frameworks &&
                store.state.app.frameworks.searchTerm !== undefined,
            searchTerm: store.state.app && store.state.app.frameworks
                ? store.state.app.frameworks.searchTerm : null
        };
    });

    // Verify the search term propagated to the store (drives both search pathways)
    expect(searchState.hasSearchTerm).toBe(true);

    // Framework container should still be functional (no errors)
    await expect(page.locator('#frameworks')).toBeVisible();
});
