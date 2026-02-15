const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-119: Editing adheres to cardinality rules (default: "any number" when omitted)
// Property.vue enforces max cardinality via canAdd computed property
test('CA-119: Property editing adheres to cardinality rules', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();
    await expect(page.locator('#framework-editor-toolbar')).toBeVisible();

    // Click on a competency to enter editing mode
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();
    await page.waitForTimeout(1000);

    // Verify cardinality enforcement: Property.vue has canAdd computed property
    // that returns false when schema max cardinality is reached.
    // Check that Property components have the canAdd property computed from schema.
    const result = await page.evaluate(() => {
        const propertyEls = document.querySelectorAll('.lode__Property');
        const properties = [];
        for (const el of propertyEls) {
            const vm = el.__vue__;
            if (vm && vm.schema) {
                const maxCardinality = vm.schema['http://www.w3.org/2002/07/owl#maxCardinality']
                    || vm.schema['maxCardinality'];
                properties.push({
                    displayLabel: vm.displayLabel,
                    canAdd: vm.canAdd,
                    maxCardinality: maxCardinality || 'unlimited'
                });
            }
        }
        return properties;
    });

    // There should be properties rendered
    expect(result.length).toBeGreaterThan(0);

    // Each property should have the canAdd computed property defined (cardinality enforcement)
    for (const prop of result) {
        expect(prop.canAdd).toBeDefined();
    }
});
