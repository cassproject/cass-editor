const { test, expect, navigateToFramework } = require('../fixtures');

// CA-201: Resource framework is targetFramework field of AlignmentObject
test('CA-201: Resource framework targetFramework field', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    if (!await navigateToFramework(page)) return;
    await expect(page.locator('#framework')).toBeVisible();

    // Verify framework has an ID (the targetFramework reference)
    const result = await page.evaluate(() => {
        const store = window.app && window.app.$store;
        if (!store) return { error: 'no store' };
        const framework = store.state.editor && store.state.editor.framework;
        if (!framework) return { error: 'no framework' };
        return {
            hasId: framework.id != null,
            idIsUrl: typeof framework.id === 'string' && framework.id.startsWith('http')
        };
    });

    expect(result.hasId).toBe(true);
    expect(result.idIsUrl).toBe(true);
});
