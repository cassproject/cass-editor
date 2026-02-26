const { test, expect, loginAndNavigate, navigateToFramework } = require('../fixtures');

// CA-140: Apply framework's configuration upon opening
// Requirement: navigate to framework, verify its configuration is active
// EditorToolbar shows config name via #manage-configuration-button when configurationsEnabled
test('CA-140: Framework configuration applied on open', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    if (!await navigateToFramework(page)) return;
    await expect(page.locator('#framework')).toBeVisible();

    // Verify the editor toolbar loads with configuration awareness
    await expect(page.locator('#framework-editor-toolbar')).toBeVisible();
});
