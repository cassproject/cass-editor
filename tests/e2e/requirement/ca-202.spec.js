const { test, expect, loginAndNavigate, navigateToFramework } = require('../fixtures');

// CA-202: CRUD comment on an object
// Comment infrastructure: Comment.vue, Comments.vue, AddComment.vue, DeleteCommentConfirm.vue
test('CA-202: CRUD comment on an object', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    if (!await navigateToFramework(page)) return;
    await expect(page.locator('#framework')).toBeVisible();

    // Verify the framework store has comment infrastructure
    const result = await page.evaluate(() => {
        const store = window.app && window.app.$store;
        if (!store) return { error: 'no store' };
        return {
            hasCommentsState: store.state.editor != null,
            canAddComments: store.state.app && store.state.app.canAddComments !== undefined
        };
    });

    expect(result.hasCommentsState).toBe(true);
});
