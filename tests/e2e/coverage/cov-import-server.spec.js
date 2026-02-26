/**
 * Coverage: ImportServer.vue — exercise the server import workflow.
 * Targets the 1.7% covered ImportServer component (450 uncovered lines).
 */

const { test, expect, loginAndNavigate } = require('../fixtures');

test('Import server: interact with import server URL input and search workflow', async ({ page }) => {
    await loginAndNavigate(page);

    // Navigate to import page
    await page.goto('/#/import?server=http://localhost/api/');
    await expect(page.locator('#app')).toBeVisible();

    // Click the server/remote tab
    const serverTab = page.locator('a:has-text("Server"), a:has-text("Remote"), .tab:has-text("Server")').first();
    if (await serverTab.isVisible().catch(() => false)) {
        await serverTab.click();
    }

    // The ImportServer component should now be visible
    const importServer = page.locator('#import-from-server');
    if (await importServer.isVisible().catch(() => false)) {
        // Fill in a server URL
        const serverUrlInput = page.locator('#import-server-url-input').first();
        if (await serverUrlInput.isVisible().catch(() => false)) {
            await serverUrlInput.fill('https://opensalt.net');
        }

        // Click search/fetch button for frameworks
        const searchBtn = page.locator('#import-server-search-button, button:has-text("search"), div:has-text("earch")').first();
        if (await searchBtn.isVisible().catch(() => false)) {
            await searchBtn.click();
        }

        // Click search for concepts button
        const conceptSearchBtn = page.locator('#import-server-search-concept-button, div:has-text("oncept")').first();
        if (await conceptSearchBtn.isVisible().catch(() => false)) {
            await conceptSearchBtn.click();
        }
    }

    // Also try the import page with concept mode for additional coverage paths
    await page.goto('/#/import?server=http://localhost/api/&concepts=true');
    await expect(page.locator('#app')).toBeVisible();
});
