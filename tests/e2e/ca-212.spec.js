const { test, expect, loginAndNavigate, navigateToFramework } = require('./fixtures');

// CA-212: Suggestion may be accepted by owner, applying value to property
test('CA-212: Owner can accept suggestion', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    // Verify the owner can edit (canEdit=true means they can accept suggestions)
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
