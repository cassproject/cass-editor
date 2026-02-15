const { test, expect, navigateToFramework } = require('./fixtures');

// CA-189: Branch nodes in hierarchy should allow collapsing
// Hierarchy.vue has #collapse-button and #expand-button, with expanded data prop
test('CA-189: Branch nodes are collapsible', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Verify collapse/expand buttons exist
    const collapseButton = page.locator('#collapse-button');
    const expandButton = page.locator('#expand-button');

    // One of the two should be visible (collapsed or expanded state)
    const collapseVisible = await collapseButton.isVisible();
    const expandVisible = await expandButton.isVisible();
    expect(collapseVisible || expandVisible).toBe(true);

    // Verify the Hierarchy component has expanded data prop
    const result = await page.evaluate(() => {
        const hierarchyEl = document.querySelector('.lode__hierarchy');
        if (!hierarchyEl || !hierarchyEl.__vue__) return { error: 'no hierarchy' };
        const vm = hierarchyEl.__vue__;
        return {
            hasExpanded: 'expanded' in vm.$data,
            expandedValue: vm.$data.expanded
        };
    });

    expect(result.hasExpanded).toBe(true);
});
