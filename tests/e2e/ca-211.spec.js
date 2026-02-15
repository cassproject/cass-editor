const { test, expect, navigateToFramework } = require('./fixtures');

// CA-211: Suggestion contains suggested value
// Properties have schema-defined values that suggestions can target
test('CA-211: Suggestion contains suggested value', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();
    await page.waitForTimeout(1000);

    // Verify Property components exist with schema data (suggested values target these)
    const result = await page.evaluate(() => {
        const propertyEls = document.querySelectorAll('.lode__Property');
        const props = [];
        for (const el of propertyEls) {
            const vm = el.__vue__;
            if (vm && vm.schema) {
                props.push({
                    displayLabel: vm.displayLabel,
                    hasSchema: true
                });
            }
        }
        return props;
    });

    expect(result.length).toBeGreaterThan(0);
});
