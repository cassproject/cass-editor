const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-150: Property editing adheres to criticality rules (default: "optional")
// Analogous to CA-120 but for object-level properties
test('CA-150: Property editing adheres to criticality rules', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();
    await page.waitForTimeout(1000);

    // Verify isRequired computed property on Property components
    const result = await page.evaluate(() => {
        const propertyEls = document.querySelectorAll('.lode__Property');
        const props = [];
        for (const el of propertyEls) {
            const vm = el.__vue__;
            if (vm && vm.schema) {
                props.push({
                    displayLabel: vm.displayLabel,
                    isRequired: vm.isRequired
                });
            }
        }
        return props;
    });

    expect(result.length).toBeGreaterThan(0);
    for (const prop of result) {
        expect(typeof prop.isRequired).toBe('boolean');
    }
    // At least one required property (Name is required)
    const requiredProps = result.filter(p => p.isRequired);
    expect(requiredProps.length).toBeGreaterThan(0);
});
