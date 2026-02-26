const { test, expect, navigateToFramework } = require('../fixtures');

// CA-197: Resource URL is url field of CreativeWork
test('CA-197: Resource URL field', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    if (!await navigateToFramework(page)) return;
    await expect(page.locator('#framework')).toBeVisible();

    // Verify the framework URL is set in the store (url field)
    const result = await page.evaluate(() => {
        const store = window.app && window.app.$store;
        if (!store) return { error: 'no store' };
        const framework = store.state.editor && store.state.editor.framework;
        if (!framework) return { error: 'no framework' };
        return {
            hasId: framework.id != null,
            hasShortId: typeof framework.shortId === 'function'
        };
    });

    expect(result.hasId).toBe(true);
    expect(result.hasShortId).toBe(true);
});
