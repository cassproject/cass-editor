/**
 * Coverage tests for crosswalk.js store module
 * Currently at 71% stmts, 35% branches — exercises complex alignment logic.
 */

const { test, expect } = require('../fixtures');

test.describe('Crosswalk Store Coverage', () => {

    test('Exercise crosswalk store basic mutations and getters', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        const result = await page.evaluate(() => {
            const store = window.app && window.app.$store;
            if (!store) return null;
            const r = {};

            store.commit('crosswalk/step', 1);
            r.step = store.state.crosswalk.step;

            store.commit('crosswalk/frameworkSource', { id: 'fw-source' });
            r.source = store.getters['crosswalk/frameworkSource'];

            store.commit('crosswalk/frameworkTarget', { id: 'fw-target' });
            r.target = store.getters['crosswalk/frameworkTarget'];

            store.commit('crosswalk/frameworkSourceRelationships', [{ id: 'r1' }]);
            r.sourceRels = store.getters['crosswalk/frameworkSourceRelationships'];

            store.commit('crosswalk/frameworkTargetRelationships', [{ id: 'r2' }]);
            r.targetRels = store.getters['crosswalk/frameworkTargetRelationships'];

            store.commit('crosswalk/sourceState', 'loading');
            r.sourceState = store.getters['crosswalk/sourceState'];

            store.commit('crosswalk/targetState', 'loading');
            r.targetState = store.getters['crosswalk/targetState'];

            store.commit('crosswalk/workingAlignmentsSource', 'comp-source');
            r.workSource = store.getters['crosswalk/workingAlignmentsSource'];

            store.commit('crosswalk/workingAlignmentsType', 'narrows');
            r.workType = store.getters['crosswalk/workingAlignmentsType'];

            store.commit('crosswalk/workingAlignmentsTargets', ['t1', 't2']);
            r.workTargets = store.getters['crosswalk/workingAlignmentsTargets'];

            store.commit('crosswalk/enabledRelationshipTypes', ['narrows', 'broadens']);
            r.enabledTypes = store.getters['crosswalk/enabledRelationshipTypes'];

            store.commit('crosswalk/enabledRelationshipTypesLastUpdate', Date.now());
            r.enabledUpdate = store.getters['crosswalk/enabledRelationshipTypesLastUpdate'];

            store.commit('crosswalk/targetNodesToHighlight', ['n1', 'n2']);
            r.highlight = store.state.crosswalk.targetNodesToHighlight;

            return r;
        });

        expect(result).toBeTruthy();
        expect(result.step).toBe(1);
        expect(result.source.id).toBe('fw-source');
        expect(result.target.id).toBe('fw-target');
        expect(result.sourceRels.length).toBe(1);
        expect(result.targetRels.length).toBe(1);
        expect(result.sourceState).toBe('loading');
        expect(result.targetState).toBe('loading');
        expect(result.workSource).toBe('comp-source');
        expect(result.workType).toBe('narrows');
        expect(result.workTargets.length).toBe(2);
        expect(result.enabledTypes.length).toBe(2);
        expect(result.enabledUpdate).toBeTruthy();
        expect(result.highlight.length).toBe(2);
    });

    test('Exercise crosswalk store alignment map mutations', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        const result = await page.evaluate(() => {
            const store = window.app && window.app.$store;
            if (!store) return null;
            const r = {};

            // Set up alignment map (nested object: map[source][relationType][target])
            store.commit('crosswalk/relevantExistingAlignmentsMap', {
                'source1': { 'narrows': { 'target1': { source: 'source1', target: 'target1', relationType: 'narrows' } } }
            });
            r.alignMap = store.getters['crosswalk/relevantExistingAlignmentsMap'];
            r.hasSource1 = r.alignMap['source1'] !== undefined;

            store.commit('crosswalk/relevantExistingAlignmentsMapLastUpdate', 12345);
            r.alignMapUpdate = store.getters['crosswalk/relevantExistingAlignmentsMapLastUpdate'];

            store.commit('crosswalk/alignedCompetenciesList', ['c1', 'c2', 'c3']);
            r.alignedList = store.getters['crosswalk/alignedCompetenciesList'];

            // Alignments to save/delete
            store.commit('crosswalk/alignmentsToSave', [{ source: 's1', target: 't1' }]);
            r.toSave = store.getters['crosswalk/alignmentsToSave'];

            store.commit('crosswalk/appendAlignmentsToSave', { source: 's2', target: 't2' });
            r.toSaveAfterAppend = store.getters['crosswalk/alignmentsToSave'].length;

            store.commit('crosswalk/appendAlignmentsToDelete', { source: 's3', target: 't3', relationType: 'narrows' });
            r.toDeleteCount = store.getters['crosswalk/alignmentsToDelete'].length;

            return r;
        });

        expect(result).toBeTruthy();
        expect(result.hasSource1).toBe(true);
        expect(result.alignMapUpdate).toBe(12345);
        expect(result.alignedList.length).toBe(3);
        expect(result.toSave.length).toBeGreaterThanOrEqual(1);
        expect(result.toSaveAfterAppend).toBeGreaterThanOrEqual(2);
        expect(result.toDeleteCount).toBeGreaterThanOrEqual(1);
    });

    test('Exercise crosswalk store reset mutations', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        const result = await page.evaluate(() => {
            const store = window.app && window.app.$store;
            if (!store) return null;
            const r = {};

            // Set up state then reset
            store.commit('crosswalk/frameworkSource', { id: 'fw-src' });
            store.commit('crosswalk/frameworkTarget', { id: 'fw-tgt' });
            store.commit('crosswalk/step', 2);

            store.commit('crosswalk/resetFrameworkSourceRelationships');
            r.srcRelsReset = store.state.crosswalk.frameworkSourceRelationships;

            store.commit('crosswalk/resetFrameworkTargetRelationships');
            r.tgtRelsReset = store.state.crosswalk.frameworkTargetRelationships;

            store.commit('crosswalk/resetCrosswalkAlignmentsAndState');
            r.sourceStateAfterReset = store.state.crosswalk.sourceState;
            r.targetStateAfterReset = store.state.crosswalk.targetState;

            store.commit('crosswalk/resetCrosswalkFrameworks');
            r.sourceAfterResetFw = store.state.crosswalk.frameworkSource;
            r.targetAfterResetFw = store.state.crosswalk.frameworkTarget;

            // Full reset
            store.commit('crosswalk/frameworkSource', { id: 'temp' });
            store.commit('crosswalk/step', 1);
            store.commit('crosswalk/resetCrosswalk');
            r.stepAfterFullReset = store.state.crosswalk.step;
            r.sourceAfterFullReset = store.state.crosswalk.frameworkSource;

            // Reset working alignments map
            store.commit('crosswalk/workingAlignmentsSource', 'src-1');
            store.commit('crosswalk/workingAlignmentsType', 'narrows');
            store.commit('crosswalk/resetWorkingAlignmentsMap');
            r.workSourceAfterReset = store.state.crosswalk.workingAlignmentsMap.source;

            return r;
        });

        expect(result).toBeTruthy();
        expect(result.srcRelsReset).toBeNull();
        expect(result.tgtRelsReset).toBeNull();
        expect(result.sourceStateAfterReset).toBe('ready');
        expect(result.targetStateAfterReset).toBe('ready');
        expect(result.sourceAfterResetFw).toBeNull();
        expect(result.targetAfterResetFw).toBeNull();
        expect(result.stepAfterFullReset).toBe(0);
        // After resetCrosswalk, frameworkSource is NOT reset (it only resets alignments/state)
        expect(result.workSourceAfterReset).toBe('');
    });

    test('Exercise crosswalk store working alignment target add/remove', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        const result = await page.evaluate(() => {
            const store = window.app && window.app.$store;
            if (!store) return null;
            const r = {};

            // Reset first
            store.commit('crosswalk/resetWorkingAlignmentsMap');

            // Add targets
            store.commit('crosswalk/addWorkingAlignmentsTarget', 'target-a');
            r.afterAddFirst = store.state.crosswalk.workingAlignmentsMap.targets.length;

            store.commit('crosswalk/addWorkingAlignmentsTarget', 'target-b');
            r.afterAddSecond = store.state.crosswalk.workingAlignmentsMap.targets.length;

            // Add another
            store.commit('crosswalk/addWorkingAlignmentsTarget', 'target-c');
            r.afterAddThird = store.state.crosswalk.workingAlignmentsMap.targets.length;

            // Remove target
            store.commit('crosswalk/removeWorkingAlignmentsTarget', 'target-a');
            r.afterRemove = store.state.crosswalk.workingAlignmentsMap.targets.length;

            // Remove non-existent — no-op
            store.commit('crosswalk/removeWorkingAlignmentsTarget', 'non-existent');
            r.afterRemoveNonExistent = store.state.crosswalk.workingAlignmentsMap.targets.length;

            // Check changed state
            r.changed = store.state.crosswalk.workingAlignmentsMap.changed;

            return r;
        });

        expect(result).toBeTruthy();
        expect(result.afterAddFirst).toBe(1);
        expect(result.afterAddSecond).toBe(2);
        expect(result.afterAddThird).toBe(3);
        expect(result.afterRemove).toBe(2);
        expect(result.afterRemoveNonExistent).toBe(2);
    });

    test('Exercise crosswalk store remove alignment and map mutations', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        const result = await page.evaluate(() => {
            const store = window.app && window.app.$store;
            if (!store) return null;
            const r = {};

            // Setup alignments to save
            store.commit('crosswalk/alignmentsToSave', [
                { source: 's1', target: 't1', relationType: 'narrows' },
                { source: 's2', target: 't2', relationType: 'broadens' }
            ]);
            r.initialSave = store.state.crosswalk.alignmentsToSave.length;

            // Remove one from save (note: removeAlignmentFromAlignmentsToSave uses 'type' not 'relationType')
            store.commit('crosswalk/removeAlignmentFromAlignmentsToSave', {
                source: 's1', target: 't1', type: 'narrows'
            });
            r.afterRemoveSave = store.state.crosswalk.alignmentsToSave.length;

            // Setup alignments to delete
            store.commit('crosswalk/resetCrosswalkAlignmentsAndState');
            store.commit('crosswalk/appendAlignmentsToDelete', { source: 'd1', target: 'dt1', relationType: 'narrows' });
            store.commit('crosswalk/appendAlignmentsToDelete', { source: 'd2', target: 'dt2', relationType: 'broadens' });
            r.initialDelete = store.state.crosswalk.alignmentsToDelete.length;

            // Remove one from delete (uses 'type' not 'relationType')
            store.commit('crosswalk/removeAlignmentFromAlignmentsToDelete', {
                source: 'd1', target: 'dt1', type: 'narrows'
            });
            r.afterRemoveDelete = store.state.crosswalk.alignmentsToDelete.length;

            // addAlignmentToRelevantAlignmentsMap — nested structure
            store.commit('crosswalk/relevantExistingAlignmentsMap', {});
            store.commit('crosswalk/addAlignmentToRelevantAlignmentsMap', {
                source: 'src-new',
                relationType: 'narrows',
                target: 'tgt-new'
            });
            const map = store.state.crosswalk.relevantExistingAlignmentsMap;
            r.hasNewSource = map['src-new'] !== undefined;
            r.hasNarrows = map['src-new'] && map['src-new']['narrows'] !== undefined;
            r.hasTarget = map['src-new'] && map['src-new']['narrows'] && map['src-new']['narrows']['tgt-new'] !== undefined;

            // removeAlignmentFromRelevantAlignmentsMap
            store.commit('crosswalk/removeAlignmentFromRelevantAlignmentsMap', {
                source: 'src-new', target: 'tgt-new', type: 'narrows'
            });
            r.afterRemoveFromMap = map['src-new'] && map['src-new']['narrows'] && map['src-new']['narrows']['tgt-new'] === undefined;

            // populateAlignedCompetenciesList
            store.commit('crosswalk/relevantExistingAlignmentsMap', {
                'compA': { 'narrows': { 'compB': { source: 'compA', target: 'compB' } } }
            });
            store.commit('crosswalk/populateAlignedCompetenciesList');
            r.populatedList = store.state.crosswalk.alignedCompetenciesList;

            // populateWorkingAlignmentMap
            store.commit('crosswalk/workingAlignmentsSource', 'compA');
            store.commit('crosswalk/workingAlignmentsType', 'narrows');
            store.commit('crosswalk/workingAlignmentsTargets', []);
            store.commit('crosswalk/populateWorkingAlignmentMap');
            r.populatedTargets = store.state.crosswalk.workingAlignmentsMap.targets;

            return r;
        });

        expect(result).toBeTruthy();
        expect(result.initialSave).toBe(2);
        expect(result.afterRemoveSave).toBe(1);
        expect(result.initialDelete).toBe(2);
        expect(result.afterRemoveDelete).toBe(1);
        expect(result.hasNewSource).toBe(true);
        expect(result.hasNarrows).toBe(true);
        expect(result.hasTarget).toBe(true);
        expect(result.populatedList.length).toBeGreaterThanOrEqual(2);
        expect(result.populatedTargets.length).toBeGreaterThanOrEqual(1);
    });
});
