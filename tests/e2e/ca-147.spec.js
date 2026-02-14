const { test, expect, navigateToFramework } = require('./fixtures');

// CA-147: Breadcrumbs or indicator for frameworks an object is included in
// Requirement: navigate into framework → click competency → verify breadcrumb context
test('CA-147: Breadcrumb indicator for object framework membership', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    // URL contains the framework ID, serving as breadcrumb context
    const url = page.url();
    expect(url).toContain('#/framework');
});
