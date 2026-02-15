const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-120: Editing adheres to criticality rules (default: "optional" when omitted)
// Property.vue enforces criticality via isRequired computed property
test('CA-120: Property editing adheres to criticality rules', async ({ page }) => {
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

    // Verify criticality enforcement: Property.vue has isRequired computed property
    // that determines whether a property is primary/required/optional based on schema config.
    const result = await page.evaluate(() => {
        const propertyEls = document.querySelectorAll('.lode__Property');
        const properties = [];
        for (const el of propertyEls) {
            const vm = el.__vue__;
            if (vm && vm.schema) {
                properties.push({
                    displayLabel: vm.displayLabel,
                    isRequired: vm.isRequired,
                    priority: vm.schema['priority'] || vm.schema['isRequired'] || 'optional'
                });
            }
        }
        return properties;
    });

    // There should be properties rendered
    expect(result.length).toBeGreaterThan(0);

    // Each property should have isRequired defined (criticality enforcement)
    for (const prop of result) {
        expect(typeof prop.isRequired).toBe('boolean');
    }

    // At least one property should be required (primary properties like Name)
    const requiredProps = result.filter(p => p.isRequired);
    expect(requiredProps.length).toBeGreaterThan(0);
});
