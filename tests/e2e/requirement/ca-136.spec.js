const { test, expect, navigateToFramework } = require('../fixtures');

// CA-136: View framework in more detail when selected
    test('CA-136: Framework detail view on selection', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#frameworks')).toBeVisible();
        if (!await navigateToFramework(page)) return;
        // Verify the URL changed to include the framework route
        const url = page.url();
        expect(url).toContain('#/framework');
    });
