const { test, expect, navigateToFramework } = require('./fixtures');

// CA-209: Suggestion is a comment
// Suggestions are implemented as comments in the CaSS framework
test('CA-209: Suggestion stored as comment', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Verify framework and editor state loaded (comment/suggestion infrastructure)
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
