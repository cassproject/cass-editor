/**
 * Coverage: Visit all application routes unauthenticated.
 * Derived from collect-coverage.js Session 1.
 * Exercises router.js, main.js, App.vue, and all view components' mount lifecycle.
 */

const { test, expect } = require('../fixtures');

test('All routes: visit every route unauthenticated to exercise mount lifecycle', async ({ page }) => {
    const routes = [
        { name: 'Welcome', path: '/#/' },
        { name: 'Frameworks', path: '/#/frameworks?server=http://localhost/api/' },
        { name: 'Collections', path: '/#/collections?server=http://localhost/api/' },
        { name: 'Concepts', path: '/#/concepts?server=http://localhost/api/' },
        { name: 'Progression Levels', path: '/#/progressionLevels?server=http://localhost/api/' },
        { name: 'Login', path: '/#/login' },
        { name: 'Legacy Login', path: '/#/legacyLogin?server=http://localhost/api/' },
        { name: 'Create Account', path: '/#/createAccount?server=http://localhost/api/' },
        { name: 'Configuration', path: '/#/configuration?server=http://localhost/api/' },
        { name: 'Users', path: '/#/users?server=http://localhost/api/' },
        { name: 'Plugin Manager', path: '/#/pluginManager?server=http://localhost/api/' },
        { name: 'Crosswalk', path: '/#/crosswalk?server=http://localhost/api/' },
        { name: 'Timeline', path: '/#/timeline?server=http://localhost/api/' },
        { name: 'Framework Detail', path: '/#/framework?server=http://localhost/api/' },
        { name: 'Directory', path: '/#/directory?server=http://localhost/api/' },
        { name: 'Organization', path: '/#/organization?server=http://localhost/api/' },
        { name: 'Import', path: '/#/frameworks?server=http://localhost/api/&action=import' },
    ];

    for (const route of routes) {
        await page.goto(route.path);
        await page.waitForLoadState('domcontentloaded');
        await expect(page.locator('#app')).toBeVisible();
    }
});
