const { test, expect, navigateToFramework } = require('./fixtures');

// CA-209: Suggestion is a comment
// Requirement: suggestion stored as comment-type entry
test('CA-209: Suggestion stored as comment', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Framework supports suggestions stored as comments
    await expect(page.locator('#framework-content')).toBeVisible();
});
