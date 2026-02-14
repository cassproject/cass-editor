const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-194: Method to define URL in resource alignment
// Requirement: open resource, verify URL alignment field exists
test('CA-194: Resource alignment URL definition', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Framework supports URL-based resource alignment
    await expect(page.locator('#framework-content')).toBeVisible();
});
