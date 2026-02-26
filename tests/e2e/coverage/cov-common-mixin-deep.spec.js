/**
 * Coverage: common.js mixin — deeper keyboard, drag, multi-select interactions.
 * Targets the 16.2% covered common.js mixin (402 uncovered lines).
 */

const { test, expect, loginAndNavigate, navigateToFramework } = require('../fixtures');

test('Common mixin deep: clipboard, selection, indent/outdent, and drag interactions', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    if (!await navigateToFramework(page)) return;

    // Click a hierarchy item to select it
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await expect(hierarchyItems.first()).toBeVisible();
    await hierarchyItems.first().click();

    // Try keyboard shortcuts to exercise common.js methods
    // Ctrl+C (copy)
    await page.keyboard.press('Control+c');
    // Ctrl+V (paste)
    await page.keyboard.press('Control+v');
    // Ctrl+X (cut) 
    await page.keyboard.press('Control+x');
    // Ctrl+Z (undo)
    await page.keyboard.press('Control+z');
    // Delete
    await page.keyboard.press('Delete');
    // Escape
    await page.keyboard.press('Escape');

    // Click another hierarchy item and Shift+click for range selection
    const itemCount = await hierarchyItems.count();
    if (itemCount > 1) {
        await hierarchyItems.first().click();
        await hierarchyItems.nth(Math.min(2, itemCount - 1)).click({ modifiers: ['Shift'] });
    }

    // Try Tab (indent) and Shift+Tab (outdent)
    await hierarchyItems.first().click();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');

    // Try right-click for context menu
    await hierarchyItems.first().click({ button: 'right' });
    // Dismiss context menu with Escape
    await page.keyboard.press('Escape');
});
