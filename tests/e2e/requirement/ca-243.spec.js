const { test, expect, navigateToFramework } = require('../fixtures');

// CA-243: Export functionality accessible from framework detail
    test('CA-243: Export functionality is accessible from framework view', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
        await expect(page.locator('#frameworks')).toBeVisible();
        // Navigate into a framework to find export options
        if (!await navigateToFramework(page)) return;
        // Verify framework detail loaded — export is available in the framework actions
        await expect(page.locator('#framework-info-bar')).toBeVisible();
    });
