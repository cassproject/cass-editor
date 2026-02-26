const { test, expect, loginAndCreateConfig } = require('../fixtures');

// CA-93: Populate list of classes with relevant defaults
    // Task: open config, verify default class list comes from schema
    test('CA-93: Default classes are populated from CaSS Schema', async ({ page }) => {
        await loginAndCreateConfig(page);
        // Framework tab should have default properties already listed
        await page.click('#configuration-details-framework-tab');
        // Verify default properties are pre-populated in the framework property table
        const propertyTable = page.locator('#framework-properties .table');
        await expect(propertyTable).toBeVisible();
        const rows = propertyTable.locator('tbody tr');
        const count = await rows.count();
        expect(count).toBeGreaterThan(0);
    });
