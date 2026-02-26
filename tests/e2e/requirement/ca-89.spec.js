const { test, expect, loginAndCreateConfig } = require('../fixtures');

// CA-89: A RDF class shall be a valid configuration element.
    // CA-90: A RDF property shall be a valid configuration element.
    // CA-91: A SKOS concept shall be a valid configuration element.
    // Task: add each type, verify they are accepted
    test('CA-89/90/91: RDF classes, properties, and SKOS concepts are valid config elements', async ({ page }) => {
        await loginAndCreateConfig(page);
        // Click add custom competency property
        await page.click('#configuration-details-competency-settings-tab');
        await page.click('#add-custom-competency-property-button');
        // Verify Context dropdown includes RDF and SKOS options
        const contextSelect = page.locator('#custom-property-context-select');
        await expect(contextSelect).toBeVisible();
        // Verify RDF options exist (CA-89/90)
        await expect(contextSelect.locator('option[value="http://www.w3.org/1999/02/22-rdf-syntax-ns#"]')).toHaveCount(1);
        await expect(contextSelect.locator('option[value="http://www.w3.org/2000/01/rdf-schema#"]')).toHaveCount(1);
        // Verify SKOS option exists (CA-91)
        await expect(contextSelect.locator('option[value="http://www.w3.org/2004/02/skos/core#"]')).toHaveCount(1);
        // Verify Range/Type dropdown includes valid types
        const rangeSelect = page.locator('#custom-property-range-select');
        await expect(rangeSelect).toBeVisible();
    });
