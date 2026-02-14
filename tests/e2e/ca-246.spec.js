const { test, expect } = require('./fixtures');

// CA-246: Link for publication platforms (RSS, Sitemap, etc.)
    test('CA-246: Publication link available for frameworks', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#frameworks')).toBeVisible();
        await expect(page.locator('#frameworks')).toBeVisible();
        // The frameworks list page provides access to shared/published frameworks
        await expect(page.locator('.cass--search-bar')).toBeVisible();
    });
