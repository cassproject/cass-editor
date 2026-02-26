const { test, expect, loginAndNavigate } = require('../fixtures');

// CA-110: Owner access defined by @owner field in KBAC
// Requirement: create object with owner, verify @owner field is set in the data
test('CA-110: Owner access via KBAC @owner field', async ({ page }) => {
    await loginAndNavigate(page);
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();

    // Set up listener to capture the framework save API response
    const frameworkResponsePromise = page.waitForResponse(
        resp => resp.url().includes('/api/') && resp.request().method() === 'POST' && resp.status() === 200,
        { timeout: 30000 }
    );

    // Create a new framework — the logged-in user should automatically become the owner
    await page.click('#add-new-dropdown-toggle-button');
    await page.click('#add-new-dropdown-framework');

    // Wait for the framework editor to load
    await expect(page.locator('#framework')).toBeVisible();

    // The logged-in user created this framework, so:
    // 1. The editor toolbar should be visible (owner-level access)
    await expect(page.locator('#framework-editor-toolbar')).toBeVisible();

    // 2. Verify the @owner field is set on the framework data via the app's store
    const ownerInfo = await page.evaluate(() => {
        const store = window.app && window.app.$store;
        if (!store) return { error: 'no store' };
        const framework = store.state.editor && store.state.editor.framework;
        if (!framework) return { error: 'no framework in store' };
        return {
            hasOwner: Array.isArray(framework.owner) && framework.owner.length > 0,
            ownerCount: framework.owner ? framework.owner.length : 0,
            ownerType: typeof framework.owner
        };
    });

    expect(ownerInfo.hasOwner).toBe(true);
    expect(ownerInfo.ownerCount).toBeGreaterThanOrEqual(1);
});
