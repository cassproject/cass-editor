const { test, expect, navigateToFramework } = require('./fixtures');

// CA-102: The RDF property shall specify a range type
// Requirement: each property in the schema must have schema:rangeIncludes
test('CA-102: RDF properties specify a range type', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);

    // Wait for properties to render
    await page.locator('.headings-group').first().waitFor({ state: 'visible' });
    await page.waitForTimeout(2000);

    // Check that Property Vue components have schema:rangeIncludes in their schema
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
                    rangeValue: range ? JSON.stringify(range) : null
                });
            }
        }
        return properties;
    });

    // There should be at least one Property component with schema
    expect(result.length).toBeGreaterThan(0);

    // Every property with a schema should have rangeIncludes
    const withRange = result.filter(p => p.hasRange);
    expect(withRange.length).toBe(result.length);
});
