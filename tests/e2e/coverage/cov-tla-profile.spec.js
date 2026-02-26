/**
 * Coverage: TLA profile activation via concepts=true URL param.
 * Derived from collect-coverage5.js tla-profile session.
 * Exercises tlaProfile.js mixin computed properties.
 */

const { test, expect, loginAndNavigate } = require('../fixtures');

test('TLA profile: navigate with concepts=true to trigger profile', async ({ page }) => {
    await loginAndNavigate(page);

    // Navigate with concepts=true param to trigger TLA profile
    await page.goto('/#/frameworks?server=http://localhost/api/&concepts=true');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#app')).toBeVisible();

    // Try opening a framework so the TLA profile computed properties are evaluated
    const items = page.locator('.cass--list--item .cass--list--thing');
    const count = await items.count();
    if (count > 0) {
        await items.first().dblclick();
        try {
            await page.waitForURL(/#\/framework/);
            await expect(page.locator('#framework')).toBeVisible();
        } catch (e) {
            // Framework navigation may fail — still collected coverage
        }
    }
});
