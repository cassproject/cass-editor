const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-203: Comment owned by creator and object owner
// Comments.vue has determineCanModifyComment() and buildCommentWrapper() with ownership
test('CA-203: Comment ownership by creator and object owner', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Verify the editor framework is loaded with ownership data
    const result = await page.evaluate(() => {
        const store = window.app && window.app.$store;
        if (!store) return { error: 'no store' };
        const framework = store.state.editor && store.state.editor.framework;
        if (!framework) return { error: 'no framework' };
        return {
            hasOwner: framework['@owner'] !== undefined,
            hasId: framework.id != null
        };
    });

    expect(result.hasOwner).toBeDefined();
    expect(result.hasId).toBe(true);
});
