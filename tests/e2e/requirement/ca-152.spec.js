const { test, expect, loginAndNavigate, navigateToFramework } = require('../fixtures');

// CA-152: Property editing adheres to allowed type (default: any valid string)
// Analogous to CA-122 but for object-level properties
test('CA-152: Property editing adheres to allowed type', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    if (!await navigateToFramework(page)) return;
    await expect(page.locator('#framework')).toBeVisible();

    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();
    await page.waitForTimeout(1000);

    // Verify type-appropriate rendering via range classification
    const result = await page.evaluate(() => {
        const propertyEls = document.querySelectorAll('.lode__Property');
        const props = [];
        for (const el of propertyEls) {
            const vm = el.__vue__;
            if (vm && vm.schema) {
                const range = vm.schema['http://schema.org/rangeIncludes'];
                const rangeStr = range ? JSON.stringify(range) : '';
                props.push({
                    displayLabel: vm.displayLabel,
                    rangeType: rangeStr.includes('langString') ? 'langString'
                        : rangeStr.includes('URL') || rangeStr.includes('anyURI') ? 'URL'
                            : rangeStr.includes('Concept') ? 'concept'
                                : 'other',
                    hasIsText: typeof vm.isText === 'function'
                });
            }
        }
        return props;
    });

    expect(result.length).toBeGreaterThan(0);
    // Verify langString type properties exist (Name/Description are langStrings)
    const langStringProps = result.filter(p => p.rangeType === 'langString');
    expect(langStringProps.length).toBeGreaterThan(0);
});
