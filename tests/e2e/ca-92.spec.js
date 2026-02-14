const { test, expect, loginAndCreateConfig } = require('./fixtures');

// CA-92: RDF property shall constrain users to valid range specified by SKOS concepts
    // Task: add RDF property, verify range dropdown shows valid SKOS values
    test('CA-92: RDF property constrains to valid SKOS range', async ({ page }) => {
        await loginAndCreateConfig(page);
        await page.click('#configuration-details-competency-settings-tab');
        await page.click('#add-custom-competency-property-button');
        // Verify range select includes SKOS Concept as a valid range type
        const rangeSelect = page.locator('#custom-property-range-select');
        await expect(rangeSelect).toBeVisible();
        await expect(rangeSelect.locator('option[value="https://schema.cassproject.org/0.4/skos/Concept"]')).toHaveCount(1);
    });
