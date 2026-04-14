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
            const store = window.__stores;
            if (!store) return null;
            const r = {};

            // Side nav
            r.showSideNavDefault = store.app.showSideNav;
            store.app.closeSideNav();
            r.sideNavClosed = store.app.showSideNav;
            store.app.openSideNav();
            r.sideNavShown = store.app.showSideNav;
            r.sideNavEnabled = store.app.sideNavEnabled;

            // Right aside
            r.rightAsideDefault = store.app.showRightAside;
            store.app.openRightAside( 'TestContent');
            r.rightAsideShown = store.app.showRightAside;
            r.rightAsideContent = store.app.rightAsideContent;
            store.app.setCloseRightAside();
            r.rightAsideClosed = store.app.showRightAside;
            r.rightAsideContentCleared = store.app.rightAsideContent;
            r.rightAsideObjectCleared = store.app.rightAsideObject;

            // Modal
            r.showModalDefault = store.app.showModal;
            store.app.setShowModal( { component: 'TestComponent', title: 'Test' });
            r.showModalTrue = store.app.showModal;
            r.dynamicContent = store.app.dynamicModalContent;
            store.app.closeModal();
            r.showModalClosed = store.app.showModal;

            // objForShareModal
            store.app.setObjForShareModal( { id: 'test-obj' });
            r.shareObj = store.app.objForShareModal;
            store.app.setObjForShareModal( null);

            // dragging
            store.app.setDraggingEnabled( true);
            store.app.setIsDragging( true);
            store.app.setDraggable( true);
            r.draggable = store.app.draggable;
            store.app.setDraggingEnabled( false);
            store.app.setIsDragging( false);
            store.app.setDraggable( false);

            // comments
            store.app.setCanViewComments( true);
            r.canView = store.app.canViewComments;
            store.app.setCanAddComments( true);
            r.canAdd = store.app.canAddComments;
            store.app.setCanViewComments( false);
            store.app.setCanAddComments( false);

            // plugins
            store.app.pluginLastUpdate( '2024-01-01');
            r.pluginUpdate = store.app.pluginLastUpdate;
            store.app.pluginToLaunch( 'testPlugin');
            r.pluginLaunch = store.app.pluginToLaunch;
            store.app.pluginToLaunchLastUpdate( '2024-01-02');
            r.pluginLaunchUpdate = store.app.pluginToLaunchLastUpdate;

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
            const store = window.__stores;
            if (!store) return null;
            const r = {};

            // Import mutations
            store.app.setImportTransition( 'process');
            r.transition = store.app.importTransition;

            store.app.setImportType( 'server');
            r.type = store.app.importType;

            store.app.setImportFileType( 'csv');
            r.fileType = store.app.importFileType;

            store.app.setImportStatus( 'processing');
            r.status = store.app.importStatus;

            store.app.setImportAllowCancel( true);
            r.allowCancel = store.app.importAllowCancel;

            store.app.setImportFeedback( 'test feedback');
            r.feedback = store.app.importFeedback;

            store.app.setImportDuplicates( ['dup1', 'dup2']);
            r.duplicates = store.app.importDuplicates;

            store.app.setImportSkip( ['skip1']);
            r.skip = store.app.importSkip;

            store.app.setFirstImport( true);
            r.firstImport = store.app.firstImport;

            store.app.setImportFramework( { name: 'Test FW' });
            r.framework = store.app.importFramework;

            store.app.setImportFrameworkName( 'My Framework');
            r.fwName = store.app.importFrameworkName;

            store.app.setImportFrameworkDescription( 'A description');
            r.fwDesc = store.app.importFrameworkDescription;

            store.app.setImportText( 'some text to import');
            r.importText = store.app.importText;

            store.app.setImportServerUrl( 'http://example.com');
            r.serverUrl = store.app.importServerUrl;

            store.app.setImportUrl( 'http://example.com/fw');
            r.url = store.app.importUrl;

            store.app.setImportModalParams( { type: 'test' });
            r.modalParams = store.app.importModalParams;

            // Import files
            store.app.setImportFiles( ['file1.csv']);
            r.filesSet = store.app.importFiles;
            store.app.clearImportFiles();
            r.filesCleared = store.app.importFiles;

            // Import errors
            store.app.addImportError( 'error1');
            store.app.addImportError( 'error2');
            r.errors = store.app.importErrors;
            store.app.clearImportErrors();
            r.errorsCleared = store.app.importErrors;

            // resetImport action
            store.app.resetImport();
            r.resetTransition = store.app.importTransition;
            r.resetType = store.app.importType;
            r.resetStatus = store.app.importStatus;

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
            const store = window.__stores;
            if (!store) return null;
            const r = {};

            // CSV columns
            store.app.setImportNameColumn( { label: 'Name', index: 0 });
            r.nameCol = store.app.importNameColumn;
            store.app.setImportDescriptionColumn( { label: 'Desc', index: 1 });
            r.descCol = store.app.importDescriptionColumn;
            store.app.setImportScopeColumn( { label: 'Scope', index: 2 });
            r.scopeCol = store.app.importScopeColumn;
            store.app.setImportIdColumn( { label: 'ID', index: 3 });
            r.idCol = store.app.importIdColumn;
            store.app.setImportSourceColumn( { label: 'Source', index: 4 });
            r.sourceCol = store.app.importSourceColumn;
            store.app.setImportRelationColumn( { label: 'Relation', index: 5 });
            r.relCol = store.app.importRelationColumn;
            store.app.setImportTargetColumn( { label: 'Target', index: 6 });
            r.targetCol = store.app.importTargetColumn;
            store.app.setImportFrameworkNameColumn( { label: 'FW Name', index: 0 });
            r.fwNameCol = store.app.importFrameworkNameColumn;
            store.app.setImportFrameworkScopeColumn( { label: 'FW Scope', index: 1 });
            r.fwScopeCol = store.app.importFrameworkScopeColumn;
            store.app.setImportFrameworkIdColumn( { label: 'FW ID', index: 2 });
            r.fwIdCol = store.app.importFrameworkIdColumn;
            store.app.setCsvColumns( ['col1', 'col2', 'col3']);
            r.csvCols = store.app.csvColumns;
            store.app.setCsvRelationColumns( ['rel1', 'rel2']);
            r.csvRelCols = store.app.csvRelationColumns;
            store.app.setCsvRelationFile( 'relations.csv');
            r.csvRelFile = store.app.csvRelationFile;

            // Framework search
            store.app.setSearchTerm( 'test search');
            r.searchTerm = store.app.searchTerm;
            store.app.setRefreshSearch( true);
            r.refreshSearch = store.app.refreshSearch;
            store.app.setRefreshSearch( false);

            // Quick filters
            r.quickFilters = store.app.quickFilters;
            store.app.setSingleQuickFilter( { id: 'ownedByMe', checked: true });
            r.filterOwned = store.app.filterByOwnedByMe;
            store.app.setSingleQuickFilter( { id: 'notOwnedByMe', checked: true });
            r.filterNotOwned = store.app.filterByNotOwnedByMe;
            store.app.setSingleQuickFilter( { id: 'configMatchDefault', checked: true });
            r.filterConfig = store.app.filterByConfigMatchDefault;
            // Push a new filter
            store.app.setSingleQuickFilter( { id: 'customFilter', checked: true });
            // Clear all
            store.app.clearSearchFilters();
            r.filterOwnedAfterClear = store.app.filterByOwnedByMe;

            store.app.setSearchFrameworksInCompetencySearch( true);
            r.searchFwInComp = store.app.searchFrameworksInCompetencySearch;
            store.app.setSearchFrameworksInCompetencySearch( false);

            // Sort results
            store.app.setSortResults( { id: 'lastEdited', label: 'Last Edited' });
            r.sortResults = store.app.sortResults;

            // Apply search to
            r.applySearchTo = store.app.applySearchTo;

            // Directories
            store.app.setSelectDirectory( { id: 'dir-1', name: 'Test Dir' });
            r.selectedDir = store.app.selectedDirectory;
            store.app.setDirectoryList( [{ id: 'dir-1' }, { id: 'dir-2' }]);
            r.dirList = store.app.directoryList;
            store.app.setSearchingInDirectory( false);
            r.searchInDir = store.app.searchingInDirectory;
            store.app.setEditDirectory( true);
            r.editDir = store.app.editDirectory;

            // Clean up
            store.app.setSelectDirectory( null);
            store.app.setSearchingInDirectory( true);
            store.app.setEditDirectory( false);
            store.app.setSearchTerm( '');

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
            const store = window.__stores;
            if (!store) return null;
            const r = {};

            // Banner
            store.app.setBanner( { message: 'Test banner', color: 'red', background: 'yellow' });
            r.bannerMsg = store.app.bannerMessage;
            r.bannerColor = store.app.bannerColor;
            r.bannerBg = store.app.bannerBackground;

            // MOTD
            store.app.setMotd( { message: 'Hello World', title: 'Welcome' });
            r.motdMsg = store.app.motdMessage;
            r.motdTitle = store.app.motdTitle;

            // Curated plugins
            store.app.setCuratedPlugins( [{ id: 'p1', url: 'http://p1' }]);
            r.plugins = store.app.curatedPlugins;

            // clearImport action
            store.app.clearImport();
            r.afterClearFw = store.app.importFramework;
            r.afterClearFiles = store.app.importFiles;
            r.afterClearErrors = store.app.importErrors;
            r.afterClearTransition = store.app.importTransition;
            r.afterClearStatus = store.app.importStatus;

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
