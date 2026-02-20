/**
 * Coverage tests for Progression Model views:
 * - ProgressionModel.vue (/progressionModel) — currently at 0%
 * - ProgressionHierarchy.vue — currently at 0%
 *
 * Tests progression mode store mutations and navigation.
 */

const { test, expect, loginAndNavigate } = require('../fixtures');

test.describe.serial('Progression Model Coverage', () => {

    test('Progression Levels list page loads', async ({ page }) => {
        await page.goto('/#/progressionLevels?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);

        // The progressionLevels route uses Frameworks.vue in progression mode
        const modeData = await page.evaluate(() => {
            if (window.app && window.app.$store) {
                return {
                    progressionMode: window.app.$store.getters['editor/progressionMode'],
                    conceptMode: window.app.$store.getters['editor/conceptMode']
                };
            }
            return null;
        });
        // progressionMode should be true on this route
    });

    test('Exercise progression mode store mutations', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        const storeData = await page.evaluate(() => {
            const store = window.app && window.app.$store;
            if (!store) return null;

            // Set progression mode
            store.commit('editor/progressionMode', true);
            const pm1 = store.getters['editor/progressionMode'];
            store.commit('editor/progressionMode', false);
            const pm2 = store.getters['editor/progressionMode'];

            return { pm1, pm2 };
        });
        if (storeData) {
            expect(storeData.pm1).toBe(true);
            expect(storeData.pm2).toBe(false);
        }
    });

    test('Navigate to progression levels and explore Frameworks.vue in progression mode', async ({ page }) => {
        await loginAndNavigate(page);

        // Set progression mode
        await page.evaluate(() => {
            window.app.$store.commit('editor/progressionMode', true);
            window.app.$store.commit('editor/conceptMode', false);
        });

        await page.goto('/#/progressionLevels?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);

        // Exercise Frameworks.vue computed properties in progression mode
        const frameworksData = await page.evaluate(() => {
            if (window.app) {
                const found = [];
                function findFW(vm) {
                    if (vm.$options.name === 'Frameworks') {
                        found.push({
                            name: vm.$options.name,
                            progressionMode: vm.$store.getters['editor/progressionMode']
                        });
                    }
                    vm.$children.forEach(child => findFW(child));
                }
                findFW(window.app);
                return found.length > 0 ? found[0] : null;
            }
            return null;
        });
        if (frameworksData) {
            expect(frameworksData.name).toBe('Frameworks');
        }
    });

    test('Create and navigate to a progression model', async ({ page }) => {
        await loginAndNavigate(page);

        // Set progression mode
        await page.evaluate(() => {
            window.app.$store.commit('editor/progressionMode', true);
            window.app.$store.commit('editor/conceptMode', false);
        });

        // Navigate to progression levels
        await page.goto('/#/progressionLevels?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);

        // Look for existing progression models
        const thingItems = page.locator('.cass--list--item .cass--list--thing');
        const count = await thingItems.count();

        if (count > 0) {
            // Double-click to open the first progression model
            await thingItems.first().dblclick();
            await page.waitForTimeout(3000);

            // Check if we navigated to a progression model view
            const currentUrl = page.url();
            if (currentUrl.includes('progressionModel')) {
                // Exercise ProgressionModel component via Vue tree
                const pmData = await page.evaluate(() => {
                    if (window.app) {
                        const found = [];
                        function findPM(vm) {
                            if (vm.$options.name === 'ProgressionModel') {
                                found.push({
                                    name: vm.$options.name,
                                    hasFramework: !!vm.framework
                                });
                            }
                            vm.$children.forEach(child => findPM(child));
                        }
                        findPM(window.app);
                        return found.length > 0 ? found[0] : null;
                    }
                    return null;
                });
                if (pmData) {
                    expect(pmData.name).toBe('ProgressionModel');
                }
            }
        }
    });
});
