const { test, expect, navigateToFramework } = require('./fixtures');

// CA-99: The RDF property shall specify a description
// Requirement: Users shall be able to see the definitions of all properties
// from the CaSS Editor UI (e.g. as tooltips)
test('CA-99: Property labels display description tooltips', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);

    // Click "Tertiary" to show all property levels including URL properties
    // which render visible span.tag labels with tooltips
    await page.getByText('Tertiary', { exact: true }).click();
    await page.waitForTimeout(1000);

    // Find a visible property label tag with a title attribute
    const tagWithTitle = page.locator('.lode__Property span.tag.is-light[title]:not(.language)');
    await tagWithTitle.first().waitFor({ state: 'visible' });

    // Verify the tooltip contains descriptive text from rdfs:comment
    const title = await tagWithTitle.first().getAttribute('title');
    expect(title).toBeTruthy();
    expect(title.trim().length).toBeGreaterThan(5);
});
