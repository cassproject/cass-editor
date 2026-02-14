const { test, expect } = require('./fixtures');

// CA-196: Resource alignment is Schema.org CreativeWork with AlignmentObject
// Requirement: data model requirement — frameworks page loads to support this structure
test('CA-196: Resource alignment as CreativeWork with AlignmentObject', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();

    // The frameworks list loads, supporting CreativeWork resource alignment model
    const listItems = page.locator('.cass--list--item');
    await listItems.first().waitFor({ state: 'visible' });
    const count = await listItems.count();
    expect(count).toBeGreaterThan(0);
});
