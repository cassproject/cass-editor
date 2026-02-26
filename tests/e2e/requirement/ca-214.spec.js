const { test, expect } = require('../fixtures');

// CA-214: Rapid creation of relationships (source/target not in same framework)
    test('CA-214: Rapid relationship creation between frameworks', async ({ page }) => {
    await page.goto('/#/crosswalk?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
        await expect(page.locator('#crosswalk')).toBeVisible();
        await expect(page.locator('.crosswalk__steps')).toBeVisible();
    });
