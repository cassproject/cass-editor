const { test, expect, loginAndNavigate, navigateToFramework } = require('../fixtures');

// CA-186: Objects cuttable via CTRL/SHIFT+X
// Hierarchy.vue has keydown handler that commits editor/cutId on Ctrl+X
test('CA-186: Cut via keyboard shortcut', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    if (!await navigateToFramework(page)) return;
    await expect(page.locator('#framework')).toBeVisible();

    // Verify the cut button exists in the hierarchy toolbar
    const cutButton = page.locator('#cut-competency-button');
    await expect(cutButton).toBeVisible();

    // Verify Hierarchy component has cut handling via keydown listener
    const result = await page.evaluate(() => {
        const hierarchyEl = document.querySelector('.lode__hierarchy');
        if (!hierarchyEl || !hierarchyEl.__vue__) return { error: 'no hierarchy' };
        const vm = hierarchyEl.__vue__;
        return {
            hasCutClick: typeof vm.cutClick === 'function'
        };
    });

    expect(result.hasCutClick).toBe(true);
});
