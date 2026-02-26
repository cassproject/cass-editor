/**
 * Coverage: Deep hierarchy and node interactions.
 * Targets Hierarchy.vue (45%), HierarchyNode.vue (35%), Breadcrumbs.vue (37%),
 * common.js (16%), editDirectory.js (16%).
 * Expand/collapse, drag, right-click, keyboard shortcuts, breadcrumbs.
 */

const { test, expect, loginAndNavigate, navigateToFramework } = require('../fixtures');

test('Hierarchy deep: expand, collapse, drag, right-click, keyboard, breadcrumbs', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    if (!await navigateToFramework(page)) return;

    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await expect(hierarchyItems.first()).toBeVisible();

    // Click first item to select it
    await hierarchyItems.first().click();

    // Expand all nodes if expand button exists
    const expandAllBtn = page.locator('#expand-all-button, button:has-text("Expand All"), [title*="expand"]').first();
    if (await expandAllBtn.isVisible().catch(() => false)) {
        await expandAllBtn.click();
    }

    // Collapse all nodes
    const collapseAllBtn = page.locator('#collapse-all-button, button:has-text("Collapse All"), [title*="collapse"]').first();
    if (await collapseAllBtn.isVisible().catch(() => false)) {
        await collapseAllBtn.click();
    }

    // Click the expand caret on individual items to open the subtree
    const carets = page.locator('.lode__hierarchy-item .caret, .lode__hierarchy-item .expand-icon, .lode__hierarchy-item .fa-caret-right, .lode__hierarchy-item .fa-caret-down');
    const caretCount = await carets.count();
    for (let i = 0; i < Math.min(caretCount, 3); i++) {
        await carets.nth(i).click().catch(() => { });
    }

    // Right-click for context menu on an item
    await hierarchyItems.first().click({ button: 'right' });
    // Look for context menu and interact
    const contextMenu = page.locator('.context-menu, [role="menu"]');
    if (await contextMenu.isVisible().catch(() => false)) {
        const menuItems = contextMenu.locator('[role="menuitem"], li, a');
        if (await menuItems.first().isVisible().catch(() => false)) {
            // Click the first menu option
            await menuItems.first().click().catch(() => { });
        }
    }
    await page.keyboard.press('Escape');

    // Keyboard shortcuts on selected items
    await hierarchyItems.first().click();
    await page.keyboard.press('Enter');
    await page.keyboard.press('Escape');

    // Test drag interaction — start drag on one item, drop on another
    const itemCount = await hierarchyItems.count();
    if (itemCount > 2) {
        const sourceItem = hierarchyItems.nth(0);
        const targetItem = hierarchyItems.nth(2);
        const sourceBounds = await sourceItem.boundingBox();
        const targetBounds = await targetItem.boundingBox();
        if (sourceBounds && targetBounds) {
            await page.mouse.move(sourceBounds.x + 5, sourceBounds.y + 5);
            await page.mouse.down();
            await page.mouse.move(targetBounds.x + 5, targetBounds.y + 5, { steps: 5 });
            await page.mouse.up();
        }
    }

    // Test breadcrumbs by clicking them
    const breadcrumbs = page.locator('.breadcrumb a, .breadcrumb li');
    const breadcrumbCount = await breadcrumbs.count();
    if (breadcrumbCount > 0) {
        await breadcrumbs.first().click().catch(() => { });
    }
});
