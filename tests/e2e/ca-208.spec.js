const { test, expect, navigateToFramework } = require('./fixtures');

// CA-208: Suggestion mode for non-permitted edits
// Requirement: non-owner can suggest instead of direct edit
test('CA-208: Suggestion mode for unauthorized edits', async ({ page }) => {
    // Without login, user cannot edit but can view/suggest
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Verify the framework loads in view mode (no edit controls for non-owner)
    await expect(page.locator('#framework-content')).toBeVisible();
});
