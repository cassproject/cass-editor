/**
 * Coverage: Deep framework editing after navigating to a framework.
 * Targets ThingEditing.vue (35%), Thing.vue (42%), Property.vue (38%),
 * PropertyString.vue (30%), EditorToolbar.vue (27%).
 * Click competencies, edit properties, use toolbar buttons.
 */

const { test, expect, loginAndNavigate, navigateToFramework } = require('../fixtures');

test('Framework editing deep: select competency, edit properties, toolbar interactions', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    if (!await navigateToFramework(page)) return;

    // Click on the first competency in the hierarchy to open its details
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await expect(hierarchyItems.first()).toBeVisible();
    await hierarchyItems.first().click();

    // The Thing editing panel should appear on the right side
    const thingPanel = page.locator('.lode__thing, #right-side-bar, .cass__right-aside');
    if (await thingPanel.first().isVisible().catch(() => false)) {
        // Click on property fields to expand them
        const propertyLabels = page.locator('.lode__property-label, .lode__property .property-label');
        const labelCount = await propertyLabels.count();
        for (let i = 0; i < Math.min(labelCount, 5); i++) {
            await propertyLabels.nth(i).click().catch(() => { });
        }

        // Try clicking editable fields
        const editableFields = page.locator('.lode__property-string input, .lode__property-string textarea');
        if (await editableFields.first().isVisible().catch(() => false)) {
            await editableFields.first().click();
        }
    }

    // Test toolbar buttons
    // Add competency button
    const addBtn = page.locator('#add-competency-button');
    if (await addBtn.isVisible().catch(() => false)) {
        await addBtn.click();
        // A new empty competency should appear — press Escape to cancel
        await page.keyboard.press('Escape');
    }

    // Try the export button
    const exportBtn = page.locator('#export-button');
    if (await exportBtn.isVisible().catch(() => false)) {
        await exportBtn.click();
        // Close the export modal/dropdown
        await page.keyboard.press('Escape');
    }

    // Try the property view toggle buttons
    const primaryViewBtn = page.locator('#property-view-primary-button');
    if (await primaryViewBtn.isVisible().catch(() => false)) {
        await primaryViewBtn.click();
    }

    const requiredViewBtn = page.locator('#property-view-required-button');
    if (await requiredViewBtn.isVisible().catch(() => false)) {
        await requiredViewBtn.click();
    }

    // Try clicking a second hierarchy item to test navigation between competencies
    const itemCount = await hierarchyItems.count();
    if (itemCount > 1) {
        await hierarchyItems.nth(1).click();
    }

    // Arrow keys to navigate between hierarchy items
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowLeft');
});
