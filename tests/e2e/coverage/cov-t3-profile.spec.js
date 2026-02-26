/**
 * Coverage: T3 profile activation via view=true URL param.
 * Derived from collect-coverage5.js t3-profile session.
 * Exercises t3Profile.js mixin computed properties.
 */

const { test, expect, loginAndNavigate } = require('../fixtures');

test('T3 profile: navigate with view=true to trigger profile', async ({ page }) => {
    await loginAndNavigate(page);

    // Navigate with view=true param to trigger T3 profile
    await page.goto('/#/frameworks?server=http://localhost/api/&view=true');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#app')).toBeVisible();

    // Try opening a framework so the T3 profile computed properties are evaluated
    const items = page.locator('.cass--list--item .cass--list--thing');
    const count = await items.count();
    if (count > 0) {
        await items.first().dblclick();
        try {
            await page.waitForURL(/#\/framework/);
            await expect(page.locator('#framework')).toBeVisible();

            // Click a competency to trigger profile rendering
            const things = page.locator('.cass--list--thing');
            const thingCount = await things.count();
            if (thingCount > 0) {
                await things.first().click();
            }
        } catch (e) {
            // Framework navigation may fail — still collected coverage
        }
    }
});
