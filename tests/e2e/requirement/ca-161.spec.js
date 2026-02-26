const { test, expect, navigateToFramework } = require('../fixtures');

// CA-161: Show primary properties when viewing object
// Requirement: open framework → verify hierarchy items display primary property text
test('CA-161: Primary properties shown when viewing object', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    if (!await navigateToFramework(page)) return;
    await expect(page.locator('#framework')).toBeVisible();

    // Verify hierarchy items display primary property text (competency names)
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    const firstItemText = await hierarchyItems.first().textContent();
    expect(firstItemText.trim().length).toBeGreaterThan(0);
});
