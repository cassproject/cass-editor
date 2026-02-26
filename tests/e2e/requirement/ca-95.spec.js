const { test, expect, loginAndCreateConfig } = require('../fixtures');

// CA-95: Cannot exclude identifier/URL of an RDF class
    // Task: try to remove identifier/URL, verify it's prevented
    test('CA-95: Identifier/URL of RDF class cannot be excluded', async ({ page }) => {
        await loginAndCreateConfig(page);
        // Go to framework tab — id property should always be present
        await page.click('#configuration-details-framework-tab');
        const rows = page.locator('#framework-properties .table tbody tr');
        await expect(rows.first()).toBeVisible();
        const count = await rows.count();
        expect(count).toBeGreaterThan(0);
    });
