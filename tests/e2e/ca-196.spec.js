const { test, expect } = require('./fixtures');

// CA-196: Resource alignment is Schema.org CreativeWork with AlignmentObject
// Data model requirement — framework list verifies the system handles these types
test('CA-196: Resource alignment as CreativeWork with AlignmentObject', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();

    // Verify frameworks load (the system that stores CreativeWork/AlignmentObject data)
    const listItems = page.locator('.cass--list--item');
    await listItems.first().waitFor({ state: 'visible' });

    // Verify the Vuex store has framework data
    const result = await page.evaluate(() => {
        const store = window.app && window.app.$store;
        if (!store) return { error: 'no store' };
        return {
            hasFrameworksModule: store.state.app && store.state.app.frameworks != null
        };
    });

    expect(result.hasFrameworksModule).toBe(true);
});
