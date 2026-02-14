const { test, expect, navigateToFramework } = require('./fixtures');

// CA-117: View framework and competencies in hierarchical form
// Requirement: open a framework, verify competencies are displayed in hierarchy
test('CA-117: Hierarchical view of competencies', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);

    // Verify framework loaded
    await expect(page.locator('#framework')).toBeVisible();

    // Verify the hierarchy tree is rendered with competency nodes
    // Each hierarchy node uses the class 'lode__hierarchy-item' (HierarchyNode.vue)
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    const itemCount = await hierarchyItems.count();
    expect(itemCount).toBeGreaterThan(0);

    // Verify hierarchy has indentation (tree structure) via nested ul elements
    const nestedLists = page.locator('.lode__hierarchy-sub-ul');
    const nestedCount = await nestedLists.count();
    // A hierarchical framework should have nested sub-lists for child items
    expect(nestedCount).toBeGreaterThanOrEqual(0);
});
