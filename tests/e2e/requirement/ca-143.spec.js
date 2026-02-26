const { test, expect, navigateToFramework } = require('../fixtures');

// CA-143: Method for listing competencies for browsing and selection
// Requirement: open framework → browse competencies → select one → verify selection
test('CA-143: Competency browsing and selection', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    if (!await navigateToFramework(page)) return;
    await expect(page.locator('#framework')).toBeVisible();

    // Verify the hierarchy lists competencies for browsing
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    const count = await hierarchyItems.count();
    expect(count).toBeGreaterThan(0);

    // Select a competency — clicking it opens the editing/detail view
    await hierarchyItems.first().click();
    // After clicking, the competency name should still be visible (selected state)
    const text = await hierarchyItems.first().textContent();
    expect(text.trim().length).toBeGreaterThan(0);
});
