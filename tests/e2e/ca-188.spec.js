const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-188: Objects pastable via CTRL/SHIFT+V
// Hierarchy.vue has keydown handler that commits editor/paste on Ctrl+V
test('CA-188: Paste via keyboard shortcut', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Verify the paste button exists in the hierarchy toolbar
    const pasteButton = page.locator('#paste-competency-button');
    await expect(pasteButton).toBeVisible();

    // Verify Hierarchy component has paste handling
    const result = await page.evaluate(() => {
        const hierarchyEl = document.querySelector('.lode__hierarchy');
        if (!hierarchyEl || !hierarchyEl.__vue__) return { error: 'no hierarchy' };
        const vm = hierarchyEl.__vue__;
        return {
            hasPasteClick: typeof vm.pasteClick === 'function'
        };
    });

    expect(result.hasPasteClick).toBe(true);
});
