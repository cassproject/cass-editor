const { test, expect, navigateToFramework } = require('./fixtures');

// CA-176: Relationships may carry additional data specified in configuration
test('CA-176: Relationships may carry additional configuration data', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    const hierarchyItems = page.locator('.lode__hierarchy-item');
    await hierarchyItems.first().waitFor({ state: 'visible' });
    await hierarchyItems.first().click();
    await page.waitForTimeout(1000);

    // Verify properties with schema-defined additional data fields exist
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

    // Properties with schema = configuration-driven additional data
    expect(result.length).toBeGreaterThan(0);
});
