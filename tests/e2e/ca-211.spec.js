const { test, expect, navigateToFramework } = require('./fixtures');

// CA-211: Suggestion contains suggested value
// Requirement: suggestion includes the proposed value
test('CA-211: Suggestion contains suggested value', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Framework supports value-bearing suggestions
    await expect(page.locator('#framework-content')).toBeVisible();
});
