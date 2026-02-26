/**
 * Coverage: Feature flags via URL parameters.
 * Derived from collect-coverage2.js feature-flags session.
 * Exercises featuresFlags.js store, App.vue conditionals, and route-specific rendering.
 */

const { test, expect } = require('../fixtures');

test('Feature flags: exercise various URL parameter combinations', async ({ page }) => {
    const paramSets = [
        'ceasnDataFields=true',
        'concepts=true',
        'view=true',
        'select=Add',
        'singleSelect=Select',
        'selectVerbose=true',
        'frameworksPage=true',
        'disableAssertions=true',
        'private=true',
        'show=mine',
        'ownedByMe=true',
        'concepts=true&frameworksPage=true',
        'ceasnDataFields=true&view=true',
    ];

    for (const params of paramSets) {
        await page.goto(`/#/?server=http://localhost/api/&${params}`);
        await page.waitForLoadState('domcontentloaded');
        await expect(page.locator('#app')).toBeVisible();
    }

    // Verify the store captured at least some of these flags
    const result = await page.evaluate(() => {
        const store = window.app && window.app.$store;
        if (!store) return null;
        return {
            hasEditorState: !!store.state.editor,
            hasFeaturesState: !!store.state.featuresEnabled
        };
    });

    expect(result).toBeTruthy();
    expect(result.hasEditorState).toBe(true);
    expect(result.hasFeaturesState).toBe(true);
});
