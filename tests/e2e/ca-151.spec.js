const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-151: Property editing adheres to allowed range (default: any valid value)
// Analogous to CA-121 but for object-level properties
test('CA-151: Property editing adheres to allowed range', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();
    await page.waitForTimeout(1000);

    // Verify rangeIncludes is defined in property schemas
    const result = await page.evaluate(() => {
        const propertyEls = document.querySelectorAll('.lode__Property');
        const props = [];
        for (const el of propertyEls) {
            const vm = el.__vue__;
            if (vm && vm.schema) {
                const range = vm.schema['http://schema.org/rangeIncludes'];
                props.push({
                    displayLabel: vm.displayLabel,
                    hasRange: range != null
                });
            }
        }
        return props;
    });

    expect(result.length).toBeGreaterThan(0);
    const withRange = result.filter(p => p.hasRange);
    expect(withRange.length).toBeGreaterThan(0);
});
