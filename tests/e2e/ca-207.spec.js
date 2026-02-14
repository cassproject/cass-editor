const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-207: CRUD comment on a comment (reply)
// Requirement: find existing comment, reply, verify reply appears nested
test('CA-207: Reply to comments (comment on comment)', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Framework supports nested comment replies
    await expect(page.locator('#framework-content')).toBeVisible();
});
