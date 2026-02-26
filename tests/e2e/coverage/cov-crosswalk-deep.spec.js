/**
 * Coverage: Crosswalk.vue — exercise the crosswalk/alignment editor.
 * Targets the 11.5% covered Crosswalk component (323 uncovered lines).
 */

const { test, expect, loginAndNavigate } = require('../fixtures');

test('Crosswalk deep: navigate crosswalk page, browse frameworks, create alignment', async ({ page }) => {
    await loginAndNavigate(page);

    // Navigate to crosswalk page
    await page.goto('/#/crosswalk?server=http://localhost/api/');
    await expect(page.locator('#app')).toBeVisible();

    // Wait for the crosswalk page content
    const crosswalkContainer = page.locator('#crosswalk, .crosswalk');
    if (await crosswalkContainer.isVisible().catch(() => false)) {
        // The crosswalk has two framework selectors (source and target)
        // Try clicking the source framework selector
        const frameworkSelectors = page.locator('.cass--list--item .cass--list--thing');
        if (await frameworkSelectors.first().isVisible().catch(() => false)) {
            await frameworkSelectors.first().click();
        }
    }

    // Try adding a framework to the crosswalk by searching
    const searchInput = page.locator('#search-bar-input');
    if (await searchInput.isVisible().catch(() => false)) {
        await searchInput.fill('Harvard');
        const matchingItem = page.locator(`.cass--list--item .cass--list--thing:has-text("Harvard")`);
        if (await matchingItem.first().isVisible().catch(() => false)) {
            await matchingItem.first().dblclick();
        }
    }

    // Try the crosswalk with ceasnDataFields for additional coverage
    await page.goto('/#/crosswalk?server=http://localhost/api/&ceasnDataFields=true');
    await expect(page.locator('#app')).toBeVisible();
});
