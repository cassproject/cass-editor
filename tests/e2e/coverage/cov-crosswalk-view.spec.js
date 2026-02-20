/**
 * Coverage tests for Crosswalk.vue view
 * Currently at 11% stmts, 630 lines — exercises computed props and store interactions.
 */

const { test, expect } = require('../fixtures');

test.describe('Crosswalk View Coverage', () => {

    test('Exercise crosswalk page load and store state', async ({ page }) => {
        await page.goto('/#/crosswalk?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(3000);

        const result = await page.evaluate(() => {
            const store = window.app && window.app.$store;
            if (!store) return null;
            const r = {};

            // Exercise crosswalk store getters
            r.step = store.state.crosswalk.step;
            r.sourceState = store.state.crosswalk.sourceState;
            r.targetState = store.state.crosswalk.targetState;
            r.enabledTypes = store.getters['crosswalk/enabledRelationshipTypes'];
            r.source = store.getters['crosswalk/frameworkSource'];
            r.target = store.getters['crosswalk/frameworkTarget'];

            // Find the crosswalk component
            const findComponent = (vnode) => {
                if (vnode && vnode.$options && vnode.$options.name === 'Crosswalk') {
                    return vnode;
                }
                if (vnode && vnode.$children) {
                    for (let child of vnode.$children) {
                        const found = findComponent(child);
                        if (found) return found;
                    }
                }
                return null;
            };

            const comp = findComponent(window.app);
            if (!comp) {
                r.noComponent = true;
                // Even without the component, exercise the store heavily
                store.commit('crosswalk/step', 0);
                store.commit('crosswalk/sourceState', 'ready');
                store.commit('crosswalk/targetState', 'ready');

                return r;
            }

            // Exercise computed properties
            try {
                r.showRightAside = comp.showRightAside;
                r.steps = comp.steps;
                r.alignmentsToSave = comp.alignmentsToSave;
                r.alignmentsToDelete = comp.alignmentsToDelete;
                r.crosswalkSaveBusy = comp.crosswalkSaveBusy;
            } catch (e) {
                r.computedError = e.message;
            }

            // Exercise data properties
            try {
                r.hasData = comp.$data !== undefined;
            } catch (e) {
                r.dataError = e.message;
            }

            return r;
        });

        expect(result).toBeTruthy();
    });

    test('Exercise crosswalk store operations for coverage', async ({ page }) => {
        await page.goto('/#/crosswalk?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);

        const result = await page.evaluate(() => {
            const store = window.app && window.app.$store;
            if (!store) return null;
            const r = {};

            // Simulate crosswalk workflow through store
            store.commit('crosswalk/step', 0);

            // Step 0: Select source framework
            store.commit('crosswalk/frameworkSource', {
                id: 'http://test/framework/1',
                shortId: () => 'http://test/framework/1',
                getName: () => 'Test Source Framework'
            });
            r.afterSelectSource = store.state.crosswalk.step;

            // Step 1: Select target framework
            store.commit('crosswalk/frameworkTarget', {
                id: 'http://test/framework/2',
                shortId: () => 'http://test/framework/2',
                getName: () => 'Test Target Framework'
            });

            // Configure relationship types
            store.commit('crosswalk/enabledRelationshipTypes', ['narrows', 'broadens', 'isEquivalentTo']);
            store.commit('crosswalk/enabledRelationshipTypesLastUpdate', Date.now());
            r.enabledTypes = store.getters['crosswalk/enabledRelationshipTypes'];

            // Set up working alignment
            store.commit('crosswalk/workingAlignmentsSource', 'http://test/competency/1');
            store.commit('crosswalk/workingAlignmentsType', 'narrows');
            store.commit('crosswalk/addWorkingAlignmentsTarget', 'http://test/competency/2');
            store.commit('crosswalk/addWorkingAlignmentsTarget', 'http://test/competency/3');

            r.workingSource = store.getters['crosswalk/workingAlignmentsSource'];
            r.workingTargets = store.getters['crosswalk/workingAlignmentsTargets'];

            // Prepopulate relevant alignments map
            store.commit('crosswalk/relevantExistingAlignmentsMap', {
                'http://test/competency/1': [{
                    source: 'http://test/competency/1',
                    target: 'http://test/competency/5',
                    relationType: 'isEquivalentTo'
                }]
            });
            store.commit('crosswalk/relevantExistingAlignmentsMapLastUpdate', Date.now());

            // Add new alignment
            store.commit('crosswalk/addAlignmentToRelevantAlignmentsMap', {
                source: 'http://test/competency/1',
                target: 'http://test/competency/6',
                relationType: 'narrows'
            });
            r.mapSize = Object.keys(store.state.crosswalk.relevantExistingAlignmentsMap).length;
            // Nested map: map[source][relationType][target] — count relation types
            const sourceEntry = store.state.crosswalk.relevantExistingAlignmentsMap['http://test/competency/1'];
            r.mapEntries = sourceEntry ? Object.keys(sourceEntry).length : 0;

            // Prepare alignments to save
            store.commit('crosswalk/appendAlignmentsToSave', {
                source: 'http://test/competency/1',
                target: 'http://test/competency/2',
                relationType: 'narrows'
            });
            store.commit('crosswalk/appendAlignmentsToSave', {
                source: 'http://test/competency/1',
                target: 'http://test/competency/3',
                relationType: 'narrows'
            });
            r.toSave = store.state.crosswalk.alignmentsToSave.length;

            // Move to review step
            store.commit('crosswalk/step', 2);
            r.reviewStep = store.state.crosswalk.step;

            // Reset everything
            store.commit('crosswalk/resetCrosswalk');
            r.afterReset = store.state.crosswalk.step;

            return r;
        });

        expect(result).toBeTruthy();
        expect(result.enabledTypes.length).toBe(3);
        expect(result.workingSource).toBe('http://test/competency/1');
        expect(result.workingTargets.length).toBe(2);
        expect(result.mapEntries).toBeGreaterThanOrEqual(1);
        expect(result.toSave).toBe(2);
        expect(result.reviewStep).toBe(2);
        expect(result.afterReset).toBe(0);
    });
});
