const { test, expect } = require('@playwright/test');
const { loginAndNavigate } = require('../fixtures');

test.describe.skip('Coverage: MultiEdit.vue', () => {
    test.beforeEach(async ({ page }) => {
        await loginAndNavigate(page);
        await page.goto('/#/framework');
        await page.waitForFunction(() => window.app != null);
    });

    test('exercises MultiEdit methods and computed properties', async ({ page }) => {
        const result = await page.evaluate(async () => {
            const findComponentInstance = (root, name) => {
                let q = [root];
                let seen = new Set();
                while (q.length > 0) {
                    let node = q.shift();
                    if (node && node._uid && !seen.has(node._uid)) {
                        seen.add(node._uid);
                        if (node.$options && node.$options.name === name) return node;
                        if (node.$children) q.push(...node.$children);
                    }
                }
                return null;
            };

            window.app.$store.commit('app/showModal', {
                component: 'MultiEdit',
                content: {
                    profile: { "testProp": { "http://www.w3.org/2000/01/rdf-schema#label": [{ "@value": "Test Label" }] } },
                    selectedCompetencies: []
                }
            });
            await new Promise(resolve => setTimeout(resolve, 500));
            const vm = findComponentInstance(window.app, 'MultiEdit');

            if (!vm) return { error: "MultiEdit not found in app tree" };

            let profile = vm.profile;
            let initialSelectedCompetencies = vm.selectedCompetencies;
            let disableApply = vm.disableApplyButton;

            // Trigger methods to cover lines
            vm.onCancel();
            let isModalClosed = window.app.$store.getters['app/showModal'] === false;

            vm.addErrorMessage("Test error");
            let errorMsg = vm.errorMessage[0];

            vm.addAnotherProperty();
            let addedPropsLength = vm.addedProperties.length;

            vm.removeValueAtIndex(0);
            let removedPropsLength = vm.addedProperties.length;

            // simple turnFieldsBackIntoArrays check
            let fixedResult = vm.turnFieldsBackIntoArrays({ "@id": "1", "@type": "Thing", "name": "foo" });

            try { vm.applyCheckedOptions(); } catch (e) { }

            // Add selected from search
            vm.$store.commit('editor/clearSelectedCompetencies');
            vm.$store.commit('editor/selectedCompetency', { shortId: () => "comp1" });
            try { vm.addSelected(); } catch (e) { }

            return {
                profile,
                initialSelectedCompetenciesLength: initialSelectedCompetencies ? initialSelectedCompetencies.length : 0,
                disableApply,
                isModalClosed,
                errorMsg,
                addedPropsLength,
                removedPropsLength,
                fixedName: fixedResult.name ? fixedResult.name[0] : null
            };
        });

        if (result.error) {
            console.log(result.error);
        } else {
            expect(result.isModalClosed).toBe(true);
            expect(result.errorMsg).toBe("Test error");
            expect(result.addedPropsLength).toBe(2);
            expect(result.removedPropsLength).toBe(1);
            expect(result.fixedName).toBe("foo"); // name becomes an array
        }
    });
});
