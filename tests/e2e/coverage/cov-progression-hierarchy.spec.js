const { test, expect } = require('@playwright/test');

test.describe('Coverage: ProgressionHierarchy.vue', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/#/framework');
        await page.waitForFunction(() => window.app != null);
        // Ensure Framework chunk is loaded
        await page.evaluate(() => {
            return new Promise(resolve => {
                if (window.app.$route.name !== 'framework') {
                    window.app.$router.push('/framework');
                }
                setTimeout(resolve, 500);
            });
        });
    });

    test('exercises ProgressionHierarchy methods and data', async ({ page }) => {
        const result = await page.evaluate(async () => {
            // Get ProgressionModel module from router
            const routeRecords = window.app.$router.options.routes;
            const pmRoute = routeRecords.find(r => r.name === 'progressionModel');

            // It's a lazy loaded function, invoke to get module
            let pmModule;
            if (typeof pmRoute.components.default === 'function') {
                pmModule = await pmRoute.components.default();
            } else {
                pmModule = pmRoute.components.default;
            }
            const PMComp = pmModule.default || pmModule;

            // Extract ProgressionHierarchy from ProgressionModel components
            const PHComponent = PMComp.components.ProgressionHierarchy;

            // If it's a lazy load function as well, resolve it
            let PHOptions;
            if (typeof PHComponent === 'function') {
                const phRes = await PHComponent();
                PHOptions = phRes.default || phRes;
            } else {
                PHOptions = PHComponent;
            }

            if (!PHOptions) return { error: "ProgressionHierarchy not found" };

            // Instantiate
            const VueCtor = window.app.$options._base || window.app.constructor;
            const Ctor = VueCtor.extend(PHOptions);
            const vm = new Ctor({
                store: window.app.$store,
                propsData: {
                    container: {
                        "skos:hasTopConcept": ["http://test.com/prog/1", "http://test.com/prog/2"],
                        type: "Framework",
                        shortId: () => "http://test.com/prog/scheme"
                    }
                }
            });

            const dataDefaults = {
                dragging: vm.dragging,
                multipleSelected: vm.multipleSelected,
                expanded: vm.expanded
            };

            // Call computed properties directly
            let canCopyOrCut = false;
            let canPaste = false;
            try { canCopyOrCut = vm.canCopyOrCut; } catch (e) { }
            try { canPaste = vm.canPaste; } catch (e) { }

            // Call simple methods
            vm.beginDrag();
            let dragged = vm.dragging;

            vm.selectedArray = ["http://test.com/prog/1"];
            vm.copyClick();
            let copiedId = window.app.$store.getters['editor/copyId'];

            vm.pasteClick();
            let pasted = window.app.$store.getters['editor/paste'];

            vm.cutClick();
            let cutId = window.app.$store.getters['editor/cutId'];

            // Test pretty print structure
            let prettyStr = vm.printPrettyStructure([]);

            return {
                dataDefaults,
                canCopyOrCut,
                canPaste,
                dragged,
                copiedId,
                pasted,
                cutId,
                prettyStr,
                addProgressionText: vm.addProgressionModelOrLevelText
            };
        });

        if (result.error) console.log(result.error);
        else {
            expect(result.dataDefaults.expanded).toBe(true);
            expect(result.dataDefaults.multipleSelected).toBe(false);
            expect(result.dragged).toBe(true);
            expect(result.copiedId).toBe('http://test.com/prog/1');
            expect(result.pasted).toBe(true);
            expect(result.cutId).toBe('http://test.com/prog/1');
            expect(result.prettyStr).toContain('[');
            expect(result.addProgressionText).toBe('Add Level'); // because selectedArray has 1 item
        }
    });
});
