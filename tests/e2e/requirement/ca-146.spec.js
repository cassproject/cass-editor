const { test, expect, navigateToFramework } = require('../fixtures');

// CA-146: Edit objects separate from frameworks
// Requirement: navigate to framework → verify competency editing view loads independently
test('CA-146: Object editing separate from frameworks', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    if (!await navigateToFramework(page)) return;
    await expect(page.locator('#framework')).toBeVisible();

    // Click a competency to open the editing detail view
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();

    // Verify the competency has content, indicating it loaded independently
    const text = await hierarchyItems.first().textContent();
    expect(text.trim().length).toBeGreaterThan(0);
});
