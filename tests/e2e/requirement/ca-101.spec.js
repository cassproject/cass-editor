const { test, expect, navigateToFramework } = require('../fixtures');

// CA-101: The RDF property shall specify a domain type
// Requirement: each property in the schema must have schema:domainIncludes
test('CA-101: RDF properties specify a domain type', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#frameworks')).toBeVisible();
    if (!await navigateToFramework(page)) return;

    // Wait for properties to render
    await page.locator('.headings-group').first().waitFor({ state: 'visible' });
    await page.waitForTimeout(2000);

    // Check that Property Vue components have schema:domainIncludes in their schema
    const result = await page.evaluate(() => {
        const propertyEls = document.querySelectorAll('.lode__Property');
        const properties = [];
        for (const el of propertyEls) {
            const vm = el.__vue__;
            if (vm && vm.schema) {
                const domain = vm.schema['http://schema.org/domainIncludes'];
                properties.push({
                    displayLabel: vm.displayLabel,
                    hasDomain: domain != null,
                    domainValue: domain ? JSON.stringify(domain) : null
                });
            }
        }
        return properties;
    });

    // There should be at least one Property component with schema
    expect(result.length).toBeGreaterThan(0);

    // Every property with a schema should have domainIncludes
    const withDomain = result.filter(p => p.hasDomain);
    expect(withDomain.length).toBe(result.length);
});
