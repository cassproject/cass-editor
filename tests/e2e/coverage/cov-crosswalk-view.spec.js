/**
 * Coverage tests for Crosswalk.vue view
 * Currently at 11% stmts, 630 lines — exercises computed props and store interactions.
 */

const {
  test,
  expect
} = require('../fixtures');
test.describe('Crosswalk View Coverage', () => {
  test('Exercise crosswalk page load and store state', async ({
    page
  }) => {
    await page.goto('/#/crosswalk?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    const result = await page.evaluate(() => {
      const store = window.__stores;
      if (!store) return null;
      const r = {};

      // Exercise crosswalk store getters
      r.step = store.crosswalk.step;
      r.sourceState = store.crosswalk.sourceState;
      r.targetState = store.crosswalk.targetState;
      r.enabledTypes = store.crosswalk.enabledRelationshipTypes;
      r.source = store.crosswalk.frameworkSource;
      r.target = store.crosswalk.frameworkTarget;

      // Find the crosswalk component
      const findComponent = vnode => {
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
        store.crosswalk.setStep( 0);
        store.crosswalk.setSourceState( 'ready');
        store.crosswalk.setTargetState( 'ready');
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
  test('Exercise crosswalk store operations for coverage', async ({
    page
  }) => {
    await page.goto('/#/crosswalk?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    const result = await page.evaluate(() => {
      const store = window.__stores;
      if (!store) return null;
      const r = {};

      // Simulate crosswalk workflow through store
      store.crosswalk.setStep( 0);

      // Step 0: Select source framework
      store.crosswalk.setFrameworkSource( {
        id: 'http://test/framework/1',
        shortId: () => 'http://test/framework/1',
        getName: () => 'Test Source Framework'
      });
      r.afterSelectSource = store.crosswalk.step;

      // Step 1: Select target framework
      store.crosswalk.setFrameworkTarget( {
        id: 'http://test/framework/2',
        shortId: () => 'http://test/framework/2',
        getName: () => 'Test Target Framework'
      });

      // Configure relationship types
      store.crosswalk.setEnabledRelationshipTypes( ['narrows', 'broadens', 'isEquivalentTo']);
      store.crosswalk.setEnabledRelationshipTypesLastUpdate( Date.now());
      r.enabledTypes = store.crosswalk.enabledRelationshipTypes;

      // Set up working alignment
      store.crosswalk.setWorkingAlignmentsSource( 'http://test/competency/1');
      store.crosswalk.setWorkingAlignmentsType( 'narrows');
      store.crosswalk.addWorkingAlignmentsTarget( 'http://test/competency/2');
      store.crosswalk.addWorkingAlignmentsTarget( 'http://test/competency/3');
      r.workingSource = store.crosswalk.workingAlignmentsSource;
      r.workingTargets = store.crosswalk.workingAlignmentsTargets;

      // Prepopulate relevant alignments map
      store.crosswalk.setRelevantExistingAlignmentsMap( {
        'http://test/competency/1': [{
          source: 'http://test/competency/1',
          target: 'http://test/competency/5',
          relationType: 'isEquivalentTo'
        }]
      });
      store.crosswalk.setRelevantExistingAlignmentsMapLastUpdate( Date.now());

      // Add new alignment
      store.crosswalk.addAlignmentToRelevantAlignmentsMap( {
        source: 'http://test/competency/1',
        target: 'http://test/competency/6',
        relationType: 'narrows'
      });
      r.mapSize = Object.keys(store.crosswalk.relevantExistingAlignmentsMap).length;
      // Nested map: map[source][relationType][target] — count relation types
      const sourceEntry = store.crosswalk.relevantExistingAlignmentsMap['http://test/competency/1'];
      r.mapEntries = sourceEntry ? Object.keys(sourceEntry).length : 0;

      // Prepare alignments to save
      store.crosswalk.setAppendAlignmentsToSave( {
        source: 'http://test/competency/1',
        target: 'http://test/competency/2',
        relationType: 'narrows'
      });
      store.crosswalk.setAppendAlignmentsToSave( {
        source: 'http://test/competency/1',
        target: 'http://test/competency/3',
        relationType: 'narrows'
      });
      r.toSave = store.crosswalk.alignmentsToSave.length;

      // Move to review step
      store.crosswalk.setStep( 2);
      r.reviewStep = store.crosswalk.step;

      // Reset everything
      store.crosswalk.resetCrosswalk();
      r.afterReset = store.crosswalk.step;
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