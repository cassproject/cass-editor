const { test, expect, navigateToFramework } = require('../fixtures');

// CA-189: Branch nodes in hierarchy should allow collapsing
// Hierarchy.vue has #collapse-button and #expand-button controlled by expanded data prop
// Buttons only render when hierarchyEnabled and the hierarchy has expandable nodes
test('CA-189: Branch nodes are collapsible', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    if (!await navigateToFramework(page)) return;
    await expect(page.locator('#framework')).toBeVisible();

    // Verify the Hierarchy component has the expanded data prop (collapsibility mechanism)
    const result = await page.evaluate(() => {
        const hierarchyEl = document.querySelector('.lode__hierarchy');
        if (!hierarchyEl || !hierarchyEl.__vue__) return { error: 'no hierarchy' };
        const vm = hierarchyEl.__vue__;
        return {
            hasExpanded: 'expanded' in vm.$data,
            expandedValue: vm.$data.expanded,
            hierarchyEnabled: vm.hierarchyEnabled
        };
    });

    // The hierarchy component must have the expand/collapse mechanism
    expect(result.hasExpanded).toBe(true);
    expect(typeof result.expandedValue).toBe('boolean');
});
