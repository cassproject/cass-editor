const { test, expect, navigateToFramework } = require('../fixtures');

// Coverage: app.js (31%), editor.js (23%), lode.js (36%), featuresEnabled.js (42%)
// Exercises Vuex store mutations, getters, and state

test('Store: app module state', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();

    const result = await page.evaluate(() => {
        const store = window.app && window.app.$store;
        if (!store) return { error: 'no store' };
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

test('Store: app module mutations', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();

    const result = await page.evaluate(() => {
        const store = window.app && window.app.$store;
        if (!store) return { error: 'no store' };

        // Exercise showRightAside / closeRightAside
        store.commit('app/showRightAside', 'test-content');
        const afterShow = store.state.app.showRightAside;

        store.commit('app/closeRightAside');
        const afterClose = store.state.app.showRightAside;

        // Exercise setCanViewComments / setCanAddComments
        store.commit('app/setCanViewComments', true);
        const canView = store.state.app.canViewComments;

        store.commit('app/setCanAddComments', true);
        const canAdd = store.state.app.canAddComments;

        // Reset
        store.commit('app/setCanViewComments', false);
        store.commit('app/setCanAddComments', false);

        // Exercise searchTerm mutation
        store.commit('app/searchTerm', 'test-search');
        const searchTerm = store.state.app.frameworks.searchTerm;
        store.commit('app/searchTerm', '');

        // Exercise import mutations
        store.commit('app/importTransition', 'process');
        const transition = store.state.app.import.transition;
        store.commit('app/importTransition', 'upload');

        // Exercise banner/motd mutations
        store.commit('app/setBanner', { message: 'test', color: 'red', background: 'white' });
        store.commit('app/setMotd', { message: 'hello', title: 'Test' });

        return { afterShow, afterClose, canView, canAdd, searchTerm, transition };
    });

    expect(result.afterShow).toBe(true);
    expect(result.afterClose).toBe(false);
    expect(result.canView).toBe(true);
    expect(result.canAdd).toBe(true);
    expect(result.searchTerm).toBe('test-search');
});

test('Store: editor module state', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    const result = await page.evaluate(() => {
        const store = window.app && window.app.$store;
        if (!store) return { error: 'no store' };
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

test('Store: editor module mutations', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await navigateToFramework(page);
    await expect(page.locator('#framework')).toBeVisible();

    const result = await page.evaluate(() => {
        const store = window.app && window.app.$store;
        if (!store) return { error: 'no store' };

        // Exercise cutId/copyId
        store.commit('editor/cutId', 'test-cut-id');
        const cutId = store.state.editor?.cutId;
        store.commit('editor/cutId', null);

        store.commit('editor/copyId', 'test-copy-id');
        const copyId = store.state.editor?.copyId;
        store.commit('editor/copyId', null);

        return { cutId, copyId };
    });

    expect(result.cutId).toBe('test-cut-id');
    expect(result.copyId).toBe('test-copy-id');
});

test('Store: lode module state and mutations', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();
    await page.waitForFunction(() => window.app && window.app.$store, { timeout: 10000 });

    const result = await page.evaluate(() => {
        const store = window.app.$store;
        const hasLodeState = store.state.lode != null;

        // Exercise lode mutations without strict type checks
        try {
            store.commit('lode/addingProperty', 'testProp');
            store.commit('lode/addingProperty', '');
            store.commit('lode/addingRange', ['testRange']);
            store.commit('lode/addingRange', []);
        } catch (e) {
            return { error: e.message };
        }

        return { hasLodeState, ok: true };
    });

    expect(result.hasLodeState).toBe(true);
    expect(result.ok).toBe(true);
});

test('Store: featuresEnabled state and reading', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();

    const result = await page.evaluate(() => {
        const store = window.app && window.app.$store;
        if (!store) return { error: 'no store' };
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

test('Store: app getters coverage', async ({ page }) => {
    await page.goto('/#/frameworks?server=http://localhost/api/');
    await expect(page.locator('#frameworks')).toBeVisible();

    const result = await page.evaluate(() => {
        const store = window.app && window.app.$store;
        if (!store) return { error: 'no store' };
        return {
            canViewComments: store.getters['app/canViewComments'],
            canAddComments: store.getters['app/canAddComments'],
            sideNavEnabled: store.getters['app/sideNavEnabled'],
            showSideNav: store.getters['app/showSideNav'],
            showRightAside: store.getters['app/showRightAside'],
            searchTerm: store.getters['app/searchTerm'],
            sortResults: store.getters['app/sortResults'],
            quickFilters: store.getters['app/quickFilters'],
            importTransition: store.getters['app/importTransition'],
            filterByOwnedByMe: store.getters['app/filterByOwnedByMe'],
            filterByNotOwnedByMe: store.getters['app/filterByNotOwnedByMe']
        };
    });

    expect(result.canViewComments).toBeDefined();
    expect(result.sideNavEnabled).toBeDefined();
});
