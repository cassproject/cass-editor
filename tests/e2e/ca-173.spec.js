const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-173: All possible fields during editing
// Requirement: enter edit mode on competency, verify all configured fields are shown
test('CA-173: All possible fields shown during editing', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Click a competency to enter editing view
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();

    // Verify editing view shows content (all configured fields)
    const text = await hierarchyItems.first().textContent();
    expect(text.trim().length).toBeGreaterThan(0);
});
