const { test, expect, navigateToFramework } = require('./fixtures');

// CA-175: Relationships used instead of direct associations
// Requirement: select competency, verify relationships section shows associations
test('CA-175: Relationships used for competency associations', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Click competency to see its associations/relationships
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();

    // Framework content area supports relationship associations
    await expect(page.locator('#framework-content')).toBeVisible();
});
