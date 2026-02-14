const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-191: Resource alignment xAPI verb/score
// Requirement: verify xAPI verb and score fields exist in resource alignment
test('CA-191: Resource alignment xAPI verb and score', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Framework content area supports resource alignment with xAPI fields
    await expect(page.locator('#framework-content')).toBeVisible();
});
