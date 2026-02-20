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
            const store = window.app && window.app.$store;
            if (!store) return null;
            const r = {};

            store.commit('editor/selectedCompetency', 'comp-1');
            r.selectedCompetency = store.getters['editor/selectedCompetency'];
            store.commit('editor/selectedCompetency', null);

            store.commit('editor/queryParams', { server: 'http://test' });
            r.queryParams = store.getters['editor/queryParams'];

            store.commit('editor/defaultLanguage', 'en');
            r.defaultLanguage = store.getters['editor/defaultLanguage'];

            const oldBackoff = store.getters['editor/webSocketBackoff'];
            store.commit('editor/webSocketBackoffIncrease');
            r.backoffIncreased = store.getters['editor/webSocketBackoff'] === oldBackoff * 2;

            store.commit('editor/private', true);
            r.private = store.getters['editor/private'];
            store.commit('editor/private', false);

            store.commit('editor/selectCompetencyRelation', 'narrows');
            r.relation = store.getters['editor/selectCompetencyRelation'];
            store.commit('editor/selectCompetencyRelation', null);

            store.commit('editor/selectingCompetencies', true);
            r.selecting = store.getters['editor/selectingCompetencies'];
            store.commit('editor/selectingCompetencies', false);

            store.commit('editor/newCompetency', 'new-comp-id');
            r.newComp = store.getters['editor/newCompetency'];
            store.commit('editor/newCompetency', null);

            store.commit('editor/newFramework', 'new-fw-id');
            r.newFw = store.getters['editor/newFramework'];
            store.commit('editor/newFramework', null);

            store.commit('editor/t3Profile', true);
            r.t3 = store.getters['editor/t3Profile'];
            store.commit('editor/t3Profile', false);

            store.commit('editor/changedObject', 'changed-id');
            r.changed = store.getters['editor/changedObject'];
            store.commit('editor/changedObject', null);

            store.commit('editor/configuration', { name: 'test-config' });
            r.config = store.getters['editor/configuration'];
            store.commit('editor/configuration', null);

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
            const store = window.app && window.app.$store;
            if (!store) return null;
            const r = {};

            // conceptMode sets progressionMode to false
            store.commit('editor/conceptMode', true);
            r.conceptOn = store.getters['editor/conceptMode'];
            r.progOffWhenConcept = store.getters['editor/progressionMode'];
            store.commit('editor/conceptMode', false);
            r.conceptOff = store.getters['editor/conceptMode'];

            // progressionMode sets conceptMode to false
            store.commit('editor/progressionMode', true);
            r.progOn = store.getters['editor/progressionMode'];
            r.conceptOffWhenProg = store.getters['editor/conceptMode'];
            store.commit('editor/progressionMode', false);
            r.progOff = store.getters['editor/progressionMode'];

            store.commit('editor/collectionMode', true);
            r.collection = store.getters['editor/collectionMode'];
            store.commit('editor/collectionMode', false);

            store.commit('editor/recomputeHierarchy', true);
            r.hierarchy = store.getters['editor/recomputeHierarchy'];
            store.commit('editor/recomputeHierarchy', false);

            store.commit('editor/recomputePrecedence', true);
            r.precedence = store.getters['editor/recomputePrecedence'];
            store.commit('editor/recomputePrecedence', false);

            store.commit('editor/recomputePrecedenceAfterReorder', true);
            r.reorder = store.getters['editor/recomputePrecedenceAfterReorder'];
            store.commit('editor/recomputePrecedenceAfterReorder', false);

            store.commit('editor/refreshLevels', true);
            r.levels = store.getters['editor/refreshLevels'];
            store.commit('editor/refreshLevels', false);

            store.commit('editor/refreshAlignments', true);
            r.alignments = store.getters['editor/refreshAlignments'];
            store.commit('editor/refreshAlignments', false);

            store.commit('editor/refreshProperties', true);
            r.properties = store.getters['editor/refreshProperties'];
            store.commit('editor/refreshProperties', false);

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
            const store = window.app && window.app.$store;
            if (!store) return null;
            const r = {};

            // Clipboard mutations
            store.commit('editor/cutId', 'cut-123');
            r.cutId = store.getters['editor/cutId'];
            store.commit('editor/copyId', 'copy-456');
            r.copyId = store.getters['editor/copyId'];
            store.commit('editor/paste', true);
            r.paste = store.getters['editor/paste'];
            store.commit('editor/cutOrCopyContainerId', 'container-789');
            r.containerId = store.getters['editor/cutOrCopyContainerId'];
            store.commit('editor/cutId', null);
            store.commit('editor/copyId', null);
            store.commit('editor/paste', false);

            // Node and relate mutations
            store.commit('editor/nodeInFocus', 'node-1');
            r.nodeInFocus = store.getters['editor/nodeInFocus'];
            store.commit('editor/nodeInFocus', null);

            store.commit('editor/relations', { 'a': ['b'] });
            r.relations = store.getters['editor/relations'];

            store.commit('editor/setPropertyLevel', 'Level2');
            r.propLevel = store.getters['editor/setPropertyLevel'];
            store.commit('editor/setPropertyLevel', null);

            store.commit('editor/addAnother', true);
            r.addAnother = store.getters['editor/addAnother'];
            store.commit('editor/addAnother', false);

            // Item mutations
            store.commit('editor/setItemToDelete', { id: 'del-1' });
            r.itemToDelete = store.getters['editor/itemToDelete'];
            store.commit('editor/setItemToRemove', { id: 'rem-1' });
            r.itemToRemove = store.getters['editor/itemToRemove'];
            store.commit('editor/setItemToExport', { id: 'exp-1' });
            r.itemToExport = store.getters['editor/itemToExport'];

            // Comment mutations
            store.commit('editor/setAddCommentAboutId', 'about-1');
            r.commentAbout = store.getters['editor/addCommentAboutId'];
            store.commit('editor/setAddCommentType', 'review');
            r.commentType = store.getters['editor/addCommentType'];
            store.commit('editor/setCommentToEdit', { text: 'edit me' });
            r.commentEdit = store.getters['editor/commentToEdit'];
            store.commit('editor/setCommentToReply', { text: 'reply' });
            r.commentReply = store.getters['editor/commentToReply'];
            store.commit('editor/setCommentsToDelete', ['c1', 'c2']);
            r.commentsDelete = store.getters['editor/commentsToDelete'];
            store.commit('editor/setCommentScrollTo', { id: 'scroll-1' });
            r.commentScroll = store.getters['editor/commentScrollTo'];

            // Framework comment data
            store.commit('editor/setFrameworkCommentDataLoaded', true);
            r.commentDataLoaded = store.getters['editor/frameworkCommentDataLoaded'];
            store.commit('editor/setFrameworkCommentList', [{ id: 'c1' }]);
            r.commentList = store.getters['editor/frameworkCommentList'];
            store.commit('editor/setFrameworkCommentPersonMap', { p1: 'Person A' });
            r.commentPersonMap = store.getters['editor/frameworkCommentPersonMap'];

            store.commit('editor/clearFrameworkCommentData');
            r.clearedLoaded = store.getters['editor/frameworkCommentDataLoaded'];
            r.clearedList = store.getters['editor/frameworkCommentList'];

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
            const store = window.app && window.app.$store;
            if (!store) return null;
            const r = {};

            store.commit('editor/setManageAssertions', true);
            r.manageAssertions = store.getters['editor/manageAssertions'];
            store.commit('editor/setManageAssertions', false);

            store.commit('editor/setBadgePk', 'pk-123');
            r.badgePk = store.getters['editor/badgePk'];
            store.commit('editor/setBadgePk', null);

            store.commit('editor/setMe', 'user-me');
            r.me = store.getters['editor/getMe'];
            store.commit('editor/setSubject', 'user-sub');
            r.subject = store.getters['editor/getSubject'];
            store.commit('editor/setPeople', [{ name: 'A' }]);
            r.people = store.getters['editor/people'];

            store.commit('editor/setFirstSearchProcessing', false);
            r.firstSearch = store.getters['editor/firstSearchProcessing'];
            store.commit('editor/setSearchingAssertions', true);
            r.searching = store.getters['editor/searchingAssertions'];
            store.commit('editor/setSearchingAssertions', false);

            // Undo mutations
            store.commit('editor/addEditsToUndo', { type: 'add', id: 'e1' });
            store.commit('editor/addEditsToUndo', { type: 'remove', id: 'e2' });
            r.editsCount = store.state.editor.editsToUndo.length;

            store.commit('editor/setLastEditToUndo', { type: 'add', id: 'e3' });
            r.lastEdit = store.state.editor.lastEditToUndo;

            // Selected competencies as properties
            store.commit('editor/selectedCompetenciesAsProperties', ['c1', 'c2']);
            r.selectedComps = store.getters['editor/selectedCompetenciesAsProperties'];
            store.commit('editor/selectedCompetenciesAsProperties', null);

            // Iframe paths
            store.commit('editor/commonPathIframe', '/path/common');
            r.commonPath = store.state.editor.commonPathIframe;
            store.commit('editor/iframeCompetencyPathInterframework', '/path/inter');
            r.interPath = store.state.editor.iframeCompetencyPathInterframework;
            store.commit('editor/iframeConceptPath', '/path/concept');
            r.conceptPath = store.state.editor.iframeConceptPath;

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
            const store = window.app && window.app.$store;
            if (!store) return null;
            const r = {};

            // getDirectoryChildren action
            const children = await store.dispatch('editor/getDirectoryChildren', {
                frameworks: ['fw1', 'fw2'],
                resources: ['res1'],
                directories: ['dir1']
            });
            r.childrenCount = children.length;

            // getDirectoryChildren with some missing arrays
            const children2 = await store.dispatch('editor/getDirectoryChildren', {
                frameworks: ['fw1']
            });
            r.childrenCount2 = children2.length;

            // lastEditToUndo action
            store.commit('editor/addEditsToUndo', { id: 'undo-1' });
            const lastEdit = await store.dispatch('editor/lastEditToUndo');
            r.lastUndoEdit = lastEdit;

            return r;
        });

        expect(result).toBeTruthy();
        expect(result.childrenCount).toBe(4);
        expect(result.childrenCount2).toBe(1);
        expect(result.lastUndoEdit.id).toBe('undo-1');
    });
});
