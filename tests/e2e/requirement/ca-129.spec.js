const { test, expect, navigateToFramework } = require('../fixtures');

// CA-129: Show primary properties when viewing a framework
// Requirement: verify primary properties are displayed when viewing a framework
test('CA-129: Primary properties shown when viewing framework', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#frameworks')).toBeVisible();
    if (!await navigateToFramework(page)) return;

    // Verify the framework view shows primary properties
    await expect(page.locator('#framework')).toBeVisible();

    // The hierarchy items display the primary property (name) of each competency
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    const firstItemText = await hierarchyItems.first().textContent();
    expect(firstItemText.trim().length).toBeGreaterThan(0);
});
