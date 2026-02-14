const { test, expect, loginAndCreateConfig } = require('./fixtures');

// CA-94: Populate list of properties with relevant defaults
    // Task: open config, verify default property list comes from schema
    test('CA-94: Default properties are populated from CaSS Schema', async ({ page }) => {
        await loginAndCreateConfig(page);
        // Competency tab should have default properties
        await page.click('#configuration-details-competency-settings-tab');
        const propertyTable = page.locator('#competency-properties .table');
        await expect(propertyTable).toBeVisible();
        const rows = propertyTable.locator('tbody tr');
        const count = await rows.count();
        expect(count).toBeGreaterThan(0);
    });
