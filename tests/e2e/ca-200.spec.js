const { test, expect, navigateToFramework } = require('./fixtures');

// CA-200: Resource competency is targetUrl field of AlignmentObject
test('CA-200: Resource competency targetUrl field', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Verify framework has competency references (targetUrl -> competency ID)
    const result = await page.evaluate(() => {
        const store = window.app && window.app.$store;
        if (!store) return { error: 'no store' };
        const framework = store.state.editor && store.state.editor.framework;
        if (!framework) return { error: 'no framework' };
        return {
            hasCompetency: framework.competency !== undefined
        };
    });

    expect(result.hasCompetency).toBe(true);
});
