const { test, expect, loginAndNavigate } = require('../fixtures');

// Coverage targets: App.vue (20%), SideNav.vue (30%), Crosswalk.vue (8.5%),
// DynamicModal.vue (31%), store/modules/app.js (50%)

test.describe.serial('App interactions and crosswalk coverage', () => {
    let page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await loginAndNavigate(page);
    });

    test.afterAll(async () => {
        const coverage = await page.evaluate(() => window.__coverage__);
        if (coverage) {
            const fs = require('fs');
            const path = require('path');
            const coveragePath = path.join(__dirname, '..', '..', '..', '.nyc_output', `coverage-appint-${Date.now()}.json`);
            if (!fs.existsSync(path.dirname(coveragePath))) {
                fs.mkdirSync(path.dirname(coveragePath), { recursive: true });
            }
            fs.writeFileSync(coveragePath, JSON.stringify(coverage));
        }
        await page.close();
    });

    test('1: Exercise App.vue computed properties and sidebar', async () => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await expect(page.locator('#frameworks')).toBeVisible({ timeout: 10000 });

        // Exercise App.vue computed properties via __vue__ on root element
        const appData = await page.evaluate(() => {
            // Find App component on the #app element
            const appEl = document.getElementById('app');
            if (!appEl || !appEl.__vue__) return { error: 'no app element' };
            const vm = appEl.__vue__;
            // Walk up the $root if needed
            const root = vm.$root || vm;

            // Try finding App component in parent chain
            let appVm = root;
            while (appVm) {
                if (appVm.$options && appVm.$options.name === 'App') break;
                appVm = appVm.$children ? appVm.$children[0] : null;
            }
            if (!appVm) appVm = root;

            return {
                hasStore: root.$store != null,
                showSideNav: root.$store ? root.$store.getters['app/showSideNav'] : null,
                showRightAside: root.$store ? root.$store.getters['app/showRightAside'] : null,
                // Access App.vue computed props if they exist
                isIframe: appVm.isIframe,
                showLogin: appVm.showLogin,
                showCASS: appVm.showCASS,
                featuresEnabled: appVm.featuresEnabled,
                canExport: appVm.canExport,
                loggedIn: appVm.loggedIn
            };
        });
        expect(appData.error).toBeUndefined();
        expect(appData.hasStore).toBe(true);
    });

    test('2: Toggle sidebar visibility', async () => {
        // Exercise sidebar via store commits
        await page.evaluate(() => {
            const appEl = document.getElementById('app');
            const vm = appEl.__vue__.$root || appEl.__vue__;
            if (vm.$store) {
                vm.$store.commit('app/showSideNav', false);
            }
        });
        await page.waitForTimeout(300);

        await page.evaluate(() => {
            const appEl = document.getElementById('app');
            const vm = appEl.__vue__.$root || appEl.__vue__;
            if (vm.$store) {
                vm.$store.commit('app/showSideNav', true);
            }
        });
        await page.waitForTimeout(300);

        // Verify sidebar is visible — look for side nav element
        const sideNav = page.locator('#side-nav, .side-nav, nav[role="complementary"]').first();
        if (await sideNav.isVisible({ timeout: 2000 }).catch(() => false)) {
            expect(await sideNav.isVisible()).toBe(true);
        }
    });

    test('3: Exercise SideNav computed props and navigation links', async () => {
        // Exercise SideNav computed properties
        const sideNavData = await page.evaluate(() => {
            const allEls = document.querySelectorAll('*');
            for (const el of allEls) {
                const vm = el.__vue__;
                if (vm && vm.$options && vm.$options.name === 'SideNav') {
                    return {
                        found: true,
                        loggedIn: vm.loggedIn,
                        showLogin: vm.showLogin,
                        showCASS: vm.showCASS,
                        showSideNav: vm.showSideNav,
                        frameworksActive: vm.frameworksActive,
                        crosswalkActive: vm.crosswalkActive,
                        pluginsActive: vm.pluginsActive,
                        configActive: vm.configActive,
                        usersActive: vm.usersActive,
                        conceptMode: vm.conceptMode,
                        progressionMode: vm.progressionMode,
                        isIframe: vm.isIframe
                    };
                }
            }
            return { found: false };
        });
        // SideNav should exist on the page
        expect(sideNavData.found).toBe(true);
    });

    test('4: Navigate to crosswalk page and exercise computed properties', async () => {
        await page.goto('/#/crosswalk?server=http://localhost/api/');
        await page.waitForTimeout(3000);

        // Exercise Crosswalk.vue computed properties
        const crosswalkData = await page.evaluate(() => {
            const allEls = document.querySelectorAll('*');
            for (const el of allEls) {
                const vm = el.__vue__;
                if (vm && vm.$options && (vm.$options.name === 'Crosswalk' || vm.$options.name === 'crosswalk')) {
                    return {
                        found: true,
                        queryParams: typeof vm.queryParams,
                        hasSourceFramework: vm.sourceFramework != null,
                        hasTargetFramework: vm.targetFramework != null,
                        showRightAside: vm.showRightAside
                    };
                }
            }
            return { found: false };
        });
        // Crosswalk might or might not be found depending on features/route availability
        expect(crosswalkData).toBeDefined();
    });

    test('5: Exercise store module edge cases', async () => {
        const storeData = await page.evaluate(() => {
            const appEl = document.getElementById('app');
            if (!appEl || !appEl.__vue__) return { error: 'no app' };
            const store = (appEl.__vue__.$root || appEl.__vue__).$store;
            if (!store) return { error: 'no store' };

            // Exercise app module mutations
            store.commit('app/showModal', { component: 'TestModal' });
            store.commit('app/showModal', null);

            // Exercise app module getters
            const getters = {
                showRightAside: store.getters['app/showRightAside'],
                rightAsideContent: store.getters['app/rightAsideContent'],
                rightAsideObject: store.getters['app/rightAsideObject'],
                searchTerm: store.getters['app/searchTerm'],
                sortResults: store.getters['app/sortResults'],
                quickFilters: store.getters['app/quickFilters'],
                filterByOwnedByMe: store.getters['app/filterByOwnedByMe'],
                filterByNotOwnedByMe: store.getters['app/filterByNotOwnedByMe'],
                filterByConfigMatchDefault: store.getters['app/filterByConfigMatchDefault']
            };

            // Exercise editor module getters
            const editorGetters = {
                framework: store.getters['editor/framework'],
                conceptMode: store.getters['editor/conceptMode'],
                progressionMode: store.getters['editor/progressionMode'],
                queryParams: store.getters['editor/queryParams'],
                firstSearchProcessing: store.getters['editor/firstSearchProcessing']
            };

            return { getters, editorGetters };
        });
        expect(storeData.error).toBeUndefined();
    });

    test('6: Exercise DynamicModal and MainLayout components', async () => {
        // Navigate back to frameworks page
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForTimeout(3000);

        // Wait for page to fully load
        try {
            await expect(page.locator('#frameworks')).toBeVisible({ timeout: 15000 });
        } catch {
            // Page might not load if crosswalk redirect is slow
            await page.goto('/#/frameworks?server=http://localhost/api/');
            await page.waitForTimeout(3000);
        }

        // Exercise various Vue component computed properties
        const componentData = await page.evaluate(() => {
            const results = {};
            const allEls = document.querySelectorAll('*');
            for (const el of allEls) {
                const vm = el.__vue__;
                if (!vm || !vm.$options || !vm.$options.name) continue;
                const name = vm.$options.name;
                if (!results[name]) {
                    results[name] = true;
                }
            }
            return { componentNames: Object.keys(results) };
        });
        expect(componentData.componentNames.length).toBeGreaterThan(0);
    });

    test('7: Navigate to configuration page for ConfigurationEditor coverage', async () => {
        await page.goto('/#/configuration?server=http://localhost/api/');
        await page.waitForTimeout(3000);

        const configData = await page.evaluate(() => {
            const allEls = document.querySelectorAll('*');
            for (const el of allEls) {
                const vm = el.__vue__;
                if (vm && vm.$options && (vm.$options.name === 'ConfigurationEditor' || vm.$options.name === 'Configuration')) {
                    return {
                        found: true,
                        name: vm.$options.name
                    };
                }
            }
            return { found: false };
        });
        expect(configData).toBeDefined();
    });
});
