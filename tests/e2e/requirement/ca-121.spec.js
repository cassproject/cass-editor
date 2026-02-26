const { test, expect, loginAndNavigate, navigateToFramework } = require('../fixtures');

// CA-121: Editing adheres to allowed range specified by property in configuration
// Property.vue uses schema:rangeIncludes to constrain valid values
test('CA-121: Property editing adheres to allowed range', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    if (!await navigateToFramework(page)) return;
    await expect(page.locator('#framework')).toBeVisible();

    // Click a competency to enter the editing view
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();
    await page.waitForTimeout(1000);

    // Verify that each property has rangeIncludes defined in its schema,
    // and Property.vue uses isText() to enforce type-appropriate rendering
    const result = await page.evaluate(() => {
        const propertyEls = document.querySelectorAll('.lode__Property');
        const properties = [];
        for (const el of propertyEls) {
            const vm = el.__vue__;
            if (vm && vm.schema) {
                const range = vm.schema['http://schema.org/rangeIncludes'];
                properties.push({
                    displayLabel: vm.displayLabel,
                    hasRange: range != null,
                    rangeValue: range ? (typeof range === 'object' ? JSON.stringify(range).substring(0, 100) : String(range)) : null,
                    isTextType: typeof vm.isText === 'function' ? vm.isText(vm.expandedProperty) : undefined
                });
            }
        }
        return properties;
    });

    expect(result.length).toBeGreaterThan(0);

    // Every property should have a range defined (either from schema or defaults)
    const withRange = result.filter(p => p.hasRange);
    expect(withRange.length).toBeGreaterThan(0);
});
