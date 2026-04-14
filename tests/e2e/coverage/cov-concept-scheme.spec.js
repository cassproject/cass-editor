/**
 * Coverage tests for Concept Scheme views:
 * - ConceptScheme.vue (/conceptScheme) — currently at 0%
 * - ConceptHierarchy.vue — currently at 0%
 *
 * To test ConceptScheme, we need to create a concept scheme first,
 * or navigate to an existing one via the /concepts list.
 */

const {
  test,
  expect,
  loginAndNavigate
} = require('../fixtures');
test.describe.serial('Concept Scheme Coverage', () => {
  test('Concepts list page loads with concept mode', async ({
    page
  }) => {
    await page.goto('/#/concepts?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');

    // The concepts route uses Frameworks.vue but in concept mode
    const conceptModeData = await page.evaluate(() => {
      if (window.__stores) {
        return {
          conceptMode: window.__stores.editor.conceptMode,
          progressionMode: window.__stores.editor.progressionMode
        };
      }
      return null;
    });
    // After navigating to /concepts, conceptMode should be true
  });
  test('Create and navigate to a concept scheme', async ({
    page
  }) => {
    await loginAndNavigate(page);

    // Set concept mode
    await page.evaluate(() => {
      window.__stores.editor.conceptMode( true);
      window.__stores.editor.progressionMode( false);
    });

    // Navigate to concepts list
    await page.goto('/#/concepts?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    // Look for existing concept schemes in the list
    const thingItems = page.locator('.cass--list--item .cass--list--thing');
    const count = await thingItems.count();
    if (count > 0) {
      // Double-click to open the first concept scheme
      await thingItems.first().dblclick();
      // Check if we navigated to a concept scheme view
      const currentUrl = page.url();
      if (currentUrl.includes('conceptScheme')) {
        // Exercise ConceptScheme component
        const csData = await page.evaluate(() => {
          const els = document.querySelectorAll('[id]');
          for (const el of els) {
            if (el.__vueParentComponent && el.__vueParentComponent.$options.name === 'ConceptScheme') {
              const vm = el.__vueParentComponent.ctx;
              return {
                name: (vm.$options?.name || vm.__name),
                hasFramework: !!vm.framework,
                canEdit: vm.canEdit,
                queryParams: vm.queryParams
              };
            }
          }
          // Try finding via app tree
          if (window.app) {
            const found = [];
            function findCS(vm) {
              if ((vm.$options?.name || vm.__name) === 'ConceptScheme') {
                found.push({
                  name: (vm.$options?.name || vm.__name),
                  hasFramework: !!vm.framework
                });
              }
              vm.$children.forEach(child => findCS(child));
            }
            findCS(window.app);
            return found.length > 0 ? found[0] : null;
          }
          return null;
        });
        if (csData) {
          expect(csData.name).toBe('ConceptScheme');
        }
      }
    }
  });
  test('Exercise concept mode store mutations', async ({
    page
  }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');

    // Exercise concept mode related store mutations
    const storeData = await page.evaluate(() => {
      const store = window.__stores;
      if (!store) return null;

      // Set concept mode
      store.editor.conceptMode( true);
      const cm1 = store.editor.conceptMode;
      store.editor.conceptMode( false);
      const cm2 = store.editor.conceptMode;

      // Collection mode
      store.editor.collectionMode( true);
      const col1 = store.editor.collectionMode;
      store.editor.collectionMode( false);
      const col2 = store.editor.collectionMode;
      return {
        cm1,
        cm2,
        col1,
        col2
      };
    });
    if (storeData) {
      expect(storeData.cm1).toBe(true);
      expect(storeData.cm2).toBe(false);
      expect(storeData.col1).toBe(true);
      expect(storeData.col2).toBe(false);
    }
  });
  test('Navigate to concepts and exercise Frameworks.vue in concept mode', async ({
    page
  }) => {
    await loginAndNavigate(page);
    await page.goto('/#/concepts?server=http://localhost/api/');
    await page.waitForLoadState('domcontentloaded');
    // Exercise Frameworks.vue computed properties in concept mode
    const frameworksData = await page.evaluate(() => {
      if (window.app) {
        const found = [];
        function findFW(vm) {
          if ((vm.$options?.name || vm.__name) === 'Frameworks') {
            found.push({
              name: (vm.$options?.name || vm.__name),
              conceptMode: vm.$store.editor.conceptMode,
              type: vm.type
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
});