/**
 * Coverage tests for app.js store module
 * 631 lines — exercises side nav, right aside, modal, import, framework search,
 * directory, banner, and MOTD mutations/getters/actions.
 */

const { test, expect } = require('../fixtures');

test.describe('App Store Coverage', () => {

    test('Exercise side nav, right aside, and modal mutations', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        const result = await page.evaluate(() => {
            const store = window.app && window.app.$store;
            if (!store) return null;
            const r = {};

            // Side nav
            r.showSideNavDefault = store.getters['app/showSideNav'];
            store.commit('app/closeSideNav');
            r.sideNavClosed = store.getters['app/showSideNav'];
            store.commit('app/showSideNav');
            r.sideNavShown = store.getters['app/showSideNav'];
            r.sideNavEnabled = store.getters['app/sideNavEnabled'];

            // Right aside
            r.rightAsideDefault = store.getters['app/showRightAside'];
            store.commit('app/showRightAside', 'TestContent');
            r.rightAsideShown = store.getters['app/showRightAside'];
            r.rightAsideContent = store.getters['app/rightAsideContent'];
            store.commit('app/closeRightAside');
            r.rightAsideClosed = store.getters['app/showRightAside'];
            r.rightAsideContentCleared = store.getters['app/rightAsideContent'];
            r.rightAsideObjectCleared = store.getters['app/rightAsideObject'];

            // Modal
            r.showModalDefault = store.getters['app/showModal'];
            store.commit('app/showModal', { component: 'TestComponent', title: 'Test' });
            r.showModalTrue = store.getters['app/showModal'];
            r.dynamicContent = store.getters['app/dynamicModalContent'];
            store.commit('app/closeModal');
            r.showModalClosed = store.getters['app/showModal'];

            // objForShareModal
            store.commit('app/objForShareModal', { id: 'test-obj' });
            r.shareObj = store.getters['app/objForShareModal'];
            store.commit('app/objForShareModal', null);

            // dragging
            store.commit('app/draggingEnabled', true);
            store.commit('app/isDragging', true);
            store.commit('app/draggable', true);
            r.draggable = store.getters['app/draggable'];
            store.commit('app/draggingEnabled', false);
            store.commit('app/isDragging', false);
            store.commit('app/draggable', false);

            // comments
            store.commit('app/setCanViewComments', true);
            r.canView = store.getters['app/canViewComments'];
            store.commit('app/setCanAddComments', true);
            r.canAdd = store.getters['app/canAddComments'];
            store.commit('app/setCanViewComments', false);
            store.commit('app/setCanAddComments', false);

            // plugins
            store.commit('app/pluginLastUpdate', '2024-01-01');
            r.pluginUpdate = store.getters['app/pluginLastUpdate'];
            store.commit('app/pluginToLaunch', 'testPlugin');
            r.pluginLaunch = store.getters['app/pluginToLaunch'];
            store.commit('app/pluginToLaunchLastUpdate', '2024-01-02');
            r.pluginLaunchUpdate = store.getters['app/pluginToLaunchLastUpdate'];

            return r;
        });

        expect(result).toBeTruthy();
        expect(result.sideNavClosed).toBe(false);
        expect(result.sideNavShown).toBe(true);
        expect(result.sideNavEnabled).toBe(true);
        expect(result.rightAsideShown).toBe(true);
        expect(result.rightAsideContent).toBe('TestContent');
        expect(result.rightAsideClosed).toBe(false);
        expect(result.rightAsideContentCleared).toBe('');
        expect(result.rightAsideObjectCleared).toBeNull();
        expect(result.showModalTrue).toBe(true);
        expect(result.dynamicContent).toEqual({ component: 'TestComponent', title: 'Test' });
        expect(result.showModalClosed).toBe(false);
        expect(result.shareObj).toEqual({ id: 'test-obj' });
        expect(result.draggable).toBe(true);
        expect(result.canView).toBe(true);
        expect(result.canAdd).toBe(true);
        expect(result.pluginUpdate).toBe('2024-01-01');
        expect(result.pluginLaunch).toBe('testPlugin');
        expect(result.pluginLaunchUpdate).toBe('2024-01-02');
    });

    test('Exercise import mutations and resetImport', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        const result = await page.evaluate(() => {
            const store = window.app && window.app.$store;
            if (!store) return null;
            const r = {};

            // Import mutations
            store.commit('app/importTransition', 'process');
            r.transition = store.getters['app/importTransition'];

            store.commit('app/importType', 'server');
            r.type = store.getters['app/importType'];

            store.commit('app/importFileType', 'csv');
            r.fileType = store.getters['app/importFileType'];

            store.commit('app/importStatus', 'processing');
            r.status = store.getters['app/importStatus'];

            store.commit('app/importAllowCancel', true);
            r.allowCancel = store.getters['app/importAllowCancel'];

            store.commit('app/importFeedback', 'test feedback');
            r.feedback = store.getters['app/importFeedback'];

            store.commit('app/importDuplicates', ['dup1', 'dup2']);
            r.duplicates = store.getters['app/importDuplicates'];

            store.commit('app/importSkip', ['skip1']);
            r.skip = store.getters['app/importSkip'];

            store.commit('app/firstImport', true);
            r.firstImport = store.getters['app/firstImport'];

            store.commit('app/importFramework', { name: 'Test FW' });
            r.framework = store.getters['app/importFramework'];

            store.commit('app/importFrameworkName', 'My Framework');
            r.fwName = store.getters['app/importFrameworkName'];

            store.commit('app/importFrameworkDescription', 'A description');
            r.fwDesc = store.getters['app/importFrameworkDescription'];

            store.commit('app/importText', 'some text to import');
            r.importText = store.getters['app/importText'];

            store.commit('app/importServerUrl', 'http://example.com');
            r.serverUrl = store.getters['app/importServerUrl'];

            store.commit('app/importUrl', 'http://example.com/fw');
            r.url = store.getters['app/importUrl'];

            store.commit('app/importModalParams', { type: 'test' });
            r.modalParams = store.getters['app/importModalParams'];

            // Import files
            store.commit('app/importFiles', ['file1.csv']);
            r.filesSet = store.getters['app/importFiles'];
            store.commit('app/clearImportFiles');
            r.filesCleared = store.getters['app/importFiles'];

            // Import errors
            store.commit('app/addImportError', 'error1');
            store.commit('app/addImportError', 'error2');
            r.errors = store.getters['app/importErrors'];
            store.commit('app/clearImportErrors');
            r.errorsCleared = store.getters['app/importErrors'];

            // resetImport action
            store.commit('app/resetImport');
            r.resetTransition = store.getters['app/importTransition'];
            r.resetType = store.getters['app/importType'];
            r.resetStatus = store.getters['app/importStatus'];

            return r;
        });

        expect(result).toBeTruthy();
        expect(result.transition).toBe('process');
        expect(result.type).toBe('server');
        expect(result.fileType).toBe('csv');
        expect(result.status).toBe('processing');
        expect(result.allowCancel).toBe(true);
        expect(result.feedback).toBe('test feedback');
        expect(result.duplicates).toEqual(['dup1', 'dup2']);
        expect(result.skip).toEqual(['skip1']);
        expect(result.firstImport).toBe(true);
        expect(result.framework).toEqual({ name: 'Test FW' });
        expect(result.fwName).toBe('My Framework');
        expect(result.fwDesc).toBe('A description');
        expect(result.importText).toBe('some text to import');
        expect(result.serverUrl).toBe('http://example.com');
        expect(result.url).toBe('http://example.com/fw');
        expect(result.modalParams).toEqual({ type: 'test' });
        expect(result.filesSet).toEqual(['file1.csv']);
        expect(result.filesCleared).toEqual([]);
        expect(result.errors).toEqual(['error1', 'error2']);
        expect(result.errorsCleared).toEqual([]);
        expect(result.resetTransition).toBe('upload');
        expect(result.resetType).toBe('file');
        expect(result.resetStatus).toBe('');
    });

    test('Exercise CSV column, framework search, and directory mutations', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        const result = await page.evaluate(() => {
            const store = window.app && window.app.$store;
            if (!store) return null;
            const r = {};

            // CSV columns
            store.commit('app/importNameColumn', { label: 'Name', index: 0 });
            r.nameCol = store.getters['app/importNameColumn'];
            store.commit('app/importDescriptionColumn', { label: 'Desc', index: 1 });
            r.descCol = store.getters['app/importDescriptionColumn'];
            store.commit('app/importScopeColumn', { label: 'Scope', index: 2 });
            r.scopeCol = store.getters['app/importScopeColumn'];
            store.commit('app/importIdColumn', { label: 'ID', index: 3 });
            r.idCol = store.getters['app/importIdColumn'];
            store.commit('app/importSourceColumn', { label: 'Source', index: 4 });
            r.sourceCol = store.getters['app/importSourceColumn'];
            store.commit('app/importRelationColumn', { label: 'Relation', index: 5 });
            r.relCol = store.getters['app/importRelationColumn'];
            store.commit('app/importTargetColumn', { label: 'Target', index: 6 });
            r.targetCol = store.getters['app/importTargetColumn'];
            store.commit('app/importFrameworkNameColumn', { label: 'FW Name', index: 0 });
            r.fwNameCol = store.getters['app/importFrameworkNameColumn'];
            store.commit('app/importFrameworkScopeColumn', { label: 'FW Scope', index: 1 });
            r.fwScopeCol = store.getters['app/importFrameworkScopeColumn'];
            store.commit('app/importFrameworkIdColumn', { label: 'FW ID', index: 2 });
            r.fwIdCol = store.getters['app/importFrameworkIdColumn'];
            store.commit('app/csvColumns', ['col1', 'col2', 'col3']);
            r.csvCols = store.getters['app/csvColumns'];
            store.commit('app/csvRelationColumns', ['rel1', 'rel2']);
            r.csvRelCols = store.getters['app/csvRelationColumns'];
            store.commit('app/csvRelationFile', 'relations.csv');
            r.csvRelFile = store.getters['app/csvRelationFile'];

            // Framework search
            store.commit('app/searchTerm', 'test search');
            r.searchTerm = store.getters['app/searchTerm'];
            store.commit('app/refreshSearch', true);
            r.refreshSearch = store.getters['app/refreshSearch'];
            store.commit('app/refreshSearch', false);

            // Quick filters
            r.quickFilters = store.getters['app/quickFilters'];
            store.commit('app/singleQuickFilter', { id: 'ownedByMe', checked: true });
            r.filterOwned = store.getters['app/filterByOwnedByMe'];
            store.commit('app/singleQuickFilter', { id: 'notOwnedByMe', checked: true });
            r.filterNotOwned = store.getters['app/filterByNotOwnedByMe'];
            store.commit('app/singleQuickFilter', { id: 'configMatchDefault', checked: true });
            r.filterConfig = store.getters['app/filterByConfigMatchDefault'];
            // Push a new filter
            store.commit('app/singleQuickFilter', { id: 'customFilter', checked: true });
            // Clear all
            store.commit('app/clearSearchFilters');
            r.filterOwnedAfterClear = store.getters['app/filterByOwnedByMe'];

            store.commit('app/searchFrameworksInCompetencySearch', true);
            r.searchFwInComp = store.getters['app/searchFrameworksInCompetencySearch'];
            store.commit('app/searchFrameworksInCompetencySearch', false);

            // Sort results
            store.commit('app/sortResults', { id: 'lastEdited', label: 'Last Edited' });
            r.sortResults = store.getters['app/sortResults'];

            // Apply search to
            r.applySearchTo = store.getters['app/applySearchTo'];

            // Directories
            store.commit('app/selectDirectory', { id: 'dir-1', name: 'Test Dir' });
            r.selectedDir = store.getters['app/selectedDirectory'];
            store.commit('app/directoryList', [{ id: 'dir-1' }, { id: 'dir-2' }]);
            r.dirList = store.getters['app/directoryList'];
            store.commit('app/searchingInDirectory', false);
            r.searchInDir = store.getters['app/searchingInDirectory'];
            store.commit('app/editDirectory', true);
            r.editDir = store.getters['app/editDirectory'];

            // Clean up
            store.commit('app/selectDirectory', null);
            store.commit('app/searchingInDirectory', true);
            store.commit('app/editDirectory', false);
            store.commit('app/searchTerm', '');

            return r;
        });

        expect(result).toBeTruthy();
        expect(result.nameCol).toEqual({ label: 'Name', index: 0 });
        expect(result.descCol).toEqual({ label: 'Desc', index: 1 });
        expect(result.scopeCol).toEqual({ label: 'Scope', index: 2 });
        expect(result.idCol).toEqual({ label: 'ID', index: 3 });
        expect(result.sourceCol).toEqual({ label: 'Source', index: 4 });
        expect(result.relCol).toEqual({ label: 'Relation', index: 5 });
        expect(result.targetCol).toEqual({ label: 'Target', index: 6 });
        expect(result.fwNameCol).toEqual({ label: 'FW Name', index: 0 });
        expect(result.fwScopeCol).toEqual({ label: 'FW Scope', index: 1 });
        expect(result.fwIdCol).toEqual({ label: 'FW ID', index: 2 });
        expect(result.csvCols).toEqual(['col1', 'col2', 'col3']);
        expect(result.csvRelCols).toEqual(['rel1', 'rel2']);
        expect(result.csvRelFile).toBe('relations.csv');
        expect(result.searchTerm).toBe('test search');
        expect(result.refreshSearch).toBe(true);
        expect(result.filterOwned).toBe(true);
        expect(result.filterNotOwned).toBe(true);
        expect(result.filterConfig).toBe(true);
        expect(result.filterOwnedAfterClear).toBe(false);
        expect(result.searchFwInComp).toBe(true);
        expect(result.selectedDir).toEqual({ id: 'dir-1', name: 'Test Dir' });
        expect(result.dirList).toHaveLength(2);
        expect(result.searchInDir).toBe(false);
        expect(result.editDir).toBe(true);
    });

    test('Exercise banner, MOTD, and curatedPlugins mutations', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        const result = await page.evaluate(() => {
            const store = window.app && window.app.$store;
            if (!store) return null;
            const r = {};

            // Banner
            store.commit('app/setBanner', { message: 'Test banner', color: 'red', background: 'yellow' });
            r.bannerMsg = store.getters['app/bannerMessage'];
            r.bannerColor = store.getters['app/bannerColor'];
            r.bannerBg = store.getters['app/bannerBackground'];

            // MOTD
            store.commit('app/setMotd', { message: 'Hello World', title: 'Welcome' });
            r.motdMsg = store.getters['app/motdMessage'];
            r.motdTitle = store.getters['app/motdTitle'];

            // Curated plugins
            store.commit('app/setCuratedPlugins', [{ id: 'p1', url: 'http://p1' }]);
            r.plugins = store.getters['app/curatedPlugins'];

            // clearImport action
            store.dispatch('app/clearImport');
            r.afterClearFw = store.getters['app/importFramework'];
            r.afterClearFiles = store.getters['app/importFiles'];
            r.afterClearErrors = store.getters['app/importErrors'];
            r.afterClearTransition = store.getters['app/importTransition'];
            r.afterClearStatus = store.getters['app/importStatus'];

            return r;
        });

        expect(result).toBeTruthy();
        expect(result.bannerMsg).toBe('Test banner');
        expect(result.bannerColor).toBe('red');
        expect(result.bannerBg).toBe('yellow');
        expect(result.motdMsg).toBe('Hello World');
        expect(result.motdTitle).toBe('Welcome');
        expect(result.plugins).toEqual([{ id: 'p1', url: 'http://p1' }]);
        expect(result.afterClearFw).toBeNull();
        expect(result.afterClearFiles).toEqual([]);
        expect(result.afterClearErrors).toEqual([]);
        expect(result.afterClearTransition).toBe('upload');
        expect(result.afterClearStatus).toBe('');
    });
});
