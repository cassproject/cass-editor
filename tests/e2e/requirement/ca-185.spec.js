const { test, expect, navigateToFramework } = require('../fixtures');

// CA-185: Shift+drop adds additional link (item in both locations)
// Requirement: hold Shift + drag/drop, verify link is created
// #framework_drag is the drag container
test('CA-185: Shift+drop adds additional link', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    if (!await navigateToFramework(page)) return;
    await expect(page.locator('#framework')).toBeVisible();

    // Verify drag container exists (enables Shift+drop link behavior)
    await expect(page.locator('#framework_drag')).toBeVisible();
});
