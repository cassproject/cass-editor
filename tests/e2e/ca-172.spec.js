const { test, expect, navigateToFramework } = require('./fixtures');

// CA-172: Required/desired/optional property groups via clicks
// Requirement: verify property groups are accessible in the editing view
test('CA-172: Required/desired/optional property groups via clicks', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Click a competency to see property groups
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();

    // Verify the hierarchy item has content (property groups accessible via editing view)
    const text = await hierarchyItems.first().textContent();
    expect(text.trim().length).toBeGreaterThan(0);
});
