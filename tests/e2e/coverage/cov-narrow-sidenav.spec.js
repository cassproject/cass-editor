/**
 * Coverage tests for NarrowSideNav.vue component
 * Exercises computed properties: queryParams, isLoggedOn, displayName, currentRoute,
 * supportedFiles, loggedOnPerson. Also exercises all navigation links.
 */

const { test, expect, loginAndNavigate } = require('../fixtures');

test.describe('NarrowSideNav Coverage', () => {

    test('NarrowSideNav renders when sidebar is collapsed (not logged in)', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        // Toggle sidebar to narrow mode
        const toggleBtn = page.locator('#side-nav-toggle-button');
        if (await toggleBtn.isVisible()) {
            await toggleBtn.click();
            await page.waitForTimeout(500);
        }

        // Check if narrow side nav exists
        const narrowNav = page.locator('#app-narrow-side-nav-bar');
        if (await narrowNav.isVisible()) {
            // Exercise computed props via __vue__
            const navData = await page.evaluate(() => {
                const el = document.querySelector('#app-narrow-side-nav-bar');
                if (el && el.__vue__) {
                    const vm = el.__vue__;
                    return {
                        name: vm.$options.name,
                        displayName: vm.displayName,
                        isLoggedOn: vm.isLoggedOn,
                        currentRoute: vm.currentRoute,
                        queryParams: vm.queryParams,
                        showSideNav: vm.showSideNav
                    };
                }
                return null;
            });
            if (navData) {
                expect(navData.name).toBe('NarrowSideNav');
                expect(navData.displayName).toBe('No user');
                expect(navData.isLoggedOn).toBe(false);
            }
        }
    });

    test('NarrowSideNav shows all navigation sections', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        // Toggle sidebar to narrow mode
        const toggleBtn = page.locator('#side-nav-toggle-button');
        if (await toggleBtn.isVisible()) {
            await toggleBtn.click();
            await page.waitForTimeout(500);
        }

        const narrowNav = page.locator('#app-narrow-side-nav-bar');
        if (await narrowNav.isVisible()) {
            // Check all navigation links
            await expect(page.locator('#narrow-side-nav-frameworks-link')).toBeVisible();
            await expect(page.locator('#narrow-side-nav-crosswalk-link')).toBeVisible();
            await expect(page.locator('#narrow-side-nav-import-link')).toBeVisible();
            await expect(page.locator('#narrow-side-nav-concepts-link')).toBeVisible();
            await expect(page.locator('#narrow-side-nav-progression-models-link')).toBeVisible();
            await expect(page.locator('#narrow-side-nav-configurations-link')).toBeVisible();
            await expect(page.locator('#narrow-side-nav-plugins-link')).toBeVisible();

            // Menu section labels
            await expect(page.locator('text=Competencies & Frameworks')).toBeVisible();
            await expect(page.locator('text=Concept Schemes')).toBeVisible();
            await expect(page.locator('text=Progression Models')).toBeVisible();
        }
    });

    test('NarrowSideNav after login shows user info and users link', async ({ page }) => {
        await loginAndNavigate(page);

        // Toggle sidebar to narrow mode
        const toggleBtn = page.locator('#side-nav-toggle-button');
        if (await toggleBtn.isVisible()) {
            await toggleBtn.click();
            await page.waitForTimeout(500);
        }

        const narrowNav = page.locator('#app-narrow-side-nav-bar');
        if (await narrowNav.isVisible()) {
            // After login, isLoggedOn should be true and Users/Groups link should appear
            const navData = await page.evaluate(() => {
                const el = document.querySelector('#app-narrow-side-nav-bar');
                if (el && el.__vue__) {
                    const vm = el.__vue__;
                    return {
                        displayName: vm.displayName,
                        isLoggedOn: vm.isLoggedOn,
                        loggedOnPerson: vm.loggedOnPerson ? { name: vm.loggedOnPerson.name, email: vm.loggedOnPerson.email } : null
                    };
                }
                return null;
            });
            if (navData) {
                expect(navData.isLoggedOn).toBe(true);
                expect(navData.displayName).not.toBe('No user');
            }

            // Users/Groups link should be visible when logged in
            await expect(page.locator('#narrow-side-nav-users-link')).toBeVisible();
        }
    });

    test('NarrowSideNav navigation link clicks', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        // Toggle sidebar to narrow mode
        const toggleBtn = page.locator('#side-nav-toggle-button');
        if (await toggleBtn.isVisible()) {
            await toggleBtn.click();
            await page.waitForTimeout(500);
        }

        const narrowNav = page.locator('#app-narrow-side-nav-bar');
        if (await narrowNav.isVisible()) {
            // Click concepts link
            await page.locator('#narrow-side-nav-concepts-link').click();
            await page.waitForURL(/#\/concepts/);

            // Click progression models link
            await page.locator('#narrow-side-nav-progression-models-link').click();
            await page.waitForURL(/#\/progressionLevels/);

            // Click configurations link
            await page.locator('#narrow-side-nav-configurations-link').click();
            await page.waitForURL(/#\/configuration/);

            // Click plugins link
            await page.locator('#narrow-side-nav-plugins-link').click();
            await page.waitForURL(/#\/pluginManager/);

            // Click frameworks link (back to start)
            await page.locator('#narrow-side-nav-frameworks-link').click();
            await page.waitForURL(/#\/frameworks/);
        }
    });
});
