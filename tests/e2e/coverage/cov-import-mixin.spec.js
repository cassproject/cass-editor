/**
 * Coverage: import.js mixin — exercise import flows (URL, text, file analysis).
 * Targets the 10% covered import mixin (717 uncovered lines).
 */

const { test, expect, loginAndNavigate } = require('../fixtures');

test('Import mixin: exercise URL import, text import, and import transitions', async ({ page }) => {
    await loginAndNavigate(page);

    // Navigate to import page
    await page.goto('/#/import?server=http://localhost/api/');
    await expect(page.locator('#app')).toBeVisible();

    // Click through the import tabs to trigger import mixin data/watch/computed paths
    const urlTab = page.locator('[id*="import-url"], a:has-text("URL"), .tab:has-text("URL")').first();
    if (await urlTab.isVisible().catch(() => false)) {
        await urlTab.click();
    }

    // Try the URL import with a test URL
    const urlInput = page.locator('#import-url-input, input[type="url"]').first();
    if (await urlInput.isVisible().catch(() => false)) {
        await urlInput.fill('https://opensalt.net');
    }

    // Click the text import tab
    const textTab = page.locator('[id*="import-text"], a:has-text("Text"), .tab:has-text("Text")').first();
    if (await textTab.isVisible().catch(() => false)) {
        await textTab.click();
    }

    // Try pasting text to trigger parseText watcher
    const textArea = page.locator('textarea').first();
    if (await textArea.isVisible().catch(() => false)) {
        await textArea.fill('Competency 1\nCompetency 2\nCompetency 3');
    }

    // Click import/analyze button to trigger analyzeImportFile path
    const importBtn = page.locator('#import-button, button:has-text("import"), div:has-text("import")').last();
    if (await importBtn.isVisible().catch(() => false)) {
        await importBtn.click();
    }

    // Click the file upload tab
    const fileTab = page.locator('[id*="import-file"], a:has-text("File"), .tab:has-text("File")').first();
    if (await fileTab.isVisible().catch(() => false)) {
        await fileTab.click();
    }

    // Try cancel import to trigger cancelImport/resetImport
    const cancelBtn = page.locator('#cancel-import-button, button:has-text("cancel"), div:has-text("cancel")').first();
    if (await cancelBtn.isVisible().catch(() => false)) {
        await cancelBtn.click();
    }
});
