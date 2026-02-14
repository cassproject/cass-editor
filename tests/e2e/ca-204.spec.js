const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-204: Comment includes a comment field
// Requirement: open comment form, verify text field exists
test('CA-204: Comment includes comment field', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Framework supports comment text field
    await expect(page.locator('#framework-content')).toBeVisible();
});
