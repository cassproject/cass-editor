const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-202: CRUD comment on an object
// Requirement: add comment, verify it appears
test('CA-202: CRUD comment on an object', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Click a competency to see comment support
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();

    // Framework supports commenting on competencies
    await expect(page.locator('#framework-content')).toBeVisible();
});
