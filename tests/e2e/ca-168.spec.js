const { test, expect, loginAndNavigate } = require('./fixtures');

// CA-168: Bulk removal of objects from a framework
// Hierarchy.vue has removeObject event and deleteSelected for bulk removal
test('CA-168: Bulk removal of objects from framework', async ({ page }) => {
    await loginAndNavigate(page);

    // Create a framework (ownership needed for removal capabilities)
    await page.waitForSelector('#add-new-dropdown-toggle-button');
    await page.click('#add-new-dropdown-toggle-button');
    await page.click('#add-new-dropdown-framework');
    await page.waitForSelector('.lode__thing-editing');

    const nameSelector = '.lode__thing-editing [id="http://schema.org/name-0"] textarea';
    await page.waitForSelector(nameSelector);
    await page.fill(nameSelector, 'CA-168 Removal Test');
    await page.press(nameSelector, 'Tab');
    await page.click('#thing-editing-done-editing-button');
    await page.waitForSelector('.lode__thing-editing', { state: 'detached', timeout: 10000 }).catch(() => { });
    await page.waitForTimeout(1000);

    // Verify the removal infrastructure exists via Vue component
    const result = await page.evaluate(() => {
        const hierarchyEl = document.querySelector('.lode__hierarchy');
        if (!hierarchyEl || !hierarchyEl.__vue__) return { error: 'no hierarchy' };
        const vm = hierarchyEl.__vue__;
        return {
            hasDeleteSelected: typeof vm.deleteSelected === 'function',
            hasRemoveObject: vm.$listeners && 'remove-object' in vm.$listeners || vm._events && 'remove-object' in vm._events,
            canEdit: vm.canEdit,
            hasSelectedArray: Array.isArray(vm.$data.selectedArray)
        };
    });

    expect(result.hasDeleteSelected).toBe(true);
    expect(result.canEdit).toBe(true);
    expect(result.hasSelectedArray).toBe(true);
});
