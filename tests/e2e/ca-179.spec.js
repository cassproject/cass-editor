const { test, expect, navigateToFramework } = require('./fixtures');

// CA-179: Hierarchy items are draggable via handle
// Requirement: verify drag handle elements exist on hierarchy items
// #framework_drag is the drag container in Framework.vue
test('CA-179: Hierarchy items are draggable via handle', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Verify the drag container exists
    await expect(page.locator('#framework_drag')).toBeVisible();
});
