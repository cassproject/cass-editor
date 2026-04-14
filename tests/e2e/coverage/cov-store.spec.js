const {
  test,
  expect,
  navigateToFramework
} = require('../fixtures');

// Coverage: app.js (31%), editor.js (23%), lode.js (36%), featuresEnabled.js (42%)
// Exercises Vuex store mutations, getters, and state

test('Store: app module state', async ({
  page
}) => {
  await page.goto('/#/frameworks?server=http://localhost/api/');
  await expect(page.locator('#frameworks')).toBeVisible();
  const result = await page.evaluate(() => {
    const store = window.__stores;
    if (!store) return {
      error: 'no store'
    };
    return {
      hasAppState: store.state.app != null,
      canViewComments: store.state.app?.canViewComments,
      canAddComments: store.state.app?.canAddComments,
      showRightAside: store.state.app?.showRightAside,
      frameworks: store.state.app?.frameworks != null
    };
  });
  expect(result.hasAppState).toBe(true);
});
test('Store: app module mutations', async ({
  page
}) => {
  await page.goto('/#/frameworks?server=http://localhost/api/');
  await expect(page.locator('#frameworks')).toBeVisible();
  const result = await page.evaluate(() => {
    const store = window.__stores;
    if (!store) return {
      error: 'no store'
    };

    // Exercise showRightAside / closeRightAside
    store.app.openRightAside( 'test-content');
    const afterShow = store.app.showRightAside;
    store.app.setCloseRightAside();
    const afterClose = store.app.showRightAside;

    // Exercise setCanViewComments / setCanAddComments
    store.app.setCanViewComments( true);
    const canView = store.app.canViewComments;
    store.app.setCanAddComments( true);
    const canAdd = store.app.canAddComments;

    // Reset
    store.app.setCanViewComments( false);
    store.app.setCanAddComments( false);

    // Exercise searchTerm mutation
    store.app.setSearchTerm( 'test-search');
    const searchTerm = store.app.frameworks.searchTerm;
    store.app.setSearchTerm( '');

    // Exercise import mutations
    store.app.importTransition( 'process');
    const transition = store.app.import.transition;
    store.app.importTransition( 'upload');

    // Exercise banner/motd mutations
    store.app.setBanner( {
      message: 'test',
      color: 'red',
      background: 'white'
    });
    store.app.setMotd( {
      message: 'hello',
      title: 'Test'
    });
    return {
      afterShow,
      afterClose,
      canView,
      canAdd,
      searchTerm,
      transition
    };
  });
  expect(result.afterShow).toBe(true);
  expect(result.afterClose).toBe(false);
  expect(result.canView).toBe(true);
  expect(result.canAdd).toBe(true);
  expect(result.searchTerm).toBe('test-search');
});
test('Store: editor module state', async ({
  page
}) => {
  await page.goto('/#/frameworks?server=http://localhost/api/');
  await expect(page.locator('#frameworks')).toBeVisible();
  if (!(await navigateToFramework(page))) return;
  await expect(page.locator('#framework')).toBeVisible();
  const result = await page.evaluate(() => {
    const store = window.__stores;
    if (!store) return {
      error: 'no store'
    };
    return {
      hasEditorState: store.state.editor != null,
      framework: store.state.editor?.framework != null,
      selectedCompetency: store.state.editor?.selectedCompetency,
      queryParams: store.state.editor?.queryParams,
      private: store.state.editor?.private,
      newFramework: store.state.editor?.newFramework,
      t3Profile: store.state.editor?.t3Profile
    };
  });
  expect(result.hasEditorState).toBe(true);
  expect(result.framework).toBe(true);
});
test('Store: editor module mutations', async ({
  page
}) => {
  await page.goto('/#/frameworks?server=http://localhost/api/');
  await expect(page.locator('#frameworks')).toBeVisible();
  if (!(await navigateToFramework(page))) return;
  await expect(page.locator('#framework')).toBeVisible();
  const result = await page.evaluate(() => {
    const store = window.__stores;
    if (!store) return {
      error: 'no store'
    };

    // Exercise cutId/copyId
    store.editor.cutId( 'test-cut-id');
    const cutId = store.state.editor?.cutId;
    store.editor.cutId( null);
    store.editor.copyId( 'test-copy-id');
    const copyId = store.state.editor?.copyId;
    store.editor.copyId( null);
    return {
      cutId,
      copyId
    };
  });
  expect(result.cutId).toBe('test-cut-id');
  expect(result.copyId).toBe('test-copy-id');
});
test('Store: lode module state and mutations', async ({
  page
}) => {
  await page.goto('/#/frameworks?server=http://localhost/api/');
  await expect(page.locator('#frameworks')).toBeVisible();
  await page.waitForFunction(() => window.__stores);
  const result = await page.evaluate(() => {
    const store = window.__stores;
    const hasLodeState = store.state.lode != null;

    // Exercise lode mutations without strict type checks
    try {
      store.lode.setAddingProperty( 'testProp');
      store.lode.setAddingProperty( '');
      store.lode.setAddingRange( ['testRange']);
      store.lode.setAddingRange( []);
    } catch (e) {
      return {
        error: e.message
      };
    }
    return {
      hasLodeState,
      ok: true
    };
  });
  expect(result.hasLodeState).toBe(true);
  expect(result.ok).toBe(true);
});
test('Store: featuresEnabled state and reading', async ({
  page
}) => {
  await page.goto('/#/frameworks?server=http://localhost/api/');
  await expect(page.locator('#frameworks')).toBeVisible();
  const result = await page.evaluate(() => {
    const store = window.__stores;
    if (!store) return {
      error: 'no store'
    };
    return {
      hasFeatures: store.state.featuresEnabled != null,
      directoryEnabled: store.state.featuresEnabled?.directoryEnabled,
      progressionModelEnabled: store.state.featuresEnabled?.progressionModelEnabled,
      conceptsEnabled: store.state.featuresEnabled?.conceptsEnabled,
      apiLoginEnabled: store.state.featuresEnabled?.apiLoginEnabled,
      collectionsEnabled: store.state.featuresEnabled?.collectionsEnabled,
      pluginManagerEnabled: store.state.featuresEnabled?.pluginManagerEnabled,
      configurationsEnabled: store.state.featuresEnabled?.configurationsEnabled,
      crosswalkEnabled: store.state.featuresEnabled?.crosswalkEnabled,
      shareEnabled: store.state.featuresEnabled?.shareEnabled,
      loginEnabled: store.state.featuresEnabled?.loginEnabled
    };
  });
  expect(result.hasFeatures).toBe(true);
});
test('Store: app getters coverage', async ({
  page
}) => {
  await page.goto('/#/frameworks?server=http://localhost/api/');
  await expect(page.locator('#frameworks')).toBeVisible();
  const result = await page.evaluate(() => {
    const store = window.__stores;
    if (!store) return {
      error: 'no store'
    };
    return {
      canViewComments: store.app.canViewComments,
      canAddComments: store.app.canAddComments,
      sideNavEnabled: store.app.sideNavEnabled,
      showSideNav: store.app.showSideNav,
      showRightAside: store.app.showRightAside,
      searchTerm: store.app.searchTerm,
      sortResults: store.app.sortResults,
      quickFilters: store.app.quickFilters,
      importTransition: store.app.importTransition,
      filterByOwnedByMe: store.app.filterByOwnedByMe,
      filterByNotOwnedByMe: store.app.filterByNotOwnedByMe
    };
  });
  expect(result.canViewComments).toBeDefined();
  expect(result.sideNavEnabled).toBeDefined();
});