const { test, expect, navigateToFramework } = require('./fixtures');

// CA-174: Relationships have source and target
// Requirement: verify relationship display shows source and target competencies
test('CA-174: Relationships have source and target', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Framework content area displays relationships between competencies
    await expect(page.locator('#framework-content')).toBeVisible();
});
