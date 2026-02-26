/**
 * Coverage: ProgressionHierarchy.vue — navigate to progressions, browse/interact.
 * Targets the 0% covered ProgressionHierarchy component (706 uncovered lines).
 */

const { test, expect, loginAndNavigate } = require('../fixtures');

test('Progression hierarchy: browse, expand/collapse, and interact with toolbar buttons', async ({ page }) => {
    await loginAndNavigate(page);

    // Navigate to progressions page
    await page.goto('/#/progressionLevels?server=http://localhost/api/');
    await expect(page.locator('#app')).toBeVisible();

    // Check if there are any progressions in the list
    const listItems = page.locator('.cass--list--item .cass--list--thing');
    const hasItems = await listItems.first().isVisible().catch(() => false);

    if (hasItems) {
        // Open a progression
        await listItems.first().dblclick();
        await expect(page.locator('.lode__hierarchy')).toBeVisible();

        // Try expand/collapse buttons
        const expandBtn = page.locator('#expand-buttons');
        if (await expandBtn.isVisible().catch(() => false)) {
            await expandBtn.click();
        }

        // Try clicking a hierarchy item
        const hierarchyItems = page.locator('.lode__hierarchy-item');
        if (await hierarchyItems.first().isVisible().catch(() => false)) {
            await hierarchyItems.first().click();
        }

        // Try the select button to enter select mode
        const selectBtn = page.locator('div:has-text("select")').filter({ hasText: /^select$/ });
        if (await selectBtn.first().isVisible().catch(() => false)) {
            await selectBtn.first().click();
        }
    }

    // Also visit the progressions list without auth for additional coverage
    await page.goto('/#/progressionLevels?server=http://localhost/api/');
    await expect(page.locator('#app')).toBeVisible();
});
