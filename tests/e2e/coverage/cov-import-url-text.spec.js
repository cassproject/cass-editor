const { test, expect, loginAndNavigate } = require('../fixtures');
const fs = require('fs');
const path = require('path');

test.describe.serial('Coverage: Import from URL and Text', () => {

    test('Testing URL Import', async ({ page }) => {
        await loginAndNavigate(page);
        await page.goto('/#/import?server=http://localhost/api/');

        // Go to URL tab
        await page.click('#import-url-tab-button');
        await expect(page.locator('.import-tab.is-active-tab #import-url-tab-button')).toBeVisible();

        // Click one of the example links to pre-fill the URL
        await page.click('#import-url-example-1-link');

        // Click import button
        await page.click('#import-url-import-button');

        // URL imports usually go straight to the preview/processing phase.
        // Wait for the custom IDs added by the user to indicate success or preview stage.

        await page.waitForSelector('#duplicate-import-confirm-button');
        await page.click('#duplicate-import-confirm-button');

        await expect(page.locator('#import-preview-processed')).toBeVisible();
    });

    test('Testing Text Import', async ({ page }) => {
        await loginAndNavigate(page);
        await page.goto('/#/import?server=http://localhost/api/');

        // Go to Text tab
        await page.click('#import-text-tab-button');
        await expect(page.locator('.import-tab.is-active-tab #import-text-tab-button')).toBeVisible();

        // Read a real file to paste. DQP.jsonld is a good small payload.
        const fileContent = "A\r\n B\r\n C\r\n  D\r\n  E\r\n F\r\n G\r\n  H\r\n  I\r\n   J\r\n K\r\n L\r\n M\r\n N\r\n O\r\n P\r\n Q\r\n R\r\n S\r\n T\r\n U\r\n V\r\n W\r\n X\r\n Y\r\n Z\r\n";

        // Fill out the framework name
        const frameworkName = 'E2E Text Import Framework ' + Date.now();
        await page.fill('#import-framework-name-input', frameworkName);

        //select all
        await page.locator('#import-text-paste-textarea').selectText();
        // Paste the text
        await page.fill('#import-text-paste-textarea', fileContent);
        //blur
        await page.locator('#import-text-paste-textarea').blur();

        // Click the import button
        await page.click('#import-text-import-button');

        // It may start importing immediately or go to preview.
        await expect(page.locator('#framework')).toBeVisible();
    });

});
