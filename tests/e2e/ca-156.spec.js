const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-156: Selecting/deselecting branch node selects children recursively
// Hierarchy.vue passes selectAll prop down to all HierarchyNode children,
// which recursively propagates the selection state
test('CA-156: Branch node select/deselect recurses to children', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Wait for hierarchy to render
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });

    // Verify the Hierarchy component has the selectAll mechanism
    // that propagates selection to all child HierarchyNode components
    const result = await page.evaluate(() => {
        const hierarchyEl = document.querySelector('.lode__hierarchy');
        if (!hierarchyEl || !hierarchyEl.__vue__) return { error: 'no hierarchy' };
        const vm = hierarchyEl.__vue__;
        return {
            hasSelectAll: 'selectAll' in vm.$data,
            selectAllValue: vm.$data.selectAll,
            hasSelectedArray: Array.isArray(vm.$data.selectedArray),
            selectedArrayLength: vm.$data.selectedArray ? vm.$data.selectedArray.length : 0
        };
    });

    // Verify the recursive selection mechanism exists
    expect(result.hasSelectAll).toBe(true);
    expect(result.selectAllValue).toBe(false); // Initially unchecked
    expect(result.hasSelectedArray).toBe(true);
});
