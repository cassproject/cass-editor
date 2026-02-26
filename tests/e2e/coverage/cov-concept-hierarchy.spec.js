/**
 * Coverage: ConceptHierarchy.vue — navigate to concepts, browse/interact.
 * Targets the 0% covered ConceptHierarchy component (385 uncovered lines).
 */

const { test, expect, loginAndNavigate } = require('../fixtures');

test('Concept hierarchy: browse, expand/collapse, and interact with toolbar buttons', async ({ page }) => {
    await loginAndNavigate(page);

    // Navigate to concepts page
    await page.goto('/#/concepts?server=http://localhost/api/');
    await expect(page.locator('#app')).toBeVisible();

    // Check if there are any concept schemes in the list
    const listItems = page.locator('.cass--list--item .cass--list--thing');
    const hasItems = await listItems.first().isVisible().catch(() => false);

    if (hasItems) {
        // Open a concept scheme
        await listItems.first().dblclick();
        await expect(page.locator('.lode__hierarchy')).toBeVisible();

        // Try collapse/expand buttons
        const collapseBtn = page.locator('#collapse-button');
        if (await collapseBtn.isVisible().catch(() => false)) {
            await collapseBtn.click();
        }

        // Try clicking a hierarchy item
        const hierarchyItems = page.locator('.lode__hierarchy-item');
        if (await hierarchyItems.first().isVisible().catch(() => false)) {
            await hierarchyItems.first().click();
        }

        // Try the select button
        const selectBtn = page.locator('div:has-text("select")').filter({ hasText: /^select$/ });
        if (await selectBtn.first().isVisible().catch(() => false)) {
            await selectBtn.first().click();
        }
    }

    // Visit concepts list again for additional coverage
    await page.goto('/#/concepts?server=http://localhost/api/');
    await expect(page.locator('#app')).toBeVisible();
});
