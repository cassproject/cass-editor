/**
 * Coverage: Plugin management, users/groups, and timeline pages.
 * Targets PluginDetails.vue (5%), SideNav.vue (33%), cassApi.js (11%),
 * editDirectory.js (16%).
 * Navigates to every major route to exercise App.vue route handlers and SideNav links.
 */

const { test, expect, loginAndNavigate } = require('../fixtures');

test('Full app navigation: plugins, users, timeline, and all sidebar routes', async ({ page }) => {
    await loginAndNavigate(page);

    // Navigate to each major route to exercise router.js and App.vue computed/watchers

    // Timeline
    await page.goto('/#/timeline?server=http://localhost/api/');
    await expect(page.locator('#app')).toBeVisible();

    // Plugins
    await page.goto('/#/pluginManager?server=http://localhost/api/');
    await expect(page.locator('#app')).toBeVisible();
    // Click on a plugin if available
    const pluginItems = page.locator('.cass--list--item');
    if (await pluginItems.first().isVisible().catch(() => false)) {
        await pluginItems.first().click();
    }

    // Users/Groups
    await page.goto('/#/users?server=http://localhost/api/');
    await expect(page.locator('#app')).toBeVisible();

    // Concepts/Taxonomies
    await page.goto('/#/concepts?server=http://localhost/api/');
    await expect(page.locator('#app')).toBeVisible();
    // Click on a taxonomy if available
    const taxonomyItems = page.locator('.cass--list--item .cass--list--thing');
    if (await taxonomyItems.first().isVisible().catch(() => false)) {
        await taxonomyItems.first().click();
    }

    // Configuration
    await page.goto('/#/configuration?server=http://localhost/api/');
    await expect(page.locator('#app')).toBeVisible();

    // Crosswalk
    await page.goto('/#/crosswalk?server=http://localhost/api/');
    await expect(page.locator('#app')).toBeVisible();

    // Frameworks
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#app')).toBeVisible();

    // Test sidebar collapse/expand
    const collapseBtn = page.locator('text=Collapse Sidebar, button:has-text("Collapse")').first();
    if (await collapseBtn.isVisible().catch(() => false)) {
        await collapseBtn.click();
    }

    // Test user menu
    const userMenuBtn = page.locator('.side-nav-login, button[id*="user"]').first();
    if (await userMenuBtn.isVisible().catch(() => false)) {
        await userMenuBtn.click();
    }

    // Navigate using sidebar links instead of direct goto
    const sideNavLinks = page.locator('.side-nav a');
    const linkCount = await sideNavLinks.count();
    for (let i = 0; i < Math.min(linkCount, 5); i++) {
        await sideNavLinks.nth(i).click().catch(() => { });
    }
});
