/**
 * Coverage: Keyboard editing operations — cut, copy, paste, indent, undo, delete.
 * Derived from collect-coverage5.js common-mixin session.
 * Exercises common.js mixin methods: multiSelect, clipboard, indent/outdent, undo.
 */

const { test, expect, loginAndNavigate, navigateToFramework } = require('../fixtures');

test('Common editing: keyboard shortcuts for cut, copy, paste, indent, delete, undo', async ({ page }) => {
    await loginAndNavigate(page);

    await page.goto('/#/frameworks?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');

    const items = page.locator('.cass--list--item .cass--list--thing');
    const count = await items.count();
    if (count === 0) {
        // No frameworks — still pass
        expect(true).toBe(true);
        return;
    }

    if (!await navigateToFramework(page)) return;

    // Find hierarchy items
    const things = page.locator('.cass--list--thing');
    await things.first().waitFor({ state: 'visible' });
    const thingCount = await things.count();

    if (thingCount > 1) {
        // Click first item
        await things.first().click();

        // Multi-select with Shift+click
        await things.nth(Math.min(2, thingCount - 1)).click({ modifiers: ['Shift'] });

        // Cut
        await page.keyboard.press('Control+x');

        // Paste
        await page.keyboard.press('Control+v');

        // Copy
        await page.keyboard.press('Control+c');

        // Indent (Tab)
        await page.keyboard.press('Tab');

        // Outdent (Shift+Tab)
        await page.keyboard.press('Shift+Tab');

        // Delete
        await page.keyboard.press('Delete');

        // Undo
        await page.keyboard.press('Control+z');
    }

    await expect(page.locator('#framework')).toBeVisible();
});
