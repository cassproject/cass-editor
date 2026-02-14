const { test, expect, navigateToFramework } = require('./fixtures');

// CA-244: Permanent links shareable outside CaSS
test('CA-244: Permanent shareable links for frameworks', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();
    // Verify the URL contains a framework identifier (permanent link)
    const url = page.url();
    expect(url).toContain('#/framework');
});
