/**
 * Coverage: SideNav navigation and responsive narrow sidebar.
 * Derived from collect-coverage2.js sidenav session.
 * Exercises SideNav.vue, NarrowSideNav.vue, and App.vue sidebar logic.
 */

const { test, expect } = require('../fixtures');

test('SideNav: click navigation items and toggle narrow mode via viewport', async ({ page }) => {
    await page.goto('/#/?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#app')).toBeVisible();

    // Click SideNav buttons if visible
    const navButtons = [
        '#side-nav-frameworks-button',
        '#side-nav-concepts-button',
        '#side-nav-collections-button',
    ];

    for (const sel of navButtons) {
        const btn = page.locator(sel);
        const isVisible = await btn.isVisible().catch(() => false);
        if (isVisible) {
            await btn.click();
            await page.waitForLoadState('domcontentloaded');
        }
    }

    // Shrink viewport to trigger NarrowSideNav
    await page.setViewportSize({ width: 600, height: 800 });
    await expect(page.locator('#app')).toBeVisible();

    // Return to wide viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('#app')).toBeVisible();
});
