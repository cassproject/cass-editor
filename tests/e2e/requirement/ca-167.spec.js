const { test, expect, loginAndNavigate } = require('../fixtures');

// CA-167: Bulk deletion of objects from hierarchy or list
// Hierarchy.vue has #delete-competency-button for deletion
test('CA-167: Bulk deletion of objects from hierarchy or list', async ({ page }) => {
    await loginAndNavigate(page);

    // Create a framework (we need ownership for delete button visibility)
    await page.waitForSelector('#add-new-dropdown-toggle-button');
    await page.click('#add-new-dropdown-toggle-button');
    await page.click('#add-new-dropdown-framework');
    await page.waitForSelector('.lode__thing-editing');

    const nameSelector = '.lode__thing-editing [id="http://schema.org/name-0"] textarea';
    await page.waitForSelector(nameSelector);
    await page.fill(nameSelector, 'CA-167 Delete Test');
    await page.press(nameSelector, 'Tab');
    await page.click('#thing-editing-done-editing-button');
    await page.waitForSelector('.lode__thing-editing', { state: 'detached', timeout: 10000 }).catch(() => { });
    await page.waitForTimeout(1000);

    // Verify the bulk/selection infrastructure for deletion exists
    const result = await page.evaluate(() => {
        const hierarchyEl = document.querySelector('.lode__hierarchy');
        if (!hierarchyEl || !hierarchyEl.__vue__) return { error: 'no hierarchy' };
        const vm = hierarchyEl.__vue__;
        return {
            hasDeleteSelected: typeof vm.deleteSelected === 'function',
            canEdit: vm.canEdit,
            hasSelectAll: 'selectAll' in vm.$data
        };
    });

    expect(result.hasDeleteSelected).toBe(true);
    expect(result.canEdit).toBe(true);
    expect(result.hasSelectAll).toBe(true);
});
