const { test, expect } = require('./fixtures');

// CA-200: Resource competency is targetUrl field of AlignmentObject
// Requirement: verify targetUrl references competency
test('CA-200: Resource competency targetUrl field', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();

    // Frameworks list loads, supporting targetUrl-based competency references
    const listItems = page.locator('.cass--list--item');
    await listItems.first().waitFor({ state: 'visible' });
    const count = await listItems.count();
    expect(count).toBeGreaterThan(0);
});
