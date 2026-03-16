const { test, expect, loginAndNavigate, generateUid } = require('../fixtures');
const path = require('path');

test.describe.serial('Coverage: Import Types from Files', () => {

    test('Loads the Import Page', async ({ page }) => {
        await loginAndNavigate(page);

        // nav link was updated to side-nav-import-schemes-link
        await expect(page.locator('#side-nav-import-schemes-link')).toBeVisible();
        await page.click('#side-nav-import-schemes-link');

        // Verify Import Options (Tabs) are present
        await expect(page.locator('.import-tab').first()).toBeVisible();
    });

    test('Testing CSV Import', async ({ page }) => {
        await loginAndNavigate(page);
        await page.goto('/#/import?server=http://localhost/api/');

        // Verify File Import tab is active
        await expect(page.locator('.import-tab.is-active-tab #import-file-tab-button')).toBeVisible();

        // Upload CSV via the hidden input used by DragAndDrop
        const filePath = path.join(__dirname, '../../../files/CAP Software Engineering - Competencies.csv');
        await page.locator('#drag-and-drop-file-input').setInputFiles(filePath);

        // Click Process
        await page.click('#drag-and-drop-process-files-button');

        // After processing, CSV import asks to align columns or defaults them. Wait for the import details button.
        await expect(page.locator('#import-file-import-button')).toBeVisible();

        // Fill out the framework name 
        const frameworkName = 'E2E CSV Import Framework ' + Date.now();
        const nameInput = page.locator('#name-input');
        if (await nameInput.isVisible()) {
            await nameInput.fill(frameworkName);
        }

        // Proceed to import
        await page.click('#import-file-import-button');

        // Ensure we eventually get to the Framework editor or completion screen
        await expect(page.locator('#import-preview')).toBeVisible();
    });

    test('Testing JSON-LD Import', async ({ page }) => {
        await loginAndNavigate(page);
        await page.goto('/#/import?server=http://localhost/api/');

        // Verify File Import tab is active
        await expect(page.locator('.import-tab.is-active-tab #import-file-tab-button')).toBeVisible();

        // Connect Credentials uses CTDL-ASN, while DQP uses native JSON-LD
        const filePath = path.join(__dirname, '../../../files/DQP.jsonld');
        await page.locator('#drag-and-drop-file-input').setInputFiles(filePath);

        // Click Process
        await page.click('#drag-and-drop-process-files-button');

        // Some JSON imports jump straight to saving, some show details
        const acceptDetails = page.locator('#import-details-accept-button');
        if (await acceptDetails.isVisible()) {
            await acceptDetails.click();
        }

        // It may start importing immediately. Wait for the standard success signals
        await expect(page.locator('#import-status')).toBeVisible();
    });

});
