/**
 * Coverage: App.vue — deeper interactions: sidebar, route transitions, responsive.
 * Targets the 25.7% covered App.vue (641 uncovered lines).
 */

const { test, expect, loginAndNavigate } = require('../fixtures');

test('App deep: sidebar toggles, route transitions, and responsive behavior', async ({ page }) => {
    await loginAndNavigate(page);

    // Visit multiple routes to trigger App.vue route watchers and computed properties
    const routes = [
        '/#/frameworks?server=http://localhost/api/',
        '/#/import?server=http://localhost/api/',
        '/#/configuration?server=http://localhost/api/',
        '/#/crosswalk?server=http://localhost/api/',
        '/#/concepts?server=http://localhost/api/',
        '/#/directory?server=http://localhost/api/',
        '/#/progressionLevels?server=http://localhost/api/',
        '/#/plugins?server=http://localhost/api/',
    ];
    for (const route of routes) {
        await page.goto(route);
        await expect(page.locator('#app')).toBeVisible();
    }

    // Toggle the side nav open/close
    const sideNavToggle = page.locator('#side-nav-toggle, .cass--side-nav--toggle, [id*="side-nav"]').first();
    if (await sideNavToggle.isVisible().catch(() => false)) {
        await sideNavToggle.click();
        await sideNavToggle.click();
    }

    // Toggle user menu
    const userIcon = page.locator('#side-nav-user-icon-button');
    if (await userIcon.isVisible().catch(() => false)) {
        await userIcon.click();
    }

    // Try resizing viewport to trigger responsive computed properties
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('#app')).toBeVisible();
    await page.setViewportSize({ width: 1024, height: 768 });
    await expect(page.locator('#app')).toBeVisible();
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('#app')).toBeVisible();
});
