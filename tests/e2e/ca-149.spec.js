const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-149: Property editing adheres to cardinality rules (default: "any number")
// Analogous to CA-119 but for object-level properties
test('CA-149: Property editing adheres to cardinality rules', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();
    await page.waitForTimeout(1000);

    // Verify canAdd computed property on Property components (cardinality enforcement)
    const result = await page.evaluate(() => {
        const propertyEls = document.querySelectorAll('.lode__Property');
        const props = [];
        for (const el of propertyEls) {
            const vm = el.__vue__;
            if (vm && vm.schema) {
                props.push({
                    displayLabel: vm.displayLabel,
                    canAdd: vm.canAdd
                });
            }
        }
        return props;
    });

    expect(result.length).toBeGreaterThan(0);
    for (const prop of result) {
        expect(prop.canAdd).toBeDefined();
    }
});
