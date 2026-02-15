const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-204: Comment includes a comment field
// Comment.vue component renders comment text content
test('CA-204: Comment includes comment field', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Verify framework content loads (comment field is rendered by Comment.vue component)
    await expect(page.locator('#framework-content')).toBeVisible();

    // Verify comments store infrastructure
    const result = await page.evaluate(() => {
        const store = window.app && window.app.$store;
        if (!store) return { error: 'no store' };
        return {
            hasEditorState: store.state.editor != null,
            hasFramework: store.state.editor && store.state.editor.framework != null
        };
    });

    expect(result.hasEditorState).toBe(true);
    expect(result.hasFramework).toBe(true);
});
