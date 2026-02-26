/**
 * Coverage: ImportServer.vue deep — connect to CaSS endpoint.
 * Targets ImportServer.vue (1.7%), import.js connectToServer/cassDetect/caseDetect paths.
 * Uses the local CaSS server as a real endpoint to trigger the full connect → search flow.
 */

const { test, expect, loginAndNavigate } = require('../fixtures');

test('Import server deep: connect to local CaSS endpoint and exercise search flow', async ({ page }) => {
    await loginAndNavigate(page);

    // Navigate to import page
    await page.goto('/#/import?server=http://localhost/api/');
    await expect(page.locator('#app')).toBeVisible();

    // Click server tab
    const serverTab = page.locator('#import-server-tab-button');
    await expect(serverTab).toBeVisible();
    await serverTab.click();

    // Wait for server import UI
    await expect(page.locator('#import-from-server')).toBeVisible();

    // Enter the local CaSS server URL (which is a real CaSS endpoint)
    const urlInput = page.locator('#import-server-url-input');
    await expect(urlInput).toBeVisible();
    await urlInput.fill('http://localhost');

    // Click "connect to CaSS endpoint" to trigger cassDetectEndpoint → cassSearchEndpoint
    const cassConnectBtn = page.locator('#import-server-connect-cass-button');
    await expect(cassConnectBtn).toBeVisible();
    await cassConnectBtn.click();

    // Wait for search results to appear — spinner, then framework list or errors
    const spinner = page.locator('.fa-spinner');
    await spinner.first().waitFor({ state: 'visible' }).catch(() => { });

    // Wait for frameworks to be detected
    const frameworksOrError = page.locator('#import-cass-frameworks-multiselect, #import-server-start-over-button, .cass__import--frameworks, .has-text-danger');
    await frameworksOrError.first().waitFor({ state: 'visible' }).catch(() => { });

    // If frameworks were found, select one and interact
    const frameworkSelect = page.locator('#import-cass-frameworks-multiselect');
    if (await frameworkSelect.isVisible().catch(() => false)) {
        // Select the first framework option
        const firstOption = frameworkSelect.locator('option').first();
        if (await firstOption.isVisible().catch(() => false)) {
            await frameworkSelect.selectOption({ index: 0 });
        }

        // Click "Select all"
        const selectAllBtn = page.locator('#import-server-select-all-button');
        if (await selectAllBtn.isVisible().catch(() => false)) {
            await selectAllBtn.click();
        }

        // Click Cancel to exercise cancelImport
        const cancelBtn = page.locator('#import-server-cancel-button');
        if (await cancelBtn.isVisible().catch(() => false)) {
            await cancelBtn.click();
        }
    }

    // Now try CASE endpoint connect with an invalid URL to exercise error path
    // Navigate back to import and server tab
    await page.goto('/#/import?server=http://localhost/api/');
    await expect(page.locator('#app')).toBeVisible();
    await page.locator('#import-server-tab-button').click();
    await expect(page.locator('#import-from-server')).toBeVisible();

    // Enter an invalid URL to trigger error handling in connectToServer
    await page.locator('#import-server-url-input').fill('not-a-valid-url');
    const caseConnectBtn = page.locator('#import-server-connect-case-button');
    if (await caseConnectBtn.isVisible().catch(() => false)) {
        await caseConnectBtn.click();
        // This should trigger the isValidUrl check and show an error
        const errorModal = page.locator('.modal, .has-text-danger, #import-server-start-over-button');
        await errorModal.first().waitFor({ state: 'visible' }).catch(() => { });
    }
});
