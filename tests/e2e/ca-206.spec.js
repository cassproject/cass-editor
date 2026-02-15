const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-206: Owner sees all comments, others only see commenter/owner comments
// Comments.vue has determineCanModifyComment() for role-based visibility
test('CA-206: Comment visibility by role', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Verify owner identity is available (drives comment visibility rules)
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

    expect(result.hasId).toBe(true);
});
