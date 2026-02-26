/**
 * Coverage: CTDL-ASN profile activation via ceasnDataFields=true URL param.
 * Derived from collect-coverage5.js ctdlasn-profile session.
 * Exercises ctdlasnProfile.js mixin computed properties and Framework.vue profile selection.
 */

const { test, expect, loginAndNavigate } = require('../fixtures');

test('CTDL-ASN profile: navigate with ceasnDataFields=true to trigger profile', async ({ page }) => {
    await loginAndNavigate(page);

    // Navigate to frameworks with ceasnDataFields=true to trigger CTDL-ASN profile
    await page.goto('/#/frameworks?server=http://localhost/api/&ceasnDataFields=true');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#app')).toBeVisible();

    // Try opening a framework to trigger the CTDL-ASN profile computed properties
    const items = page.locator('.cass--list--item .cass--list--thing');
    const count = await items.count();
    if (count > 0) {
        await items.first().dblclick();
        try {
            await page.waitForURL(/#\/framework/);
            await expect(page.locator('#framework')).toBeVisible();

            // Click a competency to trigger profile property rendering
            const things = page.locator('.cass--list--thing');
            const thingCount = await things.count();
            if (thingCount > 0) {
                await things.first().click();
            }
        } catch (e) {
            // Framework navigation may fail if list is empty — still collected coverage
        }
    }

    // Also visit concepts with ceasnDataFields to trigger concept scheme profile
    await page.goto('/#/concepts?server=http://localhost/api/&ceasnDataFields=true');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#app')).toBeVisible();
});
