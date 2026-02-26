/**
 * Coverage: Import via URL, server, and text entry.
 * Derived from collect-coverage5.js import-deep session.
 * Exercises ImportServer.vue, ImportUrl.vue, ImportText.vue, and import.js mixin.
 */

const { test, expect, loginAndNavigate } = require('../fixtures');

test('Import deep: URL, server, and text import tabs with input', async ({ page }) => {
    await loginAndNavigate(page);

    await page.goto('/#/import?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#import')).toBeVisible();

    // Click each import tab
    const tabIds = [
        '#import-file-tab-button',
        '#import-server-tab-button',
        '#import-text-tab-button',
        '#import-url-tab-button',
    ];
    for (const tabId of tabIds) {
        const tab = page.locator(tabId);
        const isVisible = await tab.isVisible().catch(() => false);
        if (isVisible) {
            await tab.click();
            await page.waitForLoadState('domcontentloaded');
        }
    }

    // Try URL import interaction
    const urlTab = page.locator('#import-url-tab-button');
    if (await urlTab.isVisible().catch(() => false)) {
        await urlTab.click();
        await page.waitForLoadState('domcontentloaded');
        const urlInput = page.locator('input[placeholder*="URL"], input[placeholder*="url"], #import-url-input');
        if (await urlInput.first().isVisible().catch(() => false)) {
            await urlInput.first().fill('https://example.com/test.csv');
        }
    }

    // Try server import interaction
    const serverTab = page.locator('#import-server-tab-button');
    if (await serverTab.isVisible().catch(() => false)) {
        await serverTab.click();
        await page.waitForLoadState('domcontentloaded');
        const serverInput = page.locator('input[placeholder*="server"], input[placeholder*="Server"], #import-server-url-input');
        if (await serverInput.first().isVisible().catch(() => false)) {
            await serverInput.first().fill('http://localhost/api/');
            // Click search/import button
            const importBtn = page.locator('button:has-text("Search"), button:has-text("Import")');
            if (await importBtn.first().isVisible().catch(() => false)) {
                await importBtn.first().click();
            }
        }
    }

    // Try text import interaction
    const textTab = page.locator('#import-text-tab-button');
    if (await textTab.isVisible().catch(() => false)) {
        await textTab.click();
        await page.waitForLoadState('domcontentloaded');
        const textarea = page.locator('textarea');
        if (await textarea.first().isVisible().catch(() => false)) {
            await textarea.first().fill('Competency 1\nCompetency 2\nCompetency 3\n');
        }
    }

    await expect(page.locator('#app')).toBeVisible();
});
