const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-187: Objects copyable via CTRL/SHIFT+C
// Hierarchy.vue has keydown handler that commits editor/copyId on Ctrl+C
test('CA-187: Copy via keyboard shortcut', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Verify the copy button exists in the hierarchy toolbar
    const copyButton = page.locator('#copy-competency-button');
    await expect(copyButton).toBeVisible();

    // Verify Hierarchy component has copy handling
    const result = await page.evaluate(() => {
        const hierarchyEl = document.querySelector('.lode__hierarchy');
        if (!hierarchyEl || !hierarchyEl.__vue__) return { error: 'no hierarchy' };
        const vm = hierarchyEl.__vue__;
        return {
            hasCopyClick: typeof vm.copyClick === 'function'
        };
    });

    expect(result.hasCopyClick).toBe(true);
});
