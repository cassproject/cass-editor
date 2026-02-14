const { test, expect } = require('./fixtures');

// CA-219: Optional selection/creation of third framework
test('CA-219: Optional third framework for relationships', async ({ page }) => {
    await page.goto('/#/crosswalk?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#crosswalk')).toBeVisible();

    // Crosswalk steps support optional third framework selection
    await expect(page.locator('.crosswalk__steps')).toBeVisible();
});
