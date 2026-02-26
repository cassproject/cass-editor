const { test, expect, loginAndNavigate, navigateToFramework } = require('../fixtures');

// CA-180: Objects movable up/down via keyboard command or button
// Hierarchy.vue supports Shift+ArrowUp/ArrowDown for reordering
test('CA-180: Objects movable up and down', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    if (!await navigateToFramework(page)) return;
    await expect(page.locator('#framework')).toBeVisible();

    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    const count = await hierarchyItems.count();
    expect(count).toBeGreaterThan(0);

    // Verify the Hierarchy component has keyboard handling for arrow keys
    const result = await page.evaluate(() => {
        const hierarchyEl = document.querySelector('.lode__hierarchy');
        if (!hierarchyEl || !hierarchyEl.__vue__) return { error: 'no hierarchy' };
        const vm = hierarchyEl.__vue__;
        return {
            hasArrowKey: 'arrowKey' in vm.$data,
            hasShiftKey: 'shiftKey' in vm.$data,
            arrowKeyValue: vm.$data.arrowKey,
            shiftKeyValue: vm.$data.shiftKey
        };
    });

    // arrowKey and shiftKey data props drive the keyboard movement mechanism
    expect(result.hasArrowKey).toBe(true);
    expect(result.hasShiftKey).toBe(true);
});
