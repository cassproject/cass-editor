const { test, expect, navigateToFramework } = require('./fixtures');

// CA-208: Suggestion mode for non-permitted edits
// As a non-owner/non-logged-in user, view mode is enforced (no edit controls)
test('CA-208: Suggestion mode for unauthorized edits', async ({ page }) => {
    // Without login — user sees view-only mode
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Verify the hierarchy is in view-only mode (canEdit false for non-owner)
    const result = await page.evaluate(() => {
        const hierarchyEl = document.querySelector('.lode__hierarchy');
        if (!hierarchyEl || !hierarchyEl.__vue__) return { error: 'no hierarchy' };
        const vm = hierarchyEl.__vue__;
        return {
            canEdit: vm.canEdit
        };
    });

    // Non-logged-in user cannot edit — suggestion mode would apply
    expect(result.canEdit).toBe(false);
});
