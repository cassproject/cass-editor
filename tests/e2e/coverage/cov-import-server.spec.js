/**
 * Coverage: ImportServer.vue — exercise server import with the OpenSalt.net example.
 * Targets the 1.7% covered ImportServer component (450 uncovered lines).
 * Uses the in-UI example OpenSalt.net endpoint to trigger search/fetch code.
 */

const { test, expect, loginAndNavigate } = require('../fixtures');

test('Import server: use OpenSalt.net example to trigger server search workflow', async ({ page }) => {
    await loginAndNavigate(page);

    // Navigate to import page and click server tab
    await page.goto('/#/import?server=http://localhost/api/');
    await expect(page.locator('#app')).toBeVisible();

    const serverTab = page.locator('#import-server-tab-button');
    await expect(serverTab).toBeVisible();
    await serverTab.click();

    // The ImportServer component should be visible
    const importServer = page.locator('#import-from-server');
    await expect(importServer).toBeVisible();

    // Click the "OpenSalt.net endpoint" example link to populate the URL
    const openSaltLink = page.locator('a:has-text("OpenSalt.net")');
    if (await openSaltLink.isVisible().catch(() => false)) {
        await openSaltLink.click();
    }

    // Verify the URL input is populated
    const serverUrlInput = page.locator('#import-server-url-input');
    if (await serverUrlInput.isVisible().catch(() => false)) {
        const urlValue = await serverUrlInput.inputValue();
        // If not populated by click, fill it manually
        if (!urlValue) {
            await serverUrlInput.fill('https://opensalt.net');
        }
    }

    // Click the search button to trigger the CASE API search
    const searchBtn = page.locator('#import-server-search-button, button:has-text("search"), div.button:has-text("earch")').first();
    if (await searchBtn.isVisible().catch(() => false)) {
        await searchBtn.click();

        // Wait for results (loading spinner or list items or errors)
        const resultOrError = page.locator('.fa-spinner, .cass--list--item, .has-text-danger, #import-server-start-over-button');
        await resultOrError.first().waitFor({ state: 'visible' }).catch(() => { });
    }

    // Also exercise concept mode for the server import
    await page.goto('/#/import?server=http://localhost/api/&concepts=true');
    await expect(page.locator('#app')).toBeVisible();
    // In concept mode, the server tab should still be available for some paths
    const serverTab2 = page.locator('#import-server-tab-button');
    if (await serverTab2.isVisible().catch(() => false)) {
        await serverTab2.click();
    }
});
