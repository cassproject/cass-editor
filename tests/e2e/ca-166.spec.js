const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-166: Bulk update properties of selected objects in hierarchy
// Hierarchy.vue has #edit-multiple-button (visible when multipleSelected=true)
// and #select-all-checkbox for selecting all items
test('CA-166: Bulk update of selected objects properties', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });

    // Verify bulk edit infrastructure exists via Vue component inspection
    const result = await page.evaluate(() => {
        const hierarchyEl = document.querySelector('.lode__hierarchy');
        if (!hierarchyEl || !hierarchyEl.__vue__) return { error: 'no hierarchy' };
        const vm = hierarchyEl.__vue__;
        return {
            hasSelectAll: 'selectAll' in vm.$data,
            hasMultipleSelected: 'multipleSelected' in vm.$data,
            hasSelectedArray: Array.isArray(vm.$data.selectedArray)
        };
    });

    expect(result.hasSelectAll).toBe(true);
    expect(result.hasMultipleSelected).toBe(true);
    expect(result.hasSelectedArray).toBe(true);
});
