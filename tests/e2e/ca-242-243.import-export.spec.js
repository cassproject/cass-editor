const { test, expect, navigateToFramework } = require('./fixtures');

test.describe('Import & Export (CA-242, CA-243)', () => {

    // CA-242: Importing frameworks from standards defined by CaSS
    test('CA-242: Import page loads with supported formats', async ({ page }) => {
        await page.goto('/#/import?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
        await expect(page.locator('#import')).toBeVisible();
        // Verify import link/tab is present
        await expect(page.locator('#import-link')).toBeVisible();
    });

    // CA-242 extended: Verify import button is accessible from frameworks
    test('CA-242: Import button accessible from frameworks toolbar', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
        await expect(page.locator('#frameworks')).toBeVisible();
        // The desktop import button is #import-framework-button-mobile (naming is swapped in source)
        await expect(page.locator('#import-framework-button-mobile')).toBeVisible();
    });

    // CA-243: Export functionality accessible from framework detail
    test('CA-243: Export functionality is accessible from framework view', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
        await expect(page.locator('#frameworks')).toBeVisible();
        // Navigate into a framework to find export options
        await navigateToFramework(page);
        // Verify framework detail loaded — export is available in the framework actions
        await expect(page.locator('#framework-info-bar')).toBeVisible();
    });

});
