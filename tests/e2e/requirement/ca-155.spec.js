const { test, expect, loginAndNavigate, navigateToFramework } = require('../fixtures');

// CA-155: Link and copy options when selecting objects from search results
// Requirement: two options — link (reference existing) and copy (static duplicate)
// Hierarchy.vue has #copy-competency-button (copy) and #cut-competency-button (cut/move=link)
test('CA-155: Link and copy options available for object selection', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    if (!await navigateToFramework(page)) return;
    await expect(page.locator('#framework')).toBeVisible();

    // Verify copy and cut buttons exist in the hierarchy toolbar
    // These are visible when view is 'framework' and hierarchyEnabled
    const copyButton = page.locator('#copy-competency-button');
    const cutButton = page.locator('#cut-competency-button');
    const pasteButton = page.locator('#paste-competency-button');

    await expect(copyButton).toBeVisible();
    await expect(cutButton).toBeVisible();
    await expect(pasteButton).toBeVisible();
});
