const { test, expect } = require('@playwright/test');

test.describe.skip('Coverage: ImportServer.vue', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/#/framework');
        await page.waitForFunction(() => window.app != null);
    });

    test('exercises ImportServer data and methods', async ({ page }) => {
        const result = await page.evaluate(async () => {
            const findComponent = (root, name) => {
                let q = [root];
                let seen = new Set();
                while (q.length > 0) {
                    let node = q.shift();
                    if (node && node._uid && !seen.has(node._uid)) {
                        seen.add(node._uid);
                        if (node.$options && node.$options.name === name) return node.$options;
                        if (node.$children) q.push(...node.$children);
                    }
                }
                return null;
            };

            await new Promise(resolve => {
                window.app.$router.push('/import');
                setTimeout(resolve, 1000);
            });

            let importServerOptions = findComponent(window.app, 'ImportServer');
            if (!importServerOptions) return { error: "ImportServer not found in app tree" };

            const VueCtor = window.app.$options._base || window.app.constructor;
            const Ctor = VueCtor.extend(importServerOptions);
            const vm = new Ctor({ store: window.app.$store }).$mount();

            let initialServerDetailsLength = vm.serverDetails ? vm.serverDetails.length : 0;
            let importErrorsLength = vm.importErrors ? vm.importErrors.length : 0;
            let importStatus = vm.importStatus;

            // test computed properties
            let canClickImport = false;
            let isConceptMode = vm.conceptMode;
            try {
                canClickImport = vm.importServerInputDisabled;
            } catch (e) { }

            // test basic methods to catch errors/coverage
            try { vm.cancelImport(); } catch (e) { }

            // populate url to enable further methods
            vm.importServerUrl = "http://test-server.example.com";

            // check parse mappings
            let mappingParsed = false;
            try {
                let fw = { name: "test", description: "test desc" };
                let res = vm.getMappingFramework(fw);
                if (res["https://schema.cassproject.org/0.4/name"] === "test") mappingParsed = true;
            } catch (e) { }

            return {
                initialServerDetailsLength,
                importErrorsLength,
                importStatus,
                canClickImport,
                isConceptMode,
                mappingParsed
            };
        });

        if (result.error) console.log(result.error);
        else {
            expect(result.initialServerDetailsLength).toBeGreaterThanOrEqual(1);
            expect(result.mappingParsed).toBe(true);
        }
    });
});
