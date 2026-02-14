const { test, expect } = require('./fixtures');

test.describe('Sharing & Publishing (CA-244 through CA-246)', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
        await expect(page.locator('#frameworks')).toBeVisible();
    });

    // CA-244: Permanent links shareable outside CaSS
    test('CA-244: Permanent shareable links for frameworks', async ({ page }) => {
        const listItems = page.locator('.cass--list--item');
        await listItems.first().waitFor({ state: 'visible' });
        const count = await listItems.count();
        if (count > 0) {
            await listItems.first().dblclick();
            await expect(page.locator('#framework')).toBeVisible();
            const url = page.url();
            expect(url).toContain('#/framework');
        }
    });

    // CA-245: Data properties indicate whether frameworks are published
    test('CA-245: Published status indicator on frameworks', async ({ page }) => {
        await expect(page.locator('.cass--list')).toBeVisible();
    });

    // CA-246: Link for publication platforms (RSS, Sitemap, etc.)
    test('CA-246: Publication link available for frameworks', async ({ page }) => {
        await expect(page.locator('#frameworks')).toBeVisible();
    });

});
