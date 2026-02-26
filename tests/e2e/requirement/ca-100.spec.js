const { test, expect, navigateToFramework } = require('../fixtures');

// CA-100: The RDF property shall specify a name
// Requirement: each property in the schema must have an rdfs:label
test('CA-100: RDF properties specify a name via rdfs:label', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#frameworks')).toBeVisible();
    if (!await navigateToFramework(page)) return;

    // Wait for properties to render
    await page.locator('.headings-group').first().waitFor({ state: 'visible' });
    await page.waitForTimeout(2000);

    // Check that Property Vue components have rdfs:label in their schema
    // and that the displayLabel computed property returns a non-empty name
    const result = await page.evaluate(() => {
        const propertyEls = document.querySelectorAll('.lode__Property');
        const properties = [];
        for (const el of propertyEls) {
            const vm = el.__vue__;
            if (vm && vm.schema) {
                const rdfsLabel = vm.schema['http://www.w3.org/2000/01/rdf-schema#label'];
                properties.push({
                    displayLabel: vm.displayLabel,
                    hasRdfsLabel: rdfsLabel != null,
                    rdfsLabelValue: rdfsLabel ? JSON.stringify(rdfsLabel) : null
                });
            }
        }
        return properties;
    });

    // There should be at least one Property component with schema
    expect(result.length).toBeGreaterThan(0);

    // Every property with a schema should have rdfs:label
    const withLabel = result.filter(p => p.hasRdfsLabel);
    expect(withLabel.length).toBe(result.length);

    // The displayLabel should be non-empty for all properties
    for (const prop of result) {
        expect(prop.displayLabel).toBeTruthy();
        expect(prop.displayLabel.length).toBeGreaterThan(0);
    }
});
