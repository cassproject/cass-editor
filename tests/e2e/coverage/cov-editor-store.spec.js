/**
 * Coverage tests for editor.js store module
 * Currently at 58% stmts, 5.88% branches — exercises all mutations and getters.
 */

const { test, expect } = require('../fixtures');

test.describe('Editor Store Coverage', () => {

    test('Exercise editor store basic mutations and getters', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        const result = await page.evaluate(() => {
            const store = window.__stores;
            if (!store) return null;
            const r = {};

            store.editor.setSelectedCompetency( 'comp-1');
            r.selectedCompetency = store.editor.selectedCompetency;
            store.editor.setSelectedCompetency( null);

            store.editor.setQueryParams( { server: 'http://test' });
            r.queryParams = store.editor.queryParams;

            store.editor.setDefaultLanguage( 'en');
            r.defaultLanguage = store.editor.defaultLanguage;

            const oldBackoff = store.editor.webSocketBackoff;
            store.editor.webSocketBackoffIncrease();
            r.backoffIncreased = store.editor.webSocketBackoff === oldBackoff * 2;

            store.editor.setPrivate( true);
            r.private = store.editor.private;
            store.editor.setPrivate( false);

            store.editor.setSelectCompetencyRelation( 'narrows');
            r.relation = store.editor.selectCompetencyRelation;
            store.editor.setSelectCompetencyRelation( null);

            store.editor.setSelectingCompetencies( true);
            r.selecting = store.editor.selectingCompetencies;
            store.editor.setSelectingCompetencies( false);

            store.editor.setNewCompetency( 'new-comp-id');
            r.newComp = store.editor.newCompetency;
            store.editor.setNewCompetency( null);

            store.editor.setNewFramework( 'new-fw-id');
            r.newFw = store.editor.newFramework;
            store.editor.setNewFramework( null);

            store.editor.setT3Profile( true);
            r.t3 = store.editor.t3Profile;
            store.editor.setT3Profile( false);

            store.editor.setChangedObject( 'changed-id');
            r.changed = store.editor.changedObject;
            store.editor.setChangedObject( null);

            store.editor.setConfiguration( { name: 'test-config' });
            r.config = store.editor.configuration;
            store.editor.setConfiguration( null);

            return r;
        });

        expect(result).toBeTruthy();
        expect(result.selectedCompetency).toBe('comp-1');
        expect(result.queryParams.server).toBe('http://test');
        expect(result.defaultLanguage).toBe('en');
        expect(result.backoffIncreased).toBe(true);
        expect(result.private).toBe(true);
        expect(result.relation).toBe('narrows');
        expect(result.selecting).toBe(true);
        expect(result.newComp).toBe('new-comp-id');
        expect(result.newFw).toBe('new-fw-id');
        expect(result.t3).toBe(true);
        expect(result.changed).toBe('changed-id');
        expect(result.config.name).toBe('test-config');
    });

    test('Exercise editor store mode and hierarchy mutations', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        const result = await page.evaluate(() => {
            const store = window.__stores;
            if (!store) return null;
            const r = {};

            // conceptMode sets progressionMode to false
            store.editor.setConceptMode( true);
            r.conceptOn = store.editor.conceptMode;
            r.progOffWhenConcept = store.editor.progressionMode;
            store.editor.setConceptMode( false);
            r.conceptOff = store.editor.conceptMode;

            // progressionMode sets conceptMode to false
            store.editor.setProgressionMode( true);
            r.progOn = store.editor.progressionMode;
            r.conceptOffWhenProg = store.editor.conceptMode;
            store.editor.setProgressionMode( false);
            r.progOff = store.editor.progressionMode;

            store.editor.setCollectionMode( true);
            r.collection = store.editor.collectionMode;
            store.editor.setCollectionMode( false);

            store.editor.setRecomputeHierarchy( true);
            r.hierarchy = store.editor.recomputeHierarchy;
            store.editor.setRecomputeHierarchy( false);

            store.editor.setRecomputePrecedence( true);
            r.precedence = store.editor.recomputePrecedence;
            store.editor.setRecomputePrecedence( false);

            store.editor.setRecomputePrecedenceAfterReorder( true);
            r.reorder = store.editor.recomputePrecedenceAfterReorder;
            store.editor.setRecomputePrecedenceAfterReorder( false);

            store.editor.setRefreshLevels( true);
            r.levels = store.editor.refreshLevels;
            store.editor.setRefreshLevels( false);

            store.editor.setRefreshAlignments( true);
            r.alignments = store.editor.refreshAlignments;
            store.editor.setRefreshAlignments( false);

            store.editor.setRefreshProperties( true);
            r.properties = store.editor.refreshProperties;
            store.editor.setRefreshProperties( false);

            return r;
        });

        expect(result).toBeTruthy();
        expect(result.conceptOn).toBe(true);
        expect(result.progOffWhenConcept).toBe(false);
        expect(result.conceptOff).toBe(false);
        expect(result.progOn).toBe(true);
        expect(result.conceptOffWhenProg).toBe(false);
        expect(result.progOff).toBe(false);
        expect(result.collection).toBe(true);
        expect(result.hierarchy).toBe(true);
        expect(result.precedence).toBe(true);
        expect(result.reorder).toBe(true);
        expect(result.levels).toBe(true);
        expect(result.alignments).toBe(true);
        expect(result.properties).toBe(true);
    });

    test('Exercise editor store clipboard, comments, and item mutations', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        const result = await page.evaluate(() => {
            const store = window.__stores;
            if (!store) return null;
            const r = {};

            // Clipboard mutations
            store.editor.setCutId( 'cut-123');
            r.cutId = store.editor.cutId;
            store.editor.setCopyId( 'copy-456');
            r.copyId = store.editor.copyId;
            store.editor.setPaste( true);
            r.paste = store.editor.paste;
            store.editor.setCutOrCopyContainerId( 'container-789');
            r.containerId = store.editor.cutOrCopyContainerId;
            store.editor.setCutId( null);
            store.editor.setCopyId( null);
            store.editor.setPaste( false);

            // Node and relate mutations
            store.editor.setNodeInFocus( 'node-1');
            r.nodeInFocus = store.editor.nodeInFocus;
            store.editor.setNodeInFocus( null);

            store.editor.setRelations( { 'a': ['b'] });
            r.relations = store.editor.relations;

            store.editor.setSetPropertyLevel( 'Level2');
            r.propLevel = store.editor.setPropertyLevel;
            store.editor.setSetPropertyLevel( null);

            store.editor.setAddAnother( true);
            r.addAnother = store.editor.addAnother;
            store.editor.setAddAnother( false);

            // Item mutations
            store.editor.setItemToDelete( { id: 'del-1' });
            r.itemToDelete = store.editor.itemToDelete;
            store.editor.setItemToRemove( { id: 'rem-1' });
            r.itemToRemove = store.editor.itemToRemove;
            store.editor.setItemToExport( { id: 'exp-1' });
            r.itemToExport = store.editor.itemToExport;

            // Comment mutations
            store.editor.setAddCommentAboutId( 'about-1');
            r.commentAbout = store.editor.addCommentAboutId;
            store.editor.setAddCommentType( 'review');
            r.commentType = store.editor.addCommentType;
            store.editor.setCommentToEdit( { text: 'edit me' });
            r.commentEdit = store.editor.commentToEdit;
            store.editor.setCommentToReply( { text: 'reply' });
            r.commentReply = store.editor.commentToReply;
            store.editor.setCommentsToDelete( ['c1', 'c2']);
            r.commentsDelete = store.editor.commentsToDelete;
            store.editor.setCommentScrollTo( { id: 'scroll-1' });
            r.commentScroll = store.editor.commentScrollTo;

            // Framework comment data
            store.editor.setFrameworkCommentDataLoaded( true);
            r.commentDataLoaded = store.editor.frameworkCommentDataLoaded;
            store.editor.setFrameworkCommentList( [{ id: 'c1' }]);
            r.commentList = store.editor.frameworkCommentList;
            store.editor.setFrameworkCommentPersonMap( { p1: 'Person A' });
            r.commentPersonMap = store.editor.frameworkCommentPersonMap;

            store.editor.clearFrameworkCommentData();
            r.clearedLoaded = store.editor.frameworkCommentDataLoaded;
            r.clearedList = store.editor.frameworkCommentList;

            return r;
        });

        expect(result).toBeTruthy();
        expect(result.cutId).toBe('cut-123');
        expect(result.copyId).toBe('copy-456');
        expect(result.paste).toBe(true);
        expect(result.containerId).toBe('container-789');
        expect(result.nodeInFocus).toBe('node-1');
        expect(result.relations.a).toEqual(['b']);
        expect(result.propLevel).toBe('Level2');
        expect(result.addAnother).toBe(true);
        expect(result.itemToDelete.id).toBe('del-1');
        expect(result.itemToRemove.id).toBe('rem-1');
        expect(result.itemToExport.id).toBe('exp-1');
        expect(result.commentAbout).toBe('about-1');
        expect(result.commentType).toBe('review');
        expect(result.commentEdit.text).toBe('edit me');
        expect(result.commentReply.text).toBe('reply');
        expect(result.commentsDelete.length).toBe(2);
        expect(result.commentScroll.id).toBe('scroll-1');
        expect(result.commentDataLoaded).toBe(true);
        expect(result.commentList.length).toBe(1);
        expect(result.clearedLoaded).toBe(false);
        expect(result.clearedList.length).toBe(0);
    });

    test('Exercise editor store assertion and undo mutations', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        const result = await page.evaluate(() => {
            const store = window.__stores;
            if (!store) return null;
            const r = {};

            store.editor.setManageAssertions( true);
            r.manageAssertions = store.editor.manageAssertions;
            store.editor.setManageAssertions( false);

            store.editor.setBadgePk( 'pk-123');
            r.badgePk = store.editor.badgePk;
            store.editor.setBadgePk( null);

            store.editor.setMe( 'user-me');
            r.me = store.editor.getMe;
            store.editor.setSubject( 'user-sub');
            r.subject = store.editor.getSubject;
            store.editor.setPeople( [{ name: 'A' }]);
            r.people = store.editor.people;

            store.editor.setFirstSearchProcessing( false);
            r.firstSearch = store.editor.firstSearchProcessing;
            store.editor.setSearchingAssertions( true);
            r.searching = store.editor.searchingAssertions;
            store.editor.setSearchingAssertions( false);

            // Undo mutations
            store.editor.addEditsToUndo( { type: 'add', id: 'e1' });
            store.editor.addEditsToUndo( { type: 'remove', id: 'e2' });
            r.editsCount = store.editor.editsToUndo.length;

            store.editor.setLastEditToUndo( { type: 'add', id: 'e3' });
            r.lastEdit = store.editor.lastEditToUndo;

            // Selected competencies as properties
            store.editor.setSelectedCompetenciesAsProperties( ['c1', 'c2']);
            r.selectedComps = store.editor.selectedCompetenciesAsProperties;
            store.editor.setSelectedCompetenciesAsProperties( null);

            // Iframe paths
            store.editor.setCommonPathIframe( '/path/common');
            r.commonPath = store.editor.commonPathIframe;
            store.editor.setIframeCompetencyPathInterframework( '/path/inter');
            r.interPath = store.editor.iframeCompetencyPathInterframework;
            store.editor.setIframeConceptPath( '/path/concept');
            r.conceptPath = store.editor.iframeConceptPath;

            return r;
        });

        expect(result).toBeTruthy();
        expect(result.manageAssertions).toBe(true);
        expect(result.badgePk).toBe('pk-123');
        expect(result.me).toBe('user-me');
        expect(result.subject).toBe('user-sub');
        expect(result.people.length).toBe(1);
        expect(result.firstSearch).toBe(false);
        expect(result.searching).toBe(true);
        expect(result.editsCount).toBeGreaterThanOrEqual(2);
        expect(result.lastEdit.id).toBe('e3');
        expect(result.selectedComps.length).toBe(2);
        expect(result.commonPath).toBe('/path/common');
        expect(result.interPath).toBe('/path/inter');
        expect(result.conceptPath).toBe('/path/concept');
    });

    test('Exercise editor store actions', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        const result = await page.evaluate(async () => {
            const store = window.__stores;
            if (!store) return null;
            const r = {};

            // getDirectoryChildren action
            const children = await store.editor.getDirectoryChildren( {
                frameworks: ['fw1', 'fw2'],
                resources: ['res1'],
                directories: ['dir1']
            });
            r.childrenCount = children.length;

            // getDirectoryChildren with some missing arrays
            const children2 = await store.editor.getDirectoryChildren( {
                frameworks: ['fw1']
            });
            r.childrenCount2 = children2.length;

            // lastEditToUndo action
            store.editor.addEditsToUndo( { id: 'undo-1' });
            const lastEdit = await store.editor.lastEditToUndo();
            r.lastUndoEdit = lastEdit;

            return r;
        });

        expect(result).toBeTruthy();
        expect(result.childrenCount).toBe(4);
        expect(result.childrenCount2).toBe(1);
        expect(result.lastUndoEdit.id).toBe('undo-1');
    });
});
