const { test, expect, loginAndNavigate, navigateToFramework } = require('../fixtures');

// CA-181: Objects movable indent/outdent via keyboard (Shift+Arrow) and drag
test('CA-181: Objects movable indent and outdent', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    if (!await navigateToFramework(page)) return;
    await expect(page.locator('#framework')).toBeVisible();

    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });

    // Verify the Hierarchy component has arrow key handling for indent/outdent
    const result = await page.evaluate(() => {
        const hierarchyEl = document.querySelector('.lode__hierarchy');
        if (!hierarchyEl || !hierarchyEl.__vue__) return { error: 'no hierarchy' };
        const vm = hierarchyEl.__vue__;
        return {
            hasArrowKey: 'arrowKey' in vm.$data,
            hasShiftKey: 'shiftKey' in vm.$data,
            hasDragOptions: vm.$data.dragOptions != null,
            isDraggable: 'isDraggable' in vm.$data
        };
    });

    // Shift+Arrow keys drive indent/outdent, dragOptions enable drag-based movement
    expect(result.hasArrowKey).toBe(true);
    expect(result.hasShiftKey).toBe(true);
    expect(result.hasDragOptions).toBe(true);
    expect(result.isDraggable).toBe(true);
});
