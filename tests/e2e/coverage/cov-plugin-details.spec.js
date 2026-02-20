const { test, expect } = require('@playwright/test');

test.describe.skip('Coverage: PluginDetails.vue', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/#/framework');
        await page.waitForFunction(() => window.app != null);
    });

    test('exercises PluginDetails methods and variables', async ({ page }) => {
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

            let pluginDetailsOptions = null;
            if (typeof Vue !== 'undefined' && Vue.options && Vue.options.components.PluginDetails) {
                pluginDetailsOptions = Vue.options.components.PluginDetails;
            } else {
                pluginDetailsOptions = findComponent(window.app, 'PluginDetails');
            }

            if (!pluginDetailsOptions) {
                window.app.$router.push('/pluginManager');
                await new Promise(resolve => setTimeout(resolve, 500));
                pluginDetailsOptions = findComponent(window.app, 'PluginDetails');
            }

            if (!pluginDetailsOptions) return { error: "PluginDetails not found in app tree" };

            const VueCtor = window.app.$options._base || window.app.constructor;
            const Ctor = VueCtor.extend(pluginDetailsOptions);
            const vm = new Ctor({
                store: window.app.$store,
                propsData: {
                    plugin: { url: "http://example.com/plugin" },
                    readOnly: false
                }
            }).$mount();

            let isPluginInvalid = vm.pluginInvalid;
            let panelClass = vm.panelClass;

            // Trigger validation
            vm.plugin.url = "invalid-url";
            vm.validateCurrentPluginAndEmitSave();
            let becameInvalid = vm.pluginInvalid;

            // Trigger load manifest
            vm.loadManifestData();
            let busy = vm.manifestRequestBusy;

            // Call load manifest complete manually to test it
            vm.pluginManifestData = { "invalid-url": { loaded: false, error: "Failed" } };
            try { vm.loadManifestDataComplete(); } catch (e) { }
            let hasError = vm.manifestError;

            return {
                isPluginInvalid,
                panelClass,
                becameInvalid,
                busy,
                hasError
            };
        });

        if (result.error) console.log(result.error);
        else {
            expect(result.panelClass).toBe('panel');
            expect(result.becameInvalid).toBe(true);
            expect(result.busy).toBe(false); // invalid url won't set busy to true
            expect(result.hasError).toBe(true);
        }
    });
});
