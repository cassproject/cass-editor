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
            const store = window.__stores;
            if (!store) return null;
            const r = {};

            store.crosswalk.setStep( 1);
            r.step = store.crosswalk.step;

            store.crosswalk.setFrameworkSource( { id: 'fw-source' });
            r.source = store.crosswalk.frameworkSource;

            store.crosswalk.setFrameworkTarget( { id: 'fw-target' });
            r.target = store.crosswalk.frameworkTarget;

            store.crosswalk.setFrameworkSourceRelationships( [{ id: 'r1' }]);
            r.sourceRels = store.crosswalk.frameworkSourceRelationships;

            store.crosswalk.setFrameworkTargetRelationships( [{ id: 'r2' }]);
            r.targetRels = store.crosswalk.frameworkTargetRelationships;

            store.crosswalk.setSourceState( 'loading');
            r.sourceState = store.crosswalk.sourceState;

            store.crosswalk.setTargetState( 'loading');
            r.targetState = store.crosswalk.targetState;

            store.crosswalk.setWorkingAlignmentsSource( 'comp-source');
            r.workSource = store.crosswalk.workingAlignmentsSource;

            store.crosswalk.setWorkingAlignmentsType( 'narrows');
            r.workType = store.crosswalk.workingAlignmentsType;

            store.crosswalk.setWorkingAlignmentsTargets( ['t1', 't2']);
            r.workTargets = store.crosswalk.workingAlignmentsTargets;

            store.crosswalk.setEnabledRelationshipTypes( ['narrows', 'broadens']);
            r.enabledTypes = store.crosswalk.enabledRelationshipTypes;

            store.crosswalk.setEnabledRelationshipTypesLastUpdate( Date.now());
            r.enabledUpdate = store.crosswalk.enabledRelationshipTypesLastUpdate;

            store.crosswalk.setTargetNodesToHighlight( ['n1', 'n2']);
            r.highlight = store.crosswalk.targetNodesToHighlight;

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
            const store = window.__stores;
            if (!store) return null;
            const r = {};

            // Set up alignment map (nested object: map[source][relationType][target])
            store.crosswalk.setRelevantExistingAlignmentsMap( {
                'source1': { 'narrows': { 'target1': { source: 'source1', target: 'target1', relationType: 'narrows' } } }
            });
            r.alignMap = store.crosswalk.relevantExistingAlignmentsMap;
            r.hasSource1 = r.alignMap['source1'] !== undefined;

            store.crosswalk.setRelevantExistingAlignmentsMapLastUpdate( 12345);
            r.alignMapUpdate = store.crosswalk.relevantExistingAlignmentsMapLastUpdate;

            store.crosswalk.setAlignedCompetenciesList( ['c1', 'c2', 'c3']);
            r.alignedList = store.crosswalk.alignedCompetenciesList;

            // Alignments to save/delete
            store.crosswalk.setAlignmentsToSave( [{ source: 's1', target: 't1' }]);
            r.toSave = store.crosswalk.alignmentsToSave;

            store.crosswalk.setAppendAlignmentsToSave( { source: 's2', target: 't2' });
            r.toSaveAfterAppend = store.crosswalk.alignmentsToSave.length;

            store.crosswalk.setAppendAlignmentsToDelete( { source: 's3', target: 't3', relationType: 'narrows' });
            r.toDeleteCount = store.crosswalk.alignmentsToDelete.length;

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
            const store = window.__stores;
            if (!store) return null;
            const r = {};

            // Set up state then reset
            store.crosswalk.setFrameworkSource( { id: 'fw-src' });
            store.crosswalk.setFrameworkTarget( { id: 'fw-tgt' });
            store.crosswalk.setStep( 2);

            store.crosswalk.resetFrameworkSourceRelationships();
            r.srcRelsReset = store.crosswalk.frameworkSourceRelationships;

            store.crosswalk.resetFrameworkTargetRelationships();
            r.tgtRelsReset = store.crosswalk.frameworkTargetRelationships;

            store.crosswalk.resetCrosswalkAlignmentsAndState();
            r.sourceStateAfterReset = store.crosswalk.sourceState;
            r.targetStateAfterReset = store.crosswalk.targetState;

            store.crosswalk.resetCrosswalkFrameworks();
            r.sourceAfterResetFw = store.crosswalk.frameworkSource;
            r.targetAfterResetFw = store.crosswalk.frameworkTarget;

            // Full reset
            store.crosswalk.setFrameworkSource( { id: 'temp' });
            store.crosswalk.setStep( 1);
            store.crosswalk.resetCrosswalk();
            r.stepAfterFullReset = store.crosswalk.step;
            r.sourceAfterFullReset = store.crosswalk.frameworkSource;

            // Reset working alignments map
            store.crosswalk.setWorkingAlignmentsSource( 'src-1');
            store.crosswalk.setWorkingAlignmentsType( 'narrows');
            store.crosswalk.resetWorkingAlignmentsMap();
            r.workSourceAfterReset = store.crosswalk.workingAlignmentsMap.source;

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
            const store = window.__stores;
            if (!store) return null;
            const r = {};

            // Reset first
            store.crosswalk.resetWorkingAlignmentsMap();

            // Add targets
            store.crosswalk.addWorkingAlignmentsTarget( 'target-a');
            r.afterAddFirst = store.crosswalk.workingAlignmentsMap.targets.length;

            store.crosswalk.addWorkingAlignmentsTarget( 'target-b');
            r.afterAddSecond = store.crosswalk.workingAlignmentsMap.targets.length;

            // Add another
            store.crosswalk.addWorkingAlignmentsTarget( 'target-c');
            r.afterAddThird = store.crosswalk.workingAlignmentsMap.targets.length;

            // Remove target
            store.crosswalk.removeWorkingAlignmentsTarget( 'target-a');
            r.afterRemove = store.crosswalk.workingAlignmentsMap.targets.length;

            // Remove non-existent — no-op
            store.crosswalk.removeWorkingAlignmentsTarget( 'non-existent');
            r.afterRemoveNonExistent = store.crosswalk.workingAlignmentsMap.targets.length;

            // Check changed state
            r.changed = store.crosswalk.workingAlignmentsMap.changed;

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
            const store = window.__stores;
            if (!store) return null;
            const r = {};

            // Setup alignments to save
            store.crosswalk.setAlignmentsToSave( [
                { source: 's1', target: 't1', relationType: 'narrows' },
                { source: 's2', target: 't2', relationType: 'broadens' }
            ]);
            r.initialSave = store.crosswalk.alignmentsToSave.length;

            // Remove one from save (note: removeAlignmentFromAlignmentsToSave uses 'type' not 'relationType')
            store.crosswalk.removeAlignmentFromAlignmentsToSave( {
                source: 's1', target: 't1', type: 'narrows'
            });
            r.afterRemoveSave = store.crosswalk.alignmentsToSave.length;

            // Setup alignments to delete
            store.crosswalk.resetCrosswalkAlignmentsAndState();
            store.crosswalk.setAppendAlignmentsToDelete( { source: 'd1', target: 'dt1', relationType: 'narrows' });
            store.crosswalk.setAppendAlignmentsToDelete( { source: 'd2', target: 'dt2', relationType: 'broadens' });
            r.initialDelete = store.crosswalk.alignmentsToDelete.length;

            // Remove one from delete (uses 'type' not 'relationType')
            store.crosswalk.removeAlignmentFromAlignmentsToDelete( {
                source: 'd1', target: 'dt1', type: 'narrows'
            });
            r.afterRemoveDelete = store.crosswalk.alignmentsToDelete.length;

            // addAlignmentToRelevantAlignmentsMap — nested structure
            store.crosswalk.setRelevantExistingAlignmentsMap( {});
            store.crosswalk.addAlignmentToRelevantAlignmentsMap( {
                source: 'src-new',
                relationType: 'narrows',
                target: 'tgt-new'
            });
            const map = store.crosswalk.relevantExistingAlignmentsMap;
            r.hasNewSource = map['src-new'] !== undefined;
            r.hasNarrows = map['src-new'] && map['src-new']['narrows'] !== undefined;
            r.hasTarget = map['src-new'] && map['src-new']['narrows'] && map['src-new']['narrows']['tgt-new'] !== undefined;

            // removeAlignmentFromRelevantAlignmentsMap
            store.crosswalk.removeAlignmentFromRelevantAlignmentsMap( {
                source: 'src-new', target: 'tgt-new', type: 'narrows'
            });
            r.afterRemoveFromMap = map['src-new'] && map['src-new']['narrows'] && map['src-new']['narrows']['tgt-new'] === undefined;

            // populateAlignedCompetenciesList
            store.crosswalk.setRelevantExistingAlignmentsMap( {
                'compA': { 'narrows': { 'compB': { source: 'compA', target: 'compB' } } }
            });
            store.crosswalk.populateAlignedCompetenciesList();
            r.populatedList = store.crosswalk.alignedCompetenciesList;

            // populateWorkingAlignmentMap
            store.crosswalk.setWorkingAlignmentsSource( 'compA');
            store.crosswalk.setWorkingAlignmentsType( 'narrows');
            store.crosswalk.setWorkingAlignmentsTargets( []);
            store.crosswalk.populateWorkingAlignmentMap();
            r.populatedTargets = store.crosswalk.workingAlignmentsMap.targets;

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
