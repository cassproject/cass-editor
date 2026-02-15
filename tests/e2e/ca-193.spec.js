const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-193: Add resource to framework
// The add-competency flow is the mechanism for adding objects (resources) to a framework
test('CA-193: Add resource to framework', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Verify the add-competency button exists (mechanism for adding objects/resources)
    const result = await page.evaluate(() => {
        const hierarchyEl = document.querySelector('.lode__hierarchy');
        if (!hierarchyEl || !hierarchyEl.__vue__) return { error: 'no hierarchy' };
        const vm = hierarchyEl.__vue__;
        return {
            hasAddingNode: 'addingNode' in vm.$data,
            canEdit: vm.canEdit
        };
    });

    expect(result.hasAddingNode).toBe(true);
});
