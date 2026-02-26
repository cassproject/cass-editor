const { test, expect, navigateToFramework } = require('../fixtures');

// CA-171: Primary properties shown at all times
// Requirement: verify hierarchy items display primary property text
test('CA-171: Primary properties shown at all times', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    if (!await navigateToFramework(page)) return;
    await expect(page.locator('#framework')).toBeVisible();

    // Hierarchy items display primary property text (competency names)
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    const firstItemText = await hierarchyItems.first().textContent();
    expect(firstItemText.trim().length).toBeGreaterThan(0);
});
