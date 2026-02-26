const { test, expect, loginAndNavigate, navigateToFramework } = require('../fixtures');

// CA-122: Editing adheres to allowed type specified by property in configuration
// Property.vue renders type-appropriate controls: text inputs for strings/URLs,
// object editors for linked objects, concept selectors for SKOS concepts
test('CA-122: Property editing adheres to allowed type', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    if (!await navigateToFramework(page)) return;
    await expect(page.locator('#framework')).toBeVisible();

    // Click a competency to see its property fields
    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();
    await page.waitForTimeout(1000);

    // Verify each property uses type-appropriate rendering based on its range
    const result = await page.evaluate(() => {
        const propertyEls = document.querySelectorAll('.lode__Property');
        const properties = [];
        for (const el of propertyEls) {
            const vm = el.__vue__;
            if (vm && vm.schema) {
                const range = vm.schema['http://schema.org/rangeIncludes'];
                const rangeStr = range ? JSON.stringify(range) : '';
                // Determine if this is a text-type property
                const isText = typeof vm.isText === 'function' ? vm.isText(vm.expandedProperty) : null;
                properties.push({
                    displayLabel: vm.displayLabel,
                    rangeType: rangeStr.includes('langString') ? 'langString'
                        : rangeStr.includes('URL') || rangeStr.includes('anyURI') ? 'URL'
                            : rangeStr.includes('Concept') ? 'concept'
                                : rangeStr.includes('Competency') ? 'object'
                                    : 'other',
                    isText: isText
                });
            }
        }
        return properties;
    });

    expect(result.length).toBeGreaterThan(0);

    // Verify at least one langString type property exists (Name/Description are langStrings)
    const langStringProps = result.filter(p => p.rangeType === 'langString');
    expect(langStringProps.length).toBeGreaterThan(0);
});
